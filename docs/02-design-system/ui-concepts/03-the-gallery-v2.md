---
title: "Concept 03: The Gallery"
category: "design-system"
subcategory: "ui-concepts"
version: "2.0"
date: "2026-04-10"
author: ["Manus AI", "Principal Digital Experience Architect"]
status: "draft"
---

# Concept 03: The Gallery

### A) IDENTITY
- **Name:** The Gallery
- **Tagline:** Curated exhibitions of masterworks.
- **Design DNA:** Editorial, Curated, Spacious
- **Inspiration Source:** MoMA, Gagosian, Art Basel online viewing rooms.

### DESIGN BRIEF (IMPERATIVE INSTRUCTIONS)

Team, here is the direction for The Gallery. We are not building a store; we are building an exhibition space. Every pixel must communicate that these are not commodities, but curated masterworks.

**B) SIGNATURE INTERACTION**
You MUST implement the "Pedestal Focus" mechanic. When a user hovers over a product image, the rest of the page MUST dim to 20% opacity over exactly 600ms. The hovered image MUST scale up by 1.05x using a `cubic-bezier(0.22, 1, 0.36, 1)` curve. This isolates the piece, forcing the user to appreciate it without distraction. You WILL use the Anime.js library to handle this specific dimming and scaling choreography. The GemLightBox 360° content is NOT visible here; this interaction is purely about isolating the static, perfect hero shot.

**C) HOMEPAGE**
The homepage MUST open with Section 1 (100vh): A pure #FDFBF7 (Alabaster) background. Centered is a single, massive (1200px wide) GemLightBox image of our most significant piece. The title of the current "Exhibition" MUST be set in GT Sectra Fine at 96px, colored #2C2C2C (Charcoal). 
Section 2 (120vh): A horizontal scrolling gallery. The background remains #FDFBF7. The user scrolls down, but the content moves left-to-right.
Section 3 (80vh): The Curator's Statement. A block of text (GT Sectra Fine, 24px, line-height 1.8) explaining the theme of the current collection.

**D) PRODUCT LIST PAGE**
The product grid WILL use an asymmetrical masonry layout. DO NOT use a standard uniform grid. The gap MUST be a massive 120px. Card dimensions will vary, but the primary hero cards MUST be 600px wide by 800px tall. Each card shows the image, the title of the piece, and the artist/cutter. Price is completely hidden until the PDP. Sort/filter UI is a minimalist text link in the top right corner that opens a subtle dropdown. GemLightBox images MUST load progressively, starting as a beautiful, stylized SVG wireframe before fading into the high-res photo.

**E) PRODUCT DETAIL PAGE**
The layout MUST be a stacked grid. 
Image zone: 80vw width, centered, with 10vw margins on either side. 
360° viewer: You MUST use the Photo Sphere Viewer library. Size: 800x800px. Autoplay: No. The user must intentionally click "Examine" to start the rotation. The background MUST be #FDFBF7 to match the page, requiring the GemLightBox output to be perfectly masked.
Info zone: Placed below the image. Title (GT Sectra Fine, 64px), a narrative paragraph about the stone's cut, the specs (minimalist list), and the CTA.
CTA button: "Acquire Masterwork". Size: 240px width, 64px height. Color: #2C2C2C background, #FDFBF7 text. Hover state: The button MUST shrink slightly (0.98x) rather than grow, signaling density and weight.

**F) MOBILE**
Navigation pattern: A sticky bottom bar with text links (Exhibitions, Artists, Acquire), NO icons.
Image display: Full-width, but with significant (32px) padding on all sides to maintain the "framed artwork" feel.
Unique gesture: A long-press on any image MUST save it to a personal "Collection" (moodboard), triggering a subtle flash of the screen.

**G) TECH STACK**
- **Framework:** SvelteKit. Why: We need the absolute smallest bundle size to ensure the massive, high-res images load instantly without JS bloat.
- **CMS:** Prismic. Why: Its "Slices" feature is perfect for building highly custom, editorial-style exhibition pages.
- **E-comm:** Medusa. Why: We need complete control over the checkout flow to make it feel like a private gallery acquisition, not a Shopify cart.
- **Animation:** Anime.js. Why: Lightweight and incredibly precise for the specific dimming and scaling choreography we need.
- **360° Viewer:** Photo Sphere Viewer.
- **Hosting:** Cloudflare Pages + Cloudflare Images for on-the-fly resizing and WebP delivery.

