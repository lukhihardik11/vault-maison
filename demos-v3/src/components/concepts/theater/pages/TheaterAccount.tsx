'use client'
import React from 'react'
import { TH, TheaterSection, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton, TheaterInput } from '../ui'
import { User, Package, Heart, Settings } from 'lucide-react'

export function TheaterAccount() {
  const tabs = [
    { icon: <User size={16} />, label: 'Profile' },
    { icon: <Package size={16} />, label: 'Orders' },
    { icon: <Heart size={16} />, label: 'Wishlist' },
    { icon: <Settings size={16} />, label: 'Settings' },
  ]

  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <ActLabel label="Your Stage" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text }}>My Account</h1>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48 }}>
          <div>
            {tabs.map((tab, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', cursor: 'pointer',
                background: i === 0 ? TH.card : 'transparent', border: i === 0 ? `1px solid ${TH.border}` : 'none',
                color: i === 0 ? TH.gold : TH.textSecondary, marginBottom: 4,
              }}>
                {tab.icon}
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem' }}>{tab.label}</span>
              </div>
            ))}
          </div>

          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 500, color: TH.text, margin: '0 0 24px' }}>Profile Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <TheaterInput label="First Name" placeholder="First name" />
              <TheaterInput label="Last Name" placeholder="Last name" />
            </div>
            <TheaterInput label="Email" placeholder="your@email.com" type="email" />
            <TheaterInput label="Phone" placeholder="+1 (555) 000-0000" />
            <GoldRule style={{ margin: '24px 0' }} />
            <TheaterButton>Save Changes</TheaterButton>
          </div>
        </div>
      </TheaterSection>
    </>
  )
}
