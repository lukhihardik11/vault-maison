'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { A } from '../AtelierLayout'

interface ArtisanCardProps {
  name: string
  title: string
  specialty: string
  years: number
  signature?: string
  image?: string
  quote?: string
  style?: React.CSSProperties
}

export function ArtisanCard({ name, title, specialty, years, signature, image, quote, style = {} }: ArtisanCardProps) {
  const [hovered, setHovered] = useState(false)
  const initials = name.split(' ').map(n => n[0]).join('')

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      style={{
        background: A.surface,
        border: `1px dashed ${hovered ? A.accent : A.sketch}`,
        borderRadius: 2,
        overflow: 'hidden',
        textAlign: 'center',
        boxShadow: hovered
          ? `0 16px 40px ${A.shadowMd}`
          : `inset 0 1px 2px ${A.shadow}`,
        transition: 'border-color 0.3s, box-shadow 0.4s',
        ...style,
      }}
    >
      {/* Portrait */}
      <div style={{
        position: 'relative',
        height: 280,
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${A.workshop}, ${A.bgAlt})`,
      }}>
        {image ? (
          <motion.div
            animate={{ scale: hovered ? 1.05 : 1 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 100, height: 100, borderRadius: '50%',
              background: A.workshop,
              border: `2px solid ${A.border}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Cormorant Garamond, serif', fontSize: 36, color: A.accent,
            }}>
              {initials}
            </div>
          </div>
        )}

        {/* Years badge */}
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          padding: '6px 14px',
          background: 'rgba(44,38,32,0.8)',
          backdropFilter: 'blur(8px)',
          borderRadius: 1,
          fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.06em',
          color: A.gold,
        }}>
          {years} Years
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '24px 20px 28px' }}>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500,
          color: A.ink, marginBottom: 4,
        }}>
          {name}
        </div>
        <div style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: A.accent, marginBottom: 8,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft,
          lineHeight: 1.6, marginBottom: 12,
        }}>
          {specialty}
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, transparent, ${A.border}, transparent)`,
          margin: '12px auto',
          maxWidth: 120,
        }} />

        {/* Quote */}
        {quote && (
          <div style={{
            fontFamily: 'Caveat, cursive', fontSize: 16, color: A.gold,
            lineHeight: 1.5, marginTop: 12,
            fontStyle: 'italic',
          }}>
            &ldquo;{quote}&rdquo;
          </div>
        )}

        {/* Signature */}
        {signature && (
          <div style={{
            fontFamily: 'Caveat, cursive', fontSize: 20, color: A.accent,
            marginTop: 12,
          }}>
            {signature}
          </div>
        )}
      </div>
    </motion.div>
  )
}
