# UI UX Pro Max — Recommendations for "Minimal Machine"

> **Concept:** `minimal` (Vault Maison)
> **Branch:** `feature/minimal-ui-enhancement-claude-v2`
> **Source skill:** `.cursor/skills/ui-ux-pro-max`
> **Generated:** Apr 19, 2026
> **Scope:** Homepage + global design tokens + premium UI primitives.

---

## 1. Executive Summary

The Minimal Machine is a **brutalist-luxury hybrid** for a precision-cut diamond house.
Vault Maison's existing minimal concept already has the right bones: monochrome palette
(`#FFFFFF / #050505 / #6B6B6B / #9B9B9B / #E5E5E5`), Inter sans + monospace mono,
zero-radius geometry, and zero-bullshit copy ("Precision. Nothing More.").

The recommendations below tighten the design language by:

1. Codifying **motion grammar** (easing, durations, micro-interactions).
2. Adding a small set of **premium UI primitives** (`MarqueeText`, `MagneticButton`,
   `GlitchText`, `SmoothCounter`) that match the brutalist register without breaking
   the monochrome contract.
3. Hardening the **spacing scale** so every section breathes on the same rhythm.

Everything respects `prefers-reduced-motion`, ships with `cursor-pointer` on
interactive surfaces, and avoids the four foot-guns flagged by the skill (no
emojis-as-icons, no scale-on-hover layout shifts, no rounded corners, no transitions
slower than 500 ms).

---

## 2. Pattern — `Minimal Single Column`

| Aspect | Value |
| --- | --- |
| **Conversion focus** | Single CTA per section, oversized typography, generous whitespace |
| **CTA placement** | Lead-aligned in hero, centered in mid-funnel sections |
| **Color strategy** | Pure monochrome (no accent) — all hierarchy from weight + scale |
| **Section rhythm** | Hero → Categories → Featured → 3D → Philosophy → Curated → Collections → Trust → Bestsellers → New → Newsletter |

### Application to Minimal Machine

The existing `minimal-home.tsx` already follows this pattern. The enhancement
adds **rhythm punctuation** between sections:

- A `MarqueeText` band between the hero and the category grid acts as a
  brutalist "title card" — high-density type at constant motion that
  intentionally contrasts the silent hero typography.
- `MagneticButton` raises the perceived tactility of CTAs without breaking the
  zero-radius rule (the magnet pulls the *content*, not the box).

---

## 3. Style — `Brutalism × Restraint`

The skill recommended two complementary styles:

### 3a. Brutalism (selected as the primary register)

| Token | Value |
| --- | --- |
| `border-radius` | `0px` everywhere |
| `transition-duration` | Either `0s` (instant invert) or smooth `300–600 ms` for content reveal |
| `font-weight` | Mix `100/200` (display) + `500/700` (utility) — Vault uses `100/400/500` |
| `colors` | Monochrome only — no primaries |
| `borders` | Visible 1 px, never dashed |
| `grid` | Implied by content baseline, occasionally exposed via dividers |
| Performance | ⚡ Excellent | A11y | ✓ WCAG AAA |

### 3b. Interactive Cursor Design (selected as a *garnish*)

The site already ships a `MinimalCursor` overlay; we extend the effect with
**magnetic pull** on primary CTAs. The skill specifies:

- `--magnetic-distance: 100px` — only activates when pointer is within 100px.
- `--cursor-hover-scale: 1.5` — already handled by the existing cursor.
- Touch fallback: motion is gated on `(pointer: fine)` + `(hover: hover)`.

> ⚠ **Avoided styles:** Liquid Glass (off-brand, performance-poor), playful
> colors, vibrant blocks. The first design-system search surfaced "Liquid Glass"
> as the top style match for the literal query — we override that based on
> brand identity (Vault is brutalist, not glassy).

---

## 4. Typography — Stay the Course

The skill suggested Cormorant + Montserrat or Bodoni Moda + Jost for
"luxury minimalism." Both are gorgeous, but Vault Maison's Inter + SF Mono pair
already nails the brutalist-precision register the brand wants. Recommendation:
**do not change fonts** — instead, codify the motion + spacing layer.

| Tier | Font | Weight | Use |
| --- | --- | --- | --- |
| Display | Inter | 100 | Hero headlines, CountUp values |
| Heading | Inter | 200 | Section titles, featured product |
| Body | Inter | 400 | Long-form copy |
| Label | Inter | 500 | Buttons, eyebrows, badges |
| Mono | SF Mono | 400 | Index numbers, tickers, labels |

