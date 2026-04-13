'use client'

import React from 'react'
import { GalleryLayout, G } from '../GalleryLayout'
import { MuseumCaption } from '../ui/MuseumCaption'

const sections = [
  { title: 'Information We Collect', content: 'We collect personal information you provide directly, including name, email, shipping address, and payment details when making an acquisition. We also collect browsing data to improve your gallery experience.' },
  { title: 'How We Use Your Information', content: 'Your information is used to process orders, communicate about your acquisitions, send exhibition updates (with consent), and improve our services. We never sell your personal data to third parties.' },
  { title: 'Data Security', content: 'We employ industry-standard encryption and security measures to protect your personal information. Payment processing is handled by PCI-compliant third-party providers.' },
  { title: 'Cookies', content: 'We use essential cookies for site functionality and analytics cookies to understand how visitors interact with our gallery. You can manage cookie preferences through your browser settings.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. Contact us at privacy@vaultmaison.com for any requests.' },
  { title: 'Contact', content: 'For privacy-related inquiries, please contact our Data Protection Officer at privacy@vaultmaison.com or write to: Vault Maison, 47 Bond Street, London W1S 2QA.' },
]

export function GalleryPrivacy() {
  return (
    <GalleryLayout>
      <section style={{ padding: '160px 32px 80px', textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
        <MuseumCaption align="center">Legal</MuseumCaption>
        <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 400, color: G.text, margin: '16px 0 16px' }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: G.caption }}>Last updated: March 2025</p>
      </section>

      <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 32px 140px' }}>
        {sections.map((s, i) => (
          <div key={i} style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: '1.05rem', fontWeight: 400, color: G.text, margin: '0 0 12px' }}>{s.title}</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: G.textSecondary, lineHeight: 1.8, margin: 0 }}>{s.content}</p>
            {i < sections.length - 1 && <div style={{ height: 1, background: G.border, marginTop: 48 }} />}
          </div>
        ))}
      </section>
    </GalleryLayout>
  )
}
