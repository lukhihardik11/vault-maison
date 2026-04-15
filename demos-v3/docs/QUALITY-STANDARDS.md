# Vault Maison: Quality Standards & Checklists

This document defines the rigorous quality standards required for the Vault Maison luxury e-commerce platform. It provides actionable checklists for visual polish, content integrity, and performance optimization to ensure a flawless user experience across all 10 design concepts.

## 1. Visual Polish & UI/UX Standards

The visual presentation of Vault Maison must reflect the luxury nature of the products. Every interaction should feel deliberate, smooth, and refined.

### 1.1. Typography & Layout

*   **Typography Hierarchy:** Ensure strict adherence to the defined typography scales (H1-H6, body, caption) for each concept. Avoid ad-hoc font sizing.
*   **Whitespace & Rhythm:** Maintain consistent vertical and horizontal rhythm using Tailwind's spacing scale (e.g., `gap-8`, `py-16`). Luxury design relies heavily on generous, deliberate whitespace.
*   **Alignment:** Ensure perfect alignment of elements within grids and flex containers. Misaligned elements immediately degrade the perceived quality.
*   **Contrast:** Verify that all text meets WCAG AA contrast ratios against its background, especially critical for the darker concepts (e.g., Observatory, Theater).

### 1.2. Interactions & Animations

*   **Hover States:** All interactive elements (buttons, links, product cards) must have subtle, elegant hover states (e.g., slight opacity change, smooth color transition, or a delicate underline). Avoid jarring or overly fast animations.
*   **Focus States:** Ensure clear, accessible focus rings for keyboard navigation, styled to match the concept's aesthetic rather than relying on default browser styles.
*   **Scroll Reveal:** Utilize the `useScrollReveal` hook consistently to fade in content as the user scrolls. The animation should be smooth (e.g., `duration-700 ease-out`) and not distract from the content.
*   **Loading States:** Implement skeleton loaders (using the shared `Skeletons` component) for all asynchronous data fetching to prevent layout shift and provide immediate visual feedback.

### 1.3. Imagery & Media

*   **Image Quality:** All product and lifestyle images must be high-resolution, professionally retouched, and free of artifacts.
*   **Aspect Ratios:** Enforce consistent aspect ratios for product grids (e.g., 1:1 or 4:5) to maintain a clean, organized layout. Use `object-cover` or `object-contain` appropriately.
*   **Background Blending:** Utilize the `image-blend.ts` utility to seamlessly integrate product images with non-white backgrounds (e.g., using `mix-blend-multiply` on light backgrounds).

## 2. Content Integrity Standards

The written content and product data must be accurate, compelling, and free of errors.

### 2.1. Product Data

*   **Accuracy:** Verify that all product titles, descriptions, prices, and specifications (metal type, carat weight) are 100% accurate.
*   **Completeness:** Ensure every product has at least three high-quality images, a detailed description, and complete specifications.
*   **Consistency:** Maintain a consistent tone of voice across all product descriptions, reflecting the brand's luxury positioning.

### 2.2. Copywriting & Microcopy

*   **Tone of Voice:** The copy should be sophisticated, authoritative, and evocative. Avoid overly casual or colloquial language.
*   **Microcopy:** Ensure all button labels, error messages, and tooltips are clear, concise, and helpful. (e.g., use "Add to Shopping Bag" instead of just "Add").
*   **Proofreading:** All copy must be rigorously proofread for spelling, grammar, and punctuation errors. A single typo can severely damage brand trust.

## 3. Performance & Core Web Vitals

A luxury experience demands exceptional performance. Slow load times directly correlate with increased bounce rates and lost revenue.

### 3.1. Core Web Vitals Targets

Vault Maison must consistently achieve "Good" scores across all Core Web Vitals metrics on both mobile and desktop.

*   **Largest Contentful Paint (LCP):** < 2.5 seconds. Optimize the hero image or primary product image (use `priority` in Next.js `next/image`).
*   **First Input Delay (FID) / Interaction to Next Paint (INP):** < 100 milliseconds. Minimize main thread blocking JavaScript.
*   **Cumulative Layout Shift (CLS):** < 0.1. Ensure all images and dynamic content areas have explicit dimensions or aspect ratios defined to prevent content jumping during load.

### 3.2. Optimization Strategies

*   **Image Optimization:** Leverage Next.js `next/image` for automatic format selection (WebP/AVIF), resizing, and lazy loading.
*   **Code Splitting:** Utilize dynamic imports (`next/dynamic`) for heavy components (e.g., the GemHub AR viewer, complex modals) that are not immediately visible on the initial page load.
*   **Caching:** Implement aggressive caching strategies at the CDN level (Vercel Edge) and API level (Redis) for static assets and frequently accessed product data.
*   **Third-Party Scripts:** Defer the loading of non-essential third-party scripts (analytics, marketing tags) until after the main content has loaded, or manage them via Google Tag Manager with strict firing rules.

## 4. Pre-Deployment Checklist

Before any code is merged into the `main` branch or deployed to production, the following checklist must be completed:

- [ ] **Visual QA:** The UI has been reviewed across all 10 concepts on desktop, tablet, and mobile breakpoints.
- [ ] **Functional Testing:** The critical path (browse -> add to cart -> checkout) has been tested and verified.
- [ ] **Accessibility (a11y):** Automated accessibility audits (e.g., Lighthouse, axe) pass with a score of 90+.
- [ ] **Performance Audit:** Lighthouse performance score is 90+ on desktop and 80+ on mobile.
- [ ] **Security Scan:** Dependencies have been audited for known vulnerabilities (`npm audit`).
- [ ] **Content Review:** All placeholder text (Lorem Ipsum) has been replaced with final copy.
- [ ] **SEO Verification:** Meta tags, Open Graph data, and Schema.org JSON-LD are correctly populated.
