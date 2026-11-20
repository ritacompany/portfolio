# Rescheduling popover shadow (20 Nov)

## What the gradient is for
It dims every other Action Item so only the one being rescheduled stays lit, which ties that card to
the "Select a new time" popover hanging off its reschedule icon.

## What was wrong
Figma frame 6331:20607, group 6331:24278. Rectangle 2982 (6331:24376) is the dimming layer: #040405,
vertical gradient 26% at its top edge, 74% at 53px, 100% at the bottom. Its top edge sat 87px into the
illustration, halfway through the selected card ("Synthesize usability findings", 55 to 159px). So it:
- cut the white title in half with a hard 26% step (title pixels 205 above, 154 below)
- dimmed the description, the WED 6PM to 7PM time and the reschedule icon, the very card it should show.
The same rectangle is in every CS frame (OLD 5763, NEW 6228, BACKUP 6297, most current 6331); the
shipped image matched Figma exactly, so the site did not break it. The Figma frame has the same line.
The product's own desktop screens (Home page 2474:7775 list view, 2882:34590 schedule view) were
checked: neither has this gradient; the list view shows the popover hanging under its card.

## Fix
Rebuilt the image at 2x from Figma's own layers (tools/rebuild.py): the card list 6331:24279, then the
gradient with Figma's colour and stops but starting at the selected card's bottom edge (159px) and
fading in from 0%, then the popover's drop shadow from Figma's effect values, then the popover
6331:24377. The frame border and corners come from the shipped export. Lossless webp, 1094 x 1018.
Figma itself is not edited.
