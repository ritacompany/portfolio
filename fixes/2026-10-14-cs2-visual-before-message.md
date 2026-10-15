# Fix: CS2 picks figures and layouts before the message, and keeps reusing the Pathway diagram

Status: not verified

## Evidence
Bad output: Figma 4228:6859 (section 1), read 14 Oct. Headlines with no eyebrows. Block 1 is three
tiles (five Pathway circles, onboarding quiz, calendar screen) for the claim "The route existed, but
nothing said how to move through it". The circles are the journey framework visual reused for
Discovery, Cognition, Networking, Branding, Opportunity.
The post fix slot plan written 14 Oct 13:14 (`layout/section-1.md`, uncommitted) repeats it: block 1
keeps "TextAnd3Images layout 1" with "Media 1 ... The map, first state: five Pathway marks on one line",
and block 2 is "The map from block 1 plus one element". Section 2's plan (block 4) brings the same map
back again.
Expected: message first. The claim, then what the reader has to see to believe it, then how many
figures that takes, then the layout piece that fits that count. A figure appears only where the
message needs it.

## Chain
Input: yes. Copy file with eyebrows, the claims, real screens.
Instruction: step 5 orders claim, form, layout. But the process also assigns a figure to every section
before any message exists: The map, "It appears in every section as the small image beside the real
screen"; step 5, "The map is a form too: bring it back with one change"; the Order table's "Map, as
planned" column; `CS2_COMPREHENSION.md` "One diagram that gets built up ... At rung 2 it is a line with
five marks on it".
Loaded: yes. The 13:14 plan cites the map rule as its reason: "The map starts here, so later sections
can add one element to it".
Conflict: message first (step 5 bullet 1) against map in every section (The map, step 5 bullet 2, Order
table). The map wins every time because it is the only figure already decided.
Enforcement: `check-slot-plan.mjs` checks the table shape and bans Haven and template names. Nothing
checks that a figure is needed by the claim. Its required first column is `Layout piece`, so the
artifact itself is organised by layout, not by message.
Check: none. The Figma frame for section 1 was built before the eyebrow and slot plan fixes and was
never marked stale, so its status ("built, not yet read") sent him to an out of date frame.

## Causes
- Cause 1: the map rule pre-assigns the Pathway diagram to every section | For: three places in the process require it; both plans written after the 14 Oct fixes use it and cite the rule | Against: he agreed the build up diagram on 28 Aug (e3fc556)
- Cause 2: step 5 is one pass whose output is keyed by layout piece, so message and layout are decided together | For: the plan's first column is the layout piece; block 1 kept the 10 Oct three image piece "as built" | Against: the bullets inside step 5 do run claim first
- Cause 3: the section 1 frame is stale | For: built before the eyebrow fix (entry 15 "Eyebrows dropped"), copy since changed to Draft 5 blocks | Against: explains the headers only, not the figures
History: 9 Oct step 5 rewrite (template picked first); 10 Oct two by two removed; 14 Oct Haven and
template content removed, slot plan check added; 14 Oct eyebrow and block shape fix. Same area fixed
three times. The figures came back after each because none touched cause 1.
Chosen cause: 1 with 2. Cause 3 is real but only the headers.

## Layer
Layer: 1
Also applied: layer 3 (step 5 split into a message plan then a slot plan, two files) and layer 4 (the guard hook refuses a slot plan without a passing message plan, a message plan that names a layout piece, and any plan that draws the five Pathways as a row or line).
Why not earlier layers: layer 1 removes the map rule, his decision 14 Oct. Layer 2 is the next one to apply: `check-copy.mjs` line 78 tells every long block to "move detail onto the figure as Label: lines", which makes up figures before step 5 runs. Left for his call since it changes the copy shape he set this morning.
Replaces: n/a

## Check
Check: `node reference/cs2/check-message-plan.mjs` and `node reference/cs2/check-slot-plan.mjs` (route diagram pattern, message plan required) run by the hook; judgment half for a separate reviewer: `fixes/trial-2026-10-14/CHECKS.md` C1 to C5, especially "could the claim be proven with fewer figures?".
Result on bad output: FAIL. The rejected plan (`layout/section-1.md` at a3e358b) fails the route diagram check on lines 9 and 15 and has no message plan; the blind reviewer failed it on C1 for every block, C2 twice, C3 twice and C4 once.

