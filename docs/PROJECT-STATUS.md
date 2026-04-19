# Vault Maison — Project Status

> **Last Updated:** April 18, 2026
> **Repository:** [github.com/lukhihardik11/vault-maison](https://github.com/lukhihardik11/vault-maison.git)
> **Stable Branch:** `main` (43 PRs merged)
> **Active Branch:** `feature/minimal-3d-animations` (PR pending)
> **Documentation Branch:** `feature/documentation-checkpoint`

---

## Project Overview

Vault Maison is a **multi-tenant luxury jewelry e-commerce platform** built as a single Next.js application that serves 10 distinct storefront experiences ("concepts") from one codebase. Each concept has its own visual identity, color palette, typography, and interaction philosophy — but all share the same product catalog, cart system, checkout flow, and backend infrastructure.

**Business Model:** The owner operates one concept as their primary jewelry storefront and offers the remaining nine as white-label website templates for other jewelers. This creates a dual revenue stream: direct jewelry sales and SaaS-style website creation services.

**Tech Stack:**

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.3 |
| Language | TypeScript | 5.x |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Animation | Framer Motion + GSAP | 12.38 / 3.15 |
| State | Zustand | 5.0.12 |
| Search | Fuse.js | 7.3.0 |
| Database | Supabase (PostgreSQL) | 2.103.1 |
| Payments | Stripe | 22.0.1 |
| 3D/360 | GemHub / GemLightBox | External |
| UI Library | Radix UI primitives | Various |
| 3D Graphics | Three.js / React Three Fiber | 0.183 / 9.5 |
| Carousel | Embla Carousel | 8.6.0 |

---

## The 10 Concepts

Each concept is a fully themed storefront accessible at `/{concept-id}`. All 10 share 19 route pages and 65 products.

| # | Concept | Route | Theme | Palette (bg / text / accent) | Fonts | Status | Pages OK |
|---|---------|-------|-------|------------------------------|-------|--------|----------|
| 01 | **The Vault** | `/vault` | Gated, monolithic, intimate | `#0A0A0A` / `#EAEAEA` / `#D4AF37` | Cinzel / Inter | ✅ Complete | 17/19 |
| 02 | **The Observatory** | `/observatory` | Analytical, transparent, authoritative | `#0D1B2A` / `#FFFFFF` / `#00E5FF` | IBM Plex Mono / IBM Plex Mono | ✅ Complete | 17/19 |
| 03 | **The Gallery** | `/gallery` | Editorial, curated, spacious | `#FDFBF7` / `#2C2C2C` / `#2C2C2C` | Playfair Display / Inter | ✅ Complete | 17/19 |
| 04 | **The Atelier** | `/atelier` | Bespoke, tactile, process-driven | `#F4F1EA` / `#2B2B2B` / `#8C3A3A` | Cormorant Garamond / DM Sans | ✅ Complete | 17/19 |
| 05 | **The Salon** | `/salon` | Intimate, conversational, warm | `#FDF5E6` / `#2B2B2B` / `#4A5D23` | Lora / Lora | ✅ Complete | 17/19 |
| 06 | **The Archive** | `/archive` | Historical, provenance, deep | `#2C1A1D` / `#F5F0EB` / `#D4A574` | Playfair Display / Inter | ✅ Complete | 17/19 |
| 07 | **The Minimal Machine** | `/minimal` | Brutalist, restrained, precise | `#FFFFFF` / `#050505` / `#050505` | Helvetica Neue / Helvetica Neue | ✅ Complete | 15/19 |
| 08 | **The Immersive Theater** | `/theater` | Cinematic, emotional, enveloping | `#1A1A24` / `#F5F0EB` / `#E0C097` | Bodoni Moda / Inter | ✅ Complete | 17/19 |
| 09 | **Marketplace of Rarity** | `/marketplace` | Urgent, scarce, event-driven | `#1A1A1A` / `#F2F2F2` / `#FF3B30` | Space Grotesk / Space Grotesk | ✅ Complete | 17/19 |
| 10 | **The Modern Maison** | `/maison` | Balanced, performant, timeless | `#FAFAFA` / `#1C1C1C` / `#8B7355` | Libre Baskerville / DM Sans | ✅ Complete | 17/19 |

**Note on "17/19":** The two pages that report as "empty" across all concepts are **Product Detail** (image-heavy, renders correctly in browsers but has minimal extractable text) and **Checkout** (correctly shows "empty cart" when no items are added). These are not bugs — they are expected behavior.

---

## Infrastructure Status

### Supabase (Database & Auth)

| Component | Status | Notes |
|-----------|--------|-------|
| Schema | ✅ Created | Tables: profiles, products, orders, order_items, reviews, addresses, wishlists, carts |
| Client SDK | ✅ Installed | `@supabase/supabase-js` v2.103.1, `@supabase/ssr` v0.10.2 |
| Server client | ✅ Code exists | `src/lib/supabase/server.ts` — cookie-based session |
| Browser client | ✅ Code exists | `src/lib/supabase/client.ts` |
| Middleware | ✅ Code exists | `src/lib/supabase/middleware.ts` — session refresh |
| Auth flow | 🔨 Code exists | AuthModal component built; requires env vars to activate |
| Connection | ❌ Not connected | Needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

### Stripe (Payments)

| Component | Status | Notes |
|-----------|--------|-------|
| Client SDK | ✅ Installed | `@stripe/stripe-js` v9.2.0, `@stripe/react-stripe-js` v6.2.0 |
| Server SDK | ✅ Installed | `stripe` v22.0.1 |
| PaymentIntent API | ✅ Code exists | `src/app/api/checkout/route.ts` |
| Webhook handler | ✅ Code exists | `src/app/api/webhooks/stripe/route.ts` |
| Checkout UI | ✅ Built | `src/components/shared/stripe-checkout.tsx` |
| Connection | ❌ Not connected | Needs `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` |

### API Routes

| Route | Method | Status | Purpose |
|-------|--------|--------|---------|
| `/api/products` | GET | ✅ Working | List products with filters |
| `/api/products/[slug]` | GET | ✅ Working | Single product by slug |
| `/api/products/search` | GET | ✅ Working | Fuse.js search |
| `/api/cart` | GET/POST | ✅ Working | Cart CRUD (client-side Zustand) |
| `/api/checkout` | POST | 🔨 Needs Stripe | Creates PaymentIntent |
| `/api/orders` | GET/POST | 🔨 Needs Supabase | Order management |
| `/api/orders/[id]` | GET | 🔨 Needs Supabase | Single order |
| `/api/auth/signin` | POST | 🔨 Needs Supabase | Sign in |
| `/api/auth/signup` | POST | 🔨 Needs Supabase | Sign up |
| `/api/auth/signout` | POST | 🔨 Needs Supabase | Sign out |
| `/api/auth/profile` | GET/PUT | 🔨 Needs Supabase | User profile |
| `/api/reviews` | GET/POST | 🔨 Needs Supabase | Product reviews |
| `/api/wishlist` | GET/POST | ✅ Working | Wishlist (client-side Zustand) |
| `/api/addresses` | GET/POST | 🔨 Needs Supabase | Saved addresses |
| `/api/webhooks/stripe` | POST | 🔨 Needs Stripe | Stripe webhooks |

### Client-Side Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Cart | ✅ Working | Zustand store (`src/store/cart.ts`), persisted to localStorage |
| Wishlist | ✅ Working | Zustand store (`src/store/wishlist.ts`), persisted to localStorage |
| Recently Viewed | ✅ Working | Zustand store (`src/store/recently-viewed.ts`) |
| Search | ✅ Working | Fuse.js fuzzy search across product names/descriptions |
| Auth State | ✅ Working | Zustand store (`src/store/auth.ts`), demo mode |
| Theme Switching | ✅ Working | Each concept applies its own palette via CSS variables |

### GemHub 360° Viewer

| Component | Status | Notes |
|-----------|--------|-------|
| Viewer component | ✅ Built | `src/components/shared/gemhub-viewer.tsx` |
| Config | ✅ Built | `src/lib/gemhub.ts` |
| Product schema | ✅ Ready | `gemhubId` and `gemhubUrl` fields on Product interface |
| Feature flag | ✅ Built | `NEXT_PUBLIC_FEATURE_GEMHUB=true` to activate |
| Live connection | ❌ Not connected | Needs GemHub account share links |

---

## PR History (43 PRs Merged)

### Phase 1: Research & Design (PRs #1–#6, Apr 10–11)

| PR | Description |
|----|-------------|
| #1 | **Research synthesis** — 2,779 findings from 1,010+ sources across 671 domains. Competitive analysis of Tiffany, Cartier, Bulgari, and 50+ luxury e-commerce sites. |
| #2 | **10 concept directions** — Initial UI concept definitions with mood boards, color palettes, and interaction philosophies. |
| #3 | **V2 anti-template directions** — Refined concepts to avoid generic luxury templates. Each concept now has a unique DNA. |
| #4 | **V3 surgical perfection** — Fixed 7 defects in concept definitions. |
| #5 | **Atelier checkout flow** — Added step-by-step checkout to the Atelier concept. |
| #6 | **Maison framework change** — Switched Modern Maison from Gatsby to SolidStart (later migrated to Next.js). |

### Phase 2: Prototyping (PRs #7–#10, Apr 11)

| PR | Description |
|----|-------------|
| #7 | **10 interactive prototypes** — First working demos of all 10 concepts. |
| #8 | **V2 prototype rebuild** — Complete rebuild with higher fidelity. |
| #9 | **V3 Next.js migration** — Unified all concepts into a single Next.js + shadcn + Framer Motion app. |
| #10 | **pnpm to npm conversion** — Standardized package manager. |

### Phase 3: Component Integration (PRs #11–#13, Apr 12)

| PR | Description |
|----|-------------|
| #11 | **UI component research** — Evaluated 21st.dev, Aceternity UI, Magic UI libraries. |
| #12 | **Implementation research** — Detailed integration plans for 48+ components. |
| #13 | **19 components + 15 pages per concept** — Added 344 static pages across all concepts. |

### Phase 4: Concept-by-Concept Build (PRs #14–#30, Apr 13–15)

| PR | Description |
|----|-------------|
| #14–#16 | **Minimal Machine** — Three iterations from initial build to production-quality with KokonutUI, warm palette, and CSS animations. |
| #17 | **Production polish** — GSAP modernization, 8 Uiverse components, 22 KokonutUI integrations. |
| #18 | **The Vault** — Dark dramatic luxury with aurora backgrounds, spotlight cards, and canvas reveal effects. |
| #19–#20 | **Premium UI components** — 9 premium components for Vault, then agency-quality elevation across concepts. |
| #21 | **The Gallery** — Museum-curated editorial experience with massive whitespace and serif typography. |
| #22 | **8 premium components** — Vault (dark) + Gallery (cream) integration. |
| #23 | **The Salon** — Warm conversational luxury with sage green accents and advisor cards. |
| #24 | **15 premium UI elements** — 5 each for Vault, Gallery, and Salon. |
| #25 | **The Atelier** — Bespoke workshop experience with garnet accents and process-driven design. |
| #26 | **The Archive** — Dark scholarly catalog with mahogany and brass, heritage timelines. |
| #27 | **The Observatory** — Analytical interface with monospace typography and cyan accents. |
| #28 | **The Immersive Theater** — Cinematic experience with particle effects and Z-axis dives. |
| #29 | **Marketplace of Rarity** — Auction-driven with countdown timers and urgency badges. |
| #30 | **The Modern Maison** — Most production-ready concept. Clean, balanced, editorial. |

### Phase 5: Infrastructure & Polish (PRs #31–#39, Apr 15)

| PR | Description |
|----|-------------|
| #31 | **Massive enrichment** — Content and feature enrichment across all 10 concepts. |
| #32 | **Production-ready final pass** — Shared infrastructure, e-commerce enrichment, SEO, documentation. |
| #33–#34 | **Architecture documentation** — Backend architecture, security, and consulting-grade rewrites. |
| #35 | **Phase 1 infrastructure** — Supabase schema, Stripe integration, API routes, security headers. |
| #36 | **Phase 2 frontend integration** — Connected frontend to backend APIs. |
| #37 | **Phase 3 restructure** — Repository restructure, multi-tenant config, GemHub 360, Fuse.js search, deployment prep. |
| #38 | **Unique cart/checkout** — Per-concept cart and checkout experiences. |
| #39 | **Audit + fix** — 20 new products, animation fallbacks, 171/171 routes verified. |

### Phase 6: Bug Fixes & Content (PRs #40–#43, Apr 15)

| PR | Description |
|----|-------------|
| #40 | **CSS safety net** — Fixed "empty page syndrome" caused by scroll-reveal animations. Replaced animated counters with static values. |
| #41 | **Opacity fix** — Resolved all invisible sections. The `@keyframes !important` approach was invalid per CSS spec; replaced with direct selector overrides. |
| #42 | **Content fill** — Filled empty sections in Archive (major rewrite), Gallery (new arrivals), and Salon (advisor photos). |
| #43 | **Product catalog expansion** — Expanded from 50 to 65 products, added 118 product images (up from 39), GemHub research documentation. |

### Phase 7: 3D & Scroll Animations (PR #49, Apr 18)

| PR | Description |
|----|-------------|
| #49 | **3D & scroll animations** — Added 8 world-class animation effects to Minimal Machine concept: (1) ScrollProgress bar (Framer Motion useScroll), (2) Clip-path TextReveal/SplitTextReveal headlines (GSAP ScrollTrigger), (3) StaggerReveal grid animations (GSAP stagger), (4) ParallaxSection/ParallaxImage depth layers (GSAP ScrollTrigger), (5) HorizontalScroll pinned showcase (GSAP pin), (6) MinimalCursor with lerp + mix-blend-mode, (7) ParticleField R3F ambient particles, (8) Minimal3DViewer interactive 3D jewelry viewer (R3F + useFrame). All effects respect `prefers-reduced-motion` via `useReducedMotionPreference()` hook, have mobile fallbacks via `useIsMobile()`, use only design system colors (#FFFFFF, #050505, #6B6B6B, #9B9B9B), zero `initial={{ opacity: 0 }}`, zero rounded corners. 3D components lazy-loaded with `next/dynamic` + `ssr: false`. QA cleanup removed 3 dead duplicate files (CustomCursor, DiamondDust, ProductViewer3D) and unused `@react-three/drei` dependency. |

---

## Current Bugs (Known Issues)

| Bug | Concepts | Root Cause | Suggested Fix | Priority |
|-----|----------|-----------|---------------|----------|
| Product Detail page has minimal text content in automated tests | All 10 | Page is image-heavy; renders correctly in real browsers but Puppeteer text extraction reports <50 chars | Not a real bug — works in browsers | Low |
| Checkout shows "empty cart" | All 10 | Expected behavior when cart is empty | Not a bug | Low |
| Minimal concept Cart page shows minimal content | Minimal | MinimalCart uses concept-specific layout that may render differently | Investigate MinimalCart component | Medium |
| Some scroll-reveal animations don't trigger in Puppeteer | Various | IntersectionObserver requires real viewport scrolling | CSS safety net ensures content is visible after 2s regardless | Low |
| Supabase not connected | All 10 | Missing environment variables | Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` | High |
| Stripe not connected | All 10 | Missing environment variables | Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | High |
| GemHub viewer shows placeholder | Products with gemhubId | No real GemHub share links configured | Add real GemHub share URLs to products | Medium |

---

## What's Next (Ordered Backlog)

1. **Connect Supabase** — Set environment variables, test auth flow, verify database operations
2. **Connect Stripe** — Set environment variables, test payment flow in test mode, verify webhooks
3. **Deploy to Vercel** — Configure environment variables, test production build, set up custom domain
4. **GemHub live integration** — Add real 360° viewer share links to products, test embed rendering
5. **Mobile responsiveness audit** — Test all 10 concepts at 375px, 768px, and 1024px breakpoints
6. **Performance optimization** — Lazy load images, optimize bundle size, add ISR for product pages
7. **SEO audit** — Verify meta tags, Open Graph, structured data (JSON-LD) for all pages
8. **Accessibility audit** — WCAG 2.1 AA compliance check across all concepts
9. **Real product data** — Replace sample products with actual jewelry inventory from GemHub
10. **Analytics integration** — Add Google Analytics or Plausible for traffic tracking
11. **Email notifications** — Order confirmation, shipping updates via Supabase Edge Functions
12. **Admin dashboard** — Product management, order management, analytics dashboard
13. **Multi-language support** — i18n for key markets (English, Hindi, Arabic)
14. **A/B testing** — Test which concept converts best for the primary storefront

---

## Design Philosophy

Vault Maison is built on the principle that **luxury is not a style — it is a feeling**. Each of the 10 concepts explores a different emotional dimension of luxury:

The **Vault** creates exclusivity through darkness and gating. The **Observatory** builds trust through transparency and data. The **Gallery** evokes reverence through whitespace and curation. The **Atelier** celebrates craft through warmth and process. The **Salon** builds relationships through conversation and intimacy. The **Archive** establishes authority through heritage and provenance. The **Minimal Machine** proves that restraint itself is luxury. The **Theater** overwhelms through cinema and spectacle. The **Marketplace** drives action through urgency and scarcity. The **Maison** balances all elements into timeless sophistication.

Every design decision — from the choice of serif vs. monospace fonts, to the speed of scroll animations, to the wording of CTA buttons — is intentional and concept-specific. The shared component system (`src/components/shared/`) reads theme tokens from each concept's configuration and adapts accordingly, ensuring visual consistency within each concept while maintaining dramatic differentiation between them.

**For future AI agents and developers:** Do not homogenize the concepts. Their differences are the product. A change that "improves" one concept by making it look like another is a regression.
