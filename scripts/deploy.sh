#!/bin/bash
# ═══════════════════════════════════════════════════════════════
# Vault Maison — Deployment Script
# ═══════════════════════════════════════════════════════════════
#
# Usage:
#   ./scripts/deploy.sh              # Deploy showcase (all 10 themes)
#   ./scripts/deploy.sh minimal      # Deploy single-theme (minimal)
#   ./scripts/deploy.sh vault prod   # Deploy vault theme to production
#
# Prerequisites:
#   - Vercel CLI installed: npm i -g vercel
#   - Vercel project linked: vercel link
#   - Environment variables set in Vercel dashboard
# ═══════════════════════════════════════════════════════════════

set -e

CONCEPT_ID=${1:-""}
ENVIRONMENT=${2:-"preview"}

echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║       VAULT MAISON — Deploy Script        ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# ─── Pre-flight checks ───
if ! command -v vercel &> /dev/null; then
  echo "Error: Vercel CLI not found. Install with: npm i -g vercel"
  exit 1
fi

if [ ! -f "package.json" ]; then
  echo "Error: Must run from project root directory."
  exit 1
fi

# ─── Build check ───
echo "→ Running build check..."
npm run build
if [ $? -ne 0 ]; then
  echo "Error: Build failed. Fix errors before deploying."
  exit 1
fi
echo "✓ Build passed"

# ─── Deploy ───
if [ -n "$CONCEPT_ID" ]; then
  echo ""
  echo "→ Deploying SINGLE-THEME mode: $CONCEPT_ID"
  echo "  Setting NEXT_PUBLIC_CONCEPT_ID=$CONCEPT_ID"

  if [ "$ENVIRONMENT" = "prod" ]; then
    echo "  Environment: PRODUCTION"
    VERCEL_ORG_ID="" VERCEL_PROJECT_ID="" \
      vercel --prod \
      -e NEXT_PUBLIC_CONCEPT_ID="$CONCEPT_ID"
  else
    echo "  Environment: PREVIEW"
    VERCEL_ORG_ID="" VERCEL_PROJECT_ID="" \
      vercel \
      -e NEXT_PUBLIC_CONCEPT_ID="$CONCEPT_ID"
  fi
else
  echo ""
  echo "→ Deploying SHOWCASE mode (all 10 themes)"

  if [ "$ENVIRONMENT" = "prod" ]; then
    echo "  Environment: PRODUCTION"
    vercel --prod
  else
    echo "  Environment: PREVIEW"
    vercel
  fi
fi

echo ""
echo "✓ Deployment complete!"
echo ""
