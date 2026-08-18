import React, { useState } from 'react';
import { Camera, Film, Star, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

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
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    specs: ['Hasselblad 4/3 CMOS', '5.1K Apple ProRes 422', '43 Min Flight Time', 'Omni Obstacle Sense'],
  },
];

export default function FilmStripCatalog() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredItems = activeFilter === 'all'
    ? FILM_ITEMS
    : FILM_ITEMS.filter(i => i.category.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="film-catalog" className="py-20 bg-studio-950 border-b border-studio-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono text-amberGold-400 uppercase tracking-widest block mb-2 font-bold flex items-center space-x-1.5">
              <Film className="w-3.5 h-3.5" />
              <span>// TACTILE FILM STRIP CATALOG</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Production Inventory Roll
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-4 md:mt-0 font-mono text-xs">
            {['all', 'cinema', 'mirrorless', 'lenses', 'drones'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-lg uppercase transition-all focus-ring ${
                  activeFilter === tab
                    ? 'bg-cyan-500 text-studio-950 font-bold shadow-studio-glow'
                    : 'bg-studio-900 text-slate-400 hover:text-white border border-studio-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Film Strip Frame Container */}
        <div className="relative bg-studio-900 border-2 border-studio-800 rounded-3xl p-6 overflow-hidden">
          
          {/* Top Film Perforation Strip */}
          <div className="flex justify-between items-center space-x-3 mb-6 pb-3 border-b border-studio-800 font-mono text-[10px] text-slate-500 overflow-x-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-3 rounded-sm bg-studio-950 border border-studio-800" />
                <span>35MM FILM #{100 + i}</span>
              </div>
            ))}
          </div>

          {/* Camera Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 border border-studio-800 flex flex-col justify-between hover:border-cyan-500/40 transition-all group"
              >
                <div>
                  {/* Image with Film Frame Lines */}
                  <div className="relative h-48 rounded-xl overflow-hidden mb-4 bg-black border border-studio-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Status */}
                    <div className="absolute top-2.5 left-2.5 flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-amberGold-400 font-mono text-[10px] font-bold border border-amberGold-500/30">
                        {item.brand}
                      </span>
                    </div>

                    <div className="absolute bottom-2.5 right-2.5 font-mono text-xs text-amberGold-400 font-bold bg-black/80 px-2.5 py-1 rounded-lg border border-studio-700">
                      {formatCurrency(item.dailyRate)} / day
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white font-display mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>

                  {/* Bullet Specs */}
                  <ul className="space-y-1 text-xs font-mono text-slate-400 mb-4">
                    {item.specs.map((s, idx) => (
                      <li key={idx} className="flex items-center space-x-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Deposit & Booking */}
                <div className="pt-3 border-t border-studio-800 flex items-center justify-between font-mono text-xs">
                  <div className="text-slate-400 text-[11px]">
                    <span>Deposit Hold: </span>
                    <span className="text-white font-bold">{formatCurrency(item.depositAmount)}</span>
                  </div>

                  <button className="px-3.5 py-1.5 rounded-lg bg-studio-850 hover:bg-cyan-500 hover:text-studio-950 text-cyan-400 font-bold transition-all focus-ring flex items-center space-x-1">
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom Film Perforation Strip */}
          <div className="flex justify-between items-center space-x-3 mt-6 pt-3 border-t border-studio-800 font-mono text-[10px] text-slate-500 overflow-x-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-3 rounded-sm bg-studio-950 border border-studio-800" />
                <span>FRAME #{200 + i}</span>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
