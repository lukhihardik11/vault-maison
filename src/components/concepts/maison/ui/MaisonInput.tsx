'use client'
import React from 'react'
import { MS } from '../MaisonLayout'

interface MaisonInputProps {
  label?: string; placeholder?: string; type?: string; multiline?: boolean; rows?: number; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function MaisonInput({ label, placeholder, type = 'text', multiline, rows = 4, value, onChange }: MaisonInputProps) {
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem',
    color: MS.text, background: MS.card, border: `1px solid ${MS.border}`, borderRadius: 3, outline: 'none',
  }
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.06em', color: MS.textSecondary, marginBottom: 5 }}>{label}</label>}
      {multiline
        ? <textarea placeholder={placeholder} rows={rows} style={{ ...inputStyle, resize: 'vertical' }} value={value} onChange={onChange} />
        : <input type={type} placeholder={placeholder} style={inputStyle} value={value} onChange={onChange} />
      }
    </div>
  )
}
