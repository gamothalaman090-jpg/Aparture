import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, ArrowLeft, Zap, AlertTriangle } from 'lucide-react';
import { soundFx } from '../services/audioService.js';
import { createCameraFlashDOM, createParticleExplosion } from '../utils/domFx.js';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';
import CustomCursor from '../components/landing/CustomCursor.jsx';

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleFlash = (e) => {
    soundFx.playSnapSound();
    createCameraFlashDOM({ duration: 300 });
    createParticleExplosion(e, { count: 24 });
  };

  const handleNav = (path) => {
    soundFx.playClickSound();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden flex flex-col justify-between">
      <CustomCursor />
      <FloatingNavbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center flex-1 flex flex-col items-center justify-center relative">
        
        {/* Background Glowing Lens Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* 404 Cinema Glass Panel */}
        <div className="glass-panel-cinema rounded-3xl p-8 sm:p-14 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.2)] max-w-2xl w-full space-y-6 relative z-10 animate-fadeIn">
          
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>// ERROR 404: FRAME OUT OF FOCUS</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-7xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600 font-display tracking-tighter select-none">
              404
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-display">
              Uncharted Optical Coordinate
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-md mx-auto leading-relaxed">
              The requested camera rig or studio endpoint does not exist in Aperture's active fleet catalog.
            </p>
          </div>

          {/* Action Button Matrix */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs font-bold">
            <button
              onClick={() => handleNav('/catalog')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white uppercase tracking-wider flex items-center justify-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
            >
              <Film className="w-4 h-4" />
              <span>Explore Gear Catalog</span>
            </button>

            <button
              onClick={() => handleNav('/')}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 uppercase tracking-wider flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Studio Home</span>
            </button>

            <button
              onClick={handleFlash}
              title="Test DOM Flash"
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider flex items-center justify-center space-x-1.5"
            >
              <Zap className="w-4 h-4" />
              <span>Shutter Flash</span>
            </button>
          </div>

        </div>

      </main>

      <ApertureFooter />
    </div>
  );
}
