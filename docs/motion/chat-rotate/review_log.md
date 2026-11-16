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

## Round 4, 28 Oct (Chadwick: the text should load in like the page's scroll animations, before the end)
The 437 px rise is gone. With the block pinned, nothing on screen scrolled past it, so it read as a second
scroll rather than parallax. The paragraph now waits at its frame 2 spot and arrives with the page's own
text fade (1.4 s, power1.out, once) when the turn is 60 percent done, so it has landed as the phone squares
up. Checks: START_MATCH, END_MATCH, TEXT_MATCH (hidden at start, in at the end), REDUCED_STILL.
Motion 8, composition 8, readability 8, pacing 8, fidelity 8.

## Round 5, 28 Oct (Chadwick: turn as soon as the phone comes into view; text there from the start, holding while the phone comes down to it)
His pick between two drawn versions: text holds, phone drops in.
The turn now starts the moment the phone's top enters the screen. The paragraph shows from the start under
the phone (frame 1, no fade), holds still when it reaches its spot, and the phone comes down to land beside
it; then both scroll on. The phone starts lagging the scroll 0.15 screens before the hold, so it slows,
stops and comes down instead of reversing in one frame. Hold spot balances the crop: at 1440x900 the phone
is cut about 106 px at the top when the drop starts and at the bottom when it lands, since phone plus drop
(1141 px) is taller than the screen.
Start pose re-measured against Figma frame 1: same angle (-71.57 degrees both), outline IoU 0.995.
Checks: START_MATCH, END_MATCH, TEXT_MATCH (visible throughout), REDUCED_STILL (frame 2, offset -13.34).
Motion 8, composition 8, readability 8, pacing 8, fidelity 8.

## Round 6, 28 Oct (Chadwick: round 5 was not what he meant)
He meant no hold at all: the text scrolls with the page, the phone visibly falls behind until the text lines
up with it, then they move together. Now: from the moment the phone comes into view it lags the scroll
(sine in out over the whole approach, so no jolt at either end) and turns as it goes; the paragraph scrolls
normally and catches up; they line up in frame 2 with the phone mid screen, then scroll on as one. No pin.
Checks: START_MATCH, END_MATCH, TEXT_MATCH, REDUCED_STILL.

## Round 7, 28 Oct (Chadwick: the phone starts too early, the text is plain page text, the phone travels to it, then the pair holds)
State list rewritten first and agreed. He saw two versions live on the page's smooth scroll (Lenis, same
lerp as haven.js): "phone slows down" and "phone drops". He picked slows down, with a longer hold.
Now: the phone's own motion starts when its centre reaches the bottom of the screen (about 350 px later than
round 6). It rises slower than the page, slowing to rest at mid screen with no overshoot (a cubic whose end
slope matches the scroll), while it turns on a sine in out. The paragraph never moves inside the block. They
meet in frame 2, hold for one screen of scroll, then leave at page speed together. Narrow: the pair holds
centred. Smooth scroll is off for reduced motion, the renderer and the checks.
Checks: START_MATCH (IoU 0.9966), END_MATCH (0.9878, at the meet, phone mid screen), TEXT_MATCH (offsets
exact, paragraph still in the block), PATH_RISES (turn 0 until the start point, phone only rises, ends mid
screen), HOLD_SCREEN (pair still for 900 px, then both leave at page speed), REDUCED_STILL. Each fails on its
planted mistake (CHECK_PLANT=1: other frame's phone, paragraph 26 px off, round 6 start, 0.75 screen hold,
reduced showing frame 1).
Clips chat-r7-1440 and chat-r7-390. Motion 8, composition 8, readability 8, pacing 8, fidelity 8.
1. The 390 review clip scrubbed 2100 px in 8 s, so motion blur smeared the text through the approach. That is
   the render speed, not the build. The final render gives the 1440 scrub 12 s.
2. The hold reads clearly at both sizes: five or more tiles at 0.5 s with nothing moving.
3. Exit: the pair leaves as one block at both sizes, no gap opening between them.
Final 1440 clip chat-r7-final, 12 s at 30 fps, rendered twice: sha256 cb53fcee both times.

## Round 8, 29 Oct (Chadwick: the chip has to move with the phone, so readers know which insight it belongs to)
Figma settles where: both frames put the chip 72 px above the phone image, right aligned (415.22 px above
the phone centre in frame 1, 396.34 in frame 2). It now follows the phone, easing between the two offsets
with the turn, and holds with the pair at the top of the screen (54 px down at 1440 by 900). Narrow: it
keeps its spot above the phone and holds with it.
New check CHIP_RIDES (both offsets within 2 px, right edge on the block, still through the hold, on screen);
it fails on the chip left at the block top (CHECK_PLANT=1). All seven checks pass.
Final 1440 clip chat-r8-final, 12 s at 30 fps, rendered twice: sha256 a18ca637 both times.

## Round 9, 9 Nov (Chadwick: on plain black you cannot see the pair leave; show the next content arriving, scroll triggered)
The study now has the page's real next section under it (Security features, copied from index.html) and loads
haven.js, so the smooth scroll and the scroll triggered text and image entrances are the page's own, not a
copy. The chat paragraph is exempt from the fade. The divider sits just below the fold when the hold ends;
the Security text starts its fade about 230 px after the hold. Chip confirmed: no entrance of its own, its
position only follows the phone.
All seven checks pass (entrances are off for the renderer and checks, which step frames). Clip chat-r9-live
is a real time screencast of the live page on the GPU at about 53 fps, because time based entrances cannot
be stepped by the renderer, so it has no two render hash.

## Round 10, 9 Nov (Chadwick: make sure the real animation feels smooth)
The renderer steps frames, so it cannot see live jitter. Measured live instead (GPU, Lenis, wheel): 60 fps, but
the phone shook 3 to 4 px through the hold because it was drawn a frame behind the scroll.
Fixes: the hold is CSS sticky, the phone draws in the same tick as Lenis, layout is read on resize only, nothing
repaints outside the travel. After: phone shake 0, paragraph shake 0, 0 repaints in the hold, p95 frame 17.7 ms.
New check SMOOTH_LIVE; fails when the phone is a frame behind. All eight checks fail on their planted mistakes.
Clips chat-r10-1440 and chat-r10-390. Motion 8, composition 8, readability 8, pacing 8, fidelity 8.
1. Hold: the phone, paragraph and chip are still across every tile at both sizes.
2. Exit: all three leave as one block with the Security section coming up under them, no gap opening.
3. Text is soft through the fast tiles at 390. That is the renderer's motion blur at this scrub speed; held
   tiles are sharp.
Renders use PLAYWRIGHT_MODULE (npx cache path); without it render.mjs stops with Playwright not found.
1440 rendered twice: sha256 759dcc3a both times. Entrances are off in these renders; they run on the live page.

## Port to the live Haven page, 11 Nov
Round 10 (haven/case-study, 32c4e47) now runs on site/haven/index.html in place of the 28 Oct version: later
phone start, slower rise, one screen pair hold, chip riding above the phone and the hold on CSS sticky (a
.cr-stage wrapper). Kept from the live page: the paragraph width scales below 1440 (Math.min(360, 360 * g)) so
it clears the phone at 768, the lazy mount in current.js and the reduced motion still (no mount, frame 2 still,
no hold reserved). Gates in GATES.md. The check now loads the live page; all eight pass (start IoU 0.9966, end
0.9878, smooth p95 17.6 ms, 0 px shake, 0 repaints in the hold) and each fails on its planted mistake. The
reduced plant now mounts the phone under reduced motion. Checked in the built-in browser at 1440, 768 and 390.
