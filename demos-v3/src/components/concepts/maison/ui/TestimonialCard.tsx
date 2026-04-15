'use client'
import React from 'react'
import { MS } from '../MaisonLayout'
import { Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string; author: string; role?: string; rating?: number
}

export function TestimonialCard({ quote, author, role, rating = 5 }: TestimonialCardProps) {
  return (
    <div style={{ background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, padding: 28 }}>
      <div style={{ display: 'flex', gap: 2, marginBottom: 14 }}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={12} fill={MS.accent} color={MS.accent} />
        ))}
      </div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontStyle: 'italic', color: MS.text, lineHeight: 1.7, margin: '0 0 16px' }}>
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 600, color: MS.text }}>{author}</div>
        {role && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MS.textSecondary }}>{role}</div>}
      </div>
    </div>
  )
}
