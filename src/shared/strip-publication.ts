/**
 * Deterministically strip a publication name prefix or suffix from an article
 * title. Given `publication.name` as the authoritative source, this is 100%
 * precise — no LLM, no heuristics, no false positives.
 *
 * Rule:
 *   If the title (case-insensitively) starts with the publication name followed
 *   by one of the separators `:`, `|`, `-`, `—` (em), `–` (en) — with optional
 *   surrounding whitespace — strip the publication name AND the separator.
 *   Same on the trailing side.
 *
 *   A leading "The " on the publication name is optional when matching, so
 *   "The Cyber Why" also matches titles starting with "Cyber Why:".
 *
 *   If the title IS the publication name (nothing else), leave it unchanged —
 *   we would otherwise produce an empty string.
 *
 *   Double whitespace left by the strip is collapsed.
 */

// Separators (escape `-`): `:` `|` `-` `—` `–`
const SEP_CLASS = '[:|\\-\\u2014\\u2013]';

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function candidateNames(publicationName: string): string[] {
  const base = publicationName.trim();
  if (!base) { return []; }
  const names = new Set<string>();
  names.add(base);
  // "The Foo" → also match "Foo"
  const theStripped = base.replace(/^the\s+/i, '');
  if (theStripped && theStripped !== base) { names.add(theStripped); }
  // "Foo" → also try "The Foo" (so titles that say "The Foo:" match a pub "Foo")
  if (!/^the\s+/i.test(base)) { names.add(`The ${base}`); }
  return Array.from(names);
}

export function stripPublicationFromTitle(title: string, publicationName: string): string {
  if (!title || !publicationName) { return title; }

  const trimmed = title.trim();
  const names = candidateNames(publicationName);

  // If the entire title IS (case-insensitively) the publication name, bail.
  for (const n of names) {
    if (trimmed.toLowerCase() === n.toLowerCase()) {
      return title;
    }
  }

  let out = trimmed;
  let matched = false;
  for (const n of names) {
    const escaped = escapeRegex(n);
    // Prefix: ^<name>\s*<sep>\s*
    const prefixRe = new RegExp(`^${escaped}\\s*${SEP_CLASS}\\s*`, 'i');
    if (prefixRe.test(out)) {
      const next = out.replace(prefixRe, '').trim();
      if (next.length > 0) {
        out = next;
        matched = true;
      }
    }
    // Suffix: \s*<sep>\s*<name>$
    const suffixRe = new RegExp(`\\s*${SEP_CLASS}\\s*${escaped}\\s*$`, 'i');
    if (suffixRe.test(out)) {
      const next = out.replace(suffixRe, '').trim();
      if (next.length > 0) {
        out = next;
        matched = true;
      }
    }
  }

  if (!matched) { return title; }

  // Collapse any double whitespace created by the strip.
  out = out.replace(/\s{2,}/g, ' ').trim();

  return out;
}
