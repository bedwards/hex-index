/**
 * Unit tests for generate-source-bios (issue #511).
 *
 * Covers prompt construction, YAML extraction from Claude stdout, schema
 * validation, YAML rendering, and the end-to-end orchestration with a
 * fake DB and a fake Claude runner. No live DB, no live Claude.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  buildBioPrompt,
  extractYamlFragment,
  parseAndValidateFragment,
  renderBioYaml,
  appendBiosToFile,
  generateBios,
  type Publication,
  type PublicationQueries,
  type ClaudeRunner,
  type GeneratedBio,
} from './generate-source-bios.js';

const TODAY = '2026-04-11';

function makeFakeDb(pubs: Publication[]): PublicationQueries {
  return {
    getMissingPublications(existingSlugs, limit) {
      return Promise.resolve(
        pubs.filter((p) => !existingSlugs.has(p.slug)).slice(0, limit)
      );
    },
  };
}

function makeFakeClaude(responses: Record<string, string>): ClaudeRunner {
  return {
    run(prompt: string): Promise<string> {
      for (const [slug, out] of Object.entries(responses)) {
        if (prompt.includes(`slug: ${slug}\n`) || prompt.includes(`"${slug}"`)) {
          return Promise.resolve(out);
        }
      }
      return Promise.reject(
        new Error(`fake claude: no response for prompt starting ${prompt.slice(0, 80)}`)
      );
    },
  };
}

function goodBioYaml(slug: string, today: string): string {
  return [
    `${slug}:`,
    `  name: "${slug} Example"`,
    `  type: "independent newsletter"`,
    `  country: "United States"`,
    `  funding_model: "paid Substack subscriptions"`,
    `  affiliations: []`,
    `  political_leaning: "Center-left, skeptical of consensus framings, sympathetic to labor and institutional accountability."`,
    `  url: "https://example.com/about"`,
    `  bio_last_audited_at: "${today}"`,
    ``,
  ].join('\n');
}

describe('buildBioPrompt', () => {
  it('includes slug, name, and home URL', () => {
    const prompt = buildBioPrompt(
      { slug: 'foobar', name: 'FooBar Weekly', base_url: 'https://foobar.example' },
      TODAY
    );
    expect(prompt).toContain('slug: foobar');
    expect(prompt).toContain('FooBar Weekly');
    expect(prompt).toContain('https://foobar.example');
    expect(prompt).toContain(TODAY);
    expect(prompt.toLowerCase()).toContain('defamation');
  });

  it('falls back to slug when name is null', () => {
    const prompt = buildBioPrompt({ slug: 'bare', name: null, base_url: null }, TODAY);
    expect(prompt).toContain('name: bare');
    expect(prompt).toContain('slug: bare');
  });
});

describe('extractYamlFragment', () => {
  it('strips surrounding code fences', () => {
    const stdout = '```yaml\n' + goodBioYaml('foo', TODAY) + '```\n';
    const frag = extractYamlFragment(stdout, 'foo');
    expect(frag.startsWith('foo:')).toBe(true);
    expect(frag).toContain('name: "foo Example"');
  });

  it('ignores prose preamble', () => {
    const stdout = 'Sure, here is the bio:\n\n' + goodBioYaml('foo', TODAY);
    const frag = extractYamlFragment(stdout, 'foo');
    expect(frag.startsWith('foo:')).toBe(true);
  });

  it('stops at the next unindented entry', () => {
    const stdout =
      goodBioYaml('foo', TODAY) + '\nbar:\n  name: "should not appear"\n';
    const frag = extractYamlFragment(stdout, 'foo');
    expect(frag).not.toContain('bar:');
    expect(frag).not.toContain('should not appear');
  });

  it('throws when slug is absent', () => {
    expect(() => extractYamlFragment('nothing here', 'foo')).toThrow(/could not find/);
  });
});

describe('parseAndValidateFragment', () => {
  it('returns a typed bio for well-formed YAML', () => {
    const bio = parseAndValidateFragment(goodBioYaml('foo', TODAY), 'foo', TODAY);
    expect(bio.slug).toBe('foo');
    expect(bio.country).toBe('United States');
    expect(bio.affiliations).toEqual([]);
  });

  it('rejects a mismatched slug', () => {
    expect(() =>
      parseAndValidateFragment(goodBioYaml('foo', TODAY), 'bar', TODAY)
    ).toThrow(/does not match expected slug/);
  });

  it('rejects wrong audit date', () => {
    expect(() =>
      parseAndValidateFragment(goodBioYaml('foo', '2020-01-01'), 'foo', TODAY)
    ).toThrow(/bio_last_audited_at must be/);
  });

  it('rejects too-short political_leaning', () => {
    const bad = goodBioYaml('foo', TODAY).replace(
      /political_leaning:.*$/m,
      'political_leaning: "left"'
    );
    expect(() => parseAndValidateFragment(bad, 'foo', TODAY)).toThrow(
      /political_leaning too short/
    );
  });

  it('rejects multi-entry fragments', () => {
    const bad = goodBioYaml('foo', TODAY) + goodBioYaml('bar', TODAY);
    expect(() => parseAndValidateFragment(bad, 'foo', TODAY)).toThrow(/expected exactly 1/);
  });
});

describe('renderBioYaml', () => {
  const bio: GeneratedBio = {
    slug: 'foo',
    name: 'Foo Weekly',
    type: 'independent newsletter',
    country: 'United States',
    funding_model: 'paid Substack subscriptions',
    affiliations: ['Parent Co.'],
    political_leaning: 'Center-left, pro-labor, skeptical of tech consolidation.',
    url: 'https://foo.example/about',
    bio_last_audited_at: TODAY,
  };

  it('matches the existing file style', () => {
    const rendered = renderBioYaml(bio);
    expect(rendered).toMatch(/^foo:\n/);
    expect(rendered).toContain('  name: "Foo Weekly"');
    expect(rendered).toContain('  affiliations:\n    - "Parent Co."');
    expect(rendered).toContain(`  bio_last_audited_at: "${TODAY}"`);
  });

  it('uses inline [] for empty affiliations', () => {
    const rendered = renderBioYaml({ ...bio, affiliations: [] });
    expect(rendered).toContain('affiliations: []');
  });

  it('emits us_state when present', () => {
    const rendered = renderBioYaml({ ...bio, us_state: 'California' });
    expect(rendered).toContain('us_state: "California"');
  });

  it('escapes double quotes', () => {
    const rendered = renderBioYaml({ ...bio, name: 'Foo "Quoted" Weekly' });
    expect(rendered).toContain('name: "Foo \\"Quoted\\" Weekly"');
  });
});

describe('appendBiosToFile', () => {
  let dir: string;
  let path: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'gen-source-bios-'));
    path = join(dir, 'bios.yml');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('appends new bios alphabetically and preserves existing content', () => {
    const existing =
      '# header comment\n\n' +
      'zebra:\n' +
      '  name: "Zebra"\n' +
      '  type: "independent newsletter"\n' +
      '  country: "United States"\n' +
      '  funding_model: "paid Substack subscriptions"\n' +
      '  affiliations: []\n' +
      '  political_leaning: "Center-left, pro-labor, pro-institutional accountability."\n' +
      '  url: "https://zebra.example"\n' +
      `  bio_last_audited_at: "${TODAY}"\n`;
    writeFileSync(path, existing, 'utf8');

    const bios: GeneratedBio[] = [
      {
        slug: 'charlie',
        name: 'Charlie',
        type: 'individual creator',
        country: 'United States',
        funding_model: 'Patreon, YouTube ads',
        affiliations: [],
        political_leaning: 'Pro-science, skeptical of corporate research capture.',
        url: 'https://charlie.example',
        bio_last_audited_at: TODAY,
      },
      {
        slug: 'alpha',
        name: 'Alpha',
        type: 'independent newsletter',
        country: 'United Kingdom',
        funding_model: 'paid Substack subscriptions',
        affiliations: [],
        political_leaning: 'Urbanist centre-left, skeptical of car-centric policy.',
        url: 'https://alpha.example',
        bio_last_audited_at: TODAY,
      },
    ];

    appendBiosToFile(path, bios);

    const out = readFileSync(path, 'utf8');
    expect(out).toContain('zebra:');
    // alpha should appear before charlie in the appended batch
    expect(out.indexOf('alpha:')).toBeLessThan(out.indexOf('charlie:'));
    // zebra must still be there, unmodified
    expect(out.indexOf('zebra:')).toBeLessThan(out.indexOf('alpha:'));
  });

  it('refuses to overwrite existing slugs', () => {
    const existing =
      'foo:\n' +
      '  name: "Foo"\n' +
      '  type: "independent newsletter"\n' +
      '  country: "United States"\n' +
      '  funding_model: "paid Substack subscriptions"\n' +
      '  affiliations: []\n' +
      '  political_leaning: "Center-left, pro-labor, pro-institutional accountability."\n' +
      '  url: "https://foo.example"\n' +
      `  bio_last_audited_at: "${TODAY}"\n`;
    writeFileSync(path, existing, 'utf8');

    const bios: GeneratedBio[] = [
      {
        slug: 'foo',
        name: 'Foo Dupe',
        type: 'independent newsletter',
        country: 'United States',
        funding_model: 'paid Substack subscriptions',
        affiliations: [],
        political_leaning: 'Center-left, pro-labor, pro-institutional accountability.',
        url: 'https://foo.example',
        bio_last_audited_at: TODAY,
      },
    ];

    expect(() => appendBiosToFile(path, bios)).toThrow(/already present/);
    // File unchanged.
    expect(readFileSync(path, 'utf8')).toBe(existing);
  });
});

describe('generateBios orchestration', () => {
  let dir: string;
  let path: string;

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'gen-bios-orch-'));
    path = join(dir, 'bios.yml');
    writeFileSync(path, '', 'utf8');
  });

  afterEach(() => {
    rmSync(dir, { recursive: true, force: true });
  });

  it('dry-run writes nothing and returns empty generated array', async () => {
    const db = makeFakeDb([
      { slug: 'foo', name: 'Foo', base_url: 'https://foo.example' },
    ]);
    const claude: ClaudeRunner = {
      run() {
        return Promise.reject(new Error('should not be called in dry-run'));
      },
    };
    const result = await generateBios({
      db,
      claude,
      biosPath: path,
      limit: 25,
      dryRun: true,
      today: TODAY,
      log: () => undefined,
    });
    expect(result.generated).toHaveLength(0);
    expect(readFileSync(path, 'utf8')).toBe('');
  });

  it('happy path: generates, validates, and appends', async () => {
    const db = makeFakeDb([
      { slug: 'foo', name: 'Foo', base_url: 'https://foo.example' },
      { slug: 'bar', name: 'Bar', base_url: 'https://bar.example' },
    ]);
    const claude = makeFakeClaude({
      foo: goodBioYaml('foo', TODAY),
      bar: goodBioYaml('bar', TODAY),
    });
    const result = await generateBios({
      db,
      claude,
      biosPath: path,
      limit: 25,
      dryRun: false,
      today: TODAY,
      log: () => undefined,
    });
    expect(result.generated.map((b) => b.slug).sort()).toEqual(['bar', 'foo']);
    expect(result.failed).toHaveLength(0);
    const out = readFileSync(path, 'utf8');
    expect(out).toContain('foo:');
    expect(out).toContain('bar:');
    expect(out.indexOf('bar:')).toBeLessThan(out.indexOf('foo:'));
  });

  it('records failures for malformed claude output without aborting', async () => {
    const db = makeFakeDb([
      { slug: 'foo', name: 'Foo', base_url: 'https://foo.example' },
      { slug: 'bar', name: 'Bar', base_url: 'https://bar.example' },
    ]);
    const claude = makeFakeClaude({
      foo: 'nonsense, no yaml',
      bar: goodBioYaml('bar', TODAY),
    });
    const result = await generateBios({
      db,
      claude,
      biosPath: path,
      limit: 25,
      dryRun: false,
      today: TODAY,
      log: () => undefined,
    });
    expect(result.generated.map((b) => b.slug)).toEqual(['bar']);
    expect(result.failed.map((f) => f.slug)).toEqual(['foo']);
  });
});
