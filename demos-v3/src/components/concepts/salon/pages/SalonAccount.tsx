'use client'

import React, { useState } from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { SalonInput } from '../ui/SalonInput'
import { SalonButton } from '../ui/SalonButton'
import { SalonLoyaltyProgress } from '../ui/SalonLoyaltyProgress'
import { SalonPulseIndicator } from '../ui/SalonPulseIndicator'
import { User, Package, Heart, Settings } from 'lucide-react'

const tabs = [
  { key: 'profile', label: 'My Profile', icon: <User size={16} /> },
  { key: 'orders', label: 'My Orders', icon: <Package size={16} /> },
  { key: 'wishlist', label: 'Wishlist', icon: <Heart size={16} /> },
  { key: 'settings', label: 'Settings', icon: <Settings size={16} /> },
]

export function SalonAccount() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <SalonLayout>
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 32px 100px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 400, color: S.text, margin: '0 0 20px', textAlign: 'center' }}>My Account</h1>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <SalonPulseIndicator label="Your advisor Sophie is online" />
        </div>
        <div style={{ maxWidth: 400, margin: '0 auto 40px' }}>
          <SalonLoyaltyProgress currentPoints={780} tier="silver" name="Jane" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>
          {/* Sidebar */}
          <div>
            <div style={{ background: S.warmPanel, borderRadius: S.radiusLg, padding: '24px 20px', marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: `linear-gradient(135deg, ${S.accent}, ${S.accentHover})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', margin: '0 auto 12px' }}>JD</div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: S.text, textAlign: 'center', margin: '0 0 4px' }}>Jane Doe</p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: S.textSecondary, textAlign: 'center', margin: 0 }}>Member since 2025</p>
            </div>
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                  background: activeTab === tab.key ? S.accentSoft : 'transparent',
                  border: 'none', borderRadius: S.radiusSm, cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.75rem',
                  color: activeTab === tab.key ? S.accent : S.textSecondary,
                  fontWeight: activeTab === tab.key ? 500 : 400,
                  transition: 'all 0.3s', marginBottom: 4,
                }}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 24px' }}>Personal Details</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <SalonInput label="First Name" defaultValue="Jane" />
                  <SalonInput label="Last Name" defaultValue="Doe" />
                </div>
                <SalonInput label="Email" type="email" defaultValue="jane@example.com" />
                <SalonInput label="Phone" type="tel" defaultValue="+1 (555) 000-0000" />
                <SalonButton style={{ marginTop: 8 }}>Save Changes</SalonButton>
              </div>
            )}
            {activeTab === 'orders' && (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Package size={40} color={S.border} style={{ marginBottom: 16 }} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: S.text, marginBottom: 8 }}>No orders yet</p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>Your order history will appear here.</p>
                <SalonButton variant="secondary" href="/salon/collections">Start Shopping</SalonButton>
              </div>
            )}
            {activeTab === 'wishlist' && (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <Heart size={40} color={S.border} style={{ marginBottom: 16 }} />
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: S.text, marginBottom: 8 }}>Your wishlist is empty</p>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, marginBottom: 24 }}>Save pieces you love and your advisor can help you choose.</p>
                <SalonButton variant="secondary" href="/salon/collections">Browse Collection</SalonButton>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.5rem', fontWeight: 400, color: S.text, margin: '0 0 24px' }}>Preferences</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {['Email notifications for new arrivals', 'Advisor recommendations', 'Sale & event invitations'].map((pref) => (
                    <label key={pref} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.text }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: S.accent }} /> {pref}
                    </label>
                  ))}
                </div>
                <SalonButton style={{ marginTop: 24 }}>Save Preferences</SalonButton>
              </div>
            )}
          </div>
        </div>
      </section>
    </SalonLayout>
  )
}
