# GemHub / GemLightbox Live Integration Research

> **Last Updated:** April 15, 2026
> **Researcher:** Automated QA Agent
> **Status:** Research complete — integration architecture validated

---

## Executive Summary

GemHub (by Picup Media) is a cloud-based jewelry media management platform that provides product photography hosting, 360-degree spin viewers, and shareable product catalogs. This document captures the findings from live research into GemHub's sharing infrastructure, embed patterns, and how Vault Maison integrates with it.

---

## Platform Overview

GemHub operates at `hub.gemlightbox.com` and serves as the media backend for jewelry businesses using Picup Media's GemLightbox photography hardware. The platform provides product management, catalog organization, and shareable links for individual products and collections.

| Feature | Description |
|---------|-------------|
| **Product Management** | Upload, organize, and tag jewelry media (photos, 360-degree spins, videos) |
| **Catalog System** | Group products into named catalogs for organized sharing |
| **Share Links** | Generate public URLs for individual products or entire catalogs |
| **Embed Support** | Products can be embedded via iframe with configurable display options |
| **Shopify Integration** | Virtual try-on and product viewer widgets for Shopify storefronts |

---

## URL Patterns and Endpoints

### Product Share Links

The primary sharing mechanism uses the following URL pattern:

```
https://hub.gemlightbox.com/share/{shareId}?banner={bool}&logo={bool}&contact={bool}&cart={bool}
```

**Query Parameters:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `banner` | boolean | `true` | Show/hide the top banner bar |
| `logo` | boolean | `true` | Show/hide the business logo |
| `contact` | boolean | `true` | Show/hide contact information |
| `cart` | boolean | `true` | Show/hide the add-to-cart button |

### Catalog Share Links

```
https://hub.gemlightbox.com/catalogs/{catalogId}/share
```

Catalogs group multiple products and can be shared as a browsable collection.

### Product Detail Pages (Authenticated)

```
https://hub.gemlightbox.com/product/{productId}
```

These pages are only accessible to authenticated users (business owners) and show full product management controls.

---

## Product Preview Page Structure

When a share link is opened, the preview page displays:

1. **Thumbnail Gallery** (left sidebar) — small clickable thumbnails of all media files
2. **Main Image Carousel** (center) — large image with left/right navigation arrows
3. **Product Details** (right panel) — SKU, variants, carat weight, price
4. **Action Buttons** — Contact, Add to Cart (if enabled)

**Important Note:** The share page viewer is a standard multi-angle image carousel, not a true 360-degree WebGL spin viewer. The 360-degree spin experience is provided through the GemLightbox hardware capture process, which produces a series of images that can be navigated sequentially.

---

## Vault Maison Integration Architecture

### Existing Components

The codebase already contains a complete GemHub integration layer:

| File | Purpose |
|------|---------|
| `src/components/shared/gemhub-viewer.tsx` | React component that renders an iframe embed or fallback |
| `src/lib/gemhub.ts` | Configuration module with embed URL builder function |
| `src/config/site.ts` | Feature flag `gemhub360` controlled by environment variable |

### Feature Flag

The integration is gated behind a feature flag:

```env
NEXT_PUBLIC_FEATURE_GEMHUB=true
```

When the flag is `false` (default), the `GemHubViewer` component renders a fallback image with a "360° Coming Soon" badge. When `true`, it renders an iframe pointing to the GemHub share URL.

### Product Data Schema

Products in `src/data/products.ts` support two optional GemHub fields:

```typescript
interface Product {
  // ... other fields
  gemhubId?: string    // GemHub media/share ID
  gemhubUrl?: string   // Full GemHub share link URL
}
```

### Embed URL Construction

The `gemhub.ts` module builds embed URLs using this pattern:

```typescript
function buildGemHubEmbedUrl(gemhubId: string): string {
  return `${baseUrl}/share/${gemhubId}?banner=false&logo=true&contact=false&cart=false`
}
```

This strips the banner, contact info, and cart button to create a clean embedded viewing experience.

---

## Product Data Expansion

As part of this research cycle, the product catalog was expanded from 50 to 65 products across 11 categories:

| Category | Count | Price Range |
|----------|-------|-------------|
| Diamond Rings | 8 | $3,200 – $18,750 |
| Diamond Necklaces | 6 | $4,800 – $28,500 |
| Diamond Earrings | 5 | $2,400 – $12,500 |
| Diamond Bracelets | 5 | $4,200 – $18,500 |
| Gold Rings | 3 | $1,200 – $2,800 |
| Gold Necklaces | 6 | $1,800 – $6,500 |
| Gold Earrings | 4 | $850 – $2,200 |
| Gold Bracelets | 4 | $1,600 – $4,200 |
| Loose Diamonds | 3 | $2,800 – $45,000 |
| Wedding & Bridal | 6 | $1,200 – $28,500 |
| Custom & Bespoke | 1 | $5,000+ |

All products include realistic specifications: GIA certification numbers, 4C diamond grading (carat, cut, color, clarity), material composition, and detailed feature lists.

### Image Assets

118 high-resolution product images were sourced from Unsplash (license-free) and organized in `public/images/products/`. Each product has 2-3 unique images to minimize reuse across the catalog.

---

## Recommendations for Live Activation

To activate the GemHub 360-degree viewer with real product media:

1. **Upload product media to GemHub** — Use GemLightbox hardware to capture 360-degree spins of each product
2. **Obtain share IDs** — After upload, each product gets a unique share ID from GemHub
3. **Populate product data** — Add `gemhubId` and/or `gemhubUrl` to each product in `products.ts`
4. **Enable the feature flag** — Set `NEXT_PUBLIC_FEATURE_GEMHUB=true` in the deployment environment
5. **Test embed rendering** — Verify iframe loads correctly with the configured query parameters

### Shopify Virtual Try-On

GemHub also supports a virtual try-on widget for Shopify stores. The embed code pattern (from Picup Media documentation):

```html
<script src="https://cdn.gemlightbox.com/try-on/widget.js"></script>
<div data-gemhub-tryon data-product-id="{productId}"></div>
```

This is a potential future enhancement for Vault Maison's product detail pages.

---

## Security Considerations

- GemHub share links are public by default — no authentication required to view
- The iframe embed uses the same share link mechanism
- No API keys are exposed in the client-side code
- The feature flag provides a clean on/off switch for the integration
- Product data (prices, descriptions) is stored locally in Vault Maison, not fetched from GemHub

---

## References

- [GemHub Platform](https://hub.gemlightbox.com)
- [Picup Media Support — Managing Share Links](https://support.picupmedia.com/managing-and-customizing-share-link)
- [Picup Media Support — Shopify AR Try-On](https://support.picupmedia.com/embedding-your-virtual-try-on-to-shopify)
