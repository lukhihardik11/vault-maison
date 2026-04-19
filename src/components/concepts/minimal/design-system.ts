/**
 * Vault Maison — "Minimal Machine" design system
 *
 * Brutalist-luxury vocabulary used by every component under
 * `src/components/concepts/minimal/`. Pure monochrome (no gold, no
 * gradients), zero-radius geometry, and a small set of motion tokens that
 * every primitive must consume so the language stays consistent across the
 * concept.
 *
 * See `docs/research/ui-ux-pro-max-recommendations.md` for the reasoning
 * behind the additions in this file.
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
    hoverBg: '#FAFAFA',
    surfaceInverse: '#050505',
    textInverse: '#FFFFFF',
    borderStrong: '#050505',
  },

  /**
   * Fluid spacing scale. Use the named tokens directly for static spacing,
   * or compose with `clampSpace()` for fluid section padding.
   */
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    '2xl': '64px',
    '3xl': '96px',
    '4xl': '144px',
  },

  /**
   * Motion durations (ms). Used by every primitive in `ui/`. Pair with an
   * `easing.*` token below.
   */
  motion: {
    instant: 0,
    fast: 120,
    standard: 200,
    medium: 400,
    slow: 700,
    long: 1500,
  },

  /**
   * Cubic-bezier easing tokens. `out` is the workhorse for entering
   * elements, `brutal` is reserved for snappy mechanical motion (marquees,
   * glitch bursts) where we want a near-instant snap.
   */
  easing: {
    out: 'cubic-bezier(0.16, 1, 0.3, 1)',
    in: 'cubic-bezier(0.7, 0, 0.84, 0)',
    inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    brutal: 'cubic-bezier(0.85, 0, 0.15, 1)',
  },

  /**
   * Constants for the magnetic-pointer interaction used by `MagneticButton`
   * and any future cursor-aware primitive.
   */
  magnetic: {
    distance: 120,
    strength: 0.35,
    lift: 1.04,
  },

  /**
   * Constants for the brutalist glitch effect used by `GlitchText`. All
   * values are kept tiny so the effect stays legible and never causes
   * motion-sickness.
   */
  glitch: {
    amplitude: 2,
    frequency: 60,
    duration: 350,
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
    btnPrimary: 'bg-[#050505] text-white h-12 md:h-14 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#1a1a1a] transition-colors duration-300 rounded-none inline-flex items-center justify-center',
    btnSecondary: 'border border-[#050505] bg-transparent text-[#050505] h-12 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#050505] hover:text-white transition-all duration-300 rounded-none inline-flex items-center justify-center',
    input: 'h-12 px-4 border border-[#E5E5E5] bg-white text-sm text-[#050505] placeholder:text-[#9B9B9B] rounded-none focus:outline-none focus:border-[#050505] transition-colors duration-200 w-full',
    divider: 'border-t border-[#E5E5E5]',
    gridProduct: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
    gridCategory: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6',
    containerNarrow: 'max-w-3xl mx-auto px-5 md:px-8',
    sectionCompact: 'py-12 md:py-20',
    btnGhost: 'border border-[#050505] bg-transparent text-[#050505] h-10 px-6 text-[11px] uppercase tracking-[0.15em] font-medium hover:bg-[#050505] hover:text-white transition-all duration-300 rounded-none inline-flex items-center justify-center gap-2',
  },
} as const;

/**
 * Build a CSS `clamp()` string for fluid sizing without remembering the
 * formula every time. Returns `clamp(<min>, <fluid>, <max>)`.
 *
 * @example
 * clampSpace(40, 8, 120) // "clamp(40px, 8vh, 120px)"
 */
export function clampSpace(minPx: number, fluid: number, maxPx: number, unit: 'vh' | 'vw' = 'vw'): string {
  return `clamp(${minPx}px, ${fluid}${unit}, ${maxPx}px)`;
}

/**
 * Compose a CSS transition string from design tokens. Defaults to the
 * "standard" duration + "out" easing, which is the right answer ~80 % of the
 * time.
 *
 * @example
 * transitionToken('transform', 'medium', 'out') // "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)"
 */
export function transitionToken(
  property: string = 'all',
  duration: keyof typeof minimal.motion = 'standard',
  easing: keyof typeof minimal.easing = 'out',
): string {
  return `${property} ${minimal.motion[duration]}ms ${minimal.easing[easing]}`;
}

export type MinimalTokens = typeof minimal;
