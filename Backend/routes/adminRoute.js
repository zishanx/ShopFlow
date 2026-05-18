import express from 'express';
import { getStats } from '../controllers/adminController.js';
import  protect  from '../middleware/authMiddleware.js';
import  admin  from '../middleware/adminMiddleware.js';

const router = express.Router()

router.get("/stats", protect, admin, getStats)

export default router
