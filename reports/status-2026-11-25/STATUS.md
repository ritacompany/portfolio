# Portfolio status, 25 Nov 2026

Read only audit. Every line below was checked against the branches on GitHub on 25 Nov (tips, ancestry and test merges in a scratch worktree), not taken from TRACKER.md, LEDGER.md or NEXT.md. Nothing under `site/`, in Figma or in any PR was changed.

## Update, later on 25 Nov

Step 1 of Next is done. The PR review session merged #49 and #50 into `claude/haven-mobile`, then #44, #42, #43, #45 and #46 into `claude/sharp-turing-jy21r2` (checked: every one of those branches is now inside `sharp-turing`). `sharp-turing` is still not on `main`. Its checks fail only on the image check: 6 soft pictures (the Mondai card phone and laptop on home at 390, the framework timeline and right rail at 390 to 1024) and 2 Haven pictures over 500 KB (`program-texture-3x.webp` 591 KB, `profile-background.webp` 568 KB). The site check and the responsive check pass. Next is now steps 2 and 3 below.

## The short version

Almost everything built since 16 Nov sits on a stack of unmerged branches. `main` has only the site cursor (PR #34), the Haven tablet ending, the taste audit and the hero illustration work. The site is not live. The stack merges together cleanly today, so the next job is to fold it up and land it on `main`.

The stack, newest on top:

```
claude/haven-flow-order (#49)   claude/haven-testing-cards (#50)
            \                    /
             claude/haven-mobile (#44)        also onto sharp-turing: #42, #43, #45, #46
                        |
             claude/sharp-turing-jy21r2 (#41)  (already holds main up to PR #34, and PR #40)
                        |
             claude/relaxed-ride-5mlbdu       also onto it: #24, #25, #27, #30, #35, #36, #37, #38
                        |
                      main   (no open PR from the stack into main)
```

Where the newest version of each page lives:

| Page | Newest state | Not yet in it |
|---|---|---|
| Home | `claude/haven-mobile` (same home as `claude/sharp-turing-jy21r2` tip 28bdc46, phone Learn more from 24 Nov) | #42 tablet Learn more, #45 link states, #46 dividers |
| Haven | Split three ways: `claude/haven-mobile` (phone grid, quiz, timeline), `claude/haven-flow-order` (flow order and phone list), `claude/haven-testing-cards` (testing cards) | Each lacks the other two. `haven-flow-order` also lacks the last four commits of `haven-mobile`, including 54901c9 |
| Framework | `claude/relaxed-ride-5mlbdu`, carried up into `sharp-turing` | #35, #36, #37, #38 (21 Nov), #43 phone |
| Mondai collection | `claude/mondai-collection` (#30, provisional) and `card-to-collection-transition` (#39, three directions) | Conflicts with the home sync on `sharp-turing` in `site/index.html`, `site/css/home.css`, `site/mondai/index.html` and `docs/DECISIONS.md` |
| Hero illustration | `main` (v6 drawing, three color versions, 25 Nov) | Not a site page yet |

Test merges run 25 Nov: #49 and #50 onto `haven-mobile` clean; #42, #43, #45, #46 and `haven-mobile` onto `sharp-turing` clean; #35 to #38 and #30 onto `relaxed-ride` clean; `haven-flow-order` into `main` clean. `relaxed-ride` alone into `main` conflicts in `site/dev/preview/`, which `sharp-turing` already resolved when it merged `main`.

## Done

Verified on the branch named. Done here means built and given his yes; only the first item is on `main`.

- **Site cursor**, dot that grows into Learn more over the Mondai and Haven cards: merged to `main` by PR #34 (21 Nov).
- **Haven flow order**: Schedule a chat before Intro chat, desktop and phone, phone version from his "Flow updates" frame 6445:24415. `claude/haven-flow-order`, draft PR #49 into `claude/haven-mobile`. Checked in `site/haven/index.html` line 249: "Revised flow: identity quiz, review matches, schedule a chat, intro chat, select a Confidante". Write up: `reports/haven-flow-order/FINDINGS.md`.
- **Haven testing cards**: his Figma insight text back, cards hug their text. `claude/haven-testing-cards`, PR #50 (his yes 25 Nov).
- **Haven on a phone**: his phone grid, floating quiz, MVP timeline with Case study end point. `claude/haven-mobile` tip 54901c9, PR #44 (his yes 25 Nov).
- **Home, one version**: Figma "Mondai home newest" sync, testimonials hidden, site cursor and preview motion in the site, phone Learn more. `claude/sharp-turing-jy21r2`, PR #41.
- **Framework page at desktop and tablet**: sync fixes, Rollover row, tablet frames, popover gradient, Foundation diagram. `claude/relaxed-ride-5mlbdu` (fast forwarded to `claude/fw-integration` on 21 Nov).
- **Hero illustration parts**: pipe, planter, connector, cords, spring, box, coral and flowers picked; v6 drawing redrawn with all of them. `main`, `prototypes/hero-sketch-reference/`.

## Open

| Item | Blocked by | Waits on |
|---|---|---|
| Fold #49 and #50 into `haven-mobile`, then #44 into `sharp-turing` | His yes to merge | Him, then a merge |
| PR #49 CI image check red | Soft images on home and framework, two Haven images over 500 KB. Already red on its base (per the 25 Nov session; not rerun here) | A session |
| Haven phone list scroll timing | His final animation review | Him |
| Old flow order in his Figma: component "Confidante selection flow" 5733:14733 and frame 6445:24415 | He fixes these himself | Him |
| #42 home tablet Learn more, #45 link states, #46 dividers, #43 framework phone | Merge into `sharp-turing`; commits record his yes | A merge |
| #35 Start of week tablet, #37 framework round 2 | Open since 21 Nov, merge into `relaxed-ride` | Him (review) then a merge |
| #36 three line headlines, #38 shorter Start of week copy | Proposals | Him |
| #25 framework footer words, #27 Figma location registry, #24 review preview standard | Proposals | Him |
| Mondai collection page (#30) and its card transition (#39) | His pick of transition; then a conflict with the home sync to resolve | Him, then a session |
| Design system CS | He rejected colour round 1 on 23 Nov and is studying ten examples to choose a format (#48, #47, #51 on `claude/design-system-cs-draft`, PR #11) | Him |
| Hero illustration | Pick among the three v6 color versions | Him |
| Nothing from the stack is on `main` | The stack above | A merge |
| Deploy to Vercel at chadwickfenner.com (S4) | Everything on `main`, then domain access. Costs written up in PR #8. The live domain could not be reached from this container, so its current state is unchecked | A session, then him for the domain |
| TRACKER.md, NEXT.md and LEDGER.md are stale | NEXT is from 28 Oct; LEDGER covers the old `build/` Metalab work; TRACKER's stage plan was overtaken by D8 on 8 Nov | A session |
| About 30 old branches and six very old draft PRs (#1, #6, #13, #15, #17, #19) | A keep or delete list | A session proposes, he approves |

## Next

1. **Fold up the Haven and home stack.** Merge #49 and #50 into `haven-mobile`, then #44, #42, #43, #45 and #46 into `sharp-turing`. Reason: Haven is split across three branches today, so no single preview shows the page he approved, and every new session that branches off one of them widens the gap. All of these merged cleanly in a test on 25 Nov.
2. **Turn the image check green on the folded branch.** Re-export the soft images on home and framework and bring the two Haven images under 500 KB. Reason: the check is red on every PR in the stack, so it cannot catch a new failure; this needs no decision from him.
3. **Land the stack on `main` and refresh the tracker.** Clear the four framework PRs from 21 Nov (#35 to #38) with him, merge `relaxed-ride` and the folded `sharp-turing` into `main` through one PR, then rewrite NEXT.md and the TRACKER in flight list from this file. Reason: `main` is the branch that deploys and the tracker's own rule is that state lives on `main`; until then launch (S4) cannot start.
