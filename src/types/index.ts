/**
 * DEVATLAS SYSTEM TYPE DEFINITIONS
 * -----------------------------------------------------------------------------
 * File: src/types/index.ts
 * Purpose: Central TypeScript interfaces and data models for DevAtlas.
 *
 * Product Integrity Guarantee:
 * New users start with exact 0 values. DevAtlas NEVER fabricates developer stats.
 */

// Connection state representation across platforms
export type ConnectionState = 
  | 'not_connected' // User has not linked this platform handle
  | 'not_synced'    // Platform linked, but data has not been fetched yet
  | 'loading'       // Telemetry fetch currently in flight
  | 'connected'     // Data successfully retrieved and verified
  | 'error';        // Fetch attempt failed (network/API error)

// GitHub Telemetry Data Model
export interface GitHubStats {
  username: string;
  repositories: number;
  commits: number;
  languagesCount: number;
  topLanguages: string[];
}

// LeetCode Telemetry Data Model
export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

// Codeforces Telemetry Data Model
export interface CodeforcesStats {
  handle: string;
  rating: number;
  rank: string;
  contestsCount: number;
}

// Skill Breakdown Percentages (0% to 100%)
export interface SkillBreakdown {
  problemSolving: number;
  algorithms: number;
  dataStructures: number;
  openSource: number;
}

// User Profile Data Structure
export interface UserProfile {
  id: string;
  name: string;
  githubUsername: string;
  avatarUrl: string;
  leetcodeUsername: string | null;
  codeforcesHandle: string | null;
  isPublicProfile: boolean;
  devScore: number;
  lastSyncedAt: string | null;
  
  // Platform Connection States
  githubState: ConnectionState;
  leetcodeState: ConnectionState;
  codeforcesState: ConnectionState;

  // Platform Telemetry
  githubStats: GitHubStats;
  leetcodeStats: LeetCodeStats;
  codeforcesStats: CodeforcesStats;

  // Skill Metrics
  skills: SkillBreakdown;
}

// Active UI View / Navigation Screen
export type ActiveScreen = 'login' | 'onboarding' | 'dashboard' | 'settings' | 'public_profile';
