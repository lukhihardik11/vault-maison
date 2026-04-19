import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const MagneticButton = ({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReducedMotion = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex items-center justify-center bg-[#050505] text-[#FFFFFF] border border-[#050505] uppercase tracking-[0.12em] font-medium text-[13px] px-8 h-12 md:h-14 transition-colors duration-300 hover:bg-[#FFFFFF] hover:text-[#050505] rounded-none cursor-pointer ${className}`}
    >
      {children}
    </motion.button>
  );
};
