/**
 * Normalize article titles — deterministic rules, no LLM needed.
 * Applied at ingestion time and as a one-time backfill.
 */
import { toSentenceCase } from './sentence-case.js';

/**
 * Editorial policy: replace "Trump" / "Donald Trump" / possessive variants in
 * titles with the neutral noun phrase "the administration", so the resulting
 * title is still grammatical and readable. (The earlier behavior — bare
 * deletion — produced fragments like "What did know about Epstein?" or
 * "by needs Ukraine to stop drones".)
 *
 * Matches (case-insensitive, at word boundaries):
 *   - "Donald Trump's", "Donald Trump"
 *   - "Trump's", "Trump\u2019s", "TRUMP", "trump"
 *
 * Possessives are preserved: "Trump's" → "the administration's".
 * The replacement is capitalized at the very start of the title and after
 * sentence-ending punctuation. Otherwise it stays lowercase, which is correct
 * mid-sentence and within "NEW POLL: ..." style colons (downstream rules
 * handle title casing).
 *
 * Does not touch "trumpet", "trumpeter", etc. — strict word boundaries.
 */
export function stripTrump(title: string): string {
  const REPLACEMENT = 'the administration';
  const POSSESSIVE_REPLACEMENT = "the administration's";

  // Order matters: match "Donald Trump" before bare "Trump".
  let out = title.replace(
    /\bdonald\s+trump(['\u2019]s)?\b/gi,
    (_m: string, poss: string | undefined) => (poss ? POSSESSIVE_REPLACEMENT : REPLACEMENT),
  );
  out = out.replace(
    /\btrump(['\u2019]s)?\b/gi,
    (_m: string, poss: string | undefined) => (poss ? POSSESSIVE_REPLACEMENT : REPLACEMENT),
  );

  // Capitalize "the" → "The" at the very start of the title or right after
  // sentence-ending punctuation. (Mid-sentence stays lowercase, which is
  // correct grammar.)
  out = out.replace(/^the administration/, 'The administration');
  out = out.replace(/([.!?]\s+)the administration/g, '$1The administration');

  // Collapse multiple spaces and stray spaces around dashes left by the swap.
  out = out.replace(/\s{2,}/g, ' ').trim();

  return out;
}

/**
 * Decode HTML entities in titles forever and always. RSS feeds, Substack, and
 * YouTube hand us titles full of `&#039;`, `&amp;`, `&#8217;`, `&quot;`, etc.
 * They MUST never reach the DB or downstream consumers — decode at ingest.
 *
 * Covers: decimal NCRs (&#039;), hex NCRs (&#x27;), and the common named
 * entities. Runs in a loop because feeds occasionally double-encode
 * (e.g. `&amp;#039;`).
 */
const NAMED_ENTITIES: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  ldquo: '\u201C', rdquo: '\u201D', lsquo: '\u2018', rsquo: '\u2019',
  hellip: '\u2026', mdash: '\u2014', ndash: '\u2013', laquo: '\u00AB',
  raquo: '\u00BB', copy: '\u00A9', reg: '\u00AE', trade: '\u2122',
  middot: '\u00B7', bull: '\u2022', deg: '\u00B0', euro: '\u20AC',
  pound: '\u00A3', yen: '\u00A5', cent: '\u00A2', sect: '\u00A7',
  para: '\u00B6', dagger: '\u2020', Dagger: '\u2021', permil: '\u2030',
  prime: '\u2032', Prime: '\u2033', frasl: '\u2044',
};
export function decodeHtmlEntities(input: string): string {
  let prev = '';
  let out = input;
  // Loop because feeds sometimes double-encode (`&amp;#039;` → `&#039;` → `'`).
  for (let i = 0; i < 5 && out !== prev; i++) {
    prev = out;
    out = out
      .replace(/&#x([0-9a-fA-F]+);/g, (_m: string, h: string) => String.fromCodePoint(parseInt(h, 16)))
      .replace(/&#(\d+);/g, (_m: string, d: string) => String.fromCodePoint(parseInt(d, 10)))
      .replace(/&([a-zA-Z][a-zA-Z0-9]+);/g, (m: string, name: string) =>
        Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, name) ? NAMED_ENTITIES[name] : m,
      );
  }
  return out;
}

import { stripPublicationFromTitle } from './strip-publication.js';

export interface NormalizeTitleOptions {
  /** When provided, strip a redundant publication-name prefix/suffix early. */
  publicationName?: string;
}

export function normalizeTitle(title: string, opts: NormalizeTitleOptions = {}): string {
  // Decode HTML entities FIRST so every downstream rule sees real characters.
  let t = decodeHtmlEntities(title).trim();

  // Editorial policy: strip Trump references before any other processing.
  t = stripTrump(t);

  // Strip redundant publication-name prefix/suffix (e.g. "ChinaTalk: Iran").
  if (opts.publicationName) {
    t = stripPublicationFromTitle(t, opts.publicationName);
  }

  // Strip emoji prefixes (e.g., "🧠 Community Wisdom: ...")
  t = t.replace(/^(?:\p{Emoji_Presentation}|\p{Extended_Pictographic})+\s*/u, '');

  // Strip YouTube channel suffixes: "Topic | Channel Name" -> "Topic"
  // Only if the pipe-separated suffix looks like a channel name (short, no verbs)
  const pipeMatch = t.match(/^(.+?)\s*\|\s*([^|]+)$/);
  if (pipeMatch && pipeMatch[2].split(/\s+/).length <= 5) {
    t = pipeMatch[1].trim();
  }

  // Truncate newsletter multi-section titles at first //
  if (t.includes(' // ')) {
    t = t.split(' // ')[0].trim();
  }

  // Enforce sentence case: capitalize only the first word and proper nouns.
  // Replaces the old ALL-CAPS-to-Title-Case and individual-ALL-CAPS-word blocks.
  t = toSentenceCase(t);

  // Strip trailing periods
  t = t.replace(/\.+\s*$/, '');

  // Strip parenthetical asides at end
  t = t.replace(/\s*\([^)]{0,40}\)\s*$/, '').trim();

  // Collapse excessive punctuation
  t = t.replace(/!{2,}/g, '!').replace(/\?{2,}/g, '?');

  // Cap at 100 chars with word-boundary truncation
  if (t.length > 100) {
    t = t.slice(0, 100).replace(/\s+\S*$/, '').trim();
    if (!t.endsWith('.') && !t.endsWith('?') && !t.endsWith('!')) {
      t += '\u2026';
    }
  }

  return t;
}
