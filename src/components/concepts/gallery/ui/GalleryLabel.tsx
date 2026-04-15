'use client'

import React from 'react'
import { G } from '../GalleryLayout'

interface GalleryLabelProps {
  title: string
  material?: string
  specs?: string
  edition?: string
  price?: string
  year?: string
  align?: 'left' | 'center' | 'right'
}

export function GalleryLabel({ title, material, specs, edition, price, year, align = 'left' }: GalleryLabelProps) {
  const textAlign = align
  return (
    <div style={{ textAlign }}>
      <h3 style={{
        fontFamily: "'Libre Baskerville', 'Playfair Display', serif",
        fontSize: 'clamp(1rem, 2vw, 1.3rem)',
        fontWeight: 400,
        color: G.text,
        margin: '0 0 8px',
        lineHeight: 1.3,
      }}>
        {title}
      </h3>
      {material && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 300,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: G.textSecondary,
          margin: '0 0 4px',
          lineHeight: 1.8,
        }}>
          {material}
        </p>
      )}
      {specs && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 300,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: G.caption,
          margin: '0 0 4px',
        }}>
          {specs}
        </p>
      )}
      {(year || edition) && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 300,
          letterSpacing: '0.15em',
          color: G.caption,
          margin: '0 0 10px',
        }}>
          {year && `${year}`}{year && edition && ' — '}{edition && `${edition}`}
        </p>
      )}
      {price && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 400,
          color: G.text,
          margin: 0,
        }}>
          {price}
        </p>
      )}
    </div>
  )
}
