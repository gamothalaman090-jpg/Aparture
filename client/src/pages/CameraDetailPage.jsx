import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Camera,
  Star,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sliders,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import api from '../services/api.js';
import { formatCurrency } from '../utils/formatters.js';
import { soundFx } from '../services/audioService.js';
import { useCart } from '../context/CartContext.jsx';
import { useToast } from '../context/ToastContext.jsx';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';
import CustomCursor from '../components/landing/CustomCursor.jsx';

export default function CameraDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, updateDateRange } = useCart();
  const { showToast } = useToast();

  const [camera, setCamera] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Date Picker State
  const today = new Date().toISOString().split('T')[0];
  const in3Days = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(in3Days);

  const calculateDays = () => {
    const s = new Date(startDate);
    const e = new Date(endDate);
    const diff = Math.abs(e - s);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const days = calculateDays();

  useEffect(() => {
    fetchCameraDetails();
  }, [id]);

  const fetchCameraDetails = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/cameras/${id}`);
      if (res.success && res.data) {
        setCamera(res.data);
      }
      // Fetch reviews
      try {
        const revRes = await api.get(`/reviews/camera/${id}`);
        if (revRes.success && revRes.data) {
          setReviews(revRes.data);
        }
      } catch {
        // Mock reviews fallback
        setReviews([
          {
            _id: 'r1',
            user: { name: 'David Fincher' },
            rating: 5,
            comment: 'Flawless sensor calibration. Clean RAW output on set for 4-day commercial shoot.',
            createdAt: new Date().toISOString(),
          },
          {
            _id: 'r2',
            user: { name: 'Elena Rostova' },
            rating: 5,
            comment: 'Arrived packaged in heavy-duty flight case. All cables and de-clicked lenses included.',
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } catch {
      // Mock camera detail fallback
      setCamera({
        _id: id,
        name: 'Sony FX3 Full-Frame Cinema Body',
        brand: 'Sony',
        dailyRate: 110,
        depositAmount: 500,
        condition: 'new',
        stockQuantity: 4,
        averageRating: 5.0,
        description:
          'Full-frame 4K 120fps Cinema Line camera with S-Cinetone, active cooling system for unlimited recording, and dual native ISO 800/12800. Perfect for handheld, gimbal, and drone cinema rigs.',
        specs: [
          'Full-Frame 12.1MP Exmor R CMOS Sensor',
          'UHD 4K 120p / FHD 240p RAW Output',
          'S-Cinetone, S-Log3, HLG Gamut',
          'Active Internal Cooling Fan System',
          'Dual CFexpress Type A / SD Card Slots',
          'Dual Native ISO 800 / 12,800',
        ],
        category: { name: 'Cinema Cameras' },
        images: [
          '/images/cinema_rig_onset.jpg',
          '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-020.jpg',
          '/images/wireless_follow_focus.jpg',
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e, field) => {
    soundFx.playDialTickSound(1);
    if (field === 'start') setStartDate(e.target.value);
    if (field === 'end') setEndDate(e.target.value);
  };

  const handleReserve = () => {
    if (!camera) return;
    soundFx.playSnapSound();
    updateDateRange(startDate, endDate);
    addToCart(camera, startDate, endDate);
    showToast(`Locked in ${camera.name} for ${days} days!`, 'success');
    navigate('/cart');
  };

  const galleryImages = camera?.images?.length ? camera.images : [camera?.imageUrl || '/images/cinema_rig_onset.jpg'];
  const rentalFee = (camera?.dailyRate || 0) * days;
  const deposit = camera?.depositAmount || 0;
  const grandTotal = rentalFee + deposit;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F5F7] flex items-center justify-center">
        <CustomCursor />
        <div className="text-center space-y-4 font-mono text-xs text-slate-400 uppercase tracking-widest">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <div>LOADING CAMERA SPECS & REVIEWS...</div>
        </div>
      </div>
    );
  }

  if (!camera) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F5F7] flex flex-col justify-between">
        <CustomCursor />
        <FloatingNavbar />
        <div className="py-32 text-center space-y-4 font-mono">
          <h2 className="text-2xl font-bold text-white font-display">Gear Item Not Found</h2>
          <Link to="/catalog" className="text-cyan-400 hover:underline">
            &larr; Return to Inventory Catalog
          </Link>
        </div>
        <ApertureFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <CustomCursor />
      <FloatingNavbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 font-mono text-xs flex items-center space-x-2 text-slate-400">
          <Link to="/catalog" onClick={() => soundFx.playClickSound()} className="hover:text-cyan-400 transition-colors">
            Catalog
          </Link>
          <span>/</span>
          <span className="text-slate-500">{camera.category?.name}</span>
          <span>/</span>
          <span className="text-white font-bold">{camera.name}</span>
        </div>

        {/* Main Grid: Left Gallery & Specs | Right Booking Ticket */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Gallery Frame */}
            <div className="space-y-4">
              <div className="glass-panel-cinema rounded-3xl overflow-hidden relative aspect-[16/10] bg-black border border-white/10 shadow-2xl">
                <img
                  src={galleryImages[activeImageIndex]}
                  alt={camera.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                
                {/* Brand Badge */}
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-cyan-400 border border-cyan-500/40 uppercase">
                    {camera.brand}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono uppercase font-bold">
                    {camera.condition || 'Mint'}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-mono font-bold text-amber-400 border border-amber-400/40">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{camera.averageRating ? camera.averageRating.toFixed(1) : '5.0'}</span>
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFx.playDialTickSound(1.2);
                        setActiveImageIndex(idx);
                      }}
                      className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-cyan-400 scale-105 shadow-cyan-glow' : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
                {camera.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-300 leading-relaxed">
                {camera.description}
              </p>
            </div>

            {/* Specification Grid */}
            <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block flex items-center space-x-1.5">
                <Sliders className="w-4 h-4" />
                <span>TECHNICAL SPECIFICATIONS</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                {camera.specs?.map((spec, idx) => (
                  <div key={idx} className="flex items-center space-x-2 bg-white/5 p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="text-slate-200">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews Section */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-display flex items-center space-x-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  <span>Cinematographer Verified Reviews</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">{reviews.length} Verified Reviews</span>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev._id} className="glass-panel-cinema rounded-2xl p-5 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs border border-cyan-500/30">
                          {rev.user?.name ? rev.user.name.charAt(0) : 'D'}
                        </div>
                        <span className="text-xs font-mono font-bold text-white">{rev.user?.name || 'Verified DP'}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs font-mono text-amber-400">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed pl-9">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Booking Console & Pricing Ticket */}
          <div className="lg:col-span-5 glass-panel-cinema rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6 sticky top-28">
            
            <div className="border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                RESERVATION TICKET
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-amber-400 font-mono">
                  {formatCurrency(camera.dailyRate)}
                  <span className="text-xs text-slate-400 font-normal">/day</span>
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  {camera.stockQuantity > 0 ? 'AVAILABLE FOR DATES' : 'LIMITED STOCK'}
                </span>
              </div>
            </div>

            {/* Date Range Picker */}
            <div className="space-y-4 font-mono text-xs">
              <label className="block text-[11px] text-slate-300 uppercase font-bold flex justify-between">
                <span>SELECT RENTAL DAYS</span>
                <span className="text-amber-400 font-bold">{days} {days === 1 ? 'DAY' : 'DAYS'}</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">START DATE</label>
                  <input
                    type="date"
                    value={startDate}
                    min={today}
                    onChange={(e) => handleDateChange(e, 'start')}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">END DATE</label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate}
                    onChange={(e) => handleDateChange(e, 'end')}
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Fee Breakdown */}
            <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-4">
              <div className="flex justify-between text-slate-300">
                <span>Daily Rate:</span>
                <span className="text-white font-bold">{formatCurrency(camera.dailyRate)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Rental Subtotal ({days}d):</span>
                <span className="text-white font-bold">{formatCurrency(rentalFee)}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="flex items-center space-x-1 text-cyan-400 font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Refundable Deposit Hold:</span>
                </span>
                <span className="text-cyan-400 font-bold">{formatCurrency(deposit)}</span>
              </div>
            </div>

            {/* Total Due */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono text-slate-400 block mb-1">TOTAL RESERVATION DUE:</span>
              <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight mb-6">
                {formatCurrency(grandTotal)}
              </div>

              <button
                onClick={handleReserve}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all"
              >
                <span>RESERVE EQUIPMENT NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[10px] font-mono text-slate-400 text-center leading-relaxed">
              100% Security deposit held safe & refunded upon gear return. 24-point optical inspection guaranteed.
            </div>

          </div>

        </div>

      </main>

      <ApertureFooter />
    </div>
  );
}
