/**
 * LEETCODE CONTROLLER
 * -----------------------------------------------------------------------------
 * File: backend/src/controllers/leetcode.controller.ts
 * Purpose: Handles LeetCode profile lookup by username query parameter.
 *
 * Route: GET /api/leetcode/profile?username={leetcodeUsername}
 *
 * Validation:
 *   - username must be provided
 *   - username must be alphanumeric (with _ and - allowed)
 *   - No spaces or special characters (reject before calling API)
 */

import { Request, Response } from 'express';
import { getLeetCodeStats } from '../services/leetcode.service';
import { sendSuccess, Errors } from '../utils/apiResponse';

export const leetcodeController = {
  /**
   * GET /api/leetcode/profile?username=...
   * Fetches real LeetCode stats for the given username.
   */
  getProfile: async (req: Request, res: Response): Promise<void> => {
    const { username } = req.query;

    // Validate username parameter
    if (!username || typeof username !== 'string' || username.trim() === '') {
      throw Errors.badRequest('Query parameter "username" is required.');
    }

    const cleanUsername = username.trim();

    // Validate format: alphanumeric, underscores, hyphens only (max 25 chars)
    if (!/^[a-zA-Z0-9_-]{1,25}$/.test(cleanUsername)) {
      throw Errors.validationError(
        'LeetCode username must be 1-25 characters, alphanumeric with _ or - only.'
      );
    }

    const stats = await getLeetCodeStats(cleanUsername);
    sendSuccess(res, stats);
  },
};
