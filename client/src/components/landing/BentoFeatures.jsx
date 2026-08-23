import React from 'react';
import { Camera, ShieldCheck, Video, Flame, ArrowRight, Calendar, Sliders, Zap } from 'lucide-react';

export default function BentoFeatures() {
  return (
    <section id="bento-features" className="py-32 bg-[#050505] transition-colors duration-1000 overflow-hidden relative z-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="features-header mb-20 text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4 font-mono shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Zap className="w-3.5 h-3.5" />
            <span>PRO CINEMA FLEET &bull; GUARANTEED AVAILABILITY</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
            The Cinema Gear Standard.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: 3 Cinema Formats */}
          <div className="bento-card md:col-span-3 glass-panel-cinema rounded-[2rem] p-8 shadow-sm flex flex-col justify-center items-center text-center border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex gap-2 mb-6">
              <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center border-2 border-cyan-500/40 shadow-sm z-30 text-cyan-400">
                <Camera className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center border-2 border-amber-400/40 shadow-sm -ml-5 z-20 text-amber-400">
                <Video className="w-5 h-5" />
              </div>
              <div className="w-12 h-12 rounded-full bg-black/80 flex items-center justify-center border-2 border-blue-500/40 shadow-sm -ml-5 z-10 text-blue-400">
                <Sliders className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-1 font-display">3 Main Systems</h3>
            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Sony FX3 &bull; RED &bull; ARRI</p>
          </div>

          {/* Card 2: Featured Lens */}
          <div className="bento-card md:col-span-6 glass-panel-cinema rounded-[2rem] p-8 shadow-sm flex items-center justify-between group overflow-hidden relative border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
            <div className="relative z-10 p-6 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-3xl shadow-2xl inline-block">
              <div className="w-14 h-14 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/20 text-white">
                <Flame className="w-6 h-6" />
              </div>
              <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">Featured Optic</p>
              <h3 className="text-2xl font-bold text-white font-display">Anamorphic Cine 50mm T1.5</h3>
            </div>
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/30 via-black to-black" />
            <a href="#film-strip" className="z-10 w-12 h-12 rounded-full bg-black/80 flex items-center justify-center hover:bg-cyan-500 hover:text-black transition-colors group-hover:scale-110 text-white border border-white/10">
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Card 3: Next Pickup Availability */}
          <div className="bento-card md:col-span-3 glass-panel-cinema rounded-[2rem] p-8 shadow-sm flex flex-col justify-between border border-white/10 hover:border-amber-400/40 transition-all duration-300">
            <div>
              <p className="text-xs text-amber-400 font-mono uppercase tracking-wider mb-1">Next Pickup Slot</p>
              <h3 className="text-4xl font-light text-white tracking-tight font-display">TODAY</h3>
            </div>
            <div className="flex items-center gap-3 mt-10">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Calibrated Gear</p>
                <p className="text-xs text-slate-400 font-mono">Ready for Dispatch</p>
              </div>
            </div>
          </div>

          {/* Card 4: Sensor & Lens Profiles */}
          <div className="bento-card md:col-span-4 md:row-span-2 glass-panel-cinema rounded-[2rem] p-8 shadow-sm flex flex-col border border-white/10 hover:border-cyan-500/40 transition-all duration-300">
            <h3 className="text-xl font-bold text-white mb-6 font-display">Optic Performance</h3>
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex -space-x-3">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center border-2 border-black z-30" />
                <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center border-2 border-black z-20" />
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border-2 border-black z-10" />
              </div>
              <div className="px-4 py-2 rounded-full bg-black/60 text-xs font-mono text-cyan-400 flex items-center gap-2 border border-white/10">
                Resolution <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="border-t border-dashed border-white/10 mb-6" />

            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-medium text-white">Available Formats</h4>
              <span className="text-xs text-slate-400 font-mono">3 Sensor Sizes</span>
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Full-Frame 8K RAW</p>
                    <p className="text-xs text-slate-400">Sony FX3 / RED V-Raptor</p>
                  </div>
                  <span className="text-xs font-bold text-cyan-400 font-mono">98%</span>
                </div>
                <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Super35 Cine Prime</p>
                    <p className="text-xs text-slate-400">Cooke / Zeiss Supreme</p>
                  </div>
                  <span className="text-xs font-bold text-amber-400 font-mono">92%</span>
                </div>
                <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">Anamorphic 2x Squeeze</p>
                    <p className="text-xs text-slate-400">Atlas Orion Series</p>
                  </div>
                  <span className="text-xs font-bold text-blue-400 font-mono">88%</span>
                </div>
                <div className="w-full bg-black h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: Production Logistics - LOCAL IMAGE */}
          <div className="bento-card md:col-span-8 glass-panel-cinema rounded-[2rem] p-8 sm:p-10 shadow-sm relative overflow-hidden flex items-center border border-white/10 hover:border-cyan-500/40 transition-all duration-300 min-h-[300px]">
            <div className="relative z-10 w-full md:w-3/5">
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4 tracking-tight font-display">
                On-Set Equipment Guarantee
              </h3>
              <p className="text-slate-400 leading-relaxed mb-8 text-xs sm:text-sm font-mono max-w-sm">
                Every camera body and lens set undergoes 24-point optical testing and sensor calibration before every rental.
              </p>
              <a
                href="#film-strip"
                className="inline-block px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs sm:text-sm font-semibold font-mono uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]"
              >
                Explore Camera Inventory
              </a>
            </div>

            {/* Clean Background Image with Non-Overlapping Gradient Fade using local generated image */}
            <div className="absolute right-0 top-0 w-full md:w-1/2 h-full overflow-hidden pointer-events-none opacity-50 md:opacity-80">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0E] via-[#0A0A0E]/60 to-transparent z-10" />
              <img
                src="/images/cinema_rig_onset.jpg"
                alt="Cinema Rig On Set"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 6: DP Choice - LOCAL IMAGE */}
          <div className="bento-card md:col-span-4 glass-panel-cinema rounded-[2rem] p-8 shadow-sm flex flex-col items-center relative border border-white/10 hover:border-cyan-500/40 transition-all duration-300">
            <span className="absolute top-6 left-6 text-xs font-bold text-amber-400 uppercase tracking-wider font-mono">
              DP Choice
            </span>
            <div className="mt-8 flex flex-col items-center z-10 text-center">
              <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-2 border-cyan-500/50 shadow-lg shadow-cyan-500/20">
                <img
                  src="/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-020.jpg"
                  alt="Sony FX3 Package"
                  className="w-full h-full object-cover"
                />
              </div>
              <h4 className="text-base font-bold text-white mb-1 font-display">Sony FX3 Cinema Rig</h4>
              <p className="text-xs text-slate-400 font-mono">$110 / Day &bull; Includes Cage & Monitor</p>
            </div>
            <div className="flex gap-1.5 mt-8">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            </div>
          </div>

          {/* Card 7: Equip Your Rig - LOCAL IMAGE */}
          <div className="bento-card md:col-span-4 glass-panel-cinema rounded-[2rem] p-6 shadow-sm flex flex-col justify-between border border-white/10 hover:border-cyan-500/40 transition-all duration-300">
            <div className="mb-4">
              <h4 className="text-sm font-bold text-white mb-1 font-display">Production Accessories</h4>
              <p className="text-xs text-slate-400 font-mono">Wireless Follow Focus, Matte Boxes & V-Mounts.</p>
            </div>
            <div className="h-32 w-full rounded-2xl overflow-hidden mb-4 relative bg-black border border-white/10">
              <img
                src="/images/wireless_follow_focus.jpg"
                alt="Wireless Follow Focus"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium font-mono">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Sliders className="w-3.5 h-3.5" /> Full Rig Kits
              </div>
              <a href="#rig-builder" className="text-amber-400 font-bold hover:underline">View Rig Accessories</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
