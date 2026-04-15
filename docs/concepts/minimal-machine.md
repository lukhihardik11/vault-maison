# The Minimal Machine — Concept 07

## Design Philosophy

The Minimal Machine is a production-quality e-commerce concept for Vault Maison that strips luxury jewelry retail to its absolute essence. Every design decision follows a single principle: **if it doesn't serve the product, remove it.**

The concept draws direct inspiration from Jil Sander, Celine, The Row, Bottega Veneta, Aesop, and Apple — brands that prove restraint is the highest form of sophistication. The result is a site where the jewelry speaks and the interface disappears.

## Design System

### Color Palette

The entire concept uses exactly two colors with no exceptions.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#FFFFFF` | All backgrounds |
| `--fg` | `#050505` | All text, borders, icons |

Opacity is used for hierarchy: 1.0 for primary text, 0.6 for secondary, 0.4 for tertiary, 0.3 for labels.

### Typography

System fonts only — no web font loading, no FOUT, no layout shift.

```
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```

| Element | Size | Weight | Spacing |
|---------|------|--------|---------|
| Page titles | 28px | 300 | -0.01em |
| Section labels | 11px | 400 | 0.2em (uppercase) |
| Body text | 13px | 300 | normal |
| Product names | 13px | 400 | normal |
| Prices | 13px | 300 | normal |
| Nav links | 11px | 400 | 0.2em (uppercase) |

### Spacing

Vertical rhythm is based on 120px between major sections on the homepage, 60px between content blocks, and 5vw horizontal padding. The nav is 56px tall with a 1px bottom border.

### Animation

CSS-only transitions. No Framer Motion, no GSAP, no JavaScript animation libraries.

```css
transition: all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

Hover effects are limited to opacity changes and background-color fills on buttons.

## Architecture

### Component Structure

All Minimal Machine components live in:

```
src/components/concepts/minimal/
├── MinimalLayout.tsx      — Wrapper with white bg override + nav + footer
├── MinimalNav.tsx          — 56px nav, logo left, links center, utility right
├── MinimalFooter.tsx       — Copyright + 4 links
├── MinimalProductCard.tsx  — 1:1 aspect ratio, name + price below
├── MinimalProductGrid.tsx  — 3-col desktop, 2-col mobile, with sort
├── MinimalPage.tsx         — Reusable page template with breadcrumbs
├── index.ts                — Barrel export
└── pages/
    ├── MinimalAbout.tsx
    ├── MinimalAccount.tsx
    ├── MinimalBespoke.tsx
    ├── MinimalCare.tsx
    ├── MinimalCart.tsx
    ├── MinimalCategory.tsx
    ├── MinimalCheckout.tsx
    ├── MinimalCollections.tsx
    ├── MinimalContact.tsx
    ├── MinimalCraftsmanship.tsx
    ├── MinimalFAQ.tsx
    ├── MinimalGrading.tsx
    ├── MinimalJournal.tsx
    ├── MinimalPrivacy.tsx
    ├── MinimalProductDetail.tsx
    ├── MinimalSearch.tsx
    ├── MinimalShipping.tsx
    ├── MinimalWishlist.tsx
    └── index.ts
