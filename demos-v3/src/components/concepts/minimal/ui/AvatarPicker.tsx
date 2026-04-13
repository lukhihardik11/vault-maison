'use client'
import { useState } from 'react'
import { User } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const avatarColors = ['#C4A265', '#9B9590', '#1A1A1A', '#7B6F4E', '#A08B6C', '#5C5147']

interface AvatarPickerProps {
  initials?: string
  onSelect?: (color: string) => void
}

export default function AvatarPicker({ initials = 'VM', onSelect }: AvatarPickerProps) {
  const [selected, setSelected] = useState(avatarColors[0])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      {/* Avatar preview */}
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        backgroundColor: selected,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '6px 6px 12px #d4d0cb, -6px -6px 12px #ffffff',
        transition: 'background-color 300ms ease',
      }}>
        <span style={{ fontFamily: font, fontSize: '24px', fontWeight: 300, color: '#FFFFFF', letterSpacing: '0.1em' }}>{initials}</span>
      </div>
      {/* Color picker */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {avatarColors.map(color => (
          <button
            key={color}
            onClick={() => { setSelected(color); onSelect?.(color) }}
            style={{
              width: '28px', height: '28px', borderRadius: '50%',
              backgroundColor: color,
              border: selected === color ? '2px solid #C4A265' : '2px solid transparent',
              outline: selected === color ? '2px solid #FAFAF8' : 'none',
              cursor: 'pointer',
              transition: 'all 300ms ease',
              transform: selected === color ? 'scale(1.15)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
