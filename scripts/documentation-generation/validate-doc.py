#!/usr/bin/env python3
"""
Validate documentation meets vault-maison standards.

Usage:
    python validate-doc.py --check-frontmatter docs/
    python validate-doc.py --check-ai-structure docs/
    python validate-doc.py --check-content docs/
    python validate-doc.py --check-links docs/
    python validate-doc.py --all docs/
"""
import yaml
import json
import re
import sys
import os
from pathlib import Path


REQUIRED_FRONTMATTER_FIELDS = [
    'title', 'category', 'version', 'date',
    'author', 'ai_tags', 'confidence_level'
]

VALID_CATEGORIES = ['research', 'strategy', 'design', 'technical', 'operations', 'implementation']
VALID_CONFIDENCE = ['high', 'medium', 'low']
VALID_EVIDENCE = ['primary', 'secondary', 'theoretical']
VALID_STATUS = ['draft', 'review', 'approved', 'archived']

CITATION_PATTERN = re.compile(
    r'(?:\(.*?,\s*.*?,\s*\d{4}.*?\)|\[\d+\]\s*\()'
)


def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown content."""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            try:
                return yaml.safe_load(parts[1])
            except yaml.YAMLError as e:
                return None
    return None


def validate_frontmatter(file_path):
    """Check YAML frontmatter completeness."""
    errors = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    fm = extract_frontmatter(content)
    if fm is None:
        errors.append(f"{file_path}: Missing or invalid YAML frontmatter")
        return errors

    for field in REQUIRED_FRONTMATTER_FIELDS:
        if field not in fm:
            errors.append(f"{file_path}: Missing required field '{field}'")

    if 'category' in fm and fm['category'] not in VALID_CATEGORIES:
        errors.append(f"{file_path}: Invalid category '{fm['category']}'")

    if 'confidence_level' in fm and fm['confidence_level'] not in VALID_CONFIDENCE:
        errors.append(f"{file_path}: Invalid confidence_level '{fm['confidence_level']}'")

    if 'evidence_quality' in fm and fm['evidence_quality'] not in VALID_EVIDENCE:
        errors.append(f"{file_path}: Invalid evidence_quality '{fm['evidence_quality']}'")

    if 'status' in fm and fm['status'] not in VALID_STATUS:
        errors.append(f"{file_path}: Invalid status '{fm['status']}'")

    return errors


def validate_ai_structure(file_path):
    """Ensure AI-parseable JSON blocks are valid."""
    errors = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    json_blocks = re.findall(r'```json\s*\n(.*?)\n```', content, re.DOTALL)
    for i, block in enumerate(json_blocks):
        try:
            json.loads(block)
        except json.JSONDecodeError as e:
            errors.append(f"{file_path}: Invalid JSON block #{i+1}: {e}")

    return errors


def check_citation_format(file_path):
    """Verify citation format compliance."""
    errors = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    citations = CITATION_PATTERN.findall(content)
    if len(citations) < 5:
        errors.append(
            f"{file_path}: Only {len(citations)} citations found "
            f"(minimum 5 recommended per document)"
        )

    return errors


def check_content_standards(file_path):
    """Check minimum content standards."""
    errors = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    word_count = len(content.split())
    if word_count < 500:
        errors.append(
            f"{file_path}: Only {word_count} words "
            f"(minimum 500 recommended)"
        )

    required_sections = ['## Executive Summary', '## Key Findings', '## Evidence & Sources']
    for section in required_sections:
        if section not in content:
            errors.append(f"{file_path}: Missing section '{section}'")

    return errors


def check_links(file_path):
    """Validate internal cross-references and image paths."""
    errors = []
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    internal_links = re.findall(r'\[.*?\]\(((?!http).*?)\)', content)
    base_dir = Path(file_path).parent
    for link in internal_links:
        link_path = base_dir / link
        if not link_path.exists() and not link.startswith('#'):
            errors.append(f"{file_path}: Broken internal link '{link}'")

    return errors


def validate_directory(directory, checks):
    """Run validation checks on all markdown files in directory."""
    all_errors = []
    md_files = list(Path(directory).rglob('*.md'))

    if not md_files:
        print(f"No markdown files found in {directory}")
        return all_errors

    for md_file in md_files:
        if '.github' in str(md_file):
            continue

        for check_name, check_func in checks.items():
            errors = check_func(str(md_file))
            all_errors.extend(errors)

    return all_errors


def main():
    if len(sys.argv) < 3:
        print("Usage: python validate-doc.py [--check-flag] <directory>")
        sys.exit(1)

    flag = sys.argv[1]
    directory = sys.argv[2]

    checks = {}
    if flag == '--check-frontmatter':
        checks['frontmatter'] = validate_frontmatter
    elif flag == '--check-ai-structure':
        checks['ai_structure'] = validate_ai_structure
    elif flag == '--check-content':
        checks['content'] = check_content_standards
        checks['citations'] = check_citation_format
    elif flag == '--check-links':
        checks['links'] = check_links
    elif flag == '--all':
        checks = {
            'frontmatter': validate_frontmatter,
            'ai_structure': validate_ai_structure,
            'content': check_content_standards,
            'citations': check_citation_format,
            'links': check_links,
        }
    else:
        print(f"Unknown flag: {flag}")
        sys.exit(1)

    errors = validate_directory(directory, checks)

    if errors:
        print(f"\n{'='*60}")
        print(f"VALIDATION ERRORS ({len(errors)} found)")
        print(f"{'='*60}")
        for error in errors:
            print(f"  ✗ {error}")
        sys.exit(1)
    else:
        print(f"✓ All checks passed for {directory}")
        sys.exit(0)


if __name__ == "__main__":
    main()
