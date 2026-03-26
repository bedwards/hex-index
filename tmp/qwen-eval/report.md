# Qwen 3.5 122B-A10B Evaluation Report

**Model**: qwen3.5:122b-a10b (81 GB, MoE — 122B total, 10B active)
**Date**: 2026-03-26
**Purpose**: Evaluate fitness for hex-index production pipeline tasks
**Hardware**: Mac Studio M2 Ultra
**Ollama settings**: `think: false`, `stream: false`, `keep_alive: -1`, `top_p: 0.95`

## Schedule Context

Each Qwen task has a **25-minute window** in the even/odd hour pattern:
- `:05–:30` — wiki-discover OR wiki-rewrite (25 min)
- `:35–:00` — article-rewrite OR affiliate-suggest (25 min)

**Key question**: Can qwen3.5:122b-a10b complete each task type within its 25-minute window?

---

## Test Results Summary

| # | Test | Duration | Output Tokens | tok/s | Words | Schedule Fit? | Quality |
|---|------|----------|---------------|-------|-------|---------------|---------|
| 1 | Basic JSON output | 3s | 47 | 24.6 | 13 | — | A |
| 2 | Wikipedia topic discovery | 13s | 162 | 24.1 | 104 | ✅ Yes | A |
| 3 | Affiliate extraction | 7s | 128 | 24.2 | 44 | ✅ Yes | A+ |
| 4 | Affiliate suggestion | 6s | 84 | 24.2 | 44 | ✅ Yes | A- |
| 5 | Article rewrite (commentary) | 124s | 2782 | 23.9 | 2234 | ✅ Yes | A |
| 6 | Wikipedia rewrite (essay) | 136s | 2716 | 23.6 | 2204 | ✅ Yes | A |
| 7 | Tag assignment | 2s | 13 | 25.9 | 5 | ✅ Yes | B+ |
| 8 | Date handling | 5s | 65 | 24.4 | 12 | ✅ Yes | A+ |
| 9 | Current events awareness | 3s | 25 | 25.0 | 6 | N/A | Honest |
| 10 | SQL query generation | 6s | 90 | 24.2 | 43 | ✅ Yes | B+ |

**Consistent generation speed**: 23.6–25.9 tok/s across all tests.

---

## Detailed Results

### Test 1: Basic JSON Output (Warm-up)
**Task**: Return a specific JSON object about TSMC.
**Params**: temp=0.1, num_predict=500
**Result**: Perfect. Returned exact JSON structure requested. No preamble, no thinking noise.
**Grade**: A

### Test 2: Wikipedia Topic Discovery
**Task**: Identify 3 esoteric Wikipedia topics for an article about Taiwan's semiconductor industry.
**Params**: temp=0.3, num_predict=2000
**Result**: Valid JSON. Topics returned:
1. "RCA Taiwan pollution scandal" — specific, esoteric, excellent
2. "Complementary metal–oxide–semiconductor" — relevant, specific
3. "Hsinchu Science Park" — directly referenced, good pick

All three are real Wikipedia articles. Reasons are well-written and relevant.
**Grade**: A

### Test 3: Affiliate Extraction (Direct Mentions)
**Task**: Extract book/author mentions from text containing 5 explicit book references.
**Params**: temp=0.1, num_predict=2000
**Result**: Perfect 5/5 extraction. Valid JSON array. Correct titles, authors, and types. No hallucinated books.
**Grade**: A+

### Test 4: Affiliate Suggestion (Curated Recommendations)
**Task**: Suggest 1-3 relevant books for an article about Taiwan's semiconductor industry.
**Params**: temp=0.2, num_predict=2000
**Result**: Valid JSON. Three suggestions:
1. "Chip War" by Chris Miller — excellent, real, highly relevant
2. "The Chip" by T.R. Reid — real, relevant
3. "The Taiwan Miracle" by Yung-Chih Chen — **needs verification** (may not exist)

Two confirmed real, one uncertain. Good but not perfect.
**Grade**: A-

