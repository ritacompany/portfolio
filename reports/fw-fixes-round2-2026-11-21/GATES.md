# Gates: framework page, round 2 fixes from his 21 Nov review (Rescheduling, Target and pace image, Schedule view list)

OWNS: reports/fw-fixes-round2-2026-11-21/**, site/css/framework.css (the two tablet background url() lines only), site/mondai/framework/index.html (the Rescheduling img src only), scripts/framework-page/build.py (the schedule-gaps file name only), site/assets/framework/schedule-gaps-v2@2x.webp (renamed copy of schedule-gaps@2x.webp)

Scope: the Target and pace and Calendar setup images show at every width both on the site and inside his review preview, the Rescheduling heading keeps 32 to its body and the popover image is his current export under a name no browser has cached, every existing check still passes and a draft PR goes into claude/fw-integration. Start of week is not touched.

- [x] G1: framework.css loads no image from a site root path, so the page works under any folder (the cause of the missing tablet images in his preview)
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs css
  EXPECT: CSS_PATHS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=717fe78f66f0/16 entries; EXPECT=matched; output-sha256=22f7f5731b304fefbcdd653a96e1b10fa116c54784251b0b4b5e4c9456c6d38c; output-bytes=13

- [x] G2: the Target and pace rail image and the Calendar setup image paint real pixels at 390, 768, 1024, 1159, 1160, 1200 and 1440, both on the site at root and in a review preview built and served under a subfolder; the check fails on the unfixed CSS (planted control)
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs images
  EXPECT: IMAGES_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=717fe78f66f0/16 entries; EXPECT=matched; output-sha256=eef4cd0aee939b0de4da66fc64fda0485d7699a9e93b24f99df92d9d40c8642d; output-bytes=63

- [x] G3: Rescheduling an Action Item sits 32 above its body (heading baseline to body cap top, in design px, within 1) at 390, 768, 1024, 1159, 1160, 1200 and 1440
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs gap
  EXPECT: GAP_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=717fe78f66f0/16 entries; EXPECT=matched; output-sha256=2a2135534157d62c368fc61a47aff8c1108381a239538ae87a50b507690d9c18; output-bytes=7

- [x] G4: the Rescheduling image the page loads is byte for byte his current popover export (the PR #29 file, sha256 6b8aed6c...) under a file name the old preview never served
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs popover
  EXPECT: POPOVER_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=717fe78f66f0/16 entries; EXPECT=matched; output-sha256=c05530940fa6864762c5be61411e22050c5b3790a1a9b73c65dc214ec0e037a4; output-bytes=11

- [x] G5: every existing framework check passes on this branch
  CHECK: node reports/fw-fixes-round2-2026-11-21/run-existing.mjs
  EXPECT: ALL_EXISTING_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=717fe78f66f0/16 entries; EXPECT=matched; output-sha256=88e6f91a907c8d664bd0805ef0d81d8e9c5c61f371fd383a46b36a21eba8000b; output-bytes=1248

- [x] G6: Schedule view at 768 and 1440 compared against his frames; every difference left is listed for him in FINDINGS.md rather than guessed at, with the desktop compare image saved
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs findings
  EXPECT: FINDINGS_OK
  EVIDENCE: exit=0; shell=/bin/sh; cwd=/home/user/portfolio; path=717fe78f66f0/16 entries; EXPECT=matched; output-sha256=c938ae8b07197d74ecdeed9bfdcb04b48944980f8caf85d5261f869c21cbb9d2; output-bytes=12

- [ ] G7: branch pushed, draft PR open into claude/relaxed-ride-5mlbdu (the lead moved the base there; same code as claude/fw-integration plus a handoff note), review preview republished, lead session sent the PR link
  EVIDENCE: pending
