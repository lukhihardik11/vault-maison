'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AtelierLayout, A, AtelierSection, RevealSection, StaggerItem, WarmDivider } from './atelier/AtelierLayout'
import { AtelierButton } from './atelier/ui/AtelierButton'
import { AtelierCard } from './atelier/ui/AtelierCard'
import { ArtisanCard } from './atelier/ui/ArtisanCard'
import { ProcessTimeline } from './atelier/ui/ProcessTimeline'
import { SketchToggle } from './atelier/ui/SketchToggle'
import { getBestsellers, getNewArrivals } from '@/data/products'

/* ─── Data ─── */
const artisans = [
  {
    name: 'Elena Marchetti', title: 'Master Stone Setter',
    specialty: 'Specializes in invisible settings and micro-pavé. Trained in Valenza, Italy.',
    years: 22, signature: 'E. Marchetti',
    image: '/images/atelier/female-jeweler.jpg',
    quote: 'Each stone has a voice — my job is to let it sing.',
  },
  {
    name: 'Thomas Ashworth', title: 'Master Engraver',
    specialty: 'Hand-engraving specialist. Third-generation craftsman from Sheffield.',
    years: 18, signature: 'T. Ashworth',
    image: '/images/atelier/artisan-portrait-1.jpg',
    quote: 'The chisel remembers what the hand forgets.',
  },
  {
    name: 'Yuki Tanaka', title: 'Sculptural Designer',
    specialty: 'Trained in Tokyo and Florence. Known for bold, architectural forms.',
    years: 15, signature: 'Y. Tanaka',
    image: '/images/atelier/artisan-portrait-2.jpg',
    quote: 'I sculpt light as much as metal.',
  },
]

const steps = [
  { number: '01', title: 'Consultation', description: 'Share your vision over tea. We listen, sketch, and dream together — understanding the story behind the piece you desire.', duration: '1–2 hours', image: '/images/atelier/atelier-interior.jpg' },
  { number: '02', title: 'Design', description: 'Detailed hand-drawn renderings and 3D wax models bring your concept to life. You approve every detail before we begin.', duration: '1–2 weeks', image: '/images/atelier/jewelry-sketch.jpg' },
  { number: '03', title: 'Sourcing', description: 'We hand-select the finest stones and metals from trusted suppliers worldwide, ensuring each material meets our exacting standards.', duration: '1–3 weeks', image: '/images/atelier/gemstone-inspection.jpg' },
  { number: '04', title: 'Crafting', description: 'Master artisans bring the design to life with focused handwork — casting, setting, engraving, and polishing with meticulous care.', duration: '4–8 weeks', image: '/images/atelier/goldsmith-crafting.jpg' },
  { number: '05', title: 'Finishing', description: 'Final polishing, stone setting, and multi-point quality inspection. Every surface is examined under 10x magnification.', duration: '1 week', image: '/images/atelier/hand-engraving.jpg' },
  { number: '06', title: 'Unveiling', description: 'Your finished piece is presented in a private ceremony at our Hatton Garden atelier, complete with certification and care guide.', duration: 'Your moment', image: '/images/atelier/workshop-interior.jpg' },
]

const journalEntries = [
  { title: 'The Art of Lost-Wax Casting', excerpt: 'A 5,000-year-old technique refined for the modern age. How our artisans transform wax into gold.', tag: 'Technique', date: 'March 2024', image: '/images/atelier/wax-carving.jpg' },
  { title: 'Sourcing Burmese Rubies', excerpt: 'The journey from Mogok Valley to our workshop. Understanding what makes a truly exceptional ruby.', tag: 'Sourcing', date: 'February 2024', image: '/images/atelier/gemstone-appraisal.jpg' },
  { title: 'Meet Elena: 22 Years at the Bench', excerpt: 'From apprentice in Valenza to master stone setter in London. Elena shares her journey and philosophy.', tag: 'Artisan', date: 'January 2024', image: '/images/atelier/female-jeweler.jpg' },
]

