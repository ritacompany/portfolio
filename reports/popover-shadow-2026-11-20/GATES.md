# Gates: Rescheduling popover shadow (20 Nov)

Task: the dark gradient behind the "Select a new time" popover leaves a line on "usability findings"
and sits in the wrong place. Its job: dim every other Action Item so only the card being rescheduled
shows (his words, 20 Nov).

- [x] G1 Figma read: layers, gradient stops, blend and extent written in FINDINGS.md from the frame.
- [x] G2 No line: the title "usability findings" has one brightness top to bottom (2x rows 160 to 188
  all 204 in the new image; old dropped 205 to 154 at row 176).
- [x] G3 Role: the whole selected card (title, description, time, icon) is undimmed and every other
  card is dimmed. Checked by eye in before-after.png and the live shots.
- [x] G4 Sharp at 2x: built from 2x Figma exports, lossless webp, 1094 x 1018 for a 547 x 509 slot.
- [x] G5 Breakpoints: live shots at 390, 768 and 1440, reduced motion on and off, in shots/. Layout unchanged.
- [x] G6 Scope: only the image and this report folder change. No CSS, no HTML, no heading spacing.
- [ ] G7 Shipped: pushed, draft PR into claude/relaxed-ride-5mlbdu, preview artifact, lead told.
