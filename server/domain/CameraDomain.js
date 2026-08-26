import { RentableItem } from './RentableItem.js';

/**
 * CameraDomain Subclass (OOP Inheritance & Encapsulation)
 */
export class CameraDomain extends RentableItem {
  // Hard Private Encapsulated Fields (Native ES2022)
  #bookedRanges = [];
  #stockQuantity = 1;

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
    this.#stockQuantity = Math.max(0, Number(stockQuantity) || 0);
    this.condition = condition;
    this.#bookedRanges = Array.isArray(bookedRanges) ? bookedRanges : [];
  }

  // Getters & Setters for Encapsulated Private Properties
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

  // FR15: Availability double-booking engine using .some() on private #bookedRanges
  isAvailableForRange(requestedStart, requestedEnd) {
    if (!this.isActive || this.stockQuantity < 1) return false;

    const reqStart = new Date(requestedStart).getTime();
    const reqEnd = new Date(requestedEnd).getTime();

    // Check overlap with existing reservations in private #bookedRanges field
    const hasOverlap = this.#bookedRanges.some(range => {
      const existingStart = new Date(range.startDate).getTime();
      const existingEnd = new Date(range.endDate).getTime();
      return (reqStart <= existingEnd && reqEnd >= existingStart);
    });

    return !hasOverlap;
  }

  // Add booked range upon confirmed reservation (encapsulated state mutation)
  addBookedRange(startDate, endDate, bookingId) {
    if (!this.isAvailableForRange(startDate, endDate)) {
      throw new Error(`Camera "${this.name}" is already booked for the selected date range.`);
    }
    this.#bookedRanges.push({ startDate, endDate, bookingId });
  }

  // Remove booked range upon cancellation (encapsulated state mutation)
  removeBookedRange(bookingId) {
    this.#bookedRanges = this.#bookedRanges.filter(
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
