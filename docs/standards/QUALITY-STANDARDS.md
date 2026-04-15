# Vault Maison: Comprehensive Quality & Performance Standards

## 1. Executive Summary

Vault Maison is not merely an e-commerce store; it is a digital flagship for luxury jewelry. The platform's quality must reflect the craftsmanship of the products it sells. A single misaligned pixel, a sluggish animation, or a confusing checkout step shatters the illusion of luxury and directly impacts conversion rates for high-value items.

This document defines the uncompromising quality standards for the Vault Maison Next.js architecture. It establishes strict performance budgets, accessibility (WCAG 2.1 AA) requirements, and detailed component-level checklists that must be met before any code is merged into the `main` branch.

---

## 2. Performance Budgets & Core Web Vitals

Luxury e-commerce demands instantaneous response times. High-net-worth clients expect digital experiences to be as frictionless as a white-glove in-store consultation. We enforce strict performance budgets monitored via Vercel Analytics and Lighthouse CI.

### 2.1 Core Web Vitals Targets (P75)

Vault Maison must consistently achieve "Good" scores across all Core Web Vitals metrics at the 75th percentile of real user traffic.

| Metric | Target (Desktop) | Target (Mobile 3G) | Mitigation Strategy |
| :--- | :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | < 1.2s | < 2.5s | Preload hero images; use `priority` on LCP elements; serve AVIF via Vercel Image Optimization. |
| **INP (Interaction to Next Paint)** | < 50ms | < 200ms | Offload heavy calculations to Web Workers; strictly limit React re-renders using `useMemo` and `useCallback`. |
| **CLS (Cumulative Layout Shift)** | < 0.01 | < 0.05 | Explicit `width` and `height` on all `next/image` tags; reserve space for dynamic content (e.g., GemHub iframes) using aspect-ratio boxes. |
| **TTFB (Time to First Byte)** | < 100ms | < 200ms | Edge caching via Vercel; Next.js Route Handlers with Redis caching for API responses. |

### 2.2 Asset Weight Budgets

To maintain the LCP and INP targets, the following hard limits are enforced per page route:

- **Initial JavaScript Payload**: < 150 KB (gzipped).
- **Total Image Weight (Initial Load)**: < 1.5 MB.
- **Custom Fonts**: < 100 KB (Subset fonts to only include required glyphs; use `next/font` for automatic self-hosting and zero layout shift).
- **Third-Party Scripts**: Must be loaded asynchronously using Next.js `next/script` with `strategy="worker"` (via Partytown) or `strategy="lazyOnload"`.

---

## 3. Accessibility (WCAG 2.1 AA) Standards

Luxury must be inclusive. Vault Maison adheres strictly to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.

### 3.1 Visual Accessibility

- **Contrast Ratios**: All text must maintain a minimum contrast ratio of 4.5:1 against its background (3:1 for large text). This is particularly challenging but mandatory for the darker concepts (e.g., *The Observatory*, *Immersive Theater*).
- **Color Independence**: Information must never be conveyed by color alone. For example, an error state on a checkout input must include an icon and descriptive text, not just a red border.
- **Focus Indicators**: Every interactive element (links, buttons, form fields) must have a highly visible focus state for keyboard navigation. `outline-none` is strictly prohibited unless replaced by a custom, high-contrast `ring` utility.

### 3.2 Semantic HTML & Screen Readers

- **ARIA Attributes**: Use ARIA attributes (`aria-expanded`, `aria-hidden`, `aria-label`) correctly to describe the state of complex UI components (e.g., the MegaMenu, custom Select dropdowns).
- **Heading Hierarchy**: Every page must have exactly one `<h1>`. Headings (`<h2>` through `<h6>`) must follow a strict, unbroken logical order.
- **Alt Text**: Every product image must have descriptive `alt` text detailing the jewelry piece (e.g., "18k Yellow Gold Solitaire Ring with 2 Carat Round Cut Diamond"). Decorative images (e.g., abstract background textures) must use `alt=""`.

---

## 4. Component-Level Quality Checklists

The following checklists apply to specific areas of the Vault Maison architecture.

### 4.1 Product Detail Page (PDP) Checklist

The PDP is the most critical conversion engine. It must be flawless.