const stats = [
  { value: 37, suffix: '', label: 'Years of Craft', prefix: '' },
  { value: 12000, suffix: '+', label: 'Pieces Created', prefix: '' },
  { value: 3, suffix: '', label: 'Master Artisans', prefix: '' },
  { value: 98, suffix: '%', label: 'Bespoke Commissions', prefix: '' },
]

/* ─── Static Counter (no animation dependency) ─── */
function StaticCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  return (
    <span>
      {prefix}{target.toLocaleString()}{suffix}
    </span>
  )
}

/* ─── Main Component ─── */
export function AtelierHome() {
  const featured = getBestsellers().slice(0, 4)
  const newPieces = getNewArrivals().slice(0, 3)
  const artisanNames = ['Elena M.', 'Thomas A.', 'Yuki T.', 'Marie D.']

  return (
    <AtelierLayout>
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1: HERO — Full-bleed workshop photo with overlay
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/workshop-interior.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.35)',
        }} />
        {/* Paper texture overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, rgba(44,38,32,0.3) 0%, rgba(44,38,32,0.5) 50%, ${A.bg} 100%)`,
        }} />
        {/* Sketch grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.06,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L30 60M0 30L60 30\' stroke=\'%23C4A35A\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 760, textAlign: 'center', position: 'relative', zIndex: 1, padding: '80px 32px 60px' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: A.gold, marginBottom: 24,
            }}>
              Est. 1987 — Hatton Garden, London
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
              fontWeight: 300, color: '#FEFCF8',
              margin: '0 0 28px', lineHeight: 1.12,
            }}
          >
            Where Every Piece<br />Begins as a Conversation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontFamily: 'Source Serif 4, serif', fontSize: 17,
              color: 'rgba(232,226,216,0.85)', lineHeight: 1.8,
              maxWidth: 540, margin: '0 auto 44px',
            }}
          >
            Our Hatton Garden workshop has been a sanctuary of craft since 1987. Every piece is handcrafted by master artisans — every detail considered, every surface perfected.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <AtelierButton href="/atelier/collections" style={{ background: A.gold, color: A.ink }}>
              Explore the Workshop
            </AtelierButton>
            <AtelierButton variant="secondary" href="/atelier/bespoke" style={{ borderColor: 'rgba(196,163,90,0.6)', color: A.gold }}>
              Begin a Commission
            </AtelierButton>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: 'rgba(196,163,90,0.6)' }}>Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(196,163,90,0.5)" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2: PHILOSOPHY — Split image + text
      ═══════════════════════════════════════════════════════════ */}
      <AtelierSection style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
            }}>
              {/* Image */}
              <div style={{
                position: 'relative',
                border: `1px dashed ${A.sketch}`,
                borderRadius: 2,
                overflow: 'hidden',
              }}>
                <div style={{
                  paddingTop: '120%',
                  backgroundImage: 'url(/images/atelier/jewelry-making-hands.jpg)',
                  backgroundSize: 'cover', backgroundPosition: 'center',
                }} />
                {/* Handwritten note overlay */}
                <div style={{
                  position: 'absolute', bottom: 16, right: 16,
                  padding: '8px 16px',
                  background: 'rgba(254,252,248,0.92)',
                  backdropFilter: 'blur(8px)',
                  border: `1px dashed ${A.sketch}`,
                  fontFamily: 'Caveat, cursive', fontSize: 14, color: A.accent,
                }}>
                  Every detail matters
                </div>
              </div>

              {/* Text */}
              <div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: A.accent, marginBottom: 16,
                }}>
                  Our Philosophy
                </div>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400,
                  color: A.ink, margin: '0 0 20px', lineHeight: 1.2,
                }}>
                  The Human Touch in an<br />Age of Automation
                </h2>
                <p style={{
                  fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft,
                  lineHeight: 1.8, marginBottom: 20,
                }}>
                  In a world of mass production, we choose the slower path. Each piece that leaves our atelier bears the invisible signature of the artisan who created it — the warmth of handwork, the soul that no machine can replicate.
                </p>
                <p style={{
                  fontFamily: 'Source Serif 4, serif', fontSize: 16, color: A.textSoft,
                  lineHeight: 1.8, marginBottom: 32,
                }}>
                  We source only the finest materials, employ time-honoured techniques passed down through generations, and never compromise on the details that transform good jewelry into extraordinary art.
                </p>
                <WarmDivider style={{ maxWidth: 200, margin: '0 0 24px' }} />
                <div style={{ display: 'flex', gap: 32 }}>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.accent }}>37</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft }}>Years of Craft</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.accent }}>12,000+</div>
                    <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: A.textSoft }}>Pieces Created</div>
                  </div>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3: PROCESS TIMELINE — with images
      ═══════════════════════════════════════════════════════════ */}
      <AtelierSection alt style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <ProcessTimeline steps={steps} title="From Sketch to Masterpiece" subtitle="The Making Process" />
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4: FEATURED PIECES — Large cards with artisan credits
      ═══════════════════════════════════════════════════════════ */}
      <AtelierSection style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                From the Bench
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.ink, margin: '0 0 8px' }}>
                Workshop Favourites
              </h2>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, maxWidth: 480, margin: '0 auto' }}>
                Each piece is handcrafted by our master artisans, bearing the marks of meticulous human attention.
              </p>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 24 }}>
            {featured.map((p, i) => (
              <StaggerItem key={p.slug} index={i}>
                <AtelierCard
                  title={p.name}
                  subtitle={p.category.replace(/-/g, ' ')}
                  price={`£${p.price.toLocaleString()}`}
                  image={p.images?.[0]}
                  href={`/atelier/product/${p.slug}`}
                  artisan={artisanNames[i % artisanNames.length]}
                  materials={p.material || undefined}
                  badge={p.isNew ? 'New from the bench' : p.isBestseller ? 'Workshop favourite' : undefined}
                />
              </StaggerItem>
            ))}
          </div>
          <RevealSection delay={200}>
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <AtelierButton variant="secondary" href="/atelier/collections">View All Pieces</AtelierButton>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5: ANIMATED STATS COUNTER
      ═══════════════════════════════════════════════════════════ */}
      <AtelierSection dark style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, textAlign: 'center' }}>
          {stats.map((s, i) => (
            <StaggerItem key={i} index={i}>
              <div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 300,
                  color: A.gold, lineHeight: 1.1, marginBottom: 8,
                }}>
                  <StaticCounter target={s.value} suffix={s.suffix} prefix={s.prefix} />
                </div>
                <div style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(232,226,216,0.6)',
                }}>
                  {s.label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </AtelierSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6: SKETCH TOGGLE SHOWCASE — with workshop photo
      ═══════════════════════════════════════════════════════════ */}
      <AtelierSection alt style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
              <SketchToggle
                title="Celestial Solitaire"
                photoSrc="/images/atelier/jeweler-ring-work.jpg"
                style={{ maxWidth: 440 }}
              />
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                  Design to Reality
                </div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 30, fontWeight: 400, color: A.ink, margin: '0 0 16px', lineHeight: 1.25 }}>
                  See the Journey<br />from Sketch to Masterpiece
                </h2>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, marginBottom: 16 }}>
                  Toggle between the original design sketch and the finished piece. Every creation in our workshop begins as a hand-drawn concept before becoming reality.
                </p>
                <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.8, marginBottom: 28 }}>
                  Our designers work closely with each client, iterating through multiple sketches until the vision is perfectly captured on paper — only then does the metalwork begin.
                </p>
                <AtelierButton variant="ghost" href="/atelier/craftsmanship">
                  Learn About Our Process →
                </AtelierButton>
              </div>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 7: ARTISANS — with portrait photos
      ═══════════════════════════════════════════════════════════ */}
      <AtelierSection style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                The Makers
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.ink, margin: '0 0 8px' }}>
                Meet Our Master Artisans
              </h2>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, maxWidth: 500, margin: '0 auto' }}>
                Each artisan brings decades of specialized expertise, trained in the world&apos;s finest ateliers.
              </p>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {artisans.map((a, i) => (
              <StaggerItem key={i} index={i}>
                <ArtisanCard {...a} />
              </StaggerItem>
            ))}
          </div>
        </div>
      </AtelierSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 8: QUOTE — with workshop backdrop
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', padding: '72px 32px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/atelier-interior.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.25)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(44,38,32,0.7), rgba(44,38,32,0.5))',
        }} />
        <RevealSection>
          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={A.gold} strokeWidth="0.8" style={{ marginBottom: 24, opacity: 0.6 }}>
              <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18.5L6 21.5L7 14.5L2 9.5L9 8.5Z"/>
            </svg>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 300, color: '#FEFCF8',
              lineHeight: 1.6, fontStyle: 'italic',
              marginBottom: 24,
            }}>
              &ldquo;Every piece that leaves our atelier bears the invisible signature of the artisan who created it. We celebrate the human touch — the warmth of handwork, the soul that no machine can replicate.&rdquo;
            </p>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 18, color: A.gold }}>
              — The Vault Maison Atelier
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 9: WORKBENCH JOURNAL — with images
      ═══════════════════════════════════════════════════════════ */}
      <AtelierSection style={{ padding: '72px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 12 }}>
                From the Bench
              </div>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: A.ink, margin: '0 0 8px' }}>
                Workbench Journal
              </h2>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, maxWidth: 480, margin: '0 auto' }}>
                Stories, techniques, and insights from inside our workshop.
              </p>
            </div>
          </RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {journalEntries.map((entry, i) => (
              <StaggerItem key={i} index={i}>
                <Link href="/atelier/journal" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{
                    background: A.surface,
                    border: `1px dashed ${A.sketch}`,
                    borderRadius: 2,
                    overflow: 'hidden',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                    cursor: 'pointer',
                    boxShadow: `inset 0 1px 2px ${A.shadow}`,
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = A.accent;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${A.shadowMd}`
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = A.sketch;
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `inset 0 1px 2px ${A.shadow}`
                  }}
                  >
                    {/* Image */}
                    <div style={{
                      height: 200,
                      backgroundImage: `url(${entry.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    <div style={{ padding: '20px 22px 24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontFamily: 'Caveat, cursive', fontSize: 14, color: A.accent }}>{entry.tag}</span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: A.sketch }}>{entry.date}</span>
                      </div>
                      <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: A.ink, margin: '0 0 8px', lineHeight: 1.3 }}>
                        {entry.title}
                      </h3>
                      <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft, lineHeight: 1.6, margin: 0 }}>
                        {entry.excerpt}
                      </p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </div>
          <RevealSection delay={200}>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <AtelierButton variant="ghost" href="/atelier/journal">Read All Entries →</AtelierButton>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 10: COMMISSION CTA — with workshop backdrop
      ═══════════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', padding: '72px 32px', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/atelier/goldsmith-crafting.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.2)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(44,38,32,0.6), rgba(44,38,32,0.8))',
        }} />
        <RevealSection>
          <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.gold, marginBottom: 16 }}>
              Bespoke Commissions
            </div>
            <h2 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 300, color: '#FEFCF8',
              margin: '0 0 20px', lineHeight: 1.25,
            }}>
              Begin Your Commission
            </h2>
            <p style={{
              fontFamily: 'Source Serif 4, serif', fontSize: 16,
              color: 'rgba(232,226,216,0.75)', lineHeight: 1.8,
              marginBottom: 36, maxWidth: 500, margin: '0 auto 36px',
            }}>
              Every masterpiece starts with a conversation. Our 6-step commission process guides you from inspiration to unveiling — with your dedicated artisan at every stage.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <AtelierButton href="/atelier/bespoke" style={{ background: A.gold, color: A.ink }}>
                Start Your Journey
              </AtelierButton>
              <AtelierButton variant="secondary" href="/atelier/contact" style={{ borderColor: 'rgba(196,163,90,0.5)', color: A.gold }}>
                Visit the Workshop
              </AtelierButton>
            </div>
          </div>
        </RevealSection>
      </section>
    </AtelierLayout>
  )
}
