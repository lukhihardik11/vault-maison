#!/bin/bash
# Add Observatory concept routing to all page files
cd /home/ubuntu/vault-maison/demos-v3

# Map of page name -> component name
declare -A pages=(
  ["about"]="ObservatoryAbout"
  ["account"]="ObservatoryAccount"
  ["bespoke"]="ObservatoryBespoke"
  ["care"]="ObservatoryCare"
  ["cart"]="ObservatoryCart"
  ["checkout"]="ObservatoryCheckout"
  ["collections"]="ObservatoryCollections"
  ["contact"]="ObservatoryContact"
  ["craftsmanship"]="ObservatoryCraftsmanship"
  ["faq"]="ObservatoryFAQ"
  ["grading"]="ObservatoryGrading"
  ["journal"]="ObservatoryJournal"
  ["privacy"]="ObservatoryPrivacy"
  ["search"]="ObservatorySearch"
  ["shipping"]="ObservatoryShipping"
  ["wishlist"]="ObservatoryWishlist"
)

for page in "${!pages[@]}"; do
  comp="${pages[$page]}"
  file="src/app/(concepts)/[concept]/${page}/page.tsx"
  
  if [ -f "$file" ]; then
    # Add import after the last Archive import
    if ! grep -q "$comp" "$file"; then
      sed -i "/import.*Archive.*from.*archive\/pages/a import { $comp } from '@/components/concepts/observatory/pages'" "$file"
      # Add routing condition after the last archive condition
      sed -i "/concept.id === 'archive'/a\\  if (concept.id === 'observatory') return <$comp />" "$file"
      echo "Updated $file"
    else
      echo "Already has $comp in $file"
    fi
  fi
done

# Handle category page (special - needs category prop)
file="src/app/(concepts)/[concept]/category/[category]/page.tsx"
if ! grep -q "ObservatoryCategory" "$file"; then
  sed -i "/import.*ArchiveCategory.*from.*archive\/pages/a import { ObservatoryCategory } from '@/components/concepts/observatory/pages'" "$file"
  sed -i "/concept.id === 'archive'.*return.*ArchiveCategory/a\\  if (concept.id === 'observatory') return <ObservatoryCategory />" "$file"
  echo "Updated category page"
fi

# Handle product page (special - needs product prop)
file="src/app/(concepts)/[concept]/product/[slug]/page.tsx"
if ! grep -q "ObservatoryProductDetail" "$file"; then
  sed -i "/import.*ArchiveProductDetail.*from.*archive\/pages/a import { ObservatoryProductDetail } from '@/components/concepts/observatory/pages'" "$file"
  sed -i "/concept.id === 'archive'.*return.*ArchiveProductDetail/a\\  if (concept.id === 'observatory') return <ObservatoryProductDetail />" "$file"
  echo "Updated product page"
fi

echo "Done!"
