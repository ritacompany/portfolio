# Chat phone turn: review log

Checks every round: node scripts/check-chat-rotate.mjs start|end|text|reduced (outline IoU against the
Figma phones 0.9966 at start and 0.9878 at end; paragraph offsets exact; reduced motion still).
Both outline checks fail on a planted wrong phone (CHECK_PLANT=1, IoU 0.72).

## Round 1 (chat-r1, 1440 and 390)
Motion 6, composition 7, readability 8, pacing 5, fidelity 8.
1. The turn was mostly done before the pin, while the phone was still half below the fold, so frame 1 was never seen whole. Fixed: the turn now runs only inside the pin.
2. The paragraph scrolled at page speed with the phone pinned, so the rise was over in half a screen. Fixed: the whole block pins and the paragraph rises on its own curve.
3. No narrow layout: the 274 px paragraph offset ran off a 390 screen. Fixed: centred phone sized to the screen, paragraph under it.

## Round 2 (chat-r2, 1440 and 390; two renders, same sha256 1a0a106e)
Motion 8, composition 8, readability 8, pacing 7, fidelity 7.
1. Band too dark next to Mokker's purple rim. Fixed: band reflections up (envMapIntensity 0.5 to 0.9).
2. Pin of 0.9 screens read quick for a "slow" turn. Fixed: 1.2 screens.
3. Strip at the fastest moment: no stutter or pop. Kept.

## Round 3 (chat-r3, 1440 and 390; two renders, same sha256 05802194)
Motion 8, composition 8, readability 8, pacing 8, fidelity 8.
Left as is: Mokker's frame 1 shows a brighter violet rim along the top edge than the 3D band does. It is one
edge highlight, not the shape or angle, which both match the Figma phone.
