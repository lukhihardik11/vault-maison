'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, Shield, Lock, Fingerprint, ArrowRight, ShieldCheck } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { getBestsellers } from '@/data/products'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'
const MUTED = '#888'
const BORDER = '#222'
const FONT = "'Cinzel', serif"
const BODY = "'Inter', sans-serif"

export function VaultCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const [vaultLocked, setVaultLocked] = useState(true)
  const [holdProgress, setHoldProgress] = useState(0)
  const [holdTimer, setHoldTimer] = useState<NodeJS.Timeout | null>(null)

  const subtotal = getTotal()
  const insurance = subtotal > 1000 ? 0 : Math.round(subtotal * 0.02)
  const shipping = subtotal > 500 ? 0 : 35
  const total = subtotal + insurance + shipping

  const startHold = () => {
    let progress = 0
    const timer = setInterval(() => {
      progress += 2
      setHoldProgress(Math.min(progress, 100))
      if (progress >= 100) {
        clearInterval(timer)
        setVaultLocked(false)
      }
    }, 30)
    setHoldTimer(timer)
  }

  const endHold = () => {
    if (holdTimer) clearInterval(holdTimer)
    if (holdProgress < 100) setHoldProgress(0)
  }

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', border: `2px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <Lock size={32} color={MUTED} />
        </div>
        <h2 style={{ fontFamily: FONT, fontSize: 28, color: TEXT, marginBottom: 12 }}>Your Vault is Empty</h2>
        <p style={{ fontFamily: BODY, fontSize: 14, color: MUTED, marginBottom: 32 }}>No items have been secured yet.</p>
        <Link href="/vault/collections" style={{ fontFamily: FONT, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD, textDecoration: 'none', borderBottom: `1px solid ${GOLD}`, paddingBottom: 4 }}>
          Enter the Vault
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      {/* Vault Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '48px 24px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Shield size={18} color={GOLD} />
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: GOLD }}>Secured Collection</span>
            </div>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: TEXT }}>Your Vault</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 4 }}>{getItemCount()} {getItemCount() === 1 ? 'piece' : 'pieces'} secured</div>
            <div style={{ fontFamily: FONT, fontSize: 20, color: GOLD }}>${subtotal.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: 48 }}>
        {/* Items Column */}
        <div>
          {items.map((item, idx) => (
            <div key={item.product.id} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr auto', gap: 24, padding: '32px 0',
              borderBottom: idx < items.length - 1 ? `1px solid ${BORDER}` : 'none',
              alignItems: 'start'
            }}>
              <div style={{ position: 'relative', width: 120, height: 150, background: SURFACE, border: `1px solid ${BORDER}` }}>
                <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.7)', padding: '2px 6px', fontSize: 9, fontFamily: BODY, color: GOLD, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Authenticated
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: FONT, fontSize: 16, fontWeight: 400, color: TEXT, marginBottom: 4 }}>{item.product.name}</h3>
                <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 12 }}>{item.product.material} · {item.product.category}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                  <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Minus size={12} />
                  </button>
                  <div style={{ width: 40, height: 32, background: BG, border: `1px solid ${BORDER}`, borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: BODY, fontSize: 13, color: TEXT }}>
                    {item.quantity}
                  </div>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    style={{ width: 32, height: 32, background: SURFACE, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Plus size={12} />
                  </button>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: FONT, fontSize: 18, color: GOLD, marginBottom: 12 }}>${(item.product.price * item.quantity).toLocaleString()}</div>
                <button onClick={() => removeItem(item.product.id)}
                  style={{ background: 'none', border: 'none', color: MUTED, cursor: 'pointer', fontSize: 11, fontFamily: BODY, letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                  <X size={12} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Vault Summary Panel */}
        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, padding: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, paddingBottom: 16, borderBottom: `1px solid ${BORDER}` }}>
              <ShieldCheck size={16} color={GOLD} />
              <span style={{ fontFamily: BODY, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: GOLD }}>Vault-Secured Transaction</span>
            </div>

            <h3 style={{ fontFamily: FONT, fontSize: 18, color: TEXT, marginBottom: 24 }}>Order Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, fontFamily: BODY, fontSize: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: MUTED }}>Subtotal</span>
                <span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: MUTED }}>Insurance</span>
                <span style={{ color: insurance === 0 ? '#4CAF50' : TEXT }}>{insurance === 0 ? 'Included' : `$${insurance}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: MUTED }}>Secured Shipping</span>
                <span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16, marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: FONT, fontSize: 14, color: MUTED }}>Total</span>
              <span style={{ fontFamily: FONT, fontSize: 28, color: GOLD }}>${total.toLocaleString()}</span>
            </div>

            {/* Biometric Hold-to-Unlock */}
            {vaultLocked ? (
              <div>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <p style={{ fontFamily: BODY, fontSize: 11, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hold to Authenticate</p>
                </div>
                <button
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onMouseLeave={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                  style={{
                    width: '100%', height: 56, position: 'relative', overflow: 'hidden',
                    background: SURFACE, border: `1px solid ${BORDER}`, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <div style={{
                    position: 'absolute', left: 0, top: 0, bottom: 0,
                    width: `${holdProgress}%`, background: GOLD, opacity: 0.15,
                    transition: holdProgress === 0 ? 'width 0.3s' : 'none',
                  }} />
                  <Fingerprint size={20} color={holdProgress > 0 ? GOLD : MUTED} style={{ position: 'relative', zIndex: 1 }} />
                  <span style={{ fontFamily: FONT, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: holdProgress > 0 ? GOLD : TEXT, position: 'relative', zIndex: 1 }}>
                    {holdProgress > 0 && holdProgress < 100 ? `Authenticating... ${holdProgress}%` : 'Press & Hold'}
                  </span>
                </button>
              </div>
            ) : (
              <Link href="/vault/checkout" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%', height: 56, background: GOLD, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <Lock size={16} color={BG} />
                  <span style={{ fontFamily: FONT, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase', color: BG }}>Proceed to Secure Checkout</span>
                  <ArrowRight size={16} color={BG} />
                </button>
              </Link>
            )}

            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: Shield, label: 'PCI DSS Level 1' },
                { icon: Lock, label: 'End-to-End Encrypted' },
                { icon: ShieldCheck, label: 'Insured Delivery' },
                { icon: Fingerprint, label: 'Biometric Verified' },
              ].map((t) => (
                <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 0' }}>
                  <t.icon size={12} color={MUTED} />
                  <span style={{ fontFamily: BODY, fontSize: 10, color: MUTED, letterSpacing: '0.05em' }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
