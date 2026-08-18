import * as bookingService from '../services/bookingService.js';

export const createBooking = async (req, res, next) => {
  try {
    const { cameraId, startDate, endDate, notes } = req.body;
    const booking = await bookingService.createBooking({
      userId: req.user._id,
      cameraId,
      startDate,
      endDate,
      notes,
    });
    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getUserBookings(req.user._id);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id, req.user._id, req.user.role);
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.id, req.user._id);
    res.json(booking);
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings(req.query.status);
    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, damageFee, actualReturnDate, notes } = req.body;
    const booking = await bookingService.updateBookingStatus(req.params.id, {
      status,
      damageFee,
      actualReturnDate,
      notes,
    });
    res.json(booking);
  } catch (error) {
    next(error);
  }
};
