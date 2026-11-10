# Figma sync, 10 Nov 2026

Source: his Portfolio Design file `IarvWaqjIwrZ2afQmMxKm6`, page VC. Desktop: Master (cleanup copy)
`4494:5909`, 1440 wide. Phone: Mobile frames `4929:12379` (hero `4928:11925`, menu `4928:11959`, works
`4928:12018`, about `4929:12243`, footer `4929:12309`). Plus the file's local variables (01 Portfolio,
02 Haven, 03 Mondai) and its thirteen local text styles. Read only; nothing in his file was changed.

Compared against `site/css/tokens.css`, `base.css`, `grid.css`, `components.css`, `home.css`,
`framework.css`, `collection.css`, `site/haven/haven.css`, the fonts in `site/assets/fonts` and the icons
Home draws. The Testimonials section (`4929:12428`) and its footer link stay out, on hold at his ask.

## What did not change

- Every 01 Portfolio colour (34) is the value the site already had.
- Every text style that existed is unchanged: family Satoshi, weights, sizes, line heights and tracking.
  Only the names moved (the labels now sit under Body/Label/).
- Fonts: still Satoshi Regular, Medium and Bold, the three files shipped. No font file changed.
- The 12 column, 40 margin, 40 gutter desktop grid; section heights of the hero (900), Selected works
  (1210.99) and About (543 and 208); the footer's size and layout apart from the rows below.
- haven.css, framework.css and collection.css use Portfolio neutrals and their own one off colours, none of
  which moved. Nothing to change there.

So his changes were made on the layers in the master, not in the variables or styles. That is why a
token check alone never caught them.

## Differences and what happened to each

Status: fixed (site now matches), kept (left as is on purpose, reason given), flagged (needs his call).

