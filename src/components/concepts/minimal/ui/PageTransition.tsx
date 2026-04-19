import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? undefined : { opacity: 0.01, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0.01, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full h-full bg-[#FFFFFF] text-[#050505]"
    >
      {children}
    </motion.div>
  );
};
