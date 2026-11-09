# Contact button motion: review log

Ranked review, P0 to P2.

## Round 1
9 Nov 2026. 720 by 640 at 30 fps, sheets from state_list.md (first version of the path).
Mine:
- P0: B, 0.6 to 2.4 s: the edge ripples like noise instead of one smooth peak; per point catch flags flip on and off.
- P0: B, 1.0 to 1.4 s: the scripted pointer never leaves the edge, so the drag barely shows.
- P0: seam, PSNR 30.3 dB: the pointer is still travelling at 6.0 s.
Fresh eyes (Sonnet, style guide, state list, references and sheets only):
- P0: seam does not loop (PSNR 30.3); pointer still moving at the end.
- P0: the pointer draws as a smear of four dots (render motion blur sampling, sub 4).
- P0: A, 2.1 s, 2.9 s and 4.6 s: the icon circle reads grey and filled for two or three frames (same blending of a moving outline).
- P1: B pull far too weak, about 5 px against the 27 the guide asks.
- P1: B wobble after release hard to see; edge keeps a ripple.
- P1: press at 3.8 s not visible in either version.
- P1: A parks still for 0.4 s while the pointer moves; reads dead.
- P1: pointer dot covers the label letters; buttons small in a wide frame; row labels unreadable at phone size.
- P2: A neck slightly more pinched than the reference; faint vertical streaks in early tiles.
Fixes for round 2: B rebuilt as one anchored drag per ring with a smooth falloff along the edge
(no per point flags), path pulls the edge out 27 px and drags it, pointer held still from 5.7 s,
render with sub 1 so moving outlines and the pointer never blend, pointer drawn as a small ring,
press 6 px, frame cropped tighter.

## Round 2
9 Nov 2026. 560 by 520 at 30 fps, sub 1, path and state list as now. Seam PSNR 48.3 dB, clean.
Fresh eyes:
- P0: A, 0.6 s: the circle detaches in about four frames with no thin neck stage. Real: the neck broke
  at a small gap and the pull was quick. Fixed: blur 7 to 9, threshold 26/12, pull spring slower.
- P0: A gap looks wider than 32 px. Checked: translate is 32 px, the visible gap 29 (3 px overlap). Not a defect.
- P0: A icon turned near 90 degrees. Checked: the render used 18 degrees (stills at 0.74 s show the tilt). Misread at sheet size.
- P0: pointer pops in at the loop. Checked: the pointer starts and ends at the same point, off frame; the seam is clean. Not a defect.
- P0: B, 2.2 s: bulge stays a few frames after the flick. That is the spring returning; no pop in the strip. Kept.
- P1: B peak broader than 76 px of edge. Fixed: falloff 34 to 22 px, the peak now reads pointed like the reference.
- P1: B dent reaches the letters. Fixed: inward cap 12 to 8 px.
- P1: press not visible. Checked at 2x: both squeeze 6 px at 4.0 s; too small at sheet scale only.
- P1: captions overlapped by the pointer path. Kept: lab captions only.
Mine: no further P0.

## Round 3
9 Nov 2026. 560 by 520 and 390 by 520 at 30 fps, sub 1. Seam PSNR 48.0 dB (560) and 48.1 dB (390), clean.
Fresh eyes: No P0. No cropping at either width, no glow or fill, no blurred text, no pop at any cut.
- P1: B peak reads as a pointed tent at 1.5 s and at the right end at 4.5 s. Softened: falloff 22 to 26 px. (The reference peaks are also narrow near the cursor.)
- P1: the pointer and B's peak run into the row captions at 1.25 s. Kept: lab captions only, not on the site.
- P1: B shows little reaction on the icon at 0.6 s: the pointer crosses into the icon, so the pull is inward and capped at 8 px. Kept.
- P1: B dent at 3.5 s small and near the baseline. Kept at 8 px so it never touches the letters.
- P1: A neck thin to gone in one frame at 0.67 s, low confidence. Stills at 2x show the neck thinning over 0.62 to 0.70 s. Kept.
- P1: state list said A returns at 2.2 s; A returns when the pointer leaves the button at about 1.1 s. State list corrected.
- P2: press barely visible at sheet scale (visible at 2x). Pointer ring over the letters for about 1 s.
Mine: agree, no P0 open, so no fourth round.

## Ship, 9 Nov

His pick: A, the gooey split, default settings (pull 32, tilt 18, blur 9, stiffness 0.075, damping 0.82,
squeeze 6). Ported to site/js/contact-goo.js; the lab imports it, so lab and site share one code path.
Checked live on Home, Framework and Haven at 1440: rest neck, split on hover, tilt, press squeeze, flows
back on leave, no console errors. Lab rendered twice, sha256 matched. Page, sheet and Haven gates pass.

