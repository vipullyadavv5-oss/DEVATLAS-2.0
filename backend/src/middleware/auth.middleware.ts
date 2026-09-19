/**
 * AUTHENTICATION MIDDLEWARE
 * -----------------------------------------------------------------------------
 * File: backend/src/middleware/auth.middleware.ts
 * Purpose: Guards routes that require an authenticated session.
 *
 * Usage:
 *   router.get('/protected', requireAuth, controller.handler);
 *
 * If the user is not authenticated:
 *   → 401 { success: false, error: { code: "UNAUTHORIZED", message: "..." } }
 *
 * If authenticated:
 *   → Attaches req.session.user to req for downstream handlers.
 */

import { Request, Response, NextFunction } from 'express';
import { sendError, ErrorCode } from '../utils/apiResponse';

/**
 * Extend Express Request to include the authenticated user from session.
 */
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      githubUsername: string;
      name: string;
      avatarUrl: string;
      accessToken: string; // GitHub OAuth access token — stored server-side only
    };
  }
}

/**
 * requireAuth middleware.
 * Rejects requests without a valid session.
 * Does NOT expose session internals (access token, etc.) in the error response.
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session?.user) {
    sendError(res, 401, ErrorCode.UNAUTHORIZED, 'Authentication required');
    return;
  }
  next();
}

/**
 * optionalAuth middleware.
 * Allows both authenticated and unauthenticated requests to pass through.
 * Downstream handlers can check req.session?.user for auth state.
 */
export function optionalAuth(req: Request, res: Response, next: NextFunction): void {
  // Simply pass through — session is always available from express-session
  next();
}
