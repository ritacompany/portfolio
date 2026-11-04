# Fix: Falling behind round 5 padded the space with cards that over-explain and do not follow

Status: not verified

## Evidence
Bad output: round 5, versions/falling-behind.md, commit cea1ae9, the two cards below.
Card: On its own | It happens without asking, so nobody has to decide what to keep at the moment they're behind.
Card: Still fits | The next week takes fewer new Action Items to make room and stays the size of the hours someone gave.
He said it over-explains, reads like searching for something to say and lacks logic; the card labels mean nothing on their own.
Expected: the block's job from his 3 Nov spec (HANDOFF item 4 history): a problem headline, at most one short line and the rollover sentence, image slot blank. Two sentences: the stakes, then rollover.

## Chain
Input: his spec was in HANDOFF.md and versions/falling-behind.md (round 4 header: "at most one short line, plus the rollover sentence he approved").
Instruction: WORKING_LOOP says never make a text only block and that points without an image sit beside an image; his 3 Nov call made this block a copy block with the slot blank.
Loaded: both were read this session. When he said "use the space", the session read space as layout area to fill, not as the block's words.
Conflict: WORKING_LOOP "never make a text only block" against his call for this block. The layout rule pulled toward filling the slot the cut diagram left.
Enforcement: no-ai-slop is run by the session that drafted; nothing independent judged logic or padding.
Check: the reader check passed round 5 with no flags. Its four questions test stranger terms, a decision and reason, process story and restating KNOWN. None asks whether a sentence follows or is needed.

## Causes
- Cause 1: no independent check on logic or padding | For: reader check PASS on the padded cards (runs/2026-11-03-fb E1 to E3); same session no-ai-slop passed them | Against: a better draft would not need catching
- Cause 2: the layout rule and the empty slot pushed toward filling space | For: three cards appeared exactly where four columns were cut | Against: his message said use the space, which also invites filling
History: start of week round 5 (versions/start-of-week.md) already recorded that a same session no-ai-slop pass misses AI rhythm and that no separate reviewer was set up. That is the same gap failing again.
Chosen cause: cause 1. It is the gap with history; cause 2 is a conflict that is his to resolve.

## Layer
Layer: 2
Why not earlier layers: layer 1 would need him to rule on WORKING_LOOP against his block call, so it is left as an open question for him; the reader check is the existing independent reviewer (separate Sonnet agents), so fixing its source beats adding a new step.
Replaces: n/a

## Check
Check: reader check Q5 (prompt.md): would a reader stop at this sentence because it does not follow from what came before, or because it explains something already clear or not needed? aggregate.py counts Q5 flags. Run on runs/2026-11-03-fb2: V1 round 5 (bad), V2 rewrite, V3 round 4 (second case, the ruled out cards he called confusing).
Result on bad output: PASS, not FAIL. V1 (round 5 cards) got no Q5 flag in any of three runs (runs/2026-11-03-fb2 F1 to F3), so Q5 does not catch this failure.

## Change
Files changed: reference/cs2/reader-check/prompt.md (Q5), reference/cs2/reader-check/aggregate.py (Q1 to Q5)
Instruction lines: +2 / -0
Net growth reason: the reader check had no question on logic or padding; the two lines are the question itself.

## Verification
Fresh run: three fresh Sonnet agents on runs/2026-11-03-fb2/copy_num.txt.
Before: round 5 cards (above)
After: A week that comes up short can feel like failing, and that feeling makes people less likely to keep going. So anything still open rolls over into the next week, and that week takes fewer new Action Items so it still fits the hours they gave.
Check result after: V2 PASS, but that proves nothing while V1 also passes.
Second case: V3, round 4 with the four ways cards: FAIL, Q5 3/3 on S6 and S7 (outcome before the move is explained; the failing feeling does not follow). Q5 catches order problems, not padding that reads as fluent.
Enforcement test: n/a

## Report
Unverified: Q5 missed the flagged output, so no independent check yet catches padding that reads fluently; he remains that check. Q5 is kept because it caught round 4. The rewrite was drafted by this session knowing the fix, so it is not a fresh drafting run. Open for him: WORKING_LOOP's never a text only block conflicts with copy blocks like this one.
