'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CustomCursor — Brutalist custom cursor
 * Small 8px dot + 28px ring that follows mouse with smooth lerp.
 * Ring expands to 44px on hover over interactive elements.
 * Uses mix-blend-mode: difference for visibility on any background.
 * 
 * Disabled on touch devices and when prefers-reduced-motion is set.
 * All interactive elements get cursor-pointer automatically.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const animFrameId = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const DOT_LERP = 0.2;
  const RING_LERP = 0.1;

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Check prefers-reduced-motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    setShouldRender(true);

    // Hide default cursor globally
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track hover state on interactive elements
    const handleElementEnter = () => { isHovering.current = true; };
    const handleElementLeave = () => { isHovering.current = false; };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Add hover listeners to interactive elements
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
      );
      interactiveElements.forEach((el) => {
        (el as HTMLElement).style.cursor = 'none';
        el.addEventListener('mouseenter', handleElementEnter);
        el.addEventListener('mouseleave', handleElementLeave);
      });
      return interactiveElements;
    };

    let elements = addHoverListeners();

    // Re-scan for new interactive elements periodically (for dynamic content)
    const rescanInterval = setInterval(() => {
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      elements = addHoverListeners();
    }, 2000);

    // Animation loop
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, DOT_LERP);
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, DOT_LERP);
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, RING_LERP);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, RING_LERP);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const size = isHovering.current ? 44 : 28;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      elements.forEach((el) => {
        (el as HTMLElement).style.cursor = '';
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      clearInterval(rescanInterval);
      cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: 'none',
        mixBlendMode: 'difference',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 150ms ease',
      }}
    >
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#FFFFFF',
          borderRadius: '0',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          border: '1.5px solid #FFFFFF',
          borderRadius: '0',
          transition: 'width 200ms ease, height 200ms ease',
        }}
      />
    </div>
  );
}
