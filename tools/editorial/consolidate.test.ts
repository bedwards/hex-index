/**
 * Integration-ish tests for the consolidation worker. Uses an in-memory
 * fake DB and the stub synthesizer so it runs offline and without
 * Postgres.
 */
import { mkdtemp, readFile } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { makeProgrammableSynthesizer } from './consolidate-helpers.js';
import { describe, expect, it } from 'vitest';
import type { CandidateGroup } from './consolidation-candidates.js';
import {
  type ConsolidationPlan,
  formatPlan,
  makeStubSynthesizer,
  parseArgs,
  runModeA,
  runModeB,
} from './consolidate.js';

// ── Fake DB ─────────────────────────────────────────────────────────

interface FakeArticle {
  id: string;
  title: string;
  slug: string;
  author_name: string | null;
  publication_id: string;
  publication_name: string;
  original_url: string;
  rewritten_content_path: string | null;
  content_path: string | null;
  full_content_path: string | null;
  affiliate_links: unknown;
  is_consolidated: boolean;
  consolidated_into: string | null;
}

interface CommentarySourceRow {
  commentary_article_id: string;
  source_article_id: string;
  is_primary: boolean;
  position: number;
}

interface WikiLinkRow {
  article_id: string;
  wikipedia_id: string;
  relevance_rank: number;
  topic_summary: string;
}

class FakeDb {
  articles = new Map<string, FakeArticle>();
  commentarySources: CommentarySourceRow[] = [];
  wikiLinks: WikiLinkRow[] = [];

  query<T extends Record<string, unknown> = Record<string, unknown>>(
    sql: string,
    params: unknown[] = [],
  ): Promise<{ rows: T[] }> {
    return Promise.resolve(this.querySync<T>(sql, params));
  }

