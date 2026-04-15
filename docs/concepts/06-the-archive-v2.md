---
title: "Concept 06: The Archive"
category: "design-system"
subcategory: "ui-concepts"
version: "2.0"
date: "2026-04-10"
author: ["Manus AI", "Principal Digital Experience Architect"]
status: "draft"
---

# Concept 06: The Archive

### A) IDENTITY
- **Name:** The Archive
- **Tagline:** Every stone holds a century of history.
- **Design DNA:** Historical, Provenance-obsessed, Deep
- **Inspiration Source:** Sotheby's provenance research, rare book libraries, wine cellars.

### DESIGN BRIEF (IMPERATIVE INSTRUCTIONS)

Team, here is the direction for The Archive. We are building a digital library of provenance. Every diamond is a historical artifact, and the UI must reflect the weight of that history.

**B) SIGNATURE INTERACTION**
You MUST implement the "Timeline Scrub" mechanic. When a user views a product, they do not scroll down; they scrub horizontally across a timeline at the bottom of the screen. As they scrub, the UI MUST update instantly to show the stone's journey: from the mine, to the cutter, to the certification lab, to the Vault. You WILL use the D3.js library to handle the complex data visualization of this timeline. The GemLightBox 360° content is revealed ONLY when the user scrubs to the "Present Day" node on the timeline, emphasizing that the stone is the culmination of its history.

**C) HOMEPAGE**
The homepage MUST open with Section 1 (100vh): A rich #2C1A1D (Mahogany) background. Centered is a massive, interactive globe (using WebGL) highlighting the origins of our stones. The title MUST be set in Playfair Display at 72px, colored #E5D3B3 (Parchment). 
Section 2 (100vh): "The Ledgers." A vertical list of our most historically significant pieces. The background remains #2C1A1D.
Section 3 (60vh): "The Provenance Guarantee." A block of text (Playfair Display, 20px, line-height 1.6) explaining our blockchain-backed certification process.

**D) PRODUCT LIST PAGE**
The product grid WILL use a strict, tabular layout resembling a historical ledger. DO NOT use image-heavy cards. The grid MUST be 1 column wide, spanning 80% of the viewport width. Each row (120px height) shows the stone's ID number, Carat, Cut, Origin, and a small (80x80px) GemLightBox thumbnail. Price is visible but formatted as "Est. Value: $12,000." Sort/filter UI is a complex set of dropdowns at the top of the ledger, allowing filtering by mine origin or cutter. GemLightBox thumbnails MUST load instantly, as they are small and highly optimized.

**E) PRODUCT DETAIL PAGE**
The layout MUST be a full-screen immersive experience. 
Image zone: 100vw width, 60vh height. 
360° viewer: You MUST use the SpriteSpin library. Size: 600x600px, centered. Autoplay: Yes, but very slowly (1 rotation per minute). The background MUST be #2C1A1D, requiring the GemLightBox output to be perfectly masked.
Info zone: Placed below the image, taking up the remaining 40vh. This is where the "Timeline Scrub" interaction lives. Above the timeline, the title (Playfair Display, 48px) and the CTA.
CTA button: "Request Provenance Dossier". Size: 280px width, 52px height. Color: #E5D3B3 background, #2C1A1D text. Hover state: The button MUST invert colors, using a `cubic-bezier(0.68, -0.55, 0.265, 1.55)` bounce effect over 400ms.

**F) MOBILE**
Navigation pattern: A classic "hamburger" menu that opens a full-screen index of categories, styled like a table of contents.
Image display: Full-width, with the timeline scrub interaction adapted to a vertical scroll.
Unique gesture: A double-tap on the 360° viewer MUST instantly download a PDF summary of the stone's provenance.

**G) TECH STACK**
- **Framework:** Gatsby. Why: We need to generate thousands of static pages for SEO, as provenance data is highly searchable.
- **CMS:** Strapi. Why: Its flexible content modeling is perfect for building the complex timeline data structures.
- **E-comm:** BigCommerce headless. Why: thorough API for handling complex product variants and historical pricing data.
- **Animation:** D3.js. Why: Essential for the data-driven timeline visualization.
- **360° Viewer:** SpriteSpin.
- **Hosting:** Netlify for invisible static site generation and global CDN delivery.

