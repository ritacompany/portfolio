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

## 16 Nov: Home work cards re-read

Source: Card Section `4923:12087` in Master `4494:5909` (his call, 16 Nov: work off Master, not Master 2
`5026:13389`, which explores other hero sections), and the Mobile works frame `4928:12018`. Read only.
Master 2 has the same Haven order (image on top, label under it).

| Id | Where | Figma (Master, 16 Nov) | Site before | Status | Change |
|---|---|---|---|---|---|
| N1 | Haven card order | image (Secondary Card) on top at 132.17 in the section, 443 square; label row 15.71 under it at 590.88; card bottom aligned, so both cards end on one line | label above the image | fixed | home.css: `.work-card-haven .work-card__head { order: 1 }` from 768 up; markup order unchanged. The phone keeps the name above the image, as his Mobile frame does |
| N2 | Haven description | x 1211, 254 into the card | 230.79 into the card | fixed | home.css `--desc-x` |
| N3 | Haven image | Image 2 `4923:12107` now shows a new fill (3228 by 2600 source); the frame is unchanged: 487.35 by 429.82 at -15.71, -0.5 in a 443 by 442.5 clip | the 10 Nov image (mean difference about 22 of 255) | fixed | `site/assets/home/haven-card-phone.webp` replaced by his node exported at 2x, which comes clipped to the square: 886 by 859. Drawn 443 by 429.82 at 0, -0.5. index.html width and height updated |
| N4 | Haven phone card | Mobile frame: clip 279.32 by 279 at 37, -22.46; Image 2 312.94 wide at -10.09, -0.32 (unchanged placement, same new fill) | old image | fixed | the same file, placed from the clip's left edge at 284.46 wide (312.94 times 443 / 487.35) |
| N5 | Learn more, Mondai card | the Small button master `4868:13675` is now 130 by 34: Satoshi Bold 16, tracking -1 percent, padding 8 and 11, 3 stroke, radius 32; the instance `4923:12095` sits at 344.73, 251.43 in the media | 184 by 47.55, Bold 24 | fixed | components.css `.button-sm` (the component, so every use follows); home.css position |
| N6 | Mondai card | unchanged | | | |
| N7 | Haven image background | the visible fill is a cut out phone on a transparent background (3228 by 2600); Figma shows the card's #0f0f1b through it, so the card reads as one navy field | first 16 Nov pass: the node export came flattened near black (#07070f), which showed as lighter navy bands either side of the image on the phone | fixed | the webp is now cut from that transparent source, cropped as Figma's fill does (centred cover, then the 443 slice): 886 by 860 with alpha; against his render the mean difference is about 1.5 of 255 |
| N8 | Phone card gap | 40 between the Mondai and Haven cards | 40 | changed, his call 16 Nov | 64, the About and menu rhythm on the phone |

### For the main session (preview layer, `site/dev/preview/home-motion.css`)

Not edited here. Two rules there still carry the old values and override the site in the preview:

- `.work-card-haven .work-card__desc { --desc-x: calc(100% * 230.79 / 443) }` should be `254 / 443`.
- Learn more is centred at 435.35, 274.85 of the media; the new centre is 409.73, 268.43 (344.73 + 65,
  251.43 + 17).

`.unlazy/home-motion/check.mjs figma` now throws, because the reveal it finishes was removed in 516113f
(`window.__hm.reveals` is gone). `.unlazy/figma-sync-2/home-motion-figma.mjs` is the same check with that
one line guarded; it prints FIGMA_MATCH and HOME_MOTION_OK figma on the preview build.

### Proof

- `node .unlazy/figma-sync-2/check.mjs order|button|image|phone`: FIGMA_SYNC2_OK for each, at 1440,
  1024 and 402.
- Mobile footer, asked 16 Nov: it follows his footer frame `4929:12309`. Two known differences stay as
  logged on 10 Nov: Resume is hidden until his resume file exists (D38) and the clock is live (D39). At
  375, narrower than his 402 frame, the copyright line wraps to two lines.
- `node scripts/verify-figma-sync.mjs`: FIGMA_SYNC_OK 177 checks, with its Haven rows and a new Learn
  more row set to these values.
- `node scripts/build-preview.mjs site <dir>`: HOVER_STILL_OK 53 hovers.
- `node scripts/verify-responsive.mjs`: Home passes fit, overlap and size; every page passes overlap and
  size. Fit fails on the framework page's template carousel at 1200 and 1366, the same on the last
  commit before this change (not caused here).

## 17 Nov: Resume shown, back to top logged

- D38 changed, his call 17 Nov: Resume shows in the footer on Home, Haven and the framework page, as in
  Master (slot x 1091, the site draws 1090) and the Mobile footer (20.83 under LinkedIn). It has no href
  until his resume file exists, so it is plain text: not focusable, no hover. The 10 Nov note that put it
  at 1190 was wrong.
- The component sheet (`site/dev/components/`), `scripts/figma-components.json` and
  `scripts/figma-pages.json` now carry his 16 Nov Small button (4868:13675, 130 by 34) and the 16 Nov
  Haven boxes, so the 1440 suite fails only where it failed before this work (framework boxes, Haven body).
- Open, his ask 17 Nov, not now: a back to top button on the phone footer. The desktop footer already has
  one (Back to Top Icon, x 40); the Mobile footer frame has none and the site hides it under 768. He is
  still finalising the button; build it once he has.

## 18 Nov: Home re-read from Master

Source: Master `4494:5909` read 18 Nov (desktop), the Phone menu `4928:11959` and the other Mobile frames
`4929:12379`. His yes, 18 Nov: "all of the above" (page layout, phone menu, footer links, testimonials).
Read only. Master 2 is ignored (his call, 16 Nov).

