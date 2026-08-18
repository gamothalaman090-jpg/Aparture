import Booking from '../models/Booking.js';
import Camera from '../models/Camera.js';
import User from '../models/User.js';

export const getDashboardStats = async () => {
  const allBookings = await Booking.find({})
    .populate('cameraId', 'name brand dailyRate')
    .populate('userId', 'name email');

  const totalCameras = await Camera.countDocuments({ isActive: true });
  const totalCustomers = await User.countDocuments({ role: 'customer' });

  // FR14 Metrics computed using explicit array operations
  const activeRentalsCount = allBookings.filter(b => b.status === 'ongoing' || b.status === 'confirmed').length;
  const overdueRentalsCount = allBookings.filter(b => b.status === 'overdue').length;

  // Total revenue calculated via array reduce
  const totalRevenue = allBookings.reduce((sum, b) => {
    if (b.status !== 'cancelled') {
      return sum + (b.rentalFee || 0) + (b.lateFee || 0) + (b.damageFee || 0);
    }
    return sum;
  }, 0);

  // Calculate top rented cameras via aggregation/array map & reduce
  const cameraRentalCounts = allBookings.reduce((acc, b) => {
    if (b.cameraId) {
      const camId = b.cameraId._id.toString();
      if (!acc[camId]) {
        acc[camId] = {
          id: camId,
          name: b.cameraId.name,
          brand: b.cameraId.brand,
          count: 0,
          totalRevenue: 0,
        };
      }
      acc[camId].count += 1;
      acc[camId].totalRevenue += (b.rentalFee || 0);
    }
    return acc;
  }, {});

  const mostRentedItems = Object.values(cameraRentalCounts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentOrders = allBookings.slice(0, 8);

  return {
    totalCameras,
    totalCustomers,
    activeRentalsCount,
    overdueRentalsCount,
    totalRevenue,
    mostRentedItems,
    recentOrders,
  };
};
