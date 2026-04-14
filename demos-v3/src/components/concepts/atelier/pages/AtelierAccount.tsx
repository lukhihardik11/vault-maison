'use client'
import React from 'react'
import { AtelierLayout, A } from '../AtelierLayout'
import { AtelierButton } from '../ui/AtelierButton'
import { AtelierInput } from '../ui/AtelierInput'

export function AtelierAccount() {
  return (
    <AtelierLayout>
      <section style={{ padding: '80px 32px 100px' }}>
        <div style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: A.accent, marginBottom: 16 }}>
            Your Workshop
          </div>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, color: A.ink, margin: '0 0 16px' }}>
            Sign In
          </h1>
          <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 15, color: A.textSoft, lineHeight: 1.7, marginBottom: 40 }}>
            Access your commissions, order history, and saved pieces.
          </p>

          <div style={{ textAlign: 'left' }}>
            <AtelierInput label="Email" placeholder="your@email.com" type="email" required />
            <AtelierInput label="Password" placeholder="••••••••" type="password" required />
          </div>

          <AtelierButton fullWidth style={{ marginTop: 8 }}>Sign In</AtelierButton>

          <div style={{ margin: '24px 0', fontFamily: 'Source Serif 4, serif', fontSize: 14, color: A.textSoft }}>
            Don&apos;t have an account?{' '}
            <span style={{ color: A.accent, cursor: 'pointer' }}>Create one</span>
          </div>

          <div style={{ padding: '24px', background: A.surface, border: `1px solid ${A.border}`, borderRadius: 2, marginTop: 32 }}>
            <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: A.accent, marginBottom: 8 }}>Commission clients</div>
            <p style={{ fontFamily: 'Source Serif 4, serif', fontSize: 13, color: A.textSoft, lineHeight: 1.6 }}>
              If you have an active commission, you&apos;ll find progress updates, sketches, and artisan notes in your dashboard.
            </p>
          </div>
        </div>
      </section>
    </AtelierLayout>
  )
}
