'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MinimalLayout } from '../MinimalLayout'
import { Gem, Ruler, Eye, Sparkles, Clock, Layers, ArrowRight } from 'lucide-react'

const F = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

/* ── Data ─────────────────────────────────────────────────────────── */

const processSteps = [
  {
    step: '01',
    icon: <Gem size={20} strokeWidth={1.5} />,
    title: 'Stone Selection',
    time: '2–4 weeks',
    desc: 'Every diamond is hand-selected by our GIA-certified gemologists. We evaluate hundreds of stones — examining brilliance, fire, and scintillation under controlled lighting — to find those with exceptional optical performance. Only the top 1% meet our standards.',
  },
  {
    step: '02',
    icon: <Layers size={20} strokeWidth={1.5} />,
    title: 'Design & Prototyping',
    time: '1–3 weeks',
    desc: 'Our designers create precise CAD models refined to 0.01mm tolerance. Each design is reviewed for structural integrity, wearability, and aesthetic proportion. For bespoke pieces, clients approve a 3D-printed prototype before any precious metal is cast.',
  },
  {
    step: '03',
    icon: <Clock size={20} strokeWidth={1.5} />,
    title: 'Lost-Wax Casting',
    time: '3–5 days',
    desc: 'We use the centuries-old lost-wax technique, refined with modern precision. A wax model is encased in plaster, burned out at 1,350°F, and replaced with molten precious metal. The result: a one-piece casting with no seams or solder joints.',
  },
  {
    step: '04',
    icon: <Ruler size={20} strokeWidth={1.5} />,
    title: 'Precision Setting',
    time: '1–2 weeks',
    desc: 'Our master setters work under 10× magnification using specialized tools to ensure each stone is perfectly aligned. Prong heights are calibrated to within 0.05mm, maximizing light performance while ensuring the stone is held securely for a lifetime.',
  },
  {
    step: '05',
    icon: <Eye size={20} strokeWidth={1.5} />,
    title: '47-Point Inspection',
    time: '2–3 days',
    desc: 'Before leaving our atelier, every piece undergoes a rigorous 47-point quality control inspection. We check symmetry, prong integrity, surface finish, hallmark clarity, clasp function, and stone security. Any imperfection means the piece returns to the bench.',
  },
  {
    step: '06',
    icon: <Sparkles size={20} strokeWidth={1.5} />,
    title: 'Final Polish & Presentation',
    time: '1 day',
    desc: 'A multi-stage polishing process using progressively finer compounds — from 600-grit to 50,000-grit — creates our signature mirror finish. Each piece is then cleaned ultrasonically, steam-finished, and placed in our archival presentation case.',
  },
]

const materials = [
  {
    title: '18K Gold',
    purity: '75% Pure Gold',
    desc: 'We use 18-karat gold exclusively for its ideal balance of purity, durability, and rich color. Available in yellow, white, and rose. Each alloy is formulated in-house to our exact specifications.',
  },
  {
    title: 'GIA Diamonds',
    purity: 'Independently Certified',
    desc: 'Every diamond above 0.30ct is independently certified by the Gemological Institute of America. We only source stones graded D–H color and IF–VS2 clarity, ensuring verified quality and traceable origin.',
  },
  {
    title: 'Platinum 950',
    purity: '95% Pure Platinum',
    desc: 'Our platinum pieces use 950 grade — the highest standard in fine jewelry. Prized for its density, hypoallergenic properties, and eternal luster, platinum develops a distinguished patina that can be re-polished indefinitely.',
  },
]

const atelierStats = [
  { value: '12', label: 'Master Artisans' },
  { value: '20+', label: 'Years Average Experience' },
  { value: '47', label: 'Quality Checkpoints' },
  { value: '6–8', label: 'Weeks Per Piece' },
]

