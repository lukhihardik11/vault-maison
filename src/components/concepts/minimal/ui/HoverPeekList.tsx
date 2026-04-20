'use client';

/**
 * HoverPeekList — editorial list with cursor-following image preview.
 *
 * Sourced from a 21st.dev "Project Showcase" snippet (the 21st.dev MCP
 * was unreachable from this environment; the user provided the snippet
 * by copy-paste — see docs/research/ui-polish-v2-recommendations.md §3).
 *
 * Adaptations from the upstream component:
 *   - All `rounded-*` removed (sharp edges per the Minimal Machine brief)
 *   - Gradient overlay dropped (palette is strictly greyscale)
 *   - Shadcn color tokens swapped for `minimal.colors.*`
 *   - Motion timings pulled from `minimal.motion.ease.out` / `.duration.*`
 *   - Added `prefers-reduced-motion` fallback: no image preview on hover
 *     (screen readers + reduced-motion users get the plain list)
 *   - Fixed the preview-positioning bug in the upstream: the original
 *     read `containerRef.current?.getBoundingClientRect()` inline in
 *     `style` without accounting for scroll. We switch to
 *     `position: fixed` + raw clientX/Y, which is both simpler and
 *     correct across page scroll.
 *   - Fixed the TS misstyping: original used `scale` and `left` directly
 *     on `style`, which React types as `string | number`. We compose
 *     everything into `transform` and read positions from the mouse.
 *
 * Usage:
 *   <HoverPeekList
 *     items={[{ title, description, year, href, image }, ...]}
 *     label="Signature"  // optional section label (uppercase mono)
 *   />
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { minimal } from '../design-system';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

export interface HoverPeekItem {
  title: string;
  description: string;
  /** Short tag rendered in mono font at the right (year, edition, "NEW", etc.) */
  meta: string;
  href: string;
  image: string;
  /** Alt text for the peek preview. Falls back to `title`. */
  alt?: string;
}

export interface HoverPeekListProps {
  items: HoverPeekItem[];
  /** Optional eyebrow label rendered above the list. */
  label?: string;
  className?: string;
}

const PEEK_WIDTH = 280;
const PEEK_HEIGHT = 180;
const PEEK_OFFSET_X = 24;
const PEEK_OFFSET_Y = -PEEK_HEIGHT / 2;

const font = minimal.font.primary;
const mono = minimal.font.mono;

