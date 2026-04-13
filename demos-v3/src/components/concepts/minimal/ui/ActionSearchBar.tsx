'use client'
import { useState, useRef, useEffect } from 'react'
import { Search, X, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { products } from '@/data/products'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

interface ActionSearchBarProps {
  isOpen: boolean
  onClose: () => void
}

export default function ActionSearchBar({ isOpen, onClose }: ActionSearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const results = query.length > 1
    ? products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : []

  const popular = ['Diamond Rings', 'Gold Necklaces', 'Earrings', 'Bracelets']

  if (!isOpen) return null

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', flexDirection: 'column' }}>
      {/* Glassmorphism backdrop */}
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }} />
      {/* Search panel */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', width: '90%', margin: '120px auto 0', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '20px', padding: '32px', boxShadow: '0 24px 80px rgba(0,0,0,0.15)', animation: 'searchSlideIn 0.3s ease' }}>
        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #E8E5E0', paddingBottom: '16px', marginBottom: '24px' }}>
          <Search size={20} color="#C4A265" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search diamonds, rings, necklaces..."
            style={{ flex: 1, fontFamily: font, fontSize: '18px', fontWeight: 300, color: '#1A1A1A', background: 'none', border: 'none', outline: 'none' }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
            <X size={18} color="#9B9590" />
          </button>
        </div>

        {/* Results or Popular */}
        {results.length > 0 ? (
          <div>
            <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590', marginBottom: '12px' }}>Results</p>
            {results.map(p => (
              <Link key={p.id} href={`/minimal/product/${p.slug}`} onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0', borderBottom: '1px solid #F5F4F0', textDecoration: 'none', color: 'inherit', transition: 'background 200ms' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#F5F4F0' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 400, color: '#1A1A1A' }}>{p.name}</p>
                  <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590' }}>{p.subtitle}</p>
                </div>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 500, color: '#1A1A1A' }}>{p.priceDisplay}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <p style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9590', marginBottom: '16px' }}>Popular Searches</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {popular.map(term => (
                <button key={term} onClick={() => setQuery(term)} style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, padding: '8px 16px', background: '#F5F3F0', borderRadius: '20px', border: 'none', cursor: 'pointer', color: '#1A1A1A', boxShadow: '3px 3px 6px #d4d0cb, -3px -3px 6px #ffffff', transition: 'all 200ms' }}>
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes searchSlideIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}
