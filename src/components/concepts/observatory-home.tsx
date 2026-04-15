'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals, products } from '@/data/products'
import { allCategories, categoryLabels } from '@/data/concepts'
import { ObservatoryLayout, OB, RevealSection, StaggerItem, ObservatorySection, ScanLine, CyanRule } from './observatory/ObservatoryLayout'
import { ObservatoryButton, GemDataCard, DataTicker, SpectrumChart, PrecisionMeter, CertificationBadge } from './observatory/ui'
import { Crosshair, ArrowRight, Shield, Truck, RotateCcw, Diamond, BarChart3, Eye, Microscope, Zap } from 'lucide-react'

export function ObservatoryHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)
  const newArrivals = getNewArrivals().slice(0, 4)

  const tickerData = [
    { label: 'Market Cap', value: '$2.4B' },
    { label: 'Stones Analyzed', value: '12,847' },
    { label: 'Avg. Cut Grade', value: 'Excellent' },
    { label: 'Certification Rate', value: '99.7%' },
    { label: 'Active Collectors', value: '3,200+' },
  ]

  return (
    <ObservatoryLayout>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(135deg, ${OB.bg} 0%, ${OB.bgAlt} 50%, ${OB.bg} 100%)`,
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/observatory/starfield.jpg" alt="Starfield" fill style={{ objectFit: 'cover', opacity: 0.15 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 50%, ${OB.glow} 0%, transparent 60%)` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%' }}>
          <div style={{ maxWidth: 700 }}>
            <div className="observatory-hero-fade" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <Crosshair size={16} color={OB.accent} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: OB.accent }}>
                PRECISION GEMOLOGY
              </span>
            </div>
            <h1 className="observatory-hero-fade-delay-1" style={{
              fontFamily: "'Space Grotesk', sans-serif", fontSize: '4rem', fontWeight: 700,
              color: OB.text, margin: '0 0 24px', lineHeight: 1.1,
              background: `linear-gradient(135deg, ${OB.text} 0%, ${OB.accent} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Observe.<br />Analyze.<br />Acquire.
            </h1>
            <p className="observatory-hero-fade-delay-2" style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.9rem',
              color: OB.textSecondary, lineHeight: 1.8, marginBottom: 32, maxWidth: 500,
            }}>
              Every gemstone in our collection has been subjected to rigorous 47-point spectroscopic analysis. Data-driven curation for the discerning collector.
            </p>
            <div className="observatory-hero-fade-delay-3" style={{ display: 'flex', gap: 16 }}>
              <ObservatoryButton href="/observatory/collections" size="lg">
                Explore Collection <ArrowRight size={14} />
              </ObservatoryButton>
              <ObservatoryButton href="/observatory/grading" variant="secondary" size="lg">
                View Analysis
              </ObservatoryButton>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div className="observatory-pulse" style={{ width: 1, height: 40, background: `linear-gradient(${OB.accent}, transparent)`, margin: '0 auto 8px' }} />
          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.2em', color: OB.textSecondary }}>SCROLL TO EXPLORE</span>
        </div>
      </section>

      {/* ═══ SECTION 2: DATA TICKER BAR ═══ */}
      <section style={{ background: OB.surface, borderTop: `1px solid ${OB.border}`, borderBottom: `1px solid ${OB.border}`, padding: '16px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 32 }}>
            {tickerData.slice(0, 4).map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: OB.success }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: OB.textSecondary }}>{item.label}:</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: OB.accent, fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: OB.textSecondary }}>LIVE DATA</div>
        </div>
      </section>

      {/* ═══ SECTION 3: FEATURED ANALYSIS ═══ */}
      <ObservatorySection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <ScanLine label="Featured Pieces" style={{ marginBottom: 16, maxWidth: 300 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: 0 }}>
                Verified Collection
              </h2>
            </div>
            <ObservatoryButton href="/observatory/collections" variant="ghost" size="sm">
              View All <ArrowRight size={12} />
            </ObservatoryButton>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {featured.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <GemDataCard
                image={product.images[0]}
                title={product.name}
                subtitle={product.subtitle}
                badge="Verified"
                href={`/observatory/product/${product.slug}`}
                metrics={[
                  { label: 'Cut', value: 'Excellent' },
                  { label: 'Clarity', value: 'VS1' },
                  { label: 'Price', value: `$${(product.price / 1000).toFixed(1)}K` },
                ]}
              />
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      {/* ═══ SECTION 4: ANALYSIS SHOWCASE ═══ */}
      <ObservatorySection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ScanLine label="Our Methodology" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.2rem', fontWeight: 600, color: OB.text, margin: '0 0 20px', lineHeight: 1.2 }}>
                47-Point Spectroscopic Analysis
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Every stone in our collection undergoes the most comprehensive analysis in the industry. From Raman spectroscopy to advanced photoluminescence testing, we leave nothing to chance.
              </p>
              <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
                <PrecisionMeter label="Accuracy" value={99.7} unit="%" size="md" />
                <PrecisionMeter label="Precision" value={99.9} unit="%" size="md" />
                <PrecisionMeter label="Coverage" value={100} unit="%" size="md" />
              </div>
              <ObservatoryButton href="/observatory/grading" variant="secondary">
                <BarChart3 size={14} /> Learn About Our Grading
              </ObservatoryButton>
            </div>
            <div style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
              <Image src="/images/observatory/lab-microscope.jpg" alt="Gemological analysis" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: 'linear-gradient(transparent, rgba(10,14,26,0.95))' }}>
                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: OB.accent }}>
                  OBSERVATORY GEMOLOGICAL LAB — NEW YORK
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* ═══ SECTION 5: CATEGORIES ═══ */}
      <ObservatorySection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <ScanLine label="Browse by Category" style={{ marginBottom: 16 }} />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text }}>
              Curated Categories
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {allCategories.map((cat, i) => (
            <StaggerItem key={cat} index={i % 5}>
              <Link href={`/observatory/category/${cat}`} style={{ textDecoration: 'none' }}>
                <div className="observatory-card-hover" style={{
                  background: OB.card, border: `1px solid ${OB.border}`,
                  padding: 20, textAlign: 'center', cursor: 'pointer',
                }}>
                  <Diamond size={20} color={OB.accent} style={{ margin: '0 auto 12px' }} />
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.8rem', color: OB.text, fontWeight: 500 }}>
                    {categoryLabels[cat]}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      {/* ═══ SECTION 6: SPLIT — CRAFTSMANSHIP ═══ */}
      <ObservatorySection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 450, overflow: 'hidden' }}>
              <Image src="/images/observatory/precision-tools.jpg" alt="Precision craftsmanship" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <ScanLine label="Craftsmanship" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: '0 0 16px' }}>
                Where Data Meets Artistry
              </h2>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.8rem', color: OB.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Our master artisans work alongside data scientists, using precision measurements to guide every cut, every setting, every finish. The result is jewelry that is both scientifically optimized and breathtakingly beautiful.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                  { val: '120+', label: 'Hours per Piece' },
                  { val: '0.01mm', label: 'Setting Tolerance' },
                  { val: '47pt', label: 'Analysis Points' },
                ].map((stat, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${OB.accent}20`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.3rem', fontWeight: 600, color: OB.accent }}>{stat.val}</div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.1em', color: OB.textSecondary, textTransform: 'uppercase' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <ObservatoryButton href="/observatory/craftsmanship" variant="secondary">
                Explore Our Process <ArrowRight size={12} />
              </ObservatoryButton>
            </div>
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* ═══ SECTION 7: NEW ARRIVALS ═══ */}
      <ObservatorySection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <ScanLine label="Recently Analyzed" style={{ marginBottom: 16, maxWidth: 300 }} />
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2rem', fontWeight: 600, color: OB.text, margin: 0 }}>
                New Arrivals
              </h2>
            </div>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {newArrivals.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <Link href={`/observatory/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div className="observatory-card-hover" style={{ background: OB.card, border: `1px solid ${OB.border}`, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 8, right: 8, background: OB.accent, padding: '3px 8px' }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.5rem', color: OB.bg, fontWeight: 600 }}>NEW</span>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: OB.text, margin: '0 0 4px' }}>{product.name}</h3>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 600, color: OB.accent }}>${product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </ObservatorySection>

      {/* ═══ SECTION 8: TESTIMONIAL ═══ */}
      <section style={{ background: OB.bgAlt, padding: '80px 0' }}>
        <RevealSection>
          <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
            <CyanRule style={{ marginBottom: 32 }} />
            <blockquote style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.4rem', fontWeight: 400, color: OB.text, lineHeight: 1.6, margin: '0 0 24px', fontStyle: 'italic' }}>
              &ldquo;The Observatory&apos;s analytical approach transformed how I collect. Their 47-point reports give me complete confidence in every acquisition. It&apos;s like having a world-class gemologist in your pocket.&rdquo;
            </blockquote>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', color: OB.accent, marginBottom: 4 }}>
              DR. SARAH CHEN
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: OB.textSecondary }}>
              Private Collector &amp; Gemologist, Singapore
            </div>
            <CyanRule style={{ marginTop: 32 }} />
          </div>
        </RevealSection>
      </section>

      {/* ═══ SECTION 9: GUARANTEES ═══ */}
      <ObservatorySection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { icon: <Shield size={24} />, title: 'Certified Authentic', desc: 'Every piece comes with GIA/AGS certification plus our Observatory verification report.' },
              { icon: <Truck size={24} />, title: 'Insured Delivery', desc: 'Fully insured, temperature-controlled shipping with real-time GPS tracking.' },
              { icon: <RotateCcw size={24} />, title: '30-Day Returns', desc: 'Full refund within 30 days. No questions asked, no restocking fees.' },
              { icon: <Eye size={24} />, title: 'Lifetime Analysis', desc: 'Free re-analysis and condition reports for any piece purchased from The Observatory.' },
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', padding: 24 }}>
                  <div style={{ color: OB.accent, marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 500, color: OB.text, margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', color: OB.textSecondary, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </ObservatorySection>

      {/* ═══ SECTION 10: CTA ═══ */}
      <section style={{
        position: 'relative', padding: '100px 0',
        background: `linear-gradient(rgba(10,14,26,0.85), rgba(10,14,26,0.95)), url('/images/observatory/nebula.jpg') center/cover`,
        textAlign: 'center',
      }}>
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 32px' }}>
            <Crosshair size={24} color={OB.accent} style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '2.5rem', fontWeight: 600, color: OB.text, margin: '0 0 16px', lineHeight: 1.2 }}>
              Begin Your Analysis
            </h2>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.85rem', color: OB.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>
              Schedule a private consultation with our senior gemologists. Experience the precision of data-driven luxury.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <ObservatoryButton href="/observatory/contact" size="lg">
                Request Consultation
              </ObservatoryButton>
              <ObservatoryButton href="/observatory/bespoke" variant="secondary" size="lg">
                Bespoke Commission
              </ObservatoryButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </ObservatoryLayout>
  )
}
