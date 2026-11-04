# Growth Journey page, round 1 (3 Nov), draft only

His call 3 Nov: write the Growth Journey block before the Pathway page block (it comes first in the frame), then
return to the Pathway page. The story both blocks carry, his words paraphrased: this is how the structure is set
up, and it is not a surface people engage with regularly the way they do the Action Hub. Never said that bluntly.

Frame block 4809:27610 (y 4675): eyebrow Growth Journey at x 41, headline 40px width 887 (filler), text column
x 1207 width 193 at 16px (filler 143px). Image already in his frame: one person's UX Designer journey, a
personalized summary, journey target, journey pace and percent complete, the five Pathways each with target and
pace.

Reader has met (known-pathway.md K1 to K7): target and pace as two dates; the home screen shows only the next
steps and the full Growth Journey has its own page, because near goals motivate and a distant one does little
(do not re-explain); the five Pathways with Focus Areas and Action Items. Not yet met: Action Hub by name,
capacity.

Points, from reasoning/dossier-findings-22oct.md, Growth Journey and Pathway page:
1. Looking at the whole journey or another Pathway is not something people do regularly, so it lives on its own
   page, apart from the weekly screen (18 Mar 2026). Two pages: an overview and a Pathway page (Q4).
2. The journey's own target and pace sit only here, passive, so people come here to see them (17 May 2026); both
   levels in one place was confusing (6 May 2026).
3. The personalized summary of how the journey reflects the person is his design (Q6).
4. Capacity is changed from here, because it moves the journey dates first and the Pathway target follows
   (19 May 2026). Optional: capacity is not met until Personalized timeline.

Round 1 comments (3 Nov): the line about both date pairs on one screen being confusing belongs to the Action Hub
block, which already says the week stays on the Pathway target. Focus this block on why the long term goal is
kept, how journey and Pathway target and pace relate, and why this is the only place the whole journey's
progress shows. Summary line dropped.

## Version (round 2)
Eyebrow: Growth Journey
Headline: The whole route has a page of its own, one people open now and then to see how far they've come and what's left.
Text:
People still need to know when they'll finish the whole thing, even if the week only points at the next step. So the journey gets its own target and pace, worked out from every Action Item in it and the hours someone gives, and each Pathway's dates follow from those.

This is the only place the whole journey's progress shows. The weekly screens stay on the Pathway, so the far finish line waits here for whenever someone wants to check it.

Sources: Mondai design record (his words 9 Apr, 28 Apr, 6 May, 17 May and 19 May 2026; dossier-findings-22oct.md, Growth Journey and Pathway page)
Image: his Growth Journey page, already in his frame.

Checks: none yet. no-ai-slop as the skill, fit measure and the reader check owed.

## Image idea (his, 3 Nov), recommended
An animation on his Growth Journey screen: the cursor hovers each Pathway card left to right, each hover reveals
that Pathway's target and pace, and the last card (Opportunity) lands on a target that matches the journey
target at the top, with a visual link between the two. Recommendation: yes. It shows "each Pathway's dates
follow from those" and the dates chaining toward one finish, so the column can drop that clause and keep the
why (people need the full finish date; this is the only place it shows). Needs real dates in the frame: the cards
now all read Aug 28 2026 while the journey target reads Jun 12 2027; each Pathway's target should run in order
and the last should equal Jun 12 2027 (and its pace the journey pace, Jun 2 2027, if that holds in the product).
He makes the animation. Copy is revised to fit once the animation is agreed; checks still owed.

## Animation, round 1 (3 Nov)
prototypes/growth-journey-dates/ (template.html, build.mjs inlines site/lib/motion.js; node build.mjs writes
growth-journey-dates.html; window.seek(t) draws any frame, loop 13.35 s). The cursor visits each Pathway card;
a hover reveals that card's dates (TYPE spring) and they hide on leave; Cognition, the current one, always shows
its dates. On Opportunity its target turns green, a line draws up behind the cards to Journey target and the
tile lights. Timeline filled in (his yes, 3 Nov): Discovery completed Jun 19 2026; Cognition Aug 30, pace Aug 28
(the +2d in his Action Hub); Networking Nov 15, pace Nov 13; Branding Feb 21 2027, pace Feb 19; Opportunity
Jun 12 2027, pace Jun 10, so journey pace changes from Jun 2 to Jun 10 to stay consistent; progress 24 percent.
Not reviewed by him. Recreated in HTML from his screen (Heebo and IBM Plex Mono, his colours), not his Figma.

