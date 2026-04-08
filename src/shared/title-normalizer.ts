/**
 * Normalize article titles — deterministic rules, no LLM needed.
 * Applied at ingestion time and as a one-time backfill.
 */
/**
 * Editorial policy: strip "Trump" / "Donald Trump" / possessive and dash-attached
 * variants from titles. Case-insensitive match, preserves surrounding casing.
 *
 * Matches (at word boundaries):
 *   - "Donald Trump's", "Donald Trump"
 *   - "Trump's", "Trump\u2019s", "Trump\u2014" (em dash), "Trump-", "Trump"
 *
 * Returns the input unchanged if the stripped result is empty (edge case —
 * caller logs a warning).
 */
export function stripTrump(title: string): string {
  // Order matters: match "Donald Trump" variants before bare "Trump".
  // Trailing optional possessive ('s / \u2019s) or dash (-, \u2013, \u2014) absorbed
  // into the match so it gets removed cleanly.
  const trumpRegex = /\b(?:donald\s+)?trump(?:['\u2019]s|\s*[-\u2013\u2014]|'s)?\b/gi;
  let out = title.replace(trumpRegex, '');

  // Collapse multiple spaces left by the removal
  out = out.replace(/\s{2,}/g, ' ');

  // Strip leading/trailing stray punctuation & whitespace left orphaned
  // (colons, dashes, pipes, commas) — e.g. "| foo" or ": foo"
  out = out.replace(/^[\s:|\-\u2013\u2014,;]+/, '');
  out = out.replace(/[\s:|\-\u2013\u2014,;]+$/, '');

  out = out.trim();

  if (out.length === 0 && title.trim().length > 0) {
    console.warn(`stripTrump: normalization emptied title, keeping original: "${title}"`);
    return title;
  }
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

export function normalizeTitle(title: string): string {
  // Decode HTML entities FIRST so every downstream rule sees real characters.
  let t = decodeHtmlEntities(title).trim();

  // Editorial policy: strip Trump references before any other processing.
  t = stripTrump(t);

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

  // Fix ALL CAPS (3+ consecutive uppercase words) to Title Case
  // Runs after pipe/slash cleanup so shortened titles get checked too
  if (/^[A-Z][A-Z\s:!?,.'"-]{20,}$/.test(t) && !/[a-z]/.test(t)) {
    t = t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    // Keep common acronyms uppercase
    t = t.replace(
      /\b(Ai|Usa|Uk|Eu|Nato|Doge|Ice|Llm|Api|Gpt|Us|Cia|Fbi|Nsa|Doj|Gdp)\b/g,
      m => m.toUpperCase(),
    );
  }

  // Strip trailing periods
  t = t.replace(/\.+\s*$/, '');

  // Strip parenthetical asides at end
  t = t.replace(/\s*\([^)]{0,40}\)\s*$/, '').trim();

  // Fix individual ALL CAPS words (4+ letters) in mixed-case titles
  const knownAcronyms = new Set(['AIDS','API','BBC','CEO','CIA','CTO','DOGE','DOJ','EPA','EU','FBI','FEMA','FTC','GDP','GOP','GPT','ICE','IMF','IRAN','IRS','ISIS','LLM','NASA','NATO','NBA','NFL','NSA','OPEC','SEC','UK','UN','US','USA','WHO','CLAUDE']);
  if (/[a-z]/.test(t)) {
    t = t.replace(/\b([A-Z]{4,})\b/g, (match) => {
      if (knownAcronyms.has(match)) { return match; }
      return match.charAt(0) + match.slice(1).toLowerCase();
    });
  }

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
