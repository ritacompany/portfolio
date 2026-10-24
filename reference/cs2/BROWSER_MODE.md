# CS2 in the browser

How CS2 carries on from Chadwick's second Claude account (claude.ai in the browser) while the main
account's usage limit resets. The browser session writes. It never builds, approves or saves. Everything it
makes comes back as one return packet, and Claude Code runs every check on it before anything is saved.

If you are Claude in the browser, this file is your brief. Read all of it before replying.

## How a session starts

Chadwick sets nothing up. He opens a chat on his second account with the portfolio repo attached from
GitHub, as he always does, and says something like pick up where we left off. Then:

1. Read `reference/cs2/HANDOFF.md` and tell him, in two or three lines, where CS2 stopped, the next
   action and the `Updated:` time, so he can see it is current. Ask him nothing first.
2. Start on the next action.

If `HANDOFF.md` is not in what you can see, say that in one line: the chat needs the portfolio repo
attached. Do not work from memory or from an older copy.

## Research

His research record lives on his Mac (`~/Documents/CS2-research/`), never in GitHub, because the repo is
public. Work from what the repo holds: the section drafts, `reasoning/` and the notes in `draft/`. When a
claim needs a finding that is not there, do not guess and do not ask him to fetch it. Put it under
"Waiting for Claude Code" in the handoff, keep it out of the copy and carry on.

## What the browser session may do

Loop steps 1 to 4 in `CS2_PROCESS.md`, and pass 1 of step 5:

1. Open the section and bring the reference pull from `CS2_REFERENCE_INDEX.md`.
2. Talk it through, following "How to run the conversation" in `CS2_PROCESS.md` exactly.
3. Draft the copy for `copy/section-N.md` and the notes for `draft/CS2-section-N.md`.
4. Voice pass: apply the humanizer skill, then no-ai-slop in detect mode, from the skill files in
   `.claude/skills/` in the repo.
5. Pass 1 only: draft the message plan for `message/section-N.md`.

## What it never does

- No Figma, no building, no layout or slot plan (`layout/`), no review verdicts (`review/`), never
  `APPROVALS.md`. Those need hooks that only run in Claude Code.
- No story review. It is recorded by a hook from a separate reader, so the browser cannot run it. Claude Code
  runs it at intake.
- Never marks anything approved and never edits the status table. Decisions he makes in the chat go in the
  handoff under "Decided in chat, not yet in files", and Claude Code records them.
- Never says a check passed unless it ran the script and saw the pass line. Checking by hand against the
  list below is fine; say that is what was done.
- No quotations from the research reports in any file. The repo is public. Name the report instead.

## Copy rules

Claude Code refuses any copy that breaks these (`check-copy.mjs`). Write to them from the start so intake
does not bounce.

Shape:

- First line `Section: N`. Then blocks, each starting `## Block N`.
- Each block has an `Eyebrow:` line, a `Headline:` line that states the claim, optional `Card:` lines and
  up to three body paragraphs, each at most 150 words and 300 in all (24 Oct: he asked for long paragraphs
  that carry the reasoning).
- The eyebrow names the topic and never repeats the headline.
- A headline runs 12 to 25 words, the length of his own: a full sentence, sometimes two, that says what the
  person needs or why the design does what it does. Never a short label.
- `Card: label | title | body`. Label and title at most three words each, body at most two sentences.
- No `Label:` or `Caption:` lines. Figure text is not copy.
- `Aside: name | one sentence` can caption the research behind a decision. At most one per block, name at most
  four words, one sentence of at most 25 words.
- Motivation and UX principles may be reasoned with in the body (24 Oct, his ask), but never written as a tool
  used, such as "we used loss aversion"; say what the principle means for people.
- The sections are one story: name the thread before writing and open each section from the one before.

Words:

- No colleague names: Betsy, Michael. No sentence that names a person as the one who said, wanted,
  suggested, told, proposed, built, wrote, designed, decided, pushed, insisted, argued, came up with or
  handed something.
- No quotation marks, double or single. No quotes from anyone.
- No dashes of any kind, and no spaced hyphen between words.
- No Oxford commas.
- No two by two in words: two by two, 2x2, 2 by 2, matrix, quadrant, upper right, sat where, in the corner.
- AI vocabulary: tapestry, landscape, pivotal, underscore, delve, seamless, leverage, robust, testament,
  fast-paced. Also no negative parallelism (not just X, it was Y; didn't just), no summary closer
  (Ultimately, In the end, In short, In summary) and no moralizing closer (the importance of).

Product terms appear only from the section that introduces them:

- `Growth Journey` from section 1
- `Pathway` from section 1
- `week` from section 2
- `Action Item` from section 2
- `Action Hub` from section 2
- `target date` from section 3
- `rollover` from section 5
- `recalibrat` from section 6 (recalibrate, recalibration)
- `handoff` from section 8

Message plan (`check-message-plan.mjs`): first line `Section: N`, one `## ` block per copy block, each with
`- Claim:`, `- What the reader has to see:`, `- Moves:` (ids that exist in `CS2_REFERENCE_INDEX.md`) and
`- Images:` with a count, then one `- Image N: <what it holds> | Supports: <the point>` per image. No
layout piece named. No image that shows the Pathways as a row or line.

If this chat can run code, recreate `check-copy.mjs` from the repo word for word, run it on the draft and
report its last line as printed. Otherwise check by hand against the list above and say so.

## The return packet

Send it when he says packet, wrap up or done, and offer it whenever the chat has grown long. Copying it
into Claude Code is the only thing he does by hand, so it carries everything. It is the whole
output of the session. Anything not in it is lost. Send it as one code block, exactly in this shape:

```
CS2 RETURN PACKET
Section: N
Loop step reached: N

=== FILE reference/cs2/draft/CS2-section-N.md ===
(the whole file, with its Status: line and a Where section N stopped list in loop order)
=== END FILE ===

=== FILE reference/cs2/copy/section-N.md ===
(the whole file, only if copy was drafted)
=== END FILE ===

=== FILE reference/cs2/message/section-N.md ===
(the whole file, only if a message plan was drafted)
=== END FILE ===

=== FILE reference/cs2/HANDOFF.md ===
(the whole new handoff, By: browser, same format as the current one)
=== END FILE ===
```

Each file is the complete new version, never a diff. Only these four paths, all for the one section.
HANDOFF.md is always included.

## Intake, in Claude Code

When he pastes a packet back into Claude Code:

1. Save it with Write to `.claude/state/packet.md` (untracked).
2. Run `node reference/cs2/check-packet.mjs .claude/state/packet.md`. It runs every file through the same
   checks the hooks run. On PACKET_FAIL, show him the problems and fix them with him. Never loosen a check.
3. On PACKET_PASS, save each file it lists with Write, in the order it lists them. The guard hooks run on
   every save.
4. If a message plan came back, run the story review (loop step 5) before anything else. Then carry on from
   the handoff's next action.
5. Record anything under "Decided in chat, not yet in files", update the status table, commit and push.
