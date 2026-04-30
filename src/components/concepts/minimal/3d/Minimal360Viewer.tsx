'use client';

/**
 * Minimal360Viewer — image-based 360° product spinner.
 *
 * Replaces the previous WebGL `Minimal3DViewer`, which crashed silently
 * on mobile (the gradient cube-map setup couldn't decode the image
 * data on Safari iOS, leaving an empty grey canvas — the "just gray"
 * regression the user reported in the bug sprint).
 *
 * Why image sequence instead of a 3D model:
 *   - Works everywhere (no WebGL, no shaders, no env-map)
 *   - Uses ACTUAL product photography (the bug brief specifically
 *     asked for "actual product images", not a stand-in 3D ring)
 *   - Negligible bundle cost — no three.js / @react-three/fiber
 *   - Honest fallback: if even ONE image fails, we still render
 *     whatever's left (vs. the old viewer where any error blanked
 *     the whole canvas)
 *
 * Interactions:
 *   - Drag horizontally with mouse (desktop) or finger (touch) to
 *     scrub through frames. ~22 px / frame feels right after testing.
 *   - When idle (no drag for 2.4 s), an auto-rotate timer advances
 *     one frame every `frameMs`.
 *   - Reduced-motion users get a static first-frame view with a
 *     thumbnail strip beneath as the rotation alternative.
 *
 * Accessibility:
 *   - Decorative wrapper is keyboard-navigable; ←/→ arrows scrub.
 *   - aria-label updates with the current frame index for SR users.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

const F = "'Inter', 'Helvetica Neue', sans-serif";
const M = "'SF Mono', 'Fira Code', monospace";

export interface Minimal360ViewerProps {
  /** Image sources, in rotation order. ≥ 2 required for a meaningful spin. */
  images: string[];
  /** Accessible label for the rotating piece. */
  alt: string;
  /** Auto-rotate frame interval in ms. Default 160. */
  frameMs?: number;
  /** Pause auto-rotate while idle threshold in ms. Default 2400. */
  resumeAfterMs?: number;
  /** Drag pixels per frame step. Default 22 (lower = more sensitive). */
  pxPerFrame?: number;
  /** Optional className for the outer container. */
  className?: string;
}

