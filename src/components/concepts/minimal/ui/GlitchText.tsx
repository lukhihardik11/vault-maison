'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { minimal } from '../design-system';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

type GlitchTag = 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'p';

export interface GlitchTextProps {
  /** Visible text. May contain `\n` for explicit line breaks. */
  text: string;
  /** Optional children rendered alongside the text (e.g. trailing icon). */
  children?: ReactNode;
  /** Element to render. Default `'span'`. Use `'h1'` … `'h3'` for headlines. */
  as?: GlitchTag;
  /**
   * What kicks off the glitch burst:
   *  - `'hover'` — runs while pointer is over the element (default).
   *  - `'view'`  — runs once when scrolled into view.
   *  - `'manual'` — caller controls via `play` boolean.
   */
  trigger?: 'hover' | 'view' | 'manual';
  /**
   * When `trigger === 'manual'`, set this to `true` to start a single burst.
   * Returning to `false` halts mid-burst.
   */
  play?: boolean;
  /** Override the `glitch.amplitude` token (px). */
  amplitude?: number;
  /** Override the `glitch.duration` token (ms) used in `'view'` mode. */
  duration?: number;
  /** Override the `glitch.frequency` token (ms) — interval between frames. */
  frequency?: number;
  className?: string;
  style?: CSSProperties;
  /** ARIA-label override; defaults to `text`. */
  ariaLabel?: string;
}

/**
 * GlitchText
 * ----------
 * Brutalist text effect that briefly displaces two duplicate layers of the
 * same string in opposite directions, evoking an RGB shift without using
 * any colour. Stays purely monochrome — the only "colour" comes from the
 * shift itself.
 *
 * Behaviour:
 *  - `trigger='hover'` runs the effect for as long as the pointer stays
 *    over the element. This is the default and the most common use.
 *  - `trigger='view'` runs a single burst when the element enters the
 *    viewport.
 *  - `trigger='manual'` lets the caller drive the burst with the `play` prop.
 *  - Honours `prefers-reduced-motion`: the duplicate layers are not even
 *    mounted, so there's zero CPU cost.
 *
 * Accessibility:
 *  - Real text is rendered once and screen-reader friendly.
 *  - Duplicate layers are `aria-hidden` and `pointer-events: none`.
 */
