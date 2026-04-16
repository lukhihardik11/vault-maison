# Vault Maison — Architecture Guide

> **Last Updated:** April 15, 2026
> **For:** Developers and AI agents working on the codebase

---

## Directory Structure

```
vault-maison/
├── public/
│   └── images/
│       ├── products/          — 118 product images (rings, necklaces, earrings, etc.)
│       ├── categories/        — Category hero images
│       ├── archive/           — Archive concept-specific images
│       ├── atelier/           — Atelier concept-specific images (artisan portraits)
│       ├── lifestyle/         — Lifestyle photography
│       └── hero/              — Hero section backgrounds
├── src/
│   ├── app/                   — Next.js App Router
│   │   ├── (concepts)/        — Route group for concept pages
│   │   │   └── [concept]/     — Dynamic segment: vault, gallery, salon, etc.
│   │   │       ├── page.tsx              — Concept homepage (dispatches to concept-specific component)
│   │   │       ├── about/page.tsx        — About page (shared template)
│   │   │       ├── cart/page.tsx         — Cart page
│   │   │       ├── checkout/page.tsx     — Checkout page
│   │   │       ├── category/[category]/page.tsx  — Category listing
│   │   │       ├── product/[slug]/page.tsx       — Product detail
│   │   │       ├── collections/page.tsx  — All collections
│   │   │       └── ... (19 total page routes)
│   │   ├── api/               — Backend API routes
│   │   │   ├── products/      — Product CRUD + search
│   │   │   ├── cart/          — Cart operations
│   │   │   ├── checkout/      — Stripe PaymentIntent
│   │   │   ├── orders/        — Order management
│   │   │   ├── auth/          — Supabase auth (signin, signup, signout, profile)
│   │   │   ├── reviews/       — Product reviews
│   │   │   ├── wishlist/      — Wishlist operations
│   │   │   ├── addresses/     — Saved addresses
│   │   │   └── webhooks/stripe/ — Stripe webhook handler
│   │   ├── globals.css        — Global styles + CSS safety net
│   │   ├── layout.tsx         — Root layout with metadata
│   │   └── page.tsx           — Landing page (concept selector)
│   ├── components/
│   │   ├── shared/            — 44 shared components (used across all concepts)
│   │   │   ├── concept-layout.tsx    — Applies theme tokens to concept pages
│   │   │   ├── concept-hero.tsx      — Hero section with concept-specific styling
│   │   │   ├── product-card.tsx      — Product card with theme adaptation
│   │   │   ├── product-detail.tsx    — Full product detail page
│   │   │   ├── cart-drawer.tsx       — Slide-out cart
│   │   │   ├── checkout-flow.tsx     — Multi-step checkout
│   │   │   ├── luxury-nav.tsx        — Navigation bar
│   │   │   ├── luxury-footer.tsx     — Footer
│   │   │   ├── gemhub-viewer.tsx     — GemHub 360° viewer embed
│   │   │   ├── search-overlay.tsx    — Fuse.js search modal
│   │   │   └── ... (34 more)
│   │   ├── concepts/          — Concept-specific components
│   │   │   ├── archive-home.tsx      — Archive homepage (standalone)
│   │   │   ├── archive/              — Archive sub-components
│   │   │   │   ├── ArchiveLayout.tsx — Layout wrapper with scroll-reveal
│   │   │   │   ├── ui/              — Archive-specific UI elements
│   │   │   │   └── pages/           — 18 Archive-specific page variants
│   │   │   ├── atelier-home.tsx
│   │   │   ├── atelier/
│   │   │   ├── gallery-home.tsx
│   │   │   ├── gallery/
│   │   │   ├── maison-home.tsx
│   │   │   ├── maison/
│   │   │   ├── marketplace-home.tsx
│   │   │   ├── marketplace/
│   │   │   ├── minimal-home.tsx
│   │   │   ├── minimal/
│   │   │   ├── observatory-home.tsx
│   │   │   ├── observatory/
│   │   │   ├── salon-home.tsx
│   │   │   ├── salon/
│   │   │   ├── theater-home.tsx
│   │   │   ├── theater/
│   │   │   ├── vault-home.tsx
│   │   │   └── vault/
│   │   └── ui/                — Radix UI primitive wrappers
│   ├── config/
│   │   └── site.ts            — Site-wide config, feature flags, GemHub settings
│   ├── data/
│   │   ├── concepts.ts        — 10 concept definitions (ConceptConfig interface)
│   │   └── products.ts        — 65 products (Product interface) + helper functions
│   ├── lib/
│   │   ├── api.ts             — API client (dual-mode: local data vs Supabase)
│   │   ├── concept-utils.ts   — URL builders, concept helpers
│   │   ├── format.ts          — Price formatting, date formatting
│   │   ├── gemhub.ts          — GemHub viewer configuration
│   │   ├── image-blend.ts     — Image processing utilities
│   │   ├── search.ts          — Fuse.js search configuration
│   │   ├── utils.ts           — General utilities (cn, classnames)
│   │   ├── analytics.ts       — Analytics event tracking
│   │   ├── supabase/
│   │   │   ├── client.ts      — Browser Supabase client
│   │   │   ├── server.ts      — Server Supabase client (cookie-based)
│   │   │   └── middleware.ts   — Session refresh middleware
│   │   ├── stripe/
│   │   │   ├── client.ts      — Browser Stripe client (loadStripe)
│   │   │   └── server.ts      — Server Stripe client
│   │   └── security/
│   │       ├── headers.ts     — Security headers (CSP, HSTS, etc.)
│   │       ├── rate-limit.ts  — Rate limiting for API routes
│   │       └── validate.ts    — Input validation
│   ├── store/
│   │   ├── cart.ts            — Zustand cart store (persisted)
│   │   ├── wishlist.ts        — Zustand wishlist store (persisted)
│   │   ├── recently-viewed.ts — Zustand recently viewed store
│   │   └── auth.ts            — Zustand auth store (demo mode)
│   └── types/
│       └── index.ts           — Shared TypeScript interfaces
├── docs/                      — 70+ documentation files
├── next.config.ts             — Next.js configuration
├── tailwind.config.ts         — Tailwind CSS configuration
├── tsconfig.json              — TypeScript configuration
└── package.json               — Dependencies (50+ packages)
```

