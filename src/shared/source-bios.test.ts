import { describe, expect, it, beforeEach } from 'vitest';
import {
  parseSourceBios,
  findBio,
  loadSourceBios,
  _resetSourceBioCache,
  type SourceBio,
} from './source-bios.js';

const VALID_YAML = `
chinatalk:
  name: "ChinaTalk"
  type: "independent newsletter"
  country: "United States"
  funding_model: "paid subscriptions"
  affiliations:
    - "CSIS"
  political_leaning: "Hawkish-curious on US-China tech competition."
  url: "https://www.chinatalk.media/about"
  bio_last_audited_at: "2026-04-08"

pluralistic:
  name: "Pluralistic"
  type: "individual creator"
  country: "United States"
  us_state: "California"
  funding_model: "reader donations"
  affiliations: []
  political_leaning: "Left-populist and anti-monopoly."
  url: "https://pluralistic.net/about/"
  bio_last_audited_at: "2026-04-08"
`;

describe('parseSourceBios', () => {
  it('parses valid YAML into typed bios', () => {
    const bios = parseSourceBios(VALID_YAML);
    expect(bios).toHaveLength(2);
    const chinatalk = bios.find((b) => b.slug === 'chinatalk')!;
    expect(chinatalk.name).toBe('ChinaTalk');
    expect(chinatalk.type).toBe('independent newsletter');
    expect(chinatalk.affiliations).toEqual(['CSIS']);
    expect(chinatalk.us_state).toBeUndefined();
  });

  it('honours optional us_state', () => {
    const bios = parseSourceBios(VALID_YAML);
    expect(bios.find((b) => b.slug === 'pluralistic')!.us_state).toBe('California');
  });

  it('returns empty array for empty input', () => {
    expect(parseSourceBios('')).toEqual([]);
  });

  it('throws on missing required field', () => {
    const bad = `
acme:
  name: "Acme"
  type: "corporate outlet"
  country: "United States"
  funding_model: "ads"
  affiliations: []
  political_leaning: "Centrist."
  url: "https://acme.test"
`;
    expect(() => parseSourceBios(bad)).toThrow(/bio_last_audited_at/);
  });

  it('throws on non-array affiliations', () => {
    const bad = `
acme:
  name: "Acme"
  type: "corporate outlet"
  country: "United States"
  funding_model: "ads"
  affiliations: "nope"
  political_leaning: "Centrist."
  url: "https://acme.test"
  bio_last_audited_at: "2026-04-08"
`;
    expect(() => parseSourceBios(bad)).toThrow(/affiliations/);
  });

  it('throws on malformed date', () => {
    const bad = `
acme:
  name: "Acme"
  type: "corporate outlet"
  country: "United States"
  funding_model: "ads"
  affiliations: []
  political_leaning: "Centrist."
  url: "https://acme.test"
  bio_last_audited_at: "April 8 2026"
`;
    expect(() => parseSourceBios(bad)).toThrow(/YYYY-MM-DD/);
  });
});

describe('findBio', () => {
  const bios: SourceBio[] = parseSourceBios(VALID_YAML);

  it('finds existing slug', () => {
    expect(findBio('chinatalk', bios)?.name).toBe('ChinaTalk');
  });

  it('returns null for unknown slug', () => {
    expect(findBio('does-not-exist', bios)).toBeNull();
  });
});

describe('loadSourceBios', () => {
  beforeEach(() => {
    _resetSourceBioCache();
  });

  it('loads the real content/source-bios.yml and includes the 5 seed bios', () => {
    const bios = loadSourceBios();
    const slugs = bios.map((b) => b.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        'chinatalk',
        'stratechery',
        'pluralistic',
        'sinification',
        'wendover-productions',
      ])
    );
  });
});
