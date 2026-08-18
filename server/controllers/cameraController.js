import * as cameraService from '../services/cameraService.js';

export const getCameras = async (req, res, next) => {
  try {
    const { categoryId, brand, condition, minPrice, maxPrice, startDate, endDate, search } = req.query;
    const cameras = await cameraService.getCameras({
      categoryId,
      brand,
      condition,
      minPrice,
      maxPrice,
      startDate,
      endDate,
      search,
    });
    res.json(cameras);
  } catch (error) {
    next(error);
  }
};

export const getCameraById = async (req, res, next) => {
  try {
    const camera = await cameraService.getCameraById(req.params.id);
    res.json(camera);
  } catch (error) {
    next(error);
  }
};

export const createCamera = async (req, res, next) => {
  try {
    const camera = await cameraService.createCamera(req.body);
    res.status(201).json(camera);
  } catch (error) {
    next(error);
  }
};

export const updateCamera = async (req, res, next) => {
  try {
    const camera = await cameraService.updateCamera(req.params.id, req.body);
    res.json(camera);
  } catch (error) {
    next(error);
  }
};

export const deleteCamera = async (req, res, next) => {
  try {
    const result = await cameraService.deleteCamera(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
