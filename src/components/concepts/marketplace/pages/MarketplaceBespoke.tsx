'use client'
import React from 'react'
import Image from 'next/image'
import { MK, MarketplaceSection, RevealSection, StaggerItem, SectionLabel, LotDivider } from '../MarketplaceLayout'
import { MarketplaceButton, MarketplaceInput } from '../ui'
import { Upload, Shield, TrendingUp, Clock, ArrowRight } from 'lucide-react'

export function MarketplaceBespoke() {
  return (
    <>
      <section style={{
        position: 'relative', minHeight: '45vh', display: 'flex', alignItems: 'center',
        background: `linear-gradient(rgba(13,17,23,0.8), rgba(13,17,23,0.95)), url('/images/marketplace/gemstone-tray.jpg') center/cover`,
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '120px 32px 60px', textAlign: 'center' }}>
          <SectionLabel label="Consignment" style={{ marginBottom: 24, justifyContent: 'center' }} />
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '2.5rem', fontWeight: 700, color: MK.text, margin: '0 0 16px' }}>Sell With Us</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', color: MK.textSecondary }}>Reach 47,000+ verified collectors worldwide. Our expert team handles everything from authentication to delivery.</p>
        </div>
      </section>

      <MarketplaceSection>
        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 48 }}>
            {[
              { icon: <Upload size={20} />, title: 'Submit', desc: 'Upload photos and details of your piece for initial assessment.' },
              { icon: <Shield size={20} />, title: 'Authenticate', desc: 'Our experts verify and grade your piece with a detailed report.' },
              { icon: <TrendingUp size={20} />, title: 'List & Sell', desc: 'Your piece goes live to our global collector network.' },
              { icon: <Clock size={20} />, title: 'Get Paid', desc: 'Secure payment within 7 days of sale confirmation.' },
            ].map((step, i) => (
              <StaggerItem key={i} index={i}>
                <div style={{ textAlign: 'center', padding: 20 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `${MK.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: MK.accent }}>{step.icon}</div>
                  <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', fontWeight: 600, color: MK.text, margin: '0 0 6px' }}>{step.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.7rem', color: MK.textSecondary, margin: 0 }}>{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </RevealSection>

        <LotDivider style={{ marginBottom: 48 }} />

        <RevealSection>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <SectionLabel label="Submit Your Piece" style={{ marginBottom: 20 }} />
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: MK.text, margin: '0 0 20px' }}>Consignment Inquiry</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <MarketplaceInput label="First Name" placeholder="First name" />
                <MarketplaceInput label="Last Name" placeholder="Last name" />
              </div>
              <MarketplaceInput label="Email" placeholder="your@email.com" type="email" />
              <MarketplaceInput label="Piece Description" placeholder="Describe your piece, including any known provenance..." multiline rows={4} />
              <MarketplaceInput label="Estimated Value" placeholder="$" />
              <MarketplaceButton size="lg">Submit for Review <ArrowRight size={12} /></MarketplaceButton>
            </div>
            <div style={{ position: 'relative', height: 500, borderRadius: 4, overflow: 'hidden' }}>
              <Image src="/images/marketplace/heritage-piece.jpg" alt="Consignment" fill style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </RevealSection>
      </MarketplaceSection>
    </>
  )
}
