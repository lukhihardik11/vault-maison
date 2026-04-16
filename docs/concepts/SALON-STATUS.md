# The Salon — Concept Status

> **Last Updated:** April 15, 2026
> **Route:** `/salon`
> **Screenshot:** [docs/screenshots/salon-homepage.png](../screenshots/salon-homepage.png)

---

## Identity

**Theme:** Intimate, conversational, warm — your personal jeweler
**Palette:** Background `#FDF5E6` (old lace) / Text `#2B2B2B` (dark charcoal) / Accent `#4A5D23` (sage green)
**Fonts:** Heading: Lora / Body: Lora
**DNA:** Chat-first, concierge-driven experience. Sage green accents on warm cream. Products appear as recommendations within an intimate conversational flow.

---

## Pages Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/salon` | ✅ | Welcome, advisor cards with real photos, curated picks, testimonial wall, appointment CTA |
| Collections | `/salon/collections` | ✅ | Curated collection cards |
| Category | `/salon/category/[slug]` | ✅ | Advisor-recommended products |
| Product Detail | `/salon/product/[slug]` | ✅ | Product with advisor notes |
| Cart | `/salon/cart` | ✅ | Salon-themed cart |
| Checkout | `/salon/checkout` | ✅ | Shows empty cart when no items |
| About | `/salon/about` | ✅ | Salon story, team profiles |
| Contact | `/salon/contact` | ✅ | Appointment booking form |
| FAQ | `/salon/faq` | ✅ | Consultation FAQ |
| Journal | `/salon/journal` | ✅ | Style journal |
| Account | `/salon/account` | ✅ | Profile (demo mode) |
| Search | `/salon/search` | ✅ | Glow search with suggestions |
| Wishlist | `/salon/wishlist` | ✅ | Favorites list |
| Bespoke | `/salon/bespoke` | ✅ | Personal consultation request |
| Craftsmanship | `/salon/craftsmanship` | ✅ | Craft process |
| Care | `/salon/care` | ✅ | Care guide |
| Shipping | `/salon/shipping` | ✅ | Shipping information |
| Privacy | `/salon/privacy` | ✅ | Privacy policy |
| Grading | `/salon/grading` | ✅ | Grading guide |

---

## Components Used

**Pages (18):** SalonAbout, SalonAccount, SalonBespoke, SalonCare, SalonCart, SalonCategory, SalonCheckout, SalonCollections, SalonContact, SalonCraftsmanship, SalonFAQ, SalonGrading, SalonJournal, SalonPrivacy, SalonProductDetail, SalonSearch, SalonShipping, SalonWishlist

**UI Components (12):** AdvisorCard, ConciergeChat, SalonAppointmentPicker, SalonButton, SalonCard, SalonGlowSearch, SalonInput, SalonLoyaltyProgress, SalonPulseIndicator, SalonRevealCard, SalonTestimonialWall, SalonToast

---

## Known Bugs

- None identified.

---

## Unique Features

- **Advisor cards with real photos** — Three advisors (Sophie Laurent, James Chen, Aria Patel) with portrait images from `/images/atelier/` directory
- **Concierge chat** — Chat-style interface for product recommendations
- **Sage green accent** — `#4A5D23` sage green creates a natural, calming luxury feel
- **Glow search** — Search input with a soft glow animation
- **Appointment picker** — Date/time selector for in-person consultations
- **Loyalty progress** — Visual progress bar for loyalty program status
- **Pulse indicator** — Animated dot indicating advisor availability
- **Testimonial wall** — Grid of client testimonials with IntersectionObserver reveal
- **Reveal cards** — Product cards that reveal details on hover with smooth transitions

---

## Content Gaps

- None identified — advisor photos added in PR #42, all sections substantive.
