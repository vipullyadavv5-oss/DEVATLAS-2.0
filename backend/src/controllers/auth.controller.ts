/**
 * AUTHENTICATION CONTROLLER
 * -----------------------------------------------------------------------------
 * File: backend/src/controllers/auth.controller.ts
 * Purpose: Handles GitHub OAuth flow, session management, and logout.
 *
 * Routes handled:
 *   GET  /api/auth/github     → Redirect to GitHub OAuth consent
 *   GET  /api/auth/callback   → Handle GitHub callback, create session
 *   GET  /api/auth/session    → Return safe session info (no token)
 *   POST /api/auth/logout     → Destroy session
 *
 * Security:
 *   The GitHub access token is NEVER included in any response to the client.
 *   Only safe user info (username, name, avatar) is forwarded.
 */

import { Request, Response } from 'express';
import {
  generateGitHubAuthUrl,
  exchangeCodeForToken,
  buildAuthenticatedUser,
} from '../services/auth.service';
import { sendSuccess, sendError, ErrorCode, AppError } from '../utils/apiResponse';
import { config } from '../config/env';

export const authController = {
  /**
   * GET /api/auth/github
   * Initiates GitHub OAuth by redirecting to GitHub's authorization page.
   */
  initiateGitHubAuth: (_req: Request, res: Response): void => {
    if (!config.github.clientId) {
      sendError(
        res, 503, ErrorCode.SERVICE_UNAVAILABLE,
        'GitHub OAuth is not configured on this server.'
      );
      return;
    }

    const authUrl = generateGitHubAuthUrl();
    res.redirect(authUrl);
  },

  /**
   * GET /api/auth/callback?code=...
   * GitHub redirects here after the user grants permission.
   * Exchanges code for token, fetches user, creates session.
   */
  handleGitHubCallback: async (req: Request, res: Response): Promise<void> => {
    const { code, error } = req.query;

    // User denied GitHub OAuth access
    if (error) {
      console.warn(`[Auth] GitHub OAuth denied by user: ${error}`);
      return res.redirect(`${config.frontendUrl}?auth_error=access_denied`);
    }

    if (!code || typeof code !== 'string') {
      return res.redirect(`${config.frontendUrl}?auth_error=missing_code`);
    }

    try {
      // Exchange code → access token (server-side, secret used here)
      const accessToken = await exchangeCodeForToken(code);

      // Fetch GitHub profile using the token
      const user = await buildAuthenticatedUser(accessToken);

      // Store in server-side session (token never reaches frontend)
      req.session.user = {
        id: user.id,
        githubUsername: user.githubUsername,
        name: user.name,
        avatarUrl: user.avatarUrl,
        accessToken: user.accessToken, // Secured in server memory
      };

      console.log(`[Auth] User authenticated: ${user.githubUsername}`);

      // Redirect frontend to dashboard (or onboarding)
      res.redirect(`${config.frontendUrl}?auth=success&user=${user.githubUsername}`);
    } catch (err) {
      const message = err instanceof AppError ? err.message : 'Authentication failed';
      console.error('[Auth] Callback error:', message);
      res.redirect(`${config.frontendUrl}?auth_error=callback_failed`);
    }
  },

  /**
   * GET /api/auth/session
   * Returns the current session's safe user info.
   * Never returns the access token.
   */
  getSession: (req: Request, res: Response): void => {
    if (!req.session?.user) {
      sendSuccess(res, { authenticated: false, user: null });
      return;
    }

    const { accessToken: _omit, ...safeUser } = req.session.user;

    sendSuccess(res, {
      authenticated: true,
      user: safeUser,
    });
  },

  /**
   * POST /api/auth/logout
   * Destroys the session and clears the session cookie.
   */
  logout: (req: Request, res: Response): void => {
    const username = req.session?.user?.githubUsername ?? 'unknown';

    req.session.destroy((err) => {
      if (err) {
        console.error('[Auth] Session destroy error:', err.message);
        sendError(res, 500, ErrorCode.INTERNAL_ERROR, 'Logout failed. Please try again.');
        return;
      }

      console.log(`[Auth] User logged out: ${username}`);
      res.clearCookie('connect.sid'); // Default express-session cookie name
      sendSuccess(res, { message: 'Logged out successfully' });
    });
  },
};
