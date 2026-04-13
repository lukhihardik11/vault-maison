'use client'
import Link from 'next/link'
import { useWishlistStore } from '@/store/wishlist'
import { useCartStore } from '@/store/cart'
import { VaultLayout } from '../VaultLayout'
import { Heart, ShoppingBag, X } from 'lucide-react'

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
          <Heart size={48} color="#333" style={{ marginBottom: 24 }} />
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 28, color: TEXT, marginBottom: 12 }}>Your Wishlist is Empty</h1>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', marginBottom: 32 }}>Save pieces you love to revisit later.</p>
          <Link href="/vault/collections" style={{ padding: '14px 32px', backgroundColor: GOLD, color: BG, textDecoration: 'none', fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 4 }}>
            Explore Collections
          </Link>
        </div>
      </VaultLayout>
    )
  }

  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 400, color: TEXT, marginBottom: 8 }}>Wishlist</h1>
        <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.4)', marginBottom: 40 }}>{items.length} saved {items.length === 1 ? 'piece' : 'pieces'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {items.map((p) => (
            <div key={p.id} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(212,175,55,0.1)', backgroundColor: SURFACE, position: 'relative' }}>
              <button onClick={() => removeItem(p.id)} style={{ position: 'absolute', top: 12, right: 12, zIndex: 5, width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.6)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <X size={14} color="rgba(234,234,234,0.5)" />
              </button>
              <Link href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{ aspectRatio: '1', overflow: 'hidden', backgroundColor: '#111' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </Link>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 4 }}>{p.category.replace(/-/g, ' ')}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: 14, fontFamily: 'Cinzel, serif', color: TEXT, marginBottom: 12 }}>${p.price.toLocaleString()}</div>
                <button onClick={() => addItem(p)} style={{ width: '100%', padding: '10px', backgroundColor: 'rgba(212,175,55,0.1)', border: `1px solid ${GOLD}`, borderRadius: 4, color: GOLD, fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <ShoppingBag size={12} /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </VaultLayout>
  )
}
