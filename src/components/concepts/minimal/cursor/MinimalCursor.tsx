'use client';

import { useEffect, useRef, useState } from 'react';

export function MinimalCursor() {
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const frame = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const [cursorText, setCursorText] = useState('');
  const textRef = useRef('');

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return;

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
        const targetSize = textRef.current ? 76 : 28;
        frameRef.current.style.width = `${targetSize}px`;
        frameRef.current.style.height = `${targetSize}px`;
        frameRef.current.style.transform = `translate(${frame.current.x - targetSize / 2}px, ${frame.current.y - targetSize / 2}px)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      if (target.closest('.product-image, [data-cursor="view"]')) {
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

    const handleOut = () => {
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
  }, [isTouchDevice, prefersReducedMotion]);

  if (isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '6px',
          height: '6px',
          backgroundColor: '#050505',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={frameRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '28px',
          height: '28px',
          border: '1px solid rgba(5, 5, 5, 0.4)',
          pointerEvents: 'none',
          zIndex: 9998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          transition: 'width 0.3s ease, height 0.3s ease',
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
