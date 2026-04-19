import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const GlitchText = ({ children, as: Component = 'span', className = '', ...props }: any) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <Component className={className} {...props}>{children}</Component>;
  }

  return (
    <Component className={`relative inline-block group cursor-default ${className}`} {...props}>
      <motion.span
        className="relative z-10 block group-hover:opacity-0 transition-opacity duration-150"
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 z-0 text-[#E5E5E5] opacity-0 group-hover:opacity-100 mix-blend-difference"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
        animate={{ x: [-2, 2, -2], y: [1, -1, 1] }}
        transition={{ repeat: Infinity, duration: 0.2, ease: 'linear' }}
      >
        {children}
      </motion.span>
      <motion.span
        className="absolute top-0 left-0 z-0 text-[#6B6B6B] opacity-0 group-hover:opacity-100 mix-blend-difference"
        style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
        animate={{ x: [2, -2, 2], y: [-1, 1, -1] }}
        transition={{ repeat: Infinity, duration: 0.25, ease: 'linear' }}
      >
        {children}
      </motion.span>
    </Component>
  );
};
