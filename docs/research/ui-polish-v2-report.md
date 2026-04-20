# UI Polish v2 — Execution Report

> Companion to `ui-polish-v2-recommendations.md`. Summary of what was integrated, what was rejected, what was normalized, and why.
>
> **Branch:** `feat/minimal-ui-polish-v2`
> **Commit message:** `feat(minimal): UI polish v2 — 21st.dev Card3D + HoverPeekList, token normalization, UI UX Pro Max parallax tokens + focus-visible`

---

## 1. 21st.dev component search

The `21st.dev` Magic MCP (`.cursor/mcp.json`) **was unreachable** in this environment — every `component_inspiration` and `component_builder` call returned `fetch failed`. The user compensated by copy-pasting snippets by hand from the 21st.dev website. Snippets evaluated below.

### Search results (honest)

| Search term | MCP reachable? | User-provided snippet? | Integrated? | Why / why not |
| --- | --- | --- | --- | --- |
| `marquee text scroll` | ❌ `fetch failed` | no | n/a | existing `MarqueeText.tsx` left as-is — prior pass already built a clean version |
| `magnetic button hover` | ❌ `fetch failed` | no | n/a | existing `MagneticButton.tsx` left as-is |
| `product card tilt 3d` | ❌ `fetch failed` | **yes** — `3d-card-effect.tsx` (Aceternity pattern) | ✅ **yes, as `Card3D.tsx`** | composable 3-piece primitive (`CardContainer` / `CardBody` / `CardItem`) with translateZ-layered children. Adapted for monochrome + reduced-motion + coarse-pointer no-op. Integrated on the homepage **Featured Piece** image |
| `product card tilt 3d` (alternate) | ❌ `fetch failed` | yes — `3d-tilt-card.tsx` | ⛔ **rejected** | redundant with the existing `TiltCard.tsx`; also contains an image-upload control that doesn't belong on a product site |
| `image reveal hover` | ❌ `fetch failed` | no | n/a | existing `ImageReveal.tsx` left as-is; already scoped to the category grid (correct pattern for that surface) |
| `text scramble animation` | ❌ `fetch failed` | no | n/a | `GlitchText.tsx` already covers brutalist-style text glitch on hover |
| `smooth accordion` | ❌ `fetch failed` | no | n/a | existing `SmoothAccordion.tsx` is functional |
| `cursor follower dot` | ❌ `fetch failed` | no | — | intentionally dropped in the preceding PR (native OS cursor preferred). Also **normalized** this pass — killed the orphan `MinimalCursor.tsx` that a prior agent re-added without wiring |
| `progress bar scroll` | ❌ `fetch failed` | no | n/a | existing `ScrollProgress.tsx` left as-is |
| `back to top button` | ❌ `fetch failed` | no | n/a | existing `BackToTop.tsx` left as-is |
| `page transition fade` | ❌ `fetch failed` | no | n/a | existing `PageTransition.tsx` left as-is; previous PR fixed its transform-ancestor bug that was breaking `position:sticky` |
| `selected work hover list` | ❌ `fetch failed` | **yes** — `project-showcase.tsx` | ✅ **yes, as `HoverPeekList.tsx`** | editorial list with cursor-following image preview. Adapted (see §2), integrated on the homepage as the new **Signature** section between the Philosophy band and the Curated Selection horizontal scroll |
| (decorative photo deck) | ❌ `fetch failed` | yes — `3d-card.tsx` | ⛔ **rejected** | uses the Zeyada handwriting font, which clashes with the strict Inter + SF Mono type system; also ships a gradient grid background that clashes with the strict monochrome surface |
| (glass product card) | ❌ `fetch failed` | yes — `card-7.tsx` / `InteractiveProductCard` | ⛔ **rejected** | heavy glassmorphism + `rounded-3xl` + `bg-gradient-to-t` — so much would be stripped to meet our design rules that the result would no longer resemble the original |
| (social card) | ❌ `fetch failed` | yes — `social-card.tsx` | ⛔ **rejected** | purely social (Instagram/Twitter/Discord), colorful hover animations — wrong fit for luxury jewelry |

**Honest summary:** 2 snippets integrated, 4 rejected for strong design-rule conflicts, 0 fabricated.

---

## 2. Integrations — what changed & what was adapted

### 2.1 `HoverPeekList.tsx` (new)

Editorial list with cursor-following image preview (sourced from 21st.dev `project-showcase.tsx`).

Adapted away from the upstream:

