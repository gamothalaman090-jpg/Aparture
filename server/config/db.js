import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/camera_rental_db');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Log warning instead of exiting process so in-memory/mock fallback mode can operate if DB is offline
    console.warn("MongoDB is offline or unavailable. Ensure MongoDB server is running or configure MONGODB_URI.");
  }
};
