# KokonutUI Integration Plan — What Goes Where

## Components to Add (adapted for B&W minimal jewelry)

### HIGH IMPACT — Must integrate
1. **HeroFashion** → Homepage hero section (replace current centered text hero with editorial 2-col layout)
2. **GlassmorphismMetricsBlock** → Homepage trust section (replace shadcn deps with plain divs)
   - Adapt metrics: "1,000+ Diamonds" | "GIA Certified" | "50+ Years" | "Custom Designs"
3. **AttractButton** → PDP "Add to Cart" (replace shadcn Button with plain button)
4. **SocialButton** → PDP share button (replace shadcn Button with plain button)
5. **MatrixText** → Collection page headers (dramatic text reveal for category names)

### MEDIUM IMPACT — Good additions
6. **ShimmerText** → "New" badges on product cards, "Limited Edition" labels
7. **DynamicText** → Journal page hero (cycling through article categories)

### LOWER PRIORITY — Nice to have but heavy deps
8. **SmoothDrawer** → Mobile nav (needs vaul + shadcn Drawer — heavy)
9. **ProfileDropdown** → Account dropdown (needs Radix dropdown)
10. **AvatarPicker** → Account settings (needs Radix)
11. **MinimalHeroSection (Bento3)** → About page alternative hero (complex, self-contained)
12. **BentoGrid** → Craftsmanship page (very complex, many custom icon deps)

## Integration Strategy
- Adapt each component to remove shadcn deps (Button, Card, Badge → plain HTML/Tailwind)
- Keep B&W palette (#FFFFFF + #050505)
- Use system fonts
- All motion/react animations preserved
