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
