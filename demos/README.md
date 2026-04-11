# Vault Maison — 10 UI Concept Demos

Interactive HTML/CSS/JS prototypes for 10 radically different UI concept directions. Each demo includes 3 pages (homepage, product listing, product detail) with signature interactions and real product data.

## Quick Start

```bash
cd demos
python3 -m http.server 8080
# Open http://localhost:8080
```

## Concept Directory

| # | Concept | Signature Interaction | Framework | Pages |
|---|---------|----------------------|-----------|-------|
| 01 | The Vault | Press-and-hold reveal drawers | Next.js | 3 |
| 02 | The Observatory | Animated spectral data readouts | Nuxt.js | 3 |
| 03 | The Gallery | Masonry layout with slow-zoom hover | SvelteKit | 3 |
| 04 | The Atelier | Slide-out configuration workbench | Astro | 3 |
| 05 | The Salon | Chat-first AI concierge interface | Remix | 3 |
| 06 | The Archive | Timeline scrub bar with provenance | Gatsby | 3 |
| 07 | The Minimal Machine | Scroll-snap full-screen reveals | Vanilla JS | 3 |
| 08 | The Immersive Theater | Letter-by-letter cinematic reveal | Qwik | 3 |
| 09 | The Marketplace of Rarity | Auction lots with live countdowns | Fresh (Deno) | 3 |
| 10 | The Modern Maison | Split-screen heritage + filtering | SolidStart | 3 |

## Structure

```
demos/
├── index.html                    # Master Gallery Page
├── README.md                     # This file
├── shared/
│   ├── data/products.json        # 12 diamond products
│   ├── images/                   # Product photography
│   └── fonts/                    # Custom fonts (if any)
├── 01-the-vault/
│   ├── index.html                # Homepage
│   ├── listing.html              # Product listing
│   ├── detail.html               # Product detail
│   ├── css/vault.css
│   └── js/vault.js
├── 02-the-observatory/
│   └── ... (same structure)
└── ... (03 through 10)
```

## Technical Notes

- All demos are static HTML/CSS/JS — no build step required
- Product data loaded from `shared/data/products.json` via fetch
- Images sourced from Unsplash/Pexels (royalty-free)
- Each demo uses unique fonts, colors, animation libraries, and interaction patterns
- Responsive design: all demos adapt to mobile viewports
- CDN libraries used: GSAP, Anime.js (loaded from CDN where needed)
- No framework runtime required — demos reference framework names for concept documentation only

## Viewing

Open `index.html` in any modern browser via a local server. The Master Gallery provides navigation to all 10 concepts.
