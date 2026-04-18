'use client'

import * as React from 'react'
import { motion } from 'framer-motion'

interface ProductBounceCardProps {
  imageUrl: string
  alt?: string
  className?: string
}

export const ProductBounceCard: React.FC<ProductBounceCardProps> = ({
  imageUrl,
  alt = 'Product image',
  className = '',
}) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <motion.img
        src={imageUrl}
        alt={alt}
        style={{
          height: '320px',
          width: 'auto',
          objectFit: 'contain',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -8, 0],
          rotateY: [0, 4, -4, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Shadow that scales with bounce */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-4px',
          height: '12px',
          width: '120px',
          borderRadius: 0,
          background: 'rgba(196, 162, 101, 0.15)',
          filter: 'blur(8px)',
        }}
        animate={{
          scaleX: [1, 0.85, 1],
          opacity: [0.4, 0.25, 0.4],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

export default ProductBounceCard
