/**
 * RentalCalculator OOP Utility Class
 * Encapsulates FR18 duration limits (1-14 days) & pricing calculation functions.
 */
export class RentalCalculator {
  static MIN_RENTAL_DAYS = 1;
  static MAX_RENTAL_DAYS = 14;

  /**
   * Calculates rental duration in days while enforcing FR18 limits.
   */
  static calculateDuration(startDate, endDate) {
    if (!startDate || !endDate) return 1;
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays === 0 ? 1 : diffDays;

    return Math.min(Math.max(days, this.MIN_RENTAL_DAYS), this.MAX_RENTAL_DAYS);
  }

  /**
   * Computes full financial breakdown for a rental booking.
   */
  static calculatePricing(dailyRate = 0, depositAmount = 0, startDate, endDate) {
    const durationDays = this.calculateDuration(startDate, endDate);
    const rentalFee = dailyRate * durationDays;
    const totalPrice = rentalFee + depositAmount;

    return {
      durationDays,
      dailyRateSnapshot: dailyRate,
      rentalFee,
      depositAmount,
      totalPrice,
    };
  }
}
