/**
 * check-source-bios — issue #487
 *
 * Verifies that every publication in app.publications has a corresponding
 * bio entry in content/source-bios.yml. Used by the pre-commit hook and CI
 * to prevent new sources from being added without an "About this source"
 * footer.
 *
 * CURRENT POLICY (soft rollout, 2026-04): missing bios print WARNINGS but do
 * NOT fail the check. This lets the 5-source seed land while the bulk-bio
 * generator (follow-up issue) back-fills the remaining ~250 sources.
 *
 * Once bulk-gen has shipped and all publications have bios, flip
 * SOFT_MODE -> false in this file (or via env: BIOS_HARD=1) and it becomes
 * a hard-blocking check.
 */
import { Pool } from 'pg';
import { loadSourceBios } from '../../src/shared/source-bios.js';

const SOFT_MODE = process.env.BIOS_HARD !== '1';

async function main(): Promise<void> {
  const bios = loadSourceBios();
  const bioSlugs = new Set(bios.map((b) => b.slug));

  let publicationSlugs: string[];
  const pool = new Pool({
    connectionString:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@localhost:5432/hex-index',
  });
  try {
    const result = await pool.query<{ slug: string }>(
      // Only lint publications that actually have at least one ingested
      // article — drops orphaned publication rows from the check.
      `SELECT DISTINCT p.slug
         FROM app.publications p
         JOIN app.articles a ON a.publication_id = p.id`
    );
    publicationSlugs = result.rows.map((r) => r.slug);
  } catch (err: unknown) {
    // DB not reachable: we can't lint, but don't block the commit.
    const msg = err instanceof Error ? err.message : String(err);
    console.warn(`check-source-bios: database not reachable (${msg}), skipping`);
    await pool.end().catch(() => undefined);
    return;
  }
  await pool.end();

  const missing = publicationSlugs.filter((s) => !bioSlugs.has(s));
  if (missing.length === 0) {
    console.info(
      `check-source-bios: OK — ${publicationSlugs.length} publications, all have bios`
    );
    return;
  }

  const verb = SOFT_MODE ? 'WARNING' : 'ERROR';
  console.error(
    `check-source-bios: ${verb} — ${missing.length}/${publicationSlugs.length} publications missing a bio in content/source-bios.yml:`
  );
  for (const slug of missing.slice(0, 20)) {
    console.error(`  - ${slug}`);
  }
  if (missing.length > 20) {
    console.error(`  ... and ${missing.length - 20} more`);
  }

  if (!SOFT_MODE) {
    console.error(
      'Add entries to content/source-bios.yml or remove the offending publications.'
    );
    process.exit(1);
  } else {
    console.error(
      '(Soft mode — not failing. Set BIOS_HARD=1 to enforce. See issue #487.)'
    );
  }
}

main().catch((err: unknown) => {
  console.error('check-source-bios: unexpected error:', err);
  process.exit(1);
});
