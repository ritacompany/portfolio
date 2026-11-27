# Gates: motion goes clip first (page fade and the process behind it)

OWNS: docs/motion/page-transition/**, fixes/2026-11-26-page-fade-built-before-clip.md, .claude/hooks/site-review-gate.mjs, .claude/hooks/tests/site-review-gate-cases.mjs, .claude/motion-rules.md, .claude/skills/code-motion/SKILL.md, scripts/record-browser.mjs, output/motion/page-fade*

Scope: he sees a clip of any motion before it is built into the site, enforced by the site hook; the page fade, which skipped that, gets its clip and review now.

- [x] G1: the fix record is complete
  CHECK: node .claude/skills/fix-the-process/scripts/check-fix-record.mjs fixes/2026-11-26-page-fade-built-before-clip.md
  EXPECT: fix record complete
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=26526f6d2c25/16 entries; EXPECT=matched; output-sha256=3b3cee959eb9c56f2abdb0f0671479c6b61e056eaba0354add80e5ff6348b5c8; output-bytes=52

- [x] G2: the site hook refuses a motion file change, even after his yes, until that piece has a review log that passes; it still allows it once the log passes, and still allows non motion site changes after a yes (all old cases still pass)
  CHECK: node .claude/hooks/tests/site-review-gate-cases.mjs
  EXPECT: SITE_GATE_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=26526f6d2c25/16 entries; EXPECT=matched; output-sha256=c2622b23b1fe40eca532ce95b625d7eda9db3ac99c7342a8674320cd3e20daab; output-bytes=19

- [x] G3: the page fade has a real browser recording at 1440 and 390 and a review log whose last round passes motion-check
  CHECK: node scripts/motion-check.mjs log docs/motion/page-transition/review_log.md
  EXPECT: PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=26526f6d2c25/16 entries; EXPECT=matched; output-sha256=5e3e2ae2f426cb5176489fc52b0e6420962ba2cc8d4c6ed51b14b535bbd6b731; output-bytes=95

- [x] G4: review strips exist for every cut in the state list, for both clips
  CHECK: node docs/motion/page-transition/strips.mjs
  EXPECT: PASS
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=26526f6d2c25/16 entries; EXPECT=matched; output-sha256=6845a47d3be2fa1b98cda6c44b1650027415ee151c873135869104e4184486c6; output-bytes=177

- [x] G5: a fresh context given only the motion rules and a new motion task says its first deliverable to him is a clip, before any site change (reviewer answers yes)
  EVIDENCE: manual, 27 Nov. Two Sonnet subagents given only motion-rules.md and code-motion/SKILL.md, tasks "hold the nav still across the page change" and "slide the framework section titles in": both put the clip first and answered No to changing site/ before his answer, quoting the rewritten Reference first line. Record: fixes/2026-11-26-page-fade-built-before-clip.md, Verification.

- [ ] G6: he has watched the page fade clip and said whether to keep it, change it or drop it
  EVIDENCE: pending
