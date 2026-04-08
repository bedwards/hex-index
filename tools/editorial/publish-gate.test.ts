/**
 * Tests for the publish gate. Uses an in-memory fake Pool and a temp
 * library directory so it runs offline. Covers:
 *
 *  - missing body file          (HX-style root-cause)
 *  - broken wiki link           (HX-002/003/004 shape)
 *  - dirty wiki link row        (HX-002 variant)
 *  - consolidated-without-dives (HX-001)
 *  - all-good passes
 *  - slug extraction regex
 */

import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { mkdtemp, writeFile, mkdir, rm } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import {
  runPublishGate,
  extractWikipediaSlugsFromBody,
  type PublishGateResult,
} from './publish-gate.js';

// ── Fake Pool ───────────────────────────────────────────────────────

interface FakeArticle {
  id: string;
  rewritten_content_path: string | null;
  is_consolidated: boolean;
}
interface FakeWiki {
  slug: string;
  status: string | null;
  rewrite_dirty: boolean;
  content_path: string | null;
}

class FakePool {
  articles = new Map<string, FakeArticle>();
  wikis = new Map<string, FakeWiki>();
  deepDiveLinks = new Map<string, number>(); // article_id -> count
  tagCounts = new Map<string, number>(); // article_id -> tag count (default 1)

  query(sql: string, params?: unknown[]): Promise<{ rows: unknown[] }> {
    const s = sql.replace(/\s+/g, ' ').trim();
    if (s.startsWith('SELECT COUNT(*) AS count FROM app.article_tags')) {
      const id = params?.[0] as string;
      const n = this.tagCounts.has(id) ? (this.tagCounts.get(id) ?? 0) : 1;
      return Promise.resolve({ rows: [{ count: String(n) }] });
    }
    if (s.startsWith('SELECT id, rewritten_content_path')) {
      const id = params?.[0] as string;
      const a = this.articles.get(id);
      return Promise.resolve({
        rows: a
          ? [{
              id: a.id,
              rewritten_content_path: a.rewritten_content_path,
              is_consolidated: a.is_consolidated,
            }]
          : [],
      });
    }
    if (s.startsWith('SELECT slug, status, rewrite_dirty, content_path')) {
      const slugs = (params?.[0] as string[]) ?? [];
      const out = slugs
        .map((slug) => this.wikis.get(slug))
        .filter((w): w is FakeWiki => !!w);
      return Promise.resolve({ rows: out });
    }
    if (s.startsWith('SELECT COUNT(*) AS count FROM app.article_wikipedia_links')) {
      const id = params?.[0] as string;
      const n = this.deepDiveLinks.get(id) ?? 0;
      return Promise.resolve({ rows: [{ count: String(n) }] });
    }
    throw new Error(`unexpected SQL in test: ${s}`);
  }
}

// ── Temp library sandbox ────────────────────────────────────────────

let tmpRoot: string;
let prevCwd: string;

beforeEach(async () => {
  tmpRoot = await mkdtemp(join(tmpdir(), 'publish-gate-'));
  await mkdir(join(tmpRoot, 'library', 'rewritten'), { recursive: true });
  await mkdir(join(tmpRoot, 'library', 'wikipedia'), { recursive: true });
  prevCwd = process.cwd();
  process.chdir(tmpRoot);
});

afterEach(async () => {
  process.chdir(prevCwd);
  await rm(tmpRoot, { recursive: true, force: true });
});

// Long enough body to exceed the 200-char minimum easily.
const LONG_BODY = 'x'.repeat(300);

async function writeLibFile(rel: string, contents: string): Promise<void> {
  const full = join(tmpRoot, 'library', rel);
  await mkdir(join(full, '..'), { recursive: true });
  await writeFile(full, contents);
}

describe('extractWikipediaSlugsFromBody', () => {
  it('extracts absolute, relative and index.html forms', () => {
    const html = `
      <a href="/wikipedia/foo-bar/">a</a>
      <a href="../wikipedia/baz/index.html">b</a>
      <a href='../wikipedia/QUX/'>c</a>
      <a href="https://en.wikipedia.org/wiki/Ignored">skip</a>
    `;
    const slugs = extractWikipediaSlugsFromBody(html).sort();
    expect(slugs).toEqual(['baz', 'foo-bar', 'qux']);
  });
});

