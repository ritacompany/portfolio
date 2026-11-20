# Cursor button: review log

## Round 1
Own review only (the fresh eyes run came in round 2): a see through outline let the label collide with the screenshot type.
- P0: 0.75 to 3.0 s the label sat on top of "Real users. Real answers." with nothing behind it and read as a jumble. Fixed: the outline keeps a solid Neutral/900 inside (cursor-button.css).

## Round 2
Fresh eyes: text "smeared and doubled" while moving (0.75 to 1.0 s, 2.75 s, 3.0 to 3.75 s); button cut by the left edge at 390 on entry and by the bottom on exit; pressed state short; an uneven 0.5 s end hold.
- P1: 0.75 to 3.75 s the doubling is the renderer's own motion blur (render.mjs blends several samples per frame), not the button. Checked: the same moment rendered with one sample per frame at 60 fps (output/motion/cursor-button-1100x800-sub1.mp4, 3.0 s) shows one clean button. The browser draws the live page without blending. No change.
- P1: 0.5 to 0.9 s at 390 the scripted pointer starts 60 px left of the card, which is off the screen at 390, so the button is cut by the window edge. A tuner script artifact: phones never see the button (hover and fine pointer only). No change.
- P2: 2.2 to 2.5 s pressed state is short; it lasts as long as the mouse is held on the live page.
- P2: 4.1 to 4.6 s end hold longer than the start hold. Tuner script only.
