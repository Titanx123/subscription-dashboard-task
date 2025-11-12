import express from 'express';
import { getAllPlans, getPlanById } from '../controllers/plan.controller.js';

const router = express.Router();

router.get('/', getAllPlans);
router.get('/:id', getPlanById);

export default router;