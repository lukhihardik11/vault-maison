# The Atelier — Concept Status

> **Last Updated:** April 15, 2026
> **Route:** `/atelier`
> **Screenshot:** [docs/screenshots/atelier-homepage.png](../screenshots/atelier-homepage.png)

---

## Identity

**Theme:** Bespoke, tactile, process-driven — a craftsman's workshop
**Palette:** Background `#F4F1EA` (warm cream) / Text `#2B2B2B` (dark charcoal) / Accent `#8C3A3A` (garnet)
**Fonts:** Heading: Cormorant Garamond / Body: DM Sans
**DNA:** Garnet accents on cream backgrounds. Every interaction emphasizes the human hand behind each piece.

---

## Pages Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/atelier` | ✅ | Workshop hero, artisan process, featured creations, master craftsman, testimonials, bespoke CTA |
| Collections | `/atelier/collections` | ✅ | Workshop collections grid |
| Category | `/atelier/category/[slug]` | ✅ | Craft-themed product listing |
| Product Detail | `/atelier/product/[slug]` | ✅ | Artisan detail with process photos |
| Cart | `/atelier/cart` | ✅ | Atelier-themed cart |
| Checkout | `/atelier/checkout` | ✅ | Step-by-step checkout (first concept to get this) |
| About | `/atelier/about` | ✅ | Workshop story, artisan profiles |
| Contact | `/atelier/contact` | ✅ | Workshop visit request |
| FAQ | `/atelier/faq` | ✅ | Bespoke process FAQ |
| Journal | `/atelier/journal` | ✅ | Craft journal entries |
| Account | `/atelier/account` | ✅ | Profile (demo mode) |
| Search | `/atelier/search` | ✅ | Search with craft-style results |
| Wishlist | `/atelier/wishlist` | ✅ | Inspiration board |
| Bespoke | `/atelier/bespoke` | ✅ | Custom design consultation form |
| Craftsmanship | `/atelier/craftsmanship` | ✅ | Detailed process showcase |
| Care | `/atelier/care` | ✅ | Artisan care guide |
| Shipping | `/atelier/shipping` | ✅ | Shipping information |
| Privacy | `/atelier/privacy` | ✅ | Privacy policy |
| Grading | `/atelier/grading` | ✅ | Quality grading |

---

## Components Used

**Pages (18):** AtelierAbout, AtelierAccount, AtelierBespoke, AtelierCare, AtelierCart, AtelierCategory, AtelierCheckout, AtelierCollections, AtelierContact, AtelierCraftsmanship, AtelierFAQ, AtelierGrading, AtelierJournal, AtelierPrivacy, AtelierProductDetail, AtelierSearch, AtelierShipping, AtelierWishlist

**UI Components (14):** AtelierButton, AtelierCard, AtelierHero, AtelierInput, AtelierProcessStep, AtelierTestimonial, CraftBadge, MaterialSwatch, SketchCard, StitchDivider, ToolIcon, WorkbenchCard, WorkshopGallery, WorkshopTimer

---

## Known Bugs

- None identified.

---

## Unique Features

- **Artisan portraits** — Real photos of craftspeople at work (from `/images/atelier/`)
- **Process steps** — Visual step-by-step showing sketch → wax → cast → polish → set → finish
- **Garnet accent system** — `#8C3A3A` garnet used for CTAs and highlights, evoking raw gemstones
- **Workshop gallery** — Behind-the-scenes photos of the workshop
- **Material swatches** — Interactive material selection (gold colors, diamond types)
- **Stitch dividers** — Section dividers styled as hand-stitched lines
- **Craft badges** — Handmade, certified, limited edition badges
- **Framer Motion animations** — Uses `initial={{ opacity: 0 }}` with `whileInView` for smooth reveals

---

## Content Gaps

- None identified — all sections have substantive content.
