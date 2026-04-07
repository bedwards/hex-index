/**
 * Consolidation candidate detection (issue #451).
 *
 * Pure, importable module that groups recent articles into candidate sets
 * of 2–4 that are about the same story AND offer diverse takes (from
 * different publications).
 *
 * Scoring thresholds (tunable at the top of the file):
 *   - TOPIC_JACCARD_MIN   ≥ 0.4  — tag Jaccard similarity
 *   - TITLE_COSINE_MIN    ≥ 0.5  — title TF-IDF cosine similarity
 *   - TIME_WINDOW_DAYS    ≤ 14   — created_at proximity
 *   - MAX_GROUP_SIZE      4      — hard cap per group
 *
 * Publication distinctness is required: same-publication pairs are
 * rejected as follow-ups rather than "diverse voices".
 *
 * CLI usage (preview only — no DB mutation):
 *   npx tsx tools/editorial/consolidation-candidates.ts --preview
 *   npx tsx tools/editorial/consolidation-candidates.ts --preview --days 21 --limit 200
 */

// ── Tunable thresholds ──────────────────────────────────────────────
export const TOPIC_JACCARD_MIN = 0.4;
export const TITLE_COSINE_MIN = 0.5;
export const TIME_WINDOW_DAYS = 14;
export const MAX_GROUP_SIZE = 4;

// ── Types ───────────────────────────────────────────────────────────
export interface Article {
  id: string;
  title: string;
  publication_id: string;
  publication_name?: string;
  created_at: Date;
  word_count: number | null;
  tags: string[];
}

export interface CandidateGroup {
  articles: Article[];        // sorted by created_at asc
  score: number;              // average pairwise combined score
  primarySuggestion: string;  // article id
  reasoning: string;          // human-readable summary
}

export interface FindOptions {
  /** Look-back window in days for candidate pool (default 14). */
  days?: number;
  /** Hard cap on pool size (default 500). */
  limit?: number;
}

/** Minimal DB interface so tests can pass a fake. */
export interface QueryableDb {
  query: <T extends Record<string, unknown> = Record<string, unknown>>(
    sql: string,
    params?: unknown[],
  ) => Promise<{ rows: T[] }>;
}

// ── Similarity helpers ──────────────────────────────────────────────

/** Jaccard similarity between two sets of strings. */
export function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) { return 0; }
  let intersect = 0;
  for (const x of a) {
    if (b.has(x)) { intersect++; }
  }
  const union = a.size + b.size - intersect;
  return union === 0 ? 0 : intersect / union;
}

const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'have', 'he', 'her', 'his', 'in', 'is', 'it', 'its', 'of',
  'on', 'or', 'that', 'the', 'to', 'was', 'were', 'will', 'with',
  'but', 'not', 'this', 'they', 'their', 'them', 'we', 'you', 'i',
  'our', 'my', 'your', 'who', 'what', 'when', 'where', 'why', 'how',
  'into', 'about', 'over', 'under', 'than', 'then', 'so', 'if',
]);

export function tokenizeTitle(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w));
}

/**
 * Build a TF-IDF corpus from titles and return a function that computes
 * cosine similarity between any two title indices.
 */
export function buildTitleTfIdf(titles: string[]): (i: number, j: number) => number {
  const docs = titles.map(tokenizeTitle);
  const N = docs.length;

  // Document frequency
  const df = new Map<string, number>();
  for (const doc of docs) {
    const seen = new Set(doc);
    for (const term of seen) {
      df.set(term, (df.get(term) ?? 0) + 1);
    }
  }

  // Per-doc TF-IDF vector
  const vectors: Map<string, number>[] = docs.map(doc => {
    const tf = new Map<string, number>();
    for (const term of doc) {
      tf.set(term, (tf.get(term) ?? 0) + 1);
    }
    const vec = new Map<string, number>();
    for (const [term, count] of tf) {
      const idf = Math.log((N + 1) / ((df.get(term) ?? 0) + 1)) + 1;
      vec.set(term, count * idf);
    }
    return vec;
  });

  // Pre-compute norms
  const norms: number[] = vectors.map(v => {
    let s = 0;
    for (const w of v.values()) { s += w * w; }
    return Math.sqrt(s);
  });

  return (i: number, j: number): number => {
    const a = vectors[i];
    const b = vectors[j];
    if (!a || !b) { return 0; }
    if (norms[i] === 0 || norms[j] === 0) { return 0; }
    // Iterate the smaller vector.
    const [small, big] = a.size <= b.size ? [a, b] : [b, a];
    let dot = 0;
    for (const [term, w] of small) {
      const bw = big.get(term);
      if (bw !== undefined) { dot += w * bw; }
    }
    return dot / (norms[i] * norms[j]);
  };
}

