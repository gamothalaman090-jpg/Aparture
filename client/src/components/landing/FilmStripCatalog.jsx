import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Film, Star, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';
import { soundFx } from '../../services/audioService.js';

const FILM_ITEMS = [
  {
    id: 'fx3',
    name: 'Sony FX3 Full-Frame Cinema Body',
    brand: 'Sony',
    category: 'Cinema Cameras',
    dailyRate: 110,
    depositAmount: 500,
    condition: 'new',
    rating: 5.0,
    image: '/images/cinema_rig_onset.jpg',
    specs: ['4K 120fps RAW', 'S-Cinetone', 'Active Cooling', 'Dual ISO 800/12800'],
  },
  {
    id: 'r5c',
    name: 'Canon EOS R5 C 8K Hybrid Body',
    brand: 'Canon',
    category: 'Mirrorless Bodies',
    dailyRate: 125,
    depositAmount: 600,
    condition: 'good',
    rating: 4.9,
    image: '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-030.jpg',
    specs: ['8K 60p RAW', '45.0 MP Stills', 'RF Lens Mount', 'Unlimited 8K Record'],
  },
  {
    id: 'komodo',
    name: 'RED Komodo 6K Cinema Package',
    brand: 'RED Digital Cinema',
    category: 'Cinema Cameras',
    dailyRate: 210,
    depositAmount: 1200,
    condition: 'new',
    rating: 5.0,
    image: '/images/wireless_follow_focus.jpg',
    specs: ['Super35 Global Shutter', '6K REDCODE RAW', 'Compact Cube Form', 'RED Color Science'],
  },
  {
    id: 'lens2470',
    name: 'Sony FE 24-70mm f/2.8 GM II Lens',
    brand: 'Sony',
    category: 'Cinema & Photo Lenses',
    dailyRate: 45,
    depositAmount: 250,
    condition: 'good',
    rating: 4.8,
    image: '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-050.jpg',
    specs: ['Constant f/2.8 Aperture', 'XA Optical Glass', 'De-clicked Iris Ring', 'Lightweight 695g'],
  },
  {
    id: 'drone',
    name: 'DJI Mavic 3 Pro Cine Drone',
    brand: 'DJI',
    category: 'Aerial Drones & Gimbals',
    dailyRate: 150,
    depositAmount: 700,
    condition: 'good',
    rating: 4.9,
    image: '/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-070.jpg',
    specs: ['Hasselblad 4/3 CMOS', '5.1K Apple ProRes 422', '43 Min Flight Time', 'Omni Obstacle Sense'],
  },
];

export default function FilmStripCatalog() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all'
    ? FILM_ITEMS
    : FILM_ITEMS.filter(i => i.category.toLowerCase().includes(activeFilter.toLowerCase()));

  const handleFilterClick = (tab) => {
    setActiveFilter(tab);
    soundFx.playDialTickSound(1.2);
  };

  const handleCardClick = () => {
    soundFx.playClickSound();
  };

  return (
    <section id="film-strip" className="py-24 bg-[#08080A] border-b border-white/10 relative overflow-hidden">
      {/* Film Sprocket Perforations Header */}
      <div className="w-full bg-[#050505] border-y border-white/10 py-2 mb-12 overflow-hidden select-none">
        <div className="flex space-x-4 animate-marquee opacity-30">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4 shrink-0">
              <div className="w-4 h-3 bg-white/40 rounded-sm" />
              <span className="text-[10px] font-mono text-white/60 font-bold">APERTURE 35MM</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2 font-bold flex items-center space-x-1.5">
              <Film className="w-3.5 h-3.5" />
              <span>// PRODUCTION INVENTORY ROLL</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Master Cinema Fleet
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-mono mt-2">
              Ready for immediate dispatch. Inspected, calibrated, and sensor-cleaned before every drop.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0 font-mono text-xs">
            {['all', 'cinema', 'mirrorless', 'lenses', 'drones'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleFilterClick(tab)}
                className={`px-3.5 py-1.5 rounded-xl uppercase transition-all font-bold focus-ring ${
                  activeFilter === tab
                    ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(6,182,212,0.6)]'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Film Strip Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={handleCardClick}
              className="glass-panel-cinema rounded-3xl overflow-hidden group hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Film Frame Aspect */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 flex items-center space-x-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/30 uppercase">
                      {item.brand}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-amber-400 border border-amber-400/30">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white font-display mt-0.5 group-hover:text-cyan-400 transition-colors">
                      {item.name}
                    </h3>
                  </div>

                  {/* Specs List */}
                  <div className="grid grid-cols-2 gap-2">
                    {item.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5 text-[11px] font-mono text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span className="truncate">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Price & Action */}
              <div className="px-6 pb-6 pt-2 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Daily Rate</div>
                  <div className="text-xl font-extrabold text-amber-400 font-mono">
                    {formatCurrency(item.dailyRate)}
                    <span className="text-xs text-slate-400 font-normal">/day</span>
                  </div>
                </div>

                <Link
                  to={`/catalog/${item.id}`}
                  onClick={() => soundFx.playClickSound()}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center space-x-1 shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                >
                  <span>View & Reserve</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