  private querySync<T extends Record<string, unknown> = Record<string, unknown>>(
    sql: string,
    params: unknown[] = [],
  ): { rows: T[] } {
    const s = sql.trim();

    if (s.startsWith('SELECT a.id, a.title, a.slug')) {
      const ids = params[0] as string[];
      const rows = ids
        .map((id) => this.articles.get(id))
        .filter((a): a is FakeArticle => a !== undefined)
        .map((a) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          author_name: a.author_name,
          publication_id: a.publication_id,
          publication_name: a.publication_name,
          original_url: a.original_url,
          rewritten_content_path: a.rewritten_content_path,
          content_path: a.content_path,
          full_content_path: a.full_content_path,
          affiliate_links: a.affiliate_links,
        }));
      return { rows: rows as unknown as T[] };
    }

    if (s.startsWith('SELECT id, consolidated_into')) {
      const ids = params[0] as string[];
      const rows = ids
        .map((id) => this.articles.get(id))
        .filter(
          (a): a is FakeArticle =>
            a !== undefined && (a.consolidated_into !== null || a.is_consolidated),
        )
        .map((a) => ({ id: a.id, consolidated_into: a.consolidated_into }));
      return { rows: rows as unknown as T[] };
    }

    if (s.startsWith('SELECT wikipedia_id, relevance_rank')) {
      const articleId = params[0] as string;
      const rows = this.wikiLinks
        .filter((l) => l.article_id === articleId)
        .sort((a, b) => a.relevance_rank - b.relevance_rank)
        .map(({ wikipedia_id, relevance_rank, topic_summary }) => ({
          wikipedia_id,
          relevance_rank,
          topic_summary,
        }));
      return { rows: rows as unknown as T[] };
    }

    if (s.startsWith('SELECT COUNT(*)::text')) {
      const commentaryId = params[0] as string;
      const count = this.commentarySources.filter(
        (c) => c.commentary_article_id === commentaryId,
      ).length;
      return { rows: [{ count: String(count) }] as unknown as T[] };
    }

    if (s.startsWith('SELECT source_article_id FROM app.commentary_sources')) {
      const commentaryId = params[0] as string;
      const rows = this.commentarySources
        .filter((c) => c.commentary_article_id === commentaryId)
        .sort((a, b) => a.position - b.position)
        .map((c) => ({ source_article_id: c.source_article_id }));
      return { rows: rows as unknown as T[] };
    }

    if (s.startsWith('INSERT INTO app.articles')) {
      const [id, publication_id, title, slug, original_url, rewritten_content_path, author_name] =
        params as [string, string, string, string, string, string, string];
      const pub = [...this.articles.values()].find((a) => a.publication_id === publication_id);
      this.articles.set(id, {
        id,
        title,
        slug,
        author_name,
        publication_id,
        publication_name: pub?.publication_name ?? 'unknown',
        original_url,
        rewritten_content_path,
        content_path: null,
        full_content_path: null,
        affiliate_links: [],
        is_consolidated: true,
        consolidated_into: null,
      });
      return { rows: [] };
    }

    if (s.startsWith('INSERT INTO app.commentary_sources')) {
      const [commentary_article_id, source_article_id, is_primary, position] = params as [
        string,
        string,
        boolean,
        number,
      ];
      this.commentarySources.push({
        commentary_article_id,
        source_article_id,
        is_primary,
        position,
      });
      return { rows: [] };
    }

    if (s.startsWith('UPDATE app.articles SET consolidated_into')) {
      const [commentaryId, sourceId] = params as [string, string];
      const a = this.articles.get(sourceId);
      if (a) { a.consolidated_into = commentaryId; }
      return { rows: [] };
    }

    if (s.startsWith('INSERT INTO app.article_wikipedia_links')) {
      const [article_id, wikipedia_id, relevance_rank, topic_summary] = params as [
        string,
        string,
        number,
        string,
      ];
      // Emulate the ON CONFLICT (article_id, wikipedia_id) DO NOTHING.
      if (
        !this.wikiLinks.some(
          (l) => l.article_id === article_id && l.wikipedia_id === wikipedia_id,
        )
      ) {
        this.wikiLinks.push({ article_id, wikipedia_id, relevance_rank, topic_summary });
      }
      return { rows: [] };
    }

    if (s.startsWith('DELETE FROM app.article_wikipedia_links')) {
      const articleId = params[0] as string;
      this.wikiLinks = this.wikiLinks.filter((l) => l.article_id !== articleId);
      return { rows: [] };
    }

    if (s.startsWith('UPDATE app.articles SET affiliate_links')) {
      const [json, id] = params as [string, string];
      const a = this.articles.get(id);
      if (a) { a.affiliate_links = JSON.parse(json); }
      return { rows: [] };
    }

    if (s.startsWith('UPDATE app.articles\n        SET title')) {
      const [id, title, path] = params as [string, string, string];
      const a = this.articles.get(id);
      if (a) {
        a.title = title;
        a.rewritten_content_path = path;
      }
      return { rows: [] };
    }

    if (s.startsWith('UPDATE app.commentary_sources SET is_primary = false')) {
      const [commentaryId] = params as [string];
      for (const c of this.commentarySources) {
        if (c.commentary_article_id === commentaryId) { c.is_primary = false; }
      }
      return { rows: [] };
    }

    if (s.startsWith('UPDATE app.commentary_sources SET is_primary = true')) {
      const [commentaryId, sourceId] = params as [string, string];
      for (const c of this.commentarySources) {
        if (
          c.commentary_article_id === commentaryId &&
          c.source_article_id === sourceId
        ) {
          c.is_primary = true;
        }
      }
      return { rows: [] };
    }

    throw new Error(`FakeDb: unhandled SQL: ${s.slice(0, 80)}`);
  }
}

function seedGroup(db: FakeDb): CandidateGroup {
  const base = new Date('2026-04-01T00:00:00Z');
  const mk = (id: string, pub: string, author: string, title: string): void => {
    db.articles.set(id, {
      id,
      title,
      slug: id,
      author_name: author,
      publication_id: pub,
      publication_name: `Pub-${pub}`,
      original_url: `https://x.test/${id}`,
      rewritten_content_path: null,
      content_path: null,
      full_content_path: null,
      affiliate_links: [],
      is_consolidated: false,
      consolidated_into: null,
    });
  };
  mk('aaaaaaaa-0000-0000-0000-000000000001', 'pub-alpha', 'Alice Adams', 'Grid strain rising');
  mk('aaaaaaaa-0000-0000-0000-000000000002', 'pub-beta', 'Bob Baker', 'Power grid on the brink');
  mk('aaaaaaaa-0000-0000-0000-000000000003', 'pub-gamma', 'Carol Chen', 'Blackouts loom');

  const articles = [...db.articles.values()].map((a) => ({
    id: a.id,
    title: a.title,
    publication_id: a.publication_id,
    publication_name: a.publication_name,
    created_at: base,
    word_count: 1000,
    tags: ['energy', 'grid', 'policy'],
  }));

  return {
    articles,
    score: 0.72,
    primarySuggestion: articles[0].id,
    reasoning: 'shared tags: energy, grid; title sim 0.71',
  };
}

