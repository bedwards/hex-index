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

export function normalizeTitle(title: string): string {
  let t = title.trim();

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
