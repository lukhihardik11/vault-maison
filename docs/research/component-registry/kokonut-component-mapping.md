# KokonutUI Component Mapping for Minimal Machine

## All 22 Components Analyzed

| # | File | Component | Dependencies | Verdict |
|---|------|-----------|-------------|---------|
| 15 | CardFlip | 3D flip card, hover reveal features | lucide, cn, useState, styled-jsx | **USE** → Product cards on Collections/Category |
| 16 | CardStack | Stacked cards fan out on click | motion/react, cn, useState | **USE** → Homepage featured products |
| 17 | BentoGrid | Multi-feature bento layout | motion/react, lucide, cn, custom icons | **SKIP** — too many custom icon deps (Anthropic, OpenAI etc.) |
| 18 | SpotlightCards | 3D tilt feature grid with glow | motion/react, lucide, cn, useRef | **USE** → About page features, Craftsmanship |
| 19 | Toolbar | Design-tool toolbar | motion/react, lucide, cn | **SKIP** — wrong semantic (design tools, not commerce) |
| 20 | SmoothTab | Animated tab switcher | motion/react, lucide, cn | **USE** → FAQ page (tab categories), Product Detail (specs tabs) |
| 21 | ProfileDropdown | Account dropdown menu | lucide, next/image, Radix dropdown, custom icons | **SKIP** — too many shadcn/Radix deps |
| 22 | ActionSearchBar | Command-palette search | motion/react, lucide, Input primitive, useDebounce | **USE** → Search page (adapted without shadcn Input) |
| 23 | SmoothDrawer | Animated bottom drawer | motion/react, lucide, shadcn Button/Drawer | **SKIP** — heavy shadcn dependency |
| 24 | AvatarPicker | Profile setup with avatar selection | motion/react, lucide, shadcn Card/Button/Input | **SKIP** — wrong semantic (profile setup) |
| 25 | ScrollText | Scroll-reveal text list | motion/react, cn, IntersectionObserver | **USE** → Homepage brand values, About page |
| 26 | TypewriterTitle | Typing/deleting text loop | motion/react, useState, useRef | **USE** → Homepage hero tagline |
| 27 | MatrixText | Binary matrix text animation | motion/react, cn | **SKIP** — too techy/gimmicky for luxury |
| 28a | MorphicNavbar | Animated nav | clsx, next/link | **SKIP** — incomplete/broken code |
| 28b | DynamicText | Greeting cycler | motion/react | **SKIP** — multilingual greeting, wrong use case |
| 28c | ShimmerText | Shimmer text effect | motion/react, cn | **CONSIDER** → Subtle heading enhancement |
| 28d | SwooshText | Multi-shadow text hover | motion/react, cn | **SKIP** — too flashy for minimal |
| 28e | ParticleButton | Click particle effect | motion/react, lucide, shadcn Button | **SKIP** — needs shadcn Button |
| 29 | AttractButton | Magnetic particle button | motion/react, lucide, shadcn Button | **SKIP** — violet themed, wrong aesthetic |
| 30 | SocialButton | Expanding social share | motion/react, lucide, shadcn Button | **SKIP** — needs shadcn Button |
| 31 | SwitchButton | Theme toggle | next-themes, lucide, shadcn Button | **SKIP** — we force light mode |
| 32 | (same as 31) | — | — | — |
| 33 | MinimalHeroSection (Bento3) | Monochrome hero with grid bg | React only (no motion) | **USE** → Homepage hero section (adapted) |
| 34 | GlassmorphismMetrics | Glassmorphism stats cards | framer-motion, shadcn Badge/Button/Card | **ADAPT** → About page metrics (strip shadcn) |
| 35 | HeroFashion | Editorial fashion hero | motion/react only | **USE** → Homepage hero (primary candidate) |
| 36 | SlideTextButton | Vertical text-swap CTA | motion/react, next/link, cn | **USE** → CTAs across all pages |

## Final Selection — Best Match Per Page

### Homepage
1. **HeroFashion** (35) — 2-column editorial hero with oversized brand name, category list, seasonal text. Adapted for jewelry.
2. **TypewriterTitle** (26) — Animated tagline: "Diamonds" → "Gold" → "Eternity"
3. **AppleCarousel** (existing in repo) — Horizontal product showcase rail
4. **CardStack** (16) — Featured collection stack, click to fan out
5. **SlideTextButton** (36) — "Explore Collection" / "Book Appointment" CTAs

### About Page
1. **SpotlightCards** (18) — 6 brand values with 3D tilt, glow, icons
2. **ScrollText** (25) — Brand philosophy scroll-reveal
3. **SlideTextButton** (36) — CTA to contact

### Collections Page
1. **CardFlip** (15) — Category cards that flip to show product count + description
2. **SlideTextButton** (36) — "View All" CTAs

### Category Pages
1. **SmoothTab** (20) — Sort/filter tabs (Price, New, Popular)
2. Existing MinimalProductCard with hover improvements

### Product Detail
1. **SmoothTab** (20) — Specs/Details/Care tabs
2. **AppleCarousel** (existing) — Related products rail

### Search
1. **ActionSearchBar** (22) — Adapted without shadcn Input, using native input
2. Keyboard navigation, animated results

### FAQ
1. **SmoothTab** (20) — Category tabs (Ordering, Shipping, Returns, Care)
2. Animated accordion items

### Journal
1. **CardFlip** (15) — Article cards with flip preview
2. **AppleCarousel** (existing) — Featured articles rail

### Contact / Bespoke
1. **SlideTextButton** (36) — Form submit CTAs
2. Clean form with motion transitions

### Craftsmanship
1. **SpotlightCards** (18) — Process steps with icons
2. **ScrollText** (25) — Artisan philosophy

### All Pages (shared)
1. **SlideTextButton** (36) — Universal CTA component
