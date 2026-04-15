'use client'

import Link from 'next/link'
import Image from 'next/image'
import { type ConceptConfig } from '@/data/concepts'
import { getBestsellers, getNewArrivals } from '@/data/products'
import { allCategories, categoryLabels } from '@/data/concepts'
import { MaisonLayout, MS, RevealSection, StaggerItem, MaisonSection, SectionLabel, GoldDivider } from './maison/MaisonLayout'
import { MaisonButton, ElegantCard, HeritageBanner, TestimonialCard, FeatureIcon } from './maison/ui'
import { ArrowRight, Shield, Truck, RotateCcw, Gem, Heart, Gift, Star, Sparkles } from 'lucide-react'

export function MaisonHome({ concept }: { concept: ConceptConfig }) {
  const featured = getBestsellers().slice(0, 6)
  const newArrivals = getNewArrivals().slice(0, 4)

  return (
    <MaisonLayout>
      {/* ═══ SECTION 1: HERO ═══ */}
      <section style={{
        position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: MS.bg, overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Image src="/images/maison/warm-interior.jpg" alt="Maison" fill style={{ objectFit: 'cover', opacity: 0.2 }} priority />
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${MS.bg}f0, ${MS.bg}a0)` }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 32px', width: '100%' }}>
          <div style={{ maxWidth: 600 }}>
            <div className="maison-hero-fade-1">
              <SectionLabel label="The Modern Maison" style={{ marginBottom: 24 }} />
            </div>
            <h1 className="maison-hero-fade-1" style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: '3.8rem', fontWeight: 600,
              color: MS.text, margin: '0 0 20px', lineHeight: 1.1,
            }}>
              Where Heritage<br />Meets Elegance
            </h1>
            <p className="maison-hero-fade-2" style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: '1rem',
              color: MS.textSecondary, lineHeight: 1.8, marginBottom: 36, maxWidth: 460,
            }}>
              A curated collection of exceptional jewelry, where timeless craftsmanship and contemporary design converge to create pieces of enduring beauty.
            </p>
            <div className="maison-hero-fade-3" style={{ display: 'flex', gap: 12 }}>
              <MaisonButton href="/maison/collections" size="lg">
                Explore Collection
              </MaisonButton>
              <MaisonButton href="/maison/bespoke" variant="secondary" size="lg">
                Bespoke Service
              </MaisonButton>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SECTION 2: FEATURED COLLECTION ═══ */}
      <MaisonSection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
            <div>
              <SectionLabel label="Curated Selection" style={{ marginBottom: 12 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 600, color: MS.text, margin: 0 }}>
                Signature Pieces
              </h2>
            </div>
            <MaisonButton href="/maison/collections" variant="ghost" size="sm">
              View All <ArrowRight size={12} />
            </MaisonButton>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {featured.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <ElegantCard
                image={product.images[0]}
                title={product.name}
                subtitle={product.subtitle}
                price={product.price}
                href={`/maison/product/${product.slug}`}
                badge={i === 0 ? 'Signature' : i === 1 ? 'New' : undefined}
              />
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>

      {/* ═══ SECTION 3: HERITAGE BANNER ═══ */}
      <MaisonSection alt>
        <RevealSection>
          <HeritageBanner
            image="/images/maison/artisan-hands.jpg"
            title="The Art of Craftsmanship"
            description="Each piece in our collection is the result of hundreds of hours of meticulous handwork by master artisans. From the initial sketch to the final polish, every step reflects our unwavering commitment to excellence."
            ctaText="Discover Our Process"
            ctaHref="/maison/craftsmanship"
          />
        </RevealSection>
      </MaisonSection>

      {/* ═══ SECTION 4: CATEGORIES ═══ */}
      <MaisonSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <SectionLabel label="Browse" style={{ marginBottom: 12, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text }}>
              Shop by Category
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {allCategories.map((cat, i) => (
            <StaggerItem key={cat} index={i % 5}>
              <Link href={`/maison/category/${cat}`} style={{ textDecoration: 'none' }}>
                <div className="maison-card-hover" style={{
                  background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4,
                  padding: 20, textAlign: 'center', cursor: 'pointer',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', fontWeight: 600, color: MS.text }}>
                    {categoryLabels[cat]}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>

      {/* ═══ SECTION 5: NEW ARRIVALS ═══ */}
      <MaisonSection alt>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <SectionLabel label="Just Arrived" style={{ marginBottom: 12 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text, margin: 0 }}>
                New Arrivals
              </h2>
            </div>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {newArrivals.map((product, i) => (
            <StaggerItem key={product.slug} index={i}>
              <Link href={`/maison/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div className="maison-card-hover" style={{ background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 220 }}>
                    <Image src={product.images[0]} alt={product.name} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 16 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', fontWeight: 600, color: MS.text, margin: '0 0 4px' }}>{product.name}</h3>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MS.accent }}>${product.price.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>

      {/* ═══ SECTION 6: BESPOKE CTA ═══ */}
      <MaisonSection>
        <RevealSection>
          <HeritageBanner
            image="/images/maison/gold-jewelry.jpg"
            title="Bespoke Creations"
            description="Commission a one-of-a-kind piece that tells your unique story. Our master artisans work closely with you from initial concept to final creation, ensuring every detail reflects your personal vision."
            ctaText="Begin Your Journey"
            ctaHref="/maison/bespoke"
            reverse
          />
        </RevealSection>
      </MaisonSection>

      {/* ═══ SECTION 7: TESTIMONIALS ═══ */}
      <MaisonSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <SectionLabel label="Voices" style={{ marginBottom: 12, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text }}>
              What Our Clients Say
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { quote: 'The attention to detail is extraordinary. My engagement ring exceeded every expectation.', author: 'Sophie Laurent', role: 'Paris' },
            { quote: 'Vault Maison represents the very best of what fine jewelry can be. Impeccable quality and service.', author: 'James Chen', role: 'Hong Kong' },
            { quote: 'The bespoke experience was truly personal. They understood exactly what I envisioned.', author: 'Isabella Rossi', role: 'Milan' },
          ].map((t, i) => (
            <StaggerItem key={i} index={i}>
              <TestimonialCard quote={t.quote} author={t.author} role={t.role} />
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>

      {/* ═══ SECTION 8: GUARANTEES ═══ */}
      <MaisonSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            <FeatureIcon icon={<Shield size={22} />} title="Certified" description="Every piece comes with independent certification and our hallmark of authenticity." />
            <FeatureIcon icon={<Truck size={22} />} title="Complimentary Shipping" description="Insured, tracked delivery worldwide. Free on orders over $5,000." />
            <FeatureIcon icon={<RotateCcw size={22} />} title="30-Day Returns" description="Return any standard piece within 30 days for a full refund." />
            <FeatureIcon icon={<Gift size={22} />} title="Gift Wrapping" description="Complimentary luxury gift wrapping with every order." />
          </div>
        </RevealSection>
      </MaisonSection>

      {/* ═══ SECTION 9: JOURNAL PREVIEW ═══ */}
      <MaisonSection alt>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <SectionLabel label="Stories" style={{ marginBottom: 12 }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 600, color: MS.text, margin: 0 }}>
                From the Journal
              </h2>
            </div>
            <MaisonButton href="/maison/journal" variant="ghost" size="sm">
              Read All <ArrowRight size={12} />
            </MaisonButton>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {[
            { title: 'The Art of Layering', cat: 'Style', img: '/images/maison/elegant-bracelet.jpg' },
            { title: 'Spring Collection Preview', cat: 'Collections', img: '/images/maison/pearl-necklace.jpg' },
            { title: 'Caring for Heirlooms', cat: 'Care', img: '/images/maison/gold-ring-detail.jpg' },
          ].map((article, i) => (
            <StaggerItem key={i} index={i}>
              <Link href="/maison/journal" style={{ textDecoration: 'none' }}>
                <div className="maison-card-hover" style={{ background: MS.card, border: `1px solid ${MS.borderLight}`, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ position: 'relative', height: 180 }}>
                    <Image src={article.img} alt={article.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 16 }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.5rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: MS.accent }}>{article.cat}</span>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', fontWeight: 600, color: MS.text, margin: '4px 0 0' }}>{article.title}</h3>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </MaisonSection>

      {/* ═══ SECTION 10: FINAL CTA ═══ */}
      <section style={{
        position: 'relative', padding: '80px 0',
        background: `linear-gradient(rgba(44,36,24,0.85), rgba(44,36,24,0.95)), url('/images/maison/boutique-interior.jpg') center/cover`,
        textAlign: 'center',
      }}>
        <RevealSection>
          <div style={{ maxWidth: 560, margin: '0 auto', padding: '0 32px' }}>
            <Sparkles size={24} color={MS.accentLight} style={{ margin: '0 auto 12px' }} />
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 600, color: '#FAF8F5', margin: '0 0 12px' }}>
              Begin Your Story
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: '#FAF8F5aa', lineHeight: 1.7, marginBottom: 28 }}>
              Visit our boutique or explore our collection online. Every piece is waiting to become part of your story.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <MaisonButton href="/maison/collections" size="lg" style={{ background: MS.accent, color: '#fff' }}>
                Shop Now
              </MaisonButton>
              <MaisonButton href="/maison/contact" variant="secondary" size="lg" style={{ borderColor: '#FAF8F540', color: '#FAF8F5' }}>
                Book Appointment
              </MaisonButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </MaisonLayout>
  )
}
