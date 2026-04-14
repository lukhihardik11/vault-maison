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
}

export function ArtisanCard({ name, title, specialty, years, signature, image }: ArtisanCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      style={{
        background: A.surface,
        border: `1px solid ${A.border}`,
        borderRadius: 2,
        overflow: 'hidden',
        textAlign: 'center',
        padding: '32px 24px',
      }}
    >
      {/* Avatar */}
      <div style={{
        width: 96, height: 96, borderRadius: '50%',
        margin: '0 auto 20px',
        background: A.workshop,
        border: `2px solid ${hovered ? A.accent : A.border}`,
        transition: 'border-color 0.3s',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        {image ? (
          <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, color: A.accent }}>
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>

      {/* Name */}
      <div style={{
        fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500,
        color: A.ink, marginBottom: 4,
      }}>
        {name}
      </div>

      {/* Title */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
        letterSpacing: '0.1em', textTransform: 'uppercase',
        color: A.accent, marginBottom: 12,
      }}>
        {title}
      </div>

      {/* Specialty */}
      <p style={{
        fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft,
        lineHeight: 1.6, marginBottom: 16,
      }}>
        {specialty}
      </p>

      {/* Years */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: A.sketch,
        marginBottom: 16,
      }}>
        {years} years at the bench
      </div>

      {/* Signature */}
      {signature && (
        <div style={{
          fontFamily: 'Caveat, cursive', fontSize: 20, color: A.accent,
          opacity: 0.7,
        }}>
          {signature}
        </div>
      )}
    </motion.div>
  )
}
