---
title: "Concept 10: The Modern Maison"
category: "design-system"
subcategory: "ui-concepts"
version: "2.0"
date: "2026-04-10"
author: ["Manus AI", "Principal Digital Experience Architect"]
status: "draft"
---

# Concept 10: The Modern Maison

### A) IDENTITY
- **Name:** The Modern Maison
- **Tagline:** Heritage prestige engineered for the digital age.
- **Design DNA:** Balanced, Performant, Timeless
- **Inspiration Source:** "If Cartier rebuilt from scratch in 2026."

This is the flagship concept. It is not the most experimental, nor the most minimal, nor the most theatrical. It is the most *correct*. It synthesizes the best practices of heritage luxury retail with the performance standards of a modern, digital-native platform. Every decision is justified by a comparison to what existing heritage brands do wrong. It is designed to scale from 50 to 5000 products without a single redesign. It is the concept a board of directors would approve, and a discerning HNWI would trust.

### B) SIGNATURE INTERACTION
- **Mechanic:** The "Split-Screen Heritage" Compare.
- **User Action:** The user clicks a "View Heritage Context" toggle button on the PDP. This toggle is a 120px wide, 36px tall pill shape, positioned directly below the 360° viewer.
- **UI Response:** 
  - 0-300ms: The 100vw image zone splits perfectly down the middle (50vw/50vw) using a `cubic-bezier(0.65, 0, 0.35, 1)` transition. This is not a slide; it is a clean, mechanical split, like opening a diptych.
  - 300-800ms: The left side retains the pristine, unedited GemLightBox 360° viewer, continuing its rotation uninterrupted. The right side fades in a rich, sepia-toned archival photograph or a stylized sketch of the setting, demonstrating the historical lineage of the cut or design. For example, a round brilliant cut would show a photograph of Marcel Tolkowsky's original 1919 diagrams.
  - 800-1000ms: A subtle, vertical #8B7355 (Antique Bronze) divider line draws itself from top to bottom between the two halves, completing the diptych effect.
  - On close: The user clicks the toggle again. The divider retracts, the archival image fades out, and the 360° viewer expands back to 100vw over 500ms.
- **JS Library:** React Spring (for the fluid, interruptible split-screen physics). React Spring is chosen specifically because its spring-based model allows the user to interrupt the animation mid-way (e.g., clicking the toggle rapidly) without visual glitches, unlike timeline-based libraries.
- **GemLightBox Reveal:** The 360° viewer is presented in stark contrast to the archival imagery. The left side is the present: a perfect, unedited, true-to-life GemLightBox capture. The right side is the past: a historical reference. This juxtaposition proves that modern technology (GemLightBox) and heritage craftsmanship are not at odds; they are a continuum. This is the core thesis of the entire concept.

**Why this is superior to what heritage brands do today:** Cartier's website shows a product photo and a paragraph of marketing copy. There is no visual connection between the product and the brand's 175-year history. The "Split-Screen Heritage" compare *shows* the connection, making the heritage tangible and verifiable, not just claimed.

### C) HOMEPAGE
- **Section 1 (100vh):** A soft #FAFAFA (Pearl) background. Centered is a 600x800px video loop of a master cutter at work, shot in 4K with a shallow depth of field. The video is muted by default, with a subtle "Sound On" icon in the bottom right. Overlaid on the video is the Vault Maison logo in a custom, proprietary serif typeface (Maison Serif), 48px, #1C1C1C. Below the video, a single line: "The Future of Heritage" in Maison Serif, 24px, #777777, tracking 0.15em.
- **Section 2 (120vh):** "The Collections." A staggered, 2-column grid. The left column scrolls at 1.0x speed, the right column scrolls at 0.85x speed (a subtle parallax effect). Each collection card is 480px wide and 640px tall, featuring a GemLightBox hero image and the collection title. Background remains #FAFAFA.
- **Section 3 (80vh):** "The Vault Standard." A horizontal band of #1C1C1C (Charcoal) spanning 100vw. Inside, three pillars of the brand are displayed in a 3-column layout: Provenance, Precision, and Privacy, each set in Maison Serif, 32px, #FAFAFA, with a 2-line description below in 16px.
- **Section 4 (60vh):** "The Concierge." A simple, elegant section with a centered portrait of the lead concierge, a brief bio, and a "Book a Consultation" button. Background returns to #FAFAFA.

