# Static Site Generator

This document describes the static site generator that creates a public GitHub Pages site from the private Hex Index library.

## Overview

The private library at `src/` runs on Express + PostgreSQL and provides full-text search, complete article content, and Wikipedia deep dives. The human uses this for personal reading.

The public static site at `docs/` is a copyright-compliant version that:
- Shows **excerpts only** (~200 words) for Substack articles
- Shows **full content** for Wikipedia rewrites (we own copyright)
- Has no search (removes database dependency)
- Deploys automatically via GitHub Pages

**URL**: https://bedwards.github.io/hex-index/

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Private Library                          │
│  src/                                                       │
│  ├── api/pages.ts    (full content rendering)               │
│  ├── db/             (PostgreSQL queries)                   │
│  └── ...             (Express server)                       │
│                                                             │
│  Features: Full content, search, Wikipedia                  │
│  Runs: localhost:3000                                       │
└─────────────────────────────────────────────────────────────┘
           │
           │ npm run static:generate
           │ (reads from database)
           ▼
┌─────────────────────────────────────────────────────────────┐
│                    Static Site                              │
│  docs/                                                      │
│  ├── index.html                   (paginated home)          │
│  ├── page/{n}/index.html          (pagination)              │
│  ├── article/{id}/index.html      (excerpts + link)         │
│  ├── wikipedia/{slug}/index.html  (full content)            │
│  ├── publication/{slug}/index.html (publication pages)      │
│  └── styles.css                                             │
│                                                             │
│  Features: Excerpts, no search, static HTML                 │
│  Deploys: GitHub Pages                                      │
└─────────────────────────────────────────────────────────────┘
```

## Files

### Generator Code

```
tools/static-site/
├── generate.ts           # Main CLI entry point
├── templates.ts          # HTML template functions
├── utils.ts              # Shared utilities
└── pages/
    ├── home.ts           # Paginated home pages (30 per page)
    ├── article.ts        # Article excerpt pages
    ├── wikipedia.ts      # Full Wikipedia content pages
    └── publication.ts    # Publication listing pages
```

### Generated Output

```
docs/
├── index.html                        # Home page 1
├── page/
│   ├── 2/index.html                  # Home page 2
│   ├── 3/index.html                  # etc.
│   └── ...
├── article/
│   └── {uuid}/index.html             # Article excerpt pages
├── wikipedia/
│   └── {slug}/index.html             # Full Wikipedia pages
├── publication/
│   └── {slug}/
│       ├── index.html                # Publication page 1
│       └── page/{n}/index.html       # Pagination
└── styles.css                        # Copied from public/
```

## Usage

### Generate Static Site

```bash
# Ensure database is running
npm run db:up

# Generate static site from current DB state
npm run static:generate

# Or clean and regenerate
npm run static:clean
```

### Preview Locally

```bash
npm run static:preview
# Opens http://localhost:3000 with the static site
```

### Deploy

Push to main branch. GitHub Pages automatically serves from `docs/`.

## Copyright Compliance

### Substack Articles

We only show ~200 word excerpts with a prominent link to the original:

```html
<div class="article-excerpt">
  <p>First ~200 words of the article...</p>
  <div class="excerpt-fade"></div>
</div>
<div class="read-full-article">
  <a href="https://..." class="read-button">
    Read full article on Publication Name →
  </a>
</div>
```

This is fair use: we provide discovery/preview, then direct users to the original source.

### Wikipedia Articles

We show full content because we own copyright on our rewrites. The original Wikipedia content is licensed CC BY-SA, and our rewrites are original creative works.

## Database Schema

The generator queries these tables:

```sql
app.articles           -- Substack articles
app.publications       -- Publication metadata
app.wikipedia_articles -- Wikipedia rewrites
app.article_wikipedia_links -- Links between articles and Wikipedia
```

Key columns:
- `articles.content_path` - filesystem path to HTML content
- `articles.original_url` - link to original Substack article
- `wikipedia_articles.content_path` - filesystem path to rewritten content
- `wikipedia_articles.original_url` - link to original Wikipedia

## Speechify Optimization

All generated HTML is Speechify-compatible:

- Semantic markup (`<article>`, `<header>`, `<p>`, `<h1>`-`<h6>`)
- No JavaScript-dependent content
- Clean prose without widgets or CTAs
- Minimal navigation in reading mode

The `staticReadingLayout()` template provides a minimal header for reading pages.

## DO NOT REGRESS

The private library (`src/`) and static site (`tools/static-site/`) are separate systems.

When working on the static site:
- **DO NOT** modify files in `src/`
- **DO NOT** change database schema
- **DO NOT** affect the private library's functionality

When working on the private library:
- **DO NOT** manually edit files in `docs/`
- Regenerate the static site after database changes: `npm run static:generate`

## Troubleshooting

### "relation does not exist" error
Use the `app.` schema prefix for all tables:
```sql
SELECT * FROM app.articles  -- correct
SELECT * FROM articles      -- wrong
```

### "column does not exist" error
Check the actual column names in the schema:
- `author_name` not `author`
- `content_path` not `content`
- `original_url` not `url`
- `base_url` not `url` for publications

### Empty output
Ensure the database has content:
```bash
npm run db:up
npm run ingest:run
```
