# Fix: the stop guard blocked every cloud session that edited a process doc, even with a passing fix record

Status: verified

## Evidence
Bad output: the stop hook, 8 Nov cloud session, twice after the record checker printed "fix record complete (status: verified, layer 2)": "A process doc changed this session without a passing fix record. Write fixes/YYYY-MM-DD-(slug).md from the fix-the-process template and run its checker..."
Expected: a session whose fix record passes the checker can stop; one with no record or a failing record is blocked.

## Chain
Input: the record existed at fixes/2026-11-08-reader-check-fixes-left-unchecked.md and passed the repo's checker.
Instruction: cs2-cost-guard.mjs stop mode, the PROCESS_DOCS branch.
Loaded: yes, the hook ran at every stop (the block text is its own).
Conflict: the hook ran the checker from os.homedir()/.claude/skills/fix-the-process/scripts/check-fix-record.mjs. In the cloud container that path does not exist (ls: No such file or directory); the repo carries the same checker at .claude/skills/fix-the-process/scripts/. A missing checker returns empty output, read as a failing record.
Enforcement: the hook itself; it enforced against the wrong file.
Check: .claude/hooks/tests/cost-guard-stop-cases.mjs, run with HOME pointed at an empty folder.

## Causes
- Cause 1: checker path fixed to ~/.claude, absent in cloud | For: ls on the path fails; the repo checker passes the same record | Against: none
- Cause 2: the hook only counts records touched by Write/Edit, so a record written through Bash is invisible | For: this session first wrote the record with a Bash python edit; test case "passing record written through Bash, uncommitted" blocked | Against: after an Edit touched the record, cause 1 alone still blocked
History: the stop guard came from the 3 Nov fix (rules that only lived in WORKING_LOOP did not hold). No earlier fix touched the checker path.
Chosen cause: both; cause 1 blocks every cloud session, cause 2 blocks any session that writes the record through Bash. Each has its own failing case.

## Layer
Layer: 2
Why not earlier layers: layer 1, nothing conflicting to delete: the guard is wanted, only its lookup is wrong.
Replaces: n/a

## Check
Check: node .claude/hooks/tests/cost-guard-stop-cases.mjs
Result on bad output: FAIL. "FAIL passing record edited with Edit, no ~/.claude copy of the checker (block)", "FAIL passing record written through Bash, uncommitted (block)", "FAIL passing record written through Bash and committed this session (block)", COST_GUARD_STOP_CASES_FAIL.

## Change
Files changed: .claude/hooks/cs2-cost-guard.mjs (stop mode: checker from ~/.claude when present, else the repo copy; records also found through git ls-files for uncommitted changes and git log since the session's first timestamp; header comment updated), .claude/hooks/tests/cost-guard-stop-cases.mjs (new, seven cases).
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: the hook run in stop mode against this live session's transcript, with the old hook (git stash) and the new one.
Before: old hook on the live transcript: {"decision":"block","reason":"A process doc changed this session without a passing fix rec...
After: new hook on the same transcript: no output, exit 0 (allowed).
Check result after: PASS. COST_GUARD_STOP_CASES_PASS, all seven cases ok; COST_GUARD_CASES_PASS for pre mode unchanged.
Second case: the stop cases build fresh git repos for each case: a record written through Bash and left uncommitted, one committed this session, and one committed two days earlier (still blocked).
Enforcement test: cases "failing record is still blocked" and "no record is still blocked" both block with HOME empty.

## Report
Unverified: none. The ~/.claude branch, used on his Mac, keeps its old behaviour and was not run here because this container has no ~/.claude/skills.
