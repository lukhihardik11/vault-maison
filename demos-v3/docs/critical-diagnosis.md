# CRITICAL DIAGNOSIS — Pages Look Empty

## What the user sees:
- Nav bar at top (VAULT MAISON, COLLECTIONS, JOURNAL, BESPOKE, ABOUT, SEARCH, WISHLIST, CART)
- Then MASSIVE blank white space
- Some tiny text links (Diamond Rings, Necklaces, Earrings, etc.) floating in the middle-left
- More blank space
- "VIEW ALL COLLECTIONS" link near the bottom

## What the markdown extraction shows:
- ALL content exists in the DOM — hero text, category cards, products, metrics, everything
- The HTML is there but INVISIBLE

## Root Cause:
The `whileInView` + `initial={{ opacity: 0 }}` pattern means ALL content starts invisible.
The HeroFashion component's content (brand name, hero image) is there but at opacity: 0.
The category links (9-13) are visible because they DON'T use motion animations.

## The REAL problem:
1. HeroFashion uses `initial={{ opacity: 0 }}` — the brand name and hero image never appear until scrolled into view, but they ARE in the viewport on load
2. The `viewport={{ once: true }}` should trigger on load for elements already in view, but it's NOT working
3. This is likely because the MinimalLayout or a parent is interfering with the intersection observer

## FIX NEEDED:
- Replace ALL `initial={{ opacity: 0 }}` + `whileInView` with `animate` for above-the-fold content
- Or use `initial={{ opacity: 1 }}` as default and let CSS handle the animation
- Or remove motion animations entirely and use CSS-only transitions
- The simplest fix: use `animate` instead of `whileInView` for the hero, and ensure viewport triggers work for below-fold content
