# Falling behind, copy block (3 Nov)

Round 4. Rounds 1 to 3 (cards, Sally, the mechanisms named) are superseded and live in git history and in
versions/map-and-falling-behind.md. His call 3 Nov: no data visualization; a copy block with one image, the
headline poses the problem without the solution, at most one short line, plus the rollover sentence he
approved in the buffer flow session.

Written against his portfolio frame 4269:9433, block node 4712:12325 (layer Falling behind | Bridge, y 15192),
read 3 Nov. It follows Personalized timeline (capacity, cognitive load, six hours can mean three Action Items
one week and four the next) and comes before Buffer flow, whose headline already says catch up. The map block
above it is treated as cut (he judged it probably unnecessary, 3 Nov).

Points:
1. Every Action Item in a week is due by the end of it, 11:59pm Saturday (reasoning/calendar-and-schedule.md
   line 52, his words). CONFIRMED.
2. A week that comes up short can feel like failure, and that makes people less likely to keep going (Soman
   and Cheema 2004, via reports/Schedule view how it works.md). PARAPHRASE.
3. Leftovers move into the next week on their own, and the week takes fewer new Action Items so it stays the
   size of the person's capacity (reasoning/carry-over.md, 7 May 2026 weekly assembly; his yes 3 Nov to say
   this here). CONFIRMED.

Kept out on purpose: the magenta rollover tag (start of week shows it), pace moving (owed to the target and
pace block), buffer flow and start of week by name (the next blocks show them, and both happen without
falling behind too), the earlier choose what to carry modal (start of week Rollover caption).

## Round 6 (3 Nov): back to the block's job

His comment on round 5: the On its own and Still fits cards over-explain, read like searching for something to
say and lack logic. The cards were filling the space the cut diagram left. Back to his 3 Nov spec: a problem
headline, one stakes line and the rollover sentence, image slot blank. The word rollover still arrives here
as a noun, since Start of week's Rollover and Recalibration captions use it that way (Recalibration now reads Rollover handles one unfinished week); the hours they gave matches Buffer flow.

## Version
Eyebrow: Falling behind
Headline: Every Action Item in a week is due by Saturday night. Some weeks, one of them is still open when that night comes, and it has to go somewhere.
Text: A week that comes up short can feel like failing, and that feeling makes people less likely to keep going. So anything still open moves into the next week on its own. This is rollover, and the week it lands in takes fewer new Action Items so it still fits the hours they gave.
Image: none in the copy. Animation beside it, his idea 3 Nov, built in the preview: This week and Next week stacks of long skeleton mini Action Items, one on top of another like the Action Hub list; three check off in Haven green (#78b765) and dim, the fourth lifts and slides into next week and keeps a lighter border, then three new ones fill the row so the week is the same size. White and gray only. Loops; reduced motion shows the end state.
Layout: headline left at x 40, text column at x 1098 width 302, sources at the bottom.
Sources: Soman and Cheema 2004; Mondai design record

## Checks
- no-ai-slop run as the skill on the two sentences: no change.
- Reader check with the new Q5 (logic and padding): PASS (runs/2026-11-03-fb2 V2) On the noun wording (So rollover moves anything still open) it FAILED: rollover undefined, 3/3 (runs/2026-11-03-fb3). Rewritten to define it, then no-ai-slop run as the skill split the sentence (This is rollover, and the week it lands in). Final wording: reader check PASS, no flags in any run (runs/2026-11-03-fb4). Q5 also passed the round 5
  cards he rejected, so it does not stand in for his read (fixes/2026-11-03-falling-behind-padded-cards.md).

## Round 5 (superseded)


His comment on round 4: explaining the options not taken could confuse the reader; use the space for what
was done and why. The four ways diagram is gone. The space now holds three short columns, all about the
decision: what rollover is, why it happens on its own, why the week still fits.

Set up for the next two blocks, read from versions/buffer-flow.md and versions/start-of-week.md:
- The word rollover is introduced here. Start of week uses it as a term (Clean slate, Rollover and
  Recalibration captions) and his rule is rollover, never leftovers.
- A short week is set up here (the stakes line). Buffer flow says "after a short week" and Recalibration
  says "Rollover covers one short week".
- "The hours someone gave" matches Buffer flow's "the hours a person gave".
- Left for later blocks: the magenta tag and where pace landed (Rollover caption), repeated short weeks
  (Recalibration), pace moving (Action Hub), finishing early (Buffer flow).

Sources: points 1 to 3 above. Column 2 rests on his own flag that a carry forward decision while behind was
a weird decision making point (reasoning/carry-over.md section 1); column 3 on his constraint that the
automation was safe only if the week never got heavier (carry-over.md section 3). CONFIRMED.

Preview: .cs2-canvas/falling-behind-preview.html (stakes line at x 40, three columns at x 440, 773, 1106).
He pastes it into his frame between Personalized timeline and Buffer flow.

Round 5 version:
Column: Rollover | Anything still open on Saturday night rolls over into the next week.
Column: On its own | It happens without asking, so nobody has to decide what to keep at the moment they're behind.
Column: Still fits | The next week takes fewer new Action Items to make room and stays the size of the hours someone gave.
Sources: Soman and Cheema 2004; Mondai design record

## Checks
- no-ai-slop run as the skill on the final text (cut the kicker "That's rollover."; the third column's
  absolute "never followed by a heavier one" became the hours someone gave).
- Reader check: PASS, three Sonnet runs, aggregate V1 PASS, no flags in any run
  (reader-check/runs/2026-11-03-fb E1 to E3, copy3).
