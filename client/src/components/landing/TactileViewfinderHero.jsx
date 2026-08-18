import React, { useState, useEffect, useRef } from 'react';
import anime from 'animejs';
import { Camera, Eye, Sliders, Sun, Zap, Sparkles, Volume2, ShieldCheck } from 'lucide-react';

const LENS_FOCAL_LENGTHS = [
  { mm: '24mm', label: 'Ultra-Wide', scale: 1.0, blur: 0 },
  { mm: '35mm', label: 'Documentary', scale: 1.25, blur: 1 },
  { mm: '50mm', label: 'Standard Prime', scale: 1.6, blur: 2 },
  { mm: '85mm', label: 'Cine Portrait', scale: 2.1, blur: 4 },
];

const APERTURES = [
  { f: 'f/1.4', blur: 'blur-[0px]', depth: 'Shallow Depth of Field' },
  { f: 'f/2.8', blur: 'blur-[0.5px]', depth: 'Standard Cinema' },
  { f: 'f/5.6', blur: 'blur-[1px]', depth: 'Deep Focus' },
  { f: 'f/11', blur: 'blur-[2px]', depth: 'Landscape Sharpness' },
];

const LUTS = [
  { id: 'cinetone', name: 'S-Cinetone', filter: 'contrast(1.08) saturate(1.1) brightness(1.02)' },
  { id: 'monochrom', name: 'Leica B&W', filter: 'grayscale(1) contrast(1.25) brightness(0.95)' },
  { id: 'teal-orange', name: 'Blockbuster', filter: 'hue-rotate(15deg) contrast(1.15) saturate(1.3)' },
  { id: 'vintage-film', name: '35mm Kodak', filter: 'sepia(0.2) contrast(1.05) saturate(0.9)' },
];

