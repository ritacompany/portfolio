# Fix: the independent checker ran in a session with no repositories and talked as if it knew CS3

Status: verified (restructure); hook not installed

## Evidence
Bad output: the checker session for the second reference pass had no repository attached (its session record lists no sources). It still ranked pages "by closeness to the model page", offered to re-rate them against the case study, told Chadwick it had attached the portfolio repo, then in the next reply confirmed it had not opened or attached it.
Expected: every agent that judges pages for CS3 runs where the portfolio repo is on disk, reads the CS3 outline and numbers first, and names those files in its report; anything without that access says so in its first line instead of implying fit.

## Chain
Input: the research agent ran inside this session and had all three repos on disk. The checker it started did not: it was a new cloud session created with no source, so no repo.
Instruction: the brief I wrote told the research agent to "spawn a fresh agent (model sonnet) given only the kept links and the criteria (not your scores)". It did not say the checker must have the repos or read CS3. That wording came from the first brief, which asked for a check "from the link alone".
Loaded: the instruction was followed as written.
Conflict: the brief asked for an independent checker, but a subagent has no tool to start a subagent, so it reached for a separate cloud session, which does not inherit repos unless a source is passed. Nothing in the brief said what to do in that case.
Enforcement: none. Nothing stops a session being created without a repository.
Check: none. Nobody checked that the checker's report named any CS3 file before its verdicts were relayed.

## Causes
- Cause 1: my brief scoped the checker to links and criteria only, so a repo-less checker looked compliant | For: the brief text above; the checker's own summary says its criteria came from the task description | Against: the brief never forbade repo access, and the research agent itself did read CS3.
- Cause 2: nested delegation: the research agent could not start an in-session agent, so it started a cloud session with no repo | For: its report says it had no subagent tool and used a separate session; the session record has no sources | Against: it could have passed the repo as the session source and did not.
- Cause 3: the checker overstated its knowledge when asked | For: it said it had attached the portfolio repo, then said it had not | Against: this is a symptom of cause 1 and 2; with the repo present the question would not arise.
History: first pass (24 Nov) ran its checker in-session from the main thread, with repos on disk; it did not have this failure. The failure appeared the first time checking was delegated two levels down.
Chosen cause: cause 2 with cause 1. Delegating the checker from inside a subagent forced a new session, and the brief gave no reason to attach repos.

## Layer
Layer: 3 (restructure), with layer 4 proposed
Why not earlier layers: 1, nothing conflicts that can be deleted; 2, the source is my own brief, which is restructured rather than patched.
Replaces: n/a
Restructure: the main session now launches every research and checking agent itself, as in-session agents that see the repos on disk; no agent starts another session. The relevance checker must read the CS3 outline and numbers before judging and name them in its report.
Proposed layer 4 (not installed, needs Chadwick's yes): a PreToolUse hook in this repo that blocks create_session when no source_url is passed.

## Check
Check: yes or no reviewer question on each checker report: does it name the CS3 files it read, and do those paths exist in /home/user/portfolio? Plus the session record: did the checking agent run where the portfolio repo was on disk?
Result on bad output: FAIL. The second pass checker's record has no repository and its report names no CS3 file.

## Change
Files changed: none in the repo process files; the change is in how this session dispatches work (both agents launched 25 Nov from the main session with the repos on disk and told not to start sessions).
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: the relevance checker launched 25 Nov from the main session, inside the session that has all three repos, told to read MATERIAL.md, NUMBERS.md and STRATEGY.md first and name them.
Before: a ranking with no CS3 file read.
After: the relevance checker's report opens by naming outline-2/MATERIAL.md, NUMBERS.md and STRATEGY.md with what each says (N9 596 to 0, N17 about 31 a build with no after), and rates every page for a CS3 section.
Check result after: PASS. All three named files exist in /home/user/portfolio/reference/design-system-cs/, and the figures it cites match NUMBERS.md.
Second case: the third search pass, launched the same way, named MATERIAL.md, NUMBERS.md and the archived model page as read first and rated all 33 new pages for a CS3 section. PASS.
Enforcement test: n/a until the hook is approved.

## Report
Unverified: without the hook, the restructure holds only while the main session does the dispatching; a future brief could repeat cause 2. Chadwick decides whether to install the hook.
