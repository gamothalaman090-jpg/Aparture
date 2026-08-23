import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ArrowRight, ShieldCheck, ShoppingBag, Eye } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';
import { useCart } from '../../context/CartContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function CameraCard({ camera }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    soundFx.playClickSound();
    addToCart(camera);
    showToast(`Added ${camera.name} to rental cart!`, 'success');
  };

  const handleCardClick = () => {
    soundFx.playClickSound();
  };

  const imageUrl = camera.imageUrl || '/images/cinema_rig_onset.jpg';

  return (
    <div
      onClick={handleCardClick}
      className="glass-panel-cinema rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Frame */}
        <div className="relative aspect-[16/10] overflow-hidden bg-black">
          <img
            src={imageUrl}
            alt={camera.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          {/* Top Brand Badge */}
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/30 uppercase">
              {camera.brand || 'APERTURE'}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold border ${
              camera.condition === 'new'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : camera.condition === 'good'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}>
              {camera.condition || 'Mint'}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-amber-400 border border-amber-400/30">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{camera.averageRating ? camera.averageRating.toFixed(1) : '5.0'}</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
              {camera.category?.name || 'Cinema Gear'}
            </span>
            <h3 className="text-lg font-bold text-white font-display mt-0.5 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {camera.name}
            </h3>
          </div>

          {/* Specs List Tags */}
          {camera.specs && camera.specs.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {camera.specs.slice(0, 4).map((spec, idx) => (
                <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 truncate">
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                  <span className="truncate">{spec}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Price & Action */}
      <div className="px-6 pb-6 pt-3 border-t border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono text-slate-400 uppercase">Daily Rate</div>
          <div className="text-xl font-extrabold text-amber-400 font-mono">
            {formatCurrency(camera.dailyRate)}
            <span className="text-xs text-slate-400 font-normal">/day</span>
          </div>
          <div className="text-[9px] font-mono text-slate-500">Hold: {formatCurrency(camera.depositAmount)}</div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleQuickAdd}
            title="Quick add to cart"
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10 hover:border-cyan-400/50 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
          
          <Link
            to={`/catalog/${camera._id || camera.id}`}
            className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-1 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
