# CS2 Falling behind, Drift: style guide

His direction (4 Nov), after the Rebuild stills misread it: the pixel blocks are the background of the
frame, like stars without being stars, filling the whole container and drifting left to right. The item
itself does not break apart. Rebuild stills are kept in docs/motion/cs2-falling-behind-rebuild/ as the misread.

Reference: his CS2 portfolio frame (tiles in .cs2-canvas/img/tiles, not in git) for the active item, the
mono labels and the chips; direction A (docs/motion/cs2-falling-behind/) for the rows.

- Frame: 720 by 680, page black #0b0b0c, the field fills it edge to edge.
- Field: small square white pixels, 1 to 3 px, two depths. Far ones dim and slow, near ones brighter and
  faster, a few near ones with a short trail to the left so the direction reads. Gentle twinkle. Seeded,
  and every star finishes whole cycles in the loop so the seam is clean.
- Labels: This week and Next week in IBM Plex Mono Bold, 20 px, bright green #09c916, no underline (his note).
- Weeks side by side: This week left, Next week right, 3 items each (his note). Rows 300 wide, as in direction A.
- Rollover chip: magenta #e31ecf (ESTIMATE, sampled from the brand glitch streaks), mono uppercase like
  his USER TESTING chips. Text ROLLOVER is a placeholder he has not approved.
- Active item on landing: green outline #3da342 drawn around the card, ring #09c916 heavier (ESTIMATE,
  sampled from his frame export).
- Next week keeps its size: its last item makes way as the carried one arrives.
- Banned: glow, bursts, gradients, the item dissolving, new copy beyond the placeholder chip.
