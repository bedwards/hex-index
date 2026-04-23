/**
 * generate-source-bios — issue #511
 *
 * Bulk-generate "About this source" bios for publications that don't yet
 * have an entry in content/source-bios.yml. Uses Claude (NOT Qwen) via the
 * `claude -p` subprocess. Claude is asked to fetch each publication's own
 * about page and return a strict YAML fragment matching the schema at the
 * top of content/source-bios.yml.
 *
 * Usage:
 *   tsx tools/editorial/generate-source-bios.ts                 # default 25
 *   tsx tools/editorial/generate-source-bios.ts --limit 10
 *   tsx tools/editorial/generate-source-bios.ts --dry-run       # no claude, no write
 *
 * Safety rules (per issue #511):
 *  - Never overwrite existing bios.
 *  - Append-only — existing entries in source-bios.yml are left untouched.
 *  - New entries are written in alphabetical order by slug, appended at EOF.
 *  - After every batch, validate the full file by parsing it through
 *    src/shared/source-bios.ts's parseSourceBios() so we fail loudly if
 *    Claude returned malformed YAML.
 *  - Skips publications on the banned-slug list.
 *  - Uses `claude -p` with the Max subscription; does NOT call Qwen.
 *  - Defamation hygiene: the prompt instructs Claude to stick to facts the
 *    source has published about itself and to cite the about page URL.
 */

import 'dotenv/config';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Pool } from 'pg';
import { parse as parseYaml } from 'yaml';
import { parseSourceBios } from '../../src/shared/source-bios.js';
import { BANNED_SLUGS } from '../../src/shared/banned-publications.js';

// ── Types ────────────────────────────────────────────────────────────

export interface Publication {
  slug: string;
  name: string | null;
  base_url: string | null;
}

export interface GeneratedBio {
  slug: string;
  name: string;
  type: string;
  country: string;
  us_state?: string;
  funding_model: string;
  affiliations: string[];
  political_leaning: string;
  url: string;
  bio_last_audited_at: string;
}

export interface PublicationQueries {
  getMissingPublications(existingSlugs: Set<string>, limit: number): Promise<Publication[]>;
}

export interface ClaudeRunner {
  run(prompt: string): Promise<string>;
}

// ── Default Postgres implementation ──────────────────────────────────

const DEFAULT_DB_URL = 'postgresql://postgres@localhost:5432/hex-index';

export function makePgQueries(pool: Pool): PublicationQueries {
  return {
    async getMissingPublications(
      existingSlugs: Set<string>,
      limit: number
    ): Promise<Publication[]> {
      // Publications that have at least one article and whose slug is not
      // already in source-bios.yml. Ordered alphabetically by slug so
      // batches are deterministic across runs.
      const result = await pool.query<{
        slug: string;
        name: string | null;
        base_url: string | null;
      }>(
        `SELECT DISTINCT p.slug, p.name, p.base_url
           FROM app.publications p
           JOIN app.articles a ON a.publication_id = p.id
          ORDER BY p.slug ASC`
      );
      const missing: Publication[] = [];
      for (const row of result.rows) {
        if (existingSlugs.has(row.slug)) { continue; }
        if (BANNED_SLUGS.has(row.slug)) { continue; }
        missing.push({ slug: row.slug, name: row.name, base_url: row.base_url });
        if (missing.length >= limit) { break; }
      }
      return missing;
    },
  };
}

// ── Default `claude -p` subprocess runner ────────────────────────────

export function makeClaudeCliRunner(): ClaudeRunner {
  return {
    async run(prompt: string): Promise<string> {
      return await new Promise<string>((resolvePromise, reject) => {
        const proc = spawn('claude', ['-p', prompt], {
          stdio: ['ignore', 'pipe', 'pipe'],
        });
        let out = '';
        let err = '';
        proc.stdout.on('data', (c: Buffer) => { out += c.toString(); });
        proc.stderr.on('data', (c: Buffer) => { err += c.toString(); });
        proc.on('error', reject);
        proc.on('close', (code) => {
          if (code === 0) { resolvePromise(out); }
          else { reject(new Error(`claude -p exited ${code}: ${err}`)); }
        });
      });
    },
  };
}

// ── Prompt construction ──────────────────────────────────────────────

