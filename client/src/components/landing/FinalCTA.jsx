import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section id="finalcta-section" className="py-32 bg-[#050505] px-6 border-t border-slate-900">
      <div className="max-w-5xl mx-auto text-center">
        <div className="relative p-12 md:p-24 rounded-[3.5rem] bg-gradient-to-b from-studio-900 to-studio-950 border border-slate-800 overflow-hidden text-white shadow-2xl">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
          
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-studio-800 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider font-mono uppercase">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>REAL-TIME DATE AVAILABILITY GUARANTEE</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight font-display">
              Rent Cinema Gear<br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amberGold-400 bg-clip-text text-transparent">
                Without Limits.
              </span>
            </h2>
            
            <p className="text-sm md:text-lg text-slate-400 font-mono uppercase tracking-[0.25em] max-w-xl mx-auto">
              Pro Packages From $45 / Day &bull; Flexible Holds Up To 14 Days
            </p>

            <div className="pt-4 flex justify-center">
              <a
                href="#catalog"
                className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base uppercase tracking-wider rounded-xl transition-all transform hover:scale-105 shadow-studio-glow flex items-center space-x-3 font-display"
              >
                <span>Browse Camera Inventory</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <p className="text-[11px] font-mono text-slate-500 uppercase tracking-[0.3em] max-w-md mx-auto pt-4">
              Instant Deposit Refunds &bull; 24-Point Optical Inspection Included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
