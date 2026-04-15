'use client'
import React from 'react'
import { OB } from '../ObservatoryLayout'

interface ObservatoryInputProps {
  label?: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  multiline?: boolean
  rows?: number
  style?: React.CSSProperties
}

export function ObservatoryInput({ label, placeholder, type = 'text', value, onChange, multiline = false, rows = 4, style = {} }: ObservatoryInputProps) {
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px',
    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem',
    color: OB.text, background: OB.surface,
    border: `1px solid ${OB.border}`, outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{ marginBottom: 20, ...style }}>
      {label && (
        <label style={{ display: 'block', fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: OB.textSecondary, marginBottom: 8 }}>
          {label}
        </label>
      )}
      {multiline ? (
        <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows} style={{ ...inputStyle, resize: 'vertical' }} />
      ) : (
        <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={inputStyle} />
      )}
    </div>
  )
}
