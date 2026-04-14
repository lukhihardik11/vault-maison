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
  materials?: string
  style?: React.CSSProperties
}

export function AtelierCard({ title, subtitle, price, image, href, badge, artisan, materials, style = {} }: AtelierCardProps) {
  const [hovered, setHovered] = useState(false)

  const card = (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: A.surface,
        border: `1px ${hovered ? 'solid' : 'dashed'} ${hovered ? A.accent : A.sketch}`,
        borderRadius: 2,
        overflow: 'hidden',
        cursor: href ? 'pointer' : 'default',
        boxShadow: hovered
          ? `0 16px 40px ${A.shadowMd}, inset 0 1px 2px ${A.shadow}`
          : `inset 0 1px 2px ${A.shadow}`,
        transition: 'border-color 0.3s, box-shadow 0.4s',
        ...style,
      }}
    >
      {/* Image */}
      <div style={{
        position: 'relative', paddingTop: '120%', overflow: 'hidden',
        background: `linear-gradient(135deg, ${A.workshop}, ${A.bgAlt})`,
      }}>
        {image && (
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
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
            flexDirection: 'column', gap: 8,
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={A.sketch} strokeWidth="0.8">
              <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
            </svg>
            <span style={{ fontFamily: 'Caveat, cursive', fontSize: 13, color: A.sketch }}>Sketch pending</span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            padding: '5px 12px',
            fontFamily: 'Caveat, cursive', fontSize: 14, fontWeight: 500,
            color: A.accent,
            background: 'rgba(254,252,248,0.92)',
            backdropFilter: 'blur(8px)',
            borderRadius: 1,
            border: `1px dashed ${A.sketch}`,
          }}>
            {badge}
          </div>
        )}

        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(44,38,32,0.5) 0%, rgba(44,38,32,0.1) 40%, transparent 70%)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 20,
          }}
        >
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: '#FFF', padding: '10px 20px',
            border: '1px solid rgba(255,255,255,0.6)',
            backdropFilter: 'blur(4px)',
            background: 'rgba(255,255,255,0.08)',
          }}>
            View Piece
          </span>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: '18px 18px 22px' }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 19, fontWeight: 500,
          color: A.ink, marginBottom: 4, lineHeight: 1.3,
        }}>
          {title}
        </div>
        {subtitle && (
          <div style={{
            fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft,
            marginBottom: 6, lineHeight: 1.5,
          }}>
            {subtitle}
          </div>
        )}
        {materials && (
          <div style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.sketch,
            letterSpacing: '0.04em', marginBottom: 8,
          }}>
            {materials}
          </div>
        )}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, ${A.border}, transparent)`,
          margin: '8px 0 10px',
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {price && (
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 600,
              color: A.accent,
            }}>
              {price}
            </span>
          )}
          {artisan && (
            <span style={{
              fontFamily: 'Caveat, cursive', fontSize: 14, color: A.gold,
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
