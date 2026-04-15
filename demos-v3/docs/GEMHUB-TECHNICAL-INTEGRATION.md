# Vault Maison: Comprehensive GemHub Technical Integration Plan

## 1. Executive Summary

GemHub (by Picup Media) is the industry standard for jewelry media management, providing 360° videos, high-resolution imagery, and Augmented Reality (AR) try-on capabilities. Integrating GemHub into Vault Maison's custom Next.js + Medusa.js architecture is critical for delivering the immersive luxury experience required by the 10 design concepts.

However, GemHub's architecture presents a significant technical challenge: **it does not currently offer a public REST or GraphQL API for programmatic media retrieval.** Its native integrations are strictly limited to Shopify and WooCommerce via proprietary plugins.

This document outlines a robust, three-phase technical strategy to overcome this limitation, detailing the exact data flows, frontend implementation patterns, and backend synchronization scripts required to seamlessly integrate GemHub's capabilities into Vault Maison's headless architecture.

---

## 2. Integration Constraints & Analysis

Before detailing the solution, it is vital to understand the constraints of the GemHub platform.

### 2.1 The API Limitation

Extensive research into GemHub's developer documentation and support portals confirms the absence of a public API [1]. 
- **No Direct Media Fetching**: We cannot make an HTTP request like `GET api.gemhub.com/v1/products/{sku}/media` to retrieve raw MP4 or JPG URLs.
- **No Webhooks**: GemHub does not support outbound webhooks to notify our backend when a new 360° video has finished processing.

### 2.2 Native Integration Mechanics

GemHub's native Shopify integration works via a one-way push mechanism [2]:
1. A user clicks "Sync to Shopify" inside the GemHub dashboard.
2. GemHub's internal servers use the Shopify Admin API to create a Draft Product.
3. GemHub pushes the media assets directly into Shopify's CDN.

Because Vault Maison uses Medusa.js, we cannot utilize this native push mechanism directly.

### 2.3 Available Integration Vectors

For a custom headless architecture, we are limited to three integration vectors:
1. **Public Share Links (Iframes)**: GemHub allows users to generate public, customizable URLs (e.g., `https://gemhub.picupmedia.com/share/xyz123`) that host a 360° viewer [3].
2. **HTML Embed Codes**: GemHub generates specific `<iframe>` or `<script>` tags for embedding AR Try-On experiences.
3. **CSV Export**: GemHub allows bulk exporting of product data, which includes the public Share Link URLs, via CSV.

---

## 3. Phased Integration Strategy

To deliver immediate value while building toward a fully automated system, Vault Maison will implement a three-phase integration strategy.

### Phase 1: The Iframe & Manual Entry Approach (Launch Phase)

This phase requires no backend engineering and relies on the Next.js frontend to render GemHub's hosted viewers.

**Workflow:**
1. **Media Capture**: The jeweler captures the item using the GemLightbox and uploads it to the GemHub app.
2. **Link Generation**: In the GemHub dashboard, the merchandiser generates a "Product Share Link".
3. **Data Entry**: The merchandiser logs into the Medusa.js Admin dashboard, creates the product, and pastes the GemHub Share Link into a custom metadata field (e.g., `metadata.gemhub_share_url`).
4. **Frontend Rendering**: The Next.js frontend fetches the product from Medusa.js. If `metadata.gemhub_share_url` exists, it renders the `<GemHubViewer />` component (an iframe).

**Pros**: Immediate time-to-market; zero backend complexity.
**Cons**: Manual data entry is prone to human error; iframes can impact Core Web Vitals (specifically Cumulative Layout Shift if not sized correctly); Vault Maison does not host the raw media assets.

### Phase 2: Asynchronous CSV Synchronization (Mid-Term)

This phase automates the data entry process, eliminating human error and allowing for bulk updates.

**Workflow:**
1. **Scheduled Export**: A merchandiser exports the "All Products" CSV from GemHub daily.
2. **Automated Ingestion**: The CSV is uploaded to a secure AWS S3 bucket.
3. **Sync Microservice**: An AWS Lambda function (or Medusa.js scheduled job) detects the new CSV.
4. **Data Mapping**: The script parses the CSV, matching the GemHub `SKU` column to the Medusa.js `variant.sku`.
5. **Database Update**: The script updates the Medusa.js database, automatically populating the `metadata.gemhub_share_url` and `metadata.gemhub_ar_url` fields for thousands of SKUs simultaneously.

**Pros**: Eliminates manual data entry; highly scalable for large catalogs.
**Cons**: Data is only as fresh as the last CSV export (not real-time); still relies on iframes for frontend rendering.

### Phase 3: The Shopify Middleware Proxy (Long-Term / Enterprise)

If Vault Maison requires raw access to the MP4/JPG files (e.g., to build a completely custom 360° viewer using WebGL instead of an iframe), we must employ a middleware proxy.

**Workflow:**
1. **Headless Shopify Instance**: Vault Maison maintains a basic Shopify Plus (or Advanced) instance used *strictly* as a data conduit, not a storefront.
2. **Native Sync**: GemHub's native Shopify app is installed on this instance. Merchandisers use the "Sync to Shopify" button in GemHub.
3. **Webhook Trigger**: When GemHub creates the product in Shopify, Shopify fires a `products/create` webhook to the Vault Maison Medusa.js backend.
4. **Asset Extraction**: The Medusa.js backend receives the webhook, extracts the raw media URLs from the Shopify payload, downloads the assets, and uploads them to Vault Maison's own Vercel Blob or AWS S3 storage.
5. **Native Rendering**: The Next.js frontend renders the raw MP4/JPGs using native HTML5 `<video>` and `<image>` tags, completely eliminating iframes.

