'use client';

import { useEffect, useRef, useState } from 'react';

export function MinimalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
  const frame = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const [cursorText, setCursorText] = useState('');
  const textRef = useRef('');
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // All device/preference checks MUST run inside useEffect (client-only)
    const isTouchDevice =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouchDevice || prefersReducedMotion) return;

    setShouldRender(true);

    const move = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    const animate = () => {
      frame.current.x += (mouse.current.x - frame.current.x) * 0.15;
      frame.current.y += (mouse.current.y - frame.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }

      if (frameRef.current) {
        const targetSize = textRef.current ? 76 : 36;
        frameRef.current.style.width = `${targetSize}px`;
        frameRef.current.style.height = `${targetSize}px`;
        frameRef.current.style.transform = `translate(${frame.current.x - targetSize / 2}px, ${frame.current.y - targetSize / 2}px)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('[data-cursor="view"]')) {
        textRef.current = 'View';
        setCursorText('View');
        return;
      }

      if (target.closest('a, button, [role="button"]')) {
        textRef.current = '';
        setCursorText('');
        return;
      }

      textRef.current = '';
      setCursorText('');
    };

    const handleOut = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const relatedTarget = event.relatedTarget as HTMLElement | null;
      
      // If we're moving inside the same [data-cursor="view"], don't clear
      if (
        target?.closest('[data-cursor="view"]') && 
        relatedTarget?.closest('[data-cursor="view"]') === target.closest('[data-cursor="view"]')
      ) {
        return;
      }
      
      textRef.current = '';
      setCursorText('');
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#FFFFFF',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          transform: 'translate(-100px, -100px)',
          borderRadius: '50%',
        }}
      />
      <div
        ref={frameRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '36px',
          height: '36px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          transition: 'width 0.3s ease, height 0.3s ease',
          transform: 'translate(-100px, -100px)',
          borderRadius: '50%',
        }}
      >
        {cursorText && (
          <span
            style={{
              fontSize: '10px',
              lineHeight: 1,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              fontWeight: 500,
            }}
          >
            {cursorText}
          </span>
        )}
      </div>
      <style jsx global>{`
        .minimal-concept,
        .minimal-concept a,
        .minimal-concept button,
        .minimal-concept [role='button'] {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
