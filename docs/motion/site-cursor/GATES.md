# Gates: site cursor and the Mondai card hover button

OWNS: site/js/site.js, site/css/components.css, site/css/home.css, site/dev/cursor/**, docs/motion/site-cursor/**, scripts/check-cursor.mjs

Status, 21 Nov: G1 to G6 run against the home page with the proposal injected the way the preview build injects site/dev/preview files. Wiring into site/js/site.js, components.css and index.html waits on his yes (the site review gate). After that, rerun every gate against the real page.

Scope: a dot cursor on every page that loads site.js, which becomes the Learn more small button over the Mondai card media, presses to the filled look and hands the click to the card link; tuned on site/dev/cursor/.

Harness: `node scripts/check-cursor.mjs <gate>` serves `site/` and drives Chromium. Each gate prints `<gate> PASS` only after every assertion holds. `node scripts/check-cursor.mjs control` runs the G3 absence check against a fine pointer page, where the cursor must exist, so G3 cannot pass on a checker that never finds anything.

- [x] G0: The dot matches the reference (cursors.framer.wiki, Simple Replace) measured live: size, fill and drop shadow.
  CHECK: node scripts/check-cursor.mjs REF
  EXPECT: REF PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=83ef1bc32008/16 entries; EXPECT=matched; output-sha256=b704aeb3306033db763f20e11f5a098baa4775a44598b362892869454c2d859d; output-bytes=93

- [x] G1: Over the Mondai card media at 1440 the cursor shows "Learn more" with the small button outline look (3 px Neutral/100 outline, transparent fill, Neutral/100 text); outside it the cursor is the 24 px white dot.
  CHECK: node scripts/check-cursor.mjs G1
  EXPECT: G1 PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=1bc8318dedf2/16 entries; EXPECT=matched; output-sha256=8f40d27201d862881cc84b95437e36babf3d65b59198e8615faa8175859487da; output-bytes=57

- [x] G2: With each of the three press options, mouse down over the card ends in the press look (Neutral/100 fill, Neutral/900 text, scale 0.98, judged from pixels); the click lands on /mondai/.
  CHECK: node scripts/check-cursor.mjs G2
  EXPECT: G2 PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=83ef1bc32008/16 entries; EXPECT=matched; output-sha256=fddb9dbd3685608312e29a731402fbc153d99203fbb8e6c54b9381445c3ac428; output-bytes=162

- [x] G3: With a touch, coarse pointer emulated, no custom cursor element renders and the static Learn more shows.
  CHECK: node scripts/check-cursor.mjs G3
  EXPECT: G3 PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=1bc8318dedf2/16 entries; EXPECT=matched; output-sha256=0f3de52864fa1d511403b584a608e78896f356ad5660df7fdd50ff5b688fadd8; output-bytes=162

- [x] G3c: Control for G3: on a fine pointer the same detector finds the cursor element.
  CHECK: node scripts/check-cursor.mjs control
  EXPECT: CONTROL PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=1bc8318dedf2/16 entries; EXPECT=matched; output-sha256=9b08f9c4ceb7ac6e955b686ea159afcf98037cb92d3437c5fc730bbe8f503134; output-bytes=48

- [x] G4: Keyboard focus on the Mondai card shows the static Learn more at its Figma position (343.39, 250.87 of 879 by 575.28).
  CHECK: node scripts/check-cursor.mjs G4
  EXPECT: G4 PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=1bc8318dedf2/16 entries; EXPECT=matched; output-sha256=7d8c7608a403d908443127f1e32256c9b74f65c50fbb34f7527faafabfc5a3d9; output-bytes=80

- [x] G5: Reduced motion emulated: the cursor sits on the pointer and its parts have no transition.
  CHECK: node scripts/check-cursor.mjs G5
  EXPECT: G5 PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=1bc8318dedf2/16 entries; EXPECT=matched; output-sha256=add01f7fbb30c9d814ccfb149e0a6da8a77cc4eba3771e10d8ac2ed03286d15e; output-bytes=86

- [x] G6: No horizontal overflow and no console errors on the home page at 1440, 1200, 967, 768 and 390.
  CHECK: node scripts/check-cursor.mjs G6
  EXPECT: G6 PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=1bc8318dedf2/16 entries; EXPECT=matched; output-sha256=c9a6577efde17fd9376d5d453b4f36c8a1f658e9ea3635b2c718e702847245bd; output-bytes=64

- [ ] G7: A frame strip of the dot against the reference, the morph, and the three press options, plus a recording of each option, sent to him for review.
  EVIDENCE: pending

- [ ] G8: He has felt it on the tuner page and sent settings back or said it feels right (motion-rules.md, interactive pieces). Stays open until he answers.
  EVIDENCE: pending
