import React, { useRef, useEffect } from 'react';
import { attach3DTilt } from '../../utils/domFx.js';

/**
 * DOM 3D Perspective Tilt Card Wrapper
 * Leverages direct JavaScript DOM mouse coordinates and transform updates for zero-lag 3D parallax.
 */
export default function DomTiltCard({
  children,
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.015,
  ...props
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const cleanup = attach3DTilt(cardEl, {
      maxTilt,
      perspective,
      scale,
    });

    return cleanup;
  }, [maxTilt, perspective, scale]);

  return (
    <div
      ref={cardRef}
      className={`relative will-change-transform ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
