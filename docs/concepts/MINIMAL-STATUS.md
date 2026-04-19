# Minimal Machine — Concept Status

> **Last Updated:** April 19, 2026
> **Route:** `/minimal`
> **Screenshot:** [docs/screenshots/minimal-homepage.png](../screenshots/minimal-homepage.png)

---

## Identity

**Theme:** Brutalist, restrained, precise — nothing more
**Palette:** Background `#FFFFFF` (white) / Text `#050505` (near-black) / Accent `#050505` (near-black)
**Fonts:** Heading: Helvetica Neue / Body: Helvetica Neue
**DNA:** Brutalist restraint. Black and white only. No decorative components, no color accents. The smallest codebase. Restraint IS the luxury.

---

## Pages Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/minimal` | ✅ | Hero, featured grid, categories, 3D viewer, horizontal scroll, about teaser, trust metrics |
| Collections | `/minimal/collections` | ✅ | Minimal grid layout |
| Category | `/minimal/category/[slug]` | ✅ | Clean product listing |
| Product Detail | `/minimal/product/[slug]` | ✅ | Stripped-down product page |
| Cart | `/minimal/cart` | 🔨 | Uses MinimalCart — may show minimal content |
| Checkout | `/minimal/checkout` | ✅ | Shows empty cart when no items |
| About | `/minimal/about` | ✅ | Brutalist about page with fade animations |
| Contact | `/minimal/contact` | ✅ | Minimal contact form |
| FAQ | `/minimal/faq` | ✅ | Clean FAQ |
| Journal | `/minimal/journal` | ✅ | Minimal journal |
| Account | `/minimal/account` | ✅ | Profile (demo mode) |
| Search | `/minimal/search` | ✅ | Action search bar |
| Wishlist | `/minimal/wishlist` | ✅ | Minimal wishlist |
| Bespoke | `/minimal/bespoke` | ✅ | Custom request |
| Craftsmanship | `/minimal/craftsmanship` | ✅ | Process page |
| Care | `/minimal/care` | ✅ | Care guide |
| Shipping | `/minimal/shipping` | ✅ | Shipping info |
| Privacy | `/minimal/privacy` | ✅ | Privacy policy |
| Grading | `/minimal/grading` | ✅ | Grading guide |

---

## Components Used

**Pages (18):** MinimalAbout, MinimalAccount, MinimalBespoke, MinimalCare, MinimalCart, MinimalCategory, MinimalCheckout, MinimalCollections, MinimalContact, MinimalCraftsmanship, MinimalFAQ, MinimalGrading, MinimalJournal, MinimalPrivacy, MinimalProductDetail, MinimalSearch, MinimalShipping, MinimalWishlist

**UI Components (30):** ActionSearchBar, AnimatedSendButton, AnimatedSocialIcons, AttractButton, AvatarPicker, BentoGrid, BlobGlassCard, CardFlip, CardStack, DarkLoginForm, DynamicText, ExploreButton, GlassmorphismMetrics, HeroFashion, MatrixText, MinimalHeroSection, NeuProductCard, ProductBounceCard, ProfileDropdown, ScrollText, ShimmerText, SlideTextButton, SmoothDrawer, SmoothTab, SocialButton, SpotlightCards, SwitchButton, Toolbar, TruckLoader, TypewriterTitle

**Animation Components (8 effects, 10 exports):** ScrollProgress, TextReveal, SplitTextReveal, StaggerReveal, StaggerItem, ParallaxSection, ParallaxImage, HorizontalScroll, HorizontalPanel, MinimalCursor

**3D Components (2):** ParticleField, Minimal3DViewer

**Hooks (2):** useReducedMotionPreference, useIsMobile

---

## Animation System (PR #49, QA-cleaned Apr 19)

All 8 animation effects were added in `feature/minimal-3d-animations` (April 18, 2026). QA cleanup on April 19 removed 3 dead duplicate files and 1 unused dependency.

### Effect Inventory

| # | Effect | Component | Location | Tech | Mobile Fallback |
|---|--------|-----------|----------|------|-----------------|
| 1 | Scroll Progress Bar | `ScrollProgress` | `animations/ScrollProgress.tsx` | Framer Motion `useScroll` + `useSpring` | Same (lightweight) |
| 2 | Clip-Path Text Reveal | `TextReveal`, `SplitTextReveal` | `animations/TextReveal.tsx` | GSAP ScrollTrigger + `clipPath` | Same, faster trigger |
| 3 | Staggered Element Reveals | `StaggerReveal`, `StaggerItem` | `animations/StaggerReveal.tsx` | GSAP ScrollTrigger + stagger | Reduced stagger timing |
| 4 | Parallax Depth Layers | `ParallaxSection`, `ParallaxImage` | `animations/ParallaxSection.tsx` | GSAP ScrollTrigger + translateY | Disabled (static) |
| 5 | Horizontal Scroll Showcase | `HorizontalScroll`, `HorizontalPanel` | `animations/HorizontalScroll.tsx` | GSAP pin + translateX | Vertical scroll |
| 6 | Custom Cursor | `MinimalCursor` | `cursor/MinimalCursor.tsx` | requestAnimationFrame + lerp + mix-blend-mode | Disabled (touch devices) |
| 7 | Ambient Particles | `ParticleField` | `3d/ParticleField.tsx` | React Three Fiber `useFrame` + Points | Disabled entirely |
| 8 | 3D Product Viewer | `Minimal3DViewer` | `3d/Minimal3DViewer.tsx` | React Three Fiber `useFrame` + Canvas | Static placeholder |

