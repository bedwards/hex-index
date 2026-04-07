# hex-index Quality Tracker — Priority 1

**Standing rule:** Obvious mistakes (dead internal links, missing article sections, broken pipeline outputs) are **Priority 1** for hex-index. Fix dead links. Hide articles with errors or missing parts. Maintain this list. See every report through to fix + completion.

The publish gate must verify, before flipping any article to live:

1. All expected article sections are present (article body, deep dives, any other sections defined in the article schema).
2. Every internal link in the article body resolves to an existing page — including auto-generated `/wikipedia/<slug>/` references.
3. No section is empty or stubbed-out.

Articles that fail any check should be **hidden** (de-indexed, not displayed) until the issue is resolved, not published in a broken state.

## Open issues

| ID | URL | Issue | Status | Reported |
|---|---|---|---|---|
| HX-FEAT-001 | home page | Trending Storylines section: surface consolidated articles whose constituents are <7 days old at the top of home | **OPEN** — generator hooked up but section not rendering live; investigate | 2026-04-07 (Brian) |

## Closed issues

| ID | URL | Resolution | Closed |
|---|---|---|---|
| HX-001 | /article/6b127e88 | Hidden from listings (image_path NULL'd). Consolidated article has no Wikipedia deep dives because the consolidation pipeline doesn't seed wiki-discover. 7 sibling consolidated articles in same state also hidden. | 2026-04-07 (commit 235714a027) |
| HX-002 | /article/244256ef → /wikipedia/promsvyazbank/ | Root cause was NOT slug drift. DB had all 5 slugs at status=complete with non-null content_path and matching library files on disk. The static generator had simply not run `--only wikipedia` since those wiki articles were rewritten — only `home,articles,tags` was being regenerated each loop cycle. Fixed by running wiki regen (4486 pages) and pushing. | 2026-04-07 (commit 235714a027) |
| HX-003 | first multi-source consolidated commentary (2026-04-06) | Same root cause as HX-002. Resolved by full wiki regen. | 2026-04-07 (commit 235714a027) |
| HX-004 | /article/6d42940a → /wikipedia/lossy-compression/ + /wikipedia/stochastic-parrot/ | Same root cause as HX-002. Resolved by full wiki regen. | 2026-04-07 (commit 235714a027) |

## Diagnosis postmortem (2026-04-07)

The handoff diagnosis hypothesized "slug derivation drift between wikipedia-discover and article-rewrite". That hypothesis was **wrong**. Verification query showed all 4 "broken" slugs existed in DB exactly as the in-body links referenced them, with non-trivial library files on disk. The bug was upstream: this loop session had been running `npm run static:generate -- --only home,articles,tags` on every cycle and never `--only wikipedia`. Wikipedia pages are only regenerated when explicitly requested. New wiki-rewrites that landed since the last full regen never made it to the static site.

The "long slugs work" pattern was coincidence: the longer slugs happened to have been generated and pushed in earlier cycles; the shorter ones had been DB-completed AFTER the last wikipedia regen.

## Standing rules for this loop session (encoded forever)

- After every cycle that detects new ready wiki-articles (or whenever new article links reference a wiki slug whose `docs/wikipedia/<slug>/` doesn't exist), regenerate wikipedia pages too, not just home/articles/tags.
- Before publishing any article, run the publish gate: every internal `/wikipedia/<slug>/` link must resolve to an existing `docs/` file. If not, regen wiki first, then verify, then publish.
- Hide consolidated articles that lack deep dives (until consolidation pipeline seeds wiki-discover for them).
