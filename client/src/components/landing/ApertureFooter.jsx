import React, { useState } from 'react';
import { Camera, Send, ShieldCheck, Zap, Radio, ArrowUpRight } from 'lucide-react';
import { soundFx } from '../../services/audioService.js';

export default function ApertureFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playClickSound();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const handleLinkClick = () => {
    soundFx.playClickSound();
  };

  return (
    <footer id="footer-section" className="bg-[#030305] text-slate-400 border-t border-white/10 pt-20 pb-12 relative overflow-hidden">
      
      {/* Background Subtle Glowing Gradients */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Top Status & Newsletter Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pb-16 border-b border-white/10">
          
          {/* Brand & Live Dispatch Pill */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span>● DISPATCH DESK ONLINE // LA & NYC</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
              Rent Master Cinema Gear. <br className="hidden sm:inline" />
              Zero Hassle. Guaranteed Protection.
            </h3>
            
            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-lg leading-relaxed">
              Every camera body, lens, and modular rig undergoes 24-point optical inspection before release. 100% deposit return upon check-in.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6">
            <div className="glass-panel-cinema rounded-3xl p-6 sm:p-8 border border-white/10 relative">
              <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase mb-2">
                <Radio className="w-4 h-4" />
                <span>GEAR DROP & AVAILABILITY ALERTS</span>
              </div>
              <p className="text-xs font-mono text-slate-300 mb-4">
                Join 5,000+ DPs & Directors. Get notified when rare glass & 8K bodies drop.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cinematographer@studio.com"
                  required
                  className="px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-xs font-mono text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.4)] whitespace-nowrap"
                >
                  {subscribed ? (
                    <span className="text-emerald-300 font-bold">SUBSCRIBED!</span>
                  ) : (
                    <>
                      <span>SUBSCRIBE</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* 4-Column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/10 text-xs font-mono">
          
          {/* Column 1: Fleet & Optics */}
          <div className="space-y-4">
            <span className="text-cyan-400 font-bold tracking-widest uppercase block text-[11px]">
              01 // CINEMA FLEET
            </span>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <a href="#film-strip" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Sony FX3 Full-Frame</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#film-strip" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>RED Komodo 6K</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#film-strip" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Canon EOS R5 C 8K</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#film-strip" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Anamorphic T1.5 Primes</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Rig Assembler */}
          <div className="space-y-4">
            <span className="text-cyan-400 font-bold tracking-widest uppercase block text-[11px]">
              02 // RIG BUILDER
            </span>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <a href="#rig-builder" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Flight Case Configurator</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#rig-builder" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Atomos Ninja V 4K</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#rig-builder" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>DJI RS 3 Pro Gimbal</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#rig-builder" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Wireless Follow Focus</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: On-Set Guarantees */}
          <div className="space-y-4">
            <span className="text-cyan-400 font-bold tracking-widest uppercase block text-[11px]">
              03 // GUARANTEES
            </span>
            <ul className="space-y-2.5 text-slate-300">
              <li>
                <a href="#bento-features" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Date Protection Lock</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#bento-features" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>100% Deposit Refund</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#bento-features" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>24-Point Optical Test</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a href="#bento-features" onClick={handleLinkClick} className="hover:text-cyan-400 transition-colors flex items-center justify-between group">
                  <span>Sensor Dust Cleaned</span>
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Rental Desk */}
          <div className="space-y-4">
            <span className="text-cyan-400 font-bold tracking-widest uppercase block text-[11px]">
              04 // RENTAL DESK
            </span>
            <ul className="space-y-2.5 text-slate-300">
              <li className="text-slate-400">
                <span>Location:</span>
                <div className="text-white font-bold">34°05'22.4"N 118°14'34.1"W</div>
                <div className="text-slate-500">Los Angeles, CA</div>
              </li>
              <li className="text-slate-400">
                <span>Dispatch Line:</span>
                <div className="text-amber-400 font-bold">+1 (800) 555-CINE</div>
              </li>
            </ul>
          </div>

        </div>

        {/* Massive Display Brand Watermark Title (footer.design Signature Style) */}
        <div className="overflow-hidden select-none py-6 text-center border-b border-white/10">
          <h1 className="text-6xl sm:text-[9rem] lg:text-[13rem] font-extrabold tracking-tighter font-display text-white/5 leading-none uppercase hover:text-cyan-500/10 transition-colors duration-700">
            APERTURE
          </h1>
        </div>

        {/* Bottom Utility Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest gap-4">
          <div className="flex items-center space-x-3">
            <span>© 2026 APERTURE RENTALS INC.</span>
            <span className="text-white/20">|</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center space-x-6 text-slate-400">
            <a href="#footer-section" onClick={handleLinkClick} className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <a href="#footer-section" onClick={handleLinkClick} className="hover:text-white transition-colors">TERMS OF SERVICE</a>
            <a href="#scrolly-hero" onClick={handleLinkClick} className="text-cyan-400 hover:text-cyan-300 transition-colors">BACK TO TOP ↑</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
