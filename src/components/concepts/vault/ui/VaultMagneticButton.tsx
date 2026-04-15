'use client'

import React, { useRef, useState } from 'react'

interface VaultMagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  strength?: number
  style?: React.CSSProperties
}

export function VaultMagneticButton({
  children,
  onClick,
  href,
  strength = 0.3,
  style,
}: VaultMagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    setPos({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 })
  }

  const baseStyle: React.CSSProperties = {
    display: 'inline-block',
    transform: `translate(${pos.x}px, ${pos.y}px)`,
    transition: pos.x === 0 && pos.y === 0
      ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      : 'transform 0.15s ease-out',
    cursor: 'pointer',
    ...style,
  }

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={baseStyle}
    >
      {children}
    </div>
  )

  if (href) {
    return <a href={href} style={{ textDecoration: 'none' }}>{content}</a>
  }

  return content
}
