# Debug Notes - Minimal Machine

## Homepage Status: WORKING
The full-page screenshot confirms:
- White background throughout (the CSS override fixed the dark body issue)
- Minimal nav at top: VAULT MAISON | COLLECTIONS JOURNAL BESPOKE ABOUT | SEARCH WISHLIST CART
- 4 product sections with 120px spacing
- Footer at bottom with copyright and 4 links
- All text is system font, small, uppercase nav

## Remaining Issues
1. First image (minimal-ring-white.jpg) has a Dreamstime watermark - need to replace
2. Need to build all 35 pages now

## Architecture Confirmed
- MinimalLayout wraps all pages with white bg override
- MinimalNav is fixed at top, 56px height
- MinimalFooter is simple copyright + 4 links
- All pages use the [concept] dynamic route pattern
- Each page.tsx checks for concept === 'minimal' and renders concept-specific components
