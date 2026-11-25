# Haven journey flow, vertical (phone)

Kind: live, on the page (site/dev/haven-flow-vertical, built by reports/haven-flow-order/build-vertical.mjs),
plus a clip of the same motion for review (reports/haven-flow-order/render-flow.mjs).

Motion: exactly the desktop flow in site/haven/haven.js function flow() and prototypes/journey-map, on the
column axis. 1700 ms WAAPI timeline at playback rate 0.85, after a 450 ms hold once the map top is 80% up
the screen. Select a Confidante lifts to 1.06 (0 to 224 ms, ease out), travels slot 3 to slot 5 (224 to
1184 ms, cubic-bezier(.65,0,.35,1)), drops to 1 (to 1376 ms, cubic-bezier(.22,1,.36,1)), then a settle bump
1 to 1.06 to 1. Schedule a chat and Intro chat slide one slot up (300 to 860 and 360 to 920 ms). Numbers stay
fixed to the slots. Reduced motion: the end state at rest.

Layout: his Figma frame 6394:30516, read 25 Nov: circles 151.6, pitch 167.6, labels 20 px medium, numbers
74.7 px bold centred in a 48 wide column at x 46, circles at x 142.5, 45 below the body copy. Satoshi kept.
