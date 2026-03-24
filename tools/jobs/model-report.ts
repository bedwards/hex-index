/**
 * Model performance report — parses structured METRIC logs from
 * article-rewrite and wiki-rewrite jobs to compare LLM quality.
 *
 * Usage:
 *   npx tsx tools/jobs/model-report.ts                # last 24h
 *   npx tsx tools/jobs/model-report.ts --hours 48     # last 48h
 *   npx tsx tools/jobs/model-report.ts --model qwen3  # filter by model
 */

import { readFile } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';

const args = process.argv.slice(2);
const hoursIdx = args.indexOf('--hours');
const HOURS = hoursIdx >= 0 && args[hoursIdx + 1] ? parseInt(args[hoursIdx + 1], 10) : 24;
const modelIdx = args.indexOf('--model');
const MODEL_FILTER = modelIdx >= 0 ? args[modelIdx + 1] : undefined;

interface Metric {
  type: string;
  title: string;
  slug: string;
  duration_ms: number;
  word_count: number;
  response_len: number;
  json_parsed: boolean;
  preamble_cleaned: boolean;
  html_cleaned: boolean;
  affiliate_links: number;
  model: string;
  timestamp: string;
}

async function main(): Promise<void> {
  const logsDir = join(process.cwd(), 'logs');

  // Find recent log files
  const cutoff = new Date(Date.now() - HOURS * 60 * 60 * 1000);
  const logFiles = await glob('{article-rewrite-*.log,wikipedia-rewrite-*.log}', { cwd: logsDir });

  const metrics: Metric[] = [];

  for (const file of logFiles) {
    const path = join(logsDir, file);
    try {
      const content = await readFile(path, 'utf-8');
      for (const line of content.split('\n')) {
        const metricMatch = line.match(/METRIC: (.+)$/);
        if (!metricMatch) {continue;}
        try {
          const metric = JSON.parse(metricMatch[1]) as Metric;
          if (new Date(metric.timestamp) < cutoff) {continue;}
          if (MODEL_FILTER && !metric.model.includes(MODEL_FILTER)) {continue;}
          metrics.push(metric);
        } catch { /* skip malformed */ }
      }
    } catch { /* skip unreadable */ }
  }

  // Also check launchd wrapper logs
  for (const prefix of ['launchd-article-rewrite', 'launchd-wiki-rewrite']) {
    const path = join(logsDir, `${prefix}.log`);
    try {
      const content = await readFile(path, 'utf-8');
      for (const line of content.split('\n')) {
        const metricMatch = line.match(/METRIC: (.+)$/);
        if (!metricMatch) {continue;}
        try {
          const metric = JSON.parse(metricMatch[1]) as Metric;
          if (new Date(metric.timestamp) < cutoff) {continue;}
          if (MODEL_FILTER && !metric.model.includes(MODEL_FILTER)) {continue;}
          metrics.push(metric);
        } catch { /* skip malformed */ }
      }
    } catch { /* skip */ }
  }

  if (metrics.length === 0) {
    console.info(`No metrics found in last ${HOURS}h.`);
    console.info('Metrics are logged by article-rewrite and wiki-rewrite jobs.');
    console.info('Run some rewrites first, then check again.');
    return;
  }

  // Group by model
  const byModel = new Map<string, Metric[]>();
  for (const m of metrics) {
    const key = m.model;
    if (!byModel.has(key)) {byModel.set(key, []);}
    byModel.get(key)!.push(m);
  }


  console.info('='.repeat(70));
  console.info(`MODEL PERFORMANCE REPORT — last ${HOURS}h`);
  console.info(`Generated: ${new Date().toISOString()}`);
  console.info('='.repeat(70));

  for (const [model, mets] of byModel) {
    const articles = mets.filter(m => m.type === 'article-rewrite');
    const wikis = mets.filter(m => m.type === 'wiki-rewrite');

    console.info(`\n## Model: ${model}`);
    console.info(`   Total items: ${mets.length} (${articles.length} articles, ${wikis.length} wikipedia)`);

    // Speed
    const durations = mets.map(m => m.duration_ms);
    const avgMs = durations.reduce((a, b) => a + b, 0) / durations.length;
    const minMs = Math.min(...durations);
    const maxMs = Math.max(...durations);
    console.info(`\n   SPEED:`);
    console.info(`     Avg: ${(avgMs / 1000).toFixed(1)}s | Min: ${(minMs / 1000).toFixed(1)}s | Max: ${(maxMs / 1000).toFixed(1)}s`);
    if (articles.length > 0) {
      const artAvg = articles.reduce((a, m) => a + m.duration_ms, 0) / articles.length;
      console.info(`     Articles avg: ${(artAvg / 1000).toFixed(1)}s`);
    }
    if (wikis.length > 0) {
      const wikiAvg = wikis.reduce((a, m) => a + m.duration_ms, 0) / wikis.length;
      console.info(`     Wikipedia avg: ${(wikiAvg / 1000).toFixed(1)}s`);
    }

    // JSON compliance
    const jsonOk = mets.filter(m => m.json_parsed).length;
    const jsonFail = mets.length - jsonOk;
    const jsonRate = ((jsonOk / mets.length) * 100).toFixed(1);
    console.info(`\n   JSON COMPLIANCE:`);
    console.info(`     Parsed OK: ${jsonOk}/${mets.length} (${jsonRate}%)`);
    if (jsonFail > 0) {
      console.info(`     ⚠ Failed: ${jsonFail} — fell back to regex extraction`);
    }

    // Artifact rate
    const preambleDirty = mets.filter(m => m.preamble_cleaned).length;
    const htmlDirty = mets.filter(m => m.html_cleaned).length;
    console.info(`\n   ARTIFACT RATE:`);
    console.info(`     cleanPreamble needed: ${preambleDirty}/${mets.length} (${((preambleDirty / mets.length) * 100).toFixed(1)}%)`);
    console.info(`     cleanHtml needed: ${htmlDirty}/${mets.length} (${((htmlDirty / mets.length) * 100).toFixed(1)}%)`);
    if (preambleDirty + htmlDirty === 0) {
      console.info(`     ✓ Zero artifacts — clean output`);
    }

    // Word counts
    const words = mets.map(m => m.word_count);
    const avgWords = words.reduce((a, b) => a + b, 0) / words.length;
    console.info(`\n   OUTPUT:`);
    console.info(`     Avg words: ${Math.round(avgWords)} | Min: ${Math.min(...words)} | Max: ${Math.max(...words)}`);

    // Affiliate links
    const withLinks = mets.filter(m => m.affiliate_links > 0).length;
    console.info(`     With affiliate links: ${withLinks}/${mets.length}`);
  }

  // Comparison if multiple models
  if (byModel.size > 1) {
    console.info('\n' + '='.repeat(70));
    console.info('COMPARISON');
    console.info('='.repeat(70));
    console.info('\n   Model                    | Items | Avg Speed | JSON OK | Artifact Rate');
    console.info('   ' + '-'.repeat(75));
    for (const [model, mets] of byModel) {
      const avgMs = mets.reduce((a, m) => a + m.duration_ms, 0) / mets.length;
      const jsonRate = ((mets.filter(m => m.json_parsed).length / mets.length) * 100).toFixed(0);
      const artifactRate = (((mets.filter(m => m.preamble_cleaned || m.html_cleaned).length) / mets.length) * 100).toFixed(0);
      const shortModel = model.length > 27 ? model.slice(0, 24) + '...' : model;
      console.info(`   ${shortModel.padEnd(27)} | ${String(mets.length).padStart(5)} | ${(avgMs / 1000).toFixed(1).padStart(7)}s | ${(jsonRate + '%').padStart(6)} | ${artifactRate}%`);
    }
  }

  // Errors from log files
  console.info('\n' + '='.repeat(70));
  console.info('ERRORS & TIMEOUTS');
  console.info('='.repeat(70));
  let errorCount = 0;
  let timeoutCount = 0;
  for (const file of logFiles) {
    const path = join(logsDir, file);
    try {
      const content = await readFile(path, 'utf-8');
      for (const line of content.split('\n')) {
        if (/Error:|FATAL:|Failed/i.test(line) && !/METRIC/.test(line)) {
          errorCount++;
        }
        if (/timeout|Hit time budget/i.test(line)) {
          timeoutCount++;
        }
      }
    } catch { /* skip */ }
  }
  console.info(`   Errors: ${errorCount} | Timeouts: ${timeoutCount}`);

  console.info('\n' + '='.repeat(70));
  console.info(`Run: npx tsx tools/jobs/model-report.ts --hours ${HOURS}`);
  console.info('='.repeat(70));
}

main().catch((err: unknown) => {
  console.error('Fatal:', err);
  process.exit(1);
});
