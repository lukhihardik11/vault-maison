---
title: "Concept 07: The Minimal Machine"
category: "design-system"
subcategory: "ui-concepts"
version: "2.0"
date: "2026-04-10"
author: ["Manus AI", "Principal Digital Experience Architect"]
status: "draft"
---

# Concept 07: The Minimal Machine

### A) IDENTITY
- **Name:** The Minimal Machine
- **Tagline:** The product is the only interface.
- **Design DNA:** Brutalist, Restrained, Absolute
- **Inspiration Source:** Apple product pages, Jil Sander, concrete architecture.

### B) SIGNATURE INTERACTION
- **Mechanic:** The "Snap-to-Grid" Scroll.
- **User Action:** The user scrolls down the page.
- **UI Response:** The page does not scroll continuously. It snaps instantly to the next full-screen section using CSS `scroll-snap-type: y mandatory`. There is no smooth scrolling; it is a hard, immediate transition.
- **JS Library:** None. Pure CSS.
- **GemLightBox Reveal:** The 360° viewer is the *only* element on the screen in Section 2. It occupies 100vw and 100vh.

### C) HOMEPAGE
- **Section 1 (100vh):** Pure #FFFFFF background. Centered text: "Vault Maison" in Helvetica Neue, 12px, #050505.
- **Section 2 (100vh):** A single GemLightBox 360° viewer occupying the entire screen. No text. No UI.
- **Section 3 (100vh):** A single button: "Enter" (Helvetica Neue, 12px, #050505).

### D) PRODUCT LIST PAGE
- **Grid:** 1 column × infinite rows, 0px gap, card dimensions 100vw width × 100vh height.
- **Card Content:** 
  - Image: 100vw x 100vh GemLightBox 360° viewer.
  - Text: 1 line (Carat Weight).
  - Price: Visible ($12,000).
- **Sort/Filter:** None. The curation is absolute.
- **Image Loading:** Instant.

### E) PRODUCT DETAIL PAGE
- **Layout:** Full-screen.
- **Image Zone:** 100vw width × 100vh height. 
- **360° Viewer:** Custom WebGL implementation. Size: 100vw x 100vh. Autoplay: Yes. Background: #FFFFFF.
- **Info Zone:** Hidden behind a "Specs" toggle.
- **CTA Button:** "Buy". Size: 120px width, 40px height. Color: #050505 background, #FFFFFF text. Hover state: None.

### F) CHECKOUT FLOW: THE BRUTALIST TRANSACTION

The checkout process in The Minimal Machine is brutally simple. It consists of exactly two steps. The minimalism IS the luxury—it signals that the buyer's time is the most valuable asset.

- **Step 1: The Identity Pane**
  Clicking "Buy" does not open a cart. The 360° viewer instantly shrinks to a 120x120px square in the top left corner. The rest of the screen remains pure #FFFFFF. A single input field appears in the center: "Email." Once entered, it expands to ask for "Shipping Address." There are no labels, only placeholders in 12px Helvetica Neue.
- **Step 2: The Stripe Terminal**
  Upon hitting Enter, the address fields vanish. They are replaced by a custom-styled Stripe Elements payment input. It is a single line: `[Card Number] [MM/YY] [CVC]`. Below it, a black button (#050505) with white text (#FFFFFF) simply says: "Pay $12,000." There is no order summary, no "you saved X" messaging, no cross-sells.

This 2-step flow is the antithesis of modern e-commerce bloat. It is confident, fast, and uncompromising.

### G) MOBILE
- **Navigation Pattern:** None. Swipe up/down to navigate products.
- **Image Display:** Full-width (100vw).
- **Unique Gesture:** Swipe left to buy.

### H) TECH STACK
- **Framework:** HTML/CSS/Vanilla JS. Why: Absolute minimalism requires zero overhead.
- **CMS:** None. Hardcoded JSON.
- **E-comm:** Stripe Checkout links. Why: Bypasses the need for a complex cart system.
- **Animation:** CSS Transitions. Why: No JS libraries allowed.
- **360° Viewer:** Custom WebGL.
- **Hosting:** Vercel.

### I) CONVERSION THESIS
- The psychological trigger is the Paradox of Choice.
- Friction is removed entirely by eliminating all options and distractions.
- Expected conversion impact is a high conversion rate for decisive buyers who know exactly what they want.

### J) SCALABILITY
- **At 50 products:** Works perfectly.
- **At 500 products:** Breaks. The 1-column snap-scroll is too tedious for large catalogs.
- **At 5000 products:** Impossible.

### K) LUXURY PROOF
- **Decision: Pure #FFFFFF Background** → Requires flawless photography to not look empty.
- **Decision: Helvetica Neue** → The ultimate expression of modernist restraint.
- **Decision: "Buy" CTA** → Unapologetically direct; avoids soft-sell language.
- **Decision: No Sort/Filter** → Asserts perfect curation requiring no user input.
- **Decision: 100vw x 100vh Cards** → Treats every product as a monumental event.

### L) IMPLEMENTATION
| Effort | Team Size | MVP Timeline | Full Build | Est. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Quick Win | 2 (1 UX, 1 FE) | 4 weeks | 6 weeks | $60,000 |

### M) UNIQUENESS PROOF
1. **Color:** #FFFFFF (Pure White background).
2. **Interaction:** CSS `scroll-snap-type: y mandatory` (hard snap scrolling).
3. **Layout:** 1-column grid with 100vw x 100vh cards.
4. **Technology:** Pure HTML/CSS/Vanilla JS (No framework).
5. **Visual Metaphor:** The Concrete Gallery / Brutalist Architecture.
6. **Competitor Critique:** Mejuri (https://mejuri.com) attempts minimalism but clutters their product pages with "Best Seller" badges, review stars, and "Wear it with" carousels. The Minimal Machine strips away literally everything except the 360° asset and the price, treating the jewelry with the uncompromising focus of a brutalist gallery.
