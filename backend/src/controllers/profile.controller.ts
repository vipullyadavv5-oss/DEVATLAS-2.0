/**
 * PROFILE CONTROLLER
 * -----------------------------------------------------------------------------
 * File: backend/src/controllers/profile.controller.ts
 * Purpose: Returns a unified public developer profile combining all platforms.
 *
 * Route: GET /api/profile/:username
 *
 * This endpoint is the core of DEVATLAS:
 * It aggregates GitHub, LeetCode (if provided), and Codeforces (if provided)
 * data into a single normalized response.
 *
 * Partial failures are handled gracefully:
 * If LeetCode fails, the response still includes GitHub and Codeforces data.
 * Each platform shows its own status: "success" | "error" | "not_connected".
 */

import { Request, Response } from 'express';
import { getPublicUserProfile, getGitHubStats, GitHubStats } from '../services/github.service';
import { getLeetCodeStats, LeetCodeStats } from '../services/leetcode.service';
import { getCodeforcesStats, CodeforcesStats } from '../services/codeforces.service';
import { calculateDevScore, PlatformResult } from '../services/score.service';
import { sendSuccess, Errors } from '../utils/apiResponse';

export const profileController = {
  /**
   * GET /api/profile/:username
   * Builds a unified public developer profile.
   *
   * Query params (optional):
   *   ?leetcode={leetcodeUsername}
   *   ?codeforces={codeforcesHandle}
   */
  getPublicProfile: async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    const { leetcode: leetcodeUsername, codeforces: codeforcesHandle } = req.query;

    if (!username || username.trim() === '') {
      throw Errors.badRequest('GitHub username is required.');
    }

    const githubUsername = username.trim();

    // ── Fetch GitHub (required) ───────────────────────────────────────────────
    let githubResult: PlatformResult<GitHubStats>;
    try {
      const [profile, stats] = await Promise.all([
        getPublicUserProfile(githubUsername),
        getGitHubStats(githubUsername),
      ]);
      githubResult = {
        status: 'success',
        data: {
          username: profile.login,
          repositories: stats.repositories,
          commits: stats.commits,
          languagesCount: stats.languagesCount,
          topLanguages: stats.topLanguages,
        },
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to fetch GitHub data';
      console.error(`[Profile] GitHub fetch failed for '${githubUsername}': ${message}`);
      githubResult = { status: 'error', error: message };
    }

    // ── Fetch LeetCode (optional) ─────────────────────────────────────────────
    let leetcodeResult: PlatformResult<LeetCodeStats>;
    if (leetcodeUsername && typeof leetcodeUsername === 'string' && leetcodeUsername.trim()) {
      try {
        const stats = await getLeetCodeStats(leetcodeUsername.trim());
        leetcodeResult = { status: 'success', data: stats };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to fetch LeetCode data';
        console.error(`[Profile] LeetCode fetch failed: ${message}`);
        leetcodeResult = { status: 'error', error: message };
      }
    } else {
      leetcodeResult = { status: 'not_connected' };
    }

    // ── Fetch Codeforces (optional) ───────────────────────────────────────────
    let codeforcesResult: PlatformResult<CodeforcesStats>;
    if (codeforcesHandle && typeof codeforcesHandle === 'string' && codeforcesHandle.trim()) {
      try {
        const stats = await getCodeforcesStats(codeforcesHandle.trim());
        codeforcesResult = { status: 'success', data: stats };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unable to fetch Codeforces data';
        console.error(`[Profile] Codeforces fetch failed: ${message}`);
        codeforcesResult = { status: 'error', error: message };
      }
    } else {
      codeforcesResult = { status: 'not_connected' };
    }

    // ── Calculate DevScore ────────────────────────────────────────────────────
    const { total: devScore, breakdown } = calculateDevScore(
      githubResult,
      leetcodeResult,
      codeforcesResult
    );

    // ── Assemble unified response ─────────────────────────────────────────────
    sendSuccess(res, {
      githubUsername,
      github: githubResult,
      leetcode: leetcodeResult,
      codeforces: codeforcesResult,
      devScore,
      scoreBreakdown: breakdown,
    });
  },
};
