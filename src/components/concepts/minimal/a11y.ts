/* ────────────────────────────────────────────────────────────────────
 * a11y.ts — Accessibility constants and utilities
 *
 * WCAG 2.1 AA requires:
 * - 4.5:1 contrast ratio for normal text (< 18px or < 14px bold)
 * - 3:1 contrast ratio for large text (≥ 18px or ≥ 14px bold)
 *
 * Color audit:
 * - #767676 on #FFFFFF = 2.85:1 ❌ (fails AA for all text sizes)
 * - #767676 on #FFFFFF = 4.54:1 ✅ (passes AA for normal text)
 * - #6B6B6B on #FFFFFF = 5.36:1 ✅ (passes AA for all text sizes)
 *
 * Decision: Use #767676 for secondary/caption text (10-13px).
 * This is the minimum WCAG AA compliant gray on white.
 * ──────────────────────────────────────────────────────────────── */

/**
 * WCAG AA compliant secondary text color on white backgrounds.
 * Replaces #767676 (2.85:1) with #767676 (4.54:1).
 */
export const A11Y_SECONDARY_TEXT = '#767676'

/**
 * Focus ring style for keyboard navigation.
 * Uses a 2px offset to avoid overlapping content.
 */
export const FOCUS_RING_STYLE = {
  outline: '2px solid #050505',
  outlineOffset: '2px',
} as const

/**
 * Reduced motion media query for use in CSS-in-JS.
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
