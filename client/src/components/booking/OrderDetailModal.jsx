import React, { useState } from 'react';
import { X, Calendar, ShieldCheck, MapPin, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate, getStatusBadgeStyle } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';
import { useToast } from '../../context/ToastContext.jsx';
import api from '../../services/api.js';

export default function OrderDetailModal({ booking, onClose, onBookingUpdated }) {
  const { showToast } = useToast();
  const [cancelling, setCancelling] = useState(false);

  const handleCancelBooking = async () => {
    soundFx.playClickSound();
    if (!window.confirm('Are you sure you want to cancel this reservation?')) return;

    setCancelling(true);
    try {
      const res = await api.put(`/bookings/${booking._id}/cancel`);
      if (res.success || res._id || res.data) {
        soundFx.playSnapSound();
        showToast('Reservation cancelled successfully', 'info');
        if (onBookingUpdated) onBookingUpdated();
        onClose();
      } else {
        throw new Error(res.message || 'Failed to cancel reservation');
      }
    } catch (err) {
      showToast(err.message || 'Error cancelling booking', 'error');
    } finally {
      setCancelling(false);
    }
  };

  const handlePrint = () => {
    soundFx.playClickSound();
    window.print();
  };

  const canCancel = booking?.status === 'confirmed' || booking?.status === 'pending';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-white/15 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClickSound();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="border-b border-white/10 pb-4 flex justify-between items-start">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest block mb-1">
              RESERVATION INVOICE MANIFEST
            </span>
            <h2 className="text-2xl font-bold text-white font-display">
              Booking #{booking?.bookingNumber || booking?._id?.slice(-8)}
            </h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${getStatusBadgeStyle(booking?.status)}`}>
            {booking?.status}
          </span>
        </div>

        {/* Reserved Gear Card */}
        <div className="bg-black/60 rounded-2xl p-4 border border-white/10 flex items-center space-x-4">
          <img
            src={booking?.camera?.imageUrl || booking?.camera?.imageUrls?.[0] || '/images/cinema_rig_onset.jpg'}
            alt={booking?.camera?.name}
            className="w-16 h-16 rounded-xl object-cover border border-white/10"
          />
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
              {booking?.camera?.brand}
            </span>
            <h3 className="text-base font-bold text-white font-display">
              {booking?.camera?.name}
            </h3>
            <div className="text-xs font-mono text-slate-400 mt-0.5">
              Daily Rate: {formatCurrency(booking?.dailyRateSnapshot || booking?.camera?.dailyRate)}/day
            </div>
          </div>
        </div>

        {/* Schedule & Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold uppercase">
              <Calendar className="w-3.5 h-3.5" />
              <span>RENTAL TIMELINE</span>
            </div>
            <div className="text-slate-300">
              <div>Pickup: <span className="text-white font-bold">{formatDate(booking?.startDate)}</span></div>
              <div>Return: <span className="text-white font-bold">{formatDate(booking?.endDate)}</span></div>
              <div>Total Days: <span className="text-amber-400 font-bold">{booking?.totalDays || 1} Days</span></div>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 space-y-1.5">
            <div className="flex items-center space-x-1.5 text-cyan-400 font-bold uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FINANCIAL SUMMARY</span>
            </div>
            <div className="text-slate-300">
              <div>Rental Fee: <span className="text-white font-bold">{formatCurrency(booking?.rentalFee)}</span></div>
              <div>Deposit Hold: <span className="text-cyan-400 font-bold">{formatCurrency(booking?.depositAmount)}</span></div>
              <div>Total Due: <span className="text-amber-400 font-bold">{formatCurrency(booking?.totalPrice || booking?.grandTotal)}</span></div>
            </div>
          </div>

        </div>

        {/* Pickup Station Location */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 font-mono text-xs space-y-1 text-slate-300">
          <div className="flex items-center space-x-1.5 text-cyan-400 font-bold uppercase">
            <MapPin className="w-3.5 h-3.5" />
            <span>DISPATCH PICKUP STATION</span>
          </div>
          <div className="text-white font-bold">APERTURE LA DISPATCH DESK</div>
          <div className="text-slate-400 text-[10px]">34°05'22.4"N 118°14'34.1"W &bull; Open 08:00 - 20:00 PST</div>
        </div>

        {/* Actions Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-mono font-bold flex items-center space-x-2 border border-white/10"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Print Invoice</span>
          </button>

          {canCancel && (
            <button
              onClick={handleCancelBooking}
              disabled={cancelling}
              className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-mono font-bold border border-rose-500/30 flex items-center space-x-1.5 disabled:opacity-50"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{cancelling ? 'Cancelling...' : 'Cancel Reservation'}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
