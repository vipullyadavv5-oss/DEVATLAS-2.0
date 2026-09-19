import { Router } from 'express';
import { codeforcesController } from '../controllers/codeforces.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

/**
 * GET /api/codeforces/profile?handle={codeforcesHandle}
 * Public endpoint — Codeforces API is fully public.
 */
router.get('/profile', asyncHandler(codeforcesController.getProfile));

export default router;
