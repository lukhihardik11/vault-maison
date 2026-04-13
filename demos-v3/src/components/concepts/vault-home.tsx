'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { VaultLayout } from './vault/VaultLayout'
import { CinematicHero } from './vault/ui/CinematicHero'
import { SparkleGlowButton } from './vault/ui/SparkleGlowButton'
import { ElegantDarkButton } from './vault/ui/ElegantDarkButton'
import { DarkNeumorphicInput } from './vault/ui/DarkNeumorphicInput'
import { VaultProductRevealCard } from './vault/ui/VaultProductRevealCard'
import { VaultHoverPeek } from './vault/ui/VaultHoverPeek'
import { VaultFeatureBucket } from './vault/ui/VaultFeatureBucket'
import { ArrowRight, Diamond, Shield, Award, Clock, Star, ChevronRight, Sparkles } from 'lucide-react'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
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
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Open gate after a short delay; also set a safety fallback
    const timer = setTimeout(() => setGateOpen(true), 600)
    // Safety: force gate open after 2s even if something goes wrong
    const safety = setTimeout(() => setGateOpen(true), 2000)
    return () => { clearTimeout(timer); clearTimeout(safety) }
  }, [])

  const cat = useInView()
  const feat = useInView()
  const bucket = useInView()
  const best = useInView()
  const arrivals = useInView()
  const newsletter = useInView()

  return (
    <VaultLayout>
      <style jsx global>{`
        @keyframes vaultGateFallback { 0%,80% { opacity: 1; } 100% { opacity: 0; pointer-events: none; } }
        .vault-gate-overlay { animation: vaultGateFallback 2.5s ease forwards; }
        .vault-reveal { opacity: 0; transform: translateY(40px); transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
        .vault-reveal.visible { opacity: 1; transform: translateY(0); }
        .vault-card { position: relative; transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .vault-card:hover { transform: translateY(-4px) scale(1.02); box-shadow: 0 8px 30px rgba(212,175,55,0.1); }
        .vault-card .vault-card-shine-inner { position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity 0.3s ease; z-index: 5; background: radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212,175,55,0.1), transparent 40%); }
        .vault-card:hover .vault-card-shine-inner { opacity: 1; }
        .vault-img-zoom { transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
        .vault-img-zoom:hover { transform: scale(1.03); }
        .vault-gold-border { border: 1px solid rgba(212,175,55,0.12); transition: border-color 0.4s ease; }
        .vault-gold-border:hover { border-color: rgba(212,175,55,0.35); }
        .vault-section-divider {
          width: 60px; height: 1px; margin: 0 auto 40px;
          background: linear-gradient(90deg, transparent, ${GOLD}, transparent);
        }
        .vault-hover-link { position: relative; display: inline-flex; align-items: center; gap: 6px; color: ${GOLD}; text-decoration: none; font-size: 13px; letter-spacing: 0.1em; transition: all 0.3s ease; }
        .vault-hover-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: ${GOLD}; transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .vault-hover-link:hover::after { width: 100%; }
        .vault-hover-link:hover { color: #E8C84A; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════
          VAULT GATE + CINEMATIC HERO
      ═══════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="vault-gate-overlay" style={{
          position: 'absolute', inset: 0, display: 'flex', zIndex: 20,
          pointerEvents: gateOpen ? 'none' : 'auto',
          opacity: gateOpen ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}>
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
        <CinematicHero
          heroImage="/images/vault/diamond-macro-dark.jpg"
          brandName="VAULT MAISON"
          tagline="Where rarity meets perfection"
          ctaText="Enter the Vault"
          onCtaClick={() => window.location.href = '/vault/collections'}
        />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CATEGORIES — with HoverPeek on category links
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={cat.ref} className={`vault-reveal ${cat.visible ? 'visible' : ''}`} style={{ padding: '120px 24px 100px', maxWidth: 1440, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Curated Collections</span>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 400, color: TEXT, marginTop: 12, marginBottom: 0 }}>Explore the Vault</h2>
          <div className="vault-section-divider" style={{ marginTop: 20 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {categories.map((c, i) => (
            <VaultHoverPeek key={c.slug} imageSrc={c.image} label={`${c.count} — ${c.name}`}>
              <Link href={`/vault/category/${c.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div className="vault-card vault-gold-border" style={{
                  position: 'relative', borderRadius: 8, overflow: 'hidden',
                  aspectRatio: i === 0 ? '1/1.2' : '1/1', backgroundColor: SURFACE,
                }} onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}>
                  <div className="vault-card-shine-inner" />
                  <img src={c.image} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} className="vault-img-zoom" />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24, background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)' }}>
                    <div style={{ fontSize: 10, letterSpacing: '0.2em', color: GOLD, textTransform: 'uppercase', marginBottom: 6 }}>{c.count}</div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 18, color: TEXT, fontWeight: 500 }}>{c.name}</div>
                  </div>
                </div>
              </Link>
            </VaultHoverPeek>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED HERO PRODUCT — with premium layout
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={feat.ref} className={`vault-reveal ${feat.visible ? 'visible' : ''}`} style={{ padding: '100px 24px', backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div style={{ position: 'relative', aspectRatio: '4/5', borderRadius: 12, overflow: 'hidden' }} className="vault-gold-border">
            <img src="/images/vault/diamond-ring-dark-3.jpg" alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.4) 0%, transparent 50%)' }} />
            <div style={{
              position: 'absolute', top: 20, left: 20,
              padding: '6px 18px',
              background: `linear-gradient(135deg, ${GOLD}, #B8962E)`,
              color: BG, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
              textTransform: 'uppercase', borderRadius: 2,
            }}>
              <Sparkles size={10} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Featured Piece
            </div>
          </div>
          <div style={{ padding: '20px 0' }}>
            <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Signature Collection</span>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 400, color: TEXT, marginTop: 12, marginBottom: 16, lineHeight: 1.2 }}>
              {bestsellers[0]?.name || 'Celestial Solitaire'}
            </h2>
            <div style={{ width: 40, height: 1, background: GOLD, marginBottom: 20, opacity: 0.5 }} />
            <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(234,234,234,0.55)', marginBottom: 32 }}>
              {bestsellers[0]?.description?.slice(0, 200) || 'A breathtaking masterpiece that captures the essence of timeless elegance.'}...
            </p>
            {bestsellers[0]?.diamondSpecs && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 36 }}>
                {[
                  { label: 'Carat', value: bestsellers[0].diamondSpecs.carat },
                  { label: 'Cut', value: bestsellers[0].diamondSpecs.cut },
                  { label: 'Color', value: bestsellers[0].diamondSpecs.color },
                  { label: 'Clarity', value: bestsellers[0].diamondSpecs.clarity },
                ].map((spec) => (
                  <div key={spec.label} style={{
                    padding: '14px 16px',
                    backgroundColor: 'rgba(212,175,55,0.04)',
                    border: '1px solid rgba(212,175,55,0.1)',
                    borderRadius: 8,
                    transition: 'all 0.3s ease',
                  }}>
                    <div style={{ fontSize: 9, letterSpacing: '0.25em', color: 'rgba(234,234,234,0.35)', textTransform: 'uppercase', marginBottom: 4 }}>{spec.label}</div>
                    <div style={{ fontSize: 20, fontFamily: 'Cinzel, serif', color: GOLD, fontWeight: 500 }}>{spec.value}</div>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
              <span style={{ fontSize: 28, fontFamily: 'Cinzel, serif', color: TEXT }}>{bestsellers[0]?.priceDisplay || '$12,500'}</span>
              <span style={{ fontSize: 11, color: 'rgba(234,234,234,0.35)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>GIA Certified</span>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <SparkleGlowButton href={`/vault/product/${bestsellers[0]?.slug || 'celestial-diamond-ring'}`}>
                Secure This Piece
              </SparkleGlowButton>
              <ElegantDarkButton href="/vault/bespoke">
                Commission Custom
              </ElegantDarkButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          VAULT FEATURE BUCKET — animated trust features
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={bucket.ref} className={`vault-reveal ${bucket.visible ? 'visible' : ''}`} style={{ padding: '120px 24px' }}>
        <VaultFeatureBucket />
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          BESTSELLERS — with VaultProductRevealCard
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={best.ref} className={`vault-reveal ${best.visible ? 'visible' : ''}`} style={{ padding: '100px 24px', backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Most Coveted</span>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 400, color: TEXT, marginTop: 8 }}>Bestsellers</h2>
            </div>
            <Link href="/vault/collections" className="vault-hover-link">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {bestsellers.map((p) => (
              <VaultProductRevealCard
                key={p.slug}
                name={p.name}
                price={p.priceDisplay}
                image={p.images[0]}
                description={p.description?.slice(0, 140) || 'A masterpiece of fine jewelry craftsmanship.'}
                category={p.category.replace(/-/g, ' ')}
                href={`/vault/product/${p.slug}`}
                isNew={p.isNew}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NEW ARRIVALS — with VaultProductRevealCard
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={arrivals.ref} className={`vault-reveal ${arrivals.visible ? 'visible' : ''}`} style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Just Arrived</span>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(28px, 3.5vw, 38px)', fontWeight: 400, color: TEXT, marginTop: 8 }}>New Arrivals</h2>
            </div>
            <Link href="/vault/collections" className="vault-hover-link">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {newArrivals.map((p) => (
              <VaultProductRevealCard
                key={p.slug}
                name={p.name}
                price={p.priceDisplay}
                image={p.images[0]}
                description={p.description?.slice(0, 140) || 'A masterpiece of fine jewelry craftsmanship.'}
                category={p.category.replace(/-/g, ' ')}
                href={`/vault/product/${p.slug}`}
                isNew={p.isNew}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NEWSLETTER — premium with DarkNeumorphicInput + SparkleGlowButton
      ═══════════════════════════════════════════════════════════════ */}
      <section ref={newsletter.ref} className={`vault-reveal ${newsletter.visible ? 'visible' : ''}`} style={{ padding: '120px 24px', textAlign: 'center', backgroundColor: SURFACE }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', margin: '0 auto 24px',
            backgroundColor: 'rgba(212,175,55,0.06)',
            border: '1px solid rgba(212,175,55,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Diamond size={24} color={GOLD} />
          </div>
          <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 400, color: TEXT, marginBottom: 16 }}>Exclusive Access</h2>
          <div className="vault-section-divider" />
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(234,234,234,0.5)', marginBottom: 36 }}>
            Be the first to discover new arrivals, limited editions, and private events. Reserved for members of the Vault.
          </p>
          <div style={{ display: 'flex', gap: 12, maxWidth: 500, margin: '0 auto', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <DarkNeumorphicInput
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <SparkleGlowButton onClick={() => setEmail('')}>
              Join
            </SparkleGlowButton>
          </div>
          <p style={{ fontSize: 11, color: 'rgba(234,234,234,0.25)', marginTop: 16, letterSpacing: '0.03em' }}>
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </VaultLayout>
  )
}
