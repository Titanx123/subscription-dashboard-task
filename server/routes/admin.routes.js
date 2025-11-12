import express from 'express';
import { getAllSubscriptions, getStatistics } from '../controllers/admin.controller.js';
import { verifyToken, verifyAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(verifyToken);
router.use(verifyAdmin);

router.get('/subscriptions', getAllSubscriptions);
router.get('/statistics', getStatistics);

export default router;