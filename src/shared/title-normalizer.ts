/**
 * Normalize article titles — deterministic rules, no LLM needed.
 * Applied at ingestion time and as a one-time backfill.
 */
export function normalizeTitle(title: string): string {
  let t = title.trim();

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
