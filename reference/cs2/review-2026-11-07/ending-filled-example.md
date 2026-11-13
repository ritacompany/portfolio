# CS2 ending, filled in with example results (12 Nov, v2)

His ask: show what the ending could look like if the tests in `ending-test-plan.md` come back well, so he
can fill in the real numbers later. Every number below is an EXAMPLE, invented to show the shape. None of
it ships. The preview is `ending-filled-preview.html` in this folder, with an Example and Template switch.

v1 was rejected the same day: a wall of text with the numbers buried in paragraphs, far taller than Haven's
ending, and no study of how real case studies show results. Fix record: `fixes/2026-11-12-ending-wall-of-text.md`.

## Where the shape comes from

- Every Metalab rebuild in `build/` that has results ends the same way: a short headline, a Results line,
  then three large numbers with a label of a few words each (Atoms, Headspace, Midjourney, Suno, Ro, Calvin
  Klein). Ro and Midjourney use input numbers (8 brands, 6 months), so test counts fit the same frame.
- Haven's ending (`portfolio-haven/site/haven/index.html`, `.ending`): eyebrow, a one or two line title at
  96 px, one large line, cards, a two line close with bold words. 148 px top and 137 px bottom padding,
  1236 px tall. This version keeps the same padding, title size and two line close, and swaps the cards for
  the numbers. Rendered at 1440 it is 1179 px tall.
- Haven's own numbers are a centred equation mid page (3 plus 3 equals 6 interviews). Three numbers in a
  row with labels is a different form.
- One small moment of its own: eight dots under each number, filled for the count, so the denominator is
  something you see.

## The version

Eyebrow: What testing showed

Title: Eight people lived two weeks of the plan.

Numbers:
- 6 of 8: gave within a fifth of the hours they typed
- 7 of 8: predicted what a short week does to their dates
- 6 of 8: read Rollover as the plan making room for them

Close: The two who fell short had typed the most hours. Recalibration now steps in a week sooner.

Method line: Two week diary and prototype sessions, December 2026. Fail lines set before the first session.

43 words in all outside the numbers. Humanizer and no-ai-slop run as skills on this text. Reader check not run.

## Template view

- [n] people (title) and [n] under each number
- [x] for each of the three numbers, from tests 1, 2 and 3 in the plan
- [y] who fell short and [what they had in common], from the diary and closing calls
- [what you changed], only if something changed; otherwise the close says what he would change
- [month year] in the method line
- The dots fill to match each [x]

## If the real results are not this good

The frame holds. The numbers show whatever came back, and the close becomes the decision that broke and
what changed. See the bad result section of `ending-test-plan.md`.

## Where each part traces

- The three measures and the fail lines: `ending-test-plan.md`, numbers 1 to 3. CONFIRMED as the plan.
- Recalibration waits three weeks below about half: archive line 621. CONFIRMED.
- Shape: `build/*.html` results blocks and Haven's `.ending`, read 12 Nov. CONFIRMED.
- Every count, who fell short, the change and December 2026: INVENTED examples.
