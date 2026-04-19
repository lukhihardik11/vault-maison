'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type Ref,
} from 'react';
import Link from 'next/link';
import { minimal } from '../design-system';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

type Tone = 'primary' | 'secondary';

type SharedProps = {
  children: ReactNode;
  tone?: Tone;
  /** Pointer radius (px) at which the magnetic pull engages. */
  radius?: number;
  /** Lerp factor (0–1) — how hard the inner content is pulled toward the cursor. */
  strength?: number;
  /** Add a subtle scale on the inner content while engaged. Default true. */
  lift?: boolean;
  className?: string;
  style?: CSSProperties;
};

type AnchorVariant = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'style' | 'className'> & {
    href: string;
    type?: never;
  };

type ButtonVariant = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'style' | 'className' | 'type'> & {
    href?: undefined;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  };

export type MagneticButtonProps = AnchorVariant | ButtonVariant;

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  fontFamily: minimal.font.primary,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  padding: '20px 48px',
  height: '52px',
  border: `1px solid ${minimal.colors.borderStrong}`,
  borderRadius: 0,
  cursor: 'pointer',
  position: 'relative',
  willChange: 'transform',
  // Note: we transition the *content*, not the box, so layout stays rigorous.
};

const innerStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '12px',
  willChange: 'transform',
  pointerEvents: 'none',
};

function toneStyles(tone: Tone): CSSProperties {
  return tone === 'primary'
    ? { backgroundColor: minimal.colors.surfaceInverse, color: minimal.colors.textInverse }
    : { backgroundColor: 'transparent', color: minimal.colors.text };
}

/**
 * MagneticButton
 * --------------
 * Brutalist CTA whose inner *content* is magnetically attracted to the
 * pointer. The outer box stays put — geometry remains rigorous and there is
 * zero layout shift. Pairs naturally with `MinimalCursor`.
 *
 * Behaviour:
 *  - When the pointer enters the magnetic radius (default `120px`), the
 *    inner content lerps toward it by `strength * proximity`, capped so it
 *    never escapes the box.
 *  - On pointer leave / cancel the content lerps home to (0,0).
 *  - Disabled entirely under `prefers-reduced-motion` and on touch devices.
 *  - Renders as a Next `Link` when `href` is provided; otherwise as a
 *    `<button>`.
 */
function MagneticButtonImpl(
  props: MagneticButtonProps,
  ref: Ref<HTMLAnchorElement | HTMLButtonElement>,
) {
  const {
    children,
    tone = 'primary',
    radius = minimal.magnetic.distance,
    strength = minimal.magnetic.strength,
    lift = true,
    className,
    style,
  } = props;

  const innerRef = useRef<HTMLSpanElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, scale: 1 });
  const currentRef = useRef({ x: 0, y: 0, scale: 1 });
  // Holder for the scheduler installed by the effect below. Pointer
  // handlers call it to kick off (or no-op into) the RAF loop.
  const schedulerRef = useRef<(() => void) | null>(null);
  const prefersReduced = useReducedMotionPreference();

  // Drive the lerp on a single RAF loop. The loop self-cancels when the
  // current value is close enough to the target, so it doesn't burn CPU
  // when the button is at rest.
  useEffect(() => {
    let id: number | null = null;

    const step = () => {
      const inner = innerRef.current;
      if (!inner) {
        rafRef.current = null;
        id = null;
        return;
      }
      const lerp = 0.18;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
      currentRef.current.scale += (targetRef.current.scale - currentRef.current.scale) * lerp;

      inner.style.transform = `translate3d(${currentRef.current.x.toFixed(2)}px, ${currentRef.current.y.toFixed(2)}px, 0) scale(${currentRef.current.scale.toFixed(3)})`;

      const dx = Math.abs(targetRef.current.x - currentRef.current.x);
      const dy = Math.abs(targetRef.current.y - currentRef.current.y);
      const ds = Math.abs(targetRef.current.scale - currentRef.current.scale);

      if (dx < 0.05 && dy < 0.05 && ds < 0.001) {
        rafRef.current = null;
        id = null;
        return;
      }
      id = requestAnimationFrame(step);
      rafRef.current = id;
    };

    schedulerRef.current = () => {
      if (rafRef.current !== null) return;
      id = requestAnimationFrame(step);
      rafRef.current = id;
    };

    return () => {
      if (id !== null) cancelAnimationFrame(id);
      schedulerRef.current = null;
      rafRef.current = null;
    };
  }, []);

  const handleMove = useCallback(
    (e: ReactPointerEvent<HTMLElement>) => {
      if (prefersReduced) return;
      if (e.pointerType === 'touch') return;

      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.hypot(dx, dy);

      if (distance > radius) {
        targetRef.current.x = 0;
        targetRef.current.y = 0;
        targetRef.current.scale = 1;
      } else {
        const proximity = 1 - Math.min(distance / radius, 1);
        const pull = strength * proximity;
        // Cap displacement at ~25% of half-width so content never escapes box.
        const maxX = rect.width * 0.25;
        const maxY = rect.height * 0.25;
        targetRef.current.x = Math.max(-maxX, Math.min(maxX, dx * pull));
        targetRef.current.y = Math.max(-maxY, Math.min(maxY, dy * pull));
        targetRef.current.scale = lift ? minimal.magnetic.lift : 1;
      }
      schedulerRef.current?.();
    },
    [lift, prefersReduced, radius, strength],
  );

  const handleLeave = useCallback(() => {
    targetRef.current.x = 0;
    targetRef.current.y = 0;
    targetRef.current.scale = 1;
    schedulerRef.current?.();
  }, []);

  const composedStyle: CSSProperties = {
    ...baseStyle,
    ...toneStyles(tone),
    ...(style ?? {}),
  };

  const inner = (
    <span ref={innerRef} style={innerStyle}>
      {children}
    </span>
  );

  if ('href' in props && typeof props.href === 'string') {
    const {
      href,
      children: _c,
      tone: _t,
      radius: _r,
      strength: _s,
      lift: _l,
      className: _cn,
      style: _st,
      ...anchorRest
    } = props;
    void _c; void _t; void _r; void _s; void _l; void _cn; void _st;
    return (
      <Link
        href={href}
        ref={ref as Ref<HTMLAnchorElement>}
        className={className}
        style={composedStyle}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        onPointerCancel={handleLeave}
        {...anchorRest}
      >
        {inner}
      </Link>
    );
  }

  const {
    children: _c,
    tone: _t,
    radius: _r,
    strength: _s,
    lift: _l,
    className: _cn,
    style: _st,
    type = 'button',
    ...buttonRest
  } = props as ButtonVariant;
  void _c; void _t; void _r; void _s; void _l; void _cn; void _st;
  return (
    <button
      {...buttonRest}
      type={type}
      ref={ref as Ref<HTMLButtonElement>}
      className={className}
      style={composedStyle}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onPointerCancel={handleLeave}
    >
      {inner}
    </button>
  );
}

export const MagneticButton = forwardRef(MagneticButtonImpl);
MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