**H) CONVERSION THESIS**
The psychological trigger is the Halo Effect. By presenting the jewelry in the exact visual language of fine art, the perceived value is anchored to the art market, not the jewelry market. When a buyer sees a 2.0ct round brilliant displayed on a virtual pedestal with gallery lighting, their mental reference point shifts from "how much does a diamond cost?" to "how much does a masterwork cost?" The expected conversion impact is a 25-40% higher average order value (AOV) compared to standard e-commerce presentations, as buyers are conditioned to expect premium pricing for "art."

**Reference Site:** https://www.gagosian.com/exhibitions — Gagosian's online viewing rooms demonstrate how the gallery format transforms commercial objects into cultural artifacts. The Gallery applies this exact principle to melee diamonds.

**Checkout Flow (3 Steps — "The Acquisition"):**
1. **Exhibition Catalog** (A beautifully formatted summary page showing the selected piece, its exhibition context, the curator's note, and the price. This page is designed to be printable as a keepsake, reinforcing the art-world framing).
2. **Collector Registration** (Name, email, shipping address, and an optional field for "Collection Notes" where the buyer can record why they acquired this piece. This data is stored and can be referenced in future correspondence, creating a personalized relationship).
3. **Secure Acquisition** (Payment via Stripe. The confirmation page displays the piece one final time with the text: "This masterwork has been added to your collection." The buyer receives a digital Certificate of Acquisition via email).

The checkout flow is deliberately gallery-like. There is no "cart." There is no "order number." There is a "Collection" and an "Acquisition." Every word reinforces the art-world positioning.

**I) SCALABILITY**
- At 50 products: Works perfectly as a curated, seasonal exhibition.
- At 500 products: Breaks. A gallery cannot display 500 masterworks simultaneously.
- At 5000 products: Completely impossible. This concept relies on extreme curation.

**The Curation Philosophy:**

The Gallery operates on a strict "less is more" principle. At any given time, the site displays no more than 36 pieces, organized into 3-4 thematic exhibitions. Each exhibition runs for 8-12 weeks, after which it is archived and replaced by a new one. This creates a sense of temporal scarcity: if a visitor does not acquire a piece during its exhibition window, it may never be publicly displayed again.

The exhibition themes are deliberately non-commercial. Instead of organizing by cut or carat, exhibitions are organized by narrative: "The Geometry of Light" (exploring mathematical precision in brilliant cuts), "Fire and Earth" (celebrating stones from volcanic kimberlite pipes), or "The Invisible Hand" (showcasing the artistry of master cutters). Each exhibition has a dedicated landing page with a 400-word curator's note, written in first person, that provides context and emotional framing for the pieces within.

This curatorial approach transforms the act of browsing from a transactional search into an educational, emotionally engaging experience. The visitor does not feel like they are shopping; they feel like they are visiting a private exhibition at a museum, which is precisely the psychological positioning that justifies premium pricing.

**J) LUXURY PROOF**
- Decision: Asymmetrical masonry layout → Why it prevents mid-market perception: It rejects the efficiency of a standard grid in favor of aesthetic composition.
- Decision: GT Sectra Fine typography → Why it prevents mid-market perception: It is a highly specific, premium editorial typeface, not a standard web font.
- Decision: "Acquire Masterwork" CTA → Why it prevents mid-market perception: It transforms the purchase to the level of art collecting.
- Decision: 120px gaps between products → Why it prevents mid-market perception: Mass-market sites cram as many products into the viewport as possible; we use whitespace as a luxury signal.
- Decision: Progressive SVG wireframe loading → Why it prevents mid-market perception: It turns the loading state into a design feature rather than a technical limitation.

**K) IMPLEMENTATION**
| Effort | Team Size | MVP Timeline | Full Build | Est. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Mid-Build | 3 (1 UX, 1 FE, 1 BE) | 6 weeks | 10 weeks | $130,000 |

**L) UNIQUENESS PROOF**
1. **Color:** #FDFBF7 (Alabaster background).
2. **Interaction:** "Pedestal Focus" (dimming the rest of the page to 20% opacity on hover).
3. **Layout:** Asymmetrical masonry grid with 120px gaps.
4. **Technology:** SvelteKit with Anime.js.
5. **Visual Metaphor:** The Fine Art Gallery / Exhibition Space.
6. **Competitor Critique:** Tiffany & Co. uses a standard, uniform grid that makes their high-end pieces look identical to their entry-level silver; The Gallery's asymmetrical layout ensures every piece is treated as a unique masterwork.