**Pros**: Ultimate control over the frontend experience; perfect Core Web Vitals; Vault Maison owns the raw assets.
**Cons**: High architectural complexity; introduces the recurring cost of a Shopify subscription solely for API access.

---

## 4. Frontend Implementation Details (Phase 1 & 2)

The following details the exact implementation of the iframe embedding strategy within the Next.js App Router.

### 4.1 The `GemHubViewer` Component

A dedicated React component manages the iframe lifecycle, loading states, and responsive sizing to prevent Cumulative Layout Shift (CLS).

```tsx
// src/components/shared/GemHubViewer.tsx
'use client';

import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface GemHubViewerProps {
  shareUrl: string;
  title: string;
  aspectRatio?: 'square' | 'video' | 'portrait';
}

export const GemHubViewer: React.FC<GemHubViewerProps> = ({ 
  shareUrl, 
  title,
  aspectRatio = 'square' 
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Map aspect ratio prop to Tailwind classes
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]'
  }[aspectRatio];

  // Security: Ensure the URL is actually a GemHub URL before rendering
  const isTrustedUrl = shareUrl.startsWith('https://gemhub.picupmedia.com/');
  
  if (!isTrustedUrl) {
    console.error('Untrusted iframe URL provided to GemHubViewer');
    return null;
  }

  return (
    <div className={`relative w-full ${aspectClass} bg-neutral-50 rounded-lg overflow-hidden`}>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-neutral-100">
          <Skeleton className="w-full h-full" />
          <span className="absolute text-sm text-neutral-400 font-medium animate-pulse">
            Loading 360° View...
          </span>
        </div>
      )}
      
      <iframe
        src={shareUrl}
        title={`360 degree interactive view of ${title}`}
        className={`w-full h-full border-0 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
        allowFullScreen
      />
    </div>
  );
};
```

### 4.2 AR Try-On Integration

GemHub provides specific HTML embed codes for AR Try-On functionality (e.g., virtual ring try-on via smartphone camera).

**Implementation Strategy:**
1. The AR Try-On URL is stored in Medusa.js as `metadata.gemhub_ar_url`.
2. On the Next.js PDP, a "Virtual Try-On" button is rendered.
3. Clicking the button opens a full-screen modal or dialog containing an iframe pointing to the AR URL.
4. **Crucial**: The iframe must include the `allow="camera"` attribute, or the AR experience will fail.

```tsx
// Example AR Modal Iframe
<iframe
  src={product.metadata.gemhub_ar_url}
  allow="camera; gyroscope; accelerometer; magnetometer"
  className="w-full h-[80vh] border-0 rounded-xl"
/>
```

### 4.3 GemHub Share Settings Configuration

To ensure the iframe blends seamlessly into the Vault Maison design concepts, the GemHub Share Settings must be strictly configured within the GemHub dashboard [3]:

- **Branding**: Upload the Vault Maison logo (SVG format, transparent background).
- **Colors**: Set the viewer background color to match the specific concept's background (e.g., `#FFFFFF` for Minimal, `#0A0A0A` for Vault).
- **UI Elements**: Disable the GemHub "Price", "Description", and "Add to Cart" buttons within the viewer. The Vault Maison Next.js frontend handles these elements. The iframe should *only* display the interactive media.

---

## 5. Data Synchronization Script (Phase 2 Detail)

Below is the architectural logic for the Node.js microservice responsible for parsing the GemHub CSV and updating the Medusa.js database.

```typescript
// Pseudo-code for GemHub CSV Sync Service
import { parse } from 'csv-parse';
import { MedusaClient } from '@medusajs/medusa-js';

const medusa = new MedusaClient({ baseUrl: process.env.MEDUSA_BACKEND_URL, maxRetries: 3 });

async function syncGemHubData(csvFilePath: string) {
  const records = await parseCSV(csvFilePath);
  
  for (const record of records) {
    const sku = record['SKU'];
    const shareUrl = record['Share Link'];
    const arUrl = record['AR Link'];

    if (!sku || !shareUrl) continue;

    try {
      // 1. Find the variant in Medusa by SKU
      const { variants } = await medusa.admin.variants.list({ sku });
      
      if (variants.length === 0) {
        console.warn(`SKU ${sku} found in GemHub CSV but not in Medusa. Skipping.`);
        continue;
      }

      const variant = variants[0];
      const productId = variant.product_id;

      // 2. Update the Product Metadata in Medusa
      // Note: We update the Product, not the Variant, as the 360 view usually applies to the base product
      await medusa.admin.products.update(productId, {
        metadata: {
          gemhub_share_url: shareUrl,
          gemhub_ar_url: arUrl || null,
          last_gemhub_sync: new Date().toISOString()
        }
      });

      console.log(`Successfully synced GemHub data for SKU: ${sku}`);
      
    } catch (error) {
      console.error(`Failed to sync SKU ${sku}:`, error);
    }
  }
}
```

## 6. Conclusion

While the lack of a public API presents a hurdle, the phased integration strategy outlined above ensures Vault Maison can immediately leverage GemHub's powerful media capabilities via secure, optimized iframes (Phase 1). As the platform scales, the architecture supports automated CSV synchronization (Phase 2) and, if necessary, a robust middleware proxy (Phase 3) to achieve total control over the media assets and frontend rendering experience.

---

### References
[1] Picup Media Support. "Integrating with Woocommerce." https://support.picupmedia.com/integrating-with-woocommerce
[2] Picup Media Support. "Integrating with Shopify." https://support.picupmedia.com/integrating-with-shopify
[3] Picup Media Support. "Managing and Customizing Share Settings in GemHub." https://support.picupmedia.com/managing-and-customizing-share-link
