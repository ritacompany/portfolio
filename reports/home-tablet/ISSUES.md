# Home page, tablet (768 to 1199): issues

Audited 13 Nov at 768, 834, 1024 and 1180 (Playwright with reduced motion on and off, and the built-in
browser at 834 by 1112), against the page at 1440 and the tablet grid. The live tablet grid is 8 columns,
32 margin and 32 gutter (tokens.css, from docs/PROJECT_CONTEXT.md on 10 Nov); the brief's 24 gutter is the
older figure in docs/SITE_BUILD_PLAN.md, so measurements use 32.

Measurements come from `node reports/home-tablet/measure.mjs 768,834,1024,1180 [shotsDir]` with the site
served on PORT (default 4319).

## The list

| # | Issue | Measured | Owner of the fix |
|---|---|---|---|
| H1 | The hero is a fixed 760 px tall at every tablet size, so it never fills the first screen the way it does at 1440 (900 on a 900 screen) and on the phone (one screen tall). On a portrait tablet the first screen ends partway into Selected works, with the card names and the tops of the images cut by the bottom edge. | Hero 760 tall on screens 1024 (768 by 1024), 1112 (834 by 1112), 1366 (1024 by 1366) and 820 (1180 by 820); the card row starts at 1013, so 834 by 1112 shows its top 99 px and 1024 by 1366 shows 353 of its 430. Crop: shots/h1-first-screen-834x1112-before.png | Me |
| H2 | verify-1440 fails "boxes home": the check looks for the hero line by Figma id 5812:22877, which 299b09b (11 Nov) replaced with his master's id 4929:12396 when the phone got its own hero line. The page is right; the check data is stale. | `lede: 0 matches for [data-figma-node='5812:22877']`. Measured at 1440 the hero line is x 40, y 468, 457 by 66, exactly the box the check expects | Not mine: the id lives in scripts/figma-pages.json, shared check data, already tracked as N11 in reports/nov12-audit/GATES.md (figma-sync). The fix is one line: change that selector to `[data-figma-node='4929:12396']` |

Checked and fine at every width from 768 to 1192 in 8 px steps: no sideways scroll; the card heads never
overlap or run past their card; the hero line never reaches the location block. The hero line, the
location, the navbar and the About bodies sit on the 8 column grid. Line length in About is 42 to 67
characters, inside a readable range for 20 px type. The work cards keep their 1440 proportions (879 to
443) on tablet by the Phase 3 decision in home.css, so their edges sit off the column lines at tablet as
they do at 1440; not listed. Home has no entrance motion, so reduced motion only changes the card hover,
which touch tablets do not get.

Seen but owned elsewhere: the footer (components.css, shared with framework and Haven) drops the portraits
to their own row with an empty right half at tablet; the footer Contact button reads large.
