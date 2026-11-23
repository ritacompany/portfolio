# Gates: Home tablet Learn more, 768 to 1199

OWNS: site/css/home.css, site/dev/home-tablet/**, reports/home-tablet-learn-more-2026-11-23/**

Scope: from 768 to 1199 each work card shows its description under the image at the left and Learn more (his Small button) at the right of the same line, wrapping under the description at 24 px or less; the two images end on one line; no mouse hover at tablet; a press still fills the button; the phone rules and everything else are unchanged; a canvas shows real screenshots at several tablet widths.

Status, 23 Nov: built and passing as a preview at /dev/home-tablet/. The site review gate (.claude/hooks/site-review-gate.mjs) refuses edits to css/home.css until he says yes in this chat, so G1 is unmet on Home until then. G6 and G10 fail on this branch with none of this work present (checked with it stashed): G6 is the phone button colour at 402 (Neutral/100 against Figma #f2f1f8), the phone session's; G10 is the visually hidden "Selected works" heading counted as overlapping the cards at 768, 1024 and 1366, from cf61cb4. Before the change, G1 on Home failed (3209 failures, first: "773: mondai wrapped though one line had 178.3 px between them").

- [ ] G1: On Home, every width 768 to 1199 in 1 px steps obeys the wrap rule for both cards, with the images ending on one line.
  CHECK: node reports/home-tablet-learn-more-2026-11-23/check.mjs wrap
  EXPECT: /^TABLET_WRAP_OK \d+ one line, [1-9]\d* wrapped/m
  CWD: ../..
  EVIDENCE: pending

- [x] G2: The same rule holds on the preview at /dev/home-tablet/, what the canvas shows.
  CHECK: node reports/home-tablet-learn-more-2026-11-23/check.mjs wrap /dev/home-tablet/
  EXPECT: /^TABLET_WRAP_OK \d+ one line, [1-9]\d* wrapped/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=b5b447e6e31717dc62f3e814d1f57ae373dea49a83fb8f9b066dc249e872ffa9; output-bytes=95

- [x] G3: With a mouse at 834, 1024 and 1180, hovering a card or its button changes nothing and the cursor stays a dot. Control: CONTROL=1 adds a hover fill and the check fails.
  CHECK: node reports/home-tablet-learn-more-2026-11-23/check.mjs mouse
  EXPECT: TABLET_NO_HOVER_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=8cef1aec05963b2d2b9077463a396f2e02297d351808a1fbc87a1b70cdff2a4f; output-bytes=110

- [x] G4: On touch at 768, 834, 1024 and 1180 a press fills each button with Neutral/300 and lets go clean. Control: CONTROL=1 removes the fill and the check fails.
  CHECK: node reports/home-tablet-learn-more-2026-11-23/check.mjs press
  EXPECT: TABLET_PRESS_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=7ee408faee3a656c048bea642314790f7547880389866d5f6cafb8d3fa25fe62; output-bytes=117

- [x] G5: The phone block of home.css is unchanged and home.css differs from e1ce478 only by the tablet block.
  CHECK: node reports/home-tablet-learn-more-2026-11-23/check.mjs phone
  EXPECT: PHONE_UNTOUCHED_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=5d81beef0a54617e330d1e423c02c799f63ef1521f6bd04d8c01a85a92802d46; output-bytes=55

- [ ] G6: Every 1440 value from his newest Home frame still matches.
  CHECK: node scripts/verify-figma-sync.mjs
  EXPECT: /^FIGMA_SYNC_OK \d+ checks$/m
  CWD: ../..
  EVIDENCE: pending

- [x] G7: No hover moves a letter on any page of the site.
  CHECK: node scripts/verify-hover-still.mjs site
  EXPECT: HOVER_STILL_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=69cddddcb78c9ac9ab71fbab29221e4910c779b69841949cc53156b3c95e2141; output-bytes=25

- [x] G8: The site check passes.
  CHECK: node scripts/check-site.mjs
  EXPECT: site check OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=15e1ac1a4f4962e5a2bb4cdd73b63a3612a1091676f4de2f346c4dbc1e93b7d5; output-bytes=27

- [x] G9: No new fit problems.
  CHECK: node reports/home-unify-2026-11-22/check.mjs fit
  EXPECT: NO_NEW_FIT_PROBLEMS
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=e2525da4a8aeae7883e3d161510cc0440b22fdb5c782c97c5e6d8e554e08ead4; output-bytes=55

- [ ] G10: No new overlap problems.
  CHECK: node reports/home-unify-2026-11-22/check.mjs overlap
  EXPECT: NO_NEW_OVERLAP_PROBLEMS
  CWD: ../..
  EVIDENCE: pending

- [x] G11: The live motion checks pass.
  CHECK: node reports/home-unify-2026-11-22/check.mjs live
  EXPECT: LIVE_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=949fb627311111b72ad01d47757b8157a575a819e75bb0b7eff7d3ddc81a2ce7; output-bytes=101

- [x] G12: The touch Learn more checks pass.
  CHECK: node reports/home-unify-2026-11-22/check.mjs touch
  EXPECT: TOUCH_LINK_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=1502b25ce40b768abb38fa05d8a7ea1643b5b53a2a2f085f1d4e85cac04d24fe; output-bytes=142

- [x] G13: The narrow mouse checks pass.
  CHECK: node reports/home-unify-2026-11-22/check.mjs mouse
  EXPECT: MOUSE_NARROW_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=60d46c68e44a188727ddb9be000c38f37cc5c9b0895d70ca7feb28585d2fa4f3; output-bytes=137

- [x] G14: The phone wrap check passes.
  CHECK: node reports/home-unify-2026-11-22/check.mjs wrap
  EXPECT: WRAP_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=ba21e502deb8/16 entries; EXPECT=matched; output-sha256=5b4161953cd2b63cf29cb4b5672f86a38297f404780a5c1444b66b911396025c; output-bytes=76

- [ ] G15: The canvas shows real Playwright screenshots of the built preview at 768, 834, 977, 978, 1024 and 1180 (2x, touch), one per artboard, each labelled with its width and each button's state; labels match G2's flip at 978.
  EVIDENCE: pending
