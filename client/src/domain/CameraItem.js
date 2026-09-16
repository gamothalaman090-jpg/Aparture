import { RentableItem } from './RentableItem.js';

/**
 * CameraItem Subclass (Frontend OOP Inheritance & Polymorphism)
 * Extends RentableItem with camera specifications, availability checks, and condition formatting.
 */
export class CameraItem extends RentableItem {
  // Hard Private Encapsulated Fields (Native ES2022)
  #bookedRanges = [];
  #stockQuantity = 1;

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

    this.#stockQuantity = Math.max(0, Number(data.stockQuantity) || 1);
    this.#bookedRanges = Array.isArray(data.bookedRanges) ? data.bookedRanges : [];
    this.averageRating = Number(data.averageRating) || 5.0;
    this.reviewCount = Number(data.reviewCount) || 0;
    this.reviews = Array.isArray(data.reviews) ? data.reviews : [];
  }

  // Getters & Setters for Private Encapsulated State
  get bookedRanges() {
    return [...this.#bookedRanges];
  }

  set bookedRanges(newRanges) {
    if (!Array.isArray(newRanges)) {
      throw new Error("bookedRanges must be an array.");
    }
    this.#bookedRanges = [...newRanges];
  }

  get stockQuantity() {
    return this.#stockQuantity;
  }

  set stockQuantity(value) {
    if (value < 0) throw new Error("Stock quantity cannot be negative.");
    this.#stockQuantity = Math.floor(Number(value));
  }

  // FR15: OOP method to check date availability overlap using array .some() on private #bookedRanges
  isAvailableForRange(startDate, endDate) {
    if (!this.isActive || this.stockQuantity < 1) return false;
    if (!startDate || !endDate) return true;

    const reqStart = new Date(startDate).getTime();
    const reqEnd = new Date(endDate).getTime();

    const hasOverlap = this.#bookedRanges.some((range) => {
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
