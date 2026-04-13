'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { VaultLayout } from './vault/VaultLayout'
import { ArrowRight, Diamond, Shield, Award, Clock, Star, ChevronRight } from 'lucide-react'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const categories = [
  { name: 'Diamond Rings', slug: 'diamond-rings', image: '/images/vault/diamond-ring-dark-1.jpg', count: '24 Pieces' },
  { name: 'Gold Rings', slug: 'gold-rings', image: '/images/vault/gold-flatlay-dark.jpg', count: '18 Pieces' },
  { name: 'Necklaces', slug: 'necklaces', image: '/images/vault/gold-necklace-dark-1.jpg', count: '16 Pieces' },
  { name: 'Earrings', slug: 'earrings', image: '/images/vault/diamond-earring-dark-1.jpg', count: '20 Pieces' },
  { name: 'Bracelets', slug: 'bracelets', image: '/images/vault/gold-bracelets-dark-3.jpg', count: '12 Pieces' },
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function VaultHome({ concept }: { concept: ConceptConfig }) {
  const bestsellers = getBestsellers().slice(0, 4)
  const newArrivals = getNewArrivals().slice(0, 4)
  const [gateOpen, setGateOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setGateOpen(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const cat = useInView()
  const feat = useInView()
  const craft = useInView()
  const trust = useInView()
  const arrivals = useInView()
  const newsletter = useInView()

  return (
    <VaultLayout>
      <style jsx global>{`
        .vault-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .vault-reveal.visible { opacity: 1; transform: translateY(0); }
        .vault-card { transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .vault-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(212,175,55,0.1); }
        .vault-img-zoom { transition: transform 0.6s ease; }
        .vault-img-zoom:hover { transform: scale(1.05); }
        .vault-gold-border { border: 1px solid rgba(212,175,55,0.15); transition: border-color 0.3s ease; }
        .vault-gold-border:hover { border-color: rgba(212,175,55,0.4); }
      `}</style>

      {/* VAULT GATE HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/vault/diamond-macro-dark.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.3)', transform: 'scale(1.1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 60%)' }} />

        {/* Vault Gate Animation */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', zIndex: 10, pointerEvents: gateOpen ? 'none' : 'auto' }}>
          <div style={{
            width: '50%', height: '100%', backgroundColor: '#050505',
            borderRight: '1px solid rgba(212,175,55,0.3)',
            transition: 'transform 1.2s cubic-bezier(0.65,0,0.35,1)',
            transform: gateOpen ? 'translateX(-100%)' : 'translateX(0)',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 40,
          }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 48, color: GOLD, letterSpacing: '0.2em', opacity: gateOpen ? 0 : 1, transition: 'opacity 0.5s ease' }}>THE</span>
          </div>
          <div style={{
            width: '50%', height: '100%', backgroundColor: '#050505',
            borderLeft: '1px solid rgba(212,175,55,0.3)',
            transition: 'transform 1.2s cubic-bezier(0.65,0,0.35,1)',
            transform: gateOpen ? 'translateX(100%)' : 'translateX(0)',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 40,
          }}>
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 48, color: GOLD, letterSpacing: '0.2em', opacity: gateOpen ? 0 : 1, transition: 'opacity 0.5s ease' }}>VAULT</span>
          </div>
        </div>

        {/* Hero Content */}
        <div style={{
          position: 'relative', zIndex: 5, textAlign: 'center', maxWidth: 800, padding: '0 24px',
          opacity: gateOpen ? 1 : 0, transform: gateOpen ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s ease 0.8s',
        }}>
          <div style={{ fontSize: 11, letterSpacing: '0.4em', color: GOLD, textTransform: 'uppercase', marginBottom: 24, fontWeight: 500 }}>Access Granted</div>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 24, color: TEXT }}>
            Where Rarity<br /><span style={{ color: GOLD }}>Meets Perfection</span>
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(234,234,234,0.6)', maxWidth: 500, margin: '0 auto 40px' }}>
            A curated sanctuary of the world&apos;s most extraordinary diamonds and fine jewelry, reserved for the discerning few.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/vault/collections" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 40px', backgroundColor: GOLD, color: BG,
              textDecoration: 'none', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 4,
            }}>
              Enter the Vault <ArrowRight size={16} />
            </Link>
            <Link href="/vault/bespoke" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 40px', backgroundColor: 'transparent',
              border: '1px solid rgba(212,175,55,0.4)', color: GOLD,
              textDecoration: 'none', fontSize: 13, fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 4,
            }}>
              Commission a Piece
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: gateOpen ? 1 : 0, transition: 'opacity 1s ease 1.5s',
        }}>
          <span style={{ fontSize: 10, letterSpacing: '0.3em', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase' }}>Scroll to Explore</span>
          <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${GOLD}, transparent)`, animation: 'vaultPulse 2s ease infinite' }} />
        </div>
      </section>

      {/* CATEGORIES */}
      <section ref={cat.ref} className={`vault-reveal ${cat.visible ? 'visible' : ''}`} style={{ padding: '100px 24px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Curated Collections</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Explore the Vault</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {categories.map((c, i) => (
            <Link key={c.slug} href={`/vault/category/${c.slug}`} style={{ textDecoration: 'none' }}>
              <div className="vault-card vault-gold-border" style={{
                position: 'relative', borderRadius: 8, overflow: 'hidden',
                aspectRatio: i === 0 ? '1/1.2' : '1/1', backgroundColor: SURFACE,
              }}>
                <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} className="vault-img-zoom" />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <div style={{ fontSize: 10, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{c.count}</div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, color: TEXT, fontWeight: 500 }}>{c.name}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED HERO PRODUCT */}
      <section ref={feat.ref} className={`vault-reveal ${feat.visible ? 'visible' : ''}`} style={{ padding: '80px 24px', backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 8, overflow: 'hidden' }} className="vault-gold-border">
            <img src="/images/vault/diamond-ring-dark-3.jpg" alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', top: 20, left: 20, padding: '6px 16px', backgroundColor: GOLD, color: BG, fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>Featured Piece</div>
          </div>
          <div style={{ padding: '20px 0' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Signature Collection</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 36, fontWeight: 400, color: TEXT, marginTop: 12, marginBottom: 16, lineHeight: 1.2 }}>
              {bestsellers[0]?.name || 'Celestial Solitaire'}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(234,234,234,0.6)', marginBottom: 32 }}>
              {bestsellers[0]?.description?.slice(0, 200) || 'A breathtaking masterpiece that captures the essence of timeless elegance. Each facet engineered to maximize brilliance and fire.'}...
            </p>
            {bestsellers[0]?.diamondSpecs && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
                {[
                  { label: 'Carat', value: bestsellers[0].diamondSpecs.carat },
                  { label: 'Cut', value: bestsellers[0].diamondSpecs.cut },
                  { label: 'Color', value: bestsellers[0].diamondSpecs.color },
                  { label: 'Clarity', value: bestsellers[0].diamondSpecs.clarity },
                ].map((spec) => (
                  <div key={spec.label} style={{ padding: 16, backgroundColor: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 6 }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(234,234,234,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>{spec.label}</div>
                    <div style={{ fontSize: 20, fontFamily: 'Cinzel, serif', color: GOLD, fontWeight: 500 }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 32 }}>
              <span style={{ fontSize: 28, fontFamily: 'Cinzel, serif', color: TEXT }}>{bestsellers[0]?.priceDisplay || '$12,500'}</span>
              <span style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', letterSpacing: '0.1em' }}>GIA Certified</span>
            </div>
            <Link href={`/vault/product/${bestsellers[0]?.slug || 'celestial-diamond-ring'}`} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 40px', backgroundColor: GOLD, color: BG,
              textDecoration: 'none', fontSize: 13, fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 4,
            }}>
              Secure This Piece <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP */}
      <section ref={craft.ref} className={`vault-reveal ${craft.visible ? 'visible' : ''}`} style={{ padding: '100px 24px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>The Art Behind the Vault</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 36, fontWeight: 400, color: TEXT, marginTop: 12, marginBottom: 24, lineHeight: 1.2 }}>
              Centuries of Mastery,<br />One Perfect Piece
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(234,234,234,0.6)', marginBottom: 32 }}>
              Every piece in the Vault is the culmination of generations of expertise. Our master artisans combine time-honored techniques with cutting-edge precision to create jewelry that transcends the ordinary.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: Diamond, title: 'Hand-Selected Stones', desc: 'Each diamond examined by our master gemologists' },
                { icon: Shield, title: 'GIA Certified', desc: 'Every stone independently graded and certified' },
                { icon: Award, title: 'Lifetime Guarantee', desc: 'Complimentary maintenance and care for life' },
              ].map((item) => (
                <div key={item.title} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/vault/craftsmanship" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 32,
              color: GOLD, textDecoration: 'none', fontSize: 13, fontWeight: 500,
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              Discover Our Process <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 8, overflow: 'hidden' }} className="vault-gold-border">
            <img src="/images/vault/diamond-texture-dark.jpg" alt="Craftsmanship" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* TRUST METRICS */}
      <section ref={trust.ref} className={`vault-reveal ${trust.visible ? 'visible' : ''}`} style={{ padding: '80px 24px', backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, textAlign: 'center' }}>
          {[
            { value: '50+', label: 'Years of Excellence', icon: Clock },
            { value: '10,000+', label: 'Pieces Crafted', icon: Diamond },
            { value: '4.9/5', label: 'Client Rating', icon: Star },
            { value: '100%', label: 'GIA Certified', icon: Shield },
          ].map((m) => (
            <div key={m.label} style={{ padding: 32 }}>
              <m.icon size={24} color={GOLD} style={{ margin: '0 auto 16px', display: 'block' }} />
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 32, color: GOLD, fontWeight: 500, marginBottom: 8 }}>{m.value}</div>
              <div style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)', letterSpacing: '0.05em' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section style={{ padding: '100px 24px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Most Coveted</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 36, fontWeight: 400, color: TEXT, marginTop: 8 }}>Bestsellers</h2>
          </div>
          <Link href="/vault/collections" style={{ color: GOLD, textDecoration: 'none', fontSize: 13, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6 }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {bestsellers.map((p) => (
            <Link key={p.slug} href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div className="vault-card vault-gold-border" style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: SURFACE }}>
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                  <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} className="vault-img-zoom" />
                  {p.isNew && (
                    <span style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', backgroundColor: GOLD, color: BG, fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', borderRadius: 2 }}>New</span>
                  )}
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{p.category.replace(/-/g, ' ')}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)', marginBottom: 12 }}>{p.subtitle}</div>
                  <div style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: TEXT }}>{p.priceDisplay}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section ref={arrivals.ref} className={`vault-reveal ${arrivals.visible ? 'visible' : ''}`} style={{ padding: '80px 24px 100px', backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Just Arrived</span>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 36, fontWeight: 400, color: TEXT, marginTop: 8 }}>New Arrivals</h2>
            </div>
            <Link href="/vault/collections" style={{ color: GOLD, textDecoration: 'none', fontSize: 13, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 6 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {newArrivals.map((p) => (
              <Link key={p.slug} href={`/vault/product/${p.slug}`} style={{ textDecoration: 'none' }}>
                <div className="vault-card vault-gold-border" style={{ borderRadius: 8, overflow: 'hidden', backgroundColor: BG }}>
                  <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                    <img src={p.images[0]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)' }} className="vault-img-zoom" />
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.15em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{p.category.replace(/-/g, ' ')}</div>
                    <div style={{ fontSize: 15, fontWeight: 500, color: TEXT, marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: 'rgba(234,234,234,0.5)', marginBottom: 12 }}>{p.subtitle}</div>
                    <div style={{ fontSize: 16, fontFamily: 'Cinzel, serif', color: TEXT }}>{p.priceDisplay}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section ref={newsletter.ref} className={`vault-reveal ${newsletter.visible ? 'visible' : ''}`} style={{ padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Diamond size={32} color={GOLD} style={{ margin: '0 auto 20px', display: 'block' }} />
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 32, fontWeight: 400, color: TEXT, marginBottom: 16 }}>Exclusive Access</h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: 'rgba(234,234,234,0.5)', marginBottom: 32 }}>
            Be the first to discover new arrivals, limited editions, and private events. Reserved for members of the Vault.
          </p>
          <div style={{ display: 'flex', gap: 8, maxWidth: 460, margin: '0 auto' }}>
            <input type="email" placeholder="Your email address" style={{
              flex: 1, padding: '14px 20px', backgroundColor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(212,175,55,0.2)', borderRadius: 4, color: TEXT, fontSize: 14, outline: 'none',
            }} />
            <button style={{
              padding: '14px 32px', backgroundColor: GOLD, color: BG,
              border: 'none', borderRadius: 4, fontSize: 13, fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
            }}>Join</button>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(234,234,234,0.3)', marginTop: 16 }}>
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </VaultLayout>
  )
}
