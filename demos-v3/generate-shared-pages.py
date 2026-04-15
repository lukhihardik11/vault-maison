#!/usr/bin/env python3
"""Generate concept-specific cart, checkout, account, and search pages using shared components."""

import os

# Concept configurations from concepts.ts palette data
concepts = {
    'vault': {
        'dir': 'vault',
        'prefix': 'Vault',
        'palette': {'bg': '#0A0A0A', 'text': '#EAEAEA', 'accent': '#D4AF37', 'muted': '#333333', 'surface': '#141414'},
        'fonts': {'heading': "'Cinzel', serif", 'body': "'Inter', sans-serif"},
    },
    'observatory': {
        'dir': 'observatory',
        'prefix': 'Observatory',
        'palette': {'bg': '#0D1B2A', 'text': '#FFFFFF', 'accent': '#00E5FF', 'muted': '#1B3A5C', 'surface': '#112240'},
        'fonts': {'heading': "'IBM Plex Mono', monospace", 'body': "'Inter', sans-serif"},
    },
    'gallery': {
        'dir': 'gallery',
        'prefix': 'Gallery',
        'palette': {'bg': '#FDFBF7', 'text': '#2C2C2C', 'accent': '#2C2C2C', 'muted': '#E8E4DE', 'surface': '#F5F2ED'},
        'fonts': {'heading': "'Playfair Display', serif", 'body': "'Inter', sans-serif"},
    },
    'atelier': {
        'dir': 'atelier',
        'prefix': 'Atelier',
        'palette': {'bg': '#F4F1EA', 'text': '#2B2B2B', 'accent': '#8C3A3A', 'muted': '#D9D4CA', 'surface': '#EDE9E0'},
        'fonts': {'heading': "'Cormorant Garamond', serif", 'body': "'Inter', sans-serif"},
    },
    'salon': {
        'dir': 'salon',
        'prefix': 'Salon',
        'palette': {'bg': '#FDF5E6', 'text': '#2B2B2B', 'accent': '#4A5D23', 'muted': '#E8DCC4', 'surface': '#F5EDD8'},
        'fonts': {'heading': "'Lora', serif", 'body': "'Inter', sans-serif"},
    },
    'archive': {
        'dir': 'archive',
        'prefix': 'Archive',
        'palette': {'bg': '#2C1A1D', 'text': '#F5F0EB', 'accent': '#D4A574', 'muted': '#4A3035', 'surface': '#3A2428'},
        'fonts': {'heading': "'Playfair Display', serif", 'body': "'Inter', sans-serif"},
    },
    'minimal': {
        'dir': 'minimal',
        'prefix': 'Minimal',
        'palette': {'bg': '#FFFFFF', 'text': '#050505', 'accent': '#050505', 'muted': '#E5E5E5', 'surface': '#F5F5F5'},
        'fonts': {'heading': "'Helvetica Neue', sans-serif", 'body': "'Helvetica Neue', sans-serif"},
    },
    'theater': {
        'dir': 'theater',
        'prefix': 'Theater',
        'palette': {'bg': '#1A1A24', 'text': '#F5F0EB', 'accent': '#E0C097', 'muted': '#2A2A38', 'surface': '#222230'},
        'fonts': {'heading': "'Bodoni Moda', serif", 'body': "'Inter', sans-serif"},
    },
    'marketplace': {
        'dir': 'marketplace',
        'prefix': 'Marketplace',
        'palette': {'bg': '#1A1A1A', 'text': '#F2F2F2', 'accent': '#FF3B30', 'muted': '#333333', 'surface': '#242424'},
        'fonts': {'heading': "'Space Grotesk', sans-serif", 'body': "'Space Grotesk', sans-serif"},
    },
    'maison': {
        'dir': 'maison',
        'prefix': 'Maison',
        'palette': {'bg': '#FAFAFA', 'text': '#1C1C1C', 'accent': '#8B7355', 'muted': '#E8E2DA', 'surface': '#F0ECE6'},
        'fonts': {'heading': "'Libre Baskerville', serif", 'body': "'DM Sans', sans-serif"},
    },
}

# Page templates
def cart_template(c):
    return f"""'use client'

import {{ CartPage }} from '@/components/shared/cart-page'

export function {c['prefix']}Cart() {{
  return (
    <CartPage
      conceptId="{c['dir']}"
      accentColor="{c['palette']['accent']}"
      bgColor="{c['palette']['bg']}"
      textColor="{c['palette']['text']}"
      mutedColor="{c['palette']['muted']}"
      cardBg="{c['palette']['surface']}"
      fontHeading="{c['fonts']['heading']}"
      fontBody="{c['fonts']['body']}"
    />
  )
}}
"""

def checkout_template(c):
    return f"""'use client'

import {{ CheckoutPage }} from '@/components/shared/checkout-page'

export function {c['prefix']}Checkout() {{
  return (
    <CheckoutPage
      conceptId="{c['dir']}"
      accentColor="{c['palette']['accent']}"
      bgColor="{c['palette']['bg']}"
      textColor="{c['palette']['text']}"
      mutedColor="{c['palette']['muted']}"
      cardBg="{c['palette']['surface']}"
      fontHeading="{c['fonts']['heading']}"
      fontBody="{c['fonts']['body']}"
    />
  )
}}
"""

def account_template(c):
    return f"""'use client'

import {{ AccountPage }} from '@/components/shared/account-page'

export function {c['prefix']}Account() {{
  return (
    <AccountPage
      conceptId="{c['dir']}"
      accentColor="{c['palette']['accent']}"
      bgColor="{c['palette']['bg']}"
      textColor="{c['palette']['text']}"
      mutedColor="{c['palette']['muted']}"
      cardBg="{c['palette']['surface']}"
      fontHeading="{c['fonts']['heading']}"
      fontBody="{c['fonts']['body']}"
    />
  )
}}
"""

def search_template(c):
    return f"""'use client'

import {{ SearchPage }} from '@/components/shared/search-page'

export function {c['prefix']}Search() {{
  return (
    <SearchPage
      conceptId="{c['dir']}"
      accentColor="{c['palette']['accent']}"
      bgColor="{c['palette']['bg']}"
      textColor="{c['palette']['text']}"
      mutedColor="{c['palette']['muted']}"
      cardBg="{c['palette']['surface']}"
      fontHeading="{c['fonts']['heading']}"
      fontBody="{c['fonts']['body']}"
    />
  )
}}
"""

base = 'src/components/concepts'

for cid, c in concepts.items():
    pages_dir = os.path.join(base, c['dir'], 'pages')
    if not os.path.exists(pages_dir):
        print(f"  SKIP {cid} - no pages dir")
        continue
    
    # Cart
    cart_file = os.path.join(pages_dir, f"{c['prefix']}Cart.tsx")
    with open(cart_file, 'w') as f:
        f.write(cart_template(c))
    print(f"  WROTE {cart_file}")
    
    # Checkout
    checkout_file = os.path.join(pages_dir, f"{c['prefix']}Checkout.tsx")
    with open(checkout_file, 'w') as f:
        f.write(checkout_template(c))
    print(f"  WROTE {checkout_file}")
    
    # Account
    account_file = os.path.join(pages_dir, f"{c['prefix']}Account.tsx")
    with open(account_file, 'w') as f:
        f.write(account_template(c))
    print(f"  WROTE {account_file}")
    
    # Search
    search_file = os.path.join(pages_dir, f"{c['prefix']}Search.tsx")
    with open(search_file, 'w') as f:
        f.write(search_template(c))
    print(f"  WROTE {search_file}")

print("\nDone! All 40 pages generated.")
