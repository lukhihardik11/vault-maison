'use client'
import React from 'react'
import { AR } from '../ArchiveLayout'

interface ArchiveInputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  type?: string
  textarea?: boolean
  rows?: number
  style?: React.CSSProperties
}

export function ArchiveInput({ label, placeholder, value, onChange, type = 'text', textarea, rows = 4, style = {} }: ArchiveInputProps) {
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    fontFamily: "'Crimson Text', serif",
    fontSize: '1rem',
    color: AR.text,
    background: AR.surface,
    border: `1px solid ${AR.border}`,
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  return (
    <div style={style}>
      {label && (
        <label style={{
          display: 'block', marginBottom: 8,
          fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
          letterSpacing: '0.12em', textTransform: 'uppercase', color: AR.textSecondary,
        }}>
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          rows={rows}
          style={{ ...inputStyle, resize: 'vertical' }}
          onFocus={(e) => { e.currentTarget.style.borderColor = AR.accent; e.currentTarget.style.boxShadow = `0 0 0 1px ${AR.accent}44` }}
          onBlur={(e) => { e.currentTarget.style.borderColor = AR.border; e.currentTarget.style.boxShadow = 'none' }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.borderColor = AR.accent; e.currentTarget.style.boxShadow = `0 0 0 1px ${AR.accent}44` }}
          onBlur={(e) => { e.currentTarget.style.borderColor = AR.border; e.currentTarget.style.boxShadow = 'none' }}
        />
      )}
    </div>
  )
}
