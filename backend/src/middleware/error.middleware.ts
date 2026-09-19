/**
 * CENTRALIZED ERROR HANDLING MIDDLEWARE
 * -----------------------------------------------------------------------------
 * File: backend/src/middleware/error.middleware.ts
 * Purpose: Catches all errors forwarded via next(error) and converts them into
 *          safe, structured API error responses.
 *
 * Security Rules:
 * - Stack traces NEVER reach the client in production.
 * - Raw provider error messages are NOT forwarded to the client.
 * - OAuth secrets, tokens, and connection strings are never logged in full.
 */

import { Request, Response, NextFunction } from 'express';
import { AppError, sendError, ErrorCode } from '../utils/apiResponse';
import { config } from '../config/env';

/**
 * Express 4.x error middleware signature requires exactly 4 parameters.
 * The unused `_next` is required to satisfy Express's detection of error handlers.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void {
  // ── Log the error server-side ─────────────────────────────────────────────
  // In development: log full stack for debugging convenience
  // In production: log message only, never stack trace to console
  if (config.isDev) {
    console.error(`[ERROR] ${req.method} ${req.path}`, err);
  } else {
    // Production: log method, path, and error message only
    // Never log raw error objects that may contain tokens or secrets
    const safeMessage = err instanceof AppError ? err.message : 'Internal server error';
    console.error(`[ERROR] ${req.method} ${req.path} — ${safeMessage}`);
  }

  // ── Handle CORS errors ────────────────────────────────────────────────────
  if (err.message.startsWith('CORS:')) {
    sendError(res, 403, ErrorCode.FORBIDDEN, 'CORS: Request origin not allowed');
    return;
  }

  // ── Handle our own AppError (operational errors) ──────────────────────────
  if (err instanceof AppError && err.isOperational) {
    sendError(res, err.statusCode, err.code, err.message);
    return;
  }

  // ── Handle Express/body-parser errors ─────────────────────────────────────
  if (err.name === 'SyntaxError') {
    sendError(res, 400, ErrorCode.BAD_REQUEST, 'Invalid JSON in request body');
    return;
  }

  // ── Catch-all: Unknown / unexpected errors ────────────────────────────────
  // Never expose internal error details to the client
  sendError(
    res,
    500,
    ErrorCode.INTERNAL_ERROR,
    config.isDev
      ? err.message // Useful during local dev
      : 'An unexpected error occurred. Please try again.'
  );
}