// ── Core grouping ───────────────────────────────────────────────────

interface ScoredPair {
  i: number;
  j: number;
  topic: number;
  title: number;
  combined: number; // normalized sum / 2
}

/**
 * Compute all passing pairs then greedily assemble groups capped at
 * MAX_GROUP_SIZE. Exported for testability.
 */
export function groupArticles(articles: Article[]): CandidateGroup[] {
  if (articles.length < 2) { return []; }

  const tagSets = articles.map(a => new Set(a.tags));
  const titleSim = buildTitleTfIdf(articles.map(a => a.title));
  const timeMs = TIME_WINDOW_DAYS * 24 * 60 * 60 * 1000;

  const pairs: ScoredPair[] = [];
  for (let i = 0; i < articles.length; i++) {
    for (let j = i + 1; j < articles.length; j++) {
      const A = articles[i];
      const B = articles[j];
      if (A.publication_id === B.publication_id) { continue; }
      if (Math.abs(A.created_at.getTime() - B.created_at.getTime()) > timeMs) { continue; }
      const topic = jaccard(tagSets[i], tagSets[j]);
      if (topic < TOPIC_JACCARD_MIN) { continue; }
      const title = titleSim(i, j);
      if (title < TITLE_COSINE_MIN) { continue; }
      pairs.push({ i, j, topic, title, combined: (topic + title) / 2 });
    }
  }

  pairs.sort((a, b) => b.combined - a.combined);

  // Greedy assembly. groupOf[idx] = group index or -1.
  const groupOf = new Array<number>(articles.length).fill(-1);
  const groups: number[][] = [];

  const pairScore = new Map<string, number>();
  const pairKey = (a: number, b: number): string => a < b ? `${a}:${b}` : `${b}:${a}`;
  for (const p of pairs) {
    pairScore.set(pairKey(p.i, p.j), p.combined);
  }

  const allPairwisePass = (idx: number, members: number[]): boolean => {
    for (const m of members) {
      if (!pairScore.has(pairKey(idx, m))) { return false; }
    }
    return true;
  };

  const pubsInGroup = (members: number[]): Set<string> => {
    const s = new Set<string>();
    for (const m of members) { s.add(articles[m].publication_id); }
    return s;
  };

  for (const p of pairs) {
    const gi = groupOf[p.i];
    const gj = groupOf[p.j];

    if (gi === -1 && gj === -1) {
      const idx = groups.length;
      groups.push([p.i, p.j]);
      groupOf[p.i] = idx;
      groupOf[p.j] = idx;
      continue;
    }

    // Exactly one in a group — try to add the other.
    if (gi !== -1 && gj === -1) {
      const members = groups[gi];
      if (members.length >= MAX_GROUP_SIZE) { continue; }
      if (pubsInGroup(members).has(articles[p.j].publication_id)) { continue; }
      if (!allPairwisePass(p.j, members)) { continue; }
      members.push(p.j);
      groupOf[p.j] = gi;
      continue;
    }
    if (gj !== -1 && gi === -1) {
      const members = groups[gj];
      if (members.length >= MAX_GROUP_SIZE) { continue; }
      if (pubsInGroup(members).has(articles[p.i].publication_id)) { continue; }
      if (!allPairwisePass(p.i, members)) { continue; }
      members.push(p.i);
      groupOf[p.i] = gj;
      continue;
    }
    // Both already grouped — skip (no merging across existing groups).
  }

  // Build CandidateGroup[]
  const result: CandidateGroup[] = [];
  for (const members of groups) {
    if (members.length < 2) { continue; }
    const sorted = [...members].sort((a, b) =>
      articles[a].created_at.getTime() - articles[b].created_at.getTime(),
    );
    const groupArticles = sorted.map(idx => articles[idx]);

    // Average pairwise combined score.
    let sum = 0;
    let count = 0;
    for (let a = 0; a < sorted.length; a++) {
      for (let b = a + 1; b < sorted.length; b++) {
        const s = pairScore.get(pairKey(sorted[a], sorted[b]));
        if (s !== undefined) { sum += s; count++; }
      }
    }
    const score = count > 0 ? sum / count : 0;

    // Primary suggestion: most recent article, tiebreak on highest word count.
    const primary = [...groupArticles].sort((a, b) => {
      const ta = a.created_at.getTime();
      const tb = b.created_at.getTime();
      if (tb !== ta) { return tb - ta; }
      return (b.word_count ?? 0) - (a.word_count ?? 0);
    })[0];

    // Reasoning: shared tags, average title sim, source list.
    const sharedTags = sorted
      .map(idx => new Set(articles[idx].tags))
      .reduce<Set<string> | null>((acc, s) => {
        if (acc === null) { return new Set(s); }
        const out = new Set<string>();
        for (const t of acc) { if (s.has(t)) { out.add(t); } }
        return out;
      }, null) ?? new Set<string>();

    // Average title sim across pairs (from pairScore we only have combined, so
    // recompute title sims for the reasoning line).
    const titleSimFn = buildTitleTfIdf(groupArticles.map(a => a.title));
    let titleSumLocal = 0;
    let titleCountLocal = 0;
    for (let a = 0; a < groupArticles.length; a++) {
      for (let b = a + 1; b < groupArticles.length; b++) {
        titleSumLocal += titleSimFn(a, b);
        titleCountLocal++;
      }
    }
    const avgTitleSim = titleCountLocal > 0 ? titleSumLocal / titleCountLocal : 0;

    const sources = groupArticles
      .map(a => a.publication_name ?? a.publication_id)
      .join(', ');
    const tagList = [...sharedTags].slice(0, 5).join(', ') || '(none)';

    const reasoning =
      `shared tags: ${tagList}; title sim ${avgTitleSim.toFixed(2)}; sources: ${sources}`;

    result.push({
      articles: groupArticles,
      score,
      primarySuggestion: primary.id,
      reasoning,
    });
  }

  // Sort output groups by score desc for stable presentation.
  result.sort((a, b) => b.score - a.score);
  return result;
}

