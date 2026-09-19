/**
 * GITHUB OAUTH AUTHENTICATION SERVICE
 * -----------------------------------------------------------------------------
 * File: backend/src/services/auth.service.ts
 * Purpose: Handles the complete GitHub OAuth 2.0 flow server-side.
 *          GitHub secrets never leave the backend.
 *
 * Flow:
 *   1. generateAuthUrl()     → Client redirects to GitHub consent page
 *   2. exchangeCodeForToken() → Backend exchanges ?code= for access token
 *   3. getAuthenticatedUser() → Backend fetches user profile with token
 *   4. Session is created    → Token stored in server-side session only
 *
 * Security:
 *   GITHUB_CLIENT_SECRET is read from process.env via config.
 *   The access token is stored only in the express-session (server memory).
 *   It is NEVER sent to the frontend.
 */

import axios, { AxiosError } from 'axios';
import { config } from '../config/env';
import { AppError, ErrorCode } from '../utils/apiResponse';
import { getAuthenticatedUserProfile, GitHubProfile } from './github.service';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthenticatedUser {
  id: string;
  githubUsername: string;
  name: string;
  avatarUrl: string;
  accessToken: string; // Kept server-side; never forwarded to client
}

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

// ─── OAuth Functions ──────────────────────────────────────────────────────────

/**
 * Generates the GitHub OAuth authorization URL.
 * The user is redirected here to grant DevAtlas read-only access.
 */
export function generateGitHubAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: config.github.clientId,
    redirect_uri: config.github.callbackUrl,
    scope: 'read:user public_repo',  // Read-only: matches product trust policy
    allow_signup: 'true',
  });

  return `${config.github.oauthBase}/login/oauth/authorize?${params.toString()}`;
}

/**
 * Exchanges the GitHub OAuth callback code for an access token.
 * This is a server-to-server call — the client secret is used here
 * and NEVER exposed to the browser.
 */
export async function exchangeCodeForToken(code: string): Promise<string> {
  if (!config.github.clientId || !config.github.clientSecret) {
    throw new AppError(
      503,
      ErrorCode.SERVICE_UNAVAILABLE,
      'GitHub OAuth is not configured. Please set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.'
    );
  }

  try {
    const response = await axios.post<GitHubTokenResponse>(
      `${config.github.oauthBase}/login/oauth/access_token`,
      {
        client_id:     config.github.clientId,
        client_secret: config.github.clientSecret, // SECRET — server-side only
        code,
        redirect_uri:  config.github.callbackUrl,
      },
      {
        headers: { Accept: 'application/json' },
        timeout: 10000,
      }
    );

    const { access_token } = response.data;

    if (!access_token) {
      console.error('[Auth] GitHub did not return an access token');
      throw new AppError(502, ErrorCode.GITHUB_API_ERROR, 'Failed to obtain GitHub access token.');
    }

    return access_token;
  } catch (err) {
    if (err instanceof AppError) throw err;

    if (err instanceof AxiosError) {
      console.error(`[Auth] Token exchange failed — HTTP ${err.response?.status}`);
    }
    throw new AppError(502, ErrorCode.GITHUB_API_ERROR, 'GitHub OAuth token exchange failed.');
  }
}

/**
 * Fetches the GitHub user's profile using their access token
 * and normalizes it into our AuthenticatedUser structure.
 */
export async function buildAuthenticatedUser(accessToken: string): Promise<AuthenticatedUser> {
  const profile: GitHubProfile = await getAuthenticatedUserProfile(accessToken);

  return {
    id: String(profile.login),
    githubUsername: profile.login,
    name: profile.name ?? profile.login,
    avatarUrl: profile.avatar_url,
    accessToken, // Stored in session only — never sent to client
  };
}
