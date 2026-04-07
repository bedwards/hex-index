import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { BANNED_SLUGS } from './banned-publications.js';

interface IngestPublication {
  slug: string;
  name?: string;
}

interface IngestConfig {
  publications: IngestPublication[];
}

describe('banned-publications guard', () => {
  it('BANNED_SLUGS contains the known-bad slugs', () => {
    for (const slug of [
      'a16zcrypto',
      'thedailygwei',
      'aliabdaal',
      'vitadao',
      'radreads',
      'moderndatastack',
      'simplicius',
    ]) {
      expect(BANNED_SLUGS.has(slug)).toBe(true);
    }
  });

  it('content/ingest-subscribed.json contains no banned slugs', () => {
    const path = resolve(process.cwd(), 'content/ingest-subscribed.json');
    const raw = readFileSync(path, 'utf8');
    const config = JSON.parse(raw) as IngestConfig;

    expect(Array.isArray(config.publications)).toBe(true);

    const offenders = config.publications
      .map((p) => p.slug)
      .filter((slug) => BANNED_SLUGS.has(slug));

    expect(
      offenders,
      `Banned publication slugs found in content/ingest-subscribed.json: ${offenders.join(
        ', '
      )}. Remove them — see src/shared/banned-publications.ts`
    ).toEqual([]);
  });
});
