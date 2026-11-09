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

## Round 3, built from the recording
9 Nov 2026. His words: start the concept from fresh, prioritising the videos; it should work like the
video. No tuner, no sliders, no rendered clips. The gooey recording was read frame by frame at 60 fps
(reference/buttons/ on main) and the shipped spring and the PR 15 back ease were both grabbed on the
real footer at the same frames and set beside it.
- Shipped (spring, stiff 0.075, damp 0.82): bounces twice and on leave the circle sinks into the pill
  as one egg shaped blob (1.4 s). Not the recording.
- PR 15 (back ease 380 ms, bounce 1.7): the timing is right but the neck thins as a grey smear with a
  cross at the snap (0.4 s), and the rest neck is a thin pinch where the recording has a wide fillet.
- New (the motion lab file contact-goo-next.js): the circle follows the recording's own per frame curve
  (CURVE, 24 frames) and a third shape, the neck, follows the recording's neck height for each amount
  of travel (NECK), so the rest fillet, the thread and the snap at 0.5 of the pull come from the
  measurement, not from the blur. Blur 8, threshold 48 with cutoff 24, so no grey at the snap.
- Checked live with a real pointer on the motion lab page contact-button-footer.html: tuck of 2 px, pull
  to 30 and settle at 28 in 0.4 s, neck gone at 0.19 s; leave mirrored; press squeezes 6 px; a quick
  in and out returns to 0.00; reduced motion keeps the plain borders. No console errors.
- Not copied into the shipped module yet: the site review gate (docs/SITE_BUILD_PLAN.md) needs his
  yes in the session that copies it over. The lab file is the shipping file byte for byte.
