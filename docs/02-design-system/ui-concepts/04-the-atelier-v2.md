---
title: "Concept 04: The Atelier"
category: "design-system"
subcategory: "ui-concepts"
version: "2.0"
date: "2026-04-10"
author: ["Manus AI", "Principal Digital Experience Architect"]
status: "draft"
---

# Concept 04: The Atelier

### A) IDENTITY
- **Name:** The Atelier
- **Tagline:** The journey of co-creation begins here.
- **Design DNA:** Bespoke, Tactile, Process-driven
- **Inspiration Source:** Savile Row, haute couture fitting rooms, artisan workshops.

### B) SIGNATURE INTERACTION
- **Mechanic:** The "Workbench" Configuration.
- **User Action:** The user drags a loose melee diamond from a side panel and drops it onto a 3D wireframe of a ring setting.
- **UI Response:** 
  - 0-200ms: The dragged diamond snaps to the nearest prong on the wireframe.
  - 200-800ms: The wireframe instantly renders into a photorealistic 3D model using WebGL, incorporating the specific GemLightBox texture map of the chosen stone.
  - 800-1200ms: A subtle "sparkle" effect (a custom shader) runs across the newly set stone, and the total price updates with a satisfying mechanical "click" sound.
- **JS Library:** Three.js (for the 3D rendering and drag-and-drop physics).
- **GemLightBox Reveal:** The 360° content is not just viewed; it is actively used as a texture map applied to the 3D model, allowing the user to see *their exact stone* in the setting.

### C) HOMEPAGE
- **Section 1 (100vh):** A split screen. Left side (50vw) is #F4F1EA (Parchment), right side is #2B2B2B (Graphite). Centered across the split is a massive, interactive 3D model of a half-finished ring. Text: "Commission Your Legacy" in Canela (Serif), 84px, #2B2B2B on the left, #F4F1EA on the right.
- **Section 2 (100vh):** "The Materials." A horizontal scrolling section (using CSS `scroll-snap-type: x mandatory`) showcasing raw materials (gold, platinum, loose parcels). Each material card is 600px wide, 800px high.
- **Section 3 (60vh):** "The Process." A step-by-step timeline (1. Select Stone, 2. Choose Setting, 3. Artisan Review). The active step is highlighted in #8C3A3A (Oxblood).

### D) PRODUCT LIST PAGE
- **Grid:** 3 columns × 4 rows, 16px gap, card dimensions 400px width × 400px height.
- **Card Content:** 
  - Image: 400x300px static GemLightBox shot of a loose stone.
  - Text: 3 lines (Carat, Cut, Origin).
  - Price: Visible ($4,500).
- **Sort/Filter:** A persistent left sidebar (280px wide) with complex, multi-select checkboxes for every conceivable specification (Fluorescence, Polish, Symmetry).
- **Image Loading:** Instant. No lazy loading. The page waits until all 12 images in the viewport are fully loaded before revealing the grid, ensuring a flawless first impression.

### E) PRODUCT DETAIL PAGE
- **Layout:** Left-right split grid (50/50).
- **Image Zone:** 50vw width, sticky on scroll. 
- **360° Viewer:** Custom Three.js implementation. Size: 100% container width/height. Autoplay: No. Background: #F4F1EA. The viewer includes a "Lighting Studio" toggle, allowing the user to switch the environment map from "Daylight" to "Candlelight" to "Spotlight."
- **Info Zone:** 
  1. Title (Canela, 40px)
  2. The "Workbench" configurator (Select setting, metal, size)
  3. Real-time price calculator
  4. CTA
- **CTA Button:** "Begin Commission". Size: 100% width of the info zone, 60px height. Color: #8C3A3A background, #F4F1EA text. Hover state: The button border thickens to 4px solid #2B2B2B, background remains #8C3A3A.

### F) MOBILE
- **Navigation Pattern:** A persistent bottom sheet that slides up to reveal the "Workbench" configurator, keeping the 3D model visible at all times.
- **Image Display:** Full-width (100vw), but the 3D model is fully interactive via touch (rotate, zoom).
- **Unique Gesture:** A two-finger twist gesture rotates the 3D model on its Z-axis, allowing inspection of the ring's profile.

### G) TECH STACK
- **Framework:** Astro. Why: We need to ship zero JavaScript for the static content, reserving all client-side processing power for the heavy Three.js configurator.
- **CMS:** Contentful. Why: Its thorough API is perfect for managing the complex relationships between loose stones, settings, and pricing rules.
- **E-comm:** Shopify Plus headless. Why: The thorough checkout and inventory management are necessary for handling bespoke, made-to-order items.
- **Animation:** Three.js (WebGL). Why: Essential for the real-time 3D rendering and texture mapping of the GemLightBox assets.
- **360° Viewer:** Custom Three.js implementation (to integrate with the configurator).
- **Hosting:** AWS (S3 + CloudFront) for the massive 3D assets and texture maps.

