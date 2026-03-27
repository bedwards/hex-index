/**
 * Quality report — queries content_audits for average scores, common issues,
 * and trends over time.
 *
 * Usage:
 *   npx tsx tools/jobs/quality-report.ts                # last 7 days
 *   npx tsx tools/jobs/quality-report.ts --days 30      # last 30 days
 *   npx tsx tools/jobs/quality-report.ts --type article  # filter by content type
 *   npx tsx tools/jobs/quality-report.ts --auditor claude # filter by auditor
 */

import 'dotenv/config';
import { Pool } from 'pg';

const args = process.argv.slice(2);

const daysIdx = args.indexOf('--days');
const DAYS = (() => {
  const parsed = daysIdx >= 0 && args[daysIdx + 1] ? parseInt(args[daysIdx + 1], 10) : 7;
  if (isNaN(parsed) || parsed <= 0) {
    console.error(`Invalid --days value: ${args[daysIdx + 1]}. Must be a positive number.`);
    process.exit(1);
  }
  return parsed;
})();

const typeIdx = args.indexOf('--type');
const TYPE_FILTER = typeIdx >= 0 ? args[typeIdx + 1] : undefined;

const auditorIdx = args.indexOf('--auditor');
const AUDITOR_FILTER = auditorIdx >= 0 ? args[auditorIdx + 1] : undefined;

interface ScoreSummary {
  content_type: string;
  audit_count: string;
  avg_score_before: string | null;
  avg_score_after: string | null;
  min_score_before: number | null;
  max_score_before: number | null;
  avg_improvement: string | null;
}

interface IssueCount {
  issue: string;
  occurrences: string;
}

interface DayTrend {
  audit_date: string;
  audit_count: string;
  avg_score_before: string | null;
  avg_score_after: string | null;
}

interface LowScoringRow {
  content_type: string;
  content_id: string;
  audited_by: string;
  score_before: number | null;
  score_after: number | null;
  issues_found: string[] | null;
  created_at: string;
}

