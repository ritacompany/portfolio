# Gates: footer humanizer pass (CS2 framework page)

OWNS: reports/footer-humanizer-2026-11-20/**

Scope: a line by line read of the footer copy in his current frame, a full humanizer pass (draft, audit, final) and one recommended rewrite, given to him before any site or Figma change.

- [x] G1: every text string in the footer instance 6331:25758 and the strip 6331:25757 has a line in REVIEW.md with what is wrong or why it stands
  CHECK: node reports/footer-humanizer-2026-11-20/check.mjs coverage
  EXPECT: COVERAGE OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=3415a1285da1b3466a721348af2fb6989ad903c6f4ddaac8600800eae1d23866; output-bytes=12

- [x] G2: REVIEW.md has a draft, an audit and a final section, and the final copy has no em or en dash, no double hyphen and no Oxford comma
  CHECK: node reports/footer-humanizer-2026-11-20/check.mjs copy
  EXPECT: COPY OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=7f4fb4b02918/15 entries; EXPECT=matched; output-sha256=0a9ee1f176dc45bf8ad71fee5883b4a9e0803a4489f744a365f79ef398f922ba; output-bytes=8

- [x] G3: every fact in the final copy traces to the repo (Chicago, New York, product design, the email, LinkedIn, Resume); manual, listed in REVIEW.md Fact trace
  EVIDENCE: REVIEW.md Fact trace names the repo source for each fact; nothing implies a move

- [x] G4: no site file and no Figma node changed before his yes; manual, git diff shows only this folder and every Figma call was a read
  EVIDENCE: git status shows only this folder; all four Figma calls were reads (one over the size limit returned nothing and committed nothing)
