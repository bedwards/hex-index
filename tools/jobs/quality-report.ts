/**
 * Quality report — queries the content_audits table to show scoring
 * trends, common issues, and improvement over time.
 *
 * Usage:
 *   npx tsx tools/jobs/quality-report.ts              # all time
 *   npx tsx tools/jobs/quality-report.ts --days 7     # last 7 days
 */

import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const args = process.argv.slice(2);
const daysIdx = args.indexOf('--days');
const DAYS = (() => {
  if (daysIdx < 0 || !args[daysIdx + 1]) { return null; }
  const parsed = parseInt(args[daysIdx + 1], 10);
  if (isNaN(parsed) || parsed <= 0) {
    console.error(`Invalid --days value: ${args[daysIdx + 1]}. Must be a positive number.`);
    process.exit(1);
  }
  return parsed;
})();

interface AvgScoreRow {
  content_type: string;
  audit_count: string;
  avg_score_before: string | null;
  avg_score_after: string | null;
  avg_improvement: string | null;
}

interface CountRow {
  issue?: string;
  change?: string;
  occurrences: string;
}

interface TrendRow {
  week: Date;
  audits: string;
  avg_before: string | null;
  avg_after: string | null;
}

interface AuditorRow {
  audited_by: string;
  audit_count: string;
  avg_before: string | null;
  avg_after: string | null;
}

interface LowScoreRow {
  content_type: string;
  content_id: string;
  audited_by: string;
  score_before: number;
  score_after: number | null;
  created_at: Date;
}

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    const timeFilter = DAYS
      ? `WHERE created_at > NOW() - INTERVAL '${DAYS} days'`
      : '';
    const timeFilterAnd = DAYS
      ? `AND created_at > NOW() - INTERVAL '${DAYS} days'`
      : '';

    // 1. Average scores by content type
    const avgScores = await pool.query<AvgScoreRow>(`
      SELECT content_type,
             COUNT(*) as audit_count,
             ROUND(AVG(score_before), 1) as avg_score_before,
             ROUND(AVG(score_after), 1) as avg_score_after,
             ROUND(AVG(score_after) - AVG(score_before), 1) as avg_improvement
      FROM app.content_audits
      ${timeFilter}
      GROUP BY content_type
      ORDER BY content_type
    `);

    const period = DAYS ? `last ${DAYS} days` : 'all time';
    console.info('='.repeat(70));
    console.info(`CONTENT QUALITY REPORT — ${period}`);
    console.info(`Generated: ${new Date().toISOString()}`);
    console.info('='.repeat(70));

    if (avgScores.rows.length === 0) {
      console.info('\nNo audit records found. Content audits are logged by Claude loops.');
      console.info('Run editorial, quality-audit, or epub-review loops to generate data.');
      return;
    }

    console.info('\n## Average Scores by Content Type\n');
    console.info('   Type          | Audits | Avg Before | Avg After | Improvement');
    console.info('   ' + '-'.repeat(65));
    for (const row of avgScores.rows) {
      const improvement = row.avg_improvement != null
        ? (parseFloat(row.avg_improvement) > 0 ? '+' : '') + row.avg_improvement
        : 'n/a';
      const before = row.avg_score_before ?? 'n/a';
      const after = row.avg_score_after ?? 'n/a';
      console.info(
        `   ${row.content_type.padEnd(15)} | ${row.audit_count.padStart(6)} | ${before.padStart(10)} | ${after.padStart(9)} | ${improvement}`
      );
    }

    // 2. Most common issues
    const commonIssues = await pool.query<CountRow>(`
      SELECT issue, COUNT(*) as occurrences
      FROM app.content_audits, UNNEST(issues_found) AS issue
      ${timeFilter}
      GROUP BY issue
      ORDER BY occurrences DESC
      LIMIT 15
    `);

    if (commonIssues.rows.length > 0) {
      console.info('\n## Most Common Issues\n');
      for (const row of commonIssues.rows) {
        console.info(`   ${row.occurrences.padStart(4)}x  ${row.issue}`);
      }
    }

    // 3. Most common changes
    const commonChanges = await pool.query<CountRow>(`
      SELECT change, COUNT(*) as occurrences
      FROM app.content_audits, UNNEST(changes_made) AS change
      ${timeFilter}
      GROUP BY change
      ORDER BY occurrences DESC
      LIMIT 15
    `);

    if (commonChanges.rows.length > 0) {
      console.info('\n## Most Common Changes Made\n');
      for (const row of commonChanges.rows) {
        console.info(`   ${row.occurrences.padStart(4)}x  ${row.change}`);
      }
    }

    // 4. Score trends over time (by week)
    const trends = await pool.query<TrendRow>(`
      SELECT DATE_TRUNC('week', created_at)::date as week,
             COUNT(*) as audits,
             ROUND(AVG(score_before), 1) as avg_before,
             ROUND(AVG(score_after), 1) as avg_after
      FROM app.content_audits
      ${timeFilter}
      GROUP BY week
      ORDER BY week DESC
      LIMIT 12
    `);

    if (trends.rows.length > 0) {
      console.info('\n## Score Trends (by week)\n');
      console.info('   Week         | Audits | Avg Before | Avg After');
      console.info('   ' + '-'.repeat(50));
      for (const row of trends.rows) {
        const week = new Date(row.week).toISOString().slice(0, 10);
        const avgBefore = row.avg_before ?? 'n/a';
        const avgAfter = row.avg_after ?? 'n/a';
        console.info(
          `   ${week}    | ${row.audits.padStart(6)} | ${avgBefore.padStart(10)} | ${avgAfter.padStart(9)}`
        );
      }
    }

    // 5. Scores by auditor
    const byAuditor = await pool.query<AuditorRow>(`
      SELECT audited_by,
             COUNT(*) as audit_count,
             ROUND(AVG(score_before), 1) as avg_before,
             ROUND(AVG(score_after), 1) as avg_after
      FROM app.content_audits
      ${timeFilter}
      GROUP BY audited_by
      ORDER BY audit_count DESC
    `);

    if (byAuditor.rows.length > 0) {
      console.info('\n## Audits by Loop\n');
      console.info('   Auditor               | Audits | Avg Before | Avg After');
      console.info('   ' + '-'.repeat(60));
      for (const row of byAuditor.rows) {
        const auditorBefore = row.avg_before ?? 'n/a';
        const auditorAfter = row.avg_after ?? 'n/a';
        console.info(
          `   ${row.audited_by.padEnd(23)} | ${row.audit_count.padStart(6)} | ${auditorBefore.padStart(10)} | ${auditorAfter.padStart(9)}`
        );
      }
    }

    // 6. Low-scoring content that may need attention
    const lowScores = await pool.query<LowScoreRow>(`
      SELECT content_type, content_id, audited_by, score_before, score_after, created_at
      FROM app.content_audits
      WHERE score_before IS NOT NULL AND score_before < 70
      ${timeFilterAnd}
      ORDER BY score_before ASC
      LIMIT 10
    `);

    if (lowScores.rows.length > 0) {
      console.info('\n## Low-Scoring Content (< 70)\n');
      for (const row of lowScores.rows) {
        const date = new Date(row.created_at).toISOString().slice(0, 10);
        console.info(
          `   [${row.score_before}] ${row.content_type}:${row.content_id.slice(0, 8)}... (${row.audited_by}, ${date})`
        );
      }
    }

    console.info('\n' + '='.repeat(70));
    console.info('Run: npx tsx tools/jobs/quality-report.ts' + (DAYS ? ` --days ${DAYS}` : ''));
    console.info('='.repeat(70));
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
