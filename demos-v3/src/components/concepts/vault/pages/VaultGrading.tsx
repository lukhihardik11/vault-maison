'use client'
import { VaultLayout } from '../VaultLayout'
import { Diamond } from 'lucide-react'

const GOLD = '#D4AF37'
const SURFACE = '#141414'
const TEXT = '#EAEAEA'

const fourCs = [
  { letter: 'Cut', desc: 'The most critical factor in a diamond\'s beauty. Cut determines how light interacts with the stone, creating brilliance, fire, and scintillation. We only select Excellent and Ideal cuts.', grades: ['Ideal', 'Excellent', 'Very Good', 'Good', 'Fair'] },
  { letter: 'Clarity', desc: 'Clarity measures the absence of inclusions and blemishes. Our collection features diamonds graded VS2 and above, ensuring eye-clean beauty under 10x magnification.', grades: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2'] },
  { letter: 'Color', desc: 'Diamond color is graded on a scale from D (colorless) to Z. Vault Maison curates diamonds in the D-G range, the finest colorless and near-colorless grades.', grades: ['D', 'E', 'F', 'G', 'H', 'I'] },
  { letter: 'Carat', desc: 'Carat weight measures a diamond\'s size. While larger diamonds are rarer and more valuable, we prioritize the balance of all four Cs for maximum beauty.', grades: ['0.5ct', '1.0ct', '1.5ct', '2.0ct', '3.0ct', '5.0ct+'] },
]

export function VaultGrading() {
  return (
    <VaultLayout>
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <Diamond size={32} color={GOLD} style={{ marginBottom: 16 }} />
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', display: 'block' }}>Education</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 42, fontWeight: 400, color: TEXT, marginTop: 12 }}>Diamond Grading</h1>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', marginTop: 12, maxWidth: 600, margin: '12px auto 0' }}>Understanding the 4Cs — the universal language of diamond quality.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {fourCs.map((c) => (
            <div key={c.letter} style={{ padding: 32, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, color: GOLD, marginBottom: 12 }}>{c.letter}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(234,234,234,0.6)', marginBottom: 20 }}>{c.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {c.grades.map((g, i) => (
                  <span key={g} style={{
                    padding: '6px 12px', borderRadius: 4, fontSize: 12, fontWeight: 500,
                    backgroundColor: i === 0 ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${i === 0 ? GOLD : 'rgba(212,175,55,0.1)'}`,
                    color: i === 0 ? GOLD : 'rgba(234,234,234,0.5)',
                  }}>{g}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 60, padding: 40, backgroundColor: SURFACE, borderRadius: 8, border: '1px solid rgba(212,175,55,0.1)' }}>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, color: TEXT, marginBottom: 12 }}>GIA Certified</h3>
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.5)', maxWidth: 600, margin: '0 auto' }}>Every diamond in the Vault Maison collection is independently certified by the Gemological Institute of America, the world&apos;s foremost authority on diamond grading.</p>
        </div>
      </div>
    </VaultLayout>
  )
}
