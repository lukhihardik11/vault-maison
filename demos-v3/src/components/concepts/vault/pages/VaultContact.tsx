'use client'
import { VaultLayout } from '../VaultLayout'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SparkleGlowButton } from '../ui/SparkleGlowButton'
import { DarkNeumorphicInput } from '../ui/DarkNeumorphicInput'

const GOLD = '#D4AF37'
const BG = '#0A0A0A'
const SURFACE = '#141414'
const MUTED = '#333333'
const TEXT = '#EAEAEA'

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px', backgroundColor: 'rgba(255,255,255,0.03)',
  border: `1px solid ${MUTED}`, borderRadius: 4, color: TEXT, fontSize: 14, outline: 'none',
}

export function VaultContact() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase' }}>Get in Touch</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT, marginTop: 12 }}>Contact Us</h1>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', marginTop: 12, maxWidth: 500, margin: '12px auto 0' }}>
            Our team of experts is here to assist you with any inquiry.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          {/* Contact Info */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {[
                { icon: MapPin, title: 'Visit Our Showroom', lines: ['725 Fifth Avenue, 12th Floor', 'New York, NY 10022'] },
                { icon: Phone, title: 'Call Us', lines: ['+1 (212) 555-0199', 'Mon-Sat, 10am-7pm EST'] },
                { icon: Mail, title: 'Email', lines: ['concierge@vaultmaison.com', 'Response within 2 hours'] },
                { icon: Clock, title: 'Hours', lines: ['Monday - Saturday: 10am - 7pm', 'Sunday: By Appointment Only'] },
              ].map((c) => (
                <div key={c.title} style={{ display: 'flex', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 8, backgroundColor: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <c.icon size={20} color={GOLD} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: TEXT, marginBottom: 6 }}>{c.title}</div>
                    {c.lines.map((l, i) => <div key={i} style={{ fontSize: 14, color: 'rgba(234,234,234,0.5)', lineHeight: 1.6 }}>{l}</div>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div style={{ padding: 40, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: TEXT, marginBottom: 24 }}>Send a Message</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>First Name</label><input style={inputStyle} placeholder="First name" /></div>
              <div><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Last Name</label><input style={inputStyle} placeholder="Last name" /></div>
            </div>
            <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Email</label><input style={inputStyle} placeholder="Email address" type="email" /></div>
            <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Subject</label>
              <select style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
                <option style={{ background: BG }}>General Inquiry</option>
                <option style={{ background: BG }}>Private Consultation</option>
                <option style={{ background: BG }}>Bespoke Commission</option>
                <option style={{ background: BG }}>After-Sale Service</option>
              </select>
            </div>
            <div style={{ marginTop: 16 }}><label style={{ fontSize: 12, color: 'rgba(234,234,234,0.4)', display: 'block', marginBottom: 6 }}>Message</label>
              <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} placeholder="How can we help you?" />
            </div>
            <div style={{ marginTop: 24 }}><SparkleGlowButton>Send Message</SparkleGlowButton></div>
          </div>
        </div>
      </div>
    </VaultLayout>
  )
}
