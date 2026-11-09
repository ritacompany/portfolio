# Fix: Contact button liquid effect built without the motion studio

Status: not verified

## Evidence
Bad output: site/js/liquid-button.js (commit 4e0eb0f), a pointer bulge pushed outward along the edge, shipped to the footer on three pages and shown to him as a recorded video. No style guide, no state list, no review rounds. His words 9 Nov: "you don't just create a video of how something works... it needs to be built and tested and fine tuned. I bet you didn't even use the motion skill... this looks nothing like that", and that the motion skill means "a process that we set up".
Expected: the motion studio loop (docs/motion/(piece)/style_guide.md from the reference, state_list.md, a seek(t) page, render, ranked P0 to P2 review with a fresh eyes reviewer, motion-check, two renders matching) and a live page he can use, before anything ships.

## Chain
Input: the reference was reachable (his pinned session's prototype, branch, and his two Framer recordings in that session's transcript).
Instruction: CLAUDE.md lists .claude/motion-rules.md and the code-motion skill for animation work.
Loaded: neither was opened for the button; the session treated a hover effect as UI, not animation.
Conflict: motion-rules.md Scope said "These rules cover motion inside media: loops, a rotating phone, scroll driven mockups and any clip rendered to video." The code-motion description listed the same media cases only. A hover effect on a site button matched neither.
Enforcement: none for UI interactions; the studio's checks only run when a piece enters docs/motion.
Check: motion-check log on docs/motion/(piece)/review_log.md would have failed; there was no piece folder at all.

## Causes
- Cause 1: the scope line and the skill description excluded interactive UI motion | For: both name only media cases; the session read the button as out of scope | Against: CLAUDE.md says motion rules apply to "animation", which a liquid hover is
- Cause 2: the session hurried to show progress with a video | For: it recorded a clip instead of a playground | Against: the clip choice followed from treating it as out of studio scope
History: fixes/2026-11-04-falling-behind-invented-motion.md (motion invented without the reference), the same family: building before reading the reference.
Chosen cause: Cause 1; it is the line a session reads to decide whether the studio applies.

## Layer
Layer: 2
Why not earlier layers: layer 1 does not fit, nothing conflicting needs deleting; the scope text itself is the source of the miss.
Replaces: n/a

## Check
Check: a fresh session given "add a hover effect to the Contact button" loads code-motion and creates docs/motion/(piece)/style_guide.md before code (reviewer question: did it?).
Result on bad output: FAIL: commit 4e0eb0f added site/js/liquid-button.js with no docs/motion folder.

## Change
Files changed: .claude/motion-rules.md (Scope line), .claude/skills/code-motion/SKILL.md (description)
Instruction lines: +1 / -1 in each (rewritten lines, no net growth)
Net growth reason: n/a

## Verification
Fresh run: not run. The rework in this session followed the studio end to end (docs/motion/contact-button/, three rounds, motion-check PASS, matching sha256), but that run knew the fix.
Before: site/js/liquid-button.js, no studio artifacts.
After: docs/motion/contact-button/ style guide, state list, review log with three rounds; site/motion-lab/contact-button.html; clip with matching renders.
Check result after: not verified in a fresh context.
Second case: none yet.
Enforcement test: n/a

## Report
Unverified: needs a fresh session asked for a hover effect on another component to confirm it loads code-motion from the description. Nothing stops a session that skips the skill entirely.
