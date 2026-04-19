# UI/UX Pro Max Recommendations: Minimal Machine

## Execution Notes

- Requested command path (`.cursor/skills/ui-ux-pro-max/scripts/search.py`) was not present in this worktree.
- Fallback used: `python3 "/Users/hardiklukhi/code/vault-maison/.cursor/skills/ui-ux-pro-max/scripts/search.py" ...`
- All four required queries executed successfully with the same arguments.

## Commands Run

1. `python3 .../search.py "luxury jewelry brutalist minimal monochrome" --design-system -p "Minimal Machine"`
2. `python3 .../search.py "brutalism" --domain style`
3. `python3 .../search.py "minimal geometric sans-serif luxury" --domain typography`
4. `python3 .../search.py "interactive cursor design" --domain style`

## Raw Findings (Condensed)

### 1) Design System Query

- Recommended pattern: **Minimal Single Column**
- Recommended style: **Liquid Glass**
- Suggested colors from tool: dark neutrals plus blue accent
- Suggested typography: **Space Mono / Space Mono**
- Anti-pattern called out: playful/vibrant palettes

### 2) Style Query: Brutalism

- Core traits: raw/stark composition, visible borders, zero/low rounding, instant or near-instant transitions
- Performance posture: strong (low complexity)
- Accessibility posture: strong if contrast is preserved

### 3) Typography Query: Minimal Geometric Sans-Serif Luxury

- Returned pairings favored luxury serif + geometric sans combinations:
  - Cormorant + Montserrat
  - Cinzel + Josefin Sans
  - Bodoni Moda + Jost
- Theme signal: luxury tone can remain minimal if spacing and hierarchy are restrained

### 4) Style Query: Interactive Cursor Design

- Recommended interactions: subtle magnetic pull, pointer feedback, hover morphing
- Caution: always provide touch fallback and avoid interaction-only affordances
- Implementation fit: custom JS or lightweight motion approach

## Synthesis for This Project (Monochrome Brutalist Minimal)

The tool proposed `Liquid Glass`, but this project requires a **monochrome brutalist minimal** direction. Therefore, the implementation should keep the structural findings (single-focus hierarchy, strong typography, clear CTA priority) while overriding visual effects that violate project constraints.

### Enforced Visual Rules

- Color palette only: `#FFFFFF`, `#050505`, `#6B6B6B`, `#9B9B9B`, `#E5E5E5`
- No gradients, no gold accents, no glossy glassmorphism effects
- Sharp edges and visible borders (no soft rounded card language)

### Interaction Recommendations

- Use short micro-interactions (120-220ms) with restrained distance (4-6px)
- Keep movement intentional:
  - headline hover glitch as optional enhancement
  - subtle magnetic CTA pull
  - marquee motion for editorial rhythm
  - in-view number interpolation for stats
- Add `prefers-reduced-motion` fallbacks for all animated elements

### Typography Recommendations

- Primary body/headline base can remain system sans for performance and consistency
- Optional luxury headline accent (if added later): Bodoni Moda or Cormorant, only for high-impact headings
- Use mono for labels, counters, and data marks to reinforce precision/brutalist character

### Homepage Composition Recommendations

- Hero: dominant headline, minimal copy, two CTAs max
- Mid-band marquee: repeated concise brand statements to create machine-like cadence
- Stats section: high-contrast tabular counters with monochrome grid treatment
- Keep visual noise low: whitespace and border rhythm carry the hierarchy

## Implementation Guardrails

- Never use `initial={{ opacity: 0 }}` in Framer Motion
- Respect `prefers-reduced-motion` with non-animated fallbacks
- Keep hover/focus states visible in monochrome (color inversion and border contrast)
- Ensure all clickable targets preserve pointer + keyboard focus clarity
