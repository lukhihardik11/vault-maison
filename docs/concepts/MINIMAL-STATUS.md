# The Minimal Machine — Concept Status

> **Last Updated:** April 15, 2026
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
| Homepage | `/minimal` | ✅ | Hero, featured grid, categories, about teaser, testimonials |
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

---

## Known Bugs

- **MinimalAbout/MinimalCategory/MinimalProductDetail inline opacity** — Fixed in PR #41. These components had inline `<style>` tags defining fade classes with `opacity: 0` that were not covered by the globals.css safety net. Now use `opacity: 1` as initial state.
- **MinimalCart** — May show minimal content in automated tests; needs investigation.

---

## Unique Features

- **Brutalist philosophy** — Deliberately stripped of color, decoration, and animation. The restraint is the design.
- **Black and white only** — No accent color. `#050505` on `#FFFFFF`. Period.
- **Helvetica Neue throughout** — Same font for headings and body, emphasizing uniformity
- **30 UI micro-components** — Despite the "minimal" name, this concept has the most UI components because it was the first concept built (PRs #14–#17) and served as the testing ground for KokonutUI and Uiverse integrations
- **Bento grid** — Pinterest-style product grid
- **Card flip** — Product cards that flip to reveal details
- **Matrix text** — Text that appears character by character like The Matrix
- **Spotlight cards** — Cards with cursor-following spotlight effect
- **Smooth drawer** — Slide-up drawer for mobile interactions

---

## Content Gaps

- MinimalCart component may need additional content when cart is empty.
