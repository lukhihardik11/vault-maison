'use client'
import React from 'react'
import { OB, ObservatorySection, RevealSection, ScanLine } from '../ObservatoryLayout'
import { ObservatoryButton, ObservatoryInput } from '../ui'
import { User, Package, Heart, Settings, Shield, Activity } from 'lucide-react'

export function ObservatoryAccount() {
  const menuItems = [
    { icon: <Package size={16} />, label: 'Order History', desc: 'Track your acquisitions and view analysis reports' },
    { icon: <Heart size={16} />, label: 'Watchlist', desc: 'Pieces you are monitoring for price and availability changes' },
    { icon: <Activity size={16} />, label: 'Analysis Reports', desc: 'Access your gemological analysis reports and certifications' },
    { icon: <Settings size={16} />, label: 'Preferences', desc: 'Notification settings, display preferences, and data controls' },
    { icon: <Shield size={16} />, label: 'Security', desc: 'Two-factor authentication and account security settings' },
  ]

  return (
    <>
      <section style={{ background: OB.bg, padding: '100px 0 40px', borderBottom: `1px solid ${OB.border}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: OB.accent }}>ACCOUNT</span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: '12px 0 0' }}>Your Observatory Profile</h1>
        </div>
      </section>

      <ObservatorySection>
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 48 }}>
          <div>
            <div style={{ background: OB.surface, border: `1px solid ${OB.border}`, padding: 24, textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: OB.card, border: `2px solid ${OB.accent}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <User size={24} color={OB.accent} />
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', color: OB.text, margin: '0 0 4px' }}>Welcome Back</h3>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, margin: 0 }}>collector@example.com</p>
            </div>
            {menuItems.map((item, i) => (
              <div key={i} className="observatory-card-hover" style={{ display: 'flex', gap: 12, padding: '16px', background: OB.card, border: `1px solid ${OB.border}`, marginBottom: 8, cursor: 'pointer' }}>
                <span style={{ color: OB.accent }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', color: OB.text }}>{item.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <RevealSection>
            <ScanLine label="Profile Settings" style={{ marginBottom: 32 }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <ObservatoryInput label="First Name" placeholder="Your first name" />
              <ObservatoryInput label="Last Name" placeholder="Your last name" />
            </div>
            <ObservatoryInput label="Email" type="email" placeholder="your@email.com" />
            <ObservatoryInput label="Phone" placeholder="+1 (555) 000-0000" />
            <ObservatoryButton>Update Profile</ObservatoryButton>
          </RevealSection>
        </div>
      </ObservatorySection>
    </>
  )
}
