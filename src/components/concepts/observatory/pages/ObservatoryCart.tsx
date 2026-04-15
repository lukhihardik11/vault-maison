'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, Microscope, ArrowRight, Zap, Activity } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const CYAN = '#00E5FF'
const BG = '#0D1B2A'
const SURFACE = '#112240'
const TEXT = '#FFFFFF'
const MUTED = '#8892B0'
const BORDER = '#1B3A5C'
const FONT = "'IBM Plex Mono', monospace"
const BODY = "'Inter', sans-serif"

export function ObservatoryCart() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore()
  const [analysisMode, setAnalysisMode] = useState(false)

  const subtotal = getTotal()
  const certificationFee = items.length * 25
  const shipping = subtotal > 750 ? 0 : 30
  const total = subtotal + certificationFee + shipping

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: BG, padding: 40 }}>
        <Microscope size={40} color={MUTED} style={{ marginBottom: 24 }} />
        <h2 style={{ fontFamily: FONT, fontSize: 20, color: TEXT, marginBottom: 8, letterSpacing: '0.05em' }}>NO SPECIMENS IN QUEUE</h2>
        <p style={{ fontFamily: BODY, fontSize: 13, color: MUTED, marginBottom: 32 }}>Your observation queue is empty.</p>
        <Link href="/observatory/collections" style={{ fontFamily: FONT, fontSize: 12, color: CYAN, textDecoration: 'none', letterSpacing: '0.1em', borderBottom: `1px solid ${CYAN}`, paddingBottom: 4 }}>
          BEGIN OBSERVATION →
        </Link>
      </div>
    )
  }

  return (
    <div style={{ background: BG, minHeight: '100vh', color: TEXT }}>
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: '32px 24px', background: `linear-gradient(180deg, ${SURFACE} 0%, ${BG} 100%)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: CYAN, boxShadow: `0 0 8px ${CYAN}` }} />
            <span style={{ fontFamily: FONT, fontSize: 11, color: CYAN, letterSpacing: '0.15em' }}>OBSERVATION QUEUE — ACTIVE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h1 style={{ fontFamily: FONT, fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 600, color: TEXT, letterSpacing: '0.02em' }}>
              Specimen Analysis Queue
            </h1>
            <div style={{ display: 'flex', gap: 24, fontFamily: FONT, fontSize: 12 }}>
              <div><span style={{ color: MUTED }}>SPECIMENS: </span><span style={{ color: CYAN }}>{getItemCount()}</span></div>
              <div><span style={{ color: MUTED }}>VALUE: </span><span style={{ color: CYAN }}>${subtotal.toLocaleString()}</span></div>
              <div><span style={{ color: MUTED }}>STATUS: </span><span style={{ color: '#4CAF50' }}>PENDING</span></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, padding: '12px 16px', background: SURFACE, border: `1px solid ${BORDER}` }}>
            <span style={{ fontFamily: FONT, fontSize: 11, color: MUTED, letterSpacing: '0.1em' }}>ANALYSIS VIEW</span>
            <button onClick={() => setAnalysisMode(!analysisMode)} style={{
              padding: '6px 16px', background: analysisMode ? CYAN : 'transparent',
              border: `1px solid ${analysisMode ? CYAN : BORDER}`, cursor: 'pointer',
              fontFamily: FONT, fontSize: 11, color: analysisMode ? BG : MUTED, letterSpacing: '0.05em',
            }}>
              {analysisMode ? 'ON' : 'OFF'}
            </button>
          </div>

          {items.map((item, idx) => (
            <div key={item.product.id} style={{
              display: 'grid', gridTemplateColumns: '100px 1fr', gap: 20, padding: 20,
              marginBottom: 12, background: SURFACE, border: `1px solid ${BORDER}`, position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 8, right: 12, fontFamily: FONT, fontSize: 10, color: MUTED }}>
                SPEC-{String(idx + 1).padStart(3, '0')}
              </div>

              <div style={{ position: 'relative', width: 100, height: 120, border: `1px solid ${BORDER}` }}>
                <Image src={item.product.images[0]} alt={item.product.name} fill style={{ objectFit: 'cover' }} />
                {analysisMode && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,229,255,0.1)', border: `1px solid ${CYAN}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 20, height: 20, border: `1px solid ${CYAN}`, borderRadius: '50%' }}>
                      <div style={{ width: 1, height: '100%', background: CYAN, margin: '0 auto' }} />
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h3 style={{ fontFamily: FONT, fontSize: 14, fontWeight: 600, color: TEXT, marginBottom: 4, letterSpacing: '0.02em' }}>{item.product.name}</h3>
                <p style={{ fontFamily: BODY, fontSize: 12, color: MUTED, marginBottom: 8 }}>{item.product.material} · {item.product.category}</p>

                {analysisMode && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 12, padding: '8px 0', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
                    <div>
                      <div style={{ fontFamily: FONT, fontSize: 9, color: MUTED, letterSpacing: '0.1em' }}>GRADE</div>
                      <div style={{ fontFamily: FONT, fontSize: 13, color: CYAN }}>AAA+</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: FONT, fontSize: 9, color: MUTED, letterSpacing: '0.1em' }}>CLARITY</div>
                      <div style={{ fontFamily: FONT, fontSize: 13, color: CYAN }}>VVS1</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: FONT, fontSize: 9, color: MUTED, letterSpacing: '0.1em' }}>ORIGIN</div>
                      <div style={{ fontFamily: FONT, fontSize: 13, color: CYAN }}>Verified</div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <button onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                      style={{ width: 28, height: 28, background: BG, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Minus size={10} />
                    </button>
                    <div style={{ width: 36, height: 28, background: BG, border: `1px solid ${BORDER}`, borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 12, color: CYAN }}>
                      {item.quantity}
                    </div>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      style={{ width: 28, height: 28, background: BG, border: `1px solid ${BORDER}`, color: TEXT, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Plus size={10} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontFamily: FONT, fontSize: 16, color: CYAN }}>${(item.product.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeItem(item.product.id)}
                      style={{ background: 'none', border: `1px solid ${BORDER}`, color: MUTED, cursor: 'pointer', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <X size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ position: 'sticky', top: 100 }}>
          <div style={{ background: SURFACE, border: `1px solid ${BORDER}`, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Activity size={14} color={CYAN} />
              <span style={{ fontFamily: FONT, fontSize: 11, color: CYAN, letterSpacing: '0.1em' }}>ACQUISITION SUMMARY</span>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20, fontFamily: FONT, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: MUTED }}>Subtotal</span><span style={{ color: TEXT }}>${subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: MUTED }}>Certification ({items.length}x)</span><span style={{ color: TEXT }}>${certificationFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: MUTED }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#4CAF50' : TEXT }}>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
              </div>
              <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${CYAN}, transparent)`, margin: '16px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
                <span style={{ fontFamily: FONT, fontSize: 11, color: MUTED, letterSpacing: '0.1em' }}>TOTAL</span>
                <span style={{ fontFamily: FONT, fontSize: 24, color: CYAN }}>${total.toLocaleString()}</span>
              </div>
              <Link href="/observatory/checkout" style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%', height: 48, background: CYAN, border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  <Zap size={14} color={BG} />
                  <span style={{ fontFamily: FONT, fontSize: 12, letterSpacing: '0.1em', color: BG, fontWeight: 600 }}>INITIATE ACQUISITION</span>
                  <ArrowRight size={14} color={BG} />
                </button>
              </Link>
              <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {[
                  { label: 'GIA CERTIFIED', value: '100%' },
                  { label: 'INSURED', value: 'FULL' },
                  { label: 'TRACKING', value: 'LIVE' },
                  { label: 'ENCRYPTION', value: 'AES-256' },
                ].map(m => (
                  <div key={m.label} style={{ padding: '8px 10px', background: BG, border: `1px solid ${BORDER}` }}>
                    <div style={{ fontFamily: FONT, fontSize: 9, color: MUTED, letterSpacing: '0.1em', marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontFamily: FONT, fontSize: 12, color: CYAN }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