```

### Routing Integration

Each page in `src/app/(concepts)/[concept]/*/page.tsx` checks `concept.id === 'minimal'` and renders the corresponding Minimal component. This allows the minimal concept to coexist with all other concepts without affecting their rendering.

```tsx
// Example: about/page.tsx
if (concept.id === 'minimal') return <MinimalAbout />
```

### State Management

Uses existing Zustand stores:
- `useCartStore` — Cart items, add/remove/update/clear
- `useWishlistStore` — Saved items, toggle/check

### Data Layer

Uses existing shared data:
- `products` — 30 products across 10 categories
- `collections` — Category metadata
- `concepts` — Concept configuration including category labels and descriptions

## Page Inventory

### Core Pages (10)

| Page | Route | Component |
|------|-------|-----------|
| Homepage | `/minimal` | `minimal-home.tsx` |
| About | `/minimal/about` | `MinimalAbout` |
| Collections | `/minimal/collections` | `MinimalCollections` |
| Bespoke | `/minimal/bespoke` | `MinimalBespoke` |
| Contact | `/minimal/contact` | `MinimalContact` |
| FAQ | `/minimal/faq` | `MinimalFAQ` |
| Cart | `/minimal/cart` | `MinimalCart` |
| Checkout | `/minimal/checkout` | `MinimalCheckout` |
| Account | `/minimal/account` | `MinimalAccount` |
| Journal | `/minimal/journal` | `MinimalJournal` |

### Category Pages (10)

| Category | Route |
|----------|-------|
| Diamond Rings | `/minimal/category/diamond-rings` |
| Diamond Necklaces | `/minimal/category/diamond-necklaces` |
| Diamond Earrings | `/minimal/category/diamond-earrings` |
| Diamond Bracelets | `/minimal/category/diamond-bracelets` |
| Gold Rings | `/minimal/category/gold-rings` |
| Gold Necklaces | `/minimal/category/gold-necklaces` |
| Gold Earrings | `/minimal/category/gold-earrings` |
| Gold Bracelets | `/minimal/category/gold-bracelets` |
| Loose Diamonds | `/minimal/category/loose-diamonds` |
| Wedding & Bridal | `/minimal/category/wedding-bridal` |

### Product Detail Pages (30)

Each of the 30 products has a detail page at `/minimal/product/[slug]` rendered by `MinimalProductDetail`. Features include image gallery with thumbnails, diamond specifications grid, material details, add-to-cart functionality, save/wishlist toggle, and related products section.

### Utility Pages (5)

| Page | Route | Component |
|------|-------|-----------|
| Craftsmanship | `/minimal/craftsmanship` | `MinimalCraftsmanship` |
| Certification | `/minimal/grading` | `MinimalGrading` |
| Care | `/minimal/care` | `MinimalCare` |
| Shipping | `/minimal/shipping` | `MinimalShipping` |
| Privacy | `/minimal/privacy` | `MinimalPrivacy` |

### Additional Pages (3)

| Page | Route | Component |
|------|-------|-----------|
| Search | `/minimal/search` | `MinimalSearch` |
| Wishlist | `/minimal/wishlist` | `MinimalWishlist` |
| Checkout Confirmation | (within checkout flow) | `MinimalCheckout` |

**Total: 48 accessible routes** (10 core + 10 category + 30 product + 5 utility + 3 additional = 58 routes, but 30 product routes share one component)

## Mobile Responsiveness

All pages are responsive at 375px. Key breakpoints:

| Breakpoint | Behavior |
|------------|----------|
| > 768px | Full desktop layout, 3-col grids, 2-col product detail |
| ≤ 768px | Single column, hamburger menu, stacked forms |

The nav collapses to logo + cart + hamburger on mobile. Product grids switch to 2 columns. Forms stack to single column. The checkout layout becomes single-column with order summary below the form.

## Design Decisions for Future AI Agents

### What NOT to add

1. **No gradients** — Pure flat colors only
2. **No shadows** — Zero box-shadow anywhere
3. **No border-radius** — All corners are sharp
4. **No decorative elements** — No lines, dots, patterns, or ornaments
5. **No web fonts** — System fonts only
6. **No animation libraries** — CSS transitions only
7. **No color** — Only #FFFFFF and #050505

### How to extend

To add a new page to the Minimal Machine:

1. Create a new component in `src/components/concepts/minimal/pages/`
2. Use `MinimalPage` as the wrapper for consistent layout
3. Export from the pages barrel `index.ts`
4. Add the `concept.id === 'minimal'` check in the corresponding route page
5. Follow the existing typography and spacing conventions

### How to replicate for other concepts

The Minimal Machine serves as the template for building the other 9 concepts. Each concept should:

1. Create its own component directory under `src/components/concepts/[concept-name]/`
2. Create concept-specific Layout, Nav, Footer, ProductCard, ProductGrid components
3. Create page components in a `pages/` subdirectory
4. Add `concept.id === '[concept-name]'` checks in each route page
5. Follow the same barrel export pattern

## Build Status

- Build: Passing (Next.js static export)
- Desktop: Verified at 1440px
- Mobile: Verified at 375px
- All 18 unique page components created and tested
- All route integrations complete
