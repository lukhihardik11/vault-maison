'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArchiveLayout, AR, ArchiveSection, RevealSection, StaggerItem, GoldRule, CatalogNumber } from './archive/ArchiveLayout'
import { ArchiveButton, ProvenanceTimeline, DocumentCard, AuthenticationStamp, PeriodSelector, type ProvenanceEntry, type Period } from './archive/ui'
import { getBestsellers, formatPrice, getProductsByCategory } from '@/data/products'
import { allCategories, categoryLabels, type ProductCategory } from '@/data/concepts'
import { Shield, BookOpen, Search, FileText, Eye, ChevronRight } from 'lucide-react'

/* ─── Static Counter (no animation dependency) ─── */
function StaticCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  return <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 600, color: AR.accent }}>{target}{suffix}</div>
}

export function ArchiveHome() {
  const featured = getBestsellers().slice(0, 6)
  

  const sampleProvenance: ProvenanceEntry[] = [
    { year: '1925', title: 'Commissioned by the House of Cartier', description: 'Original creation in the Art Deco style, Paris atelier.', verified: true },
    { year: '1940', title: 'Private Collection, Geneva', description: 'Acquired by a European noble family.', location: 'Geneva, Switzerland' },
    { year: '1978', title: "Christie's Geneva Auction", description: 'Lot 247, Magnificent Jewels sale.', document: 'Auction Catalog', verified: true },
    { year: '2024', title: 'Vault Maison Authentication', description: 'Full gemological analysis and provenance verification.', verified: true },
  ]

  const periods: Period[] = [
    { id: 'all', label: 'All Periods', years: '' },
    { id: 'victorian', label: 'Victorian', years: '1837–1901' },
    { id: 'artnouveau', label: 'Art Nouveau', years: '1890–1910' },
    { id: 'artdeco', label: 'Art Deco', years: '1920–1939' },
    { id: 'midcentury', label: 'Mid-Century', years: '1940–1969' },
    { id: 'contemporary', label: 'Contemporary', years: '1970–Present' },
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

      {/* ─── SECTION 2: Catalog Introduction ─── */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 64, alignItems: 'center' }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
                ABOUT THE ARCHIVE
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: AR.text, margin: '0 0 20px', lineHeight: 1.2 }}>
                Where Provenance Meets Precision
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.1rem', color: AR.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Every piece in our collection undergoes a rigorous five-stage authentication process. We trace ownership histories, verify materials through laboratory analysis, and compile comprehensive documentation that accompanies each acquisition.
              </p>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Our team of gemologists, historians, and authentication specialists maintains the highest standards of scholarly rigor in the jewelry trade.
              </p>
              <ArchiveButton variant="secondary" href="/archive/about">
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>Read Our Story <ChevronRight size={14} /></span>
              </ArchiveButton>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'relative', height: 420, overflow: 'hidden' }}>
                <Image src="/images/archive/leather-books.jpg" alt="Archive reference library" fill style={{ objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: -16, left: -16, background: AR.card, border: `1px solid ${AR.border}`, padding: '16px 20px' }}>
                <CatalogNumber number="REF-2024-001" />
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.textSecondary, marginTop: 4 }}>
                  Archive Reference Library
                </p>
              </div>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 3: Provenance Timeline ─── */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              TRACING HISTORY
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text }}>
              Sample Provenance Record
            </h2>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, maxWidth: 600, margin: '12px auto 0' }}>
              Every piece in our catalog includes a detailed provenance timeline like this one.
            </p>
          </div>
        </RevealSection>
        <RevealSection delay={200}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}>
            <div style={{ position: 'relative', height: 380, overflow: 'hidden' }}>
              <Image src="/images/archive/diamond-bracelet-dark.jpg" alt="Art Deco diamond bracelet" fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 12, right: 12 }}>
                <AuthenticationStamp status="certified" size="sm" />
              </div>
            </div>
            <ProvenanceTimeline entries={sampleProvenance} />
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 4: Featured Catalog Pieces ─── */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 8 }}>
                RECENT ACQUISITIONS
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text }}>
                Featured in the Catalog
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
                catalogNumber={`VM-${p.id.toUpperCase()}`}
                image={p.images[0]}
                href={`/archive/product/${p.slug}`}
                price={formatPrice(p.price)}
                authenticated={true}
              />
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      {/* ─── SECTION 5: Authentication Process ─── */}
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
            { num: 'I', title: 'Visual Inspection', desc: 'Expert examination under controlled lighting' },
            { num: 'II', title: 'Laboratory Analysis', desc: 'Spectroscopic and chemical testing' },
            { num: 'III', title: 'Material Verification', desc: 'Gemological grading and metal assay' },
            { num: 'IV', title: 'Provenance Research', desc: 'Historical ownership documentation' },
            { num: 'V', title: 'Final Certification', desc: 'Comprehensive report and seal' },
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

      {/* ─── SECTION 6: Browse by Period ─── */}
      <ArchiveSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
              EXPLORE BY ERA
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text, marginBottom: 16 }}>
              Browse by Historical Period
            </h2>
          </div>
          <PeriodSelector periods={periods} />
        </RevealSection>
        <RevealSection delay={200}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginTop: 32 }}>
            {allCategories.slice(0, 5).map((cat, i) => (
              <StaggerItem key={cat} index={i}>
                <Link href={`/archive/category/${cat}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: AR.card, border: `1px solid ${AR.border}`, padding: '20px',
                    textAlign: 'center', cursor: 'pointer',
                  }} className="archive-doc-hover">
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 500, color: AR.text, marginBottom: 4 }}>
                      {categoryLabels[cat]}
                    </h3>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', color: AR.textSecondary }}>
                      {getProductsByCategory(cat).length} records
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* ─── SECTION 7: Stats ─── */}
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

      {/* ─── SECTION 8: Scholar's Quote ─── */}
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

      {/* ─── SECTION 9: Journal Preview ─── */}
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
            { title: 'The Kashmir Sapphire: A Century of Provenance', img: '/images/archive/emerald-necklace-dark.webp', date: 'March 2024', large: true },
            { title: 'Understanding Art Deco Diamond Cuts', img: '/images/archive/diamond-velvet.jpg', date: 'February 2024', large: false },
            { title: "Gold Hallmarks: A Collector's Guide", img: '/images/archive/gold-hallmark.jpg', date: 'January 2024', large: false },
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
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: article.large ? '1.15rem' : '0.95rem', fontWeight: 500, color: AR.text, marginTop: 8, lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </ArchiveSection>

      {/* ─── SECTION 10: CTA ─── */}
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
