import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

/**
 * GET /api/profile/:username?leetcode=...&codeforces=...
 * Public unified developer profile endpoint.
 * Optional query params for LeetCode and Codeforces data.
 */
router.get('/:username', asyncHandler(profileController.getPublicProfile));

export default router;
