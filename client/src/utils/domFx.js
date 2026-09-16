/**
 * Vanilla JavaScript DOM Utility Engine
 * Direct DOM manipulation for high-performance physics, particle bursts,
 * camera shutter flash effects, and dynamic coordinate calculations.
 */

/**
 * Spawns dynamic particle explosion directly in the DOM at the mouse or element coordinate.
 * Automatically handles physics simulation and self-removes all DOM elements when done.
 *
 * @param {MouseEvent|HTMLElement|{clientX: number, clientY: number}} target
 * @param {Object} options
 */
export function createParticleExplosion(target, options = {}) {
  const {
    count = 18,
    colors = ['#06b6d4', '#3b82f6', '#f59e0b', '#10b981', '#ffffff'],
    spread = 120,
    gravity = 0.4,
    sizeRange = [4, 10],
  } = options;

  let originX = 0;
  let originY = 0;

  if (target instanceof MouseEvent || (target && target.clientX !== undefined && target.clientY !== undefined)) {
    originX = target.clientX;
    originY = target.clientY;
  } else if (target instanceof HTMLElement) {
    const rect = target.getBoundingClientRect();
    originX = rect.left + rect.width / 2;
    originY = rect.top + rect.height / 2;
  } else {
    originX = window.innerWidth / 2;
    originY = window.innerHeight / 2;
  }

  // Create container for particle batch
  const container = document.createElement('div');
  container.className = 'pointer-events-none fixed inset-0 overflow-hidden z-[99999]';
  document.body.appendChild(container);

  const particles = [];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');
    const angle = Math.random() * Math.PI * 2;
    const velocity = 3 + Math.random() * 8;
    const size = Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: fixed;
      left: ${originX}px;
      top: ${originY}px;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      box-shadow: 0 0 10px ${color};
      transform: translate(-50%, -50%);
      pointer-events: none;
      will-change: transform, opacity;
      opacity: 1;
    `;

    container.appendChild(particle);

    particles.push({
      element: particle,
      x: 0,
      y: 0,
      vx: Math.cos(angle) * velocity * (spread / 60),
      vy: Math.sin(angle) * velocity * (spread / 60) - 2,
      opacity: 1,
      scale: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 15,
    });
  }

  let startTime = null;
  const duration = 800; // ms

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = (timestamp - startTime) / duration;

    if (progress >= 1) {
      // Clean up DOM elements safely
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
      return;
    }

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += gravity; // Gravity pull
      p.vx *= 0.98; // Air resistance
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - progress * 1.2);
      p.scale = Math.max(0.1, 1 - progress * 0.7);

      p.element.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) scale(${p.scale}) rotate(${p.rotation}deg)`;
      p.element.style.opacity = p.opacity;
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

/**
 * Triggers a photographic optical shutter flash overlay dynamically appended to the DOM.
 */
export function createCameraFlashDOM(options = {}) {
  const { color = 'rgba(255, 255, 255, 0.95)', duration = 300 } = options;

  const flashOverlay = document.createElement('div');
  flashOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: ${color};
    z-index: 100000;
    pointer-events: none;
    opacity: 1;
    transition: opacity ${duration}ms cubic-bezier(0.1, 0.9, 0.2, 1);
  `;

  document.body.appendChild(flashOverlay);

  // Micro-shake effect on viewport
  const originalTransform = document.body.style.transform;
  document.body.style.transform = `translate(${(Math.random() - 0.5) * 4}px, ${(Math.random() - 0.5) * 4}px)`;

  setTimeout(() => {
    flashOverlay.style.opacity = '0';
    document.body.style.transform = originalTransform || '';
  }, 30);

  setTimeout(() => {
    if (flashOverlay.parentNode) {
      flashOverlay.parentNode.removeChild(flashOverlay);
    }
  }, duration + 50);
}

/**
 * Attaches a dynamic 3D perspective mouse-tracking tilt effect to a DOM element.
 *
 * @param {HTMLElement} element
 * @param {Object} options
 * @returns {Function} cleanup function to remove DOM listeners
 */
export function attach3DTilt(element, options = {}) {
  if (!element) return () => {};

  const { maxTilt = 10, perspective = 1000, scale = 1.02, speed = 400 } = options;

  element.style.transformStyle = 'preserve-3d';
  element.style.perspective = `${perspective}px`;
  element.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1)`;

  // Create dynamic glare shine node
  const glare = document.createElement('div');
  glare.className = 'dom-tilt-glare';
  glare.style.cssText = `
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.15), transparent 70%);
    opacity: 0;
    transition: opacity 300ms ease;
    border-radius: inherit;
    z-index: 10;
  `;
  element.style.position = element.style.position || 'relative';
  element.appendChild(glare);

  let rafId = null;

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      element.style.transform = `perspective(${perspective}px) rotateX(${rotateX.toFixed(
        2
      )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.2), transparent 60%)`;
      glare.style.opacity = '1';
    });
  };

  const handleMouseLeave = () => {
    if (rafId) cancelAnimationFrame(rafId);
    element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    glare.style.opacity = '0';
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
    if (glare.parentNode) {
      glare.parentNode.removeChild(glare);
    }
  };
}

/**
 * Creates and displays a floating badge/tooltip positioned dynamically using getBoundingClientRect().
 */
export function showDOMTooltip(targetElement, message, options = {}) {
  if (!targetElement) return;

  const { duration = 1800, color = '#06b6d4' } = options;
  const rect = targetElement.getBoundingClientRect();

  const tooltip = document.createElement('div');
  tooltip.textContent = message;
  tooltip.style.cssText = `
    position: fixed;
    left: ${rect.left + rect.width / 2}px;
    top: ${rect.top - 8}px;
    transform: translate(-50%, -100%) scale(0.9);
    background: #0f172a;
    color: ${color};
    border: 1px solid ${color};
    padding: 4px 10px;
    border-radius: 9999px;
    font-size: 11px;
    font-family: monospace;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4), 0 0 12px ${color}40;
    pointer-events: none;
    z-index: 100000;
    opacity: 0;
    transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1);
  `;

  document.body.appendChild(tooltip);

  requestAnimationFrame(() => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translate(-50%, -120%) scale(1)';
  });

  setTimeout(() => {
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translate(-50%, -140%) scale(0.9)';
    setTimeout(() => {
      if (tooltip.parentNode) tooltip.parentNode.removeChild(tooltip);
    }, 250);
  }, duration);
}
