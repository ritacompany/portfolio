# CS2 pickup: how to work this, from the 22 Oct session

Read after HANDOFF.md. Everything here came out of what went wrong or was corrected that day.

## How he wants to be worked with

- Casual and direct. Lead with the answer. One question at most, and only for taste, risk or something only he holds.
- Never ask him how the product behaves. He is the designer: read the Figma frames and the later chats first (reference/dossier-reader-prompt.md). Asking what the record or the screens answer is the thing that annoyed him most.
- His frame blocks 1 to 6 in Figma are his own text. Never edit them. If a change to his wording is wanted, give a before and after in a separate note and let him choose.
- He wants copy finished, not process talk. Do not propose steps again and again. Decide, do it, report.
- The repo is public. Quotations from his research never go in it. His research record is in the private files he uploads, not in git.

## The copy gate (Claude Code only)

- Copy for a section is refused until its block plan has a recorded Opus truth review PASS.
- A review only counts when a sub-agent on Opus gets the exact output of `node reference/review-truth.mjs cs2 --prompt <plan>` pasted word for word as its first message, and the guard hook (.claude/hooks/cs2-copy-guard.mjs, subagent mode) records the verdict from that sub-agent's transcript. Pointing the sub-agent at a file does not record anything. Changing the plan, his frame record or the flow map changes the hash and voids the verdict.
- A browser session cannot run reviews, record verdicts, edit review/ or APPROVALS.md, build in Figma or write layout. It drafts copy and plans; Claude Code runs the checks.

## The failure that repeated all day

Every truth review FAIL was one thing: a claim carrying more detail than the screen or his quoted turn shows (a framing like "the unit of work", a feature the frame does not have like a Refresh button, a reason his words do not give). Write product claims in the frame's own words. Write decision claims only as far as his exact turn goes. Read the live frame before describing it; the reviewer will.

## Order of work for a section

Dossier from the record (extract his turns, one reader, all design chats for the topic accounted for), block plan in claims format, exact-prompt Opus review, then copy to the shape in BROWSER_MODE.md, then voice pass (humanizer, then no-ai-slop detect), then his read.

## What was settled with him on 22 Oct

Pathway order is Networking third, Branding fourth. Focus Areas are linear. The calendar, time and capacity screens are feature onboarding on first entry to the Action Hub; sign up and the quiz are product onboarding. A packed calendar removes scheduled times for the week. Saturday night deadlines stays in his order and the hierarchy comes after the competitive analysis. His frame block 6 is now capacity and cognitive load, with no calendar rows (reference/cs2/outline/frame-changes-22oct.md).

## Open at the end of the day

Cognitive load needs a dossier. Sections 3 to 6 and 10 need plans, dossiers where flows exist, reviews and copy. Sections 7, 8, 9 and 11 need their reviews re-run once the frame record is refreshed, then a voice pass and his read.
