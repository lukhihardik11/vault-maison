# GemHub / GemLightBox Integration Plan

## Research Findings

### What is GemHub?
GemHub (hub.gemlightbox.com) by Picup Media is a platform for managing jewelry photography, 360° videos, and AR visualizations. It works with GemLightBox hardware to capture studio-quality product images.

### Key Features Available
1. **360° Product Viewer** — Interactive spin/rotate viewer for jewelry
2. **AR Try-On** — Virtual try-on for rings, earrings, necklaces
3. **Catalog Sharing** — Shareable links for product catalogs
4. **Custom Branding** — White-label share links with company branding
5. **Embed Support** — iframe-based embedding for websites (Shopify, custom sites)
6. **Custom Domain** — Use your own domain for share links

### Integration Methods
1. **Share Links** — Each product/catalog gets a unique URL (e.g., `share.gemlightbox.com/product/xxx`)
2. **Embed (iframe)** — Copy embed code from GemHub → paste into website HTML
3. **AR Embed** — Separate embed code for AR try-on functionality
4. **Shopify Integration** — Direct integration with Shopify stores
5. **The Edge Integration** — Two-way sync with The Edge POS system

### Current Account
- Account: Melee Diamond Inc (Tushar Vanani)
- Collections: 9 (All products: 537, Rings: 120, Earrings: 41, Necklaces: 62, Bracelets: 63, Flexible Bangles: 242)
- Has both Manual and Automatic collections

### Integration Architecture for Vault Maison

#### Phase 1: Placeholder (Current)
- `GemHubViewer` component renders product image with 360° overlay
- Simulated rotation animation
- Per-concept themed badge and styling
- "Powered by GemLightBox Hub" attribution

#### Phase 2: Share Link Integration
- Map Vault Maison product IDs → GemHub product share links
- Embed GemHub share links via iframe when available
- Fallback to placeholder when no GemHub link exists

#### Phase 3: Full API Integration
- Use GemHub's embed codes for 360° viewers
- Integrate AR try-on for applicable categories (rings, earrings)
- Custom domain setup for seamless branding

### Technical Implementation Notes
```tsx
// Future: Replace placeholder with real GemHub embed
<iframe 
  src="https://share.gemlightbox.com/product/{gemhub_product_id}"
  width="100%"
  height="400"
  frameBorder="0"
  allowFullScreen
/>
```

### Product ID Mapping (To Be Configured)
| Vault Maison Product | GemHub Product ID | Has 360° | Has AR |
|---------------------|-------------------|----------|--------|
| TBD                 | TBD               | TBD      | TBD    |

### Environment Variables Needed
```env
NEXT_PUBLIC_GEMHUB_SHARE_DOMAIN=share.gemlightbox.com
NEXT_PUBLIC_GEMHUB_ENABLED=false  # Set to true when mapping is ready
```