export function MinimalCraftsmanship() {
  return (
    <MinimalLayout>
      {/* ── Hero: Full-width typographic header ─────────────────── */}
      <section style={{ padding: '120px 5vw 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{
          fontFamily: F, fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#9B9B9B', marginBottom: '24px',
        }}>
          Our Craft
        </p>
        <h1 style={{
          fontFamily: F, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 600,
          color: '#050505', lineHeight: 1.1, letterSpacing: '-0.03em',
          marginBottom: '24px', maxWidth: '800px',
        }}>
          Nothing Is Made Quickly.<br />
          Everything Is Made Right.
        </h1>
        <p style={{
          fontFamily: F, fontSize: '15px', fontWeight: 300,
          lineHeight: 1.9, color: '#6B6B6B', maxWidth: '560px',
        }}>
          At Vault Maison, craftsmanship is not a marketing term — it is the foundation
          of everything we create. From the initial sketch to the final polish, every step
          is performed by hand in our New York atelier.
        </p>
      </section>

      {/* ── Full-bleed image ───────────────────────────────────── */}
      <section style={{ position: 'relative', height: '50vh', minHeight: '320px', overflow: 'hidden' }}>
        <Image
          src="/images/products/classic-pendant.jpg"
          alt="Master jeweler at work in the Vault Maison atelier"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </section>

      {/* ── Atelier Stats ──────────────────────────────────────── */}
      <section style={{ padding: '64px 5vw', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px',
        }} className="vm-craft-stats">
          {atelierStats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: F, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 600,
                color: '#050505', lineHeight: 1, marginBottom: '8px',
              }}>
                {stat.value}
              </p>
              <p style={{
                fontFamily: F, fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9B9B9B',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── The Process: 6-Step Timeline ───────────────────────── */}
      <section style={{ padding: '80px 5vw', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{
          fontFamily: F, fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#9B9B9B', marginBottom: '12px',
        }}>
          The Process
        </p>
        <h2 style={{
          fontFamily: F, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 600,
          color: '#050505', marginBottom: '48px', letterSpacing: '-0.02em',
        }}>
          From Raw Material to Finished Piece
        </h2>

        <div style={{ display: 'grid', gap: '0' }}>
          {processSteps.map((step, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '56px 1fr',
              gap: '24px',
              padding: '32px 0',
              borderBottom: i < processSteps.length - 1 ? '1px solid #E5E5E5' : 'none',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', paddingTop: '2px' }}>
                <span style={{
                  fontFamily: F, fontSize: '11px', fontWeight: 500,
                  color: '#9B9B9B', letterSpacing: '0.05em',
                }}>
                  {step.step}
                </span>
                <div style={{ color: '#050505' }}>{step.icon}</div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
                  <h3 style={{
                    fontFamily: F, fontSize: '16px', fontWeight: 500,
                    color: '#050505', margin: 0,
                  }}>
                    {step.title}
                  </h3>
                  <span style={{
                    fontFamily: F, fontSize: '11px', fontWeight: 400,
                    color: '#9B9B9B',
                  }}>
                    {step.time}
                  </span>
                </div>
                <p style={{
                  fontFamily: F, fontSize: '13px', fontWeight: 300,
                  lineHeight: 1.8, color: '#555', margin: 0,
                }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Materials: Dark section ────────────────────────────── */}
      <section style={{ padding: '80px 5vw', backgroundColor: '#050505' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{
            fontFamily: F, fontSize: '11px', fontWeight: 500,
            letterSpacing: '0.25em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)', marginBottom: '12px',
          }}>
            Materials
          </p>
          <h2 style={{
            fontFamily: F, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 600,
            color: '#FFFFFF', marginBottom: '48px', letterSpacing: '-0.02em',
          }}>
            Only the Finest
          </h2>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px',
            backgroundColor: 'rgba(255,255,255,0.1)',
          }} className="vm-materials-grid">
            {materials.map((m, i) => (
              <div key={i} style={{ padding: '40px 32px', backgroundColor: '#050505' }}>
                <p style={{
                  fontFamily: F, fontSize: '11px', fontWeight: 500,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)', marginBottom: '12px',
                }}>
                  {m.purity}
                </p>
                <h3 style={{
                  fontFamily: F, fontSize: '20px', fontWeight: 300,
                  color: '#FFFFFF', marginBottom: '16px',
                }}>
                  {m.title}
                </h3>
                <p style={{
                  fontFamily: F, fontSize: '13px', fontWeight: 300,
                  lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', margin: 0,
                }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy Quote ───────────────────────────────────── */}
      <section style={{ padding: '80px 5vw', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderLeft: '2px solid #050505', paddingLeft: '24px' }}>
          <p style={{
            fontFamily: F, fontSize: '18px', fontWeight: 300,
            lineHeight: 1.8, color: '#050505', margin: 0,
          }}>
            "Less, but better. Every joint, every setting, every surface must earn its place.
            We do not add — we refine until only the essential remains."
          </p>
          <p style={{
            fontFamily: F, fontSize: '12px', fontWeight: 400,
            color: '#9B9B9B', marginTop: '16px',
          }}>
            — Vault Maison Atelier Philosophy
          </p>
        </div>
      </section>

      {/* ── The Atelier ────────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        <p style={{
          fontFamily: F, fontSize: '11px', fontWeight: 500,
          letterSpacing: '0.25em', textTransform: 'uppercase',
          color: '#9B9B9B', marginBottom: '12px',
        }}>
          The Atelier
        </p>
        <h2 style={{
          fontFamily: F, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 600,
          color: '#050505', marginBottom: '24px', letterSpacing: '-0.02em',
        }}>
          Where It All Happens
        </h2>
        <p style={{
          fontFamily: F, fontSize: '14px', fontWeight: 300,
          lineHeight: 1.9, color: '#555', marginBottom: '32px', maxWidth: '640px',
        }}>
          Our atelier in New York houses twelve master artisans, each with over twenty years
          of experience in fine jewelry making. The workshop is equipped with both traditional
          hand tools passed down through generations and the latest in CAD/CAM technology.
          This fusion of old and new allows us to achieve levels of precision that neither
          approach could accomplish alone.
        </p>
        <p style={{
          fontFamily: F, fontSize: '14px', fontWeight: 300,
          lineHeight: 1.9, color: '#555', maxWidth: '640px',
        }}>
          Every artisan in our workshop specializes in a specific discipline — stone setting,
          engraving, polishing, or metalwork. A single piece may pass through six pairs of
          hands before completion, each contributing their expertise to the final result.
          This collaborative approach ensures that every aspect of the piece receives the
          attention of a specialist.
        </p>
      </section>

      {/* ── CTA + Cross-links ──────────────────────────────────── */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ border: '1px solid #050505', padding: '48px 32px' }}>
          <h2 style={{
            fontFamily: F, fontSize: '20px', fontWeight: 300,
            color: '#050505', marginBottom: '12px',
          }}>
            Commission a Bespoke Piece
          </h2>
          <p style={{
            fontFamily: F, fontSize: '14px', fontWeight: 300,
            lineHeight: 1.8, color: '#555', marginBottom: '24px',
            maxWidth: '480px', margin: '0 auto 24px',
          }}>
            Work directly with our master artisans to create a one-of-a-kind piece
            tailored to your vision.
          </p>
          <Link
            href="/minimal/appointments"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#FFFFFF', backgroundColor: '#050505',
              padding: '14px 32px', textDecoration: 'none',
            }}
          >
            Book a Consultation <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px' }}>
          <Link href="/minimal/sustainability" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Sustainability
          </Link>
          <Link href="/minimal/authenticity" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Authenticity
          </Link>
          <Link href="/minimal/collections" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Collections
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-craft-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .vm-materials-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .vm-craft-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