**H) CONVERSION THESIS**
The psychological trigger is the Narrative Fallacy. By wrapping the diamond in a compelling, verifiable history, the perceived value is anchored to its story, not just its physical attributes. A stone from the Argyle mine in Western Australia, cut by a third-generation artisan in Antwerp, and certified by the GIA in New York, is worth more than the same stone with no documented history. The expected conversion impact is a higher willingness to pay a premium (estimated 20-35% above market) for stones with documented, ethical origins.

**Reference Site:** https://www.sothebys.com/en/results — Sotheby's online auction results demonstrate the power of provenance in driving premium pricing. The Archive applies this same principle to melee diamonds, a category where provenance is almost never documented.

**Checkout Flow (3 Steps):**
1. **Dossier Review** (A full-page, printable PDF-style summary of the stone's provenance, specifications, and GIA certification. The user reviews this document before proceeding, reinforcing the scholarly nature of the acquisition).
2. **Acquisition Terms** (Shipping, insurance, and payment. The language is deliberately formal: "Terms of Acquisition" rather than "Checkout." Payment options include wire transfer and escrow via a trusted third party).
3. **Archive Registration** (The stone is formally registered in the Vault Maison Archive, and the buyer receives a unique Archive Number that can be used to verify the stone's provenance in perpetuity. This is backed by a blockchain entry).

The checkout flow is deliberately short (3 steps) because the heavy lifting of building trust and perceived value has already been done by the Timeline Scrub interaction and the Provenance Dossier. By the time the user reaches checkout, they are not deciding *whether* to buy; they are completing a formality.

**I) SCALABILITY**
- At 50 products: Works perfectly as a highly curated historical collection.
- At 500 products: Works, as the ledger layout is designed to handle dense data efficiently.
- At 5000 products: Works exceptionally well, as the tabular layout scales infinitely, provided the search and filtering tools are thorough.

**J) LUXURY PROOF**
- Decision: Tabular ledger layout → Why it prevents mid-market perception: It rejects the visual noise of standard e-commerce in favor of scholarly organization.
- Decision: Playfair Display typography → Why it prevents mid-market perception: It is a classic, authoritative serif that evokes historical documents.
- Decision: "Request Provenance Dossier" CTA → Why it prevents mid-market perception: It frames the purchase as the acquisition of a historical record.
- Decision: Timeline Scrub interaction → Why it prevents mid-market perception: It forces the user to engage with the stone's history before viewing the product itself.
- Decision: #2C1A1D (Mahogany) background → Why it prevents mid-market perception: It evokes the richness of a private library or wine cellar, avoiding the starkness of pure black or white.

**K) IMPLEMENTATION**
| Effort | Team Size | MVP Timeline | Full Build | Est. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Mid-Build | 4 (1 UX, 1 Data Viz, 1 FE, 1 BE) | 8 weeks | 14 weeks | $150,000 |

**Additional Design Directives:**

Team, a few more critical instructions. The entire site MUST feel like opening a rare book. Page transitions MUST use a horizontal "page turn" animation (not a fade, not a slide). The cursor MUST change to a custom SVG that resembles a magnifying glass when hovering over any provenance data. Every product MUST have a unique "Archive Number" (e.g., VM-2026-0042) displayed prominently in the ledger and on the PDP, formatted in Playfair Display, 14px, #E5D3B3. This number is the stone's permanent identity within the Vault Maison system.

The footer of every page MUST include the text: "The Vault Maison Archive: Documenting excellence since 2026." This is not just a tagline; it is a promise of institutional permanence. The footer background MUST be #1A0F11 (a shade darker than the Mahogany), creating a subtle visual "grounding" effect.

