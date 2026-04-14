'use client'
import React, { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { A } from '../AtelierLayout'

interface AtelierButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  href?: string
  disabled?: boolean
  fullWidth?: boolean
  style?: React.CSSProperties
}

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  rotation: number
}

export function AtelierButton({
  children, variant = 'primary', size = 'md', onClick, href,
  disabled = false, fullWidth = false, style = {}
}: AtelierButtonProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const [hovered, setHovered] = useState(false)
  const btnRef = useRef<HTMLDivElement>(null)
  const sparkleId = useRef(0)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = sparkleId.current++
    const newSparkle: Sparkle = { id, x, y, size: Math.random() * 8 + 4, rotation: Math.random() * 360 }
    setSparkles(prev => [...prev.slice(-6), newSparkle])
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 600)
  }, [])

  const sizes = {
    sm: { padding: '8px 20px', fontSize: 12 },
    md: { padding: '12px 28px', fontSize: 13 },
    lg: { padding: '16px 36px', fontSize: 14 },
  }

  const variants = {
    primary: {
      background: A.accent,
      color: '#FFF',
      border: 'none',
      hoverBg: '#A07A1A',
    },
    secondary: {
      background: 'transparent',
      color: A.accent,
      border: `1.5px solid ${A.accent}`,
      hoverBg: 'rgba(139,105,20,0.08)',
    },
    ghost: {
      background: 'transparent',
      color: A.textSoft,
      border: '1.5px solid transparent',
      hoverBg: 'rgba(139,105,20,0.05)',
    },
  }

  const v = variants[variant]
  const s = sizes[size]

  const inner = (
    <motion.div
      ref={btnRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setSparkles([]) }}
      onMouseMove={handleMouseMove}
      onClick={disabled ? undefined : onClick}
      whileTap={disabled ? {} : { scale: 0.97 }}
      style={{
        position: 'relative', overflow: 'hidden', cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: fullWidth ? '100%' : 'auto',
        padding: s.padding, fontSize: s.fontSize,
        fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
        letterSpacing: '0.08em', textTransform: 'uppercase' as const,
        background: hovered ? v.hoverBg : v.background,
        color: v.color, border: v.border || 'none',
        borderRadius: 2,
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.3s ease',
        ...style,
      }}
    >
      {/* Sparkle stars */}
      {sparkles.map(sp => (
        <motion.svg
          key={sp.id}
          initial={{ opacity: 1, scale: 0 }}
          animate={{ opacity: 0, scale: 1, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          width={sp.size} height={sp.size}
          viewBox="0 0 24 24"
          style={{
            position: 'absolute', left: sp.x - sp.size / 2, top: sp.y - sp.size / 2,
            pointerEvents: 'none', transform: `rotate(${sp.rotation}deg)`,
          }}
        >
          <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41Z"
            fill={variant === 'primary' ? 'rgba(255,255,255,0.8)' : A.gold} />
        </motion.svg>
      ))}

      {/* Chisel underline on hover */}
      <motion.div
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', bottom: 0, left: 0, height: 2,
          background: variant === 'primary' ? 'rgba(255,255,255,0.3)' : A.accent,
        }}
      />

      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.div>
  )

  if (href) {
    return <a href={href} style={{ textDecoration: 'none', display: fullWidth ? 'block' : 'inline-block' }}>{inner}</a>
  }
  return inner
}
