import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MapPin, Calendar, ShieldCheck, Printer, ArrowLeft, Clock, Camera } from 'lucide-react';
import api from '../services/api.js';
import { formatCurrency, formatDate } from '../utils/formatters.js';
import { soundFx } from '../services/audioService.js';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';
import CustomCursor from '../components/landing/CustomCursor.jsx';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/bookings/${id}`);
      if (res.success && res.data) {
        setBooking(res.data);
      }
    } catch {
      // Mock booking confirmation fallback
      setBooking({
        _id: id,
        bookingNumber: `BK-${Math.floor(100000 + Math.random() * 900000)}`,
        status: 'confirmed',
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 3 * 86400000).toISOString(),
        totalDays: 3,
        totalRentalFee: 330,
        depositAmount: 500,
        grandTotal: 830,
        camera: {
          name: 'Sony FX3 Full-Frame Cinema Body',
          brand: 'Sony',
          imageUrl: '/images/cinema_rig_onset.jpg',
        },
        createdAt: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    soundFx.playClickSound();
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#F5F5F7] flex items-center justify-center font-mono text-xs text-slate-400">
        <CustomCursor />
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <div>LOADING RESERVATION MANIFEST...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <CustomCursor />
      <FloatingNavbar />

      <main className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        
        {/* Printable Voucher Ticket */}
        <div className="glass-panel-cinema rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl space-y-8 relative">
          
          {/* Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest block">
                  ● RESERVATION CONFIRMED
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  Order #{booking?.bookingNumber || booking?._id}
                </h1>
              </div>
            </div>

            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono font-bold flex items-center space-x-2 border border-white/10 shrink-0"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>PRINT VOUCHER</span>
            </button>
          </div>

          {/* Reserved Camera Card */}
          <div className="bg-black/60 rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <img
                src={booking?.camera?.imageUrl || '/images/cinema_rig_onset.jpg'}
                alt={booking?.camera?.name}
                className="w-20 h-20 rounded-xl object-cover border border-white/10"
              />
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                  {booking?.camera?.brand} &bull; CINEMA GEAR
                </span>
                <h3 className="text-lg font-bold text-white font-display">
                  {booking?.camera?.name}
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Status: <span className="text-emerald-400 font-bold uppercase">{booking?.status}</span>
                </div>
              </div>
            </div>

            <div className="text-right font-mono">
              <div className="text-xs text-slate-400">Total Rental Fee:</div>
              <div className="text-xl font-extrabold text-amber-400">
                {formatCurrency(booking?.totalRentalFee)}
              </div>
              <div className="text-[10px] text-cyan-400">Deposit Hold: {formatCurrency(booking?.depositAmount)}</div>
            </div>
          </div>

          {/* Schedule & Pick-up Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-xs">
            
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold uppercase">
                <Calendar className="w-4 h-4" />
                <span>RENTAL SCHEDULE</span>
              </div>
              <div className="text-slate-300">
                <div>Pickup: <span className="text-white font-bold">{formatDate(booking?.startDate)}</span></div>
                <div>Return: <span className="text-white font-bold">{formatDate(booking?.endDate)}</span></div>
                <div>Duration: <span className="text-amber-400 font-bold">{booking?.totalDays || 3} Days</span></div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-2">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold uppercase">
                <MapPin className="w-4 h-4" />
                <span>PICKUP LOCATION</span>
              </div>
              <div className="text-slate-300">
                <div className="text-white font-bold">APERTURE LA DISPATCH DESK</div>
                <div>34°05'22.4"N 118°14'34.1"W</div>
                <div className="text-slate-400 text-[10px]">Bring Government ID & Reservation Voucher</div>
              </div>
            </div>

          </div>

          {/* Next Steps */}
          <div className="border-t border-white/10 pt-6 space-y-3 font-mono text-xs text-slate-400">
            <span className="text-white font-bold uppercase block text-sm font-display">Next Steps for Pick-up:</span>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Your camera package is currently undergoing 24-point optical inspection.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Present this voucher & matching photo ID at the dispatch desk.</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Your security deposit hold will be released automatically upon return inspection.</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <Link
              to="/catalog"
              onClick={() => soundFx.playClickSound()}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN TO CATALOG</span>
            </Link>

            <Link
              to="/"
              onClick={() => soundFx.playClickSound()}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 text-black font-bold font-mono text-xs uppercase tracking-wider"
            >
              Back to Home Page
            </Link>
          </div>

        </div>

      </main>

      <ApertureFooter />
    </div>
  );
}
