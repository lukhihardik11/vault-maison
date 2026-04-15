'use client'
import React from 'react'
import { TH } from '../TheaterLayout'

interface ProgramCardProps {
  icon: React.ReactNode; title: string; description: string; number?: string
}

export function ProgramCard({ icon, title, description, number }: ProgramCardProps) {
  return (
    <div className="theater-card-hover" style={{
      background: TH.card, border: `1px solid ${TH.border}`, padding: 28,
      position: 'relative', overflow: 'hidden',
    }}>
      {number && (
        <div style={{
          position: 'absolute', top: -8, right: 8,
          fontFamily: "'Playfair Display', serif", fontSize: '4rem', fontWeight: 300,
          color: `${TH.accent}10`, lineHeight: 1,
        }}>
          {number}
        </div>
      )}
      <div style={{ color: TH.gold, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 500, color: TH.text, margin: '0 0 8px' }}>{title}</h3>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, lineHeight: 1.7, margin: 0 }}>{description}</p>
    </div>
  )
}
