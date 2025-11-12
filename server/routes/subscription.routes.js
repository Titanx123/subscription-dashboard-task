import express from 'express';
import { subscribe, getMySubscription, cancelSubscription } from '../controllers/subscription.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

router.post('/subscribe/:planId', subscribe);
router.get('/my-subscription', getMySubscription);
router.post('/cancel', cancelSubscription);

export default router;