## Change
Files changed: reference/cs2/CS2_PROCESS.md (The map dropped, step 5 rewritten as two passes, Map column removed, section 1 status marks Figma 4228:6859 stale), reference/cs2/CS2_COMPREHENSION.md and reports/Visual storytelling per beat.md (map guidance marked withdrawn), reference/cs2/check-message-plan.mjs (new), reference/cs2/check-slot-plan.mjs, .claude/hooks/cs2-copy-guard.mjs, reference/cs2/test-copy-guard.mjs (message gate cases; stale clean copy fixture fixed, it failed before this change)
Instruction lines: +32 / -34 in CS2_PROCESS.md
Net growth reason: n/a, net is minus 2

## Verification
Fresh run: three structurally different step 5 setups (`fixes/trial-2026-10-14/setup-A.md`, B, C), each run by a fresh agent on section 1 with no access to existing plans, drafts, fixes or Figma. Scored blind by a separate reviewer against C1 to C5, with the rejected plan as a control.
Before: control, block 1 "TextAnd3Images layout 1 ... five Pathway marks on one line"; figures 3 / 1 / 0.
After: setup A, block 1 one real screen, blocks 2 and 3 text only; figures 1 / 0 / 0. Reviewer ranking A, B, C, control; A passed every check on every block.
Check result after: section 1 under A: reviewer PASS on all blocks; SLOTPLAN_PASS. Hook tests: "copy guard discrimination passed", 14 cases.
Second case: section 2 under A: FAIL on 3 of 6 blocks (figures redrawing Label lines, a row across the five Pathways). A was revised (labels count as copy; second figure only if both figure and copy leave a part unproven) and the route check added. Rerun in fresh agents: section 2 FAIL on 1 of 6 (block 3 strip redraws its labels); section 1 FAIL on 1 of 3 (block 1 route screen, named to dodge the pattern; caught by the reviewer).
Enforcement test: `node reference/cs2/test-copy-guard.mjs`: "ok slot plan before any message plan exit=2", "ok message plan naming a layout piece exit=2", "ok clean message plan exit=0", "ok bad Bash into message exit=2".

## Report
Unverified: the second case does not fully pass. Both remaining failures are figures made to hold Label lines, which the copy check pushes into every block. He decides whether labels are written in the copy step or only in pass 1 once a figure is chosen. The route pattern can be dodged by wording, so the reviewer question stays the real check. Existing layout/section-1 to 3 have no message plans and will be refused on their next save, which is intended.

## Round 2, after the blind claim audit (`reports/Self audit of plan logic.md`, six holes)
Changed: labels and captions leave the copy step (check-copy refuses them; cards stay as text items); the message plan answers must agree (nothing missing means no figure, one figure line per figure with Proves:, digit counts); slot plans match image slots to figure counts, any non text slot counts as an image, block numbers must exist; the Pathway route rule is shared, wider and only lifted by his line in APPROVALS.md, which Claude cannot write; the fewer figures review runs as a headless Claude inside the hook and fails closed; text blocks in a row are set apart by layout, never by a figure; the 7 column rule moved to step 8; a post hook checks any CS2 file a shell command changed.
Second audit found five bypasses (renamed slots, reworded routes, phantom blocks, word counts, shell writes). All five replayed and now refused; a script file write was caught after the fact.
Fresh runs: sections 1 and 2 pass every mechanical check. The reviewer question, asked by a separate agent, failed section 1 block 1 (Growth Journey screen shows the Pathways in sequence) and section 2 blocks 2 and 5 (copy already says it). So those plans would be refused at save, which is the gate working.
Still unverified: the headless reviewer has not run live, because the claude CLI login has expired; until he logs in once, every slot plan save is refused. The reviewer leans toward text; whether section 2 with one figure in six blocks is too little is his taste call.
