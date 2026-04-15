'use client'

import React from 'react'
import { G } from '../GalleryLayout'

interface MuseumCaptionProps {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
  color?: string
}

export function MuseumCaption({ children, align = 'left', color }: MuseumCaptionProps) {
  return (
    <p style={{
      fontFamily: 'Inter, sans-serif',
      fontSize: '0.6rem',
      fontWeight: 400,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      color: color || G.accent,
      textAlign: align,
      margin: 0,
      lineHeight: 1.8,
    }}>
      {children}
    </p>
  )
}
