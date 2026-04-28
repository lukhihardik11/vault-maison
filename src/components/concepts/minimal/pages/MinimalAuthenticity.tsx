'use client'

import Link from 'next/link'
import { MinimalLayout } from '../MinimalLayout'
import { Shield, Award, Search, FileCheck, Fingerprint, RefreshCw, CheckCircle } from 'lucide-react'

const F = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const verificationSteps = [
  {
    step: '01',
    icon: <Search size={20} color="#050505" />,
    title: 'Expert Examination',
    desc: 'Every piece undergoes hands-on inspection by our in-house gemologists. We assess cut quality, symmetry, polish, and structural integrity using 10× loupe magnification and advanced gemological instruments.',
  },
  {
    step: '02',
    icon: <Fingerprint size={20} color="#050505" />,
    title: 'Laboratory Certification',
    desc: 'All diamonds above 0.30ct are accompanied by certificates from GIA (Gemological Institute of America) or AGS (American Gem Society). Colored gemstones are certified by GIA, Gübelin, or SSEF as appropriate.',
  },
  {
    step: '03',
    icon: <FileCheck size={20} color="#050505" />,
    title: 'Provenance Verification',
    desc: 'We trace the origin of every stone through our supply chain. All diamonds are Kimberley Process certified and conflict-free. Colored gemstones include country-of-origin documentation when available.',
  },
  {
    step: '04',
    icon: <Award size={20} color="#050505" />,
    title: 'Metal Assay & Hallmarking',
    desc: 'All precious metals are independently assayed to verify purity. 18K gold (75% pure), 14K gold (58.3% pure), and 950 platinum are tested and hallmarked to international standards.',
  },
  {
    step: '05',
    icon: <Shield size={20} color="#050505" />,
    title: 'Digital Authentication',
    desc: 'Each piece receives a unique authentication code linked to its digital certificate. Scan the QR code on your certificate to verify authenticity at any time through our secure verification portal.',
  },
  {
    step: '06',
    icon: <RefreshCw size={20} color="#050505" />,
    title: 'Lifetime Verification',
    desc: 'Your authentication is permanent. At any point in the future — whether for insurance, resale, or personal assurance — you can re-verify your piece through our portal at no charge.',
  },
]

const guarantees = [
  { title: '100% Authentic', desc: 'Every piece sold on Vault Maison is guaranteed to be authentic. If any item is found to be misrepresented, we will issue a full refund including all shipping costs.' },
  { title: 'Conflict-Free', desc: 'All diamonds and gemstones are sourced in compliance with the Kimberley Process and applicable international regulations. We maintain full supply chain transparency.' },
  { title: 'Accurate Grading', desc: 'All gemstone specifications (carat, color, clarity, cut) are verified against independent laboratory reports. We do not overstate grades or quality characteristics.' },
  { title: 'Fair Pricing', desc: 'Our pricing reflects the true quality and rarity of each piece. We provide detailed specifications so you can make informed comparisons.' },
]

const certifications = [
  'GIA (Gemological Institute of America)',
  'AGS (American Gem Society)',
  'Kimberley Process Certified',
  'Responsible Jewellery Council Member',
  'PCI-DSS Level 1 Compliant',
  'BBB A+ Rated',
]

