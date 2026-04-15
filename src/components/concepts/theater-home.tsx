'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals, products } from '@/data/products'
import { allCategories, categoryLabels } from '@/data/concepts'
import { TheaterLayout, TH, RevealSection, StaggerItem, TheaterSection, GoldRule, ActLabel, Curtain } from './theater/TheaterLayout'
import { TheaterButton, SceneCard, DramaticQuote, ActCounter } from './theater/ui'
import { ArrowRight, Shield, Truck, RotateCcw, Heart, Sparkles, Star, Crown } from 'lucide-react'

export function TheaterHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)
  const newArrivals = getNewArrivals().slice(0, 4)

  return (
    <TheaterLayout>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(135deg, ${TH.bg} 0%, ${TH.bgAlt} 50%, ${TH.bg} 100%)`,
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/theater/velvet-curtain.jpg" alt="Velvet curtain" fill style={{ objectFit: 'cover', opacity: 0.2 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 30%, ${TH.glow} 0%, transparent 60%)` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <ActLabel label="The Immersive Theater" style={{ marginBottom: 32, justifyContent: 'center' }} />
            <h1 className="theater-hero-fade-delay-1" style={{
              fontFamily: "'Playfair Display', serif", fontSize: '4.5rem', fontWeight: 400,
              color: TH.text, margin: '0 0 24px', lineHeight: 1.1,
            }}>
              Every Jewel<br />Tells a Story
            </h1>
            <p className="theater-hero-fade-delay-2" style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem',
              color: TH.textSecondary, lineHeight: 1.7, marginBottom: 40, maxWidth: 500, margin: '0 auto 40px',
            }}>
              Step into a world where luxury is a performance — dramatic, emotional, and utterly unforgettable. Each piece is a scene in your personal narrative.
            </p>
            <div className="theater-hero-fade-delay-3" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <TheaterButton href="/theater/collections" size="lg">
                Enter the Theater <ArrowRight size={14} />
              </TheaterButton>
              <TheaterButton href="/theater/bespoke" variant="secondary" size="lg">
                Commission a Piece
              </TheaterButton>
            </div>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <Curtain />
        </div>
      </section>

      {/* ═══ SECTION 2: ACT COUNTER ═══ */}
      <section style={{ background: TH.surface, borderBottom: `1px solid ${TH.border}`, padding: '40px 0' }}>
        <RevealSection>
          <ActCounter items={[
            { value: '47', label: 'Master Artisans' },
            { value: '12K+', label: 'Pieces Created' },
            { value: '28', label: 'Years of Craft' },
            { value: '100%', label: 'Ethically Sourced' },
          ]} />
        </RevealSection>
      </section>

      {/* ═══ SECTION 3: FEATURED SCENES ═══ */}
      <TheaterSection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <ActLabel label="Featured Scenes" style={{ marginBottom: 16 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text, margin: 0 }}>
                Center Stage
              </h2>
            </div>
            <TheaterButton href="/theater/collections" variant="ghost" size="sm">
              View All <ArrowRight size={12} />
            </TheaterButton>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {featured.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <SceneCard
                image={product.images[0]}
                title={product.name}
                subtitle={product.subtitle}
                price={product.price}
                href={`/theater/product/${product.slug}`}
                act={`Scene ${i + 1}`}
              />
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>

      {/* ═══ SECTION 4: DRAMATIC SPLIT ═══ */}
      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ActLabel label="The Craft" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 500, color: TH.text, margin: '0 0 20px', lineHeight: 1.2 }}>
                Where Passion Meets Precision
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Behind every masterpiece is a performance of its own — master artisans working with centuries-old techniques, guided by an unwavering commitment to perfection. Each piece requires over 120 hours of meticulous handwork.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 32 }}>
                {[
                  { val: '120+', label: 'Hours per Piece' },
                  { val: '47', label: 'Master Artisans' },
                  { val: '0.01mm', label: 'Precision' },
                ].map((stat, i) => (
                  <div key={i} style={{ borderLeft: `2px solid ${TH.accent}40`, paddingLeft: 12 }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 400, color: TH.gold }}>{stat.val}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', letterSpacing: '0.15em', color: TH.textSecondary, textTransform: 'uppercase' }}>{stat.label}</div>
                  </div>
                ))}
              </div>
              <TheaterButton href="/theater/craftsmanship" variant="secondary">
                Behind the Curtain <ArrowRight size={12} />
              </TheaterButton>
            </div>
            <div style={{ position: 'relative', height: 500, overflow: 'hidden' }}>
              <Image src="/images/theater/artisan-hands.jpg" alt="Master artisan" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 30%, ${TH.accent}10 0%, transparent 60%)` }} />
            </div>
          </div>
        </RevealSection>
      </TheaterSection>

      {/* ═══ SECTION 5: CATEGORIES ═══ */}
      <TheaterSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <ActLabel label="The Repertoire" style={{ marginBottom: 16, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text }}>
              Browse by Act
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {allCategories.map((cat, i) => (
            <StaggerItem key={cat} index={i % 5}>
              <Link href={`/theater/category/${cat}`} style={{ textDecoration: 'none' }}>
                <div className="theater-card-hover" style={{
                  background: TH.card, border: `1px solid ${TH.border}`,
                  padding: 20, textAlign: 'center', cursor: 'pointer',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: TH.accent, marginBottom: 8 }}>ACT {String(i + 1).padStart(2, '0')}</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.85rem', color: TH.text, fontWeight: 500 }}>
                    {categoryLabels[cat]}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>

      {/* ═══ SECTION 6: SPOTLIGHT ═══ */}
      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 450, overflow: 'hidden' }}>
              <Image src="/images/theater/spotlight.jpg" alt="Spotlight moment" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <ActLabel label="The Experience" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>
                A Private Performance
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Every visit to The Immersive Theater is a curated experience. From the moment you enter our showroom, you&apos;re enveloped in an atmosphere of dramatic beauty — velvet seating, theatrical lighting, and the undivided attention of our expert consultants.
              </p>
              <TheaterButton href="/theater/contact" variant="secondary">
                Reserve Your Seat <ArrowRight size={12} />
              </TheaterButton>
            </div>
          </div>
        </RevealSection>
      </TheaterSection>

      {/* ═══ SECTION 7: NEW ARRIVALS ═══ */}
      <TheaterSection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <ActLabel label="New Scenes" style={{ marginBottom: 16 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text, margin: 0 }}>
                Latest Arrivals
              </h2>
            </div>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {newArrivals.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <Link href={`/theater/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div className="theater-card-hover" style={{ background: TH.card, border: `1px solid ${TH.border}`, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 200 }}>
                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 8, right: 8, background: TH.accent, padding: '3px 8px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.5rem', color: TH.text, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>PREMIERE</span>
                    </div>
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.85rem', fontWeight: 500, color: TH.text, margin: '0 0 4px' }}>{product.name}</h3>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, color: TH.gold }}>${product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>

      {/* ═══ SECTION 8: TESTIMONIAL ═══ */}
      <section style={{ background: TH.bgAlt, padding: '80px 0' }}>
        <RevealSection>
          <DramaticQuote
            quote="Walking into The Immersive Theater is like stepping onto a stage where you are the star. The way they present each piece — the lighting, the narrative, the emotion — transforms a purchase into a memory that lasts forever."
            author="Isabella Rossi"
            title="Private Collector, Milan"
          />
        </RevealSection>
      </section>

      {/* ═══ SECTION 9: GUARANTEES ═══ */}
      <TheaterSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              { icon: <Shield size={24} />, title: 'Authenticated', desc: 'Every piece carries GIA/AGS certification plus our Theater Authentication Report.' },
              { icon: <Truck size={24} />, title: 'Insured Delivery', desc: 'Fully insured, temperature-controlled shipping with signature requirement.' },
              { icon: <RotateCcw size={24} />, title: '30-Day Returns', desc: 'Full refund within 30 days. No questions asked, no restocking fees.' },
              { icon: <Heart size={24} />, title: 'Lifetime Care', desc: 'Complimentary cleaning, inspection, and minor repairs for life.' },
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', padding: 24 }}>
                  <div style={{ color: TH.gold, marginBottom: 16, display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 500, color: TH.text, margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: TH.textSecondary, lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </TheaterSection>

      {/* ═══ SECTION 10: CTA ═══ */}
      <section style={{
        position: 'relative', padding: '100px 0',
        background: `linear-gradient(rgba(12,10,13,0.85), rgba(12,10,13,0.95)), url('/images/theater/opera-house.jpg') center/cover`,
        textAlign: 'center',
      }}>
        <Curtain style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 32px' }}>
            <Crown size={28} color={TH.gold} style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 400, color: TH.text, margin: '0 0 16px', lineHeight: 1.2 }}>
              The Stage Awaits
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: TH.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>
              Book a private showing and experience luxury as it was meant to be — dramatic, personal, and unforgettable.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
              <TheaterButton href="/theater/contact" size="lg">
                Reserve Your Seat
              </TheaterButton>
              <TheaterButton href="/theater/bespoke" variant="secondary" size="lg">
                Bespoke Commission
              </TheaterButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </TheaterLayout>
  )
}
