# Chat phone turn: state list

1. Before the pin: frame 1 tilt. The paragraph waits, hidden, at its frame 2 spot. Everything scrolls normally.
2. Pin start: the phone reaches the middle of the screen. The block holds still for 1.2 screen heights of scroll.
3. During the pin: the phone turns to face on and drifts 90 px left (sine in out). At 60 percent of the turn
   the paragraph arrives with the page's text fade (1.4 s, power1.out), so it lands as the phone squares up.
4. After the pin: frame 2. Phone face on, paragraph beside it. Everything scrolls on.
Reduced motion: frame 2 as a still, no pin.
Narrow screens (under 768): phone centred and sized to the screen, paragraph under it, same pin and turn.
