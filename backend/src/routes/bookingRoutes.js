import express from 'express';
import { createBooking, getMyBookings, getHostStats } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/host-stats', protect, getHostStats);

router.route('/')
    .post(protect, createBooking);

router.route('/mybookings')
    .get(protect, getMyBookings);

export default router;
