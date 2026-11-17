# Gates: Haven pictures from his Figma originals (17 Nov)

OWNS: reports/haven-images/**, site/haven/assets/ (new files only), the img lines in site/haven/index.html that load them, reports/haven-tablet/FEEDBACK-13NOV.md (F7 to F10 rows)

Scope: every flattened 1x picture on the Haven page replaced by a render from his Portfolio Design file at 2x, made from the same frame, so nothing is shown larger than its own pixels on a sharp screen; looks the same as before apart from sharpness; nothing else on the page moves; committed and pushed.

- [x] G1: no picture on the Haven page is shown larger than its own pixels on a 2x screen at 768, 1024, 1180 and 1440 (baseline: 32 soft, media-before.txt)
  CHECK: node reports/haven-tablet/media.mjs 768,1024,1180,1440
  EXPECT: ^MEDIA_SHARP_OK$
  EVIDENCE: 17 Nov after the swap: exit 0, MEDIA_SHARP_OK (was 32 soft, media-before.txt; media-after.txt)

- [x] G2: the tablet layout checks still pass after the swap
  CHECK: node reports/haven-tablet/verify.mjs
  EXPECT: ^HAVEN_TABLET_OK 8 of 8$
  EVIDENCE: 17 Nov after the swap: exit 0, HAVEN_TABLET_OK 8 of 8; swap.mjs HAVEN_SWAP_OK 3 widths

- [x] G3: every new picture keeps the old one's proportions (within 1 percent), so no section changes height
  CHECK: node reports/haven-images/ratio.mjs
  EXPECT: ^RATIO_OK \d+ of \d+$
  EVIDENCE: 17 Nov: RATIO_OK 10 of 10

- [x] G4: a before and after crop of each swapped picture is viewed at 2x and shows the same content, sharper
  EVIDENCE: compare/ crops viewed for all eight: same content, sharper text and edges; the security background keeps its pixel look. Profile frame screenshot at 1440 matches his Figma frame 4264:7123 (the page had been stretching the background 2.8 times; CSS fixed to fill the frame)
