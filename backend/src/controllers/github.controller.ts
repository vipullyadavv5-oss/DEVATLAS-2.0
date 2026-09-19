/**
 * GITHUB CONTROLLER
 * -----------------------------------------------------------------------------
 * File: backend/src/controllers/github.controller.ts
 * Purpose: Handles GitHub profile and stats API endpoints.
 *          Uses the authenticated user's stored access token for API calls.
 */

import { Request, Response } from 'express';
import { getPublicUserProfile, getGitHubStats } from '../services/github.service';
import { sendSuccess } from '../utils/apiResponse';

export const githubController = {
  /**
   * GET /api/github/profile
   * Returns the authenticated user's GitHub profile.
   * requireAuth middleware ensures req.session.user is set.
   */
  getProfile: async (req: Request, res: Response): Promise<void> => {
    const { githubUsername, accessToken } = req.session.user!;
    const profile = await getPublicUserProfile(githubUsername);
    // accessToken used for higher rate limits but not returned
    void accessToken;
    sendSuccess(res, profile);
  },

  /**
   * GET /api/github/stats
   * Returns GitHub statistics: repos, commits, languages.
   * Uses the authenticated user's token for commit count (search API requires auth).
   */
  getStats: async (req: Request, res: Response): Promise<void> => {
    const { githubUsername, accessToken } = req.session.user!;
    const stats = await getGitHubStats(githubUsername, accessToken);
    sendSuccess(res, stats);
  },
};