// ── DB entrypoint ───────────────────────────────────────────────────

interface DbRow extends Record<string, unknown> {
  id: string;
  title: string;
  publication_id: string;
  publication_name: string | null;
  created_at: Date | string;
  word_count: number | null;
  tag_slug: string | null;
}

export async function findConsolidationCandidates(
  db: QueryableDb,
  opts: FindOptions = {},
): Promise<CandidateGroup[]> {
  const days = opts.days ?? TIME_WINDOW_DAYS;
  const limit = opts.limit ?? 500;

  // Pool: articles created within the window. The `consolidated_into`
  // column is introduced in #448; we filter on it only if it exists
  // (detected by a try/catch fallback) to avoid a hard dependency.
  const baseSelect = `
    SELECT a.id, a.title, a.publication_id,
           p.name AS publication_name,
           a.created_at, a.word_count,
           at.tag_slug
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    LEFT JOIN app.article_tags at ON at.article_id = a.id
  `;
  const whereRecent = `WHERE a.created_at >= NOW() - ($1 || ' days')::interval`;
  const order = `ORDER BY a.created_at DESC`;

  let rows: DbRow[];
  try {
    const sql = `${baseSelect} ${whereRecent} AND a.consolidated_into IS NULL ${order}`;
    const res = await db.query<DbRow>(sql, [String(days)]);
    rows = res.rows;
  } catch {
    const sql = `${baseSelect} ${whereRecent} ${order}`;
    const res = await db.query<DbRow>(sql, [String(days)]);
    rows = res.rows;
  }

  // Collapse per article id, gathering tags.
  const byId = new Map<string, Article>();
  for (const r of rows) {
    let a = byId.get(r.id);
    if (!a) {
      a = {
        id: r.id,
        title: r.title,
        publication_id: r.publication_id,
        publication_name: r.publication_name ?? undefined,
        created_at: r.created_at instanceof Date ? r.created_at : new Date(r.created_at),
        word_count: r.word_count,
        tags: [],
      };
      byId.set(r.id, a);
    }
    if (r.tag_slug && !a.tags.includes(r.tag_slug)) {
      a.tags.push(r.tag_slug);
    }
  }

  const articles = [...byId.values()]
    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
    .slice(0, limit);

  return groupArticles(articles);
}

// ── Backfill helpers (issue #452) ───────────────────────────────────

export interface RangeOptions {
  /** Inclusive lower bound (created_at >= start). */
  start: Date;
  /** Exclusive upper bound (created_at < end). */
  end: Date;
  /** Hard cap on rows pulled (default 1000). */
  limit?: number;
}