- [ ] **Image Gallery**: Swiping/clicking through the gallery is 60fps smooth. High-res zoom activates instantly without layout shift.
- [ ] **Variant Selection**: Changing a variant (e.g., Metal or Size) updates the URL query parameters (for shareability) and instantly updates the price and main image without a full page reload.
- [ ] **GemHub Integration**: The 360° viewer iframe loads lazily and does not block the main thread. It has a skeleton loader matching its exact aspect ratio.
- [ ] **Sticky Add-to-Cart**: On mobile, the "Add to Cart" button remains sticky at the bottom of the viewport once the user scrolls past the primary button.
- [ ] **Dynamic Pricing**: Prices format correctly based on the user's locale (e.g., `$10,500.00` vs `10.500,00 €`).

### 4.2 Cart & Checkout Checklist

Friction in the checkout process for a $10,000 item results in immediate abandonment.

- [ ] **Cart Drawer**: Opens smoothly via CSS transforms (`translate-x`), not layout properties (`left`/`right`), to ensure 60fps animation.
- [ ] **Input Validation**: Form fields validate *on blur* (when the user leaves the field), not *on change* (which is annoying while typing).
- [ ] **Autofill Support**: All checkout inputs have correct autocomplete attributes (e.g., `autoComplete="shipping address-line1"`).
- [ ] **Stripe Elements**: The Stripe iframe loads seamlessly and matches the typography and border-radius of the surrounding Vault Maison inputs.
- [ ] **Loading States**: Clicking "Place Order" immediately disables the button and shows a clear loading spinner to prevent duplicate submissions.

### 4.3 Typography & Layout Checklist

- [ ] **Fluid Typography**: Font sizes scale fluidly between mobile and desktop breakpoints using `clamp()` or Tailwind's responsive prefixes, preventing awkward text wrapping.
- [ ] **Orphan Prevention**: Headings and short paragraphs use `text-balance` or `&nbsp;` to prevent single words from wrapping to their own line.
- [ ] **Grid Alignment**: Product grids maintain perfect alignment regardless of varying product title lengths (achieved via CSS Grid and `flex-grow` on text containers).

---

## 5. Animation & Motion Standards

Animations in luxury design should be subtle, deliberate, and performant. "Janky" animations feel cheap.

- **CSS over JS**: Prefer CSS transitions and keyframes over JavaScript animation libraries (like Framer Motion) for simple state changes (hover, focus, drawer open) to minimize bundle size.
- **Hardware Acceleration**: Only animate properties that do not trigger layout recalculations or repaints: `transform` (translate, scale, rotate) and `opacity`.
- **Easing Curves**: Avoid linear animations. Use custom cubic-bezier curves (e.g., `cubic-bezier(0.4, 0, 0.2, 1)`) to create natural, "ease-out" motion that feels premium.
- **Reduced Motion**: Respect the user's OS-level accessibility settings. Wrap all animations in a `prefers-reduced-motion` media query to disable or simplify motion for users who request it.

```css
/* Example of a compliant, hardware-accelerated hover state */
.luxury-button {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
              background-color 0.3s ease;
}
.luxury-button:hover {
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .luxury-button {
    transition: none;
    transform: none;
  }
}
```

---

## 6. Quality Assurance (QA) Workflow

Before any Pull Request is merged into the `main` branch, it must pass the following automated and manual gates:

1. **Automated CI/CD (GitHub Actions)**:
   - `npm run lint`: Zero ESLint warnings.
   - `npm run type-check`: Zero TypeScript errors.
   - `npm run test`: All Jest/Vitest unit tests pass.
   - **Lighthouse CI**: Fails the build if performance drops below 90 or accessibility drops below 100.

2. **Manual Device Testing**:
   - **iOS Safari**: Tested on a physical iPhone (not just an emulator) to verify bottom-bar UI quirks and touch targets.
   - **Android Chrome**: Tested on a mid-tier Android device to verify JavaScript execution performance.
   - **Desktop Safari/Chrome/Firefox**: Cross-browser layout verification.

3. **Peer Review**:
   - Code review by a senior engineer focusing on React performance (unnecessary re-renders) and security (input sanitization).
   - Visual review by a designer to ensure pixel-perfect adherence to the Figma concepts.
