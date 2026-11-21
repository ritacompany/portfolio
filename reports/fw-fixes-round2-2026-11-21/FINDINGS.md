# Round 2 findings, 21 Nov

Checked against his desktop frame 6331:20607 (file 5RO0m4bYYrTvbiaOgaU3tI, Schedule view section 6331:21307) and
his tablet section 6340:30057. Page measured on this branch at 390, 768, 1024, 1159, 1160, 1200 and 1440.
Side by side at 1440 (frame left, page right): schedule-1440-frame-vs-page.png.

## Rescheduling

- Heading to body: 32 in his frame (heading cap top 12116.56, 14 tall; body cap top 12162.56). The page measures
  31.5 to 32 at every width, 1200 included once the zoom is taken out (gate G3). This part was already right.
- Popover image: the page loads his PR #29 export, which matches the frame (gradient starts under the selected
  card, no line through usability findings). His preview had the same file name as the old export, so a browser
  that had loaded the old one kept showing it. The file is now schedule-gaps-v2@2x.webp, so every browser fetches
  the new one (gate G4).
- Image box at 1440: left 154, top 1384, 547 by 509 in the page; 154, 1384, 546 by 508 in the frame.

## Target and pace

- Cause: the tablet layout draws his tablet export (right-rail-tablet.webp) as a CSS background from the path
  /assets/..., which only resolves when the site sits at the domain root. His review preview is served from a
  folder, so at every tablet width (768 to 1159) the image box was empty. Desktop and phone use the img src, which
  the preview builder rewrites, so they showed. Calendar setup's tablet image had the same fault.
- Fix: both background paths are relative (../assets/...). Gate G2 checks real pixels at every width, on the site
  and in a preview served from a folder, and proves the check fails on the old CSS.
- The preview builder (scripts/review-preview/build.mjs on claude/review-preview-standard) rewrites root paths in
  HTML only, not inside CSS. With the CSS relative it no longer matters for this page, but any future url("/...")
  in a stylesheet would break the same way.

## 1440

Everything in the Schedule view section sits within 1.5 px of the frame (fw-sync gate boxes). One difference left:

1. Rescheduling body, third line: the frame breaks "Mondai never moves a time / on its own", the page breaks
   "Mondai never moves a time on / its own". The browser sets Satoshi a touch narrower than Figma at the same
   448 width. Fixable by narrowing the body to about 444, which would also move other breaks; left alone unless he
   wants the frame's breaks exactly.

## 768

His tablet section has no Schedule view frame (no Schedule view or Rescheduling text in 6340:30057), so there is
nothing of his to match at 768. What the page does there now, for him to rule on:

1. The intro line wraps at 768 with a short second line ("they like."). The rule from 20 Nov keeps it on one line
   only where it fits; at 768 its 16 px words need 734 px and the column has 704, so it fits on one line from about 800 up.
2. Rescheduling stacks: heading, body, then the popover image at 547 wide, left aligned, with about 157 px empty
   to its right. At 1440 the image sits left of the text. Side by side does not fit at 768 without shrinking the
   image below 400.
3. The two notes under the schedule sit side by side at 768, as at 1440.
