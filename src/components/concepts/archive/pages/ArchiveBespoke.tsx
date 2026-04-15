'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { AR, ArchiveSection, RevealSection, GoldRule } from '../ArchiveLayout'
import { ArchiveButton, ArchiveInput } from '../ui'
import { Shield, Search, FileText, Phone, Mail, Clock } from 'lucide-react'

export function ArchiveBespoke() {
  const [step, setStep] = useState(0)

  const services = [
    { icon: <Search size={24} />, title: 'Acquisition Advisory', desc: 'Our specialists locate specific pieces matching your criteria through our global network of dealers, estates, and auction houses.' },
    { icon: <Shield size={24} />, title: 'Authentication Service', desc: 'Submit pieces from your personal collection for full authentication, grading, and provenance research by our expert team.' },
    { icon: <FileText size={24} />, title: 'Collection Appraisal', desc: 'Comprehensive valuation and documentation of jewelry collections for insurance, estate planning, or sale preparation.' },
  ]

  return (
    <>
      {/* Hero */}
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(30,22,20,0.65), rgba(30,22,20,0.85)), url('/images/archive/mahogany-library.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
          <p className="archive-hero-fade" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: AR.accent, marginBottom: 16 }}>
            PRIVATE SERVICES
          </p>
          <h1 className="archive-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 500, color: AR.text, margin: '0 0 20px', lineHeight: 1.2 }}>
            Advisory & Authentication
          </h1>
          <p className="archive-hero-fade-delay-2" style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.15rem', color: AR.textSecondary, lineHeight: 1.7 }}>
            Personalized services for collectors, estates, and institutions seeking expert guidance.
          </p>
        </div>
      </section>

      {/* Services */}
      <ArchiveSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {services.map((s, i) => (
            <RevealSection key={i} delay={i * 100}>
              <div style={{
                background: AR.card, border: `1px solid ${AR.border}`, padding: '32px 24px',
                textAlign: 'center', height: '100%',
              }} className="archive-doc-hover">
                <div style={{ color: AR.accent, marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 500, color: AR.text, marginBottom: 12 }}>
                  {s.title}
                </h3>
                <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.9rem', color: AR.textSecondary, lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </ArchiveSection>

      {/* Inquiry Form */}
      <ArchiveSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
            <div>
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: AR.accent, marginBottom: 12 }}>
                PRIVATE INQUIRY
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: AR.text, marginBottom: 16 }}>
                Begin a Consultation
              </h2>
              <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.05rem', color: AR.textSecondary, lineHeight: 1.7, marginBottom: 32 }}>
                All inquiries are handled with the utmost discretion. Our advisory team will respond within 24 hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <ArchiveInput label="Full Name" placeholder="Your name" />
                <ArchiveInput label="Email" placeholder="your@email.com" type="email" />
                <div>
                  <label style={{ display: 'block', marginBottom: 8, fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: AR.textSecondary }}>
                    Service Required
                  </label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Acquisition', 'Authentication', 'Appraisal', 'Other'].map((s, i) => (
                      <button key={s} onClick={() => setStep(i)} style={{
                        padding: '8px 16px', background: step === i ? AR.accentSoft : 'transparent',
                        border: `1px solid ${step === i ? AR.accent : AR.border}`,
                        color: step === i ? AR.accent : AR.textSecondary,
                        fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.65rem',
                        letterSpacing: '0.08em', cursor: 'pointer',
                      }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <ArchiveInput label="Details" placeholder="Describe your requirements..." textarea rows={4} />
                <ArchiveButton>Submit Inquiry</ArchiveButton>
              </div>
            </div>

            <div>
              <div style={{ background: AR.card, border: `1px solid ${AR.border}`, padding: '32px' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 500, color: AR.text, marginBottom: 24 }}>
                  Contact Information
                </h3>
                {[
                  { icon: <Phone size={16} />, label: 'Telephone', value: '+1 (212) 555-0142' },
                  { icon: <Mail size={16} />, label: 'Email', value: 'advisory@vaultmaison.com' },
                  { icon: <Clock size={16} />, label: 'Hours', value: 'Mon–Fri, 10:00–18:00 EST' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', borderBottom: i < 2 ? `1px solid ${AR.border}` : 'none' }}>
                    <div style={{ color: AR.accent }}>{item.icon}</div>
                    <div>
                      <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: AR.textSecondary, textTransform: 'uppercase', marginBottom: 2 }}>
                        {item.label}
                      </p>
                      <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '0.95rem', color: AR.text }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, position: 'relative', height: 200, overflow: 'hidden' }}>
                <Image src="/images/archive/dark-library.jpg" alt="Archive reading room" fill style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 12, left: 12, background: 'rgba(30,22,20,0.85)', padding: '6px 12px' }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '0.55rem', letterSpacing: '0.1em', color: AR.accent }}>
                    PRIVATE CONSULTATION ROOM
                  </span>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </ArchiveSection>

      {/* Trust */}
      <ArchiveSection dark>
        <RevealSection>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: "'Crimson Text', serif", fontSize: '1.2rem', color: AR.textSecondary, fontStyle: 'italic', maxWidth: 600, margin: '0 auto 24px', lineHeight: 1.7 }}>
              &ldquo;The Archive&rsquo;s advisory team combines decades of gemological expertise with a deep understanding of the collector&rsquo;s mindset.&rdquo;
            </p>
            <GoldRule />
          </div>
        </RevealSection>
      </ArchiveSection>
    </>
  )
}
