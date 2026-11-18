# Six reel tips checked against the portfolio site (18 Nov 2026)

Source of the tips: theecommguy, "10 niche design hacks" reel (screenshot, 18 Nov 2026). Each was
checked with the "How to check it" of its entry in the taste library (ritacompany/claude-harness,
`taste/entries/`). The checks run with `node scripts/taste-audit.mjs` against the local server
(`npm run dev`) on the home, Mondai, Framework and Haven pages at 1440 and 390 wide. Raw output:
`reports/taste-audit.json`.

| Tip | Result on the site | Change |
| --- | --- | --- |
| Tabular numbers | Fail. The footer clock ticks every second in Satoshi's proportional digits (ten zeroes 273px, ten ones 132px at 40px). Its width moved between 107.3 and 111.2px over 8 ticks on the home page and between 107.2 and 112.2px on Haven, so it shuffled sideways. Satoshi carries tabular digits (both lines 264px with them on). | `.footer time { font-variant-numeric: tabular-nums; }` in components.css. After: 114.7px on every tick on both pages. |
| Optical centring | Pass. Pills, badges and buttons already trim text to cap height and baseline (`text-box: trim-both cap alphabetic`), the stronger form of the tip. A 2x pixel crop of a Haven pill puts the label within 1px of centre. | None |
| Concentric radius | Pass. The only nested rounded shapes are pills inside pills, which stay concentric by shape. | None |
| Alpha borders | Not applied. Every divider sits on one flat near black surface, where an alpha line and the current solid token render the same colour. No large image carries a hairline (28 on Haven alone); adding one would change the Figma locked look, so it stays a proposal. | None |
| Layered shadows | Not applicable. The site is dark and flat; the one outer shadow (the Haven phone chip) already has two layers. | None |
| Balanced headlines | Mixed, so the softer sibling was used. `balance` fixed a stranded word on phones but also rebroke desktop lines that already matched Figma, and it split "Design system" in the Mondai collection title on phones ("Design / system CS"), which reads worse than the current break. `pretty` only moves a line when a word would sit alone: across every h20 and h24 on Haven at 1440, 768 and 390, it changed exactly one break, the phone orphan. | `text-wrap: pretty` on `.h24` and `.h20` in haven.css. |

Evidence in this folder:
- `haven-intro-390-before.png` and `-after.png`: "capacities:" alone on a line, then fixed.
- `title-390-current.png` and `title-390-balance-rejected.png`: why balance was not applied to the
  collection titles.
