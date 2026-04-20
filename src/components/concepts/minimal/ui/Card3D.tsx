'use client';

/**
 * Card3D — a 3-part 3D-tilt primitive.
 *
 *   <CardContainer>    sets up perspective + rotates the body on mousemove
 *     <CardBody>       the tilting plane (transform-style: preserve-3d)
 *       <CardItem>     children float at a configurable translateZ depth
 *     </CardBody>
 *   </CardContainer>
 *
 * Sourced from 21st.dev's "3d-card-effect" pattern (Aceternity style;
 * the 21st.dev MCP was unreachable from this environment — the user
 * provided the snippet by copy-paste). See
 * `docs/research/ui-polish-v2-recommendations.md` §3 for full
 * provenance.
 *
 * Adaptations from the upstream:
 *   - `transition duration-200 ease-linear` → design-system tokens
 *     (`minimal.motion.duration.fast` + `motion.ease.out`)
 *   - Honors `prefers-reduced-motion` AND `pointer: coarse`: on touch
 *     devices and reduced-motion preference the tilt + translateZ are
 *     no-ops — the card renders flat. The 3D effect is a progressive
 *     enhancement, never a dependency for the content being readable.
 *   - Kept the demo's rounded classes OUT of the primitive. Border
 *     radius stays under consumer control so this primitive can be
 *     used in the minimal (sharp-cornered) concept and elsewhere.
 *   - Removed the `useMouseEnter` default-throw. The hook now returns
 *     the context or `[false, noop]` when used outside a container.
 *     That way the primitive degrades gracefully if misused, rather
 *     than hard-crashing the page.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';
import { minimal } from '../design-system';

type MouseEnterCtx = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const MouseEnterContext = createContext<MouseEnterCtx | undefined>(undefined);

function useCoarsePointer() {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: coarse)');
    const sync = () => setCoarse(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return coarse;
}

/** Rotation sensitivity. Lower = stronger tilt. Matches the upstream value. */
const TILT_SENSITIVITY = 25;

export interface CardContainerProps {
  children?: React.ReactNode;
  /** Class applied to the tilting card body wrapper. */
  className?: string;
  /** Class applied to the outermost (perspective) container. */
  containerClassName?: string;
}

export function CardContainer({
  children,
  className,
  containerClassName,
}: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);
  const prefersReduced = useReducedMotionPreference();
  const coarse = useCoarsePointer();
  const tiltDisabled = prefersReduced || coarse;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tiltDisabled || !containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / TILT_SENSITIVITY;
    const y = (e.clientY - top - height / 2) / TILT_SENSITIVITY;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseEnter = () => {
    if (tiltDisabled) return;
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (tiltDisabled || !containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = 'rotateY(0deg) rotateX(0deg)';
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn('flex items-center justify-center', containerClassName)}
        style={{ perspective: '1000px' }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn('relative flex items-center justify-center', className)}
          style={{
            transformStyle: 'preserve-3d',
            transition: tiltDisabled
              ? 'none'
              : `transform ${minimal.motion.duration.fast}ms ${minimal.motion.ease.out}`,
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div
      className={cn('relative [&>*]:[transform-style:preserve-3d]', className)}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export interface CardItemProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  /** Horizontal translate (px) on hover. */
  translateX?: number;
  /** Vertical translate (px) on hover. */
  translateY?: number;
  /** Z-depth (px) on hover — positive floats toward viewer, negative sinks away. */
  translateZ?: number;
  /** Rotation X (deg) on hover. */
  rotateX?: number;
  /** Rotation Y (deg) on hover. */
  rotateY?: number;
  /** Rotation Z (deg) on hover. */
  rotateZ?: number;
  [key: string]: unknown;
}

export function CardItem({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps) {
  const ref = useRef<HTMLElement>(null);
  const [isMouseEntered] = useMouseEnter();
  const prefersReduced = useReducedMotionPreference();
  const coarse = useCoarsePointer();
  const disabled = prefersReduced || coarse;

  useEffect(() => {
    if (!ref.current) return;
    if (disabled) {
      ref.current.style.transform = 'none';
      return;
    }
    if (isMouseEntered) {
      ref.current.style.transform = `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = 'translate3d(0, 0, 0) rotateX(0) rotateY(0) rotateZ(0)';
    }
  }, [
    disabled,
    isMouseEntered,
    rotateX,
    rotateY,
    rotateZ,
    translateX,
    translateY,
    translateZ,
  ]);

  // `React.createElement` instead of JSX so the dynamic `Tag` polymorphic
  // element doesn't trip the strict-children typing on React 19.
  return React.createElement(
    Tag,
    {
      ref,
      className: cn('w-fit', className),
      style: {
        transition: disabled
          ? 'none'
          : `transform ${minimal.motion.duration.base}ms ${minimal.motion.ease.out}`,
      },
      ...rest,
    },
    children,
  );
}

/** Graceful-degrade hook — returns `[false, noop]` if used outside a CardContainer. */
export function useMouseEnter(): MouseEnterCtx {
  const ctx = useContext(MouseEnterContext);
  if (ctx === undefined) {
    // Log during dev so the misuse is visible, but don't crash prod.
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('useMouseEnter called outside CardContainer — returning inert context.');
    }
    return [false, () => {}];
  }
  return ctx;
}
