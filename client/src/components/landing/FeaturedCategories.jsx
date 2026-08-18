import React, { useEffect } from 'react';
import anime from 'animejs';
import { Camera, Film, Disc, Navigation, ArrowUpRight } from 'lucide-react';

const CATEGORIES = [
  {
    id: 'cinema',
    title: 'Cinema Cameras',
    count: '18 Units Available',
    icon: Film,
    desc: 'Full-frame 4K/8K RAW recording rigs from Sony, Canon & RED.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80',
    tag: '4K/8K RAW',
    accentColor: 'from-cyan-500/20 to-blue-600/20',
  },
  {
    id: 'mirrorless',
    title: 'Mirrorless Bodies',
    count: '24 Units Available',
    icon: Camera,
    desc: 'High-speed hybrid photo & video bodies with eye autofocus.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    tag: 'HYBRID PHOTO/VIDEO',
    accentColor: 'from-amber-500/20 to-orange-600/20',
  },
  {
    id: 'lenses',
    title: 'Cinema & Prime Lenses',
    count: '42 Lenses Available',
    icon: Disc,
    desc: 'Fast f/1.2 - f/2.8 prime and cine zoom glass for creamy bokeh.',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=800&q=80',
    tag: 'FAST PRIMES & ZOOMS',
    accentColor: 'from-purple-500/20 to-indigo-600/20',
  },
  {
    id: 'drones',
    title: 'Aerial Drones & Gimbals',
    count: '12 Rigs Available',
    icon: Navigation,
    desc: 'Stabilized Hasselblad 5.1K drones & 3-axis motorized gimbals.',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    tag: '5.1K APPLE PRORES',
    accentColor: 'from-emerald-500/20 to-teal-600/20',
  },
];

export default function FeaturedCategories() {
  useEffect(() => {
    // Anime.js hover effect bindings for category cards
    const cards = document.querySelectorAll('.category-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        anime({
          targets: card.querySelector('.category-img'),
          scale: 1.08,
          duration: 600,
          easing: 'easeOutQuad',
        });
        anime({
          targets: card.querySelector('.category-badge'),
          translateY: -3,
          duration: 300,
          easing: 'easeOutQuad',
        });
      });

      card.addEventListener('mouseleave', () => {
        anime({
          targets: card.querySelector('.category-img'),
          scale: 1.0,
          duration: 600,
          easing: 'easeOutQuad',
        });
        anime({
          targets: card.querySelector('.category-badge'),
          translateY: 0,
          duration: 300,
          easing: 'easeOutQuad',
        });
      });
    });
  }, []);

  return (
    <section id="categories" className="py-20 bg-studio-900/50 border-y border-studio-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-2 font-bold">
              // CATALOG CATEGORIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
              Curated Production Gear
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-2 md:mt-0 leading-relaxed">
            All equipment undergoes rigorous multi-point sensor cleaning, calibration, and firmware verification before dispatch.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="category-card group glass-card rounded-2xl overflow-hidden border border-studio-800 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:border-cyan-500/40 hover:shadow-studio-glow"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-studio-950">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="category-img w-full h-full object-cover transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.accentColor} opacity-40`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-studio-950 via-transparent to-transparent" />
                  
                  {/* Category Pill Tag */}
                  <span className="category-badge absolute top-3 left-3 px-2.5 py-1 rounded-md bg-studio-950/90 text-amberGold-400 text-[10px] font-mono font-bold tracking-wider border border-amberGold-500/20">
                    {cat.tag}
                  </span>

                  {/* Icon floating top right */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-studio-900/80 backdrop-blur-md flex items-center justify-center text-white border border-studio-700">
                    <Icon className="w-4 h-4 text-cyan-400" />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display mb-1 group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span>{cat.title}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-studio-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{cat.count}</span>
                    <span className="text-cyan-400 font-semibold group-hover:underline">Explore Gear &rarr;</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
