# Memory Consolidation Loop

Run `/consolidate-memory` to consolidate memory files.

This performs a 4-phase pass:
1. Orient --- read existing memory files
2. Gather --- find new signal from git history and recent work
3. Consolidate --- merge duplicates, fix stale dates, resolve contradictions
4. Prune --- keep MEMORY.md under 200 lines

After consolidation, report what changed.
