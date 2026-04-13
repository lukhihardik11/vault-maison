'use client'
import { useState } from 'react'
import { VaultLayout } from '../VaultLayout'
import { User, Package, Heart, Settings, LogOut } from 'lucide-react'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
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
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Welcome Back</span>
        <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 3.5vw, 34px)', fontWeight: 400, color: TEXT, marginTop: 8, marginBottom: 40 }}>My Account</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40 }}>
          {/* Sidebar */}
          <div style={{ padding: 28, backgroundColor: SURFACE, borderRadius: 10, border: '1px solid rgba(212,175,55,0.08)', height: 'fit-content' }}>
            <div style={{ textAlign: 'center', marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', backgroundColor: 'rgba(212,175,55,0.06)', border: '2px solid rgba(212,175,55,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <User size={24} color={GOLD} />
              </div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 16, fontWeight: 400, color: TEXT }}>Victoria Chen</div>
              <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', marginTop: 4 }}>victoria@example.com</div>
            </div>
            {tabs.map((t) => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
                background: activeTab === t.id ? 'rgba(212,175,55,0.06)' : 'none',
                border: activeTab === t.id ? '1px solid rgba(212,175,55,0.12)' : '1px solid transparent',
                borderRadius: 8,
                color: activeTab === t.id ? GOLD : 'rgba(234,234,234,0.45)',
                cursor: 'pointer', fontSize: 13, marginBottom: 4,
                letterSpacing: '0.03em',
                transition: 'all 0.3s ease',
              }}>
                <t.icon size={16} /> {t.label}
              </button>
            ))}
            <button style={{
              width: '100%', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
              background: 'none', border: 'none',
              color: 'rgba(234,234,234,0.25)', cursor: 'pointer', fontSize: 13,
              marginTop: 16, borderTop: '1px solid rgba(212,175,55,0.06)', paddingTop: 20,
              transition: 'color 0.3s',
            }}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: 36, backgroundColor: SURFACE, borderRadius: 10, border: '1px solid rgba(212,175,55,0.08)' }}>
            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Profile Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>First Name</label><DarkNeumorphicInput defaultValue="Victoria" /></div>
                  <div><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Last Name</label><DarkNeumorphicInput defaultValue="Chen" /></div>
                </div>
                <div style={{ marginTop: 20 }}><label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Email</label><DarkNeumorphicInput defaultValue="victoria@example.com" /></div>
                <div style={{ marginTop: 28 }}><SparkleGlowButton>Save Changes</SparkleGlowButton></div>
              </div>
            )}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Order History</h2>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px', backgroundColor: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Package size={24} color="rgba(212,175,55,0.3)" />
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.3)' }}>No orders yet. Your purchases will appear here.</p>
                </div>
              </div>
            )}
            {activeTab === 'wishlist' && (
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Wishlist</h2>
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px', backgroundColor: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={24} color="rgba(212,175,55,0.3)" />
                  </div>
                  <p style={{ fontSize: 14, color: 'rgba(234,234,234,0.3)' }}>Your wishlist is empty. Save pieces you love.</p>
                </div>
              </div>
            )}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, fontWeight: 400, color: TEXT, marginBottom: 28 }}>Settings</h2>
                <div style={{ padding: 24, border: '1px solid rgba(212,175,55,0.08)', borderRadius: 10, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, color: TEXT }}>Email Notifications</div>
                      <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', marginTop: 2 }}>New arrivals, exclusive offers</div>
                    </div>
                    <div style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: GOLD, position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'white', position: 'absolute', top: 2, right: 2 }} />
                    </div>
                  </div>
                </div>
                <div style={{ padding: 24, border: '1px solid rgba(212,175,55,0.08)', borderRadius: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: 14, color: TEXT }}>Two-Factor Authentication</div>
                      <div style={{ fontSize: 12, color: 'rgba(234,234,234,0.35)', marginTop: 2 }}>Enhanced account security</div>
                    </div>
                    <div style={{ width: 44, height: 24, borderRadius: 12, backgroundColor: 'rgba(212,175,55,0.15)', position: 'relative', cursor: 'pointer' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: 'rgba(234,234,234,0.4)', position: 'absolute', top: 2, left: 2 }} />
                    </div>
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
