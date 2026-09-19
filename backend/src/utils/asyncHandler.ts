/**
 * ASYNC HANDLER UTILITY
 * -----------------------------------------------------------------------------
 * File: backend/src/utils/asyncHandler.ts
 * Purpose: Wraps async route handlers to automatically catch unhandled promise
 *          rejections and forward them to Express's error middleware.
 *
 * Without this wrapper, unhandled promise rejections in async route handlers
 * would silently crash the server or hang the request in older Express versions.
 *
 * Usage:
 *   router.get('/example', asyncHandler(async (req, res) => {
 *     const data = await someService.fetch(); // errors forwarded automatically
 *     sendSuccess(res, data);
 *   }));
 */

import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

/**
 * Wraps an async Express route handler.
 * Any thrown error or rejected promise is passed to next(error),
 * which triggers the centralized error middleware.
 */
export function asyncHandler(fn: AsyncRouteHandler): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
