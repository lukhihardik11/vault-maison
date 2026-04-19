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
  },
  animation: {
    easing: {
      brutal: 'cubic-bezier(0.19, 1, 0.22, 1)',
      smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    timing: {
      micro: '150ms',
      fast: '300ms',
      base: '500ms',
      slow: '800ms',
      macro: '1200ms',
    },
  },
  spacing: {
    '3xs': '0.25rem', // 4px
    '2xs': '0.5rem',  // 8px
    'xs': '1rem',     // 16px
    'sm': '1.5rem',   // 24px
    'md': '2rem',     // 32px
    'lg': '3rem',     // 48px
    'xl': '4rem',     // 64px
    '2xl': '6rem',    // 96px
    '3xl': '8rem',    // 128px
    '4xl': '12rem',   // 192px
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
