'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Gem, Shield, Eye, Leaf, Ruler, Heart } from 'lucide-react'
import { MinimalLayout } from '../MinimalLayout'
import { SpotlightCards, ScrollText, SlideTextButton } from '../ui'
import type { SpotlightItem } from '../ui/SpotlightCards'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const principles: SpotlightItem[] = [
  {
    icon: Gem,
    title: 'Precision Selection',
    description: 'Every diamond is hand-selected from thousands, examined for exceptional brilliance, fire, and scintillation by our master gemologists.',
  },
  {
    icon: Shield,
    title: 'GIA Certified',
    description: 'All center stones carry independent certification from the Gemological Institute of America, ensuring objective quality grading.',
  },
  {
    icon: Eye,
    title: 'Expert Curation',
    description: 'Third-generation gemologists combine deep knowledge of stones with a modern vision for luxury retail and design.',
  },
  {
    icon: Leaf,
    title: 'Ethical Sourcing',
    description: 'We work exclusively with mines and cutting houses that adhere to the highest environmental and social standards.',
  },
  {
    icon: Ruler,
    title: 'Restrained Design',
    description: 'Our settings are engineered to maximize light return while minimizing visual noise. Nothing competes with the stone.',
  },
  {
    icon: Heart,
    title: 'Lifetime Commitment',
    description: 'Every piece includes complimentary cleaning, inspection, and prong tightening for life. Your investment is protected.',
  },
]

const brandValues = [
  'Precision',
  'Restraint',
  'Clarity',
  'Permanence',
  'Craft',
  'Truth',
]

export function MinimalAbout() {
  return (
    <MinimalLayout>
      {/* ─── Hero ─── */}
      <section style={{ padding: '100px 5vw 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p style={{
            fontFamily: font,
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '8px',
          }}>
            About
          </p>
          <h1 style={{
            fontFamily: font,
            fontSize: '32px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            A Legacy of Precision
          </h1>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            maxWidth: '500px',
          }}>
            Founded by third-generation gemologists who believe that every extraordinary diamond deserves an equally extraordinary setting.
          </p>
        </motion.div>
      </section>

      {/* ─── Editorial Split: Image + Story ─── */}
      <section style={{ padding: '80px 5vw' }} className="minimal-about-editorial">
        <div className="minimal-about-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <Image
                src="/images/fine-jewelry-product.jpg"
                alt="Vault Maison jewelry collection"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p style={{
              fontFamily: font,
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#050505',
              opacity: 0.4,
              marginBottom: '16px',
            }}>
              Our Story
            </p>
            <h2 style={{
              fontFamily: font,
              fontSize: '24px',
              fontWeight: 200,
              letterSpacing: '0.02em',
              color: '#050505',
              lineHeight: 1.3,
              marginBottom: '24px',
            }}>
              Founded on the belief that restraint is the ultimate luxury
            </h2>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.6,
              lineHeight: 1.8,
              marginBottom: '20px',
            }}>
              Vault Maison was born from a simple conviction: that every extraordinary diamond deserves an equally extraordinary setting. Our founders combined their deep knowledge of stones with a modern vision for luxury retail.
            </p>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.6,
              lineHeight: 1.8,
              marginBottom: '20px',
            }}>
              We examine thousands of stones to find the rare few that meet our exacting standards. Each stone must exhibit exceptional brilliance, fire, and scintillation — qualities that can only be assessed by the trained eye and decades of experience.
            </p>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.6,
              lineHeight: 1.8,
            }}>
              Today, we continue that tradition — sourcing the finest diamonds and crafting pieces that transcend trends, serving clients who understand that true luxury lies in what you choose to leave out.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── ScrollText: Brand Values ─── */}
      <section style={{ padding: '80px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '20px' }}
        >
          <p style={{
            fontFamily: font,
            fontSize: '10px',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#050505',
            opacity: 0.4,
            marginBottom: '12px',
          }}>
            Values
          </p>
          <h2 style={{
            fontFamily: font,
            fontSize: '24px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
          }}>
            What We Stand For
          </h2>
        </motion.div>
        <ScrollText texts={brandValues} />
      </section>

      {/* ─── SpotlightCards: Principles ─── */}
      <section style={{ padding: '120px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <SpotlightCards
          items={principles}
          eyebrow="Principles"
          heading="Why Vault Maison"
        />
      </section>

      {/* ─── Sustainability Statement ─── */}
      <section style={{ padding: '120px 5vw', borderTop: '1px solid #E5E5E5' }}>
        <div className="minimal-about-sustain" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '60px', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8 }}
          >
            <p style={{
              fontFamily: font,
              fontSize: '10px',
              fontWeight: 400,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#050505',
              opacity: 0.4,
              marginBottom: '16px',
            }}>
              Responsibility
            </p>
            <h2 style={{
              fontFamily: font,
              fontSize: '24px',
              fontWeight: 200,
              letterSpacing: '0.02em',
              color: '#050505',
              lineHeight: 1.3,
              marginBottom: '24px',
            }}>
              Sustainable Luxury
            </h2>
            <p style={{
              fontFamily: font,
              fontSize: '13px',
              fontWeight: 300,
              color: '#050505',
              opacity: 0.6,
              lineHeight: 1.8,
              marginBottom: '32px',
            }}>
              We believe that true luxury must be responsible. Our diamonds are ethically sourced through established, transparent supply chains. We work exclusively with mines and cutting houses that adhere to the highest environmental and social standards, ensuring that every purchase supports positive change.
            </p>
            <SlideTextButton
              text="Our Certifications"
              hoverText="Learn More"
              href="/minimal/grading"
              variant="ghost"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden', backgroundColor: '#F5F5F5' }}>
              <Image
                src="/images/diamond-collection-1.jpg"
                alt="Ethically sourced diamonds"
                fill
                style={{ objectFit: 'cover' }}
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ padding: '120px 5vw', borderTop: '1px solid #E5E5E5', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: '500px', margin: '0 auto' }}
        >
          <h2 style={{
            fontFamily: font,
            fontSize: '24px',
            fontWeight: 200,
            letterSpacing: '0.02em',
            color: '#050505',
            marginBottom: '16px',
          }}>
            Begin Your Journey
          </h2>
          <p style={{
            fontFamily: font,
            fontSize: '13px',
            fontWeight: 300,
            color: '#050505',
            opacity: 0.5,
            lineHeight: 1.8,
            marginBottom: '40px',
          }}>
            Schedule a private viewing at our atelier, or explore our collection online. Every interaction is personal, unhurried, and entirely on your terms.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <SlideTextButton
              text="Contact Us"
              hoverText="Get in Touch"
              href="/minimal/contact"
            />
            <SlideTextButton
              text="Collections"
              hoverText="View All"
              href="/minimal/collections"
              variant="ghost"
            />
          </div>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .minimal-about-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .minimal-about-sustain {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </MinimalLayout>
  )
}
