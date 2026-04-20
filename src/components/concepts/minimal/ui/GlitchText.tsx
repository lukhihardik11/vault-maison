'use client';

/**
 * GlitchText — brutalist hover-glitch headline.
 *
 * On hover (and `:focus-visible` for keyboard users), the text spawns
 * two sub-pixel offset duplicates rendered with text-shadow in two
 * grey tones. The composite reads as a printing-misregistration glitch
 * — borrowing brutalism's "broken on purpose" vocabulary, but
 * monochrome-only (no red/blue chromatic shift; that would violate
 * the palette).
 *
 * Why text-shadow (not duplicate DOM nodes):
 *   - Single render cost; no extra layout
 *   - Shadows clip to the text shape automatically
 *   - GPU-accelerated transitions
 *
 * Accessibility:
 *   - The effect is purely cosmetic; reduced-motion users see static text
 *   - `:focus-visible` triggers the same effect for keyboard navigation
 *   - Children render normally for screen readers
 */

import type { ReactNode } from 'react';
import { useId } from 'react';
import { minimal } from '../design-system';

export interface GlitchTextProps {
  children: ReactNode;
  /** Tag to render as. Default 'span'. Use 'h1' / 'h2' for headlines. */
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'div' | 'p';
  /** Pixel offset of the glitch shadows. Default 2. */
  offset?: number;
  /** Text color. Default the design-system text color. */
  color?: string;
  /** Optional className passthrough. */
  className?: string;
  /** Optional inline style passthrough (merged with the glitch CSS vars). */
  style?: React.CSSProperties;
  /** Always-on (no hover trigger). Useful for hero headlines that should look glitchy at rest. */
  always?: boolean;
}

export function GlitchText({
  children,
  as: Tag = 'span',
  offset = 2,
  color = minimal.colors.text,
  className = '',
  style,
  always = false,
}: GlitchTextProps) {
  const id = useId().replace(/:/g, '');
  // Two greys offset in opposite directions. textMuted (lighter) + textSecondary (darker).
  // This composites into a soft chromatic-aberration look without leaving the palette.
  const shadow = `${offset}px 0 0 ${minimal.colors.textMuted}, -${offset}px 0 0 ${minimal.colors.textSecondary}`;

  return (
    <Tag
      className={`vm-glitch-${id} ${className}`}
      style={{
        color,
        display: 'inline-block',
        position: 'relative',
        transition: `text-shadow ${minimal.motion.duration.fast}ms ${minimal.motion.ease.snap}`,
        ...style,
      }}
    >
      {children}
      <style>{`
        ${always ? `.vm-glitch-${id} { text-shadow: ${shadow}; }` : ''}
        .vm-glitch-${id}:hover,
        .vm-glitch-${id}:focus-visible {
          text-shadow: ${shadow};
        }
        @media (prefers-reduced-motion: reduce) {
          .vm-glitch-${id} {
            transition: none !important;
            text-shadow: none !important;
          }
        }
      `}</style>
    </Tag>
  );
}

export default GlitchText;
