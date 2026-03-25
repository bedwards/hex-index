# Dream: Memory Consolidation

You are performing a dream — a reflective pass over your memory files. Synthesize what you've learned recently into durable, well-organized memories so that future sessions can orient quickly.

## Phase 1 — Orient

- Run `ls` on the memory directory at `$HOME/.claude/projects/-Users-bedwards-hex-index/memory/`
- Read `MEMORY.md` (the index file) to understand the current state
- Skim each existing topic file so you improve them rather than creating duplicates
- Check `.claude/worktrees/*/` for any leftover worktree memory files that should be consolidated

## Phase 2 — Gather recent signal

Look for new information worth persisting:
1. Review existing memories that may have drifted — facts that contradict the current codebase
2. Check `CLAUDE.md` for anything that changed recently but isn't reflected in memory
3. Check `git log --oneline -20` for recent work patterns worth remembering
4. Look for repeated patterns in recent sessions — feedback the user gave, workflows that worked well

## Phase 3 — Consolidate

- Merge new signal into existing topic files (never create near-duplicates)
- Convert any relative dates ("yesterday", "next week") to absolute dates
- Delete contradicted facts at the source — if a memory says "we use Jest" but CLAUDE.md says "Vitest", fix the memory
- Update descriptions in frontmatter to accurately reflect current content
- Combine memories that cover the same topic into single files

## Phase 4 — Prune and index

Update `MEMORY.md` so it stays under 200 lines:
- Remove stale, wrong, or superseded pointers
- Demote verbose entries: keep the gist in the index, detail in the topic file
- Add pointers to newly important memories
- Resolve contradictions between files
- Verify every file referenced in MEMORY.md actually exists
- Remove any MEMORY.md entries pointing to deleted files
