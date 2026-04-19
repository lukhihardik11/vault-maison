'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface BlurUpImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  style?: React.CSSProperties
  sizes?: string
}

export function BlurUpImage({ src, alt, fill, width, height, className, style, sizes }: BlurUpImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }} className={className}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={width}
        height={height}
        sizes={sizes}
        onLoad={() => setIsLoaded(true)}
        style={{
          objectFit: 'cover',
          filter: isLoaded ? 'blur(0)' : 'blur(20px)',
          transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
          transition: 'filter 0.5s ease-out, transform 0.5s ease-out',
        }}
      />
    </div>
  )
}
