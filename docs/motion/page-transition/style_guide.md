# Page change: style guide

Piece: moving between Home, the Mondai collection (/mondai/) and the framework case study
(/mondai/framework/). Code: site/css/page-transition.css only, no script.

## Decision
His yes, 26 Nov, to the research plan (reports/page-transition-research/PLAN.md, PR 54). His words
before it: he did not like the Mondai text resizing; the original label and the new one should just be
separate; something clean for now, flair later. The provisional title morph (20 Nov) is gone.

## What it does
- A plain fade through the page colour (Neutral/900). Old page out over 200 ms; new page in over 300 ms
  starting at 100 ms; both on the quart out easing token. Done at 400 ms, as the arriving page's own text fade
  starts (0.35 s wait, 1.4 s fade), so the two hand over instead of overlapping.
- Nothing travels between pages. The old label leaves with its page; the new label arrives with the new
  page's entrance, exactly as on a refresh.
- Same for links, the back button and the menu.
- Reduced motion: no fade, the page just changes. Firefox changes page as it does today.

## Flair later (not built)
From the plan: the nav holding still across pages, or a page colour curtain.