/**
 * Find candidate groups whose articles fall within an explicit
 * `[start, end)` window. Skips articles already absorbed
 * (`consolidated_into IS NOT NULL`) or marked `is_consolidated = true`.
 *
 * Used by the backfill driver in `consolidate.ts` to walk history in
 * fixed 14-day chunks. Unlike `findConsolidationCandidates`, this does
 * not depend on `NOW()`.
 */
export async function findCandidatesInRange(
  db: QueryableDb,
  opts: RangeOptions,
): Promise<CandidateGroup[]> {
  const limit = opts.limit ?? 1000;

  const baseSelect = `
    SELECT a.id, a.title, a.publication_id,
           p.name AS publication_name,
           a.created_at, a.word_count,
           at.tag_slug
    FROM app.articles a
    JOIN app.publications p ON a.publication_id = p.id
    LEFT JOIN app.article_tags at ON at.article_id = a.id
  `;
  const where = `WHERE a.created_at >= $1 AND a.created_at < $2`;
  const order = `ORDER BY a.created_at DESC`;

  let rows: DbRow[];
  try {
    const sql = `${baseSelect} ${where}
      AND a.consolidated_into IS NULL
      AND (a.is_consolidated IS NULL OR a.is_consolidated = false)
      ${order}`;
    const res = await db.query<DbRow>(sql, [opts.start, opts.end]);
    rows = res.rows;
  } catch {
    const sql = `${baseSelect} ${where} ${order}`;
    const res = await db.query<DbRow>(sql, [opts.start, opts.end]);
    rows = res.rows;
  }

  const byId = new Map<string, Article>();
  for (const r of rows) {
    let a = byId.get(r.id);
    if (!a) {
      a = {
        id: r.id,
        title: r.title,
        publication_id: r.publication_id,
        publication_name: r.publication_name ?? undefined,
        created_at: r.created_at instanceof Date ? r.created_at : new Date(r.created_at),
        word_count: r.word_count,
        tags: [],
      };
      byId.set(r.id, a);
    }
    if (r.tag_slug && !a.tags.includes(r.tag_slug)) {
      a.tags.push(r.tag_slug);
    }
  }

  const articles = [...byId.values()]
    .sort((a, b) => b.created_at.getTime() - a.created_at.getTime())
    .slice(0, limit);

  return groupArticles(articles);
}

// ── CLI wrapper ─────────────────────────────────────────────────────

async function cliMain(): Promise<void> {
  const args = process.argv.slice(2);
  const preview = args.includes('--preview');
  const daysIdx = args.indexOf('--days');
  const limitIdx = args.indexOf('--limit');
  const days = daysIdx >= 0 ? Number(args[daysIdx + 1]) : TIME_WINDOW_DAYS;
  const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : 2000;

  if (!preview) {
    console.error('Usage: consolidation-candidates --preview [--days N] [--limit N]');
    process.exit(2);
  }

  const { Pool } = await import('pg');
  const dotenv = await import('dotenv');
  dotenv.config();
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) { throw new Error('DATABASE_URL required'); }
  const pool = new Pool({ connectionString: dbUrl });

  try {
    const groups = await findConsolidationCandidates(pool as unknown as QueryableDb, {
      days,
      limit,
    });

    console.info(
      `Found ${groups.length} candidate group(s) in the last ${days} days ` +
      `(jaccard≥${TOPIC_JACCARD_MIN}, title≥${TITLE_COSINE_MIN}, ≤${TIME_WINDOW_DAYS}d, ` +
      `cap ${MAX_GROUP_SIZE})`,
    );
    console.info('');

    for (let i = 0; i < groups.length; i++) {
      const g = groups[i];
      console.info(`Group ${i + 1}  score=${g.score.toFixed(3)}  primary=${g.primarySuggestion}`);
      console.info(`  ${g.reasoning}`);
      for (const a of g.articles) {
        const pub = a.publication_name ?? a.publication_id;
        const date = a.created_at.toISOString().slice(0, 10);
        console.info(`    - [${date}] (${pub}) ${a.title}  {${a.id}}`);
      }
      console.info('');
    }
  } finally {
    await pool.end();
  }
}

// Only run CLI when invoked directly (not when imported by tests).
const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  cliMain().catch((err: unknown) => {
    console.error('Fatal:', err);
    process.exit(1);
  });
}
