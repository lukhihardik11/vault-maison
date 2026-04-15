'use client'
import React from 'react'
import Image from 'next/image'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton, CountdownTimer } from '../ui'
import { Gavel, Shield, Clock, Users, ArrowRight } from 'lucide-react'

export function MarketplaceCraftsmanship() {
  const upcomingAuctions = [
    { title: 'Spring Exceptional Gems', date: 'May 15, 2024', lots: 87, estimate: '$4.2M - $6.8M' },
    { title: 'Heritage & Estate Jewelry', date: 'June 3, 2024', lots: 124, estimate: '$2.1M - $3.5M' },
    { title: 'Modern Masters Collection', date: 'June 22, 2024', lots: 56, estimate: '$1.8M - $2.9M' },
  ]

  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(13,17,23,0.85), rgba(13,17,23,0.95)), url('/images/marketplace/auction-gavel.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="Auction House" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Live &amp; Upcoming Auctions</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: MK.textSecondary }}>Where rarity meets competition. Join collectors worldwide in the pursuit of the extraordinary.</p>
        </div>
      </section>

      <MarketplaceSection>
        <RevealSection>
          <div style={{ background: MK.card, border: `2px solid ${MK.accent}40`, borderRadius: 4, padding: 32, marginBottom: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: MK.success, animation: 'marketplace-pulse 2s infinite' }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MK.success }}>LIVE NOW</span>
                </div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: MK.text, margin: 0 }}>Rare Colored Diamonds</h2>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.75rem', color: MK.textSecondary, marginTop: 4 }}>42 lots • Est. $3.2M - $5.1M</p>
              </div>
              <CountdownTimer days={0} hours={6} minutes={42} seconds={18} label="Closes In" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <MarketplaceButton href="/marketplace/collections" size="lg"><Gavel size={14} /> Join Auction</MarketplaceButton>
              <MarketplaceButton href="/marketplace/collections" variant="secondary">View Catalog</MarketplaceButton>
            </div>
          </div>
        </RevealSection>

        <RevealSection>
          <SectionLabel label="Upcoming" style={{ marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {upcomingAuctions.map((auction, i) => (
              <StaggerItem key={i} index={i}>
                <div className="marketplace-card-hover" style={{ background: MK.card, border: `1px solid ${MK.border}`, borderRadius: 4, padding: 24 }}>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1rem', fontWeight: 600, color: MK.text, margin: '0 0 8px' }}>{auction.title}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Clock size={12} color={MK.textSecondary} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary }}>{auction.date}</span>
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.65rem', color: MK.textSecondary, marginBottom: 12 }}>{auction.lots} lots • {auction.estimate}</div>
                  <MarketplaceButton variant="secondary" size="sm">Register Interest</MarketplaceButton>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>
      </MarketplaceSection>

      <MarketplaceSection alt>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative', height: 400, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/marketplace/rare-emerald.jpg" alt="Authentication" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <SectionLabel label="How It Works" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.6rem', fontWeight: 700, color: MK.text, margin: '0 0 20px' }}>Bidding Made Simple</h2>
              {[
                { step: '01', title: 'Register', desc: 'Create an account and verify your identity.' },
                { step: '02', title: 'Browse & Research', desc: 'Explore lots with detailed reports and provenance.' },
                { step: '03', title: 'Place Bids', desc: 'Bid live or set maximum auto-bids.' },
                { step: '04', title: 'Win & Collect', desc: 'Secure payment and insured delivery worldwide.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', fontWeight: 700, color: MK.accent, minWidth: 24 }}>{item.step}</span>
                  <div>
                    <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: MK.text, margin: '0 0 2px' }}>{item.title}</h4>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>
    </>
  )
}
