# Vault Maison

> **10 world-class jewelry website themes. One production-ready codebase.**
>
> A multi-tenant luxury jewelry e-commerce platform built with Next.js 15, React 19, Supabase, Stripe, and GemHub 360° integration.

---

## Quick Start

```bash
# Clone and install
git clone https://github.com/lukhihardik11/vault-maison.git
cd vault-maison
npm install

# Copy environment template
cp .env.local.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the showcase landing page.

---

## Architecture Overview

Vault Maison is a **multi-tenant template system** — one codebase that powers both a portfolio showcase (all 10 themes) and individual customer storefronts (single theme locked via environment variable).

```
┌─────────────────────────────────────────────────────┐
│                    SHOWCASE MODE                     │
│  NEXT_PUBLIC_CONCEPT_ID=  (empty)                   │
│  → Root page shows all 10 themes                    │
│  → Each theme accessible at /vault, /minimal, etc.  │
├─────────────────────────────────────────────────────┤
│                  SINGLE-THEME MODE                   │
│  NEXT_PUBLIC_CONCEPT_ID=minimal                     │
│  → Root page shows the chosen theme's home          │
│  → Only that theme's routes are active              │
└─────────────────────────────────────────────────────┘
```

### The 10 Concepts

| # | Concept | Route | DNA | Ideal For |
|---|---------|-------|-----|-----------|
| 01 | **The Vault** | `/vault` | Gated, Monolithic, Intimate | High-end jewelers, private collections |
| 02 | **The Observatory** | `/observatory` | Analytical, Transparent, Authoritative | Diamond dealers, gemologists |
| 03 | **The Gallery** | `/gallery` | Curated, Editorial, Museum-quality | Designer jewelry, art jewelry |
| 04 | **The Atelier** | `/atelier` | Warm, Craft-focused, Artisanal | Handcrafted jewelry, bespoke designers |
| 05 | **The Salon** | `/salon` | Soft, Intimate, Personal | Bridal jewelry, styling services |
| 06 | **The Archive** | `/archive` | Systematic, Catalog-driven | Large inventories, estate jewelry |
| 07 | **The Minimal Machine** | `/minimal` | Swiss-precision, Whitespace | Modern jewelry brands, minimalist |
| 08 | **The Immersive Theater** | `/theater` | Cinematic, Full-screen, Dramatic | Statement pieces, luxury launches |
| 09 | **The Marketplace** | `/marketplace` | Multi-vendor, Discovery | Multi-brand retailers, rare gems |
| 10 | **The Modern Maison** | `/maison` | Classic French luxury, Timeless | Heritage brands, established jewelers |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | SSR, SSG, API routes, middleware |
| **UI** | React 19 + TypeScript | Component architecture |
| **Styling** | Tailwind CSS 4 | Utility-first responsive design |
| **Animation** | Framer Motion + GSAP | Luxury micro-interactions |
| **State** | Zustand (persisted) | Cart, wishlist, auth, recently viewed |
| **Search** | Fuse.js | Client-side fuzzy search with weighted relevance |
| **Database** | Supabase (PostgreSQL) | Auth, RLS, real-time subscriptions |
| **Payments** | Stripe Elements | PCI-compliant checkout, 3DS, webhooks |
| **360° Viewer** | GemHub (GemLightBox) | Iframe-based 360° product views |
| **Deployment** | Vercel | Edge functions, image optimization |

---

## Repository Structure

```
vault-maison/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── page.tsx                  # Showcase landing page
│   │   ├── (concepts)/[concept]/     # Dynamic concept routing
│   │   │   ├── page.tsx              # Concept home
│   │   │   ├── collection/           # Product listing
│   │   │   ├── product/[slug]/       # Product detail
│   │   │   ├── cart/                 # Shopping cart
│   │   │   ├── checkout/             # Checkout flow
│   │   │   └── checkout/confirmation # Order confirmation
│   │   └── api/                      # API routes
│   │       ├── products/             # GET /api/products
│   │       ├── cart/                 # CRUD /api/cart
│   │       ├── wishlist/             # CRUD /api/wishlist
│   │       ├── orders/               # GET/POST /api/orders
│   │       ├── checkout/             # POST /api/checkout
│   │       ├── auth/                 # signin, signup, signout, profile
│   │       ├── addresses/            # CRUD /api/addresses
│   │       ├── reviews/              # GET/POST /api/reviews
│   │       └── webhooks/stripe/      # Stripe webhook handler
│   ├── components/
│   │   ├── shared/                   # Cross-concept components
│   │   │   ├── checkout-page.tsx     # Stripe-integrated checkout
│   │   │   ├── auth-modal.tsx        # Sign in / sign up modal
│   │   │   ├── gemhub-viewer.tsx     # 360° product viewer
│   │   │   ├── search-overlay.tsx    # Fuse.js search overlay
│   │   │   ├── toast-notifications   # Success/error/info toasts
│   │   │   └── ...                   # 20+ shared components
│   │   ├── concepts/                 # Concept-specific layouts
│   │   └── ui/                       # Base UI primitives
│   ├── config/
│   │   ├── site.ts                   # Multi-tenant site config
│   │   └── concepts.ts              # Concept theme definitions
│   ├── data/                         # Static product & concept data
│   ├── lib/
│   │   ├── api.ts                    # API abstraction (server + fallback)
│   │   ├── search.ts                 # Fuse.js search engine
│   │   ├── format.ts                 # Price/date formatting
│   │   ├── supabase/                 # Supabase client/server/middleware
│   │   ├── stripe/                   # Stripe client/server setup
│   │   └── security/                 # Headers, rate limiting, validation
│   ├── store/                        # Zustand stores (cart, wishlist, auth)
│   └── types/                        # TypeScript type definitions
├── docs/
│   ├── architecture/                 # System architecture, backend options, security
│   ├── integration/                  # GemHub integration docs
│   ├── standards/                    # Quality standards, deployment guide
│   ├── research/                     # Market intelligence, competitive analysis
│   ├── concepts/                     # Individual concept design docs
│   ├── strategy/                     # Brand positioning, revenue model
│   └── operations/                   # Fulfillment, risk management
├── supabase/migrations/              # Database schema (SQL)
├── scripts/
│   ├── deploy.sh                     # Vercel deployment script
│   └── seed-products.ts              # Product data seeder
├── public/images/                    # Product & hero images
├── vercel.json                       # Vercel deployment config
├── .env.local.example                # Environment variable template
└── middleware.ts                      # Supabase auth middleware
```

---

## Deployment Modes

### Showcase Mode (Default)

All 10 themes are accessible. The root page (`/`) shows the portfolio landing page.

```bash
# No NEXT_PUBLIC_CONCEPT_ID set
npm run build && npm start
```

### Single-Theme Mode

Lock to one theme for a customer's production site.

```bash
# In .env.local:
NEXT_PUBLIC_CONCEPT_ID=minimal
NEXT_PUBLIC_BUSINESS_NAME="Lumière Jewels"
NEXT_PUBLIC_TAGLINE="Precision in Every Facet"
```

### Deploy to Vercel

```bash
# Showcase mode
./scripts/deploy.sh

