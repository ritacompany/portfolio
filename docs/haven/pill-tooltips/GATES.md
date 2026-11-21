# Gates: Haven pill tooltips

OWNS: site/haven/pill-tips.css, site/haven/pill-tips.js, site/haven/index.html, site/css/tokens.css, site/dev/pill-tooltips/**, docs/haven/pill-tooltips/**, fixes/2026-11-11-tooltip-options-not-tooltips.md

Scope: option 2 from site/dev/pill-tooltips/ (detached box, arrow on the chip), chosen by Chadwick on 11 Nov, built on every Haven pill as a WAI-ARIA tooltip (hover after a delay or keyboard focus, never click, nothing on touch), verified at 1440, 768 and 390.

- [x] G1: every one of the 14 pills cites a card that exists on the page
  CHECK: node docs/haven/pill-tooltips/check-static.mjs sources
  EXPECT: sources passed
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=460e6ad3545d3a92f356a4877ab6386d1dbe25b9f62c11a5a638cb766bf5f838; output-bytes=97

- [x] G2: the page loads the tooltip files, and the script has no click path, hover only for a mouse, focus only for keyboard focus, Escape, role tooltip and aria-describedby
  CHECK: node docs/haven/pill-tooltips/check-static.mjs wiring
  EXPECT: wiring passed
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=32699bc67a0fa1ab537cc4a2068280568bc9709edbb07a595b38da9d835a7d52; output-bytes=14

- [x] G3: no hex in the tooltip CSS or JS, and every tooltip token they use is defined in tokens.css
  CHECK: node docs/haven/pill-tooltips/check-static.mjs tokens
  EXPECT: tokens passed
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=c289398fdf52b92f00b08bba9e6b82d071c26bf5be410bbd128a904b14ed444a; output-bytes=34

- [x] G4: no em dash, en dash or spaced double hyphen in any file written for this
  CHECK: node docs/haven/pill-tooltips/check-static.mjs copy
  EXPECT: copy passed
  CWD: ../../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/Users/chadwickfenner/Code/portfolio-site; path=107572ec95e7/16 entries; EXPECT=matched; output-sha256=e6df1dd255f242b6be4c31d17fe813ef66a9a7685beecb400c7250787921733a; output-bytes=12

- [x] G5: in the browser at 1440, 768 and 390, each tip's text equals its card, nothing opens before 300ms or on click or touch, hover opens after 300ms, the pointer can cross onto the box, the box sits 14px off the chip with the arrow centred on it and stays 16px inside both window edges
  EVIDENCE: built in browser, localhost:4318/haven/, script walking all 14 pills, 11 Nov. 1440: 14 pills, 0 failures, gap 14.4, arrow offset 0, Interview insight 2 shifted to 16px off the right edge (1440.jpg). 768: 14, 0 failures (768.jpg shows Interview insight 2 shifted with the arrow on the chip). 390: 14, 0 failures; a touch tap opened nothing and showed no focus ring (390.jpg).

- [x] G6: the box flips below a chip near the top of the window, and keyboard focus opens it with Escape closing it while focus stays on the chip
  EVIDENCE: 1440, Interview insight 4 with its chip 30px from the top opened below, gap 14, arrow offset 0. Focus and Escape checked with dispatched focus events (the hidden pane does not fire real focus): opened on focus, Escape closed it, activeElement stayed on the chip.

- [x] G7: the box matches Figma 4264:7197
  EVIDENCE: computed style rgb(18, 18, 20) (Neutral/800), ink rgb(222, 222, 229) (Neutral/200), 12px/17px Satoshi with 0.48px tracking (Body/Label/12), padding 20, radius 6, width 306. Padding is 20 all round, not Figma's 28 bottom, because the 28 made room for the tucked chip in option 1 and option 2 does not tuck.
