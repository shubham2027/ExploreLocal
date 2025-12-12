import express from 'express';
import {
    getExperiences,
    getExperienceById,
    createExperience
} from '../controllers/experienceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getExperiences)
    .post(protect, createExperience);

router.route('/:id')
    .get(getExperienceById);

export default router;