> Future option: introduce a **single optional display face** (e.g. a
> brutalist/grotesk like `Space Grotesk` or `PP Neue Machina`) for the marquee
> and glitch headline only, gated behind `font-display: swap` — out of scope
> for this PR.

---

## 5. Color Tokens — Locked

| Token | Hex | Use |
| --- | --- | --- |
| `bg` | `#FFFFFF` | Default canvas |
| `text` | `#050505` | Primary type |
| `textSecondary` | `#6B6B6B` | Body |
| `textMuted` | `#9B9B9B` | Eyebrows, meta |
| `border` | `#E5E5E5` | Dividers, inputs |
| `hoverBg` | `#FAFAFA` | Section bands |
| (new) `surfaceInverse` | `#050505` | Dark sections |
| (new) `textInverse` | `#FFFFFF` | Type on dark |
| (new) `borderStrong` | `#050505` | Brutalist outlines |

**No gold. No gradients. No accent.** The hierarchy comes from weight, scale,
and whitespace.

---

## 6. Motion Grammar (NEW)

Currently animations are tuned per-component, leading to slight inconsistency.
The new design tokens add a **shared motion vocabulary**:

### 6a. Easings

| Token | Cubic Bezier | Use |
| --- | --- | --- |
| `easing.out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for entering elements |
| `easing.in` | `cubic-bezier(0.7, 0, 0.84, 0)` | Default for exiting elements |
| `easing.inOut` | `cubic-bezier(0.65, 0, 0.35, 1)` | Position changes |
| `easing.standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Material-style for hovers |
| `easing.brutal` | `cubic-bezier(0.85, 0, 0.15, 1)` | Snappy, mechanical (marquee, glitch) |

### 6b. Durations

| Token | ms | Use |
| --- | --- | --- |
| `motion.instant` | `0` | Brutalist hover invert |
| `motion.fast` | `120` | Micro-interactions (tab focus, badge bump) |
| `motion.standard` | `200` | Color changes, default UI transitions |
| `motion.medium` | `400` | Card lifts, accordion |
| `motion.slow` | `700` | Hero reveals, image scales |
| `motion.long` | `1500` | Counter increments, marquees |

### 6c. Magnetic + Glitch Constants

| Token | Value | Use |
| --- | --- | --- |
| `magnetic.distance` | `120px` | Pointer radius that triggers magnetic pull |
| `magnetic.strength` | `0.35` | Lerp factor (0 = none, 1 = full) |
| `magnetic.lift` | `1.04` | Subtle scale of *content* (not box) |
| `glitch.amplitude` | `2px` | RGB-style horizontal shift |
| `glitch.frequency` | `60ms` | How often a glitch frame fires |
| `glitch.duration` | `350ms` | Total glitch burst length |

### 6d. Reduced-Motion Contract

Every new primitive **must** check `prefers-reduced-motion: reduce`. When set:

- `MarqueeText` becomes a static, centered headline.
- `MagneticButton` ignores pointer position entirely.
- `GlitchText` skips the displacement and just applies the rest state.
- `SmoothCounter` jumps straight to the final value.

---

## 7. Spacing Scale (NEW)

The hero uses `clamp()` calls inline. Codifying the scale lets every new
component participate in the same rhythm.

| Token | Value | Use |
| --- | --- | --- |
| `space.xs` | `4px` | Icon ↔ label nudges |
| `space.sm` | `8px` | Tight stacks |
| `space.md` | `16px` | Default control padding |
| `space.lg` | `24px` | Inter-element |
| `space.xl` | `40px` | Section sub-blocks |
| `space.2xl` | `64px` | Section gaps |
| `space.3xl` | `96px` | Major rhythm beats |
| `space.4xl` | `144px` | Hero / philosophy |

Plus a tiny `clampSpace()` helper documented in code: returns
`clamp(min, fluid, max)` for fluid section padding.

---

## 8. Components Sourced (Step 3 of agent prompt)

The 21st.dev "magic" MCP is configured at `.cursor/mcp.json` for this repo, but
it was not active in the current Cursor session, so each component is built
**from scratch** following the patterns the MCP would surface. Each is placed
under `src/components/concepts/minimal/ui/` and adheres to the design contract.

### 8a. `MarqueeText.tsx`

> **Pattern:** Brutalist scrolling band of high-density type that acts as a
> bridge between sections. Uses `transform: translate3d` + `requestAnimationFrame`
> for buttery 60 fps scroll. Pause on hover. Mirror direction on alternate
> instances.

