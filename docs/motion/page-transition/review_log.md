# Page change: review log

Clips: output/motion/page-fade-1440.mp4 and page-fade-390.mp4, real browser recordings of the built
site (claude/mondai-collection at b51c0ce), filmed with scripts/record-browser.mjs.

## Round 1
Fresh eyes: grey card box on the black page before any text when the collection arrives (both widths, worst at 390); the "text not started" state at 1.90 s did not hold; a blank frame with no nav on the framework page at 1440; outgoing text dims a little before images.
- P0: 1.63 to 1.80 s and 7.23 to 7.50 s, both widths (to 2.25 s at 390): the Framework card's box (Neutral/700) shows as a grey slab on the page colour before its picture opens, so the collection reads as still loading. Not the fade itself: the box background is outside the entrance (mondai-motion opens the picture inside it, the box is already there). Proposed fix, filmed from a copy and not in the site: the box has no background while its picture is closed (collection.css, one rule).
- P1: 4.23 to 4.50 s at 1440: the framework page is only the page colour for about 0.25 s, with the nav fading in on the entrance, before Framework CS arrives. It is the beat the plan asked for; it may read as dead. His call when he sees the clip.
- P1: 1.90 s state list said the entrance had not started; it had. State list corrected (wording, no motion change).
- P2: 4.12 to 4.20 s at 390 and 7.17 s: outgoing text dims slightly before images. That is the old page's own pixels under one even fade; nothing staggers. No change.
- P2: 9.63 to 9.73 s: Home comes back dark and brightens over 0.1 s. As designed.
- P2: 390, 1.50 s and 9.63 s: the large Home logo mark at the top edge fades with the page. As designed; flair later (nav holds still) would cover it.

## Round 2
Clips with the card box fix, filmed from a copy of the site (output/motion/page-fade-fix-1440.mp4, page-fade-fix-390.mp4); the site itself is unchanged until he says yes. Fresh eyes is the round 1 reviewer, resumed: the repo's cost hook allows three new agents a turn and they were used, so this reviewer had seen round 1 but still never saw code.
Fresh eyes: no P0. The grey box is gone: 1.60 to 1.70 s and 7.23 to 7.33 s are page colour only, and the framework picture arrives only as it opens. The rest as in round 1.
- P1: 4.23 to 4.50 s at 1440: page colour only for about 0.25 s before Framework CS; the nav is too faint to read at review scale (390 shows it). The beat is what the plan asked for; his call on the clip. State list no longer claims the nav at that moment.
- P1: 390, 1.50 to 1.60 s and 9.63 to 9.73 s: the large Home logo mark fades with the page. As designed today; flair later (nav holds still) would answer it.
- P2: 4.12 to 4.20 s at 390 and 7.17 s: big type reads as dimming a touch before pictures under one even fade. No change.
- P2: 2.00 s: the collection's wordmark is about half in at 0.5 s after the click; matches the state list.
- P2: 9.63 s: Home comes back dark and brightens over 0.1 s. As designed.
