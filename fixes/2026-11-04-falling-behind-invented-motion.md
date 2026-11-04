# Fix: Falling behind Drift clip shipped motion details he never asked for and dropped ones he did

Status: not verified

## Evidence
Bad output: site/motion-lab/cs2-falling-behind-drift.html at fde1839. `chip.style.opacity = tag * (1 - untag)` removes the ROLLOVER chip on landing. `rect.setAttribute("stroke-dashoffset", ...)` draws an outline trace. Stars carry `trail: near && r() < 0.3 ? ...` and move only left to right. Labels render "This week" in mixed case.
Expected: chip stays after landing; the green glitches or flickers in (his earlier message asked for a glitchy, brand adjacent load in); pixels wander up and down while drifting slowly right, no trails; labels in caps.

## Chain
Input: yes. His message before the Rebuild round asked for a pink rollover tag before it moves, a green outline with a cool load in, and something glitchy or radar like.
Instruction: docs/motion/cs2-falling-behind-drift/style_guide.md, written by the agent, turned his words into specifics he never gave (chip goes on landing, outline drawn around the card, trails).
Loaded: yes, the agent wrote and followed it in the same turn.
Conflict: the style guide's own lines conflict with his message: "it lands; the chip goes, the green outline draws around it" versus his "add a pink rollover tag ... before it moves over".
Enforcement: none. Nothing separates what he said from what the agent filled in.
Check: none. The review rounds score motion quality, not whether each element matches his words.

## Causes
- Cause 1: the agent filled gaps in his spec with its own choices and presented them as his direction. | For: the trace, trail and chip removal appear nowhere in his messages. | Against: some gaps genuinely needed a value.
- Cause 2: motion is hard to describe in words, so every spec he gives is lossy and any builder will guess. | For: direction B, Rebuild stills and Drift each misread a described motion. | Against: the chip removal contradicted words he did give.
History: fixes/2026-11-03-falling-behind-image-repeats-screen.md and 2026-11-03-falling-behind-padded-cards.md are earlier misses on this same block. HANDOFF lesson 4 Nov "show a quick still before calling it picked" did not prevent this one.
Chosen cause: both. Words lose detail and the agent fills the loss with invention. The fix moves the open choices into his hands.

## Layer
Layer: 2
Why not earlier layers: 1, no stale line to delete; the conflict was created fresh each round.
Replaces: n/a

## Check
Check: reviewer question per element of his message: does the output do exactly what he said, and is every value he did not specify exposed as a control rather than baked? 
Result on bad output: FAIL. Chip removed on landing, trace instead of glitch, trails, mixed case labels, no controls.

## Change
Files changed: site/motion-lab/cs2-falling-behind-editor.html (new editor: every open choice is a control he sets, including glitch styles, field motion, item colours and per item placement); this record.
Instruction lines: +0 / -0
Net growth reason: n/a

## Verification
Fresh run: not run. The real test is his own use of the editor.
Before: Drift clip at fde1839.
After: pending his session in the editor.
Check result after: not run.
Second case: not run.
Enforcement test: n/a

## Report
Unverified: whether the editor lets him reach the look he wants. He runs it, presses Copy settings, and the values get baked into the motion page and rendered.
