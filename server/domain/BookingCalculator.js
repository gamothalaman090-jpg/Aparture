/**
 * BookingCalculator Class (Encapsulating Pricing & Fees Engine)
 * Enforces FR18 (min 1 day, max 14 days) and calculates late & damage charges.
 */
export class BookingCalculator {
  static MIN_RENTAL_DAYS = 1;
  static MAX_RENTAL_DAYS = 14;
  static LATE_FEE_MULTIPLIER = 1.5; // 1.5x daily rate for late returns

  static calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid start or end date.");
    }

    if (end < start) {
      throw new Error("Rental end date cannot be earlier than start date.");
    }

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const duration = diffDays === 0 ? 1 : diffDays;

    if (duration < this.MIN_RENTAL_DAYS) {
      throw new Error(`Minimum rental duration is ${this.MIN_RENTAL_DAYS} day.`);
    }

    if (duration > this.MAX_RENTAL_DAYS) {
      throw new Error(`Maximum rental duration is ${this.MAX_RENTAL_DAYS} days per booking.`);
    }

    return duration;
  }

  static calculatePricing({ dailyRate, depositAmount, startDate, endDate }) {
    const durationDays = this.calculateDuration(startDate, endDate);
    const rentalFee = dailyRate * durationDays;
    const totalPrice = rentalFee + depositAmount;

    return {
      durationDays,
      dailyRateSnapshot: dailyRate,
      depositAmount,
      rentalFee,
      totalPrice,
    };
  }

  static calculateLateFee(endDate, actualReturnDate, dailyRate) {
    const due = new Date(endDate);
    const returned = new Date(actualReturnDate);

    if (returned <= due) return 0;

    const diffTime = Math.abs(returned - due);
    const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return overdueDays * (dailyRate * this.LATE_FEE_MULTIPLIER);
  }

  static calculateRefundBreakdown({ depositAmount, lateFee = 0, damageFee = 0 }) {
    const totalDeductions = lateFee + damageFee;
    const refundedDeposit = Math.max(0, depositAmount - totalDeductions);
    const additionalAmountOwed = Math.max(0, totalDeductions - depositAmount);

    return {
      depositAmount,
      lateFee,
      damageFee,
      totalDeductions,
      refundedDeposit,
      additionalAmountOwed,
    };
  }
}
