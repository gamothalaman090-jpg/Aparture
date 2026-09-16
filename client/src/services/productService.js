import api from './api.js';
import { CameraItem } from '../domain/CameraItem.js';
import { LensItem } from '../domain/LensItem.js';
import { RentableItem } from '../domain/RentableItem.js';

// Fallback Master Gear Inventory (used for offline or mock items like fx3, r5c, komodo, lens2470, drone)
const MASTER_MOCK_ITEMS = {
  fx3: {
    _id: 'fx3',
    name: 'Sony FX3 Full-Frame Cinema Body',
    brand: 'Sony',
    dailyRate: 110,
    depositAmount: 500,
    condition: 'new',
    stockQuantity: 4,
    averageRating: 5.0,
    reviewCount: 14,
    description:
      'Full-frame 4K 120fps Cinema Line camera with S-Cinetone, active cooling system for unlimited recording duration, and dual native ISO 800/12800. Designed for compact handheld, gimbal, and heavy cinema rigs.',
    specs: [
      'Full-Frame 12.1MP Exmor R CMOS Sensor',
      'UHD 4K 120p / FHD 240p 16-Bit RAW Output',
      'S-Cinetone, S-Log3, HLG Gamut Color Science',
      'Active Internal Cooling Fan System for continuous capture',
      'Dual CFexpress Type A / SD Card Slots',
      'Dual Native ISO 800 / 12,800',
    ],
    category: { _id: 'cat_cinema', name: 'Cinema Cameras' },
    images: [
      '/images/cinema_rig_onset.jpg',
      '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-020.jpg',
      '/images/wireless_follow_focus.jpg',
    ],
  },
  r5c: {
    _id: 'r5c',
    name: 'Canon EOS R5 C 8K Hybrid Cinema Body',
    brand: 'Canon',
    dailyRate: 125,
    depositAmount: 600,
    condition: 'good',
    stockQuantity: 3,
    averageRating: 4.9,
    reviewCount: 9,
    description:
      'True hybrid cinema body pairing 8K 60p RAW video recording with 45MP high-resolution still photography. Features active fan cooling and dedicated Cinema EOS OS.',
    specs: [
      '45MP Full-Frame CMOS Sensor',
      '8K 60p RAW / 4K 120p High Frame Rate',
      'Canon Log 3 & Dual Gain Output',
      'RF Lens Mount System',
      'Active Cooling Fan for Unlimited 8K Recording',
    ],
    category: { _id: 'cat_mirrorless', name: 'Mirrorless Bodies' },
    images: [
      '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-030.jpg',
      '/images/cinema_rig_onset.jpg',
    ],
  },
  komodo: {
    _id: 'komodo',
    name: 'RED Komodo 6K Cinema Production Package',
    brand: 'RED Digital Cinema',
    dailyRate: 210,
    depositAmount: 1200,
    condition: 'new',
    stockQuantity: 2,
    averageRating: 5.0,
    reviewCount: 18,
    description:
      'Super35 global shutter sensor producing legendary REDCODE RAW video. Features compact form factor, integrated touch display, and Canon RF mount.',
    specs: [
      '19.9MP Super35 Global Shutter CMOS',
      '6K REDCODE RAW up to 40 fps',
      'Compact 4x4x4 Cube Form Factor',
      'Global Shutter eliminates motion distortion',
      'Phase Detection Auto-Focus Support',
    ],
    category: { _id: 'cat_cinema', name: 'Cinema Cameras' },
    images: [
      '/images/wireless_follow_focus.jpg',
      '/images/cinema_rig_onset.jpg',
    ],
  },
  lens2470: {
    _id: 'lens2470',
    name: 'Sony FE 24-70mm f/2.8 GM II Lens',
    brand: 'Sony',
    dailyRate: 45,
    depositAmount: 250,
    condition: 'good',
    stockQuantity: 6,
    averageRating: 4.8,
    reviewCount: 22,
    description:
      'Lightweight standard zoom optic delivering G Master resolution, fast f/2.8 maximum aperture, de-clicked iris ring for video, and four XD linear motors.',
    specs: [
      'Constant f/2.8 Maximum Aperture',
      'Two XA (Extreme Aspherical) Elements',
      'De-Clickable Aperture Ring for Cinema Iris Control',
      'Lightweight 695g Optical Construction',
    ],
    category: { _id: 'cat_lenses', name: 'Cinema & Photo Lenses' },
    images: [
      '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-050.jpg',
    ],
  },
  drone: {
    _id: 'drone',
    name: 'DJI Mavic 3 Pro Cine Aerial Package',
    brand: 'DJI',
    dailyRate: 150,
    depositAmount: 700,
    condition: 'good',
    stockQuantity: 2,
    averageRating: 4.9,
    reviewCount: 11,
    description:
      'Triple-camera aerial cine system with Hasselblad 4/3 CMOS camera, 5.1K Apple ProRes 422 HQ recording, 43 minutes flight time, and omnidirectional obstacle sensing.',
    specs: [
      '4/3 CMOS Hasselblad Primary Camera',
      '5.1K 50fps / 4K 120fps Apple ProRes 422 HQ',
      '43-Minute Maximum Flight Time',
      '15km HD O3+ Video Transmission Range',
    ],
    category: { _id: 'cat_drones', name: 'Aerial Drones & Gimbals' },
    images: [
      '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-070.jpg',
    ],
  },
};

