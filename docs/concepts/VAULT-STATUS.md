# The Vault — Concept Status

> **Last Updated:** April 15, 2026
> **Route:** `/vault`
> **Screenshot:** [docs/screenshots/vault-homepage.png](../screenshots/vault-homepage.png)

---

## Identity

**Theme:** Gated, monolithic, intimate — a private vault of rare treasures
**Palette:** Background `#0A0A0A` (near-black) / Text `#EAEAEA` (light gray) / Accent `#D4AF37` (gold)
**Fonts:** Heading: Cinzel / Body: Inter
**DNA:** Dark monolithic surfaces with gold accents. Every interaction feels like accessing a private vault.

---

## Pages Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/vault` | ✅ | Hero, featured pieces, vault promise, bestsellers, new arrivals, exclusive access |
| Collections | `/vault/collections` | ✅ | Full category grid with product counts |
| Category | `/vault/category/[slug]` | ✅ | Filtered product listing |
| Product Detail | `/vault/product/[slug]` | ✅ | Image gallery, specs, add to cart (image-heavy, low text in automated tests) |
| Cart | `/vault/cart` | ✅ | Vault-themed cart with gold accents |
| Checkout | `/vault/checkout` | ✅ | Shows empty cart message when no items |
| About | `/vault/about` | ✅ | Heritage story, values, team |
| Contact | `/vault/contact` | ✅ | Contact form with vault styling |
| FAQ | `/vault/faq` | ✅ | Accordion-style FAQ |
| Journal | `/vault/journal` | ✅ | Blog/journal entries |
| Account | `/vault/account` | ✅ | Profile page (demo mode) |
| Search | `/vault/search` | ✅ | Fuse.js search overlay |
| Wishlist | `/vault/wishlist` | ✅ | Saved items list |
| Bespoke | `/vault/bespoke` | ✅ | Custom design request |
| Craftsmanship | `/vault/craftsmanship` | ✅ | Process showcase |
| Care | `/vault/care` | ✅ | Jewelry care guide |
| Shipping | `/vault/shipping` | ✅ | Shipping information |
| Privacy | `/vault/privacy` | ✅ | Privacy policy |
| Grading | `/vault/grading` | ✅ | Diamond grading guide |

---

## Components Used

**Pages (18):** VaultAbout, VaultAccount, VaultBespoke, VaultCare, VaultCart, VaultCategory, VaultCheckout, VaultCollections, VaultContact, VaultCraftsmanship, VaultFAQ, VaultGrading, VaultJournal, VaultPrivacy, VaultProductDetail, VaultSearch, VaultShipping, VaultWishlist

**UI Components (22):** CinematicFooter, CinematicHero, DarkNeumorphicInput, ElegantDarkButton, FloatingNavbar, PhotoGallery, ScrollAwareHeader, SparkleGlowButton, SpotlightCard, SpotlightCardWrapper, VaultAboutSection, VaultAccordionGallery, VaultAnimatedCounter, VaultCarousel, VaultFeatureBucket, VaultHoverPeek, VaultLimelightNav, VaultLuminaSlider, VaultMagneticButton, VaultProductRevealCard, VaultScrollProgress, VaultTestimonialCarousel, VaultTextReveal

---

## Known Bugs

- **vault-reveal inline opacity** — Fixed in PR #41. The vault-home.tsx had inline `<style>` defining `.vault-reveal { opacity: 0 }` which was not covered by the globals.css safety net. Now uses `opacity: 1` as initial state.

---

## Unique Features

- **Aurora background effect** — Animated gradient background on the hero section
- **Spotlight cards** — Product cards with a spotlight hover effect following the cursor
- **Vault reveal animation** — Sections reveal as if a vault door is opening
- **Gold accent system** — `#D4AF37` gold used consistently for CTAs, borders, and highlights
- **Cinematic hero** — Full-viewport hero with parallax and text reveal
- **Accordion gallery** — Expandable image gallery on product pages
- **Magnetic buttons** — Buttons that subtly follow cursor movement

---

## Content Gaps

- None identified — all sections have substantive content.
