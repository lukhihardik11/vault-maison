# Vault Maison

Vault Maison is an ultra-luxury diamond and fine jewelry e-commerce platform featuring 10 distinct UI concept directions. Each concept explores a unique design philosophy, from minimalist restraint to cinematic immersion, all powered by a robust shared infrastructure.

## The 10 Concepts

1. **Vault**: The Dark Luxury Experience
2. **Observatory**: The Analytical & Technical Approach
3. **Gallery**: The Art Exhibition Aesthetic
4. **Atelier**: The Craftsmanship Focus
5. **Salon**: The Intimate Consultation
6. **Archive**: The Historical & Provenance Angle
7. **Minimal**: The Restrained & Precise Design
8. **Theater**: The Cinematic & Emotional Journey
9. **Marketplace**: The Auction & Rarity Platform
10. **Maison**: The Timeless & Balanced Elegance

## Architecture & Shared Infrastructure

The project is built on Next.js App Router and leverages a powerful shared infrastructure to ensure consistency and maintainability across all 10 concepts:

- **State Management**: Zustand stores for Cart, Wishlist, and Recently Viewed items.
- **E-commerce Features**: Fully functional product details, category filters, 3-step checkout, and account dashboards.
- **UI Components**: Mega-menus, search overlays, quick view modals, size guides, and toast notifications.
- **Animations**: Custom `useScrollReveal` hook and CSS keyframes for smooth, performant scroll animations.
- **SEO**: Comprehensive metadata, Open Graph tags, Schema.org JSON-LD, dynamic sitemaps, and robots.txt.

## Documentation

Detailed documentation can be found in the `docs/` directory:
- `ECOMMERCE-AUDIT.md`: Analysis of 5 leading jewelry e-commerce sites.
- `GEMHUB-DEEP-RESEARCH.md`: Integration plan for GemLightBox Hub.
- `IMAGE-PROCESSING-PLAN.md`: Strategy for CSS image background matching.
- `API-CONTRACT.md`: Backend-ready API abstraction layer details.
- `DEPLOYMENT-GUIDE.md`: Instructions for deploying to Vercel.
- `FEATURE-CHECKLIST.md`: Implementation status of all features.

## Development Guidelines for AI Agents

For future AI agents working on this repository:
- **Branching Strategy**: Always create a new feature branch from `main`. Never commit directly to `main`.
- **Pull Requests**: Raise a PR for manual review and merging.
- **Documentation**: Keep all documentation in the `docs/` directory up to date with any architectural changes.
- **Shared Components**: When adding new features, prioritize building shared components in `src/components/shared/` rather than concept-specific implementations.
- **Design Philosophy**: Ensure any new additions align with the specific design tokens and aesthetic of the target concept.

## Getting Started

1. Clone the repository.
2. Navigate to the `demos-v3` directory.
3. Install dependencies: `pnpm install`
4. Run the development server: `pnpm dev`
5. Open `http://localhost:3000` in your browser.
