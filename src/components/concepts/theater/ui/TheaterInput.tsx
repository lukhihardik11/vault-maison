'use client'
import React from 'react'
import { TH } from '../TheaterLayout'

interface TheaterInputProps {
  label?: string; placeholder?: string; type?: string; multiline?: boolean; rows?: number; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function TheaterInput({ label, placeholder, type = 'text', multiline, rows = 4, value, onChange }: TheaterInputProps) {
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem',
    color: TH.text, background: TH.card, border: `1px solid ${TH.border}`,
    outline: 'none', transition: 'border-color 0.3s',
  }
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ display: 'block', fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TH.gold, marginBottom: 6 }}>{label}</label>}
      {multiline
        ? <textarea placeholder={placeholder} rows={rows} style={{ ...inputStyle, resize: 'vertical' }} value={value} onChange={onChange} />
        : <input type={type} placeholder={placeholder} style={inputStyle} value={value} onChange={onChange} />
      }
    </div>
  )
}
