'use client'
import React from 'react'
import { MK } from '../MarketplaceLayout'

interface MarketplaceInputProps {
  label?: string; placeholder?: string; type?: string; multiline?: boolean; rows?: number; value?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function MarketplaceInput({ label, placeholder, type = 'text', multiline, rows = 4, value, onChange }: MarketplaceInputProps) {
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem',
    color: MK.text, background: MK.surface, border: `1px solid ${MK.border}`, borderRadius: 3, outline: 'none',
  }
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MK.textSecondary, marginBottom: 5 }}>{label}</label>}
      {multiline
        ? <textarea placeholder={placeholder} rows={rows} style={{ ...inputStyle, resize: 'vertical' }} value={value} onChange={onChange} />
        : <input type={type} placeholder={placeholder} style={inputStyle} value={value} onChange={onChange} />
      }
    </div>
  )
}
