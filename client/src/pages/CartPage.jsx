import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Calendar, ShieldCheck, ArrowRight, ArrowLeft, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { formatCurrency } from '../utils/formatters.js';
import { soundFx } from '../services/audioService.js';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';
import CustomCursor from '../components/landing/CustomCursor.jsx';

export default function CartPage() {
  const { cartItems, dateRange, updateDateRange, removeFromCart, clearCart, getCartTotals } = useCart();
  const { showToast } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totals = getCartTotals();

  const handleDateChange = (e, field) => {
    soundFx.playDialTickSound(1);
    const newDates = {
      ...dateRange,
      [field]: e.target.value,
    };
    updateDateRange(newDates.startDate, newDates.endDate);
  };

  const handleRemove = (cameraId, name) => {
    soundFx.playClickSound();
    removeFromCart(cameraId);
    showToast(`Removed ${name} from cart`, 'info');
  };

  const handleClear = () => {
    soundFx.playClickSound();
    clearCart();
    showToast('Cleared rental cart', 'info');
  };

  const handleProceedToCheckout = () => {
    soundFx.playClickSound();
    if (!isAuthenticated) {
      showToast('Please sign in to complete your reservation', 'warning');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <CustomCursor />
      <FloatingNavbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold flex items-center space-x-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>// RESERVATION BASKET</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              Rental Flight Case
            </h1>
          </div>

          <Link
            to="/catalog"
            onClick={() => soundFx.playClickSound()}
            className="mt-4 md:mt-0 text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BROWSE MORE GEAR</span>
          </Link>
        </div>

        {orderComplete ? (
          <div className="glass-panel-cinema rounded-3xl p-12 text-center space-y-6 max-w-lg mx-auto my-12 border border-emerald-500/30">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h2 className="text-3xl font-extrabold text-white font-display">Reservation Locked In!</h2>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              Your equipment reservation has been dispatched to our rental desk. Your gear will undergo a 24-point optical inspection prior to pick-up.
            </p>
            <Link
              to="/catalog"
              onClick={() => soundFx.playClickSound()}
              className="inline-block px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs uppercase tracking-widest"
            >
              Return to Inventory Catalog
            </Link>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="glass-panel-cinema rounded-3xl p-12 text-center space-y-6 max-w-lg mx-auto my-12">
            <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
            <h2 className="text-2xl font-bold text-white font-display">Your Flight Case is Empty</h2>
            <p className="text-xs font-mono text-slate-400">
              Explore our master inventory to add camera bodies, cinema primes, monitors & stabilizer rigs.
            </p>
            <Link
              to="/catalog"
              onClick={() => soundFx.playClickSound()}
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              Explore Catalog &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Items & Date Controls */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Date Selection Box */}
              <div className="glass-panel-cinema rounded-3xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono text-amber-400 font-bold uppercase flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>RENTAL DATES (SHUTTER RANGE)</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {dateRange.days} {dateRange.days === 1 ? 'DAY' : 'DAYS'} RESERVATION
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                      PICKUP / START DATE
                    </label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => handleDateChange(e, 'startDate')}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">
                      RETURN / END DATE
                    </label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => handleDateChange(e, 'endDate')}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-mono text-slate-400 uppercase font-bold">
                    ITEMS IN FLIGHT CASE ({cartItems.length})
                  </span>
                  <button
                    onClick={handleClear}
                    className="text-xs font-mono text-rose-400 hover:underline flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>CLEAR ALL</span>
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.camera._id || item.camera.id}
                    className="glass-panel-cinema rounded-2xl p-4 sm:p-6 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.camera.imageUrl || '/images/cinema_rig_onset.jpg'}
                        alt={item.camera.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/10 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                          {item.camera.brand} &bull; {item.camera.category?.name || 'Gear'}
                        </span>
                        <h3 className="text-base font-bold text-white font-display">
                          {item.camera.name}
                        </h3>
                        <div className="text-xs font-mono text-slate-400 mt-1">
                          Rate: {formatCurrency(item.camera.dailyRate)}/day &bull; Hold: {formatCurrency(item.depositAmount)}
                        </div>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/10">
                      <div className="text-right">
                        <div className="text-xs font-mono text-slate-400">Subtotal ({item.rentalDays}d):</div>
                        <div className="text-lg font-extrabold text-amber-400 font-mono">
                          {formatCurrency(item.rentalFee)}
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemove(item.camera._id || item.camera.id, item.camera.name)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Summary Ticket */}
            <div className="lg:col-span-4 glass-panel-cinema rounded-3xl p-6 border border-white/10 space-y-6">
              
              <div className="border-b border-white/10 pb-3 flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase">CHECKOUT MANIFEST</span>
                <span className="text-slate-500">APERTURE v2.4</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Selected Items:</span>
                  <span className="text-white font-bold">{totals.itemCount} Equipment Units</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span>Duration:</span>
                  <span className="text-white font-bold">{dateRange.days} Days</span>
                </div>

                <div className="flex justify-between text-slate-300 pt-2 border-t border-white/10">
                  <span>Rental Subtotal:</span>
                  <span className="text-white font-bold">{formatCurrency(totals.totalRentalFee)}</span>
                </div>

                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center space-x-1 text-cyan-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Refundable Deposit:</span>
                  </span>
                  <span className="text-cyan-400 font-bold">{formatCurrency(totals.totalDeposit)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">TOTAL CHECKOUT DUE:</span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight mb-4">
                  {formatCurrency(totals.grandTotal)}
                </div>

                <button
                  onClick={handleProceedToCheckout}
                  disabled={checkingOut}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
                >
                  <span>{checkingOut ? 'SUBMITTING RESERVATION...' : 'SUBMIT RESERVATION'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
                100% Security deposit held safe & refunded upon gear return.
              </div>

            </div>

          </div>
        )}

      </main>

      <ApertureFooter />
    </div>
  );
}
