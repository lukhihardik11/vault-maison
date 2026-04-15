# Vault Maison: GemHub Technical Integration Plan

This document details the technical strategy for integrating the GemHub (Picup Media) platform into the Vault Maison e-commerce architecture. It outlines the integration phases, data synchronization methods, and frontend implementation patterns required to leverage GemHub's media management and AR try-on capabilities within a custom Next.js environment.

## 1. Integration Overview & Constraints

GemHub is a powerful SaaS platform for jewelry media management, but its integration capabilities present specific constraints for custom-built (non-Shopify) architectures.

### 1.1. The API Constraint

As of the current research, GemHub **does not offer a public REST API or SDK** for programmatic access to product data or media assets [1]. The platform's native integration is exclusively built for Shopify, which utilizes a one-way sync from GemHub to Shopify draft products [2].

### 1.2. Available Integration Methods

For a custom Next.js architecture like Vault Maison, the available integration methods are:

1.  **Share Links (Iframes):** Embedding GemHub's customizable public share links directly into the frontend.
2.  **HTML Embed Codes:** Utilizing GemHub-generated HTML snippets for specific features like AR Try-On.
3.  **Manual CSV Export/Import:** Exporting product data from GemHub and importing it into the Vault Maison database.

## 2. Phased Integration Strategy

To mitigate the lack of a public API while delivering immediate value, Vault Maison will adopt a three-phase integration strategy.

### Phase 1: Frontend Embedding (Immediate)

The initial phase focuses on delivering high-quality media and AR experiences without requiring complex backend synchronization.

*   **Mechanism:** Iframe embedding of GemHub Share Links.
*   **Implementation:**
    1.  Merchandisers generate unique "Product Share Links" within the GemHub dashboard.
    2.  These unique URLs are stored in the Vault Maison database (e.g., in a `gemhub_share_url` column on the `Product` table).
    3.  The Next.js frontend renders an iframe pointing to this URL within the Product Detail Page (PDP).
*   **Customization:** The GemHub Share Settings must be configured to match Vault Maison's branding (logo, colors) and to hide redundant information (e.g., hiding the GemHub price/description if the Vault Maison PDP already displays it) [3].

### Phase 2: Asynchronous Data Synchronization (Short-Term)

This phase automates the transfer of product data and media URLs from GemHub to the Vault Maison backend (Medusa.js).

*   **Mechanism:** Automated CSV processing.
*   **Implementation:**
    1.  A scheduled task (cron job) or manual trigger initiates an export of the product catalog from GemHub in CSV format.
    2.  A custom Node.js microservice (the "GemHub Sync Service") ingests this CSV file.
    3.  The service parses the CSV, mapping GemHub fields (SKU, Title, Media URLs) to the Medusa.js database schema.
    4.  The service updates existing products or creates new draft products in Medusa.js via its Admin API.
*   **Benefit:** This allows Vault Maison to host the high-resolution images directly (or via its own CDN) rather than relying solely on iframes, improving page load performance and SEO.

### Phase 3: Middleware API Integration (Long-Term/Alternative)

If a direct GemHub API remains unavailable, a middleware approach utilizing Shopify can be employed to achieve programmatic access.

*   **Mechanism:** GemHub → Shopify (Headless) → Vault Maison.
*   **Implementation:**
    1.  Utilize the native GemHub-to-Shopify integration to sync data to a "headless" Shopify Plus instance [2].
    2.  Vault Maison's backend (or BFF) queries the Shopify Storefront API (GraphQL) to retrieve the synchronized product data and media assets.
*   **Benefit:** Provides robust, programmatic access to GemHub data.
*   **Drawback:** Introduces significant architectural complexity and the recurring cost of a Shopify Plus subscription solely for use as a data conduit.

## 3. Frontend Implementation Details (Phase 1)

The following details the implementation of the Phase 1 iframe embedding strategy within the Next.js App Router.

### 3.1. The `GemHubViewer` Component

A dedicated React component manages the iframe lifecycle and styling.

```tsx
// src/components/shared/gemhub-viewer.tsx
import React, { useState } from 'react';

interface GemHubViewerProps {
  shareUrl: string;
  title: string;
}

export const GemHubViewer: React.FC<GemHubViewerProps> = ({ shareUrl, title }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full aspect-square bg-neutral-100 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="animate-pulse text-neutral-400">Loading 360° View...</span>
        </div>
      )}
      <iframe
        src={shareUrl}
        title={`360 degree view of ${title}`}
        className="w-full h-full border-0"
        onLoad={() => setIsLoading(false)}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
        allowFullScreen
      />
    </div>
  );
};
```

### 3.2. AR Try-On Integration

GemHub provides specific HTML embed codes for AR Try-On functionality. These snippets must be safely injected into the React component tree.

*   **Security Consideration:** Ensure the embed code is sanitized before rendering using `dangerouslySetInnerHTML` to prevent Cross-Site Scripting (XSS) vulnerabilities, although the source (GemHub) is trusted.

## 4. Operational Workflow

To maintain data integrity between GemHub and Vault Maison, the merchandising team must adhere to a strict workflow:

1.  **Photography & Upload:** Jewelry is photographed using the GemLightbox and uploaded to GemHub.
2.  **Data Entry (GemHub):** The SKU (mandatory) and basic attributes are entered into GemHub.
3.  **Link Generation:** The Product Share Link is generated in GemHub.
4.  **Data Entry (Vault Maison):** The product is created in the Vault Maison backend (Medusa.js), ensuring the SKU matches exactly. The GemHub Share Link is pasted into the designated field.
5.  **Publishing:** The product is published on the Vault Maison storefront.

## References

[1] Picup Media Support. "Integrating with Woocommerce." https://support.picupmedia.com/integrating-with-woocommerce
[2] Picup Media Support. "Integrating with Shopify." https://support.picupmedia.com/integrating-with-shopify
[3] Picup Media Support. "Managing and Customizing Share Settings in GemHub." https://support.picupmedia.com/managing-and-customizing-share-link
