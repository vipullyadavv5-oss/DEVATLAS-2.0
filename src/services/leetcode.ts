/**
 * LEETCODE TELEMETRY SERVICE
 * -----------------------------------------------------------------------------
 * File: src/services/leetcode.ts
 * Purpose: Retrieves verified algorithm problem-solving stats from LeetCode.
 * 
 * Future Integration Note:
 * This service will interface with LeetCode GraphQL public endpoint:
 * POST https://leetcode.com/graphql
 * Query: matchedUser(username: $username) { submitStats { acSubmissionNum } }
 */

import { LeetCodeStats } from '../types';

/**
 * Returns initial zero-value LeetCode stats when a username is connected.
 */
export function getInitialLeetCodeStats(username: string): LeetCodeStats {
  return {
    username,
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0
  };
}

/**
 * Fetches verified problem-solving metrics from LeetCode.
 * 
 * TODO: Replace with GraphQL query call to LeetCode API once CORS proxy or backend gateway is live.
 */
export async function fetchLeetCodeTelemetry(username: string): Promise<LeetCodeStats> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    username,
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0
  };
}
