// Source: 21st.dev - ProductBounceCard
// Adapted: monochrome palette, sharp edges, reduced-motion safe

"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface ProductBounceCardProps {
  imageUrl: string;
  alt?: string;
  className?: string;
}

export const ProductBounceCard: React.FC<ProductBounceCardProps> = ({
  imageUrl,
  alt = "Product image",
  className,
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={`relative flex flex-col items-center justify-center ${className ?? ""}`}>
      {/* Product image */}
      <motion.img
        src={imageUrl}
        alt={alt}
        className="h-64 w-auto object-contain"
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, -20, 0],
                rotateY: [0, 10, -10, 0],
              }
        }
        transition={{
          duration: 1.7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
      />

      {/* Bottom shadow — sharp edges, monochrome */}
      <div className="absolute bottom-0 h-6 w-40 bg-[#050505]/15 blur-md" />
    </div>
  );
};