**Why this is superior to what heritage brands do today:** Most heritage brand homepages are dominated by campaign imagery (a model wearing the jewelry in a glamorous setting). This distracts from the product itself. The Modern Maison's homepage leads with the *craft* (the cutter at work), then the *product* (the collections), then the *brand values* (the Vault Standard), then the *service* (the concierge). This hierarchy respects the buyer's intelligence and prioritizes substance over spectacle.

### D) PRODUCT LIST PAGE
- **Grid:** 3 columns × infinite rows, 32px gap, card dimensions 360px width × 540px height.
- **Card Content:** 
  - Image: 360x360px static GemLightBox shot, perfectly centered within the card.
  - Text: 2 lines. Line 1: Collection Name (Maison Serif, 14px, #1C1C1C). Line 2: Carat Weight and Cut (Maison Serif, 12px, #777777).
  - Price: Visible, but styled subtly in a lighter grey (#777777) at 14px. The price is not the focal point; the image is.
- **Sort/Filter:** A clean, horizontal bar (56px height) positioned below the header. It contains text links: "All," "Round Brilliant," "Emerald Cut," "Oval," "Fancy." Clicking "Filter" expands a mega-menu overlay (100vw, 400px height) with visual icons for each cut shape, color grade, and carat range. The mega-menu uses a 4-column layout with clear section headers.
- **Image Loading:** Progressive JPEG loading. Images load as a low-res, pixelated version (a 20px-wide thumbnail scaled up) and snap to the high-res version instantly when fully downloaded. This avoids the "blur-up" effect (used by Gatsby and many Shopify themes) which can feel cheap and uncertain. The snap-to-sharp transition reinforces the "precision" brand code.

**Why this is superior to what heritage brands do today:** Van Cleef & Arpels uses a 4-column grid with tiny images and prominent prices, making their $50,000 pieces look like items in a catalog. The Modern Maison uses a 3-column grid with larger images and subdued prices, ensuring every piece commands attention and the price is secondary to the visual impact.

### E) PRODUCT DETAIL PAGE
- **Layout:** Left-right split grid (60/40).
- **Image Zone:** 60vw width, sticky on scroll. Contains the GemLightBox 360° viewer and, below it, a row of 4 thumbnail images (80x80px each, 12px gap) showing alternate angles.
- **360° Viewer:** Spinviewer.js. Size: 800x800px, centered within the 60vw container. Autoplay: No. The viewer waits for user input. Background: #FAFAFA. The viewer includes a "Magnify" tool that acts like a jeweler's loupe: when the user hovers over the image, a 200x200px circular magnification window follows the cursor, showing a 5x zoomed crop of the GemLightBox image. This is implemented using a CSS `clip-path: circle()` and `transform: scale(5)` on a duplicate image layer.
- **Info Zone:** Placed on the right (40vw), scrollable independently of the sticky image zone.
  1. Breadcrumbs (Home > Collections > The Argyle) in Maison Serif, 12px, #777777.
  2. Title (Maison Serif, 42px, #1C1C1C).
  3. Price (Maison Serif, 24px, #1C1C1C).
  4. The "Split-Screen Heritage" toggle (pill shape, 120x36px, #FAFAFA background, 1px solid #1C1C1C border).
  5. Accordion menus for: Specifications (Carat, Color, Clarity, Cut, Fluorescence, Polish, Symmetry), Provenance (Mine, Cutter, Certification), and Shipping (Estimated delivery, insurance, returns). Each accordion header is Maison Serif, 16px, #1C1C1C.
  6. CTA Button.
- **CTA Button:** "Add to Collection". Size: 100% width of the info zone (minus 32px padding), 56px height. Color: #1C1C1C background, #FAFAFA text, Maison Serif, 16px. Hover state: The button background fades to #8B7355 (Antique Bronze) over 200ms, and the text remains #FAFAFA. This hover state subtly introduces the brand's warm metallic accent, rewarding the user's attention.

**Why this is superior to what heritage brands do today:** Bulgari's PDP crams the product image into a small square and surrounds it with marketing copy and upsell modules. The Modern Maison dedicates 60% of the viewport to the product image, making it the undeniable focal point, while the info zone is clean, structured, and respects the buyer's time.

### F) MOBILE
- **Navigation Pattern:** A bottom tab bar (Home, Search, Concierge, Bag) with a prominent, floating "Concierge" button in the center. The Concierge button is 56x56px, circular, #8B7355 background, with a white chat icon. It floats 16px above the tab bar.
- **Image Display:** Full-width carousel with pagination dots (6px diameter, 8px gap, #1C1C1C active, #CCCCCC inactive). The carousel supports swipe gestures with momentum-based deceleration.
- **Unique Gesture:** A long-press (800ms) on the "Add to Collection" button triggers a haptic buzz (using the Vibration API) and immediately opens the Apple Pay / Google Pay sheet, bypassing the cart entirely for a 1-click checkout. This is the ultimate expression of "heritage prestige engineered for the digital age": the gravitas of a luxury purchase, completed with the speed of a modern digital transaction.

**Why this is superior to what heritage brands do today:** Chopard's mobile site is a responsive desktop site crammed into a small screen. The navigation is a hamburger menu that opens a full-screen overlay, hiding the product. The Modern Maison's bottom tab bar keeps the product visible at all times and provides instant access to the concierge, the most valuable conversion tool.

### G) TECH STACK
- **Framework:** Vue.js (Nuxt 3). Why: Provides the perfect balance of performance (server-side rendering for SEO and initial load speed) and developer experience (the Composition API is ideal for building complex, interactive components like the split-screen compare and the jeweler's loupe). Nuxt 3's hybrid rendering allows static generation for collection pages and server-side rendering for dynamic product pages.
- **CMS:** Builder.io. Why: Its visual editor allows the marketing team to build rich, editorial pages (e.g., "The Vault Standard" section, collection landing pages) without developer intervention. This is crucial for a heritage brand that needs to update its editorial content frequently.
- **E-comm:** Commerce Layer. Why: A highly flexible, API-first commerce engine that easily handles complex pricing rules (tiered pricing for parcels, bespoke pricing for commissions), multi-currency requirements for a global luxury audience, and thorough inventory management for unique, one-of-a-kind pieces.
- **Animation:** React Spring (adapted for Vue via vue-use-spring). Why: Physics-based animations ensure the UI feels weighty and substantial, not floaty or cheap. The spring model is particularly important for the "Split-Screen Heritage" compare, where the animation must feel mechanical and precise.
- **360° Viewer:** Spinviewer.js. Why: Lightweight, highly customizable, and supports the custom "Magnify" loupe overlay without conflicting with the viewer's own event handlers.
- **Hosting:** Netlify Edge. Why: Edge rendering ensures sub-100ms TTFB globally, which is critical for the luxury market where buyers are located in New York, London, Dubai, Hong Kong, and Tokyo. Netlify's atomic deploys also ensure zero-downtime updates.

### H) CONVERSION THESIS
- The psychological trigger is the Authority Bias combined with the Ease of Use (Cognitive Fluency).
- Friction is minimized in the checkout process (1-click Apple Pay via long-press) but maintained in the product discovery phase (the Heritage Compare, the jeweler's loupe, the accordion specs) to build perceived value and justify the premium price.
- Expected conversion impact is a high baseline conversion rate (estimated 2.5-3.5% for qualified traffic), as the site feels familiar enough to be trusted (standard e-commerce patterns like breadcrumbs, grid layouts, and sticky images) but premium enough to justify the price point (proprietary typography, Heritage Compare, muted color palette).

### I) SCALABILITY
- **At 50 products:** Works perfectly as a curated, high-touch experience.
- **At 500 products:** Works exceptionally well; the 3-column grid and visual mega-menu filtering are designed for this exact scale. The mega-menu's visual icons for cut shapes make browsing 500 products feel intuitive rather than overwhelming.
- **At 5000 products:** Works, provided the search functionality is augmented with Algolia integration for complex queries (e.g., "2 carat emerald cut VVS1 natural"). The 3-column grid with infinite scroll and progressive JPEG loading can handle this volume without performance degradation.

### J) LUXURY PROOF
- **Decision: Custom Maison Serif Typography** → Why it prevents mid-market perception: Owning a proprietary typeface is the ultimate flex of a heritage brand. It ensures the site looks like no one else. Google Fonts are free and ubiquitous; a custom typeface signals investment and exclusivity.
- **Decision: "Split-Screen Heritage" Compare** → Why it prevents mid-market perception: It proves the brand has a history and a point of view, elevating the product above a mere commodity. Mass-market retailers have no heritage to compare against.
- **Decision: #8B7355 (Antique Bronze) Accent Color** → Why it prevents mid-market perception: It is a sophisticated, muted metallic tone that feels expensive and warm, unlike bright, web-safe golds (#FFD700) which look cheap on screen.
- **Decision: Progressive JPEG Loading (Snap-to-Sharp)** → Why it prevents mid-market perception: It avoids the "blurry" loading state common on Shopify sites (gatsby-image blur-up), ensuring the first impression of the diamond is always sharp, even if low-res. Precision in loading = precision in product.
- **Decision: 1-Click Apple Pay via Long-Press** → Why it prevents mid-market perception: It caters to the HNWI desire for absolute convenience and speed once the decision to buy is made. It signals that the brand understands its buyer is busy, decisive, and accustomed to effortless transactions.

### K) IMPLEMENTATION
| Effort | Team Size | MVP Timeline | Full Build | Est. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Mid-Build | 6 (1 UX, 2 FE, 2 BE, 1 QA) | 10 weeks | 18 weeks | $200,000 |

The MVP would include the homepage, PLP, PDP with the 360° viewer and jeweler's loupe, and a basic checkout flow. The "Split-Screen Heritage" compare, the concierge booking system, and the Algolia search integration would be added in the full build phase.

### L) UNIQUENESS PROOF
1. **Color:** #8B7355 (Antique Bronze accent). No other concept uses this warm, muted metallic tone.
2. **Interaction:** "Split-Screen Heritage" compare (splitting the image zone 50/50 to juxtapose modern GemLightBox imagery with archival photographs). No other concept compares present and past visually.
3. **Layout:** 3-column grid with 360x540px cards and a visual mega-menu filter using cut-shape icons. No other concept uses visual icons in the filter UI.
4. **Technology:** Vue.js (Nuxt 3) with Commerce Layer and Builder.io. No other concept uses this specific stack.
5. **Visual Metaphor:** The Modern Flagship Boutique. Not a vault, not a gallery, not a theater—a boutique that feels like walking into a Cartier store rebuilt with 2026 technology.
6. **Competitor Critique:** Cartier's website (cartier.com) is bogged down by legacy code, heavy campaign imagery, and slow load times (Lighthouse performance score: ~35). The Modern Maison delivers the same heritage feel but with sub-second, digital-native performance (target Lighthouse score: 90+), proving that prestige and performance are not mutually exclusive.

### M) SEO & CONTENT STRATEGY

The Modern Maison is the only concept in this document that explicitly prioritizes SEO as a growth channel. Because the site is built on Nuxt 3 with server-side rendering, every page is fully indexable by Google. The SEO strategy is built on three pillars:

1. **Collection Landing Pages:** Each collection (e.g., "The Argyle Collection") has a dedicated landing page with 800-1200 words of editorial content, written by a professional copywriter, covering the collection's inspiration, the sourcing story, and the technical specifications of the stones. These pages target long-tail keywords like "natural Argyle pink diamond melee" and "ethically sourced emerald cut parcels."

2. **The Vault Standard Blog:** A monthly editorial blog covering topics like "How to Evaluate Diamond Melee for Investment," "The History of the Round Brilliant Cut," and "Understanding GIA Certification." Each post is 1500-2500 words, optimized for featured snippets, and includes GemLightBox imagery. The blog is managed via Builder.io, allowing the marketing team to publish without developer intervention.

3. **Structured Data:** Every product page includes JSON-LD structured data for `Product`, `Offer`, and `AggregateRating` schemas. The structured data includes the stone's specifications (carat, color, clarity, cut), the price, and the GIA certification number. This ensures rich snippets in Google search results, increasing click-through rates by an estimated 20-35%.

### N) CONCIERGE BOOKING SYSTEM

The "Book a Consultation" feature on the homepage (Section 4) is not a simple Calendly embed. It is a custom-built booking system integrated with the concierge team's workflow:

1. **Booking Form:** The user selects a date and time from a calendar widget (built with date-fns and a custom Vue component). Available slots are pulled from the concierge team's Google Calendar via the Google Calendar API. The form also asks for the user's name, email, phone, and a brief description of their interest (free text, max 500 characters).

2. **Confirmation:** Upon booking, the user receives an email confirmation with a calendar invite (.ics file). The concierge receives a Slack notification via a webhook, including the user's details and interest description.

3. **Pre-Consultation Prep:** 24 hours before the consultation, the system automatically sends the user a "Pre-Consultation Dossier" email containing 3-5 curated product recommendations based on their stated interest. This dossier is generated by a simple recommendation engine that matches keywords in the user's interest description to product tags in the CMS.

4. **Video Call:** The consultation is conducted via a custom-branded Daily.co video call (not Zoom, not Google Meet). The Daily.co room is pre-configured with the Vault Maison logo, the #FAFAFA background, and a screen-sharing capability that allows the concierge to walk the user through the 360° viewer in real-time.

This system transforms the concierge from a reactive support channel into a proactive sales tool. The pre-consultation dossier ensures the concierge is prepared, the user feels valued, and the conversation starts with specific products rather than vague browsing.

### O) INTERNATIONALIZATION & MULTI-CURRENCY

The Modern Maison is the only concept designed from the ground up for international expansion. The Nuxt 3 framework supports i18n (internationalization) natively via the `@nuxtjs/i18n` module. The initial launch supports 4 languages: English (default), Simplified Chinese, Arabic, and French. Each language has its own URL prefix (e.g., `/zh/collections/`, `/ar/collections/`).

The currency system is equally sophisticated. Prices are stored in USD in the Commerce Layer backend, but displayed in the user's local currency using real-time exchange rates from the Open Exchange Rates API (updated every 15 minutes). The currency selector is a discreet dropdown in the header, styled to match the Freight Text Pro typography. For Arabic and Chinese markets, the number formatting follows local conventions (e.g., Arabic-Indic numerals for Arabic, wan/yi grouping for Chinese).

The RTL (right-to-left) support for Arabic is handled at the CSS level using the `dir="rtl"` attribute on the `<html>` element, with Tailwind CSS's RTL plugin ensuring all margins, paddings, and flex directions are automatically mirrored. The Arabic typography uses Noto Naskh Arabic, a Google Font specifically designed for web readability in Arabic script.

### P) PERFORMANCE BUDGET & MONITORING

The Modern Maison has the strictest performance budget of any concept in this document, because it is the concept most likely to be compared directly against established luxury maisons (Cartier, Van Cleef, Bulgari) whose websites are notoriously slow.

The performance targets are:

- **Lighthouse Performance Score:** 90+ (desktop), 80+ (mobile)
- **Largest Contentful Paint (LCP):** < 1.5s
- **First Input Delay (FID):** < 50ms
- **Cumulative Layout Shift (CLS):** < 0.05
- **Total Page Weight:** < 800KB (initial load, excluding images)
- **Time to Interactive (TTI):** < 2.0s

These targets are enforced via a CI/CD pipeline that runs Lighthouse audits on every pull request. If any metric falls below the threshold, the PR is automatically blocked. The monitoring is handled by Vercel Analytics (built into the Nuxt 3 deployment), with weekly performance reports sent to the engineering team via Slack.

Image optimization is critical to meeting these targets. All GemLightBox images are served via Cloudinary with automatic format negotiation (AVIF for Chrome, WebP for Safari, JPEG for fallback), responsive sizing (srcset with 4 breakpoints: 400w, 800w, 1200w, 1600w), and aggressive lazy loading (images below the fold are loaded only when they enter the viewport + 200px buffer).

### REFERENCE SITE
- **Visual Reference URL:** https://www.jaeger-lecoultre.com — Jaeger-LeCoultre's website exemplifies the balance of heritage storytelling and modern digital performance that The Modern Maison aims to achieve, but with a sharper focus on product photography and a more streamlined checkout experience.