describe('parseArgs', () => {
  it('defaults to dry-run when no flag is given', () => {
    expect(parseArgs(['node', 'x'])).toEqual({
      dryRun: true,
      apply: false,
      limit: 10,
      addTo: undefined,
    });
  });
  it('parses --apply --limit 3', () => {
    const p = parseArgs(['node', 'x', '--apply', '--limit', '3']);
    expect(p).toEqual({ dryRun: false, apply: true, limit: 3, addTo: undefined });
  });
  it('parses --add-to', () => {
    const p = parseArgs(['node', 'x', '--add-to', 'com-1', 'src-2']);
    expect(p.addTo).toEqual({ commentaryId: 'com-1', sourceId: 'src-2' });
  });
  it('throws on incomplete --add-to', () => {
    expect(() => parseArgs(['node', 'x', '--add-to', 'only-one'])).toThrow();
  });
});

describe('runModeA dry-run on a fixture group', () => {
  it('prints an expected plan without mutating the DB', async () => {
    const db = new FakeDb();
    const group = seedGroup(db);
    const synth = makeStubSynthesizer();

    const plan = await runModeA({
      db: db as unknown as Parameters<typeof runModeA>[0]['db'],
      synthesizer: synth,
      group,
      groupIndex: 0,
      apply: false,
      loadSources: (rows) =>
        Promise.resolve(rows.map((r) => ({
          id: r.id,
          title: r.title,
          author_name: r.author_name,
          publication_id: r.publication_id,
          publication_name: r.publication_name,
          original_url: r.original_url,
          rewritten_html: '<p>stub rewrite</p>',
          excerpt: `excerpt for ${r.id}`,
        }))),
    });

    expect(plan).not.toBeNull();
    const p = plan as ConsolidationPlan;
    expect(p.sources).toHaveLength(3);
    expect(p.synthesizedTitle).toMatch(/Perspectives/);
    expect(p.htmlPath).toMatch(/rewritten\/consolidated-/);

    // No mutations.
    expect(db.commentarySources).toHaveLength(0);
    for (const a of db.articles.values()) {
      expect(a.is_consolidated).toBe(false);
      expect(a.consolidated_into).toBeNull();
    }

    const formatted = formatPlan(p);
    expect(formatted).toContain('Group 1');
    expect(formatted).toContain('→ title:');
  });

  it('apply mode marks ALL sources (including primary) as consolidated_into (#461)', async () => {
    const db = new FakeDb();
    const group = seedGroup(db);
    const synth = makeStubSynthesizer();
    const libraryRoot = await mkdtemp(join(tmpdir(), 'consolidate-test-'));

    const plan = await runModeA({
      db: db as unknown as Parameters<typeof runModeA>[0]['db'],
      synthesizer: synth,
      group,
      groupIndex: 0,
      apply: true,
      libraryRoot,
      loadSources: (rows) =>
        Promise.resolve(rows.map((r, i) => ({
          id: r.id,
          title: r.title,
          author_name: r.author_name,
          publication_id: r.publication_id,
          publication_name: r.publication_name,
          original_url: r.original_url,
          // Make the first source the longest so the stub picks it as primary.
          rewritten_html: '<p>stub</p>'.repeat(i === 0 ? 10 : 1),
          excerpt: `excerpt for ${r.id}`,
        }))),
    });

    expect(plan).not.toBeNull();
    const p = plan as ConsolidationPlan;

    // Every source (primary AND non-primary) should now be marked
    // consolidated_into the new commentary.
    for (const src of p.sources) {
      const a = db.articles.get(src.id);
      expect(a?.consolidated_into).toBe(p.commentaryId);
    }
    // Including the primary specifically.
    expect(db.articles.get(p.primarySourceId)?.consolidated_into).toBe(p.commentaryId);

    // commentary_sources still has exactly one is_primary row.
    const primaryRows = db.commentarySources.filter(
      (c) => c.commentary_article_id === p.commentaryId && c.is_primary,
    );
    expect(primaryRows).toHaveLength(1);
    expect(primaryRows[0].source_article_id).toBe(p.primarySourceId);
  });

  it('skips and logs (does not throw) when synthesis always returns Trump output', async () => {
    const db = new FakeDb();
    const group = seedGroup(db);
    const synth = makeProgrammableSynthesizer(['trump', 'trump', 'trump', 'trump']);
    const libraryRoot = await mkdtemp(join(tmpdir(), 'consolidate-skip-'));

    const plan = await runModeA({
      db: db as unknown as Parameters<typeof runModeA>[0]['db'],
      synthesizer: synth,
      group,
      groupIndex: 0,
      apply: false,
      libraryRoot,
      loadSources: (rows) =>
        Promise.resolve(rows.map((r) => ({
          id: r.id,
          title: r.title,
          author_name: r.author_name,
          publication_id: r.publication_id,
          publication_name: r.publication_name,
          original_url: r.original_url,
          rewritten_html: '<p>stub</p>',
          excerpt: 'x',
        }))),
    });

    expect(plan).toBeNull();
    // No DB mutations.
    expect(db.commentarySources).toHaveLength(0);
    for (const a of db.articles.values()) {
      expect(a.consolidated_into).toBeNull();
    }
    // Skipped log written.
    const logContent = await readFile(join(libraryRoot, 'consolidation-skipped.log'), 'utf-8');
    expect(logContent).toMatch(/no-Trump policy/);
    for (const a of group.articles) {
      expect(logContent).toContain(a.id);
    }
  });

  it('rejects a group where all sources share one publication', async () => {
    const db = new FakeDb();
    const base = new Date('2026-04-01T00:00:00Z');
    const mk = (id: string, title: string): void => {
      db.articles.set(id, {
        id,
        title,
        slug: id,
        author_name: 'Alice',
        publication_id: 'same-pub',
        publication_name: 'Same Pub',
        original_url: `https://x.test/${id}`,
        rewritten_content_path: null,
        content_path: null,
        full_content_path: null,
        affiliate_links: [],
        is_consolidated: false,
        consolidated_into: null,
      });
    };
    mk('bbbbbbbb-0000-0000-0000-000000000001', 'One');
    mk('bbbbbbbb-0000-0000-0000-000000000002', 'Two');

    const group: CandidateGroup = {
      articles: [...db.articles.values()].map((a) => ({
        id: a.id,
        title: a.title,
        publication_id: a.publication_id,
        publication_name: a.publication_name,
        created_at: base,
        word_count: 500,
        tags: ['x'],
      })),
      score: 0.9,
      primarySuggestion: 'bbbbbbbb-0000-0000-0000-000000000001',
      reasoning: 'test',
    };

    const plan = await runModeA({
      db: db as unknown as Parameters<typeof runModeA>[0]['db'],
      synthesizer: makeStubSynthesizer(),
      group,
      groupIndex: 0,
      apply: false,
      loadSources: () => Promise.resolve([]),
    });
    expect(plan).toBeNull();
  });
});

