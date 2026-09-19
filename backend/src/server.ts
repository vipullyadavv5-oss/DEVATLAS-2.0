/**
 * SERVER ENTRY POINT
 * -----------------------------------------------------------------------------
 * File: backend/src/server.ts
 * Purpose: Validates config, then starts the HTTP server.
 *          Handles graceful startup failure and clean shutdown.
 *
 * This file is intentionally minimal — all app logic lives in app.ts.
 * Keep this file focused on process-level concerns only.
 */

import { validateConfig, config } from './config/env';
import app from './app';

// ── Validate environment before starting ───────────────────────────────────────
try {
  validateConfig();
} catch (err) {
  console.error('\n❌ Configuration Error:');
  console.error((err as Error).message);
  console.error('\nCheck backend/.env — copy from backend/.env.example and fill in values.\n');
  process.exit(1); // Fail fast — don't start a broken server
}

// ── Start HTTP Server ──────────────────────────────────────────────────────────
const server = app.listen(config.port, () => {
  console.log('\n🚀 DEVATLAS API Server');
  console.log(`   Environment : ${config.nodeEnv}`);
  console.log(`   Port        : ${config.port}`);
  console.log(`   Frontend URL: ${config.frontendUrl}`);
  console.log(`   Health      : http://localhost:${config.port}/api/health`);
  console.log(`   GitHub OAuth: ${config.github.clientId ? '✅ configured' : '⚠️  not configured (set GITHUB_CLIENT_ID)'}`);
  console.log('');
});

// ── Handle startup errors (e.g. port already in use) ──────────────────────────
server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${config.port} is already in use.`);
    console.error(`   → Change PORT in backend/.env or stop the process using port ${config.port}`);
  } else {
    console.error('❌ Server startup error:', err.message);
  }
  process.exit(1);
});

// ── Graceful Shutdown ──────────────────────────────────────────────────────────
// Handles Ctrl+C (SIGINT) and deployment signals (SIGTERM)
const shutdown = (signal: string) => {
  console.log(`\n[Server] Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('[Server] HTTP server closed.');
    process.exit(0);
  });

  // Force-close after 10 seconds if still hanging
  setTimeout(() => {
    console.error('[Server] Force-closing after timeout.');
    process.exit(1);
  }, 10_000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));

// Catch unhandled promise rejections — log without crashing the process
process.on('unhandledRejection', (reason) => {
  console.error('[Server] Unhandled Promise Rejection:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Server] Uncaught Exception:', err.message);
  process.exit(1);
});

export default server;
