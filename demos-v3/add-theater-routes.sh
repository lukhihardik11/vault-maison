#!/bin/bash
# Add Theater concept routing to all page files
cd /home/ubuntu/vault-maison/demos-v3/src/app/\(concepts\)/\[concept\]

# Map of route -> component name
declare -A ROUTES=(
  ["about"]="TheaterAbout"
  ["collections"]="TheaterCollections"
  ["category/[category]"]="TheaterCategory"
  ["product/[slug]"]="TheaterProductDetail"
  ["craftsmanship"]="TheaterCraftsmanship"
  ["journal"]="TheaterJournal"
  ["bespoke"]="TheaterBespoke"
  ["contact"]="TheaterContact"
  ["cart"]="TheaterCart"
  ["checkout"]="TheaterCheckout"
  ["account"]="TheaterAccount"
  ["faq"]="TheaterFAQ"
  ["search"]="TheaterSearch"
  ["wishlist"]="TheaterWishlist"
  ["care"]="TheaterCare"
  ["shipping"]="TheaterShipping"
  ["privacy"]="TheaterPrivacy"
  ["grading"]="TheaterGrading"
)

for route in "${!ROUTES[@]}"; do
  comp="${ROUTES[$route]}"
  file="$route/page.tsx"
  
  if [ ! -f "$file" ]; then
    echo "SKIP: $file not found"
    continue
  fi
  
  # Check if already added
  if grep -q "Theater" "$file" 2>/dev/null; then
    echo "SKIP: $file already has Theater"
    continue
  fi
  
  # Add import after the last import line
  sed -i "/^import.*from.*pages'/a import { $comp } from '@/components/concepts/theater/pages'" "$file"
  
  # Add the routing condition before the generic return
  # Find the line with "return (" that's part of the generic fallback
  sed -i "/concept.id === 'observatory'.*return/a\\  if (concept.id === 'theater') return <$comp />" "$file"
  
  echo "DONE: $file -> $comp"
done
