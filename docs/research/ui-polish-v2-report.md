# UI Polish v2 — Execution Report

> Companion to `ui-polish-v2-recommendations.md`. Summary of what was integrated, what was rolled back, what was normalized, and why.
>
> **Branch:** `feat/minimal-ui-polish-v2`
> **Final scope:** design-system normalization + UI UX Pro Max parallax tokens + focus-visible + smooth scroll. **No new user-facing UI elements** — both new 21st.dev-sourced components were added in one revision, the user reviewed them, disliked the hover interactions, and both were reverted.

---

## 1. 21st.dev component sourcing — attempted and rolled back

The `21st.dev` Magic MCP (`.cursor/mcp.json`) **was unreachable** in this environment — every `component_inspiration` and `component_builder` call returned `fetch failed`. The user compensated by copy-pasting snippets by hand from the 21st.dev website.

### Attempted, then reverted

| Component | Source | Where attempted | Rollback reason |
| --- | --- | --- | --- |
| **Card3D** (`CardContainer`/`CardBody`/`CardItem`) | 21st.dev `3d-card-effect` (Aceternity) | wrapped the Featured Piece image on the homepage to add hover-tilt | user feedback: "didn't like hover circle" — the tilt reads as busy on a product hero where stillness matters more |
| **HoverPeekList** | 21st.dev `project-showcase` (Selected Work) | new **Signature** section on the homepage with a cursor-following image preview | user feedback: "didn't like hover preview" + "made it too complicated" |

Both component files were deleted (`ui/Card3D.tsx`, `ui/HoverPeekList.tsx`), both barrel exports removed (`ui/index.ts`), and the homepage section + wrapper restored to their pre-v2 state.

### Other snippets evaluated (never integrated)

| Snippet | Why skipped up-front |
| --- | --- |
| `3d-tilt-card.tsx` | redundant with the existing `TiltCard.tsx`; also contains a file-upload control that doesn't belong on a product site |
| `3d-card.tsx` (photo deck) | uses the Zeyada handwriting font (clashes with Inter + SF Mono) and a gradient grid background (clashes with monochrome surface) |
| `card-7.tsx` / `InteractiveProductCard` | heavy glassmorphism + gradients + `rounded-3xl` — too much would be stripped to meet our design rules |
| `social-card.tsx` | colorful social icons — wrong brand fit for luxury jewelry |

**Outcome:** 0 new user-facing 21st.dev components in this PR.

---

## 2. UI UX Pro Max recommendations applied

All 3 mandated searches were run; full output saved in `ui-polish-v2-recommendations.md`.

### 2.1 Parallax speed tokens (from the scroll-animation search)

Tool recommended:

```
--parallax-speed-bg:  0.3
--parallax-speed-mid: 0.6
--parallax-speed-fg:  1.0
```

Added to `design-system.ts` as `minimal.motion.parallax.{bg, mid, fg}`. Consumed by:

- `ParallaxSection` default `speed` → now `minimal.motion.parallax.bg`
- `ParallaxImage` default `speed` → now `minimal.motion.parallax.bg`
- `minimal-home.tsx` Hero parallax call → `speed={minimal.motion.parallax.bg}` (was hardcoded `0.15`)
- `minimal-home.tsx` Featured Piece parallax call → `speed={minimal.motion.parallax.bg}` (was hardcoded `0.1`)

### 2.2 Focus-visible outline (from the design-system pre-delivery checklist)

The CLI lists "Focus states visible for keyboard nav" as a must-have. We didn't have a global rule — now added to `MinimalLayout.tsx`:

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