---

## How Concepts Work

### Routing System

The application uses Next.js App Router with a **route group** `(concepts)` and a **dynamic segment** `[concept]`. When a user visits `/vault/collections`, Next.js resolves it as:

```
src/app/(concepts)/[concept]/collections/page.tsx
```

The `[concept]` parameter is extracted via `useParams()` and used to look up the concept configuration from `src/data/concepts.ts`.

### Concept Homepage Dispatch

The concept homepage (`src/app/(concepts)/[concept]/page.tsx`) uses a **component map** to dispatch to concept-specific homepage components:

```typescript
const conceptHomeMap: Record<string, React.ComponentType<{ concept: ConceptConfig }>> = {
  vault: VaultHome,
  observatory: ObservatoryHome,
  gallery: GalleryHome,
  // ... all 10 concepts
}
```

If a concept has a custom homepage component, it renders that. Otherwise, it falls back to a generic layout using shared components (`ConceptHero`, `FeaturedProducts`, etc.).

### Theme Application

Each concept's `ConceptConfig` includes a `palette` object with `bg`, `text`, `accent`, `muted`, and `surface` colors. The `ConceptLayout` component applies these as CSS custom properties:

```typescript
// ConceptLayout sets CSS variables on the wrapper div
style={{
  '--concept-bg': concept.palette.bg,
  '--concept-text': concept.palette.text,
  '--concept-accent': concept.palette.accent,
}}
```

Shared components read these variables to adapt their appearance. This means a single `ProductCard` component looks dramatically different in the Vault (dark, gold accents) vs. the Gallery (cream, minimal).

### Adding a New Concept

To add an 11th concept:

1. Add a new entry to the `concepts` array in `src/data/concepts.ts` with a unique `id`, palette, fonts, and CTA text.
2. Create `src/components/concepts/{id}-home.tsx` for the homepage.
3. Create `src/components/concepts/{id}/` directory with `pages/` and `ui/` subdirectories.
4. Add the homepage component to `conceptHomeMap` in `src/app/(concepts)/[concept]/page.tsx`.
5. Optionally create 18 concept-specific page variants in the `pages/` directory.

---

## How Products Work

### Data Structure

Products are defined in `src/data/products.ts` as a flat array of 65 `Product` objects:

```typescript
export interface Product {
  id: string              // Unique ID (e.g., "celestial-solitaire")
  slug: string            // URL slug (same as id)
  name: string            // Display name
  subtitle: string        // Short description
  category: ProductCategory  // One of 10 categories
  price: number           // Price in cents (e.g., 249500 = $2,495.00)
  priceDisplay: string    // Formatted price string
  material: 'Diamond' | 'Gold' | 'Diamond & Gold' | 'Platinum'
  goldKarat?: '14K' | '18K' | '24K'
  goldColor?: 'Yellow' | 'White' | 'Rose'
  diamondSpecs?: {        // Optional diamond specifications
    carat: string
    cut: string
    color: string
    clarity: string
    shape: string
    origin: 'Lab-Grown' | 'Natural'
    certification: string
  }
  images: string[]        // Array of image paths (2-3 per product)
  description: string     // Full description
  features: string[]      // Feature bullet points
  inStock: boolean
  isNew?: boolean         // Flags for filtering
  isBestseller?: boolean
  isLimited?: boolean
  gemhubId?: string       // GemHub media ID for 360° viewer
  gemhubUrl?: string      // GemHub share link
}
```

### Categories

Products belong to one of 10 categories defined in `ProductCategory`:

| Category Slug | Label |
|--------------|-------|
| `diamond-rings` | Diamond Rings |
| `diamond-necklaces` | Diamond Necklaces |
| `diamond-earrings` | Diamond Earrings |
| `diamond-bracelets` | Diamond Bracelets |
| `gold-rings` | Gold Rings |
| `gold-necklaces` | Gold Necklaces |
| `gold-earrings` | Gold Earrings |
| `gold-bracelets` | Gold Bracelets |
| `loose-diamonds` | Loose Diamonds |
| `wedding-bridal` | Wedding & Bridal |