### I) CONVERSION THESIS
- The psychological trigger is the Endowment Effect. Once a user has spent 15 minutes selecting a stone, choosing a setting, and watching the 3D model render their creation, they psychologically own it. Abandoning the cart feels like losing something they already possess.
- Friction is added by forcing the user to actively build the product rather than simply clicking "buy." The 3-step configuration process (Stone > Setting > Review) creates a deliberate, sequential journey that mirrors the real-world experience of commissioning a bespoke piece from a master jeweler.
- Expected conversion impact is a significantly higher conversion rate for bespoke pieces (estimated 8-12% for users who complete Step 1 of the configurator), as the user feels ownership over the design before they even reach checkout.

**Reference Site:** https://www.vrai.com/engagement-rings/build-your-own — Vrai's configurator is the closest competitor, but it uses pre-rendered images that update with a jarring page refresh. The Atelier's real-time WebGL rendering eliminates this friction entirely.

### H) CHECKOUT FLOW: THE COMMISSION

The checkout process in The Atelier is designed to feel like commissioning a bespoke piece of high jewelry from a master craftsman. It is a deliberate, 4-step process that emphasizes the custom nature of the order.

- **Step 1: The Design Approval (The Cart)**
  The screen splits 50/50. The left side displays the final 3D render of the user's configured piece, slowly rotating under the "Daylight" environment map. The right side displays the "Commission Blueprint" — a detailed breakdown of the chosen stone, the metal, the setting style, and the ring size. The user must click a prominent #8C3A3A button labeled "Approve Design Blueprint" to proceed.
- **Step 2: The Artisan Allocation (Scheduling)**
  Instead of standard shipping, this step is about time. The screen displays a timeline: "Wax Casting (Week 1) → Metal Pour (Week 2) → Stone Setting (Week 3) → Final Polish (Week 4)." The user selects their preferred secure logistics partner (Brinks or Malca-Amit) for the final delivery. The UI uses a horizontal progress bar that fills with #8C3A3A as selections are made.
- **Step 3: The Deposit (Payment)**
  Bespoke work requires commitment. The payment screen defaults to a "50% Commission Deposit" rather than the full amount (though full payment is an option). The form is centered, minimalist, with floating labels. It accepts wire transfers (via Plaid) or high-limit credit cards. The CTA button reads "Initiate Commission."
- **Step 4: The Workbench Feed (Confirmation)**
  The confirmation screen does not show an order number. It shows a "Commission ID" and a link to a private "Workbench Feed" where the user will receive weekly photo updates of their specific ring being crafted. The text reads: "Your blueprint has been sent to the master jeweler. The journey begins."

This 4-step flow transforms the anxiety of a high-ticket purchase into the excitement of a creative partnership.

### J) SCALABILITY
- **At 50 products:** Works perfectly; the configurator handles the permutations easily. The 3D asset library is small enough to be pre-loaded entirely.
- **At 500 products:** Works, but requires thorough filtering in the "Workbench" to prevent overwhelming the user with loose stone options. The 3D assets must be loaded on-demand, with a maximum of 12 models in GPU memory at any time.
- **At 5000 products:** Breaks. The sheer volume of 3D assets and texture maps would cripple the browser's memory; requires dynamic loading, aggressive caching strategies, and potentially a server-side rendering fallback for older devices.

**3D Rendering Pipeline (Technical Detail):**

The Workbench configurator is the most technically complex component of any concept in this document. It requires a custom WebGL rendering pipeline built on Three.js with the following components:

