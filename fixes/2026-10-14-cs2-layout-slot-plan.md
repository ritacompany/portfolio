# Fix: CS2 layout borrows from Haven and template content and jumps to a Figma build

Status: verified

## Evidence
Bad output: section 1 build log, `draft/CS2-section-1.md` entry 15: "Rebuilt 4228:6859 on the Haven
grid from duplicated templates: Robinhood 03 for beat titles, Midjourney 05 T3I for beat 1 ...
Midjourney 10 stats rows for beat 3". Entry 7: "Haven pattern: Heading/20 eyebrow, Heading/40 claim,
Body/16 left column, media right ... Rebuilt same day from duplicated template sections". Section 2
step 5 output (`draft/CS2-section-2.md`): a beat list headed "Template and Haven spans", then "Built in
Figma at the lower end of Workstation". His report: circles copied from Haven, template images and
diagrams carried over, Figma build started straight from layout.
Expected: per section, a slot plan in words. For each layout piece, each slot, what goes in it and
why. No visuals, no Figma, nothing from Haven or from what a template slot already holds. Building
only when he says so.

## Chain
Input: yes. Copy files, claims, the map and the LEDGER decoder were all available.
Instruction: the process told sessions to do exactly what went wrong. `CS2_PROCESS.md` Layouts said
"following the Haven CS Master (3300:12596) for type, motion and reveals", "duplicate it into the CS2
master and fill it", "adapt it to the Haven grid ... and Haven text styles" and "Build the section in
Figma directly". Step 5 said "Diagrams follow the Haven CS Master's diagram style", "state it on the
Haven grid", "layout comes from the Figma templates" and ended "After his yes, Claude builds the section
in Figma on the Haven grid". The Map said each section "draws" its state inside the layout step.
Loaded: yes. Step 5 is the step being run, and `case-study-rules.md` sends every layout to it.
Conflict: no rule opposed these lines. The report `reports/Visual storytelling per beat.md` repeated
them: line 63 kept "diagrams in the Haven CS Master style ... concept shared before building", (d)
"State it on the Haven grid", (e) "Building starts only after his yes", and six more Haven grid
mentions. `case-study-rules.md`: no hits (line 27 only points to step 5).
Enforcement: none. Step 5 output had no required shape and no check.
Check: none before he saw the Figma frame.

## Causes
- Cause 1: the process text itself instructs borrowing and building | For: nine lines in CS2_PROCESS.md and the report name Haven as the style source, tell sessions to duplicate and fill templates, and make the Figma build the end of step 5 | Against: none found; the builds do exactly what those lines say
- Cause 2: precedent in the section files steers new sessions | For: section 1 entries 6, 7, 11 and 15 and section 2 entries 6 and 7 log Haven pattern builds from duplicated templates | Against: they are logs of past work, not instructions; the fresh runs after the fix read them and did not follow them
- Cause 3: no defined output, so "layout" defaulted to a build | For: step 5 never named an artifact other than the Figma frame | Against: a beat list did exist as an interim output
History: 10 Oct fix (f319972) removed Haven's two by two from the working files; the Haven style lines were left, so borrowing moved from the matrix to circles and type. 9 Oct rewrite of step 5 kept "diagrams in the Haven CS Master style" and the build as its finish.
Chosen cause: 1, with 3. The instructions were followed as written; adding a rule against them would leave the conflict in place.

## Layer
Layer: 1
Also applied: layer 3 (step 5 outputs a slot plan file; building moves to step 8) and layer 4 (guard hook checks every slot plan save).
Why not earlier layers: layer 1 is used (the conflicting lines are deleted). Layer 3 restructures: step 5's output becomes a slot plan file and building moves to its own step 8. Layer 4: the existing CS2 copy guard hook now runs `check-slot-plan.mjs` on every save to `reference/cs2/layout/section-N.md` and refuses a failing one. Layer 2 does not fit: the source is the process text, handled at layer 1.
Replaces: n/a

## Check
Check: `node reference/cs2/check-slot-plan.mjs <file>`. Fails without a `| Layout piece | Slot | What goes in it | Why |` table of filled rows, or on Haven, Figma node ids, duplicating or use_figma, template source names (Robinhood, Midjourney and the rest), carried over template imagery, or embedded visuals. Judgment half, for a separate reviewer: is anything taken from Haven or from template content rather than from the section; does it call for visuals or Figma now; is it a slot plan.
Result on bad output: FAIL.
Section 2 current step 5 output: "no slot plan table ... (found 0 rows)", "line 1: Figma build reported as done", "line 24: Haven named ... Template and Haven spans", SLOTPLAN_FAIL.
Section 1 current output: no slot plan table, Haven named, duplicating, node ids 4228:6859, Robinhood and Midjourney named, SLOTPLAN_FAIL.
Controls: a clean two row plan prints SLOTPLAN_PASS; the same plan with "kept from the template, Haven style circles" prints SLOTPLAN_FAIL.

## Change
Files changed: reference/cs2/CS2_PROCESS.md (Map, Layouts, step 5, step 6 wording, new step 8 from the moved build location lines), reports/Visual storytelling per beat.md (Haven grid renamed portfolio grid, proposal marked superseded, build line), reference/cs2/check-slot-plan.mjs (new), .claude/hooks/cs2-copy-guard.mjs and reference/cs2/test-copy-guard.mjs (guard extended to slot plans)
Instruction lines: +39 / -59
Net growth reason: n/a, net is minus 20

## Verification
Fresh run: two general purpose subagents, each given only the repo and "Produce the step 5 output for section 2" (and section 3). Outputs at reference/cs2/layout/section-2.md and section-3.md. Their transcripts show only Bash, Write, Edit and the handback: no Figma tool calls.
Before: "| # | What the reader must understand | Form and reference | Template and Haven spans |" then "Built in Figma at the lower end of Workstation".
After: "| TextAnd1Image layout 1 | Media, cols 7 to 12 | Described in words, not drawn: one week as a bounded region ... A single heavy right edge labelled due Saturday night ... | One figure holds both decisions the copy ties to the same line ... |"
Check result after: section 2 SLOTPLAN_PASS (9 slots). Separate reviewer: PLAN s2: PASS (no Haven, no template content, no visuals or Figma, is a slot plan).
Second case: section 3, SLOTPLAN_PASS (10 slots); reviewer PLAN s3: PASS.
Enforcement test: `node reference/cs2/test-copy-guard.mjs`: "ok slot plan borrowing from Haven exit=2", "ok clean slot plan exit=0", "ok bad Bash into layout exit=2", "copy guard discrimination passed".

## Report
Unverified: none for the slot plan. The build gate (step 8 only when he says) is process text; no hook stops a Figma write. The section 1 and 2 logs that record Haven pattern builds are left as history.
