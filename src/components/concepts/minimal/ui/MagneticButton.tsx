'use client';

/**
 * MagneticButton — cursor-attracted CTA wrapper.
 *
 * Wraps any clickable child (Link, button, anchor, etc.) and applies a
 * spring-driven transform that pulls the child toward the cursor when
 * the cursor enters a configurable radius. Releases back to centre on
 * `mouseleave` with a soft bounce.
 *
 * Why a wrapper, not a button itself:
 *   - The minimal concept has 4+ button variants (primary, secondary,
 *     ghost, link). A wrapper composes with all of them.
 *   - Lets the consumer keep their own semantics (`<Link>` vs `<button>`).
 *
 * Accessibility / fallbacks:
 *   - Disabled on `(pointer: coarse)` (touch devices): the magnetic
 *     pull is meaningless without a precise pointer.
 *   - Disabled on `(prefers-reduced-motion: reduce)`: no transform.
 *   - Focus-visible ring is preserved by the inner element.
 *
 * Repo rule: NEVER `initial={{ opacity: 0 }}` — we omit `initial` and
 * let `animate` drive position-only changes from { 0, 0 } baseline.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { minimal } from '../design-system';

export interface MagneticButtonProps {
  children: React.ReactNode;
  /** Pull strength multiplier (0–1). Default 0.35. Higher = more pull. */
  strength?: number;
  /** Activation radius in px. Cursor must be within this of centre. Default 100. */
  radius?: number;
  /** Optional className for the wrapping motion.div. */
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.35,
  radius = minimal.magnetic.radius,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsCoarsePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const disabled = prefersReduced || isCoarsePointer;

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        setPos({ x: 0, y: 0 });
        return;
      }
      // Falloff — pull weakens as the cursor nears the edge of `radius`.
      // Linear is fine here; a power curve felt over-eager in testing.
      const falloff = 1 - dist / radius;
      setPos({ x: dx * strength * falloff, y: dy * strength * falloff });
    },
    [disabled, radius, strength],
  );

  const handleLeave = useCallback(() => setPos({ x: 0, y: 0 }), []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={disabled ? { x: 0, y: 0 } : { x: pos.x, y: pos.y }}
      transition={minimal.motion.spring.soft}
      className={className}
      style={{ display: 'inline-flex', willChange: disabled ? undefined : 'transform' }}
    >
      {children}
    </motion.div>
  );
}

export default MagneticButton;
