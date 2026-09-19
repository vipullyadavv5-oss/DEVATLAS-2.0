/**
 * CODEFORCES CONTROLLER
 * -----------------------------------------------------------------------------
 * File: backend/src/controllers/codeforces.controller.ts
 * Purpose: Handles Codeforces profile lookup by handle query parameter.
 *
 * Route: GET /api/codeforces/profile?handle={codeforcesHandle}
 */

import { Request, Response } from 'express';
import { getCodeforcesStats } from '../services/codeforces.service';
import { sendSuccess, Errors } from '../utils/apiResponse';

export const codeforcesController = {
  /**
   * GET /api/codeforces/profile?handle=...
   * Fetches real Codeforces rating and stats for the given handle.
   */
  getProfile: async (req: Request, res: Response): Promise<void> => {
    const { handle } = req.query;

    // Validate handle parameter
    if (!handle || typeof handle !== 'string' || handle.trim() === '') {
      throw Errors.badRequest('Query parameter "handle" is required.');
    }

    const cleanHandle = handle.trim();

    // Codeforces handles: 3-24 chars, letters/digits/underscores/hyphens
    if (!/^[a-zA-Z0-9_-]{3,24}$/.test(cleanHandle)) {
      throw Errors.validationError(
        'Codeforces handle must be 3-24 characters, alphanumeric with _ or - only.'
      );
    }

    const stats = await getCodeforcesStats(cleanHandle);
    sendSuccess(res, stats);
  },
};
