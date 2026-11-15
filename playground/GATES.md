# Gates: hero and Selected works playground

OWNS: playground/**

Scope: the hero and Selected works from his Hero master frame (Desktop 1 MVP, page CS, 6109:21820), rebuilt as React components on the 14 Nov coded homepage, in a Vite, Tailwind v4 and shadcn setup that takes 21st.dev components, fully responsive.

- [x] G1: the playground builds with type checking
  CHECK: npm run build
  EXPECT: /built in \d+/
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/playground; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=bb72c8574b7fa6f63db35cce4acf2f06fd747debfe7ada9e9f1427f2c379e554; output-bytes=387

- [x] G2: at 1440 the hero and works match Figma's own renders of Hero image (6109:21821) and Works section (6109:21845) within the set limits; the 14 Nov layout fails the same check (control run 15 Nov: hero mean diff 27.4, works a different height)
  CHECK: node scripts/check.mjs figma
  EXPECT: FIGMA_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/playground; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=10ba5a2ab595634f83e86ec545b00a3dcbc1d5b8a0b5abffef43f6dbc830103d; output-bytes=208

- [x] G3: no sideways scroll at 18 widths from 320 to 2560; the check caught the grid class collision at 430, 600 and 767 before the fix
  CHECK: node scripts/check.mjs overflow
  EXPECT: NO_OVERFLOW_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/playground; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=9942ef0182475d3dc8fc93d985d6557b995f9cb4812788d7efd704c0c4ae7e92; output-bytes=25

- [x] G4: phone menu opens, traps focus, closes on Escape and returns focus; the phone bar drops in fixed past the hero; desktop card hover scales the image to 1.035 and turns the name white
  CHECK: node scripts/check.mjs behavior
  EXPECT: BEHAVIOR_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/playground; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=dddc8728d5bf460a6c7edceb38c649ef834d2e3a1bd75a627e9f547c463fdf6d; output-bytes=29

- [x] G5: a Tailwind utility overrides the site CSS on a site element, and the shadcn button added through the CLI renders styled in Satoshi
  CHECK: node scripts/check.mjs layers
  EXPECT: LAYERS_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/playground; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=4470e2b2d6a525e61d61481114c0927134a0fa44dda55425692c678b13db5f85; output-bytes=58

- [x] G6: npm run ui:add pulls a shadcn registry component that imports @/lib/utils and leaves no stray cn package (needs the network, so manual)
  EVIDENCE: 15 Nov, `npm run ui:add -- button` printed "ui:add done, 1 file(s) pointed at @/lib/utils"; src/components/ui/button.tsx line 3 imports from "@/lib/utils"; package.json has no "cn" entry and node_modules/cn is absent.

- [x] G7: widths without a Figma frame read as intended: 1920, 1200, 1024 and 768 carry the new hero and title; 390 keeps his Mobile frames with the new lede, no desktop wordmark and "Selected works" spaced
  EVIDENCE: 15 Nov, screenshots at 1920, 1200, 1024, 768 and 390 looked at after the last change. The first 390 pass showed the desktop wordmark over the phone hero and "Selectedworks"; both fixed and rechecked.
