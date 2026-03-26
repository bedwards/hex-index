#!/usr/bin/env npx tsx
/**
 * CLI for Wikipedia enrichment operations
 *
 * Commands:
 *   retrofit [--limit N] [--publication SLUG]   Enrich existing articles with Wikipedia
 *   stats                                        Show enrichment statistics
 *   enrich <article-id>                          Enrich a single article
 *   healthcheck                                  Verify all dependencies are available
 *
 * Flags:
 *   --json    Output results as JSON (for machine consumption)
 */

import { config } from 'dotenv';
import { createPool } from '../db/queries.js';
import { enrichArticleWithWikipedia, retrofitExistingArticles, getEnrichmentStats } from './pipeline.js';

config();

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const filteredArgs = args.filter(a => a !== '--json');
const command = filteredArgs[0];

function output(data: Record<string, unknown>): void {
  if (jsonMode) {
    console.info(JSON.stringify(data));
  } else {
    for (const [key, value] of Object.entries(data)) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          console.info(`${key}:`);
          for (const item of value.slice(0, 10)) {
            console.info(`  - ${item}`);
          }
          if (value.length > 10) {
            console.info(`  ... and ${value.length - 10} more`);
          }
        }
      } else {
        console.info(`  ${key}: ${value}`);
      }
    }
  }
}

async function healthcheck(): Promise<void> {
  const checks: Record<string, unknown> = {
    command: 'healthcheck',
    timestamp: new Date().toISOString(),
  };
  let allOk = true;

  // Check DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    checks.database = 'FAIL: DATABASE_URL not set';
    allOk = false;
  } else {
    try {
      const pool = createPool(databaseUrl);
      await pool.query('SELECT 1');
      await pool.end();
      checks.database = 'OK';
    } catch (err) {
      checks.database = `FAIL: ${err instanceof Error ? err.message : String(err)}`;
      allOk = false;
    }
  }

  // Check Ollama
  const ollamaUrl = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
  const ollamaModel = process.env.OLLAMA_MODEL || 'qwen3.5:122b-a10b';
  try {
    const resp = await fetch(`${ollamaUrl}/api/tags`, { signal: AbortSignal.timeout(5000) });
    if (!resp.ok) {
      checks.ollama = `FAIL: HTTP ${resp.status}`;
      allOk = false;
    } else {
      const data = (await resp.json()) as { models?: Array<{ name?: string }> };
      const models = data.models?.map(m => m.name ?? '') ?? [];
      const hasModel = models.some(m => m.startsWith(ollamaModel.split(':')[0]));
      checks.ollama = 'OK';
      checks.ollama_url = ollamaUrl;
      checks.ollama_model = ollamaModel;
      checks.ollama_model_available = hasModel ? 'YES' : `NO (available: ${models.join(', ')})`;
      if (!hasModel) {
        allOk = false;
      }
    }
  } catch (err) {
    checks.ollama = `FAIL: ${err instanceof Error ? err.message : String(err)}`;
    checks.ollama_url = ollamaUrl;
    allOk = false;
  }

  checks.status = allOk ? 'OK' : 'FAIL';
  output(checks);
  process.exit(allOk ? 0 : 1);
}

async function main(): Promise<void> {
  if (!command) {
    console.info(`Usage: npx tsx src/wikipedia/cli.ts <command> [options]

Commands:
  retrofit [--limit N] [--publication SLUG]   Enrich existing articles
  stats                                       Show enrichment statistics
  enrich <article-id>                         Enrich a single article
  healthcheck                                 Verify dependencies (DB, Ollama)

Flags:
  --json    Output results as JSON
`);
    process.exit(1);
  }

  if (command === 'healthcheck') {
    await healthcheck();
    return;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    if (jsonMode) {
      console.info(JSON.stringify({ error: 'DATABASE_URL not set' }));
    } else {
      console.error('DATABASE_URL not set');
    }
    process.exit(1);
  }

  const pool = createPool(databaseUrl);

  try {
    switch (command) {
      case 'retrofit': {
        const limitIdx = filteredArgs.indexOf('--limit');
        const limit = limitIdx >= 0 ? parseInt(filteredArgs[limitIdx + 1], 10) : 10;

        const pubIdx = filteredArgs.indexOf('--publication');
        const publicationSlug = pubIdx >= 0 ? filteredArgs[pubIdx + 1] : undefined;

        if (!jsonMode) {
          console.info(`Retrofitting articles with Wikipedia enrichment...`);
          console.info(`  Limit: ${limit}`);
          if (publicationSlug) {
            console.info(`  Publication: ${publicationSlug}`);
          }
          console.info();
        }

        const result = await retrofitExistingArticles(pool, {
          limit,
          startFrom: 'newest',
          publicationSlug,
        });

        output({
          command: 'retrofit',
          processed: result.processed,
          enriched: result.enriched,
          errorCount: result.errors.length,
          errors: result.errors,
        });
        break;
      }

      case 'stats': {
        const stats = await getEnrichmentStats(pool);
        output({
          command: 'stats',
          totalArticles: stats.totalArticles,
          enrichedArticles: stats.enrichedArticles,
          enrichedPercent: stats.totalArticles > 0
            ? ((stats.enrichedArticles / stats.totalArticles) * 100).toFixed(1)
            : '0.0',
          totalWikipediaArticles: stats.totalWikipediaArticles,
          averageReadTime: stats.averageReadTime.toFixed(1),
        });
        break;
      }

      case 'enrich': {
        const articleId = filteredArgs[1];
        if (!articleId) {
          if (jsonMode) {
            console.info(JSON.stringify({ error: 'Article ID required' }));
          } else {
            console.error('Article ID required');
          }
          process.exit(1);
        }

        if (!jsonMode) {
          console.info(`Enriching article: ${articleId}`);
        }

        const result = await enrichArticleWithWikipedia(pool, articleId, { force: true });

        output({
          command: 'enrich',
          articleId,
          success: result.success,
          wikipediaArticles: result.wikipediaArticles.map(w => ({
            title: w.title,
            readTimeMinutes: w.estimatedReadTimeMinutes ?? null,
          })),
          errors: result.errors,
        });

        if (!result.success) {
          process.exit(1);
        }
        break;
      }

      default:
        if (jsonMode) {
          console.info(JSON.stringify({ error: `Unknown command: ${command}` }));
        } else {
          console.error(`Unknown command: ${command}`);
        }
        process.exit(1);
    }
  } finally {
    await pool.end();
  }
}

main().catch((err: unknown) => {
  if (jsonMode) {
    console.info(JSON.stringify({ error: String(err) }));
  } else {
    console.error('Error:', err);
  }
  process.exit(1);
});
