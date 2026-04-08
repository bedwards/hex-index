import { mkdtemp, mkdir, readFile, writeFile, rm } from 'fs/promises';
import { tmpdir } from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  BLACKLIST_PATTERNS,
  CULTIVATED_TAGS,
  EDITORIAL_CRITERIA,
  MIN_ARTICLES_PER_TAG,
  buildDiscoveryPrompt,
  computeSourceMix,
  discoverSources,
  normalizeUrl,
  parseProposals,
  parseProposalsDetailed,
  proposalFilename,
  validateProposals,
  type ClaudeRunner,
  type ExistingSource,
  type Proposal,
  type ProposalFile,
  type QueryableDb,
  type TagCount,
} from './discover-sources.js';

// ── Fixtures ────────────────────────────────────────────────────────

const FAKE_SUBSTACK: ExistingSource[] = [
  { name: 'Aeon', slug: 'aeon', url: 'https://aeon.co', type: 'substack' },
  { name: 'ChinaTalk', slug: 'chinatalk', url: 'https://www.chinatalk.media', type: 'substack' },
];

const FAKE_YOUTUBE: ExistingSource[] = [
  { name: 'Caspian Report', slug: 'caspian', url: 'https://www.youtube.com/@CaspianReport', type: 'youtube' },
];

function mkProposal(overrides: Partial<Proposal> = {}): Proposal {
  return {
    name: 'Example Review',
    url: 'https://example.substack.com',
    rss_or_channel_id: 'https://example.substack.com/feed',
    type: 'substack',
    rationale: 'Fills an urbanism gap with original fieldwork and primary-source citations.',
    criterion_matched: 'topic-mix',
    topic_filled: 'urbanism',
    draft_bio: 'Example Review is a long-form publication covering urbanism from Lagos.',
    ...overrides,
  };
}

// ── computeSourceMix ────────────────────────────────────────────────

describe('computeSourceMix', () => {
  it('flags tags with fewer than MIN_ARTICLES_PER_TAG as under-represented', () => {
    const tagCounts: TagCount[] = [
      { tag: 'geopolitics', count: 40 },
      { tag: 'urbanism', count: 1 },
      { tag: 'ancient-history', count: 0 },
      { tag: 'ai', count: 12 },
    ];
    const mix = computeSourceMix(FAKE_SUBSTACK, FAKE_YOUTUBE, tagCounts);
    expect(mix.substackCount).toBe(2);
    expect(mix.youtubeCount).toBe(1);
    expect(mix.underRepresentedTags).toContain('urbanism');
    expect(mix.underRepresentedTags).toContain('ancient-history');
    // A cultivated tag with zero rows in the DB result should also count.
    expect(mix.underRepresentedTags).toContain('climate');
    expect(mix.underRepresentedTags).not.toContain('geopolitics');
    // Sorted descending by count.
    expect(mix.tagCounts[0].tag).toBe('geopolitics');
  });

  it('returns no under-represented tags when every cultivated tag is well above threshold', () => {
    const tagCounts: TagCount[] = CULTIVATED_TAGS.map((t) => ({
      tag: t,
      count: MIN_ARTICLES_PER_TAG + 10,
    }));
    const mix = computeSourceMix(FAKE_SUBSTACK, FAKE_YOUTUBE, tagCounts);
    expect(mix.underRepresentedTags).toEqual([]);
  });
});

// ── buildDiscoveryPrompt ────────────────────────────────────────────

describe('buildDiscoveryPrompt', () => {
  it('includes criteria, tag mix, and under-represented list', () => {
    const tagCounts: TagCount[] = [
      { tag: 'geopolitics', count: 40 },
      { tag: 'urbanism', count: 1 },
    ];
    const mix = computeSourceMix(FAKE_SUBSTACK, FAKE_YOUTUBE, tagCounts);
    const prompt = buildDiscoveryPrompt(mix, FAKE_SUBSTACK, FAKE_YOUTUBE, 12);
    for (const c of EDITORIAL_CRITERIA) {
      expect(prompt).toContain(c);
    }
    expect(prompt).toContain('urbanism');
    expect(prompt).toContain('Aeon');
    expect(prompt).toContain('Caspian Report');
    expect(prompt).toContain('Propose 12');
    expect(prompt).toContain('JSON array');
  });
});