export function HoverPeekList({ items, label, className = '' }: HoverPeekListProps) {
  const prefersReduced = useReducedMotionPreference();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  // Target mouse position (raw), lerped into `smooth` every frame.
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const peekRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => setIsCoarsePointer(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const interactive = !prefersReduced && !isCoarsePointer;

  // rAF loop lerps the peek preview toward the mouse pointer with
  // an easing factor of 0.18. Anything higher feels twitchy, lower
  // feels laggy for a small 280×180 preview.
  useEffect(() => {
    if (!interactive) return;

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const tick = () => {
      smooth.current.x = lerp(smooth.current.x, target.current.x, 0.18);
      smooth.current.y = lerp(smooth.current.y, target.current.y, 0.18);
      if (peekRef.current) {
        const px = smooth.current.x + PEEK_OFFSET_X;
        const py = smooth.current.y + PEEK_OFFSET_Y;
        peekRef.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [interactive]);

  const handleMove = useCallback(
    (event: React.MouseEvent) => {
      if (!interactive) return;
      // `position: fixed` on the peek → clientX/Y is the correct frame
      // of reference. No need to subtract container offsets or account
      // for page scroll.
      target.current = { x: event.clientX, y: event.clientY };
    },
    [interactive],
  );

  const handleEnter = useCallback(
    (index: number, event: React.PointerEvent) => {
      if (!interactive) return;
      // Snap the smooth position to the cursor on first enter so the
      // preview doesn't fly in from (0, 0).
      smooth.current = { x: event.clientX, y: event.clientY };
      target.current = { x: event.clientX, y: event.clientY };
      setHoveredIndex(index);
      setVisible(true);
    },
    [interactive],
  );

  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
    setVisible(false);
  }, []);

  return (
    <section
      onMouseMove={handleMove}
      className={className}
      style={{ position: 'relative' }}
    >
      {label && (
        <p
          style={{
            fontFamily: mono,
            fontSize: '10px',
            fontWeight: 500,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: minimal.colors.textMuted,
            marginBottom: minimal.space[6],
          }}
        >
          {label}
        </p>
      )}

      {/* Cursor-following preview. Rendered via `position: fixed` so it
          escapes any overflow: clip / hidden ancestors and is never
          clipped by the list container. Hidden for reduced-motion and
          coarse-pointer users. */}
      {interactive && (
        <div
          ref={peekRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${PEEK_WIDTH}px`,
            height: `${PEEK_HEIGHT}px`,
            overflow: 'hidden',
            pointerEvents: 'none',
            zIndex: minimal.z.overlay,
            backgroundColor: minimal.colors.border,
            border: `1px solid ${minimal.colors.border}`,
            opacity: visible ? 1 : 0,
            transition: `opacity ${minimal.motion.duration.base}ms ${minimal.motion.ease.out}`,
            willChange: 'transform, opacity',
          }}
        >
          {items.map((item, index) => (
            <img
              key={`${item.title}-preview`}
              src={item.image}
              alt={item.alt ?? item.title}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: hoveredIndex === index ? 1 : 0,
                transform: hoveredIndex === index ? 'scale(1)' : 'scale(1.05)',
                filter: hoveredIndex === index ? 'none' : 'blur(8px)',
                transition: `opacity ${minimal.motion.duration.slow}ms ${minimal.motion.ease.out}, transform ${minimal.motion.duration.slow}ms ${minimal.motion.ease.out}, filter ${minimal.motion.duration.slow}ms ${minimal.motion.ease.out}`,
              }}
            />
          ))}
        </div>
      )}

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {items.map((item, index) => (
          <li key={item.title}>
            <Link
              href={item.href}
              onPointerEnter={(event) => handleEnter(index, event)}
              onPointerLeave={handleLeave}
              onFocus={() => {
                setHoveredIndex(index);
                setVisible(false); // no preview on keyboard focus
              }}
              onBlur={handleLeave}
              className="vm-hpl-row"
              style={{
                display: 'block',
                position: 'relative',
                padding: `${minimal.space[5]} 0`,
                borderTop: `1px solid ${minimal.colors.border}`,
                textDecoration: 'none',
                color: minimal.colors.text,
                transition: prefersReduced
                  ? 'none'
                  : `background-color ${minimal.motion.duration.base}ms ${minimal.motion.ease.out}`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: minimal.space[4],
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: minimal.space[2],
                    }}
                  >
                    <h3
                      className="vm-hpl-title"
                      style={{
                        fontFamily: font,
                        fontSize: 'clamp(18px, 2vw, 24px)',
                        fontWeight: 300,
                        letterSpacing: '-0.015em',
                        color: minimal.colors.text,
                        margin: 0,
                        position: 'relative',
                        display: 'inline-block',
                      }}
                    >
                      {item.title}
                    </h3>
                    <ArrowUpRight
                      className="vm-hpl-arrow"
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      style={{
                        color: minimal.colors.textMuted,
                        transition: prefersReduced
                          ? 'none'
                          : `transform ${minimal.motion.duration.base}ms ${minimal.motion.ease.out}, opacity ${minimal.motion.duration.base}ms ${minimal.motion.ease.out}, color ${minimal.motion.duration.base}ms ${minimal.motion.ease.out}`,
                      }}
                    />
                  </span>
                  <p
                    style={{
                      fontFamily: font,
                      fontSize: '14px',
                      fontWeight: 300,
                      color: minimal.colors.textSecondary,
                      lineHeight: 1.6,
                      marginTop: minimal.space[2],
                      maxWidth: '48ch',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <span
                  style={{
                    fontFamily: mono,
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: minimal.colors.textMuted,
                    fontVariantNumeric: 'tabular-nums',
                    whiteSpace: 'nowrap',
                    paddingTop: '6px',
                  }}
                >
                  {item.meta}
                </span>
              </div>
            </Link>
          </li>
        ))}
        {/* Bottom hairline so the last row has a closing border */}
        <li
          aria-hidden="true"
          style={{ borderTop: `1px solid ${minimal.colors.border}`, height: 0 }}
        />
      </ul>

      <style>{`
        /* Hover state — title colour shift + arrow slide + underline.
           All properties live here so the inline \`style\` object above
           doesn't need per-hover branching. */
        .vm-hpl-row:hover {
          background-color: transparent;
        }
        .vm-hpl-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background-color: ${minimal.colors.text};
          transition: width ${minimal.motion.duration.base}ms ${minimal.motion.ease.out};
        }
        .vm-hpl-row:hover .vm-hpl-title::after,
        .vm-hpl-row:focus-visible .vm-hpl-title::after {
          width: 100%;
        }
        .vm-hpl-row:hover .vm-hpl-arrow,
        .vm-hpl-row:focus-visible .vm-hpl-arrow {
          transform: translate(2px, -2px);
          color: ${minimal.colors.text};
        }
        .vm-hpl-row:focus-visible {
          outline: 1px solid ${minimal.colors.text};
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          .vm-hpl-title::after,
          .vm-hpl-arrow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default HoverPeekList;
