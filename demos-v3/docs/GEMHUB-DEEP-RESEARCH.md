# GemHub Integration Deep Research

## Executive Summary

This document details the research and integration strategy for GemHub (by Picup Media) within the Vault Maison e-commerce platform. GemHub serves as a centralized media management system for jewelry, offering interactive 360-degree videos, AR try-on capabilities, and high-resolution image hosting. The goal is to seamlessly integrate these features into Vault Maison's product detail pages (PDPs) to provide a premium, immersive shopping experience.

## Platform Overview

GemHub Desktop is a comprehensive platform designed to complement GemLightbox devices. It acts as a centralized hub where jewelers can sync, store, and manage their media assets and product details. The platform is accessible via web browsers (Chrome, Safari, Edge), dedicated desktop applications (Mac and Windows), and mobile apps, ensuring flexibility for managing jewelry catalogs.

### Core Capabilities

The platform offers several key features essential for modern jewelry e-commerce:

1.  **Gallery and Product Management**: GemHub provides robust storage for media files, allowing users to organize products with specific attributes and SKUs.
2.  **Collections**: Users can curate selections of products into "Collections" for targeted sharing with clients or embedding on websites.
3.  **GemStudio**: An integrated AI image editing suite that automates background removal and image enhancement, crucial for maintaining a consistent aesthetic across a catalog.
4.  **AR Try-On**: A standout feature that allows customers to virtually try on jewelry pieces, significantly enhancing the online buying experience.

## Integration Mechanisms

Research into GemHub's documentation reveals that integration is primarily achieved through share links and embedding, rather than a public REST API for programmatic access.

### Share Links and Customization

GemHub generates unique share links for individual products or curated collections (e.g., `hub.gemlightbox.com/share/...`). These links are highly customizable, allowing jewelers to maintain brand consistency.

*   **Branding**: Users can upload a company logo (up to 10MB, recommended width 1000px) and a custom banner (1920x400px) that appears at the top of shared pages.
*   **Company Information**: A short description and website URL can be added to the footer of the share link page.
*   **Contact Options**: The platform supports direct customer inquiries via Email (through a "Chat Now" form), WhatsApp, and direct phone calls.
*   **Access Control**: Share links can be password-protected, requiring a minimum of 6 characters (including at least one letter and one number).

### Embedding Capabilities

For seamless integration into an existing e-commerce site like Vault Maison, GemHub supports embedding via iframes.

*   **Video Embedding**: Interactive 360-degree videos hosted on GemHub can be embedded directly into PDPs.
*   **AR Try-On Integration**: The documentation specifically mentions the ability to embed the AR Try-On feature into platforms like Shopify, indicating that iframe embedding is the standard method for bringing this functionality to external sites.
*   **Custom Domains**: GemHub allows users to map a custom domain for their share links, ensuring that embedded content or shared catalogs appear under the brand's own URL structure.

## Vault Maison Integration Strategy

Given the lack of a documented public REST API, the integration strategy for Vault Maison will rely on iframe embedding and structured data management.

### Phase 1: Placeholder Implementation (Current State)

The initial phase involves creating a robust placeholder component (`GemHubViewer`) within the Vault Maison architecture. This component simulates the 360-degree viewer experience, allowing the design and layout of the PDPs to be finalized while the actual GemHub account and media assets are prepared. The placeholder is themed per concept to ensure visual consistency.

### Phase 2: Iframe Integration

Once the GemHub account is active and media is uploaded, the placeholder will be replaced with actual iframe embeds.

1.  **Data Structure**: The product data model (`products.ts`) will be updated to include a `gemhubId` or `gemhubUrl` field for each item.
2.  **Component Update**: The `GemHubViewer` component will be modified to accept this ID/URL and render an iframe pointing to the specific GemHub asset.
3.  **Responsive Design**: The iframe container must be fully responsive, ensuring the 360-degree viewer functions correctly on both desktop and mobile devices.

### Phase 3: Advanced Features and Custom Domain

The final phase involves leveraging GemHub's advanced features to maximize the user experience.

1.  **Custom Domain Mapping**: Configure GemHub to use a subdomain of Vault Maison (e.g., `media.vaultmaison.com`) for all embedded content, enhancing brand trust.
2.  **AR Try-On**: Implement the AR Try-On embed for supported products, providing a cutting-edge interactive experience.
3.  **Curated Collections**: Utilize GemHub's Collections feature to create dynamic lookbooks or seasonal catalogs that can be embedded on specific landing pages or shared directly with high-value clients.

By following this phased approach, Vault Maison can effectively integrate GemHub's powerful media capabilities, resulting in a highly engaging and visually stunning e-commerce platform.
