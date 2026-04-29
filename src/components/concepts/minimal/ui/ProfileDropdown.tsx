'use client'
import { useState, useRef, useEffect } from 'react'
import { User, Heart, ShoppingBag, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

const font = "'Inter', 'Helvetica Neue', sans-serif"

const menuItems = [
  { icon: User, label: 'My Account', href: '/minimal/account' },
  { icon: ShoppingBag, label: 'Orders', href: '/minimal/account' },
  { icon: Heart, label: 'Wishlist', href: '/minimal/wishlist' },
  { icon: Settings, label: 'Settings', href: '/minimal/account' },
]

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#050505', opacity: 0.6, transition: 'opacity 300ms ease' }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.opacity = '0.6' }}
      >
        <User size={18} strokeWidth={1.5} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: '12px',
          width: '220px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.4)',
          borderRadius: 0,
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          animation: 'dropdownIn 0.2s ease',
          zIndex: 100,
        }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E5E5E5' }}>
            <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#050505' }}>Welcome</p>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 400, color: '#9B9B9B' }}>guest@vaultmaison.com</p>
          </div>
          {menuItems.map(item => (
            <Link key={item.label} href={item.href} onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 20px',
              fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#050505',
              textDecoration: 'none', transition: 'background 200ms',
            }}>
              <item.icon size={15} strokeWidth={1.5} color="#9B9B9B" />
              {item.label}
            </Link>
          ))}
          <div style={{ borderTop: '1px solid #E5E5E5' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 20px', width: '100%', fontFamily: font, fontSize: '12px', fontWeight: 400, color: '#9B9B9B', background: 'none', border: 'none', cursor: 'pointer' }}>
              <LogOut size={15} strokeWidth={1.5} /> Sign Out
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes dropdownIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  )
}
