# Chat phone turn on the live Haven page: gates

Port of round 10 (haven/case-study, 9 Nov, commit 32c4e47) into `site/haven/`. Written before the port, 11 Nov.
Every gate runs on `site/haven/index.html` itself, not the motion lab copy.
Command: `node scripts/check-chat-rotate.mjs <check>`; `CHECK_PLANT=1` must make each one fail.

| Gate | Passes when | Check |
| --- | --- | --- |
| G1 Start pose | Phone at the Figma frame 1 spot and tilt before its own motion starts, outline IoU 0.96 or more | `start` |
| G2 End pose | Phone face on at the meet, centre mid screen, outline IoU 0.96 or more against frame 2 | `end` |
| G3 Paragraph | Plain page text: never faded, never moves inside the block, Figma offsets within 4 px at both ends | `text` |
| G4 Later start, slower rise | Turn is 0 until the phone centre reaches the bottom of the screen, then it only rises, slower than the page, and lands mid screen | `path` |
| G5 Pair hold | Phone and paragraph still on screen for one full screen of scroll, then both leave at page speed | `hold` |
| G6 Chip rides | Chip at each frame's offset above the phone centre, right aligned, still through the hold | `chip` |
| G7 CSS sticky hold, smooth | Hold is `position: sticky`; on the GPU with Lenis and wheel input the phone is never a frame behind, 0 px shake and 0 repaints in the hold, p95 frame under 20 ms | `smooth` |
| G8 Reduced motion | No WebGL mount, the frame 2 still shows in place and does not move inside the block while scrolling, no hold reserved | `reduced` |
| G9 Sizes | Played on the page in the built-in browser at 1440, 768 and 390: no overlap, chip on screen, pair holds | screenshots |
| G10 Rest of the page | No page errors; the Security section below still enters on scroll | all checks, screenshots |
