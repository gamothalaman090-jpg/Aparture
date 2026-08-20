import React from 'react';
import { Play } from 'lucide-react';

const TESTIMONIALS = [
  {
    type: 'text',
    quote: '"Aperture has been our go-to cinema rental house for three feature productions now. The FX3 and Komodo packages arrive 100% calibrated with zero setup delay. Deposit refunds are instant, and their team truly understands film crew deadlines."',
    author: 'Sarah Connor',
    role: 'Director of Photography at Apex Films',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    type: 'video',
    author: 'Marcus Vance',
    role: 'Commercial Director at Vanguard Media',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    videoBg: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800',
  },
  {
    type: 'text',
    quote: '"Finding pristine anamorphic prime lenses with real-time date protection used to be a nightmare. Aperture makes booking seamless. The glass was immaculate and arrived double-cased."',
    author: 'Elena Rostova',
    role: 'Executive Producer at Studio Nord',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    type: 'text',
    quote: '"As an independent cinematographer, equipment reliability is everything. The gear quality guarantee and zero hidden fees give me total peace of mind on set."',
    author: 'David Sterling',
    role: 'Lead Camera Operator',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
  },
  {
    type: 'video',
    author: 'Kenji Takahashi',
    role: 'Documentary Filmmaker',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    videoBg: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&q=80&w=800',
  },
  {
    type: 'text',
    quote: '"The modular rig builder on their platform saved us hours of custom order matching. We booked an FX3, Teradek wireless system, and Tilta Nucleus in under two minutes."',
    author: 'Rachel Adams',
    role: 'Head of Production at Prism Visuals',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
];

export default function TestimonialsMarquee() {
  const listItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials-section" className="py-24 bg-[#07090E] overflow-hidden text-white border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-20">
        <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.2em] mb-4 font-mono">
          Verified Crew Reviews
        </h2>
        <p className="text-4xl md:text-[4rem] font-bold text-white tracking-tighter leading-[1.1] font-display">
          Trusted by DPs & Directors<br />
          Across the Industry.
        </p>
      </div>

      <div className="w-full relative group">
        {/* Left and Right Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 bg-gradient-to-r from-[#07090E] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 bg-gradient-to-l from-[#07090E] to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee hover:pause-animation">
          {listItems.map((item, index) => (
            <div key={index} className="pr-6 shrink-0">
              {item.type === 'text' ? (
                <div className="relative w-[320px] md:w-[400px] min-h-[440px] rounded-[2rem] p-8 flex flex-col shadow-2xl transition-transform hover:-translate-y-1 duration-300 bg-studio-900/90 border border-slate-800 text-white justify-between">
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6 flex items-center justify-between">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/50"
                      />
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                        VERIFIED RENTER
                      </span>
                    </div>
                    <p className="text-slate-300 text-[15px] leading-relaxed mb-8 flex-grow">
                      {item.quote}
                    </p>
                    <div className="mt-auto pt-4 border-t border-slate-800">
                      <div className="font-display font-bold text-white text-lg mb-0.5">
                        {item.author}
                      </div>
                      <div className="text-xs tracking-wide text-amberGold-400 font-mono">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative w-[320px] md:w-[400px] min-h-[440px] rounded-[2rem] p-8 flex flex-col shadow-2xl transition-transform hover:-translate-y-1 duration-300 text-white justify-between overflow-hidden border border-slate-800">
                  <img
                    src={item.videoBg}
                    alt={item.author}
                    className="absolute inset-0 w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="mb-6">
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amberGold-400"
                      />
                    </div>

                    <div className="flex-grow flex items-center justify-center">
                      <button className="w-16 h-10 bg-cyan-500/40 backdrop-blur-md border border-cyan-400/50 rounded-2xl flex items-center justify-center hover:bg-cyan-500/60 transition-colors cursor-pointer shadow-lg hover:scale-105">
                        <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                      </button>
                    </div>

                    <div className="mt-auto pt-4">
                      <div className="font-display font-bold text-white text-lg mb-0.5">
                        {item.author}
                      </div>
                      <div className="text-xs tracking-wide text-cyan-400 font-mono">
                        {item.role}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
