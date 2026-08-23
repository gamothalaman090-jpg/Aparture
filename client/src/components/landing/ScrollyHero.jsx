import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 87;

export default function ScrollyHero({ imagesLoaded, imagesList }) {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  const darkOverlayRef = useRef(null);
  const beat1Ref = useRef(null);
  const beat2Ref = useRef(null);
  const beat3Ref = useRef(null);
  const beat4Ref = useRef(null);

  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);

  useEffect(() => {
    if (!imagesList || imagesList.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderState = { frame: 0 };

    const renderFrame = (index) => {
      const cvs = canvasRef.current;
      if (!cvs) return;
      const ctx = cvs.getContext('2d');
      if (!ctx) return;

      const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(index)));
      setCurrentFrameIndex(idx + 1);
      const img = imagesList[idx];
      if (!img) return;

      const rect = cvs.getBoundingClientRect();
      const w = rect.width || window.innerWidth;
      const h = rect.height || window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      if (cvs.width !== Math.floor(w * dpr) || cvs.height !== Math.floor(h * dpr)) {
        cvs.width = Math.floor(w * dpr);
        cvs.height = Math.floor(h * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      if (img.complete && img.naturalWidth > 0) {
        const hRatio = w / img.naturalWidth;
        const vRatio = h / img.naturalHeight;
        const ratio = Math.max(hRatio, vRatio);

        const shiftX = (w - img.naturalWidth * ratio) / 2;
        const shiftY = (h - img.naturalHeight * ratio) / 2;

        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          shiftX,
          shiftY,
          img.naturalWidth * ratio,
          img.naturalHeight * ratio
        );
      }
      ctx.restore();
    };

    renderFrame(0);

    const updateBeats = (progress) => {
      let op1 = 0, op2 = 0, op3 = 0, op4 = 0;

      // Beat 1: 0% - 22%
      if (beat1Ref.current) {
        op1 = progress >= 0 && progress < 0.22
          ? (progress < 0.05 ? progress / 0.05 : progress > 0.17 ? (0.22 - progress) / 0.05 : 1)
          : 0;
        op1 = Math.max(0, Math.min(1, op1));
        beat1Ref.current.style.opacity = op1;
        beat1Ref.current.style.transform = `translateY(${(1 - op1) * 20}px)`;
      }

      // Beat 2: 25% - 47%
      if (beat2Ref.current) {
        op2 = progress >= 0.25 && progress < 0.47
          ? (progress < 0.30 ? (progress - 0.25) / 0.05 : progress > 0.42 ? (0.47 - progress) / 0.05 : 1)
          : 0;
        op2 = Math.max(0, Math.min(1, op2));
        beat2Ref.current.style.opacity = op2;
        beat2Ref.current.style.transform = `translateY(${(1 - op2) * 20}px)`;
      }

      // Beat 3: 50% - 72%
      if (beat3Ref.current) {
        op3 = progress >= 0.50 && progress < 0.72
          ? (progress < 0.55 ? (progress - 0.50) / 0.05 : progress > 0.67 ? (0.72 - progress) / 0.05 : 1)
          : 0;
        op3 = Math.max(0, Math.min(1, op3));
        beat3Ref.current.style.opacity = op3;
        beat3Ref.current.style.transform = `translateY(${(1 - op3) * 20}px)`;
      }

      // Beat 4: 75% - 100%
      if (beat4Ref.current) {
        op4 = progress >= 0.75
          ? (progress < 0.80 ? (progress - 0.75) / 0.05 : 1)
          : 0;
        op4 = Math.max(0, Math.min(1, op4));
        beat4Ref.current.style.opacity = op4;
        beat4Ref.current.style.transform = `translateY(${(1 - op4) * 20}px)`;
      }

      const maxTextOpacity = Math.max(op1, op2, op3, op4);
      if (darkOverlayRef.current) {
        darkOverlayRef.current.style.opacity = (maxTextOpacity * 0.7).toFixed(2);
      }
    };

    const ctxGsap = gsap.context(() => {
      gsap.to(renderState, {
        frame: TOTAL_FRAMES - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          onUpdate: (self) => {
            renderFrame(renderState.frame);
            updateBeats(self.progress);
          },
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    const handleResize = () => {
      renderFrame(renderState.frame);
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctxGsap.revert();
    };
  }, [imagesLoaded, imagesList]);

  return (
    <section id="scrolly-hero" ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden">
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover pointer-events-none z-[1]"
      />

      {/* Dynamic Screen Darkening Overlay */}
      <div
        ref={darkOverlayRef}
        className="absolute inset-0 z-[3] pointer-events-none bg-black/90 transition-opacity duration-300 opacity-0"
      />

      {/* Gradient Scrim for high contrast */}
      <div className="absolute inset-0 z-[4] pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Camera Viewfinder Tactical HUD Overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none p-6 md:p-10 flex flex-col justify-between select-none">
        
        {/* Top Viewfinder Bar */}
        <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <span className="text-white font-bold tracking-widest">● REC 8K RAW</span>
          </div>
          <div className="hidden sm:flex items-center space-x-6 text-slate-300">
            <span>FPS: 23.976</span>
            <span>SHUTTER: 1/48s</span>
            <span>ISO: 800</span>
          </div>
          <div className="text-amber-400 font-bold">
            FRAME: {String(currentFrameIndex).padStart(3, '0')}/{TOTAL_FRAMES}
          </div>
        </div>

        {/* Framing Crosshairs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-cyan-400/80 rounded-full" />
          <div className="absolute w-full h-[1px] bg-white/10" />
          <div className="absolute h-full w-[1px] bg-white/10" />
        </div>

        {/* Viewfinder Corners */}
        <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60" />
        <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60" />
        <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60" />
        <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60" />

        {/* Bottom Viewfinder Bar */}
        <div className="flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-400 tracking-widest uppercase">
          <div>ASPECT: 2.39:1 CINEMASCOPE</div>
          <div className="text-cyan-400">APERTURE SYSTEM v2.4</div>
        </div>

      </div>

      {/* Text Overlay Beats */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="relative w-full h-full max-w-[90rem] mx-auto flex flex-col justify-center items-center px-8 md:px-16">
          
          {/* Beat 1 */}
          <div
            ref={beat1Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-200"
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-24 mb-6 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
            <h2 className="text-3xl md:text-[3.5rem] lg:text-[5rem] font-extrabold text-white tracking-[0.18em] uppercase leading-[1.1] font-display drop-shadow-md">
              Cinema Optics
            </h2>
            <p className="text-xs md:text-sm text-cyan-400 font-mono tracking-[0.35em] uppercase mt-6 font-semibold">
              Master-Grade Lenses & Full-Frame Sensors
            </p>
          </div>

          {/* Beat 2 */}
          <div
            ref={beat2Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-200"
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent w-24 mb-6 shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
            <h2 className="text-3xl md:text-[3.5rem] lg:text-[5rem] font-extrabold text-white tracking-[0.18em] uppercase leading-[1.1] font-display drop-shadow-md">
              Precision Calibration
            </h2>
            <p className="text-xs md:text-sm text-amber-400 font-mono tracking-[0.35em] uppercase mt-6 font-semibold">
              Micron-Accurate Follow Focus & Wireless Rigs
            </p>
          </div>

          {/* Beat 3 */}
          <div
            ref={beat3Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-200"
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent w-24 mb-6 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
            <h2 className="text-3xl md:text-[3.5rem] lg:text-[5rem] font-extrabold text-white tracking-[0.18em] uppercase leading-[1.1] font-display drop-shadow-md">
              Uncompromising Vision
            </h2>
            <p className="text-xs md:text-sm text-cyan-400 font-mono tracking-[0.35em] uppercase mt-6 font-semibold">
              8K RAW High-Speed Cinema Captures
            </p>
          </div>

          {/* Beat 4 */}
          <div
            ref={beat4Ref}
            className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 transition-opacity duration-200"
          >
            <div className="h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent w-28 mb-6 shadow-[0_0_15px_rgba(6,182,212,0.9)]" />
            <h2 className="text-4xl md:text-[4rem] lg:text-[6rem] font-extrabold text-white tracking-[0.2em] uppercase leading-[1.1] font-display drop-shadow-lg">
              APERTURE
            </h2>
            <p className="text-xs md:text-base text-amber-400 font-mono tracking-[0.4em] uppercase mt-8 font-semibold">
              Rent Cinema Gear Without Limits
            </p>
          </div>

        </div>
      </div>

      {/* Ambient Cyan/Amber Lens Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

    </section>
  );
}
