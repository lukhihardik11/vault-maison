import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const MarqueeText = ({ children, speed = 20 }: { children: React.ReactNode; speed?: number }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="w-full overflow-hidden bg-[#050505] text-[#FFFFFF] py-4 border-y border-[#333333]">
        <div className="whitespace-nowrap px-4 font-mono text-[11px] uppercase tracking-[0.2em]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden bg-[#050505] text-[#FFFFFF] py-4 border-y border-[#333333] flex">
      <motion.div
        className="whitespace-nowrap flex pr-8 font-mono text-[11px] uppercase tracking-[0.2em]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        <span className="px-8">{children}</span>
        <span className="px-8">{children}</span>
        <span className="px-8">{children}</span>
        <span className="px-8">{children}</span>
      </motion.div>
    </div>
  );
};
