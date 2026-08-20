import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CustomCursor from '../components/landing/CustomCursor.jsx';
import Preloader from '../components/landing/Preloader.jsx';
import FloatingNavbar from '../components/landing/FloatingNavbar.jsx';
import ScrollyHero from '../components/landing/ScrollyHero.jsx';
import BentoFeatures from '../components/landing/BentoFeatures.jsx';
import TestimonialsMarquee from '../components/landing/TestimonialsMarquee.jsx';
import FinalCTA from '../components/landing/FinalCTA.jsx';
import ApertureFooter from '../components/landing/ApertureFooter.jsx';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 87;

export default function HomePage() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesList, setImagesList] = useState([]);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/images/ezgif-1b32d6e0c8f85d1e-jpg/ezgif-frame-${numStr}.jpg`;

      const onImageLoad = () => {
        loadedCount++;
        const currentProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setProgress(currentProgress);

        if (loadedCount >= TOTAL_FRAMES) {
          setImagesList(loadedImages);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => ScrollTrigger.refresh(), 300);
          }, 300);
        }
      };

      img.onload = onImageLoad;
      img.onerror = onImageLoad;
      loadedImages[i - 1] = img;
    }

    const fallbackTimer = setTimeout(() => {
      setImagesList(loadedImages);
      setIsLoaded(true);
      setTimeout(() => ScrollTrigger.refresh(), 300);
    }, 3500);

    return () => clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F7] selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      <CustomCursor />
      <Preloader progress={progress} isLoaded={isLoaded} />
      <FloatingNavbar />

      <main>
        <ScrollyHero imagesLoaded={isLoaded} imagesList={imagesList} />
        <BentoFeatures />
        <TestimonialsMarquee />
        <FinalCTA />
      </main>

      <ApertureFooter />
    </div>
  );
}
