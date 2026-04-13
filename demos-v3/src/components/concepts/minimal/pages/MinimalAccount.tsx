'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MinimalLayout } from '../MinimalLayout'

const font = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif"

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  border: 'none',
  borderBottom: '1px solid #E5E5E5',
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: font,
  color: '#050505',
  backgroundColor: 'transparent',
  outline: 'none',
  transition: 'border-color 300ms ease',
}

const labelStyle: React.CSSProperties = {
  fontFamily: font,
  fontSize: '10px',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontWeight: 400,
  color: '#050505',
  opacity: 0.35,
  display: 'block',
  marginBottom: '4px',
}

export function MinimalAccount() {
  const [mode, setMode] = useState<'signin' | 'register'>('signin')

  return (
    <MinimalLayout>
      <section style={{ padding: '120px 5vw', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{ width: '100%', maxWidth: '400px' }}
        >
          {/* Mode Toggle */}
          <div style={{ display: 'flex', gap: '24px', marginBottom: '48px' }}>
            {(['signin', 'register'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  fontFamily: font,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  fontWeight: mode === m ? 400 : 300,
                  color: '#050505',
                  opacity: mode === m ? 1 : 0.3,
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  padding: '0 0 8px',
                  borderBottom: mode === m ? '1px solid #050505' : '1px solid transparent',
                  transition: 'all 300ms ease',
                }}
              >
                {m === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'signin' ? (
              <form
                key="signin"
                onSubmit={(e) => e.preventDefault()}
                style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              >
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    type="submit"
                    style={{
                      padding: '14px 48px',
                      border: '1px solid #050505',
                      backgroundColor: '#050505',
                      color: '#FFFFFF',
                      fontFamily: font,
                      fontSize: '11px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      fontWeight: 400,
                      cursor: 'pointer',
                    }}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    style={{
                      fontFamily: font,
                      fontSize: '11px',
                      color: '#050505',
                      opacity: 0.4,
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              </form>
            ) : (
              <form
                key="register"
                onSubmit={(e) => e.preventDefault()}
                style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    <label style={labelStyle}>First Name</label>
                    <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                  <div>
                    <label style={labelStyle}>Last Name</label>
                    <input type="text" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input type="email" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <input type="password" required style={inputStyle} onFocus={(e) => e.currentTarget.style.borderColor = '#050505'} onBlur={(e) => e.currentTarget.style.borderColor = '#E5E5E5'} />
                </div>
                <button
                  type="submit"
                  style={{
                    alignSelf: 'flex-start',
                    padding: '14px 48px',
                    border: '1px solid #050505',
                    backgroundColor: '#050505',
                    color: '#FFFFFF',
                    fontFamily: font,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    fontWeight: 400,
                    cursor: 'pointer',
                  }}
                >
                  Create Account
                </button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </MinimalLayout>
  )
}
