#!/usr/bin/env npx tsx
/**
 * CLI tool for analyzing Substack publications for quality
 *
 * Usage:
 *   npx tsx tools/discovery/analyze.ts --slug noahpinion
 *   npx tsx tools/discovery/analyze.ts --file content/seed-sources.json --min-score 60
 *   npx tsx tools/discovery/analyze.ts --slugs "noahpinion,astralcodexten,constructionphysics"
 */

import { parseArgs } from 'util';
import { readFile, writeFile } from 'fs/promises';
import {
  analyzePublication,
  analyzePublications,
  PublicationAnalysis,
} from '../../src/discovery/index.js';

const { values } = parseArgs({
  options: {
    slug: { type: 'string', short: 's' },
    slugs: { type: 'string' },
    file: { type: 'string', short: 'f' },
    output: { type: 'string', short: 'o' },
    'min-score': { type: 'string', default: '0' },
    delay: { type: 'string', short: 'd', default: '2000' },
    limit: { type: 'string', short: 'l' },
    verbose: { type: 'boolean', short: 'v', default: false },
    json: { type: 'boolean', default: false },
    help: { type: 'boolean', short: 'h', default: false },
  },
  allowPositionals: true,
});

function printHelp(): void {
  console.info(`
Publication Discovery & Quality Analysis Tool

Usage:
  npx tsx tools/discovery/analyze.ts [options]

Options:
  -s, --slug <slug>       Analyze a single publication by slug
      --slugs <list>      Comma-separated list of slugs to analyze
  -f, --file <path>       JSON file with publications to analyze
  -o, --output <path>     Write results to JSON file
      --min-score <n>     Only include publications with score >= n (default: 0)
  -d, --delay <ms>        Delay between fetches in ms (default: 2000)
  -l, --limit <n>         Limit number of publications to analyze
  -v, --verbose           Verbose output
      --json              Output results as JSON
  -h, --help              Show this help

Examples:
  # Analyze a single publication
  npx tsx tools/discovery/analyze.ts --slug noahpinion --verbose

  # Analyze multiple publications
  npx tsx tools/discovery/analyze.ts --slugs "noahpinion,astralcodexten" --verbose

  # Analyze from seed sources file
  npx tsx tools/discovery/analyze.ts --file content/seed-sources.json --min-score 60

  # Output high-quality publications to file
  npx tsx tools/discovery/analyze.ts --file content/seed-sources.json --min-score 70 --output quality.json
`);
}

function formatAnalysis(analysis: PublicationAnalysis): string {
  const lines = [
    `\n═══════════════════════════════════════════════════════`,
    `📰 ${analysis.name}`,
    `   @${analysis.slug} | ${analysis.author}`,
    `═══════════════════════════════════════════════════════`,
    ``,
    `🎯 Quality Score: ${analysis.qualityScore}/100`,
    `   ├─ Activity:    ${analysis.scoreBreakdown.activityScore}/25`,
    `   ├─ Length:      ${analysis.scoreBreakdown.lengthScore}/25`,
    `   ├─ Depth:       ${analysis.scoreBreakdown.depthScore}/25`,
    `   └─ Consistency: ${analysis.scoreBreakdown.consistencyScore}/25`,
    ``,
    `📊 Activity Metrics:`,
    `   ├─ Total posts in feed: ${analysis.activity.totalPosts}`,
    `   ├─ Posts last 30 days:  ${analysis.activity.postsLast30Days}`,
    `   ├─ Posts last 7 days:   ${analysis.activity.postsLast7Days}`,
    `   └─ Avg days between:    ${analysis.activity.avgDaysBetweenPosts?.toFixed(1) ?? 'N/A'}`,
    ``,
    `📝 Content Metrics:`,
    `   ├─ Avg word count:  ${analysis.content.avgWordCount}`,
    `   ├─ Avg read time:   ${analysis.content.avgReadTime} min`,
    `   ├─ Long-form posts: ${analysis.content.longFormCount} (${analysis.content.longFormPercentage}%)`,
    `   └─ Data-rich posts: ${analysis.content.dataRichCount}`,
    ``,
    `🏷️  Topics: ${analysis.topics.length > 0 ? analysis.topics.join(', ') : 'None detected'}`,
    `🔗 URL: ${analysis.url}`,
  ];
  return lines.join('\n');
}