export function MinimalAuthenticity() {
  return (
    <MinimalLayout>
      {/* Header */}
      <section style={{ padding: '80px 5vw 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: F, fontSize: '11px', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#050505', marginBottom: '16px' }}>
          Trust
        </p>
        <h1 style={{ fontFamily: F, fontSize: '40px', fontWeight: 600, color: '#050505', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Authenticity Guarantee
        </h1>
        <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#9B9B9B', maxWidth: '560px', margin: '0 auto' }}>
          Every piece we sell is verified, certified, and guaranteed authentic. No exceptions.
        </p>
      </section>

      {/* Promise Statement */}
      <section style={{ padding: '60px 5vw', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ borderLeft: '2px solid #050505', paddingLeft: '24px' }}>
          <p style={{ fontFamily: F, fontSize: '18px', fontWeight: 300, lineHeight: 1.8, color: '#050505', margin: 0 }}>
            "Authenticity is not a feature — it is the foundation. Every gemstone, every metal, every claim we make is independently verified and permanently documented."
          </p>
        </div>
      </section>

      {/* 6-Step Verification Process */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: F, fontSize: '20px', fontWeight: 300, color: '#050505', marginBottom: '32px' }}>
          Our 6-Step Verification Process
        </h2>
        <div style={{ display: 'grid', gap: '0' }}>
          {verificationSteps.map((step, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '48px 1fr',
              gap: '20px',
              padding: '28px 0',
              borderBottom: i < verificationSteps.length - 1 ? '1px solid #E5E5E5' : 'none',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontFamily: F, fontSize: '11px', fontWeight: 500, color: '#9B9B9B', letterSpacing: '0.05em' }}>{step.step}</span>
                {step.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: F, fontSize: '16px', fontWeight: 500, color: '#050505', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#555', margin: 0 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Guarantees */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: F, fontSize: '20px', fontWeight: 300, color: '#050505', marginBottom: '24px' }}>
          Our Guarantees
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }} className="vm-auth-grid">
          {guarantees.map((g, i) => (
            <div key={i} style={{ padding: '28px', border: '1px solid #E5E5E5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <CheckCircle size={16} strokeWidth={1.5} style={{ color: '#050505' }} />
                <h3 style={{ fontFamily: F, fontSize: '15px', fontWeight: 500, color: '#050505', margin: 0 }}>{g.title}</h3>
              </div>
              <p style={{ fontFamily: F, fontSize: '13px', fontWeight: 300, lineHeight: 1.8, color: '#555', margin: 0 }}>{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Affiliations */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ padding: '32px', backgroundColor: '#FAFAFA' }}>
          <h2 style={{ fontFamily: F, fontSize: '16px', fontWeight: 400, color: '#050505', marginBottom: '20px' }}>
            Certifications & Affiliations
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {certifications.map((cert) => (
              <span key={cert} style={{
                fontFamily: F,
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#050505',
                border: '1px solid #050505',
                padding: '8px 14px',
              }}>
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Verify Your Piece */}
      <section style={{ padding: '0 5vw 60px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ border: '1px solid #050505', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: F, fontSize: '20px', fontWeight: 300, color: '#050505', marginBottom: '12px' }}>
            Verify Your Piece
          </h2>
          <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 300, lineHeight: 1.8, color: '#555', marginBottom: '24px', maxWidth: '480px', margin: '0 auto 24px' }}>
            Enter the authentication code from your certificate or scan the QR code to verify the authenticity of your Vault Maison piece.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="text"
              placeholder="Enter authentication code"
              style={{
                fontFamily: F,
                fontSize: '13px',
                fontWeight: 300,
                padding: '12px 16px',
                border: '1px solid #050505',
                borderRight: 'none',
                outline: 'none',
                flex: 1,
                backgroundColor: '#FFFFFF',
                color: '#050505',
              }}
              readOnly
            />
            <button style={{
              fontFamily: F,
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '12px 24px',
              backgroundColor: '#050505',
              color: '#FFFFFF',
              border: '1px solid #050505',
              cursor: 'pointer',
            }}>
              Verify
            </button>
          </div>
        </div>
      </section>

      {/* CTA + Cross-links */}
      <section style={{ padding: '0 5vw 100px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: F, fontSize: '14px', fontWeight: 300, color: '#9B9B9B', marginBottom: '16px' }}>
          Questions about authenticity or certification?
        </p>
        <Link href="/minimal/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: F, fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#050505', textDecoration: 'none', marginBottom: '32px' }}>
          Contact Our Gemologists
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}>
          <Link href="/minimal/privacy" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Privacy Policy
          </Link>
          <Link href="/minimal/terms" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Terms of Service
          </Link>
          <Link href="/minimal/shipping" style={{ fontFamily: F, fontSize: '12px', color: '#9B9B9B', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
            Shipping & Returns
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .vm-auth-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </MinimalLayout>
  )
}
