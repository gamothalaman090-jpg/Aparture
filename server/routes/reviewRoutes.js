import express from 'express';
import { createReview, getCameraReviews } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/camera/:cameraId', getCameraReviews);

export default router;
