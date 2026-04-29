'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MinimalLayout } from '../MinimalLayout'
import { Leaf, Shield, Globe, Recycle, Heart, ArrowRight } from 'lucide-react'
import { ScrollWordReveal } from '../animations/ScrollScrub'

const F = "'Inter', 'Helvetica Neue', sans-serif"
const MONO = "'Space Mono', 'SF Mono', monospace"

/* ── Data ─────────────────────────────────────────────────────────── */

const pillars = [
  {
    icon: <Shield size={20} strokeWidth={1.5} />,
    title: 'Conflict-Free Sourcing',
    desc: 'Every diamond and gemstone is sourced in full compliance with the Kimberley Process and goes beyond its requirements. We maintain direct relationships with mines and cutting houses that uphold the highest ethical standards — fair wages, safe conditions, and zero tolerance for exploitation.',
  },
  {
    icon: <Globe size={20} strokeWidth={1.5} />,
    title: 'Supply Chain Transparency',
    desc: 'We trace the journey of every stone from mine to market. Our supply chain documentation includes country of origin, cutting facility, and chain-of-custody records. Customers can request a full provenance report for any piece in our collection.',
  },
  {
    icon: <Leaf size={20} strokeWidth={1.5} />,
    title: 'Environmental Stewardship',
    desc: 'Our atelier operates on 100% renewable energy. We use recycled precious metals wherever possible — our 18K gold contains a minimum of 75% recycled content. Packaging is made from FSC-certified paper and is fully recyclable.',
  },
  {
    icon: <Recycle size={20} strokeWidth={1.5} />,
    title: 'Circular Economy',
    desc: 'We offer a lifetime trade-in program for any Vault Maison piece. Old jewelry is responsibly recycled, with precious metals refined and stones re-certified. This keeps materials in circulation and reduces the demand for new mining.',
  },
  {
    icon: <Heart size={20} strokeWidth={1.5} />,
    title: 'Community Investment',
    desc: 'A portion of every sale supports education and healthcare in diamond-producing communities. We partner with the Diamond Development Initiative and fund artisan training programs to preserve traditional craftsmanship for future generations.',
  },
]

const commitments = [
  { metric: '100%', label: 'Conflict-Free Diamonds', detail: 'Kimberley Process certified and beyond' },
  { metric: '75%+', label: 'Recycled Precious Metals', detail: 'In all new gold and platinum pieces' },
  { metric: '100%', label: 'Renewable Energy', detail: 'Powering our atelier and showroom' },
  { metric: '0', label: 'Single-Use Plastics', detail: 'Eliminated from all packaging since 2023' },
]

const certifications = [
  'Kimberley Process Certified',
  'Responsible Jewellery Council Member',
  'Carbon Neutral Operations (2024)',
  'FSC-Certified Packaging',
  'Diamond Development Initiative Partner',
  'SCS Sustainably Rated',
]