- **Props:** `text`, `direction` ("left" | "right"), `speed`, `separator`,
  `tone` ("light" | "dark"), `pauseOnHover`.
- **Reduced motion:** Renders centered static headline.

### 8b. `MagneticButton.tsx`

> **Pattern:** Wraps an existing brutal CTA. On `pointermove`, lerps the
> *inner content* toward the cursor (within 120 px, capped at ~10 px max
> displacement) so the button feels alive — without breaking the zero-radius
> visual contract or causing layout shift.

- **Props:** `as` (Link | button), `tone` ("primary" | "secondary"), `strength`,
  `radius`, all anchor/button HTML attrs.
- **Reduced motion:** No magnetic effect.
- **Touch:** Magnetic disabled when `(hover: none)`.

### 8c. `GlitchText.tsx`

> **Pattern:** Brutalist text effect that runs a brief RGB-style displacement
> on hover (or on demand). No color used — just two monochrome layers offset
> with `mix-blend-mode: difference`-equivalent stacking, so it remains pure
> black/white.

- **Props:** `text`, `as`, `intensity`, `trigger` ("hover" | "view" | "manual").
- **Reduced motion:** Renders flat text.
- **A11y:** Aria-hidden on the duplicated layers; original text remains
  selectable + screen-reader friendly.

### 8d. `SmoothCounter.tsx`

> **Pattern:** Easing-based number counter with locale formatting, supports
> currency / percent / suffix modes. Uses a single `useReducedMotionPreference`
> hook to short-circuit to the final value when needed. Triggers via
> `useInView`.

- **Props:** `value`, `from`, `suffix`, `prefix`, `duration`, `easing`,
  `format` (function), `tabularNums` (bool).
- **Reduced motion:** Snaps to `value` immediately.

> The existing `CountUp` defined inline in `minimal-home.tsx` is replaced by
> `SmoothCounter` for richer formatting + token-driven duration/easing.

---

## 9. Integration Plan (Step 4)

| Section | Change |
| --- | --- |
| **Hero** | Wrap headline in `GlitchText`; replace primary CTAs with `MagneticButton`. |
| **Bridge (new)** | Insert `MarqueeText` between hero and Categories — running double track of brand keywords. |
| **Stats** | Replace inline `CountUp` with `SmoothCounter` (uses new motion tokens). |
| **Newsletter Subscribe** | Wrap "Subscribe" with `MagneticButton`. |

No other sections are touched — Agent 2 owns product/cart/checkout, Agent 3
owns nav/footer/layout.

---

## 10. Pre-Delivery Checklist

- [x] No emojis as icons (lucide-react only).
- [x] `cursor-pointer` on all clickable elements (buttons, links, magnetic CTAs).
- [x] Hover states use either instant invert (brutalist) or 200–300 ms
      transitions; no slow-mo.
- [x] Light-mode text contrast ≥ 4.5 : 1 (`#050505` on `#FFFFFF` = 19.7 : 1).
- [x] Focus states preserved by underlying anchor/button (no `outline: none`).
- [x] `prefers-reduced-motion` respected across all new primitives.
- [x] Responsive: clamp + breakpoints at 375 / 768 / 1024 / 1440.

---

## 11. Anti-Patterns to Avoid

| Don't | Reason |
| --- | --- |
| Liquid glass / chromatic aberration | Off-brand for brutalist-luxury, perf cost |
| Color accents (gold, blue, etc.) | Monochrome contract |
| Rounded corners > 0 | Breaks zero-radius rule |
| Scale-on-hover that shifts layout | Layout instability + jitter |
| `initial={{ opacity: 0 }}` in Framer Motion | First-paint flash; use clip-path/transform reveal |
| Linear easing on UI transitions | Robotic; use `easing.out` / `easing.standard` |
| Animating 5+ elements simultaneously | Motion sickness; max 1–2 per fold |

---

## 12. Source Searches (raw)

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py \
  "luxury jewelry brutalist minimal monochrome" \
  --design-system -p "Minimal Machine"

python3 .cursor/skills/ui-ux-pro-max/scripts/search.py \
  "brutalism" --domain style

python3 .cursor/skills/ui-ux-pro-max/scripts/search.py \
  "minimal geometric sans-serif luxury" --domain typography

python3 .cursor/skills/ui-ux-pro-max/scripts/search.py \
  "interactive cursor design" --domain style

python3 .cursor/skills/ui-ux-pro-max/scripts/search.py \
  "animation accessibility reduced motion" --domain ux
```

Each search returned data that informed the tokens + components in this PR.
