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
      <div style={{ maxWidth: 1440, margin: '0 auto', padding: '120px 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', margin: '0 auto 20px',
            backgroundColor: 'rgba(212,175,55,0.04)',
            border: '1px solid rgba(212,175,55,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Diamond size={24} color={GOLD} />
          </div>
          <span style={{ fontSize: 11, letterSpacing: '0.3em', color: GOLD, textTransform: 'uppercase', fontWeight: 500, display: 'block' }}>Education</span>
          <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 400, color: TEXT, marginTop: 12 }}>Diamond Grading</h1>
          <div style={{ width: 50, height: 1, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: '20px auto 0' }} />
          <p style={{ fontSize: 15, color: 'rgba(234,234,234,0.45)', marginTop: 20, maxWidth: 600, margin: '20px auto 0', lineHeight: 1.7 }}>Understanding the 4Cs — the universal language of diamond quality.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {fourCs.map((c) => (
            <div key={c.letter} style={{
              padding: 36, backgroundColor: SURFACE, borderRadius: 10,
              border: '1px solid rgba(212,175,55,0.08)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}>
              <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 26, color: GOLD, marginBottom: 14, fontWeight: 400 }}>{c.letter}</h2>
              <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(234,234,234,0.5)', marginBottom: 24 }}>{c.desc}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {c.grades.map((g, i) => (
                  <span key={g} style={{
                    padding: '6px 14px', borderRadius: 6, fontSize: 12, fontWeight: 500,
                    backgroundColor: i === 0 ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${i === 0 ? 'rgba(212,175,55,0.3)' : 'rgba(212,175,55,0.08)'}`,
                    color: i === 0 ? GOLD : 'rgba(234,234,234,0.4)',
                    transition: 'all 0.3s ease',
                  }}>{g}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center', marginTop: 72, padding: 48, backgroundColor: SURFACE,
          borderRadius: 10, border: '1px solid rgba(212,175,55,0.08)',
        }}>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, fontWeight: 400, color: TEXT, marginBottom: 14 }}>GIA Certified</h3>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(234,234,234,0.45)', maxWidth: 600, margin: '0 auto' }}>Every diamond in the Vault Maison collection is independently certified by the Gemological Institute of America, the world&apos;s foremost authority on diamond grading.</p>
        </div>
      </div>
    </VaultLayout>
  )
}
