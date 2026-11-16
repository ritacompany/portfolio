# Gates: whole page style lab

OWNS: style-lab/**

Scope: the full homepage (hero, Selected works, About, footer) from his Hero master frame (Desktop 1 MVP, page CS, 6109:21820) in the playground's stack, responsive from 320 up, plus a style system where each style module can change only motion, scroll behaviour, section transitions, spacing rhythm and accent treatments, and a switcher to flip between them. His copy, fonts, sizes and colours never change.

- [x] G1: the lab builds with type checking
  CHECK: npm run build
  EXPECT: /built in \d+/
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=a1414ea14ce718738fbd4a6a1af53b59bfcaaac9d54d91a436768b39bdfb62fe; output-bytes=391

- [x] G2: at 1440 with no style, the hero, works and footer match Figma's renders (6109:21821, 6109:21845, 6109:21959) within set limits, the footer with only the live clock and the nav list masked; About's label column matches its render and every About box lands within 1.5 px of the Figma metadata (the body copy differs from Figma on purpose, see README)
  CHECK: node scripts/check.mjs figma
  EXPECT: FIGMA_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=4131ea64417406dee66fa1e2f118f0bda6ffb803ea97f30a24a9b1da49138566; output-bytes=913

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
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=b6ff6b0e58c6c027ef0836af88aecdf0eec0f4e7f1dc89ba995d85c8cac8c729; output-bytes=579

- [x] G7: phone menu opens, traps focus, closes on Escape and returns focus; phone bar drops in past the hero; desktop card hover scales to 1.035; the footer clock ticks Chicago time; the footer Contact button runs the gooey split
  CHECK: node scripts/check.mjs behavior
  EXPECT: BEHAVIOR_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=c68a9496da2f6caf4d65ea6cd969fbaa721dd2fbb9cf7fb97d98e87423294b69; output-bytes=55

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

- [x] G12: under pixel-break at 1440 and 1024: before the break the word drifts at the set speed (its screen top moves by drift times the scroll, within 1 px), with the word and the canvas stacked under the works (z-index -1); at the break the DOM word hides and the canvas draws the word in place (canvas ink covers at least 90 percent of the DOM word's ink, measured from two renders); halfway through, blocks sit outside the word's box; once the works bottom reaches the window bottom the canvas draws nothing; the works are taller by the set extra space; the base page has no canvas and fails the same test (control)
  CHECK: node scripts/check.mjs pixels
  EXPECT: PIXELS_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=a9a0b8ea909b254e4d1d6f29106ac542b07ddd26c900da7b32b9a9fd9cdac664; output-bytes=393

- [x] G13: the tuner: every slider changes the drawn result (block count or positions differ), dragging the break point handle moves the origin setting, collapse and expand work, dragging the panel to the other side docks it there, dragging its edge changes its width, settings survive a reload, Copy settings gives the JSON; at 390 the panel fits the screen with no sideways scroll
  CHECK: node scripts/check.mjs tuner
  EXPECT: TUNER_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=8f97dc1c5febb298c048e4f1e1ef6f283909cd718e18cbf2b2d84e67e7d44f50; output-bytes=405

- [x] G15: the hosted build, wrapped the way the host wraps a page, opens on pixel-break with the switcher, #base opens the base, Satoshi and the images load from relative paths, the host's unlayered reset loses to the site CSS, and a style's lab layer still outranks the site CSS (works taller by the extra space; stuck-invert's blend and z-index apply)
  CHECK: node scripts/check.mjs hosted
  EXPECT: HOSTED_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/style-lab; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=4e971aa0075ca9cff92f6b37e2861c841f1139d46fb3e2e12f36554d9047f340; output-bytes=396

- [x] G14: the scroll from hero to About looked at as a sequence of frames at 1440 (drift, slide under, break, spread, gone) and the tuner looked at at 1440 and 390, after the last change; the hosted page republished with this style and opened
  EVIDENCE: 16 Nov, frames of the final hosted build (wrapped like the host) at 1440 looked at: the works title over the drifting word, the word in blocks at the break, blocks spreading at 30 and 65 percent, nothing left at the end; the tuner open at 1440 mid breakup and folded at 390 with the phone hero intact. Hosted page republished as version 2 of https://claude.ai/artifact/CdH1zt7Zep3V7tv1cnDrW8. I could not open the claude.ai page itself from this container; its wrapped equivalent is what G15 checks. The first hosted build failed G15's lab layer test (works not taller: the style tag sat in the head and ranked lab below the site CSS); fixed by appending it after the site CSS, then rechecked.
