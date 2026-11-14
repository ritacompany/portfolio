# Capacity card cursor demo: style guide

Piece: the capacity card in Personalized timeline on the framework page (`timeline@2x.webp`, node 5812:17089).
Brief (his, 11 Nov and 13 Nov): the card is static, no curtain or grow in. A cursor comes in, clicks the right
arrow twice, the left once, each press in the design system's real press state, the value changes with each
click, then the cursor moves away. It must read as real product UI.

## Reference
- The card export itself: Mondai's Set your capacity screen. Panel fill #060606, hours in Heebo Bold, labels in
  IBM Plex Mono (Mondai type audit, 22 Oct: capacity "6" is Heebo; mono labels are Plex Mono).
- The arrows are Mondai's Secondary button drawn as a circle with an icon (his note, 13 Nov). States from his
  library screenshot, sampled and matched to tokens:
  - default: outline #5c675d, icon #f0fae9, no fill
  - hover: outline #767c74, icon #f0fae9
  - pressed: outline #434942, icon #a4aea3
- Hours to Action Items (his rule, 13 Nov): the count rises every couple of hours. 6 and 7 hours read about 4,
  8 hours about 5.

## Take
- The export stays the picture. Only what changes is live: the two buttons, the hours and the count digit,
  each placed over the export's own pixels and cut to match, so frame 0 is the export.
- The arrow icons stay the export's own pixels; the pressed look dims them to #a4aea3.
- State changes are instant, as the product's buttons are: hover when the pointer is over the button, pressed
  while it is held, and the value changes on release, as a click does.
- A plain system arrow cursor, black with a white edge, sized to the UI's scale (about two thirds of a button).
- Cursor paths ease in fast and settle long, the way a hand lands on a target, on a slight arc.

## Do not take
- No curtain, settle, scale or fade on the card. No glow, ripple or click burst.
- No number roll or count up: the product swaps the value.
- No looping: it plays once when the card is fully on screen and ends on 7 hours.
- No hand cursor or press ring. The only press cue besides the button state is a 10 percent cursor dip.

## Reduced motion
Nothing mounts. The card is the export at 6 hours, about 4 Action Items, buttons at rest.
