# Haven live motion audit, 16 Nov 2026

First run of `scripts/live-capture.mjs` on real motion: `site/haven/index.html`, twelve animated sections,
1440 and 390 wide, motion on and reduced motion on, 15 fps for 3 s each. Sheets are in
`output/motion/live/haven-audit/<section>/` (not committed). Nothing on the Haven page was changed.

## Result
- Clean: data, access, mvp, testing, program, quiz, journey, profile.
- Two candidates for Chadwick's eye, both where a pinned section lets go of the page:
  - Chat section into security, 390 wide. The browser scores a layout shift of 0.76: the chat phone grows
    from 403 to 538 px tall and the security section jumps on screen. Frames 0.40 to 0.67 s of
    `security/390-motion-contact.png` show the security text arriving in two places across one frame.
  - Security into the ending, 1440 wide. The ending canvas is created at 0 px tall and grows to 430 px,
    score 0.94, so the ending content moves after it appears.
  Both come from the pin hand off, so they may read as a jump only at certain scroll speeds. Not yet seen in
  a real scroll.
- Wires, 390 wide: the section's bottom edge moves 4 px during the entrance. Small, real, not seen by eye.
- Schedule, 390 wide: a false alarm. The third text block sat 2 px inside the screen bottom, where Haven
  waits until 100 px in by design. The capture now counts an item as on screen only 100 px in.

## What the first run taught the tool
The test pages were too simple to show these, and all four are fixed: the scroll now follows the target
through pins and soft snap (the ending run had filmed the security phones), pinned elements are no longer
read as moving, screen reader only text and aria-hidden tickers are skipped, and only items on screen count
as not visible. A run that never reaches its target reports a capture problem, not a finding.
