#!/bin/bash
# Add Maison concept routing to all page files
cd /home/ubuntu/vault-maison/demos-v3/src/app/\(concepts\)/\[concept\]

declare -A ROUTES=(
  ["about"]="MaisonAbout"
  ["collections"]="MaisonCollections"
  ["category/[category]"]="MaisonCategory"
  ["product/[slug]"]="MaisonProductDetail"
  ["craftsmanship"]="MaisonCraftsmanship"
  ["journal"]="MaisonJournal"
  ["bespoke"]="MaisonBespoke"
  ["contact"]="MaisonContact"
  ["cart"]="MaisonCart"
  ["checkout"]="MaisonCheckout"
  ["account"]="MaisonAccount"
  ["faq"]="MaisonFAQ"
  ["search"]="MaisonSearch"
  ["wishlist"]="MaisonWishlist"
  ["care"]="MaisonCare"
  ["shipping"]="MaisonShipping"
  ["privacy"]="MaisonPrivacy"
  ["grading"]="MaisonGrading"
)

for route in "${!ROUTES[@]}"; do
  comp="${ROUTES[$route]}"
  file="$route/page.tsx"
  
  if [ ! -f "$file" ]; then
    echo "SKIP: $file not found"
    continue
  fi
  
  if grep -q "Maison" "$file" 2>/dev/null; then
    echo "SKIP: $file already has Maison"
    continue
  fi
  
  python3.11 -c "
import re
with open('$file', 'r') as f:
    content = f.read()

lines = content.split('\n')
last_import_idx = 0
for i, line in enumerate(lines):
    if line.startswith('import '):
        last_import_idx = i

lines.insert(last_import_idx + 1, \"import { $comp } from '@/components/concepts/maison/pages'\")

new_lines = []
for line in lines:
    new_lines.append(line)
    if \"concept.id === 'marketplace'\" in line:
        indent = '  '
        new_lines.append(f\"{indent}if (concept.id === 'maison') return <$comp />\")

with open('$file', 'w') as f:
    f.write('\n'.join(new_lines))
"
  echo "DONE: $file -> $comp"
done
