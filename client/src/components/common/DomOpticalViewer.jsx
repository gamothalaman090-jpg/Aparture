import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Maximize2,
  Grid,
  Sparkles,
  Sliders,
  ZoomIn,
  RefreshCw,
  Sun,
  Eye,
  Crosshair,
} from 'lucide-react';
import { createParticleExplosion, createCameraFlashDOM, showDOMTooltip } from '../../utils/domFx.js';
import { soundFx } from '../../services/audioService.js';

const COLOR_PROFILES = [
  { id: 'standard', name: 'Raw Natural', filter: 'none', badge: 'RAW 14-BIT' },
  { id: 'scinetone', name: 'S-Cinetone', filter: 'contrast(1.15) saturate(1.2) brightness(0.98)', badge: 'CINEMA LOG' },
  { id: 'monochrome', name: 'Leica Noir', filter: 'grayscale(100%) contrast(1.4) brightness(0.95)', badge: 'B&W HC' },
  { id: 'anamorphic', name: 'Anamorphic 2.39:1', filter: 'contrast(1.2) saturate(1.3) hue-rotate(190deg) brightness(0.9)', badge: 'ANAMORPHIC' },
  { id: 'infrared', name: 'IR Night Vision', filter: 'invert(80%) hue-rotate(120deg) contrast(1.5)', badge: 'IR SPECTRUM' },
  { id: 'golden', name: 'Sunset Warmth', filter: 'sepia(45%) saturate(1.4) contrast(1.1)', badge: 'GOLDEN HOUR' },
];

