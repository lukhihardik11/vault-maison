'use client'
import React from 'react'
import Image from 'next/image'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton, StatCard } from '../ui'
import { Shield, Award, Globe, Users, ArrowRight } from 'lucide-react'

export function MarketplaceAbout() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '50vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(13,17,23,0.8), rgba(13,17,23,0.95)), url('/images/marketplace/bidding-room.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="Our Story" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.8rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>The Marketplace of Rarity</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: MK.textSecondary, lineHeight: 1.7 }}>
            Where the world&apos;s most exceptional jewelry finds its next custodian. A curated marketplace built on trust, expertise, and the thrill of discovery.
          </p>
        </div>
      </section>

      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            <StatCard value="$2.4B" label="Total Sales Volume" icon={<Globe size={20} />} />
            <StatCard value="47K+" label="Registered Collectors" icon={<Users size={20} />} />
            <StatCard value="99.8%" label="Authentication Rate" icon={<Shield size={20} />} />
            <StatCard value="142" label="Countries Served" icon={<Award size={20} />} />
          </div>
        </RevealSection>
      </MarketplaceSection>

      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <SectionLabel label="Our Mission" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.8rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Connecting Rarity with Passion</h2>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, lineHeight: 1.8, marginBottom: 16 }}>
                Founded in 1996, the Marketplace of Rarity was born from a simple belief: the world&apos;s most extraordinary jewelry deserves a platform that matches its caliber. We combine the rigor of a traditional auction house with the accessibility of modern technology.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', color: MK.textSecondary, lineHeight: 1.8, marginBottom: 24 }}>
                Every piece that enters our marketplace undergoes a 47-point authentication process, ensuring that collectors can bid with absolute confidence.
              </p>
              <MarketplaceButton href="/marketplace/collections" variant="secondary">Browse Current Lots <ArrowRight size={12} /></MarketplaceButton>
            </div>
            <div style={{ position: 'relative', height: 400, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/marketplace/collector-desk.jpg" alt="Collector desk" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>

      <MarketplaceSection>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SectionLabel label="Our Values" style={{ marginBottom: 16, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.8rem', fontWeight: 700, color: MK.text }}>Built on Trust</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: <Shield size={24} />, title: 'Authentication', desc: 'Every piece undergoes our rigorous 47-point verification process before listing. We work with GIA, AGS, and independent gemologists.' },
              { icon: <Award size={24} />, title: 'Provenance', desc: 'Complete ownership history and documentation for every lot. Blockchain-verified certificates of authenticity for high-value pieces.' },
              { icon: <Globe size={24} />, title: 'Global Reach', desc: 'Connecting collectors across 142 countries with insured, white-glove delivery and customs handling for international transactions.' },
            ].map((item, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 28 }}>
                  <div style={{ color: MK.accent, marginBottom: 16 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, color: MK.text, margin: '0 0 8px' }}>{item.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* Lifestyle Gallery */}
      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <SectionLabel label="The World of Rarity" style={{ marginBottom: 16, justifyContent: 'center' }} />
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.8rem', fontWeight: 700, color: MK.text }}>Where Treasures Change Hands</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, height: 380 }}>
            <StaggerItem index={0}>
              <div style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: 4 }}>
                <Image src="/images/lifestyle/gemstone-collection.jpg" alt="Gemstone collection" fill style={{ objectFit: 'cover' }} />
              </div>
            </StaggerItem>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <StaggerItem index={1}>
                <div style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: 4 }}>
                  <Image src="/images/lifestyle/luxury-interior.jpg" alt="Luxury interior" fill style={{ objectFit: 'cover' }} />
                </div>
              </StaggerItem>
              <StaggerItem index={2}>
                <div style={{ position: 'relative', height: '100%', overflow: 'hidden', borderRadius: 4 }}>
                  <Image src="/images/lifestyle/watch-jewelry.jpg" alt="Fine timepieces" fill style={{ objectFit: 'cover' }} />
                </div>
              </StaggerItem>
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>

      {/* CTA */}
      <section style={{ background: `linear-gradient(135deg, ${MK.accent}20, ${MK.bg})`, padding: '80px 32px', textAlign: 'center' }}>
        <RevealSection>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2rem', fontWeight: 700, color: MK.text, margin: '0 0 12px' }}>Ready to Discover?</h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', color: MK.textSecondary, marginBottom: 32 }}>Join thousands of collectors who trust the Marketplace of Rarity.</p>
          <MarketplaceButton href="/marketplace/collections" size="lg">Explore Current Lots <ArrowRight size={14} /></MarketplaceButton>
        </RevealSection>
      </section>
    </>
  )
}
