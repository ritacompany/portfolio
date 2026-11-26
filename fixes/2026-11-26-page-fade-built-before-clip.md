# Fix: the page fade went into the site before he saw any clip of it

Status: not verified

## Evidence
Bad output: commit b51c0ce on claude/mondai-collection, "Page change: plain fade through the page colour, title morph removed (his yes, 26 Nov)", changed site/css/page-transition.css, site/index.html, site/mondai/index.html and site/mondai/framework/index.html, and published a preview. docs/motion/page-transition/ held only style_guide.md: no state_list.md, no clip, no review_log.md. The yes it rests on answered my question in the research session, "Build the plain fade as the plan sets it out?", which asked for a build on a written plan. His words after (26 Nov): "We have an animation methodology, so it should always do the same thing, right? Like you show a video, and then if I like it enough, then I'll have you build it so I can feel it."
Expected: a clip of the fade, reviewed (P0 to P2, fresh eyes), shown to him; the site change only after his yes to that clip; then he feels it on the preview.

## Chain
Input: the plan gave exact timings, so a clip could have been made. But nothing in the repo could film motion that runs across two pages: scripts/render.mjs drives window.seek(t) on one page only.
Instruction: .claude/motion-rules.md, Reference first: "write style_guide.md... Then state_list.md. Then build." The review loop is titled "before Chadwick sees anything" but no line said he sees a clip and says yes before the site build. code-motion's steps run render, review, determinism, and stop.
Loaded: yes; the lead session wrote docs/motion/page-transition/style_guide.md in the house format, so the rules were in use.
Conflict: motion-rules.md Scope: "Page entrances that already run on the browser clock (text fades, image reveals, smooth scroll) stay as built. The renderer cannot capture them frame by frame, so they are reviewed in the browser, not rewritten to fit this contract." A page change runs on the browser clock, so it read as exempt from the clip and the review loop. docs/motion/mondai-motion/style_guide.md says the same for the entrances. My research brief (from the lead) also said "the build happens after Chadwick picks", and my PLAN.md and closing question offered a build, not a clip.
Enforcement: .claude/hooks/site-review-gate.mjs refuses a site change without a recent yes, but any yes counts, so a yes to a plan opened the site.
Check: node scripts/motion-check.mjs log docs/motion/page-transition/review_log.md fails (no log), but nothing ran it before the site change.

## Causes
- Cause 1: the browser clock exemption plus no tool to film browser clock motion | For: the Scope line above; render.mjs is seek only; the lead wrote a style guide but no state list or clip, which is exactly what the exemption allows | Against: a session could have screen recorded the pages by hand
- Cause 2: the site gate accepts a yes to anything, and the yes asked for was a build yes on a document | For: my question text; the hook's APPROVE regex; the commit message cites "his yes" | Against: he did say yes to building, so the gate did what it was told
History: fixes/2026-11-09-button-motion-skipped-studio.md (scope line rewritten so UI motion enters the studio, layer 2, never verified), fixes/2026-11-09-interactive-called-done-before-felt.md (text rule: not done until felt, not verified), fixes/2026-11-09-phase-3-built-without-his-checkpoint.md (the site-review-gate hook). Two text fixes in this family have not held, so this fix does not add another rule for the agent to remember.
Chosen cause: both, because each alone lets it through: the exemption removed the clip, and the gate let a plan yes stand in for a clip yes.

## Layer
Layer: 4
Why not earlier layers: layers 1 and 2 are applied too, in support (the exemption line rewritten, the recorder added). Layer 1 alone (deleting the exemption) leaves no way to film a page change and nothing stopping a session that skips the clip; layer 2 alone (the recorder) makes a clip possible but not required; layer 3 does not fit, the steps were in the right file and order, just not required.
Replaces: the Scope exemption line and the Reference first line in .claude/motion-rules.md (rewritten, not added).

## Check
Check: the site hook, given his yes and an edit to site/css/page-transition.css while the piece has no passing review log, must refuse it (exit 2). Command: echo the 26 Nov edit with transcript "yes then give me a preview" into node .claude/hooks/site-review-gate.mjs; and node .claude/hooks/tests/site-review-gate-cases.mjs.
Result on bad output: FAIL. The hook as committed before this fix allowed it (exit 0). Against the old hook the new motion cases fail 5 of 9: "FAIL yes does not lift a motion file with no review log: exit 0, want 2" and four more, 24/29.

## Change
Files changed: .claude/hooks/site-review-gate.mjs (motion files and added motion need a passing review_log.md, his yes does not lift it), .claude/hooks/tests/site-review-gate-cases.mjs (9 motion cases on a fixture project), scripts/record-browser.mjs (new: films the real site, slowed ten times and sped back up so no frame is dropped; refuses a take with dropped frames), .claude/motion-rules.md (Scope exemption line and Reference first line rewritten), .claude/skills/code-motion/SKILL.md (step 3 names the recorder; step 7 added)
Instruction lines: +1 / -0 (motion-rules: two lines rewritten in place; code-motion: step 3 rewritten in place, step 7 added)
Net growth reason: step 7 says what happens after the clip passes review (send it, build after his yes). It names the hook rather than asking the agent to remember; the hook is the enforcement.

## Verification
Fresh run: two Sonnet subagents with no conversation context, each given only .claude/motion-rules.md and .claude/skills/code-motion/SKILL.md and a new motion task, asked to list their steps, what he sees first and whether site/ changes before he answers. They described the process; neither built anything, so this tests what the rules now say to a fresh reader, not a full build.
Before: the 26 Nov run changed site/ first and showed a preview of the built site.
After: case 1 ("hold the nav still while the page fades"): style guide and state list, build in site/motion-lab or site/dev "not site/css/page-transition.css", film with scripts/record-browser.mjs at 1440x900 and 390x844, review loop, "Send the clip"; site/ changed before his answer: "No", quoting "It is built into site/ only after his yes to the clip; the site hook (site-review-gate) refuses a motion file change until the piece's review_log.md passes."
Check result after: PASS on the hook: SITE_GATE_OK 29/29, and the real 26 Nov edit with his yes now exits 2 with "Blocked: motion goes clip first. site/css/page-transition.css belongs to the motion piece page-transition, and its review_log.md does not pass".
Second case: case 2 ("section titles slide in a little as you scroll" on the framework page): same order, first thing he sees is "the clip... It is not a change on the live site", site/js/mondai-motion.js "stays untouched until he says yes". PASS on both.
Enforcement test: the 26 Nov edit replayed against the new hook with "yes then give me a preview" as his latest message: exit 2 (output above). Against the old hook the same call exits 0.

## Report
Unverified: the fresh runs described the process rather than carrying out a full build, so the first real motion task after this is the full test. Also: the hook reads review_log.md, which the agent writes, so a session could write a fake passing log; the hook cannot tell whether he watched the clip. His yes is still what opens the site, so the last check is his: when a session asks for a site yes on motion, ask to see the clip first. Existing pieces now gated: mondai-motion (no review log yet), so the next change to site/js/mondai-motion.js or site/css/mondai-motion.css needs a recorded clip and a review round first.
