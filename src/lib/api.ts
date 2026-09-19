/// <reference types="vite/client" />

/**
 * FRONTEND API CLIENT
 * -----------------------------------------------------------------------------
 * File: src/lib/api.ts
 * Purpose: Centralized HTTP client for all frontend → backend communication.
 *
 * All API calls go through this single module.
 * The backend URL is configurable via VITE_API_URL environment variable.
 * No backend secrets are stored here — this runs in the browser.
 *
 * Usage:
 *   import { apiClient } from '../lib/api';
 *   const data = await apiClient.get('/github/stats');
 */

// ─── Configuration ─────────────────────────────────────────────────────────────

/**
 * Backend base URL from environment.
 * In development: http://localhost:5000
 * In production:  set VITE_API_URL in your deployment environment
 */
const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000';
const API_ROOT = `${API_BASE_URL}/api`;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// ─── Core Fetch Wrapper ───────────────────────────────────────────────────────

/**
 * Makes an authenticated fetch request to the backend.
 * Automatically includes session cookies (credentials: 'include').
 * Throws a typed ApiError object on non-2xx responses.
 */
async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  path: string,
  body?: unknown
): Promise<T> {
  const url = `${API_ROOT}${path}`;

  const options: RequestInit = {
    method,
    credentials: 'include', // Required for session cookies in cross-origin requests
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const json: ApiResponse<T> = await response.json();

  if (!json.success) {
    // Throw the structured error so callers can handle it
    throw new Error(json.error.message ?? 'An unknown error occurred');
  }

  return json.data;
}

// ─── Typed API Methods ────────────────────────────────────────────────────────

export const apiClient = {
  get:    <T>(path: string)              => request<T>('GET',    path),
  post:   <T>(path: string, body: unknown) => request<T>('POST',   path, body),
  put:    <T>(path: string, body: unknown) => request<T>('PUT',    path, body),
  delete: <T>(path: string)              => request<T>('DELETE', path),
};

// ─── Typed API Endpoints ──────────────────────────────────────────────────────
// Convenience wrappers for each endpoint with correct TypeScript types.

import type { GitHubStats, LeetCodeStats, CodeforcesStats } from '../types';

/** GET /api/auth/session */
export async function fetchSession(): Promise<{
  authenticated: boolean;
  user: { githubUsername: string; name: string; avatarUrl: string } | null;
}> {
  return apiClient.get('/auth/session');
}

/** POST /api/auth/logout */
export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout', {});
}

/** GET /api/github/stats */
export async function fetchGitHubStats(): Promise<GitHubStats> {
  return apiClient.get('/github/stats');
}

/** GET /api/leetcode/profile?username=... */
export async function fetchLeetCodeProfile(username: string): Promise<LeetCodeStats> {
  return apiClient.get(`/leetcode/profile?username=${encodeURIComponent(username)}`);
}

/** GET /api/codeforces/profile?handle=... */
export async function fetchCodeforcesProfile(handle: string): Promise<CodeforcesStats> {
  return apiClient.get(`/codeforces/profile?handle=${encodeURIComponent(handle)}`);
}

/** GET /api/profile/:username?leetcode=...&codeforces=... */
export async function fetchPublicProfile(
  githubUsername: string,
  leetcodeUsername?: string | null,
  codeforcesHandle?: string | null
): Promise<unknown> {
  const params = new URLSearchParams();
  if (leetcodeUsername) params.set('leetcode', leetcodeUsername);
  if (codeforcesHandle) params.set('codeforces', codeforcesHandle);

  const query = params.toString() ? `?${params.toString()}` : '';
  return apiClient.get(`/profile/${encodeURIComponent(githubUsername)}${query}`);
}

/** GET /api/score/:username?leetcode=...&codeforces=... */
export async function fetchDevScore(
  githubUsername: string,
  leetcodeUsername?: string | null,
  codeforcesHandle?: string | null
): Promise<{ devScore: number; breakdown: Record<string, number> }> {
  const params = new URLSearchParams();
  if (leetcodeUsername) params.set('leetcode', leetcodeUsername);
  if (codeforcesHandle) params.set('codeforces', codeforcesHandle);

  const query = params.toString() ? `?${params.toString()}` : '';
  return apiClient.get(`/score/${encodeURIComponent(githubUsername)}${query}`);
}

/** GET /api/health */
export async function checkHealth(): Promise<{ message: string }> {
  return apiClient.get('/health');
}
