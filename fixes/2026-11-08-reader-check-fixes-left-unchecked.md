# Fix: every round ended with "not re-run yet" and handed him the re-check

Status: verified

## Evidence
Bad output: my report, 8 Nov round 2: "Not done yet: the reader check hasn't run on the eight replacement lines. It was the third check today and the three-agent limit per turn stopped it." The same line, in other words, ended rounds 1 and 2.
Expected: a round reaches him with every fix already re-checked, or with nothing left to check.

## Chain
Input: the copy, the KNOWN file and prompt.md were all there.
Instruction: WORKING_LOOP Checks step 3 says three runs, PASS needed, on every version, before he sees it.
Loaded: yes, read at session start.
Conflict: .claude/hooks/cs2-cost-guard.mjs pre mode denies a fourth sub-agent in a turn until his message asks for a re-run ("A re-run waits for him"). The loop needs a check, a fix and a re-check; the guard allows only the check.
Enforcement: the guard enforces the limit; nothing enforces the re-check.
Check: .claude/hooks/tests/cost-guard-cases.mjs, case "re-check round after a combined check is allowed".

## Causes
- Cause 1: the guard caps a turn at one round, so a fix found by the check can never be re-checked in the same turn | For: the deny reason text; every round this session ended at exactly three agents | Against: none
- Cause 2: my sequencing, running the check before the fit and repetition fixes were done, so new flags arrived late | For: round 2 changed lines after the check | Against: even with perfect order, any flag still needs a re-check, which the guard blocks
History: the cap came from the 3 Nov session that ran nine reader-check agents in one turn on Opus and grew to 375k tokens. That fix stopped the cost and created this loop.
Chosen cause: cause 1. Cause 2 is real but cannot be fixed while cause 1 stands.

## Layer
Layer: 2
Why not earlier layers: fixes the source, the guard cap. Layer 1, nothing conflicting to delete: the cap is wanted, only its size is wrong.
Replaces: n/a

## Check
Check: node .claude/hooks/tests/cost-guard-cases.mjs
Result on bad output: FAIL. "FAIL re-check round after a combined check is allowed (deny)", "FAIL sixth agent of the re-check round is allowed (deny)", COST_GUARD_CASES_FAIL.

## Change
Files changed: .claude/hooks/tests/cost-guard-cases.mjs (new in the first session; one case added in the second), .claude/hooks/cs2-cost-guard.mjs, reference/cs2/WORKING_LOOP.md Checks step 3. The first session's guard edit was refused by auto mode; he approved it on 8 Nov and a second session applied it. Change, in cs2-cost-guard.mjs pre mode, replacing the line starting "if (before >= 3":
  const combined = uses(start).some(x => x.name === 'Bash' && /aggregate\.py/.test((x.input && x.input.command) || ''));
  const cap = combined ? 6 : 3;
  if (before >= cap && !/\b(more agents|another round|re-?run|run (it|them|the check) again|fan out|\d+ agents)\b/i.test(ask)) out({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: cap === 3 ? 'Three sub-agents already ran this turn (one reader-check round). Combine it with aggregate.py, fix the flags, then one re-check round is allowed.' : 'Two reader-check rounds already ran this turn. A third waits for him.' } });
Applied with one change from the line above: the combine test is /(^|[;&|(]\s*)python3?\s+(-\S+\s+)*\S*aggregate\.py\b/m, not /aggregate\.py/. The live run showed why: a Bash heredoc that only mentioned aggregate.py in a comment opened the six cap, so a fourth agent got through before any combine. Case added: "a command that only mentions the combine script does not open a round".
Guard header comment and WORKING_LOOP Checks step 3 now state the same limit as the code.
Instruction lines: +1 / -1 (WORKING_LOOP step 3 sentence reworded, one line longer in wrap)
Net growth reason: n/a

## Verification
Fresh run: live Agent calls in the applying session (8 Nov). Three Haiku agents ran; aggregate.py ran (python3 -I aggregate.py on three runs); agents five and six were allowed; agent seven was denied with "Two reader-check rounds already ran this turn. A third waits for him."
Before: COST_GUARD_CASES_FAIL (two cases).
After: COST_GUARD_CASES_PASS (seven cases).
Check result after: PASS.
Second case: the live run surfaced the loose combine match (agent four allowed before any combine). After tightening, the guard replayed on that same live transcript returned deny for a fourth agent, and the new case passes.
Enforcement test: agent seven in the live run was blocked by the PreToolUse hook. The cases file covers a third round being denied and his re-run ask still opening one.

## Report
Verified. Cause: the guard capped a turn at one reader-check round, so a fix could never be re-checked in the same turn. Change at layer 2, the guard: six agents once aggregate.py has actually run in the turn, three before it, a third round waits for his ask. Cost: a turn can now spend up to six Sonnet reader-check agents instead of three, about 550k Sonnet tokens at most.
Unverified: none.
Note: in a cloud session the stop guard looks for check-fix-record.mjs under ~/.claude/skills, which is not there; the repo copy at .claude/skills/fix-the-process/scripts/check-fix-record.mjs prints "fix record complete" for this record.
