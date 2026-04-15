'use client'
import React from 'react'
import Image from 'next/image'
import { TH, TheaterSection, RevealSection, StaggerItem, ActLabel } from '../TheaterLayout'
import { TheaterButton } from '../ui'
import { BookOpen, Clock } from 'lucide-react'

const articles = [
  { title: 'The Art of the Grand Entrance: How Jewelry Sets the Scene', excerpt: 'Exploring the theatrical tradition of making an entrance and how the right piece of jewelry can transform any moment into a performance.', image: '/images/theater/chandelier.jpg', date: 'Mar 2024', readTime: '8 min', category: 'Culture' },
  { title: 'Behind the Curtain: A Day in Our Atelier', excerpt: 'Step behind the scenes to witness the daily rituals and meticulous processes of our master artisans.', image: '/images/theater/artisan-hands.jpg', date: 'Feb 2024', readTime: '12 min', category: 'Craft' },
  { title: 'The Language of Light: Understanding Diamond Brilliance', excerpt: 'How light interacts with diamond facets to create the mesmerizing display of brilliance, fire, and scintillation.', image: '/images/theater/diamond-glow.jpg', date: 'Jan 2024', readTime: '10 min', category: 'Education' },
  { title: 'Velvet & Gold: The Materials of Drama', excerpt: 'From the velvet-lined cases to the gold settings, every material in our theater is chosen for its emotional impact.', image: '/images/theater/red-velvet.jpg', date: 'Dec 2023', readTime: '7 min', category: 'Design' },
  { title: 'The Collector\'s Soliloquy: Why We Acquire', excerpt: 'A philosophical exploration of the human desire to collect beautiful objects and the stories they tell.', image: '/images/theater/jewel-box.jpg', date: 'Nov 2023', readTime: '15 min', category: 'Philosophy' },
]

export function TheaterJournal() {
  return (
    <>
      <section style={{ background: TH.bg, padding: '100px 0 40px', borderBottom: `1px solid ${TH.border}` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 32px', textAlign: 'center' }}>
          <ActLabel label="The Playbill" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 500, color: TH.text, margin: '0 0 12px' }}>Journal</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary }}>Stories, insights, and behind-the-scenes narratives.</p>
        </div>
      </section>

      <TheaterSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src={articles[0].image} alt={articles[0].title} fill style={{ objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 16, left: 16, background: TH.accent, padding: '4px 12px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: TH.text }}>FEATURED</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.gold }}>{articles[0].category}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.65rem', color: TH.textSecondary }}>{articles[0].date}</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 500, color: TH.text, margin: '0 0 16px', lineHeight: 1.3 }}>{articles[0].title}</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem', color: TH.textSecondary, lineHeight: 1.7, marginBottom: 24 }}>{articles[0].excerpt}</p>
              <TheaterButton variant="secondary" style={{ alignSelf: 'flex-start' }}>Read Full Story</TheaterButton>
            </div>
          </div>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {articles.slice(1).map((article, i) => (
            <StaggerItem key={i} index={i}>
              <div className="theater-card-hover" style={{ background: TH.card, border: `1px solid ${TH.border}`, display: 'grid', gridTemplateColumns: '180px 1fr', overflow: 'hidden', cursor: 'pointer' }}>
                <div style={{ position: 'relative', height: 180 }}>
                  <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 20 }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', color: TH.gold }}>{article.category}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.55rem', color: TH.textSecondary }}>{article.readTime}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.95rem', fontWeight: 500, color: TH.text, margin: '0 0 8px', lineHeight: 1.3 }}>{article.title}</h3>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', color: TH.textSecondary, lineHeight: 1.6, margin: 0 }}>{article.excerpt.substring(0, 80)}...</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>
    </>
  )
}
