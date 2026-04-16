// Minimal Machine Design System
// Every Minimal component MUST import from here. No hardcoded values.

export const minimal = {
  colors: {
    bg: '#FFFFFF',
    text: '#050505',
    textSecondary: '#6B6B6B',
    textMuted: '#9B9B9B',
    border: '#E5E5E5',
    hoverBg: '#FAFAFA',
  },
  cn: {
    // Typography
    heroHeadline: 'text-6xl md:text-8xl font-extralight tracking-tighter leading-none text-[#050505]',
    sectionHeadline: 'text-3xl md:text-5xl font-light tracking-tight text-[#050505]',
    subsectionHead: 'text-xl md:text-2xl font-normal tracking-tight text-[#050505]',
    productTitle: 'text-lg font-medium tracking-tight text-[#050505]',
    body: 'text-sm md:text-base text-[#6B6B6B] leading-relaxed',
    label: 'text-[11px] uppercase tracking-[0.15em] text-[#9B9B9B]',
    price: 'text-base font-medium tabular-nums text-[#050505]',
    // Layout
    section: 'py-20 md:py-32',
    container: 'max-w-7xl mx-auto px-5 md:px-8',
    // Buttons
    btnPrimary: 'bg-[#050505] text-white h-12 md:h-14 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#1a1a1a] transition-colors duration-300 rounded-none inline-flex items-center justify-center',
    btnSecondary: 'border border-[#050505] bg-transparent text-[#050505] h-12 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#050505] hover:text-white transition-all duration-300 rounded-none inline-flex items-center justify-center',
    // Divider
    divider: 'border-t border-[#E5E5E5]',
  },
} as const
