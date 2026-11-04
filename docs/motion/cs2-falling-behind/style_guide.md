# CS2 Falling behind: style guide

Reference: direction A in `.cs2-canvas/falling-behind-playground.html` at its committed values (763e109),
which carry Chadwick's comments from every playground round. Direction B was rejected on sight (4 Nov).
Take its structure, layout and colours. Do not take its tuning panel, drag modes or the unused paths
(swing out, three legs, week after).

- What it argues: an Action Item still open at the end of the week moves into next week on its own,
  and next week still fits. It sits beside the Falling behind block copy, which is final and not in the clip.
- Subject: an abstract week list, not a redrawn screen. Rows are dark cards with a check ring, a title
  bar and a short meta bar. No real product text. This is the diagram he has been tuning, not product UI.
- Palette (hex, from the playground): page #0b0b0c, card #141416, border #26262a, check ring #4a4a50,
  check green #78b765, tick #0b0b0c, lifted border #4a4a50, carried border #8e8e94, title bar #2a2a2e,
  meta bar #202023, labels #8e8e94, divider #1f1f22. Finished rows dim to 40 percent.
- Type: Satoshi Medium 16px for the two week labels, This week and Next week. Nothing else is text.
- Layout: rows 640 wide, 56 tall, 12 radius, 8 apart; weeks 32 apart; label 50 above its first row.
  This week holds 4 rows, Next week 3. Sized to the frame, so the same page renders at 390 wide.
- Motion: one open row lifts (14 px up, grows to 1.08, soft shadow), travels straight down over the
  finished rows into the top of Next week, settles back to size with the lighter border. Next week's rows
  step down to make room and its last row shrinks out, so the week stays at 3. Then This week closes the
  gap it left, a ripple top to bottom. Closed form springs, no overshoot on anything that travels.
- Pacing: about 6.2 s, starting mid week with two rows already checked, as he asked for a short intro.
- Banned: glow, gradients behind the rows, particles, corner labels, frame borders, a week after,
  any new label copy, a background (still open with him).
