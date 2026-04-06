import { describe, expect, it } from 'vitest';
import {
  type SourceArticle,
  buildSynthesisPrompt,
  containsTrumpMention,
  makeStubSynthesizer,
  mergeAffiliateLinks,
  mergeWikipediaLinks,
  verifyCandidateGroup,
} from './consolidate-helpers.js';

function mkSource(
  id: string,
  pub: string,
  author: string,
  title: string,
  rewrite = '',
): SourceArticle {
  return {
    id,
    title,
    author_name: author,
    publication_id: pub,
    publication_name: `Pub-${pub}`,
    original_url: `https://x.test/${id}`,
    rewritten_html: rewrite,
    excerpt: `excerpt for ${id}`,
  };
}

describe('verifyCandidateGroup', () => {
  it('rejects a single-publication group (no diverse voices)', () => {
    const r = verifyCandidateGroup([
      { id: 'a', publication_id: 'pub1' },
      { id: 'b', publication_id: 'pub1' },
    ]);
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(/1 distinct publication/);
  });

  it('rejects groups with fewer than 2 sources', () => {
    const r = verifyCandidateGroup([{ id: 'a', publication_id: 'pub1' }]);
    expect(r.ok).toBe(false);
  });

  it('rejects groups with more than 4 sources', () => {
    const r = verifyCandidateGroup([
      { id: 'a', publication_id: 'p1' },
      { id: 'b', publication_id: 'p2' },
      { id: 'c', publication_id: 'p3' },
      { id: 'd', publication_id: 'p4' },
      { id: 'e', publication_id: 'p5' },
    ]);
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(/more than 4/);
  });

  it('accepts a 3-source, 3-publication group', () => {
    const r = verifyCandidateGroup([
      { id: 'a', publication_id: 'p1' },
      { id: 'b', publication_id: 'p2' },
      { id: 'c', publication_id: 'p3' },
    ]);
    expect(r.ok).toBe(true);
  });
});

describe('containsTrumpMention', () => {
  it('detects "Trump" and "Donald Trump"', () => {
    expect(containsTrumpMention('The Trump administration said...')).toBe(true);
    expect(containsTrumpMention('Donald Trump announced')).toBe(true);
    expect(containsTrumpMention("Trump's policy")).toBe(true);
  });
  it('does not flag unrelated text', () => {
    expect(containsTrumpMention('the administration announced a policy shift')).toBe(false);
    expect(containsTrumpMention('trumpet solo')).toBe(false);
  });
});

describe('buildSynthesisPrompt', () => {
  const sources = [
    mkSource('a', 'p1', 'Alice', 'Alpha headline'),
    mkSource('b', 'p2', 'Bob', 'Beta headline'),
  ];
  const prompt = buildSynthesisPrompt(sources);

  it('includes the no-Trump editorial instruction', () => {
    expect(prompt).toMatch(/Do NOT mention "Trump"/);
  });
  it('includes every source id and author', () => {
    expect(prompt).toContain('a');
    expect(prompt).toContain('b');
    expect(prompt).toContain('Alice');
    expect(prompt).toContain('Bob');
  });
  it('asks for a JSON response with the required keys', () => {
    expect(prompt).toMatch(/"title"/);
    expect(prompt).toMatch(/"html"/);
    expect(prompt).toMatch(/"primarySourceId"/);
  });
});

describe('stub synthesizer output shape', () => {
  it('produces HTML with >=2 distinct author attributions', async () => {
    const s = makeStubSynthesizer();
    const sources = [
      mkSource('a', 'p1', 'Alice Adams', 'Headline A', '<p>rewrite A</p>'),
      mkSource('b', 'p2', 'Bob Baker', 'Headline B', '<p>rewrite B that is longer</p>'),
    ];
    const r = await s.synthesizeCommentary(sources);
    expect(r.title).toBeTruthy();
    expect(r.html).toContain('Alice Adams');
    expect(r.html).toContain('Bob Baker');
    expect(r.primarySourceId).toBe('b'); // longer rewrite wins
    expect(r.html).toMatch(/Bottom Line/);
  });

  it('does not mention Trump in the stub output', async () => {
    const s = makeStubSynthesizer();
    const r = await s.synthesizeCommentary([
      mkSource('a', 'p1', 'Alice', 'A'),
      mkSource('b', 'p2', 'Bob', 'B'),
    ]);
    expect(containsTrumpMention(r.title)).toBe(false);
    expect(containsTrumpMention(r.html)).toBe(false);
  });
});

describe('mergeWikipediaLinks', () => {
  it('dedupes by wikipedia_id and caps at 3, re-ranking', () => {
    const merged = mergeWikipediaLinks([
      [
        { wikipedia_id: 'w1', relevance_rank: 1, topic_summary: 's1' },
        { wikipedia_id: 'w2', relevance_rank: 2, topic_summary: 's2' },
      ],
      [
        { wikipedia_id: 'w1', relevance_rank: 3, topic_summary: 's1-alt' },
        { wikipedia_id: 'w3', relevance_rank: 1, topic_summary: 's3' },
        { wikipedia_id: 'w4', relevance_rank: 2, topic_summary: 's4' },
      ],
    ]);
    expect(merged).toHaveLength(3);
    expect(merged.map((m) => m.relevance_rank)).toEqual([1, 2, 3]);
    const ids = merged.map((m) => m.wikipedia_id);
    // w1 and w3 both had rank 1; both should be present along with w2 at rank 2
    expect(ids).toContain('w1');
    expect(ids).toContain('w3');
    expect(ids).toContain('w2');
  });
});

describe('mergeAffiliateLinks', () => {
  it('dedupes by asin', () => {
    const merged = mergeAffiliateLinks([
      [{ asin: 'X1', title: 'T1', author: 'A1' }],
      [{ asin: 'X1', title: 'T1-dupe', author: 'A1' }, { asin: 'X2', title: 'T2', author: 'A2' }],
    ]);
    expect(merged).toHaveLength(2);
  });

  it('falls back to title+author when no asin', () => {
    const merged = mergeAffiliateLinks([
      [{ title: 'Dune', author: 'Frank Herbert' }],
      [{ title: 'DUNE', author: 'frank herbert' }],
    ]);
    expect(merged).toHaveLength(1);
  });
});
