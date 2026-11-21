# Gates: framework page, round 2 fixes from his 21 Nov review (Rescheduling, Target and pace image, Schedule view list)

OWNS: reports/fw-fixes-round2-2026-11-21/**, site/css/framework.css (the two tablet background url() lines only), site/mondai/framework/index.html (the Rescheduling img src only), scripts/framework-page/build.py (the schedule-gaps file name only), site/assets/framework/schedule-gaps-v2@2x.webp (renamed copy of schedule-gaps@2x.webp)

Scope: the Target and pace and Calendar setup images show at every width both on the site and inside his review preview, the Rescheduling heading keeps 32 to its body and the popover image is his current export under a name no browser has cached, every existing check still passes and a draft PR goes into claude/fw-integration. Start of week is not touched.

- [ ] G1: framework.css loads no image from a site root path, so the page works under any folder (the cause of the missing tablet images in his preview)
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs css
  EXPECT: CSS_PATHS_OK
  EVIDENCE: pending

- [ ] G2: the Target and pace rail image and the Calendar setup image paint real pixels at 390, 768, 1024, 1159, 1160, 1200 and 1440, both on the site at root and in a review preview built and served under a subfolder; the check fails on the unfixed CSS (planted control)
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs images
  EXPECT: IMAGES_OK
  EVIDENCE: pending

- [ ] G3: Rescheduling an Action Item sits 32 above its body (heading baseline to body cap top, in design px, within 1) at 390, 768, 1024, 1159, 1160, 1200 and 1440
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs gap
  EXPECT: GAP_OK
  EVIDENCE: pending

- [ ] G4: the Rescheduling image the page loads is byte for byte his current popover export (the PR #29 file, sha256 6b8aed6c...) under a file name the old preview never served
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs popover
  EXPECT: POPOVER_OK
  EVIDENCE: pending

- [ ] G5: every existing framework check passes on this branch
  CHECK: node reports/fw-fixes-round2-2026-11-21/run-existing.mjs
  EXPECT: ALL_EXISTING_OK
  EVIDENCE: pending

- [ ] G6: Schedule view at 768 and 1440 compared against his frames; every difference left is listed for him in FINDINGS.md rather than guessed at, with the desktop compare image saved
  CHECK: node reports/fw-fixes-round2-2026-11-21/check.mjs findings
  EXPECT: FINDINGS_OK
  EVIDENCE: pending

- [ ] G7: branch pushed, draft PR open into claude/fw-integration, review preview republished, lead session sent the PR link
  EVIDENCE: pending
