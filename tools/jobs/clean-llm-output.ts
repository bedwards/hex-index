/**
 * Shared LLM output cleanup — strips JSON artifacts, think tags,
 * preamble, and other MiniMax quirks from generated text.
 *
 * Used by article-rewrite.ts and wikipedia-rewrite.ts.
 */

/**
 * Strip LLM preamble and JSON artifacts deterministically — no LLM involved.
 *
 * Handles:
 *   - <think>...</think> reasoning blocks
 *   - Markdown code fences
 *   - --- separators with short preamble
 *   - Common LLM preamble phrases
 *   - JSON wrappers: {"content": "..."}, {"text": "..."}, etc.
 *   - Malformed JSON prefixes from MiniMax
 *   - JSON array variants: {"content": ["..."]}
 *   - Residual JSON keys/metadata scattered in text
 *   - Escaped JSON string characters
 *   - Leading markdown titles (already displayed separately)
 */
export function cleanPreamble(text: string): string {
  let cleaned = text.trim();

  // 1. Strip think tags
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  // 2. Strip code fences
  cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();

  // 3. If there's a --- separator and the preamble before it is short, chop it
  const separatorMatch = cleaned.match(/^([\s\S]*?)\n---+\n([\s\S]+)$/);
  if (separatorMatch && separatorMatch[1].length < 500) {
    cleaned = separatorMatch[2].trim();
  }

  // 4. Strip common LLM preamble patterns at the very start
  const preamblePatterns = [
    /^(?:Here(?:'s| is) (?:the |my )?(?:rewritten|rewrite|adapted|revised|commentary)[\s\S]*?:\s*\n+)/i,
    /^(?:I (?:see|understand|notice|'ll|will|have)[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:(?:Sure|OK|Okay|Certainly|Of course)[,.!]?\s*[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:Let me[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:The following[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:Below is[\s\S]*?(?:\.|:)\s*\n+)/i,
  ];
  for (const pattern of preamblePatterns) {
    cleaned = cleaned.replace(pattern, '').trim();
  }

  // 5. Strip residual JSON wrapper — {"content": "...", ...}
  const jsonWrapperMatch = cleaned.match(/^\s*\{\s*"(?:content|text|piece|essay|commentary|article|rewrite)[^"]*"\s*:\s*"([\s\S]*)"\s*\}\s*$/);
  if (jsonWrapperMatch) {
    cleaned = jsonWrapperMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();
  }

  // 6. Strip malformed JSON prefix — model echoes the placeholder key
  //    e.g. {"your adapted article text here"}":"actual content...
  //    e.g. {"your commentary text here"}":"actual content...
  cleaned = cleaned.replace(/^\s*\{[^}]*\}["'\s:]+/, '').trim();

  // 7. Strip JSON metadata prefix: title", "author": "Name", "piece": "actual content
  cleaned = cleaned.replace(/^[^"]*",\s*"(?:author|title|source)":\s*"[^"]*",\s*"(?:piece|content|text|essay|commentary)":\s*"/, '').trim();

  // 8. Strip {"content": ["text... (array variant from MiniMax)
  cleaned = cleaned.replace(/^\s*\{\s*"(?:content|text|piece|essay|commentary)"\s*:\s*\[\s*"?/, '').trim();
  cleaned = cleaned.replace(/"\s*\]?\s*\}\s*$/, '').trim();

  // 9. Strip stray JSON object at the very end (model appends closing braces)
  cleaned = cleaned.replace(/"\s*\}\s*$/, '').trim();

  // 10. Strip leading title (# or ##) — the title is already displayed in the page header
  cleaned = cleaned.replace(/^#{1,2}\s+.+\n+/, '').trim();

  // 11. Strip inline JSON fragments scattered in text
  //     e.g. lines that are just `"content":` or `},` or `"title": "Something",`
  cleaned = cleaned.replace(/^"(?:content|text|title|author|piece)":\s*"?\n?/gm, '').trim();

  // 12. Strip residual JSON key-value lines at the start (metadata leakage)
  //     Matches lines like: "title": "Some Title",
  while (/^"[a-z_]+"\s*:\s*"[^"]*",?\s*$/m.test(cleaned.split('\n')[0] ?? '')) {
    cleaned = cleaned.replace(/^"[a-z_]+"\s*:\s*"[^"]*",?\s*\n/, '').trim();
  }

  // 13. Unescape JSON string escapes that survived parsing
  cleaned = cleaned.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\\\/g, '\\');

  // 14. Clean up double-newlines created by stripping (normalize to max 2)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned;
}
