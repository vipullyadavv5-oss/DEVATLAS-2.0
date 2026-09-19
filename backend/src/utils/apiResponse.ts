/**
 * API RESPONSE UTILITIES
 * -----------------------------------------------------------------------------
 * File: backend/src/utils/apiResponse.ts
 * Purpose: Provides standardized success and error response helpers.
 *
 * All API responses follow a consistent envelope:
 *
 * Success:
 *   { "success": true, "data": { ... } }
 *
 * Error:
 *   { "success": false, "error": { "code": "...", "message": "..." } }
 *
 * This consistency allows the frontend to use a single response handler.
 */

import { Response } from 'express';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

// ─── Error Code Registry ──────────────────────────────────────────────────────

export const ErrorCode = {
  BAD_REQUEST:        'BAD_REQUEST',
  UNAUTHORIZED:       'UNAUTHORIZED',
  FORBIDDEN:          'FORBIDDEN',
  NOT_FOUND:          'NOT_FOUND',
  CONFLICT:           'CONFLICT',
  VALIDATION_ERROR:   'VALIDATION_ERROR',
  RATE_LIMITED:       'RATE_LIMITED',
  INTERNAL_ERROR:     'INTERNAL_SERVER_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  GITHUB_API_ERROR:   'GITHUB_API_ERROR',
  LEETCODE_API_ERROR: 'LEETCODE_API_ERROR',
  CODEFORCES_API_ERROR:'CODEFORCES_API_ERROR',
  SERVICE_UNAVAILABLE:'SERVICE_UNAVAILABLE',
} as const;

export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode];

// ─── Response Helpers ─────────────────────────────────────────────────────────

/**
 * Sends a standardized success response.
 */
export function sendSuccess<T>(
  res: Response,
  data: T,
  statusCode: number = 200,
  message?: string
): void {
  const body: ApiSuccessResponse<T> = { success: true, data };
  if (message) body.message = message;
  res.status(statusCode).json(body);
}

/**
 * Sends a standardized error response.
 * Stack traces are never included in the response body.
 */
export function sendError(
  res: Response,
  statusCode: number,
  code: ErrorCodeType,
  message: string
): void {
  const body: ApiErrorResponse = {
    success: false,
    error: { code, message },
  };
  res.status(statusCode).json(body);
}

// ─── Custom Application Error ─────────────────────────────────────────────────

/**
 * AppError is a structured error that carries HTTP status and error code.
 * Thrown from services/controllers and caught by the error middleware.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCodeType;
  public readonly isOperational: boolean;

  constructor(
    statusCode: number,
    code: ErrorCodeType,
    message: string,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

// ─── Common Pre-built Errors ──────────────────────────────────────────────────

export const Errors = {
  unauthorized: () =>
    new AppError(401, ErrorCode.UNAUTHORIZED, 'Authentication required'),

  forbidden: () =>
    new AppError(403, ErrorCode.FORBIDDEN, 'Access denied'),

  notFound: (resource: string = 'Resource') =>
    new AppError(404, ErrorCode.NOT_FOUND, `${resource} not found`),

  badRequest: (message: string) =>
    new AppError(400, ErrorCode.BAD_REQUEST, message),

  validationError: (message: string) =>
    new AppError(422, ErrorCode.VALIDATION_ERROR, message),

  githubApiError: (message: string = 'Unable to fetch GitHub data') =>
    new AppError(502, ErrorCode.GITHUB_API_ERROR, message),

  leetcodeApiError: (message: string = 'Unable to fetch LeetCode data') =>
    new AppError(502, ErrorCode.LEETCODE_API_ERROR, message),

  codeforcesApiError: (message: string = 'Unable to fetch Codeforces data') =>
    new AppError(502, ErrorCode.CODEFORCES_API_ERROR, message),

  internal: () =>
    new AppError(500, ErrorCode.INTERNAL_ERROR, 'An unexpected error occurred', false),
};
