/**
 * Explicit Array Operations Helper for Requirements Specification Sec 6
 * Demonstrates filter, map, reduce, sort, and some
 */

// Filter catalog items by multiple criteria (Category, Brand, Max Price, Condition, Search term)
export const filterCatalogItems = (cameras, { categoryId, brand, maxPrice, condition, searchQuery }) => {
  return cameras.filter(camera => {
    if (categoryId && camera.categoryId !== categoryId && camera.category?._id !== categoryId) return false;
    if (brand && camera.brand?.toLowerCase() !== brand.toLowerCase()) return false;
    if (maxPrice && camera.dailyRate > maxPrice) return false;
    if (condition && camera.condition !== condition) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = camera.name?.toLowerCase().includes(q);
      const matchBrand = camera.brand?.toLowerCase().includes(q);
      const matchCategory = camera.category?.name?.toLowerCase().includes(q);
      if (!matchName && !matchBrand && !matchCategory) return false;
    }
    return true;
  });
};

// Sort catalog items by specified sort key
export const sortCatalogItems = (cameras, sortBy = 'featured') => {
  const items = [...cameras];
  switch (sortBy) {
    case 'price-asc':
      return items.sort((a, b) => a.dailyRate - b.dailyRate);
    case 'price-desc':
      return items.sort((a, b) => b.dailyRate - a.dailyRate);
    case 'rating':
      return items.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    case 'name':
      return items.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return items;
  }
};

// Reduce array of rental cart items to calculate totals
export const calculateCartTotals = (cartItems) => {
  return cartItems.reduce((acc, item) => {
    const dailyRate = item.dailyRate || 0;
    const deposit = item.depositAmount || 0;
    const days = item.rentalDays || 1;
    
    const rentalSubtotal = dailyRate * days;
    
    acc.totalDailyRate += dailyRate;
    acc.totalRentalFee += rentalSubtotal;
    acc.totalDeposit += deposit;
    acc.grandTotal += rentalSubtotal + deposit;
    acc.itemCount += 1;
    return acc;
  }, { totalDailyRate: 0, totalRentalFee: 0, totalDeposit: 0, grandTotal: 0, itemCount: 0 });
};

// Check if a date range overlaps with existing booked ranges using .some()
export const checkDateOverlap = (bookedRanges, reqStart, reqEnd) => {
  const reqStartTime = new Date(reqStart).getTime();
  const reqEndTime = new Date(reqEnd).getTime();

  return bookedRanges.some(range => {
    const start = new Date(range.startDate).getTime();
    const end = new Date(range.endDate).getTime();
    return (reqStartTime <= end && reqEndTime >= start);
  });
};
