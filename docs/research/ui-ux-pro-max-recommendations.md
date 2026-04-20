# UI UX Pro Max — Minimal Concept Recommendations

> **Project:** Vault Maison — "Minimal Machine" concept enhancement
> **Skill:** `ui-ux-pro-max` (`docs/research`)
> **Generated:** Apr 2026 — Agent 1 (Claude · Homepage + Design System)
> **Branch:** `feature/minimal-ui-enhancement`

This document is the canonical record of the UI/UX research that drives the
Phase-2 design enhancements for the **`/minimal`** experience. It is the
source of truth for design tokens, motion language, and the four new
homepage primitives (`MarqueeText`, `MagneticButton`, `GlitchText`,
`SmoothCounter`).

---

## 1. Project Brief

| Dimension | Decision |
| --- | --- |
| **Concept name** | Minimal Machine |
| **Style fusion** | Brutalist × Editorial × Liquid-Precision |
| **Audience** | Premium / luxury jewellery buyers — design-literate |
| **Tone** | Restrained, technical, confident, calm |
| **Anti-tone** | Ornate, glossy, gold-flecked, "Instagram luxury" |

**Why this fusion?**
The brutalist baseline (raw, instant, anti-design) gives the site its
unmistakable signature; the editorial layer (large negative space,
typographic scale, slow camera) prevents the harshness from feeling
hostile; and the liquid-precision micro-layer (60-fps physics, springs,
sub-300 ms hovers) gives the brand its "machine" quality — every
interaction snaps with mechanical certainty.

---

## 2. Research Inputs

The following four `ui-ux-pro-max` queries seeded the system. Output
preserved verbatim where helpful.

### 2.1 Design system search
`python3 search.py "luxury jewelry brutalist minimal monochrome" --design-system -p "Minimal Machine"`

| Field | Recommendation |
| --- | --- |
| Pattern | **Minimal Single Column** — single CTA focus, large type, lots of whitespace |
| Style | **Liquid Glass** — premium e-comm, fluid 400–600 ms curves, dynamic blur |
| Color strategy | Monochrome + accent. Buttons ≥ 7:1 contrast. Text black/dark grey |
| Heading font | Space Mono (raw / technical) |
| Body font | Space Mono (technical mono baseline) |
| Anti-patterns | Vibrant block-based, playful colors |

> **How we adapted it:** We keep the *strategy* (single-column hero,
> 7:1 contrast, mono accent) but reject the suggested fonts (Space Mono
> as body is poor for long copy) in favour of **Inter (primary) +
> SF Mono (mono accent)** — already wired into `design-system.ts`. We
> also reject Liquid Glass effects (translucency, chromatic aberration)
> as they conflict with the brutalist hard-edge brief.

### 2.2 Brutalism style
`python3 search.py "brutalism" --domain style`

> Raw, unpolished, stark, high contrast. Sharp corners (`0px`), no
> transitions (or instant), bold typography (700+), visible borders
> (2-4 px), asymmetric. Performance: ⚡ excellent. WCAG AAA capable.

| Brutalist tenet | Our take |
| --- | --- |
| Sharp corners (0 px) | ✅ Enforced repo-wide. No `rounded-*` utilities |
| Instant transitions | ⚠ Selective — we use *snap* on buttons (no transition on hover invert) but allow 200–600 ms physics elsewhere for premium feel |
| Bold weight (700+) | ⚠ Inverted — we use **100–300** weights at huge sizes. The brutalism comes from scale, not weight |
| Pure primary colors | ❌ Replaced with monochrome only — luxury cue |
| Visible 2–4 px borders | ⚠ Reduced to 1 px hairlines (E5E5E5) — luxury restraint |
| Asymmetric layout | ✅ Hero is 55 / 45 split; sections alternate alignment |

### 2.3 Typography pairings
`python3 search.py "minimal geometric sans-serif luxury" --domain typography`

Three pairings returned. Decision matrix:

