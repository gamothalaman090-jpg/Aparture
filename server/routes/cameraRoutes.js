import express from 'express';
import { getCameras, getCameraById, createCamera, updateCamera, deleteCamera } from '../controllers/cameraController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCameras);
router.get('/:id', getCameraById);
router.post('/', protect, adminOnly, createCamera);
router.put('/:id', protect, adminOnly, updateCamera);
router.delete('/:id', protect, adminOnly, deleteCamera);

export default router;