DO NOT use any stock photography. DO NOT use any lifestyle imagery. The only images on this site are GemLightBox product shots, archival photographs of mines and cutting workshops, and maps. Every image must serve the provenance narrative. If an image does not answer the question "where did this stone come from?", it does not belong on this site.

**The Timeline Data Model (Technical Detail):**

The Timeline Scrub interaction requires a thorough data model to function. Every stone in the Archive has a `provenance_timeline` array stored in Strapi, containing between 4 and 12 timeline nodes. Each node has the following structure:

- `date` (ISO 8601 format, e.g., "2019-03-15")
- `event_type` (enum: "extraction", "rough_sorting", "cutting", "polishing", "certification", "acquisition", "vault_entry")
- `location` (object: `{ city, country, coordinates: [lat, lng] }`)
- `agent` (string: the name of the person or organization responsible, e.g., "De Beers Sightholder, Antwerp")
- `description` (string: a 2-3 sentence narrative description of the event)
- `evidence` (array of URLs: links to supporting documents, photographs, or certificates)
- `media` (object: `{ type: "image" | "video" | "document", url, thumbnail_url }`)

The D3.js visualization renders this array as a horizontal timeline at the bottom of the PDP. The timeline spans 100% of the viewport width, with a 40px margin on each side. Each node is rendered as a circle (12px diameter, #E5D3B3 fill, 2px #2C1A1D stroke). The active node (the one the user is currently scrubbing over) expands to 20px diameter with a subtle glow effect. A connecting line (2px, #E5D3B3) links all nodes.

When the user scrubs to a node, the main content area above the timeline updates with a 500ms crossfade transition:
- The node's `description` appears in Playfair Display, 18px, #E5D3B3.
- If the node has `media`, the image or document thumbnail appears in a 400x300px container.
- If the node has `location.coordinates`, a small Mapbox GL JS map (200x200px) renders the location with a single marker.

The final node in every timeline is always "Vault Entry" — the moment the stone was acquired by Vault Maison. This is the node where the GemLightBox 360° viewer is revealed, because it represents the stone's arrival at its permanent home.

**The Blockchain Provenance Certificate:**

Every stone in the Archive has a corresponding entry on the Ethereum blockchain (via the Polygon L2 network for low gas fees). The entry is a simple smart contract that stores:

- The stone's Archive Number (e.g., VM-2026-0042)
- A SHA-256 hash of the complete provenance timeline JSON
- The GIA certification number
- A timestamp of the vault entry date

This blockchain entry is NOT an NFT. It is not tradeable. It is not speculative. It is a permanent, immutable, verifiable record of the stone's provenance. The buyer receives a link to the Polygonscan transaction page, which they can share with insurers, appraisers, or future buyers as proof of provenance.

The blockchain integration is handled by a Node.js microservice that interacts with the Polygon network via the ethers.js library. The smart contract is written in Solidity and deployed once; each new stone is registered via a `registerStone()` function call. The gas cost per registration is approximately $0.01, making it economically viable for every stone in the inventory.

This is the ultimate trust mechanism. It is not a marketing gimmick. It is a verifiable, permanent, decentralized record that no competitor can forge, alter, or dispute.

**The Globe Interaction (Homepage Detail):**

The interactive globe on the homepage (Section 1) is built using Globe.gl, a lightweight WebGL globe library. The globe renders at 600x600px, centered in the viewport. It displays 3D arcs connecting the origin mines to the Vault Maison headquarters (represented as a glowing point). Each arc is color-coded by continent:

- Africa: #C19A6B (Camel)
- Australia: #7B3F00 (Chocolate)
- Russia: #4682B4 (Steel Blue)
- South America: #228B22 (Forest Green)
- Canada: #B22222 (Firebrick)

When the user hovers over an arc, a tooltip appears showing the mine name, the number of stones sourced from that mine, and the date range of sourcing. The globe rotates slowly (1 rotation per 60 seconds) by default, but the user can drag to rotate manually.

**The Ledger Search System:**

The Archive's search system is deliberately different from every other concept. There is no search bar. Instead, the user navigates the ledger using a combination of column-header sorting (click any column header to sort ascending/descending) and a "Filter Drawer" that slides in from the left (320px wide, 100vh height, #1A0F11 background).

The Filter Drawer contains the following filter groups:

- **Origin:** A list of mine names, each with a count of available stones (e.g., "Argyle (12)", "Jwaneng (8)").
- **Era:** A date range slider spanning from 1990 to 2026, allowing the user to filter by the decade the stone was extracted.
- **Cutter:** A list of cutting houses, each with a count.
- **Certification:** GIA, AGS, HRD, or IGI.
- **Archive Status:** "Available" or "Acquired" (acquired stones remain in the ledger as historical records, but their rows are styled with a subtle strikethrough and reduced opacity).

This filtering system reinforces the archival metaphor. The user is not "shopping"; they are "researching" the ledger, looking for a specific stone that meets their criteria. The deliberate absence of a free-text search bar forces the user to engage with the structured data, which increases time-on-site and deepens the perception of scholarly rigor.

**The Provenance Dossier (PDF Generation):**

When a user clicks "Request Provenance Dossier" on a PDP, the system generates a custom PDF document in real-time using a Node.js microservice with the Puppeteer library. The PDF is styled to resemble a museum acquisition report: cream-colored background (#FFF8F0), Playfair Display headings, and a formal layout with the Vault Maison watermark.

The Dossier contains the following sections:

1. **Cover Page:** The stone's Archive Number, a high-resolution GemLightBox image (300 DPI), and the date of dossier generation.
2. **Physical Specifications:** A table listing all 4C grades, measurements, and optical properties.
3. **Provenance Timeline:** A visual timeline (rendered as an SVG) showing every documented event in the stone's history.
4. **Certification:** A scanned copy of the GIA/AGS/HRD certificate, embedded as an image.
5. **Blockchain Verification:** A QR code linking to the Polygonscan transaction, with the transaction hash printed below.
6. **Acquisition Terms:** If the user is logged in and has expressed purchase intent, this section includes the price, shipping options, and payment terms.

The PDF is generated in under 3 seconds and delivered to the user's email address. It is also stored in an S3 bucket for future retrieval. This dossier serves as both a sales tool and a post-purchase document that the buyer can file with their insurer or estate planner.

**The "Page Turn" Transition System:**

Every page transition in The Archive uses a custom horizontal "page turn" animation, not a standard fade or slide. This is implemented using a custom GLSL shader that simulates the physics of a turning page:

1. The current page content is rendered to a WebGL texture via `html2canvas`.
2. The incoming page content is pre-rendered to a second texture.
3. A custom fragment shader applies a cylindrical deformation to the first texture, curling it from right to left, while the second texture is revealed underneath.
4. The animation duration is 800ms with a custom cubic-bezier easing (0.25, 0.1, 0.25, 1.0).
5. A subtle shadow is cast by the curling page onto the incoming page, using a Gaussian blur with a 4px radius.

This transition is triggered on every route change via SolidStart's `beforeNavigate` hook (note: The Archive uses Gatsby, so this is implemented via Gatsby's `wrapPageElement` API with a custom transition component). The effect is subtle but unmistakable: the user feels like they are turning pages in a rare book, not clicking links on a website.

For users with `prefers-reduced-motion: reduce` set in their OS accessibility settings, the page turn animation is replaced with a simple 300ms crossfade.

**L) UNIQUENESS PROOF**
1. **Color:** #2C1A1D (Mahogany background).
2. **Interaction:** "Timeline Scrub" to reveal the stone's history and the 360° viewer.
3. **Layout:** 1-column tabular ledger layout for the PLP.
4. **Technology:** Gatsby with D3.js for data visualization.
5. **Visual Metaphor:** The Historical Ledger / Rare Book Library.
6. **Competitor Critique:** De Beers focuses entirely on the romance of the present moment; The Archive focuses entirely on the verifiable history of the past, appealing to collectors who value provenance over sentiment.
