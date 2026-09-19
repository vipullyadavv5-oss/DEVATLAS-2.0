/**
 * CODEFORCES TELEMETRY SERVICE
 * -----------------------------------------------------------------------------
 * File: src/services/codeforces.ts
 * Purpose: Retrieves competitive programming stats from the DEVATLAS backend.
 *
 * Backend endpoint:
 *   GET /api/codeforces/profile?handle={handle}
 *
 * The backend calls the official Codeforces REST API v1 (public, no auth needed).
 * We proxy through the backend for consistency and to keep all API logic server-side.
 */

import { CodeforcesStats } from '../types';
import { fetchCodeforcesProfile } from '../lib/api';

/**
 * Returns initial zero-value Codeforces stats.
 * Used when a handle is linked but hasn't been synced yet.
 */
export function getInitialCodeforcesStats(handle: string): CodeforcesStats {
  return {
    handle,
    rating: 0,
    rank: '—',
    contestsCount: 0
  };
}

/**
 * Fetches real Codeforces statistics from the DEVATLAS backend.
 * The backend calls the official Codeforces API.
 *
 * Throws on error — callers must handle the error state explicitly.
 * DevAtlas never silently replaces failures with fake zeros.
 */
export async function fetchCodeforcesTelemetry(handle: string): Promise<CodeforcesStats> {
  const stats = await fetchCodeforcesProfile(handle);

  // Normalize to the frontend's CodeforcesStats shape
  return {
    handle: stats.handle,
    rating: stats.rating,
    rank: stats.rank,
    contestsCount: stats.contestsCount,
  };
}
