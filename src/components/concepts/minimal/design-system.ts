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
 *   - Hero weight 600-700     (bold headings per Tier 1 references: apple/celine/jilsander/B&O)
 *   - Reduced-motion honored  (use `useReducedMotionPreference()`)
 *   - No `initial={{ opacity: 0 }}` in Framer Motion (first-paint flash)
 */
export const minimal = {
  font: {
    primary: "'Inter', 'Helvetica Neue', sans-serif",
    mono: "'SF Mono', 'Fira Code', monospace",
    /** Tier 4: Brutalist monospace for prices, codes, specs — loaded via Google Fonts */
    brutalistMono: "'Space Mono', 'SF Mono', 'Fira Code', monospace",
  },
  /**
   * Fluid Typography Scale — Phase 1 Foundation (v2)
   *
   * Methodology: Utopia-style fluid interpolation between 375px and 1440px.
   * Formula: clamp(min_rem, intercept_rem + slope_vw, max_rem)
   * Where: slope = (max_px - min_px) / ((1440 - 375) / 100)
   *        intercept = min_rem - (slope * 375 / 100 / 16)
   *
   * Design rationale (luxury jewelry brand):
   *   - Display/H1: dramatic scaling for hero impact (Cartier-inspired)
   *   - Body text: subtle scaling to maintain readability across devices
   *   - Min/max in rem to respect user zoom preferences (WCAG 1.4.4)
   *   - Intermediate vw value ensures smooth interpolation
   *
   * @see https://utopia.fyi/type/calculator
   * @see https://web.dev/articles/baseline-in-action-fluid-type
   *
   * Usage: style={{ fontSize: minimal.type.h1 }}
   */
  type: {
    /** Display/Hero: 36px → 72px — full-bleed hero headlines */
    display: 'clamp(2.25rem, 1.5rem + 3.38vw, 4.5rem)',
    /** H1: 32px → 56px — page titles, section openers */
    h1: 'clamp(2rem, 1.43rem + 2.54vw, 3.5rem)',
    /** H2: 28px → 42px — section headings */
    h2: 'clamp(1.75rem, 1.42rem + 1.5vw, 2.625rem)',
    /** H3: 22px → 32px — subsection headings, card titles */
    h3: 'clamp(1.375rem, 1.14rem + 1.07vw, 2rem)',
    /** H4: 18px → 24px — minor headings, large labels */
    h4: 'clamp(1.125rem, 0.98rem + 0.56vw, 1.5rem)',
    /** Body Large: 16px → 18px — lead paragraphs, featured text */
    bodyLg: 'clamp(1rem, 0.95rem + 0.19vw, 1.125rem)',
    /** Body: 14px → 16px — default paragraph text */
    body: 'clamp(0.875rem, 0.83rem + 0.19vw, 1rem)',
    /** Body Small: 13px → 14px — secondary descriptions */
    bodySm: 'clamp(0.8125rem, 0.79rem + 0.09vw, 0.875rem)',
    /** Caption/Label: 11px → 12px — form labels, image captions */
    caption: 'clamp(0.6875rem, 0.66rem + 0.09vw, 0.75rem)',
    /** Overline/Micro: 10px → 11px — overlines, metadata */
    micro: 'clamp(0.625rem, 0.6rem + 0.09vw, 0.6875rem)',
    /** Quote/Pullquote: 20px → 32px — editorial pullquotes */
    quote: 'clamp(1.25rem, 0.97rem + 1.22vw, 2rem)',
    /** Price: 16px → 20px — product prices (tabular) */
    price: 'clamp(1rem, 0.91rem + 0.38vw, 1.25rem)',
    /** Nav link: 12px → 13px — navigation items */
    nav: 'clamp(0.75rem, 0.73rem + 0.09vw, 0.8125rem)',
    /** Button text: 11px → 12px — CTA button labels */
    btn: 'clamp(0.6875rem, 0.66rem + 0.09vw, 0.75rem)',
  },
  colors: {
    bg: '#FFFFFF',
    text: '#050505',
    textSecondary: '#6B6B6B',
    textMuted: '#767676',
    border: '#E5E5E5',
    hoverBg: '#E5E5E5',
  },
  /**
   * 8-px baseline grid + fluid clamps for hero / section padding.
   * Use over arbitrary `px` values inside components.
   *
   * Static steps (0–9) for component internals.
   * Fluid steps (fl-*) for layout spacing that scales with viewport.
   * Section/container clamps for page-level rhythm.
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
    /** Fluid spacing: 8px → 16px — tight gaps (icon-to-label, inline elements) */
    'fl-xs': 'clamp(0.5rem, 0.43rem + 0.28vw, 1rem)',
    /** Fluid spacing: 16px → 24px — standard component padding */
    'fl-sm': 'clamp(1rem, 0.91rem + 0.38vw, 1.5rem)',
    /** Fluid spacing: 24px → 40px — card padding, group gaps */
    'fl-md': 'clamp(1.5rem, 1.31rem + 0.75vw, 2.5rem)',
    /** Fluid spacing: 32px → 64px — section internal spacing */
    'fl-lg': 'clamp(2rem, 1.63rem + 1.5vw, 4rem)',
    /** Fluid spacing: 48px → 96px — section vertical rhythm */
    'fl-xl': 'clamp(3rem, 2.44rem + 2.25vw, 6rem)',
    /** Fluid spacing: 64px → 128px — hero/page-level breathing room */
    'fl-2xl': 'clamp(4rem, 3.25rem + 3.0vw, 8rem)',
    sectionY: 'clamp(48px, 8vh, 96px)',
    sectionYCompact: 'clamp(32px, 5vh, 64px)',
    containerX: 'clamp(20px, 5vw, 96px)',
  },
  /**
   * Touch Target — Phase 1 Foundation
   *
   * Minimum interactive element size per WCAG 2.5.5 and Apple HIG.
   * All buttons, links, and interactive elements must meet these minimums.
   */
  touch: {
    /** Minimum touch target: 44x44px (Apple HIG) */
    min: '44px',
    /** Comfortable touch target: 48x48px (Material Design) */
    comfortable: '48px',
    /** Large touch target: 56px (primary CTAs on mobile) */
    large: '56px',
  },
  /**
   * Fluid Container Widths — Phase 1 Foundation
   *
   * Responsive container widths that adapt to viewport.
   */
  container: {
    /** Max content width */
    max: '1440px',
    /** Narrow content (articles, forms) */
    narrow: '768px',
    /** Medium content (product grids) */
    medium: '1200px',
    /** Fluid horizontal padding */
    px: 'clamp(16px, 4vw, 96px)',
    /** Compact horizontal padding (mobile-first) */
    pxCompact: 'clamp(16px, 3vw, 48px)',
  },
  /**
   * Image Loading Strategy — Phase 1 Foundation
   *
   * Defines responsive `sizes` attributes and loading priorities.
   * Prevents layout shift (CLS) and optimizes Largest Contentful Paint (LCP).
   *
   * Rules:
   *   - Hero/above-fold images: loading="eager", fetchpriority="high"
   *   - Below-fold images: loading="lazy", decoding="async"
   *   - All images must have explicit width/height or aspect-ratio
   */
  image: {
    /** Hero image sizes — full-width on mobile, constrained on desktop */
    heroSizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px',
    /** Product card sizes — responsive grid columns */
    productSizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw',
    /** Bento grid sizes — adapts to container query context */
    bentoSizes: '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw',
    /** Gallery/detail sizes — large single image */
    detailSizes: '(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 720px',
    /** Thumbnail sizes — small preview images */
    thumbSizes: '(max-width: 640px) 25vw, 120px',
  },
  /**
   * Font Loading Strategy — Phase 1 Foundation
   *
   * Critical fonts are preloaded in <head>. Non-critical fonts use
   * font-display: swap with size-adjust fallbacks to minimize CLS.
   *
   * Implementation: Add these as <link rel="preload"> in _document or layout.
   */
  fontLoading: {
    /** Critical font — preload for hero/nav (Inter Regular + Medium) */
    critical: [
      { family: 'Inter', weight: '400', style: 'normal' },
      { family: 'Inter', weight: '500', style: 'normal' },
    ],
    /** Deferred font — load after first paint (Space Mono, Inter Bold) */
    deferred: [
      { family: 'Space Mono', weight: '400', style: 'normal' },
      { family: 'Inter', weight: '600', style: 'normal' },
      { family: 'Inter', weight: '700', style: 'normal' },
    ],
    /** Fallback metrics for Inter — reduces CLS during font swap */
    fallbackMetrics: {
      family: 'Inter',
      fallback: 'Helvetica Neue',
      sizeAdjust: '107%',
      ascentOverride: '90%',
      descentOverride: '22%',
      lineGapOverride: '0%',
    },
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
    heroHeadline: 'text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-none text-[#050505]',
    sectionHeadline: 'text-2xl md:text-3xl lg:text-5xl font-semibold tracking-tight text-[#050505]',
    subsectionHead: 'text-xl md:text-2xl font-semibold tracking-tight text-[#050505]',
    productTitle: 'text-lg font-medium tracking-tight text-[#050505]',
    body: 'text-sm md:text-base text-[#6B6B6B] leading-relaxed',
    label: 'text-[11px] uppercase tracking-[0.2em] text-[#767676] font-medium',
    price: 'text-base font-medium tabular-nums text-[#050505] font-mono',
    /** Tier 4: Monospace for product codes, specs, metadata */
    mono: 'font-mono text-xs tracking-wide text-[#767676]',
    /** Tier 4: Section index number (01, 02, 03...) */
    sectionIndex: 'font-mono text-[11px] tracking-[0.3em] text-[#767676] uppercase',
    /** Tier 4: Product index number on cards */
    productIndex: 'font-mono text-[10px] tracking-[0.2em] text-[#767676]',
    section: 'py-12 md:py-20',
    container: 'max-w-7xl mx-auto px-5 md:px-8',
    btnPrimary: 'bg-[#050505] text-[#FFFFFF] h-12 md:h-14 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#6B6B6B] transition-colors duration-300 rounded-none inline-flex items-center justify-center',
    btnSecondary: 'border border-[#050505] bg-transparent text-[#050505] h-12 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#050505] hover:text-[#FFFFFF] transition-all duration-300 rounded-none inline-flex items-center justify-center',
    input: 'h-12 px-4 border border-[#E5E5E5] bg-[#FFFFFF] text-sm text-[#050505] placeholder:text-[#767676] rounded-none focus:outline-none focus:border-[#050505] transition-colors duration-200 w-full',
    divider: 'border-t border-[#E5E5E5]',
    gridProduct: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
    gridCategory: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6',
    containerNarrow: 'max-w-3xl mx-auto px-5 md:px-8',
    sectionCompact: 'py-8 md:py-14',
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
