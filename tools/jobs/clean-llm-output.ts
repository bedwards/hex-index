/**
 * Shared LLM output cleanup — strips JSON artifacts, think tags,
 * preamble, and other LLM quirks from generated text.
 *
 * Used by article-rewrite.ts, wikipedia-rewrite.ts, and audit-html.ts.
 *
 * Two entry points:
 *   cleanPreamble(text)  — operates on plaintext BEFORE HTML conversion
 *   cleanHtml(html)      — operates on HTML AFTER conversion (for retroactive fixes)
 */

/**
 * Strip LLM preamble and JSON artifacts deterministically — no LLM involved.
 * Operates on PLAINTEXT before textToHtml() conversion.
 *
 * Handles:
 *   - <think>...</think> reasoning blocks
 *   - Markdown code fences
 *   - --- separators with short preamble
 *   - Common LLM preamble phrases
 *   - JSON wrappers: {"content": "..."}, {"text": "..."}, etc.
 *   - Malformed JSON prefixes from LLM
 *   - JSON array variants: {"content": ["..."]}
 *   - Multi-key JSON objects with title/author/pitch/body fields
 *   - Nested JSON: {"": {"title": ...}}
 *   - Wikipedia URL-keyed JSON: {"https://en.wikipedia.org/...": "essay"}
 *   - Residual JSON keys/metadata scattered in text
 *   - Trailing ```json {...} blocks mid-text
 *   - LLM self-reference ("I should verify...", "I can help...")
 *   - Escaped JSON string characters
 *   - Leading markdown titles (already displayed separately)
 *   - XML parameter tags leaked from tool use
 */
