# Image Processing and Background Matching Plan

## Executive Summary

This document outlines the strategy for processing and presenting product imagery across the ten distinct concepts of the Vault Maison e-commerce platform. The core challenge is seamlessly integrating product images—typically shot on pure white backgrounds—into the varied, often colored, backgrounds of the different concepts (e.g., the dark navy of The Observatory or the warm ivory of Modern Maison). This plan details the CSS techniques and implementation steps required to achieve a flawless, high-end aesthetic without the need for manual image editing.

## The Challenge: Multi-Concept Backgrounds

Vault Maison features ten unique concepts, each with its own distinct color palette and design language. Product images, however, are generally standardized with pure white backgrounds (`#FFFFFF`) for consistency and clarity.

When a product image with a white background is placed on a colored concept background, the result is a stark, unappealing white box that breaks the immersion and cheapens the luxury feel of the site. The goal is to make the product appear as if it were photographed directly on the concept's specific background color.

## The Solution: CSS Blend Modes

The most efficient and scalable solution is to utilize CSS blend modes, specifically `mix-blend-mode`. This property dictates how an element's content should blend with the content of the element's parent and the element's background.

By applying the correct `mix-blend-mode` to the product image, we can effectively "knock out" the white background and allow the concept's background color to show through, creating a seamless integration.

### Key CSS Properties

1.  **`mix-blend-mode`**: Applied directly to the `<img>` element.
2.  **`background-color`**: Applied to the parent container of the image. This color must match the concept's specific background color.

### Blend Mode Strategies

The choice of blend mode depends entirely on the relationship between the product image's background (white) and the concept's background color (light or dark).

#### Strategy 1: Light Background Concepts (The "Multiply" Approach)

For concepts with light background colors (e.g., Minimal, Gallery, Salon, Maison), the `multiply` blend mode is the optimal choice.

*   **How it works**: The `multiply` mode multiplies the colors of the blending element (the image) and the base element (the background). Multiplying any color with white leaves the color unchanged. Therefore, the white background of the product image becomes transparent, revealing the concept's background color, while the darker pixels of the jewelry remain visible and blend naturally.
*   **Concepts**:
    *   Concept 01: Minimal (`#FAFAF8`)
    *   Concept 03: Gallery (`#F5F0EB`)
    *   Concept 04: Salon (`#FDF8F4`)
    *   Concept 06: Archive (`#F2EDE8`)
    *   Concept 10: Modern Maison (`#FAF8F5`)
*   **CSS Implementation**:
    ```css
    .product-image-container {
      background-color: var(--concept-bg-light); /* e.g., #FAFAF8 */
    }
    .product-image-container img {
      mix-blend-mode: multiply;
    }
    ```

#### Strategy 2: Dark Background Concepts (The "Screen" or "Luminosity" Approach)

For concepts with dark background colors (e.g., Vault, Atelier, Observatory, Theater, Marketplace), the `multiply` mode will not work, as multiplying a dark color with white results in the dark color, effectively hiding the product.

Instead, we must use modes like `screen` or `luminosity`, often combined with CSS filters to adjust the image's contrast and brightness before blending.

*   **How it works**: The `screen` mode inverts both colors, multiplies them, and then inverts the result. This is useful for making dark backgrounds transparent. However, since our product images have *white* backgrounds, we first need to invert the image using `filter: invert(1)` so the background becomes black. Then, applying `screen` will make the black background transparent, revealing the concept's dark background. The jewelry itself will also be inverted, which may require careful tuning or alternative approaches if color accuracy is paramount.
*   **Concepts**:
    *   Concept 02: The Vault (`#0A0A0A`)
    *   Concept 05: The Atelier (`#1A1A2E`)
    *   Concept 07: The Observatory (`#0B1426`)
    *   Concept 08: Immersive Theater (`#1A0A0A`)
    *   Concept 09: Marketplace of Rarity (`#0A1A0F`)
*   **CSS Implementation (Invert + Screen)**:
    ```css
    .product-image-container {
      background-color: var(--concept-bg-dark); /* e.g., #0A0A0A */
    }
    .product-image-container img {
      filter: invert(1) hue-rotate(180deg); /* Invert lightness, preserve hue */
      mix-blend-mode: screen;
    }
    ```
    *Note: The `hue-rotate(180deg)` attempts to restore the original colors after inversion, but this technique requires testing per image to ensure the jewelry (especially gold and gemstones) retains its correct appearance.*

## Implementation Plan for Vault Maison

To implement this across the platform, we will use CSS Custom Properties (variables) defined within each concept's layout file.

### Step 1: Define Concept Variables

In each concept's layout component (e.g., `MinimalLayout.tsx`, `VaultLayout.tsx`), define the specific background color and the appropriate blend mode.

```tsx
// Example: MinimalLayout.tsx
<div style={{
  '--concept-bg': '#FAFAF8',
  '--concept-blend-mode': 'multiply',
  '--concept-image-filter': 'none'
} as React.CSSProperties}>
  {/* Content */}
</div>

// Example: VaultLayout.tsx
<div style={{
  '--concept-bg': '#0A0A0A',
  '--concept-blend-mode': 'screen',
  '--concept-image-filter': 'invert(1) hue-rotate(180deg)'
} as React.CSSProperties}>
  {/* Content */}
</div>
```

### Step 2: Update Shared Components

Update shared components that display product images (e.g., `ProductCard`, `ImageGallery`, `CartDrawer`) to utilize these variables.

```tsx
// Example: ProductCard.tsx
<div
  className="product-image-container"
  style={{ backgroundColor: 'var(--concept-bg)' }}
>
  <img
    src={product.image}
    alt={product.name}
    style={{
      mixBlendMode: 'var(--concept-blend-mode)' as any,
      filter: 'var(--concept-image-filter)'
    }}
  />
</div>
```

### Step 3: Testing and Refinement

Thorough testing is required, particularly for the dark concepts using the invert/screen method.

1.  **Verify Color Accuracy**: Ensure that gold, silver, and gemstone colors remain accurate after blending. If the invert/screen method distorts colors unacceptably, an alternative approach (such as pre-processing images to have transparent PNG backgrounds) may be necessary for dark concepts.
2.  **Cross-Browser Compatibility**: Test `mix-blend-mode` support across major browsers (Chrome, Safari, Firefox, Edge). While support is generally excellent, fallback styles (e.g., a subtle border or a slightly lighter background container) should be considered for older browsers.
3.  **Performance**: CSS blend modes are hardware-accelerated and generally performant, but monitor rendering times on pages with many product images (e.g., PLPs).

By implementing this CSS-driven approach, Vault Maison can maintain a cohesive, luxurious aesthetic across all ten concepts without the overhead of managing multiple image assets for every product.