export default function TactileViewfinderHero() {
  const [selectedFocal, setSelectedFocal] = useState(LENS_FOCAL_LENGTHS[1]); // 35mm default
  const [selectedAperture, setSelectedAperture] = useState(APERTURES[1]); // f/2.8
  const [selectedLut, setSelectedLut] = useState(LUTS[0]); // S-Cinetone
  const [isRecording, setIsRecording] = useState(true);
  const [shutterFlashing, setShutterFlashing] = useState(false);
  const [recordTime, setRecordTime] = useState(14);

  const viewfinderBgRef = useRef(null);
  const shutterOverlayRef = useRef(null);

  // Time code incrementer
  useEffect(() => {
    const timer = setInterval(() => {
      setRecordTime(t => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimeCode = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `00:${mins}:${secs}:18`;
  };

  // Anime.js Zoom effect when Focal length changes
  useEffect(() => {
    if (viewfinderBgRef.current) {
      anime({
        targets: viewfinderBgRef.current,
        scale: selectedFocal.scale,
        duration: 800,
        easing: 'cubicBezier(0.16, 1, 0.3, 1)',
      });
    }
  }, [selectedFocal]);

  // Shutter click trigger
  const triggerShutter = () => {
    setShutterFlashing(true);
    
    // Anime.js mechanical shutter curtain wipe
    anime({
      targets: shutterOverlayRef.current,
      scaleY: [0, 1, 0],
      duration: 350,
      easing: 'easeInOutQuad',
      complete: () => setShutterFlashing(false),
    });
  };

  return (
    <section className="relative pt-6 pb-20 bg-studio-950 text-slate-100 overflow-hidden font-sans border-b border-studio-850">
      
      {/* Top Header Marquee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-studio-850 pb-4">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono text-slate-300 font-semibold tracking-wider uppercase">
              CAMERA HARDWARE UI &bull; PRODUCTION GEAR RENTALS
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono text-slate-400">
            <span>SYS: ONLINE</span>
            <span>FREQ: 24.000 FPS</span>
            <span>AUDIO: -12dB STEREO</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Viewfinder Monitor Frame */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-studio-750 bg-black shadow-2xl">
          
          {/* Mechanical Shutter Flash Overlay */}
          <div
            ref={shutterOverlayRef}
            className="absolute inset-0 bg-white z-50 pointer-events-none origin-top scale-y-0"
          />

          {/* Viewfinder Background Image with Live Controls */}
          <div className="relative h-[480px] sm:h-[560px] w-full overflow-hidden flex items-center justify-center">
            
            <img
              ref={viewfinderBgRef}
              src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1920&q=85"
              alt="Sony FX3 Cinema Camera Viewfinder"
              className="w-full h-full object-cover transition-filter duration-500 origin-center"
              style={{ filter: selectedLut.filter }}
            />

            {/* Viewfinder Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

            {/* Viewfinder Frame Crosshairs & Grid (Design Spell Detail) */}
            <div className="absolute inset-0 border-[16px] sm:border-[24px] border-black/50 pointer-events-none flex flex-col justify-between p-4">
              
              {/* Corner Frame Markers */}
              <div className="flex justify-between text-white/40 font-mono text-xs">
                <span>┌ 4K DCI</span>
                <span>RAW 16-BIT ┐</span>
              </div>

              {/* Center Crosshair Marker */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-12 h-12 border border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                </div>
                <div className="absolute w-20 h-[1px] bg-white/20" />
                <div className="absolute h-20 w-[1px] bg-white/20" />
              </div>

              <div className="flex justify-between text-white/40 font-mono text-xs">
                <span>└ S-LOG3</span>
                <span>BAT 98% ┘</span>
              </div>
            </div>

            {/* Live Recording HUD Top Bar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-white z-20">
              <div className="flex items-center space-x-3 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold tracking-wider text-red-400">REC</span>
                <span className="text-white font-mono">{formatTimeCode(recordTime)}</span>
              </div>

              {/* Active Lens Spec Display */}
              <div className="hidden sm:flex items-center space-x-4 bg-black/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-slate-300">
                <span className="text-amberGold-400 font-bold">{selectedFocal.mm}</span>
                <span>&bull;</span>
                <span className="text-cyan-400 font-bold">{selectedAperture.f}</span>
                <span>&bull;</span>
                <span>ISO 800</span>
                <span>&bull;</span>
                <span>1/250s</span>
              </div>

              {/* Shutter Trigger Button */}
              <button
                onClick={triggerShutter}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-bold font-mono text-xs shadow-lg focus-ring active:scale-95 transition-transform flex items-center space-x-1.5 min-touch-target"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>SNAP SHUTTER</span>
              </button>
            </div>

            {/* Center Hero Overlay Copy */}
            <div className="absolute bottom-16 sm:bottom-20 left-6 sm:left-12 max-w-xl z-20 space-y-3">
              <span className="px-3 py-1 rounded-md bg-amberGold-500/20 text-amberGold-400 font-mono text-[11px] font-bold tracking-wider border border-amberGold-500/30 backdrop-blur-md">
                CINEMA GEAR RENTAL PLATFORM
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-tight drop-shadow-md">
                Professional Optics & Rigs On Demand.
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed drop-shadow-sm">
                Reserve Sony FX3, RED Komodo, Leica Glass & Hasselblad Drones. Guaranteed double-booking protection and 100% safe deposit refunds.
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <a
                  href="#rig-builder"
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-studio-950 font-bold text-xs font-mono shadow-studio-glow focus-ring transition-all"
                >
                  Build Cinema Rig &rarr;
                </a>
                <a
                  href="#film-catalog"
                  className="px-5 py-2.5 rounded-xl bg-black/60 hover:bg-black/80 text-white border border-white/20 font-mono text-xs focus-ring transition-all"
                >
                  Explore Catalog
                </a>
              </div>
            </div>

          </div>

          {/* Tactile Hardware Control Deck (Bottom Console Bar) */}
          <div className="bg-studio-900 border-t border-studio-800 p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. Focal Length Switcher Wheel */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-2 font-bold flex items-center space-x-1">
                <Eye className="w-3.5 h-3.5 text-cyan-400" />
                <span>Lens Focal Length Zoom</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {LENS_FOCAL_LENGTHS.map((f) => (
                  <button
                    key={f.mm}
                    onClick={() => setSelectedFocal(f)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition-all focus-ring ${
                      selectedFocal.mm === f.mm
                        ? 'bg-cyan-500 text-studio-950 shadow-studio-glow'
                        : 'bg-studio-950 text-slate-300 hover:bg-studio-800 border border-studio-800'
                    }`}
                  >
                    {f.mm}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Aperture Ring Control */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-2 font-bold flex items-center space-x-1">
                <Sun className="w-3.5 h-3.5 text-amberGold-400" />
                <span>Iris / Aperture Ring</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {APERTURES.map((a) => (
                  <button
                    key={a.f}
                    onClick={() => setSelectedAperture(a)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold transition-all focus-ring ${
                      selectedAperture.f === a.f
                        ? 'bg-amberGold-500 text-studio-950 shadow-amber-glow'
                        : 'bg-studio-950 text-slate-300 hover:bg-studio-800 border border-studio-800'
                    }`}
                  >
                    {a.f}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Color LUT / Film Stock Profile */}
            <div>
              <label className="block text-[11px] font-mono text-slate-400 uppercase mb-2 font-bold flex items-center space-x-1">
                <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                <span>Color LUT Profile</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {LUTS.map((lut) => (
                  <button
                    key={lut.id}
                    onClick={() => setSelectedLut(lut)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-mono transition-all truncate text-left focus-ring ${
                      selectedLut.id === lut.id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                        : 'bg-studio-950 text-slate-400 hover:text-white border border-studio-800'
                    }`}
                  >
                    {lut.name}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
