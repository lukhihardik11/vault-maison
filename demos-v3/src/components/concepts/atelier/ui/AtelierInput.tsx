'use client'
import React, { useState } from 'react'
import { A } from '../AtelierLayout'

interface AtelierInputProps {
  label?: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  multiline?: boolean
  rows?: number
  required?: boolean
  name?: string
}

export function AtelierInput({
  label, placeholder, type = 'text', value, onChange,
  multiline = false, rows = 4, required = false, name,
}: AtelierInputProps) {
  const [focused, setFocused] = useState(false)

  const sharedStyle: React.CSSProperties = {
    width: '100%', padding: '12px 0',
    fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.ink,
    background: 'transparent',
    border: 'none',
    borderBottom: `1.5px solid ${focused ? A.accent : A.border}`,
    outline: 'none',
    transition: 'border-color 0.3s',
    resize: 'none' as const,
  }

  return (
    <div style={{ marginBottom: 24 }}>
      {label && (
        <label style={{
          display: 'block', marginBottom: 6,
          fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: focused ? A.accent : A.textSoft,
          transition: 'color 0.3s',
        }}>
          {label}{required && <span style={{ color: A.accent }}> *</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={sharedStyle}
        />
      )}
    </div>
  )
}
