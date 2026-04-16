# The Marketplace of Rarity — Concept Status

> **Last Updated:** April 15, 2026
> **Route:** `/marketplace`
> **Screenshot:** [docs/screenshots/marketplace-homepage.png](../screenshots/marketplace-homepage.png)

---

## Identity

**Theme:** Urgent, scarce, event-driven — bid, win, own
**Palette:** Background `#1A1A1A` (dark charcoal) / Text `#F2F2F2` (light gray) / Accent `#FF3B30` (crimson)
**Fonts:** Heading: Space Grotesk / Body: Space Grotesk
**DNA:** Auction-driven experience with urgency and scarcity. Crimson accents pulse with countdown timers. LIVE, UPCOMING, and SOLD badges create event-driven commerce.

---

## Pages Status

| Page | Route | Status | Notes |
|------|-------|--------|-------|
| Homepage | `/marketplace` | ✅ | Live auction hero, featured lots, countdown timers, rarity badges, upcoming events |
| Collections | `/marketplace/collections` | ✅ | Auction lot categories |
| Category | `/marketplace/category/[slug]` | ✅ | Lot-style product listing |
| Product Detail | `/marketplace/product/[slug]` | ✅ | Bid panel with lot details |
| Cart | `/marketplace/cart` | ✅ | Marketplace-themed cart |
| Checkout | `/marketplace/checkout` | ✅ | Shows empty cart when no items |
| About | `/marketplace/about` | ✅ | Marketplace story |
| Contact | `/marketplace/contact` | ✅ | Consignment inquiry |
| FAQ | `/marketplace/faq` | ✅ | Auction FAQ |
| Journal | `/marketplace/journal` | ✅ | Market reports |
| Account | `/marketplace/account` | ✅ | Bidder profile (demo mode) |
| Search | `/marketplace/search` | ✅ | Lot search |
| Wishlist | `/marketplace/wishlist` | ✅ | Watch list |
| Bespoke | `/marketplace/bespoke` | ✅ | Custom lot request |
| Craftsmanship | `/marketplace/craftsmanship` | ✅ | Authentication process |
| Care | `/marketplace/care` | ✅ | Care guide |
| Shipping | `/marketplace/shipping` | ✅ | Shipping information |
| Privacy | `/marketplace/privacy` | ✅ | Privacy policy |
| Grading | `/marketplace/grading` | ✅ | Grading standards |

---

## Components Used

**Pages (18):** MarketplaceAbout, MarketplaceAccount, MarketplaceBespoke, MarketplaceCare, MarketplaceCart, MarketplaceCategory, MarketplaceCheckout, MarketplaceCollections, MarketplaceContact, MarketplaceCraftsmanship, MarketplaceFAQ, MarketplaceGrading, MarketplaceJournal, MarketplacePrivacy, MarketplaceProductDetail, MarketplaceSearch, MarketplaceShipping, MarketplaceWishlist

**UI Components (7):** BidPanel, CountdownTimer, LotCard, MarketplaceButton, MarketplaceInput, RarityBadge, StatCard

---

## Known Bugs

- None identified.

---

## Unique Features

- **Auction-style commerce** — Products presented as auction lots with bid panels
- **Countdown timers** — Real-time countdown to auction end (visual only, not connected to backend)
- **Crimson accent system** — `#FF3B30` crimson creates urgency and energy
- **Rarity badges** — LIVE, UPCOMING, SOLD, LIMITED badges on products
- **Bid panel** — Product detail includes a bid interface with current bid, bid history, and bid button
- **Lot cards** — Products styled as auction lot cards with lot numbers
- **Stat cards** — Dashboard-style statistics (total lots, active auctions, etc.)
- **Space Grotesk throughout** — Modern geometric sans-serif for both headings and body
- **Event-driven layout** — Homepage organized around live, upcoming, and past events

---

## Content Gaps

- Countdown timers are visual only — not connected to a real auction backend.
- Bid functionality is UI-only — no real bidding system.
