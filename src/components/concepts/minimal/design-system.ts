/**
 * Vault Maison — Minimal Concept Design System
 *
 * Single source of truth for the "Minimal Machine" aesthetic.
 *
 *   Brutalist baseline (sharp edges, instant invert) +
 *   Editorial layout (negative space, type scale) +
 *   Liquid-precision motion (springs, sub-300 ms physics)
 *
 * EVERY new component must consume tokens from this file. Hard-coded
 * literal hexes / px values inside components are a regression — they
 * make the palette and motion language drift over time.
 *
 * Constraints (frozen by Phase-2 design audit, see
 * `docs/research/ui-ux-pro-max-recommendations.md`):
 *
 *   - Greyscale palette ONLY  (no gold, no gradient, no chromatic blur)
 *   - Border radius = 0       (`rounded-*` utilities are forbidden)
 *   - Hairlines = 1px         (no 2-4px brutalist borders)
 *   - Hero weight 100-200     (scale, not weight, carries the brand)
 *   - Reduced-motion honored  (use `useReducedMotionPreference()`)
 *   - No `initial={{ opacity: 0 }}` in Framer Motion (first-paint flash)
 */
export const minimal = {
  font: {
    primary: "'Inter', 'Helvetica Neue', sans-serif",
    mono: "'SF Mono', 'Fira Code', monospace",
  },
  colors: {
    bg: '#FFFFFF',
    text: '#050505',
    textSecondary: '#6B6B6B',
    textMuted: '#9B9B9B',
    border: '#E5E5E5',
    hoverBg: '#E5E5E5',
  },
  /**
   * 8-px baseline grid + fluid clamps for hero / section padding.
   * Use over arbitrary `px` values inside components.
   */
  space: {
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '24px',
    6: '32px',
    7: '48px',
    8: '64px',
    9: '96px',
    sectionY: 'clamp(80px, 12vh, 160px)',
    sectionYCompact: 'clamp(48px, 8vh, 96px)',
    containerX: 'clamp(20px, 5vw, 96px)',
  },
  /**
   * z-index policy. 0 base, 10 sticky header, 20 popovers, 30 modals,
   * 40 toasts, 50 cursor. Add new layers here, not at call site.
   */
  z: {
    base: 0,
    sticky: 10,
    overlay: 20,
    modal: 30,
    toast: 40,
    cursor: 50,
  },
  /**
   * Motion vocabulary. Every animated component must reference these.
   *
   *   - `easeOut`     entrance / camera moves (Apple-favorite curve)
   *   - `easeIn`      exits (slow start, fast end)
   *   - `easeInOut`   continuous, accordion, drawer
   *   - `easeSnap`    brutalist UI snap (used by buttons)
   *   - `springSoft`  magnetic pull (low stiffness, low mass)
   *   - `springTight` counter, cart bounce (tight, returns fast)
   *   - `parallax.*`  ScrollTrigger speeds for depth layering. Values
   *                   are multipliers, not px — the lower the number,
   *                   the slower the layer moves relative to scroll.
   *                   See `docs/research/ui-polish-v2-recommendations.md`
   *                   §1.3 (derived from the UI UX Pro Max parallax
   *                   search).
   *   - durations are unitless ms; convert to s in GSAP, leave in ms in CSS
   */
  motion: {
    ease: {
      out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      in: 'cubic-bezier(0.7, 0, 0.84, 0)',
      inOut: 'cubic-bezier(0.83, 0, 0.17, 1)',
      snap: 'cubic-bezier(0.22, 1, 0.36, 1)',
    },
    spring: {
      soft: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
      tight: { type: 'spring', stiffness: 260, damping: 20, mass: 0.5 },
    },
    duration: {
      instant: 0,
      fast: 150,
      base: 300,
      slow: 600,
      cinematic: 1500,
    },
    parallax: {
      /** Deep background layer — slowest. 0.15–0.3 looks like "far distance". */
      bg: 0.3,
      /** Mid-ground — ~half the scroll speed. Used for hero images. */
      mid: 0.6,
      /** Foreground — moves with scroll. No parallax, baseline. */
      fg: 1.0,
    },
  },
  /**
   * Magnetic-hover variables. Consumed by `MagneticButton`. Cursor
   * values used to live here for a custom follower cursor; that
   * component was removed (we use the native OS cursor), so only
   * the magnetic-pull radius remains.
   */
  magnetic: {
    radius: 100,
  },
  cn: {
    heroHeadline: 'text-4xl md:text-6xl lg:text-8xl font-extralight tracking-tighter leading-none text-[#050505]',
    sectionHeadline: 'text-2xl md:text-3xl lg:text-5xl font-light tracking-tight text-[#050505]',
    subsectionHead: 'text-xl md:text-2xl font-normal tracking-tight text-[#050505]',
    productTitle: 'text-lg font-medium tracking-tight text-[#050505]',
    body: 'text-sm md:text-base text-[#6B6B6B] leading-relaxed',
    label: 'text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B]',
    price: 'text-base font-medium tabular-nums text-[#050505]',
    section: 'py-20 md:py-32',
    container: 'max-w-7xl mx-auto px-5 md:px-8',
    btnPrimary: 'bg-[#050505] text-[#FFFFFF] h-12 md:h-14 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#6B6B6B] transition-colors duration-300 rounded-none inline-flex items-center justify-center',
    btnSecondary: 'border border-[#050505] bg-transparent text-[#050505] h-12 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#050505] hover:text-[#FFFFFF] transition-all duration-300 rounded-none inline-flex items-center justify-center',
    input: 'h-12 px-4 border border-[#E5E5E5] bg-[#FFFFFF] text-sm text-[#050505] placeholder:text-[#9B9B9B] rounded-none focus:outline-none focus:border-[#050505] transition-colors duration-200 w-full',
    divider: 'border-t border-[#E5E5E5]',
    gridProduct: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
    gridCategory: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6',
    containerNarrow: 'max-w-3xl mx-auto px-5 md:px-8',
    sectionCompact: 'py-12 md:py-20',
    btnGhost: 'border border-[#050505] bg-transparent text-[#050505] h-10 px-6 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#050505] hover:text-[#FFFFFF] transition-all duration-300 rounded-none inline-flex items-center justify-center gap-2',
  },
} as const;

/**
 * Helper — returns 0 if the user prefers reduced motion, otherwise
 * the supplied duration. Keeps consumer call-sites tidy.
 *
 * Usage:
 *   const d = motionDuration(minimal.motion.duration.base, prefersReduced);
 *   element.style.transitionDuration = `${d}ms`;
 */
export function motionDuration(
  ms: number,
  prefersReduced: boolean,
): number {
  return prefersReduced ? 0 : ms;
}
