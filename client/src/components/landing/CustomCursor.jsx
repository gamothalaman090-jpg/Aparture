import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Direct 1:1 hardware-accelerated positional tracking for ZERO latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] hidden md:block transition-colors duration-150 ${
          isHovered ? 'bg-cyan-400 scale-125' : 'bg-white'
        }`}
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 border rounded-full pointer-events-none z-[9998] hidden md:block transition-[width,height,background-color,border-color,box-shadow] duration-150 ease-out ${
          isPressed
            ? 'w-6 h-6 border-cyan-400 bg-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.6)]'
            : isHovered
            ? 'w-12 h-12 border-cyan-400/80 bg-cyan-500/10 backdrop-blur-[2px]'
            : 'w-8 h-8 border-white/50 backdrop-blur-[1px]'
        }`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