// ── parseProposals ──────────────────────────────────────────────────

describe('parseProposals', () => {
  it('extracts a JSON array even when Claude wraps it in prose', () => {
    const stdout = 'Here you go:\n[{"name":"X","url":"https://x.example","rss_or_channel_id":"https://x.example/feed","type":"substack","rationale":"r","criterion_matched":"c","topic_filled":"urbanism","draft_bio":"b"}]\nDone.';
    const out = parseProposals(stdout);
    expect(out).toHaveLength(1);
    expect(out[0].name).toBe('X');
  });

  it('drops malformed entries silently', () => {
    const stdout = '[{"name":"good","url":"https://g.example","rss_or_channel_id":"r","type":"youtube","rationale":"r","criterion_matched":"c","topic_filled":"defense","draft_bio":"b"},{"name":"bad"}]';
    const out = parseProposals(stdout);
    expect(out).toHaveLength(1);
    expect(out[0].name).toBe('good');
  });

  it('throws when no JSON array is present', () => {
    expect(() => parseProposals('sorry I cannot help')).toThrow(/no JSON array/);
  });
});

// ── validateProposals ──────────────────────────────────────────────

describe('validateProposals', () => {
  const existing: ExistingSource[] = [...FAKE_SUBSTACK, ...FAKE_YOUTUBE];

  it('rejects duplicates by normalized name', () => {
    const result = validateProposals([mkProposal({ name: 'aeon' })], existing);
    expect(result.accepted).toHaveLength(0);
    expect(result.rejected[0].reason).toMatch(/duplicate/);
  });

  it('rejects duplicates by url (ignoring trailing slash)', () => {
    const result = validateProposals(
      [mkProposal({ name: 'Unique Name', url: 'https://aeon.co/' })],
      existing,
    );
    expect(result.accepted).toHaveLength(0);
    expect(result.rejected[0].reason).toMatch(/duplicate/);
  });

  it('rejects blacklisted names (John Campbell)', () => {
    const result = validateProposals(
      [mkProposal({ name: 'Dr. John Campbell', url: 'https://jc.example' })],
      existing,
    );
    expect(result.accepted).toHaveLength(0);
    expect(result.rejected[0].reason).toMatch(/blacklist/);
  });

  it('does NOT blacklist on mentions inside the rationale field', () => {
    // Descriptive mentions in the rationale ("similar to Payload but broader")
    // must not cause a rejection — the blacklist only scans name/url/bio.
    const result = validateProposals(
      [mkProposal({ name: 'Space News', url: 'https://sn.example', rationale: 'similar to Payload but broader' })],
      existing,
    );
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected).toHaveLength(0);
  });

  it('still rejects blacklisted terms in draft_bio', () => {
    const result = validateProposals(
      [mkProposal({ name: 'Clean Name', url: 'https://clean.example', draft_bio: 'A Payload-style newsletter.' })],
      existing,
    );
    expect(result.accepted).toHaveLength(0);
    expect(result.rejected[0].reason).toMatch(/blacklist/);
  });

  it('rejects intra-batch duplicates', () => {
    const result = validateProposals(
      [
        mkProposal({ name: 'Dup Name', url: 'https://a.example' }),
        mkProposal({ name: 'Dup Name', url: 'https://b.example' }),
      ],
      existing,
    );
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected).toHaveLength(1);
  });

  it('accepts clean novel proposals', () => {
    const result = validateProposals([mkProposal()], existing);
    expect(result.accepted).toHaveLength(1);
    expect(result.rejected).toHaveLength(0);
  });

  it('all blacklist patterns compile and match intended strings', () => {
    expect(BLACKLIST_PATTERNS.length).toBeGreaterThan(0);
    for (const re of BLACKLIST_PATTERNS) {
      expect(re).toBeInstanceOf(RegExp);
    }
  });
});