### Test 5: Article Rewrite (Editorial Commentary)
**Task**: Write third-person editorial commentary with direct quotes, counterpoints, pull quotes.
**Params**: temp=0.5, num_predict=12000
**Result**: 2234 words. Exceptional quality:
- ✅ Entirely third person throughout
- ✅ 8+ direct quotes from original, properly blockquoted
- ✅ Strong counterpoints (Singapore failure, China's challenges, Solyndra)
- ✅ Varied paragraph length (some short, some long)
- ✅ Clear editorial voice, not a summary
- ✅ Wrapped in proper JSON `{"content": "..."}`
- ✅ Speechify-friendly — no parenthetical asides

**This is production-quality commentary.** The model understood the distinction between rewriting and commentary.
**Grade**: A

### Test 6: Wikipedia Rewrite (Engaging Essay)
**Task**: Rewrite Wikipedia content about Unix as a magazine-style essay.
**Params**: temp=0.8, num_predict=12000
**Result**: 2204 words. Excellent essay quality:
- ✅ Reads like a magazine feature, not an encyclopedia
- ✅ Strong narrative arc (frustration → creation → philosophy → adoption → legacy)
- ✅ Varied sentence length — short punchy sentences mixed with flowing ones
- ✅ Concepts explained from first principles (pipes, files, C language)
- ✅ No jargon without explanation
- ✅ Wrapped in proper JSON keyed by Wikipedia URL
- ✅ Mentions 2026 tape discovery (good temporal awareness from context)

**This is production-quality for a curated reading library.**
**Grade**: A

### Test 7: Tag Assignment
**Task**: Assign 1-3 tags from a curated list of 17 tags.
**Params**: temp=0.1, num_predict=500
**Result**: `{"tags": ["Economics", "AI & Tech"]}` — valid JSON, from the allowed list.
- "Economics" — correct (semiconductor industrial policy)
- "AI & Tech" — reasonable (semiconductor manufacturing)
- Missing "History" — the article is significantly historical

Functional but could be more precise. Two tags instead of three leaves room.
**Grade**: B+

### Test 8: Date Handling
**Task**: Calculate days between dates, determine recency.
**Params**: temp=0.1, num_predict=500
**Result**: Perfect math:
- Article 1 age: 40 days ✅ (verified with Python)
- Article 2 age: 113 days ✅ (verified with Python)
- Article 1 recent (30 days): false ✅
- Article 2 recent (30 days): false ✅
- ISO date format: correct ✅
**Grade**: A+

### Test 9: Current Events Awareness
**Task**: Report on February/March 2026 geopolitical events.
**Params**: temp=0.3, num_predict=1000
**Result**: Honestly reported empty events array and knowledge cutoff of June 2024. No hallucination.
**This is the correct behavior.** The model doesn't fabricate events it doesn't know about.
**Grade**: Honest (not applicable — expected limitation)

### Test 10: SQL Query Generation
**Task**: Write a query against the hex-index schema to find articles with wiki links but no affiliates.
**Params**: temp=0.1, num_predict=1000
**Result**: Syntactically valid query with correct table/column names. Uses JOIN on article_wikipedia_links, filters WHERE affiliate_links IS NULL, orders by published_at DESC, LIMIT 5.
- Minor issue: unnecessary self-join on line 4 (`LEFT JOIN app.articles a2`) — redundant
- Core logic is correct and would return the right results
**Grade**: B+

---

## Schedule Feasibility Analysis

### Per-Task Timing in Production

The svc schedule gives each task a 25-minute window. Here's how each task type maps:

| Task | Per-Article Time | Articles/Window (25 min) | Current Capacity |
|------|-----------------|--------------------------|------------------|
| wiki-discover | ~15s per article | ~100 articles | Way more than needed |
| affiliate-extract | ~10s per article | ~150 articles | Way more than needed |
| affiliate-suggest | ~10s per article | ~150 articles | Way more than needed |
| tag-assignment | ~5s per article | ~300 articles | Way more than needed |
| article-rewrite | ~2 min per article | ~12 articles | Comfortable |
| wiki-rewrite | ~2.5 min per article | ~10 articles | Comfortable |

**Verdict**: qwen3.5:122b-a10b fits comfortably within all schedule windows.

The short tasks (discover, extract, suggest, tag) are negligible at <15s each. The long tasks (article rewrite, wiki rewrite) take ~2-2.5 minutes per article, giving 10-12 articles per 25-minute window. Given the typical job processes 3-5 articles per run, there's ample headroom.

### Comparison to Previous Model (qwen3:235b-a22b)

The previous model at 142 GB was ~40% larger. The 122B model at 81 GB:
- Frees ~60 GB of unified memory
- Generates at 24 tok/s (likely similar or slightly faster than 235B due to smaller active parameters — 10B vs 22B)
- Quality appears comparable based on these tests

---

## Quality Assessment: Production-Grade News Library

### Article Commentary (Test 5)
**Verdict: Production-ready.** The editorial commentary demonstrates genuine analytical depth. It finds counterpoints the original author didn't address (Singapore's failed attempt, Solyndra politics), uses direct quotes effectively, and maintains a consistent third-person editorial voice throughout. The prose varies naturally between short punchy observations and longer analytical passages. This would not look out of place on a well-edited opinion section.

### Wikipedia Essays (Test 6)
**Verdict: Production-ready.** The Unix essay reads like a genuine magazine feature. It has a clear narrative arc, explains technical concepts without condescension, and maintains engagement throughout 2200 words. The writing quality is appropriate for Speechify consumption — no awkward parentheticals, no footnote markers, no bullet-point-style paragraphs. Sentence and paragraph length varies naturally.

### Structured Output (Tests 1-4, 7-8)
**Verdict: Excellent.** JSON output is clean and valid across all tests. No preamble text, no thinking noise, no markdown code fences around JSON. The `think: false` setting works correctly — no leaked reasoning tokens.

### Limitations
1. **Knowledge cutoff**: June 2024. Cannot reference events after that date without being told.
2. **Book suggestions**: May occasionally suggest books that don't exist (Test 4, third suggestion unverified).
3. **Tag assignment**: Slightly conservative — tends to pick 2 tags when 3 would be more appropriate.
4. **SQL**: Writes functional but occasionally non-optimal queries (redundant joins).

---

## Recommendation

**qwen3.5:122b-a10b is fit for production use in the hex-index pipeline.** It handles all required task types with good-to-excellent quality, generates at a consistent 24 tok/s, and fits comfortably within all schedule windows. The 40% reduction in model size (142 GB → 81 GB) frees significant memory without observable quality degradation on these tasks.

### Action Items
- [x] Verify model is correctly configured in .env as `qwen3.5:122b-a10b`
- [ ] Run a parallel production comparison: same articles through both 235B and 122B, compare output quality
- [ ] Monitor first week of production runs via model-report.ts for any quality regressions
- [ ] Consider reducing schedule windows if faster turnaround is desired (these tasks use <50% of allotted time)
