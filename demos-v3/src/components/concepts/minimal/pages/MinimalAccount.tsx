'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Package, Heart, Settings, LogOut, ChevronRight } from 'lucide-react'
import AvatarPicker from '../ui/AvatarPicker'
import SwitchButton from '../ui/SwitchButton'
import { DarkLoginForm } from '../ui'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const tabs = [
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

const mockOrders = [
  { id: 'VM-2K5F8A', date: 'March 15, 2025', status: 'Delivered', items: 'Celestial Solitaire', total: '$12,500' },
  { id: 'VM-1R3D7B', date: 'February 2, 2025', status: 'Shipped', items: 'Lumière Tennis Bracelet', total: '$8,900' },
  { id: 'VM-0P9C2E', date: 'January 18, 2025', status: 'Processing', items: 'Étoile Pendant', total: '$4,200' },
]

export function MinimalAccount() {
  const [activeTab, setActiveTab] = useState('orders')
  const [loggedIn, setLoggedIn] = useState(true)

  if (!loggedIn) {
    return (
      <MinimalLayout>
        <section style={{ padding: '80px 5vw 100px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <DarkLoginForm onLogin={() => setLoggedIn(true)} />
        </section>
      </MinimalLayout>
    )
  }

  return (
    <MinimalLayout>
      <section style={{ padding: '60px 5vw 100px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px' }}>
          <div>
            <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A265', marginBottom: '8px' }}>My Account</p>
            <h1 style={{ fontFamily: font, fontSize: '32px', fontWeight: 200, color: '#1A1A1A' }}>Welcome Back</h1>
          </div>
          <button onClick={() => setLoggedIn(false)} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: font, fontSize: '11px', color: '#9B9590', background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px' }} className="vm-account-grid">
          {/* Sidebar */}
          <div>
            {/* AvatarPicker (KokonutUI) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '32px', padding: '24px 20px', backgroundColor: '#F5F4F0', borderRadius: '8px' }}>
              <AvatarPicker initials="JD" />
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}>Jane Doe</p>
                <p style={{ fontFamily: font, fontSize: '11px', fontWeight: 300, color: '#9B9590' }}>jane@example.com</p>
              </div>
            </div>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '14px 16px', fontFamily: font, fontSize: '13px', fontWeight: activeTab === tab.id ? 500 : 300, color: activeTab === tab.id ? '#1A1A1A' : '#9B9590', backgroundColor: activeTab === tab.id ? '#F5F4F0' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all 300ms ease', borderRadius: '8px' }}>
                <tab.icon size={16} strokeWidth={1.5} style={{ color: activeTab === tab.id ? '#C4A265' : '#9B9590' }} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#1A1A1A', marginBottom: '24px' }}>Order History</h2>
                {mockOrders.map(order => (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', borderBottom: '1px solid #E8E5E0' }}>
                    <div>
                      <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#1A1A1A', marginBottom: '4px' }}>{order.items}</p>
                      <p style={{ fontFamily: font, fontSize: '12px', fontWeight: 300, color: '#9B9590' }}>Order {order.id} · {order.date}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: font, fontSize: '14px', fontWeight: 500, color: '#1A1A1A', marginBottom: '4px' }}>{order.total}</p>
                      <span style={{ fontFamily: font, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: order.status === 'Delivered' ? '#4CAF50' : order.status === 'Shipped' ? '#C4A265' : '#9B9590', padding: '3px 8px', border: `1px solid ${order.status === 'Delivered' ? '#4CAF50' : order.status === 'Shipped' ? '#C4A265' : '#E8E5E0'}` }}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#1A1A1A', marginBottom: '12px' }}>Saved Pieces</h2>
                <p style={{ fontFamily: font, fontSize: '13px', fontWeight: 300, color: '#9B9590', marginBottom: '24px' }}>
                  Items you have saved will appear here. <Link href="/minimal/wishlist" style={{ color: '#C4A265', textDecoration: 'underline', textUnderlineOffset: '3px' }}>View full wishlist</Link>
                </p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontFamily: font, fontSize: '20px', fontWeight: 300, color: '#1A1A1A', marginBottom: '24px' }}>Account Settings</h2>
                {['Personal Information', 'Shipping Addresses', 'Payment Methods'].map((item, i) => (
                  <button key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '20px 0', borderBottom: '1px solid #E8E5E0', background: 'none', border: 'none', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: '#E8E5E0', cursor: 'pointer', textAlign: 'left' }}>
                    <span style={{ fontFamily: font, fontSize: '14px', fontWeight: 400, color: '#1A1A1A' }}>{item}</span>
                    <ChevronRight size={16} color="#9B9590" />
                  </button>
                ))}

                {/* Notification Preferences with SwitchButton (KokonutUI) */}
                <div style={{ marginTop: '36px' }}>
                  <h3 style={{ fontFamily: font, fontSize: '16px', fontWeight: 400, color: '#1A1A1A', marginBottom: '20px' }}>Notification Preferences</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <SwitchButton label="Email notifications for new collections" defaultChecked={true} />
                    <SwitchButton label="SMS alerts for order updates" defaultChecked={true} />
                    <SwitchButton label="Marketing communications" defaultChecked={false} />
                    <SwitchButton label="Price drop alerts for wishlist items" defaultChecked={true} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-account-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
