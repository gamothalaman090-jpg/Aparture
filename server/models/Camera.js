import mongoose from 'mongoose';

const bookedRangeSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
}, { _id: false });

const cameraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Camera name is required'],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  specs: {
    sensor: String,
    resolution: String,
    mount: String,
    videoResolution: String,
    weight: String,
    isoRange: String,
    fps: String,
  },
  imageUrls: [{
    type: String,
  }],
  dailyRate: {
    type: Number,
    required: [true, 'Daily rate is required'],
    min: [0, 'Daily rate cannot be negative'],
  },
  depositAmount: {
    type: Number,
    required: [true, 'Deposit amount is required'],
    min: [0, 'Deposit amount cannot be negative'],
  },
  stockQuantity: {
    type: Number,
    required: true,
    default: 1,
    min: 0,
  },
  condition: {
    type: String,
    enum: ['new', 'good', 'fair'],
    default: 'good',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Denormalized booked ranges array for fast availability checks (FR15)
  bookedRanges: [bookedRangeSchema],
}, {
  timestamps: true,
});

// Index for category and brand filtering
cameraSchema.index({ categoryId: 1, brand: 1, dailyRate: 1 });

const Camera = mongoose.model('Camera', cameraSchema);
export default Camera;
