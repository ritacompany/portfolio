# Haven on a phone, under 768 (23 Nov)

Audited at 320, 360, 375, 390, 430, 600 and 767 as a touch phone (isMobile, hasTouch, deviceScaleFactor 2,
motion on, page scrolled through first). Script: `audit.mjs` here. Raw output: `before.txt` (the page as
shipped) and `after.txt` (with the proposal in `site/dev/haven-phone/`).

Figma: page CS of 5RO0m4bYYrTvbiaOgaU3tI has no Haven phone frames. Its only phone frames are "Mobile
frames" 6382:29154, five Home screens at 402 (hero, phone menu, works, about, contact). So Haven's own phone
rules (haven.css `@media (max-width: 767px)`) are the reference, plus his rule of 23 Nov: no mouse hover
effects on phone or tablet, presses still give feedback.

## Defects (fixed in the proposal)

| # | What | Measured on the shipped page | Proposal |
|---|------|------------------------------|----------|
| P1 | Sticky hover. A phone keeps `:hover` on the last thing tapped, so a tap leaves the hover look on | 28 targets at every width: the three nav links (go white and heavier), the email and LinkedIn in the footer (light block, heavier), the three ending bar links (dark block, light text), the six resources links (block turns Neutral/400), every insight pill (border lightens) | Hover rests unless the finger is down; `:active` keeps every press look. Resources links get their Neutral/400 as a press |
| P2 | Grey tap flash | 35 targets at each width (every link, the pills, the five ending cards, the wireframe scroller): Chromium's default highlight, grey on iOS. The pills do nothing on touch, so the flash promises an action that never comes | `-webkit-tap-highlight-color: transparent` on Haven under 768. The logo had no other press look, so it dims to 60 percent while pressed |
| P3 | Quiz pillar labels under the floor | `.qcol__text` is set to 9 px under 768 (haven.css line 506): Attraction, Gender identity, Belonging, Race and ethnicity, Upbringing at 9.0 px at every width | 12 px. Checked at 320 to 767: no label off screen, on another label or on an icon |
| P4 | Journey flow tiny from 592 to 767 | haven.js turns the flow vertical only when its box is under 560 wide, so from 592 the sideways row is scaled into a 480 box: the five step names and numbers at 9.9 px | Vertical across the whole phone layout (`max-width: 767px`), Haven's own phone rule for this flow |

## Design choices (on the canvas for his call, nothing built)

| # | What | Options | Recommendation |
|---|------|---------|----------------|
| D1 | The nav is fixed with no backing, so on a phone the logo and three links sit on top of body text, pills and headings as the page scrolls (seen at 390 over the quiz, the security copy and the closing heading) | A keep as is; B a solid Neutral/1000 bar behind the same three links, as Home's phone bar; C Home's phone bar from his Mobile frames: solid bar, logo and the burger, links in the menu | C: it is the only one drawn in his frames, and the site would have one phone nav. Needs the menu markup on Haven, a shared piece, so it lands after his yes |
| D2 | Ending cards wait behind a tap on a phone: the five captions are hidden until a card is tapped, and nothing says to tap. On tablet he chose every card open (F11, 13 Nov: no hover, so nothing waits behind an interaction) | A keep tap to open; B every card open with its caption, swiping sideways, as the tablet | B, by his own F11 reasoning, which holds on a phone too |

## Noted, not changed

- Card text at 14 px (the two data cards and five interview insight cards): this is their 1440 Figma size
  (haven.css line 145, current.css line 31), a card label style, not running body. Running paragraphs are 16
  or larger.
- Images: every raster is 2x sharp at 320 to 430. From 600 (foldables, not portrait phones) the two security
  screens are drawn up to 735 wide from 1002 and 928 px sources (1.4x), the profile card at 1.85x and the
  ending phones at 1.9x. A fix needs 3x renders from his Figma file; not worth it for widths no portrait
  phone has.
- Shared pieces, left alone as asked: the ending bar wraps "Mondai: design system case study" onto four lines
  at 390 (the framework page has the same bar); the phone nav differs from Home's (see D1).
- Clean at every width: no sideways page scroll, no text cut off outside its scroller, no reveal that never
  fires (every text block and media frame opens on a thumb scroll; the hidden security paragraph is
  `display: none` at every width by design, current.css line 64), the quiz phone pins and releases without
  covering the copy in real scrolling.