export function buildBioPrompt(pub: Publication, today: string): string {
  const displayName = pub.name && pub.name.trim().length > 0 ? pub.name : pub.slug;
  const homeUrl = pub.base_url ?? '(unknown — infer from slug)';
  return [
    `You are drafting an "About this source" bio for Hex Index, a curated news reading library. The bio will appear beneath excerpts of this publication's articles on hex-index.com and in weekly epubs read aloud via Speechify.`,
    ``,
    `Publication`,
    `  name: ${displayName}`,
    `  slug: ${pub.slug}`,
    `  home URL: ${homeUrl}`,
    ``,
    `Task`,
    `  1. Fetch the publication's own "about" page (or the about section of their homepage / YouTube channel page). If you cannot reach a direct about URL, use the home URL above and try /about, /about-us, or the channel's "about" tab.`,
    `  2. Based ONLY on facts the source has published about itself, draft a bio matching the schema below.`,
    `  3. Cite the exact URL you relied on in the "url" field.`,
    ``,
    `Defamation hygiene (CRITICAL)`,
    `  - Stick to facts the source states about itself: funding model, affiliations, stated mission, country/location, author background.`,
    `  - Do NOT repeat accusations, gossip, or third-party smears.`,
    `  - "political_leaning" must be a SENTENCE-FORM editorial judgement (1-2 sentences, opinionated but fair), NOT a left/center/right label. Own it as Hex Index's editorial voice. Example: "Center-left, skeptical of US foreign-policy consensus, sympathetic to organized labor."`,
    `  - Keep claims specific and verifiable. If you are unsure about a fact, leave it out rather than guess.`,
    ``,
    `Schema (YAML, keyed by the exact slug "${pub.slug}")`,
    `  ${pub.slug}:`,
    `    name: "Human-readable name"`,
    `    type: "independent newsletter" | "individual creator" | "youtube channel" | "corporate outlet" | "academic" | "think-tank organ" | "public broadcaster" | "nonprofit"`,
    `    country: "ISO country name, e.g. United States"`,
    `    us_state: "Optional, only if US-based and known" # omit if not applicable`,
    `    funding_model: "short phrase, e.g. paid Substack subscriptions"`,
    `    affiliations:`,
    `      - "each affiliation as its own list item"`,
    `    political_leaning: "Opinionated 1-2 sentence editorial judgement."`,
    `    url: "https://..."`,
    `    bio_last_audited_at: "${today}"`,
    ``,
    `Output format (STRICT)`,
    `  - Return ONLY the YAML fragment starting with "${pub.slug}:". No prose preamble, no code fences, no commentary after.`,
    `  - Use double-quoted strings. Do not use YAML anchors.`,
    `  - If "affiliations" is empty, use "affiliations: []".`,
    `  - "bio_last_audited_at" MUST be exactly "${today}".`,
    `  - All fields except "us_state" are required.`,
  ].join('\n');
}

// ── YAML extraction / validation ─────────────────────────────────────

/**
 * Extract the first YAML fragment keyed by the expected slug from Claude's
 * stdout. Claude may wrap the fragment in code fences or add preamble —
 * we trim both. Returns the raw YAML text (not parsed).
 */
export function extractYamlFragment(stdout: string, slug: string): string {
  // Strip code fences if present.
  let text = stdout;
  const fence = text.match(/```(?:yaml|yml)?\s*([\s\S]*?)```/);
  if (fence) {
    text = fence[1];
  }
  // Find the first line starting with "<slug>:" at column 0.
  const lines = text.split('\n');
  const startIdx = lines.findIndex((l) => l.trimEnd() === `${slug}:`);
  if (startIdx < 0) {
    throw new Error(`extractYamlFragment: could not find "${slug}:" in claude output`);
  }
  // Collect subsequent indented lines until an unindented non-empty line.
  const out: string[] = [lines[startIdx]];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.length === 0) { out.push(line); continue; }
    if (/^\s/.test(line)) { out.push(line); continue; }
    break;
  }
  // Trim trailing blank lines.
  while (out.length > 0 && out[out.length - 1].trim() === '') { out.pop(); }
  return out.join('\n');
}

/**
 * Parse a single-entry YAML fragment and validate it via parseSourceBios.
 * Returns the typed bio. Throws on any schema issue.
 */
export function parseAndValidateFragment(
  fragment: string,
  expectedSlug: string,
  today: string
): GeneratedBio {
  // Defensive: make sure Claude didn't tack on extra entries.
  const doc = parseYaml(fragment) as Record<string, unknown> | null;
  if (!doc || typeof doc !== 'object') {
    throw new Error(`parseAndValidateFragment: fragment did not parse as a YAML mapping`);
  }
  const keys = Object.keys(doc);
  if (keys.length !== 1) {
    throw new Error(
      `parseAndValidateFragment: expected exactly 1 entry, got ${keys.length} (${keys.join(', ')})`
    );
  }
  if (keys[0] !== expectedSlug) {
    throw new Error(
      `parseAndValidateFragment: entry key "${keys[0]}" does not match expected slug "${expectedSlug}"`
    );
  }
  // Reuse the canonical schema validator.
  const parsed = parseSourceBios(fragment);
  if (parsed.length !== 1) {
    throw new Error(`parseAndValidateFragment: validator returned ${parsed.length} bios`);
  }
  const bio = parsed[0];
  if (bio.bio_last_audited_at !== today) {
    throw new Error(
      `parseAndValidateFragment: bio_last_audited_at must be ${today}, got ${bio.bio_last_audited_at}`
    );
  }
  if (bio.political_leaning.length < 20) {
    throw new Error(
      `parseAndValidateFragment: political_leaning too short (${bio.political_leaning.length} chars), must be sentence-form`
    );
  }
  return {
    slug: bio.slug,
    name: bio.name,
    type: bio.type,
    country: bio.country,
    us_state: bio.us_state,
    funding_model: bio.funding_model,
    affiliations: bio.affiliations,
    political_leaning: bio.political_leaning,
    url: bio.url,
    bio_last_audited_at: bio.bio_last_audited_at,
  };
}

