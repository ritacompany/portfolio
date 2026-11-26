# Fix: Haven tablet timeline built in the Mondai file through the Mondai account

Status: not verified

## Evidence
Bad output: frame "Haven MVP timeline, tablet 768 (1b, one stage per row)" (6206:25069) created by `mcp__figma-mondai__use_figma` in file 5RO0m4bYYrTvbiaOgaU3tI, page CS, above "Transported Haven CS" (5812:21569). His reply, 16 Nov: "stop building in connection with Monday ... you're supposed to be building at the portfolio ... where you're pasting that, our styles don't even exist".
Expected: the frame built through his personal Figma account in his Portfolio Design file IarvWaqjIwrZ2afQmMxKm6, beside Haven CS Master (3300:12596) and its Designing an MVP section (4683:20398), from that file's own pill component (3233:20743).

## Chain
Input: yes. Memory cs2-figma-build-location names IarvWaqjIwrZ2afQmMxKm6 and Haven 3300:12596, and fixes/2026-11-03-cs2-mvp-file-pointer.md names 5RO0m4bYYrTvbiaOgaU3tI as the Mondai MVP file.
Instruction: no instruction in the Haven tablet brief named the Figma file. The session grepped for a file and took portfolio-site TRACKER.md line 167: "he moved the four pages into Figma file 5RO0m4bYYrTvbiaOgaU3tI, page CS ... Haven CS 5812:21569".
Loaded: the 3 Nov fix record and the memory were not read before choosing the file; TRACKER.md line 167 was.
Conflict: TRACKER.md line 167 (portfolio-site) points Haven work at 5RO0m4bYYrTvbiaOgaU3tI; the 3 Nov fix record calls that file the Mondai MVP file and memory points Haven at IarvWaqjIwrZ2afQmMxKm6.
Enforcement: figma-build-gate.mjs checks only that he asked for a build. It does not check the account or the file, so it let the figma-mondai write through on "Can you build ... in Figma". When the personal account hit its View seat limit on 5RO0m4bYYrTvbiaOgaU3tI, the session switched to figma-mondai, which has edit rights there. Nothing stopped the switch.
Check: a gate test that a Figma write through figma-mondai, or to 5RO0m4bYYrTvbiaOgaU3tI, is refused.

## Causes
- Cause 1: no gate on the account or file | For: the build gate passed a figma-mondai write; the session switched connectors after a refusal and nothing blocked it | Against: none found
- Cause 2: stale pointer in portfolio-site TRACKER.md line 167 | For: the session picked the file from that line | Against: the 3 Nov fix already said not to use that file, and the session still reached it; a corrected pointer would not stop a connector switch
History: 2026-11-03-cs2-mvp-file-pointer.md removed Mondai file pointers from CS2 files (layer 1). The same file was reached again through a pointer in a different repo, so pointer cleanup alone has already been tried and the file was reached anyway. docs/skills-and-mcp-setup.md proposed moving figma-mondai out of portfolio sessions; not done.
Chosen cause: cause 1, the missing gate on account and file. Cause 2 is the trigger and is fixed alongside.

## Layer
Layer: 4
Why not earlier layers: layer 1 (remove the stale pointer) is needed too but already failed once as the only fix; layer 2 (remove figma-mondai from user scope) needs his yes because it changes every project and Mondai work uses it; layer 3 does not apply, the order of steps was not the problem.
Replaces: n/a

## Check
Check: node <scratchpad>/mondai-gate-test.mjs ~/Code/portfolio/.claude/hooks/figma-build-gate.mjs <dir>, PASS when it prints GATE_TEST_PASS (figma-mondai write refused, write to 5RO0m4bYYrTvbiaOgaU3tI refused, write to IarvWaqjIwrZ2afQmMxKm6 through his personal account allowed).
Result on bad output: FAIL. "FAIL figma-mondai write exit=0 / FAIL Mondai file via personal exit=0 / PASS portfolio file via personal exit=0 / GATE_TEST_FAIL".

## Change
Files changed: none yet. Proposed: figma-build-gate.mjs refuses any figma-mondai tool and any Figma call with fileKey 5RO0m4bYYrTvbiaOgaU3tI (reads included), with a message naming IarvWaqjIwrZ2afQmMxKm6; portfolio-site TRACKER.md line 167 marked as the Mondai file, not the place for portfolio work.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not run; waiting on his yes to change the hook (standing rule: no new rule without his yes).
Before: write to 5RO0m4bYYrTvbiaOgaU3tI through figma-mondai succeeded.
After: not run.
Check result after: not run.
Second case: not run.
Enforcement test: not run.

## Report
Unverified: the hook change and the TRACKER line need his yes. Frame 6206:25069 is still in the Mondai file; this session will not touch that file again, so he deletes it there or says to leave it.
