'use client'
import React from 'react'
import { AtelierLayout, A, AtelierSection, RevealSection, WarmDivider } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { AtelierInput } from '../ui/AtelierInput'

export function AtelierAccount() {
  return (
    <AtelierLayout>
      <AtelierSection style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
          <RevealSection>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
              Your Workshop
            </div>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: A.ink, margin: '0 0 12px' }}>
              Sign In
            </h1>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 40 }}>
              Access your commissions, order history, and saved pieces.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <div style={{
              padding: '40px 32px', background: A.surface,
              border: `1px dashed ${A.sketch}`, borderRadius: 2,
              boxShadow: `inset 0 1px 2px ${A.shadow}`,
              textAlign: 'left',
            }}>
              <AtelierInput label="Email" placeholder="your@email.com" type="email" required />
              <AtelierInput label="Password" placeholder="••••••••" type="password" required />
              <AtelierButton fullWidth style={{ marginTop: 8 }}>Sign In</AtelierButton>

              <div style={{ margin: '20px 0', textAlign: 'center', fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft }}>
                Don&apos;t have an account?{' '}
                <span style={{ color: A.accent, cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dashed' as const }}>Create one</span>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={400}>
            <div style={{
              padding: '24px 28px', background: 'rgba(139,105,20,0.03)',
              border: `1px dashed ${A.gold}30`, borderRadius: 2, marginTop: 24,
            }}>
              <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: A.gold, marginBottom: 8 }}>Commission clients</div>
              <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft, lineHeight: 1.6 }}>
                If you have an active commission, you&apos;ll find progress updates, sketches, and artisan notes in your dashboard.
              </p>
            </div>
          </RevealSection>
        </div>
      </AtelierSection>
    </AtelierLayout>
  )
}
