'use client'

import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { G } from '../GalleryLayout'

interface PedestalCardProps {
  name: string
  price: string
  image: string
  material?: string
  edition?: string
  href: string
  isNew?: boolean
  category?: string
}

export function PedestalCard({ name, price, image, material, edition, href, isNew, category }: PedestalCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        ref={cardRef}
        className="gallery-pedestal-card"
        onMouseMove={handleMouseMove}
        style={{
          background: G.surface,
          border: `1px solid ${G.border}`,
          padding: 24,
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Mouse-tracking bronze shine */}
        <div
          className="gallery-card-shine"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(139,115,85,0.06), transparent 60%)`,
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Image pedestal */}
        <div style={{
          aspectRatio: '4/5',
          overflow: 'hidden',
          marginBottom: 20,
          background: '#F8F6F2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <img
            src={image}
            alt={name}
            style={{
              width: '85%',
              height: '85%',
              objectFit: 'contain',
              transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="gallery-pedestal-img"
          />
        </div>

        {/* New badge */}
        {isNew && (
          <span style={{
            position: 'absolute', top: 24, left: 24,
            fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: G.accent, background: 'rgba(139,115,85,0.08)',
            padding: '4px 10px',
          }}>
            New Exhibition
          </span>
        )}

        {/* Gallery label */}
        <div style={{ position: 'relative' }}>
          {category && (
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', fontWeight: 400,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: G.caption, margin: '0 0 6px',
            }}>
              {category}
            </p>
          )}
          <h3 style={{
            fontFamily: "'Libre Baskerville', 'Playfair Display', serif",
            fontSize: '0.95rem', fontWeight: 400,
            color: G.text, margin: '0 0 6px', lineHeight: 1.4,
          }}>
            {name}
          </h3>
          {material && (
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 300,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: G.textSecondary, margin: '0 0 4px',
            }}>
              {material}
            </p>
          )}
          {edition && (
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', fontWeight: 300,
              letterSpacing: '0.15em', color: G.caption, margin: '0 0 8px',
            }}>
              {edition}
            </p>
          )}
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 400,
            color: G.text, margin: 0,
          }}>
            {price}
          </p>
        </div>
      </div>

      <style>{`
        .gallery-pedestal-card:hover {
          box-shadow: 0 8px 40px rgba(26, 24, 22, 0.08);
          border-color: rgba(139, 115, 85, 0.2) !important;
          transform: translateY(-2px);
        }
        .gallery-pedestal-card:hover .gallery-card-shine {
          opacity: 1 !important;
        }
        .gallery-pedestal-card:hover .gallery-pedestal-img {
          transform: scale(1.04);
        }
        .gallery-pedestal-card:active {
          transform: scale(0.99);
        }
      `}</style>
    </Link>
  )
}
