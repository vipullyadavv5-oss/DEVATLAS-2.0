/**
 * ENVIRONMENT CONFIGURATION & VALIDATION
 * -----------------------------------------------------------------------------
 * File: backend/src/config/env.ts
 * Purpose: Validates all required environment variables at startup.
 *          Fails fast with a clear error if anything critical is missing.
 *          All backend settings flow through this single config object.
 *
 * Security Note:
 * Secret values are never logged — only their presence is checked.
 */

import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

/**
 * Validates that a required env variable is set.
 * Throws immediately with a clear message if missing.
 */
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(
      `[DEVATLAS] Missing required environment variable: ${name}\n` +
      `  → Check backend/.env and ensure it matches backend/.env.example`
    );
  }
  return value.trim();
}

/**
 * Reads an optional env variable with a fallback default.
 */
function optionalEnv(name: string, defaultValue: string): string {
  const value = process.env[name];
  return value?.trim() || defaultValue;
}

/**
 * Central application configuration.
 * Always import this object — never import process.env directly.
 */
export const config = {
  // Server
  nodeEnv:      optionalEnv('NODE_ENV', 'development'),
  port:         parseInt(optionalEnv('PORT', '5000'), 10),
  isDev:        optionalEnv('NODE_ENV', 'development') === 'development',
  isProd:       optionalEnv('NODE_ENV', 'development') === 'production',

  // CORS
  frontendUrl:  optionalEnv('FRONTEND_URL', 'http://localhost:3000'),
  backendUrl:   optionalEnv('BACKEND_URL', 'http://localhost:5000'),

  // GitHub OAuth
  github: {
    clientId:     optionalEnv('GITHUB_CLIENT_ID', ''),
    clientSecret: optionalEnv('GITHUB_CLIENT_SECRET', ''),
    callbackUrl:  optionalEnv('GITHUB_CALLBACK_URL', 'http://localhost:5000/api/auth/callback'),
    apiBase:      'https://api.github.com',
    oauthBase:    'https://github.com',
  },

  // Session
  sessionSecret: optionalEnv('SESSION_SECRET', 'devatlas-dev-secret-change-in-production'),
} as const;

/**
 * Validates production-critical variables.
 * In production, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, and SESSION_SECRET
 * MUST be explicitly set. Fails fast to prevent a broken deployment.
 */
export function validateConfig(): void {
  if (config.isProd) {
    requireEnv('GITHUB_CLIENT_ID');
    requireEnv('GITHUB_CLIENT_SECRET');
    requireEnv('SESSION_SECRET');
    requireEnv('FRONTEND_URL');
  }

  if (config.sessionSecret === 'devatlas-dev-secret-change-in-production' && config.isProd) {
    throw new Error(
      '[DEVATLAS] SESSION_SECRET is using the insecure default. ' +
      'Set a strong random value in production.'
    );
  }

  console.log(`[DEVATLAS] Config loaded — NODE_ENV=${config.nodeEnv} PORT=${config.port}`);
}
