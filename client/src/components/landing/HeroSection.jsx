import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { ArrowRight, ShieldCheck, Zap, Sparkles, Calendar, Award } from 'lucide-react';

export default function HeroSection() {
  const heroRef = useRef(null);
  const apertureRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // 1. Anime.js Timeline for Hero Content Entrance
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1000,
    });

    timeline
      .add({
        targets: '.hero-badge',
        opacity: [0, 1],
        translateY: [-20, 0],
        duration: 800,
      })
      .add({
        targets: '.hero-title-line',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(150),
        duration: 900,
      }, '-=400')
      .add({
        targets: '.hero-subtitle',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
      }, '-=600')
      .add({
        targets: '.hero-cta',
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 800,
      }, '-=500')
      .add({
        targets: '.hero-stat-card',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(120),
        duration: 700,
      }, '-=400');

    // 2. Continuous Anime.js Rotation & Pulse for Lens Aperture Graphic
    anime({
      targets: '.aperture-blade',
      rotate: '+=360deg',
      duration: 25000,
      easing: 'linear',
      loop: true,
    });

    anime({
      targets: '.aperture-glow',
      scale: [1, 1.12, 1],
      opacity: [0.3, 0.6, 0.3],
      duration: 4000,
      easing: 'easeInOutSine',
      loop: true,
    });

    // 3. Anime.js Number Counter for Gear Available
    const counterObj = { count: 0, rating: 0 };
    anime({
      targets: counterObj,
      count: 250,
      rating: 99.8,
      round: 1,
      easing: 'easeInOutQuad',
      duration: 2200,
      update: () => {
        const countEl = document.getElementById('stat-gear-count');
        const ratingEl = document.getElementById('stat-satisfaction');
        if (countEl) countEl.innerHTML = `${counterObj.count}+`;
        if (ratingEl) ratingEl.innerHTML = `${(counterObj.rating).toFixed(1)}%`;
      },
    });

  }, []);

  return (
    <section ref={heroRef} className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-studio-950">
      
      {/* Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amberGold-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Hallmark Pill Badge */}
            <div className="hero-badge opacity-0 inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-studio-900 border border-amberGold-500/30 text-amberGold-400 text-xs font-semibold tracking-wide shadow-amber-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRO-GRADE CAMERA RENTALS &bull; GUARANTEED AVAILABILITY</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] font-display">
              <span className="hero-title-line block opacity-0">Rent Cinema Gear</span>
              <span className="hero-title-line block opacity-0 bg-gradient-to-r from-cyan-400 via-sky-300 to-amberGold-400 bg-clip-text text-transparent">
                Without Limits.
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-subtitle opacity-0 text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Book Sony FX3, RED Komodo, Hasselblad Drones & Cine Lenses with real-time date availability protection, instant deposit refunds, and zero hidden fees.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta opacity-0 flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#catalog"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-studio-glow flex items-center space-x-2 focus-ring hover:scale-[1.02] transition-transform min-touch-target"
              >
                <span>Browse Camera Inventory</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#calculator"
                className="px-6 py-3.5 rounded-xl bg-studio-900 hover:bg-studio-850 text-slate-200 hover:text-white border border-studio-750 font-semibold text-sm focus-ring min-touch-target flex items-center space-x-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Estimate Rental Cost</span>
              </a>
            </div>

            {/* Value Guarantees List */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Double-Booking Protection Engine</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-amberGold-400" />
                <span>Min 1 Day - Max 14 Days Flexible Holds</span>
              </div>
            </div>

          </div>

          {/* Right Column: Anime.js Lens Graphic & Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Glowing Ring Container */}
            <div className="aperture-glow absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 to-amberGold-500/20 blur-2xl" />

            {/* Animated Lens Aperture SVG */}
            <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl glass-card p-6 border border-studio-700/80 shadow-2xl flex flex-col justify-between overflow-hidden">
              
              {/* Top Card Header */}
              <div className="flex items-center justify-between border-b border-studio-800 pb-3 z-10">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-mono text-emerald-400 uppercase font-semibold">LIVE AVAILABILITY</span>
                </div>
                <span className="text-xs font-mono text-slate-400">SERIES 2026</span>
              </div>

              {/* Center Spinning Aperture Blades SVG */}
              <div className="my-auto flex justify-center items-center relative py-6">
                <svg
                  ref={apertureRef}
                  className="aperture-blade w-40 h-40 sm:w-48 sm:h-48 text-cyan-400 opacity-90 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="50" cy="50" r="46" stroke="#2a3647" strokeWidth="2" />
                  <circle cx="50" cy="50" r="28" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M50 4 L50 96 M4 L50 L96 50 M17 17 L83 83 M83 17 L17 83" stroke="#1c2430" strokeWidth="1" />
                  <polygon points="50,22 68,34 68,66 50,78 32,66 32,34" stroke="#fbbf24" strokeWidth="2" fill="rgba(245,158,11,0.05)" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs font-mono text-cyan-400 font-bold">SONY FX3</span>
                  <span className="text-[10px] text-amberGold-400 font-mono">$110 / DAY</span>
                </div>
              </div>

              {/* Card Footer Badge */}
              <div className="border-t border-studio-800 pt-3 flex items-center justify-between text-xs z-10">
                <span className="text-slate-400">Deposit Refund Guarantee</span>
                <span className="font-semibold text-white">100% Held Safe</span>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Metrics Bar */}
        <div ref={statsRef} className="mt-16 pt-10 border-t border-studio-850/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="hero-stat-card opacity-0 glass-card p-5 rounded-2xl border border-studio-800">
            <span id="stat-gear-count" className="text-3xl font-extrabold text-white font-display block">0+</span>
            <span className="text-xs text-slate-400 font-medium">Cinema Gear Packages</span>
          </div>

          <div className="hero-stat-card opacity-0 glass-card p-5 rounded-2xl border border-studio-800">
            <span id="stat-satisfaction" className="text-3xl font-extrabold text-cyan-400 font-display block">0%</span>
            <span className="text-xs text-slate-400 font-medium">Verified Renter Rating</span>
          </div>

          <div className="hero-stat-card opacity-0 glass-card p-5 rounded-2xl border border-studio-800">
            <span className="text-3xl font-extrabold text-amberGold-400 font-display block">1 - 14</span>
            <span className="text-xs text-slate-400 font-medium">Days Flexible Bookings</span>
          </div>

          <div className="hero-stat-card opacity-0 glass-card p-5 rounded-2xl border border-studio-800">
            <span className="text-3xl font-extrabold text-emerald-400 font-display block">$0</span>
            <span className="text-xs text-slate-400 font-medium">Hidden Processing Fees</span>
          </div>
        </div>

      </div>
    </section>
  );
}