export function MinimalSustainability() {
  return (
    <MinimalLayout>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ padding: '120px 5vw 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '24px' }}>01 — Responsibility</span>
        <h1 style={{
          fontFamily: F, fontSize: 'clamp(36px, 5vw, 72px)', fontWeight: 600,
          color: '#050505', lineHeight: 1.1, letterSpacing: '-0.03em',
          marginBottom: '24px', maxWidth: '800px',
        }}>
          Luxury Without<br />
          Compromise.
        </h1>
        <ScrollWordReveal
          text="We believe that true luxury carries no hidden cost — not to the earth, not to communities, not to future generations. Every decision we make is guided by this principle."
          as="p"
          baseOpacity={0.15}
          start="top 85%"
          end="top 30%"
          className="vm-sustain-opening"
        />
      </section>

      {/* ── Full-bleed image ───────────────────────────────────── */}
      <section style={{ position: 'relative', height: '50vh', minHeight: '320px', overflow: 'hidden' }}>
        <Image
          src="/images/diamond-collection-1.jpg"
          alt="Ethically sourced diamonds in natural light"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </section>

      {/* ── Commitments by the Numbers ─────────────────────────── */}
      <section style={{ padding: '64px 5vw', borderBottom: '1px solid #E5E5E5' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px',
        }} className="vm-sustain-stats">
          {commitments.map((c, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: MONO, fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700,
                color: '#050505', lineHeight: 1, marginBottom: '8px',
                letterSpacing: '0.02em',
              }}>
                {c.metric}
              </p>
              <p style={{
                fontFamily: F, fontSize: '13px', fontWeight: 500,
                color: '#050505', marginBottom: '4px',
              }}>
                {c.label}
              </p>
              <p style={{
                fontFamily: F, fontSize: '11px', fontWeight: 400,
                color: '#9B9B9B',
              }}>
                {c.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Five Pillars ───────────────────────────────────────── */}
      <section style={{ padding: '80px 5vw', maxWidth: '900px', margin: '0 auto' }}>
        <span className="brutalist-section-num" style={{ display: 'block', marginBottom: '12px' }}>02 — Our Approach</span>
        <h2 style={{
          fontFamily: F, fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 600,
          color: '#050505', marginBottom: '48px', letterSpacing: '-0.02em',
        }}>
          Five Pillars of Responsibility
        </h2>

        <div style={{ display: 'grid', gap: '0' }}>
          {pillars.map((pillar, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: '24px',
              padding: '32px 0',
              borderBottom: i < pillars.length - 1 ? '1px solid #E5E5E5' : 'none',
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2px', color: '#050505' }}>
                {pillar.icon}
              </div>
              <div>
                <h3 style={{
                  fontFamily: F, fontSize: '16px', fontWeight: 500,
                  color: '#050505', marginBottom: '10px',
                }}>
                  {pillar.title}
                </h3>
                <p style={{
                  fontFamily: F, fontSize: '13px', fontWeight: 400,
                  lineHeight: 1.8, color: '#555', margin: 0,
                }}>
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy Quote ───────────────────────────────────── */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderLeft: '2px solid #050505', paddingLeft: '24px' }}>
          <p style={{
            fontFamily: F, fontSize: '18px', fontWeight: 400,
            lineHeight: 1.8, color: '#050505', margin: 0,
          }}>
            "The true measure of luxury is not what it costs the buyer,
            but what it costs the world. We aim for that cost to be zero."
          </p>
          <p style={{
            fontFamily: F, fontSize: '12px', fontWeight: 400,
            color: '#9B9B9B', marginTop: '16px',
          }}>
            — Vault Maison Sustainability Charter
          </p>
        </div>
      </section>

      {/* ── Lab-Grown vs Natural: Honest Perspective ───────────── */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{
          fontFamily: F, fontSize: '20px', fontWeight: 400,
          color: '#050505', marginBottom: '24px',
        }}>
          Lab-Grown vs. Natural: Our Position
        </h2>
        <p style={{
          fontFamily: F, fontSize: '14px', fontWeight: 400,
          lineHeight: 1.9, color: '#555', marginBottom: '20px',
        }}>
          We offer both natural and lab-grown diamonds because we believe in informed choice,
          not ideology. Natural diamonds, when responsibly sourced, support communities that
          depend on mining economies. Lab-grown diamonds offer an alternative with a different
          environmental profile.
        </p>
        <p style={{
          fontFamily: F, fontSize: '14px', fontWeight: 400,
          lineHeight: 1.9, color: '#555',
        }}>
          What matters to us is transparency. Every diamond in our collection — natural or
          lab-grown — is clearly labeled, independently certified, and traceable. We present
          the facts and let you decide what aligns with your values.
        </p>
      </section>

      {/* ── Certifications ─────────────────────────────────────── */}
      <section style={{ padding: '0 5vw 80px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '32px', backgroundColor: '#FAFAFA' }}>
          <h2 style={{
            fontFamily: F, fontSize: '16px', fontWeight: 400,
            color: '#050505', marginBottom: '20px',
          }}>
            Certifications & Partnerships
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {certifications.map((cert) => (
              <span key={cert} style={{
                fontFamily: F, fontSize: '11px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: '#050505', border: '1px solid #050505',
                padding: '8px 14px',
              }}>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA + Cross-links ──────────────────────────────────── */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ border: '1px solid #050505', padding: '48px 32px' }}>
          <h2 style={{
            fontFamily: F, fontSize: '20px', fontWeight: 400,
            color: '#050505', marginBottom: '12px',
          }}>
            Questions About Our Practices?
          </h2>
          <p style={{
            fontFamily: F, fontSize: '14px', fontWeight: 400,
            lineHeight: 1.8, color: '#555', marginBottom: '24px',
            maxWidth: '480px', margin: '0 auto 24px',
          }}>
            We welcome inquiries about our sourcing, environmental practices, and
            community initiatives. Transparency is a core value.
          </p>
          <Link
            href="/minimal/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: F, fontSize: '11px', fontWeight: 500,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: '#FFFFFF', backgroundColor: '#050505',
              padding: '14px 32px', textDecoration: 'none',
            }}
          >
            Get in Touch <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '32px' }}>
          <Link href="/minimal/craftsmanship" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Craftsmanship
          </Link>
          <Link href="/minimal/authenticity" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Authenticity
          </Link>
          <Link href="/minimal/shipping" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Shipping & Returns
          </Link>
        </div>
      </section>

      <style>{`
        .vm-sustain-opening {
          font-family: ${F};
          font-size: 15px;
          font-weight: 400;
          line-height: 1.9;
          color: #6B6B6B;
          max-width: 560px;
        }
        @media (max-width: 768px) {
          .vm-sustain-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .vm-sustain-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