// ── YAML rendering (stable format matching existing file style) ──────

/**
 * Render a single bio as a YAML block that matches the existing
 * content/source-bios.yml style: 2-space indent, double-quoted strings,
 * block-style affiliations list (or inline [] when empty).
 */
export function renderBioYaml(bio: GeneratedBio): string {
  const lines: string[] = [];
  lines.push(`${bio.slug}:`);
  lines.push(`  name: ${yamlQuote(bio.name)}`);
  lines.push(`  type: ${yamlQuote(bio.type)}`);
  lines.push(`  country: ${yamlQuote(bio.country)}`);
  if (bio.us_state && bio.us_state.length > 0) {
    lines.push(`  us_state: ${yamlQuote(bio.us_state)}`);
  }
  lines.push(`  funding_model: ${yamlQuote(bio.funding_model)}`);
  if (bio.affiliations.length === 0) {
    lines.push(`  affiliations: []`);
  } else {
    lines.push(`  affiliations:`);
    for (const a of bio.affiliations) {
      lines.push(`    - ${yamlQuote(a)}`);
    }
  }
  lines.push(`  political_leaning: ${yamlQuote(bio.political_leaning)}`);
  lines.push(`  url: ${yamlQuote(bio.url)}`);
  lines.push(`  bio_last_audited_at: ${yamlQuote(bio.bio_last_audited_at)}`);
  return lines.join('\n');
}

function yamlQuote(s: string): string {
  // Double-quoted YAML string with \ and " escaped.
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

// ── File I/O ─────────────────────────────────────────────────────────

function defaultBiosPath(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, '..', '..', 'content', 'source-bios.yml');
}

/**
 * Append new bios to the end of source-bios.yml. New entries are sorted
 * alphabetically by slug among themselves. Existing content is preserved
 * byte-for-byte up to its final newline.
 *
 * After writing, the whole file is re-parsed through parseSourceBios to
 * catch YAML errors. If validation fails the file is rolled back to its
 * previous contents and the error is re-thrown.
 */
export function appendBiosToFile(
  biosPath: string,
  newBios: GeneratedBio[]
): void {
  if (newBios.length === 0) { return; }
  const existing = existsSync(biosPath) ? readFileSync(biosPath, 'utf8') : '';
  // Guard against accidental overwrite — refuse if any new slug already
  // appears as a top-level key in the existing file.
  const existingParsed = existing.length > 0 ? parseSourceBios(existing) : [];
  const existingSlugs = new Set(existingParsed.map((b) => b.slug));
  for (const b of newBios) {
    if (existingSlugs.has(b.slug)) {
      throw new Error(`appendBiosToFile: slug "${b.slug}" already present; refusing to overwrite`);
    }
  }
  // Sort the new batch alphabetically by slug.
  const sorted = [...newBios].sort((a, b) => a.slug.localeCompare(b.slug));
  // Ensure file ends with a single trailing newline, then append.
  const base = existing.endsWith('\n') ? existing : existing + '\n';
  const blocks = sorted.map((b) => renderBioYaml(b)).join('\n\n');
  // Leading blank line between the existing last entry and the new batch.
  const appended = base.endsWith('\n\n') ? base + blocks + '\n' : base + '\n' + blocks + '\n';
  writeFileSync(biosPath, appended, 'utf8');
  // Validate the whole file.
  try {
    const reparsed = parseSourceBios(readFileSync(biosPath, 'utf8'));
    // Sanity: reparsed should contain every new slug.
    const reparsedSlugs = new Set(reparsed.map((b) => b.slug));
    for (const b of newBios) {
      if (!reparsedSlugs.has(b.slug)) {
        throw new Error(`appendBiosToFile: post-write re-parse missing slug "${b.slug}"`);
      }
    }
  } catch (err) {
    // Roll back.
    writeFileSync(biosPath, existing, 'utf8');
    throw err;
  }
}

// ── Orchestration ────────────────────────────────────────────────────

export interface GenerateOptions {
  db: PublicationQueries;
  claude: ClaudeRunner;
  biosPath: string;
  limit: number;
  dryRun: boolean;
  today: string;
  log?: (msg: string) => void;
}

