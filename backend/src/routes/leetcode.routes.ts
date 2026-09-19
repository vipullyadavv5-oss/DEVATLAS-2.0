import { Router } from 'express';
import { leetcodeController } from '../controllers/leetcode.controller';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

/**
 * GET /api/leetcode/profile?username={leetcodeUsername}
 * Public endpoint — LeetCode profiles are publicly accessible.
 * No auth required; the backend acts as a CORS-safe proxy.
 */
router.get('/profile', asyncHandler(leetcodeController.getProfile));

export default router;
