'use client'
import { VaultLayout } from '../VaultLayout'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

export function VaultContact() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500 }}>Get in Touch</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Contact Us</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.45)', marginTop: 16, maxWidth: 500, margin: '16px auto 0', lineHeight: 1.8 }}>
            Our team of experts is here to assist you with any inquiry.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          {/* Contact Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[
                { icon: MapPin, title: 'Visit Our Showroom', lines: ['725 Fifth Avenue, 12th Floor', 'New York, NY 10022'] },
                { icon: Phone, title: 'Call Us', lines: ['+1 (212) 555-0199', 'Mon-Sat, 10am-7pm EST'] },
                { icon: Mail, title: 'Email', lines: ['concierge@vaultmaison.com', 'Response within 2 hours'] },
                { icon: Clock, title: 'Hours', lines: ['Monday - Saturday: 10am - 7pm', 'Sunday: By Appointment Only'] },
              ].map((c) => (
                <div key={c.title} style={{ display: 'flex', gap: 18 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 10,
                    backgroundColor: 'rgba(212,175,55,0.05)',
                    border: '1px solid rgba(212,175,55,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <c.icon size={20} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 6, fontFamily: 'Cinzel, serif' }}>{c.title}</div>
                    {c.lines.map((l, i) => <div key={i} style={{ fontSize: 14, color: 'rgba(234,234,234,0.45)', lineHeight: 1.7 }}>{l}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form — using DarkNeumorphicInput */}
          <div style={{
            padding: 44, backgroundColor: SURFACE, borderRadius: 12,
            border: '1px solid rgba(212,175,55,0.08)',
          }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: TEXT, marginBottom: 28, fontWeight: 400 }}>Send a Message</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>First Name</label>
                <DarkNeumorphicInput placeholder="First name" />
              </div>
              <div>
                <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Last Name</label>
                <DarkNeumorphicInput placeholder="Last name" />
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Email</label>
              <DarkNeumorphicInput placeholder="Email address" type="email" />
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Subject</label>
              <select style={{
                width: '100%', padding: '14px 16px',
                backgroundColor: 'rgba(20,20,20,0.8)',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: 8, color: TEXT, fontSize: 14, outline: 'none',
                cursor: 'pointer', appearance: 'none',
                transition: 'border-color 0.3s ease',
              }}>
                <option style={{ background: BG }}>General Inquiry</option>
                <option style={{ background: BG }}>Private Consultation</option>
                <option style={{ background: BG }}>Bespoke Commission</option>
                <option style={{ background: BG }}>After-Sale Service</option>
              </select>
            </div>
            <div style={{ marginTop: 20 }}>
              <label style={{ fontSize: 10, color: GOLD, display: 'block', marginBottom: 8, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Message</label>
              <textarea style={{
                width: '100%', padding: '14px 16px', minHeight: 130, resize: 'vertical',
                backgroundColor: 'rgba(20,20,20,0.8)',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: 8, color: TEXT, fontSize: 14, outline: 'none',
                fontFamily: 'Inter, sans-serif', lineHeight: 1.6,
                transition: 'border-color 0.3s ease',
              }} placeholder="How can we help you?" />
            </div>
            <div style={{ marginTop: 28 }}><SparkleGlowButton>Send Message</SparkleGlowButton></div>
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
