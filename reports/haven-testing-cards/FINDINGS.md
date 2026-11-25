# Haven usability testing cards: what changed and why

Checked 25 Nov against the full git history (the clone was shallow; it was deepened first) and his Figma file.

## Short answer

The page text was never cut down from his current Figma text. The two never met. The longer text sits in
his Figma frame only; no commit on any branch has ever held it. On the page, Insights 2 and 3 have not
changed since the first Haven build on 30 Sep. Insights 1 and 4 were rewritten on 9 Nov in the tactics
copy pass, and he approved both: Insight 4 he accepted, Insight 1 he settled in his own words. Those
rewrites made the text shorter than it was before, but they were edits of the earlier page text, not
of his Figma text.

The cards look empty for a second reason that has nothing to do with copy: the CSS holds each card at
a fixed 124 px minimum on desktop and phone, and stretches and centres them on tablet, so short text
floats in a tall box.

## Card by card

| Card | First build, 30 Sep (68ef3fb) | On the page now | His Figma frame now |
|---|---|---|---|
| Insight 1 | Users were unsure of what mode of communication they would be chatting with the expert through. | Users weren’t sure whether they’d talk to the expert by text, voice or video. | Users were not sure if they would be talking to each expert by text, voice or video or something else entirely. |
| Insight 2 | Users had trouble understanding the duration section of the scheduling page. | same as first build | Users had trouble understanding the duration section of the scheduling page. There was a clarity gap. |
| Insight 3 | Users were concerned that the design lacked enough security features. | same as first build | Users were concerned that the design did not have enough security details to met their needs. |
| Insight 4 | Users wanted to know more about the Confidante in order to determine the right choice. | Users wanted to know more about each Confidante before choosing one. | Users wanted to have a more information available that would help them choose between confidantes. |

Figma text is verbatim, including "to met their needs" (Insight 3) and "to have a more information"
(Insight 4), which read as typos. Nothing has been corrected here; that is his call.

## The commits that touched the card text

- **68ef3fb, 30 Sep 2026**, "Build the Haven case study page with Metalab reveals and responsive layouts".
  First build from Haven CS Master; all four texts as in the first column above.
- **84725e1, 30 Sep 2026**, "Slow the Haven reveals, smooth trackpad scroll and add the quiz parallax".
  Removed the is-lit class from Insight 1. No text change.
- **e7c36db, 28 Oct 2026**, "Update Haven page from current design and integrate existing motion".
  Page rebuilt; the four texts carried over unchanged.
- **43df273, 9 Nov 2026**, "Haven: his marks applied to the copy source and the page, re-checked".
  Insight 4 changed from "Users wanted to know more about the Confidante in order to determine the right
  choice." to "Users wanted to know more about each Confidante before choosing one." Stated reason
  (reference/haven/tactics/proposals.json, h-test-i4): "In order to determine the right choice is filler
  for before choosing one." His mark in reference/haven/tactics/marks.json: accept.
- **24e4490, 9 Nov 2026**, "Haven: Insight 1 settled with him (text, voice or video), applied and checked".
  Insight 1 changed from "Users were unsure of what mode of communication they would be chatting with the
  expert through." to "Users weren’t sure whether they’d talk to the expert by text, voice or video."
  The proposal (h-test-i1) was "Users weren’t sure how they would be talking to the expert." because
  "mode of communication is the stiff version of how they would talk". He marked it Discuss; his note in
  marks.json: "his yes, 9 Nov: testers were unsure whether chats would be by text, voice or video."

Later commits that match the text (cadce9d, c828871, 0001e99, 0bdaddb, a1a0971 and others) only moved
or merged files; none changed a card's words.

## The Figma frames

- The frame named in the ask, "Transported Haven CS" 5812:21569, no longer exists in file
  5RO0m4bYYrTvbiaOgaU3tI. The current Haven frame on page CS is "haven cs" 6464:56906; the cards are in
  6464:57582. That is where the Figma text above was read.
- The older master 3300:12596 in file IarvWaqjIwrZ2afQmMxKm6 was not read: the Figma tool limit for his
  View seat was reached. It was not needed to answer when and why, since git holds the page side.

## Padding: Figma against the ask

His Figma card boxes (6464:57585, 57589, 57593, 57597): padding 32 top, 24 right, 32 bottom, 24 left;
fixed height 123 px, not hug; text 16 px at 140% line height.

The ask is 32 top, 24 sides, 34 bottom, hugging. One mismatch: the bottom is 32 in Figma and 34 in the
ask. The build follows the ask (34). The page today has 34 top, 24 right, 32 bottom, 25 left with a
124 px minimum (haven.css), and 24 all round with stretch and centring on tablet (current.css).

## Side effect to know

site/haven/pill-tips.js reads each card's text for the testing insight tooltips on the solution pills,
so changing the card text changes those tooltips too.

## What was done, 25 Nov

His answer on the [site change] card: "Yes, your Figma text". The four Figma texts are now on the page
verbatim, typos included. Each card hugs its text: padding 32 top, 24 sides, 34 bottom, the 124 px
minimum removed from haven.css, and the tablet rule in current.css that stretched and centred the
cards removed. The cards in a row now differ in height when their text does (at 1024, Insight 3 is
4 lines and the others 5).

Checked with reports/haven-testing-cards/check-cards.mjs at 1440, 1024, 768 and 390: every card has
padding 32 24 34 24, its content box equals its text's own height and its text equals the Figma text.
It failed on the page before the change (wrong padding, 15 cards not hugging, all four texts
different). The site, responsive (fit, overlap, health, size) and hover still checks pass. Gates are in
GATES.md.
