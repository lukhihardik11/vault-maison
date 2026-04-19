'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — Brutalist custom cursor with hover states.
 *
 * - Inner 8px square dot with fast lerp (0.2)
 * - Outer 28px ring with slower lerp (0.1)
 * - Ring expands to 44px on a/button/input/[data-cursor-hover]
 * - Ring expands to 80px and shows "View" text on .product-image / [data-cursor="view"]
 * - Uses mix-blend-mode: difference for visibility on any background
 * - Disabled on touch devices and prefers-reduced-motion
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const hoverState = useRef<'none' | 'link' | 'view'>('none');
  const animFrameId = useRef<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const DOT_LERP = 0.2;
  const RING_LERP = 0.1;

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) return;

    setShouldRender(true);
    document.documentElement.style.cursor = 'none';

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Determine hover state from event target
    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest) return;
      if (
        target.closest(
          '.product-image, [data-cursor="view"], .product-card-image, .group .image-container, [data-cursor-view]'
        )
      ) {
        hoverState.current = 'view';
      } else if (
        target.closest(
          'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
        )
      ) {
        hoverState.current = 'link';
      } else {
        hoverState.current = 'none';
      }
    };
    const handlePointerOut = () => {
      hoverState.current = 'none';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', handlePointerOut);

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
        const size =
          hoverState.current === 'view'
            ? 80
            : hoverState.current === 'link'
              ? 44
              : 28;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }

      if (textRef.current) {
        textRef.current.style.opacity = hoverState.current === 'view' ? '1' : '0';
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    animFrameId.current = requestAnimationFrame(animate);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      cancelAnimationFrame(animFrameId.current);
    };
    // We intentionally read isVisible inside the callback, but only set it once via setState.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!shouldRender) return null;

  return (
    <>
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
            width: 8,
            height: 8,
            backgroundColor: '#FFFFFF',
            borderRadius: 0,
            willChange: 'transform',
          }}
        />
        {/* Outer ring */}
        <div
          ref={ringRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 28,
            height: 28,
            border: '1.5px solid #FFFFFF',
            borderRadius: 0,
            transition: 'width 250ms cubic-bezier(0.16, 1, 0.3, 1), height 250ms cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform, width, height',
          }}
        >
          <span
            ref={textRef}
            style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              opacity: 0,
              transition: 'opacity 200ms ease',
            }}
          >
            View
          </span>
        </div>
      </div>
      <style>{`
        .minimal-concept, .minimal-concept * { cursor: none !important; }
      `}</style>
    </>
  );
}
