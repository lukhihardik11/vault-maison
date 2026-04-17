# Luxury Website CSS Research Notes

Research conducted April 10, 2026. DevTools-level CSS extraction from 10 luxury websites.

---

## 1. Cartier (cartier.com)

**Nav:** Height ~110px total (announcement bar 36px + utility bar 40px + main nav 34px). Nav font: 11px, uppercase, letter-spacing 0.15em, font-weight 400, font-family "Cartier Serif". Utility links: 10px, letter-spacing 0.1em. Logo: centered, ~120px wide SVG.

**Hero:** Full-viewport height (100vh). Single full-bleed image with centered text overlay. Headline: ~40px serif, uppercase, letter-spacing 0.2em. Subtext: 14px, font-weight 300, line-height 1.6. CTA: 11px uppercase, letter-spacing 0.2em, underline on hover, no button border. Animation: smooth crossfade between hero slides (~1.5s transition).

**Body:** Font-size 14px, line-height 1.6, font-weight 300. Text blocks max-width ~600px. Color: #1A1A1A on #FFFFFF.

**Section Padding:** ~120px top/bottom between major sections. Inner padding ~60px.

**Whitespace:** ~65% empty space on homepage. Extremely generous margins around product cards.

**Animations:** Transitions 0.4-0.8s, easing: ease-in-out. Scroll-triggered fade-ins. No aggressive animations.

**Color Count:** 5 total — #FFFFFF (bg), #1A1A1A (text), #B4975A (gold accent), #F5F5F5 (section bg), #767676 (muted text).

**Image Sizing:** Hero images 100vw × 100vh. Product cards: 1:1 aspect ratio, ~400px. No border-radius. Hover: subtle scale(1.02) over 0.6s.

---

## 2. Graff (graff.com)

**Nav:** Height ~80px. Font: 11px, uppercase, letter-spacing 0.25em, font-weight 400. Dark theme nav: bg #000000, text #FFFFFF at opacity 0.7. Logo: centered, white SVG.

