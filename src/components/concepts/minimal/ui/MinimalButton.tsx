'use client'

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import Link from 'next/link'

/**
 * MinimalButton — Tier 3 button component with instant color invert on hover.
 * 
 * Variants:
 * - primary: Black bg, white text → inverts to white bg, black text on hover
 * - secondary: White bg, black text → inverts to black bg, white text on hover
 * - ghost: Transparent bg, black text → subtle bg on hover
 * 
 * All transitions are 150ms per Linear/Notion micro-interaction standards.
 */

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  children: React.ReactNode
  className?: string
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type LinkProps = BaseProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

type Props = ButtonProps | LinkProps

const sizeStyles = {
  sm: { padding: '8px 20px', fontSize: '11px', letterSpacing: '0.08em' },
  md: { padding: '14px 32px', fontSize: '12px', letterSpacing: '0.1em' },
  lg: { padding: '18px 48px', fontSize: '13px', letterSpacing: '0.12em' },
}

const variantStyles = {
  primary: {
    backgroundColor: '#050505',
    color: '#FAFAFA',
    border: '1px solid #050505',
    '--hover-bg': '#FAFAFA',
    '--hover-color': '#050505',
    '--hover-border': '#050505',
  },
  secondary: {
    backgroundColor: '#FAFAFA',
    color: '#050505',
    border: '1px solid #050505',
    '--hover-bg': '#050505',
    '--hover-color': '#FAFAFA',
    '--hover-border': '#050505',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#050505',
    border: '1px solid transparent',
    '--hover-bg': 'rgba(5, 5, 5, 0.04)',
    '--hover-color': '#050505',
    '--hover-border': 'transparent',
  },
}

export const MinimalButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>(
  function MinimalButton({ variant = 'primary', size = 'md', fullWidth = false, children, className = '', ...props }, ref) {
    const baseStyle = {
      ...sizeStyles[size],
      ...variantStyles[variant],
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
      fontWeight: 500,
      textTransform: 'uppercase' as const,
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'background-color 150ms, color 150ms, border-color 150ms',
      width: fullWidth ? '100%' : 'auto',
    }

    const cssClass = `minimal-button minimal-button--${variant} ${className}`.trim()

    if ('href' in props && props.href) {
      const { href, ...rest } = props as LinkProps
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cssClass}
          style={baseStyle}
          {...rest}
        >
          {children}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cssClass}
        style={baseStyle}
        {...(props as ButtonProps)}
      >
        {children}
      </button>
    )
  }
)

export default MinimalButton
