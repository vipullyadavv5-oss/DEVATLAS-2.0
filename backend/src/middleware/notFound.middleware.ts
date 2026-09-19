/**
 * NOT-FOUND MIDDLEWARE
 * -----------------------------------------------------------------------------
 * File: backend/src/middleware/notFound.middleware.ts
 * Purpose: Catches all requests that didn't match any defined route and returns
 *          a clean 404 JSON response.
 *
 * Must be registered AFTER all routes in app.ts.
 *
 * Example:
 *   GET /api/does-not-exist
 *   → { "success": false, "error": { "code": "NOT_FOUND", "message": "Route not found" } }
 */

import { Request, Response } from 'express';
import { sendError, ErrorCode } from '../utils/apiResponse';

export function notFoundMiddleware(req: Request, res: Response): void {
  sendError(
    res,
    404,
    ErrorCode.NOT_FOUND,
    `Route not found: ${req.method} ${req.originalUrl}`
  );
}
