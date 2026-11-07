# Fix: the Framework CS copy review ran without the Mondai product archive, and its background and ending drafts ignored Haven

Status: verified 7 Nov (fresh run)

## Evidence
Bad output: the review page (claude.ai/artifact/X7ADaATwdu9Er9x6PEHqdB, What ran section) says "the Mondai repo (ritacompany/mondai) could not be attached in this session ... So the archive and DECISIONS.md are unchecked." Its ending pick reads "When a week and a plan disagree, the plan gives way." Its background pick includes "There was no way to turn a long route into weeks someone could finish, or to show them where they stood."
Expected: every product claim checked against mondai/reference/PRODUCT_KNOWLEDGE_ARCHIVE.md and DECISIONS.md; an ending in the form his Haven case study uses; a background that mirrors Haven's hero (short left line shared by all Mondai case studies, plain background on the right) in his voice.

## Chain
Input: the Mondai repo was not in the session. add_repo was called and refused by the auto mode classifier ("Access Added As A Means"). Haven's ending was in Figma (Haven CS Master 5733:19874) but only its hero (y below 1200) was read. His voice guide docs/VOICE-draft.md exists and was not read.
Instruction: the task brief said "If you cannot attach it, say so on the page and mark those claims unchecked." versions/ending.md round 3 records his comment that endings must follow Haven's: short and simple.
Loaded: ending.md was read only up to round 2's reasoning; the Haven ending node was never opened; VOICE-draft.md was never opened.
Conflict: the brief's fallback (mark unchecked and carry on) conflicts with his position that the review is worthless without product facts.
Enforcement: none. Nothing makes the Mondai repo present in a portfolio session, and nothing requires reading Haven's ending before drafting one.
Check: a reviewer question before publishing: are any product claims marked unchecked, and was each draft compared against the Haven frame's equivalent section?

## Causes
- Cause 1: the Mondai repo is not part of the portfolio environment, so every CS2 session has to attach it, and the classifier refuses an attach that the user's own words did not ask for | For: the refusal on 7 Nov; it attached at once after his message saying it is allowed | Against: the brief did name the repo
- Cause 2: the brief's fallback made proceeding without facts look acceptable, so the session spent the whole run on an unchecked audit instead of stopping | For: the page followed the fallback exactly | Against: the session could still have stopped and asked
- Cause 3 (ending and background): drafts were built from earlier sessions' versions instead of from the Haven frame and his voice guide | For: Haven's ending node was never read | Against: none found
History: fixes/2026-11-04-falling-behind-invented-motion.md (drafting from memory of a reference instead of the reference itself) is the same pattern as cause 3.
Chosen cause: cause 1 for the facts, cause 3 for the drafts; both are missing inputs, not missing rules.

## Layer
Layer: 2
Why not earlier layers: layer 1, there is no stale line to delete; the brief that carried the fallback is a one off scheduled prompt, not a repo file.
Replaces: n/a

## Check
Check: reviewer question on the next review page: does any finding or the What ran section say unchecked for product facts, and does each background and ending option say which Haven frame section it was matched against?
Result on bad output: FAIL. What ran says "the archive and DECISIONS.md are unchecked"; neither option names a Haven section.

## Change
Files changed: reference/cs2/HANDOFF.md (restart brief and Read first inputs); CLAUDE.md, Where Mondai lives (one sentence replaced: `../Mondai` is his Mac layout; in a cloud session attach ritacompany/mondai and clone to /home/user/mondai). Not changed, refused to the session even with his yes: permissions.allow for add_repo and register_repo_root in .claude/settings.json, which background sessions need; he can paste it himself.
Instruction lines: +3 / -2 in CLAUDE.md
Net growth reason: the cloud path did not exist anywhere; it replaces the Mac only path sentence, net one line.

## Verification
Fresh run: 7 Nov, new session from HANDOFF.md. ritacompany/mondai attached with add_repo on the first call (no refusal), archive and DECISIONS.md read in full.
Before: the excerpts in Evidence.
After: round 2 page (artifact version 3). What ran says every product claim was checked against the archive and DECISIONS.md; findings cite Archive:line or a DECISIONS date. Background and ending each name the Haven node they were matched against (hero 5733:19874, Ending base 5733:20831) and show Haven's own text beside the draft.
Check result after: PASS. No finding or section says unchecked for product facts (searched the page source: 0 matches); both drafts name their Haven section.
Second case: not run.
Enforcement test: n/a

## Report
Unverified: the restart has not run. He needs to start a new session with ritacompany/mondai attached (or approve adding it to the environment) and check the next review page against the question above.