| Id | Where | Figma (Master, 18 Nov) | Site before | Change |
|---|---|---|---|---|
| R1 | Page frame | the navbar stacked over a 916 hero; Selected works at 967.5 | hero 900, works at 899.5 | home.css: hero 968 tall |
| R2 | Hero line | "I’m a system-minded, nuance led designer, looking for tomorrow’s problem in today’s perfectly reasonable decision." at 450.5 | the 10 Nov line at 468 | index.html, home.css |
| R3 | Location | Chicago at 699.36, 480.5; relocate row at 502.5 | 623, 498 | home.css: column 6 plus 76.03 from 1200 up |
| R4 | Hero wordmark | the CHDWCK text re-spaced and set further past both edges; glyph tops at 589.48 (his Master translates the frame by 589.482) | old outline at 580.51 | chdwck-hero.svg is his new outline, cut from the 1440 frame |
| R5 | Selected works | the title is gone; cards 74 into a 778 tall section | title and 125 gap | title kept for screen readers only (visually hidden); padding 74 and 99 |
| R6 | Haven card | label back above the image (132.17 into the cards), image 15.71 under it | the 16 Nov order (label under) | the 16 Nov order rule removed |
| R7 | Card descriptions | Label/14 in Neutral/550 (#7b7b86) on both; Mondai at x 622.11 | Neutral/200; Mondai 13.75 at 609.64 | home.css; the phone cards keep 13.75 and Neutral/200 from the Mobile frame. The 16 Nov read already had these values; that pass missed them |
| R8 | Mondai media | no veil and no Learn more at rest (the 47 percent Neutral/900 rectangle and the button are gone) | darker bake, button at rest | mondai-card@2x.webp rebaked from his 2x export (noise included); Learn more fades in on hover and focus only, nothing moves |
| R9 | About | rows 569 and 234 tall; both bodies at x 858, 542 wide; third paragraph now "I love my cats, unexpected things, drag, good letter spacing and collaborative ideation." | 543 and 208; bodies at 741 and 740, 595 and 650 wide | home.css, index.html. His file has "I have have" and "cats ," again; the site keeps "I have" and drops the stray space |
| R10 | Testimonials | new section 5073:12175, 2548.5 to 3348.5: Neutral/900, Neutral/700 line on top; quote 56 Medium, 109 percent, -4 percent; Allison Courtney, UX Researcher, avatar 66.82 on #33db84; "Full recommendation" and a LinkedIn link right aligned; three 7 px dots | none (on hold since 10 Nov) | built; a quote-56 token pair added to tokens.css (no Figma text style). Avatar exported at 3x. Under 1200 the quote steps to Heading/40, on the phone to Heading/24 with the source stacked; there is no frame for those widths yet |
| R11 | Footer component | bottom row at 513.22 (15 higher), clock at x 404, the CHDWCK letters re-spaced (C -49.59, H 227.82, D 461.27, W 711.59, C 1011.37, K 1288.78), both variants | 528.21, column 4 (390), the old letters | components.css (every page): gap 168, clock plus 14 from 1200 up; chdwck.svg is his Decorative Typography group 4978:14844 |
| R12 | Home footer links | Home, About, Selected works, Testimonials | About, Selected works, Contact | index.html |
| R13 | Phone menu | About and Works only (Heading/40), About at 602, Works 651, Contact 780, email 817 | About, Selected works at the top | index.html, home.css: the block sits at the bottom, 100 between links and Contact |
| R14 | Navbar | the desktop Master now uses the Base variant (no Product Designer) | Product Designer shown | kept: his Mobile hero still has it and the Home motion layer animates it. Flagged for him |

Unchanged in the Mobile frames: hero, works, About and footer match the site. Resume stays visible (his
17 Nov call) though the Master hides its slot (opacity 0).

### Open, his to decide

- The testimonial avatar in his file looks like his own portrait (the footer photo) on the green disc, next to Allison
  Courtney's name. The site draws what the file has. It likely wants her photo.
- The three dots promise more quotes; only one exists. They are drawn, not clickable.
- The phone About copy in his Mobile frame is still the older third paragraph; the site shows the new one
  on every width (one element).

### For the main session (preview layer, not edited here)

- `.works` padding and the panel's gap control (G3, 320) and the title pin (G4) act on a title that is now
  visually hidden: the works section starts 74 above its cards in the Master.
- Learn more: the Master no longer draws it at rest; the shipped site now fades it in on hover. The preview
  centres it at 435.35, 274.85; its 16 Nov place is 409.73, 268.43.
- The reveal and hover overlay sat on a darker Mondai bake; the new bake has no veil.

### Proof

- `node .unlazy/figma-sync-3/check.mjs hero|works|about|testimonials|footer|menu`: FIGMA_SYNC3_OK each.
- `node scripts/verify-figma-sync.mjs`: FIGMA_SYNC_OK 200 checks (18 Nov values, testimonials added).
- `node scripts/verify-pages.mjs boxes home`: BOXES_OK 31/31 against the 18 Nov boxes; `pixels home`
  against his 18 Nov render (now `site/dev/pages/figma/home.png`).
- Full page at 1440 against his render, mean difference per section (of 255): hero 0.88, works 2.24,
  About 3.58, testimonials 2.52, footer 2.06.
- The component sheet's footer pictures (`site/dev/components/figma/footer-*.png`) keep their old
  transition band and now carry his 18 Nov Footer variants under it (4659:11955, 4862:14204), so
  `verify-components pixels` passes again. The 1440 suite fails only where it failed before this work
  (framework boxes, Haven body).
