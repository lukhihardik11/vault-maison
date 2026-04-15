'use client'
import React from 'react'
import { MS, MaisonSection, SectionLabel, GoldDivider } from '../MaisonLayout'
import { MaisonButton, MaisonInput } from '../ui'
import { User, Package, Heart, Settings, Clock } from 'lucide-react'

export function MaisonAccount() {
  const tabs = [
    { icon: <User size={16} />, label: 'Profile' },
    { icon: <Package size={16} />, label: 'Orders' },
    { icon: <Heart size={16} />, label: 'Wishlist' },
    { icon: <Clock size={16} />, label: 'History' },
    { icon: <Settings size={16} />, label: 'Settings' },
  ]

  return (
    <>
      <section style={{ background: MS.bg, padding: '100px 0 40px', borderBottom: `1px solid ${MS.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <SectionLabel label="Account" style={{ marginBottom: 16 }} />
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: MS.text }}>My Account</h1>
        </div>
      </section>

      <MaisonSection>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>
          <div>
            {tabs.map((tab, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', cursor: 'pointer', borderRadius: 3,
                background: i === 0 ? MS.card : 'transparent', border: i === 0 ? `1px solid ${MS.borderLight}` : 'none',
                color: i === 0 ? MS.accent : MS.textSecondary, marginBottom: 4,
              }}>
                {tab.icon}
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', fontWeight: 500 }}>{tab.label}</span>
              </div>
            ))}
          </div>
          <div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 600, color: MS.text, margin: '0 0 20px' }}>Profile Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <MaisonInput label="First Name" placeholder="First name" />
              <MaisonInput label="Last Name" placeholder="Last name" />
            </div>
            <MaisonInput label="Email" placeholder="your@email.com" type="email" />
            <MaisonInput label="Phone" placeholder="+1 (555) 000-0000" />
            <GoldDivider style={{ margin: '20px 0' }} />
            <MaisonButton>Save Changes</MaisonButton>
          </div>
        </div>
      </MaisonSection>
    </>
  )
}
