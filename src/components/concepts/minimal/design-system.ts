// ═══════════════════════════════════════════════════════════════
// MINIMAL MACHINE — Design System
// DNA: Brutalist · Restrained · Precise
// Inspiration: Apple.com · Jil Sander · Dieter Rams · Swiss Typography
// Rule: Restraint IS the luxury. No unnecessary decoration.
// ═══════════════════════════════════════════════════════════════

export const minimal = {
  colors: {
    bg: '#FFFFFF',
    bgAlt: '#FAFAFA',
    bgDark: '#050505',
    text: '#050505',
    textSecondary: '#555555',
    textMuted: '#8A8A8A',
    textLight: '#ABABAB',
    border: '#E8E8E8',
    borderLight: '#F0F0F0',
    hoverBg: '#F5F5F5',
    accent: '#050505',
    white: '#FFFFFF',
  },
  font: {
    primary: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    mono: "'SF Mono', 'Fira Code', 'Courier New', monospace",
  },
  cn: {
    // Typography — Luxury Scale
    heroHeadline: 'text-[clamp(56px,10vw,160px)] font-[100] tracking-[-0.05em] leading-[0.88] text-[#050505] uppercase',
    heroSub: 'text-[clamp(14px,1.5vw,18px)] font-[300] tracking-[0.25em] leading-[1.8] text-[#555555] uppercase',
    sectionHeadline: 'text-[clamp(32px,4vw,64px)] font-[200] tracking-[-0.03em] leading-[1.05] text-[#050505]',
    sectionSub: 'text-[clamp(13px,1.2vw,16px)] font-[300] tracking-[0.2em] text-[#8A8A8A] uppercase',
    subsectionHead: 'text-[clamp(20px,2vw,28px)] font-[300] tracking-[-0.02em] text-[#050505]',
    productTitle: 'text-[15px] font-[400] tracking-[-0.01em] text-[#050505]',
    body: 'text-[15px] font-[300] text-[#555555] leading-[1.75]',
    bodyLarge: 'text-[clamp(16px,1.5vw,20px)] font-[300] text-[#555555] leading-[1.8]',
    label: 'text-[10px] uppercase tracking-[0.25em] text-[#8A8A8A] font-[400]',
    labelDark: 'text-[10px] uppercase tracking-[0.25em] text-[#050505] font-[500]',
    price: 'text-[15px] font-[400] tabular-nums text-[#050505] tracking-[-0.01em]',
    priceLarge: 'text-[clamp(20px,2vw,28px)] font-[300] tabular-nums text-[#050505] tracking-[-0.02em]',
    mono: 'text-[11px] tracking-[0.15em] font-[400]',

    // Layout — Generous Whitespace
    section: 'py-24 md:py-40',
    sectionCompact: 'py-16 md:py-24',
    container: 'max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16',
    containerNarrow: 'max-w-[900px] mx-auto px-6 md:px-12',
    containerWide: 'max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16',

    // Buttons — Sharp, Precise
    btnPrimary: 'bg-[#050505] text-white h-[52px] px-12 text-[11px] uppercase tracking-[0.2em] font-[500] hover:bg-white hover:text-[#050505] border border-[#050505] transition-none inline-flex items-center justify-center gap-3',
    btnSecondary: 'border border-[#050505] bg-transparent text-[#050505] h-[52px] px-12 text-[11px] uppercase tracking-[0.2em] font-[500] hover:bg-[#050505] hover:text-white transition-none inline-flex items-center justify-center gap-3',
    btnGhost: 'bg-transparent text-[#050505] h-[52px] px-0 text-[11px] uppercase tracking-[0.2em] font-[500] hover:opacity-50 transition-opacity duration-300 inline-flex items-center justify-center gap-2',

    // Divider
    divider: 'border-t border-[#E8E8E8]',
    dividerDark: 'border-t border-[#333333]',

    // Grid
    gridProduct: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8',
    gridCategory: 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6',
  },
} as const
