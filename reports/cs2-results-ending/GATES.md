# Gates: CS2 example results ending on the framework page (20 Nov)

OWNS: reports/cs2-results-ending/**, site/mondai/framework/index.html (the ending section 5812:21559 only), site/css/framework.css (the ending block before the tablet block only)

Scope: the framework page ends with the example results ending he reviewed (ending-filled-preview.html), in the final copy word for word, responsive at 390, 768 to 1199 and 1440, with no other section moved, every existing framework check still passing, committed as my files and hunks and pushed to claude/relaxed-ride-5mlbdu.

- [x] G1: the ending's words are the "Ending, example results" lines of final-copy.md on main and nothing else, version C's headline is gone, no dash (positive control: changing Eight to Nine fails it, run 20 Nov)
  CHECK: node reports/cs2-results-ending/copy.mjs
  EXPECT: /^COPY_OK 9 lines$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=61699698129926c121e729d1161c0cc353c1e5eae060015a31297bfd2589b788; output-bytes=16

- [x] G2: at 1440 every part of the ending (eyebrow, title, context row, stats, All three passed, the key, the close) has its cap top, last baseline and left edge within 1.5 px of the preview he reviewed, and the ending is the preview's height
  CHECK: node reports/cs2-results-ending/measure.mjs
  EXPECT: /^ENDING_1440_OK 7 parts and height$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=b982cef97e14ec1d7af44f5ffb9c6e80a89de295e5e24a591e355c604d5ed475; output-bytes=729

- [x] G3: no other section moves at 390, 768 and 1440: every element in every other section, and the ending bar and footer against the ending's bottom, match the boxes saved before the change within 0.5 px (positive control CONTROL=1 moves one box 1 px and fails, run 20 Nov)
  CHECK: node reports/cs2-results-ending/still.mjs
  EXPECT: /^STILL_OK 3 widths$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=f0e97cdb7908123d4824aab97b53067bacc0d5c867bfaca04566652814fe192d; output-bytes=18

- [x] G4: the ending keeps the page's tablet rhythm at 768, 834, 1024 and 1180, motion on and off, along with every other section
  CHECK: node reports/framework-tablet-2/verify.mjs
  EXPECT: /^FW_TABLET2_OK 8 of 8$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=c5a449ef5354bd3a74b132fb1aed908f46e15955ae0f583a7c62866f10491256; output-bytes=21

- [x] G5: the first tablet pass checks still pass
  CHECK: node reports/tablet-breakpoint/verify.mjs
  EXPECT: /^TABLET_OK 8 of 8$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=1db5ebc3ec0a85788a67b2834b8ce8e7436182d46a1af5bd221383dde1d82ee9; output-bytes=17

- [x] G6: the tablet block still moves nothing at 390, 1200 and 1440, and the ending's Display/96 title matches Haven's ending title at tablet
  CHECK: node reports/framework-tablet-2/swap.mjs && node reports/framework-tablet-2/type.mjs
  EXPECT: /FW_SWAP_OK 3 widths[\s\S]*FW_TYPE_OK 4 widths/
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=9dd4edfa66d067ab6da11f57b92e33c85f379463fbc2a57af73b79bfebb4457b; output-bytes=418

- [x] G7: with motion on the ending animates in and ends fully shown, with reduced motion it shows without scrolling
  CHECK: node reports/framework-tablet-2/motion.mjs
  EXPECT: /^FW_MOTION_OK 6 runs$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=33a9557d0a351a9e8bfb69f6ac8a7ffda0a5d105a25623c910bcd2896bf1fa9f; output-bytes=20

- [x] G8: at 390, 768, 1024, 1180 and 1440 nothing in the ending runs past the content edge, no sideways scroll, the stats sit in one row from 768 up and stack at 390; screenshots in shots/
  CHECK: node reports/cs2-results-ending/shoot.mjs
  EXPECT: /^ENDING_LAYOUT_OK 5 widths$/m
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=bece8b6c6fdbf2bcff1556fe9182ea5a52ef02487966a8371e31d20c6561a782; output-bytes=26

- [ ] G9: committed as only my files and hunks on claude/relaxed-ride-5mlbdu, pushed, and the page open at 1440 and 768 in the built-in browser for his review
  EVIDENCE: pending