describe('runPublishGate', () => {
  function asPool(p: FakePool) {
    return p as unknown as import('pg').Pool;
  }

  it('fails when the body file is missing', async () => {
    const pool = new FakePool();
    pool.articles.set('a1', {
      id: 'a1',
      rewritten_content_path: 'rewritten/a1.html',
      is_consolidated: false,
    });

    const r: PublishGateResult = await runPublishGate(asPool(pool), 'a1');
    expect(r.ok).toBe(false);
    expect(r.failures.join('\n')).toMatch(/body file missing/);
  });

  it('fails when an inline wiki link has no matching DB row', async () => {
    const pool = new FakePool();
    pool.articles.set('a1', {
      id: 'a1',
      rewritten_content_path: 'rewritten/a1.html',
      is_consolidated: false,
    });
    await writeLibFile(
      'rewritten/a1.html',
      `<p>${LONG_BODY}</p><a href="../wikipedia/ghost/">x</a>`,
    );

    const r = await runPublishGate(asPool(pool), 'a1');
    expect(r.ok).toBe(false);
    expect(r.failures.some((f) => f.includes('/ghost/'))).toBe(true);
  });

  it('fails when an inline wiki link points to a dirty row', async () => {
    const pool = new FakePool();
    pool.articles.set('a1', {
      id: 'a1',
      rewritten_content_path: 'rewritten/a1.html',
      is_consolidated: false,
    });
    pool.wikis.set('foo', {
      slug: 'foo',
      status: 'complete',
      rewrite_dirty: true,
      content_path: 'wikipedia/foo.html',
    });
    await writeLibFile('wikipedia/foo.html', LONG_BODY);
    await writeLibFile(
      'rewritten/a1.html',
      `<p>${LONG_BODY}</p><a href="/wikipedia/foo/">x</a>`,
    );

    const r = await runPublishGate(asPool(pool), 'a1');
    expect(r.ok).toBe(false);
    expect(r.failures.join('\n')).toMatch(/rewrite_dirty=true/);
  });

  it('fails a consolidated article that has zero deep-dive links (HX-001)', async () => {
    const pool = new FakePool();
    pool.articles.set('c1', {
      id: 'c1',
      rewritten_content_path: 'rewritten/c1.html',
      is_consolidated: true,
    });
    await writeLibFile('rewritten/c1.html', `<p>${LONG_BODY}</p>`);
    // No entry in deepDiveLinks → count = 0

    const r = await runPublishGate(asPool(pool), 'c1');
    expect(r.ok).toBe(false);
    expect(r.failures.some((f) => f.includes('HX-001'))).toBe(true);
  });

  it('fails when the article has zero topic tags (#494)', async () => {
    const pool = new FakePool();
    pool.articles.set('a1', {
      id: 'a1',
      rewritten_content_path: 'rewritten/a1.html',
      is_consolidated: false,
    });
    pool.tagCounts.set('a1', 0);
    await writeLibFile('rewritten/a1.html', `<p>${LONG_BODY}</p>`);

    const r = await runPublishGate(asPool(pool), 'a1');
    expect(r.ok).toBe(false);
    expect(r.failures.some((f) => f.includes('zero topic tags'))).toBe(true);
  });

  it('passes when body + wiki links + deep-dive links are all healthy', async () => {
    const pool = new FakePool();
    pool.articles.set('c1', {
      id: 'c1',
      rewritten_content_path: 'rewritten/c1.html',
      is_consolidated: true,
    });
    pool.wikis.set('foo', {
      slug: 'foo',
      status: 'complete',
      rewrite_dirty: false,
      content_path: 'wikipedia/foo.html',
    });
    pool.deepDiveLinks.set('c1', 3);
    await writeLibFile('wikipedia/foo.html', LONG_BODY);
    await writeLibFile(
      'rewritten/c1.html',
      `<p>${LONG_BODY}</p><a href="../wikipedia/foo/index.html">x</a>`,
    );

    const r = await runPublishGate(asPool(pool), 'c1');
    expect(r.failures).toEqual([]);
    expect(r.ok).toBe(true);
  });
});
