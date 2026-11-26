# Gates: motion goes clip first (page fade and the process behind it)

OWNS: docs/motion/page-transition/**, fixes/2026-11-26-page-fade-built-before-clip.md, .claude/hooks/site-review-gate.mjs, .claude/hooks/tests/site-review-gate-cases.mjs, .claude/motion-rules.md, .claude/skills/code-motion/SKILL.md, scripts/record-browser.mjs, output/motion/page-fade*

Scope: he sees a clip of any motion before it is built into the site, enforced by the site hook; the page fade, which skipped that, gets its clip and review now.

- [ ] G1: the fix record is complete
  CHECK: node .claude/skills/fix-the-process/scripts/check-fix-record.mjs fixes/2026-11-26-page-fade-built-before-clip.md
  EXPECT: fix record complete
  EVIDENCE: pending

- [ ] G2: the site hook refuses a motion file change, even after his yes, until that piece has a review log that passes; it still allows it once the log passes, and still allows non motion site changes after a yes (all old cases still pass)
  CHECK: node .claude/hooks/tests/site-review-gate-cases.mjs
  EXPECT: SITE_GATE_OK
  EVIDENCE: pending

- [ ] G3: the page fade has a real browser recording at 1440 and 390 and a review log whose last round passes motion-check
  CHECK: node scripts/motion-check.mjs log docs/motion/page-transition/review_log.md
  EXPECT: PASS
  EVIDENCE: pending

- [ ] G4: review strips exist for every cut in the state list, for both clips
  CHECK: node docs/motion/page-transition/strips.mjs
  EXPECT: PASS
  EVIDENCE: pending

- [ ] G5: a fresh context given only the motion rules and a new motion task says its first deliverable to him is a clip, before any site change (reviewer answers yes)
  EVIDENCE: pending

- [ ] G6: he has watched the page fade clip and said whether to keep it, change it or drop it
  EVIDENCE: pending
