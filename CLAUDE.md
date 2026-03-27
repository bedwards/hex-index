# Claude Code Instructions

This file instructs Claude instances working on this project. Read it completely before starting any task.

## What This Project Is

Hex-index is a curated news reading library. It ingests articles from Substack publications and YouTube transcripts, enriches them with Wikipedia deep dives and book recommendations, and publishes a weekly Reader epub. Brian uses it daily with Speechify for text-to-speech reading.

There are two sites:
- **Private library** (`src/`): Express + Postgres, runs locally, full article content, full-text search
- **Public static site** (`docs/`): GitHub Pages at https://hex-index.com, article excerpts (copyright compliant), full Wikipedia content (we own copyright on our rewrites)

## How Work Gets Done

Brian gives you tasks in Claude Code sessions. You do the work — research, code changes, issue creation, deployments, evaluations. Sometimes the task is small (fix a bug, update a config). Sometimes it's big (build a new feature, redesign a system). Scope depends on what Brian asks for.

### Code Changes

For non-trivial changes, use background Agent workers with `isolation: "worktree"`. The worker creates a branch, writes code, commits, pushes, and creates a PR. You orchestrate and review.

For small changes (config updates, one-line fixes, CLAUDE.md edits), commit directly to main.

### Branch Protection
- Required checks: Lint & Type Check, Unit Tests
- Claude review: **enabled** via `.github/workflows/claude-code-review.yml`
- Gemini review: **enabled** via Gemini Code Assist GitHub App (no workflow needed)
- `enforce_admins: true` — everyone goes through PRs
- `strict: false` — branches don't need to be up to date before merge
- Auto-merge enabled

### Pre-commit Hook
**Never bypass with `--no-verify`.** The hook catches secrets, YAML errors, TypeScript errors, lint errors, and test failures. If it fails, fix the issue.

### Issues
Use the provided tool: `npm run gh:issue -- --title "..." --labels "bug,priority:high"`

If you notice something broken or improvable unrelated to your current task, prefer fixing it immediately if quick. Otherwise create an issue.

## Content Pipeline

Automated jobs run on a schedule via launchctl, managed by `svc` tool.

### LLM: Qwen 3.5 122B-A10B-Q8
All scheduled LLM tasks use `qwen3.5:122b-a10b-q8` via Ollama. The model stays loaded forever on GPU. Only one Qwen job runs at a time.

Job schedule (even/odd hour pattern):
```
EVEN HOURS (00, 02, 04, ..., 22):
  :00  ingest + yt-ingest + gen-images    [no GPU]
  :05  wiki-discover                       [Qwen, 10 min]
  :15  article-rewrite                     [Qwen, 45 min]

ODD HOURS (01, 03, 05, ..., 23):
  :05  affiliate-suggest                   [Qwen, 10 min]
  :15  wiki-rewrite                        [Qwen, 45 min]

WEEKLY:
  Thu 22:00  Stop Qwen, consolidate
  Thu 23:00  build-weekly                  [no LLM]
  Thu 23:30–Fri 07:00  epub editorial review window
  Fri 07:30  send-weekly                   [no LLM, email + text]

ALWAYS:
  every 5m: postgres-watchdog
```

Services managed via `svc` at `/Users/bedwards/vibe/sea-gang/tools/svc`.

### Pipeline Steps
1. **Ingest**: Scrape Substack RSS + YouTube transcripts → Postgres
2. **Wiki discover**: Qwen suggests 3 specific Wikipedia topics per article
3. **Wiki rewrite**: Qwen rewrites Wikipedia stubs as engaging magazine-style essays
4. **Article rewrite**: Qwen writes third-person editorial commentary with direct quotes
5. **Affiliate suggest**: Qwen extracts book/author mentions → resolve ISBNs → Amazon + BWB links
6. **Gen images**: Gemini 2.5 Flash generates article images
7. **Static generate**: Build `docs/` from DB for GitHub Pages
8. **Build weekly**: Compile weekly Reader epub
9. **Send weekly**: Email + text notification to subscribers

### Image Generation
Gemini 2.5 Flash API. Key in `~/.config/.env` (GEMINI_API_KEY). ImageMagick post-processing for vignettes.

### SMS & Email Delivery (send-weekly)
Weekly Reader delivery uses Gmail SMTP for email and **Twilio** for SMS.

**Twilio setup:**
- **Account**: "My first Twilio account"
- **Messaging Service**: "My New Notifications Service" (SID: `MG8d926dbb81d6988465a92c44b7bc1e5f`)
- **Phone numbers**:
  - `+1 855 588 0323` — Toll-free (verification in progress, do NOT rely on for sending until verified)
  - `+1 737 299 0186` — Local (Lampasas, TX), named "Hex Index Notifications"
- **Sender pool**: The Messaging Service sender pool determines which number sends texts. Check/manage at: Twilio Console → Messaging → Services → My New Notifications Service → Sender Pool
- **Secrets** in `~/.config/.env`: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_MESSAGING_SERVICE_SID`
- **Cost**: ~$3.15/mo for both numbers + ~$0.008/outbound SMS

**Current status (2026-03-27)**: SMS is blocked. Neither number can send yet:
- Toll-free (`855`): **Toll-free verification IN_REVIEW** (SID: `HH9e90ce11ef1de07a070e693611d4f172`, submitted 2026-03-27). Error 30032 until approved. 1-3 business days.
- Local (`737`): **Needs A2P 10DLC campaign registration**. Error 30034 without it. See issue #388.
- Only the toll-free is currently in the Messaging Service sender pool.
- Emails work fine — only SMS is affected.

**Long-term plan**: Local number is the target. Steps:
1. Register brand + A2P 10DLC campaign for local number (#388)
2. Add local number to Messaging Service sender pool (#389)
3. Remove/release toll-free to save $2/mo (#390)
4. Add retry logic and error differentiation to send-weekly (#391)

**Check status via CLI**:
```bash
# Toll-free verification status
source ~/.config/.env && curl -s -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN" \
  "https://messaging.twilio.com/v1/Tollfree/Verifications/HH9e90ce11ef1de07a070e693611d4f172" \
  | python3 -c "import sys,json; d=json.load(sys.stdin); print(f'Status: {d[\"status\"]}')"