/**
 * Factory Function: Instantiates appropriate OOP Domain Class based on category/type.
 */
export function createRentableItem(data) {
  if (!data) return null;

  const categoryName = (typeof data.category === 'object' ? data.category?.name : data.category) || '';

  if (categoryName.toLowerCase().includes('lens') || categoryName.toLowerCase().includes('optics')) {
    return new LensItem(data);
  }

  // Default to CameraItem for bodies, drones, rigs & general gear
  return new CameraItem(data);
}

/**
 * Service Function: Fetch list of products from backend API (or fallback array), returning array of OOP objects.
 */
export async function fetchProducts(queryParams = {}) {
  try {
    const res = await api.get('/cameras', { params: queryParams });
    const rawData = Array.isArray(res) ? res : res.data || [];

    if (rawData.length > 0) {
      return rawData.map(item => createRentableItem(item));
    }
  } catch (err) {
    console.warn('API connection failed, utilizing OOP mock catalog fallback:', err.message);
  }

  // Return fallback array mapped to OOP instances
  return Object.values(MASTER_MOCK_ITEMS).map(item => createRentableItem(item));
}

/**
 * Service Function: Fetch a single product by ID (handles Mongo ObjectId and string keys).
 */
export async function fetchProductById(id) {
  if (!id) return null;

  try {
    const res = await api.get(`/cameras/${id}`);
    const rawData = res.data ? res.data : res;

    if (rawData && (rawData._id || rawData.id || rawData.name)) {
      return createRentableItem(rawData);
    }
  } catch (err) {
    console.warn(`API get camera by id (${id}) failed:`, err.message);
  }

  // Check fallback mock catalog dictionary
  if (MASTER_MOCK_ITEMS[id]) {
    return createRentableItem(MASTER_MOCK_ITEMS[id]);
  }

  // If ID matches none, return first mock item formatted with requested ID
  const defaultFallback = MASTER_MOCK_ITEMS.fx3;
  return createRentableItem({
    ...defaultFallback,
    _id: id,
    id: id,
  });
}

/**
 * Service Function: Fetch reviews for a given product ID.
 */
export async function fetchProductReviews(id) {
  try {
    const res = await api.get(`/reviews/camera/${id}`);
    const rawData = Array.isArray(res) ? res : res.data || [];
    if (rawData.length > 0) return rawData;
  } catch (err) {
    console.warn('API get reviews failed, returning mock DP reviews:', err.message);
  }

  return [
    {
      _id: 'r_mock_1',
      user: { name: 'David Fincher' },
      rating: 5,
      comment: 'Flawless sensor calibration. Dynamic range in dark shadows on set was exceptionally clean.',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'r_mock_2',
      user: { name: 'Elena Rostova' },
      rating: 5,
      comment: 'Arrived packaged in heavy-duty Pelican flight case. All de-clicked optics and cables included.',
      createdAt: new Date().toISOString(),
    },
  ];
}

/**
 * Service Function: Submit a new review for a product.
 */
export async function submitProductReview(cameraId, bookingId, rating, comment) {
  try {
    const res = await api.post('/reviews', { cameraId, bookingId, rating, comment });
    return res.data || res;
  } catch (err) {
    throw err;
  }
}
