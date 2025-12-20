import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createTrip,
    getTrips,
    getTripById,
    addExperienceToTrip,
    removeExperienceFromTrip,
    updateTrip,
    deleteTrip
} from '../controllers/tripController.js';

const router = express.Router();

router.route('/')
    .post(protect, createTrip)
    .get(protect, getTrips);

router.route('/:id')
    .get(protect, getTripById)
    .put(protect, updateTrip)
    .delete(protect, deleteTrip);

router.route('/:id/experience')
    .post(protect, addExperienceToTrip);

router.route('/:id/experience/:expId')
    .delete(protect, removeExperienceFromTrip);

export default router;
