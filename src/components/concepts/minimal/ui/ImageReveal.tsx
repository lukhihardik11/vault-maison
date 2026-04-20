'use client'

import { useState, useRef, useEffect, useCallback, type CSSProperties } from 'react'
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
  containerClassName = '',
  containerStyle,
  imageStyle,
}: ImageRevealProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null)
  const [lerpedPos, setLerpedPos] = useState<{ x: number; y: number } | null>(null)
  const [hovered, setHovered] = useState(false)
  const [radius, setRadius] = useState(0)
  const [targetRadius, setTargetRadius] = useState(0)
  
  // Constants for mask
  const MAX_RADIUS = 150
  const MIN_RADIUS = 0
  const SOFT_EDGE = 40
  const LERP_SPEED = 0.18
  const RADIUS_LERP_SPEED = 0.13

  const hasReveal = Boolean(revealSrc && revealSrc !== src)

  useEffect(() => {
    if (prefersReducedMotion || !hasReveal || !hovered || !mousePos) {
      if (!hovered) setLerpedPos(null)
      return
    }
    let frame: number
    const animate = () => {
      setLerpedPos((prev) => {
        if (!prev) return mousePos
        const dx = mousePos.x - prev.x
        const dy = mousePos.y - prev.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 0.5) return mousePos
        return {
          x: prev.x + dx * LERP_SPEED,
          y: prev.y + dy * LERP_SPEED,
        }
      })
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [mousePos, hovered, hasReveal, prefersReducedMotion])

  useEffect(() => {
    setTargetRadius(hovered ? MAX_RADIUS : MIN_RADIUS)
  }, [hovered])

  useEffect(() => {
    if (prefersReducedMotion) return
    let frame: number
    const animateRadius = () => {
      setRadius((prev) => {
        if (Math.abs(prev - targetRadius) < 1) return targetRadius
        return prev + (targetRadius - prev) * RADIUS_LERP_SPEED
      })
      frame = requestAnimationFrame(animateRadius)
    }
    frame = requestAnimationFrame(animateRadius)
    return () => cancelAnimationFrame(frame)
  }, [targetRadius, prefersReducedMotion])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePos({ x, y })
    }
  }, [prefersReducedMotion])

  const handleMouseEnter = () => setHovered(true)
  const handleMouseLeave = () => {
    setHovered(false)
    setMousePos(null)
  }

  // Fallback for reduced motion
  if (prefersReducedMotion) {
    return (
      <div
        className={containerClassName}
        onPointerEnter={handleMouseEnter}
        onPointerLeave={handleMouseLeave}
        style={{ position: 'relative', overflow: 'hidden', ...containerStyle }}
      >
        <BlurUpImage
          src={src}
          alt={alt}
          containerStyle={{ width: '100%', height: '100%', background: 'transparent' }}
          style={{ ...imageStyle, opacity: hasReveal && hovered ? 0 : 1 }}
        />
        {hasReveal && (
          <BlurUpImage
            src={revealSrc!}
            alt={`${alt} alternate view`}
            containerStyle={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: 'transparent' }}
            style={{ ...imageStyle, opacity: hovered ? 1 : 0 }}
          />
        )}
      </div>
    )
  }

  const maskImage = lerpedPos && radius > 0
    ? `radial-gradient(circle ${radius}px at ${lerpedPos.x}px ${lerpedPos.y}px, black ${radius - SOFT_EDGE}px, rgba(0,0,0,0.5) ${radius - SOFT_EDGE/2}px, transparent ${radius}px)`
    : "none"

  return (
    <div
      ref={containerRef}
      className={containerClassName}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        style={{ ...imageStyle }}
      />
      
      {hasReveal && (
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
            transition: radius === 0 ? "WebkitMaskImage 0.3s, maskImage 0.3s" : "none",
          }}
        >
          <BlurUpImage
            src={revealSrc!}
            alt={`${alt} alternate view`}
            containerStyle={{ width: '100%', height: '100%', background: 'transparent' }}
            style={{ ...imageStyle }}
          />
        </div>
      )}
    </div>
  )
}
