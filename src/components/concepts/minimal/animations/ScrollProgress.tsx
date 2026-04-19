'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    const handleMotion = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);

    window.addEventListener('scroll', handleScroll, { passive: true });
    mq.addEventListener('change', handleMotion);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mq.removeEventListener('change', handleMotion);
    };
  }, []);

  if (prefersReduced) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[2px] bg-[#050505] origin-left"
      style={{ transform: `scaleX(${progress})`, transition: 'transform 0.1s linear' }}
    />
  );
}
