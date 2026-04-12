'use client'

import { MinimalPage } from '../MinimalPage'

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 0',
  border: 'none',
  borderBottom: '1px solid #E5E5E5',
  fontSize: '13px',
  fontWeight: 300,
  fontFamily: 'inherit',
  color: '#050505',
  backgroundColor: 'transparent',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  fontWeight: 400,
  color: '#050505',
  opacity: 0.4,
  display: 'block',
  marginBottom: '4px',
}

export function MinimalAccount() {
  return (
    <MinimalPage title="Account" subtitle="Sign in to your account.">
      <div style={{ maxWidth: '400px' }}>
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input type="password" required style={inputStyle} />
          </div>
          <button
            type="submit"
            style={{
              alignSelf: 'flex-start',
              padding: '14px 40px',
              border: '1px solid #050505',
              backgroundColor: '#050505',
              color: '#FFFFFF',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Sign In
          </button>
        </form>
        <div style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid #E5E5E5' }}>
          <p style={{ fontSize: '13px', fontWeight: 300, opacity: 0.6, marginBottom: '16px' }}>
            Don&apos;t have an account?
          </p>
          <button
            style={{
              padding: '14px 40px',
              border: '1px solid #E5E5E5',
              backgroundColor: 'transparent',
              color: '#050505',
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Create Account
          </button>
        </div>
      </div>
    </MinimalPage>
  )
}
