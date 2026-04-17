#!/bin/bash
# Add Marketplace concept routing to all page files
# This script uses Python for more reliable text manipulation
cd /home/ubuntu/vault-maison/demos-v3/src/app/\(concepts\)/\[concept\]

declare -A ROUTES=(
  ["about"]="MarketplaceAbout"
  ["collections"]="MarketplaceCollections"
  ["category/[category]"]="MarketplaceCategory"
  ["product/[slug]"]="MarketplaceProductDetail"
  ["craftsmanship"]="MarketplaceCraftsmanship"
  ["journal"]="MarketplaceJournal"
  ["bespoke"]="MarketplaceBespoke"
  ["contact"]="MarketplaceContact"
  ["cart"]="MarketplaceCart"
  ["checkout"]="MarketplaceCheckout"
  ["account"]="MarketplaceAccount"
  ["faq"]="MarketplaceFAQ"
  ["search"]="MarketplaceSearch"
  ["wishlist"]="MarketplaceWishlist"
  ["care"]="MarketplaceCare"
  ["shipping"]="MarketplaceShipping"
  ["privacy"]="MarketplacePrivacy"
  ["grading"]="MarketplaceGrading"
)

for route in "${!ROUTES[@]}"; do
  comp="${ROUTES[$route]}"
  file="$route/page.tsx"
  
  if [ ! -f "$file" ]; then
    echo "SKIP: $file not found"
    continue
  fi
  
  if grep -q "Marketplace" "$file" 2>/dev/null; then
    echo "SKIP: $file already has Marketplace"
    continue
  fi
  
  # Use Python for reliable text manipulation
  python3.11 -c "
import re
with open('$file', 'r') as f:
    content = f.read()

# Add import - find the last import line and add after it
lines = content.split('\n')
last_import_idx = 0
for i, line in enumerate(lines):
    if line.startswith('import '):
        last_import_idx = i

# Insert import after last import
lines.insert(last_import_idx + 1, \"import { $comp } from '@/components/concepts/marketplace/pages'\")

# Find the line with 'theater' routing and add marketplace after it
new_lines = []
for line in lines:
    new_lines.append(line)
    if \"concept.id === 'theater'\" in line:
        indent = '  '
        new_lines.append(f\"{indent}if (concept.id === 'marketplace') return <$comp />\")

with open('$file', 'w') as f:
    f.write('\n'.join(new_lines))
"
  echo "DONE: $file -> $comp"
done
