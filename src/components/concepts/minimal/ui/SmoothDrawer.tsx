'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface SmoothDrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  side?: 'left' | 'right' | 'bottom'
}

export default function SmoothDrawer({ isOpen, onClose, title, children, side = 'right' }: SmoothDrawerProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const transforms = {
    left: { open: 'translateX(0)', closed: 'translateX(-100%)' },
    right: { open: 'translateX(0)', closed: 'translateX(100%)' },
    bottom: { open: 'translateY(0)', closed: 'translateY(100%)' },
  }

  const positions = {
    left: { top: 0, left: 0, bottom: 0, width: '380px', maxWidth: '90vw' },
    right: { top: 0, right: 0, bottom: 0, width: '380px', maxWidth: '90vw' },
    bottom: { left: 0, right: 0, bottom: 0, maxHeight: '80vh', borderRadius: 0 },
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'rgba(26,26,26,0.3)',
          backdropFilter: 'blur(8px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease',
        }}
      />
      {/* Drawer */}
      <div style={{
        position: 'fixed', zIndex: 200,
        ...positions[side] as any,
        background: 'rgba(250,250,248,0.92)',
        backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.3)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.12)',
        transform: isOpen ? transforms[side].open : transforms[side].closed,
        transition: 'transform 350ms cubic-bezier(0.25,0.46,0.45,0.94)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: '1px solid #E5E5E5', flexShrink: 0 }}>
          <span style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#050505' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={18} color="#9B9B9B" />
          </button>
        </div>
        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {children}
        </div>
      </div>
    </>
  )
}
