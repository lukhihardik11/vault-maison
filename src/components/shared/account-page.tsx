'use client'

import { useState } from 'react'
import { User, Package, MapPin, Heart, Settings, LogOut, Eye, EyeOff, ChevronRight } from 'lucide-react'

interface AccountPageProps {
  conceptId: string
  accentColor: string
  bgColor: string
  textColor: string
  mutedColor: string
  cardBg?: string
  fontHeading?: string
  fontBody?: string
}

type Tab = 'login' | 'dashboard' | 'orders' | 'addresses' | 'profile'

const mockOrders = [
  { id: 'VM-A7K2F9', date: '2024-12-15', status: 'Delivered', total: 2450, items: 2 },
  { id: 'VM-B3M8P1', date: '2024-11-28', status: 'Shipped', total: 1890, items: 1 },
  { id: 'VM-C9R4T6', date: '2024-10-03', status: 'Delivered', total: 4200, items: 3 },
]

const mockAddresses = [
  { id: '1', label: 'Home', name: 'Jane Doe', address: '123 Park Avenue', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
  { id: '2', label: 'Office', name: 'Jane Doe', address: '456 Madison Ave, Suite 800', city: 'New York', state: 'NY', zip: '10022', isDefault: false },
]

export function AccountPage({
  conceptId,
  accentColor,
  bgColor,
  textColor,
  mutedColor,
  cardBg,
  fontHeading = "'Playfair Display', serif",
  fontBody = "'Inter', sans-serif",
}: AccountPageProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('login')
  const [isRegister, setIsRegister] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')

  const bg = cardBg || `${textColor}08`
  const border = `${textColor}15`

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', background: 'transparent',
    border: `1px solid ${border}`, color: textColor, fontFamily: fontBody,
    fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.1em',
    textTransform: 'uppercase', color: mutedColor, display: 'block', marginBottom: 6,
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setActiveTab('dashboard')
  }

  const sidebarItems: { key: Tab; label: string; icon: typeof User }[] = [
    { key: 'dashboard', label: 'Dashboard', icon: User },
    { key: 'orders', label: 'Order History', icon: Package },
    { key: 'addresses', label: 'Addresses', icon: MapPin },
    { key: 'profile', label: 'Profile Settings', icon: Settings },
  ]

  // Login / Register page
  if (!isLoggedIn) {
    return (
      <div style={{ background: bgColor, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 32px' }}>
        <div style={{ width: '100%', maxWidth: 440 }}>
          {/* Toggle */}
          <div style={{ display: 'flex', marginBottom: 32 }}>
            {['Sign In', 'Create Account'].map((label, i) => {
              const active = i === 0 ? !isRegister : isRegister
              return (
                <button
                  key={label}
                  onClick={() => setIsRegister(i === 1)}
                  style={{
                    flex: 1, padding: '12px 0', background: 'transparent', border: 'none',
                    borderBottom: `2px solid ${active ? accentColor : border}`,
                    color: active ? textColor : mutedColor,
                    fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                    cursor: 'pointer', transition: 'all 0.3s',
                  }}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {!isRegister ? (
            // Login form
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={labelStyle}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    style={inputStyle}
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: mutedColor, cursor: 'pointer' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right', marginBottom: 24 }}>
                <button style={{ background: 'none', border: 'none', color: accentColor, fontFamily: fontBody, fontSize: '0.7rem', cursor: 'pointer' }}>
                  Forgot Password?
                </button>
              </div>
              <button
                onClick={handleLogin}
                style={{
                  width: '100%', padding: '14px 0', background: accentColor, color: bgColor, border: 'none',
                  fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Sign In
              </button>
            </div>
          ) : (
            // Register form
            <div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Full Name</label>
                <input value={regName} onChange={e => setRegName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Email</label>
                <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Password</label>
                <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} style={inputStyle} />
                <p style={{ fontFamily: fontBody, fontSize: '0.65rem', color: mutedColor, margin: '6px 0 0' }}>
                  Minimum 8 characters with at least one number
                </p>
              </div>
              <button
                onClick={handleLogin}
                style={{
                  width: '100%', padding: '14px 0', background: accentColor, color: bgColor, border: 'none',
                  fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                }}
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Dashboard
  return (
    <div style={{ background: bgColor, minHeight: '100vh', paddingTop: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <h1 style={{ fontFamily: fontHeading, fontSize: '2rem', fontWeight: 400, color: textColor, margin: '0 0 8px' }}>My Account</h1>
        <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: mutedColor, margin: '0 0 40px' }}>Welcome back, valued client</p>

        <div className="vm-account-grid" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 48 }}>
          {/* Sidebar */}
          <div>
            {sidebarItems.map(item => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px',
                  background: activeTab === item.key ? `${accentColor}10` : 'transparent',
                  border: 'none', borderLeft: `2px solid ${activeTab === item.key ? accentColor : 'transparent'}`,
                  color: activeTab === item.key ? textColor : mutedColor,
                  fontFamily: fontBody, fontSize: '0.75rem', letterSpacing: '0.05em', cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
            <button
              onClick={() => setIsLoggedIn(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 16px',
                background: 'transparent', border: 'none', borderLeft: '2px solid transparent',
                color: '#ef4444', fontFamily: fontBody, fontSize: '0.75rem', cursor: 'pointer', marginTop: 16,
              }}
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          {/* Content */}
          <div>
            {activeTab === 'dashboard' && (
              <div>
                <h2 style={{ fontFamily: fontHeading, fontSize: '1.3rem', fontWeight: 500, color: textColor, margin: '0 0 24px' }}>Dashboard</h2>
                <div className="vm-account-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32 }}>
                  {[
                    { label: 'Total Orders', value: '3', icon: Package },
                    { label: 'Wishlist Items', value: '7', icon: Heart },
                    { label: 'Saved Addresses', value: '2', icon: MapPin },
                  ].map(stat => (
                    <div key={stat.label} style={{ padding: 24, background: bg, border: `1px solid ${border}` }}>
                      <stat.icon size={20} color={accentColor} style={{ marginBottom: 12 }} />
                      <p style={{ fontFamily: fontHeading, fontSize: '1.5rem', color: textColor, margin: '0 0 4px' }}>{stat.value}</p>
                      <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor, margin: 0 }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
                <h3 style={{ fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mutedColor, margin: '0 0 16px' }}>Recent Orders</h3>
                {mockOrders.slice(0, 2).map(order => (
                  <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: `1px solid ${border}` }}>
                    <div>
                      <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: textColor, margin: '0 0 4px' }}>#{order.id}</p>
                      <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor, margin: 0 }}>{order.date} · {order.items} items</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: accentColor, margin: '0 0 4px' }}>${order.total.toLocaleString()}</p>
                      <span style={{
                        fontFamily: fontBody, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                        padding: '3px 8px', background: order.status === 'Delivered' ? '#22c55e20' : `${accentColor}20`,
                        color: order.status === 'Delivered' ? '#22c55e' : accentColor,
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontFamily: fontHeading, fontSize: '1.3rem', fontWeight: 500, color: textColor, margin: '0 0 24px' }}>Order History</h2>
                {mockOrders.map(order => (
                  <div key={order.id} style={{ padding: 20, background: bg, border: `1px solid ${border}`, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: textColor, margin: '0 0 4px' }}>Order #{order.id}</p>
                        <p style={{ fontFamily: fontBody, fontSize: '0.7rem', color: mutedColor, margin: 0 }}>Placed on {order.date} · {order.items} item{order.items > 1 ? 's' : ''}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontFamily: fontBody, fontSize: '1rem', color: accentColor, margin: '0 0 4px' }}>${order.total.toLocaleString()}</p>
                        <span style={{
                          fontFamily: fontBody, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                          padding: '3px 8px', background: order.status === 'Delivered' ? '#22c55e20' : `${accentColor}20`,
                          color: order.status === 'Delivered' ? '#22c55e' : accentColor,
                        }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <button style={{
                      marginTop: 12, display: 'flex', alignItems: 'center', gap: 4,
                      background: 'none', border: 'none', color: accentColor, fontFamily: fontBody, fontSize: '0.7rem', cursor: 'pointer',
                    }}>
                      View Details <ChevronRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontFamily: fontHeading, fontSize: '1.3rem', fontWeight: 500, color: textColor, margin: 0 }}>Saved Addresses</h2>
                  <button style={{
                    padding: '10px 20px', background: accentColor, color: bgColor, border: 'none',
                    fontFamily: fontBody, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>
                    Add New
                  </button>
                </div>
                <div className="vm-account-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {mockAddresses.map(addr => (
                    <div key={addr.id} style={{ padding: 20, background: bg, border: `1px solid ${addr.isDefault ? accentColor : border}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                        <span style={{ fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: accentColor }}>{addr.label}</span>
                        {addr.isDefault && (
                          <span style={{ fontFamily: fontBody, fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 8px', background: `${accentColor}20`, color: accentColor }}>Default</span>
                        )}
                      </div>
                      <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: textColor, margin: '0 0 4px' }}>{addr.name}</p>
                      <p style={{ fontFamily: fontBody, fontSize: '0.75rem', color: mutedColor, margin: '0 0 2px' }}>{addr.address}</p>
                      <p style={{ fontFamily: fontBody, fontSize: '0.75rem', color: mutedColor, margin: 0 }}>{addr.city}, {addr.state} {addr.zip}</p>
                      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                        <button style={{ background: 'none', border: 'none', color: accentColor, fontFamily: fontBody, fontSize: '0.7rem', cursor: 'pointer' }}>Edit</button>
                        <button style={{ background: 'none', border: 'none', color: '#ef4444', fontFamily: fontBody, fontSize: '0.7rem', cursor: 'pointer' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 style={{ fontFamily: fontHeading, fontSize: '1.3rem', fontWeight: 500, color: textColor, margin: '0 0 24px' }}>Profile Settings</h2>
                <div style={{ maxWidth: 500 }}>
                  <div className="vm-account-form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input defaultValue="Jane" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input defaultValue="Doe" style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Email</label>
                    <input defaultValue="jane.doe@example.com" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle}>Phone</label>
                    <input defaultValue="+1 (555) 123-4567" style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: 24, padding: 16, background: bg, border: `1px solid ${border}` }}>
                    <h3 style={{ fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: mutedColor, margin: '0 0 12px' }}>Change Password</h3>
                    <div style={{ marginBottom: 12 }}>
                      <label style={labelStyle}>Current Password</label>
                      <input type="password" style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>New Password</label>
                      <input type="password" style={inputStyle} />
                    </div>
                  </div>
                  <button style={{
                    padding: '14px 36px', background: accentColor, color: bgColor, border: 'none',
                    fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .vm-account-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .vm-account-stats {
            grid-template-columns: 1fr !important;
          }
          .vm-account-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
