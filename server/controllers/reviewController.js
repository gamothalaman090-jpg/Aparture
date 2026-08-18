import * as reviewService from '../services/reviewService.js';

export const createReview = async (req, res, next) => {
  try {
    const { cameraId, bookingId, rating, comment } = req.body;
    const review = await reviewService.createReview({
      userId: req.user._id,
      cameraId,
      bookingId,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

export const getCameraReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getCameraReviews(req.params.cameraId);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};