Mouse users never see it; keyboard users always do (it's `:focus-visible`, not `:focus`). Verified in Puppeteer earlier.

### 2.3 Smooth anchor scrolling

Added `html { scroll-behavior: smooth; }` with a reduced-motion override, so the `Back to Top` button and any `#fragment` links glide rather than jump.

### 2.4 Recommendations deliberately **not** applied

- **Suggested "Liquid Glass" style** (translucency, chromatic aberration, morphing blur) — conflicts with the brutalist-monochrome brief.
- **Suggested "Space Mono" font** — too raw for long body copy.
- **Brutalist 700+ font weight** — we invert brutalism: scale carries the brand, not weight. Weights stay 100–500.
- **Pure primary colours (red/blue/yellow)** — monochrome only.
- **Visible 2–4 px borders** — softened to 1 px hairlines (`#E5E5E5`).

---

## 3. Normalization (the core of this PR)

The previous polish pass (PR #67) left debt. Cleaned:

| Issue | Fix |
| --- | --- |
| `src/components/concepts/minimal/cursor/MinimalCursor.tsx` was a 237-line orphan — a prior agent re-added it after the kill-cursor PR, and nothing in the codebase imports it | **deleted** the file and the empty `cursor/` directory |
| `design-system.ts` had `cursor: { size, hoverScale, magneticRadius, blendMode }` pointing at the deleted component | replaced with focused `magnetic: { radius }` (still consumed by `MagneticButton`) |
| `MagneticButton.tsx` referenced `minimal.cursor.magneticRadius` | swapped to `minimal.magnetic.radius` |
| Hardcoded out-of-palette `#F0F0F0` in `MinimalProductCard.tsx`, `Skeleton.tsx`, `minimal-home.tsx` | normalized to `#E5E5E5` |
| Hardcoded `#ABABAB` (×2) in `minimal-home.tsx` hero indices | normalized to `#9B9B9B` (palette `textMuted`) |
| Hardcoded `#333333` divider on dark brand-story band | normalized to `#6B6B6B` (palette `textSecondary`) |
| Hardcoded `#0A0A0A` in `Minimal3DViewer.tsx` fallback | normalized to `#050505` (palette `text`) |
| Parallax speeds `0.15` and `0.1` hardcoded in `minimal-home.tsx` | moved to `minimal.motion.parallax.bg` |

A grep pass confirms the remaining off-palette hexes live exclusively in **unused** UI primitives (`SocialButton`, `AttractButton`, `AvatarPicker`) — barrel-exported but imported by nothing. They should be swept in a future dead-code pass.

---

## 4. Verification

`next build` → ✓ compiled in ~4s, ✓ TypeScript ~10s, ✓ 369 static pages, zero warnings.

Final scope adds no new user-facing UI surface, so no Puppeteer visual verification was needed beyond the build + TS check. The earlier verification script used for the Card3D / HoverPeekList additions has been removed since it no longer matches the shipped surface.

---

## 5. Files changed (final)

| | |
| --- | --- |
| ➕ new | `docs/research/ui-polish-v2-recommendations.md` |
| ➕ new | `docs/research/ui-polish-v2-report.md` (this doc) |
| ✏ modified | `src/components/concepts/minimal/design-system.ts` — added `motion.parallax.{bg,mid,fg}`, replaced dead `cursor: {...}` with `magnetic: { radius }` |
| ✏ modified | `src/components/concepts/minimal/MinimalLayout.tsx` — `:focus-visible` outline rule, smooth scroll |
| ✏ modified | `src/components/concepts/minimal/ui/MagneticButton.tsx` — use `minimal.magnetic.radius` |
| ✏ modified | `src/components/concepts/minimal/animations/ParallaxSection.tsx` — default `speed` now comes from token |
| ✏ modified | `src/components/concepts/minimal-home.tsx` — consume parallax token, normalize 4 hex literals |
| ✏ modified | `src/components/concepts/minimal/MinimalProductCard.tsx` — normalize hex |
| ✏ modified | `src/components/concepts/minimal/Skeleton.tsx` — normalize hex |
| ✏ modified | `src/components/concepts/minimal/3d/Minimal3DViewer.tsx` — normalize hex |
| 🗑 deleted | `src/components/concepts/minimal/cursor/MinimalCursor.tsx` (orphan) |
