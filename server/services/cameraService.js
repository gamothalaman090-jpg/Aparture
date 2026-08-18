import Camera from '../models/Camera.js';
import Review from '../models/Review.js';
import { CameraDomain } from '../domain/CameraDomain.js';

export const getCameras = async ({ categoryId, brand, condition, minPrice, maxPrice, startDate, endDate, search }) => {
  let query = { isActive: true };

  if (categoryId) query.categoryId = categoryId;
  if (brand) query.brand = { $regex: new RegExp(brand, 'i') };
  if (condition) query.condition = condition;

  if (minPrice !== undefined || maxPrice !== undefined) {
    query.dailyRate = {};
    if (minPrice !== undefined) query.dailyRate.$gte = Number(minPrice);
    if (maxPrice !== undefined) query.dailyRate.$lte = Number(maxPrice);
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  const cameras = await Camera.find(query).populate('categoryId', 'name description');

  // Instantiate OOP CameraDomain objects and filter for date availability using FR15 engine
  let cameraDomains = cameras.map(cam => new CameraDomain({
    id: cam._id,
    name: cam.name,
    brand: cam.brand,
    category: cam.categoryId,
    description: cam.description,
    specs: cam.specs,
    imageUrls: cam.imageUrls,
    dailyRate: cam.dailyRate,
    depositAmount: cam.depositAmount,
    stockQuantity: cam.stockQuantity,
    condition: cam.condition,
    isActive: cam.isActive,
    bookedRanges: cam.bookedRanges,
  }));

  // FR15: Filter out unavailable cameras for specified date range
  if (startDate && endDate) {
    cameraDomains = cameraDomains.filter(camDomain => 
      camDomain.isAvailableForRange(startDate, endDate)
    );
  }

  // Fetch average rating for each camera
  const cameraIds = cameraDomains.map(c => c.id);
  const reviews = await Review.aggregate([
    { $match: { cameraId: { $in: cameraIds } } },
    { $group: { _id: '$cameraId', avgRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
  ]);

  const ratingMap = reviews.reduce((acc, r) => {
    acc[r._id.toString()] = { avgRating: Math.round(r.avgRating * 10) / 10, reviewCount: r.reviewCount };
    return acc;
  }, {});

  return cameraDomains.map(cam => {
    const details = cam.getDetails();
    const ratingInfo = ratingMap[cam.id.toString()] || { avgRating: 5.0, reviewCount: 0 };
    return {
      ...details,
      averageRating: ratingInfo.avgRating,
      reviewCount: ratingInfo.reviewCount,
    };
  });
};

export const getCameraById = async (id) => {
  const camera = await Camera.findById(id).populate('categoryId', 'name description');
  if (!camera) throw new Error('Camera not found');

  const reviews = await Review.find({ cameraId: id }).populate('userId', 'name').sort({ createdAt: -1 });
  const avgRatingResult = await Review.aggregate([
    { $match: { cameraId: camera._id } },
    { $group: { _id: null, avg: { $avg: '$rating' } } }
  ]);
  const averageRating = avgRatingResult.length > 0 ? Math.round(avgRatingResult[0].avg * 10) / 10 : 5.0;

  return {
    ...camera.toObject(),
    averageRating,
    reviews,
  };
};

export const createCamera = async (cameraData) => {
  const camera = await Camera.create(cameraData);
  return camera;
};

export const updateCamera = async (id, updateData) => {
  const camera = await Camera.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!camera) throw new Error('Camera not found');
  return camera;
};

export const deleteCamera = async (id) => {
  const camera = await Camera.findById(id);
  if (!camera) throw new Error('Camera not found');
  camera.isActive = false; // Soft delete
  await camera.save();
  return { message: 'Camera deactivated successfully' };
};
