import express from 'express';
import { getAllHostRequests, approveHostRequest, rejectHostRequest, getDashboardStats } from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getDashboardStats);
router.get('/host-requests', protect, admin, getAllHostRequests);
router.put('/approve-host/:id', protect, admin, approveHostRequest);
router.put('/reject-host/:id', protect, admin, rejectHostRequest);

export default router;
