'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MinimalPage } from '../MinimalPage'

export function MinimalAbout() {
  return (
    <MinimalPage title="About" subtitle="A legacy of precision and restraint.">
      <div style={{ maxWidth: '800px' }}>
        {/* Section 1 */}
        <div style={{ marginBottom: '80px' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              overflow: 'hidden',
              backgroundColor: '#F5F5F5',
              marginBottom: '32px',
            }}
          >
            <Image
              src="/images/fine-jewelry-product.jpg"
              alt="Vault Maison jewelry collection"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: 300, marginBottom: '16px' }}>
            Founded on Precision
          </h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            Vault Maison was born from a simple belief: that every extraordinary diamond deserves an equally extraordinary setting. Our founders, third-generation gemologists, combined their deep knowledge of stones with a modern vision for luxury retail. Today, we continue that tradition, sourcing the finest diamonds and crafting pieces that transcend trends.
          </p>
        </div>

        {/* Section 2 */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 300, marginBottom: '16px' }}>
            The Art of Selection
          </h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            Every diamond in our collection is hand-selected by our master gemologists. We examine thousands of stones to find the rare few that meet our exacting standards. Each stone must exhibit exceptional brilliance, fire, and scintillation — qualities that can only be assessed by the trained eye and decades of experience.
          </p>
        </div>

        {/* Section 3 */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 300, marginBottom: '16px' }}>
            Sustainable Luxury
          </h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            We believe that true luxury must be responsible. Our diamonds are ethically sourced through established, transparent supply chains. We work exclusively with mines and cutting houses that adhere to the highest environmental and social standards, ensuring that every purchase supports positive change.
          </p>
        </div>

        {/* CTA */}
        <div style={{ borderTop: '1px solid #E5E5E5', paddingTop: '40px' }}>
          <Link
            href="/minimal/contact"
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 400,
              color: '#050505',
              textDecoration: 'none',
              opacity: 0.6,
              transition: 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6' }}
          >
            Schedule a Private Viewing &rarr;
          </Link>
        </div>
      </div>
    </MinimalPage>
  )
}
