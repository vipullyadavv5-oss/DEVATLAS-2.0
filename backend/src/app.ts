/**
 * EXPRESS APPLICATION
 * -----------------------------------------------------------------------------
 * File: backend/src/app.ts
 * Purpose: Configures the Express application — middleware stack, session,
 *          CORS, routing, and error handling. Exported for use in server.ts.
 *
 * Order matters in Express:
 *   1. Security/CORS headers
 *   2. Body parsers
 *   3. Session
 *   4. Request logging
 *   5. Routes
 *   6. 404 handler (after all routes)
 *   7. Error handler (must be last, 4-param signature)
 */

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import { corsOptions } from './config/cors';
import { config } from './config/env';

// Middleware
import { errorMiddleware } from './middleware/error.middleware';
import { notFoundMiddleware } from './middleware/notFound.middleware';

// Routes
import healthRoutes     from './routes/health.routes';
import authRoutes       from './routes/auth.routes';
import githubRoutes     from './routes/github.routes';
import leetcodeRoutes   from './routes/leetcode.routes';
import codeforcesRoutes from './routes/codeforces.routes';
import profileRoutes    from './routes/profile.routes';
import scoreRoutes      from './routes/score.routes';

const app = express();

// ── 1. CORS ────────────────────────────────────────────────────────────────────
// Must be before any routes so preflight OPTIONS requests are handled correctly
app.use(cors(corsOptions));

// ── 2. Body Parsers ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// ── 3. Session ─────────────────────────────────────────────────────────────────
// HTTP-only session cookie — token is never accessible from browser JavaScript
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,                          // Not accessible via document.cookie
      secure: config.isProd,                   // HTTPS-only in production
      sameSite: config.isProd ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,        // 7 days
    },
  })
);

// ── 4. Request Logging (development only) ──────────────────────────────────────
if (config.isDev) {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// ── 5. Routes ──────────────────────────────────────────────────────────────────
app.use('/api/health',     healthRoutes);
app.use('/api/auth',       authRoutes);
app.use('/api/github',     githubRoutes);
app.use('/api/leetcode',   leetcodeRoutes);
app.use('/api/codeforces', codeforcesRoutes);
app.use('/api/profile',    profileRoutes);
app.use('/api/score',      scoreRoutes);

// ── 6. 404 — Must come AFTER all routes ────────────────────────────────────────
app.use(notFoundMiddleware);

// ── 7. Error Handler — Must be LAST, exactly 4 params ─────────────────────────
app.use(errorMiddleware);

export default app;
