/**
 * LEETCODE TELEMETRY SERVICE
 * -----------------------------------------------------------------------------
 * File: src/services/leetcode.ts
 * Purpose: Retrieves verified LeetCode problem-solving stats via the DEVATLAS backend.
 *
 * Backend endpoint:
 *   GET /api/leetcode/profile?username={username}
 *
 * Why backend proxy?
 *   LeetCode blocks direct browser requests (CORS).
 *   The backend fetches the data server-to-server and returns it safely.
 *
 * No auth required for LeetCode lookups — public profiles are accessible.
 */

import { LeetCodeStats } from '../types';
import { fetchLeetCodeProfile } from '../lib/api';

/**
 * Returns initial zero-value LeetCode stats.
 * Used when a user has just linked their handle but data hasn't been fetched.
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
 * Fetches real LeetCode statistics from the DEVATLAS backend.
 * The backend calls LeetCode's GraphQL API server-side (bypasses CORS).
 *
 * Throws on error — callers must handle the error state explicitly.
 * DevAtlas never silently replaces failures with fake zeros.
 */
export async function fetchLeetCodeTelemetry(username: string): Promise<LeetCodeStats> {
  const stats = await fetchLeetCodeProfile(username);

  // Normalize to the frontend's LeetCodeStats shape
  return {
    username: stats.username,
    totalSolved: stats.totalSolved,
    easySolved: stats.easySolved,
    mediumSolved: stats.mediumSolved,
    hardSolved: stats.hardSolved,
  };
}
