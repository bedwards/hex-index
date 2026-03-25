/**
 * Commentary audit — validates article rewrites against editorial guidelines.
 *
 * Checks each rewritten article for:
 *   - Third person perspective (no first person)
 *   - Direct quotes with attribution (4-8 per article)
 *   - Counterpoints ("Critics might note...", etc.)
 *   - Pull quote (blockquote)
 *   - Bottom Line section
 *   - Section headings (## headings)
 *   - Sentence length variation (rhythm)
 *   - Commentary voice (not summarization)
 *
 * Non-compliant articles are marked rewrite_dirty = true for re-processing.
 *
 * Usage:
 *   npx tsx tools/jobs/commentary-audit.ts                  # audit all, report only
 *   npx tsx tools/jobs/commentary-audit.ts --fix            # mark failing articles dirty
 *   npx tsx tools/jobs/commentary-audit.ts --limit 50       # audit first 50
 *   npx tsx tools/jobs/commentary-audit.ts --recent 7       # only last 7 days
 *   npx tsx tools/jobs/commentary-audit.ts --verbose        # show per-article details
 *   npx tsx tools/jobs/commentary-audit.ts --article-id ID  # audit specific article(s)
 */

import 'dotenv/config';
import { Pool } from 'pg';
import { readFile } from 'fs/promises';
import { join } from 'path';

// ── CLI args ────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const FIX = args.includes('--fix');
const VERBOSE = args.includes('--verbose');
const limitIdx = args.indexOf('--limit');
const LIMIT = limitIdx >= 0 && args[limitIdx + 1] ? parseInt(args[limitIdx + 1], 10) : 0;
const recentIdx = args.indexOf('--recent');
const RECENT_DAYS = recentIdx >= 0 && args[recentIdx + 1] ? parseInt(args[recentIdx + 1], 10) : 0;
const articleIdIdx = args.indexOf('--article-id');
const ARTICLE_IDS: string[] = [];
if (articleIdIdx >= 0) {
  for (let i = articleIdIdx + 1; i < args.length && !args[i].startsWith('--'); i++) {
    ARTICLE_IDS.push(args[i]);
  }
}

// ── Types ───────────────────────────────────────────────────────────
interface AuditCheck {
  name: string;
  passed: boolean;
  detail: string;
}

interface AuditResult {
  articleId: string;
  title: string;
  slug: string;
  checks: AuditCheck[];
  score: number; // 0-100
  pass: boolean; // score >= threshold
}

// ── Helpers ─────────────────────────────────────────────────────────
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ').trim();
}

function getSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by space or end
  return text.split(/(?<=[.!?])\s+/).filter(s => s.length > 5);
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

// ── Audit checks ────────────────────────────────────────────────────

/** Check for first-person usage (should be third person) */
function checkThirdPerson(text: string): AuditCheck {
  // Match first-person pronouns at word boundaries, case-insensitive
  // Exclude text inside quotes (between " marks)
  const withoutQuotes = text.replace(/"[^"]*"/g, '').replace(/\u201c[^\u201d]*\u201d/g, '');
  const firstPersonPatterns = /\b(I\s+(?:think|believe|argue|would|feel|find|note|suggest|recommend|say)|my\s+(?:take|view|opinion|reading|assessment|analysis)|from my|in my\s+(?:view|opinion|experience)|I['']m|I['']ve|I['']d)\b/gi;
  const matches = withoutQuotes.match(firstPersonPatterns) ?? [];
  const count = matches.length;
  return {
    name: 'third-person',
    passed: count === 0,
    detail: count === 0 ? 'No first-person usage found' : `Found ${count} first-person instances: ${matches.slice(0, 3).join(', ')}`,
  };
}