| Id | Where | Figma (his file) | Site before | Status | Change |
|---|---|---|---|---|---|
| D1 | Text styles | Body/20 is new: Regular 20, 132 percent, tracking -2 percent | missing | fixed | `--body-20` in tokens.css (26 px whole pixel line, as the other styles) |
| D2 | Variables | 02 Haven has 31 colours | 6 | fixed | all 31 in tokens.css as `--haven-*` |
| D3 | Variables | 03 Mondai has 8 colours | 1 | fixed | all 8 in tokens.css as `--mondai-*` |
| D4 | Token check | his file | read the stale Mondai copy `5RO0m4bY...`, and had been failing on the whole pixel line heights | fixed | verify-tokens.mjs reads values from this read, desktop block only, px line heights checked to half a pixel |
| D5 | Hero lede copy | "I'm a system-minded, nuance led designer, designing for what we know now, while leaving space for what may change out minds." | the older line | fixed | index.html. "out minds" set as "our minds"; see F1 |
| D6 | Hero lede colour | Neutral/100 | Neutral/050 | fixed | home.css |
| D7 | Hero lede width | 457 | 385 | fixed | home.css, spans 5 columns at 1200 and up |
| D8 | Hero lede row | top 468 | 423 | fixed | home.css |
| D9 | Location block | x 623 (126 after the lede): column 6 | x 509, column 5 | fixed | home.css, 1200 and up; tablet keeps column 5 |
| D10 | Relocate row | 14 tall, icon at -1, text at +1.5 | 11 tall | fixed | home.css |
| D11 | Dolly icon | Neutral/400 on desktop, Neutral/200 on the phone | Neutral/100 | fixed | dolly.svg to #C9C9D4, new dolly-200.svg for the phone |
| D12 | "Looking to relocate to NYC" | Neutral/200 (desktop and phone) | Neutral/100, Neutral/050 on the phone | fixed | home.css |
| D13 | CHDWCK hero wordmark | live text, Satoshi Medium 392.5, Neutral/200, bleeding past both edges, glyph tops at 580.51 | an outlined 1440 by 290 drawing at 535, Neutral/050 | fixed | chdwck-hero.svg replaced with his text outlined from the master, top 580.51, height 293 |
| D14 | Product Designer | Neutral/550 desktop, Neutral/300 phone | Neutral/050 | fixed | components.css and home.css |
| D15 | Nav links (Link, Nav, Default) | Neutral/050 at rest | Neutral/300 | fixed | components.css; hover keeps its weight change, so a hover is still visible |
| D16 | Line above Selected works | none | Neutral/800 line | fixed | home.css |
| D17 | Selected works title | Neutral/300 | Neutral/100 | fixed | home.css |
| D18 | Card names Mondai and Haven | Neutral/050 desktop, Neutral/200 phone | Neutral/200 | fixed | home.css |
| D19 | "Case study collection" | Regular on desktop (Bold stays on the phone) | Bold | fixed | home.css |
| D20 | Mondai description | 13.75 px, no style, at 569.64 into the card | Label/14 at 572.64 | fixed | home.css (phone descriptions are 13.75 too) |
| D21 | Haven card | 443 wide and square, desc at 230.79 | 435 | fixed | home.css |
| D22 | Haven art | phone image larger, placed 487.35 by 429.82 at -15.71, -0.5 on #0f0f1b | an older baked crop | fixed | the card now draws the same phone image the phone card uses, placed as in the master; no new bitmap |
| D23 | Mondai art | gradient, laptop, glow and a 47 percent Neutral/900 veil, noticeably lighter | an older, much darker bake | fixed | mondai-card@2x.webp rebaked at 2x from his layers (mean difference to his render about 2 of 255) |
| D24 | Mondai media height | all 579.45 shows, 4.17 past the card | clipped to 575.28 | fixed | home.css, without moving what follows; Learn more kept at its master centre |
| D25 | About row lines | Neutral/700 | Neutral/800 | fixed | home.css |
| D26 | "Current role" | Neutral/300 desktop, Neutral/200 phone | Neutral/200 | fixed | home.css |
| D27 | "2024 - current" | Neutral/550 | Neutral/050 on desktop | fixed | home.css |
| D28 | Footer top line | 1 px Neutral/700 on the footer instance | none | fixed | components.css |
| D29 | Footer rows | 183 between the top block and the bottom row | 176 | fixed | components.css |
| D30 | LinkedIn and Resume | Neutral/100 text, Neutral/050 arrow, LinkedIn at 742 | Neutral/300, dimmed arrow, 740 | fixed | components.css |
| D31 | Footer CHDWCK | draws Neutral/050 (the vector regions are #F2F1F8; the layer fill says Neutral/100) | Neutral/100 | fixed | chdwck.svg matches what his file draws; see F3 |
| D32 | Phone page | frames on Neutral/1000 (#000) | Neutral/900 | fixed | home.css: page, footer, menu and the fixed bar under 768 |
| D33 | Phone logo | Neutral/300 in the bar and the menu | Neutral/050 | fixed | logo-300.svg under 768 |
| D34 | Phone burger | Neutral/525 | Neutral/050 | fixed | menu.svg to #90909D (it only shows under 768) |
| D35 | Phone CHDWCK | Neutral/200 | Neutral/100 | fixed | home.css |
| D36 | Second navbar | a Base navbar 16 below the top of Selected works | not drawn | flagged | reads as the bar coming back on scroll; that is motion in site/js, owned by the main session. Not built here; see F4 |
| D37 | Footer link list | adds Testimonials | three links | kept | Testimonials on hold at his ask |
| D38 | Resume link | shown, at x 1190 | hidden until his resume file | kept | his file is still missing |
| D39 | Footer time | "10:24pm CST" | live clock with seconds | kept | the clock is site/js, not a style |
| D40 | Mondai and Haven media noise | a noise effect on both | not drawn | kept | not reproducible in CSS without a texture; under 2 of 255 on average |
| D41 | Learn more on the Mondai card | drawn at 98.2 percent | full size | kept | decided earlier; the centre matches |
| D42 | Phone hero line | the Mobile frame still has the older line | one element serves both | flagged | the new desktop line shows on the phone too; see F2 |

## For him

- F1. The new hero line ends "may change out minds". I set it as "our minds", as with "I have have"
  in About (his file has that one again too; the site keeps "I have").
- F2. His phone hero frame still carries the older line. The site shows the new one everywhere. If the
  phone should keep the older one, that needs a second element.
- F3. The footer CHDWCK layer says Neutral/100 but its shapes are filled #F2F1F8 (Neutral/050), so it
  draws lighter than the fill suggests. The site follows what is drawn.
- F4. The navbar repeated at the top of Selected works looks like the scroll bar state. Building it is the
  main session's call (site/js).
- The bar logo is Neutral/300 in two phone frames and Neutral/200 in the footer frame. The site uses 300.

## Proof

- `node scripts/verify-tokens.mjs`: TOKENS_OK 86 tokens (34 Portfolio, 31 Haven, 8 Mondai, 13 type).
- `node scripts/verify-figma-sync.mjs`: colour, weight, size, tracking and position of each Home element at
  1440 and 402 and every icon fill against this read. FIGMA_SYNC_OK.
- `scripts/figma-pages.json` Home boxes and `site/dev/pages/figma/home.png` re-read from the master
  (Testimonials cut out): BOXES_OK 27/27, PIXELS_OK at 0.87 percent.
- Section by section renders, master over site, at 1440 and his Mobile frames beside the site at 402.

## Markup and asset changes

index.html: the hero line (D5), the CHDWCK image height (D13) and the Mondai image height (D23). Assets:
chdwck-hero.svg, chdwck.svg, mondai-card@2x.webp, dolly.svg, menu.svg, new dolly-200.svg and
logo-300.svg. The old haven-card@2x.webp is no longer drawn on Home and is left in place.