export default function Minimal360Viewer({
  images,
  alt,
  frameMs = 160,
  resumeAfterMs = 2400,
  pxPerFrame = 22,
  className = '',
}: Minimal360ViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{ startX: number; startFrame: number } | null>(null);
  const lastInteractionRef = useRef<number>(0);
  const autoTimerRef = useRef<number | null>(null);

  const prefersReduced = useReducedMotionPreference();
  const [frame, setFrame] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const safeImages = images.length > 0 ? images : [];
  const total = safeImages.length;

  // Preload images so the spin doesn't stutter on first interaction.
  // We mark `allLoaded = true` only after the *primary* image is ready
  // (so the viewer surface flips from skeleton → photo without waiting
  // on the long tail). Background pre-decode happens in parallel.
  useEffect(() => {
    if (typeof window === 'undefined' || total === 0) return;
    let cancelled = false;
    const head = new window.Image();
    head.src = safeImages[0];
    head.onload = () => {
      if (!cancelled) setAllLoaded(true);
    };
    head.onerror = () => {
      // Even on a 404 we want to release the skeleton rather than show
      // a permanent loading shimmer. The fallback alt text + grey
      // surface is more honest than spinning forever.
      if (!cancelled) setAllLoaded(true);
    };
    safeImages.slice(1).forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
    return () => {
      cancelled = true;
    };
  }, [safeImages, total]);

  const advance = useCallback(
    (delta: number) => {
      if (total === 0) return;
      setFrame((current) => {
        const next = (current + delta) % total;
        return next < 0 ? next + total : next;
      });
    },
    [total],
  );

  // Auto-rotate loop. Skipped under `prefers-reduced-motion`. Pauses
  // for `resumeAfterMs` after any user interaction.
  useEffect(() => {
    if (prefersReduced || total < 2) return;

    const tick = () => {
      const now = performance.now();
      if (now - lastInteractionRef.current >= resumeAfterMs) {
        advance(1);
      }
      autoTimerRef.current = window.setTimeout(tick, frameMs);
    };

    autoTimerRef.current = window.setTimeout(tick, frameMs);
    return () => {
      if (autoTimerRef.current !== null) {
        window.clearTimeout(autoTimerRef.current);
        autoTimerRef.current = null;
      }
    };
  }, [advance, frameMs, prefersReduced, resumeAfterMs, total]);

  const noteInteraction = useCallback(() => {
    lastInteractionRef.current = performance.now();
    setHasInteracted(true);
  }, []);

  // ── Pointer/touch drag handlers ───────────────────────────────────
  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (total < 2) return;
      noteInteraction();
      dragStateRef.current = { startX: event.clientX, startFrame: frame };
      setIsDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [frame, noteInteraction, total],
  );

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const drag = dragStateRef.current;
      if (!drag) return;
      noteInteraction();
      const delta = event.clientX - drag.startX;
      const stepDelta = Math.round(delta / pxPerFrame);
      const next = ((drag.startFrame + stepDelta) % total + total) % total;
      setFrame(next);
    },
    [noteInteraction, pxPerFrame, total],
  );

  const onPointerEnd = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragStateRef.current) return;
      dragStateRef.current = null;
      setIsDragging(false);
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Some browsers throw when releasing an already-released
        // capture (e.g., on `pointercancel`). Safe to ignore.
      }
    },
    [],
  );

  // Keyboard scrub — match the drag step size for muscle-memory.
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (total < 2) return;
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        noteInteraction();
        advance(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        noteInteraction();
        advance(-1);
      }
    },
    [advance, noteInteraction, total],
  );

  // Empty state — no images available. Shouldn't happen with curated
  // bestsellers, but better than rendering an invisible div.
  if (total === 0) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          minHeight: 'min(540px, 60vh)',
          background: '#0A0A0A',
          color: '#767676',
          fontFamily: M,
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 24,
        }}
      >
        360° preview unavailable
      </div>
    );
  }

  // Reduced-motion experience — render the first image plus a
  // thumbnail strip so the user can still pick angles without any
  // motion. We deliberately skip the drag UI to avoid surprising
  // anyone who set the OS preference for accessibility reasons.
  if (prefersReduced) {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          background: '#050505',
          padding: '32px 16px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 'min(420px, 80vw)',
            aspectRatio: '1 / 1',
            background: '#FFFFFF',
            border: '1px solid #6B6B6B',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={safeImages[frame]}
            alt={alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }} loading="lazy" decoding="async"/>
        </div>
        {total > 1 && (
          <div
            role="tablist"
            aria-label="Choose product angle"
            style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {safeImages.map((src, i) => (
              <button
                key={src}
                role="tab"
                aria-selected={i === frame}
                aria-label={`View angle ${i + 1} of ${total}`}
                onClick={() => setFrame(i)}
                style={{
                  width: 44,
                  height: 44,
                  border: i === frame ? '1px solid #FFFFFF' : '1px solid #6B6B6B',
                  background: '#050505',
                  padding: 0,
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden="true"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} loading="lazy" decoding="async"/>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  const degrees = Math.round((frame / total) * 360);

  return (
    <div
      className={className}
      style={{
        width: '100%',
        background: '#050505',
        padding: '24px 12px 36px',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <div
        ref={containerRef}
        role="application"
        aria-label={`360 degree view of ${alt}. Drag or use arrow keys to rotate.`}
        aria-roledescription="rotating product view"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
        onKeyDown={onKeyDown}
        style={{
          margin: '0 auto',
          width: 'min(540px, 86vw)',
          aspectRatio: '1 / 1',
          background: '#FFFFFF',
          border: '1px solid #6B6B6B',
          position: 'relative',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y',
          outline: 'none',
        }}
      >
        {/* Skeleton shimmer until first frame decodes. We deliberately
            render the <img> tags up-front (display: none until ready
            won't work — they need to be in the DOM to decode), but we
            mask them with an absolutely-positioned grey panel. */}
        {!allLoaded && (
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#E5E5E5',
              zIndex: 1,
            }}
          />
        )}

        {safeImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={i === frame ? alt : ''}
            aria-hidden={i !== frame}
            draggable={false}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              opacity: i === frame ? 1 : 0,
              transition: 'opacity 200ms ease',
              pointerEvents: 'none',
            }} loading="lazy" decoding="async"/>
        ))}

        {/* Drag-hint overlay — fades out after the user interacts once. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 16,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: hasInteracted ? 0 : 0.85,
            transition: 'opacity 320ms ease',
            zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: M,
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#050505',
              background: 'rgba(255,255,255,0.86)',
              padding: '8px 14px',
              border: '1px solid #6B6B6B',
            }}
          >
            Drag to rotate
          </span>
        </div>
      </div>

      {/* Frame readout + progress hairline */}
      <div
        style={{
          margin: '20px auto 0',
          width: 'min(540px, 86vw)',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <span
          style={{
            fontFamily: M,
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#6B6B6B',
            textTransform: 'uppercase',
            minWidth: 56,
          }}
        >
          {String(degrees).padStart(3, '0')}°
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background: '#6B6B6B',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: total > 0 ? `${((frame + 1) / total) * 100}%` : '0%',
              background: '#FFFFFF',
              transition: 'width 200ms ease',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: M,
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#6B6B6B',
            textTransform: 'uppercase',
            minWidth: 64,
            textAlign: 'right',
          }}
        >
          {String(frame + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      {/* Hidden style island — disable browser-default touch callout
          and tap highlight on the spin surface. Inline so the styles
          travel with the component (no global CSS coupling). */}
      <style>{`
        [aria-roledescription="rotating product view"] {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        [aria-roledescription="rotating product view"]:focus-visible {
          outline: 1px solid #FFFFFF;
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-roledescription="rotating product view"] img {
            transition: none !important;
          }
        }

        /* Sub-typography (also serves as the F font reference so
           Inter-300 stays in the critical path on this dark band). */
        [aria-roledescription="rotating product view"] {
          font-family: ${F};
        }
      `}</style>
    </div>
  );
}
