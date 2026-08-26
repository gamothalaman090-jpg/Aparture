import { RentableItem } from './RentableItem.js';

/**
 * LensItem Subclass (Frontend OOP Inheritance & Polymorphism)
 * Represents optics, prime and zoom cinema lenses.
 */
export class LensItem extends RentableItem {
  constructor(data = {}) {
    super(data);
    this.focalLength = data.focalLength || 'Zoom / Prime';
    this.aperture = data.aperture || 'f/2.8';
    this.mount = data.mount || 'E / PL / RF Mount';
    
    if (Array.isArray(data.specs) && data.specs.length) {
      this.specs = data.specs;
    } else {
      this.specs = [
        `MOUNT: ${this.mount}`,
        `APERTURE: ${this.aperture}`,
        `FOCAL LENGTH: ${this.focalLength}`,
        'OPTICS: De-clicked iris for cine control',
      ];
    }

    this.stockQuantity = Number(data.stockQuantity) || 1;
    this.bookedRanges = Array.isArray(data.bookedRanges) ? data.bookedRanges : [];
    this.averageRating = Number(data.averageRating) || 4.9;
    this.reviewCount = Number(data.reviewCount) || 0;
    this.reviews = Array.isArray(data.reviews) ? data.reviews : [];
  }

  isAvailableForRange(startDate, endDate) {
    if (!this.isActive || this.stockQuantity < 1) return false;
    if (!startDate || !endDate) return true;

    const reqStart = new Date(startDate).getTime();
    const reqEnd = new Date(endDate).getTime();

    const hasOverlap = this.bookedRanges.some((range) => {
      const existingStart = new Date(range.startDate).getTime();
      const existingEnd = new Date(range.endDate).getTime();
      return reqStart <= existingEnd && reqEnd >= existingStart;
    });

    return !hasOverlap;
  }

  getConditionBadgeClass() {
    return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
  }

  getRatingLabel() {
    return `${this.averageRating.toFixed(1)} ★`;
  }
}
