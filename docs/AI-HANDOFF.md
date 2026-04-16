# Vault Maison — AI Handoff Guide

> **Last Updated:** April 15, 2026
> **For:** Any AI agent (Manus, Claude, GPT, Cursor, Copilot) or human developer picking up this project

---

## Quick Start for AI Agents

1. **Read [PROJECT-STATUS.md](PROJECT-STATUS.md) first** — Understand what exists, what works, what's broken
2. **Read [ARCHITECTURE-GUIDE.md](ARCHITECTURE-GUIDE.md)** — Understand the codebase structure and patterns
3. **Check the concept you're working on:** `docs/concepts/[CONCEPT]-STATUS.md` — Page-by-page status
4. **Review current bugs** in PROJECT-STATUS.md § "Current Bugs"
5. **Check the backlog** in PROJECT-STATUS.md § "What's Next"

---

## Repository Setup

```bash
# Clone the repository
git clone https://github.com/lukhihardik11/vault-maison.git
cd vault-maison

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Visit any concept
# http://localhost:3000/vault
# http://localhost:3000/gallery
# http://localhost:3000/salon
# ... etc.
```

---

## Common Pitfalls (MUST READ)

### 1. DO NOT use `initial={{ opacity: 0 }}` with Framer Motion for scroll-reveal

This causes blank pages because SSR renders `opacity: 0` and client hydration doesn't always trigger the animation. The entire section becomes invisible.

**Instead:** Use the CSS safety net pattern. Set initial opacity to 1 and let the IntersectionObserver add a class for animation. The safety net in `globals.css` forces all scroll-reveal elements visible after load.

### 2. DO NOT remove the CSS safety net in globals.css

Lines ~900–930 of `globals.css` contain a "NUCLEAR SAFETY NET v2" that forces scroll-reveal elements visible. This prevents the "blank page syndrome" that plagued the project through PRs #40–#41. The root cause: `!important` inside `@keyframes` is **ignored by the CSS specification**. The safety net uses direct selector overrides instead.

```css
/* This MUST stay in globals.css */
.archive-scroll-reveal,
.stagger-item,
[class*="scroll-reveal"],
.vm-fade,
.vm-hero-el {
  opacity: 1 !important;
  transform: none !important;
}
```

### 3. DO NOT create multiple PRs simultaneously

One branch, one PR at a time. The repository owner manually reviews and merges each PR. Creating multiple PRs causes merge conflicts and confusion.

### 4. DO NOT invent fake products or data

All products in `src/data/products.ts` have realistic specifications (carat, cut, color, clarity, shape, origin, certification). Do not add products with made-up specs. If adding products, research real jewelry specifications.

### 5. DO NOT say "all pages look good" without taking screenshots

Use Puppeteer, Playwright, or browser DevTools to take full-page screenshots of every page you modify. The project has had multiple instances of "invisible content" that looked fine in code but rendered as blank pages.

### 6. Animated counters are replaced with static values

PR #40 replaced all IntersectionObserver-based animated counters (AnimatedCounter) with static StaticCounter components. Do not re-add animated counters — they caused hydration mismatches and blank sections.

### 7. DO NOT homogenize the concepts

Each concept has a deliberately different visual identity. A change that makes the Vault look more like the Gallery is a regression, not an improvement. The differences are the product.

### 8. Inline `<style>` tags with `opacity: 0` are dangerous

Several components (vault-home.tsx, MinimalAbout.tsx, MinimalCategory.tsx, MinimalProductDetail.tsx) had inline `<style>` tags defining scroll-reveal classes with `opacity: 0`. These are NOT covered by the globals.css safety net because they use different class names. If you add new scroll-reveal animations, either:
- Use the existing class names covered by the safety net, OR
- Set initial opacity to 1 and animate from there

---

## How to Test

### Manual Testing

```bash
# Start dev server
npm run dev

# Visit each concept homepage
open http://localhost:3000/vault
open http://localhost:3000/observatory
open http://localhost:3000/gallery
open http://localhost:3000/atelier
open http://localhost:3000/salon
open http://localhost:3000/archive
open http://localhost:3000/minimal
open http://localhost:3000/theater
open http://localhost:3000/marketplace
open http://localhost:3000/maison
```

### Automated Testing with Puppeteer

The project includes Puppeteer as a dev dependency. Use it for full-page screenshots:

```javascript
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/vault', { waitUntil: 'networkidle0', timeout: 30000 });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 3000)); // Wait for lazy images
await page.screenshot({ path: 'vault-full.png', fullPage: true });
await browser.close();
```

