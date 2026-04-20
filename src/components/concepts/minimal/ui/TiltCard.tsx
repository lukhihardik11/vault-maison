'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useReducedMotionPreference } from '../animations/useResponsiveMotion'

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  maxTilt?: number
  lift?: number
}

export default function TiltCard({
  children,
  maxTilt = 15,
  lift = 20,
  style,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  className = '',
  ...rest
}: TiltCardProps) {
  const prefersReducedMotion = useReducedMotionPreference()
  const cardRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || prefersReducedMotion) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    // Center origin
    mouseX.set(x - rect.width / 2)
    mouseY.set(y - rect.height / 2)
    
    if (onPointerMove) onPointerMove(e as any)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(0)
    mouseY.set(0)
    if (onPointerLeave) onPointerLeave(e as any)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onPointerEnter) onPointerEnter(e as any)
  }

  // Calculate rotations based on mouse position relative to center
  // Mouse right (positive X) -> rotateY positive
  // Mouse down (positive Y) -> rotateX negative
  const rotateX = useTransform(mouseY, [-200, 200], [maxTilt, -maxTilt])
  const rotateY = useTransform(mouseX, [-200, 200], [-maxTilt, maxTilt])

  const springConfig = { stiffness: 300, damping: 30 }
  const springRotateX = useSpring(rotateX, springConfig)
  const springRotateY = useSpring(rotateY, springConfig)
  
  // Lift effect
  const zLift = useTransform(
    mouseX, 
    (v) => (v === 0 && mouseY.get() === 0 ? 0 : lift)
  )
  const springZ = useSpring(zLift, springConfig)

  if (prefersReducedMotion) {
    return (
      <div 
        ref={cardRef} 
        style={style} 
        className={className} 
        {...rest}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        z: springZ,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        ...style,
      }}
      className={className}
      {...(rest as any)}
    >
      <div style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d", height: "100%" }}>
        {children}
      </div>
    </motion.div>
  )
}
