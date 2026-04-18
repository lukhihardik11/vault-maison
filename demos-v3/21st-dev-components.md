# 21st.dev Component Research

## Available Component Categories (from browsing)
- Heroes: 73 components (Container Scroll Animation, Animated hero, Sparkles, Background Paths, Shape Landing Hero, Scroll media expansion hero, Lamp, Gooey Text Morphing)
- Backgrounds: 33 (Aurora Background, Background Gradient Animation, Background Boxes)
- Shaders: 15 (Shader Animation, Animated Shader Background, WebGL Shader, Shader Lines)
- Texts: 58 (Typewriter, Sparkles Text, Animated Text Cycle, Vapour Text Effect, Gradient Text, Hand Writing Text, ParticleTextEffect)
- Buttons: 130 (Liquid Glass Button, Neon Button, Slide Button, Hover Button, Gradient Menu)
- Cards: 79
- Carousels: 16
- Docks: 6
- Features: 36 (Radial Orbital Timeline, Bento Grid, Gallery with image cards, Sparkles Text)
- AI Chats: 30 (AI prompt Box, V0 AI Chat, Animated AI Chat)
- Calls to Action: 34
- Testimonials: 15
- Pricing Sections: 17
- Navigation Menus: 11
- Tooltips: 28
- Images: 26

## Key Components to Use Per Concept

### Concept 01: The Vault
- Sparkles Text (sparkles-text) → gold sparkle on "VAULT MAISON"
- Container Scroll Animation → hero scroll
- Canvas mouse trail effect → dark entry screen
- Custom: press-and-hold gate with Framer Motion conic-gradient

### Concept 02: The Observatory
- Container Scroll Animation → 3D perspective hero
- Typewriter effect → data readouts
- Custom: CSS Grid data dashboard, monospace, cyan borders

### Concept 03: The Gallery
- Gallery with image cards → museum-style product display
- Container Scroll Animation → exhibition reveals
- Custom: Pedestal Focus (hover dims siblings)

### Concept 04: The Atelier
- Custom product card with config panel
- Progress indicator → commission flow
- Custom: drag-and-drop config, spring physics

### Concept 05: The Salon
- Custom Chat UI (iMessage-style)
- Custom: concierge-first navigation

### Concept 06: The Archive
- Radial Orbital Timeline → provenance timeline
- Custom: horizontal timeline scrub

### Concept 07: The Minimal Machine
- NONE from 21st.dev — pure CSS scroll-snap
- Smallest codebase

### Concept 08: The Immersive Theater
- Canvas particle starfield
- Sparkles Text → champagne sparkles
- Container Scroll Animation → cinematic 3D
- Typewriter → letter-by-letter reveal

### Concept 09: The Marketplace of Rarity
- Custom countdown timer
- Custom: auction lot cards with status badges

### Concept 10: The Modern Maison
- Gallery with image cards → featured carousel
- Container Scroll Animation → hero scroll
- Custom: split-screen hero, filter sidebar

## Approach
Since 21st.dev components are React/TSX, I'll implement inspired versions
that match the visual quality while being properly typed for our Next.js app.
The key patterns to replicate:
1. Framer Motion for all animations (whileInView, spring physics)
2. Canvas API for particle/trail effects
3. CSS custom properties for theme switching per concept
4. Intersection Observer for scroll-triggered reveals
