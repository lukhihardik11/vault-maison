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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
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
              <motion.form
                key="signin"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
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
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
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
                  </motion.button>
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
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
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
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
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
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </section>
    </MinimalLayout>
  )
}
