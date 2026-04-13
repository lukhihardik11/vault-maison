'use client'
import { useState } from 'react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface SwitchButtonProps {
  label?: string
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}

export default function SwitchButton({ label, defaultChecked = false, onChange }: SwitchButtonProps) {
  const [checked, setChecked] = useState(defaultChecked)

  const toggle = () => {
    const next = !checked
    setChecked(next)
    onChange?.(next)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button
        onClick={toggle}
        role="switch"
        aria-checked={checked}
        style={{
          width: '44px', height: '24px',
          borderRadius: '12px',
          background: checked ? '#C4A265' : '#E8E5E0',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 300ms ease',
          boxShadow: checked
            ? 'inset 2px 2px 4px rgba(0,0,0,0.1)'
            : '3px 3px 6px #d4d0cb, -3px -3px 6px #ffffff',
        }}
      >
        <span style={{
          position: 'absolute',
          top: '2px',
          left: checked ? '22px' : '2px',
          width: '20px', height: '20px',
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
          transition: 'left 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      </button>
      {label && <span style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#1A1A1A' }}>{label}</span>}
    </div>
  )
}
