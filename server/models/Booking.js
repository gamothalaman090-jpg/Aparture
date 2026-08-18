import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cameraId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Camera',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'ongoing', 'returned', 'overdue', 'cancelled', 'damaged'],
    default: 'confirmed',
  },
  dailyRateSnapshot: {
    type: Number,
    required: true,
  },
  depositAmount: {
    type: Number,
    required: true,
  },
  rentalFee: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  lateFee: {
    type: Number,
    default: 0,
  },
  damageFee: {
    type: Number,
    default: 0,
  },
  actualReturnDate: {
    type: Date,
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

bookingSchema.index({ userId: 1, cameraId: 1, status: 1 });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
