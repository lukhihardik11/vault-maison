'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArchiveLayout, AR, ArchiveSection, RevealSection, StaggerItem, GoldRule, CatalogNumber } from './archive/ArchiveLayout'
import { ArchiveButton, DocumentCard, AuthenticationStamp } from './archive/ui'
import { getBestsellers, formatPrice, getProductsByCategory } from '@/data/products'
import { allCategories, categoryLabels, type ProductCategory } from '@/data/concepts'
import { Shield, BookOpen, Search, FileText, Eye, ChevronRight, CheckCircle, Lock, Truck, Award } from 'lucide-react'

/* ─── Static Counter (no animation dependency) ─── */
function StaticCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  return <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 600, color: AR.accent }}>{target}{suffix}</div>
}

export function ArchiveHome() {
  const featured = getBestsellers().slice(0, 3)
  const curatorPick = getBestsellers()[3] || getBestsellers()[0]

  /* Category images mapping */
  const categoryImages: Record<string, string> = {
    'diamond-rings': '/images/products/diamond-solitaire-ring.jpg',
    'gold-necklaces': '/images/products/gold-chain-necklace.jpg',
    'diamond-earrings': '/images/products/diamond-stud-earrings.jpg',
    'gold-bracelets': '/images/products/gold-bangle-bracelet.jpg',
    'loose-diamonds': '/images/products/loose-round-diamond.jpg',
    'wedding-bridal': '/images/products/classic-wedding-bands.jpg',
  }

  /* 6 categories for the grid */
  const gridCategories: ProductCategory[] = [
    'diamond-rings', 'gold-necklaces', 'diamond-earrings',
    'gold-bracelets', 'loose-diamonds', 'wedding-bridal',
  ]

  const stats = [
    { value: 2847, suffix: '+', label: 'Authenticated Pieces' },
    { value: 156, suffix: '', label: 'Years of Records' },
    { value: 43, suffix: '', label: 'Expert Gemologists' },
    { value: 99, suffix: '%', label: 'Authentication Accuracy' },
  ]

  return (
    <ArchiveLayout>
      {/* ─── SECTION 1: Hero ─── */}
      <section style={{
        position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(135deg, rgba(30,22,20,0.55) 0%, rgba(30,22,20,0.8) 100%), url('/images/archive/dark-library.jpg') center/cover no-repeat`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="archive-hero-fade" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
            <GoldRule style={{ width: 48 }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: AR.accent }}>
              EST. 1868
            </span>
            <GoldRule style={{ width: 48 }} />
          </div>
          <h1 className="archive-hero-fade-delay-1" style={{
            fontFamily: "'Playfair Display', serif", fontSize: '3.6rem', fontWeight: 500,
            color: AR.text, margin: '0 0 24px', lineHeight: 1.1, letterSpacing: '-0.01em',
          }}>
            The Archive
          </h1>
          <p className="archive-hero-fade-delay-2" style={{
            fontFamily: "'Crimson Text', serif", fontSize: '1.25rem', color: AR.textSecondary,
            lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px',
          }}>
            A curated repository of authenticated fine jewelry, each piece accompanied by verified provenance, gemological certification, and scholarly documentation.
          </p>
          <div className="archive-hero-fade-delay-3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <ArchiveButton href="/archive/collections">
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOpen size={16} /> Browse Catalog
              </span>
            </ArchiveButton>
            <ArchiveButton variant="secondary" href="/archive/craftsmanship">
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Shield size={16} /> Authentication
              </span>
            </ArchiveButton>
          </div>
        </div>
        <div className="archive-scroll-bounce" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{ width: 1, height: 40, background: `linear-gradient(${AR.accent}, transparent)` }} />
        </div>
      </section>

      {/* ─── SECTION 2: Featured Acquisitions (3 document cards) ─── */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>
                RECENT ACQUISITIONS
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text }}>
                Featured Acquisitions
              </h2>
            </div>
            <ArchiveButton variant="secondary" size="sm" href="/archive/collections">
              View Full Catalog
            </ArchiveButton>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {featured.map((p, i) => (
            <StaggerItem key={p.id} index={i}>
              <DocumentCard
                title={p.name}
                subtitle={p.subtitle}
                catalogNumber={`VM-2025-${p.category.split('-')[0].toUpperCase().slice(0,2)}-${String(i + 47).padStart(4, '0')}`}
                image={p.images[0]}
                href={`/archive/product/${p.slug}`}
                price={formatPrice(p.price)}
                authenticated={true}
                description={p.material + ' · ' + (p.diamondSpecs ? p.diamondSpecs.certification : 'Certified')}
              />
              <div style={{ textAlign: 'center', marginTop: 12 }}>
                <Link href={`/archive/product/${p.slug}`} style={{
                  fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: AR.accent, textDecoration: 'none',
                  borderBottom: `1px solid ${AR.accent}33`,
                  paddingBottom: 2,
                }}>
                  View Dossier →
                </Link>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      {/* ─── SECTION 3: Provenance Timeline (Vault Maison History) ─── */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              OUR JOURNEY
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text }}>
              Provenance Timeline
            </h2>
          </div>
        </RevealSection>
        <RevealSection delay={200}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
            {/* Connecting line */}
            <div style={{
              position: 'absolute', top: 28, left: '10%', right: '10%', height: 2,
              background: `linear-gradient(90deg, transparent, ${AR.accent}66, ${AR.accent}, ${AR.accent}66, transparent)`,
            }} />
            {[
              { year: '2020', title: 'Founded', desc: 'A vision for authenticated luxury — Vault Maison opens its doors with a commitment to provenance-first fine jewelry.' },
              { year: '2021', title: 'First 100 Pieces', desc: 'The inaugural collection reaches 100 authenticated pieces, each with full gemological documentation.' },
              { year: '2022', title: 'Blockchain Verification', desc: 'Launch of blockchain-backed certificates of authenticity, setting a new industry standard.' },
              { year: '2023', title: '1,000+ Authenticated', desc: 'Over one thousand pieces cataloged with verified provenance, trusted by collectors worldwide.' },
            ].map((entry, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', flex: 1, position: 'relative', zIndex: 1, padding: '0 8px' }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%',
                    background: AR.bg, border: `2px solid ${AR.accent}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                    fontFamily: "'Playfair Display', serif", fontSize: '1rem',
                    fontWeight: 600, color: AR.accent,
                  }}>
                    {entry.year}
                  </div>
                  <h3 style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: AR.text, marginBottom: 8,
                  }}>
                    {entry.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Crimson Text', serif", fontSize: '0.85rem',
                    color: AR.textSecondary, lineHeight: 1.6, maxWidth: 220, margin: '0 auto',
                  }}>
                    {entry.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 4: The Collection (2×3 Category Grid) ─── */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              BROWSE THE ARCHIVE
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text }}>
              The Collection
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {gridCategories.map((cat, i) => (
            <StaggerItem key={cat} index={i}>
              <Link href={`/archive/category/${cat}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: AR.card, border: `1px solid ${AR.border}`,
                  overflow: 'hidden', cursor: 'pointer',
                }} className="archive-doc-hover">
                  <div style={{ position: 'relative', height: 180, background: '#1a1412' }}>
                    <Image
                      src={categoryImages[cat] || '/images/archive/jewelry-dark-bg.jpg'}
                      alt={categoryLabels[cat]}
                      fill
                      style={{ objectFit: 'cover', opacity: 0.85 }}
                    />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'linear-gradient(transparent, rgba(30,22,20,0.9))',
                      padding: '24px 16px 12px',
                    }}>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif", fontSize: '1.05rem',
                        fontWeight: 500, color: AR.accent, margin: 0,
                      }}>
                        {categoryLabels[cat]}
                      </h3>
                      <span style={{
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem',
                        color: AR.textSecondary, letterSpacing: '0.08em',
                      }}>
                        {getProductsByCategory(cat).length} pieces cataloged
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      {/* ─── SECTION 5: Curator's Selection (1 large featured product) ─── */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 48, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 480, background: '#1a1412', overflow: 'hidden' }}>
              <Image
                src={curatorPick.images[0]}
                alt={curatorPick.name}
                fill
                style={{ objectFit: 'contain', padding: 24 }}
              />
              <div style={{ position: 'absolute', top: 16, left: 16 }}>
                <AuthenticationStamp status="certified" size="sm" />
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
                CURATOR&rsquo;S SELECTION
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text, marginBottom: 8, lineHeight: 1.2 }}>
                {curatorPick.name}
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1rem', color: AR.textSecondary, fontStyle: 'italic', marginBottom: 20 }}>
                {curatorPick.subtitle}
              </p>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                {curatorPick.description}
              </p>
              {/* Provenance details */}
              <div style={{ borderTop: `1px solid ${AR.border}`, paddingTop: 16, marginBottom: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AR.textSecondary }}>
                      Material
                    </span>
                    <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', color: AR.text, margin: '4px 0 0' }}>
                      {curatorPick.material}
                    </p>
                  </div>
                  <div>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AR.textSecondary }}>
                      Certification
                    </span>
                    <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', color: AR.text, margin: '4px 0 0' }}>
                      {curatorPick.diamondSpecs?.certification || 'Vault Maison Authenticated'}
                    </p>
                  </div>
                  {curatorPick.diamondSpecs && (
                    <>
                      <div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AR.textSecondary }}>
                          Origin
                        </span>
                        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', color: AR.text, margin: '4px 0 0' }}>
                          {curatorPick.diamondSpecs.origin}
                        </p>
                      </div>
                      <div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AR.textSecondary }}>
                          Specifications
                        </span>
                        <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', color: AR.text, margin: '4px 0 0' }}>
                          {curatorPick.diamondSpecs.carat}ct {curatorPick.diamondSpecs.cut} {curatorPick.diamondSpecs.shape}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 600, color: AR.accent }}>
                  {formatPrice(curatorPick.price)}
                </span>
                <ArchiveButton href={`/archive/product/${curatorPick.slug}`}>
                  Inquire About This Piece
                </ArchiveButton>
              </div>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 6: Five-Stage Authentication ─── */}
      <ArchiveSection dark>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              OUR METHODOLOGY
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text }}>
              Five-Stage Authentication
            </h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {[
            { num: 'I', title: 'Visual Inspection', desc: 'Expert examination under controlled lighting with 10× magnification and UV analysis.' },
            { num: 'II', title: 'Laboratory Analysis', desc: 'Spectroscopic and chemical testing using advanced gemological instruments.' },
            { num: 'III', title: 'Material Verification', desc: 'Gemological grading by GIA-certified experts and precious metal assay.' },
            { num: 'IV', title: 'Provenance Research', desc: 'Historical ownership documentation, auction records, and origin tracing.' },
            { num: 'V', title: 'Final Certification', desc: 'Comprehensive report, blockchain certificate, and tamper-proof seal.' },
          ].map((step, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ textAlign: 'center', padding: '24px 12px' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%', border: `2px solid ${AR.accent}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
                  fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: AR.accent, fontWeight: 600,
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: AR.text, marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', color: AR.textSecondary, lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </div>
        <RevealSection delay={300}>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <ArchiveButton href="/archive/craftsmanship">
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Eye size={16} /> Learn More About Our Process
              </span>
            </ArchiveButton>
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 7: Authentication Badges (4 trust icons) ─── */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
            {[
              { icon: <Award size={32} color={AR.accent} />, label: 'GIA Certified', desc: 'Every diamond graded by the Gemological Institute of America with full documentation.' },
              { icon: <Lock size={32} color={AR.accent} />, label: 'Blockchain Verified', desc: 'Immutable certificates of authenticity stored on blockchain for permanent verification.' },
              { icon: <Truck size={32} color={AR.accent} />, label: 'Insured Shipping', desc: 'Fully insured worldwide delivery with real-time tracking and signature confirmation.' },
              { icon: <CheckCircle size={32} color={AR.accent} />, label: 'Lifetime Guarantee', desc: 'Every piece backed by our lifetime authenticity guarantee and complimentary maintenance.' },
            ].map((badge, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', padding: '24px 16px' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: AR.accentSoft, border: `1px solid ${AR.accent}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px',
                  }}>
                    {badge.icon}
                  </div>
                  <h3 style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.75rem',
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: AR.accent, marginBottom: 8,
                  }}>
                    {badge.label}
                  </h3>
                  <p style={{
                    fontFamily: "'Crimson Text', serif", fontSize: '0.9rem',
                    color: AR.textSecondary, lineHeight: 1.6,
                  }}>
                    {badge.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 8: Stats ─── */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
            {stats.map((s, i) => (
              <div key={i}>
                <StaticCounter target={s.value} suffix={s.suffix} />
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: AR.textSecondary, marginTop: 8 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 9: Scholar's Quote ─── */}
      <ArchiveSection dark>
        <RevealSection>
          <div style={{
            position: 'relative', textAlign: 'center', padding: '48px 32px',
            background: `linear-gradient(rgba(30,22,20,0.6), rgba(30,22,20,0.8)), url('/images/archive/vault-storage.jpg') center/cover`,
          }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', color: AR.accent, lineHeight: 1, marginBottom: 16 }}>&ldquo;</div>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.4rem', color: AR.text, fontStyle: 'italic', maxWidth: 700, margin: '0 auto', lineHeight: 1.7 }}>
              Every jewel carries within it the memory of the earth, the hand of the maker, and the story of those who have cherished it. Our duty is to preserve these narratives for future generations.
            </p>
            <GoldRule style={{ margin: '24px auto', width: 64 }} />
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: AR.accent }}>
              Dr. Helena Voss, Chief Curator
            </p>
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 10: Journal Preview ─── */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>
                SCHOLAR&rsquo;S NOTES
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: AR.text }}>
                From the Research Desk
              </h2>
            </div>
            <ArchiveButton variant="secondary" size="sm" href="/archive/journal">All Articles</ArchiveButton>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: 24 }}>
          {[
            { title: 'The Kashmir Sapphire: A Century of Provenance', img: '/images/archive/emerald-necklace-dark.webp', date: 'March 2024', excerpt: 'Tracing the extraordinary journey of one of the world\'s most coveted gemstones through royal collections, auction houses, and private vaults across three continents.', large: true },
            { title: 'Understanding Art Deco Diamond Cuts', img: '/images/archive/diamond-velvet.jpg', date: 'February 2024', excerpt: 'How geometric precision defined an era of jewelry design and why these cuts remain highly sought after by collectors.', large: false },
            { title: "Gold Hallmarks: A Collector's Guide", img: '/images/archive/gold-hallmark.jpg', date: 'January 2024', excerpt: 'Decoding the stamps and marks that reveal a piece\'s origin, purity, and maker.', large: false },
          ].map((article, i) => (
            <StaggerItem key={i} index={i}>
              <div style={{ background: AR.card, border: `1px solid ${AR.border}`, overflow: 'hidden', height: '100%' }} className="archive-doc-hover">
                <div style={{ position: 'relative', height: article.large ? 240 : 160 }}>
                  <Image src={article.img} alt={article.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: AR.textSecondary }}>
                    {article.date}
                  </span>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: article.large ? '1.15rem' : '0.95rem', fontWeight: 500, color: AR.text, marginTop: 8, lineHeight: 1.3, marginBottom: 8 }}>
                    {article.title}
                  </h3>
                  <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.85rem', color: AR.textSecondary, lineHeight: 1.5, marginBottom: 12 }}>
                    {article.excerpt}
                  </p>
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem',
                    letterSpacing: '0.1em', textTransform: 'uppercase', color: AR.accent,
                  }}>
                    Read More →
                  </span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      {/* ─── SECTION 11: CTA ─── */}
      <section style={{
        position: 'relative', padding: '72px 32px', textAlign: 'center',
        background: `linear-gradient(rgba(30,22,20,0.7), rgba(30,22,20,0.9)), url('/images/archive/mahogany-library.jpg') center/cover`,
      }}>
        <RevealSection>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <GoldRule style={{ margin: '0 auto 24px', width: 48 }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text, marginBottom: 16, lineHeight: 1.2 }}>
              Begin Your Research
            </h2>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>
              Explore our authenticated catalog or consult with our advisory team for private acquisitions and collection services.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <ArchiveButton href="/archive/collections">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Search size={16} /> Search the Archive
                </span>
              </ArchiveButton>
              <ArchiveButton variant="secondary" href="/archive/bespoke">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FileText size={16} /> Private Advisory
                </span>
              </ArchiveButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </ArchiveLayout>
  )
}
