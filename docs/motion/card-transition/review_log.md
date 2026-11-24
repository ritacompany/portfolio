# Review log: card to collection transition

Captures: `node scripts/check-card-transition.mjs CAPTURE <preview dir>` writes a contact sheet and a frame by
frame travel sheet per direction and width to output/motion/card-transition/. The page change itself
cannot be filmed by live-capture (it steps one page's clock), so both halves are stepped through
window.CardTransition.seek and joined: Home exit frames, then arrival frames.

## Round 1
Fresh eyes: B is the clearest idea (picture shrinking into the logo); C crossfades and collides text in its first third of a second; A goes empty for a beat and never visibly fills the screen.
- P0: C, 1440 200 to 433 ms and 390 100 to 400 ms: the travelling label crossed the intro paragraph. Fixed: in C the intro waits until the label has passed (60 percent of the travel).
- P0: C, 0 to 200 ms: rows showed through the picture while it faded, two layouts at once. Fixed: the picture is gone by 30 percent of the travel and the page only starts filling at 30 percent, so the two never overlap in time; the zoom now reads on the title, nav and rows.
- P0: A and B, 390 67 to 100 ms: "Tech career navigator" was still visible as the label travelled down through it. Fixed: card only text fades in the first 12 percent of the travel.
- P1: A, 400 to 700 ms: an empty beat, then a slow build. The fill now starts at 60 percent of the spring's progress (about 150 ms in) and the fades are 1.0 s, 0.12 s apart, instead of the shared 1.4 s.
- P1: A: the picture faded before the frame reached the edges. It now holds until half way and dissolves as the frame fills the screen.
- P1: B: the mark appeared before the picture landed. Picture now fades from 72 percent, as the mark fades in under it.
- P1: A and B, 390 267 to 567 ms: the label's spring tail reads as a 25 px drift after the title has landed. Open: both ride one spring; a stiffer spring shortens it. Left for his tuning (the spring is on the panel).
- P2: the arrow of the first row and the "Design system CS" wrap at 390 sit under the preview's review tab strip and are the page's own layout (G2 compares the end frame with a direct visit). Not the transition.
- P2: "LEARN M" cut at 390: the preview's tab strip covers it. Not the transition.

## Round 2
Fresh eyes: B again the one to ship; A holds a dark laptop ghost behind the words too long; B shows a wedge of the laptop inside the closing circle; C's title and label crowd each other at the top left.
- P0: B, 1440 133 to 300 ms: a wedge of the laptop base showed in the closing circle and landed on the mark. Fixed: the picture dissolves between 50 and 85 percent, the mark fades in from 60 percent under it.
- P0: C, 1440 167 to 200 ms and 390 100 to 133 ms: the title grows rightward along the card's line into the label, which had not moved yet. Fixed in every direction: the label and // now drop first (their vertical move leads, ease out squared) and the title grows on the plain spring.
- P0: A, 1440 200 to 433 ms and 390 200 to 300 ms: the dissolving picture sat behind the title and label too long, the label over the screen's own text. Fixed: the picture dissolves between 35 and 85 percent, a middle ground between round 1 (too early to see the frame fill) and round 2.
- P0, rejected: A, "the picture is cropped by the motion" as it passes the screen edges. That is the direction: the frame fills the screen.
- P0 found by me: C, 390 400 to 433 ms: the label still touched the intro's last line; the intro now waits until 75 percent. On the phone the card has no //, so the page's // now fades in at 85 percent, as the label lands beside it, instead of sitting alone early.
- P1: C does not read as a half size page zooming in: the page fills after the picture leaves. Open; it is the honest limit of this direction once text may not cross the picture.
- P1: A 400 to 500 ms still nearly empty at 1440 before the rows arrive. Open; tunable.
- P1: A 1440 0 to 33 ms "the title jumps from the nav strip": the card's head sits at the top of the screen in this capture, so that is the start of its travel, not a jump. No change.

## Round 3
Fresh eyes: none shippable as is; the words still overprint the picture's own screen text in A and B; B leaves a dark smudge as the tile closes; C still reads as a dissolve more than a zoom; dead time before the page fills.
- P0: A and B, both widths, 0 to 200 ms: the travelling label overprinted the laptop screen's own text. Fixed at the cause in every direction: a Neutral/900 shade darkens the picture to 35 percent in the first quarter of the travel, before the words cross it, then the picture dissolves as before.
- P0: B, 1440 133 to 233 ms: the small rounded tile lingered as a smudge. Fixed: B dissolves between 45 and 75 percent, before the tile is small; the mark fades in from 50 to 90 percent.
- P0: phone, 0 to 33 ms: the card's Learn more vanished in one frame (it faded on spring progress, which jumps at the start). Fixed: card only parts fade out over 180 ms of time.
- P0, rejected: "A 1440 0 ms differs from Home's last frame". Measured: G1 compares the two frames pixel by pixel, mean difference 0.004 of 255 at 1440. The reviewer compared the arrival with Home's first exit frame.
- P0, open as P1: C, 133 to 167 ms, the picture ghosts under the zooming title. The page fill now starts at 35 percent and the picture is shaded first; C remains the weakest direction and is labelled that way for him.
- P1: dead time before the fill. A and B now start filling at 45 percent of the travel.
- P1: the // on the phone fades in late; on purpose, it lands with the label (the card has no // at that width).

## Round 4
Fresh eyes: not run this round. A hook allows three reviewer subagents per turn and rounds 1 to 3 used them; this round is my own read of every travel sheet, and the first thing to rerun with a fresh reviewer.
- P0: B, 390 33 to 67 ms: the label dropped through "Tech career navigator", which sits under it on the phone and was still fading. Fixed at the cause: parts that are only on the card (the description, the phone's Learn more) are no longer copied at all. They go with Home under the veil, so nothing the words could cross is left on the arrival. G1 still compares the two frames across the page change.
- No other P0 seen in A, B or C at either width: no text crosses text, the picture is shaded before the words pass over it, the hand over is pixel matched (G1) and the end matches a direct visit (G2).
- P1: C, both widths: the label's spring tail is long (it lands at about 1.2 s on the phone). Tunable on the panel.
- P1: C still reads more as a dissolve with a growing title than a camera push. Honest limit of the direction; said so in the hand off.
- P2: B, 390 100 to 133 ms: the label passes over the shaded, shrinking tile. Readable; kept.

## Round 5
Fresh eyes: first round on the new collection page (6331:27875). Rounds 1 to 4 above were on the retired page and their fixes carried over (the shade before the words cross the picture, card only parts under Home's veil). C reads clean; B's picture swap overlapped "Mondai" for a few frames at 1440; C dipped to near black at 300 to 400 ms; the fill came late.
- P0: B, 1440 167 to 233 ms: the shaded Home picture and the framework preview overlapped inside the frame for too long, with the growing wordmark over both. Fixed: the Home picture goes between 20 and 50 percent, the preview comes between 40 and 75, so the two overlap only briefly while the frame is the moving object.
- P0 found by me: 390, 267 to 300 ms: the card's capital label and the page's sentence case label overlapped at two sizes. Fixed: the card's label is gone by 65 percent and the page's label starts at 65.
- P1: C, 300 to 400 ms: near black before the page fills. The picture now dissolves from 40 to 90 percent and the fill starts at 30 percent.
- P1: B and C, the fill came late. It now starts at 30 percent of the travel with shorter steps.
- Found while checking: on PR #30's own build, a direct visit never loads the Design system card's glitch image (lazy, and held behind a closed clip that never opens). Confirmed on that branch alone. Not this piece; told to Chadwick.

## Round 6
Fresh eyes: No P0. B is the one it would ship: the laptop shrinks into the first case study card while "Mondai" swells above it. C's grow costs a dim beat on desktop and puts the label over picture text on the phone.
- P1: B, 390 200 to 300 ms: the label's hand over shifts about 20 px across, because the card's label sits left and the page's sits right under the wordmark. Open; the two typesettings differ, so a perfect overlap is not possible without changing the page.
- P1: C, 390 133 to 267 ms: the label sits on the zoomed picture's own UI text. Readable; the picture is shaded.
- P1: C, 1440 333 to 433 ms: still a quiet beat before the cards arrive; C settles at about 1.3 s.
- P1: B, 1440 67 to 167 ms: the label crosses the shaded laptop screen. Readable.
- P2: B and C, 390 about 300 ms: the Framework CS head meets the frame's top edge while the frame is still moving.
- P2: the Design system card's picture arrives as a hard edged tile at 600 to 700 ms.
- Found by G2 and G4 at 390: on the phone the lower cards sit below the page's own entrance trigger. The transition now owns only what is 100 px inside the screen; the rest waits for the scroll, as on a direct visit.

## Round 7
Fresh eyes: Chadwick, 24 Nov, from a screen recording of the published build: "it doesn't feel smooth ... there's a pause", and no video had been shown to him. His recording, measured frame by frame: the card sat still on black for about 0.4 s (19.37 to 19.77 s) between Home's fade and the move.
- P0: B and C, the pause. Cause: the move only started once the collection had loaded, and the collection then waited up to 150 ms more for images. The stepped review could never show it, because it steps each page's clock and skips the load. Fixed: Home measures the collection ahead of the click (a hidden frame, which also caches it) and starts the move on the release; the collection continues from Home's last frame and catches up with the clock. New gate G8 films a real click with the page held back 0.3 s on the network: the 22 Nov build fails it (still for 0.4 s at 1440, 0.32 s at 390); this build passes (longest still 0.08 s).
- P0 found by G8's first run: one empty black frame where the pages swap (the preview's own buttons let the browser paint the new page before the move was drawn on it). Fixed: the transition script blocks the collection's first paint until it has run (`blocking="render"`, added as an opt-in to scripts/build-preview.mjs). G8 now also fails any frame far darker than both neighbours; it caught this one before the fix and passes after.
- P1: A (PR #30's view transition) shares the page load; the hidden frame now caches the page, which shortens it, but A was not reworked.
- Videos for him, real clock, the page held back 0.3 s as on the published build: output/motion/card-transition/videos/ (now-A, now-B, now-C, before-B).

## Round 8
Fresh eyes: on real-time recordings (the page held back 0.3 s). B has no P0. A, then PR #30's browser view transition, sat still for about 0.37 s after the press: it cannot start until the page has loaded, the same pause he reported. C went to an empty black stage for about 0.27 s.
- P0: A, 0 to 466 ms: Home still before anything moves. Fixed: A rebuilt on this engine (only the words travel), so it starts on the release like B and C.
- P0: C, 566 to 833 ms: only "Mondai" on black. Fixed: the picture now dissolves between 55 and 100 percent, as the cards arrive.
- P1: B, the veil read late then stepped. Addressed in round 9.

## Round 9
Fresh eyes: the pause had moved, not gone: the move landed by about 600 ms but the page's own items only appeared when the page arrived, about 870 ms; the label vanished before the page's label appeared; the veil cut to black.
- P0: all, 600 to 870 ms: the dead beat after the move. Fixed: Home opens the page while the veil is still closing (at 55 percent of its 220 ms) so the load overlaps the move, and the page's items fade over 0.6 s from the page's first frame.
- P0: A, 200 to 233 ms: cut to black. Fixed: the veil eases in on a sine, so it starts at once but never cuts.
- P1: A and C, the label gap. Fixed: the page's label is drawn as part of the move, so it arrives on schedule even before the page has loaded.
- Found by G8 while checking: about one run in three, one frame at 390 where the card's picture is missing as the pages swap (the new page has not decoded the image yet). Not fixed: the page cannot hold its first paint for an image (tested: neither a module script with top level await nor a script inserted `rel=expect` delays first paint). Open, flagged to him.

## Round 10
Fresh eyes: No P0 in B or C. B carries a visible object the whole way, with a short lull (570 to 770 ms) while the page arrives. C is smooth but dark in the middle.
- P0: A, 266 to 700 ms: only the wordmark on black until the page arrives. Closed by taking A out of the recommendation: with only the words travelling, nothing else can be drawn until the page has loaded, so A always has this beat when the page is slow. It stays on the panel as the baseline, labelled with the beat.
- P1: B, 570 to 770 ms: a short lull while the page arrives; with the page cached by the hidden frame it is shorter on a real visit.
- P1: C, 266 to 500 ms: the growing frame is too dark to read as opening.
- P2: the other cards' fade is slow to settle.