| Pairing | Heading / Body | Verdict |
| --- | --- | --- |
| Luxury Serif | Cormorant + Montserrat | Too "Instagram-luxury", elegance over precision |
| Real Estate Luxury | Cinzel + Josefin Sans | Cinzel is too ceremonial / wedding-y |
| Luxury Minimalist | Bodoni Moda + Jost | Closest to brief — but Bodoni is fashion-editorial, not machine |

**Resolved decision:** **Inter** (300–700) for everything textual, plus
**SF Mono** for labels, indices, and stats. Inter's geometric roots,
true-italic, and tabular-nums make it the optimal "machine + luxury"
single-family choice. SF Mono adds the analytical/technical accent
(carat numbers, "07 / 10" indices, stat callouts).

### 2.4 Interactive cursor design
`python3 search.py "interactive cursor design" --domain style`

> Cursor as tool. Magnetic pull (~100 px), morph on hover, scale,
> blend-mode (`difference`). Performance: ⚡ good. Accessibility:
> ⚠ touch / SR fallback required.

| CSS variable | Value adopted |
| --- | --- |
| `--cursor-size` | 20 px |
| `--cursor-hover-scale` | 1.5 |
| `--magnetic-distance` | 100 px |
| `--blend-mode` | `difference` (already used by `MinimalCursor`) |

**Touch fallback:** all magnetic effects are disabled on
`(pointer: coarse)` and `(prefers-reduced-motion: reduce)`.

### 2.5 Animation accessibility (UX guidelines)
`python3 search.py "animation accessibility prefers-reduced-motion" --domain ux`

| Issue | Severity | Our rule |
| --- | --- | --- |
| Reduced motion not respected | **High** | Every motion primitive uses `useReducedMotionPreference`. No exceptions. |
| Excessive motion (5+ animated elements / view) | **High** | Max 1 hero anim + ≤3 secondary anims per viewport |
| Linear easing | Low | Default to `power3.out` (GSAP) / `cubic-bezier(0.16, 1, 0.3, 1)` for camera moves; springs for direct-manipulation |

---

## 3. Final Design System (synthesised)

### 3.1 Colors (frozen)
```
#FFFFFF  bg
#FAFAFA  hoverBg / soft surface
#E5E5E5  border / hairline
#9B9B9B  textMuted
#6B6B6B  textSecondary
#050505  text / fg
```
**Forbidden:** any non-greyscale token, all gradients, `backdrop-blur`
chromatic aberration, `bg-gold*` legacy tokens.

### 3.2 Type scale (CSS clamp, 16 → 160 px)
- Hero: `clamp(52px, 10vw, 160px)` weight 100, tracking −0.05em
- Section: `clamp(28px, 3.5vw, 48px)` weight 200, tracking −0.03em
- Body: 14–15 px weight 300, line-height 1.7–1.8
- Label: 10–11 px mono, tracking 0.20–0.30em, uppercase

### 3.3 Motion vocabulary (NEW — to be added in `design-system.ts`)
| Token | Value | Use |
| --- | --- | --- |
| `easeOut` | `cubic-bezier(0.16, 1, 0.3, 1)` | hovers, image scale |
| `easeIn` | `cubic-bezier(0.7, 0, 0.84, 0)` | exits |
| `easeInOut` | `cubic-bezier(0.83, 0, 0.17, 1)` | accordion, drawer |
| `easeSnap` | `cubic-bezier(0.22, 1, 0.36, 1)` | brutalist UI snap |
| `springSoft` | `{ stiffness: 150, damping: 15, mass: 0.1 }` | magnetic pull |
| `springTight` | `{ stiffness: 260, damping: 20, mass: 0.5 }` | counter, cart bounce |
| `instant` | `0ms` | brutalist hover invert |
| `fast` | `150ms` | hover color change |
| `base` | `300ms` | most UI |
| `slow` | `600ms` | section reveals |
| `cinematic` | `1500ms` | counter, hero camera |

