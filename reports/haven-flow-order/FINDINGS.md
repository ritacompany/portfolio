# Haven journey flow: which comes first, scheduling or the intro chat

His question, 24 Nov: the Confidante selection journey flow puts Intro chat before Schedule a chat. "Aren't you scheduling the intro chat?"

## Answer

Yes. The order is wrong, and it is wrong in his Figma too: the page copies his Figma component exactly. Every screen and every line of copy in the case study has the user book the intro chat first and then have it. Only the diagram puts the chat before the booking.

Proposed order:

| | Now | Proposed |
| --- | --- | --- |
| Starting state (early flow) | Identity quiz, Review matches, Select a Confidante, Intro chat, Schedule a chat | Identity quiz, Review matches, Select a Confidante, Schedule a chat, Intro chat |
| End state (revised flow) | Identity quiz, Review matches, Intro chat, Schedule a chat, Select a Confidante | Identity quiz, Review matches, Schedule a chat, Intro chat, Select a Confidante |
| aria-label | Revised flow: identity quiz, review matches, intro chat, schedule a chat, select a Confidante | Revised flow: identity quiz, review matches, schedule a chat, intro chat, select a Confidante |

The slide is unchanged: Select a Confidante still moves from slot 3 to slot 5 and the two chat steps still move one slot left. No case study copy changes; the copy is already right.

## Applied

25 Nov, on his yes: the order and aria-label are changed on the live page (site/haven/index.html and haven.js) and in reference/haven/final-copy.md. The phone sizes from his frame are not applied; they stay in site/dev/haven-flow-vertical.

## What each source says

### Figma file 5RO0m4bYYrTvbiaOgaU3tI, page CS, frame Transported Haven CS (5812:21569)

Read on 24 Nov with read only scripts. Nothing in the file was edited.

**The journey flow diagram.** The live diagram is an instance (5812:22351, State=Early) of the component set "Confidante selection flow" (5733:14733). Its two variants, read by position left to right:

- State=Early (5733:14734): 1 Identity quiz, 2 Review matches, 3 Select a Confidante, 4 Intro chat, 5 Schedule a chat.
- State=Revised (5733:14757): 1 Identity quiz, 2 Review matches, 3 Intro chat, 4 Schedule a chat, 5 Select a Confidante.

A hidden older frame, "Old static flow (hidden, replaced by component)" (5812:22352), has the same early order. So the page matches his Figma step for step. The page did not introduce the error; it inherited it.

**His screens in the same frame, which say the opposite:**

- Confidante profile, call to action (5812:22178): "Schedule an Introduction Chat to decide if this Confidante is the best fit for you." Button (5812:22180): "Schedule Chat".
- Scheduling screen header (5812:21849): "Introduction chats are always 30 minutes. Once you select a Confidante, duration options will become available."
- Scheduling screen reassurance (5812:21866): "The set duration is only for scheduling purposes. You can always end a chat early for any reason."
- Usability testing tasks (5812:22203, 22207, 22211): "Confidante match enrollment", "Select a Confidante", "Schedule a chat", in that order. That is the early flow as tested: choose, then schedule.
- Headline (5812:22338): "Haven's early flow asked people to choose a Confidante before they could have an introductory chat."
- Scheduling headline (5812:22464): "People needed to know what to expect before booking an introductory chat."

The intro chat is scheduled from the profile and booked on the scheduling screen at a fixed 30 minutes. Scheduling comes before the intro chat in both flows.

**One wrinkle, stated so it is not picked silently.** The scheduling header says duration options open up once you select a Confidante. That means there is a second, later kind of scheduling: regular chats with the Confidante you chose. If "Schedule a chat" in the diagram meant those later chats, the early order (select, intro chat, schedule) could be read as right. It cannot rescue the revised order, though: there "Schedule a chat" sits before "Select a Confidante", and later chats only open up after selection. So in the revised flow "Schedule a chat" can only mean booking the intro chat, and the booking has to come before the chat. Using one meaning across both states, as the slide animation does, gives the proposed order. The testing tasks (select, then schedule) and the early wireframe "Confidante profile with a schedule chat button" support the same reading for the early flow.

### Figma file IarvWaqjIwrZ2afQmMxKm6, older master 3300:12596 and journey flow 3878:3068

