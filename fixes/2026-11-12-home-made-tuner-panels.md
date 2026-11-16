# Fix: sessions keep building their own option panels that float over what he is tuning

Status: verified

## Evidence
Bad output: the Start of week carousel options tool (site/dev/week-carousel/index.html, first version, untracked and since replaced) was a home made overlay panel over the carousel. His words in that session: the panel sat over top of it, so he could not see it as he made changes. Same pattern still live in site/motion-lab/contact-goo-tuner.html, contact-liquid-tuner.html and contact-button-playground.html (sliders in a grid under a 340 px stage, so the stage scrolls away while he tunes the lower groups).
Expected: every tuner uses the shared edit panel (site/dev/preview/edit-panel.js), docked beside the page, so the result stays in view while he changes values.

## Chain
Input: yes. The shared panel existed since c1a2604 (10 Nov) and was docked from 058021f (11 Nov).
Instruction: .claude/motion-rules.md Scope says interactive pieces are tuned on "a published tuner page (the shipped code inlined, sliders for every value he would feel, Copy settings ...)" and ends "Template: scripts/motion-tuner/".
Loaded: motion-rules.md is read on demand for animation work; an options page for a layout choice may not count as animation work, so it may not be read at all.
Conflict: the only template it names, scripts/motion-tuner/contact-goo.py, builds a home made slider grid. The rule points sessions at the pattern he rejects. Nothing anywhere names the shared panel as the surface for tuners.
Enforcement: none. Nothing checks a new dev or motion lab page for its own controls.
Check: none before he opened it.

## Causes
- Cause 1: the one instruction that exists points at the wrong template | For: motion-rules.md line 11 names scripts/motion-tuner/, whose output is the rejected pattern; no doc names edit-panel.js | Against: the carousel session knew the panel existed once told
- Cause 2: using the shared panel on a standalone page was awkward, so building one was easier | For: it needed a stylesheet link, a script tag and a localStorage hack to open on the right tab, and at 800 px it dropped into a sheet that covered the page | Against: a session could still have used it
History: fixes/2026-11-09-interactive-called-done-before-felt.md added the tuner rule and the scripts/motion-tuner/ template; that is the line now pointing the wrong way. fixes/2026-11-11-docked-panel-broke-tablet.md set the 1024 px dock floor.
Chosen cause: both. Cause 1 sends sessions to the wrong pattern; cause 2 made the right one costly.

## Layer
Layer: 4
Why not earlier layers: layer 2 is applied too (the panel itself, see Change) but cannot stop a session building its own panel; layer 1 alone (repoint the template) still relies on the file being read, which an options page may not trigger. Layer 3 does not apply: there is no template a session fills in for a tuner.
Replaces: motion-rules.md "Template: scripts/motion-tuner/." and "sliders for every value he would feel, Copy settings"

## Check
Check: node .claude/hooks/tuner-panel-guard.mjs, given the page path as its file argument, (exit 2 means a page in site/dev or site/motion-lab builds its own sliders or selects without the shared panel)
Result on bad output: FAIL (exit 2) on contact-goo-tuner.html, contact-liquid-tuner.html, contact-button-playground.html and (before its exempt meta) cs2-falling-behind-editor.html; exit 0 on site/dev/week-carousel/index.html and spring-sample.html.

## Change
Files changed: site/dev/preview/edit-panel.js and edit-panel.css (layer 2: opens on the first tab with controls; data-fluid docks a standalone page down to 480 px so it sits beside the page in the 800 px pane; loads its own CSS so the include is one line; narrow selects drop under their label). Approved 12 Nov ("Yes, save both", then allow setup edit) and saved: .claude/hooks/tuner-panel-guard.mjs plus its PostToolUse entry in .claude/settings.json (layer 4), the motion-rules.md wording, the exempt meta on cs2-falling-behind-editor.html.
Instruction lines: +1 / -0 in motion-rules.md (one new bullet; two phrases in the Scope bullet reworded in place)
Net growth reason: no line anywhere named the shared panel; the hook message carries the how to, so the doc only needs the pointer.

## Verification
Fresh run: two fresh subagents, each given only the repo and a task with no mention of the panel. A: "build an options page so Chadwick can tune the card hover effect" (site/dev). B: "make a tuner page for the spring in spring-sample" (site/motion-lab).
Before: carousel options as a home made overlay panel.
After: A put 10 controls in the shared panel (Motion tab, data-fluid); B put 12 controls in the shared panel and read the new motion-rules line to get there. In the built-in browser at 800 px both docked: page 480, panel 320 beside it, nothing over the content.
Check result after: PASS, tuner-panel-guard exit 0 on both pages. Test pages deleted after the check.
Second case: B is the second case (different page, different folder, spring instead of hover).
Enforcement test: with the hook live, writing site/dev/zz-guard-probe/index.html with its own range input was blocked by the PostToolUse hook with the panel instructions; probe deleted.

## Report
Unverified: none. Verified by two fresh runs. Neither run was bounced by the hook (both chose the panel from the docs), so the hook block itself is shown only by the probe. Left as is: four older motion-lab tuners stay home made until reopened (see the audit notes).
