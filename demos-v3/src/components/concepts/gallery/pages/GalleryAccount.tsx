'use client'

import React, { useState } from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'
import { GalleryButton } from '../ui/GalleryButton'
import { User, Package, Heart, Settings } from 'lucide-react'

const tabs = [
  { key: 'profile', label: 'Profile', icon: User },
  { key: 'orders', label: 'Orders', icon: Package },
  { key: 'wishlist', label: 'Collection', icon: Heart },
  { key: 'settings', label: 'Settings', icon: Settings },
]

export function GalleryAccount() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 140px', maxWidth: 1100, margin: '0 auto' }}>
        <MuseumCaption>My Account</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '12px 0 48px' }}>
          Welcome Back
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 64 }}>
          {/* Sidebar */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {tabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
                  background: activeTab === tab.key ? G.surface : 'transparent',
                  border: activeTab === tab.key ? `1px solid ${G.border}` : '1px solid transparent',
                  cursor: 'pointer', transition: 'all 0.3s',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: activeTab === tab.key ? G.accent : G.textSecondary,
                }}>
                <tab.icon size={15} strokeWidth={1.5} />
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div>
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 32px' }}>Personal Details</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {['First Name', 'Last Name', 'Email', 'Phone'].map((field) => (
                    <div key={field} style={{ marginBottom: 8 }}>
                      <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: G.accent, marginBottom: 8 }}>{field}</label>
                      <input placeholder={field} style={{ width: '100%', padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.text, background: G.surface, border: `1px solid ${G.border}`, borderRadius: 0, outline: 'none' }} />
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 24 }}>
                  <GalleryButton>Save Changes</GalleryButton>
                </div>
              </div>
            )}
            {activeTab === 'orders' && (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.textSecondary, marginBottom: 24 }}>No orders yet. Begin exploring our exhibition.</p>
                <GalleryButton href="/gallery/collections">View Exhibition</GalleryButton>
              </div>
            )}
            {activeTab === 'wishlist' && (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: G.textSecondary, marginBottom: 24 }}>Your collection is empty. Save pieces you love.</p>
                <GalleryButton href="/gallery/collections">Browse Collection</GalleryButton>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.1rem', fontWeight: 400, color: G.text, margin: '0 0 32px' }}>Preferences</h2>
                <div style={{ padding: '20px 0', borderBottom: `1px solid ${G.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: G.text, margin: '0 0 4px' }}>Exhibition Notifications</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.textSecondary, margin: 0 }}>Receive updates about new exhibitions and private viewings</p>
                  </div>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: G.accent, cursor: 'pointer', position: 'relative' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, right: 3 }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </GalleryLayout>
  )
}
