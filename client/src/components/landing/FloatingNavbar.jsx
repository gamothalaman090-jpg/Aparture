import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';

export default function FloatingNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-28 opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-6 px-6 py-2.5 rounded-full backdrop-blur-2xl border transition-all duration-500 shadow-2xl bg-slate-950/85 border-slate-700/60 text-white">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_12px_rgba(6,182,212,0.5)]">
            <Camera className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div className="text-xs font-extrabold tracking-[0.2em] uppercase whitespace-nowrap font-display text-white">
            APERTURE
          </div>
        </a>
        
        <div className="hidden md:flex gap-6 text-[11px] font-mono uppercase tracking-[0.15em] text-slate-300">
          <a href="#features-section" className="hover:text-cyan-400 transition-colors">
            Cinema Fleet
          </a>
          <a href="#features-section" className="hover:text-cyan-400 transition-colors">
            Optics & Lenses
          </a>
          <a href="#testimonials-section" className="hover:text-cyan-400 transition-colors">
            On-Set Guarantees
          </a>
        </div>

        <a
          href="#features-section"
          className="px-5 py-2 font-bold text-[10px] uppercase tracking-widest rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          Browse Fleet
        </a>
      </div>
    </nav>
  );
}
