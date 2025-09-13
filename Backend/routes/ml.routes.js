import { Router } from 'express';
import { mlHealth, churnPrediction, recommendations } from '../contollers/ml.controller.js';

const router = Router();

router.get('/health', mlHealth);
router.post('/churn', churnPrediction);
router.post('/recommendations', recommendations);

export default router;
