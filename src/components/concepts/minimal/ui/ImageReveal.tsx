'use client'

import { useState, type CSSProperties } from 'react'
import BlurUpImage from './BlurUpImage'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface ImageRevealProps {
  src: string
  revealSrc?: string
  alt: string
  containerClassName?: string
  containerStyle?: CSSProperties
  imageStyle?: CSSProperties
}

export default function ImageReveal({
  src,
  revealSrc,
  alt,
  containerClassName,
  containerStyle,
  imageStyle,
}: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [isActive, setIsActive] = useState(false)

  const hasReveal = Boolean(revealSrc && revealSrc !== src)
  const transition = prefersReducedMotion ? 'none' : 'opacity 260ms ease, transform 260ms ease'

  return (
    <div
      className={containerClassName}
      onPointerEnter={() => setIsActive(true)}
      onPointerLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...containerStyle,
      }}
      tabIndex={hasReveal ? 0 : -1}
    >
      <BlurUpImage
        src={src}
        alt={alt}
        containerStyle={{ width: '100%', height: '100%', background: 'transparent' }}
        style={{
          ...imageStyle,
          opacity: hasReveal && isActive ? 0 : 1,
          transform: hasReveal && isActive ? 'scale(1.02)' : 'scale(1)',
          transition,
        }}
      />
      {hasReveal && (
        <BlurUpImage
          src={revealSrc!}
          alt={`${alt} alternate view`}
          containerStyle={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            background: 'transparent',
          }}
          style={{
            ...imageStyle,
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'scale(1)' : 'scale(1.02)',
            transition,
          }}
        />
      )}
    </div>
  )
}