// ── normalizeUrl ──────────────────────────────────────────────────

describe('normalizeUrl', () => {
  it('collapses protocol/www/trailing-slash/query/fragment variants to the same canonical key', () => {
    const variants = [
      'https://example.com',
      'http://www.example.com/',
      'HTTPS://Example.com',
      'https://example.com/',
      'http://example.com/?utm=foo',
      'https://www.example.com/#frag',
      'https://example.com?a=1&b=2',
    ];
    const normalized = new Set(variants.map(normalizeUrl));
    expect(normalized.size).toBe(1);
    expect([...normalized][0]).toBe('example.com');
  });

  it('preserves meaningful path segments', () => {
    expect(normalizeUrl('https://www.example.com/feed')).toBe('example.com/feed');
    expect(normalizeUrl('https://example.com/feed/?utm=foo')).toBe('example.com/feed');
  });

  it('detects duplicates across variants in validateProposals', () => {
    const existing: ExistingSource[] = [
      { name: 'Example', slug: 'example', url: 'https://example.com', type: 'substack' },
    ];
    const result = validateProposals(
      [mkProposal({ name: 'Totally New Name', url: 'http://www.example.com/?utm=foo' })],
      existing,
    );
    expect(result.accepted).toHaveLength(0);
    expect(result.rejected[0].reason).toMatch(/duplicate/);
  });
});

// ── proposalFilename ───────────────────────────────────────────────

describe('proposalFilename', () => {
  it('includes UTC date and HHMM so same-day runs do not clobber', () => {
    expect(proposalFilename(new Date('2026-04-08T12:34:56Z'))).toBe(
      'source-proposals-2026-04-08-1234.json',
    );
  });

  it('generates distinct filenames for the same day at different times', () => {
    const a = proposalFilename(new Date('2026-04-08T09:00:00Z'));
    const b = proposalFilename(new Date('2026-04-08T17:30:00Z'));
    expect(a).not.toBe(b);
  });
});

// ── parseProposalsDetailed (malformed capture) ────────────────────

describe('parseProposalsDetailed', () => {
  it('captures malformed entries with a reason', () => {
    const stdout = JSON.stringify([
      mkProposal({ name: 'ok' }),
      { name: 'missing-fields' },
      'not-an-object',
      { ...mkProposal({ name: 'bad-type' }), type: 'podcast' },
    ]);
    const result = parseProposalsDetailed(stdout);
    expect(result.proposals).toHaveLength(1);
    expect(result.proposals[0].name).toBe('ok');
    expect(result.malformed).toHaveLength(3);
    expect(result.malformed[0].reason).toMatch(/missing/);
    expect(result.malformed[1].reason).toMatch(/not an object/);
    expect(result.malformed[2].reason).toMatch(/invalid type/);
  });

  it('throws a descriptive error on invalid JSON', () => {
    expect(() => parseProposalsDetailed('[not json')).toThrow(/no JSON array|not valid JSON/);
  });
});

// ── discoverSources (end-to-end with fakes) ────────────────────────

