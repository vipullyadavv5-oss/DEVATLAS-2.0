/**
 * SCORE CONTROLLER
 * -----------------------------------------------------------------------------
 * File: backend/src/controllers/score.controller.ts
 * Purpose: Returns computed DevScore for a developer given their platform handles.
 *
 * Route: GET /api/score/:username
 * Query params:
 *   ?leetcode={leetcodeUsername}   (optional)
 *   ?codeforces={codeforcesHandle} (optional)
 */

import { Request, Response } from 'express';
import { getGitHubStats, GitHubStats } from '../services/github.service';
import { getLeetCodeStats, LeetCodeStats } from '../services/leetcode.service';
import { getCodeforcesStats, CodeforcesStats } from '../services/codeforces.service';
import { calculateDevScore, PlatformResult } from '../services/score.service';
import { sendSuccess, Errors } from '../utils/apiResponse';

export const scoreController = {
  /**
   * GET /api/score/:username
   * Computes and returns the DevScore for a developer.
   */
  getScore: async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    const { leetcode: lc, codeforces: cf } = req.query;

    if (!username?.trim()) {
      throw Errors.badRequest('GitHub username is required.');
    }

    // Fetch all platforms in parallel, handle failures independently
    const [githubResult, leetcodeResult, codeforcesResult] = await Promise.all([
      (async (): Promise<PlatformResult<GitHubStats>> => {
        try {
          const stats = await getGitHubStats(username.trim());
          return { status: 'success', data: stats };
        } catch (err) {
          return { status: 'error', error: err instanceof Error ? err.message : 'GitHub error' };
        }
      })(),

      (async (): Promise<PlatformResult<LeetCodeStats>> => {
        if (!lc || typeof lc !== 'string' || !lc.trim()) {
          return { status: 'not_connected' };
        }
        try {
          const stats = await getLeetCodeStats(lc.trim());
          return { status: 'success', data: stats };
        } catch (err) {
          return { status: 'error', error: err instanceof Error ? err.message : 'LeetCode error' };
        }
      })(),

      (async (): Promise<PlatformResult<CodeforcesStats>> => {
        if (!cf || typeof cf !== 'string' || !cf.trim()) {
          return { status: 'not_connected' };
        }
        try {
          const stats = await getCodeforcesStats(cf.trim());
          return { status: 'success', data: stats };
        } catch (err) {
          return { status: 'error', error: err instanceof Error ? err.message : 'Codeforces error' };
        }
      })(),
    ]);

    const { total, breakdown } = calculateDevScore(githubResult, leetcodeResult, codeforcesResult);

    sendSuccess(res, {
      githubUsername: username.trim(),
      devScore: total,
      breakdown,
      platforms: {
        github: githubResult.status,
        leetcode: leetcodeResult.status,
        codeforces: codeforcesResult.status,
      },
    });
  },
};
