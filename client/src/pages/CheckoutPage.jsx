import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, ShieldCheck, Lock, CheckCircle2, ArrowRight, User, Mail, Phone, MapPin, DollarSign } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import { formatCurrency } from '../utils/formatters.js';
import { soundFx } from '../services/audioService.js';
import api from '../services/api.js';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';
import CustomCursor from '../components/landing/CustomCursor.jsx';

export default function CheckoutPage() {
  const { cartItems, dateRange, getCartTotals, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const totals = getCartTotals();

  // Contact Form
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();

    if (!agreeTerms) {
      showToast('Please accept the rental protection terms to continue', 'warning');
      return;
    }

    if (cartItems.length === 0) {
      showToast('Your reservation cart is empty', 'error');
      return;
    }

    setSubmitting(true);

    try {
      // Submit first booking item
      const item = cartItems[0];
      const payload = {
        camera: item.camera._id || item.camera.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      };

      const res = await api.post('/bookings', payload);
      if (res.success && res.data) {
        soundFx.playSnapSound();
        clearCart();
        showToast('Reservation submitted successfully!', 'success');
        navigate(`/order-confirmation/${res.data._id}`);
      } else {
        throw new Error(res.message || 'Booking submission failed');
      }
    } catch (err) {
      showToast(err.message || 'Reservation submission error', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <CustomCursor />
      <FloatingNavbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-10 border-b border-white/10 pb-8">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold flex items-center space-x-1.5">
            <Lock className="w-3.5 h-3.5" />
            <span>// SECURE RESERVATION CHECKOUT</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Checkout & Security Deposit
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="glass-panel-cinema rounded-3xl p-12 text-center space-y-4 max-w-lg mx-auto my-12">
            <h2 className="text-2xl font-bold text-white font-display">No Items to Checkout</h2>
            <Link to="/catalog" className="text-cyan-400 hover:underline text-xs font-mono">
              &larr; Return to Inventory Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Pickup Details & Payment */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Pickup Contact Information */}
              <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block flex items-center space-x-1.5">
                  <User className="w-4 h-4" />
                  <span>STEP 1: CINEMATOGRAPHER PICKUP DETAILS</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">FULL NAME</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Alex Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="alex@studio.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="font-mono text-xs">
                  <label className="block text-[10px] text-slate-400 uppercase font-bold mb-1">PHONE NUMBER</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+1 (555) 019-2834"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
                <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest block flex items-center space-x-1.5">
                  <CreditCard className="w-4 h-4" />
                  <span>STEP 2: PAYMENT & DEPOSIT HOLD METHOD</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClickSound();
                      setPaymentMethod('card');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-cyan-glow'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-white mb-1">Credit / Debit Card</div>
                    <div className="text-[10px] text-slate-400">Instant Deposit Auth</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClickSound();
                      setPaymentMethod('applepay');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'applepay'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-cyan-glow'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-white mb-1">Apple Pay / Digital Wallet</div>
                    <div className="text-[10px] text-slate-400">One-Touch Auth</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundFx.playClickSound();
                      setPaymentMethod('wire');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      paymentMethod === 'wire'
                        ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-cyan-glow'
                        : 'bg-white/5 border-white/10 text-slate-400'
                    }`}
                  >
                    <div className="font-bold text-white mb-1">Studio Wire Account</div>
                    <div className="text-[10px] text-slate-400">Net 30 Invoicing</div>
                  </button>
                </div>

                {/* Mock Card Form Inputs */}
                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-2 font-mono text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">CARD NUMBER</label>
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">EXPIRY</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">CVC / CVC2</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3 p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs text-slate-300">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-cyan-400 cursor-pointer"
                />
                <label htmlFor="terms" className="cursor-pointer leading-relaxed">
                  I agree to the <span className="text-cyan-400 font-bold">Aperture Rental Protection Terms</span>. I acknowledge that 100% of security deposit holds are released upon equipment check-in inspection.
                </label>
              </div>

            </div>

            {/* Right Column: Checkout Ticket & Order Submission */}
            <div className="lg:col-span-5 glass-panel-cinema rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
              
              <div className="border-b border-white/10 pb-3 flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase">FINAL INVOICE MANIFEST</span>
                <span className="text-slate-500">{dateRange.days} DAYS</span>
              </div>

              {/* Items Summary List */}
              <div className="space-y-3 font-mono text-xs">
                {cartItems.map((item) => (
                  <div key={item.camera._id || item.camera.id} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <div>
                      <div className="font-bold text-white truncate max-w-[180px]">{item.camera.name}</div>
                      <div className="text-[10px] text-slate-400">{formatCurrency(item.camera.dailyRate)}/day &bull; Hold: {formatCurrency(item.depositAmount)}</div>
                    </div>
                    <div className="text-amber-400 font-bold">{formatCurrency(item.rentalFee)}</div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Rental Subtotal ({dateRange.days}d):</span>
                  <span className="text-white font-bold">{formatCurrency(totals.totalRentalFee)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center space-x-1 text-cyan-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Refundable Deposit Hold:</span>
                  </span>
                  <span className="text-cyan-400 font-bold">{formatCurrency(totals.totalDeposit)}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400 block mb-1">TOTAL CHECKOUT DUE:</span>
                <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight mb-6">
                  {formatCurrency(totals.grandTotal)}
                </div>

                <button
                  onClick={handleSubmitBooking}
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(6,182,212,0.5)] disabled:opacity-50 transition-all"
                >
                  <span>{submitting ? 'PROCESSING RESERVATION...' : 'CONFIRM & SUBMIT RESERVATION'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

      </main>

      <ApertureFooter />
    </div>
  );
}