describe('discoverSources', () => {
  let tmp: string;

  beforeEach(async () => {
    tmp = await mkdtemp(path.join(tmpdir(), 'discover-sources-'));
    await mkdir(path.join(tmp, 'content'), { recursive: true });
    await writeFile(
      path.join(tmp, 'content/ingest-subscribed.json'),
      JSON.stringify({
        publications: [
          { name: 'Aeon', slug: 'aeon', url: 'https://aeon.co', feedUrl: 'https://aeon.co/feed.rss' },
          { name: 'ChinaTalk', slug: 'chinatalk', url: 'https://www.chinatalk.media' },
        ],
      }),
    );
    await writeFile(
      path.join(tmp, 'content/youtube-sources.json'),
      JSON.stringify({
        channels: [
          { name: 'Caspian Report', slug: 'caspian', url: 'https://www.youtube.com/@CaspianReport' },
        ],
      }),
    );
  });

  afterEach(async () => {
    await rm(tmp, { recursive: true, force: true });
  });

  const fakeDb: QueryableDb = {
    getTagCounts() {
      return Promise.resolve([
        { tag: 'geopolitics', count: 30 },
        { tag: 'urbanism', count: 0 },
      ]);
    },
  };

  it('writes a proposal file containing accepted proposals and the source mix', async () => {
    const canned: Proposal[] = [
      mkProposal({ name: 'Lagos Urbanist', url: 'https://lagos.example' }),
      mkProposal({ name: 'Aeon' }), // duplicate, should be rejected
      mkProposal({ name: 'Dr John Campbell', url: 'https://jc.example' }), // blacklisted
    ];
    const claude: ClaudeRunner = {
      run() {
        return Promise.resolve(JSON.stringify(canned));
      },
    };

    const now = new Date('2026-04-08T10:00:00Z');
    const result = await discoverSources({
      repoRoot: tmp,
      db: fakeDb,
      claude,
      count: 3,
      now,
    });

    expect(result.filePath).toBe(
      path.join(tmp, 'docs-internal', 'source-proposals-2026-04-08-1000.json'),
    );
    expect(result.proposalFile.proposals).toHaveLength(1);
    expect(result.proposalFile.proposals[0].name).toBe('Lagos Urbanist');
    expect(result.rejected).toHaveLength(2);
    expect(result.proposalFile.source_mix.underRepresentedTags).toContain('urbanism');
    expect(result.proposalFile.criteria).toEqual(EDITORIAL_CRITERIA);

    const onDisk = JSON.parse(await readFile(result.filePath as string, 'utf8')) as ProposalFile;
    expect(onDisk.proposals[0].name).toBe('Lagos Urbanist');
    expect(onDisk.source_mix.substackCount).toBe(2);
    expect(onDisk.source_mix.youtubeCount).toBe(1);
  });

  it('dry-run does not write a file', async () => {
    const claude: ClaudeRunner = {
      run() {
        return Promise.resolve(
          JSON.stringify([mkProposal({ name: 'Fresh', url: 'https://fresh.example' })]),
        );
      },
    };
    const result = await discoverSources({
      repoRoot: tmp,
      db: fakeDb,
      claude,
      dryRun: true,
    });
    expect(result.filePath).toBeNull();
    expect(result.proposalFile.proposals).toHaveLength(1);
  });

  it('forwards the full prompt to the Claude runner', async () => {
    let capturedPrompt = '';
    const claude: ClaudeRunner = {
      run(p) {
        capturedPrompt = p;
        return Promise.resolve('[]');
      },
    };
    await discoverSources({
      repoRoot: tmp,
      db: fakeDb,
      claude,
      count: 7,
      dryRun: true,
    });
    expect(capturedPrompt).toContain('Propose 7');
    expect(capturedPrompt).toContain('Aeon');
    expect(capturedPrompt).toContain('Caspian Report');
    expect(capturedPrompt).toContain('urbanism');
  });

  it('wraps a failing claude runner in a descriptive error (no real shell-out)', async () => {
    const claude: ClaudeRunner = {
      run() {
        return Promise.reject(new Error('spawn ENOENT'));
      },
    };
    await expect(
      discoverSources({ repoRoot: tmp, db: fakeDb, claude, dryRun: true }),
    ).rejects.toThrow(/claude -p invocation failed/);
  });

  it('surfaces malformed Claude output as rejected entries', async () => {
    const claude: ClaudeRunner = {
      run() {
        return Promise.resolve(
          JSON.stringify([
            mkProposal({ name: 'Good One', url: 'https://good.example' }),
            { name: 'partial' },
          ]),
        );
      },
    };
    const result = await discoverSources({
      repoRoot: tmp,
      db: fakeDb,
      claude,
      dryRun: true,
    });
    expect(result.proposalFile.proposals).toHaveLength(1);
    expect(result.rejected.some((r) => /malformed/.test(r.reason))).toBe(true);
  });
});
