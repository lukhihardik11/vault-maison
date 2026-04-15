'use client'
import React from 'react'
import { MK, MarketplaceSection, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton, MarketplaceInput } from '../ui'
import { User, Package, Heart, Settings, Gavel } from 'lucide-react'

export function MarketplaceAccount() {
  const tabs = [
    { icon: <User size={16} />, label: 'Profile' },
    { icon: <Gavel size={16} />, label: 'Bid History' },
    { icon: <Package size={16} />, label: 'Orders' },
    { icon: <Heart size={16} />, label: 'Watchlist' },
    { icon: <Settings size={16} />, label: 'Settings' },
  ]

  return (
    <>
      <section style={{ background: MK.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MK.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Your Account" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text }}>My Account</h1>
        </div>
      </section>

      <MarketplaceSection>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>
          <div>
            {tabs.map((tab, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer', borderRadius: 3,
                background: i === 0 ? MK.card : 'transparent', border: i === 0 ? `1px solid ${MK.border}` : 'none',
                color: i === 0 ? MK.accent : MK.textSecondary, marginBottom: 4,
              }}>
                {tab.icon}
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 500 }}>{tab.label}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: MK.text, margin: '0 0 20px' }}>Profile Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <MarketplaceInput label="First Name" placeholder="First name" />
              <MarketplaceInput label="Last Name" placeholder="Last name" />
            </div>
            <MarketplaceInput label="Email" placeholder="your@email.com" type="email" />
            <MarketplaceInput label="Phone" placeholder="+1 (555) 000-0000" />
            <LotDivider style={{ margin: '20px 0' }} />
            <MarketplaceButton>Save Changes</MarketplaceButton>
          </div>
        </div>
      </MarketplaceSection>
    </>
  )
}
