/**
 * Base RentableItem Class (OOP Inheritance Base)
 */
export class RentableItem {
  constructor({ id, name, dailyRate, depositAmount, isActive = true }) {
    if (new.target === RentableItem) {
      throw new Error("Cannot instantiate abstract class RentableItem directly.");
    }
    this.id = id;
    this.name = name;
    this.dailyRate = dailyRate;
    this.depositAmount = depositAmount;
    this.isActive = isActive;
  }

  calculateBaseRentalFee(durationDays) {
    if (durationDays < 1) throw new Error("Rental duration must be at least 1 day.");
    return this.dailyRate * durationDays;
  }

  getDeposit() {
    return this.depositAmount;
  }

  getItemSummary() {
    return {
      id: this.id,
      name: this.name,
      dailyRate: this.dailyRate,
      depositAmount: this.depositAmount,
      isActive: this.isActive,
    };
  }
}
