'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '../animations/useResponsiveMotion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
}

export function MagneticButton({ children, strength = 40, className = '', onDrag, onDragStart, onDragEnd, onAnimationStart, ...props }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const prefersReduced = useReducedMotionPreference();

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReduced) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * (strength / 100), y: middleY * (strength / 100) });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`bg-[#050505] text-[#FFFFFF] h-12 md:h-14 px-8 text-[13px] uppercase tracking-[0.12em] font-medium hover:bg-[#1a1a1a] transition-colors duration-300 rounded-none inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
