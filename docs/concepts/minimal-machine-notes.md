# Minimal Machine Architecture Notes

## Current Architecture
- Dynamic route: `src/app/(concepts)/[concept]/` handles all 10 concepts
- Each concept has a home component: `src/components/concepts/minimal-home.tsx`
- Shared components in `src/components/shared/` (nav, footer, product-card, etc.)
- The shared components already handle `isMinimal` checks for concept-specific styling
- 30 products exist across 10 categories (3 per category)
- Zustand stores for cart and wishlist already exist
- Images in `public/images/` — mostly dark/moody backgrounds, need white-bg images for Minimal

## User Requirements for Minimal Machine
- Pure B&W: #FFFFFF + #050505 only
- System fonts: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Segoe UI', sans-serif
- NO Google Fonts, NO Framer Motion, NO shadcn components
- Max font size: 28px (hero only), base: 13px
- Nav: 11px uppercase, letter-spacing: 0.2em
- Section padding: 120px vertical minimum
- Product grid: 3 cols desktop, 2 mobile, 40px h-gap, 60px v-gap
- NO border-radius, NO shadows, NO gradients, NO icons (except hamburger)
- CSS-only animations: opacity transitions, transform transitions
- Transition: 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)

## Strategy
The Minimal concept needs its OWN nav, footer, and page layouts — NOT the shared ones.
The shared components are too complex/decorated for the Minimal Machine aesthetic.

Create:
1. `src/components/concepts/minimal/MinimalNav.tsx` — custom ultra-thin nav
2. `src/components/concepts/minimal/MinimalFooter.tsx` — minimal footer
3. `src/components/concepts/minimal/MinimalLayout.tsx` — wrapper
4. Override ALL 35 pages for the minimal concept with concept-specific rendering

## Available Images (light/white background suitable for Minimal)
- minimalist-jewelry.jpg — gold rings/necklace on skin, warm tones
- fine-jewelry-product.jpg — gold bangle, hoops, chains on light fabric
- fine-jewelry-necklace.jpg — to check
- jewelry-set-elegant.jpg — to check
- jewelry-ring-closeup.jpg — to check
- gold-jewelry-collection.jpg — to check
- gold-diamond-jewelry.jpg — to check

## Need to download
- White-background product shots for each category
- Clean, minimal jewelry photography
