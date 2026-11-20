# Fix: a session told him Figma was blocked because the repo pointed at a file CS2 had moved out of

Status: verified

## Evidence
Bad output: on 20 Nov he said his current frame was "mondai framework cS most current" in the Desktop 1 (MVP) file. The lead chat read the Portfolio Design file (IarvWaqjIwrZ2afQmMxKm6) instead, where the Figma login has only a rate limited View seat, told him Figma was blocked and sent him to reconnect a connector. The frame was readable all along at 5RO0m4bYYrTvbiaOgaU3tI, page CS 5658:1061, node 6331:20607 (read by this session with use_figma, 20 Nov). He says the same happened the last time he switched accounts.
Expected: the session reads 6331:20607 in the MVP file; if a call fails on one file it tries the other known files by frame name, and says nothing is blocked until every known file was tried.

## Chain
Input: yes. He named the frame and the file in chat.
Instruction: HANDOFF.md line 61 said the frame lives in the Portfolio Design file, frame 4269:9433; line 104 said never read or build in a Mondai file; Read first line 141 named 4269:9433 in IarvWaqjIwrZ2afQmMxKm6. WORKING_LOOP.md line 79, CS2_PROCESS.md line 201 and truth.json frameSource named 4269:9433 too. docs/skills-and-mcp-setup.md item 2 said CS2 must never use the Rita Dev login, the one that opens the MVP file.
Loaded: yes. CLAUDE.md sends every CS2 session to HANDOFF.md first.
Conflict: his own message against six repo pointers that all said the other file. HANDOFF.md line 30 (7 Nov) also said the case study lived in the MVP file, frame 5763:2448, now renamed OLD. Three different answers in one file.
Enforcement: none. Nothing compared a pointer with Figma, and nothing stopped a reply that reported one failed file as Figma being blocked.
Check: none existed. The 3 Nov fix checked with a one off grep that the MVP file was not named.

## Causes
- Cause 1: Figma locations restated in many files, each going stale when he moves a file between accounts | For: 61 occurrences of file keys or figma.com links across 41 files; six pointers in resume files all stale; HANDOFF.md held three contradictory locations | Against: none found
- Cause 2: a failed call on one file reported as Figma blocked, with no step to try the other files | For: the MVP file was readable all along; one View seat failure became "Figma is blocked" | Against: with a correct pointer the failure would not have happened, so this is the second link, not the first
- Cause 3: the 3 Nov "never use a Mondai file" rule | For: HANDOFF.md line 104 forbade the right file outright | Against: it is one instance of cause 1, a location written as a permanent rule
History: fixes/2026-11-03-cs2-mvp-file-pointer.md fixed the opposite move (MVP file to Portfolio Design) at layer 1 by rewriting the pointers. It was verified, and it failed the next time he moved the file, because it fixed the pointer values and left the pointers scattered. Repeating it would be the same experiment.
Chosen cause: cause 1, with cause 2 as the failure that turned a stale pointer into a false report to him. Both are fixed.

## Layer
Layer: 4
Why not earlier layers: the fix is layer 3 (one home for every location) held by layer 4 (check and hooks). 1 (remove) alone is what 3 Nov did and it failed on the next move; 2 (fix the source) is part of it: the pointers now have one source, reference/figma-locations.json; 3 (restructure) moves every location into that one file but a session can still skip it, and nothing would stop the false "blocked" report, so the two must happen steps get hooks.
Replaces: n/a

## Check
Check: node scripts/check-figma-locations.mjs (registry well formed, every live entry verified within 7 days, no resume file restates a file key, figma.com link or stale frame, HANDOFF.md points at the registry). Hooks: node scripts/test-figma-locations.mjs hooks.
Result on bad output: FAIL, 19 problems on the 20 Nov repo, including reference/cs2/HANDOFF.md:61 restates Figma file key IarvWaqjIwrZ2afQmMxKm6 and names 4269:9433, which the registry marks stale for cs2-framework (reports/figma-location-2026-11-20/g1-before.txt). The stop hook holds the 20 Nov reply ("Figma is blocked ... Reconnect the Figma connector") after one file was tried and lists 5RO0m4bYYrTvbiaOgaU3tI and the frame name to search.

## Change
Files changed: reference/figma-locations.json (new, the registry); scripts/check-figma-locations.mjs and scripts/test-figma-locations.mjs (new); .claude/hooks/figma-location.mjs (new: pre adds the current location to any call on a stale frame or unknown file; stop holds a blocked or missing report while a known file is untried, twice at most); .claude/settings.json (both registered); reference/cs2/check-handoff.mjs (runs the pointer and age checks at every save); reference/cs2/test-handoff.mjs (locations suite); .claude/hooks/figma-copy-match.mjs and its test (CS2 frame ids now also come from the registry: before, an invented sentence written into 6331:20607 passed with exit 0, because only 4269:9433 was listed); HANDOFF.md, WORKING_LOOP.md, CS2_PROCESS.md, truth.json, CLAUDE.md, BROWSER_MODE.md, docs/skills-and-mcp-setup.md (pointers replaced by the registry; the never use a Mondai file clause and the move figma-mondai out recommendation withdrawn).
Instruction lines: +12 / -1 (CLAUDE.md +4, BROWSER_MODE.md +5, HANDOFF.md format comment +3; HANDOFF.md line 61 reworded in place; line 104 clause removed)
Net growth reason: where designs live had no home, so it was written into six files; the new lines say once, in the files a session reads first, where to look and what to do on a miss. The duty itself is held by the check and hooks, not by these lines.

## Verification
Fresh run: a Sonnet sub agent given only the repo and his 20 Nov sentence, with no Figma calls allowed, asked where its first call goes, what it does if that call fails, where Haven is, and whether any file disagrees (reports/figma-location-2026-11-20/fresh-run.md).
Before: the repo sent the first call to IarvWaqjIwrZ2afQmMxKm6 frame 4269:9433, which is where the 20 Nov lead chat went.
After: first call to 5RO0m4bYYrTvbiaOgaU3tI page 5658:1061 frame 6331:20607; on a failed call it searches the other registry files by frame name before saying anything is blocked, and would not say Figma is blocked first.
Check result after: PASS, node scripts/check-figma-locations.mjs prints FIGMA_LOCATIONS_PASS; test-figma-locations prints ALL_LOCATION_TESTS_PASS and HOOK_TESTS_PASS; test-handoff locations prints HANDOFF_TEST_LOCATIONS_PASS.
Second case: the Haven style reference. HANDOFF.md sent sessions to 5733:19874, which no longer exists in the MVP file (use_figma, 20 Nov); the registry gives Transported Haven CS 5812:21569, and the fresh run answered 5812:21569 in the MVP file.
Enforcement test: the stop hook blocks the planted 20 Nov reply after one file, blocks a frame is missing reply, lets the same reply through once every known file was tried, never touches an ordinary reply and releases after two holds; the pre hook names 6331:20607 on a call to 4269:9433 (test-figma-locations.mjs hooks).

## Report
Unverified: none for the fix itself. Two limits he should know: the hooks run only in Claude Code, so the browser account is held by BROWSER_MODE.md text alone (it has no Figma, so it cannot make the false report); and the registry only knows a move once a session or he says so. Pre existing and untouched: HANDOFF.md fails check-handoff on its 9 Nov date, older than CS2 work committed since; site Figma pointers (docs/PROJECT_CONTEXT.md, scripts/verify-figma-sync.mjs) are not in the registry yet because nothing about them was verified today.
