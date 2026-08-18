import React, { useEffect } from 'react';
import anime from 'animejs';
import { Star, ShieldCheck, Zap, ArrowRight, Eye, Check } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters.js';

const FEATURED_CAMERAS = [
  {
    id: 'fx3',
    name: 'Sony FX3 Cinema Camera',
    brand: 'Sony',
    category: 'Cinema Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    dailyRate: 110,
    depositAmount: 500,
    condition: 'new',
    rating: 5.0,
    reviewCount: 14,
    specs: { sensor: 'Full-Frame', resolution: '12.1 MP', video: '4K 120p RAW' },
    badge: 'TOP RENTED',
  },
  {
    id: 'r5c',
    name: 'Canon EOS R5 C 8K Hybrid',
    brand: 'Canon',
    category: 'Mirrorless Bodies',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1200&q=80',
    dailyRate: 125,
    depositAmount: 600,
    condition: 'good',
    rating: 4.9,
    reviewCount: 9,
    specs: { sensor: 'Full-Frame', resolution: '45.0 MP', video: '8K 60p RAW' },
    badge: 'HYBRID 8K',
  },
  {
    id: 'red',
    name: 'RED Komodo 6K Cinema Package',
    brand: 'RED Digital Cinema',
    category: 'Cinema Cameras',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    dailyRate: 210,
    depositAmount: 1200,
    condition: 'new',
    rating: 5.0,
    reviewCount: 22,
    specs: { sensor: 'Super35 Global', resolution: '19.9 MP', video: '6K REDCODE' },
    badge: 'HOLLYWOOD APPROVED',
  },
  {
    id: 'gm',
    name: 'Sony FE 24-70mm f/2.8 GM II Lens',
    brand: 'Sony',
    category: 'Cinema & Photo Lenses',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=1200&q=80',
    dailyRate: 45,
    depositAmount: 250,
    condition: 'good',
    rating: 4.8,
    reviewCount: 18,
    specs: { mount: 'Sony E', aperture: 'f/2.8 Constant', filter: '82mm' },
    badge: 'ESSENTIAL ZOOM',
  },
  {
    id: 'mavic',
    name: 'DJI Mavic 3 Pro Cine Drone',
    brand: 'DJI',
    category: 'Aerial Drones & Gimbals',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    dailyRate: 150,
    depositAmount: 700,
    condition: 'good',
    rating: 4.9,
    reviewCount: 11,
    specs: { sensor: 'Hasselblad 4/3', resolution: '20 MP', video: '5.1K ProRes' },
    badge: 'PRORES AERIAL',
  },
  {
    id: 'leica',
    name: 'Leica Q2 Monochrom Digital Camera',
    brand: 'Leica',
    category: 'Mirrorless Bodies',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80',
    dailyRate: 95,
    depositAmount: 850,
    condition: 'new',
    rating: 5.0,
    reviewCount: 7,
    specs: { sensor: 'Full-Frame Mono', resolution: '47.3 MP', lens: 'Summilux 28mm' },
    badge: 'EDITORIAL B&W',
  },
];

export default function FeaturedGearGrid() {
  useEffect(() => {
    // Anime.js entrance staggered for gear cards
    anime({
      targets: '.gear-card',
      opacity: [0, 1],
      translateY: [30, 0],
      delay: anime.stagger(100),
      easing: 'easeOutQuad',
      duration: 800,
    });
  }, []);

  return (
    <section id="catalog" className="py-20 bg-studio-900/40 border-t border-studio-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-amberGold-400 uppercase tracking-widest block mb-2 font-bold">
              // READY FOR BOOKING
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Featured Rental Inventory
            </h2>
          </div>
          
          {/* Quick Filter Tabs */}
          <div className="flex items-center space-x-2 mt-4 md:mt-0 text-xs font-medium font-mono">
            <button className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">All Gear</button>
            <button className="px-3 py-1.5 rounded-lg bg-studio-900 text-slate-400 hover:text-white border border-studio-800">Cinema</button>
            <button className="px-3 py-1.5 rounded-lg bg-studio-900 text-slate-400 hover:text-white border border-studio-800">Mirrorless</button>
            <button className="px-3 py-1.5 rounded-lg bg-studio-900 text-slate-400 hover:text-white border border-studio-800">Lenses</button>
          </div>
        </div>

        {/* Gear Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_CAMERAS.map((item) => (
            <div
              key={item.id}
              className="gear-card opacity-0 glass-card rounded-2xl overflow-hidden border border-studio-800 flex flex-col justify-between hover:border-cyan-500/40 transition-all duration-300 hover:shadow-studio-glow group"
            >
              {/* Image & Badge Overlay */}
              <div className="relative h-60 w-full overflow-hidden bg-studio-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-transparent to-transparent opacity-80" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-md bg-studio-950/90 text-cyan-400 font-mono text-[10px] font-bold tracking-wider border border-cyan-500/30">
                    {item.badge}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold ${
                    item.condition === 'new' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.condition}
                  </span>
                </div>

                {/* Daily Rate Tag Floating */}
                <div className="absolute bottom-3 right-3 bg-studio-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-studio-700 font-mono text-right">
                  <span className="text-xs text-slate-400 block leading-none">Daily Rate</span>
                  <span className="text-sm font-bold text-amberGold-400">{formatCurrency(item.dailyRate)}</span>
                </div>
              </div>

              {/* Card Details Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                    <span>{item.brand}</span>
                    <div className="flex items-center space-x-1 text-amberGold-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amberGold-400" />
                      <span>{item.rating.toFixed(1)} ({item.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white font-display mb-3 group-hover:text-cyan-400 transition-colors">
                    {item.name}
                  </h3>

                  {/* Specs Pill List */}
                  <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] font-mono">
                    {Object.entries(item.specs).map(([key, val]) => (
                      <div key={key} className="bg-studio-900/80 px-2.5 py-1.5 rounded-lg border border-studio-800 text-slate-300 truncate">
                        <span className="text-slate-500 uppercase">{key}:</span> {val}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Deposit & Action */}
                <div className="pt-4 border-t border-studio-800/80 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    <span>Hold Deposit: </span>
                    <span className="text-white font-semibold">{formatCurrency(item.depositAmount)}</span>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-studio-850 hover:bg-cyan-500 hover:text-white text-cyan-400 font-semibold text-xs border border-studio-700 hover:border-cyan-500 transition-all flex items-center space-x-1 focus-ring">
                    <span>Reserve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
