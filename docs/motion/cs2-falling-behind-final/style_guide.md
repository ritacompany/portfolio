# CS2 Falling behind, final: style guide

The moving piece for the Falling behind block on the framework page (his yes, 11 Nov). Source: the
render page `site/motion-lab/cs2-falling-behind-final.html` on the shared engine `fb-engine.js`, the
version he asked for after the Drift clip (4 and 5 Nov). `fb-settings.json` is empty because he never
saved tuned values, so this round renders the engine defaults, which carry his Drift corrections.
Direction A (straight down, grow 1.08, docs/motion/cs2-falling-behind/) is the version he moved past.

## Take
- Weeks side by side: This week left, Next week right, three Action Items each.
- Labels IBM Plex Mono Bold 20 px, caps, green #09c916, no underline (his note on Drift).
- Background: small white pixels like stars, wandering up and down while drifting slowly right, seeded,
  every pixel living whole cycles per loop so the seam is clean.
- The open item gets the magenta ROLLOVER tag (#e31ecf), which stays after it lands (his note).
- It lifts a little, moves right into the top of Next week; Next week steps down and its last item
  makes way, so the week stays at three (the copy says the new week takes fewer new Action Items).
- On landing it turns active: green outline #3da342 and ring #09c916, with a glitchy load in (flicker
  and colour split), his ask.
- This week closes the gap only after the item has landed.
- Springs from site/lib/motion.js; the move on a smooth in out curve; pure function of t.

## Do not take
- Glow, bursts, trails, the item dissolving, an outline that traces itself (each was rejected on Drift).
- Any copy beyond the two week labels and the ROLLOVER tag.

## Page use
Shown in the Falling behind block as a media frame: Haven's curtain opens it, then the loop plays while
it is on screen. Reduced motion shows one still at 5.5 s (landed, active, gap closed).
