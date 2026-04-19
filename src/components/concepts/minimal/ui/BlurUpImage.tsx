'use client'

import { useEffect, useState, type CSSProperties, type ImgHTMLAttributes } from 'react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

export interface BlurUpImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  src: string
  alt: string
  containerClassName?: string
  containerStyle?: CSSProperties
}

export default function BlurUpImage({
  src,
  alt,
  containerClassName,
  containerStyle,
  style,
  onLoad,
  ...rest
}: BlurUpImageProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [src])

  return (
    <div
      className={containerClassName}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#E5E5E5',
        ...containerStyle,
      }}
    >
      <img
        {...rest}
        src={src}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          opacity: loaded ? 1 : 0.82,
          filter: loaded ? 'blur(0px)' : 'blur(14px)',
          transform: loaded ? 'scale(1)' : 'scale(1.04)',
          transition: prefersReducedMotion
            ? 'none'
            : 'opacity 240ms ease, filter 320ms ease, transform 320ms ease',
          ...style,
        }}
      />
    </div>
  )
}
