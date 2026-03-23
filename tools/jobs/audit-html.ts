/**
 * Audit and fix JSON metadata contamination in library HTML files.
 *
 * Scans all rewritten article and Wikipedia HTML files for JSON artifacts
 * left by MiniMax LLM output, and cleans them in-place.
 *
 * Usage:
 *   npx tsx tools/jobs/audit-html.ts                    # dry run (report only)
 *   npx tsx tools/jobs/audit-html.ts --fix              # fix files in place
 *   npx tsx tools/jobs/audit-html.ts --fix --verbose    # fix with details
 *   npx tsx tools/jobs/audit-html.ts --dir /path/to/lib # custom library path
 */

import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { glob } from 'glob';
import { cleanHtml } from './clean-llm-output.js';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const FIX = args.includes('--fix');
const VERBOSE = args.includes('--verbose');
const dirIdx = args.indexOf('--dir');
const LIBRARY_DIR = dirIdx >= 0 ? args[dirIdx + 1] : join(process.cwd(), 'library');

// ── Detection patterns (for reporting) ──────────────────────────────
// These detect contamination in HTML-encoded content
const DETECTION_PATTERNS: Array<{ name: string; pattern: RegExp }> = [
  { name: 'json-object-start', pattern: /^<p>\{(?:&quot;|")/ },
  { name: 'code-fence-json', pattern: /```\s*json/ },
  { name: 'escaped-json-keys', pattern: /&quot;(?:title|author|content|text|piece|body|pitch|commentary|essay)&quot;\s*:/ },
  { name: 'wiki-url-json', pattern: /&quot;https?:\/\/en\.wikipedia/ },
  { name: 'llm-self-reference', pattern: /<p>(?:I should verify|I can help you|I&#039;ll proceed|Let me verify|The essay appears|My current version|Wait(?:—|&#x2014;)?\s*I should|This is a masterpiece|No additional|I(?:&#039;ve| have) (?:captured|written|completed))/ },
  { name: 'llm-verification-checklist', pattern: /<p>\d+\.\s+[^<]*(?:✓|✗|☑|☐)/ },
  { name: 'xml-parameter-tag', pattern: /&lt;\/?parameter/ },
  { name: 'trailing-json-brace', pattern: /(?:&quot;|")\s*\}{1,3}\s*(?:```\s*)?(?:(?:&quot;|")\s*\}{1,3})?\s*<\/p>/ },
  { name: 'garbled-cjk', pattern: /[a-zA-Z][\u4e00-\u9fff\u3000-\u303f]{1,}[a-zA-Z]/ },
  { name: 'separator-line', pattern: /<p>---+<\/p>/ },
];

interface AuditResult {
  file: string;
  patterns: string[];
  fixed: boolean;
}

async function auditFile(filePath: string): Promise<AuditResult | null> {
  const html = await readFile(filePath, 'utf-8');

  // Detect which patterns are present
  const found = DETECTION_PATTERNS
    .filter(p => p.pattern.test(html))
    .map(p => p.name);

  // Also run the cleaner to see if it would change anything
  const { cleaned, changed } = cleanHtml(html);

  if (found.length === 0 && !changed) {
    return null; // Clean file
  }

  if (FIX && changed) {
    await writeFile(filePath, cleaned, 'utf-8');
  }

  return {
    file: filePath.replace(LIBRARY_DIR + '/', ''),
    patterns: found.length > 0 ? found : ['unknown-pattern-cleaned-by-cleanHtml'],
    fixed: FIX && changed,
  };
}

async function main(): Promise<void> {
  console.info(`Auditing HTML files in ${LIBRARY_DIR}`);
  console.info(`Mode: ${FIX ? 'FIX (writing changes)' : 'DRY RUN (report only)'}\n`);

  // Find all HTML files
  const rewrittenFiles = await glob('rewritten/**/*.html', { cwd: LIBRARY_DIR });
  const wikipediaFiles = await glob('wikipedia/**/*.html', { cwd: LIBRARY_DIR });

  console.info(`Found ${rewrittenFiles.length} article rewrites, ${wikipediaFiles.length} Wikipedia rewrites\n`);

  const results: AuditResult[] = [];
  let scanned = 0;

  const allFiles = [
    ...rewrittenFiles.map(f => ({ path: join(LIBRARY_DIR, f), type: 'article' })),
    ...wikipediaFiles.map(f => ({ path: join(LIBRARY_DIR, f), type: 'wikipedia' })),
  ];

  for (const { path: filePath } of allFiles) {
    scanned++;
    if (scanned % 500 === 0) {
      console.info(`  Scanned ${scanned}/${allFiles.length}...`);
    }

    try {
      const result = await auditFile(filePath);
      if (result) {
        results.push(result);
        if (VERBOSE) {
          const status = result.fixed ? 'FIXED' : 'FOUND';
          console.info(`  [${status}] ${result.file}: ${result.patterns.join(', ')}`);
        }
      }
    } catch (err) {
      console.error(`  Error reading ${filePath}: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  // Summary
  console.info('\n' + '='.repeat(60));
  console.info('AUDIT SUMMARY');
  console.info('='.repeat(60));
  console.info(`Total files scanned: ${scanned}`);
  console.info(`Contaminated files: ${results.length}`);
  if (FIX) {
    const fixed = results.filter(r => r.fixed).length;
    console.info(`Files fixed: ${fixed}`);
  }

  // Breakdown by pattern
  const patternCounts = new Map<string, number>();
  for (const result of results) {
    for (const pattern of result.patterns) {
      patternCounts.set(pattern, (patternCounts.get(pattern) ?? 0) + 1);
    }
  }

  console.info('\nContamination by pattern:');
  for (const [pattern, count] of [...patternCounts.entries()].sort((a, b) => b[1] - a[1])) {
    console.info(`  ${pattern}: ${count} files`);
  }

  // Breakdown by directory
  const articleResults = results.filter(r => r.file.startsWith('rewritten/'));
  const wikiResults = results.filter(r => r.file.startsWith('wikipedia/'));
  console.info(`\nArticle rewrites: ${articleResults.length} contaminated`);
  console.info(`Wikipedia rewrites: ${wikiResults.length} contaminated`);

  if (!FIX && results.length > 0) {
    console.info('\nRun with --fix to clean these files.');
  }

  // List all contaminated files
  if (results.length > 0 && !VERBOSE) {
    console.info('\nContaminated files:');
    for (const result of results) {
      console.info(`  ${result.file}`);
    }
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