export function cleanPreamble(text: string): string {
  let cleaned = text.trim();

  // 1. Strip think tags
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/g, '').trim();

  // 2. Strip code fences (including mid-text ones)
  cleaned = cleaned.replace(/^```\w*\n?/, '').replace(/\n?```\s*$/, '').trim();

  // 3. If there's a --- separator and the preamble before it is short, chop it
  const separatorMatch = cleaned.match(/^([\s\S]*?)\n---+\n([\s\S]+)$/);
  if (separatorMatch && separatorMatch[1].length < 500) {
    cleaned = separatorMatch[2].trim();
  }

  // 4. Strip common LLM preamble patterns at the very start
  const preamblePatterns = [
    /^(?:Here(?:'s| is) (?:the |my )?(?:rewritten|rewrite|adapted|revised|commentary)[\s\S]*?:\s*\n+)/i,
    /^(?:I (?:see|understand|notice|'ll|will|have|should)[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:(?:Sure|OK|Okay|Certainly|Of course)[,.!]?\s*[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:Let me[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:The following[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:Below is[\s\S]*?(?:\.|:)\s*\n+)/i,
    /^(?:I can help[\s\S]*?(?:\.|:)\s*\n+)/i,
  ];
  for (const pattern of preamblePatterns) {
    cleaned = cleaned.replace(pattern, '').trim();
  }

  // 5. Strip multi-key JSON wrapper with title/author/pitch/body pattern
  //    e.g. {"title": "...", "author": "...", "pitch": "...", "body": "actual content"}
  //    or   {"": {"title": "...", "pitch": "...", "body": "actual content"}}
  const multiKeyMatch = cleaned.match(
    /^\s*\{(?:\s*""\s*:\s*\{)?\s*"(?:title|author)"[\s\S]*?"(?:body|content|piece|text|essay|commentary)"\s*:\s*"([\s\S]*)"\s*\}?\s*\}\s*$/
  );
  if (multiKeyMatch) {
    cleaned = multiKeyMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();
  }

  // 6. Strip Wikipedia URL-keyed JSON wrapper
  //    e.g. {"https://en.wikipedia.org/wiki/Something": "essay text here"}
  const wikiJsonMatch = cleaned.match(
    /^\s*\{\s*"https?:\/\/[^"]+"\s*:\s*"([\s\S]*)"\s*\}\s*$/
  );
  if (wikiJsonMatch) {
    cleaned = wikiJsonMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();
  }

  // 7. Strip residual JSON wrapper — {"content": "...", ...}
  const jsonWrapperMatch = cleaned.match(/^\s*\{\s*"(?:content|text|piece|essay|commentary|article|rewrite)[^"]*"\s*:\s*"([\s\S]*)"\s*\}\s*$/);
  if (jsonWrapperMatch) {
    cleaned = jsonWrapperMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      .trim();
  }

  // 8. Strip JSON object that starts at the beginning but transitions into content
  //    e.g. {"title": "...", "author": "...", "pitch": "...", "body": "## The Age Factor\n\nAlexander...
  //    Where the JSON never closes properly — extract from "body" key onwards
  const partialJsonMatch = cleaned.match(
    /^\s*\{(?:\s*""\s*:\s*\{)?\s*"(?:title|author)"[^"]*":\s*"[^"]*"(?:\s*,\s*"[^"]*"\s*:\s*"[^"]*")*\s*,\s*"(?:body|content|piece|text|essay|commentary)"\s*:\s*"([\s\S]+)$/
  );
  if (partialJsonMatch) {
    cleaned = partialJsonMatch[1]
      .replace(/\\n/g, '\n')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
      // Strip trailing "} if the JSON was partially closed
      .replace(/"\s*\}?\s*\}?\s*$/, '')
      .trim();
  }

  // 9. Strip malformed JSON prefix — model echoes the placeholder key
  //    e.g. {"your adapted article text here"}":"actual content...
  //    e.g. {"your commentary text here"}":"actual content...
  cleaned = cleaned.replace(/^\s*\{[^}]*\}["'\s:]+/, '').trim();

  // 10. Strip JSON metadata prefix: title", "author": "Name", "piece": "actual content
  cleaned = cleaned.replace(/^[^"]*",\s*"(?:author|title|source)":\s*"[^"]*",\s*"(?:piece|content|text|essay|commentary)":\s*"/, '').trim();

  // 11. Strip {"content": ["text... (array variant from LLM)
  cleaned = cleaned.replace(/^\s*\{\s*"(?:content|text|piece|essay|commentary)"\s*:\s*\[\s*"?/, '').trim();
  cleaned = cleaned.replace(/"\s*\]?\s*\}\s*$/, '').trim();

  // 12. Strip stray JSON object at the very end (model appends closing braces)
  cleaned = cleaned.replace(/"\s*\}\s*$/, '').trim();

  // 13. Strip trailing ```json {...} blocks anywhere in text
  //     LLM sometimes appends JSON after seemingly complete content
  cleaned = cleaned.replace(/\s*```\s*json\s*\{[\s\S]*?\}\s*```\s*/g, '').trim();
  // Also without closing fence
  cleaned = cleaned.replace(/\s*```\s*json\s*\{[\s\S]*$/g, '').trim();
  // Also plain ```json { without fences
  cleaned = cleaned.replace(/\s*```\s*json\s*\{[^}]*\}\s*```?\s*/g, '').trim();

  // 14. Strip trailing JSON fragments at end of text
  //     e.g. content ending with: {"https://en.wikipedia.org/wiki/...": "essay"}
  //     or: {"commentary": "..."}
  cleaned = cleaned.replace(/\s*\{\s*"(?:https?:\/\/[^"]*|commentary|content|text|essay)"\s*:\s*"[\s\S]*?\}\s*$/, '').trim();

  // 15. Strip leading title (# or ##) — the title is already displayed in the page header
  cleaned = cleaned.replace(/^#{1,2}\s+.+\n+/, '').trim();

  // 16. Strip inline JSON fragments scattered in text
  //     e.g. lines that are just `"content":` or `},` or `"title": "Something",`
  cleaned = cleaned.replace(/^"(?:content|text|title|author|piece)":\s*"?\n?/gm, '').trim();

  // 17. Strip residual JSON key-value lines at the start (metadata leakage)
  //     Matches lines like: "title": "Some Title",
  while (/^"[a-z_]+"\s*:\s*"[^"]*",?\s*$/m.test(cleaned.split('\n')[0] ?? '')) {
    cleaned = cleaned.replace(/^"[a-z_]+"\s*:\s*"[^"]*",?\s*\n/, '').trim();
  }

  // 18. Strip LLM self-reference lines
  const selfRefPatterns = [
    /^I should verify[\s\S]*?(?:\.|$)\s*/gm,
    /^I can help you[\s\S]*?(?:\.|$)\s*/gm,
    /^I'll proceed[\s\S]*?(?:\.|$)\s*/gm,
    /^Let me (?:verify|check|finalize|format)[\s\S]*?(?:\.|$)\s*/gm,
    /^The essay appears[\s\S]*?(?:\.|$)\s*/gm,
  ];
  for (const pattern of selfRefPatterns) {
    cleaned = cleaned.replace(pattern, '').trim();
  }

  // 19. Strip XML parameter tags that leaked through (tool use artifacts)
  cleaned = cleaned.replace(/<\/?parameter[^>]*>/g, '').trim();

  // 20. Unescape JSON string escapes that survived parsing
  cleaned = cleaned.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '\n').replace(/\\\\/g, '\\');

  // 21. Clean up double-newlines created by stripping (normalize to max 2)
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned;
}


/**
 * Clean JSON metadata contamination from already-rendered HTML.
 * This handles the case where JSON artifacts were HTML-escaped before we could catch them.
 *
 * Returns the cleaned HTML, or null if no changes were needed.
 */
export function cleanHtml(html: string): { cleaned: string; changed: boolean } {
  let result = html;
  const original = html;

  // Pattern 1: First <p> contains JSON object wrapper with title/author/pitch/body
  //   <p>{"title": "...", "author": "...", "body": "## Actual Content</p>
  //   The JSON keys become HTML-escaped: {&quot;title&quot;: ...
  // Strategy: if first <p> starts with { or {&quot;, extract content after "body": " key
  result = result.replace(
    /^(<p>)\{(?:&quot;|")(?:&quot;|")\s*:\s*\{(?:&quot;|")(?:title|author)[^<]*?(?:&quot;|")(?:body|content|piece|text|essay|commentary)(?:&quot;|")\s*:\s*(?:&quot;|")/i,
    '$1'
  );
  result = result.replace(
    /^(<p>)\{(?:&quot;|")(?:title|author)[^<]*?(?:&quot;|")(?:body|content|piece|text|essay|commentary)(?:&quot;|")\s*:\s*(?:&quot;|")/i,
    '$1'
  );

  // Pattern 1b: First <p> starts with simple JSON wrapper {"": "content or {"key": "content
  //   e.g. <p>{"": "The core philosophical...
  //   e.g. <p>{"article_text": "The oldest named...
  //   e.g. <p>{&quot;&quot;: &quot;content...
  //   e.g. <p>{&quot; Commentary&quot;: &quot;## content...
  //   e.g. <p>{&quot;output&quot;: &quot;content...
  //   Strategy: strip everything from <p>{ up to the first actual content
  result = result.replace(
    /^(<p>)\{(?:&quot;|")[^"&]*(?:&quot;|")\s*:\s*(?:&quot;|")/,
    '$1'
  );
  // Handle {"": {"KEY": ... nested garbage in first <p>
  result = result.replace(
    /^(<p>)\{(?:&quot;|")[^"&]*(?:&quot;|")\s*:\s*\{(?:&quot;|")[^"&]*(?:&quot;|")[^}]*(?:&quot;|")\s*:\s*(?:&quot;|")/,
    '$1'
  );
  // Handle <ctrl> separators: {&quot;...&quot;}&lt;ctrl&gt;{&quot;content&quot;: &quot;
  result = result.replace(
    /^(<p>)\{[^<]*&lt;ctrl&gt;\{(?:&quot;|")[^"&]*(?:&quot;|")\s*:\s*(?:&quot;|")/,
    '$1'
  );

  // Pattern 1c: Entire first <p> is just placeholder text (model echoed the template)
  //   e.g. <p>{&quot;your adapted article text here&quot;}**</p>
  //   e.g. <p>{&quot;your adapted article text here&quot;}&lt;output&gt; content...</p>
  //   e.g. <p>{&quot;your adapted article text here&quot;}：&quot;title&quot;</p>
  result = result.replace(
    /^<p>\{(?:&quot;|")(?:your (?:adapted|commentary|rewrite)[^"&]*(?:&quot;|"))\}[^<]*<\/p>\n?/,
    ''
  );
  // Also when placeholder is followed by content in same <p>
  result = result.replace(
    /^(<p>)\{(?:&quot;|")(?:your (?:adapted|commentary|rewrite)[^"&]*(?:&quot;|"))\}[：:]*\s*(?:(?:&quot;|")[^<]*(?:&quot;|"))?\s*/,
    '$1'
  );
  // Pattern 1d: Nested/garbled JSON at start: {&quot;{&quot;_type&quot;: &quot;...
  result = result.replace(
    /^(<p>)\{(?:&quot;|")\{(?:&quot;|")[^<]*?(?:adapted_article|output|article)(?:(?:&quot;|")\s*:\s*(?:&quot;|"))?/,
    '$1'
  );
  // Pattern 1e: First <p> has LLM self-reference after placeholder
  //   e.g. <p>{...}&lt;output&gt; This piece lacks...
  result = result.replace(
    /^<p>\{[^<]*\}&lt;output&gt;\s*[^<]*<\/p>\n?/,
    ''
  );
  // Pattern 1f removed: Title concatenation heuristic was too fragile —
  // could false-positive on camelCase words like MacBook, iPhone.
  // These rare cases are better handled by marking rewrite_dirty in the DB.
  // Pattern 1g: &lt;ctrl&gt; tag artifacts
  result = result.replace(/&lt;ctrl&gt;/g, '');
  // Pattern 1h: &lt;output&gt; tag artifacts
  result = result.replace(/&lt;\/?output&gt;/g, '');

  // Pattern 1i: LLM planning text in paragraphs (not just first)
  //   e.g. "will require careful analysis of what makes this piece compelling..."
  //   e.g. "The adaptation needs to capture the essence..."
  result = result.replace(
    /\n?<p>(?:will require|I need to|This will require|Let me analyze|I&#039;ll (?:analyze|restructure|focus)|The adaptation needs to)[^<]*<\/p>/g,
    ''
  );
  // Pattern 1i2: First <p> with author name in JSON: {&quot;Author&#039;s &quot;title&quot; content
  result = result.replace(
    /(<p>)\{(?:&quot;|")[^{}<]*(?:&#039;|')[^{}<]*(?:&quot;|")\s*/,
    '$1'
  );

  // Pattern 1j: First <p> starts with author/title metadata prefix
  //   e.g. <p>Stefan Milo&quot;, &quot;title&quot;: &quot;Did Stone Age...&quot;, &quot;content&quot;: [&quot;content
  //   e.g. <p>Rick Beato's European Tour...&quot;, &quot;pitch&quot;: &quot;content
  //   e.g. <p>Dwarkesh Patel&quot;, &quot;title&quot;: &quot;...&quot;, &quot;pitch_and_body&quot;: &quot;content
  //   Strategy: strip everything up to content/pitch/body/adaptation key
  result = result.replace(
    /(<p>)[^<]*?(?:&quot;|")(?:content|pitch|body|adaptation|adapted_piece|pitch_and_body|adapted_article)(?:&quot;|")\s*(?::\s*)?(?:\[(?:&quot;|"))?\s*(?:&quot;|")?/g,
    '$1'
  );
  // Variant: &quot;content: &quot; (missing closing quote on key)
  result = result.replace(
    /(<p>)[^<]*?(?:&quot;|")content:\s*/g,
    '$1'
  );

  // Pattern 1k: Leading { or } or leading JSON garbage before content
  //   e.g. <p>} Adam Friedland has spent years...
  //   e.g. <p>{"output": <strong>content...
  //   e.g. <p>{&quot;adapted_article_text&quot;:}content
  result = result.replace(/^(<p>)[{}]\s*/, '$1');
  // Also handle {"content without key-value structure (just a stray brace+quote)
  result = result.replace(/^(<p>)\{(?:&quot;|")(?=[A-Z])/, '$1');
  result = result.replace(
    /(<p>)\{(?:&quot;|")[^"&]*(?:&quot;|")\s*:\s*(?:\[(?:&quot;|"))?\s*/g,
    '$1'
  );
  // e.g. <p>{"": content (missing quote after colon)
  result = result.replace(/(<p>)\{(?:&quot;|")[^"&]*(?:&quot;|")\s*:\s*/g, '$1');

  // Pattern 1l: <p> tags whose content is wrapped in wiki URL JSON
  //   e.g. <p>{&quot;https://en.wikipedia.org/wiki/...&quot;: &quot;content here&quot;}</p>
  //   Also with leading spaces: <p>{   &quot;https://...
  //   Also with &#039; in the URL
  //   Strip the JSON wrapper, keep the content
  result = result.replace(
    /(<p>)\{\s*(?:&quot;|")https?:\/\/[^"&]*(?:&#039;[^"&]*)*(?:&quot;|")\s*:\s*(?:&quot;|")/g,
    '$1'
  );

  // Pattern 1m: escaped-json-keys mid-content
  //   e.g. &quot;content&quot;: &quot; or &quot;title&quot;: &quot;
  //   These appear when JSON was partially parsed but keys leaked through
  result = result.replace(
    /(?:&quot;|")(?:content|text|piece|essay|commentary|article|rewrite|output|body)(?:&quot;|")\s*:\s*(?:&quot;|")/g,
    ''
  );

  // Pattern 2: Inline ```json blocks that became HTML-escaped
  //   ``` json {&quot;commentary text here&quot;} ```
  //   or ``` json {&quot;commentary&quot;: &quot;...
  result = result.replace(
    /\s*```\s*json\s*\{(?:&quot;|")[^}]*?(?:&quot;|")\}\s*```\s*/g,
    ' '
  );
  // Without closing fence
  result = result.replace(
    /\s*```\s*json\s*\{(?:&quot;|")[\s\S]*?(?:<\/p>)/g,
    '</p>'
  );
  // Just ``` at end of paragraph
  result = result.replace(/\s*```\s*(<\/p>)/g, '$1');

  // Pattern 2b: ```json with wiki URL mid-content
  //   e.g. ...content. ```json {   &quot;https://en.wikipedia.org/...&quot;: &quot;essay text...
  //   This is where the LLM appended a full JSON response after the essay
  result = result.replace(
    /\s*```\s*json\s*\{\s*(?:&quot;|")https?:\/\/[\s\S]*$/g,
    ''
  );

  // Pattern 3: Trailing JSON at end of a <p> tag
  //   ...actual content. ```json {&quot;...&quot;}</p>
  //   or ...content. {&quot;https://en.wikipedia.org/...&quot;: &quot;essay text&quot;}</p>
  result = result.replace(
    /\s*```\s*json\s*\{[^<]*?\}\s*```\s*(<\/p>)/g,
    '$1'
  );
  // Wikipedia URL-keyed JSON at end of paragraph
  result = result.replace(
    /\s*\{(?:&quot;|")https?:\/\/[^<]*?(?:&quot;|")\s*\}\s*(<\/p>)/g,
    '$1'
  );

  // Pattern 4: Entire trailing <p> tags that are just JSON
  //   <p>```json {&quot;...&quot;}</p>
  //   <p>{&quot;commentary&quot;: &quot;...</p>
  result = result.replace(
    /\n?<p>\s*```\s*json\s*\{[^<]*\}<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>\s*\{(?:&quot;|")(?:commentary|content|text|essay|title|author|https?:\/\/)[^<]*<\/p>/g,
    ''
  );

  // Pattern 5: LLM self-reference paragraphs
  //   <p>I should verify the content is comprehensive...</p>
  //   <p>I can help you with other writing projects...</p>
  //   <p>I&#039;ll proceed to format as JSON...</p>
  result = result.replace(
    /\n?<p>(?:Wait(?:—|&#x2014;|&mdash;)?\s*)?I should verify[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>(?:Wait(?:—|&#x2014;|&mdash;)?\s*)?I(?:&#039;ve| have)? should[\s\S]*?<\/p>/g,
    ''
  );
  // "Wait—" followed by any LLM self-reference
  result = result.replace(
    /\n?<p>Wait(?:—|&#x2014;|&mdash;|&#8212;)\s*I[\s\S]*?<\/p>/g,
    ''
  );
  // "Need to double-check..." or "Need to verify..."
  result = result.replace(
    /\n?<p>(?:Need to |I need to )(?:double-check|check|verify|confirm)[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>I can help you[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>I&#039;ll proceed[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>Let me (?:verify|check|finalize|format)[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>The essay appears[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>My current version[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>I need to (?:include|add|verify|check)[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>Additionally,? I (?:need|should)[\s\S]*?<\/p>/g,
    ''
  );
  // Generic: any <p> that starts with LLM meta-commentary about its own output
  result = result.replace(
    /\n?<p>(?:No additional|This completes|The above|My (?:final|revised|current)|I(?:&#039;ve| have) (?:included|covered|completed|verified|checked|captured|written))[\s\S]*?<\/p>/g,
    ''
  );
  // "Additionally, I need to include..." type patterns
  result = result.replace(
    /\n?<p>Additionally,?\s+I\s+(?:need|should|want|would)[\s\S]*?<\/p>/g,
    ''
  );
  // Patterns about word count, target range, formatting
  result = result.replace(
    /\n?<p>(?:I(?:&#039;ve| have) (?:captured|written|composed|drafted|created) this|This (?:essay|article|piece) (?:is|comes in|clocks in) (?:at |in )?(?:approximately|roughly|about|around)?\s*\d)[\s\S]*?<\/p>/g,
    ''
  );
  // "This is a masterpiece..." or "The key facts are..."
  result = result.replace(
    /\n?<p>This is a (?:masterpiece|great|solid|good|complete)[\s\S]*?<\/p>/g,
    ''
  );
  // Verification checklists: "1. Something: ✓ 2. Something else: ✓"
  result = result.replace(
    /\n?<p>\d+\.\s+[^<]*(?:✓|✗|☑|☐)[\s\S]*?<\/p>/g,
    ''
  );
  // "The source specifically mentions..." or "confirming my key facts..."
  result = result.replace(
    /\n?<p>The source (?:specifically |)(?:mentions|says|states|confirms)[\s\S]*?<\/p>/g,
    ''
  );
  result = result.replace(
    /\n?<p>(?:confirming|This confirms|This verifies)[\s\S]*?<\/p>/g,
    ''
  );
  // "the key facts are embedded in my rewrite"
  result = result.replace(
    /\n?<p>[^<]*key facts[^<]*(?:embedded|included|covered|present)[^<]*<\/p>/g,
    ''
  );
  // "Let me verify..." pattern
  result = result.replace(
    /\n?<p>Let me (?:verify|check|confirm|review|double-check)[\s\S]*?<\/p>/g,
    ''
  );

  // Pattern 6: XML parameter tags in HTML
  result = result.replace(/&lt;\/?parameter[^&]*?&gt;/g, '');

  // Pattern 7: Trailing JSON object at very end of file (after last </p>)
  result = result.replace(/(<\/p>)\s*\{[^<]*\}\s*$/g, '$1');

  // Pattern 8: Trailing JSON closing braces at end of paragraphs
  //   ...content.&quot;}</p>  or  ...content.&quot;}}</p>
  //   ...content."}</p>  or  ...content."}}</p>
  //   ...content.&quot;} ``` &quot;}</p>
  //   Only match when preceded by a quote character (indicates JSON, not prose)
  result = result.replace(
    /(?:&quot;|")\s*\}{1,3}\s*(?:```\s*)?(?:(?:&quot;|")\s*\}{1,3}\s*)?(?:&lt;\/parameter&gt;)?\s*(<\/p>)/g,
    '$1'
  );

  // Pattern 9: Stray publication name in first <p> from JSON leakage
  //   <p>Welcome to the slave-driven slop economy | Richard Hames Meets Marek Poliks", "author": "Novara Media", "pitch": "...
  //   Detect: text followed by &quot;, &quot;author&quot;: pattern
  result = result.replace(
    /(<p>[^<]*?)(?:&quot;|"),\s*(?:&quot;|")(?:author|title|source)(?:&quot;|")\s*:\s*(?:&quot;|")[^<]*?(?:&quot;|"),\s*(?:&quot;|")(?:pitch|body|content|piece|text|essay|commentary)(?:&quot;|")\s*:\s*(?:&quot;|")/g,
    '$1'
  );

  // Pattern 10: Escaped JSON at end of paragraphs that contains wiki URLs
  //   ...content. ```json {&quot;commentary text here&quot;}``` ```</p>
  result = result.replace(
    /\s*```\s*(?:json\s*)?\{(?:&quot;|")[^}]*(?:&quot;|")\}\s*```\s*(?:```\s*)?(<\/p>)/g,
    '$1'
  );

  // Pattern 11: Chinese/garbled characters from LLM (non-Latin noise in English text)
  //   e.g. 不需要人类。 or 核心
  //   Only strip if surrounded by English text (don't strip intentional CJK content)
  // This is a conservative pattern — only strips short CJK sequences mid-English-sentence
  result = result.replace(
    /([a-zA-Z.,;:!?'"\s])[\u4e00-\u9fff\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u3002\uff0c]{1,20}([a-zA-Z.,;:!?'"\s])/g,
    (_match, before: string, after: string) => {
      // Avoid double spaces: if either boundary is already whitespace, just join
      if (/\s$/.test(before) || /^\s/.test(after)) {
        return before + after;
      }
      return before + ' ' + after;
    }
  );

  // Pattern 12: <p>---</p> separator lines (LLM artifact)
  result = result.replace(/\n?<p>---+<\/p>/g, '');

  // Pattern 13: First <p> contains title text concatenated with body due to partial JSON stripping
  //   After JSON key removal, we might get: <p>Title text here...In his book...
  //   If first <p> starts with what looks like a title (matches the page's actual title),
  //   this is hard to fix generically — but we can remove obvious title| format leftovers
  //   e.g. "Welcome to the slave-driven slop economy | Richard Hames Meets Marek Poliks"
  //   followed immediately by content with no space
  // Remove article title from first paragraph if it matches "Title | Author" pattern
  result = result.replace(
    /^(<p>)[^<]{0,200}\|[^<]{0,100}?(?=(?:In |The |A |An |This |That |What |How |Why |When |Where |It ))/,
    '$1'
  );

  // Clean up empty paragraphs and extra whitespace created by removals
  result = result.replace(/\n?<p>\s*<\/p>/g, '');
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.trim();

  return { cleaned: result, changed: result !== original };
}
