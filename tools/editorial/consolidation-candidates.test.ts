import { describe, expect, it } from 'vitest';
import {
  type Article,
  type CandidateGroup,
  type QueryableDb,
  MAX_GROUP_SIZE,
  buildTitleTfIdf,
  findConsolidationCandidates,
  groupArticles,
  jaccard,
  tokenizeTitle,
} from './consolidation-candidates.js';

const day = 24 * 60 * 60 * 1000;
const T0 = new Date('2026-04-01T12:00:00Z').getTime();

function mk(
  id: string,
  title: string,
  pub: string,
  tags: string[],
  offsetDays = 0,
  word_count: number | null = 800,
): Article {
  return {
    id,
    title,
    publication_id: pub,
    publication_name: `Pub-${pub}`,
    created_at: new Date(T0 + offsetDays * day),
    word_count,
    tags,
  };
}

describe('jaccard', () => {
  it('returns 1 for identical sets', () => {
    expect(jaccard(new Set(['a', 'b']), new Set(['a', 'b']))).toBe(1);
  });
  it('returns 0 for disjoint sets', () => {
    expect(jaccard(new Set(['a']), new Set(['b']))).toBe(0);
  });
  it('handles partial overlap', () => {
    expect(jaccard(new Set(['a', 'b']), new Set(['b', 'c']))).toBeCloseTo(1 / 3);
  });
});

describe('tokenizeTitle', () => {
  it('lowercases and strips stopwords and punctuation', () => {
    const toks = tokenizeTitle('The Battle of Thermopylae, Revisited!');
    expect(toks).toEqual(['battle', 'thermopylae', 'revisited']);
  });
});

describe('buildTitleTfIdf', () => {
  it('gives high similarity to near-identical titles', () => {
    const sim = buildTitleTfIdf([
      'China tightens export controls on rare earths',
      'China tightens export controls on rare earth metals',
      'Silicon Valley banks face new regulations',
    ]);
    expect(sim(0, 1)).toBeGreaterThan(0.5);
    expect(sim(0, 2)).toBeLessThan(0.3);
  });
});

describe('groupArticles', () => {
  it('groups 3 clear pairs and ignores 3 singletons', () => {
    // 3 pairs: china, climate, ai — each from 2 different publications.
    // 3 singletons on unrelated topics.
    const articles: Article[] = [
      mk('a1', 'China tightens rare earth export controls', 'sinification',
        ['china', 'geopolitics', 'trade'], 0),
      mk('a2', 'China tightens rare earth export rules', 'chinatalk',
        ['china', 'geopolitics', 'trade'], 1),

      mk('b1', 'Arctic sea ice hits new record low', 'climatewire',
        ['climate', 'arctic', 'science'], 0),
      mk('b2', 'Arctic sea ice hits a new record low', 'carbonbrief',
        ['climate', 'arctic', 'science'], 2),

      mk('c1', 'OpenAI releases new reasoning model GPT', 'stratechery',
        ['ai', 'openai', 'tech'], 0),
      mk('c2', 'OpenAI releases new reasoning model GPT', 'platformer',
        ['ai', 'openai', 'tech'], 3),

      mk('s1', 'Obscure jazz pianist dies at 92', 'npr',
        ['music', 'obituary'], 0),
      mk('s2', 'Rare Roman coin found in English field', 'bbc',
        ['archaeology', 'history'], 1),
      mk('s3', 'New bakery opens in Brooklyn', 'eater',
        ['food', 'nyc'], 2),
    ];

    const groups = groupArticles(articles);
    expect(groups.length).toBe(3);
    // Each group should have exactly 2 articles.
    for (const g of groups) {
      expect(g.articles.length).toBe(2);
    }
    // Each group's two articles should share the same topic.
    const byTag = groups.map(g => g.articles.map(a => a.id).sort().join(','));
    expect(byTag).toContain('a1,a2');
    expect(byTag).toContain('b1,b2');
    expect(byTag).toContain('c1,c2');
  });

  it('caps group size at 4 when 5 articles all match', () => {
    const tags = ['china', 'geopolitics', 'trade'];
    // Near-identical titles so every pair clears the title threshold.
    const title = 'China tightens rare earth export controls';
    const articles: Article[] = [
      mk('x1', title, 'pub1', tags, 0),
      mk('x2', title, 'pub2', tags, 1),
      mk('x3', title, 'pub3', tags, 2),
      mk('x4', title, 'pub4', tags, 3),
      mk('x5', title, 'pub5', tags, 4),
    ];

    const groups = groupArticles(articles);
    // First group should be capped at 4. The 5th article is leftover.
    expect(groups.length).toBeGreaterThanOrEqual(1);
    const primary = groups[0];
    expect(primary.articles.length).toBe(MAX_GROUP_SIZE);

    const allGrouped = new Set<string>();
    for (const g of groups) {
      for (const a of g.articles) { allGrouped.add(a.id); }
    }
    // At least one of the 5 is reported separately or left out of the cap.
    expect(allGrouped.size).toBeLessThanOrEqual(5);
    expect(primary.articles.length).toBe(4);
  });

  it('rejects same-publication pairs', () => {
    const articles: Article[] = [
      mk('s1', 'China tightens rare earth export controls', 'same-pub',
        ['china', 'geopolitics', 'trade'], 0),
      mk('s2', 'China tightens rare earth export rules new', 'same-pub',
        ['china', 'geopolitics', 'trade'], 1),
    ];
    expect(groupArticles(articles)).toEqual([]);
  });

  it('rejects pairs beyond 14-day window', () => {
    const articles: Article[] = [
      mk('t1', 'China tightens rare earth export controls', 'pub1',
        ['china', 'geopolitics', 'trade'], 0),
      mk('t2', 'China tightens rare earth export rules', 'pub2',
        ['china', 'geopolitics', 'trade'], 20),
    ];
    expect(groupArticles(articles)).toEqual([]);
  });

  it('primary suggestion prefers the most recent article', () => {
    const articles: Article[] = [
      // w1 has far more words but is older; w2 is newer and should win.
      mk('w1', 'China tightens rare earth export controls', 'pub1',
        ['china', 'geopolitics', 'trade'], 0, 9000),
      mk('w2', 'China tightens rare earth export rules', 'pub2',
        ['china', 'geopolitics', 'trade'], 3, 500),
    ];
    const groups = groupArticles(articles);
    expect(groups).toHaveLength(1);
    expect(groups[0].primarySuggestion).toBe('w2');
  });

  it('reasoning lists shared tags and sources', () => {
    const articles: Article[] = [
      mk('r1', 'China tightens rare earth export controls', 'sinification',
        ['china', 'geopolitics', 'trade'], 0),
      mk('r2', 'China tightens rare earth export rules', 'chinatalk',
        ['china', 'geopolitics', 'trade'], 1),
    ];
    const [g] = groupArticles(articles);
    expect(g.reasoning).toContain('china');
    expect(g.reasoning).toContain('Pub-sinification');
    expect(g.reasoning).toContain('Pub-chinatalk');
    expect(g.reasoning).toContain('title sim');
  });
});

