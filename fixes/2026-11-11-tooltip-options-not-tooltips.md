# Fix: the pill tooltip options were not tooltips

Status: not verified

## Evidence
Bad output: the first prototype at site/dev/pill-tooltips/ (11 Nov, never committed). Option A: "Tap toggles on touch" with a click handler. Option B: "Click, tap, Enter or Space. No hover reveal". Option C: "click pins it", plus a bottom sheet dialog on phones. Two of the three were other components (a toggletip and a popover with a sheet), and the third added click.
Expected: options that are all tooltips: open on hover after a delay and on keyboard focus, close on pointer leave, blur and Escape, hoverable, role tooltip with aria-describedby, no click (WAI-ARIA APG tooltip pattern; NN/g tooltip guidelines; WCAG 1.4.13). Options differ only inside that pattern.

## Chain
Input: yes. The Figma tooltip 4264:7197 and the brief, which named the trigger "hover, focus and tap on touch".
Instruction: CLAUDE.md design rules ask for each region to be grounded in a named pattern. Nothing asks for the pattern's definition to be looked up before options are drawn.
Loaded: yes, both in context.
Conflict: the standing rule ANTI-CONVERGENCE ("Different structure, not one idea reworded") pushed the options apart, and inside a fixed pattern the only way to get different structure was to leave the pattern. The brief's "tap on touch" read as a click trigger.
Enforcement: none. The creative level line ("Say which one at the top") was not written, so the task was never named L1 (matching the Figma box), where anti-convergence does not apply.
Check: none on the prototype before it reached him.

## Causes
- Cause 1: anti-convergence was applied to an L1 match, so options varied the component instead of the behaviour inside it | For: B and C are exactly other components; no creative level was declared | Against: the brief did ask for 2 or 3 options
- Cause 2: patterns were named from memory and the research came only after his message | For: the APG and NN/g reads that settle it were fetched after he objected; NN/g says outright that touch screens have no tooltips | Against: option A was close to the APG pattern without them
History: the creative level rule already exists in the standing rules and was skipped here, so another rule like it would repeat a failed experiment.
Chosen cause: both. Cause 2 let cause 1 through: a ten minute read of the pattern would have ruled out click before any option was drawn.

## Layer
Layer: 3
Why not earlier layers: proposed only, not applied. 1, no stale or conflicting line to delete, the anti-convergence rule is right for L2 and L3. 2, the source is the option making step, not a file.
Replaces: n/a
Proposal for his yes: in the design brief template for interaction options, make "pattern definition, with source" a required first slot that must be filled before the options slot. Not saved, because rule changes need his approval.

## Check
Check: `grep -c "addEventListener('click'" site/dev/pill-tooltips/index.html` must print 0, and every option section's spec must open on hover and focus only.
Result on bad output: FAIL. The first prototype had three click listeners (options A, B and C), quoted in this conversation; it was never committed so it cannot be re-run from git.

## Change
Files changed: site/dev/pill-tooltips/index.html (rebuilt as two true tooltips). No process files changed.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not done.
Before: three options, three click paths.
After: two options, hover after 300ms and focus only, Escape, hoverable, aria-describedby, no tooltip on touch. grep for click listeners prints 0.
Check result after: PASS on the rebuilt prototype, in this context only.
Second case: not run.
Enforcement test: n/a

## Report
Unverified: no fresh run. The layer 3 template slot is a proposal waiting on his yes; until then nothing stops a later session from repeating this.
