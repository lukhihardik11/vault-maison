'use client'

import {
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from 'react'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface TiltCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  children: ReactNode
  maxTilt?: number
  lift?: number
}

export default function TiltCard({
  children,
  maxTilt = 3,
  lift = 2,
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  ...rest
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const frameRef = useRef<number | null>(null)
  const [isActive, setIsActive] = useState(false)
  const [transform, setTransform] = useState('perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)')

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
    }
  }, [])

  const updateTransform = (value: string) => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current)
    }
    frameRef.current = window.requestAnimationFrame(() => {
      setTransform(value)
    })
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(event)
    if (prefersReducedMotion) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    const rotateY = (x - 0.5) * maxTilt * 2
    const rotateX = (0.5 - y) * maxTilt * 2

    updateTransform(
      `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-${lift}px)`
    )
  }

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    onPointerEnter?.(event)
    setIsActive(true)
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(event)
    setIsActive(false)
    updateTransform('perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)')
  }

  return (
    <div
      {...rest}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      style={{
        transform: prefersReducedMotion ? 'none' : transform,
        transformStyle: 'preserve-3d',
        transition: prefersReducedMotion
          ? 'none'
          : 'transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 220ms ease',
        boxShadow: prefersReducedMotion
          ? 'none'
          : isActive
            ? '0 12px 28px -24px #9B9B9B'
            : '0 0 0 0 #FFFFFF',
        willChange: prefersReducedMotion ? 'auto' : 'transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