## Image concept, round 2 (4 Nov), from scratch
His comments 4 Nov: every card shows its target and pace by default, no hover to reveal; date carries up is the
coolest idea but a number floating up into the tile looks wrong, so the link between the last card and the
journey tile needs its own answer; the image is his real screen exported from Figma in every detail, never a
redrawn mockup. Round 1 cursor tour and green line stay ruled out.

What it teaches: each Pathway has its own target and pace, they run in order, and the last one is the journey
target. Reader time: about 3 seconds while scrolling, so the point lands in under 3 and holds still after.

Directions, each with every card's dates visible:
1. Sweep (recommended). A green accent passes through the date pairs from Discovery to Opportunity in order, then
   the Journey target and pace tiles light in the same beat Opportunity's do. Nothing moves position; only
   emphasis travels, like a progress fill. About 2 seconds, then rests on the lit pair.
2. Linked highlight. One cursor hover on Opportunity: the card takes his Current card style and the Journey
   target and pace tiles light at the same moment. The connection is a shared hover state, the way linked
   charts work in dashboards. About 1.5 seconds.
3. Still. No motion. Opportunity's dates and the two journey tiles in green, everything else in its normal
   colour. The match reads as two same-colour dates.
Dates: his frame's card dates are placeholders. Set the timeline above on a duplicate of his screen in Figma,
never his original, then export. Open: his frame shows progress 45 percent and pace Jun 2; the timeline says 24
percent and Jun 10.

### The connection moment, options with references (4 Nov)
His ask: the link between Opportunity's target and the Journey target, investigated with options, not a default.
a. Fill along the screen's own connector (recommended, used in direction 1). His cards already sit on a line,
   solid green for done and dashed for not started. The green fill runs along that existing line to
   Opportunity, then the journey tiles light on the same beat. Reference: progress steppers and delivery
   trackers (Material stepper, food delivery status bars). Differs from round 1: no new line is drawn up to the
   tile.
b. Same beat highlight (direction 2). Opportunity and the journey tiles light at once, nothing travels.
   Reference: linked highlighting in dashboards (Tableau highlight actions).
c. Digit roll in the tile. As Opportunity lights, the Journey target date rolls like an odometer and settles on
   the same date. The tile counts to it instead of a number flying in. Reference: price tickers in trading
   apps. Risk: a rolling date suggests the target is changing.
d. Shared element morph, considered and not recommended. The date travels from card to tile as one element
   (Material container transform). It is the polished version of the floating number he rejected.

## Animation, round 2 build (4 Nov), direction a, fill along the connector
site/motion-lab/growth-journey/index.html (window.seek, loop 5.6 s). Built on 3x exports of his screen: two
copies beside his layout on page VC, 4828:15927 (base, real dates) and 4828:16185 (lit). His original is
untouched. Exports base.png and lit.png sit beside the page and are not in git (public repo); a copy is in the
main checkout. Every card shows its dates; Discovery's dates light in the accent, the bar after it fills, the
next dates light and so on; Opportunity's dates and the journey target and pace tiles light on the same beat and
hold 2.6 s. Discovery shows completed Jun 19 2026 (the label his file already had). Journey pace set to Jun 10
and progress to 24 percent to match the timeline. Review log: docs/motion/growth-journey/review_log.md (two
rounds; round 3, 390 render and double render owed). Not yet seen by him.

## Round 2 comments (4 Nov) and concept reset
His comments: the fill looks off; on dashed bars the dots should turn green one by one and then the solid line
flashes in, without the motion stopping; the end makes no connection between Opportunity and the journey target;
too much to read (target and pace under every card); maybe the earlier cards just say completed with a date.
Cause: the image tried to teach three things in about 3 seconds and doubled every date with pace. Reset to one
point: the journey's finish date is the last Pathway's target. Pace stays out of the image (the reader already
met target and pace).
Directions:
A. Late in the journey (recommended, his idea refined). Same screen in a later state: Discovery to Branding
   complete, each with its completed date in order; Opportunity current with its target. The last bar's dots turn
   green one by one, the solid line flashes in, and Opportunity's target and the Journey target tile light on the
   same beat. One comparison to read. Needs: card state swap on the copies and a progress figure (open).
B. Target only. Today's state, pace hidden under every card, five targets in order; they light left to right and
   the last lights with the journey tile. Still five dates to read.
C. Callout still. No motion. The real screen, with Opportunity's target and the Journey target tile each shown
   enlarged beside the screen as two crops of the same UI, same date in both.

## His correction (4 Nov): real UI only at the end
While the animation is being worked out, a mockup is fine. His real Figma UI comes in once the animation is
agreed, as the final step. No Figma edits for this image until then. My two export copies on page VC
(4828:15927, 4842:16572) stay as they are until he says what to do with them.
