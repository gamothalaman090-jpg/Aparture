import React from 'react';
import { Camera } from 'lucide-react';

export default function Preloader({ progress, isLoaded }) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090E] text-white transition-opacity duration-1000 ease-in-out ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] mb-8 animate-pulse">
        <Camera className="w-8 h-8 stroke-[2.2]" />
      </div>

      <div className="text-3xl md:text-5xl font-extrabold tracking-[0.25em] uppercase mb-8 font-display bg-gradient-to-r from-white via-slate-200 to-cyan-400 bg-clip-text text-transparent">
        APERTURE
      </div>
      
      {/* Progress Bar Container */}
      <div className="w-72 h-[3px] bg-white/10 relative overflow-hidden rounded-full border border-white/5">
        <div
          className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-5 font-mono text-[11px] tracking-widest text-cyan-400/70 uppercase font-medium">
        Calibrating Optics & Cinema Rigs... {progress}%
      </div>
    </div>
  );
}
