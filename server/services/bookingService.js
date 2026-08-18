import Booking from '../models/Booking.js';
import Camera from '../models/Camera.js';
import { CameraDomain } from '../domain/CameraDomain.js';
import { BookingCalculator } from '../domain/BookingCalculator.js';

export const createBooking = async ({ userId, cameraId, startDate, endDate, notes }) => {
  const camera = await Camera.findById(cameraId);
  if (!camera || !camera.isActive) {
    throw new Error('Selected camera is not available for rental.');
  }

  // Instantiate OOP CameraDomain object
  const cameraDomain = new CameraDomain({
    id: camera._id,
    name: camera.name,
    brand: camera.brand,
    category: camera.categoryId,
    description: camera.description,
    specs: camera.specs,
    imageUrls: camera.imageUrls,
    dailyRate: camera.dailyRate,
    depositAmount: camera.depositAmount,
    stockQuantity: camera.stockQuantity,
    condition: camera.condition,
    isActive: camera.isActive,
    bookedRanges: camera.bookedRanges,
  });

  // FR15: Availability double-booking check
  if (!cameraDomain.isAvailableForRange(startDate, endDate)) {
    throw new Error('This camera is already reserved for the selected date range.');
  }

  // FR18: Duration check (1-14 days) and pricing calculation using OOP BookingCalculator
  const pricing = BookingCalculator.calculatePricing({
    dailyRate: camera.dailyRate,
    depositAmount: camera.depositAmount,
    startDate,
    endDate,
  });

  const booking = await Booking.create({
    userId,
    cameraId,
    startDate,
    endDate,
    status: 'confirmed',
    dailyRateSnapshot: pricing.dailyRateSnapshot,
    depositAmount: pricing.depositAmount,
    rentalFee: pricing.rentalFee,
    totalPrice: pricing.totalPrice,
    notes: notes || '',
  });

  // Update Camera denormalized bookedRanges array
  camera.bookedRanges.push({
    startDate,
    endDate,
    bookingId: booking._id,
  });
  await camera.save();

  return await Booking.findById(booking._id).populate('cameraId').populate('userId', 'name email');
};

export const getUserBookings = async (userId) => {
  return await Booking.find({ userId })
    .populate('cameraId', 'name brand imageUrls dailyRate condition')
    .sort({ createdAt: -1 });
};

export const getBookingById = async (id, userId, userRole) => {
  const booking = await Booking.findById(id)
    .populate('cameraId')
    .populate('userId', 'name email');

  if (!booking) throw new Error('Booking not found');

  if (userRole !== 'admin' && booking.userId._id.toString() !== userId.toString()) {
    throw new Error('Not authorized to view this booking');
  }

  return booking;
};

export const cancelBooking = async (id, userId) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error('Booking not found');

  if (booking.userId.toString() !== userId.toString()) {
    throw new Error('Not authorized to cancel this booking');
  }

  if (new Date(booking.startDate) <= new Date()) {
    throw new Error('Cannot cancel booking on or after the start date.');
  }

  booking.status = 'cancelled';
  await booking.save();

  // Remove range from Camera bookedRanges
  await Camera.updateOne(
    { _id: booking.cameraId },
    { $pull: { bookedRanges: { bookingId: booking._id } } }
  );

  return booking;
};

export const getAllBookings = async (statusFilter) => {
  let query = {};
  if (statusFilter && statusFilter !== 'all') {
    query.status = statusFilter;
  }
  return await Booking.find(query)
    .populate('cameraId', 'name brand categoryId dailyRate depositAmount')
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });
};

export const updateBookingStatus = async (id, { status, damageFee = 0, actualReturnDate, notes }) => {
  const booking = await Booking.findById(id);
  if (!booking) throw new Error('Booking not found');

  booking.status = status;
  if (notes) booking.notes = notes;

  if (status === 'returned' || status === 'damaged' || status === 'overdue') {
    const returnDate = actualReturnDate || new Date();
    booking.actualReturnDate = returnDate;

    // Calculate late fee if returned past end date using BookingCalculator
    const lateFee = BookingCalculator.calculateLateFee(
      booking.endDate,
      returnDate,
      booking.dailyRateSnapshot
    );

    booking.lateFee = lateFee;
    booking.damageFee = Number(damageFee) || 0;

    // Remove from active bookedRanges once returned/completed
    if (status === 'returned' || status === 'damaged') {
      await Camera.updateOne(
        { _id: booking.cameraId },
        { $pull: { bookedRanges: { bookingId: booking._id } } }
      );
    }
  }

  await booking.save();
  return await Booking.findById(booking._id).populate('cameraId').populate('userId', 'name email');
};