## Round 4
9 Nov 2026, Contact button session (branch claude/contact-button-liquid). The gooey recording measured frame by
frame (reference/buttons/gooey-liquid-button-recording.mov, 60 fps, button height 139 px in the capture): hover is
one back ease of about 0.38 s, tuck 6 px (10 percent) at 0.07 s, launch, 60 px (0.43 H) with a 5 px (8 percent)
overshoot at 0.29 s, settled at 0.36 s, no second bounce; the neck thins over three frames and snaps with the
circle 60 percent of the way out; leave is the same curve back (push out 5 px, flow back, sink 6 px past rest).
The shipped spring (stiffness 0.075, damping 0.82) measured against that: 90 percent of the pull in 0.10 s, a 28
percent overshoot at 0.20 s, a second dip and 0.68 s to settle. It read as a snap and a wobble, not the recording.
Changed: the spring is replaced by the back ease (dur 380 ms, bounce 1.7), pull 32 to 28 (style guide says why),
blur 9 to 12 and threshold 26/12 to 40/18 so the thinning neck stays a crisp thread (at 26/12 the thread rendered
as a grey smear at 2x), press on a 140 ms ease out instead of a second spring. Rendered 560 by 520 and 390 by 520
at 30 fps, sub 1; seam PSNR 48.8 dB (560) and 48.5 dB (390), clean.
Fresh eyes: Sonnet, with the style guide, state list, references and sheets only. Rest, pull, snap, tilt and the outline read
well against the reference; it called both leaves a pop and asked for a slower snap and a visible overshoot.
- Raised as P0 by fresh eyes: 1.20 to 1.23 s and 4.67 to 4.70 s, the circle rejoins in one frame of the 30 fps sheet.
  Checked on the 60 fps final clip (frames 1.100 to 1.383): the circle holds split while the pointer leaves and the
  curve tucks outward, then closes over three frames (1.200, 1.217, 1.233) and the neck reforms as a bump at 1.233,
  continuous at every frame. That is the ease's mid section, the same three frames the enter takes, and slower per
  frame than the recording (0.08 H per frame here, 0.11 H per frame in the recording, frames 29 to 33). Not a pop;
  the 30 fps review sheet halves the frames. Kept.
- P1: 0.80 to 0.83 s, the snap lands in one frame. Checked at 60 fps: the neck goes 97 to 79 to 47 px high to gone
  over 0.767, 0.783, 0.800 and 0.817 s, three frames, as in the recording. Kept.
- P1: 0.83 to 1.00 s, no visible overshoot. Checked: the icon reaches 30.8 px at 0.90 s and settles at 28 px by
  1.0 s, 10 percent, the recording's 8 percent; too small to see at sheet scale. scripts/verify-contact-goo.mjs
  asserts the tuck, one overshoot and settling under 0.6 s on the real footer. Kept.
- P1: 1.02 to 1.20 s, the circle lags the leave by 0.18 s. Checked: the half way point comes 0.19 s after the
  pointer leaves (half of the 0.38 s move); in the recording the circle rejoins 0.18 s after the leave starts
  (frames 100 to 111). Kept.
- P2: 3.80 and 4.20 s, the press squeeze is hard to see on A. It is 6 px on both shapes, asserted by the gate and
  visible at 2x; a slider on the tuner if he wants more.
- P2: pointer ring over the letters and the row captions. Lab framing only, not on the site.
- P2: the rest neck is fuller than the reference neck. Noted in the style guide (3 px seam against a third of the
  circle sunk); the Goo amount slider moves it.
- P2 (B, comparison only): pointed peak at 1.9 s and a flat wedge at 4.5 s. Not shipped.
Mine: no P0. P1: none beyond the above. P2: the 30 fps review sheets are too coarse for a 0.05 s snap; the
60 fps final clip and the 2x stills are what the judgement rests on.

## Handover, 9 Nov (not done)
Final clip rendered twice at 60 fps, sha256 matched (scripts/motion-tuner/render-twice.mjs). Gates in
.unlazy/contact-button/GATES.md. The tuner (scripts/motion-tuner/contact-goo.py builds site/motion-lab/contact-goo-tuner.html,
published at https://claude.ai/artifact/1UZGKKtRGbZMBgv7BhBPQG) runs the shipped module byte for byte with sliders
for every value he would feel. Open until he has felt it and sent the Copy settings line or said it feels right.
