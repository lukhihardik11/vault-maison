'use client'
import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlist'
import { useCartStore } from '@/store/cart'
import { VaultLayout } from '../VaultLayout'
import { Heart, ShoppingBag, X } from 'lucide-react'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultWishlist() {
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  if (items.length === 0) {
    return (
      <VaultLayout>
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 24px', textAlign: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%', marginBottom: 28,
            backgroundColor: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Heart size={28} color="rgba(212,175,55,0.3)" />
          </div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, color: TEXT, marginBottom: 12, fontWeight: 400 }}>Your Wishlist is Empty</h1>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.4)', marginBottom: 36, lineHeight: 1.7 }}>Save pieces you love to revisit later.</p>
          <SparkleGlowButton onClick={() => window.location.href='/vault/collections'}>Explore Collections</SparkleGlowButton>
        </div>
      </VaultLayout>
    )
  }

  return (
    <VaultLayout>
      <style jsx global>{`
        .vault-wish-card { transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease, border-color 0.4s ease; }
        .vault-wish-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(212,175,55,0.08); border-color: rgba(212,175,55,0.25) !important; }
        .vault-wish-card:hover img { transform: scale(1.04); }
        .vault-add-bag { transition: all 0.3s ease; }
        .vault-add-bag:hover { background-color: rgba(212,175,55,0.15) !important; border-color: rgba(212,175,55,0.5) !important; }
      `}</style>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Your Saved Pieces</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 4vw, 38px)', fontWeight: 400, color: TEXT, marginTop: 8 }}>Wishlist</h1>
          <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.35)', marginTop: 8 }}>{items.length} saved {items.length === 1 ? 'piece' : 'pieces'}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {items.map((p) => (
            <div key={p.id} className="vault-wish-card" style={{
              borderRadius: 10, overflow: 'hidden',
              border: '1px solid rgba(212,175,55,0.08)', backgroundColor: SURFACE,
              position: 'relative',
            }}>
              <button onClick={() => removeItem(p.id)} style={{
                position: 'absolute', top: 12, right: 12, zIndex: 5,
                width: 32, height: 32, borderRadius: '50%',
                backgroundColor: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(8px)',
                border: '1px solid rgba(234,234,234,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}>
                <X size={13} color="rgba(234,234,234,0.5)" />
              </button>
              <Link href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ aspectRatio: '1', overflow: 'hidden', backgroundColor: '#111' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                </div>
              </Link>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 9, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{p.category.replace(/-/g, ' ')}</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, marginBottom: 4, fontFamily: 'Cinzel, serif' }}>{p.name}</div>
                <div style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: TEXT, marginBottom: 16 }}>${p.price.toLocaleString()}</div>
                <button className="vault-add-bag" onClick={() => addItem(p)} style={{
                  width: '100%', padding: '11px',
                  backgroundColor: 'rgba(212,175,55,0.06)',
                  border: `1px solid rgba(212,175,55,0.2)`,
                  borderRadius: 6, color: GOLD,
                  fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <ShoppingBag size={13} /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