async function main(): Promise<void> {
  if (values.help) {
    printHelp();
    process.exit(0);
  }

  const delayMs = parseInt(values.delay ?? '2000', 10);
  const minScore = parseInt(values['min-score'] ?? '0', 10);
  const limit = values.limit ? parseInt(values.limit, 10) : undefined;
  const verbose = values.verbose ?? false;

  let slugs: string[] = [];

  // Determine what to analyze
  if (values.slug) {
    slugs = [values.slug];
  } else if (values.slugs) {
    slugs = values.slugs.split(',').map((s) => s.trim());
  } else if (values.file) {
    try {
      const content = await readFile(values.file, 'utf-8');
      const data = JSON.parse(content) as {
        publications?: Array<{ slug: string; feedUrl?: string }>;
      };
      if (data.publications) {
        slugs = data.publications.map((p) => p.feedUrl ?? `${p.slug}.substack.com/feed`);
      }
    } catch (err) {
      console.error(`Error reading file: ${err instanceof Error ? err.message : String(err)}`);
      process.exit(1);
    }
  } else {
    console.error('Error: Provide --slug, --slugs, or --file');
    printHelp();
    process.exit(1);
  }

  // Apply limit
  if (limit && slugs.length > limit) {
    slugs = slugs.slice(0, limit);
  }

  console.info(`\n🔍 Analyzing ${slugs.length} publication(s)...\n`);

  // Single publication
  if (slugs.length === 1) {
    try {
      const analysis = await analyzePublication(slugs[0], { delayMs });

      if (values.json) {
        console.info(JSON.stringify(analysis, null, 2));
      } else {
        console.info(formatAnalysis(analysis));
      }

      if (values.output) {
        await writeFile(values.output, JSON.stringify(analysis, null, 2));
        console.info(`\n✓ Results written to ${values.output}`);
      }

      process.exit(analysis.qualityScore >= minScore ? 0 : 1);
    } catch (err) {
      console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
      process.exit(1);
    }
  }

  // Multiple publications
  const { results, errors } = await analyzePublications(slugs, {
    delayMs,
    verbose,
    onProgress: (current, total, slug) => {
      if (!verbose) {
        process.stdout.write(`\r  Analyzing ${current}/${total}: ${slug}...`.padEnd(60));
      }
    },
  });

  if (!verbose) {
    process.stdout.write('\r'.padEnd(70) + '\r');
  }

  // Filter by min score
  const qualityResults = results.filter((r) => r.qualityScore >= minScore);

  // Sort by quality score
  qualityResults.sort((a, b) => b.qualityScore - a.qualityScore);

  if (values.json) {
    console.info(JSON.stringify({ publications: qualityResults, errors }, null, 2));
  } else {
    console.info(`\n═══════════════════════════════════════════════════════`);
    console.info(`📊 Analysis Results`);
    console.info(`═══════════════════════════════════════════════════════`);
    console.info(`   Total analyzed:  ${results.length}`);
    console.info(`   Passed filter:   ${qualityResults.length} (score >= ${minScore})`);
    console.info(`   Errors:          ${errors.length}`);

    if (qualityResults.length > 0) {
      console.info(`\n🏆 Top Publications by Quality Score:\n`);
      for (const pub of qualityResults.slice(0, 20)) {
        const stars = '★'.repeat(Math.floor(pub.qualityScore / 20)) +
          '☆'.repeat(5 - Math.floor(pub.qualityScore / 20));
        console.info(
          `   ${stars} ${pub.qualityScore.toString().padStart(3)} | ${pub.name.slice(0, 40).padEnd(40)} | ${pub.content.avgReadTime}min avg`
        );
      }
    }

    if (errors.length > 0 && verbose) {
      console.info(`\n❌ Errors:\n`);
      for (const err of errors) {
        console.info(`   ${err.slug}: ${err.error}`);
      }
    }
  }

  if (values.output) {
    await writeFile(
      values.output,
      JSON.stringify({ publications: qualityResults, errors }, null, 2)
    );
    console.info(`\n✓ Results written to ${values.output}`);
  }

  process.exit(errors.length > 0 && results.length === 0 ? 1 : 0);
}

main().catch((err: unknown) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
