'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { allCategories, categoryLabels } from '@/data/concepts'
import { MarketplaceLayout, MK, RevealSection, StaggerItem, MarketplaceSection, SectionLabel, LotDivider, UrgencyBadge } from './marketplace/MarketplaceLayout'
import { MarketplaceButton, LotCard, CountdownTimer, StatCard } from './marketplace/ui'
import { ArrowRight, Shield, Truck, RotateCcw, Gavel, TrendingUp, Globe, Users, Award, Bell } from 'lucide-react'

export function MarketplaceHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)
  const newArrivals = getNewArrivals().slice(0, 4)

  return (
    <MarketplaceLayout>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(135deg, ${MK.bg} 0%, ${MK.bgAlt} 50%, ${MK.bg} 100%)`,
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/marketplace/dark-luxury.jpg" alt="Marketplace" fill style={{ objectFit: 'cover', opacity: 0.15 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 40%, ${MK.glow} 0%, transparent 50%)` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%' }}>
          <div style={{ maxWidth: 640 }}>
            <div className="marketplace-hero-fade-1" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <SectionLabel label="The Marketplace of Rarity" />
              <UrgencyBadge text="Live Auction" />
            </div>
            <h1 className="marketplace-hero-fade-1" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '3.5rem', fontWeight: 800,
              color: MK.text, margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.02em',
            }}>
              Where Rarity<br />Finds Its Next<br />Custodian
            </h1>
            <p className="marketplace-hero-fade-2" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
              color: MK.textSecondary, lineHeight: 1.7, marginBottom: 32, maxWidth: 480,
            }}>
              The premier marketplace for authenticated, exceptional jewelry. Bid with confidence. Collect with passion. Every piece verified, every transaction protected.
            </p>
            <div className="marketplace-hero-fade-3" style={{ display: 'flex', gap: 12 }}>
              <MarketplaceButton href="/marketplace/collections" size="lg">
                <Gavel size={14} /> Browse Current Lots
              </MarketplaceButton>
              <MarketplaceButton href="/marketplace/bespoke" variant="secondary" size="lg">
                Consign a Piece
              </MarketplaceButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: LIVE AUCTION BANNER ═══ */}
      <section style={{ background: MK.surface, borderBottom: `1px solid ${MK.border}`, padding: '28px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: MK.success, animation: 'marketplace-pulse 2s infinite' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MK.success }}>LIVE</span>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text }}>Rare Colored Diamonds — 42 lots</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <CountdownTimer days={2} hours={14} minutes={32} seconds={17} />
            <MarketplaceButton href="/marketplace/craftsmanship" size="sm"><Gavel size={12} /> Join Auction</MarketplaceButton>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 3: STATS ═══ */}
      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            <StatCard value="$2.4B" label="Total Sales Volume" icon={<TrendingUp size={20} />} trend="+18% YoY" />
            <StatCard value="47K+" label="Registered Collectors" icon={<Users size={20} />} trend="+2.4K this month" />
            <StatCard value="99.8%" label="Authentication Rate" icon={<Shield size={20} />} />
            <StatCard value="142" label="Countries Served" icon={<Globe size={20} />} />
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* ═══ SECTION 4: FEATURED LOTS ═══ */}
      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <SectionLabel label="Featured Lots" style={{ marginBottom: 12 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.8rem', fontWeight: 700, color: MK.text, margin: 0 }}>
                Trending Now
              </h2>
            </div>
            <MarketplaceButton href="/marketplace/collections" variant="ghost" size="sm">
              View All <ArrowRight size={12} />
            </MarketplaceButton>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {featured.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <LotCard
                image={product.images[0]}
                title={product.name}
                subtitle={product.subtitle}
                price={product.price}
                href={`/marketplace/product/${product.slug}`}
                lotNumber={String(100 + i)}
                bids={Math.floor(Math.random() * 20) + 5}
                endingSoon={i < 2}
              />
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>

      {/* ═══ SECTION 5: AUTHENTICATION SPLIT ═══ */}
      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel label="Trust & Verification" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text, margin: '0 0 16px', lineHeight: 1.2 }}>
                47-Point Authentication
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Every piece that enters our marketplace undergoes the most rigorous authentication process in the industry. Our team of GIA-certified gemologists, provenance researchers, and materials scientists ensure absolute confidence in every acquisition.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 28 }}>
                {[
                  { val: '47', label: 'Verification Points' },
                  { val: '99.8%', label: 'Accuracy Rate' },
                  { val: '24hr', label: 'Turnaround' },
                ].map((stat, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${MK.accent}40`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.3rem', fontWeight: 700, color: MK.accent }}>{stat.val}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.55rem', fontWeight: 500, color: MK.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <MarketplaceButton href="/marketplace/grading" variant="secondary">
                Learn More <ArrowRight size={12} />
              </MarketplaceButton>
            </div>
            <div style={{ position: 'relative', height: 480, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/marketplace/rare-emerald.jpg" alt="Authentication" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* ═══ SECTION 6: CATEGORIES ═══ */}
      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <SectionLabel label="Browse" style={{ marginBottom: 12, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.8rem', fontWeight: 700, color: MK.text }}>
              Shop by Category
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {allCategories.map((cat, i) => (
            <StaggerItem key={cat} index={i % 5}>
              <Link href={`/marketplace/category/${cat}`} style={{ textDecoration: 'none' }}>
                <div className="marketplace-card-hover" style={{
                  background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4,
                  padding: 16, textAlign: 'center', cursor: 'pointer',
                }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: MK.text }}>
                    {categoryLabels[cat]}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>

      {/* ═══ SECTION 7: NEW ARRIVALS ═══ */}
      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <SectionLabel label="Just Listed" style={{ marginBottom: 12 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.8rem', fontWeight: 700, color: MK.text, margin: 0 }}>
                New Arrivals
              </h2>
            </div>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {newArrivals.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <Link href={`/marketplace/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div className="marketplace-card-hover" style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 8, right: 8, background: `${MK.accent}e0`, padding: '3px 8px', borderRadius: 2 }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 700, color: MK.text, letterSpacing: '0.08em', textTransform: 'uppercase' }}>NEW</span>
                    </div>
                  </div>
                  <div style={{ padding: 14 }}>
                    <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text, margin: '0 0 4px' }}>{product.name}</h3>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 700, color: MK.accent }}>${product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </MarketplaceSection>

      {/* ═══ SECTION 8: CONSIGNMENT CTA ═══ */}
      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 400, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/marketplace/heritage-piece.jpg" alt="Consignment" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <SectionLabel label="Sell With Us" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>
                Consign Your Pieces
              </h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Reach 47,000+ verified collectors worldwide. Our expert team handles authentication, photography, cataloging, and secure delivery — so you can focus on what matters.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                  { val: '10%', label: 'Starting Commission' },
                  { val: '7 Days', label: 'Payment After Sale' },
                ].map((stat, i) => (
                  <div key={i} style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 14 }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: MK.accent }}>{stat.val}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', color: MK.textSecondary }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <MarketplaceButton href="/marketplace/bespoke">
                Start Consignment <ArrowRight size={12} />
              </MarketplaceButton>
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* ═══ SECTION 9: GUARANTEES ═══ */}
      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { icon: <Shield size={24} />, title: 'Authenticated', desc: 'Every piece verified through our 47-point process with GIA/AGS certification.' },
              { icon: <Truck size={24} />, title: 'Insured Delivery', desc: 'Fully insured, GPS-tracked shipping with signature requirement worldwide.' },
              { icon: <RotateCcw size={24} />, title: 'Buyer Protection', desc: 'Full refund if item differs materially from description. 14-day guarantee.' },
              { icon: <Award size={24} />, title: 'Expert Support', desc: 'Dedicated specialists available 7 days a week for acquisition guidance.' },
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ color: MK.accent, marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MK.text, margin: '0 0 6px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* ═══ SECTION 10: CTA ═══ */}
      <section style={{
        position: 'relative', padding: '80px 0',
        background: `linear-gradient(rgba(13,17,23,0.9), rgba(13,17,23,0.95)), url('/images/marketplace/vault-door.jpg') center/cover`,
        textAlign: 'center',
      }}>
        <RevealSection>
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 32px' }}>
            <Bell size={24} color={MK.accent} style={{ margin: '0 auto 12px' }} />
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>
              Never Miss a Rare Find
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary, lineHeight: 1.7, marginBottom: 28 }}>
              Register for auction alerts and be the first to know when exceptional pieces become available.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <MarketplaceButton href="/marketplace/account" size="lg">
                Create Account
              </MarketplaceButton>
              <MarketplaceButton href="/marketplace/contact" variant="secondary" size="lg">
                Contact Specialists
              </MarketplaceButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </MarketplaceLayout>
  )
}
