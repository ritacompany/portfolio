# Gates: CI image check on claude/sharp-turing-images

OWNS: site/**/*.webp, scripts/check-images.mjs, reports/images-ci-2026-11-26/**

Scope: every picture on the four shipped pages is sharp on a 2x screen and under 500 KB, with no layout, copy, motion or CSS change, pushed with a draft PR into claude/sharp-turing-jy21r2.

- [x] G1: the image check passes on all four pages at 390, 768, 1024 and 1440
  CHECK: PLAYWRIGHT_BROWSERS_PATH=/tmp/claude-0/-home-user-portfolio/0a9df5a4-dbed-5122-a21b-7e6244b92f00/scratchpad/pw node scripts/check-images.mjs all
  EXPECT: IMAGES_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6f68183f6e5d/16 entries; EXPECT=matched; output-sha256=cbf0d734090852489d0510c9f596be69c9b5ba4fa997d4a33310aa0569177e2c; output-bytes=94

- [x] G2: the site check passes
  CHECK: npm run check
  EXPECT: site check OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio/reports/images-ci-2026-11-26; path=6f68183f6e5d/16 entries; EXPECT=matched; output-sha256=c76bb679c9cb8260d1a8dd9e11813e8688dd7de2ae278cc77e24a36f19f5233d; output-bytes=67

- [x] G3: the responsive health check passes
  CHECK: PLAYWRIGHT_BROWSERS_PATH=/tmp/claude-0/-home-user-portfolio/0a9df5a4-dbed-5122-a21b-7e6244b92f00/scratchpad/pw node scripts/verify-responsive.mjs health all
  EXPECT: RESPONSIVE_HEALTH_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6f68183f6e5d/16 entries; EXPECT=matched; output-sha256=3b1dfe4adbc1d3f8a1bba687655975d9145612ba5cf9c220340f25a6e892a705; output-bytes=36

- [x] G4: only pictures, the image check and this report changed (no HTML, CSS or JS)
  CHECK: node reports/images-ci-2026-11-26/gates.mjs scope
  EXPECT: SCOPE_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6f68183f6e5d/16 entries; EXPECT=matched; output-sha256=caa60d144d81ea6aa8eadeaf2883d900a2ad6fbec0a9a874c892106df0ff671c; output-bytes=12

- [x] G5: the edited check still fails on a known bad case
  CHECK: PLAYWRIGHT_BROWSERS_PATH=/tmp/claude-0/-home-user-portfolio/0a9df5a4-dbed-5122-a21b-7e6244b92f00/scratchpad/pw node reports/images-ci-2026-11-26/gates.mjs control
  EXPECT: CATCHES_HEAVY_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6f68183f6e5d/16 entries; EXPECT=matched; output-sha256=fdcd1f7656c4bc83c16caca488ca2d1424f4028386225681f8bdf1b02bda8f49; output-bytes=17

- [x] G6: the work is committed and pushed
  CHECK: node reports/images-ci-2026-11-26/gates.mjs pushed
  EXPECT: PUSHED_OK
  CWD: ../..
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=6f68183f6e5d/16 entries; EXPECT=matched; output-sha256=e495d43a6efbc67041a8c877da1066334801d1f74ebf999085b82e6be0d3bd52; output-bytes=10

- [x] G7: Haven re-encodes show no visible loss at 1440 and 390, and the new laptop and capacity card match the old files in content
  EVIDENCE: Haven PSNR at drawn 2x size 35.9 and 37.8 dB at 1440, 37.3 and 39.7 at 390; side by side crops cmp-*-1440.png checked by eye, no visible difference. Laptop: new file downscaled to 817x1024 differs from the old by 1.5 levels mean on opaque pixels, alpha 0.25. Capacity card: 3x export downscaled to 616x596 differs by about 3 levels mean, edges aligned in an 8x diff image.
