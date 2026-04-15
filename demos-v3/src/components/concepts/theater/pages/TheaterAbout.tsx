'use client'
import React from 'react'
import Image from 'next/image'
import { TH, TheaterSection, RevealSection, StaggerItem, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton, ActCounter } from '../ui'
import { Sparkles, Heart, Eye, Star } from 'lucide-react'

export function TheaterAbout() {
  const values = [
    { icon: <Sparkles size={24} />, title: 'Dramatic Beauty', desc: 'We believe jewelry should evoke emotion. Every piece is designed to create a moment — a gasp, a sigh, a memory that lasts forever.' },
    { icon: <Heart size={24} />, title: 'Passionate Craft', desc: 'Our artisans pour their hearts into every creation. Each piece carries the passion and dedication of master craftspeople.' },
    { icon: <Eye size={24} />, title: 'Immersive Experience', desc: 'From the first glance to the final fitting, we create a theatrical journey that transforms the act of acquiring jewelry.' },
    { icon: <Star size={24} />, title: 'Timeless Performance', desc: 'Like a great performance, our jewelry transcends the moment. Each piece is crafted to be treasured across generations.' },
  ]
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(12,10,13,0.6), rgba(12,10,13,0.85)), url('/images/theater/opera-house.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 80px', textAlign: 'center' }}>
          <ActLabel label="About the Theater" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 className="theater-hero-fade-delay-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', fontWeight: 500, color: TH.text, margin: '0 0 20px', lineHeight: 1.2 }}>
            Where Every Jewel Takes Center Stage
          </h1>
          <p className="theater-hero-fade-delay-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', color: TH.textSecondary, lineHeight: 1.7 }}>
            The Immersive Theater reimagines luxury jewelry as a dramatic experience — emotional, captivating, and unforgettable.
          </p>
        </div>
      </section>

      <TheaterSection>
        <RevealSection>
          <ActCounter items={[
            { value: '47', label: 'Master Artisans' },
            { value: '12K+', label: 'Pieces Created' },
            { value: '28', label: 'Years of Craft' },
            { value: '100%', label: 'Ethically Sourced' },
          ]} />
        </RevealSection>
      </TheaterSection>

      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <ActLabel label="Our Story" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>Born From a Love of Drama</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Founded by a former theater director and a third-generation jeweler, The Immersive Theater was born from a shared belief: that luxury should be experienced, not merely purchased.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary, lineHeight: 1.8 }}>
                Every element of our experience is choreographed — from the dramatic lighting of our showroom to the velvet-lined presentation of each piece. We don&apos;t sell jewelry; we stage performances.
              </p>
            </div>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/theater/chandelier.jpg" alt="Theater chandelier" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </TheaterSection>

      <TheaterSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <ActLabel label="Our Values" style={{ marginBottom: 24, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text }}>The Four Acts</h2>
          </div>
        </RevealSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {values.map((v, i) => (
            <StaggerItem key={i} index={i}>
              <div className="theater-card-hover" style={{ background: TH.card, border: `1px solid ${TH.border}`, padding: 32 }}>
                <div style={{ color: TH.gold, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 500, color: TH.text, margin: '0 0 8px' }}>{v.title}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: TH.textSecondary, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>

      {/* Lifestyle Gallery */}
      <TheaterSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <ActLabel label="Behind the Curtain" style={{ marginBottom: 16, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: TH.text }}>Scenes from the Atelier</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, height: 360 }}>
            <StaggerItem index={0}>
              <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                <Image src="/images/lifestyle/artisan-hands.jpg" alt="Artisan at work" fill style={{ objectFit: 'cover' }} />
              </div>
            </StaggerItem>
            <StaggerItem index={1}>
              <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                <Image src="/images/lifestyle/diamond-closeup.jpg" alt="Diamond closeup" fill style={{ objectFit: 'cover' }} />
              </div>
            </StaggerItem>
            <StaggerItem index={2}>
              <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
                <Image src="/images/lifestyle/velvet-display.jpg" alt="Velvet display" fill style={{ objectFit: 'cover' }} />
              </div>
            </StaggerItem>
          </div>
        </RevealSection>
      </TheaterSection>

      <section style={{ background: TH.bgAlt, padding: '80px 0', textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>Experience the Performance</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary, marginBottom: 32 }}>Book a private showing in our theatrical showroom.</p>
          <TheaterButton href="/theater/contact" size="lg">Reserve Your Seat</TheaterButton>
        </RevealSection>
      </section>
    </>
  )
}
