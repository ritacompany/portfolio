# Fix: sessions told to stop and start over at 250k tokens

Status: not verified

## Evidence
Bad output: "This session is at a size where every message is expensive, so start a new one for the next step" and "start a new session for Framework CS" (site build session, 9 Nov, twice, each after the Stop hook said "This session is at 253k tokens ... tell him to start a new session for the next step").
Expected: the session keeps working on the job (Framework CS) and never asks him to open a new session. His words 9 Nov: "stop telling me to start a new session when you can do it yourself" and turn off the expensive setting so a job can finish in one session.

## Chain
Input: the session had everything it needed to continue (SITE_BUILD_PLAN resume point, Figma access).
Instruction: .claude/hooks/cs2-cost-guard.mjs stop mode, past 250k tokens, blocked the turn with "Rewrite reference/cs2/HANDOFF.md ... then tell him to start a new session". WORKING_LOOP.md repeated it ("One session per section or round ... tell him to start a new session").
Loaded: the hook fires on every Stop in every session, CS2 or not; its text arrived as Stop hook feedback twice.
Conflict: the harness compacts long sessions on its own (system prompt: "you don't need to wrap up early or hand off mid-task"); the guard says the opposite.
Enforcement: the guard itself was the enforcement, of the wrong behavior.
Check: a run of the guard on a transcript past 250k shows whether it still asks for a new session.

## Causes
- Cause 1: the 250k branch in cs2-cost-guard.mjs | For: its exact text drove both messages; it blocks the turn | Against: none; the first mention (end of the Home report) came before the hook fired
- Cause 2: the session chose on its own to stop before a 24k px page | For: the first "start a fresh session" line was written before the hook fired | Against: that line followed the WORKING_LOOP rule "one session per section or round", which the same 3 Nov change installed
History: added 3 Nov at his ask after a 375k token CS2 session on Opus; this is its first reversal.
Chosen cause: Cause 1, with Cause 2 coming from the same rule in WORKING_LOOP.md. Both are removed.

## Layer
Layer: 1
Why not earlier layers: layer 1 is the first; the guard and its doc line are the source, so removing them is the fix.
Replaces: n/a

## Check
Check: node <scratchpad>/check-cost-guard.mjs <dir>: runs `cs2-cost-guard.mjs stop` on a transcript whose last assistant turn used 270k tokens; PASS when the output carries no block and no "new session".
Result on bad output: FAIL: {"decision":"block","reason":"This session is at 270k tokens, so every message now costs about 270k. Rewrite reference/cs2/HANDOFF.md (section, round, his comme

## Change
Files changed: .claude/hooks/cs2-cost-guard.mjs (250k branch and its header line removed), reference/cs2/WORKING_LOOP.md (the one session per round line replaced)
Instruction lines: +2 / -4
Net growth reason: n/a

## Verification
Fresh run: the same check script, run as a separate process on the edited hook; the live test is this session's next Stop at about 280k tokens.
Before: FAIL: {"decision":"block","reason":"This session is at 270k tokens ...
After: the hook prints nothing for the 270k transcript.
Check result after: PASS: no new-session block at 270k
Second case: the guard's other stop check (process doc edited without a fix record) is untouched; `node --check` passes on the hook.
Enforcement test: n/a

## Report
Unverified: not run in a fresh session; the next long session is the real test. The usage checkpoint (75 and 90 percent of the 5 hour limit) still stands, because it tracks his plan limit, not session size. The Opus notice still shows once per session.
