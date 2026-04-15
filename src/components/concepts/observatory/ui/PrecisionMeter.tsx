'use client'
import React, { useState, useEffect } from 'react'
import { OB } from '../ObservatoryLayout'

interface PrecisionMeterProps {
  label: string
  value: number
  max?: number
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  style?: React.CSSProperties
}

export function PrecisionMeter({ label, value, max = 100, unit = '', size = 'md', style = {} }: PrecisionMeterProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  const sizeMap = { sm: 80, md: 120, lg: 160 }
  const dim = sizeMap[size]
  const strokeWidth = size === 'sm' ? 3 : 4
  const radius = (dim - strokeWidth * 2) / 2
  const circumference = 2 * Math.PI * radius
  const percent = (animatedValue / max) * 100

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 300)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div style={{ textAlign: 'center', ...style }}>
      <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle cx={dim/2} cy={dim/2} r={radius} fill="none" stroke={OB.border} strokeWidth={strokeWidth} />
        {/* Value arc */}
        <circle cx={dim/2} cy={dim/2} r={radius} fill="none" stroke={OB.accent} strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.5s ease', filter: `drop-shadow(0 0 6px ${OB.glow})` }}
        />
      </svg>
      <div style={{ marginTop: -dim/2 - 16, position: 'relative', zIndex: 1, paddingBottom: dim/2 - 16 }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: size === 'lg' ? '1.8rem' : '1.2rem', fontWeight: 600, color: OB.text }}>
          {animatedValue}{unit}
        </div>
      </div>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.textSecondary, marginTop: 4 }}>
        {label}
      </div>
    </div>
  )
}
