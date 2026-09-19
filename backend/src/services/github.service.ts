/**
 * GITHUB API SERVICE
 * -----------------------------------------------------------------------------
 * File: backend/src/services/github.service.ts
 * Purpose: Real GitHub REST API v3 integration.
 *          Fetches profile, repositories, and commit statistics using
 *          the authenticated user's OAuth access token.
 *
 * APIs Used:
 *   GET https://api.github.com/user                      (authenticated user profile)
 *   GET https://api.github.com/users/{username}          (public user profile)
 *   GET https://api.github.com/users/{username}/repos    (public repositories)
 *   GET https://api.github.com/search/commits            (commit count)
 *
 * Security:
 *   The access token is ONLY used server-side. It is never sent to the frontend.
 */

import axios, { AxiosError } from 'axios';
import { config } from '../config/env';
import { Errors } from '../utils/apiResponse';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GitHubProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  html_url: string;
}

export interface GitHubStats {
  username: string;
  repositories: number;
  commits: number;
  languagesCount: number;
  topLanguages: string[];
}

export interface GitHubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

// ─── GitHub API Client ────────────────────────────────────────────────────────

function createGitHubClient(accessToken?: string) {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'DEVATLAS/2.0',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return axios.create({
    baseURL: config.github.apiBase,
    headers,
    timeout: 10000, // 10 second timeout
  });
}

// ─── Service Functions ────────────────────────────────────────────────────────

/**
 * Fetches the authenticated user's GitHub profile.
 * Requires a valid OAuth access token.
 */
export async function getAuthenticatedUserProfile(accessToken: string): Promise<GitHubProfile> {
  const client = createGitHubClient(accessToken);

  try {
    const response = await client.get<GitHubProfile>('/user');
    return response.data;
  } catch (err) {
    handleGitHubError(err, 'fetch authenticated user profile');
  }
}

/**
 * Fetches a public GitHub user profile by username.
 * No authentication required for public profiles.
 */
export async function getPublicUserProfile(username: string): Promise<GitHubProfile> {
  const client = createGitHubClient();

  try {
    const response = await client.get<GitHubProfile>(`/users/${username}`);
    return response.data;
  } catch (err) {
    handleGitHubError(err, `fetch profile for user '${username}'`);
  }
}

/**
 * Fetches GitHub stats: repository count, language diversity, commit count.
 * Uses the authenticated user's access token for higher rate limits.
 *
 * Note: GitHub does not have a direct "total commits" endpoint.
 * We count commits via the search API (authenticated, up to 1000 results).
 */
export async function getGitHubStats(
  username: string,
  accessToken?: string
): Promise<GitHubStats> {
  const client = createGitHubClient(accessToken);

  try {
    // 1. Get all non-forked public repositories
    const reposResponse = await client.get<GitHubRepo[]>(`/users/${username}/repos`, {
      params: {
        type: 'owner',
        per_page: 100,
        sort: 'updated',
      },
    });

    const repos = reposResponse.data.filter((r) => !r.fork);

    // 2. Extract unique languages
    const languagesSet = new Set(
      repos
        .map((r) => r.language)
        .filter((lang): lang is string => lang !== null && lang !== '')
    );
    const topLanguages = Array.from(languagesSet).slice(0, 5);

    // 3. Get commit count via search API (authenticated for higher rate limit)
    let commitCount = 0;
    if (accessToken) {
      try {
        const searchResponse = await client.get<{ total_count: number }>(
          '/search/commits',
          {
            params: { q: `author:${username}` },
            headers: {
              Accept: 'application/vnd.github.cloak-preview+json', // required for commits search
            },
          }
        );
        commitCount = searchResponse.data.total_count;
      } catch {
        // Commit search may fail without proper scopes — not fatal
        console.warn(`[GitHub] Could not fetch commit count for ${username} — using 0`);
        commitCount = 0;
      }
    }

    return {
      username,
      repositories: repos.length,
      commits: commitCount,
      languagesCount: languagesSet.size,
      topLanguages,
    };
  } catch (err) {
    handleGitHubError(err, `fetch stats for user '${username}'`);
  }
}

// ─── Error Handler ────────────────────────────────────────────────────────────

/**
 * Converts raw Axios/GitHub errors into safe AppErrors.
 * Never exposes OAuth tokens or raw GitHub error messages to clients.
 */
function handleGitHubError(err: unknown, action: string): never {
  if (err instanceof AxiosError) {
    const status = err.response?.status;

    // Log safely — never log the full response which may contain token info
    console.error(`[GitHub] Failed to ${action} — HTTP ${status ?? 'no response'}`);

    if (status === 401) {
      throw Errors.githubApiError('GitHub authorization failed. Token may be expired.');
    }
    if (status === 403) {
      throw Errors.githubApiError('GitHub rate limit exceeded or access denied.');
    }
    if (status === 404) {
      throw Errors.githubApiError(`GitHub user not found.`);
    }
    if (status === 422) {
      throw Errors.githubApiError('Invalid request to GitHub API.');
    }
  }

  console.error(`[GitHub] Unexpected error during '${action}'`);
  throw Errors.githubApiError();
}
