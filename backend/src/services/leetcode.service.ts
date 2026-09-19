/**
 * LEETCODE API SERVICE
 * -----------------------------------------------------------------------------
 * File: backend/src/services/leetcode.service.ts
 * Purpose: Real LeetCode data fetching via LeetCode's unofficial GraphQL API.
 *
 * API Used:
 *   POST https://leetcode.com/graphql
 *   Query: matchedUser(username: $username) { submitStats { acSubmissionNum } }
 *
 * Why Backend?
 *   LeetCode blocks browser requests (CORS). This backend acts as a secure proxy.
 *   No API key required — uses the public GraphQL endpoint with a standard UA.
 *
 * IMPORTANT:
 *   LeetCode's API is unofficial and may change without notice.
 *   Errors are handled safely; users get a clear error state instead of fake data.
 */

import axios, { AxiosError } from 'axios';
import { Errors } from '../utils/apiResponse';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | null;
}

interface LeetCodeSubmitStat {
  difficulty: string;
  count: number;
  submissions: number;
}

interface LeetCodeGraphQLResponse {
  data: {
    matchedUser: {
      username: string;
      profile: {
        ranking: number;
      };
      submitStats: {
        acSubmissionNum: LeetCodeSubmitStat[];
      };
    } | null;
  };
  errors?: Array<{ message: string }>;
}

// ─── GraphQL Query ────────────────────────────────────────────────────────────

const LEETCODE_STATS_QUERY = `
  query getUserStats($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }
`;

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Fetches verified LeetCode problem-solving statistics.
 * Returns real data from LeetCode's GraphQL API.
 *
 * If the user is not found or an error occurs, throws an AppError.
 * Never returns fabricated data.
 */
export async function getLeetCodeStats(username: string): Promise<LeetCodeStats> {
  try {
    const response = await axios.post<LeetCodeGraphQLResponse>(
      'https://leetcode.com/graphql',
      {
        query: LEETCODE_STATS_QUERY,
        variables: { username },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com',
          'User-Agent': 'Mozilla/5.0 (compatible; DEVATLAS/2.0)',
        },
        timeout: 12000,
      }
    );

    // Check for GraphQL-level errors
    if (response.data.errors?.length) {
      const errMsg = response.data.errors[0].message;
      console.error(`[LeetCode] GraphQL error for '${username}': ${errMsg}`);
      throw Errors.leetcodeApiError('LeetCode returned an error. The username may not exist.');
    }

    const matchedUser = response.data.data?.matchedUser;

    if (!matchedUser) {
      throw Errors.leetcodeApiError(`LeetCode user '${username}' not found.`);
    }

    // Extract difficulty breakdown
    const stats = matchedUser.submitStats.acSubmissionNum;
    const getCount = (difficulty: string): number =>
      stats.find((s) => s.difficulty === difficulty)?.count ?? 0;

    return {
      username: matchedUser.username,
      totalSolved: getCount('All'),
      easySolved: getCount('Easy'),
      mediumSolved: getCount('Medium'),
      hardSolved: getCount('Hard'),
      ranking: matchedUser.profile.ranking ?? null,
    };
  } catch (err) {
    if (err instanceof AxiosError) {
      const status = err.response?.status;
      console.error(`[LeetCode] HTTP error for '${username}' — status ${status}`);

      if (status === 429) {
        throw Errors.leetcodeApiError('LeetCode rate limit reached. Please try again shortly.');
      }
      throw Errors.leetcodeApiError('Unable to reach LeetCode. Please try again.');
    }

    // Re-throw AppErrors (our own errors from above)
    throw err;
  }
}
