import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Calendar, Star, Eye, AlertTriangle, ArrowLeft, RefreshCcw, CheckCircle2, ShieldCheck } from 'lucide-react';
import api from '../services/api.js';
import { formatCurrency, formatDate, getStatusBadgeStyle } from '../utils/formatters.js';
import { soundFx } from '../services/audioService.js';
import { useAuth } from '../context/AuthContext.jsx';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';
import CustomCursor from '../components/landing/CustomCursor.jsx';
import OrderDetailModal from '../components/booking/OrderDetailModal.jsx';
import ReviewModal from '../components/user/ReviewModal.jsx';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const [selectedBookingDetail, setSelectedBookingDetail] = useState(null);
  const [selectedBookingReview, setSelectedBookingReview] = useState(null);

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings/my');
      if (res.success && Array.isArray(res.data)) {
        setBookings(res.data);
      } else if (Array.isArray(res)) {
        setBookings(res);
      }
    } catch {
      // Mock fallback if API empty
      setBookings([
        {
          _id: 'b1',
          bookingNumber: 'BK-928410',
          status: 'returned',
          startDate: new Date(Date.now() - 10 * 86400000).toISOString(),
          endDate: new Date(Date.now() - 7 * 86400000).toISOString(),
          totalDays: 3,
          dailyRateSnapshot: 110,
          rentalFee: 330,
          depositAmount: 500,
          totalPrice: 830,
          camera: {
            _id: 'cam1',
            name: 'Sony FX3 Cinema Camera',
            brand: 'Sony',
            imageUrl: '/images/cinema_rig_onset.jpg',
          },
        },
        {
          _id: 'b2',
          bookingNumber: 'BK-491203',
          status: 'confirmed',
          startDate: new Date(Date.now() + 2 * 86400000).toISOString(),
          endDate: new Date(Date.now() + 5 * 86400000).toISOString(),
          totalDays: 3,
          dailyRateSnapshot: 125,
          rentalFee: 375,
          depositAmount: 600,
          totalPrice: 975,
          camera: {
            _id: 'cam2',
            name: 'Canon EOS R5 C Hybrid Body',
            brand: 'Canon',
            imageUrl: '/images/wireless_follow_focus.jpg',
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filterTabs = [
    { key: 'all', label: 'ALL RESERVATIONS' },
    { key: 'confirmed', label: 'CONFIRMED' },
    { key: 'ongoing', label: 'ONGOING' },
    { key: 'returned', label: 'RETURNED' },
    { key: 'cancelled', label: 'CANCELLED' },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status?.toLowerCase() === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <CustomCursor />
      <FloatingNavbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Page Title */}
        <div className="mb-10 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold flex items-center space-x-1.5">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>// CINEMATOGRAPHER DASHBOARD</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              My Rental History
            </h1>
          </div>

          <Link
            to="/catalog"
            onClick={() => soundFx.playClickSound()}
            className="mt-4 md:mt-0 text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RESERVE MORE GEAR</span>
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 font-mono text-xs">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                soundFx.playClickSound();
                setActiveTab(tab.key);
              }}
              className={`px-4 py-2 rounded-xl uppercase font-bold tracking-wider transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                  : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 text-center space-y-4 font-mono text-xs text-slate-400">
            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
            <div>FETCHING RESERVATION HISTORY...</div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="glass-panel-cinema rounded-3xl p-12 text-center space-y-6 max-w-lg mx-auto my-12">
            <ShoppingBag className="w-12 h-12 text-slate-500 mx-auto" />
            <h2 className="text-2xl font-bold text-white font-display">No Reservations Found</h2>
            <p className="text-xs font-mono text-slate-400">
              There are no equipment bookings matching filter "{activeTab.toUpperCase()}".
            </p>
            <Link
              to="/catalog"
              onClick={() => soundFx.playClickSound()}
              className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              Explore Inventory Catalog &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBookings.map((b) => (
              <div
                key={b._id}
                className="glass-panel-cinema rounded-3xl p-6 border border-white/10 space-y-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Status Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono text-slate-400 font-bold">
                      #{b.bookingNumber || b._id?.slice(-8)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${getStatusBadgeStyle(b.status)}`}>
                      {b.status}
                    </span>
                  </div>

                  {/* Gear Info */}
                  <div className="flex items-center space-x-4 my-4">
                    <img
                      src={b.camera?.imageUrl || b.camera?.imageUrls?.[0] || b.cameraId?.imageUrl || b.cameraId?.imageUrls?.[0] || '/images/cinema_rig_onset.jpg'}
                      alt={b.camera?.name || b.cameraId?.name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                        {b.camera?.brand || b.cameraId?.brand}
                      </span>
                      <h3 className="text-base font-bold text-white font-display line-clamp-1">
                        {b.camera?.name || b.cameraId?.name}
                      </h3>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        Duration: <span className="text-amber-400 font-bold">{b.totalDays || 1} Days</span> &bull; Rate: {formatCurrency(b.dailyRateSnapshot || b.camera?.dailyRate || b.cameraId?.dailyRate)}/day
                      </div>
                    </div>
                  </div>

                  {/* Dates & Financial Details */}
                  <div className="grid grid-cols-2 gap-3 bg-white/5 p-3 rounded-2xl border border-white/5 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">PICKUP / RETURN</span>
                      <span className="text-slate-200">{formatDate(b.startDate)} &rarr; {formatDate(b.endDate)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">TOTAL CHARGE</span>
                      <span className="text-amber-400 font-extrabold">{formatCurrency(b.totalPrice || b.rentalFee)}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
                  <button
                    onClick={() => {
                      soundFx.playClickSound();
                      setSelectedBookingDetail(b);
                    }}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center space-x-1.5 font-bold"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Invoice</span>
                  </button>

                  {/* Write Verified Review Button (Unlocked for returned bookings) */}
                  {b.status === 'returned' && (
                    <button
                      onClick={() => {
                        soundFx.playClickSound();
                        setSelectedBookingReview(b);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold flex items-center space-x-1.5 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                    >
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>Write Review</span>
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </main>

      {/* Modals */}
      {selectedBookingDetail && (
        <OrderDetailModal
          booking={selectedBookingDetail}
          onClose={() => setSelectedBookingDetail(null)}
          onBookingUpdated={fetchMyBookings}
        />
      )}

      {selectedBookingReview && (
        <ReviewModal
          booking={selectedBookingReview}
          onClose={() => setSelectedBookingReview(null)}
          onReviewSubmitted={fetchMyBookings}
        />
      )}

      <ApertureFooter />
    </div>
  );
}
