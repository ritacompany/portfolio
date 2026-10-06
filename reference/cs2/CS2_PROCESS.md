# CS2 process

Agreed 2026-10-06. This is how CS2 gets written. It replaces `CS2_PLAN.md` and `CS2_METHOD.md`,
which are kept for history only.

Any Claude session, on any account, picking up CS2 starts here: read this file, then the status
table at the bottom, then carry on from the first section that is not approved.

---

## The idea

Write the framework sections first, one at a time, by talking them through. The intro and the story
that ties it together come last, written from what the sections turned out to be.

Why: every earlier round picked a narrative first and fitted the material into it, and every one
failed. Here the material comes first. The story is found at the end, not imposed at the start.

## What carries over

- **The concept ladder** in `CS2_COMPREHENSION.md` is kept as an ordering rule only: the order the
  sections are worked in, and the rule that no product term appears before the reader needs it.
  It does not decide what goes in a section. The conversation does.
- **The drafts** in `draft/` for rungs 0 to 3 are provisional. Rung 3 gets revisited when its
  section comes up. Rungs 0 and 1 are the intro and get rewritten last.
- **The reasoning files** in `reasoning/` are reference to search, not a script to follow.
- **The corrections** recorded in `CS2_COMPREHENSION.md` still stand: audience, no unsourced hiring
  history, no naming the user's problem for them, origin story belongs to CS1, mobile to web stays
  out.

## No pre-picked findings

Research and caveats are not assigned to sections in advance. They come up in the conversation for a
section when they matter there. Claude does not decide ahead of time which finding a section is about,
because that shapes the section and invites citing things wrongly.

## The loop, per section

1. **Open.** Claude names the section and what it covers in one or two lines. Nothing else prepared.
2. **Talk it through.** Chadwick talks about it conversationally: what happened, what was decided,
   what connects to what. Claude asks questions and goes and finds the things he mentions in the
   archive, Figma, Notion or the record, and brings back what it found with where it found it.
3. **Draft.** Claude writes the section from the conversation. Every claim traces to a source.
   Nothing is asserted that came from neither Chadwick nor a source.
4. **Voice pass.** Run `humanizer` over the draft, then `no-ai-slop` in detect mode as a second
   check. Both live in `.claude/skills/` in this repo so they work on any account. Then the house
   copy rules: no em or en dashes, no hyphen pair as a dash, no Oxford commas, sentence case.
5. **Review.** Chadwick reads it. Changes go back to step 2 or 3, not patched on top.
6. **Save.** On approval, the section goes in `draft/`, the status table below is updated and the
   change is committed and pushed to GitHub in the same step. Nothing approved lives only on one
   machine.

Also commit and push at the end of every working session, even mid section, with the status table
saying where the conversation stopped.

## Order

| # | Section | Ladder rung | Status | File | Where it stopped |
|---|---|---|---|---|---|
| 1 | The route: Growth Journey and Pathways | 2 | Provisional draft | `draft/CS2-rungs-0-2.md` | Not yet talked through under this process |
| 2 | The week and Action Items | 3 | Provisional draft | `draft/CS2-rung-3.md` | Not yet talked through under this process |
| 3 | Capacity and target date | 4 | Not started | | |
| 4 | Pace | 5 | Not started | | |
| 5 | Scheduling and rollover | 6 | Not started | | |
| 6 | Recalibration | 7 | Not started | | |
| 7 | The generated content | 8 | Not started | | |
| 8 | Handoff and the team | 9 | Not started | | |
| 9 | Intro: who it is for and the situation | 0 and 1 | Last | | |
| 10 | The story that ties it together | all | Last | | |

The order follows the ladder because each section leans on the terms of the one before. Chadwick can
reorder it.
