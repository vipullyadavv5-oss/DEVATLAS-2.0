/**
 * DEVSCORE CALCULATION ALGORITHM & INITIAL STATE UTILITIES
 * -----------------------------------------------------------------------------
 * File: src/utils/devScore.ts
 * Purpose: Computes the overall DevScore based on verified platform telemetry.
 * 
 * Score Formula Weights:
 * - GitHub Activity Telemetry: 40% (Commits, Repos, Language Diversity)
 * - LeetCode Problem Index:   35% (Problem Difficulty Ratios & Count)
 * - Codeforces Elo Rating:    25% (Contest Rating & Rank Tier)
 * 
 * DevScore Integrity Guarantee:
 * Unconnected or empty platforms contribute 0 score. No fake baseline points are awarded.
 */

import { UserProfile } from '../types';

/**
 * Calculates DevScore (0 to 100) from verified telemetry data.
 * 
 * @param profile The current UserProfile object
 * @returns Integer score between 0 and 100
 */
export function calculateDevScore(profile: UserProfile): number {
  let score = 0;

  // 1. GitHub Score Contribution (Max 40 points)
  if (profile.githubState === 'connected') {
    const { commits, repositories, languagesCount } = profile.githubStats;
    const commitScore = Math.min(25, (commits / 500) * 25);
    const repoScore = Math.min(10, (repositories / 20) * 10);
    const langScore = Math.min(5, (languagesCount / 8) * 5);
    score += commitScore + repoScore + langScore;
  }

  // 2. LeetCode Score Contribution (Max 35 points)
  if (profile.leetcodeState === 'connected') {
    const { easySolved, mediumSolved, hardSolved } = profile.leetcodeStats;
    const lcScore = (easySolved * 0.05) + (mediumSolved * 0.15) + (hardSolved * 0.35);
    score += Math.min(35, lcScore);
  }

  // 3. Codeforces Score Contribution (Max 25 points)
  if (profile.codeforcesState === 'connected') {
    const { rating } = profile.codeforcesStats;
    const cfScore = (rating / 2000) * 25;
    score += Math.min(25, Math.max(0, cfScore));
  }

  return Math.round(score);
}

/**
 * Creates a clean initial user profile for brand-new users.
 * All platform metrics default to actual zero.
 */
export function createInitialUserProfile(): UserProfile {
  return {
    id: 'user_dev_01',
    name: 'Alex Developer',
    githubUsername: 'alexdev',
    avatarUrl: '',
    leetcodeUsername: null,
    codeforcesHandle: null,
    isPublicProfile: false, // Default: PRIVATE as per requirements
    devScore: 0,
    lastSyncedAt: null,
    
    githubState: 'not_synced',
    leetcodeState: 'not_connected',
    codeforcesState: 'not_connected',

    githubStats: {
      username: 'alexdev',
      repositories: 0,
      commits: 0,
      languagesCount: 0,
      topLanguages: []
    },

    leetcodeStats: {
      username: '',
      totalSolved: 0,
      easySolved: 0,
      mediumSolved: 0,
      hardSolved: 0
    },

    codeforcesStats: {
      handle: '',
      rating: 0,
      rank: '—',
      contestsCount: 0
    },

    skills: {
      problemSolving: 0,
      algorithms: 0,
      dataStructures: 0,
      openSource: 0
    }
  };
}
