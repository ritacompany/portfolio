# Fix: the launch tracker was a flat list, so it scheduled motion before the hero elements it needs

Status: verified

## Evidence
Bad output: TRACKER.md (commit 0cc4c05) put the motion lab next: "2. **Motion lab**, next: an HTML prototype from the real frames of the hero marquee (H1), nav reveal (H8), grid options (H9), work card hover (H11) and a first pass of the hero to superpowers travel (H7)." The inventory columns were "# | Item | Owner | Status", with no order and no dependencies. Chadwick: "why is motion lab something we're focusing on first when we don't have all the elements done for the hero section".
Expected: an ordered plan in which the hero element roster and the superpower concepts come first, because his notes say the hero elements become the superpower visuals ("once I have those visuals all figured out ... those three elements end up being in that frame"), and motion follows them ("I don't know how it connects to what we're putting in").

## Chain
Input: yes. His notes were in the conversation, but only there. Nothing in the repo held them, so any later reader or checker could only see the tracker's summary.
Instruction: the portfolio rules say to list a long message's asks before answering. Nothing asked for order or dependencies.
Loaded: the rules were loaded every turn. They were followed: the asks were listed, as a flat list.
Conflict: none found in .claude/portfolio-rules.md, CLAUDE.md, the unlazy skill or memory.
Enforcement: none for order. The tracker template that was chosen had no slot for what an item waits on.
Check: the two blind audits checked the tracker's facts against files and Figma. Neither one was given his notes, so neither could see that an ordering was missing.

## Causes
- Cause 1: the tracker format had no Stage or Waits on field, so order was never written down | For: columns were "# | Item | Owner | Status"; the only ordering text was one "Critical path" paragraph about case studies | Against: a careful author could still have spotted the motion dependency without a field
- Cause 2: the checks never saw the source. His notes lived only in chat, and both audits compared the tracker to files and Figma, not to what he said | For: audit prompts, turns 1 and 2, name only repo files and Figma | Against: none found
- Cause 3: his notes were not read | For: none | Against: the inventory carried dozens of specific items from them, including small ones (the wig, the VS Goods buttons in the first version)
History: no earlier fix for tracker ordering. The "list the asks first" rule exists and was followed, which shows a listing rule does not produce order.
Chosen cause: causes 1 and 2 together. The format could not carry order, and no check compared the plan with his words.

## Layer
Layer: 3
Why not earlier layers: layer 1 needs a conflict and there was none. Layer 2 (saving his notes into the repo as the source) is part of the fix but does not by itself add order; the restructure gives every row a required Stage and Waits on slot, checked by a script, with a separate reviewer against the notes for dependencies nobody wrote down.
Replaces: n/a

## Check
Check: `node scripts/check-tracker-order.mjs` (every row has a Stage and a Waits on, and nothing waits on something in the same or a later stage). Judgment check, run by a separate reviewer given only the verbatim notes and the tracker: is anything scheduled before what the notes say it depends on, is any implied dependency missing, is any work missing a row?
Result on bad output: FAIL. "S3: table has no Stage or Waits on column ... no inventory rows found ... tracker order FAILED (41)".

## Change
Files changed: reference/launch/2026-10-15-progress-notes.md (new, his notes verbatim); scripts/check-tracker-order.mjs (new); TRACKER.md (rebuilt as an ordered plan with Stage and Waits on per row and a stage overview, pointing at the notes as the source and at the check)
Instruction lines: +4 / -3
Net growth reason: TRACKER.md now names its source file and the check command. Both point at artifacts, not new behaviour rules.

## Verification
Fresh run: a subagent given only the notes file, no tracker and no repo, derived the order and stages on its own. Its result was compared with the rebuild and showed three items and two placements the rebuild had missed (VS Goods header H23, scroll speed in H7, help on the hero line, grid placement H9, animation audit H21). Then a separate reviewer given the notes and the tracker found six missing Waits on links and one held-back row (H6 waits on H6t, S1 on H12 and on F1 to F3, H15a and H15b on F3, H7 on H8, H20 on H23, H8 not waiting on H19). All were applied, and the reviewer re-checked the result.
Before: "2. **Motion lab**, next: ... a first pass of the hero to superpowers travel (H7)"
After: H7 is stage 5 and waits on H20, H15b, H21 and H8. Stage 1 AI work is only work that waits on nothing: the cats test, Figma cleanup, the Mondai mockup, simple card states, the about panel proposal, the animation audit and site setup.
Check result after: PASS. "tracker order OK (41 rows)".
Second case: the original failure was re-created by moving H7 to stage 1 in a copy of the tracker. The check reports FAIL: "H7 (stage 1) waits on H20 (stage 3), which is not earlier ... tracker order FAILED (3)".
Enforcement test: the script catches order violations among dependencies that are written down. It cannot catch a dependency nobody wrote down; only the separate reviewer against the notes does that. No hook runs either check automatically.

## Report
Unverified: neither check runs on its own. Before trusting a changed plan, a session (or Chadwick) has to run `node scripts/check-tracker-order.mjs` and send the notes and the tracker to a separate reviewer. Whether to make that a hook on edits to TRACKER.md is his call.
