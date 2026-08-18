import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Camera from '../models/Camera.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';

dotenv.config();

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/camera_rental_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing collection data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Camera.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});

    console.log('Cleared existing database records.');

    // 1. Create Users (1 Admin, 2 Customers)
    const adminUser = await User.create({
      name: 'Studio Admin',
      email: 'admin@aperture.com',
      passwordHash: 'admin123', // Will be hashed by pre-save hook
      role: 'admin',
    });

    const customerUser1 = await User.create({
      name: 'Alex Rivera',
      email: 'alex@creatives.com',
      passwordHash: 'customer123',
      role: 'customer',
    });

    const customerUser2 = await User.create({
      name: 'Sophia Chen',
      email: 'sophia@filmmaker.org',
      passwordHash: 'customer123',
      role: 'customer',
    });

    console.log('Seeded Users: Admin & 2 Customers.');

    // 2. Create Categories
    const catMirrorless = await Category.create({
      name: 'Mirrorless Cameras',
      description: 'High-performance full-frame & APS-C hybrid cameras for photo & video.',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    });

    const catCinema = await Category.create({
      name: 'Cinema Cameras',
      description: 'Professional cinema rigs with high dynamic range and RAW capture capabilities.',
      imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    });

    const catLenses = await Category.create({
      name: 'Cinema & Photo Lenses',
      description: 'Prime and zoom cinema lenses offering supreme sharpness, fast apertures, and bokeh.',
      imageUrl: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80',
    });

    const catDrones = await Category.create({
      name: 'Aerial Drones & Gimbals',
      description: '4K/8K Stabilized camera drones and 3-axis motorized hand gimbals.',
      imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    });

    console.log('Seeded Categories.');

    // 3. Create Cameras
    const camera1 = await Camera.create({
      name: 'Sony FX3 Cinema Camera',
      brand: 'Sony',
      categoryId: catCinema._id,
      description: 'Full-frame cinema line camera featuring S-Cinetone, 4K 120p recording, and active cooling for unlimited recording duration.',
      specs: {
        sensor: 'Full-Frame 35mm CMOS',
        resolution: '12.1 MP',
        mount: 'Sony E-Mount',
        videoResolution: '4K DCI @ 120fps / 16-Bit RAW',
        weight: '715 g',
        isoRange: '80 - 409,600',
        fps: '120 fps',
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=1200&q=80'
      ],
      dailyRate: 110,
      depositAmount: 500,
      stockQuantity: 3,
      condition: 'new',
      isActive: true,
      bookedRanges: [],
    });

    const camera2 = await Camera.create({
      name: 'Canon EOS R5 C',
      brand: 'Canon',
      categoryId: catMirrorless._id,
      description: 'True hybrid 8K full-frame camera combining EOS Cinema tools with 45MP high-speed still photography.',
      specs: {
        sensor: 'Full-Frame CMOS',
        resolution: '45.0 MP',
        mount: 'Canon RF Mount',
        videoResolution: '8K 60p RAW / 4K 120p',
        weight: '680 g',
        isoRange: '100 - 51,200',
        fps: '20 fps',
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80'
      ],
      dailyRate: 125,
      depositAmount: 600,
      stockQuantity: 2,
      condition: 'good',
      isActive: true,
      bookedRanges: [],
    });

    const camera3 = await Camera.create({
      name: 'RED Komodo 6K Cinema Package',
      brand: 'RED Digital Cinema',
      categoryId: catCinema._id,
      description: 'Super35 global shutter cinema camera producing iconic RED color science and 6K REDCODE RAW output.',
      specs: {
        sensor: 'Super35 Global Shutter CMOS',
        resolution: '19.9 MP',
        mount: 'Canon RF Mount',
        videoResolution: '6K 40fps RAW / 4K 60fps',
        weight: '950 g',
        isoRange: '800 Base ISO',
        fps: '40 fps @ 6K',
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
      ],
      dailyRate: 210,
      depositAmount: 1200,
      stockQuantity: 1,
      condition: 'new',
      isActive: true,
      bookedRanges: [],
    });

    const camera4 = await Camera.create({
      name: 'Sony FE 24-70mm f/2.8 GM II Lens',
      brand: 'Sony',
      categoryId: catLenses._id,
      description: 'The ultimate standard zoom lens featuring XA optical elements, dual XD linear motors, and exceptional sharpness.',
      specs: {
        sensor: 'Full-Frame Format',
        resolution: 'N/A',
        mount: 'Sony E-Mount',
        videoResolution: 'De-clicked aperture ring for video',
        weight: '695 g',
        isoRange: 'N/A',
        fps: 'N/A',
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1200&q=80'
      ],
      dailyRate: 45,
      depositAmount: 250,
      stockQuantity: 5,
      condition: 'good',
      isActive: true,
      bookedRanges: [],
    });

    const camera5 = await Camera.create({
      name: 'DJI Mavic 3 Pro Cine Drone',
      brand: 'DJI',
      categoryId: catDrones._id,
      description: 'Triple-camera aerial drone equipped with a Hasselblad 4/3 CMOS camera supporting Apple ProRes 422 HQ.',
      specs: {
        sensor: '4/3 CMOS Hasselblad',
        resolution: '20 MP',
        mount: 'Integrated Tri-Camera',
        videoResolution: '5.1K @ 50fps / 4K @ 120fps',
        weight: '958 g',
        isoRange: '100 - 6,400',
        fps: '120 fps',
      },
      imageUrls: [
        'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80'
      ],
      dailyRate: 150,
      depositAmount: 700,
      stockQuantity: 2,
      condition: 'good',
      isActive: true,
      bookedRanges: [],
    });

    console.log('Seeded 5 Gear Items.');

    // 4. Create Sample Past & Active Bookings
    const today = new Date();
    const pastStart = new Date(today);
    pastStart.setDate(today.getDate() - 10);
    const pastEnd = new Date(today);
    pastEnd.setDate(today.getDate() - 7);

    const pastBooking = await Booking.create({
      userId: customerUser1._id,
      cameraId: camera1._id,
      startDate: pastStart,
      endDate: pastEnd,
      status: 'returned',
      dailyRateSnapshot: camera1.dailyRate,
      depositAmount: camera1.depositAmount,
      rentalFee: camera1.dailyRate * 3,
      totalPrice: (camera1.dailyRate * 3) + camera1.depositAmount,
      actualReturnDate: pastEnd,
    });

    // Seed Review for returned booking (FR8)
    await Review.create({
      userId: customerUser1._id,
      cameraId: camera1._id,
      bookingId: pastBooking._id,
      rating: 5,
      comment: 'Exceptional camera! The Sony FX3 performed flawlessly during our commercial video shoot in low light.',
    });

    const activeStart = new Date(today);
    activeStart.setDate(today.getDate() + 2);
    const activeEnd = new Date(today);
    activeEnd.setDate(today.getDate() + 5);

    const activeBooking = await Booking.create({
      userId: customerUser2._id,
      cameraId: camera2._id,
      startDate: activeStart,
      endDate: activeEnd,
      status: 'confirmed',
      dailyRateSnapshot: camera2.dailyRate,
      depositAmount: camera2.depositAmount,
      rentalFee: camera2.dailyRate * 3,
      totalPrice: (camera2.dailyRate * 3) + camera2.depositAmount,
    });

    // Push active range to camera2
    camera2.bookedRanges.push({
      startDate: activeStart,
      endDate: activeEnd,
      bookingId: activeBooking._id,
    });
    await camera2.save();

    console.log('Seeded Sample Bookings & Verified Review.');
    console.log('Database Seed Completed Successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Seed Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
