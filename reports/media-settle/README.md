# Why the media entrance feels odd on the Growth Journey

Research for the CS2 framework page, 12 Nov. Nothing on the page has changed.

## Cause

The scale settle starts at 1.3, which hides the outer 11.5 percent of the image on every side. On the
Growth Journey that outer band is the loudest part of the picture: the bright pink, green and cyan glitch
frame around the browser window. So the curtain reveals a plain dark browser window, and then in the last
0.4 s the glitch frame floods in from the edges. The reader watches one picture open and a different
picture land.

On the Pathway and Calendar shots the hidden band is a dark photo backdrop that matches the page, so the
settle reads as a camera pushing back from a laptop and nothing new arrives at the end.

## Evidence

Measured on the real page at 1440 by 900. "Edge band" is the strip the 1.3 start hides.

| Screen | Size on screen | Edge band brightness | Vivid colour in edge band | Centre brightness | His read |
|---|---|---|---|---|---|
| Growth Journey | 1090 by 695, 76 percent wide | 0.131 | 17.6 percent of pixels | 0.050 | odd |
| Action Hub | 1166 by 734, 81 percent wide | 0.083 | 5.1 percent | 0.056 | fine |
| Pathway | 1167 by 692, 81 percent wide | 0.032 | 0 | 0.057 | great |
| Calendar setup | 1089 by 955, 76 percent wide | 0.068 | 0.1 percent | 0.053 | great |

- Size against the viewport and how much the settle crops do not explain it. All four are 76 to 81
  percent of the width and lose the same 250 to 270 px across at the start.
- Edge contrast does. The Growth Journey edge is 2.6 times brighter than its centre and carries 3.5 times
  the vivid colour of the Action Hub, which sits in between and reads as fine.
- Device frame matters through the same mechanism. The two he likes are photographed laptops on black.
  The Growth Journey and Action Hub are flat browser windows set on a glitch backdrop. His hunch about
  mockup type is right; the glitch backdrop is what the settle hides and then pulls in.

Frames at 0.4, 0.6, 0.8 and 1.2 s: `now-1440-frames.png` (glitch arrives only in the last two),
`hub-now-frames.png`, `pathway-now-frames.png`.

## Options

Both keep the 1.3 settle on the two laptop photos (Pathway and Calendar setup) and change only the flat
browser screens.

- **A. Small settle, 1.08, on flat screens.** The glitch frame shows from the first frame of the curtain
  and the picture still eases back a touch, so every screen keeps the same family of motion.
  `option-a-1440-frames.png`
- **B. Curtain only on flat screens.** No scale at all. Cleanest, but flat screens and photos then move
  differently on the same page. `option-b-1440-frames.png`

Clips: `compare-1440.mp4` (top left Pathway now, top right Growth Journey now, bottom left A, bottom right
B) and `compare-390.mp4` (now, A, B left to right).

Recommendation: A. It fixes the late glitch flood, keeps the push that made the photos feel good as a
quieter echo on the flat screens, and needs one list of two photo screens in `mondai-motion.js`.

## Built

He picked A on 12 Nov. In `site/js/mondai-motion.js` the two laptop photos (Pathway and Calendar setup)
keep the 1.3 settle and every other screen, the start of week slides included, settles from 1.08. The
Foundation wipe and the scroll linked laptop and Rollover panel are unchanged. Checks are in GATES.md G3.
