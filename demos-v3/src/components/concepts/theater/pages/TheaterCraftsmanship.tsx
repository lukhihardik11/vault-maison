'use client'
import React from 'react'
import Image from 'next/image'
import { TH, TheaterSection, RevealSection, StaggerItem, ActLabel, GoldRule } from '../TheaterLayout'
import { TheaterButton, ProgramCard } from '../ui'
import { Sparkles, Gem, Palette, Flame, Eye, Crown } from 'lucide-react'

export function TheaterCraftsmanship() {
  const acts = [
    { icon: <Eye size={20} />, title: 'The Vision', desc: 'Every piece begins with a creative vision — a story waiting to be told through precious materials and masterful technique.', num: 'I' },
    { icon: <Gem size={20} />, title: 'Stone Selection', desc: 'Our gemologists search the world for stones with exceptional character. Each must possess the drama and brilliance worthy of center stage.', num: 'II' },
    { icon: <Palette size={20} />, title: 'Design', desc: 'Master designers translate emotion into form, creating pieces that capture light and imagination in equal measure.', num: 'III' },
    { icon: <Flame size={20} />, title: 'The Forge', desc: 'In our atelier, precious metals are heated, shaped, and refined by artisans whose skills have been honed over decades.', num: 'IV' },
    { icon: <Sparkles size={20} />, title: 'Setting', desc: 'Each stone is placed with microscopic precision, ensuring optimal light performance and structural integrity.', num: 'V' },
    { icon: <Crown size={20} />, title: 'The Premiere', desc: 'The finished piece undergoes final inspection before its grand debut — ready to take center stage in your collection.', num: 'VI' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(12,10,13,0.6), rgba(12,10,13,0.9)), url('/images/theater/artisan-hands.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '100px 32px 60px', textAlign: 'center' }}>
          <ActLabel label="The Craft" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>The Art of Creation</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', color: TH.textSecondary }}>Six acts of transformation, from raw material to masterpiece.</p>
        </div>
      </section>

      <TheaterSection>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {acts.map((act, i) => (
            <StaggerItem key={i} index={i}>
              <ProgramCard icon={act.icon} title={act.title} description={act.desc} number={act.num} />
            </StaggerItem>
          ))}
        </div>
      </TheaterSection>

      <TheaterSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 400, overflow: 'hidden' }}>
              <Image src="/images/theater/diamond-glow.jpg" alt="Diamond craftsmanship" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <ActLabel label="Master Artisans" style={{ marginBottom: 24 }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 500, color: TH.text, margin: '0 0 16px' }}>Performers of Precision</h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Our artisans are performers in their own right — each movement deliberate, each decision informed by decades of experience. They work under magnification, with tools that haven&apos;t changed in centuries, creating pieces that push the boundaries of what&apos;s possible.
              </p>
              <TheaterButton href="/theater/contact" variant="secondary">Meet Our Artisans</TheaterButton>
            </div>
          </div>
        </RevealSection>
      </TheaterSection>

      <section style={{ background: TH.bg, padding: '80px 0', textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: TH.text, margin: '0 0 16px' }}>Commission a Performance</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.9rem', color: TH.textSecondary, marginBottom: 32 }}>Create a bespoke piece that tells your unique story.</p>
          <TheaterButton href="/theater/bespoke" size="lg">Begin Your Story</TheaterButton>
        </RevealSection>
      </section>
    </>
  )
}
