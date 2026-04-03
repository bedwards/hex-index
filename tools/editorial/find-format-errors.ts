/**
 * Scan article HTML files for markdown/formatting artifacts that should
 * have been converted to HTML.
 *
 * Usage:
 *   npx tsx tools/editorial/find-format-errors.ts                   # scan all
 *   npx tsx tools/editorial/find-format-errors.ts --since 2026-03-01
 *   npx tsx tools/editorial/find-format-errors.ts --limit 20
 *   npx tsx tools/editorial/find-format-errors.ts --random 10       # audit sample of clean files
 */

import { readFile, stat } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);

function argVal(flag: string): string | undefined {
  const idx = args.indexOf(flag);
  return idx >= 0 ? args[idx + 1] : undefined;
}

const SINCE = argVal('--since');       // ISO date string
const LIMIT = argVal('--limit') ? Number(argVal('--limit')) : undefined;
const RANDOM = argVal('--random') ? Number(argVal('--random')) : undefined;

const LIBRARY_DIR = join(process.cwd(), 'library');
const REWRITTEN_DIR = join(LIBRARY_DIR, 'rewritten');

// ── Detection patterns ──────────────────────────────────────────────
// Each pattern has a name (for reporting) and a regex to test against file content.
const FORMAT_PATTERNS: Array<{ name: string; pattern: RegExp; description: string }> = [
  {
    name: 'markdown-heading',
    pattern: /(?:^|<p>)\s*#{2,6}\s+\S/m,
    description: 'Markdown heading (## or ###) in HTML',
  },
  {
    name: 'markdown-bold',
    pattern: /\*\*[^*\n]+\*\*/,
    description: 'Literal **bold** markdown',
  },
  {
    name: 'markdown-italic',
    // Match *text* but not **bold**, HTML entities like &#039;, or URLs with *
    // Require word chars on both sides of the asterisks
    pattern: /(?<!\*)\*(?!\*)[\w][^*\n]{0,80}[\w](?<!\*)\*(?!\*)/,
    description: 'Literal *italic* markdown',
  },
  {
    name: 'markdown-backtick',
    pattern: /(?<!`)`(?!`)[^`\n]+`(?!`)/,
    description: 'Literal `code` markdown backticks',
  },
  {
    name: 'json-artifact',
    // JSON key-value patterns that look like leaked structure
    // Matches: ", "key": " or ": " preceded by a quote
    pattern: /(?:&quot;|"),\s*(?:&quot;|")(?:pull_quote|topic_summary|title|author|content|body|pitch)(?:&quot;|")\s*:\s*(?:&quot;|")/,
    description: 'JSON structure artifact leaked into content',
  },
  {
    name: 'think-tag',
    pattern: /<\/?think>/,
    description: '<think> or </think> LLM chain-of-thought tag',
  },
  {
    name: 'markdown-blockquote',
    // > at start of line inside a <p> tag, or bare > at line start in HTML context
    pattern: /<p>&gt;\s+\S/,
    description: 'Markdown blockquote > inside HTML',
  },
];

// ── Helpers ─────────────────────────────────────────────────────────
interface FileError {
  file: string;       // relative path
  patterns: string[]; // matched pattern names
}

async function scanFile(filePath: string): Promise<FileError | null> {
  const content = await readFile(filePath, 'utf-8');
  const matched = FORMAT_PATTERNS
    .filter(p => p.pattern.test(content))
    .map(p => p.name);

  if (matched.length === 0) {return null;}

  return {
    file: filePath.replace(LIBRARY_DIR + '/', ''),
    patterns: matched,
  };
}

// ── Main ────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const files = await glob('rewritten/**/*.html', { cwd: LIBRARY_DIR });
  console.info(`Scanning ${files.length} article HTML files in ${REWRITTEN_DIR}\n`);

  // Filter by --since if provided
  let candidates = files.map(f => join(LIBRARY_DIR, f));
  if (SINCE) {
    const sinceDate = new Date(SINCE);
    if (isNaN(sinceDate.getTime())) {
      console.error(`Invalid date: ${SINCE}`);
      process.exit(1);
    }
    const filtered: string[] = [];
    for (const f of candidates) {
      const s = await stat(f);
      if (s.mtime >= sinceDate) {filtered.push(f);}
    }
    candidates = filtered;
    console.info(`Filtered to ${candidates.length} files modified since ${SINCE}\n`);
  }

  const errors: FileError[] = [];
  const cleanFiles: string[] = [];

  for (const filePath of candidates) {
    const result = await scanFile(filePath);
    if (result) {
      errors.push(result);
      if (LIMIT && errors.length >= LIMIT) {break;}
    } else {
      cleanFiles.push(filePath.replace(LIBRARY_DIR + '/', ''));
    }
  }

  // Print errors
  if (errors.length > 0) {
    for (const err of errors) {
      console.info(`${err.file}  [${err.patterns.join(', ')}]`);
    }
  }

  // Random sample of clean files for auditing tool coverage
  if (RANDOM && cleanFiles.length > 0) {
    const sampleSize = Math.min(RANDOM, cleanFiles.length);
    const shuffled = cleanFiles.sort(() => Math.random() - 0.5);
    const sample = shuffled.slice(0, sampleSize);
    console.info(`\n--- Random sample of ${sampleSize} clean files (for audit) ---`);
    for (const f of sample) {
      console.info(`  ${f}`);
    }
  }

  // Summary
  console.info(`\n${errors.length} files with format errors found (out of ${candidates.length} scanned)`);
  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
