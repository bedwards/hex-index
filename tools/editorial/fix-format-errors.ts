/**
 * Fix markdown/formatting artifacts in article HTML files.
 *
 * Converts leftover markdown syntax to proper HTML.
 *
 * Usage:
 *   npx tsx tools/editorial/fix-format-errors.ts --file library/rewritten/pub/article.html
 *   npx tsx tools/editorial/fix-format-errors.ts --all
 *   npx tsx tools/editorial/fix-format-errors.ts --all --dry-run
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const ALL = args.includes('--all');

function argVal(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : undefined;
}

const FILE = argVal('--file');

const LIBRARY_DIR = join(process.cwd(), 'library');

if (!FILE && !ALL) {
  console.error('Usage: --file <path> or --all');
  console.error('  --dry-run  Show changes without writing');
  process.exit(1);
}

// ── Fix functions ───────────────────────────────────────────────────
// Each returns { html, changes } where changes lists what was fixed.

interface FixResult {
  html: string;
  changes: string[];
}

function fixMarkdownHeadings(html: string): FixResult {
  const changes: string[] = [];
  // <p>## Heading</p> → <h2>Heading</h2>
  // <p>### Heading</p> → <h3>Heading</h3> etc.
  const result = html.replace(
    /<p>\s*(#{2,6})\s+(.+?)\s*<\/p>/g,
    (_match, hashes: string, text: string) => {
      const level = hashes.length;
      changes.push(`heading: <p>${hashes} ${text.slice(0, 40)}...</p> → <h${level}>`);
      return `<h${level}>${text}</h${level}>`;
    }
  );
  return { html: result, changes };
}

function fixMarkdownBold(html: string): FixResult {
  const changes: string[] = [];
  // **text** → <strong>text</strong>
  const result = html.replace(
    /\*\*([^*\n]+)\*\*/g,
    (_match, text: string) => {
      changes.push(`bold: **${text.slice(0, 30)}** → <strong>`);
      return `<strong>${text}</strong>`;
    }
  );
  return { html: result, changes };
}

function fixMarkdownItalic(html: string): FixResult {
  const changes: string[] = [];
  // *text* → <em>text</em>
  // Must not match **bold** (already handled), HTML entities, or stray asterisks.
  // Require word characters adjacent to the asterisks.
  const result = html.replace(
    /(?<!\*)\*(?!\*)([\w][^*\n]{0,80}[\w])\*(?!\*)/g,
    (_match, text: string) => {
      // Skip if this looks like it's inside an HTML tag or entity
      if (text.includes('<') || text.includes('&') || text.includes('>')) {
        return _match;
      }
      changes.push(`italic: *${text.slice(0, 30)}* → <em>`);
      return `<em>${text}</em>`;
    }
  );
  return { html: result, changes };
}

function fixMarkdownBackticks(html: string): FixResult {
  const changes: string[] = [];
  // `code` → <code>code</code>
  const result = html.replace(
    /(?<!`)`(?!`)([^`\n]+)`(?!`)/g,
    (_match, text: string) => {
      changes.push(`code: \`${text.slice(0, 30)}\` → <code>`);
      return `<code>${text}</code>`;
    }
  );
  return { html: result, changes };
}

function fixJsonArtifacts(html: string): FixResult {
  const changes: string[] = [];
  // Remove JSON key-value artifacts that leaked into content
  // Pattern: ", "key": " where key is a known JSON field
  const result = html.replace(
    /(?:&quot;|"),\s*(?:&quot;|")(?:pull_quote|topic_summary|title|author|content|body|pitch)(?:&quot;|")\s*:\s*(?:&quot;|")[^<]*/g,
    (match) => {
      changes.push(`json-artifact: removed ${match.slice(0, 50)}...`);
      return '';
    }
  );
  return { html: result, changes };
}

function fixThinkTags(html: string): FixResult {
  const changes: string[] = [];
  // Remove <think>...</think> blocks entirely
  const result = html.replace(
    /<think>[\s\S]*?<\/think>/g,
    (match) => {
      changes.push(`think-tag: removed ${match.length} chars`);
      return '';
    }
  );
  // Also remove stray opening/closing tags
  const result2 = result.replace(
    /<\/?think>/g,
    (match) => {
      changes.push(`think-tag: removed stray ${match}`);
      return '';
    }
  );
  return { html: result2, changes };
}

function fixMarkdownBlockquotes(html: string): FixResult {
  const changes: string[] = [];
  // <p>&gt; quote text</p> → <blockquote><p>quote text</p></blockquote>
  // Also handle <p>> quote text</p> (unescaped >)
  const result = html.replace(
    /<p>(?:&gt;|>)\s+(.+?)<\/p>/g,
    (_match, text: string) => {
      changes.push(`blockquote: > ${text.slice(0, 40)}...`);
      return `<blockquote><p>${text}</p></blockquote>`;
    }
  );
  return { html: result, changes };
}

// ── Apply all fixes ─────────────────────────────────────────────────
function fixAll(html: string): FixResult {
  const allChanges: string[] = [];
  let result = html;

  // Order matters: bold before italic (** before *)
  const fixers = [
    fixThinkTags,
    fixJsonArtifacts,
    fixMarkdownHeadings,
    fixMarkdownBold,
    fixMarkdownItalic,
    fixMarkdownBackticks,
    fixMarkdownBlockquotes,
  ];

  for (const fixer of fixers) {
    const { html: fixed, changes } = fixer(result);
    result = fixed;
    allChanges.push(...changes);
  }

  // Clean up empty paragraphs created by removals
  const beforeCleanup = result;
  result = result.replace(/\n?<p>\s*<\/p>/g, '');
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.trim();
  if (result !== beforeCleanup) {
    allChanges.push('cleanup: removed empty paragraphs');
  }

  return { html: result, changes: allChanges };
}

// ── File processing ─────────────────────────────────────────────────
interface FileResult {
  file: string;
  changes: string[];
}

async function processFile(filePath: string): Promise<FileResult | null> {
  const original = await readFile(filePath, 'utf-8');
  const { html: fixed, changes } = fixAll(original);

  if (changes.length === 0) {return null;}

  if (!DRY_RUN) {
    await writeFile(filePath, fixed, 'utf-8');
  }

  const relPath = filePath.startsWith(LIBRARY_DIR)
    ? filePath.replace(LIBRARY_DIR + '/', '')
    : filePath;

  return { file: relPath, changes };
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const mode = DRY_RUN ? 'DRY RUN' : 'FIX';
  console.info(`Mode: ${mode}\n`);

  let filePaths: string[];

  if (FILE) {
    // Single file — resolve relative to cwd
    const resolved = FILE.startsWith('/') ? FILE : join(process.cwd(), FILE);
    filePaths = [resolved];
  } else {
    // --all: scan all rewritten files
    const files = await glob('rewritten/**/*.html', { cwd: LIBRARY_DIR });
    filePaths = files.map(f => join(LIBRARY_DIR, f));
    console.info(`Scanning ${filePaths.length} files...\n`);
  }

  const results: FileResult[] = [];

  for (const filePath of filePaths) {
    try {
      const result = await processFile(filePath);
      if (result) {
        results.push(result);
      }
    } catch (err) {
      console.error(`Error processing ${filePath}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Output results
  if (results.length === 0) {
    console.info('No format errors found.');
  } else {
    for (const result of results) {
      console.info(`${DRY_RUN ? '[would fix]' : '[fixed]'} ${result.file}`);
      for (const change of result.changes) {
        console.info(`  - ${change}`);
      }
    }
  }

  console.info(`\n${results.length} files ${DRY_RUN ? 'would be' : ''} fixed`);
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
