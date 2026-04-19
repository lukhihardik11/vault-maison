## Design System: Minimal Machine

### Pattern
- **Name:** Minimal Single Column
- **Conversion Focus:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Color Strategy:** Minimalist: Brand + white #FFFFFF + accent. Buttons: High contrast 7:1+. Text: Black/Dark grey
- **Sections:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

### Style
- **Name:** Liquid Glass
- **Keywords:** Flowing glass, morphing, smooth transitions, fluid effects, translucent, animated blur, iridescent, chromatic aberration
- **Best For:** Premium SaaS, high-end e-commerce, creative platforms, branding experiences, luxury portfolios
- **Performance:** ⚠ Moderate-Poor | **Accessibility:** ⚠ Text contrast

### Colors
| Role | Hex |
|------|-----|
| Primary | #18181B |
| Secondary | #3F3F46 |
| CTA | #2563EB |
| Background | #FAFAFA |
| Text | #09090B |

*Notes: Monochrome + blue accent*

### Typography
- **Heading:** Space Mono
- **Body:** Space Mono
- **Mood:** brutalist, raw, technical, monospace, minimal, stark
- **Best For:** Brutalist designs, developer portfolios, experimental, tech art
- **Google Fonts:** https://fonts.google.com/share?selection.family=Space+Mono:wght@400;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
```

### Key Effects
Morphing elements (SVG/CSS), fluid animations (400-600ms curves), dynamic blur (backdrop-filter), color transitions

### Avoid (Anti-patterns)
- Vibrant & Block-based
- Playful colors

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

## UI Pro Max Search Results
**Domain:** style | **Query:** brutalism
**Source:** styles.csv | **Found:** 1 results

### Result 1
- **Style Category:** Brutalism
- **Type:** General
- **Keywords:** Raw, unpolished, stark, high contrast, plain text, default fonts, visible borders, asymmetric, anti-design
- **Primary Colors:** Primary: Red #FF0000, Blue #0000FF, Yellow #FFFF00, Black #000000, White #FFFFFF
- **Effects & Animation:** No smooth transitions (instant), sharp corners (0px), bold typography (700+), visible grid, large blocks
- **Best For:** Design portfolios, artistic projects, counter-culture brands, editorial/media sites, tech blogs
- **Performance:** ⚡ Excellent
- **Accessibility:** ✓ WCAG AAA
- **Framework Compatibility:** Tailwind 10/10, Bootstrap 7/10
- **Complexity:** Low
- **AI Prompt Keywords:** Create a brutalist design with raw, unpolished, stark aesthetic. Use pure primary colors (red, blue, yellow), black & white, no smooth transitions (instant), sharp corners, bold large typography, visible grid lines, default system fonts, intentional 'broken' design elements.
- **CSS/Technical Keywords:** border-radius: 0px, transition: none or 0s, font-family: system-ui or monospace, font-weight: 700+, border: visible 2-4px, colors: #FF0000, #0000FF, #FFFF00, #000000, #FFFFFF
- **Implementation Checklist:** ☐ No border-radius (0px), ☐ No transitions (instant), ☐ Bold typography (700+), ☐ Pure primary colors used, ☐ Visible grid/borders, ☐ Asymmetric layout intentional
- **Design System Variables:** --border-radius: 0px, --transition-duration: 0s, --font-weight: 700-900, --colors: primary only, --border-style: visible, --grid-visible: true

## UI Pro Max Search Results
**Domain:** typography | **Query:** minimal geometric sans-serif luxury
**Source:** typography.csv | **Found:** 3 results

### Result 1
- **Font Pairing Name:** Luxury Serif
- **Category:** Serif + Sans
- **Heading Font:** Cormorant
- **Body Font:** Montserrat
- **Mood/Style Keywords:** luxury, high-end, fashion, elegant, refined, premium
- **Best For:** Fashion brands, luxury e-commerce, jewelry, high-end services
- **Google Fonts URL:** https://fonts.google.com/share?selection.family=Cormorant:wght@400;500;600;700|Montserrat:wght@300;400;500;600;700
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&display=swap');
- **Tailwind Config:** fontFamily: { serif: ['Cormorant', 'serif'], sans: ['Montserrat', 'sans-serif'] }
- **Notes:** Cormorant's elegance with Montserrat's geometric precision.

### Result 2
- **Font Pairing Name:** Real Estate Luxury
- **Category:** Serif + Sans
- **Heading Font:** Cinzel
- **Body Font:** Josefin Sans
- **Mood/Style Keywords:** real estate, luxury, elegant, sophisticated, property, premium
- **Best For:** Real estate, luxury properties, architecture, interior design
- **Google Fonts URL:** https://fonts.google.com/share?selection.family=Cinzel:wght@400;500;600;700|Josefin+Sans:wght@300;400;500;600;700
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Josefin+Sans:wght@300;400;500;600;700&display=swap');
- **Tailwind Config:** fontFamily: { serif: ['Cinzel', 'serif'], sans: ['Josefin Sans', 'sans-serif'] }
- **Notes:** Cinzel's elegance for headlines. Josefin for modern body.

### Result 3
- **Font Pairing Name:** Luxury Minimalist
- **Category:** Serif + Sans
- **Heading Font:** Bodoni Moda
- **Body Font:** Jost
- **Mood/Style Keywords:** luxury, minimalist, high-end, sophisticated, refined, premium
- **Best For:** Luxury minimalist brands, high-end fashion, premium products
- **Google Fonts URL:** https://fonts.google.com/share?selection.family=Bodoni+Moda:wght@400;500;600;700|Jost:wght@300;400;500;600;700
- **CSS Import:** @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;500;600;700&family=Jost:wght@300;400;500;600;700&display=swap');
- **Tailwind Config:** fontFamily: { serif: ['Bodoni Moda', 'serif'], sans: ['Jost', 'sans-serif'] }
- **Notes:** Bodoni's high contrast elegance. Jost for geometric body.

## UI Pro Max Search Results
**Domain:** style | **Query:** interactive cursor design
**Source:** styles.csv | **Found:** 3 results

### Result 1
- **Style Category:** Interactive Cursor Design
- **Type:** General
- **Keywords:** Custom cursor, cursor as tool, hover effects, cursor feedback, pointer transformation, cursor trail, magnetic cursor
- **Primary Colors:** Brand-dependent, cursor accent color, high contrast for visibility
- **Effects & Animation:** Cursor scale on hover, magnetic pull to elements, cursor morphing, trail effects, blend mode cursors, click feedback
- **Best For:** Creative portfolios, interactive experiences, agency sites, product showcases, gaming, entertainment
- **Performance:** ⚡ Good
- **Accessibility:** ⚠ Not for touch/SR
- **Framework Compatibility:** GSAP 10/10, Framer Motion 10/10, Custom JS 10/10
- **Complexity:** Medium
- **AI Prompt Keywords:** Design with interactive cursor effects. Use: custom cursor, cursor morphing on hover, magnetic cursor pull, cursor trails, blend mode cursors, click feedback animations, cursor as interaction tool, pointer transformation.
- **CSS/Technical Keywords:** cursor: none (custom), position: fixed for cursor element, mix-blend-mode: difference, transform on hover targets, magnetic effect (JS position lerp), trail with opacity fade, scale on click
- **Implementation Checklist:** ☐ Custom cursor works, ☐ Hover morph smooth, ☐ Magnetic pull subtle, ☐ Trail performance ok, ☐ Click feedback visible, ☐ Touch fallback provided
- **Design System Variables:** --cursor-size: 20px, --cursor-hover-scale: 1.5, --magnetic-distance: 100px, --trail-length: 10, --trail-fade: 0.1, --blend-mode: difference

### Result 2
- **Style Category:** Interactive Product Demo
- **Type:** Landing Page
- **Keywords:** Embedded product mockup/video, interactive elements, product walkthrough, step-by-step guides, hover-to-reveal features, embedded demos
- **Primary Colors:** Primary brand, interface colors matching product, demo highlight colors for interactive elements
- **Effects & Animation:** Product animation playback, step progression animations, hover reveal effects, smooth zoom on interaction
- **Best For:** SaaS platforms, tool/software products, productivity apps landing pages, developer tools, productivity software
- **Performance:** ⚠ Good (video/interactive)
- **Accessibility:** ✓ WCAG AA
- **Framework Compatibility:** Tailwind 10/10, Bootstrap 9/10
- **Complexity:** Medium
- **AI Prompt Keywords:** Design an interactive demo landing page. Use: embedded product mockup, video walkthrough, step-by-step guide, hover-to-reveal features, live demo button, screenshot carousel, feature highlights on interaction.
- **CSS/Technical Keywords:** video element with controls, position: relative for overlays, hover reveal (opacity transition), step indicators, modal for full demo, screenshot lightbox, play button overlay
- **Implementation Checklist:** ☐ Demo video loads fast, ☐ Fallback for no-JS, ☐ Step indicators clear, ☐ Hover states obvious, ☐ Mobile touch friendly, ☐ Demo CTA prominent
- **Design System Variables:** --video-aspect-ratio: 16/9, --overlay-bg: rgba(0,0,0,0.7), --step-indicator-size: 32px, --play-button-size: 80px, --transition-duration: 300ms

### Result 3
- **Style Category:** Feature-Rich Showcase
- **Type:** Landing Page
- **Keywords:** Multiple feature sections, grid layout, benefit cards, visual feature demonstrations, interactive elements, problem-solution pairs
- **Primary Colors:** Primary brand, bright secondary colors for feature cards, contrasting accent for CTAs
- **Effects & Animation:** Card hover effects (lift/scale), icon animations on scroll, feature toggle animations, smooth section transitions
- **Best For:** Enterprise SaaS, software tools landing pages, platform services, complex product explanations, B2B products
- **Performance:** ⚡ Good
- **Accessibility:** ✓ WCAG AA
- **Framework Compatibility:** Tailwind 10/10, Bootstrap 9/10
- **Complexity:** Medium
- **AI Prompt Keywords:** Design a feature showcase landing page. Use: grid layout for features (3-4 columns), feature cards with icons, benefit-focused copy, alternating sections, comparison tables, interactive demos, problem-solution pairs.
- **CSS/Technical Keywords:** display: grid, grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)), gap: 2rem, card hover effects (translateY -4px), icon containers, alternating background colors
- **Implementation Checklist:** ☐ Feature grid responsive, ☐ Icons consistent style, ☐ Card hover effects smooth, ☐ Alternating sections contrast, ☐ Benefits clearly stated, ☐ Mobile stacks properly
- **Design System Variables:** --card-padding: 2rem, --card-radius: 12px, --icon-size: 48px, --grid-gap: 2rem, --section-padding: 4rem 0, --hover-transform: translateY(-4px)

