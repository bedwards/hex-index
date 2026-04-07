/**
 * Pre-commit guard: catch worker commits that regenerate docs/ for an article
 * or wikipedia page but forget to also stage the underlying library/ HTML file.
 *
 * Failure mode this prevents (issue #474):
 *   1. A worktree agent writes library/rewritten/<pub>/<slug>.html (untracked)
 *   2. Runs static:generate, which inlines the file into docs/article/<id>/index.html
 *   3. Commits ONLY the docs/ regen
 *   4. The untracked library file is wiped on the next `static:clean` /
 *      worktree teardown, and the article 404s on hex-index.com.
 *
 * Heuristic
 * ─────────
 * If the staged commit:
 *   • touches at least one  docs/article/*  or  docs/wikipedia/*  path,
 *   • touches ZERO          library/*       paths,
 *   • touches ZERO          src/* or tools/* paths
 *     (i.e. it looks like a pure docs static-regen from a worker),
 * then walk the working tree for any library/rewritten/**.html or
 * library/wikipedia/**.html files that exist on disk but are NOT tracked
 * by git (untracked or unstaged-new). Any such file is almost certainly the
 * source content for one of the staged docs pages and MUST be committed too.
 *
 * The check is intentionally cheap and DB-free so it can run from a git hook.
 *
 * Exit codes:
 *   0 — clean (or check not applicable)
 *   1 — drift detected; commit blocked
 */

import { execSync } from 'child_process';

export interface DriftCheckInput {
  /** Output of `git diff --cached --name-only` (one path per line). */
  stagedFiles: string[];
  /**
   * Output of `git ls-files --others --exclude-standard` PLUS
   *           `git diff --name-only` (unstaged modifications),
   * filtered to library/ paths. One path per line.
   */
  untrackedOrUnstagedLibraryFiles: string[];
}

export interface DriftCheckResult {
  applicable: boolean;
  ok: boolean;
  offendingFiles: string[];
  reason?: string;
}

const DOCS_CONTENT_RE = /^docs\/(article|wikipedia)\//;
const LIBRARY_RE = /^library\//;
const CODE_RE = /^(src|tools)\//;
const LIBRARY_CONTENT_RE = /^library\/(rewritten|wikipedia)\/.+\.html$/;

export function checkLibraryDrift(input: DriftCheckInput): DriftCheckResult {
  const staged = input.stagedFiles.filter((f) => f.length > 0);

  const touchesDocsContent = staged.some((f) => DOCS_CONTENT_RE.test(f));
  const touchesLibrary = staged.some((f) => LIBRARY_RE.test(f));
  const touchesCode = staged.some((f) => CODE_RE.test(f));

  if (!touchesDocsContent || touchesLibrary || touchesCode) {
    return { applicable: false, ok: true, offendingFiles: [] };
  }

  const offending = input.untrackedOrUnstagedLibraryFiles
    .filter((f) => f.length > 0)
    .filter((f) => LIBRARY_CONTENT_RE.test(f))
    .sort();

  if (offending.length === 0) {
    return { applicable: true, ok: true, offendingFiles: [] };
  }

  return {
    applicable: true,
    ok: false,
    offendingFiles: offending,
    reason:
      'Commit regenerates docs/article or docs/wikipedia pages but does not ' +
      'include any library/ files, yet uncommitted library content files ' +
      'exist on disk. Stage them or the article will 404 after the next clean.',
  };
}

function git(cmd: string): string {
  try {
    return execSync(`git ${cmd}`, { encoding: 'utf-8' });
  } catch {
    return '';
  }
}

function main(): void {
  const stagedFiles = git('diff --cached --name-only').split('\n');
  const untracked = git('ls-files --others --exclude-standard').split('\n');
  const unstagedModified = git('diff --name-only').split('\n');

  const candidates = [...untracked, ...unstagedModified].filter((f) =>
    f.startsWith('library/'),
  );

  const result = checkLibraryDrift({
    stagedFiles,
    untrackedOrUnstagedLibraryFiles: candidates,
  });

  if (!result.applicable || result.ok) {
    process.exit(0);
  }

  process.stderr.write('\n');
  process.stderr.write('❌ Library drift detected (issue #474 guard)\n');
  process.stderr.write('\n');
  process.stderr.write(`${result.reason}\n`);
  process.stderr.write('\n');
  process.stderr.write('Uncommitted library content files:\n');
  for (const f of result.offendingFiles) {
    process.stderr.write(`  • ${f}\n`);
  }
  process.stderr.write('\n');
  process.stderr.write(
    'Fix: `git add` the library/ files above and amend your staging, ' +
      'or remove them from disk if they are not the source of the staged docs pages.\n',
  );
  process.exit(1);
}

// Run when invoked as CLI (tsx tools/ops/check-library-drift.ts).
// Vitest imports the module without triggering this branch.
const invokedDirectly =
  typeof process !== 'undefined' &&
  Array.isArray(process.argv) &&
  process.argv[1] !== undefined &&
  /check-library-drift\.ts$/.test(process.argv[1]);

if (invokedDirectly) {
  main();
}