describe('findConsolidationCandidates (fake db)', () => {
  it('collapses tag rows and groups correctly', async () => {
    const iso = (off: number): string =>
      new Date(T0 + off * day).toISOString();

    const rows = [
      { id: 'a1', title: 'China tightens rare earth export controls',
        publication_id: 'p1', publication_name: 'Sinification',
        created_at: iso(0), word_count: 1200, tag_slug: 'china' },
      { id: 'a1', title: 'China tightens rare earth export controls',
        publication_id: 'p1', publication_name: 'Sinification',
        created_at: iso(0), word_count: 1200, tag_slug: 'geopolitics' },
      { id: 'a1', title: 'China tightens rare earth export controls',
        publication_id: 'p1', publication_name: 'Sinification',
        created_at: iso(0), word_count: 1200, tag_slug: 'trade' },
      { id: 'a2', title: 'China tightens rare earth export rules',
        publication_id: 'p2', publication_name: 'ChinaTalk',
        created_at: iso(1), word_count: 900, tag_slug: 'china' },
      { id: 'a2', title: 'China tightens rare earth export rules',
        publication_id: 'p2', publication_name: 'ChinaTalk',
        created_at: iso(1), word_count: 900, tag_slug: 'geopolitics' },
      { id: 'a2', title: 'China tightens rare earth export rules',
        publication_id: 'p2', publication_name: 'ChinaTalk',
        created_at: iso(1), word_count: 900, tag_slug: 'trade' },
    ];

    const fakeDb: QueryableDb = {
      query: <T extends Record<string, unknown>>() =>
        Promise.resolve({ rows: rows as unknown as T[] }),
    };

    const groups: CandidateGroup[] = await findConsolidationCandidates(fakeDb, { days: 14 });
    expect(groups).toHaveLength(1);
    expect(groups[0].articles.map(a => a.id).sort()).toEqual(['a1', 'a2']);
    // Most recent article wins as primary suggestion.
    expect(groups[0].primarySuggestion).toBe('a2');
  });

  it('falls back when consolidated_into column does not exist', async () => {
    let calls = 0;
    const fakeDb: QueryableDb = {
      query: <T extends Record<string, unknown>>(sql: string) => {
        calls++;
        if (sql.includes('consolidated_into')) {
          return Promise.reject(new Error('column "consolidated_into" does not exist'));
        }
        return Promise.resolve({ rows: [] as unknown as T[] });
      },
    };
    const groups = await findConsolidationCandidates(fakeDb);
    expect(groups).toEqual([]);
    expect(calls).toBe(2);
  });
});