export interface GenerateResult {
  generated: GeneratedBio[];
  failed: Array<{ slug: string; reason: string }>;
  skipped: string[];
}

export async function generateBios(opts: GenerateOptions): Promise<GenerateResult> {
  const log = opts.log ?? ((m: string) => { console.error(m); });
  // Seed existing slug set from the on-disk YAML.
  const biosText = existsSync(opts.biosPath)
    ? readFileSync(opts.biosPath, 'utf8')
    : '';
  const existingBios = biosText.length > 0 ? parseSourceBios(biosText) : [];
  const existingSlugs = new Set(existingBios.map((b) => b.slug));

  log(`generate-source-bios: ${existingSlugs.size} existing bios on disk`);
  const targets = await opts.db.getMissingPublications(existingSlugs, opts.limit);
  log(`generate-source-bios: ${targets.length} target publications (limit ${opts.limit})`);

  if (opts.dryRun) {
    log(`generate-source-bios: DRY RUN — would generate bios for:`);
    for (const t of targets) {
      log(`  - ${t.slug}  (${t.name ?? '(no name)'} — ${t.base_url ?? 'no url'})`);
    }
    return { generated: [], failed: [], skipped: [] };
  }

  const generated: GeneratedBio[] = [];
  const failed: Array<{ slug: string; reason: string }> = [];

  for (const pub of targets) {
    log(`generate-source-bios: drafting bio for ${pub.slug}...`);
    const prompt = buildBioPrompt(pub, opts.today);
    let stdout: string;
    try {
      stdout = await opts.claude.run(prompt);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log(`  FAILED (claude invocation): ${msg}`);
      failed.push({ slug: pub.slug, reason: `claude invocation: ${msg}` });
      continue;
    }
    let bio: GeneratedBio;
    try {
      const fragment = extractYamlFragment(stdout, pub.slug);
      bio = parseAndValidateFragment(fragment, pub.slug, opts.today);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      log(`  FAILED (parse/validate): ${msg}`);
      failed.push({ slug: pub.slug, reason: `parse/validate: ${msg}` });
      continue;
    }
    generated.push(bio);
    log(`  OK — ${bio.name} (${bio.country})`);
  }

  if (generated.length > 0) {
    appendBiosToFile(opts.biosPath, generated);
    log(`generate-source-bios: appended ${generated.length} bios to ${opts.biosPath}`);
  } else {
    log(`generate-source-bios: nothing to append`);
  }

  return { generated, failed, skipped: [] };
}

// ── CLI entrypoint ───────────────────────────────────────────────────

function parseArgs(argv: string[]): { limit: number; dryRun: boolean } {
  let limit = 25;
  let dryRun = false;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') { dryRun = true; continue; }
    if (a === '--limit') {
      const next = argv[i + 1];
      if (!next) { throw new Error('--limit requires a value'); }
      const n = Number(next);
      if (!Number.isInteger(n) || n < 1) {
        throw new Error(`--limit must be a positive integer, got "${next}"`);
      }
      limit = n;
      i++;
      continue;
    }
    if (a === '--help' || a === '-h') {
      console.info(
        'Usage: tsx tools/editorial/generate-source-bios.ts [--limit N] [--dry-run]'
      );
      process.exit(0);
    }
    throw new Error(`unknown argument: ${a}`);
  }
  return { limit, dryRun };
}

function todayIso(): string {
  const d = new Date();
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
}

async function main(): Promise<void> {
  const { limit, dryRun } = parseArgs(process.argv.slice(2));
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? DEFAULT_DB_URL,
  });
  try {
    const db = makePgQueries(pool);
    const claude = makeClaudeCliRunner();
    const result = await generateBios({
      db,
      claude,
      biosPath: defaultBiosPath(),
      limit,
      dryRun,
      today: todayIso(),
    });
    console.info('');
    console.info(`Generated: ${result.generated.length}`);
    console.info(`Failed:    ${result.failed.length}`);
    if (result.failed.length > 0) {
      for (const f of result.failed) {
        console.info(`  - ${f.slug}: ${f.reason}`);
      }
    }
    if (result.generated.length > 0) {
      console.info('');
      console.info('Added slugs:');
      for (const b of result.generated) {
        console.info(`  - ${b.slug}`);
      }
    }
  } finally {
    await pool.end().catch(() => undefined);
  }
}

// Only run main() when executed directly (so unit tests can import without
// triggering the DB connection or argv parsing).
const isMain = (() => {
  try {
    const entry = process.argv[1];
    if (!entry) { return false; }
    return resolve(entry) === fileURLToPath(import.meta.url);
  } catch {
    return false;
  }
})();

if (isMain) {
  main().catch((err: unknown) => {
    console.error('generate-source-bios:', err);
    process.exit(1);
  });
}
