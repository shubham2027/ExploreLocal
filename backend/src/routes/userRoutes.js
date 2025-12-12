import express from 'express';
import { requestHost, restoreAdmin, getUserStats } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, getUserStats);
router.post('/request-host', protect, requestHost);
router.put('/restore-admin', protect, restoreAdmin);

export default router;