export function GlitchText({
  text,
  children,
  as: Tag = 'span',
  trigger = 'hover',
  play = false,
  amplitude = minimal.glitch.amplitude,
  duration = minimal.glitch.duration,
  frequency = minimal.glitch.frequency,
  className,
  style,
  ariaLabel,
}: GlitchTextProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const layerARef = useRef<HTMLSpanElement | null>(null);
  const layerBRef = useRef<HTMLSpanElement | null>(null);
  // Internal state covers `'hover'` and `'view'` triggers. The `'manual'`
  // trigger derives its active state from the `play` prop directly so we
  // don't need to call `setState` from inside an effect (which the React
  // hooks linter disallows).
  const [internalActive, setInternalActive] = useState(false);
  const prefersReduced = useReducedMotionPreference();

  const active = trigger === 'manual' ? Boolean(play) : internalActive;

  // Drive frame updates — push two layers to small random offsets every
  // `frequency` ms while `active` is true.
  useEffect(() => {
    if (!active || prefersReduced) {
      if (layerARef.current) layerARef.current.style.transform = 'translate3d(0,0,0)';
      if (layerBRef.current) layerBRef.current.style.transform = 'translate3d(0,0,0)';
      return;
    }

    const tick = () => {
      const xA = (Math.random() * 2 - 1) * amplitude;
      const yA = (Math.random() * 2 - 1) * (amplitude * 0.6);
      const xB = -xA;
      const yB = -yA;
      if (layerARef.current) {
        layerARef.current.style.transform = `translate3d(${xA.toFixed(2)}px, ${yA.toFixed(2)}px, 0)`;
      }
      if (layerBRef.current) {
        layerBRef.current.style.transform = `translate3d(${xB.toFixed(2)}px, ${yB.toFixed(2)}px, 0)`;
      }
    };

    const id = window.setInterval(tick, Math.max(16, frequency));
    return () => window.clearInterval(id);
  }, [active, amplitude, frequency, prefersReduced]);

  // View-trigger — single burst when scrolled into view. The `setInternalActive`
  // call is inside the IntersectionObserver callback (not the effect body),
  // which keeps the hooks linter happy.
  useEffect(() => {
    if (trigger !== 'view') return;
    const el = rootRef.current;
    if (!el || prefersReduced) return;

    let timeoutId = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInternalActive(true);
            timeoutId = window.setTimeout(() => setInternalActive(false), duration);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [duration, prefersReduced, trigger]);

  const handleEnter = useCallback(() => {
    if (trigger === 'hover') setInternalActive(true);
  }, [trigger]);
  const handleLeave = useCallback(() => {
    if (trigger === 'hover') setInternalActive(false);
  }, [trigger]);

  const containerStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    isolation: 'isolate',
    color: 'inherit',
    ...(style ?? {}),
  };

  const layerStyleBase: CSSProperties = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    userSelect: 'none',
    transition: active
      ? 'none'
      : `transform ${minimal.motion.standard}ms ${minimal.easing.out}`,
    willChange: 'transform',
  };

  // The two duplicate layers use opacity rather than colour, keeping the
  // overall feel monochrome — when they offset, the eye reads the doubling
  // as a brutalist artifact, not as a colour shift.
  const layerAStyle: CSSProperties = {
    ...layerStyleBase,
    opacity: prefersReduced ? 0 : 0.55,
    mixBlendMode: 'multiply',
  };
  const layerBStyle: CSSProperties = {
    ...layerStyleBase,
    opacity: prefersReduced ? 0 : 0.45,
    mixBlendMode: 'screen',
  };

  const innerContent = (
    <>
      <span style={{ position: 'relative', zIndex: 2, display: 'inline-block' }}>
        {text}
        {children}
      </span>
      {!prefersReduced && (
        <>
          <span ref={layerARef} aria-hidden style={layerAStyle}>
            {text}
            {children}
          </span>
          <span ref={layerBRef} aria-hidden style={layerBStyle}>
            {text}
            {children}
          </span>
        </>
      )}
    </>
  );

  const commonProps = {
    className,
    style: containerStyle,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    onFocus: handleEnter,
    onBlur: handleLeave,
    'aria-label': ariaLabel ?? text,
    'data-glitch-active': active ? 'true' : 'false',
  } as const;

  // Switch on the tag name so the JSX checker can verify the ref type for
  // each variant. Keeps the API ergonomic while staying typed.
  switch (Tag) {
    case 'h1':
      return <h1 ref={rootRef as React.RefObject<HTMLHeadingElement>} {...commonProps}>{innerContent}</h1>;
    case 'h2':
      return <h2 ref={rootRef as React.RefObject<HTMLHeadingElement>} {...commonProps}>{innerContent}</h2>;
    case 'h3':
      return <h3 ref={rootRef as React.RefObject<HTMLHeadingElement>} {...commonProps}>{innerContent}</h3>;
    case 'h4':
      return <h4 ref={rootRef as React.RefObject<HTMLHeadingElement>} {...commonProps}>{innerContent}</h4>;
    case 'p':
      return <p ref={rootRef as React.RefObject<HTMLParagraphElement>} {...commonProps}>{innerContent}</p>;
    case 'div':
      return <div ref={rootRef as React.RefObject<HTMLDivElement>} {...commonProps}>{innerContent}</div>;
    case 'span':
    default:
      return <span ref={rootRef as React.RefObject<HTMLSpanElement>} {...commonProps}>{innerContent}</span>;
  }
}

export default GlitchText;
