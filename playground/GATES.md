# Gates: hero and Selected works playground

OWNS: playground/**

Scope: the hero and Selected works from the coded homepage, rebuilt as React components in a Vite, Tailwind v4 and shadcn setup that takes 21st.dev components, fully responsive and identical to the plain HTML site.

- [x] G1: the playground builds with type checking
  CHECK: npm run build
  EXPECT: /built in \d+/
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/playground; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=4d6b67ef6f5d7ff906577aa4bd837abf47a68f6ca2fa14f02de53508f63db392; output-bytes=387

- [x] G2: hero and Selected works are pixel identical to site/ at commit cbb837f (14 Nov) at 12 widths from 320 to 1920; the check fails on a 2 px shift of the hero lede (control run 15 Nov)
  CHECK: node scripts/check.mjs parity
  EXPECT: PARITY_OK
  CWD: .
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/playground; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=ca9bc8a3abc22dce293e2c898436580dcb0582f72e88a8a821ed46d12d8002fd; output-bytes=865

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

- [ ] G7: the hero matches the newer Hero section he made in Figma
  EVIDENCE: pending

ABANDON: G7 the Figma connector on this account is out of calls (View seat on the Professional plan that owns the portfolio file), so the new Hero section could not be read. Handoff: a link to the section in a file this account can read with its Full seat, or a screenshot, then update Hero.tsx and the legacy CSS against it.
