/**
 * Canonical list of banned publication slugs.
 *
 * Publications listed here must NEVER appear in `content/ingest-subscribed.json`
 * and must NEVER be present in the `app.publications` table.
 *
 * To add a new banned slug, append it to the set below. The accompanying test
 * (`banned-publications.test.ts`) and the pre-commit hook will enforce that no
 * banned slug sneaks back into the ingest config.
 *
 * Database deletion of banned publications is handled separately by the loop
 * owner — this file is purely the source-of-truth list + ingest-config guard.
 */
export const BANNED_SLUGS: ReadonlySet<string> = new Set([
  'a16zcrypto',
  'thedailygwei',
  'aliabdaal',
  'vitadao',
  'radreads',
  'moderndatastack',
  'simplicius',
  'sinocism',
  'web3-with-a16z',
]);
