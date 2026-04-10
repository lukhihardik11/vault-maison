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
- **Section 1 (100vh):** Pure #FFFFFF background. Centered text: "Vault Maison" in Helvetica Neue, 12px, #000000.
- **Section 2 (100vh):** A single GemLightBox 360° viewer occupying the entire screen. No text. No UI.
- **Section 3 (100vh):** A single button: "Enter" (Helvetica Neue, 12px, #000000).

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
- **CTA Button:** "Buy". Size: 120px width, 40px height. Color: #000000 background, #FFFFFF text. Hover state: None.

### F) MOBILE
- **Navigation Pattern:** None. Swipe up/down to navigate products.
- **Image Display:** Full-width (100vw).
- **Unique Gesture:** Swipe left to buy.

### G) TECH STACK
- **Framework:** HTML/CSS/Vanilla JS. Why: Absolute minimalism requires zero overhead.
- **CMS:** None. Hardcoded JSON.
- **E-comm:** Stripe Checkout links. Why: Bypasses the need for a complex cart system.
- **Animation:** CSS Transitions. Why: No JS libraries allowed.
- **360° Viewer:** Custom WebGL.
- **Hosting:** Vercel.

### H) CONVERSION THESIS
- The psychological trigger is the Paradox of Choice.
- Friction is removed entirely by eliminating all options and distractions.
- Expected conversion impact is a high conversion rate for decisive buyers who know exactly what they want.

### I) SCALABILITY
- **At 50 products:** Works perfectly.
- **At 500 products:** Breaks. The 1-column snap-scroll is too tedious for large catalogs.
- **At 5000 products:** Impossible.

### J) LUXURY PROOF
- **Decision: Pure #FFFFFF Background** → Why it prevents mid-market perception: It requires flawless photography (GemLightBox) to not look empty.
- **Decision: Helvetica Neue Typography** → Why it prevents mid-market perception: It is the ultimate expression of modernist restraint.
- **Decision: "Buy" CTA** → Why it prevents mid-market perception: It is unapologetically direct, avoiding the soft-sell language of mass-market retailers.
- **Decision: No Sort/Filter UI** → Why it prevents mid-market perception: It asserts that the brand's curation is perfect and requires no user input.
- **Decision: 100vw x 100vh Product Cards** → Why it prevents mid-market perception: It treats every product as a singular, monumental event.

### K) IMPLEMENTATION
| Effort | Team Size | MVP Timeline | Full Build | Est. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Quick Win | 2 (1 UX, 1 FE) | 4 weeks | 6 weeks | $60,000 |

### L) UNIQUENESS PROOF
1. **Color:** #FFFFFF (Pure White background).
2. **Interaction:** CSS `scroll-snap-type: y mandatory` (hard snap scrolling).
3. **Layout:** 1-column grid with 100vw x 100vh cards.
4. **Technology:** Pure HTML/CSS/Vanilla JS (No framework).
5. **Visual Metaphor:** The Concrete Gallery / Brutalist Architecture.
6. **Competitor Critique:** James Allen's site is cluttered with promotional banners and chat popups; The Minimal Machine strips away everything except the product itself, elevating it to the status of art.