const APERTURES = ['f/1.2', 'f/1.8', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/16'];

export default function DomOpticalViewer({
  imageUrl,
  cameraName = 'Cinema Rig',
  brand = 'Sony',
  condition = 'Mint',
  className = '',
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const loupeRef = useRef(null);
  const shutterBtnRef = useRef(null);

  const [activeProfile, setActiveProfile] = useState(COLOR_PROFILES[0]);
  const [showGrid, setShowGrid] = useState(true);
  const [apertureIndex, setApertureIndex] = useState(2); // f/2.8
  const [isLoupeActive, setIsLoupeActive] = useState(false);
  const [loupePos, setLoupePos] = useState({ x: 0, y: 0, relX: 50, relY: 50 });
  const [shutterCount, setShutterCount] = useState(999);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Direct DOM Loupe Mouse Coordinate Engine
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        setIsLoupeActive(false);
        return;
      }

      setIsLoupeActive(true);

      const relX = (x / rect.width) * 100;
      const relY = (y / rect.height) * 100;

      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        setLoupePos({ x, y, relX, relY });
        if (loupeRef.current) {
          loupeRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
          loupeRef.current.style.backgroundPosition = `${relX}% ${relY}%`;
        }
      });
    };

    const handleMouseLeave = () => {
      setIsLoupeActive(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [imageUrl]);

  // Shutter trigger with DOM flash and particles
  const handleShutter = (e) => {
    e.stopPropagation();
    soundFx.playSnapSound();
    createCameraFlashDOM({ duration: 250 });
    if (shutterBtnRef.current) {
      createParticleExplosion(shutterBtnRef.current, {
        count: 24,
        colors: ['#06b6d4', '#f59e0b', '#ffffff', '#38bdf8'],
        spread: 140,
      });
      showDOMTooltip(shutterBtnRef.current, `FRAME SAVED (#${shutterCount})`, { color: '#06b6d4' });
    }
    setShutterCount((prev) => Math.max(0, prev - 1));
  };

  // Toggle DOM Fullscreen
  const toggleFullscreen = () => {
    soundFx.playClickSound();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Blur simulation based on aperture (f/1.2 = high blur, f/16 = sharp)
  const blurAmount = Math.max(0, (4 - apertureIndex) * 1.2);

  return (
    <div className={`glass-panel-cinema rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative flex flex-col ${className}`}>
      
      {/* Top Viewfinder HUD Bar */}
      <div className="bg-black/80 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-red-500 font-bold tracking-wider animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>REC READY</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400 font-bold">4K 120FPS RAW</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-amber-400 hidden sm:inline font-bold">ISO 800</span>
        </div>

        <div className="flex items-center space-x-3 text-slate-300">
          <span className="text-slate-400 text-[11px]">LUT: <strong className="text-white">{activeProfile.name}</strong></span>
          <span className="text-emerald-400 font-bold">SHUTTER: {shutterCount}</span>
        </div>
      </div>

      {/* Main Interactive Viewport Frame */}
      <div
        ref={containerRef}
        className="relative aspect-[16/10] bg-black overflow-hidden cursor-crosshair group select-none"
      >
        {/* Main Subject Image with Dynamic DOM Filter & Aperture Blur */}
        <img
          ref={imageRef}
          src={imageUrl}
          alt={cameraName}
          style={{
            filter: `${activeProfile.filter} blur(${blurAmount * 0.2}px)`,
            transition: 'filter 300ms ease',
          }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />

        {/* Dynamic DOM Rule-of-Thirds Grid Overlay */}
        {showGrid && (
          <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10 transition-opacity duration-200 opacity-60">
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-b border-white/20" />
            <div className="border-r border-b border-white/20" />
            <div className="border-r border-b border-white/20 flex items-center justify-center">
              <Crosshair className="w-6 h-6 text-cyan-400/80 animate-pulse" />
            </div>
            <div className="border-b border-white/20" />
            <div className="border-r border-white/20" />
            <div className="border-r border-white/20" />
            <div />
          </div>
        )}

        {/* Dynamic Interactive DOM Magnifying Loupe */}
        <div
          ref={loupeRef}
          className={`absolute top-0 left-0 w-36 h-36 rounded-full border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.8),inset_0_0_15px_rgba(6,182,212,0.4)] pointer-events-none z-20 overflow-hidden bg-no-repeat transition-opacity duration-150 ${
            isLoupeActive ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: '350%',
            willChange: 'transform, background-position',
          }}
        >
          {/* Loupe Crosshair overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-4 h-0.5 bg-cyan-300 opacity-80" />
            <div className="h-4 w-0.5 bg-cyan-300 opacity-80 -ml-2" />
          </div>
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-black/80 text-[9px] font-mono text-cyan-300 font-bold uppercase">
            3.5x LOUPE
          </div>
        </div>

        {/* Floating Top Badges */}
        <div className="absolute top-3 left-3 z-10 flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-cyan-400 border border-cyan-500/40 uppercase tracking-wide">
            {brand}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono uppercase font-bold">
            {condition}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono uppercase font-bold">
            {activeProfile.badge}
          </span>
        </div>

        {/* Quick Viewport Action Buttons */}
        <div className="absolute top-3 right-3 z-10 flex items-center space-x-2">
          <button
            onClick={() => {
              soundFx.playDialTickSound(1.1);
              setShowGrid(!showGrid);
            }}
            title="Toggle Rule of Thirds Grid"
            className={`p-2 rounded-xl backdrop-blur-md border transition-all text-xs font-mono flex items-center space-x-1 ${
              showGrid
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-400/50 shadow-cyan-glow'
                : 'bg-black/70 text-slate-400 border-white/10 hover:text-white'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Fullscreen Studio Mode"
            className="p-2 rounded-xl bg-black/70 backdrop-blur-md text-slate-300 hover:text-white border border-white/10 hover:border-cyan-400/50 transition-all"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Shutter & Exposure Bar */}
        <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between pointer-events-auto">
          {/* Aperture Iris Dial */}
          <div className="flex items-center space-x-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/10">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">Iris:</span>
            <div className="flex items-center space-x-1">
              {APERTURES.map((ap, idx) => (
                <button
                  key={ap}
                  onClick={() => {
                    soundFx.playDialTickSound(0.9 + idx * 0.1);
                    setApertureIndex(idx);
                  }}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-all ${
                    apertureIndex === idx
                      ? 'bg-cyan-500 text-black font-extrabold shadow-[0_0_8px_rgba(6,182,212,0.8)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {ap}
                </button>
              ))}
            </div>
          </div>

          {/* Shutter Capture Button */}
          <button
            ref={shutterBtnRef}
            onClick={handleShutter}
            title="Trigger Shutter Snapshot"
            className="group/shutter relative flex items-center space-x-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.6)] active:scale-95 transition-all"
          >
            <Camera className="w-4 h-4 group-hover/shutter:rotate-12 transition-transform" />
            <span className="hidden sm:inline">TEST SHUTTER</span>
          </button>
        </div>
      </div>

      {/* Sensor LUT / Color Profile Filter Selector Bar */}
      <div className="bg-black/90 p-3 border-t border-white/10 flex items-center justify-between gap-2 overflow-x-auto select-none">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="uppercase tracking-wider text-[10px]">Sensor Grade:</span>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {COLOR_PROFILES.map((profile) => (
            <button
              key={profile.id}
              onClick={() => {
                soundFx.playDialTickSound(1.3);
                setActiveProfile(profile);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-medium transition-all ${
                activeProfile.id === profile.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
              }`}
            >
              {profile.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