### Dead Files Removed (QA Cleanup)

| Removed File | Reason | Replaced By |
|-------------|--------|-------------|
| `cursor/CustomCursor.tsx` | Dead code — never imported | `MinimalCursor.tsx` |
| `3d/DiamondDust.tsx` | Dead code — never imported | `ParticleField.tsx` |
| `3d/ProductViewer3D.tsx` | Dead wrapper — never imported externally | `Minimal3DViewer.tsx` |
| `@react-three/drei` (package.json) | Unused dependency — no imports in codebase | Removed entirely |

### Design Rules Enforced

- All colors: `#FFFFFF`, `#050505`, `#6B6B6B`, `#9B9B9B` only
- Zero `initial={{ opacity: 0 }}` — uses GSAP ScrollTrigger and CSS transitions instead
- Zero rounded corners — all shapes use `borderRadius: '0'` or no border-radius
- Zero gold colors — no `#D4AF37`, `#C4A265`, or any warm accent
- Every component checks `prefers-reduced-motion` via `useReducedMotionPreference()` hook
- Every heavy component (parallax, cursor, particles, 3D) checks for mobile/touch via `useIsMobile()` and disables
- 3D components (`ParticleField`, `Minimal3DViewer`) are lazy-loaded with `next/dynamic` + `ssr: false`

### Homepage Integration Map

| Section | Effects Applied |
|---------|----------------|
| Hero headline | `TextReveal` (clip-path wipe) |
| Hero data points | `StaggerReveal` (staggered reveal) |
| Hero CTA buttons | `StaggerReveal` (staggered reveal) |
| Hero image | `ParallaxImage` (parallax scroll) |
| Hero overlay | `ParticleField` (ambient particles, lazy-loaded) |
| Category grid | `StaggerItem` per card (staggered reveal) |
| Featured piece image | `ParallaxSection` (depth layer) |
| Featured piece title | `TextReveal` (clip-path wipe) |
| 3D Viewer section | `Minimal3DViewer` (interactive 3D, lazy-loaded) |
| Brand story text | `SplitTextReveal` (word-by-word) |
| Horizontal showcase | `HorizontalScroll` + `HorizontalPanel` (pinned scroll) |
| Collection grid | `StaggerItem` per card (staggered reveal) |
| Trust metrics numbers | `CountUp` (animated counter, `useInView` triggered) |
| Bestsellers grid | `StaggerItem` per card (staggered reveal) |
| All section headings | `TextReveal` (clip-path wipe) |
| Global (layout) | `ScrollProgress` (2px top bar) |
| Global (layout) | `MinimalCursor` (dot + ring, lazy-loaded) |

### Performance Notes

- 3D components use `next/dynamic` with `ssr: false` for code splitting
- Canvas DPR capped at `[1, 1.5]` for particles, `[1, 2]` for product viewer
- `willChange` property is set to `'auto'` after animation completes to free GPU memory
- All GSAP animations use `ease: 'none'` or `power2.out` for consistent easing
- Particle count is intentionally low for subtlety and performance
- `@react-three/drei` removed — all 3D effects use raw R3F primitives only

---

## Known Bugs

- **MinimalAbout/MinimalCategory/MinimalProductDetail inline opacity** — Fixed in PR #41. These components had inline `<style>` tags defining fade classes with `opacity: 0` that were not covered by the globals.css safety net. Now use `opacity: 1` as initial state.
- **MinimalCart** — May show minimal content in automated tests; needs investigation.

---

## Unique Features

- **Brutalist philosophy** — Deliberately stripped of color, decoration, and animation. The restraint is the design.
- **Black and white only** — No accent color. `#050505` on `#FFFFFF`. Period.
- **Helvetica Neue throughout** — Same font for headings and body, emphasizing uniformity
- **30 UI micro-components** — Despite the "minimal" name, this concept has the most UI components because it was the first concept built (PRs #14-#17) and served as the testing ground for KokonutUI and Uiverse integrations
- **8 animation effects** — ScrollProgress, TextReveal, StaggerReveal, Parallax, HorizontalScroll, MinimalCursor, ParticleField, Minimal3DViewer
- **Interactive 3D viewer** — Procedural jewelry models with orbit controls and studio lighting
- **Bento grid** — Pinterest-style product grid
- **Card flip** — Product cards that flip to reveal details
- **Matrix text** — Text that appears character by character like The Matrix
- **Spotlight cards** — Cards with cursor-following spotlight effect
- **Smooth drawer** — Slide-up drawer for mobile interactions

---

## Content Gaps

- MinimalCart component may need additional content when cart is empty.
