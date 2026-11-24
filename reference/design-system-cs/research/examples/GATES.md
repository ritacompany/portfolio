# Gates: keep the ten design system examples for later

OWNS: reference/design-system-cs/research/examples/**

Scope: every one of the ten pages in EXAMPLES.md is captured whole (screens of the full page plus its text) into a private archive, and a public safe study file records what each page shows, section by section, so the set can be used without reopening the pages.

- [ ] G1: the archive holds, for each of the ten pages, screens covering the full page height and the page text
  CHECK: node check-archive.mjs
  EXPECT: ARCHIVE-PASS
  EVIDENCE: pending

- [ ] G2: STUDY.md has one section per page with its structure, visuals, numbers and what to take, matching the ten links in EXAMPLES.md, with no dash punctuation, no Oxford comma and no long quotes (public repo)
  CHECK: node check-study.mjs
  EXPECT: STUDY-PASS
  EVIDENCE: pending

- [x] G3: the private archive artifact is published and lists every page with its screens, and STUDY.md links to it
  EVIDENCE: 24 Nov 2026, https://claude.ai/artifact/Q5CKQKpkyB9bEWRXdpdP7s holds 185 files (page, data, 10 texts, 173 screens) per the artifact file listing; Playwright run at 390, 768, 1280 and 1920 px: no sideways scroll, list and notes collapse, arrow keys move screens and examples, every screen loads, no script errors.

- [ ] G4: STUDY.md, the checks and this ledger are on the remote branch
  CHECK: node check-pushed.mjs
  EXPECT: PUSHED-PASS
  EVIDENCE: pending