async function main(): Promise<void> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Build WHERE conditions
    const conditions = [`created_at >= NOW() - INTERVAL '${DAYS} days'`];
    const params: string[] = [];
    let paramIdx = 1;

    if (TYPE_FILTER) {
      conditions.push(`content_type = $${paramIdx}`);
      params.push(TYPE_FILTER);
      paramIdx++;
    }

    if (AUDITOR_FILTER) {
      conditions.push(`audited_by ILIKE $${paramIdx}`);
      params.push(`%${AUDITOR_FILTER}%`);
      paramIdx++;
    }

    const whereClause = conditions.join(' AND ');

    // 1. Overall summary by content type
    const { rows: summaries } = await pool.query<ScoreSummary>(`
      SELECT
        content_type,
        COUNT(*)::text AS audit_count,
        ROUND(AVG(score_before), 1)::text AS avg_score_before,
        ROUND(AVG(score_after), 1)::text AS avg_score_after,
        MIN(score_before) AS min_score_before,
        MAX(score_before) AS max_score_before,
        ROUND(AVG(score_after - score_before), 1)::text AS avg_improvement
      FROM app.content_audits
      WHERE ${whereClause}
      GROUP BY content_type
      ORDER BY content_type
    `, params);

    // 2. Most common issues
    const { rows: topIssues } = await pool.query<IssueCount>(`
      SELECT issue, COUNT(*)::text AS occurrences
      FROM app.content_audits, UNNEST(issues_found) AS issue
      WHERE ${whereClause}
      GROUP BY issue
      ORDER BY COUNT(*) DESC
      LIMIT 15
    `, params);

    // 3. Daily trend
    const { rows: trends } = await pool.query<DayTrend>(`
      SELECT
        DATE(created_at)::text AS audit_date,
        COUNT(*)::text AS audit_count,
        ROUND(AVG(score_before), 1)::text AS avg_score_before,
        ROUND(AVG(score_after), 1)::text AS avg_score_after
      FROM app.content_audits
      WHERE ${whereClause}
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) DESC
    `, params);

    // 4. Recent low-scoring audits
    const { rows: lowScoring } = await pool.query<LowScoringRow>(`
      SELECT content_type, content_id, audited_by, score_before, score_after,
             issues_found, created_at::text
      FROM app.content_audits
      WHERE ${whereClause} AND score_before IS NOT NULL AND score_before < 70
      ORDER BY score_before ASC
      LIMIT 10
    `, params);

    // Total count
    const { rows: [{ total }] } = await pool.query<{ total: string }>(`
      SELECT COUNT(*)::text AS total FROM app.content_audits WHERE ${whereClause}
    `, params);

    if (parseInt(total) === 0) {
      console.info(`No audit records found in last ${DAYS} days.`);
      console.info('Content audits are logged by Claude editorial and quality loops.');
      console.info('Run some audits first, then check again.');
      return;
    }

    // ── Report ────────────────────────────────────────────────────
    console.info('='.repeat(70));
    console.info(`CONTENT QUALITY REPORT — last ${DAYS} days`);
    console.info(`Generated: ${new Date().toISOString()}`);
    console.info(`Total audits: ${total}`);
    console.info('='.repeat(70));

    // Summary by type
    console.info('\n## Scores by Content Type\n');
    console.info('  Type              | Audits | Avg Before | Avg After | Improvement | Range');
    console.info('  ' + '-'.repeat(80));
    for (const s of summaries) {
      const type = s.content_type.padEnd(17);
      const count = s.audit_count.padStart(6);
      const before = (s.avg_score_before ?? 'n/a').padStart(10);
      const after = (s.avg_score_after ?? 'n/a').padStart(9);
      const improvement = (s.avg_improvement ? `+${s.avg_improvement}` : 'n/a').padStart(11);
      const range = s.min_score_before != null && s.max_score_before != null
        ? `${s.min_score_before}-${s.max_score_before}`
        : 'n/a';
      console.info(`  ${type} | ${count} | ${before} | ${after} | ${improvement} | ${range}`);
    }

    // Common issues
    if (topIssues.length > 0) {
      console.info('\n## Most Common Issues\n');
      for (const issue of topIssues) {
        console.info(`  ${issue.occurrences.padStart(4)}x  ${issue.issue}`);
      }
    }

    // Daily trend
    if (trends.length > 0) {
      console.info('\n## Daily Trend\n');
      console.info('  Date       | Audits | Avg Before | Avg After');
      console.info('  ' + '-'.repeat(50));
      for (const t of trends) {
        const date = t.audit_date.padEnd(10);
        const count = t.audit_count.padStart(6);
        const before = (t.avg_score_before ?? 'n/a').padStart(10);
        const after = (t.avg_score_after ?? 'n/a').padStart(9);
        console.info(`  ${date} | ${count} | ${before} | ${after}`);
      }
    }

    // Low-scoring content
    if (lowScoring.length > 0) {
      console.info('\n## Low-Scoring Content (< 70)\n');
      for (const row of lowScoring) {
        console.info(`  [${row.score_before}] ${row.content_type}/${row.content_id}`);
        console.info(`       Audited by: ${row.audited_by} on ${row.created_at.slice(0, 10)}`);
        if (row.issues_found && row.issues_found.length > 0) {
          console.info(`       Issues: ${row.issues_found.join(', ')}`);
        }
        if (row.score_after != null) {
          console.info(`       After fix: ${row.score_after}`);
        }
      }
    }

    // Score distribution
    console.info('\n## Score Distribution (score_before)\n');
    const { rows: distRows } = await pool.query<{ bucket: string; cnt: string }>(`
      SELECT
        CASE
          WHEN score_before >= 90 THEN '90-100'
          WHEN score_before >= 80 THEN '80-89'
          WHEN score_before >= 70 THEN '70-79'
          WHEN score_before >= 50 THEN '50-69'
          ELSE '0-49'
        END AS bucket,
        COUNT(*)::text AS cnt
      FROM app.content_audits
      WHERE ${whereClause} AND score_before IS NOT NULL
      GROUP BY bucket
      ORDER BY bucket DESC
    `, params);

    for (const row of distRows) {
      const bar = '#'.repeat(Math.min(parseInt(row.cnt), 50));
      console.info(`  ${row.bucket.padEnd(7)} ${bar} (${row.cnt})`);
    }

    console.info('\n' + '='.repeat(70));
    console.info(`Run: npx tsx tools/jobs/quality-report.ts --days ${DAYS}`);
    console.info('='.repeat(70));

  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
