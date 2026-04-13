'use client'
import { useState } from 'react'
import { VaultLayout } from '../VaultLayout'
import { User, Package, Heart, Settings, LogOut } from 'lucide-react'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const tabs = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'orders', icon: Package, label: 'Orders' },
  { id: 'wishlist', icon: Heart, label: 'Wishlist' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

export function VaultAccount() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 400, color: TEXT, marginBottom: 40 }}>My Account</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>
          {/* Sidebar */}
          <div style={{ padding: 24, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)', height: 'fit-content' }}>
            <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 24, borderBottom: `1px solid ${MUTED}` }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.1)', border: `2px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <User size={24} color={GOLD} />
              </div>
              <div style={{ fontSize: 16, fontWeight: 500, color: TEXT }}>Victoria Chen</div>
              <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', marginTop: 4 }}>victoria@example.com</div>
            </div>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                background: activeTab === t.id ? 'rgba(212,175,55,0.08)' : 'none', border: 'none', borderRadius: 6,
                color: activeTab === t.id ? GOLD : 'rgba(234,234,234,0.5)', cursor: 'pointer', fontSize: 14, marginBottom: 4,
              }}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
            <button style={{ width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', color: 'rgba(234,234,234,0.3)', cursor: 'pointer', fontSize: 14, marginTop: 16, borderTop: `1px solid ${MUTED}`, paddingTop: 20 }}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: 32, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 500, color: TEXT, marginBottom: 24 }}>Profile Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>First Name</label><input defaultValue="Victoria" style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 14 }} /></div>
                  <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Last Name</label><input defaultValue="Chen" style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 14 }} /></div>
                </div>
                <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Email</label><input defaultValue="victoria@example.com" style={{ width: '100%', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.03)', border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 14 }} /></div>
                <div style={{ marginTop: 24 }}><SparkleGlowButton>Save Changes</SparkleGlowButton></div>
              </div>
            )}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 500, color: TEXT, marginBottom: 24 }}>Order History</h2>
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(234,234,234,0.3)' }}>
                  <Package size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                  <p style={{ fontSize: 14 }}>No orders yet. Your purchases will appear here.</p>
                </div>
              </div>
            )}
            {activeTab === 'wishlist' && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 500, color: TEXT, marginBottom: 24 }}>Wishlist</h2>
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(234,234,234,0.3)' }}>
                  <Heart size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                  <p style={{ fontSize: 14 }}>Your wishlist is empty. Save pieces you love.</p>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 500, color: TEXT, marginBottom: 24 }}>Settings</h2>
                <div style={{ padding: 20, border: `1px solid ${MUTED}`, borderRadius: 8, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><div style={{ fontSize: 14, color: TEXT }}>Email Notifications</div><div style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)' }}>New arrivals, exclusive offers</div></div>
                    <div style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: GOLD, position: 'relative', cursor: 'pointer' }}><div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: 2, right: 2 }} /></div>
                  </div>
                </div>
                <div style={{ padding: 20, border: `1px solid ${MUTED}`, borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><div style={{ fontSize: 14, color: TEXT }}>Two-Factor Authentication</div><div style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)' }}>Enhanced account security</div></div>
                    <div style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: MUTED, position: 'relative', cursor: 'pointer' }}><div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'rgba(234,234,234,0.5)', position: 'absolute', top: 2, left: 2 }} /></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