1. **Geometry Library:** A pre-built library of 20 base ring settings (solitaire, halo, three-stone, etc.), each modeled as a GLTF 2.0 file with PBR materials. The models are optimized to under 500KB each, with LOD (Level of Detail) variants for mobile devices.
2. **GemLightBox Texture Integration:** The GemLightBox 360° captures are processed into equirectangular environment maps. When a user selects a specific stone, its environment map is applied to the gem material's `envMap` property in Three.js, creating a photorealistic reflection that matches the actual stone's light behavior.
3. **Metal Material System:** Four metal options (Yellow Gold, White Gold, Rose Gold, Platinum), each with a custom PBR material definition including roughness (0.15-0.25), metalness (0.95), and a unique color map. The metal materials are authored in Substance Designer and exported as texture sets.
4. **Real-Time Shadow Casting:** A single directional light (intensity 1.2, color #FFFAF0) positioned at 45° above the model, casting soft shadows onto a ground plane. The shadow map resolution is 2048x2048 for desktop, 1024x1024 for mobile.
5. **Performance Budget:** The configurator must maintain 60fps on a 2023 MacBook Air (M2 chip) and 30fps on a 2022 iPhone 14. This requires aggressive draw call batching and texture atlas optimization.

The drag-and-drop interaction uses Three.js Raycaster for hit detection. When the user drags a stone from the side panel (a 2D DOM element), the cursor position is projected into the 3D scene using `raycaster.setFromCamera()`. The nearest prong on the ring model is identified by checking distance to pre-defined "snap points" (invisible markers placed at each prong position during the modeling phase). When the distance is below 20px (screen space), the stone snaps to the prong with a spring animation (stiffness: 300, damping: 20).

**The "Lighting Studio" Toggle (Detailed Specification):**

The Lighting Studio is a secondary interaction unique to The Atelier. On the PDP, below the 3D viewer, three circular buttons (48px diameter each, 16px gap) allow the user to switch the environment lighting:

1. **Daylight** (default): A neutral, 6500K environment map simulating north-facing window light. This is the "honest" lighting that shows the stone as it would appear in natural conditions.
2. **Candlelight**: A warm, 2700K environment map simulating an intimate dinner setting. The gold tones of the metal become richer, and the stone's fire (spectral dispersion) becomes more visible.
3. **Spotlight**: A high-contrast, directional light simulating a jewelry store display case. This maximizes the stone's brilliance and scintillation.

Each lighting switch triggers a 600ms crossfade between environment maps, handled by Three.js's `PMREMGenerator` for physically accurate reflections. The lighting switch also updates the shadow intensity and color temperature, ensuring the entire scene responds coherently.

### J) LUXURY PROOF
- **Decision: The "Workbench" Configurator** → Why it prevents mid-market perception: It mimics the bespoke process of a master jeweler, a service mass-market retailers cannot offer at scale.
- **Decision: Canela Typography** → Why it prevents mid-market perception: It is a sophisticated, high-contrast serif that feels like a high-end fashion magazine.
- **Decision: #8C3A3A (Oxblood) Accent Color** → Why it prevents mid-market perception: It is a rich, heritage color associated with leather-bound books and private clubs, not a bright, transactional "buy now" green.
- **Decision: "Lighting Studio" Toggle** → Why it prevents mid-market perception: It demonstrates supreme confidence in the product's quality under any condition.
- **Decision: "Begin Commission" CTA** → Why it prevents mid-market perception: It frames the purchase as the start of a collaborative process, not a simple retail transaction.

### K) IMPLEMENTATION
| Effort | Team Size | MVP Timeline | Full Build | Est. Cost |
| :--- | :--- | :--- | :--- | :--- |
| Full Investment | 6 (1 UX, 2 3D/WebGL, 1 FE, 2 BE) | 12 weeks | 24 weeks | $250,000 |

**The "Commission History" Feature:**

For returning users who have previously commissioned a piece through The Atelier, the site includes a "My Commissions" dashboard accessible via the user profile. This dashboard displays a timeline of all past commissions, each with the following data:

- The 3D model of the commissioned piece (rendered in real-time using the same Three.js pipeline)
- The date of commission, the date of completion, and the date of delivery
- The artisan who cut the stone and the workshop that set it
- A downloadable PDF certificate of the commission, including the GIA certification and the Vault Maison Archive Number

This feature transforms one-time buyers into repeat collectors. By maintaining a visual record of their commissions, the user develops a sense of collection-building, which drives repeat purchases. The dashboard also includes a "Commission Again" button that pre-populates the Workbench with the user's previous preferences (preferred metal, preferred setting style, preferred stone shape), reducing the friction of starting a new commission from scratch.

The commission history data is stored in a PostgreSQL database, linked to the user's account via Clerk authentication. The 3D models are cached in the user's browser via IndexedDB, ensuring instant rendering on subsequent visits without re-downloading the assets.

### L) UNIQUENESS PROOF
1. **Color:** #8C3A3A (Oxblood accent).
2. **Interaction:** Drag-and-drop loose stone onto a 3D wireframe setting.
3. **Layout:** Split screen (50/50) homepage with contrasting background colors.
4. **Technology:** Astro with a custom Three.js configurator.
5. **Visual Metaphor:** The Artisan's Workbench / Bespoke Studio.
6. **Competitor Critique:** Vrai offers a "build your own ring" feature, but it relies on pre-rendered static images that feel disconnected; The Atelier uses real-time WebGL to make the user feel like they are physically assembling the piece.