### Helper Functions

```typescript
getProducts()           // Returns all 65 products
getBestsellers()        // Returns products where isBestseller === true
getNewArrivals()        // Returns products where isNew === true
getLimitedEditions()    // Returns products where isLimited === true
getProductBySlug(slug)  // Returns single product by slug
getProductsByCategory(category)  // Returns products in a category
formatPrice(cents)      // Formats 249500 → "$2,495.00"
```

### Adding New Products

Add a new object to the `products` array in `src/data/products.ts`. Place product images in `public/images/products/` and reference them as `/images/products/filename.jpg`.

---

## How Theming Works

### CSS Variables

Each concept applies its palette through CSS custom properties set by `ConceptLayout`. The global stylesheet (`globals.css`) defines fallback values and the CSS safety net.

### The CSS Safety Net

A critical piece of infrastructure in `globals.css` forces scroll-reveal elements to become visible after 2 seconds, preventing the "blank page syndrome" that occurs when IntersectionObserver-based animations fail to trigger:

```css
/* NUCLEAR SAFETY NET v2 — Override opacity:0 on scroll-reveal elements */
.archive-scroll-reveal,
.stagger-item,
[class*="scroll-reveal"],
.vm-fade,
.vm-hero-el {
  opacity: 1 !important;
  transform: none !important;
}
```

**WARNING:** Do not remove this safety net. It prevents entire pages from being invisible. The root cause is that `@keyframes` animations with `!important` are ignored per CSS specification — the safety net uses direct selector overrides instead.

### Font Loading

Fonts are loaded via Google Fonts in the root layout. Each concept specifies its heading and body fonts in the `ConceptConfig.fonts` object, which includes both the font family name and a Tailwind CSS class.

---

## How the API Layer Works

### Dual-Mode Architecture

The API client (`src/lib/api.ts`) operates in two modes:

1. **Local mode** (current): Reads directly from `src/data/products.ts`. No database needed. Cart and wishlist use Zustand stores persisted to localStorage.

2. **Database mode** (when Supabase is connected): Reads from Supabase PostgreSQL. Cart syncs to server. Auth is real.

The mode is determined by the presence of `NEXT_PUBLIC_SUPABASE_URL`. If the environment variable is not set, the app gracefully falls back to local mode.

### Switching to Database Mode

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the schema migration (documented in `docs/architecture/SYSTEM-ARCHITECTURE.md`)
3. Set environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
4. The API routes will automatically use Supabase instead of local data

---

## How Authentication Works

### Current State (Demo Mode)

The auth store (`src/store/auth.ts`) provides a demo mode where users can "sign in" without a real backend. This allows testing the UI flow without Supabase.

### Real Auth Flow (When Supabase Connected)

1. User clicks "Sign In" → `AuthModal` component opens
2. User enters email/password → POST to `/api/auth/signin`
3. API route calls `supabase.auth.signInWithPassword()`
4. Supabase returns session token → stored in HTTP-only cookie
5. Middleware (`src/lib/supabase/middleware.ts`) refreshes session on each request
6. Auth state synced to Zustand store for UI updates

---

## How Payments Work

### Current State (Not Connected)

The Stripe integration code exists but requires environment variables to activate. The checkout UI renders a form but does not process real payments.

### Real Payment Flow (When Stripe Connected)

1. User adds items to cart → Zustand store updates
2. User clicks "Checkout" → navigates to `/{concept}/checkout`
3. Checkout page renders `StripeCheckout` component
4. Component calls POST `/api/checkout` with cart items
5. API route creates a Stripe PaymentIntent with the total amount
6. Client-side Stripe Elements renders the payment form
7. User submits payment → Stripe processes it
8. On success, webhook hits `/api/webhooks/stripe`
9. Webhook creates order in Supabase, sends confirmation

### Environment Variables Required

```bash
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

---

## Deployment Guide

### Vercel (Recommended)

1. Connect the GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Build command: `npm run build`
4. Output directory: `.next`
5. Node.js version: 22.x

### Single-Concept Mode

To deploy a single concept (e.g., just "The Vault"):

```bash
NEXT_PUBLIC_CONCEPT_ID=vault
```

This environment variable restricts the app to serve only the Vault concept, hiding the concept selector and other storefronts.

### Required Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | For auth/DB | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | For auth/DB | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | For webhooks | Supabase admin access |
| `STRIPE_SECRET_KEY` | For payments | Stripe secret key (test mode) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | For payments | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | For webhooks | Stripe webhook signing secret |
| `NEXT_PUBLIC_CONCEPT_ID` | Optional | Single-concept mode |
| `NEXT_PUBLIC_APP_URL` | Optional | Your domain URL |
| `NEXT_PUBLIC_FEATURE_GEMHUB` | Optional | Enable GemHub 360° viewer |