/** Check for direct quotes with attribution */
function checkDirectQuotes(html: string): AuditCheck {
  // Look for attributed quotes: "Author writes," or "As Author puts it,"
  // Also matches quotes with attribution after
  const quotePatterns = [
    /(?:writes|wrote|argues|argued|puts it|notes|noted|observes|observed|explains|explained|contends|claims|claimed|states|stated|suggests|adds|added|points out|acknowledges|warns),?\s*[""\u201c]/gi,
    /[""\u201c][^"""\u201d]{20,}[""\u201d]\s*(?:writes|wrote|argues|argued)/gi,
    /as\s+\w+\s+(?:puts|frames|describes|explains|notes|writes|argues)\s+it/gi,
  ];

  let totalMatches = 0;
  for (const pattern of quotePatterns) {
    const matches = html.match(pattern);
    totalMatches += matches?.length ?? 0;
  }

  // Also count blockquote usage as potential pull quotes (not direct quotes)
  const passed = totalMatches >= 3; // Slightly lower threshold since regex won't catch all patterns
  return {
    name: 'direct-quotes',
    passed,
    detail: `Found ~${totalMatches} attributed quotes (target: 4-8)`,
  };
}

/** Check for counterpoints */
function checkCounterpoints(text: string): AuditCheck {
  const patterns = [
    /critics?\s+(?:might|could|would|have|may)\s+(?:note|argue|point out|counter|object|say|respond)/gi,
    /counterargument/gi,
    /a\s+(?:fair|reasonable|valid)\s+(?:critique|criticism|objection|counterpoint)/gi,
    /on\s+the\s+other\s+hand/gi,
    /the\s+(?:weakness|vulnerability|blind spot|limitation|gap|problem)\s+(?:is|here|in)/gi,
    /(?:skeptics?|detractors?|opponents?)\s+(?:might|could|would|will|have)/gi,
    /(?:however|nevertheless|nonetheless|that said),?\s+(?:the|this|it|there|some|not everyone)/gi,
    /(?:overlooks?|misses?|ignores?|underestimates?|overestimates?)\s/gi,
    /not\s+everyone\s+(?:agrees|buys|is\s+convinced)/gi,
    /the\s+(?:biggest|main|central)\s+(?:weakness|vulnerability|risk|problem)/gi,
  ];

  let totalMatches = 0;
  for (const pattern of patterns) {
    const matches = text.match(pattern);
    totalMatches += matches?.length ?? 0;
  }

  return {
    name: 'counterpoints',
    passed: totalMatches >= 1,
    detail: `Found ${totalMatches} counterpoint signals (target: 1-3)`,
  };
}

/** Check for pull quote (blockquote) */
function checkPullQuote(html: string): AuditCheck {
  const blockquoteCount = (html.match(/<blockquote>/gi) ?? []).length;
  return {
    name: 'pull-quote',
    passed: blockquoteCount >= 1,
    detail: blockquoteCount === 0 ? 'No blockquote found' : `Found ${blockquoteCount} blockquote(s)`,
  };
}

/** Check for Bottom Line section */
function checkBottomLine(html: string): AuditCheck {
  const hasBottomLine = /<h2>(?:\s*)(?:Bottom Line|The Bottom Line|bottom line)(?:\s*)<\/h2>/i.test(html);
  return {
    name: 'bottom-line',
    passed: hasBottomLine,
    detail: hasBottomLine ? 'Bottom Line section found' : 'No Bottom Line section',
  };
}

/** Check for section headings */
function checkSectionHeadings(html: string): AuditCheck {
  const headingCount = (html.match(/<h[23]>/gi) ?? []).length;
  // At minimum expect 2 headings for a commentary piece (at least one topic + Bottom Line)
  return {
    name: 'section-headings',
    passed: headingCount >= 2,
    detail: `Found ${headingCount} section heading(s) (target: 2+)`,
  };
}

/** Check sentence length variation (rhythm) */
function checkRhythm(text: string): AuditCheck {
  const sentences = getSentences(text);
  if (sentences.length < 5) {
    return { name: 'rhythm', passed: false, detail: 'Too few sentences to assess rhythm' };
  }

  const lengths = sentences.map(s => countWords(s));
  const shortSentences = lengths.filter(l => l <= 8).length;
  const longSentences = lengths.filter(l => l >= 25).length;

  // Good rhythm = mix of short and long sentences
  const hasShort = shortSentences >= 2;
  const hasLong = longSentences >= 2;
  const passed = hasShort && hasLong;

  return {
    name: 'rhythm',
    passed,
    detail: `${shortSentences} short (<=8 words), ${longSentences} long (>=25 words) out of ${sentences.length} sentences`,
  };
}

/** Check it's commentary, not summarization (looks for editorial voice markers) */
function checkCommentaryVoice(text: string): AuditCheck {
  const commentaryMarkers = [
    /this\s+(?:is|lands|works|matters|resonates)\s+because/gi,
    /the\s+(?:strongest|weakest|most\s+(?:interesting|compelling|effective|surprising))\s+(?:part|move|point|claim|argument|section|moment)/gi,
    /what\s+makes\s+this\s+(?:work|effective|compelling|interesting|notable|important)/gi,
    /(?:effective|devastating|sharp|pointed|bold|shrewd|clever|smart)\s+(?:because|framing|move|argument|point)/gi,
    /(?:lands|resonates|works|holds\s+up|falls\s+(?:short|flat)|misses)/gi,
    /worth\s+(?:considering|noting|reading|watching)/gi,
    /the\s+piece['']?s?\s+(?:strongest|weakest|biggest|most)/gi,
  ];

  let totalMarkers = 0;
  for (const pattern of commentaryMarkers) {
    const matches = text.match(pattern);
    totalMarkers += matches?.length ?? 0;
  }

  return {
    name: 'commentary-voice',
    passed: totalMarkers >= 2,
    detail: `Found ${totalMarkers} editorial voice markers (target: 2+)`,
  };
}

/** Check that content isn't too short for proper commentary */
function checkLength(text: string): AuditCheck {
  const words = countWords(text);
  // Commentary should be at least 400 words for substantive analysis
  return {
    name: 'length',
    passed: words >= 400,
    detail: `${words} words (minimum: 400)`,
  };
}

// ── Main ────────────────────────────────────────────────────────────

// Weights for scoring (total = 100)
const CHECK_WEIGHTS: Record<string, number> = {
  'third-person': 15,
  'direct-quotes': 15,
  'counterpoints': 10,
  'pull-quote': 10,
  'bottom-line': 15,
  'section-headings': 10,
  'rhythm': 10,
  'commentary-voice': 10,
  'length': 5,
};

const PASS_THRESHOLD = 60;

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Build query
    const conditions = [
      'a.rewritten_content_path IS NOT NULL',
    ];
    const params: (number | string | string[])[] = [];
    let paramIdx = 1;

    if (RECENT_DAYS > 0) {
      conditions.push(`a.updated_at >= NOW() - INTERVAL '${RECENT_DAYS} days'`);
    }

    if (ARTICLE_IDS.length > 0) {
      conditions.push(`a.id = ANY($${paramIdx})`);
      params.push(ARTICLE_IDS);
      paramIdx++;
    }

    const limitClause = LIMIT > 0 ? `LIMIT $${paramIdx}` : '';
    if (LIMIT > 0) {
      params.push(LIMIT);
    }

    const { rows: articles } = await pool.query<{
      id: string;
      title: string;
      slug: string;
      rewritten_content_path: string;
      author_name: string | null;
      rewrite_dirty: boolean;
    }>(`
      SELECT a.id, a.title, a.slug, a.rewritten_content_path, a.author_name, a.rewrite_dirty
      FROM app.articles a
      WHERE ${conditions.join(' AND ')}
      ORDER BY a.published_at DESC NULLS LAST
      ${limitClause}
    `, params);

    if (articles.length === 0) {
      console.info('No rewritten articles to audit');
      return;
    }

    console.info(`Commentary Audit — ${articles.length} articles`);
    console.info(`Mode: ${FIX ? 'FIX (marking dirty)' : 'DRY RUN (report only)'}`);
    console.info(`Pass threshold: ${PASS_THRESHOLD}/100\n`);

    const results: AuditResult[] = [];
    let readErrors = 0;

    for (const article of articles) {
      const fullPath = join(process.cwd(), 'library', article.rewritten_content_path);
      let html: string;
      try {
        html = await readFile(fullPath, 'utf-8');
      } catch {
        readErrors++;
        if (VERBOSE) {
          console.info(`  SKIP: ${article.slug} — file not found`);
        }
        continue;
      }

      const plainText = stripHtml(html);

      // Run all checks
      const checks: AuditCheck[] = [
        checkThirdPerson(plainText),
        checkDirectQuotes(html),
        checkCounterpoints(plainText),
        checkPullQuote(html),
        checkBottomLine(html),
        checkSectionHeadings(html),
        checkRhythm(plainText),
        checkCommentaryVoice(plainText),
        checkLength(plainText),
      ];

      // Calculate weighted score
      let score = 0;
      for (const check of checks) {
        if (check.passed) {
          score += CHECK_WEIGHTS[check.name] ?? 0;
        }
      }

      const pass = score >= PASS_THRESHOLD;
      results.push({ articleId: article.id, title: article.title, slug: article.slug, checks, score, pass });

      if (VERBOSE) {
        const status = pass ? 'PASS' : 'FAIL';
        const dirty = article.rewrite_dirty ? ' [already dirty]' : '';
        console.info(`  [${status} ${score}] ${article.title}${dirty}`);
        for (const check of checks) {
          const icon = check.passed ? '+' : '-';
          console.info(`    ${icon} ${check.name}: ${check.detail}`);
        }
      }
    }

    // Mark failing articles as dirty
    let markedDirty = 0;
    if (FIX) {
      const failingIds = results.filter(r => !r.pass).map(r => r.articleId);
      if (failingIds.length > 0) {
        const { rowCount } = await pool.query(
          'UPDATE app.articles SET rewrite_dirty = true, updated_at = NOW() WHERE id = ANY($1) AND rewrite_dirty = false',
          [failingIds]
        );
        markedDirty = rowCount ?? 0;
      }
    }

    // ── Summary ───────────────────────────────────────────────────
    const passing = results.filter(r => r.pass).length;
    const failing = results.filter(r => !r.pass).length;

    console.info('\n' + '='.repeat(60));
    console.info('COMMENTARY AUDIT SUMMARY');
    console.info('='.repeat(60));
    console.info(`Articles audited: ${results.length} (${readErrors} files not found)`);
    console.info(`Passing (>=${PASS_THRESHOLD}): ${passing} (${results.length > 0 ? ((passing / results.length) * 100).toFixed(1) : 0}%)`);
    console.info(`Failing (<${PASS_THRESHOLD}): ${failing} (${results.length > 0 ? ((failing / results.length) * 100).toFixed(1) : 0}%)`);
    if (FIX) {
      console.info(`Newly marked dirty: ${markedDirty}`);
    }

    // Score distribution
    const buckets = [0, 0, 0, 0, 0]; // 0-19, 20-39, 40-59, 60-79, 80-100
    for (const r of results) {
      const bucket = Math.min(Math.floor(r.score / 20), 4);
      buckets[bucket]++;
    }
    console.info('\nScore distribution:');
    console.info(`  0-19:  ${'#'.repeat(buckets[0])} (${buckets[0]})`);
    console.info(`  20-39: ${'#'.repeat(buckets[1])} (${buckets[1]})`);
    console.info(`  40-59: ${'#'.repeat(buckets[2])} (${buckets[2]})`);
    console.info(`  60-79: ${'#'.repeat(buckets[3])} (${buckets[3]})`);
    console.info(`  80-100:${'#'.repeat(buckets[4])} (${buckets[4]})`);

    // Check-level pass rates
    console.info('\nCheck pass rates:');
    const checkNames = Object.keys(CHECK_WEIGHTS);
    for (const name of checkNames) {
      const passCount = results.filter(r => r.checks.find(c => c.name === name)?.passed).length;
      const rate = results.length > 0 ? ((passCount / results.length) * 100).toFixed(1) : '0.0';
      const weight = CHECK_WEIGHTS[name];
      console.info(`  ${name.padEnd(20)} ${rate.padStart(5)}% pass  (weight: ${weight})`);
    }

    // Bottom 10 failing articles
    const worstArticles = results.filter(r => !r.pass).sort((a, b) => a.score - b.score).slice(0, 10);
    if (worstArticles.length > 0) {
      console.info('\nLowest-scoring articles:');
      for (const r of worstArticles) {
        const failedChecks = r.checks.filter(c => !c.passed).map(c => c.name).join(', ');
        console.info(`  [${r.score}] ${r.title}`);
        console.info(`       Failed: ${failedChecks}`);
      }
    }

    if (!FIX && failing > 0) {
      console.info(`\nRun with --fix to mark ${failing} failing articles as rewrite_dirty.`);
    }

    // METRIC log for model-report integration
    console.info(`\nMETRIC: ${JSON.stringify({
      type: 'commentary-audit',
      total: results.length,
      passing,
      failing,
      marked_dirty: markedDirty,
      avg_score: results.length > 0 ? Math.round(results.reduce((a, r) => a + r.score, 0) / results.length) : 0,
      timestamp: new Date().toISOString(),
    })}`);

  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