- removed all `rounded-*` (sharp edges)
- removed `bg-gradient-to-t from-background/20` (no gradients)
- shadcn theme tokens (`bg-secondary`, `text-muted-foreground`, …) → `minimal.colors.*`
- hardcoded transition timings → `minimal.motion.duration.*` + `motion.ease.out`
- added `prefers-reduced-motion` + `pointer: coarse` fallback — AT / touch users get a plain static list, no preview
- **fixed a positioning bug in the upstream:** the original computed the preview's `left/top` from `containerRef.current?.getBoundingClientRect()` **inline in the `style` prop**, which doesn't re-run on scroll. Switched the preview to `position: fixed` with raw `clientX/Y` — correct under page scroll, and fewer render cycles
- fixed a React-type issue: the upstream used `scale:` directly on the style object (not a valid `React.CSSProperties` key). Composed everything into `transform` instead

Integrated on the homepage as a new **Signature** section (`minimal-home.tsx`):

```
[ Hero ] → [ Marquee ] → [ Categories ] → [ Featured Piece ]
  → [ 3D Viewer ] → [ Philosophy / dark ]
  →  NEW: [ Signature / HoverPeekList (4 bestsellers) ]
  → [ Curated Selection / horizontal scroll ]
  → [ Collections ] → [ 4Cs metrics ] → [ Bestsellers grid ]
  → [ New Arrivals ] → [ Newsletter ]
```

Positioned deliberately as the bridge between the dark Philosophy band and the pinned Curated Selection scroll — a quieter editorial beat that breaks up the grid-heavy middle of the homepage.

### 2.2 `Card3D.tsx` (new)

3-piece 3D-tilt primitive (sourced from 21st.dev `3d-card-effect.tsx` — Aceternity pattern):

- `CardContainer` — sets up `perspective: 1000px`, rotates its child on mousemove
- `CardBody` — the tilting plane (`transform-style: preserve-3d`)
- `CardItem` — children float at a configurable `translateZ` depth
- `useMouseEnter` — context hook

Adapted away from the upstream:

- hardcoded `duration-200 ease-linear` → `minimal.motion.duration.fast` + `motion.ease.out`
- `useMouseEnter` no longer **throws** outside a `CardContainer` — returns `[false, noop]` and logs a dev-only warning. Graceful degradation instead of a hard crash
- added `prefers-reduced-motion` **and** `pointer: coarse` no-op: the tilt is a progressive enhancement, never a dependency for content readability
- dropped `rounded-xl` from the demo; border radius is now consumer-controlled (so this primitive is reusable in the minimal sharp-cornered concept AND any other surface)
- swapped the polymorphic `<TagComponent>` JSX for `React.createElement(Tag, ...)` because React 19 strict typing rejected `children` on a dynamic `React.ElementType` tag

Integrated on the homepage **Featured Piece** (`minimal-home.tsx` §3) — wraps the product image so it tilts on hover. Composes with the existing `ParallaxSection` scroll-depth effect because they target different DOM layers.

---

## 3. UI UX Pro Max recommendations applied

All three CLI searches were run. Full output in `ui-polish-v2-recommendations.md`. Action items extracted:

### 3.1 Parallax speed tokens (from the scroll-animation search)

Tool recommended:

```
--parallax-speed-bg: 0.3
--parallax-speed-mid: 0.6
--parallax-speed-fg: 1.0
```

Added to `design-system.ts` as `minimal.motion.parallax.{bg, mid, fg}` with JSDoc explaining the intent. Consumed by:

- `ParallaxSection` default `speed` → now `minimal.motion.parallax.bg`
- `ParallaxImage` default `speed` → now `minimal.motion.parallax.bg`
- `minimal-home.tsx` Hero parallax call → `speed={minimal.motion.parallax.bg}` (replacing hardcoded `0.15`)
- `minimal-home.tsx` Featured Piece parallax → `speed={minimal.motion.parallax.bg}` (replacing hardcoded `0.1`)

### 3.2 Focus-visible outline (from the design-system search pre-delivery checklist)

The CLI explicitly lists "Focus states visible for keyboard nav" as a pre-delivery must-have. We didn't have a global rule. Added to `MinimalLayout.tsx`:

```css
.minimal-concept a:focus-visible,
.minimal-concept button:focus-visible,
.minimal-concept input:focus-visible,
.minimal-concept textarea:focus-visible,
.minimal-concept select:focus-visible,
.minimal-concept [role="button"]:focus-visible,
.minimal-concept [tabindex="0"]:focus-visible {
  outline: 1px solid #050505;
  outline-offset: 2px;
}
```

