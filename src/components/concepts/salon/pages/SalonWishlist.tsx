'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonButton } from '../ui/SalonButton'
import { Heart } from 'lucide-react'

export function SalonWishlist() {
  return (
    <SalonLayout>
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px 100px', textAlign: 'center' }}>
        <Heart size={48} color={S.border} style={{ marginBottom: 20 }} />
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Your Wishlist</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, marginBottom: 32, lineHeight: 1.7 }}>
          Save the pieces that catch your eye. Your advisor can use your wishlist to make personalized recommendations.
        </p>
        <SalonButton href="/salon/collections">Start Exploring</SalonButton>
      </section>
    </SalonLayout>
  )
}
