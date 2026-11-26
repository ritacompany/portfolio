# Gates: CI image check on claude/sharp-turing-images

OWNS: site/**/*.webp, scripts/check-images.mjs, reports/images-ci-2026-11-26/**

Scope: every picture on the four shipped pages is sharp on a 2x screen and under 500 KB, with no layout, copy, motion or CSS change, pushed with a draft PR into claude/sharp-turing-jy21r2.

- [ ] G1: the image check passes on all four pages at 390, 768, 1024 and 1440
  CHECK: PLAYWRIGHT_BROWSERS_PATH=/tmp/claude-0/-home-user-portfolio/0a9df5a4-dbed-5122-a21b-7e6244b92f00/scratchpad/pw node scripts/check-images.mjs all
  EXPECT: IMAGES_OK
  EVIDENCE: pending

- [ ] G2: the site check passes
  CHECK: npm run check
  EXPECT: site check OK
  EVIDENCE: pending

- [ ] G3: the responsive health check passes
  CHECK: PLAYWRIGHT_BROWSERS_PATH=/tmp/claude-0/-home-user-portfolio/0a9df5a4-dbed-5122-a21b-7e6244b92f00/scratchpad/pw node scripts/verify-responsive.mjs health all
  EXPECT: RESPONSIVE_HEALTH_OK
  EVIDENCE: pending

- [ ] G4: only pictures, the image check and this report changed (no HTML, CSS or JS)
  CHECK: node reports/images-ci-2026-11-26/gates.mjs scope
  EXPECT: SCOPE_OK
  EVIDENCE: pending

- [ ] G5: the edited check still fails on a known bad case
  CHECK: PLAYWRIGHT_BROWSERS_PATH=/tmp/claude-0/-home-user-portfolio/0a9df5a4-dbed-5122-a21b-7e6244b92f00/scratchpad/pw node reports/images-ci-2026-11-26/gates.mjs control
  EXPECT: CATCHES_HEAVY_OK
  EVIDENCE: pending

- [ ] G6: the work is committed and pushed
  CHECK: node reports/images-ci-2026-11-26/gates.mjs pushed
  EXPECT: PUSHED_OK
  EVIDENCE: pending

- [ ] G7: Haven re-encodes show no visible loss at 1440 and 390, and the new laptop and capacity card match the old files in content
  EVIDENCE: pending
