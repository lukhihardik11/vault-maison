# Contributing to Vault Maison

## Documentation Standards

All contributions to this repository must adhere to the documentation standards outlined below. These standards ensure consistency, quality, and dual-format compatibility for both AI systems and human readers.

### File Naming Convention

Every file must follow the naming pattern `YYYYMMDD-[category]-[specific-topic]-[version].md`. For example, a competitive analysis document created on April 10, 2026 would be named `20260410-research-competitive-analysis-heritage-brands-v1.md`. Categories include `research`, `strategy`, `design`, `technical`, and `operations`.

### Required Document Structure

Every document must include YAML frontmatter with the following required fields: `title`, `category`, `subcategory`, `version`, `date`, `author`, `reviewers`, `ai_tags`, `confidence_level`, `evidence_quality`, `dependencies`, `related_documents`, `last_updated`, and `status`. The body must contain an Executive Summary, Key Findings (in JSON format), Detailed Analysis, Evidence and Sources, Next Actions, and AI Prompt Integration sections.

### Citation Format

All citations must follow the exact format: **(Source Title, Publication/Company, Date, URL, Key Finding/Quote)**. Include page numbers for reports, timestamps for video/podcast sources, and methodology notes for consumer research. Each document should contain a minimum of 5 citations, and the repository as a whole must maintain at least 100 total citations.

### Evidence Standards

When claiming an "industry pattern," provide a minimum of 8 brand examples. When claiming a "best practice," provide a minimum of 5 implementation examples. When claiming an "emerging trend," provide a minimum of 12 data points from the last 18 months. Always include counter-examples and failure cases for every pattern claimed.

## Review Process

All contributions must be submitted via pull request and require approval from at least two reviewers. The automated documentation quality workflow will validate frontmatter, AI structure, content standards, and links before a PR can be merged.

## Getting Help

If you have questions about documentation standards or need assistance with a contribution, open an issue using the Research Request template.