Verified in Puppeteer — tabbing to a link now shows a solid 1 px black outline. Mouse users are unaffected (it's `:focus-visible`, not `:focus`).

### 3.3 Smooth anchor scrolling

Added `html { scroll-behavior: smooth; }` with a reduced-motion override, so the `Back to Top` button and any `#fragment` links glide instead of jump. Respects `@media (prefers-reduced-motion: reduce)` by resetting to `auto`.

### 3.4 Recommendations deliberately **not** applied

- **Suggested style "Liquid Glass"** (translucency, chromatic aberration, morphing blur) — conflicts with the brutalist-monochrome brief. Same position as the earlier pass.
- **Suggested font "Space Mono"** — too raw for long body copy; we keep Inter + SF Mono.
- **Brutalist 700+ font weight** — we invert brutalism here: scale carries the brand, not weight. Weights stay 100–500.
- **Pure primary colors (red/blue/yellow)** — off-palette. Monochrome only.
- **2–4 px visible borders** — softened to 1 px hairlines (`#E5E5E5`).

---

## 4. Normalization work (the other half of this PR)

The previous polish pass (merged as PR #67) left some debris. Cleaned up:

| Issue | Fix |
| --- | --- |
| `src/components/concepts/minimal/cursor/MinimalCursor.tsx` exists as 237-line orphan (re-added by a prior agent after the kill-cursor PR; not imported by `MinimalLayout` or anywhere else) | **deleted** the file and the now-empty `cursor/` directory |
| `design-system.ts` had `cursor: { size, hoverScale, magneticRadius, blendMode }` — referenced the deleted component | replaced with focused `magnetic: { radius }` (still consumed by `MagneticButton`) |
| `MagneticButton.tsx` referenced `minimal.cursor.magneticRadius` | swapped to `minimal.magnetic.radius` |
| Hardcoded out-of-palette hex `#F0F0F0` in `MinimalProductCard.tsx`, `Skeleton.tsx`, `minimal-home.tsx` | normalized to `#E5E5E5` (the palette border token) |
| Hardcoded `#ABABAB` (×2) in `minimal-home.tsx` hero index numbers | normalized to `#9B9B9B` (the palette `textMuted`) |
| Hardcoded `#333333` divider on dark brand-story band | normalized to `#6B6B6B` (palette `textSecondary`) |
| Hardcoded `#0A0A0A` in `Minimal3DViewer.tsx` fallback | normalized to `#050505` (palette `text`) |
| Parallax speeds `0.15` and `0.1` hardcoded in `minimal-home.tsx` | moved to `minimal.motion.parallax.bg` |

A grep pass confirms the remaining off-palette hexes live exclusively in **unused** UI primitives (`SocialButton`, `AttractButton`, `AvatarPicker`) that are exported from the barrel but imported by nothing. They should be swept in a future dead-code pass; leaving them here would balloon the diff without touching production.

---

## 5. Verification

`next build` → ✓ compiled in 4.3s, ✓ TypeScript in 10s, ✓ 369 static pages, no warnings.

Real-browser checks via `scripts/verify-polish-v2.mjs` (Puppeteer against the dev server) across 1440 / 768 / 375 px:

| Check | 1440 | 768 | 375 |
| --- | --- | --- | --- |
| Signature section present | ✅ | ✅ | ✅ |
| Featured Piece still intact (image + Discover CTA) | ✅ | ✅ | ✅ |
| No horizontal scrollbar | ✅ | ✅ | ✅ |
| `:focus-visible` outline computed `solid` | ✅ | ✅ | ✅ |
| Page errors (`window.pageerror`) | 0 | 0 | 0 |

Screenshots captured in `scripts/out-v2/` (gitignored).

---

## 6. Files changed

| | |
| --- | --- |
| ➕ new | `src/components/concepts/minimal/ui/HoverPeekList.tsx` |
| ➕ new | `src/components/concepts/minimal/ui/Card3D.tsx` |
| ➕ new | `docs/research/ui-polish-v2-recommendations.md` |
| ➕ new | `docs/research/ui-polish-v2-report.md` (this doc) |
| ➕ new | `scripts/verify-polish-v2.mjs` |
| ✏ modified | `src/components/concepts/minimal/design-system.ts` — parallax tokens, magnetic token, dropped dead cursor token |
| ✏ modified | `src/components/concepts/minimal/MinimalLayout.tsx` — focus-visible rule, smooth scroll |
| ✏ modified | `src/components/concepts/minimal/ui/index.ts` — export `Card3D` + `HoverPeekList` |
| ✏ modified | `src/components/concepts/minimal/ui/MagneticButton.tsx` — `minimal.magnetic.radius` |
| ✏ modified | `src/components/concepts/minimal/animations/ParallaxSection.tsx` — default speed = token |
| ✏ modified | `src/components/concepts/minimal-home.tsx` — integrate HoverPeekList + Card3D, normalize hexes |
| ✏ modified | `src/components/concepts/minimal/MinimalProductCard.tsx` — normalize hex |
| ✏ modified | `src/components/concepts/minimal/Skeleton.tsx` — normalize hex |
| ✏ modified | `src/components/concepts/minimal/3d/Minimal3DViewer.tsx` — normalize hex |
| 🗑 deleted | `src/components/concepts/minimal/cursor/MinimalCursor.tsx` (orphan, not imported) |