describe('runModeB trigger prevents a 5th source', () => {
  it('refuses to add when the commentary already has 4 sources', async () => {
    const db = new FakeDb();
    const commentaryId = 'cccccccc-0000-0000-0000-00000000000c';
    db.articles.set(commentaryId, {
      id: commentaryId,
      title: 'Existing commentary',
      slug: 'existing',
      author_name: 'Brian Edwards',
      publication_id: 'pub-alpha',
      publication_name: 'Pub-alpha',
      original_url: `hex-index://consolidated/${commentaryId}`,
      rewritten_content_path: null,
      content_path: null,
      full_content_path: null,
      affiliate_links: [],
      is_consolidated: true,
      consolidated_into: null,
    });
    for (let i = 0; i < 4; i++) {
      db.commentarySources.push({
        commentary_article_id: commentaryId,
        source_article_id: `dddddddd-0000-0000-0000-00000000000${i}`,
        is_primary: i === 0,
        position: i,
      });
    }
    const newSourceId = 'eeeeeeee-0000-0000-0000-00000000000e';
    db.articles.set(newSourceId, {
      id: newSourceId,
      title: 'New source',
      slug: 'new',
      author_name: 'D',
      publication_id: 'pub-delta',
      publication_name: 'Pub-delta',
      original_url: 'https://x.test/new',
      rewritten_content_path: null,
      content_path: null,
      full_content_path: null,
      affiliate_links: [],
      is_consolidated: false,
      consolidated_into: null,
    });

    const before = db.commentarySources.length;
    await runModeB({
      db: db as unknown as Parameters<typeof runModeB>[0]['db'],
      synthesizer: makeStubSynthesizer(),
      commentaryId,
      newSourceId,
    });
    // No new row added.
    expect(db.commentarySources.length).toBe(before);
    // New source NOT marked consolidated.
    expect(db.articles.get(newSourceId)?.consolidated_into).toBeNull();
  });
});
