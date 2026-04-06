/**
 * Pure helpers for the Claude consolidation worker (issue #449).
 *
 * Kept free of DB / filesystem imports so the unit tests can exercise
 * them without spinning up Postgres. The worker in `consolidate.ts`
 * composes these with side-effecting I/O.
 */

import type { Article as CandidateArticle } from './consolidation-candidates.js';

// ── Types ───────────────────────────────────────────────────────────

/** An input source article passed to the LLM synthesis step. */
export interface SourceArticle {
  id: string;
  title: string;
  author_name: string | null;
  publication_id: string;
  publication_name: string;
  original_url: string;
  /** Qwen-rewritten commentary HTML loaded from disk. May be empty. */
  rewritten_html: string;
  /** Short excerpt of the original (fallback when no rewrite exists). */
  excerpt: string;
}

/** What the LLM step returns. */
export interface SynthesisResult {
  /** Original title (NOT lifted from any source). */
  title: string;
  /** Full commentary HTML body (no <html>/<body> wrapper). */
  html: string;
  /** Which source to mark `is_primary=true`. */
  primarySourceId: string;
}

/**
 * Interface for the LLM synthesis step. The default implementation calls
 * `claude -p` as a subprocess; tests inject a fake that returns a canned
 * payload so they can run offline.
 */
export interface CommentarySynthesizer {
  synthesizeCommentary(sources: SourceArticle[]): Promise<SynthesisResult>;
  /** Revise an existing consolidation to incorporate a new source. */
  reviseCommentary(
    existingTitle: string,
    existingHtml: string,
    sources: SourceArticle[],
    newSource: SourceArticle,
  ): Promise<SynthesisResult>;
}

// ── Candidate verification ──────────────────────────────────────────

export interface VerificationResult {
  ok: boolean;
  reason: string;
}

/**
 * Verify that a candidate group is actually eligible for consolidation.
 * Rejects groups that don't have ≥2 distinct publications, ≥2 members,
 * or >4 members.
 */
export function verifyCandidateGroup(
  sources: Pick<CandidateArticle, 'id' | 'publication_id'>[],
): VerificationResult {
  if (sources.length < 2) {
    return { ok: false, reason: 'fewer than 2 sources' };
  }
  if (sources.length > 4) {
    return { ok: false, reason: 'more than 4 sources (max is 4)' };
  }
  const pubs = new Set(sources.map((s) => s.publication_id));
  if (pubs.size < 2) {
    return { ok: false, reason: 'only 1 distinct publication (need diverse voices)' };
  }
  return { ok: true, reason: `ok: ${sources.length} sources / ${pubs.size} publications` };
}

// ── Trump policy ────────────────────────────────────────────────────

