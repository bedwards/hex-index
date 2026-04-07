import { describe, it, expect } from 'vitest';
import { checkLibraryDrift } from './check-library-drift';

describe('checkLibraryDrift (issue #474)', () => {
  it('not applicable when no docs/article or docs/wikipedia files staged', () => {
    const r = checkLibraryDrift({
      stagedFiles: ['docs/index.html', 'docs/styles.css'],
      untrackedOrUnstagedLibraryFiles: ['library/rewritten/foo/bar.html'],
    });
    expect(r.applicable).toBe(false);
    expect(r.ok).toBe(true);
  });

  it('not applicable when commit also touches library/', () => {
    const r = checkLibraryDrift({
      stagedFiles: [
        'docs/article/abc/index.html',
        'library/rewritten/foo/bar.html',
      ],
      untrackedOrUnstagedLibraryFiles: [],
    });
    expect(r.applicable).toBe(false);
    expect(r.ok).toBe(true);
  });

  it('not applicable when commit touches src/ or tools/ (real code change)', () => {
    const r = checkLibraryDrift({
      stagedFiles: ['docs/article/abc/index.html', 'src/db/queries.ts'],
      untrackedOrUnstagedLibraryFiles: ['library/rewritten/foo/bar.html'],
    });
    expect(r.applicable).toBe(false);
  });

  it('passes when applicable and no uncommitted library content exists', () => {
    const r = checkLibraryDrift({
      stagedFiles: ['docs/article/abc/index.html'],
      untrackedOrUnstagedLibraryFiles: [],
    });
    expect(r.applicable).toBe(true);
    expect(r.ok).toBe(true);
    expect(r.offendingFiles).toEqual([]);
  });

  it('fails when docs-only commit leaves untracked library/rewritten file behind', () => {
    const r = checkLibraryDrift({
      stagedFiles: [
        'docs/article/abc/index.html',
        'docs/article/abc/excerpt.html',
      ],
      untrackedOrUnstagedLibraryFiles: [
        'library/rewritten/sinocism/some-piece.html',
      ],
    });
    expect(r.applicable).toBe(true);
    expect(r.ok).toBe(false);
    expect(r.offendingFiles).toEqual([
      'library/rewritten/sinocism/some-piece.html',
    ]);
    expect(r.reason).toMatch(/library/);
  });

  it('fails when docs-only commit leaves untracked library/wikipedia file behind', () => {
    const r = checkLibraryDrift({
      stagedFiles: ['docs/wikipedia/battle-of-thermopylae/index.html'],
      untrackedOrUnstagedLibraryFiles: [
        'library/wikipedia/battle-of-thermopylae.html',
      ],
    });
    expect(r.ok).toBe(false);
    expect(r.offendingFiles).toEqual([
      'library/wikipedia/battle-of-thermopylae.html',
    ]);
  });

  it('ignores non-content library files (e.g. images)', () => {
    const r = checkLibraryDrift({
      stagedFiles: ['docs/article/abc/index.html'],
      untrackedOrUnstagedLibraryFiles: [
        'library/images/foo.png',
        'library/rewritten/foo/notes.txt',
      ],
    });
    expect(r.ok).toBe(true);
    expect(r.offendingFiles).toEqual([]);
  });

  it('reports multiple offending files sorted', () => {
    const r = checkLibraryDrift({
      stagedFiles: ['docs/article/abc/index.html'],
      untrackedOrUnstagedLibraryFiles: [
        'library/rewritten/zeta/c.html',
        'library/rewritten/alpha/a.html',
        'library/wikipedia/middle.html',
      ],
    });
    expect(r.ok).toBe(false);
    expect(r.offendingFiles).toEqual([
      'library/rewritten/alpha/a.html',
      'library/rewritten/zeta/c.html',
      'library/wikipedia/middle.html',
    ]);
  });
});
