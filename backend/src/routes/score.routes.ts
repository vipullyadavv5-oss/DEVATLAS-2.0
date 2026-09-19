import { Router } from 'express';
import { scoreController } from '../controllers/score.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

/**
 * GET /api/score/:username?leetcode=...&codeforces=...
 * Computes and returns the DevScore for a developer.
 */
router.get('/:username', asyncHandler(scoreController.getScore));

export default router;
