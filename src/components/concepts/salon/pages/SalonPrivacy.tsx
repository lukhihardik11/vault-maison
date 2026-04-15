'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly, such as your name, email, phone number, and shipping address when you make a purchase or create an account. We also collect browsing data to improve your experience.' },
  { title: 'How We Use Your Information', content: 'Your information helps us personalize your experience, process orders, provide advisor recommendations, and communicate about new arrivals and events. We never sell your personal data to third parties.' },
  { title: 'Your Advisor Relationship', content: 'When you work with a personal advisor, they may keep notes about your preferences and past purchases to provide better recommendations. This information is kept strictly confidential.' },
  { title: 'Data Security', content: 'We use industry-standard encryption and security measures to protect your personal and payment information. All transactions are processed through secure, PCI-compliant systems.' },
  { title: 'Cookies & Tracking', content: 'We use cookies to remember your preferences and improve site functionality. You can manage cookie preferences in your browser settings at any time.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@thesalon.com to exercise these rights.' },
]

export function SalonPrivacy() {
  return (
    <SalonLayout>
      <section style={{ padding: '80px 32px 60px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Privacy Policy</h1>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary }}>Last updated: April 2026</p>
      </section>

      <section style={{ maxWidth: 700, margin: '0 auto', padding: '0 32px 100px' }}>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, lineHeight: 1.8, marginBottom: 40 }}>
          At The Salon, your privacy is as important to us as the trust you place in our advisors. This policy explains how we collect, use, and protect your information.
        </p>
        {sections.map((section, i) => (
          <div key={i} style={{ marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', fontWeight: 400, color: S.text, margin: '0 0 10px' }}>{section.title}</h2>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.85rem', color: S.textSecondary, lineHeight: 1.7, margin: 0 }}>{section.content}</p>
            {i < sections.length - 1 && <div style={{ borderBottom: `1px solid ${S.border}`, marginTop: 32 }} />}
          </div>
        ))}
      </section>
    </SalonLayout>
  )
}