### What to Check

1. **Empty sections** — Scroll through the entire page. Are any sections blank or invisible?
2. **Broken images** — Do all product images load? Check for broken image icons.
3. **Cart functionality** — Add an item to cart. Does the toast appear? Does the badge update?
4. **Search** — Type a product name. Do results appear?
5. **Mobile layout** — Resize to 375px width. Does the layout adapt?
6. **Navigation** — Click through all nav links. Do they resolve correctly?
7. **Product detail** — Click a product. Does the detail page load with images and specs?

---

## Environment Variables

```bash
# Required for database features
NEXT_PUBLIC_SUPABASE_URL=           # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # Supabase anonymous key
SUPABASE_SERVICE_ROLE_KEY=          # Supabase admin access (for webhooks)

# Required for payment features
STRIPE_SECRET_KEY=                  # Stripe secret key (use test mode: sk_test_...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Stripe publishable key (pk_test_...)
STRIPE_WEBHOOK_SECRET=              # Stripe webhook signing secret (whsec_...)

# Optional
NEXT_PUBLIC_CONCEPT_ID=             # Lock to single concept (e.g., "vault")
NEXT_PUBLIC_APP_URL=                # Your domain (e.g., https://vaultmaison.com)
NEXT_PUBLIC_FEATURE_GEMHUB=true     # Enable GemHub 360° viewer
```

**Without environment variables:** The app runs in demo mode with local product data, client-side cart/wishlist, and no real auth or payments. This is the default development experience.

---

## Branch Naming Convention

- `feature/[descriptive-name]` — New features (e.g., `feature/gemhub-real-products`)
- `fix/[descriptive-name]` — Bug fixes (e.g., `fix/visual-qa-opacity-fixes`)
- `docs/[descriptive-name]` — Documentation updates
- `feature/documentation-checkpoint` — This documentation branch

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/data/products.ts` | All 65 products with specs, images, and flags |
| `src/data/concepts.ts` | All 10 concept definitions with palettes and fonts |
| `src/app/globals.css` | Global styles + CSS safety net (DO NOT REMOVE safety net) |
| `src/config/site.ts` | Feature flags, site metadata, GemHub config |
| `src/lib/api.ts` | API client (dual-mode: local vs Supabase) |
| `src/store/cart.ts` | Cart state (Zustand, persisted to localStorage) |
| `src/components/shared/concept-layout.tsx` | Theme application wrapper |
| `src/app/(concepts)/[concept]/page.tsx` | Concept homepage dispatcher |
| `next.config.ts` | Next.js config (image domains, redirects) |

---

## Design Philosophy (For Future Changes)

Vault Maison is built on the principle that **luxury is not a style — it is a feeling**. Each concept explores a different emotional dimension:

- **The Vault** — Exclusivity through darkness and gating
- **The Observatory** — Trust through transparency and data
- **The Gallery** — Reverence through whitespace and curation
- **The Atelier** — Warmth through craft and process
- **The Salon** — Intimacy through conversation and care
- **The Archive** — Authority through heritage and provenance
- **The Minimal Machine** — Restraint as luxury itself
- **The Theater** — Awe through cinema and spectacle
- **The Marketplace** — Urgency through scarcity and events
- **The Maison** — Sophistication through balance and timelessness

Every design decision — font choice, animation speed, CTA wording, whitespace amount — is intentional and concept-specific. Do not apply changes uniformly across concepts unless they are infrastructure-level (e.g., fixing a shared component bug).

---

## Preferences for Future Changes

1. **Always create a separate branch** — Never commit directly to main
2. **One PR at a time** — Wait for merge before starting next PR
3. **Take screenshots before and after** — Visual proof that changes work
4. **Test all 10 concepts** — A change to a shared component affects all 10
5. **Preserve existing documentation** — Add to docs, don't replace them
6. **Use real data** — No placeholder text, no fake products, no lorem ipsum
7. **Respect concept identity** — Each concept's uniqueness is intentional
8. **Document what you change** — Update the relevant STATUS.md file
9. **Check the CSS safety net** — If adding scroll animations, ensure they're covered
10. **Verify Vercel deployment** — After merging, check that the production build succeeds

---

## Checkpoint Declaration

> **As of April 15, 2026, the `main` branch (after merging PR #43) represents the latest stable state of the project.** All 10 concepts render correctly with 65 products, 118 product images, and 19 pages per concept. The frontend is complete and functional in demo mode. Backend infrastructure (Supabase, Stripe) code exists but requires environment variables to activate.
