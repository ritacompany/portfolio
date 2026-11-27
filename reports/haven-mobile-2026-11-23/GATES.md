# Gates: Haven on a phone (23 Nov)

Each fix gate was run on the shipped page first and failed, then on the proposal (`--preview`) and passed,
then on the shipped page again once the change landed. Widths 320,360,375,390,430,600,767 unless named.
`A` is `node reports/haven-mobile-2026-11-23/audit.mjs`.

| Gate | Check | Shipped page before | Proposal | After landing |
|------|-------|---------------------|----------|---------------|
| G1 sticky hover | `A --only hover` | FAIL, 196 (28 per width) | PASS | pending |
| G2 press kept | `A --only press` | FAIL, 7 (the logo, no press look once the flash goes) | PASS | pending |
| G3 tap flash | `A --only tapflash` | FAIL, 245 | PASS | pending |
| G4 text floor | `A --only size` | FAIL, 55 (quiz labels at 9, flow at 9.9 from 600) | PASS | pending |
| G5 quiz labels fit | `A --only qlabel` | PASS (guard for G4) | PASS | pending |
| G6 page health | `A --only hscroll,hidden,cut --widths 320,360,375,390,430` and `A --only blur --widths 320,360,375,390,430` | PASS | PASS | pending |
| G7 nothing above 767 moves | full page screenshots at 768, 1024 and 1440, reduced motion, shipped vs proposal: identical pixels | n/a | PASS, SAME_ABOVE_767_OK (`same-above.mjs`) | pending |
| G8 site checks | `node scripts/verify-responsive.mjs fit\|overlap\|health\|size haven`, `node scripts/verify-hover-still.mjs site`, `node scripts/check-site.mjs`, `node scripts/verify-haven.mjs motion` | all OK on the base branch | n/a | pending |
| G9 deliverables | canvas published with screenshots and options; draft PR into claude/sharp-turing-jy21r2 | | canvas PASS (https://claude.ai/artifact/RogWyEykSCHTWoyx9TKDBG) | PR pending |

Not gated: `A --only body` lists the 14 px card text, which is the cards' Figma size (ISSUES.md). `verify-haven.mjs
body` and `files` compare against 9 Nov commit 87d58cd and already fail on the base branch (307171 pixels,
pill-tips files), so they are stale, not a check for this work.

The change itself waits on his yes: the site review hook blocks edits under site/ until he approves, so the
proposal lives in `site/dev/haven-phone/` (phone.css to append to haven.css, haven.js with the one line change).
Screenshots are on the canvas; `shots/` is kept out of git (17 MB).

## Round 2, his voice note (23 Nov)

| Gate | Check | Result |
|------|-------|--------|
| R1 ending bar names | `/tmp` bar probe, now in GATES as: short names on at most two lines at 320, 360, 375, 390, 430 | PASS with `options/ending-bar.css` (one line measured impossible: 213 px needed, 191 max) |
| R2 quiz options clear | labels off screen, on labels, on icons or on the phone, 320 to 767, both options | PASS, 0 collisions (`quiz-orbit.css`, `quiz-bigphone.css`) |
| R3 phone nav | bar and menu render on Haven at 390 from the shared markup | screenshots on the canvas; lands after his yes, moving Home's phone bar CSS into components.css |
| R4 dividers | report in `reports/dividers-2026-11-23/ISSUES.md` | colour waits on his call |
| R5 journey flow Figma frame | built in his file | PASS: frame 6394:30516 and component 6394:30515 on page CS under Mobile frames, at the built sizes (103 circles, 12 text, 120 pitch); Inter stands in for Satoshi, which the Figma plugin here cannot load |

## After landing (his typed yes, 24 Nov)

Shipped page, no preview: `A --only hover,press,tapflash,size,qlabel` at 320 to 767 HAVEN_PHONE_OK; `A --only
hscroll,hidden,cut,blur` at 320 to 430 HAVEN_PHONE_OK; `same-as-base.mjs` SAME_AS_BASE_ABOVE_767_OK (768, 1024,
1440 pixel identical to claude/sharp-turing-jy21r2); verify-responsive fit, overlap, health and size on haven OK;
HOVER_STILL_OK 50; site check OK (13 pages); HAVEN_MOTION_OK. Phone menu opens and closes by tap at 320, 390 and
767, hidden at 768 and 1440, no page errors.

Two faults the preview hid, caught here and fixed: the hide rule for the burger outranked the phone rule (now
`:where()`), and the menu's padding used `--m`, which is not set outside the page, so the close button sat
under the menu body. Divider colour is left to the session "Portfolio: divider strokes to Neutral/700 everywhere".
G1 to G9: met. R1 to R5: met. Quiz and timeline options: on the canvas for his pick, not built.

## Round 3 landed (his yes, 25 Nov): phone grid, floating quiz, MVP timeline

His phone grid (docs/DECISIONS.md: 4 columns, 24 margin, 24 gutter) replaces Haven's own 16 px margin; the
interview numbers gain the side margin they lacked; the ending bar names sit on two set lines inside the margins
(12 px under 390). The quiz drops its pillars: the five areas float above a phone 64 percent of the width that
rises into place on scroll. The MVP timeline follows the desktop chart: a line and dot under each column, the launch
circles on 07 and 12 with their labels to the left, "Case study end point" in Label/12 C under Identity launch.

Shipped page: audit hover, press, tapflash, size, qlabel, hscroll and cut at 320 to 767 HAVEN_PHONE_OK; hidden and
blur at 320 to 430 HAVEN_PHONE_OK; no text outside the 24 px margins at 320, 390 and 430 apart from the Haven CS
display title, whose ink sits on the margin by design; ending bar names two lines at 320 to 430; quiz labels clear
of each other, the icons and the phone at 320 to 767; same-as-base SAME_AS_BASE_ABOVE_767_OK; verify-responsive
fit, overlap, health and size OK; HOVER_STILL_OK; site check OK; HAVEN_MOTION_OK; phone menu opens and closes.
