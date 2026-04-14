'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { A } from '../AtelierLayout'

interface AtelierCardProps {
  title: string
  subtitle?: string
  price?: string
  image?: string
  href?: string
  badge?: string
  artisan?: string
  style?: React.CSSProperties
}

export function AtelierCard({ title, subtitle, price, image, href, badge, artisan, style = {} }: AtelierCardProps) {
  const [hovered, setHovered] = useState(false)

  const card = (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      style={{
        background: A.surface,
        border: `1px solid ${hovered ? A.accent : A.border}`,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: href ? 'pointer' : 'default',
        transition: 'border-color 0.3s',
        ...style,
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative', paddingTop: '120%', overflow: 'hidden',
        background: A.workshop,
      }}>
        {image && (
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
        )}
        {!image && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={A.sketch} strokeWidth="1">
              <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
            </svg>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            padding: '4px 10px',
            fontFamily: 'Caveat, cursive', fontSize: 13, fontWeight: 500,
            color: A.accent, background: 'rgba(254,252,248,0.9)',
            borderRadius: 1,
          }}>
            {badge}
          </div>
        )}

        {/* Sketch overlay on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(44,38,32,0.4) 0%, transparent 50%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 16,
          }}
        >
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#FFF', padding: '8px 16px',
            border: '1px solid rgba(255,255,255,0.5)',
          }}>
            View Piece
          </span>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: '16px 16px 20px' }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 18, fontWeight: 500,
          color: A.ink, marginBottom: 4, lineHeight: 1.3,
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft,
            marginBottom: 8,
          }}>
            {subtitle}
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {price && (
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500,
              color: A.accent,
            }}>
              {price}
            </span>
          )}
          {artisan && (
            <span style={{
              fontFamily: 'Caveat, cursive', fontSize: 13, color: A.sketch,
            }}>
              by {artisan}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )

  if (href) {
    return <Link href={href} style={{ textDecoration: 'none', display: 'block' }}>{card}</Link>
  }
  return card
}
