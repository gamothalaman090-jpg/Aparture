/**
 * Abstract Base Class: RentableItem
 * Demonstrates OOP Inheritance & Encapsulation on the Client Side.
 */
export class RentableItem {
  #dailyRate = 0;
  #depositAmount = 0;
  #isActive = true;

  constructor({
    id,
    _id,
    name,
    brand,
    category,
    description,
    dailyRate,
    depositAmount,
    images = [],
    imageUrls = [],
    imageUrl,
    isActive = true,
    condition = 'good',
  }) {
    if (new.target === RentableItem) {
      throw new Error("Cannot instantiate abstract class RentableItem directly. Use CameraItem or other subclasses.");
    }
    this.id = id || _id;
    this._id = this.id;
    this.name = name || 'Cinema Equipment';
    this.brand = brand || 'APERTURE';
    this.category = typeof category === 'object' && category !== null ? category : { name: category || 'Cinema Fleet' };
    this.description = description || '';
    this.#dailyRate = Number(dailyRate) || 0;
    this.#depositAmount = Number(depositAmount) || 0;
    
    // Normalize image list
    const gallery = Array.isArray(images) && images.length ? images : (Array.isArray(imageUrls) && imageUrls.length ? imageUrls : []);
    this.images = gallery.length ? gallery : [imageUrl || '/images/cinema_rig_onset.jpg'];
    this.imageUrl = this.images[0];
    this.#isActive = Boolean(isActive);
    this.condition = condition;
  }

  // Getters & Setters for Private Encapsulated State
  get dailyRate() {
    return this.#dailyRate;
  }

  set dailyRate(value) {
    if (value < 0) throw new Error("Daily rate cannot be negative.");
    this.#dailyRate = Number(value);
  }

  get depositAmount() {
    return this.#depositAmount;
  }

  set depositAmount(value) {
    if (value < 0) throw new Error("Deposit amount cannot be negative.");
    this.#depositAmount = Number(value);
  }

  get isActive() {
    return this.#isActive;
  }

  set isActive(value) {
    this.#isActive = Boolean(value);
  }

  // OOP Method: Calculate subtotal rental fee for a given number of days
  calculateBaseRentalFee(durationDays) {
    const days = Math.max(1, Math.ceil(durationDays));
    return this.dailyRate * days;
  }

  // OOP Method: Get deposit hold amount
  getDepositAmount() {
    return this.depositAmount;
  }

  // OOP Method: Calculate total reservation cost (rental subtotal + deposit hold)
  calculateGrandTotal(durationDays) {
    return this.calculateBaseRentalFee(durationDays) + this.getDepositAmount();
  }

  // OOP Method: Get formatted daily rate string
  getFormattedDailyRate() {
    return `$${this.dailyRate.toLocaleString()}`;
  }

  // OOP Method: Get formatted deposit string
  getFormattedDeposit() {
    return `$${this.depositAmount.toLocaleString()}`;
  }

  // OOP Method: Get primary thumbnail
  getPrimaryImage() {
    return this.images[0] || '/images/cinema_rig_onset.jpg';
  }

  // OOP Method: Get brief item summary for cards or receipts
  getItemSummary() {
    return {
      id: this.id,
      name: this.name,
      brand: this.brand,
      categoryName: this.category.name,
      dailyRate: this.dailyRate,
      depositAmount: this.depositAmount,
      condition: this.condition,
    };
  }
}
