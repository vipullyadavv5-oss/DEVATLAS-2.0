/**
 * CODEFORCES API SERVICE
 * -----------------------------------------------------------------------------
 * File: backend/src/services/codeforces.service.ts
 * Purpose: Real Codeforces data fetching via the official Codeforces REST API v1.
 *
 * APIs Used:
 *   GET https://codeforces.com/api/user.info?handles={handle}
 *   GET https://codeforces.com/api/user.rating?handle={handle}
 *
 * No authentication required — Codeforces API is public.
 * Rate limit: ~5 requests/second (well within normal usage patterns).
 */

import axios, { AxiosError } from 'axios';
import { Errors } from '../utils/apiResponse';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CodeforcesStats {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contestsCount: number;
}

interface CodeforcesUserInfoResult {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
}

interface CodeforcesApiResponse<T> {
  status: 'OK' | 'FAILED';
  comment?: string;
  result: T;
}

interface CodeforcesRatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

// ─── Service Functions ────────────────────────────────────────────────────────

const CF_API_BASE = 'https://codeforces.com/api';

/**
 * Fetches verified Codeforces statistics for a given handle.
 * Uses the official Codeforces public API.
 *
 * Never fabricates rating or rank values.
 * If the handle doesn't exist, returns an AppError.
 */
export async function getCodeforcesStats(handle: string): Promise<CodeforcesStats> {
  try {
    // 1. Fetch user info (rating, rank, handle)
    const infoResponse = await axios.get<CodeforcesApiResponse<CodeforcesUserInfoResult[]>>(
      `${CF_API_BASE}/user.info`,
      {
        params: { handles: handle },
        headers: { 'User-Agent': 'DEVATLAS/2.0' },
        timeout: 10000,
      }
    );

    if (infoResponse.data.status !== 'OK') {
      const comment = infoResponse.data.comment ?? 'Unknown error';
      console.error(`[Codeforces] API error for '${handle}': ${comment}`);

      if (comment.toLowerCase().includes('not found') || comment.toLowerCase().includes('illegal')) {
        throw Errors.codeforcesApiError(`Codeforces handle '${handle}' not found.`);
      }
      throw Errors.codeforcesApiError('Codeforces API returned an error.');
    }

    const userInfo = infoResponse.data.result[0];

    // 2. Fetch rating history to get contest count
    let contestsCount = 0;
    try {
      const ratingResponse = await axios.get<CodeforcesApiResponse<CodeforcesRatingChange[]>>(
        `${CF_API_BASE}/user.rating`,
        {
          params: { handle },
          headers: { 'User-Agent': 'DEVATLAS/2.0' },
          timeout: 10000,
        }
      );

      if (ratingResponse.data.status === 'OK') {
        contestsCount = ratingResponse.data.result.length;
      }
    } catch {
      // Contest count is non-critical — don't fail the whole request
      console.warn(`[Codeforces] Could not fetch contest count for '${handle}'`);
    }

    return {
      handle: userInfo.handle,
      rating: userInfo.rating ?? 0,
      maxRating: userInfo.maxRating ?? 0,
      rank: userInfo.rank ?? 'unrated',
      maxRank: userInfo.maxRank ?? 'unrated',
      contestsCount,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      console.error(`[Codeforces] HTTP error for '${handle}' — status ${status}`);

      if (status === 400) {
        throw Errors.codeforcesApiError(`Codeforces handle '${handle}' not found or invalid.`);
      }
      if (status === 503 || status === 429) {
        throw Errors.codeforcesApiError('Codeforces is temporarily unavailable. Please try again.');
      }
      throw Errors.codeforcesApiError('Unable to reach Codeforces API.');
    }

    // Re-throw AppErrors
    throw err;
  }
}