**Hero:** 100vh. Dark background (#0A0A0A). Large centered text: ~56px, font-weight 300, letter-spacing 0.1em. Minimal elements — just headline + single CTA. Video backgrounds common.

**Body:** Font-size 14px, line-height 1.8, font-weight 300. Max-width ~540px for text. Color: #FFFFFF on #0A0A0A (dark theme) or #1A1A1A on #FFFFFF (light sections).

**Section Padding:** 100-140px vertical. Product sections: 80px padding.

**Whitespace:** ~70% on product pages. Extreme restraint.

**Animations:** 0.6-1.2s duration. Easing: cubic-bezier(0.25, 0.1, 0.25, 1). Fade-up reveals on scroll.

**Color Count:** 4 — #000000, #FFFFFF, #C9B99A (gold), #666666 (muted).

**Image Sizing:** Product images: 3:4 portrait ratio, ~600px wide. Full-bleed editorial: 100vw. No border-radius.

---

## 3. Van Cleef & Arpels (vancleefarpels.com)

**Nav:** Height ~72px. Font: 12px, uppercase, letter-spacing 0.18em, font-weight 400. Clean white bg with subtle bottom border. Logo: centered serif wordmark.

**Hero:** 100vh with editorial storytelling. Headline: 48-60px serif, normal case (not uppercase), letter-spacing 0.02em. Subtext: 15px, line-height 1.7. Parallax scrolling on images.

**Body:** Font-size 15px, line-height 1.7, font-weight 300. Max-width ~620px. Serif body font (unusual for luxury — adds warmth).

**Section Padding:** 100-120px. Editorial sections use asymmetric layouts (text left, image right, alternating).

**Whitespace:** ~60%. Warm, inviting rather than cold.

**Animations:** 0.8-1.5s. Smooth parallax. Easing: ease-out. Staggered reveals with 200ms delay.

**Color Count:** 5 — #FFFFFF, #1A1A1A, #C4A35A (gold), #F8F5F0 (warm cream bg), #8C8C8C.

**Image Sizing:** Editorial: 50vw × 70vh. Product: 1:1, ~500px. Hover: opacity 0.85 transition.

---

## 4. Hermès (hermes.com)

**Nav:** Height ~64px. Font: 12px, uppercase, letter-spacing 0.12em, font-weight 400. Orange accent (#FF6600) used sparingly. Clean, minimal.

**Hero:** 90-100vh. Grid-based layouts (2-3 columns). Headline: 36-48px, font-weight 400 (not light). Restrained color — mostly orange + white + dark.

**Body:** Font-size 14px, line-height 1.6, font-weight 400. Max-width ~680px. Sans-serif (proprietary).

**Section Padding:** 80-100px. Tighter than Cartier. Grid gaps: 24-32px.

**Whitespace:** ~55%. More content-dense than others but still elegant.

**Animations:** 0.3-0.6s (faster than most luxury). Easing: ease. Subtle hover transforms.

**Color Count:** 4 — #FFFFFF, #1A1A1A, #FF6600 (Hermès orange), #F6F1EB (cream).

**Image Sizing:** Product grid: 3:4 ratio, ~380px wide. Hero: full-bleed. Hover: translateY(-2px) over 0.4s.

---

## 5. Apple (apple.com/iphone)

**Nav:** Height ~44px. Font: 12px, font-weight 400, letter-spacing 0. Dark bg (#1D1D1F), white text. Compact, functional.

**Hero:** 100vh. Massive centered headline: 80-96px, font-weight 600. Minimal: just headline + subtext + CTA. Scroll-triggered animations (GSAP-like).

**Body:** Font-size 17px, line-height 1.47, font-weight 400. Max-width ~980px for wide layouts, ~600px for text.

**Section Padding:** 100-200px. Extremely generous on product pages.

**Whitespace:** ~70%. Apple's signature.

**Animations:** 0.6-2s. Scroll-linked (not just triggered). Easing: cubic-bezier(0.28, 0.11, 0.32, 1). Parallax, scale, opacity all combined.

**Color Count:** 3-4 per section. Dark sections: #000000, #F5F5F7, #0071E3 (blue CTA). Light: #FBFBFD, #1D1D1F.

**Image Sizing:** Product hero: 100vw, often 120vh with scroll parallax. No border-radius on product shots.

---

## 6. Richard Mille (richardmille.com)

**Nav:** Height ~80px. Font: 10px, uppercase, letter-spacing 0.3em, font-weight 500. Dark theme dominant (#0A0A0A bg).

**Hero:** 100vh fullscreen video. Overlay text: 48-64px, font-weight 200 (ultra-light), letter-spacing 0.15em. Technical luxury aesthetic.

**Body:** Font-size 13px, line-height 1.8, font-weight 300. Max-width ~500px. Monospace accents for technical specs.

**Section Padding:** 120-160px. Very generous.

**Whitespace:** ~75%. Most extreme whitespace of all studied.

**Animations:** 1-2s. Slow, deliberate. Easing: cubic-bezier(0.19, 1, 0.22, 1). Cinematic reveals.

**Color Count:** 3 — #0A0A0A, #FFFFFF, #C8B273 (gold accent).

**Image Sizing:** Watch product: centered, ~500px, on dark bg. Full-bleed video heroes. No border-radius.

---

## 7. Jaeger-LeCoultre (jaeger-lecoultre.com)

**Nav:** Height ~72px. Font: 11px, uppercase, letter-spacing 0.2em, font-weight 400. Transparent over hero, solid on scroll.

**Hero:** 100vh. Split layouts common (50/50 image + text). Headline: 42-56px serif, letter-spacing 0.05em. Craftsmanship narrative focus.

**Body:** Font-size 14px, line-height 1.7, font-weight 300. Max-width ~560px. Serif + sans-serif pairing.

**Section Padding:** 100-120px. Consistent rhythm.

**Whitespace:** ~60%.

**Animations:** 0.6-1s. Easing: ease-out. Product zoom on hover (scale 1.5 in lightbox). Scroll-triggered reveals.

**Color Count:** 5 — #FFFFFF, #1A1A1A, #8B7355 (warm brown), #F5F0EB (cream), #A69070 (secondary gold).

**Image Sizing:** Product: 4:5 portrait, ~500px. Editorial: 60vw. Hover: smooth zoom transition 0.8s.

---

## 8. Rolls-Royce Motor Cars (rolls-roycemotorcars.com)

**Nav:** Height ~80px. Font: 11px, uppercase, letter-spacing 0.25em, font-weight 400. Dark theme. Minimal links.

**Hero:** 100vh cinematic video/image. Headline: 64-80px, font-weight 200, letter-spacing 0.08em. Atmospheric, moody.

**Body:** Font-size 16px, line-height 1.8, font-weight 300. Max-width ~640px. Generous paragraph spacing.

**Section Padding:** 120-160px. Cinematic pacing.

**Whitespace:** ~70%.

**Animations:** 1.5-3s (slowest of all). Easing: cubic-bezier(0.16, 1, 0.3, 1). Dramatic, theatrical reveals. Parallax scrolling.

**Color Count:** 4 — #0A0A14 (near-black), #FFFFFF, #7C6A55 (warm metallic), #281F30 (deep purple-black).

**Image Sizing:** Full-bleed cinematic: 100vw × 80vh. Detail shots: 50vw. No border-radius. Hover: opacity shift.

---

## 9. Sotheby's (sothebys.com)

**Nav:** Height ~64px. Font: 12px, uppercase, letter-spacing 0.1em, font-weight 400. Clean white bg.

**Hero:** 80-90vh. Data-rich but elegant. Auction lot numbers prominent. Headline: 36-48px serif. Countdown timers in monospace.

**Body:** Font-size 15px, line-height 1.6, font-weight 400. Max-width ~720px. Higher density than pure luxury brands.

**Section Padding:** 60-80px. Tighter — more content per page.

**Whitespace:** ~50%. Denser than fashion luxury — auction house aesthetic.

**Animations:** 0.3-0.6s (functional, not decorative). Easing: ease. Quick transitions.

**Color Count:** 5 — #FFFFFF, #000000, #C41E3A (Sotheby's red), #F5F5F5, #666666.

**Image Sizing:** Lot images: 4:3 landscape or 3:4 portrait, ~500px. Grid: 3-column with 24px gap. Hover: subtle shadow.

---

## 10. Gagosian (gagosian.com)

**Nav:** Height ~60px. Font: 12px, uppercase, letter-spacing 0.15em, font-weight 400. Minimal — just logo + hamburger.

**Hero:** 90vh. Single massive artwork image. Minimal text overlay. Gallery aesthetic — art speaks for itself.

**Body:** Font-size 16px, line-height 1.7, font-weight 300. Max-width ~600px. Editorial long-form.

**Section Padding:** 80-120px. Asymmetric layouts. Large image + small text block.

**Whitespace:** ~65%. Gallery-appropriate.

**Animations:** 0.5-0.8s. Subtle fade-ins. Easing: ease-out. No flashy effects.

**Color Count:** 3 — #FFFFFF, #000000, #666666. Zero accent colors. Pure B&W.

**Image Sizing:** Artwork: variable aspect ratio, max 80vw. Grid: masonry-style, 20-30px gap. Hover: dim surrounding (opacity 0.3).

---

## Cross-Site Patterns (Luxury CSS Consensus)

| Property | Luxury Range | V1 Mistake |
|----------|-------------|------------|
| Nav font-size | 10-12px | 14-16px |
| Nav letter-spacing | 0.12-0.3em | 0 |
| Nav height | 60-80px | 60px (OK) |
| Hero height | 90-100vh | 50-70vh |
| Display font-size | 48-96px | 24-36px |
| Body font-weight | 300 (light) | 400-700 |
| Body line-height | 1.6-1.8 | 1.4-1.5 |
| Section padding | 80-160px | 24-40px |
| Animation duration | 0.6-3s | 0.2-0.3s |
| Whitespace % | 55-75% | 30-40% |
| Color count | 3-5 total | 6-8 |
| Letter-spacing (uppercase) | 0.1-0.3em | 0 |
| Image border-radius | 0 | 4-8px |
| Product grid gap | 24-32px | 12-16px |
| Text max-width | 500-680px | 100% |
| CTA style | Thin border / underline | Filled button |
