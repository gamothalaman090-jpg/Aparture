import React, { useState } from 'react';
import { Star, X, CheckCircle2, MessageSquare, Send } from 'lucide-react';
import { soundFx } from '../../services/audioService.js';
import { useToast } from '../../context/ToastContext.jsx';
import api from '../../services/api.js';

export default function ReviewModal({ booking, onClose, onReviewSubmitted }) {
  const { showToast } = useToast();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundFx.playClickSound();

    if (!comment.trim()) {
      showToast('Please enter a review comment', 'warning');
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        cameraId: booking.camera?._id || booking.camera?.id || booking.camera,
        bookingId: booking._id,
        rating,
        comment,
      };

      const res = await api.post('/reviews', payload);
      if (res.success || res._id || res.data) {
        soundFx.playSnapSound();
        showToast('Verified review submitted successfully!', 'success');
        if (onReviewSubmitted) onReviewSubmitted();
        onClose();
      } else {
        throw new Error(res.message || 'Review submission failed');
      }
    } catch (err) {
      showToast(err.message || 'Error submitting review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/15 shadow-2xl relative space-y-6">
        
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

        {/* Modal Header */}
        <div className="border-b border-white/10 pb-4">
          <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-widest block mb-1">
            VERIFIED REVIEW SUBMISSION
          </span>
          <h2 className="text-xl font-bold text-white font-display">
            Rate Your Rental Experience
          </h2>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {booking?.camera?.name || 'Cinema Gear Package'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
          
          {/* Star Rating Picker */}
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-2">
              OVERALL RATING
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => {
                    soundFx.playDialTickSound(star * 0.2);
                    setRating(star);
                  }}
                  className="p-1 text-slate-600 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
              <span className="text-amber-400 font-bold ml-2 text-sm">
                {rating}.0 / 5.0
              </span>
            </div>
          </div>

          {/* Comment Field */}
          <div>
            <label className="block text-[10px] text-slate-400 uppercase font-bold mb-2">
              CINEMATOGRAPHER FEEDBACK
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe optical performance, sensor sharpness, battery life, condition upon pickup..."
              required
              className="w-full p-4 rounded-2xl bg-black/60 border border-white/15 text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'POSTING REVIEW...' : 'SUBMIT VERIFIED REVIEW'}</span>
          </button>

        </form>

      </div>
    </div>
  );
}
