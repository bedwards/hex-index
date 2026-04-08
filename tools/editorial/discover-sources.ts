/**
 * Source discovery tool (issue #488).
 *
 * Uses Claude (NOT Qwen) to actively discover new YouTube channels and
 * Substack publications that match our editorial criteria. Produces a
 * JSON proposal file in docs-internal/ that Brian reviews before any
 * merge into content/ingest-subscribed.json or content/youtube-sources.json.
 *
 * Run on demand — NEVER scheduled.
 *
 *   tsx tools/editorial/discover-sources.ts           # default: 15 candidates
 *   tsx tools/editorial/discover-sources.ts --count 20
 *   tsx tools/editorial/discover-sources.ts --dry-run # skip writing file
 *
 * The DB query and the `claude -p` subprocess are both hidden behind
 * interfaces so the unit tests can inject fakes. See
 * discover-sources.test.ts.
 */

import 'dotenv/config';
import { spawn } from 'child_process';
import { mkdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ── Editorial criteria (codified from issue #488) ───────────────────

export const EDITORIAL_CRITERIA = [
  'Long-form, written-for-reading or lecture-style. Substack newsletters and analytical YouTube channels. No short-form, no podcast-only feeds, no tweet aggregators.',
  'Original analysis, not aggregator/wire reposts.',
  'Topic mix that fills our existing tags: geopolitics, science, urbanism, economics, philosophy, history, AI, defense, climate, ancient history. Underrepresented topics get priority.',
  'Globally diverse perspectives — non-US sources are explicitly valued. Caspian Report (NL), Perun (AU), Just Have a Think (UK), ChinaTalk are exemplars.',
  'HARD EXCLUSION: no contrarian-science channels (e.g. Dr. John Campbell).',
  'HARD EXCLUSION: no fringe/conspiracy framings.',
  'HARD EXCLUSION: no AI-generated slop.',
  'HARD EXCLUSION: nothing we would refuse to comment on (e.g. Payload).',
  'Author cites primary sources, has a stable posting cadence, and has a public about/funding page.',
] as const;

/**
 * Regex patterns that automatically disqualify a proposal. Keep these in
 * sync with lessons learned — see the "hard exclusions" in EDITORIAL_CRITERIA.
 */
export const BLACKLIST_PATTERNS: RegExp[] = [
  /john\s+campbell/i,
  /payload/i,
  /\bqanon\b/i,
  /\bconspirac/i,
  /ai[\s-]?generated/i,
  /\bslop\b/i,
];

/**
 * Tags we actively cultivate. If one of these has <MIN_ARTICLES_PER_TAG
 * articles in the last TAG_WINDOW_DAYS, it's considered under-represented
 * and gets escalated in the prompt to Claude.
 */
export const CULTIVATED_TAGS = [
  'geopolitics',
  'science',
  'urbanism',
  'economics',
  'philosophy',
  'history',
  'ai',
  'defense',
  'climate',
  'ancient-history',
] as const;

export const MIN_ARTICLES_PER_TAG = 5;
export const TAG_WINDOW_DAYS = 90;
export const DEFAULT_CANDIDATE_COUNT = 15;

// ── Types ───────────────────────────────────────────────────────────

export interface ExistingSource {
  name: string;
  slug: string;
  url: string;
  type: 'substack' | 'youtube';
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface SourceMix {
  substackCount: number;
  youtubeCount: number;
  tagCounts: TagCount[];
  underRepresentedTags: string[];
}

export interface Proposal {
  name: string;
  url: string;
  rss_or_channel_id: string;
  type: 'substack' | 'youtube';
  rationale: string;
  criterion_matched: string;
  topic_filled: string;
  draft_bio: string;
}

export interface ProposalFile {
  generated_at: string;
  criteria: readonly string[];
  source_mix: SourceMix;
  proposals: Proposal[];
}

/**
 * Minimal DB surface this tool needs. Production passes a pg.Pool wrapper;
 * tests inject a fake.
 */
export interface QueryableDb {
  getTagCounts(windowDays: number): Promise<TagCount[]>;
}

/** Subprocess runner for `claude -p`. Tests inject a fake. */
export interface ClaudeRunner {
  run(prompt: string): Promise<string>;
}

// ── Source mix analysis ─────────────────────────────────────────────

export function computeSourceMix(
  substackSources: ExistingSource[],
  youtubeSources: ExistingSource[],
  tagCounts: TagCount[],
): SourceMix {
  const counts = new Map(tagCounts.map((t) => [t.tag, t.count]));
  const underRepresentedTags = CULTIVATED_TAGS.filter(
    (t) => (counts.get(t) ?? 0) < MIN_ARTICLES_PER_TAG,
  );
  return {
    substackCount: substackSources.length,
    youtubeCount: youtubeSources.length,
    tagCounts: [...tagCounts].sort((a, b) => b.count - a.count),
    underRepresentedTags,
  };
}

// ── Prompt construction ─────────────────────────────────────────────

export function buildDiscoveryPrompt(
  mix: SourceMix,
  substackSources: ExistingSource[],
  youtubeSources: ExistingSource[],
  count: number,
): string {
  const substackList = substackSources.map((s) => `- ${s.name} (${s.url})`).join('\n');
  const youtubeList = youtubeSources.map((s) => `- ${s.name} (${s.url})`).join('\n');
  const tagMixLines = mix.tagCounts
    .map((t) => `  - ${t.tag}: ${t.count}`)
    .join('\n');
  const underRep = mix.underRepresentedTags.length
    ? mix.underRepresentedTags.join(', ')
    : '(none — mix is balanced)';

  return [
    'You are helping curate the hex-index reading library.',
    '',
    'EDITORIAL CRITERIA (every proposal must satisfy ALL of these):',
    ...EDITORIAL_CRITERIA.map((c, i) => `${i + 1}. ${c}`),
    '',
    `CURRENT SOURCE MIX: ${mix.substackCount} Substack publications + ${mix.youtubeCount} YouTube channels.`,
    '',
    `Tag distribution (last ${TAG_WINDOW_DAYS} days):`,
    tagMixLines || '  (no tag data)',
    '',
    `UNDER-REPRESENTED TAGS (fewer than ${MIN_ARTICLES_PER_TAG} articles in window): ${underRep}`,
    'Prioritize proposals that fill these gaps.',
    '',
    'EXISTING SUBSTACK SOURCES (do not propose duplicates):',
    substackList,
    '',
    'EXISTING YOUTUBE SOURCES (do not propose duplicates):',
    youtubeList,
    '',
    `TASK: Propose ${count} new sources (mix of Substack and YouTube) that match the criteria`,
    'and fill gaps. Respond with a JSON array only. No prose before or after.',
    'Each element must have these fields:',
    '  name: string',
    '  url: string',
    '  rss_or_channel_id: string  (RSS URL for Substack, channel handle like @foo for YouTube)',
    '  type: "substack" | "youtube"',
    '  rationale: string  (3 sentences, cite topic gap filled)',
    '  criterion_matched: string  (which of the numbered criteria above applies most)',
    '  topic_filled: string  (one of the cultivated tags)',
    '  draft_bio: string  (2-3 sentence public bio in third person)',
    '',
    'Return ONLY the JSON array.',
  ].join('\n');
}

// ── Parsing + validation ────────────────────────────────────────────

export interface ParseResult {
  proposals: Proposal[];
  malformed: Array<{ raw: unknown; reason: string }>;
}

/**
 * Parse + strictly validate the Claude output. Returns both well-formed
 * Proposal objects and a list of malformed items (with a reason) so the
 * caller can surface them as rejected candidates rather than dropping
 * them silently.
 */
export function parseProposalsDetailed(stdout: string): ParseResult {
  const match = stdout.match(/\[[\s\S]*\]/);
  if (!match) {
    throw new Error(`no JSON array in claude output: ${stdout.slice(0, 200)}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(match[0]);
  } catch (e) {
    throw new Error(`claude output is not valid JSON: ${(e as Error).message}`, { cause: e });
  }
  if (!Array.isArray(parsed)) {
    throw new Error('claude output is not a JSON array');
  }
  const proposals: Proposal[] = [];
  const malformed: Array<{ raw: unknown; reason: string }> = [];
  const requiredStringFields = [
    'name',
    'url',
    'rss_or_channel_id',
    'rationale',
    'criterion_matched',
    'topic_filled',
    'draft_bio',
  ] as const;

  for (const raw of parsed) {
    if (typeof raw !== 'object' || raw === null) {
      malformed.push({ raw, reason: 'entry is not an object' });
      continue;
    }
    const r = raw as Record<string, unknown>;
    const missing = requiredStringFields.filter((f) => typeof r[f] !== 'string');
    if (missing.length > 0) {
      malformed.push({ raw, reason: `missing/invalid string fields: ${missing.join(', ')}` });
      continue;
    }
    if (r.type !== 'substack' && r.type !== 'youtube') {
      malformed.push({ raw, reason: `invalid type: ${String(r.type)}` });
      continue;
    }
    proposals.push({
      name: r.name as string,
      url: r.url as string,
      rss_or_channel_id: r.rss_or_channel_id as string,
      type: r.type,
      rationale: r.rationale as string,
      criterion_matched: r.criterion_matched as string,
      topic_filled: r.topic_filled as string,
      draft_bio: r.draft_bio as string,
    });
  }
  return { proposals, malformed };
}

/** Back-compat convenience wrapper that only returns the well-formed list. */
export function parseProposals(stdout: string): Proposal[] {
  return parseProposalsDetailed(stdout).proposals;
}

export interface ValidationResult {
  accepted: Proposal[];
  rejected: Array<{ proposal: Proposal; reason: string }>;
}

/**
 * Canonicalize a URL for duplicate detection. Lower-cases the host,
 * strips the protocol, leading `www.`, trailing slash(es), query string,
 * and fragment. `https://Example.com`, `http://www.example.com/`,
 * and `example.com/?utm=foo#x` all collapse to `example.com`.
 */
export function normalizeUrl(url: string): string {
  let u = url.trim().toLowerCase();
  u = u.replace(/^https?:\/\//, '');
  u = u.replace(/^www\./, '');
  // Strip query string and fragment.
  const qIdx = u.search(/[?#]/);
  if (qIdx >= 0) { u = u.slice(0, qIdx); }
  // Strip trailing slashes.
  u = u.replace(/\/+$/, '');
  return u;
}

/**
 * Reject proposals that duplicate an existing source (by name or
 * canonicalized URL) or that match any BLACKLIST_PATTERNS against
 * their name, URL, or bio. The `rationale` field is intentionally
 * excluded from the blacklist scan to avoid false positives when
 * the author mentions a blacklisted term descriptively.
 */
export function validateProposals(
  proposals: Proposal[],
  existing: ExistingSource[],
): ValidationResult {
  const accepted: Proposal[] = [];
  const rejected: Array<{ proposal: Proposal; reason: string }> = [];

  const normalize = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const existingNames = new Set(existing.map((s) => normalize(s.name)));
  const existingUrls = new Set(existing.map((s) => normalizeUrl(s.url)));
  const seenNames = new Set<string>();
  const seenUrls = new Set<string>();

  for (const p of proposals) {
    const nameKey = normalize(p.name);
    const urlKey = normalizeUrl(p.url);
    // Deliberately exclude `rationale` — it commonly contains descriptive
    // mentions of blacklisted terms (e.g. "similar to Payload but broader")
    // that should not auto-reject an otherwise-valid proposal.
    const haystack = `${p.name} ${p.url} ${p.draft_bio}`;

    const blacklistHit = BLACKLIST_PATTERNS.find((re) => re.test(haystack));
    if (blacklistHit) {
      rejected.push({ proposal: p, reason: `blacklist match: ${blacklistHit}` });
      continue;
    }
    if (existingNames.has(nameKey) || existingUrls.has(urlKey)) {
      rejected.push({ proposal: p, reason: 'duplicate of existing source' });
      continue;
    }
    if (seenNames.has(nameKey) || seenUrls.has(urlKey)) {
      rejected.push({ proposal: p, reason: 'duplicate within batch' });
      continue;
    }
    seenNames.add(nameKey);
    seenUrls.add(urlKey);
    accepted.push(p);
  }

  return { accepted, rejected };
}

// ── File I/O helpers ────────────────────────────────────────────────

function asString(v: unknown): string {
  return typeof v === 'string' ? v : '';
}

export async function loadExistingSubstack(repoRoot: string): Promise<ExistingSource[]> {
  const raw = await readFile(path.join(repoRoot, 'content/ingest-subscribed.json'), 'utf8');
  const parsed = JSON.parse(raw) as { publications?: Array<Record<string, unknown>> };
  return (parsed.publications ?? []).map((p) => ({
    name: asString(p.name),
    slug: asString(p.slug),
    url: asString(p.url) || asString(p.feedUrl),
    type: 'substack' as const,
  }));
}

export async function loadExistingYoutube(repoRoot: string): Promise<ExistingSource[]> {
  const raw = await readFile(path.join(repoRoot, 'content/youtube-sources.json'), 'utf8');
  const parsed = JSON.parse(raw) as { channels?: Array<Record<string, unknown>> };
  return (parsed.channels ?? []).map((c) => ({
    name: asString(c.name),
    slug: asString(c.slug),
    url: asString(c.url),
    type: 'youtube' as const,
  }));
}

/**
 * Filenames include a UTC HHMM suffix so that running the tool multiple
 * times in a single day does not clobber previous proposal files.
 */
export function proposalFilename(date: Date): string {
  const y = date.getUTCFullYear();
  const m = String(date.getUTCMonth() + 1).padStart(2, '0');
  const d = String(date.getUTCDate()).padStart(2, '0');
  const h = String(date.getUTCHours()).padStart(2, '0');
  const min = String(date.getUTCMinutes()).padStart(2, '0');
  return `source-proposals-${y}-${m}-${d}-${h}${min}.json`;
}

// ── Default `claude -p` subprocess runner ───────────────────────────

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

// ── Orchestration ───────────────────────────────────────────────────

export interface DiscoverOptions {
  repoRoot: string;
  db: QueryableDb;
  claude: ClaudeRunner;
  count?: number;
  now?: Date;
  dryRun?: boolean;
}

export interface DiscoverResult {
  filePath: string | null;
  proposalFile: ProposalFile;
  rejected: Array<{ proposal: Proposal; reason: string }>;
}

export async function discoverSources(opts: DiscoverOptions): Promise<DiscoverResult> {
  const count = opts.count ?? DEFAULT_CANDIDATE_COUNT;
  const now = opts.now ?? new Date();

  const [substack, youtube, tagCounts] = await Promise.all([
    loadExistingSubstack(opts.repoRoot),
    loadExistingYoutube(opts.repoRoot),
    opts.db.getTagCounts(TAG_WINDOW_DAYS),
  ]);

  const mix = computeSourceMix(substack, youtube, tagCounts);
  const prompt = buildDiscoveryPrompt(mix, substack, youtube, count);

  let stdout: string;
  try {
    stdout = await opts.claude.run(prompt);
  } catch (e) {
    throw new Error(`claude -p invocation failed: ${(e as Error).message}`, { cause: e });
  }

  const { proposals: raw, malformed } = parseProposalsDetailed(stdout);
  const { accepted, rejected } = validateProposals(raw, [...substack, ...youtube]);
  // Surface malformed Claude output as rejected candidates so reviewers
  // can see what was dropped and why.
  for (const m of malformed) {
    rejected.push({
      proposal: {
        name: '(malformed)',
        url: '',
        rss_or_channel_id: '',
        type: 'substack',
        rationale: '',
        criterion_matched: '',
        topic_filled: '',
        draft_bio: JSON.stringify(m.raw).slice(0, 200),
      },
      reason: `malformed claude output: ${m.reason}`,
    });
  }

  const proposalFile: ProposalFile = {
    generated_at: now.toISOString(),
    criteria: EDITORIAL_CRITERIA,
    source_mix: mix,
    proposals: accepted,
  };

  let filePath: string | null = null;
  if (!opts.dryRun) {
    const outDir = path.join(opts.repoRoot, 'docs-internal');
    await mkdir(outDir, { recursive: true });
    filePath = path.join(outDir, proposalFilename(now));
    await writeFile(filePath, JSON.stringify(proposalFile, null, 2) + '\n', 'utf8');
  }

  return { filePath, proposalFile, rejected };
}

// ── Production DB adapter ───────────────────────────────────────────

/** Tag-counts query: recent (within windowDays) ready articles grouped by tag. */
export function makePgQueryableDb(
  pool: { query: (sql: string, params?: unknown[]) => Promise<{ rows: Array<Record<string, unknown>> }> },
): QueryableDb {
  return {
    async getTagCounts(windowDays: number): Promise<TagCount[]> {
      const sql = `
        SELECT at.tag_slug AS tag, COUNT(DISTINCT a.id)::int AS count
          FROM app.articles a
          JOIN app.article_tags at ON at.article_id = a.id
         WHERE a.created_at >= NOW() - ($1::int || ' days')::interval
           AND (a.rewritten_content_path IS NOT NULL
             OR (a.is_consolidated = true AND a.consolidated_into IS NULL))
         GROUP BY at.tag_slug
         ORDER BY count DESC
      `;
      const res = await pool.query(sql, [windowDays]);
      return res.rows.map((r) => ({
        tag: String(r.tag),
        count: Number(r.count),
      }));
    },
  };
}

// ── CLI entry point ─────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const countArg = args.indexOf('--count');
  let count = DEFAULT_CANDIDATE_COUNT;
  if (countArg >= 0) {
    if (countArg + 1 >= args.length) {
      console.error('--count requires a numeric value');
      process.exit(2);
    }
    const n = Number(args[countArg + 1]);
    if (!Number.isFinite(n) || n <= 0 || !Number.isInteger(n)) {
      console.error(`--count must be a positive integer, got: ${args[countArg + 1]}`);
      process.exit(2);
    }
    count = n;
  }
  const dryRun = args.includes('--dry-run');

  const here = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(here, '..', '..');

  const { Pool } = await import('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL ?? 'postgres://hex:hex@localhost:5432/hex_index',
  });
  try {
    const result = await discoverSources({
      repoRoot,
      db: makePgQueryableDb(pool),
      claude: makeClaudeCliRunner(),
      count,
      dryRun,
    });
    if (result.filePath) {
      const rel = path.relative(repoRoot, result.filePath);
      const n = result.proposalFile.proposals.length;
      // eslint-disable-next-line no-console
      console.log(
        `Wrote ${n} candidate sources to ${rel} — review then run merge-proposals.ts`,
      );
    } else {
      // eslint-disable-next-line no-console
      console.log(
        `Dry run: ${result.proposalFile.proposals.length} candidates, ${result.rejected.length} rejected`,
      );
    }
  } finally {
    await pool.end();
  }
}

const isMain = (() => {
  try {
    return import.meta.url === `file://${process.argv[1]}`;
  } catch {
    return false;
  }
})();

if (isMain) {
  main().catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
}
