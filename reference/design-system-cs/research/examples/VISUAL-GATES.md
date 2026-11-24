# Gates: ten more design system examples, chosen for visuals

OWNS: reference/design-system-cs/research/examples/VISUAL-*, check-visual*.mjs, capture-visual.cjs

Scope: ten more designer written design system case studies, picked for how they show the system in
images, feeding Lens E of STRATEGY.md. Research only: no draft, outline or material file changes.

- [x] G1: VISUAL-EXAMPLES.md lists ten pages, each with author, role, date and its visual devices; none is already in EXAMPLES.md, REFERENCE-BOARD.md or the case studies report; at least six device kinds across the set and at least two pages marked strong on data visualisation; public safe copy
  CHECK: node check-visual-examples.mjs
  EXPECT: VISUAL-EXAMPLES-PASS
  EVIDENCE: 24 Nov 2026, exit=0, EXPECT matched (output sha256 prefix 55f4d8b184aec6ff); negative control: swapping row 1 to the Wise URL made it FAIL on both the exact URL and the same site rule

- [x] G2: VISUAL-STUDY.md has one section per page (visuals that carry it, captions and layout, outline 2 section served) and a catalogue of devices that names all twenty pages, grouped by what the device proves; public safe copy
  CHECK: node check-visual-study.mjs
  EXPECT: VISUAL-STUDY-PASS
  EVIDENCE: 24 Nov 2026, exit=0, EXPECT matched (sha256 prefix 10b63c9edb6c0c2e); before the archive link went in it failed with no archive link, as it should

- [x] G3: every one of the ten was opened in Chromium; the local archive holds screens down to the page bottom and the page text for each
  CHECK: node check-visual-archive.mjs
  EXPECT: VISUAL-ARCHIVE-PASS
  EVIDENCE: 24 Nov 2026, exit=0, EXPECT matched (sha256 prefix af510c9849808a39), against the scratchpad captures

- [ ] G4: a fresh Sonnet agent, given only the links and the criteria, passed every kept page; any failure was replaced and the replacement checked
  EVIDENCE: round 1 (first ten) kept five, failed Monzo.com, Hajimari and COG, The Knot Worldwide and the 40+ products page; Student Beans was unverifiable (Cloudflare) and kept on our own full read. Round 2 (four replacements) passed Holzprofi24 and Limbo Citi, failed Tidal, and could not open JW Player (Cloudflare; kept on our own full read, lead role stated on the page). Tidal was replaced with Halstack; a third round was refused by the session's agent limit hook.
ABANDON: G4 Halstack (and the two Cloudflare pages) were not passed by an independent agent; they rest on our own capture only. Chadwick or the organizer should open those three before relying on them.

- [x] G5: the private archive artifact is published with every screen and the full text, and VISUAL-STUDY.md links to it
  EVIDENCE: https://claude.ai/artifact/Y9xXP7mVwqB3Quz9Wvq8iY version 3 holds 239 files (page, data, 10 texts, 227 screens) per the artifact file listing; Playwright at 390 and 1280 px: no sideways scroll, arrow keys move screens, screens load, no script errors

- [x] G6: the files are on the remote branch and a draft PR into claude/design-system-cs-draft is open
  EVIDENCE: branch claude/design-system-cs-visual pushed; draft PR https://github.com/ritacompany/portfolio/pull/48 into claude/design-system-cs-draft
