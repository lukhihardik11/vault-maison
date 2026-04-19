import React, { useEffect, useState } from 'react';

export const StickyNavBlur = ({ children }: { children?: React.ReactNode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-[#E5E5E5]'
          : 'bg-white/98 border-b border-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-[clamp(24px,3vw,64px)] h-full flex items-center justify-between">
        {children}
      </div>
    </nav>
  );
};
