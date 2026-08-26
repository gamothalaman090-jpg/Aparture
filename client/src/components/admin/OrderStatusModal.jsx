import React, { useState } from 'react';
import { X, Save, AlertTriangle, CheckCircle2, ShieldCheck, DollarSign } from 'lucide-react';
import { formatCurrency, getStatusBadgeStyle } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';
import { useToast } from '../../context/ToastContext.jsx';
import api from '../../services/api.js';

export default function OrderStatusModal({ booking, onClose, onUpdateSuccess }) {
  const { showToast } = useToast();
  const [status, setStatus] = useState(booking?.status || 'confirmed');
  const [damageFee, setDamageFee] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();
    setSubmitting(true);

    try {
      const payload = {
        status,
        damageFee: Number(damageFee) || 0,
      };

      const res = await api.put(`/bookings/${booking._id}/status`, payload);
      if (res.success || res._id || res.data) {
        soundFx.playSnapSound();
        showToast(`Order status updated to ${status.toUpperCase()}!`, 'success');
        if (onUpdateSuccess) onUpdateSuccess();
        onClose();
      } else {
        throw new Error(res.message || 'Failed to update order status');
      }
    } catch (err) {
      showToast(err.message || 'Error updating order status', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/15 shadow-2xl relative space-y-6 font-mono text-xs">
        
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
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest block mb-1">
            DISPATCH LIFECYCLE CONTROLLER
          </span>
          <h2 className="text-xl font-bold text-white font-display">
            Update Booking #{booking?.bookingNumber || booking?._id?.slice(-8)}
          </h2>
          <p className="text-slate-400 text-[11px] mt-1">
            Customer: <span className="text-white font-bold">{booking?.user?.name || booking?.userId?.name || 'Customer'}</span> &bull; {booking?.camera?.name || booking?.cameraId?.name || 'Gear Item'}
          </p>
        </div>

        <form onSubmit={handleUpdateStatus} className="space-y-4">
          
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-2">
              TARGET RESERVATION STATUS
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400 font-bold"
            >
              <option value="pending" className="bg-black text-slate-300">PENDING (Awaiting Confirmation)</option>
              <option value="confirmed" className="bg-black text-emerald-400">CONFIRMED (Ready for Pickup)</option>
              <option value="ongoing" className="bg-black text-cyan-400">ONGOING (Equipment Picked Up)</option>
              <option value="returned" className="bg-black text-cyan-300">RETURNED (Checked in & Deposit Refunded)</option>
              <option value="overdue" className="bg-black text-amber-400">OVERDUE (Late Return Assessment)</option>
              <option value="damaged" className="bg-black text-rose-400">DAMAGED (Damage Inspection Claim)</option>
              <option value="cancelled" className="bg-black text-slate-400">CANCELLED (Reservation Voided)</option>
            </select>
          </div>

          {/* Conditional Damage Fee Input */}
          {(status === 'damaged' || status === 'overdue') && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
              <label className="block text-[10px] text-rose-300 uppercase font-bold">
                ASSESS DAMAGE / LATE FEE AMOUNT ($)
              </label>
              <input
                type="number"
                value={damageFee}
                onChange={(e) => setDamageFee(e.target.value)}
                placeholder="250"
                className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-rose-500/40 text-rose-200 focus:outline-none"
              />
              <p className="text-[10px] text-rose-400">
                Fee will be deducted from the customer's {formatCurrency(booking?.depositAmount)} security deposit hold.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-white/10 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold uppercase tracking-widest flex items-center space-x-1.5 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{submitting ? 'SAVING...' : 'UPDATE STATUS'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
