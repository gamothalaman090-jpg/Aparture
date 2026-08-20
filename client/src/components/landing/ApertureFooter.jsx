import React from 'react';
import { Camera } from 'lucide-react';

export default function ApertureFooter() {
  return (
    <footer id="footer-section" className="py-20 bg-[#07090E] text-slate-400 px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        
        {/* Brand */}
        <div className="space-y-4">
          <a href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-studio-glow">
              <Camera className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight font-display block leading-none">
                APERTURE
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-amberGold-400 font-semibold">
                CAMERA RENTALS
              </span>
            </div>
          </a>
          <p className="max-w-sm text-xs font-mono tracking-wider leading-relaxed text-slate-400">
            Pro-grade cinema gear rentals with real-time date availability protection, instant deposit refunds, and zero hidden fees.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 text-[11px] font-mono uppercase tracking-[0.2em]">
          <div className="space-y-3 flex flex-col">
            <span className="text-cyan-400 font-bold mb-1">Equipment</span>
            <a href="#features-section" className="hover:text-white transition-colors">
              Cinema Cameras
            </a>
            <a href="#features-section" className="hover:text-white transition-colors">
              Anamorphic Lenses
            </a>
            <a href="#features-section" className="hover:text-white transition-colors">
              Modular Rigs
            </a>
          </div>

          <div className="space-y-3 flex flex-col">
            <span className="text-cyan-400 font-bold mb-1">Guarantees</span>
            <a href="#features-section" className="hover:text-white transition-colors">
              Date Protection
            </a>
            <a href="#features-section" className="hover:text-white transition-colors">
              Deposit Protection
            </a>
            <a href="#features-section" className="hover:text-white transition-colors">
              Optical Inspection
            </a>
          </div>

          <div className="space-y-3 flex flex-col">
            <span className="text-cyan-400 font-bold mb-1">Company</span>
            <a href="#features-section" className="hover:text-white transition-colors">
              About Aperture
            </a>
            <a href="#features-section" className="hover:text-white transition-colors">
              Contact Rental Desk
            </a>
            <a href="#features-section" className="hover:text-white transition-colors">
              Support FAQ
            </a>
          </div>
        </div>

      </div>

      {/* Newsletter */}
      <div className="max-w-7xl mx-auto mt-16 pt-10 border-t border-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight mb-1 font-display">
              Get Gear Drop Alerts & Production Tips
            </h3>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.2em]">
              Join 5,000+ cinematographers & DPs. No spam.
            </p>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="cinematographer@studio.com"
              required
              className="px-5 py-3 rounded-full bg-studio-900 border border-slate-800 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 w-full md:w-64 font-mono text-xs tracking-wider"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-cyan-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-cyan-400 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-10 pt-8 border-t border-slate-900 flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.3em] text-slate-500">
        <span>© 2026 APERTURE CAMERA RENTALS.</span>
        <span className="text-cyan-400 font-semibold">ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
