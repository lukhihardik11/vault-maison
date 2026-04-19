'use client';

import { useEffect, useRef, useState } from 'react';

export function MinimalCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    let rafId = 0;
    const animate = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * 0.15;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 3}px, ${mouse.current.y - 3}px)`;
      }
      if (squareRef.current) {
        squareRef.current.style.transform = `translate(${follower.current.x - 18}px, ${follower.current.y - 18}px)`;
      }
      rafId = window.requestAnimationFrame(animate);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.product-image, [data-cursor="view"]')) {
        setCursorText('View');
        squareRef.current?.classList.add('!w-[80px]', '!h-[80px]');
      } else if (target.closest('a, button')) {
        squareRef.current?.classList.add('!w-[12px]', '!h-[12px]');
      }
    };

    const handleOut = () => {
      setCursorText('');
      squareRef.current?.classList.remove('!w-[80px]', '!h-[80px]', '!w-[12px]', '!h-[12px]');
    };

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[#050505] pointer-events-none z-[9999] mix-blend-difference"
      />
      <div
        ref={squareRef}
        className="fixed top-0 left-0 w-[36px] h-[36px] border border-[#050505]/40 pointer-events-none z-[9998] transition-[width,height] duration-300 flex items-center justify-center mix-blend-difference"
      >
        {cursorText && (
          <span className="text-[10px] uppercase tracking-widest text-white font-medium">{cursorText}</span>
        )}
      </div>
      <style jsx global>{`
        .minimal-concept {
          cursor: none !important;
        }
        .minimal-concept a,
        .minimal-concept button {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
