# Fix: a session said Figma was blocked because its stored pointer named a file the design had left

Status: not verified

## Evidence
Bad output: on 20 Nov a session read the Portfolio Design file because six repo pointers said CS2 lived there, hit a View seat limit and told Chadwick Figma was blocked. The frame was in Desktop 1 (MVP) all along (PR #27 description).
Expected: the session opens the Figma link the task gave it, and when that fails it names the file and frame it tried and asks him for the current link, without calling Figma blocked.

## Chain
Input: the task did not carry a link; the session took the location from pointers written into resume files.
Instruction: the pointers were the instruction (six repo files restating a file key).
Loaded: yes, the pointers were read; they were stale.
Conflict: PR #27 proposed one registry as the only home for locations. His review board note, 27 Nov: he moves designs back and forth between his personal portfolio account and this one, so any stored location goes stale and the documentation has to be fixed every move.
Enforcement: none. PR #27's stop hook depended on the registry he rejected.
Check: none before he saw the message.

## Causes
- Cause 1: a stored location goes stale when he moves a design between accounts | For: his 27 Nov note; the 20 Nov frame had moved | Against: none found
- Cause 2: sessions call Figma blocked on the first failure instead of asking | For: the 20 Nov message | Against: with a correct link the first try succeeds
History: PR #27 (20 Nov) built a registry plus hooks; closed unmerged on his call, 27 Nov.
Chosen cause: 1, with 2 as the visible symptom. Removing stored locations removes the stale source; the ask-for-the-link line covers the symptom.

## Layer
Layer: 6
Why not earlier layers: 1, the registry was never merged, so there is nothing to delete beyond closing #27 (done); 2, the source is his moving designs, which is his workflow, not a file here; 3, no step is misplaced; 4, a hook would need to know where designs live, which is the registry he rejected; 5, not stage specific.
Replaces: none; it is the line PR #27 would have added to CLAUDE.md in place of its registry pointer, in a lighter form.

## Check
Check: reviewer question on a session's reply after a Figma read fails: does it name the file and frame it tried and ask for the current link, and does it avoid saying Figma is blocked?
Result on bad output: FAIL, the 20 Nov reply said Figma was blocked and named no link to ask for.

## Change
Files changed: CLAUDE.md (new section "Finding his Figma"); PR #27 closed.
Instruction lines: +3 / -0
Net growth reason: his explicit choice on 27 Nov (question card: close #27 and use the lighter rule); nothing existing covered it.

## Verification
Fresh run: not run.
Before: "Figma is blocked" (20 Nov, PR #27 description)
After: not produced yet.
Check result after: not run.
Second case: not run.
Enforcement test: n/a

## Report
Unverified: no fresh session has hit a failed Figma read since the change, and nothing enforces the line; it is a request. He judges it the next time a session cannot open a Figma link.
