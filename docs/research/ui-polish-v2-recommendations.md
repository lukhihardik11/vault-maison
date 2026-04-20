# UI Polish v2 — Research & Normalization Plan

> **Project:** Vault Maison — "Minimal Machine" concept, second polish pass
> **Branch:** `feat/minimal-ui-polish-v2`
> **Date:** Apr 2026
> **Purpose:** re-execute the UI-polish task after the first pass (Gemini, merged as PR #67) left residual normalization debt. Rerun UI UX Pro Max + 21st.dev searches and integrate only what the tools actually return.

---

## 1. UI UX Pro Max — Search output

All three queries were executed against the local `search.py` script. Raw output follows.

### 1.1 Design system: `"luxury jewelry brutalist minimal monochrome" --design-system -p "Minimal Machine"`

| Field | Recommendation | Applied here? |
| --- | --- | --- |
| Pattern | Minimal Single Column — single CTA focus, large type, lots of whitespace | ✅ already the homepage structure |
| Style | **Liquid Glass** — translucent, animated blur, chromatic aberration | ❌ REJECTED — conflicts with the brutalist monochrome brief (no translucency / no chromatic aberration in our palette) |
| Color strategy | Monochrome + accent (blue) | ⚠ partial — we use monochrome only, no blue accent |
| Heading font | Space Mono | ❌ REJECTED — Space Mono is too raw for long copy; we stick with Inter + SF Mono accents |
| Body font | Space Mono | ❌ same |
| Anti-patterns | Vibrant block-based, playful colors | ✅ already avoided |

**Pre-delivery checklist from the tool:**

- [x] No emojis as icons — using Lucide
- [x] `cursor-pointer` on clickable elements
- [x] Hover transitions 150–300 ms
- [x] Light-mode text contrast ≥ 4.5:1 (`#6B6B6B` on `#FFFFFF` = 5.74:1)
- [ ] Focus states visible — **to verify** across nav/cart/inputs
- [x] `prefers-reduced-motion` respected via `useReducedMotionPreference`
- [x] Responsive at 375 / 768 / 1024 / 1440 px

### 1.2 Brutalism: `"brutalism" --domain style`

Tool recommends:

- Keywords: raw, unpolished, stark, high contrast, default fonts, visible borders, asymmetric, anti-design
- CSS: `border-radius: 0`, `transition: none`/`0s`, `font-weight: 700+`, `border: 2-4px`, pure primary colors
- Anti-patterns (their list): smooth transitions, soft colors, thin borders

**Our intentional deviations** (keep for luxury feel):

| Brutalist tenet | Tool recommendation | Our take |
| --- | --- | --- |
| Sharp corners (0 px) | enforce | ✅ enforced repo-wide |
| Instant transitions | 0s / none | ⚠ selective — instant on brutalist invert buttons; 150–300 ms elsewhere |
| Bold weight (700+) | 700-900 | ❌ inverted — we use 100–300. Scale carries the brand, not weight |
| Pure primary colors | red/blue/yellow | ❌ replaced with monochrome only — luxury signal |
| Visible 2–4 px borders | bold borders | ⚠ softened — 1 px hairlines on `#E5E5E5` |
| Asymmetric layout | intentional | ✅ 55/45 hero split, alternating section alignment |

### 1.3 Scroll animation / parallax: `"scroll animation parallax" --domain style`

Three results (Motion-Driven, Parallax Storytelling, Kinetic Typography). Relevant recommended variables:

```
--parallax-speed-bg:  0.3
--parallax-speed-mid: 0.6
--parallax-speed-fg:  1.0
--animation-duration: 300–400 ms
--parallax-layers:    3-5
```

We currently hard-code `speed={0.15}` on `<ParallaxImage>` and `speed={0.1}` on `<ParallaxSection>`. These will move to design tokens (`motion.parallax.bg/mid/fg`) and get documented in `design-system.ts`.

Performance caveats from the tool:

- Parallax Storytelling is rated **Poor** for accessibility → honor `prefers-reduced-motion` (we do).
- Must provide a mobile fallback (we do — `useIsMobile()`).

---

## 2. 21st.dev — Component sourcing

(Populated by tool responses in §3 below.)

---

## 3. 21st.dev search table

See `docs/research/ui-polish-v2-report.md` for the final found/not-found report after integration.
