# Gates: whole page style lab

OWNS: style-lab/**

Scope: the full homepage (hero, Selected works, About, footer) from his Hero master frame (Desktop 1 MVP, page CS, 6109:21820) in the playground's stack, responsive from 320 up, plus a style system where each style module can change only motion, scroll behaviour, section transitions, spacing rhythm and accent treatments, and a switcher to flip between them. His copy, fonts, sizes and colours never change.

- [x] G1: the lab builds with type checking
  CHECK: npm run build
  EXPECT: /built in \d+/
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=9cc992553a3584ab0745452dd512d3a8c38a79b75b1d97db0a3a48740a79baaf; output-bytes=390

- [x] G2: at 1440 with no style, the hero, works and footer match Figma's renders (6109:21821, 6109:21845, 6109:21959) within set limits, the footer with only the live clock and the nav list masked; About's label column matches its render and every About box lands within 1.5 px of the Figma metadata (the body copy differs from Figma on purpose, see README)
  CHECK: node scripts/check.mjs figma
  EXPECT: FIGMA_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=4131ea64417406dee66fa1e2f118f0bda6ffb803ea97f30a24a9b1da49138566; output-bytes=913

- [x] G3: no sideways scroll at 18 widths from 320 to 2560, under every registered style
  CHECK: node scripts/check.mjs overflow
  EXPECT: NO_OVERFLOW_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=8d9583cdffc9b913bb648ddd41477fbfea09800e0a12a7fdff2511710990e9ab; output-bytes=51

- [x] G4: type lock: under every registered style, once the page has been scrolled through and settled, every text element keeps the base font family, size, weight, letter spacing, line height, case and colour at 1440 and 390; the same comparator flags a planted font size change (control)
  CHECK: node scripts/check.mjs typelock
  EXPECT: TYPE_LOCK_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=1fe5d1f2c6ff86628fc28540f5484babb53179a0e202d0bd8654fed03ca80459; output-bytes=324

- [x] G5: style modules contain no colour literals and no font, font-size, letter-spacing or line-height declarations; the same lint flags a planted fixture (control)
  CHECK: node scripts/lint-styles.mjs
  EXPECT: STYLE_LINT_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=01269ed399f1f57a3c960268828ba6862ec7e40eb9317d1f85650794bc932898; output-bytes=46

- [x] G6: ?lab shows a switcher listing every registered style with what a person would remember from it; choosing one reloads with that style live (html data-style set, its setup ran); ?style=<id> opens one directly
  CHECK: node scripts/check.mjs switch
  EXPECT: SWITCH_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=9e514f6f92b76911961251e723c7d0aa2176fb7c994e76baceec81eda1ac9c86; output-bytes=151

- [x] G7: phone menu opens, traps focus, closes on Escape and returns focus; phone bar drops in past the hero; desktop card hover scales to 1.035; the footer clock ticks Chicago time; the footer Contact button runs the gooey split
  CHECK: node scripts/check.mjs behavior
  EXPECT: BEHAVIOR_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=e2e7258977b23c80bf2b06d4933d0dea790e89e59100f676ba28421fe1377caa; output-bytes=55

- [x] G8: with reduced motion, every style shows every section fully (opacity 1, no offset transform) on load without scrolling
  CHECK: node scripts/check.mjs reduced
  EXPECT: REDUCED_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=8eebc406f4496d14c40d48a6b4ccb0d2d6577ecb94f05df07ada91305cebfcc3; output-bytes=230

- [x] G9: screenshots at 1440, 1024, 768 and 390 of the full page, with no style and with each style, looked at after the last change and read as intended
  EVIDENCE: 15 Nov, full page shots of the base at 1440, 1024, 768 and 390 and of soft-landing at 1440 (switcher open) looked at after the last CSS change. All four sections present at each width; phone keeps his Mobile frames (vertical CHDWCK, stacked cards, About indented body, phone footer with Links); soft-landing settles to the base layout with the longer gap after the cards. The first footer pass at 1440 showed the old CHDWCK band and a Bold Contact label against Figma; both fixed and rechecked.

- [x] G10: dev server running with its port reported; branch claude/site-style-lab pushed; draft PR open
  EVIDENCE: 15 Nov, npm run dev answered 200 on 127.0.0.1:5190 and report_preview_port returned port 5190; git push created origin/claude/site-style-lab at ca1f51c; draft PR https://github.com/ritacompany/portfolio/pull/22 against claude/serene-ride-q0ajq7.
