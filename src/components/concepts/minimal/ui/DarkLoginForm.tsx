'use client'

import React, { useState } from 'react'
import { Mail, Lock, User } from 'lucide-react'

const font = "'Inter', 'Helvetica Neue', sans-serif"

interface DarkLoginFormProps {
  onLogin?: (email: string, password: string) => void
  onRegister?: (name: string, email: string, password: string) => void
}

export const DarkLoginForm: React.FC<DarkLoginFormProps> = ({
  onLogin,
  onRegister,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (mode === 'login') onLogin?.(email, password)
    else onRegister?.(name, email, password)
  }

  const inputStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: 0,
    padding: '14px 16px',
    border: 'none',
    outline: 'none',
    color: 'white',
    backgroundColor: '#050505',
    boxShadow: 'inset 0 1px 3px rgba(5,5,5,0.3)',
  }

  const fieldInputStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    outline: 'none',
    width: '100%',
    color: '#d3d3d3',
    fontFamily: font,
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '0.02em',
  }

  return (
    <form onSubmit={handleSubmit} className="vm-dark-form" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      padding: '32px 28px',
      backgroundColor: '#050505',
      borderRadius: 0,
      transition: 'all 350ms ease',
      maxWidth: '380px',
      width: '100%',
    }}>
      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <p style={{
          fontFamily: font,
          fontSize: '18px',
          fontWeight: 400,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#050505',
          marginBottom: '4px',
        }}>Vault Maison</p>
        <p style={{
          fontFamily: font,
          fontSize: '12px',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.1em',
        }}>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</p>
      </div>

      {mode === 'register' && (
        <div style={inputStyle}>
          <User size={16} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={fieldInputStyle}
          />
        </div>
      )}

      <div style={inputStyle}>
        <Mail size={16} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0 }} />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={fieldInputStyle}
        />
      </div>

      <div style={inputStyle}>
        <Lock size={16} strokeWidth={1.5} style={{ color: '#050505', flexShrink: 0 }} />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={fieldInputStyle}
        />
      </div>

      <button type="submit" className="vm-dark-submit" style={{
        marginTop: '8px',
        padding: '14px',
        borderRadius: 0,
        border: 'none',
        background: 'linear-gradient(to bottom, #050505, #050505)',
        color: '#FFFFFF',
        fontFamily: font,
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 350ms ease',
      }}>
        {mode === 'login' ? 'Sign In' : 'Create Account'}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        style={{
          padding: '10px',
          borderRadius: 0,
          border: 'none',
          backgroundColor: '#252525',
          color: 'rgba(255,255,255,0.5)',
          fontFamily: font,
          fontSize: '12px',
          fontWeight: 400,
          cursor: 'pointer',
          transition: 'all 350ms ease',
          letterSpacing: '0.05em',
        }}
      >
        {mode === 'login' ? 'New here? Create Account' : 'Already have an account? Sign In'}
      </button>

      <style>{`
        .vm-dark-form:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
        .vm-dark-submit:hover { filter: brightness(1.1); transform: translateY(-1px); }
        .vm-dark-form input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </form>
  )
}

export default DarkLoginForm
