# Gates: framework case study on a phone (under 768), 23 Nov

OWNS: reports/framework-mobile-2026-11-23/**, site/dev/framework-mobile/** (the proposal). After his yes:
site/css/framework.css, phone @media hunks only, by moving site/dev/framework-mobile/phone.css in unchanged.

Scope: audit the framework page at 320, 360, 375, 390 and 430 on touch emulation, fix the defects and the
P list matches to Haven's phone (reports/mobile-breakpoint/ISSUES.md), show design choices with no frame as
options, keep 768 and up untouched. The site review hook refuses edits under site/ outside site/dev without his
yes in the chat, so every fix is built as a proposal page that loads the live markup plus phone.css; the
gates run against that page and each was shown failing on the live page first (check-live-before.txt).

Fix gates (failed on the live page, pass on the proposal):

- [x] G1: side margin 16 on the page and the nav at every phone width (P1)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G1
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G2: the title on one line, at least 0.17 of the content width, ink inside the screen and on the margin (P2, option A)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G2
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G3: eyebrows 16 on 21.12, Heading/40 28 on 32.2 (P3, P4)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G3
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G4: every section 64 to its first text and 88 under its last thing, including the two that opened 24 low (P5)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G4
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G5: eyebrow to heading 40, heading to what follows 80, subhead or label to its body 20 (P6 to P8)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G5
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G6: hero details as one wrapping row, label 16 over value, rows 32 apart, title 48 over them (P9)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G6
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G7: the hero text 40 under the tagline (P10)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G7
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G8: no hover look on the carousel dots on a phone, a press still shows (his no hover rule)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G8
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt
- [x] G9: no blue tap flash on the carousel, the nav and the footer links
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G9
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); failed on the live page in check-live-before.txt

Guards (passed before, must keep passing on the proposal):

- [x] G10: the start of week carousel moves one template on a touch swipe and jumps on a dot tap
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G10
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); also passes on the live page (guard)
- [x] G11: by touch with motion on, nothing stays hidden, nothing passes the screen edge outside the carousel stage, no sideways scroll
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G11
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); also passes on the live page (guard)
- [x] G12: every element box at 768, 1024 and 1440 equals the live page
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G12
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); also passes on the live page (guard)
- [x] G13: the ending's tag and number keep at least 16 of ink between them (the overlap exemption below)
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /dev/framework-mobile/ G13
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-proposal.txt (PHONE_OK 13 of 13, 23 Nov); also passes on the live page (guard)
- [x] G14: the proposal measures no worse than the live baseline on the repo's own fit, overlap, size and health code (20 carousel card fits, 15 ending overlaps, at the five phone widths)
  CHECK: node reports/framework-mobile-2026-11-23/baseline-compare.mjs
  EXPECT: BASELINE_SAME
  EVIDENCE: baseline-compare.txt (BASELINE_SAME: fit 20 and 20, overlap 15 and 15, size 0, health 0)
- [x] G15: the repo checks pass on the live site (verify-responsive health framework, verify-hover-still site, check-site, check-week-carousel) and the carousel check passes on the proposal
  CHECK: node reports/framework-mobile-2026-11-23/repo-checks.mjs
  EXPECT: REPO_CHECKS_OK 5 of 5
  EVIDENCE: repo-checks.txt (REPO_CHECKS_OK 5 of 5)

Manual:

- [x] G16: the canvas shows real 2x touch screenshots at several phone widths, before and after per section, and the title options, with my pick
  EVIDENCE: canvas https://claude.ai/artifact/FjHyNuWbAaPackaNHgxP9E, 10 artboards, 18 screenshots at 2x on touch emulation (320, 390, 430)
- [x] G17: committed and pushed to claude/framework-mobile, draft PR into claude/sharp-turing-jy21r2, nothing merged
  EVIDENCE: draft PR https://github.com/ritacompany/portfolio/pull/43 into claude/sharp-turing-jy21r2, not merged

Exemptions (measured, not fixed):
- verify-responsive fit flags carousel cards 2 to 5 past the screen. The stage clips them on purpose (overflow
  hidden, center mode): only a sliver of the next card shows, which is the cue to swipe. G10 and G11 cover it.
- verify-responsive overlap flags "Capacity" over "6 of 8" (and two more) at every width. It compares em boxes,
  and the 104 px number's em box rises above its trimmed line; the ink is 28 or more apart (G13).

After his yes (23 Nov, question card "[site change]", answer "Yes, title A"):

- [x] G18: the phone block is in site/css/framework.css and every gate passes on the live page; the repo's fit and overlap sets at all five default widths are the baseline sets, size and health OK
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /mondai/framework/
  EXPECT: PHONE_OK 13 of 13
  EVIDENCE: check-live-after.txt (PHONE_OK 13 of 13); after-fit.txt and after-overlap.txt the same 20 and 15 items as base-fit.txt and base-overlap.txt; after-size.txt and after-health.txt OK; repo-checks-after.txt (REPO_CHECKS_OK 5 of 5)

After his yes on the phone menu (23 Nov, question card "[site change]", answer "Yes, build it"):

- [x] G19: under 768 Home's burger replaces the three links and opens the full screen menu by touch (About, Works, Contact and the email), which closes from its X; from 768 the links show and the burger does not
  CHECK: node reports/framework-mobile-2026-11-23/check.mjs /mondai/framework/ G14
  EXPECT: PHONE_OK 1 of 1
  EVIDENCE: check-live-menu.txt (PHONE_OK 14 of 14 with the menu in); failed before the menu markup (burger false, links true at all five widths); fit and overlap sets unchanged, size and health OK, repo checks 5 of 5
