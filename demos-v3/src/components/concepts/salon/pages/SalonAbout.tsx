'use client'

import React from 'react'
import { SalonLayout, S } from '../SalonLayout'
import { AdvisorCard } from '../ui/AdvisorCard'
import { SalonButton } from '../ui/SalonButton'
import { Heart, Shield, Users, Sparkles } from 'lucide-react'

const values = [
  { icon: <Heart size={22} />, title: 'Personal Connection', desc: 'Every interaction begins with listening. We get to know you before we show you a single piece.' },
  { icon: <Shield size={22} />, title: 'Trust & Transparency', desc: 'Full certification, ethical sourcing, and honest guidance. We earn your trust with every recommendation.' },
  { icon: <Users size={22} />, title: 'Lifelong Relationship', desc: 'We\'re not here for a single sale. We\'re here for every milestone, every celebration, every "just because."' },
  { icon: <Sparkles size={22} />, title: 'Effortless Luxury', desc: 'Luxury should feel natural, not intimidating. We make the experience as beautiful as the jewelry itself.' },
]

const advisors = [
  { name: 'Sophie Laurent', specialty: 'Engagement & Bridal', experience: '12 years in fine jewelry', initials: 'SL', avatar: '' },
  { name: 'James Chen', specialty: 'Investment Diamonds', experience: '15 years as certified gemologist', initials: 'JC', avatar: '' },
  { name: 'Aria Patel', specialty: 'Bespoke & Custom Design', experience: '10 years in luxury design', initials: 'AP', avatar: '' },
]

export function SalonAbout() {
  return (
    <SalonLayout>
      {/* Hero */}
      <section style={{ padding: '80px 32px 100px', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 16px' }}>Our Story</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: S.text, margin: '0 0 24px', lineHeight: 1.2 }}>
            A Different Kind of<br />Jewelry Experience
          </h1>
          <p style={{ fontFamily: "'Lora', serif", fontSize: '1rem', color: S.textSecondary, lineHeight: 1.8 }}>
            We started The Salon because we believed jewelry shopping should feel like visiting a friend who happens to have impeccable taste. No pressure, no pretension — just genuine guidance from people who love what they do.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section style={{ padding: '0 32px 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ background: S.warmPanel, borderRadius: S.radiusLg, aspectRatio: '4/3', overflow: 'hidden' }}>
            <img src="/images/jewelry-boutique.jpg" alt="Our salon" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>How It Started</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 400, color: S.text, margin: '0 0 16px' }}>
              Born from a Simple Idea
            </h2>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, lineHeight: 1.8, margin: '0 0 16px' }}>
              In 2025, our founders noticed something missing in the luxury jewelry world: genuine human connection. Too many experiences felt transactional, impersonal, even intimidating.
            </p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, lineHeight: 1.8 }}>
              So they created The Salon — a space where every client is welcomed by name, where advisors take the time to understand not just what you want, but why it matters to you.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '100px 32px', background: S.surface }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>What We Believe</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, color: S.text, margin: 0 }}>Our Values</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {values.map((v) => (
              <div key={v.title} style={{ textAlign: 'center', padding: '24px 16px' }}>
                <div style={{ width: 52, height: 52, borderRadius: S.radius, background: S.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: S.accent, margin: '0 auto 16px' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 400, color: S.text, margin: '0 0 8px' }}>{v.title}</h3>
                <p style={{ fontFamily: "'Lora', serif", fontSize: '0.8rem', color: S.textSecondary, lineHeight: 1.6, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: S.accent, margin: '0 0 12px' }}>The Team</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, color: S.text, margin: 0 }}>Meet Your Advisors</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {advisors.map((a) => <AdvisorCard key={a.name} {...a} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px', background: S.warmPanel, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, color: S.text, margin: '0 0 12px' }}>Ready to Begin?</h2>
        <p style={{ fontFamily: "'Lora', serif", fontSize: '0.9rem', color: S.textSecondary, marginBottom: 28 }}>Schedule a private session with one of our advisors.</p>
        <SalonButton href="/salon/contact">Book a Session</SalonButton>
      </section>
    </SalonLayout>
  )
}