### 3.4 Spacing scale (NEW)
8-px baseline grid extended with fluid clamps for hero / section padding.
| Token | Value |
| --- | --- |
| `space.0` | `0` |
| `space.1` | `4px` |
| `space.2` | `8px` |
| `space.3` | `12px` |
| `space.4` | `16px` |
| `space.5` | `24px` |
| `space.6` | `32px` |
| `space.7` | `48px` |
| `space.8` | `64px` |
| `space.9` | `96px` |
| `sectionY` | `clamp(80px, 12vh, 160px)` |
| `containerX` | `clamp(20px, 5vw, 96px)` |

### 3.5 Layer / z-index policy
- 0 base content
- 10 sticky header
- 20 dropdowns / popovers
- 30 modals / drawers
- 40 toasts
- 50 cursor

---

## 4. New Homepage Primitives

Each primitive lives in `src/components/concepts/minimal/ui/`. All four:

1. Honor `prefers-reduced-motion`
2. Use **only** the frozen monochrome palette
3. Have **no border radius**
4. Use the new motion tokens
5. Avoid `initial={{ opacity: 0 }}` in Framer Motion (per repo rule —
   first-paint flash bug). Use clip-paths, `y` transforms, or skip the
   initial state entirely

### 4.1 `MarqueeText`
A horizontally scrolling brand band. Inspired by gallery wayfinding
boards. Black band, white type, 11 px mono, tracking 0.30em. Diamond
glyph (`◆`) as separator. CSS keyframes (no JS) — pauses on hover,
respects reduced motion (animation-play-state: paused).

### 4.2 `MagneticButton`
Spring-animated wrapper that pulls its child toward the cursor within a
100 px radius. Configurable `strength` and `radius`. Disabled on touch
and reduced motion. Uses `springSoft`. Renders a wrapping `motion.div`
without `initial` to avoid flash.

### 4.3 `GlitchText`
Brutalist hover effect: text duplicates into two RGB-style layers
(but in our case, *grey-shift* — using `#6B6B6B` and `#E5E5E5` instead
of red/blue) that offset by 2 px on `:hover` / `:focus`. No transition
in — only on hover, reverts to instant on reduced motion.

### 4.4 `SmoothCounter`
Replaces the existing inline `CountUp` in `minimal-home.tsx` with a
reusable component. Uses `requestAnimationFrame` + ease-out cubic over
1500 ms. `tabular-nums`, locale-formatted, prefix/suffix support. Lazy
starts only when in-view (`useInView`).

---

## 5. Integration plan for `minimal-home.tsx`

| Section | Insertion |
| --- | --- |
| Between Hero and Categories | New `MarqueeText` strip — full-bleed black band |
| Hero CTAs | Wrap "Shop Collection" / "Bespoke" links in `MagneticButton` |
| Hero headline | Wrap "Precision. Nothing More." in `GlitchText` (per-line) |
| Stats section | Replace inline `CountUp` with `SmoothCounter` |

The remaining sections (3D viewer, brand story, horizontal scroll,
collections, bestsellers, carousel, newsletter) are out of scope for
this enhancement.

---

## 6. Pre-delivery checklist

- [x] No emojis as icons (Lucide / SVG only)
- [x] `cursor-pointer` on all clickable elements
- [x] Hover transitions 150–300 ms (or instant where brutalist)
- [x] Light-mode body text contrast ≥ 4.5:1 (`#6B6B6B` on `#FFFFFF` = 5.74:1)
- [x] Focus states visible (`:focus-visible` with 2 px outline)
- [x] `prefers-reduced-motion` respected on every primitive
- [x] Responsive at 375, 768, 1024, 1440 px
- [x] No horizontal scroll on mobile (marquee is full-bleed by design)
- [x] No `border-radius` on any new primitive
- [x] No gradients, no gold accent
- [x] No `initial={{ opacity: 0 }}` in Framer Motion

---

## 7. References

- `docs/research/competitive-analysis/` — luxury-brand benchmarking
- `src/components/concepts/minimal/animations/*` — established motion primitives (TextReveal, StaggerReveal, ParallaxSection, HorizontalScroll)
- `src/components/concepts/minimal/cursor/MinimalCursor.tsx` — existing custom cursor (blend-mode: difference)
- Skill: `/Users/hardiklukhi/code/vault-maison/.cursor/skills/ui-ux-pro-max/SKILL.md`
