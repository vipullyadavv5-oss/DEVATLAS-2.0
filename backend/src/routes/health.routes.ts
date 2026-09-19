import { Router } from 'express';
import { healthController } from '../controllers/health.controller';

const router = Router();

/** GET /api/health */
router.get('/', healthController.check);

export default router;
