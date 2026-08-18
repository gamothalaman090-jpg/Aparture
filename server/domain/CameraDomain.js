import { RentableItem } from './RentableItem.js';

/**
 * CameraDomain Subclass (OOP Inheritance & Encapsulation)
 */
export class CameraDomain extends RentableItem {
  constructor({
    id,
    name,
    brand,
    category,
    description,
    specs = {},
    imageUrls = [],
    dailyRate,
    depositAmount,
    stockQuantity = 1,
    condition = 'good',
    isActive = true,
    bookedRanges = [],
  }) {
    super({ id, name, dailyRate, depositAmount, isActive });
    this.brand = brand;
    this.category = category;
    this.description = description;
    this.specs = specs;
    this.imageUrls = imageUrls;
    this.stockQuantity = stockQuantity;
    this.condition = condition;
    this.bookedRanges = bookedRanges;
  }

  // FR15: Availability double-booking engine using .some()
  isAvailableForRange(requestedStart, requestedEnd) {
    if (!this.isActive || this.stockQuantity < 1) return false;

    const reqStart = new Date(requestedStart).getTime();
    const reqEnd = new Date(requestedEnd).getTime();

    // Check overlap with existing reservations
    const hasOverlap = this.bookedRanges.some(range => {
      const existingStart = new Date(range.startDate).getTime();
      const existingEnd = new Date(range.endDate).getTime();
      return (reqStart <= existingEnd && reqEnd >= existingStart);
    });

    return !hasOverlap;
  }

  // Add booked range upon confirmed reservation
  addBookedRange(startDate, endDate, bookingId) {
    if (!this.isAvailableForRange(startDate, endDate)) {
      throw new Error(`Camera "${this.name}" is already booked for the selected date range.`);
    }
    this.bookedRanges.push({ startDate, endDate, bookingId });
  }

  // Remove booked range upon cancellation
  removeBookedRange(bookingId) {
    this.bookedRanges = this.bookedRanges.filter(
      range => range.bookingId?.toString() !== bookingId.toString()
    );
  }

  getDetails() {
    return {
      ...this.getItemSummary(),
      brand: this.brand,
      category: this.category,
      description: this.description,
      specs: this.specs,
      imageUrls: this.imageUrls,
      stockQuantity: this.stockQuantity,
      condition: this.condition,
      bookedRanges: this.bookedRanges,
    };
  }
}
