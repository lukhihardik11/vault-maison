/**
 * Vault Maison — Mobile Design Tokens (Phase 3A)
 *
 * Extends the core design-system.ts with mobile-specific tokens:
 *   - Breakpoint system (device-aware)
 *   - Animation tokens (spring configs, durations)
 *   - Shadow elevation scale
 *   - Safe area insets
 *   - Viewport unit helpers
 *   - Dark mode color mapping
 *
 * These tokens are consumed by mobile-specific components (bottom nav,
 * scroll-snap bento, device-tilt hooks) and the responsive CSS layer.
 */

/* ─── Breakpoints ─────────────────────────────────────────────────── */

export const breakpoints = {
  /** iPhone SE, small Android */
  xs: 375,
  /** iPhone 14/15, standard Android */
  sm: 428,
  /** iPad Mini, small tablets */
  md: 768,
  /** iPad Pro, small laptops */
  lg: 1024,
  /** Desktop */
  xl: 1440,
} as const;

/** Media query helpers (min-width, mobile-first) */
export const mq = {
  xs: `@media (min-width: ${breakpoints.xs}px)`,
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  /** Touch device detection */
  touch: '@media (hover: none) and (pointer: coarse)',
  /** Mouse/trackpad device */
  hover: '@media (hover: hover) and (pointer: fine)',
  /** Reduced motion */
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  /** Dark mode */
  dark: '@media (prefers-color-scheme: dark)',
  /** Landscape orientation */
  landscape: '@media (orientation: landscape)',
  /** Portrait orientation */
  portrait: '@media (orientation: portrait)',
} as const;

/* ─── Tailwind Breakpoint Classes ─────────────────────────────────── */

export const twBreakpoints = {
  /** Show only on mobile (< 768px) */
  mobileOnly: 'md:hidden',
  /** Show only on tablet+ (>= 768px) */
  tabletUp: 'hidden md:block',
  /** Show only on desktop (>= 1024px) */
  desktopOnly: 'hidden lg:block',
  /** Hide on desktop */
  hideDesktop: 'lg:hidden',
} as const;

/* ─── Animation Tokens ────────────────────────────────────────────── */

export const springs = {
  /** Quick response — button press, toggle */
  snappy: { type: 'spring' as const, stiffness: 400, damping: 30, mass: 1 },
  /** Card entrance — scroll reveal */
  gentle: { type: 'spring' as const, stiffness: 120, damping: 14, mass: 1 },
  /** Page transition — route change */
  smooth: { type: 'spring' as const, stiffness: 200, damping: 26, mass: 1 },
  /** Drag release — carousel snap */
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 30, mass: 0.8 },
  /** Overlay appearance — bottom sheet, modal */
  soft: { type: 'spring' as const, stiffness: 150, damping: 20, mass: 1 },
  /** Dismiss/exit — fast, decisive */
  exit: { type: 'spring' as const, stiffness: 500, damping: 35, mass: 1 },
} as const;

export const durations = {
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slower: 800,
  cinematic: 1200,
} as const;

export const easings = {
  /** Apple-style ease out — entrance */
  out: 'cubic-bezier(0.16, 1, 0.3, 1)',
  /** Ease in — exit */
  in: 'cubic-bezier(0.7, 0, 0.84, 0)',
  /** Smooth in-out — continuous motion */
  inOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  /** Spring-like overshoot */
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

/* ─── Shadow Elevation Scale ──────────────────────────────────────── */

export const shadows = {
  /** Subtle lift — cards at rest */
  sm: '0 1px 2px rgba(44, 36, 32, 0.04)',
  /** Medium elevation — hovered cards */
  md: '0 4px 12px rgba(44, 36, 32, 0.06)',
  /** High elevation — modals, bottom sheets */
  lg: '0 8px 24px rgba(44, 36, 32, 0.10)',
  /** Maximum elevation — floating elements */
  xl: '0 16px 48px rgba(44, 36, 32, 0.14)',
  /** Gold glow — accent hover states */
  gold: '0 4px 20px rgba(201, 169, 110, 0.15)',
  /** Bottom nav shadow — always visible */
  nav: '0 -1px 8px rgba(44, 36, 32, 0.06)',
} as const;

/* ─── Safe Area Insets ────────────────────────────────────────────── */

export const safeArea = {
  top: 'env(safe-area-inset-top, 0px)',
  right: 'env(safe-area-inset-right, 0px)',
  bottom: 'env(safe-area-inset-bottom, 0px)',
  left: 'env(safe-area-inset-left, 0px)',
} as const;

/* ─── Bottom Navigation Config ────────────────────────────────────── */

export const bottomNav = {
  height: '64px',
  /** Total height including safe area */
  heightWithSafe: 'calc(64px + env(safe-area-inset-bottom, 0px))',
  /** Padding to add to page bottom to prevent content hiding */
  pageBottomPadding: 'calc(64px + env(safe-area-inset-bottom, 0px) + 16px)',
} as const;

/* ─── Scroll Snap Config ──────────────────────────────────────────── */

export const scrollSnap = {
  /** Card width as percentage of viewport */
  cardWidth: '85vw',
  /** Maximum card width */
  cardMaxWidth: '340px',
  /** Gap between cards */
  gap: '12px',
  /** Horizontal padding for scroll container */
  padding: '20px',
} as const;

/* ─── Dark Mode Color Mapping ─────────────────────────────────────── */

export const darkColors = {
  bgPrimary: '#1A1614',
  bgSecondary: '#2C2420',
  textPrimary: '#F5F0EA',
  textSecondary: '#A89888',
  accentGold: '#D4B87A',
  border: '#3D3530',
  borderSubtle: '#2E2824',
} as const;

/* ─── Haptic Patterns (Vibration API) ─────────────────────────────── */

export const haptics = {
  /** Light tap — selection change */
  light: [5],
  /** Medium tap — carousel snap */
  medium: [10],
  /** Success — add to cart */
  success: [15, 30, 25],
  /** Error — invalid action */
  error: [50],
  /** Purchase complete */
  celebration: [20, 50, 30, 50, 40],
} as const;

/* ─── Utility: Trigger Haptic ─────────────────────────────────────── */

export function triggerHaptic(pattern: keyof typeof haptics): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(haptics[pattern]);
  }
}
