import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('aperture_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [dateRange, setDateRange] = useState(() => {
    const today = new Date();
    const in3Days = new Date(today);
    in3Days.setDate(today.getDate() + 3);
    return {
      startDate: today.toISOString().split('T')[0],
      endDate: in3Days.toISOString().split('T')[0],
      days: 3,
    };
  });

  useEffect(() => {
    localStorage.setItem('aperture_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (camera, startDate = dateRange.startDate, endDate = dateRange.endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const dailyRate = camera.dailyRate || 0;
    const depositAmount = camera.depositAmount || 0;
    const rentalFee = dailyRate * days;

    const newItem = {
      camera,
      startDate,
      endDate,
      rentalDays: days,
      rentalFee,
      depositAmount,
    };

    setCartItems((prev) => {
      const existsIndex = prev.findIndex((item) => item.camera._id === camera._id);
      if (existsIndex > -1) {
        const updated = [...prev];
        updated[existsIndex] = newItem;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (cameraId) => {
    setCartItems((prev) => prev.filter((item) => item.camera._id !== cameraId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    setDateRange({ startDate, endDate, days });

    // Recalculate fees for items in cart
    setCartItems((prev) =>
      prev.map((item) => {
        const rentalFee = (item.camera.dailyRate || 0) * days;
        return {
          ...item,
          startDate,
          endDate,
          rentalDays: days,
          rentalFee,
        };
      })
    );
  };

  const getCartTotals = () => {
    const totalRentalFee = cartItems.reduce((acc, item) => acc + item.rentalFee, 0);
    const totalDeposit = cartItems.reduce((acc, item) => acc + item.depositAmount, 0);
    const grandTotal = totalRentalFee + totalDeposit;

    return {
      itemCount: cartItems.length,
      totalRentalFee,
      totalDeposit,
      grandTotal,
    };
  };

  const value = {
    cartItems,
    dateRange,
    addToCart,
    removeFromCart,
    clearCart,
    updateDateRange,
    getCartTotals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
