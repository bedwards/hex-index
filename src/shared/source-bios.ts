/**
 * Source bio loader — issue #487.
 *
 * Parses content/source-bios.yml into typed SourceBio objects used by the
 * static site generator (and, eventually, the weekly epub) to render an
 * "About this source" footer under each source excerpt.
 *
 * Rendering is deterministic — no LLM at render time. Bios are authored by
 * Claude in a separate pass and version-controlled.
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

export interface SourceBio {
  /** Publication slug (YAML map key). */
  slug: string;
  /** Human-readable publication name. */
  name: string;
  /** Editorial categorisation (e.g. "independent newsletter"). */
  type: string;
  /** ISO country name. */
  country: string;
  /** Optional US state, only when country is United States. */
  us_state?: string;
  /** Funding model description. */
  funding_model: string;
  /** Affiliations — parent companies, think tanks, parties, etc. */
  affiliations: string[];
  /** Opinionated sentence-form leaning note (not a label). */
  political_leaning: string;
  /** Canonical "about" URL cited for the factual claims in this bio. */
  url: string;
  /** ISO date (YYYY-MM-DD) when this bio was last audited. */
  bio_last_audited_at: string;
}

const REQUIRED_FIELDS: (keyof SourceBio)[] = [
  'name',
  'type',
  'country',
  'funding_model',
  'affiliations',
  'political_leaning',
  'url',
  'bio_last_audited_at',
];

/**
 * Resolve the default path to content/source-bios.yml relative to the repo root.
 */
function defaultBiosPath(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, '..', '..', 'content', 'source-bios.yml');
}

/**
 * Parse a raw YAML document into a list of SourceBio entries and validate
 * schema. Throws on malformed entries so static generation fails loudly.
 */
export function parseSourceBios(yamlText: string): SourceBio[] {
  const doc = parseYaml(yamlText) as Record<string, unknown> | null;
  if (!doc || typeof doc !== 'object') {
    return [];
  }
  const bios: SourceBio[] = [];
  for (const [slug, raw] of Object.entries(doc)) {
    if (!raw || typeof raw !== 'object') {
      throw new Error(`source-bios: entry "${slug}" is not an object`);
    }
    const entry = raw as Record<string, unknown>;
    for (const field of REQUIRED_FIELDS) {
      if (!(field in entry)) {
        throw new Error(`source-bios: entry "${slug}" missing required field "${field}"`);
      }
    }
    if (!Array.isArray(entry.affiliations)) {
      throw new Error(`source-bios: entry "${slug}" field "affiliations" must be an array`);
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(entry.bio_last_audited_at))) {
      throw new Error(
        `source-bios: entry "${slug}" field "bio_last_audited_at" must be YYYY-MM-DD`
      );
    }
    bios.push({
      slug,
      name: String(entry.name),
      type: String(entry.type),
      country: String(entry.country),
      us_state: typeof entry.us_state === 'string' ? entry.us_state : undefined,
      funding_model: String(entry.funding_model),
      affiliations: (entry.affiliations as unknown[]).map(String),
      political_leaning: String(entry.political_leaning),
      url: String(entry.url),
      bio_last_audited_at: String(entry.bio_last_audited_at),
    });
  }
  return bios;
}

let cached: SourceBio[] | null = null;
let cachedPath: string | null = null;

/**
 * Load all source bios from disk. Cached per path.
 */
export function loadSourceBios(path?: string): SourceBio[] {
  const file = path ?? defaultBiosPath();
  if (cached && cachedPath === file) {
    return cached;
  }
  if (!existsSync(file)) {
    cached = [];
    cachedPath = file;
    return cached;
  }
  const text = readFileSync(file, 'utf8');
  cached = parseSourceBios(text);
  cachedPath = file;
  return cached;
}

/**
 * Find a bio for a given publication slug. Returns null when no bio exists —
 * callers should render nothing in that case (see renderSourceFooter).
 */
export function findBio(
  publicationSlug: string,
  bios?: SourceBio[]
): SourceBio | null {
  const list = bios ?? loadSourceBios();
  return list.find((b) => b.slug === publicationSlug) ?? null;
}

/** Test-only: clear the module-level cache. */
export function _resetSourceBioCache(): void {
  cached = null;
  cachedPath = null;
}
