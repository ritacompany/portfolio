# Fix: CS2 cost rules were written down but nothing enforced them

Status: not verified

## Evidence
Bad output: the 3 Nov session ran nine reader-check sub-agents in one turn (transcript rows 623 to 806: "Reader check run 1..3", "rerun 1..3", "Map C 1..3"), ran on claude-opus-5-5 throughout and grew to 375k tokens over 211 calls. Its own report lists "nine reader-check agents across three re-runs" as where the budget went.
Expected: one reader-check round per turn, a re-run only after he sees what failed, and a handoff to a new session before the context makes every message expensive.

## Chain
Input: the session had WORKING_LOOP.md and reader-check/README.md at the 2 Nov versions (worktree at 3b3da09, which contains both).
Instruction: README step 3 "Three agents per round"; WORKING_LOOP Usage "One session per section or round".
Loaded: yes, the session read WORKING_LOOP.md (row 189 area, `cat reference/cs2/WORKING_LOOP.md`).
Conflict: none. "Three per round" was read as three per round, and the session ran three rounds inside one turn.
Enforcement: none. The 2 Nov fix added text only. Only the unlazy and unpushed guards were hooks.
Check: none existed for agent count, session size or model.

## Causes
- Cause 1: the 2 Nov fix answered a cost problem with instruction text, which fix-the-process names as a failed layer | For: no hook touched Agent calls or context size; the rule was followed literally and still cost nine agents | Against: none found
- Cause 2: the session misread the rule | For: nine agents | Against: it ran exactly three per round, which is what the text says
- Cause 3: fix-the-process was never loaded for the 2 Nov change, because its trigger is a reminder hook (remind.mjs) that never blocks | For: the 2 Nov transcript has no Skill fix-the-process call before the WORKING_LOOP edits | Against: none
History: 2 Nov token work (WORKING_LOOP Usage section, reader-check README step 3) was text. Earlier fixes in fixes/ (26 to 29 Oct) used hooks where they held.
Chosen cause: 1, made possible by 3. Rules without a harness are requests, and nothing made the fixing session use the method that says so.

## Layer
Layer: 4
Why not earlier layers: 1, nothing conflicts; 2, no source file produces the agent calls; 3, the rule was already in the loaded file and in the right place, and was still followed into nine agents.
Replaces: n/a

## Check
Check: replay the 3 Nov transcript through `.claude/hooks/cs2-cost-guard.mjs` (pre at each Agent call, stop at rows 150, 400, 900, end).
Result on bad output: FAIL before the guard existed: all nine Agent calls ran and every Stop passed at 292k and 375k tokens.

## Change
Files changed: .claude/hooks/cs2-cost-guard.mjs (new), .claude/settings.json (PreToolUse Agent|Task|Write|Edit|MultiEdit, Stop, UserPromptSubmit), reference/cs2/WORKING_LOOP.md
Instruction lines: +7 / -7
Net growth reason: n/a

## Verification
Fresh run: replay of the real 3 Nov transcript, cut at each decision point, fed to the hook as the harness would.
Before: rows 715 to 806, six extra Sonnet agents ran in the same turn; session ended turns at 375k.
After: rows 623 to 625 pass; rows 715, 716, 717, 804, 805, 806 are denied ("Three sub-agents already ran this turn"). Stop at row 900 blocks at 292k, at the end blocks at 375k. Stop at 150 and 400 passes.
Check result after: PASS. An Agent with no model is denied; an Edit to WORKING_LOOP.md without fix-the-process is denied; an edit to versions/x.md passes; his message "rerun the reader check please" lets a fourth agent through; the Opus notice shows once per session and is silent the second time.
Second case: this session (dreamy-shirley) is on Opus and the notice fires on its next prompt; the process doc edit in this fix was allowed only because fix-the-process was loaded first.
Enforcement test: as above, the six re-run Agent calls from 3 Nov are refused.

## Report
Unverified: no fresh CS2 session has run with the guard live yet. The first real round in a new session will show whether the 250k handoff block lands at a sensible moment. The model itself cannot be switched by a hook; the notice tells him and he switches it in the picker.
