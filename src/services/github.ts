/**
 * GITHUB TELEMETRY SERVICE
 * -----------------------------------------------------------------------------
 * File: src/services/github.ts
 * Purpose: Fetches verified GitHub activity metrics from the DEVATLAS backend.
 *
 * Backend endpoint:
 *   GET /api/github/stats  (authenticated — requires session cookie)
 *
 * The backend proxies the GitHub API using the user's stored OAuth token.
 * No token is ever exposed to this frontend module.
 */

import { GitHubStats } from '../types';
import { fetchGitHubStats as fetchFromBackend } from '../lib/api';

/**
 * Returns initial zero-state GitHub statistics.
 * DevAtlas NEVER fabricates data — fresh accounts start at actual zero.
 */
export function getInitialGitHubStats(username: string = ''): GitHubStats {
  return {
    username,
    repositories: 0,
    commits: 0,
    languagesCount: 0,
    topLanguages: []
  };
}

/**
 * Fetches real GitHub telemetry from the DEVATLAS Express backend.
 * The backend calls the GitHub API with the user's OAuth token.
 *
 * Returns real data. If the backend call fails, the error propagates
 * to the caller so the UI can show an error state — not fake data.
 */
export async function fetchGitHubTelemetry(_username: string): Promise<GitHubStats> {
  // _username is unused: the backend derives username from the session
  const stats = await fetchFromBackend();
  return stats;
}
