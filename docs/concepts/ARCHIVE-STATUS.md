# The Archive — Concept Status

> **Last Updated:** April 15, 2026
> **Route:** `/archive`
> **Screenshot:** [docs/screenshots/archive-homepage.png](../screenshots/archive-homepage.png)

---

## Identity

**Theme:** Historical, provenance, deep — every stone has a story
**Palette:** Background `#2C1A1D` (dark mahogany) / Text `#F5F0EB` (parchment) / Accent `#D4A574` (brass/copper)
**Fonts:** Heading: Playfair Display / Body: Inter
**DNA:** Heritage-focused experience built around provenance and history. Dark mahogany with brass accents. Every piece comes with a documented lineage.

---

## Pages Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/archive` | ✅ | Hero, featured acquisitions (3 document cards), heritage timeline (2020–2024), category grid, curator's selection, authentication badges, stats, journal, CTA |
| Collections | `/archive/collections` | ✅ | Archive-style collection cards |
| Category | `/archive/category/[slug]` | ✅ | Provenance-themed product listing |
| Product Detail | `/archive/product/[slug]` | ✅ | Document-style product detail |
| Cart | `/archive/cart` | ✅ | Archive-themed cart |
| Checkout | `/archive/checkout` | ✅ | Shows empty cart when no items |
| About | `/archive/about` | ✅ | Archive history and methodology |
| Contact | `/archive/contact` | ✅ | Inquiry form |
| FAQ | `/archive/faq` | ✅ | Provenance FAQ |
| Journal | `/archive/journal` | ✅ | Research journal |
| Account | `/archive/account` | ✅ | Profile (demo mode) |
| Search | `/archive/search` | ✅ | Catalog search |
| Wishlist | `/archive/wishlist` | ✅ | Research list |
| Bespoke | `/archive/bespoke` | ✅ | Commission request |
| Craftsmanship | `/archive/craftsmanship` | ✅ | Methodology showcase |
| Care | `/archive/care` | ✅ | Preservation guide |
| Shipping | `/archive/shipping` | ✅ | Shipping information |
| Privacy | `/archive/privacy` | ✅ | Privacy policy |
| Grading | `/archive/grading` | ✅ | Grading standards |

---

## Components Used

**Pages (18):** ArchiveAbout, ArchiveAccount, ArchiveBespoke, ArchiveCare, ArchiveCart, ArchiveCategory, ArchiveCheckout, ArchiveCollections, ArchiveContact, ArchiveCraftsmanship, ArchiveFAQ, ArchiveGrading, ArchiveJournal, ArchivePrivacy, ArchiveProductDetail, ArchiveSearch, ArchiveShipping, ArchiveWishlist

**Layout:** ArchiveLayout (scroll-reveal wrapper with IntersectionObserver)

**UI Components (6):** DocumentCard, ProvenanceTimeline, RevealSection, SectionHeader, StaggerItem, ArchiveButton

---

## Known Bugs

- **Scroll-reveal opacity** — Fixed in PRs #40/#41. The ArchiveLayout uses IntersectionObserver to reveal sections on scroll. The CSS safety net in globals.css forces `opacity: 1 !important` on `.archive-scroll-reveal` and `.stagger-item` classes to prevent blank pages when the observer fails.

---

## Unique Features

- **Document cards** — Products presented as archival documents with catalog numbers and provenance stamps
- **Heritage timeline** — Horizontal timeline showing Vault Maison milestones (2020: Founded, 2021: First Collection, 2022: Digital Archive, 2023: Authentication System, 2024: Global Expansion)
- **2×3 category grid** — Six category cards with images (Diamond Rings, Necklaces, Earrings, Bracelets, Gold, Wedding)
- **Curator's selection** — Large featured product with full specifications
- **Authentication badges** — Four trust icons (GIA Certified, Blockchain Verified, Expert Authenticated, Insured Shipping)
- **Brass accent system** — `#D4A574` brass/copper creates an aged, archival feel
- **Dark mahogany background** — `#2C1A1D` evokes a library or archive room
- **Provenance-first design** — Every product emphasizes its history and certification

---

## Content Gaps

- None identified — major content rewrite completed in PR #42.
