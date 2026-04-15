# Vault Maison Deployment Guide

This guide outlines the deployment process for the Vault Maison e-commerce platform. The project is built with Next.js App Router and is optimized for deployment on Vercel.

## Prerequisites

Before deploying, ensure you have the following:
- A Vercel account
- Access to the GitHub repository
- Node.js 22.x or later
- pnpm installed (`npm install -g pnpm`)

## Deployment Steps

### 1. Vercel Setup
1. Log in to your Vercel dashboard.
2. Click **Add New...** > **Project**.
3. Import the `vault-maison` repository from GitHub.
4. In the **Configure Project** section:
   - **Framework Preset**: Next.js
   - **Root Directory**: `demos-v3`
   - **Build Command**: `pnpm build`
   - **Output Directory**: `.next`

### 2. Environment Variables
Add the following environment variables in the Vercel dashboard before deploying:

```env
# Base URL for SEO and Open Graph tags
NEXT_PUBLIC_BASE_URL=https://vault-maison.vercel.app

# GemHub API Keys (when transitioning from placeholder to full API)
GEMHUB_API_KEY=your_api_key_here
GEMHUB_SECRET=your_secret_here
```

### 3. Deploy
Click **Deploy**. Vercel will automatically install dependencies, build the project, and deploy it to a production URL.

## Post-Deployment Verification

After deployment, verify the following:
1. **Routing**: Ensure all 10 concepts load correctly (e.g., `/vault`, `/minimal`, `/theater`).
2. **E-commerce Flow**: Test the full cart and checkout flow (add to cart, view cart, proceed to checkout).
3. **SEO**: Check the generated `sitemap.xml` and `robots.txt` at the root URL.
4. **Animations**: Verify that scroll reveal animations trigger correctly on concept homepages.

## Continuous Integration

The project is configured for continuous integration via Vercel. Any push to the `main` branch will automatically trigger a production deployment. Pushes to feature branches will trigger preview deployments.

## Future AI Agent Instructions

For future AI agents working on this repository:
- **Branching Strategy**: Always create a new feature branch from `main`. Never commit directly to `main`.
- **Pull Requests**: Raise a PR for manual review and merging.
- **Documentation**: Keep all documentation in the `docs/` directory up to date with any architectural changes.
- **Shared Components**: When adding new features, prioritize building shared components in `src/components/shared/` rather than concept-specific implementations.
