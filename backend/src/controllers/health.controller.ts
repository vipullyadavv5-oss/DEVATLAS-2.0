/**
 * HEALTH CHECK CONTROLLER
 * -----------------------------------------------------------------------------
 * File: backend/src/controllers/health.controller.ts
 * Purpose: Returns server status. Used for uptime monitoring and deployment checks.
 */

import { Request, Response } from 'express';
import { sendSuccess } from '../utils/apiResponse';
import { config } from '../config/env';

export const healthController = {
  check: (_req: Request, res: Response): void => {
    sendSuccess(res, {
      message: 'DEVATLAS API is running',
      environment: config.nodeEnv,
      timestamp: new Date().toISOString(),
    });
  },
};
