Planted defects in site/motion-lab/live-review-test.html
D1 rejected look: cards rise 60 px while fading (fade up with a rise, rejected in Haven)
D2 layout shift: images have no reserved size and load 0.6 to 1.35 s after entry, pushing the paragraph down
D3 390 wide: labels nowrap inside overflow hidden cards, so they are cut off
D4 reduced motion ignored: the entrance runs with prefers-reduced-motion on
D5 uneven stagger: gaps 0.1, 0.3, 0.15 s and durations grow 0.5 to 1.4 s
D6 hover shrinks the target to 0.9 (Fitts)
D7 hover waits 0.8 s before responding (Doherty, over 0.4 s)
D8 not on the shared plumbing: own IntersectionObserver, no site/js/motion.js, placeholder art not Figma exports

Round 1, 16 Nov 2026, fresh Sonnet reviewer on the installed rules: 8 of 8 caught.
Seen or measured in the browser: D2 (paragraph pushed 361 px) and D3 (labels cut to "Curricul" at 390).
Found only by reading code: D1, D4, D5, D6, D7, D8.
Process gaps: the built in browser throttles animation while its pane is hidden, so no frames mid entrance;
it cannot switch reduced motion on, so that check was code only.

Round 2, 16 Nov 2026, fresh Sonnet reviewer with scripts/live-capture.mjs in the loop: 7 of 8 caught.
Measured by the tool and seen in its sheets: D2 (361 px push), D3 (labels cut at both widths), D4 (cards
animate with reduced motion on), D5 (gaps 0.1, 0.3, 0.13 s), and hover never responding.
Read in code only: D1 (the rise), D6 and D7 (hover cannot fire, so its size and delay cannot be measured).
Missed: D8 (not on site/js/motion.js, placeholder art).
Fix after round 2: the capture now flags any item that travels while visible (the rise), measured 49 to 57 px.
Control page (site/motion-lab/live-review-control.html, every defect fixed): LIVE_CAPTURE_CLEAN, stagger
measured 0.17 to 0.2 s for a 0.18 s gap, hover response 33 ms at plus 3 percent.
