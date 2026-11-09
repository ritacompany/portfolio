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

## Round 4, the mix
9 Nov 2026. His correction: the two recordings are one effect. The left part separates (gooey), then
with the cursor on the main part of the button the outline does the liquid effect, and no colour behind
it. Read the liquid recording at 60 fps (frames 132 to 246, pointer inside and leaving; 366 to 426,
pointer just outside): inside, the outline near the pointer bulges outward over it and the hump
follows the pointer, the far edge moving a little too; leaving, the edge sticks to the pointer and
stretches into a soft point, lets go and wobbles back in about 0.4 s; just outside an edge the body
presses in, which is where the cyan showed.
- Built into the same lab module: the label pill is now a ring of points on springs (speed 0.36 s,
  bounce 0.6, neighbour coupling for the travelling wave), drawn as an SVG path through the same goo
  filter, so the outline stays one 3 px line and the goo split is untouched. Inside: bulge 16 px over a
  46 px reach. Leaving: stretch up to 22 px, let go at 48 px. Just outside: press in 9 px, no colour.
  Over the icon circle the pill is left alone. Offsets capped at 20 px out and 8 px in, clear of the text.
- Checked live with a real pointer: bulge 15 px at the top edge with the pointer 12 px inside it,
  stretch 10 px after a leaving pointer, settled to 0.02 px within 0.8 s, hover and leave curve as in
  round 3, press, quick in and out, reduced motion. No console errors.
- Still in the lab, not in the shipped module: the site review gate needs his yes.

## Round 5, the colour behind
9 Nov 2026. His ask: the colour behind, as in the liquid reference, and where the gap reaches the
letters the letters take a colour; a place in the preview to play with both colours.
- Built: with the cursor just outside an edge the body presses in deeper than the outline (deep 30 px
  against the outline's 9) and the hidden colour fills the gap, drawn in a plain SVG layer under the goo
  outline so the ring stays whole. The letters are drawn again in the text colour and clipped to the gap
  with an evenodd clip path, so only the covered parts change colour. Defaults Neutral 300 behind and
  Neutral 900 letters; hiddenOn 0 turns it all off.
- Lab page: a tryout panel (colour behind, letters in the gap, depth, on and off, reset), kept in this
  browser. The panel is lab only; the module carries the chosen values.
- Fixed on the way: the colour layer first painted over the ring (layer order), and a hairline of the
  hidden colour along the whole edge at rest (the body now reaches 1.5 px under the ring).
- Live gate as before plus the membrane: bulge 15 px, stretch 10 px, settle 0.02 px. Site check OK.

## Round 6
9 Nov 2026. First render of the mix on the Home footer as built: contact-footer-1440 (60 fps) and
contact-footer-390 (30 fps), 8.5 s loop, sheets from the new state list. His correction before this
round: at rest the button is the Figma default, two rings crossing by 3 px, nothing merged.
Mine:
- P0: 0.00 to 0.40 s: the body melted into one shape at rest for the first 0.4 s after load, then separated. A fresh mover counted as mid move. Fixed: a mover is settled until a target changes.
- P0: 4.80 to 5.60 s: the colour behind never showed. The leaving catch from 3.3 s never let go because the pointer stayed within 48 px, so the press in never fired. Fixed: the catch lets go when the pointer stops moving away.
- P1: 7.60 to 7.90 s: the scripted pointer crossed the button on its way back to the start and fired a second hover. Fixed: the path goes around.
- P1: 390, every frame: the clip box reached past the viewport, so the 390 render was garbage. Fixed: the box is kept inside the viewport.
Fresh eyes: at 390 the circle slid to 3 px from the screen edge; at 390 it read a 3 px gap at rest (checked: it is the Figma crossing); the icon looked squashed during the tuck (checked: the pointer ring sat on the icon); the colour spilled past the outline and the letters barely changed; the list times ran ahead of the pointer; the press read as a drift; the leave stretch, snap and melt landed inside 0.25 s.
- P0: 390, 1.50 to 3.25 s: the split circle came to 3 px from the screen edge. Fixed: the pull is capped so the circle keeps its room.
- P1: 0.50 to 1.00 s: the pointer ring covered the mail icon and read as a smeared glyph. Fixed: the pointer path meets the icon low on its left.
- P1: 4.75 to 5.50 s: the colour fringed past the ring by a pixel. Fixed: the colour stops 1 px inside the ring's edge.
- P1: 6.30 and 6.60 s: the press read as a drift. Fixed: squeeze 6 to 9 px.
- P1: 3.25 to 3.50 s: stretch, snap and melt inside 0.25 s. Fixed: the pointer leaves at 80 px a second so the point and the let go read.
- P1: 5.75 and 6.75 s: list times ran ahead of the pointer. Fixed: the list now carries the edge crossing times.
- P2: 1.50 to 2.00 s: the pill goes lumpy with the hump left of the pointer. Kept: the liquid reference goes lumpy the same way.
- P2: 2.00 to 2.50 s: the pointer ring sat on the A. Fixed in the path.
- P2: 390: the clipped portraits at the bottom of the frame. Fixed: the clip box is 44 px tall around the button.

## Round 7
9 Nov 2026. Re-render after the round 6 fixes, both widths, same state list.
Mine:
- P1: 390, 1.50 to 2.00 s: the circle still came to 8 px from the screen edge. Fixed: the cap keeps 12 px.
- P1: every frame: the clip cut the caption line above the button. Fixed: the clip box starts 44 px above the button, below the caption.
- P2: 3.50 and 7.50 s: the reforming neck pinches to a bowtie for two frames. Kept: that is the thread the gooey recording shows before the snap, in reverse.
Fresh eyes: no P0. The crop cut the caption and a portrait; the circle started splitting before the listed inward crossing (checked: the hit area is the button box plus 4 px, the listed time was wrong by 0.24 s); a grey sliver at the circle at 390, 5.75 s (checked at 2x: not reproduced); the bottom edge started stretching before the listed 3.30 s (the edge crossing is 3.25 s); 390 crowding at 8 px; the colour mound clustered where the pointer is (that is the reference's behaviour); the bowtie neck; the pointer velocity jumps at the seam.
- P1: 0.00 to 8.50 s, both widths: the crop cut the caption at the top and a portrait at the bottom. Fixed: the clip box is 44 px above and below the button.
- P1: 5.93 to 6.03 s: the split began 0.24 s before the listed crossing. Fixed: the list time is the edge crossing, 5.88 s.
- P1: 3.00 to 3.25 s: the stretch began before the listed 3.30 s. Fixed: the list time is the edge crossing, 3.25 s.
- P1: 390, 1.50 to 2.00 s: crowded at 8 px from the edge. Fixed: the pull is capped so the circle keeps 12 px.
- P1: 5.00 to 5.75 s: the colour behind reads as a mound where the pointer is, and the letter colour change is small. Kept: the mound under the pointer is what the liquid reference does; the depth and both colours are on the lab page's tryout panel for him.
- P2: 3.50 and 7.50 s: bowtie neck for two frames. Kept.
- P2: 8.50 to 0.00 s: the pointer's speed jumps at the seam. Kept: the frames match and nothing on the button moves there.
- P2: 390 at 30 fps: the press and the early melt skip frames. Kept: a review rate; the page runs at 60.
Render after these fixes: the two renders of one build do not hash the same on this machine even for a 0.5 s clip of frames that are pixel identical across browser launches (checked at 0 s and 2 s), so the difference is in the encode, not in the page. Noted, not resolved here.
