# The Gallery — Concept Status

> **Last Updated:** April 15, 2026
> **Route:** `/gallery`
> **Screenshot:** [docs/screenshots/gallery-homepage.png](../screenshots/gallery-homepage.png)

---

## Identity

**Theme:** Editorial, curated, spacious — a museum where jewelry is art
**Palette:** Background `#FDFBF7` (warm cream) / Text `#2C2C2C` (charcoal) / Accent `#2C2C2C` (charcoal)
**Fonts:** Heading: Playfair Display / Body: Inter
**DNA:** Massive whitespace, serif typography, and curated layouts. Each piece is presented like a work of art on a gallery wall.

---

## Pages Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/gallery` | ✅ | Exhibition entrance, curated selection, exhibition rooms, rotating display, new arrivals, legacy timeline, guest book |
| Collections | `/gallery/collections` | ✅ | Exhibition rooms with category cards |
| Category | `/gallery/category/[slug]` | ✅ | Gallery-style product grid |
| Product Detail | `/gallery/product/[slug]` | ✅ | Museum-card product presentation |
| Cart | `/gallery/cart` | ✅ | Gallery-themed cart |
| Checkout | `/gallery/checkout` | ✅ | Shows empty cart when no items |
| About | `/gallery/about` | ✅ | Gallery history and curatorial philosophy |
| Contact | `/gallery/contact` | ✅ | Exhibition inquiry form |
| FAQ | `/gallery/faq` | ✅ | Visitor FAQ |
| Journal | `/gallery/journal` | ✅ | Curatorial journal |
| Account | `/gallery/account` | ✅ | Collector profile (demo mode) |
| Search | `/gallery/search` | ✅ | Search with gallery-style results |
| Wishlist | `/gallery/wishlist` | ✅ | Personal collection |
| Bespoke | `/gallery/bespoke` | ✅ | Commission request |
| Craftsmanship | `/gallery/craftsmanship` | ✅ | Artisan process |
| Care | `/gallery/care` | ✅ | Conservation guide |
| Shipping | `/gallery/shipping` | ✅ | Shipping information |
| Privacy | `/gallery/privacy` | ✅ | Privacy policy |
| Grading | `/gallery/grading` | ✅ | Grading standards |

---

## Components Used

**Pages (18):** GalleryAbout, GalleryAccount, GalleryBespoke, GalleryCare, GalleryCart, GalleryCategory, GalleryCheckout, GalleryCollections, GalleryContact, GalleryCraftsmanship, GalleryFAQ, GalleryGrading, GalleryJournal, GalleryPrivacy, GalleryProductDetail, GallerySearch, GalleryShipping, GalleryWishlist

**UI Components (16):** GalleryAboutSection, GalleryButton, GalleryCarousel, GalleryCircularShowcase, GalleryImageCompare, GalleryLabel, GalleryLightbox, GalleryMasonryWall, GalleryParallaxHero, GalleryTimeline, GalleryTypewriter, GalleryViewToggle, MuseumCaption, PedestalCard, SectionDivider

---

## Known Bugs

- None identified.

---

## Unique Features

- **Museum-style layout** — Extreme whitespace with pieces "hung" on the page like gallery walls
- **Pedestal cards** — Products displayed on virtual pedestals with museum captions
- **Exhibition rooms** — Categories presented as gallery rooms to explore
- **Circular showcase** — Rotating circular product display
- **Image compare** — Before/after slider for jewelry details
- **Masonry wall** — Pinterest-style grid for collection browsing
- **Parallax hero** — Depth-creating parallax on the entrance section
- **Typewriter effect** — Text that types itself for curatorial statements
- **Legacy timeline** — Horizontal scrolling timeline of brand heritage (2020–2024)
- **New arrivals section** — "New to the Collection" grid with 4 latest products

---

## Content Gaps

- None identified — all sections have substantive content after PR #42/#43 additions.
