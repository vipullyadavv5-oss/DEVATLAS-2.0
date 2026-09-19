import { Router } from 'express';
import { githubController } from '../controllers/github.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

/** GET /api/github/profile — Authenticated user's GitHub profile */
router.get('/profile', requireAuth, asyncHandler(githubController.getProfile));

/** GET /api/github/stats — Authenticated user's GitHub statistics */
router.get('/stats', requireAuth, asyncHandler(githubController.getStats));

export default router;