const TRUMP_RE = /\b(donald\s+)?trump(?:'s)?\b/i;

/** Returns true if the text mentions "Trump" or "Donald Trump". */
export function containsTrumpMention(text: string): boolean {
  return TRUMP_RE.test(text);
}

// ── Prompt construction ─────────────────────────────────────────────

/**
 * Build the synthesis prompt that is sent to Claude. Exported so the
 * test suite can assert that the Trump-forbidden instruction and each
 * source's attribution line are present.
 */
export function buildSynthesisPrompt(sources: SourceArticle[]): string {
  const header = `You are Brian Edwards, writing a consolidated "by Brian Edwards" commentary that synthesizes ${sources.length} source articles reporting on the same or similar story.

EDITORIAL POLICY — NON-NEGOTIABLE:
- Do NOT mention "Trump" or "Donald Trump" anywhere in the title or body. Reframe around the underlying news, policy, institutions, agencies, or officials (e.g. "the administration", "the White House", "the executive branch").
- Write in the THIRD person. Never use "I", "we", or "you".
- Preserve direct quotes from each source, attributed by author.
- Explicitly contrast and integrate the diverse voices — do not simply summarize.
- Include a "Bottom Line" section and address counterpoints the sources did not.
- Include 1–2 pull quotes.
- Output clean, semantic HTML suitable for Speechify text-to-speech. No widgets, share buttons, empty paragraphs, or JavaScript.
- Write an ORIGINAL title — do not lift a title from any source.

SOURCES:
`;

  const body = sources
    .map((s, i) => {
      return `
--- SOURCE ${i + 1} ---
id: ${s.id}
author: ${s.author_name ?? 'unknown'}
publication: ${s.publication_name}
original_title: ${s.title}
original_url: ${s.original_url}

Qwen rewrite (commentary we already have):
${s.rewritten_html || '(no rewrite available — use excerpt below)'}

Excerpt:
${s.excerpt}
`;
    })
    .join('\n');

  const footer = `

TASK:
Return a JSON object (and nothing else) with exactly these keys:
{
  "title": "<original consolidated title — no 'Trump'>",
  "html":  "<commentary HTML body — no wrapper tags>",
  "primarySourceId": "<id of the source whose voice dominates>"
}
`;

  return header + body + footer;
}

/** Build the revision prompt used in Mode B. */
export function buildRevisionPrompt(
  existingTitle: string,
  existingHtml: string,
  sources: SourceArticle[],
  newSource: SourceArticle,
): string {
  return `You are Brian Edwards. An existing consolidated commentary needs to be revised to incorporate a newly arrived source article on the same story.

EDITORIAL POLICY — NON-NEGOTIABLE:
- Do NOT mention "Trump" or "Donald Trump" anywhere in the title or body.
- Third person only. No "I"/"we"/"you".
- Preserve direct quotes from every source, attributed by author.
- Keep the Bottom Line section and counterpoints structure.
- Clean semantic HTML for Speechify.

EXISTING COMMENTARY:
title: ${existingTitle}
html:
${existingHtml}

EXISTING SOURCES (already incorporated):
${sources.map((s) => `- [${s.publication_name}] ${s.author_name ?? 'unknown'}: ${s.title}`).join('\n')}

NEW SOURCE TO INTEGRATE:
id: ${newSource.id}
author: ${newSource.author_name ?? 'unknown'}
publication: ${newSource.publication_name}
title: ${newSource.title}
Qwen rewrite:
${newSource.rewritten_html || '(none)'}
Excerpt:
${newSource.excerpt}

TASK:
Return a JSON object (and nothing else):
{
  "title": "<possibly-updated title — no 'Trump'>",
  "html":  "<revised commentary HTML body>",
  "primarySourceId": "<id of dominant source; may be unchanged>"
}
`;
}

// ── Stub synthesizer used by tests (and as a safe fallback) ─────────

/**
 * A deterministic synthesizer that produces a well-formed result
 * without calling any external process. Used by the unit tests as a
 * fake and by the CLI as a safety fallback in dry-run mode.
 */
export function makeStubSynthesizer(): CommentarySynthesizer {
  function synth(sources: SourceArticle[]): Promise<SynthesisResult> {
    return Promise.resolve(synthSync(sources));
  }
  function synthSync(sources: SourceArticle[]): SynthesisResult {
    const quotes = sources
      .map(
        (s) =>
          `    <blockquote><p>"A representative passage from ${escapeHtml(
            s.publication_name,
          )}."</p><cite>— ${escapeHtml(s.author_name ?? s.publication_name)}</cite></blockquote>`,
      )
      .join('\n');

    const attributions = sources
      .map(
        (s) =>
          `  <p>Writing for <strong>${escapeHtml(
            s.publication_name,
          )}</strong>, ${escapeHtml(s.author_name ?? 'the author')} argues that the story matters.</p>`,
      )
      .join('\n');

    const primary = sources.reduce((best, s) =>
      (s.rewritten_html?.length ?? 0) > (best.rewritten_html?.length ?? 0) ? s : best,
    );

    const html = `<article class="consolidated-commentary">
  <p class="deck">A synthesis of ${sources.length} voices on the same developing story.</p>
${attributions}
${quotes}
  <h2>Bottom Line</h2>
  <p>The contrast among these sources reveals that a single narrative does not capture the full picture.</p>
  <h2>Counterpoints</h2>
  <p>None of the sources fully engaged with the institutional dynamics at play.</p>
</article>`;

    return {
      title: `Perspectives on the Developing Story (${sources.length} voices)`,
      html,
      primarySourceId: primary.id,
    };
  }

  return {
    synthesizeCommentary: synth,
    reviseCommentary(_existingTitle, _existingHtml, sources, newSource) {
      return synth([...sources, newSource]);
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Merge helpers ───────────────────────────────────────────────────

export interface WikiLinkRow {
  wikipedia_id: string;
  relevance_rank: number;
  topic_summary: string;
}

/**
 * Dedupe wikipedia links from multiple source articles, preserving the
 * best relevance rank (lower = better) per wikipedia_id and capping the
 * result at 3 (the table's per-article UNIQUE constraint).
 */
export function mergeWikipediaLinks(
  perSource: WikiLinkRow[][],
): WikiLinkRow[] {
  const best = new Map<string, WikiLinkRow>();
  for (const rows of perSource) {
    for (const r of rows) {
      const prev = best.get(r.wikipedia_id);
      if (!prev || r.relevance_rank < prev.relevance_rank) {
        best.set(r.wikipedia_id, r);
      }
    }
  }
  const sorted = [...best.values()].sort((a, b) => a.relevance_rank - b.relevance_rank);
  // Re-rank 1..3 to satisfy UNIQUE(article_id, relevance_rank)
  return sorted.slice(0, 3).map((r, i) => ({ ...r, relevance_rank: i + 1 }));
}

export interface AffiliateLink {
  asin?: string;
  title: string;
  author: string;
  description?: string;
  category?: string;
  [k: string]: unknown;
}

/** Dedupe affiliate book links by asin (or title+author when no asin). */
export function mergeAffiliateLinks(perSource: AffiliateLink[][]): AffiliateLink[] {
  const seen = new Map<string, AffiliateLink>();
  for (const arr of perSource) {
    for (const link of arr) {
      const key = link.asin
        ? `asin:${link.asin}`
        : `ta:${link.title.toLowerCase()}|${link.author.toLowerCase()}`;
      if (!seen.has(key)) { seen.set(key, link); }
    }
  }
  return [...seen.values()];
}
