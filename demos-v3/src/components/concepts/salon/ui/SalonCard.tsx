'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { S } from '../SalonLayout'

interface SalonCardProps {
  name: string
  subtitle?: string
  price: string
  image: string
  href: string
  advisorNote?: string
  advisorName?: string
  isNew?: boolean
}

export function SalonCard({ name, subtitle, price, image, href, advisorNote, advisorName, isNew }: SalonCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    card.style.setProperty('--mouse-x', `${x}%`)
    card.style.setProperty('--mouse-y', `${y}%`)
  }

  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="salon-product-card"
        style={{
          background: S.surface,
          borderRadius: S.radius,
          overflow: 'hidden',
          border: `1px solid ${S.border}`,
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative',
        }}
      >
        {/* Image */}
        <div style={{ aspectRatio: '4/5', overflow: 'hidden', position: 'relative', background: S.warmPanel }}>
          <img src={image} alt={name}
            className="salon-card-img"
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            }} />
          {/* Warm glow overlay */}
          <div className="salon-card-glow" style={{
            position: 'absolute', inset: 0, opacity: 0,
            background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(184,134,11,0.12) 0%, transparent 60%)',
            transition: 'opacity 0.3s', pointerEvents: 'none',
          }} />
          {/* New badge */}
          {isNew && (
            <span style={{
              position: 'absolute', top: 12, left: 12,
              fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              background: S.accent, color: '#fff',
              padding: '4px 10px', borderRadius: 20,
            }}>
              New
            </span>
          )}
          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
            style={{
              position: 'absolute', top: 12, right: 12,
              background: 'rgba(255,255,255,0.85)', border: 'none',
              borderRadius: '50%', width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.3s',
              opacity: 0,
            }}
            className="salon-card-wishlist"
          >
            <Heart size={15} color={S.accent} />
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: '16px 18px 20px' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem',
            fontWeight: 400, color: S.text, margin: '0 0 4px', lineHeight: 1.3,
          }}>
            {name}
          </p>
          {subtitle && (
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', color: S.textSecondary, margin: '0 0 8px' }}>
              {subtitle}
            </p>
          )}
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 500, color: S.text, margin: 0 }}>
            {price}
          </p>
        </div>

        {/* Advisor note on hover */}
        {advisorNote && (
          <div className="salon-card-advisor-note" style={{
            padding: '0 18px 16px', opacity: 0, maxHeight: 0,
            overflow: 'hidden', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}>
            <div style={{
              background: S.warmPanel, borderRadius: S.radiusSm, padding: '10px 14px',
              borderLeft: `3px solid ${S.accent}`,
            }}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: '0.75rem', fontStyle: 'italic', color: S.textSecondary, margin: 0, lineHeight: 1.5 }}>
                &ldquo;{advisorNote}&rdquo;
              </p>
              {advisorName && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: S.accent, margin: '4px 0 0', fontWeight: 500 }}>
                  — {advisorName}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .salon-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px ${S.shadow};
          border-color: ${S.accent}30;
        }
        .salon-product-card:hover .salon-card-img { transform: scale(1.04); }
        .salon-product-card:hover .salon-card-glow { opacity: 1 !important; }
        .salon-product-card:hover .salon-card-wishlist { opacity: 1 !important; }
        .salon-product-card:hover .salon-card-advisor-note { opacity: 1 !important; max-height: 100px !important; }
        .salon-product-card:active { transform: translateY(-2px) scale(0.99); }
      `}</style>
    </Link>
  )
}
