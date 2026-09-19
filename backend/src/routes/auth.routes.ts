import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

/** GET /api/auth/github — Redirect to GitHub OAuth */
router.get('/github', authController.initiateGitHubAuth);

/** GET /api/auth/callback — GitHub OAuth callback */
router.get('/callback', asyncHandler(authController.handleGitHubCallback));

/** GET /api/auth/session — Returns current session state (no token) */
router.get('/session', authController.getSession);

/** POST /api/auth/logout — Destroys session */
router.post('/logout', requireAuth, authController.logout);

export default router;
