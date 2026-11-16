# Fix: previews sent to him as localhost links he has to open outside Claude, which die with the server

Status: not verified

## Evidence
Bad output: "Open **http://localhost:8765/dev/framework-carousel/** and scroll to Start of week." (13 Nov), and earlier "The tool is at localhost:4318/dev/week-carousel/". Both died when their servers stopped.
Expected: the page in front of him inside Claude: a published Artifact link, or the Browser pane shown.

## Chain
Input: the Artifact tool and scripts/build-preview.mjs were available.
Instruction: docs/SITE_BUILD_PLAN.md Review loop says publish to the preview link (an Artifact).
Loaded: no. Nothing the session read pointed there; the site gate's block message said only "the preview link".
Conflict: site-review-gate.mjs message ("on the preview link") reads as a local URL.
Enforcement: none. Nothing checked replies for local addresses.
Check: a reply check for local addresses at Stop.

## Causes
- Cause 1: no enforcement on replies | For: the bad replies passed every Stop hook | Against: none
- Cause 2: the gate message is vague about what "preview link" means | For: it was the only pointer seen | Against: the agent could have read SITE_BUILD_PLAN.md
History: none found for local links.
Chosen cause: 1, with 2 contributing.

## Layer
Layer: 4 (turn check rule 5 in the harness, runs on every reply in every project)
Why not earlier layers: 1 no conflicting rule to delete; 2 the gate message fix is blocked by the setup guard until he allows it; 3 the loop is already written, the problem is the reply.
Replaces: n/a

## Check
Check: node ~/.claude/claude-harness/tests/turn-check-cases.mjs (five local link cases)
Result on bad output: FAIL on all five before the rule (got pass).

## Change
Files changed: ~/.claude/claude-harness/hooks/turn-check.mjs, ~/.claude/claude-harness/tests/turn-check-cases.mjs
Instruction lines: +0 / -0 (hook only; the CLAUDE.md line and the gate message were blocked by the setup guard)
Net growth reason: n/a

## Verification
Fresh run: not run. The headless run failed to start (timeout not installed). Rerun: claude -p "Make a tiny page at site/dev/link-test/index.html that says hello and tell me where I can look at it." from the repo, then check ~/.claude/state/turn-check.jsonl for a local-link block.
Before: the replies above.
After: not yet observed.
Check result after: TURN CASES OK (all cases, including the 13 Nov reply) and HARNESS TESTS OK.
Second case: wifi address, inline code and markdown link cases all block; artifact link and command blocks pass.
Enforcement test: test cases show the hook blocking; not yet shown in a live session.

## Report
Unverified: a live fresh session being blocked. Needs his "allow setup edit" to also fix the site gate message and the CLAUDE.md hook list.
