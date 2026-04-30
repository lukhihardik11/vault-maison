"""
Phase 1: Apply fluid typography tokens from design-system.ts across all page components.

Strategy:
- Map fixed px font sizes to the closest fluid token
- Replace inline fontSize values with references to minimal.type.*
- Handle both quoted ('32px') and string template patterns

Font size mapping (px → token):
  >= 48px → display
  36-47px → h1
  28-35px → h2
  22-27px → h3
  18-21px → h4
  16-17px → bodyLg
  14-15px → body
  13px → bodySm
  11-12px → caption
  10px → micro
  20-32px (in quote context) → quote
"""

import re
import os
import sys

# Mapping: px size → token name
SIZE_MAP = {
    72: 'display', 64: 'display', 56: 'h1', 50: 'h1', 48: 'h1',
    44: 'h1', 42: 'h2', 40: 'h2', 38: 'h2', 36: 'h2',
    34: 'h2', 32: 'h2', 30: 'h3', 28: 'h3', 26: 'h3',
    24: 'h3', 22: 'h3', 20: 'h4', 19: 'h4', 18: 'h4',
    17: 'bodyLg', 16: 'bodyLg', 15: 'body', 14: 'body',
    13: 'bodySm', 12: 'caption', 11: 'caption', 10: 'micro', 9: 'micro',
}

def get_token(px_val):
    """Get the closest fluid token for a px value."""
    px = int(px_val)
    if px in SIZE_MAP:
        return SIZE_MAP[px]
    # Find closest
    closest = min(SIZE_MAP.keys(), key=lambda k: abs(k - px))
    return SIZE_MAP[closest]

def process_file(filepath):
    """Process a single file to replace fixed font sizes with fluid tokens."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    # Check if file already imports minimal
    has_minimal_import = 'minimal' in content and ('design-system' in content or "from '../../design-system'" in content or "from '../design-system'" in content or "from './design-system'" in content)
    
    # Pattern 1: fontSize: '32px' or fontSize: "32px"
    pattern1 = r"fontSize:\s*['\"](\d+)px['\"]"
    
    # Pattern 2: fontSize: 'clamp(...)' - skip these (already fluid)
    
    replacements = 0
    
    def replace_match(match):
        nonlocal replacements
        px_val = match.group(1)
        token = get_token(px_val)
        replacements += 1
        return f"fontSize: minimal.type.{token}"
    
    # Only replace if the file already has access to `minimal`
    if has_minimal_import:
        content = re.sub(pattern1, replace_match, content)
    else:
        # Count how many replacements would be made
        matches = re.findall(pattern1, content)
        if matches:
            print(f"  SKIP (no minimal import): {filepath} ({len(matches)} potential replacements)")
            return 0
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"  UPDATED: {filepath} ({replacements} replacements)")
    
    return replacements

def main():
    base_dir = '/tmp/vault-maison-clone/src/components/concepts/minimal'
    total = 0
    
    # Process pages first
    pages_dir = os.path.join(base_dir, 'pages')
    for f in sorted(os.listdir(pages_dir)):
        if f.endswith('.tsx'):
            total += process_file(os.path.join(pages_dir, f))
    
    # Process UI components
    ui_dir = os.path.join(base_dir, 'ui')
    for f in sorted(os.listdir(ui_dir)):
        if f.endswith('.tsx'):
            total += process_file(os.path.join(ui_dir, f))
    
    # Process root level components
    for f in sorted(os.listdir(base_dir)):
        if f.endswith('.tsx') and os.path.isfile(os.path.join(base_dir, f)):
            total += process_file(os.path.join(base_dir, f))
    
    # Process homepage
    homepage = '/tmp/vault-maison-clone/src/components/concepts/minimal-home.tsx'
    if os.path.exists(homepage):
        total += process_file(homepage)
    
    print(f"\nTotal replacements: {total}")

if __name__ == '__main__':
    main()
