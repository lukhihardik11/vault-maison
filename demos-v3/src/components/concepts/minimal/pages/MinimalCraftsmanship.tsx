'use client'

import Image from 'next/image'
import { MinimalPage } from '../MinimalPage'

export function MinimalCraftsmanship() {
  return (
    <MinimalPage title="Craftsmanship" subtitle="The process behind every piece.">
      <div style={{ maxWidth: '800px' }}>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden', backgroundColor: '#F5F5F5', marginBottom: '48px' }}>
          <Image src="/images/diamond-facets-1.jpg" alt="Diamond craftsmanship" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 800px" />
        </div>

        {[
          {
            title: 'Stone Selection',
            text: 'Every diamond is hand-selected from a pool of thousands. Our gemologists evaluate each stone under controlled lighting conditions, assessing brilliance, fire, and scintillation beyond what certification alone can capture.',
          },
          {
            title: 'Design',
            text: 'Each setting is engineered to maximize light performance while maintaining structural integrity. CAD modeling allows us to test every angle before a single gram of metal is cast.',
          },
          {
            title: 'Setting',
            text: 'Our master setters work under 10x magnification, placing each stone with sub-millimeter precision. The goal is invisible metalwork — the setting should disappear, leaving only the stone.',
          },
          {
            title: 'Finishing',
            text: 'Final polish is performed by hand. Each piece passes through seven stages of quality inspection before it receives the Vault Maison hallmark.',
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '60px' }}>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.3, marginBottom: '8px' }}>
              {String(i + 1).padStart(2, '0')}
            </p>
            <h2 style={{ fontSize: '18px', fontWeight: 300, marginBottom: '12px' }}>{section.title}</h2>
            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>{section.text}</p>
          </div>
        ))}
      </div>
    </MinimalPage>
  )
}
