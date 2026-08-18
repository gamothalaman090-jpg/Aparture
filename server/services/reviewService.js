import Review from '../models/Review.js';
import Booking from '../models/Booking.js';

export const createReview = async ({ userId, cameraId, bookingId, rating, comment }) => {
  // FR8: Verify user has a valid completed rental for this camera
  const booking = await Booking.findOne({
    _id: bookingId,
    userId,
    cameraId,
    status: { $in: ['returned', 'damaged'] },
  });

  if (!booking) {
    throw new Error('FR8 Violation: You can only review gear after completing a rental return.');
  }

  // Check if review already exists for this booking
  const existing = await Review.findOne({ userId, bookingId });
  if (existing) {
    throw new Error('You have already submitted a review for this rental booking.');
  }

  return await Review.create({
    userId,
    cameraId,
    bookingId,
    rating,
    comment,
  });
};

export const getCameraReviews = async (cameraId) => {
  return await Review.find({ cameraId })
    .populate('userId', 'name')
    .sort({ createdAt: -1 });
};