# List phone numbers
twilio phone-numbers:list

# List messaging services
twilio api:messaging:v1:services:list
```
Twilio CLI profile: `hex-index` (already configured).

**Subscriber list**: Managed externally in Google Sheet, fetched via authenticated Apps Script endpoint. Token: `SUBSCRIBER_TOKEN` in `~/.config/.env`.

## Two-Site Architecture

**Do not confuse the two sites. Do not regress either.**

| Feature | Private Library | Public Static Site |
|---------|-----------------|-------------------|
| Location | `src/` | `docs/` (generated) |
| URL | localhost:3000 | https://hex-index.com |
| Article content | Full text | ~200 word excerpt |
| Wikipedia content | Full | Full |
| Search | Full-text | None |
| Database | Postgres | None (static HTML) |

### Regenerating the Static Site

**Always use incremental generation** — never full regen for small changes.

```bash
# Incremental (use these)
npm run static:generate -- --article <id>      # Single article (0.4s)
npm run static:generate -- --only weekly       # Just weekly page (0.5s)
npm run static:generate -- --only home,tags    # Home + tag pages (15s)
npm run static:generate -- --only assets       # CSS + images (2s)

# Options: home, articles, wikipedia, publications, tags, weekly, about, search, assets

# Full (only when needed)
npm run static:generate   # Full generation (~3 min)
npm run static:clean      # Clean and full regenerate
npm run static:preview    # Preview at localhost:3000
```

### Copyright Compliance
- **Substack articles**: ~200 word excerpts with "Read full article" links
- **Wikipedia rewrites**: Full content (we own copyright on our rewrites)

## Wikipedia Integration

Each article gets 3 related Wikipedia deep dives. Topic selection must be specific and esoteric — "Battle of Thermopylae" not "Ancient Greece". Rewrites should read like magazine features, not encyclopedia entries. Vary sentence/paragraph length, spell out acronyms, explain from first principles. Optimized for Speechify text-to-speech.

## User Experience

### Brian Uses This App Daily
This is not a demo. Brian reads from it with Speechify. Prioritize the reading experience above all else.

### Speechify Compatibility
All HTML must be clean, semantic markup. No widgets, subscription prompts, share buttons, or CTAs. No JavaScript-dependent content. No empty paragraphs or excessive whitespace (creates awkward pauses in TTS).

### Real Content Only
If the database is empty, that's a bug. Test with actual content, not mocks. No fake data in production — if a feature isn't implemented, throw an error.

## Editorial Guidelines

- **Article rewrites are commentary**, not summaries or developmental edits
- Written entirely in **third person** (never "I", "we", "you")
- Include **4-8 direct quotes** from the original author
- Add **counterpoints** the author didn't address
- Include **1-2 pull quotes**
- **Never delete content** — mark dirty for re-processing instead

## Code Standards

### Lint: Zero Warnings
Warnings are an anti-pattern. Useful rules are errors (fix immediately). Useless rules are off. Config in `eslint.config.js`.

### No Global Config Changes
Multiple Claude instances share this machine. Never modify `~/.config/gh/`, global npm, or global git config.

### Secrets
`.env` and `.secrets` are gitignored. Pre-commit hook checks for secrets. Record remote secrets in `.secrets`.

### Tool Organization
One tool per purpose. Use args for variations, not separate files. `tools/<domain>/<action>.ts`. npm scripts wrap tools.

### Dependencies
Always use latest stable versions. Listen to Dependabot.

## Architecture

- **Database**: Postgres (Docker container `hex-index-postgres`, schema in `app` namespace)
- **API**: Express.js with TypeScript
- **Frontend**: Vite with TypeScript
- **Testing**: Vitest (not Jest), Playwright for E2E
- **Local LLM**: Qwen 3.5 122B-A10B-Q8 via Ollama on Mac Studio M2 Ultra
- **Cloud LLM**: Claude Opus 4.6 via Max subscription (`claude -p`)
- **Image Generation**: Gemini 2.5 Flash Image API
- **Deployment**: GitHub Pages (static site), local (private library)

## What You Cannot Do

If a tool isn't authenticated or you lack permissions, **stop immediately**. Report:
1. The exact error
2. What the human needs to do
3. Only actions Claude cannot perform

## Quick Reference

```bash
# Development
npm run db:up              # Start Postgres
npm run dev                # Start API + frontend

# Quality
npm run lint               # ESLint
npm run typecheck          # TypeScript
npm run test               # Unit tests

# GitHub
npm run gh:rate-limit      # Check API limits
npm run gh:issue -- --title "..." --labels "..."

# Static Site (always use incremental flags)
npm run static:generate -- --article <id>      # Single article (0.4s)
npm run static:generate -- --only weekly       # One section (0.5s)
npm run static:generate -- --only home,tags    # Multiple sections (15s)
npm run static:generate                        # Full regen (~3 min, rare)
npm run static:clean                           # Clean + full regen
npm run static:preview                         # Preview at localhost:3000

# Jobs (manual)
npm run job:model-report   # LLM performance report (last 24h)

# Services
svc list                   # Show all services + GPU status
svc start <name>           # Start a service
svc stop <name>            # Stop a service
svc logs <name>            # Tail service logs
svc enable <name>          # Enable a disabled service
svc disable <name>         # Disable a service
```
