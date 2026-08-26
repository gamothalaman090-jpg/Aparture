import { RentableItem } from './RentableItem.js';

/**
 * CameraItem Subclass (Frontend OOP Inheritance & Polymorphism)
 * Extends RentableItem with camera specifications, availability checks, and condition formatting.
 */
export class CameraItem extends RentableItem {
  constructor(data = {}) {
    super(data);
    
    // Normalize specs to array
    if (Array.isArray(data.specs)) {
      this.specs = data.specs;
    } else if (typeof data.specs === 'object' && data.specs !== null) {
      this.specs = Object.entries(data.specs).map(([key, val]) => `${key.toUpperCase()}: ${val}`);
    } else {
      this.specs = [];
    }

    this.stockQuantity = Number(data.stockQuantity) || 1;
    this.bookedRanges = Array.isArray(data.bookedRanges) ? data.bookedRanges : [];
    this.averageRating = Number(data.averageRating) || 5.0;
    this.reviewCount = Number(data.reviewCount) || 0;
    this.reviews = Array.isArray(data.reviews) ? data.reviews : [];
  }

  // FR15: OOP method to check date availability overlap using array .some()
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

  // OOP Method: Get condition badge color class
  getConditionBadgeClass() {
    switch (this.condition.toLowerCase()) {
      case 'new':
      case 'mint':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      case 'good':
      case 'production ready':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default:
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
    }
  }

  // OOP Method: Return formatted rating label
  getRatingLabel() {
    return `${this.averageRating.toFixed(1)} ★ (${this.reviewCount} ${this.reviewCount === 1 ? 'review' : 'reviews'})`;
  }
}
