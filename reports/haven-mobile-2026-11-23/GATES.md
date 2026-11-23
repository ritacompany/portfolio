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
