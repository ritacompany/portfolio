# Gates: whole page style lab

OWNS: style-lab/**

Scope: the full homepage (hero, Selected works, About, footer) from his Hero master frame (Desktop 1 MVP, page CS, 6109:21820) in the playground's stack, responsive from 320 up, plus a style system where each style module can change only motion, scroll behaviour, section transitions, spacing rhythm and accent treatments, and a switcher to flip between them. His copy, fonts, sizes and colours never change.

- [x] G1: the lab builds with type checking
  CHECK: npm run build
  EXPECT: /built in \d+/
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=f6ec7692fa8061f5cb47c25bc845076b5c0a8ce6c93bb2034455af4fa0250864; output-bytes=391

- [x] G2: at 1440 with no style, the hero, works and footer match Figma's renders (6109:21821, 6109:21845, 6109:21959) within set limits, the footer with only the live clock and the nav list masked; About's label column matches its render and every About box lands within 1.5 px of the Figma metadata (the body copy differs from Figma on purpose, see README)
  CHECK: node scripts/check.mjs figma
  EXPECT: FIGMA_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=a6d6ab96a2624f9ff2328db7e0aebc0cd4201b696279743e3afb2551db56e653; output-bytes=913

- [x] G3: no sideways scroll at 18 widths from 320 to 2560, under every registered style
  CHECK: node scripts/check.mjs overflow
  EXPECT: NO_OVERFLOW_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=7c7b75c61c89059cf7cb76e1f71e46f33802068bb62efc4dfbd282acacb0da05; output-bytes=51

- [x] G4: type lock: under every registered style, once the page has been scrolled through and settled, every text element keeps the base font family, size, weight, letter spacing, line height, case and colour at 1440 and 390; the same comparator flags a planted font size change (control)
  CHECK: node scripts/check.mjs typelock
  EXPECT: TYPE_LOCK_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=dea638dc74d9bdf3e418266a5ab11488c668a87fb7cb40a79d7730bf84ff9200; output-bytes=709

- [x] G5: style modules contain no colour literals and no font, font-size, letter-spacing or line-height declarations; the same lint flags a planted fixture (control)
  CHECK: node scripts/lint-styles.mjs
  EXPECT: STYLE_LINT_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=e4d986a19822b2c7ac391cd4602709b1400c2225c0dc9a1c9b701661008640da; output-bytes=47

- [x] G6: ?lab shows a switcher listing every registered style with what a person would remember from it; choosing one reloads with that style live (html data-style set, its setup ran); ?style=<id> opens one directly
  CHECK: node scripts/check.mjs switch
  EXPECT: SWITCH_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=2e4bf0e8c21e53548ed473c533814ceac36941b1dad10099c5425c63fbaa202c; output-bytes=579

- [x] G7: phone menu opens, traps focus, closes on Escape and returns focus; phone bar drops in past the hero; desktop card hover scales to 1.035; the footer clock ticks Chicago time; the footer Contact button runs the gooey split
  CHECK: node scripts/check.mjs behavior
  EXPECT: BEHAVIOR_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=a3bc2773da0ff3fd55968b25908bc20495313ee4349865719f417997a6802474; output-bytes=55

- [x] G8: with reduced motion, every style shows every section fully (opacity 1, no offset transform) on load without scrolling
  CHECK: node scripts/check.mjs reduced
  EXPECT: REDUCED_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=8794e157a41eb4a5e61126efd92667921883fb4fd04743ea17bb8691bd4b9cea; output-bytes=621

- [x] G11: the stuck CHDWCK styles (from the Refero Elvina Prasad style) hold the word still on screen, within 1 px, from when it is fully in view to when the bottom of Selected works reaches the window's bottom, then let it leave; a click on a card under the word reaches the card; at 1440 and 1024; the base page fails the same hold test (control)
  CHECK: node scripts/check.mjs stick
  EXPECT: STICK_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=c7b28e87f91a494069d5b86fc6af1b15056a7b6ae0ab355769ae5bdd84d0f4ac; output-bytes=545

- [x] G9: screenshots at 1440, 1024, 768 and 390 of the full page, with no style and with each style, looked at after the last change and read as intended
  EVIDENCE: 15 Nov, full page shots of the base at 1440, 1024, 768 and 390 and of soft-landing at 1440 (switcher open) looked at after the last CSS change. All four sections present at each width; phone keeps his Mobile frames (vertical CHDWCK, stacked cards, About indented body, phone footer with Links); soft-landing settles to the base layout with the longer gap after the cards. The first footer pass at 1440 showed the old CHDWCK band and a Bold Contact label against Figma; both fixed and rechecked.

- [x] G10: dev server running with its port reported; branch claude/site-style-lab pushed; draft PR open
  EVIDENCE: 15 Nov, npm run dev answered 200 on 127.0.0.1:5190 and report_preview_port returned port 5190; git push created origin/claude/site-style-lab at ca1f51c; draft PR https://github.com/ritacompany/portfolio/pull/22 against claude/serene-ride-q0ajq7.

## 16 Nov: CHDWCK breaks into pixels, with a tuner

His ask: CHDWCK drifts a little at first and slides fully under Selected works, then breaks into pixel blocks (4 by 4 by default, some smaller and larger) that spread and fade out by the bottom of the works, with more room under the works for it. A tuner with amount, spread, block size, spacing and size variation, a draggable handle on the page for where the break starts, collapsible, dockable left or right, resizable, dark, responsive.

- [x] G12: under pixel-break at 1440 and 1024 (revised 16 Nov to his second pass): before the break the word drifts at the set speed (its screen top moves by drift times the scroll, within 1 px), with the word and the pieces over the works blending by difference; it breaks the moment the works title first touches the word's bottom edge (within 2 px), all at once (ripple 0); at the break the DOM word hides and the canvas draws the word in place (canvas ink covers at least 90 percent of the DOM word's ink, measured from two renders); whole, half and quarter size pieces all exist; halfway through, pieces have moved more than 20 px from rest on average; once the works bottom reaches the window bottom the canvas draws nothing; the works are taller by the set extra space; the base page has no canvas (control)
  CHECK: node scripts/check.mjs pixels
  EXPECT: PIXELS_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=fdf4fcba93e43fbb55a354e16514bdcacbc694c73eea7feda93c56d9938eab64; output-bytes=459

- [x] G13: the tuner: every slider changes the drawn result (piece count, positions or fades differ, clock frozen), the layer switch toggles under and over inverting, pieces keep floating with the page still, dragging the break point handle moves the origin setting, collapse and expand work, dragging the panel to the other side docks it there, dragging its edge changes its width, settings survive a reload, Copy settings gives the JSON; at 390 the panel fits the screen with no sideways scroll
  CHECK: node scripts/check.mjs tuner
  EXPECT: TUNER_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=fc389ff18cb7adaf4d35132545672769c96ae1af4affd99856695cff86df1df1; output-bytes=511

- [x] G15: the hosted build, wrapped the way the host wraps a page, opens on pixel-break with the switcher, #base opens the base, Satoshi and the images load from relative paths, the host's unlayered reset loses to the site CSS, and a style's lab layer still outranks the site CSS (works taller by the extra space; stuck-invert's blend and z-index apply)
  CHECK: node scripts/check.mjs hosted
  EXPECT: HOSTED_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=4e971aa0075ca9cff92f6b37e2861c841f1139d46fb3e2e12f36554d9047f340; output-bytes=396

- [x] G14: the scroll from hero to About looked at as a sequence of frames at 1440 (drift, slide under, break, spread, gone) and the tuner looked at at 1440 and 390, after the last change; the hosted page republished with this style and opened
  EVIDENCE: 16 Nov, second pass. Frames of the final hosted build (wrapped like the host) at 1440 looked at: the whole word as the hero sits, the word in mixed 4, 2 and 1 px pieces the moment the works title touches its bottom, the pieces hanging over the Mondai card and inverting it at 30 and 65 percent, nothing left at the end. Tuner looked at with the new Layer switch. Republished to https://claude.ai/artifact/CdH1zt7Zep3V7tv1cnDrW8; I cannot open the claude.ai page itself from this container, so G15 checks its wrapped equivalent. First pass of this round broke at the word's top; he meant as the works start to go in, so it now breaks at the word's bottom edge and the check measures that.
