/**
 * MINIMAL MACHINE — Design System Tokens
 * Brutalist monochrome design language.
 * Every Minimal page MUST pull from these tokens.
 * ❌ NO gold, NO colored accents. Pure monochrome only.
 */

export const MINIMAL = {
  colors: {
    bg: '#FFFFFF',
    text: '#050505',
    textSecondary: '#6B6B6B',
    border: '#E5E5E5',
    hover: '#F5F5F5',
    accent: '#050505', // accent IS the text color in brutalist
  },
  typography: {
    heroHeadline: 'text-6xl md:text-8xl font-extralight tracking-tight',
    sectionHeadline: 'text-4xl md:text-5xl font-light tracking-tight',
    productTitle: 'text-xl font-medium tracking-tight',
    body: 'text-base font-normal leading-relaxed text-gray-600',
    label: 'text-xs uppercase tracking-[0.2em] text-gray-500',
    price: 'text-lg font-medium tabular-nums',
  },
  spacing: {
    section: 'py-24 md:py-32',
    container: 'max-w-7xl mx-auto px-6 md:px-8',
    grid: 'gap-8 md:gap-12',
  },
  animation: {
    hover: 'transition-all duration-500 ease-out',
    fadeIn: 'transition-opacity duration-700 ease-out',
    slideUp: 'transition-transform duration-500 ease-out',
  },
  font: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif",
} as const
