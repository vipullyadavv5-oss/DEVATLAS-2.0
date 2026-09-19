/**
 * DEVSCORE CALCULATION SERVICE (Backend Port)
 * -----------------------------------------------------------------------------
 * File: backend/src/services/score.service.ts
 * Purpose: Backend implementation of the DevScore algorithm.
 *          Mirrors the frontend's src/utils/devScore.ts logic to keep
 *          calculations consistent between client and server.
 *
 * Score Formula Weights:
 *   GitHub Activity: 40% (Commits 25 + Repos 10 + Language Diversity 5)
 *   LeetCode Index:  35% (Easy 0.05 + Medium 0.15 + Hard 0.35 per problem)
 *   Codeforces Elo:  25% (rating / 2000 × 25)
 *
 * Integrity Guarantee:
 *   Platforms that fail to fetch return status "error" and contribute 0 points.
 *   No platform fabricates a baseline score.
 */

import { GitHubStats } from './github.service';
import { LeetCodeStats } from './leetcode.service';
import { CodeforcesStats } from './codeforces.service';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PlatformResult<T> {
  status: 'success' | 'error' | 'not_connected';
  data?: T;
  error?: string;
}

export interface DevScoreBreakdown {
  total: number;
  github: number;
  leetcode: number;
  codeforces: number;
}

export interface UnifiedProfile {
  githubUsername: string;
  github: PlatformResult<GitHubStats>;
  leetcode: PlatformResult<LeetCodeStats>;
  codeforces: PlatformResult<CodeforcesStats>;
  devScore: number;
  scoreBreakdown: DevScoreBreakdown;
}

// ─── Score Functions ──────────────────────────────────────────────────────────

/**
 * Calculates the GitHub contribution to DevScore (max 40 points).
 */
function calcGitHubScore(stats: GitHubStats): number {
  const commitScore   = Math.min(25, (stats.commits / 500) * 25);
  const repoScore     = Math.min(10, (stats.repositories / 20) * 10);
  const langScore     = Math.min(5,  (stats.languagesCount / 8) * 5);
  return Math.round(commitScore + repoScore + langScore);
}

/**
 * Calculates the LeetCode contribution to DevScore (max 35 points).
 */
function calcLeetCodeScore(stats: LeetCodeStats): number {
  const raw = (stats.easySolved * 0.05) + (stats.mediumSolved * 0.15) + (stats.hardSolved * 0.35);
  return Math.round(Math.min(35, raw));
}

/**
 * Calculates the Codeforces contribution to DevScore (max 25 points).
 */
function calcCodeforcesScore(stats: CodeforcesStats): number {
  const raw = (stats.rating / 2000) * 25;
  return Math.round(Math.min(25, Math.max(0, raw)));
}

/**
 * Computes the full DevScore from platform results.
 * Only successful platform fetches contribute to the score.
 */
export function calculateDevScore(
  github: PlatformResult<GitHubStats>,
  leetcode: PlatformResult<LeetCodeStats>,
  codeforces: PlatformResult<CodeforcesStats>
): { total: number; breakdown: DevScoreBreakdown } {
  const ghScore  = github.status === 'success' && github.data ? calcGitHubScore(github.data) : 0;
  const lcScore  = leetcode.status === 'success' && leetcode.data ? calcLeetCodeScore(leetcode.data) : 0;
  const cfScore  = codeforces.status === 'success' && codeforces.data ? calcCodeforcesScore(codeforces.data) : 0;

  const total = Math.min(100, ghScore + lcScore + cfScore);

  return {
    total,
    breakdown: {
      total,
      github: ghScore,
      leetcode: lcScore,
      codeforces: cfScore,
    },
  };
}