Read 25 Nov (the 24 Nov attempt hit Figma's tool call limit for his View seat). Node 3878:3068, "Journey map: research to design", holds an instance of the same component (4027:5586, "Confidante selection flow", State=Early) plus an older row of labels. Both read left to right: Identity quiz, Review matches, Select a Confidante, Intro chat, Schedule a chat. Same order as the CS file, so the error goes back to the original master. The page's `data-node="3878:3068"` points here.

### Figma phone frame "Haven phone, journey flow (390, sizes as built 23 Nov)" (6394:30516)

Not touched; read only on 25 Nov for its sizes (circles 151.6 with a 1.47 stroke, rows 16 apart, labels 20 px medium, numbers 74.7 px bold in a column at x 46, circles at x 142.5, the column 45 below the body copy). Those sizes are built in `site/dev/haven-flow-vertical/`. It has the journey body copy and only two steps so far: 1 Identity quiz, 2 Review matches. Those two do not change. When he adds steps 3 to 5, they need the proposed order: Schedule a chat at 3, Intro chat at 4, Select a Confidante at 5 for the end state (or Select a Confidante at 3, Schedule a chat at 4, Intro chat at 5 if the frame shows the starting state).

### reference/haven/

- `final-copy.md` line 110: "Flow: Identity quiz | Review matches | Select a Confidante | Intro chat | Schedule a chat"; line 111, the alt: "Revised flow: identity quiz, review matches, intro chat, schedule a chat, select a Confidante". Both copy the page, so both carry the error. They change with the page once he approves.
- `final-copy.md` line 123: "Users needed to know what to expect before booking an introductory chat." Line 126: "Your events listing two introduction chats, and Schedule a chat with a date picker and time slots." Line 72: "Wireframe: Confidante profile with a schedule chat button." Line 151: "An intro chat comes first, so users can see if it feels right." All agree: booking, then the chat, then the choice.
- `reader-check/r5/known.md` K9: "The early flow had users choose a Confidante before an introductory chat ... so selection moved after the introductory chat". Says nothing about where scheduling sits. Consistent with either order.

### prototypes/journey-map/

The motion prototype from 30 Sep (README, "What the section does"): "Select a confidante slides from slot 3 to slot 5 while the two chat steps slide one slot left." It takes its order from a different Figma file (HXNz5yqngCJtDF8NUK86Cd, node 5821:20), not read here, and is a historical motion reference, not the page. Left as it is; the slide it documents is unchanged by this fix.

## Does any case study copy need to change?

No. Every sentence about the flow is right under the proposed order:

- "Haven's early flow asked users to choose a Confidante before they could have an introductory chat." Still true: Select a Confidante is at 3, the intro chat at 5.
- "I moved selection after the introductory chat, which exists to help them decide." Still true.
- "In the revised flow, users can chat with more than one Confidante before choosing one." Still true.
- "Users needed to know what to expect before booking an introductory chat." This is the sentence the current diagram contradicts; the fix makes the diagram agree with it.

## Elsewhere that carries the old order

- His Figma component "Confidante selection flow" (5733:14733), both variants: swap Intro chat and Schedule a chat. Read only here; his to change.
- `site/dev/haven-phone/haven.js`, the phone layout proposal from the haven-mobile work, has its own copy of the flow code with the old order. Left alone because it belongs to that proposal; the same three line fix (start map, end state, slide lines) applies there when that proposal is next touched.
- `reference/haven/final-copy.md` lines 110 and 111: updated with the page after his yes.

## The phone column at his sizes

`site/dev/haven-flow-vertical/` is the flow order proposal with the phone column drawn at his frame's sizes, same motion as desktop moving down the column. Render: `video/haven-flow-phone.mp4` (390 by 844 at 2x, 60 fps). At these sizes the column is 822 px tall and the screen under the 50 px bar is 794 px, so all five steps never fit on one phone screen at once; in the video the top of step 1 sits under the bar so the landing on step 5 shows whole. Shrinking the circles to about 145 px or the gap between rows to 8 px would fit it; that is his call on sizes, not changed here.

## His updated phone design (25 Nov)

The phone frame he updated is "haven update journey mobile" (6445:24415), a second frame beside 6394:30516 that first carried the same name, which is why the first build used the old circles. The new design: a "Flow updates" heading over five rows of number, dotted rule and label chip, Select Confidante as the green chip. Built in `site/dev/haven-flow-mobile/` (from `build-mobile.mjs`), same motion as desktop moving down the list, video in `video/haven-flow-mobile.mp4`. His frame lists 4 Intro chat, 5 Schedule chat, the old order; the build uses the corrected order he approved (4 Schedule chat, 5 Intro chat at the start). The frame labels are shorter than the desktop circles (Select Confidante, Schedule chat), and the heading Flow updates is new copy on the page; both are taken from his frame. Not live: it waits for his yes.
