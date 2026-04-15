'use client'
import React from 'react'
import { MS } from '../MaisonLayout'

interface ProcessStepProps {
  number: string; title: string; description: string
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
      <div style={{
        minWidth: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: `${MS.accent}12`, border: `1px solid ${MS.accent}25`,
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', fontWeight: 700, color: MS.accent }}>{number}</span>
      </div>
      <div>
        <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: MS.text, margin: '0 0 4px' }}>{title}</h4>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MS.textSecondary, lineHeight: 1.7, margin: 0 }}>{description}</p>
      </div>
    </div>
  )
}
