import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export const SmoothCounter = ({ value, suffix = '', duration = 1500 }: { value: number; suffix?: string; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
    }
  }, [isInView, hasStarted]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !hasStarted) return;
    if (prefersReducedMotion) {
      el.textContent = `${value.toLocaleString()}${suffix}`;
      return;
    }

    let start: number | null = null;
    const animate = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * value);
      el.textContent = `${current.toLocaleString()}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        el.textContent = `${value.toLocaleString()}${suffix}`;
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, prefersReducedMotion, suffix, value, duration]);

  return <span ref={ref}>{hasStarted || prefersReducedMotion ? '0' : '0'}{suffix}</span>;
};