# Single theme (preview)
./scripts/deploy.sh minimal

# Single theme (production)
./scripts/deploy.sh vault prod
```

---

## Feature Flags

All features are controlled via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_FEATURE_GEMHUB` | `false` | Enable GemHub 360° viewer |
| `NEXT_PUBLIC_FEATURE_REVIEWS` | `true` | Product reviews |
| `NEXT_PUBLIC_FEATURE_WISHLIST` | `true` | Wishlist functionality |
| `NEXT_PUBLIC_FEATURE_BESPOKE` | `true` | Bespoke/custom order forms |
| `NEXT_PUBLIC_FEATURE_CHAT` | `false` | Live chat widget |
| `NEXT_PUBLIC_FEATURE_SEARCH` | `true` | Search overlay |
| `NEXT_PUBLIC_FEATURE_RECENTLY_VIEWED` | `true` | Recently viewed products |
| `NEXT_PUBLIC_FEATURE_ANALYTICS` | `false` | Analytics event tracking |

---

## Backend Integration

The platform operates in two modes:

**Demo Mode** (no Supabase configured): Uses local product data from `src/data/products.ts`. Cart, wishlist, and auth work client-side only via Zustand persisted stores. Checkout shows a simulated flow.

**Production Mode** (Supabase + Stripe configured): Full server-side API routes with PostgreSQL, Row-Level Security, Stripe PaymentIntents, webhook-driven order management, and real authentication.

### Database Schema

8 tables with RLS policies: `profiles`, `addresses`, `products`, `orders`, `order_items`, `wishlists`, `reviews`, `carts`, and `audit_log`. See `supabase/migrations/001_initial_schema.sql`.

---

## Design Philosophy

Vault Maison follows five core principles:

1. **Restraint over decoration** — Every element earns its place. White space is a design tool, not empty space.
2. **Material honesty** — Typography, color, and interaction patterns reflect the physical qualities of fine jewelry.
3. **Progressive disclosure** — Information reveals itself through intentional interaction, never overwhelming.
4. **Concept integrity** — Each theme is a complete design language, not a skin swap. Palette, typography, animation timing, and copy voice all change together.
5. **Graceful degradation** — Every feature works without its backend. No Supabase? Local data. No Stripe? Demo checkout. No GemHub? Static images with 360° badge.

---

## For AI Agents

This repository is structured for AI agent consumption:

- **`AGENTS.md`** and **`CLAUDE.md`** contain agent-specific instructions
- All documentation uses YAML frontmatter and structured sections
- The `src/config/site.ts` file is the single source of truth for deployment configuration
- The `src/data/concepts.ts` file defines all 10 theme configurations
- API routes follow RESTful conventions with consistent error handling
- TypeScript types in `src/types/index.ts` define all data structures

**Current stable branch: `main`** — All changes must go through feature branches and pull requests. Do not merge directly to main.

---

## License

Confidential — All rights reserved. This repository contains proprietary market intelligence and strategic documentation.
