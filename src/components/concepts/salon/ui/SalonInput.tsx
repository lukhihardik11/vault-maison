'use client'

import React, { useState } from 'react'
import { S } from '../SalonLayout'

interface SalonInputProps {
  label?: string
  placeholder?: string
  type?: string
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  textarea?: boolean
  rows?: number
  required?: boolean
  name?: string
}

export function SalonInput({ label, placeholder, type = 'text', value, defaultValue, onChange, textarea, rows = 4, required, name }: SalonInputProps) {
  const [focused, setFocused] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    fontFamily: "'Lora', serif",
    fontSize: '0.9rem',
    color: S.text,
    background: S.surface,
    border: `1.5px solid ${focused ? S.accent : S.border}`,
    borderRadius: S.radiusSm,
    outline: 'none',
    transition: 'all 0.3s',
    boxShadow: focused ? `0 0 0 3px ${S.accentSoft}` : 'none',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <label style={{
          display: 'block',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.65rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: S.textSecondary,
          marginBottom: 8,
        }}>
          {label} {required && <span style={{ color: S.accent }}>*</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          rows={rows}
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...inputStyle, resize: 'vertical', minHeight: rows * 24 }}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          name={name}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      )}
    </div>
  )
}
