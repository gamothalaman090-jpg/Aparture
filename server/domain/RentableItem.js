/**
 * Base RentableItem Class (OOP Inheritance Base)
 */
export class RentableItem {
  #dailyRate;
  #depositAmount;
  #isActive;

  constructor({ id, name, dailyRate, depositAmount, isActive = true }) {
    if (new.target === RentableItem) {
      throw new Error("Cannot instantiate abstract class RentableItem directly.");
    }
    this.id = id;
    this.name = name;
    this.#dailyRate = Number(dailyRate) || 0;
    this.#depositAmount = Number(depositAmount) || 0;
    this.#isActive = Boolean(isActive);
  }

  // Getters
  get dailyRate() {
    return this.#dailyRate;
  }

  get depositAmount() {
    return this.#depositAmount;
  }

  get isActive() {
    return this.#isActive;
  }

  // Setters with validation
  set dailyRate(value) {
    if (value < 0) throw new Error("Daily rate cannot be negative.");
    this.#dailyRate = Number(value);
  }

  set depositAmount(value) {
    if (value < 0) throw new Error("Deposit amount cannot be negative.");
    this.#depositAmount = Number(value);
  }

  set isActive(value) {
    this.#isActive = Boolean(value);
  }

  calculateBaseRentalFee(durationDays) {
    if (durationDays < 1) throw new Error("Rental duration must be at least 1 day.");
    return this.#dailyRate * durationDays;
  }

  getDeposit() {
    return this.#depositAmount;
  }

  getItemSummary() {
    return {
      id: this.id,
      name: this.name,
      dailyRate: this.#dailyRate,
      depositAmount: this.#depositAmount,
      isActive: this.#isActive,
    };
  }
}
