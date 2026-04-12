'use client'

import { MinimalPage } from '../MinimalPage'

export function MinimalGrading() {
  return (
    <MinimalPage title="Certification" subtitle="Every stone, verified.">
      <div style={{ maxWidth: '600px' }}>
        <div style={{ marginBottom: '60px' }}>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            Every diamond in our collection above 0.30 carats is independently certified by the Gemological Institute of America (GIA) or the International Gemological Institute (IGI). These certificates provide an objective assessment of each stone&apos;s quality characteristics.
          </p>
        </div>

        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '20px' }}>The 4Cs</h2>
          {[
            { label: 'Cut', desc: 'The precision of the diamond\'s facets determines how effectively it returns light. We stock only Excellent and Ideal cut grades.' },
            { label: 'Color', desc: 'Measured on a D–Z scale, with D being colorless. Our collection ranges from D to H, ensuring exceptional whiteness.' },
            { label: 'Clarity', desc: 'Rated from Flawless to Included. We select stones graded VS2 and above — eye-clean under all conditions.' },
            { label: 'Carat', desc: 'A measure of weight, not size. Our gemologists select stones that maximize face-up appearance relative to carat weight.' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '16px 0', borderBottom: '1px solid #E5E5E5' }}>
              <p style={{ fontSize: '13px', fontWeight: 400, marginBottom: '4px' }}>{item.label}</p>
              <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, opacity: 0.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 style={{ fontSize: '15px', fontWeight: 400, marginBottom: '12px' }}>Documentation</h2>
          <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.8, opacity: 0.7 }}>
            Every purchase includes the original grading certificate, a Vault Maison certificate of authenticity, and a detailed appraisal for insurance purposes. Digital copies are available through your account.
          </p>
        </div>
      </div>
    </MinimalPage>
  )
}
