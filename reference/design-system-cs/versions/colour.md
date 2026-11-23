# Colour, round 1: three versions

Canvas: https://claude.ai/artifact/F6GSt8iFZJu6NbPyfnE9TG (private, built from this file by `canvas/build.py`)

23 Nov 2026, on his go. Section 2 of outline 2 (`../outline-2/MATERIAL.md`), written in the framework CS
loop (`reference/cs2/WORKING_LOOP.md`). Three versions that differ in structure, layout, order and emphasis;
each carries every point below. His comments on each: none yet. Nothing here quotes him or a Mondai source.

## The points every version carries

- P1. The usage audit: every colour grouped by the job it does, one token per job at the colour the screens
  already used most for it (N30).
- P2. Judged by purpose, never by shared value, on 11 sheets; the rejected option is matching by value; the
  accent text ruling and its counts (N31, DECISION-INVENTORY Foundations 21 Oct).
- P3. A rule that turns a feel into arithmetic: an icon beside text sits one step darker than that text (21 Oct
  item 9, restated 13 Nov). The 22 Oct pressed state rule is out: it was undone on 28 Oct (claim check, K9).
- P4. Roles only in the pickers: raw values were 65% to 78% of every picker; three roles renamed for what they
  paint; why a leaner public palette lost (N32, 22 Oct).
- P5. Gold is not part of the system (19 Aug).
- P6. Dark only, one mode, as a one line scope cut (2 Oct).
- P7. The proof: every colour the agents placed sat on a published role, while Text/Display was read as a size
  (N17, scoped to layers the agents made).
- P8. The token setup as one labelled visual, raw value to role to a layer on a real screen, with no paragraph
  of its own.

Left out on purpose: colour meaning and the mono and Heebo split (framework CS), the 14 Oct restructure counts
(N23).

## Version A

Layout: T3I, three media and body. Images 24,0 and 732,0 and 24,701, each 684x677; text in the fourth cell
732,701. Header at x 40: eyebrow, headline, side text.
Angle: the audit as the method. Told in the order the work happened: count, rule, write the rules down, clean
the pickers, then the test.
Covers: P1, P2, P3, P4, P5, P6, P7, P8

Eyebrow: Colour

Headline: Across the screens, the green used for labels and numbers came in five different shades, and the
outlines around cards came in four greys.

Side text: Before deciding which colours to keep, I wanted to know how each one was actually being used. I
grouped every colour in the library (3,555 paints) and roughly 40,000 more on the MVP screens by the job it was
doing, such as a label, a card outline or a selected state. Each job then got one token, which is essentially a
named colour, set to the shade the screens were already using most for that job.

Image 1 (684x677, top left): His sheet 01, accent text greens (Mondai
`process/token-picker/colour-by-job/sheets/01-accent-text-greens.png`), the five greens side by side with where
each one appears.

Caption 1: Accent text, the green used for labels and numbers, was spread across five shades. I compared
elements by what they do and how they are used, so two things that happened to share a green were not treated as
the same job. Green/400 was the most used of the five, and moving every accent label to it changed 551 layers.
Six went back because pathway progress turned out to be a different job from accent text.

Image 2 (684x677, top right): His sheet 09, icon greys (Mondai
`process/token-picker/colour-by-job/sheets/09-icon-greys.png`), icons beside the text they sit next to.

Caption 2: Icons beside text came in seven greys, and some were the same grey as the text next to them. The rule
I set is that an icon sits one step darker than the text it belongs to, so a designer or an agent can work out
the right grey instead of judging it by eye.

Image 3 (684x677, bottom left): The labelled chain, to make: a raw value (#39F145) to its role (Text/Accent) to
a label on a real MVP screen, captioned with what it replaced. No paragraph explains it.

Caption 3: #39F145 is the raw value, Text/Accent is the role and the label on the screen points at the role.

Body (bottom right cell): The colour picker was the other problem. Raw values, the unnamed shades underneath the
roles, made up 65% to 78% of every picker, meaning a designer or an agent choosing a colour mostly saw shades
with no job attached, and I found it confusing to use myself. I removed the raw values from the pickers so only
roles show up, and renamed three roles after what they actually paint. For example, Text/Placeholder became
Text/Meta, since only 2 of its 213 layers were placeholders and the rest were times, dates and inactive labels.
No layer changed colour, whereas moving to a leaner public palette like Radix or Material 3 would have recoloured the screens.

Gold was never part of the system. It had no value and no variable, and it only kept appearing because it had
been written down and then repeated. The product is also dark only, with one mode, so developers set up a single
theme and nothing waits on a light one.

When fresh agents later rebuilt a known screen using only the library, every colour they placed was on a
published role. The one they got wrong was Text/Display, the brightest text colour, which they mostly skipped
for names and titles because the name reads like a type size.

Sources: colour usage audit of the library and MVP screens with its 11 rulings, Oct 2026; design decision log,
Aug to Oct 2026; agent usability test, three runs, Oct 2026.

Evidence (repo only, not page copy): N30, N31, N32, N17; DECISION-INVENTORY Foundations 19 Aug, 2 Oct, 21 Oct,
22 Oct; claims K1 to K22 in `colour-claims.md`.

## Version B

Layout: T2I, media and body. Large image 24,0 1090x749; small image 967,773 449x359; text column 1138,0 width
278. Header at x 40: eyebrow and headline only. B's last three paragraphs sit beside the small image, in the
open area of T2I, because the column holds about 150 words.
Angle: the rejected option first. The tempting fix was to merge colours that share a value; the section argues
against it, then shows what judging by purpose produced and how it was tested.
Covers: P1, P2, P3, P4, P5, P6, P7, P8

Eyebrow: Colour

Headline: Cards, fields and buttons all had outlines in a handful of greys, and because some of them shared the
same value it was hard to tell which ones were actually doing the same job.

Image 1 (1090x749, large): His sheet 03, card outlines (Mondai
`process/token-picker/colour-by-job/sheets/03-card-outlines.png`), the four greys with where each one appears.

Caption 1: Card outlines came in four greys. I gave cards the grey the navigation already uses and gave raised
areas inside a card a slightly lighter one, while states keep their own treatment, so a completed item stays
darker on purpose.

Image 2 (449x359, small): The labelled chain, to make: a raw value (#39F145) to its role (Text/Accent) to a
label on a real MVP screen. Label only, no paragraph.

Caption 2: Raw value, role, layer.

Body (text column): The quickest fix would have been to merge every colour that shares a value into one token,
but a button and a field both have outlines and they are still doing different jobs. So I compared every element
by what it does and how it is used.

I started by grouping the library's 3,555 paints and roughly 40,000 on the MVP screens by job, and gave each job
one token set to the shade the screens were already using most for it. From there I went through 11 sheets, one
kind of element each. Accent text alone had been spread across five greens, and moving it to one changed 551
layers, with six put back because pathway progress is a different job.

Some of these I wrote as simple rules so they don't depend on someone's eye. For instance, an icon always sits
one step darker than the text beside it.

Body 2 (second text block, 24,773 width 920, in the open area beside the small image): The colour picker had a
similar problem. Raw values, the unnamed shades underneath the roles, made up 65% to 78% of every picker, and I
found it confusing to use myself. I took them out of the pickers so designers and agents only see roles, and
renamed three roles after what they paint without any layer changing colour. A leaner public palette like Radix
or Material 3 would have recoloured the screens.

When fresh agents later rebuilt a known screen using only the library, every colour they placed sat on a
published role. They mostly skipped Text/Display, the brightest text colour, for names and titles, since the
name reads more like a type size.

Gold was never part of the system. It had no value and no variable and only kept appearing because it was
written down and repeated. The product is dark only, with one mode, so nothing is waiting on a light theme.

Sources: colour usage audit of the library and MVP screens with its 11 rulings, Oct 2026; design decision log,
Aug to Oct 2026; agent usability test, three runs, Oct 2026.

Evidence (repo only, not page copy): N30, N31, N32, N17; DECISION-INVENTORY Foundations 19 Aug, 2 Oct, 21 Oct,
22 Oct; claims K1 to K22 in `colour-claims.md`.

## Version C

Layout: T1I, media and body. Image 260,0 1156x749; text column 24,431 width 212. Header at x 40: eyebrow,
headline, side text. Two annotation notes on the image.
Angle: the reader's seat. Starts from what anyone picking a colour saw, leads with the agent test as the image,
then explains the decisions that made the result possible.
Covers: P1, P2, P3, P4, P5, P6, P7, P8

Eyebrow: Colour

Headline: When a designer or an agent opened the colour picker, most of what they saw was raw values with no job
attached, so they had to guess which green was meant for what.

Side text: Raw values, the unnamed shades underneath the named colours, made up 65% to 78% of every picker, and
I found it confusing to use myself. So I started with how the colours were actually being used, grouping the
library's 3,555 paints and roughly 40,000 on the MVP screens by the job each one does. Every job got one token
set to the shade the screens were already using most for it. I then ruled 11 sheets by purpose rather than by
value, since a button and a field both have outlines but don't do the same thing.

Image 1 (1156x749): The known screen the agents rebuilt (Mondai
`design-system-ai/evidence/agent-test/reference-M4.1.png`) beside one agent's rebuild (`build-run1.png`), with
one accent label traced as the labelled chain: raw value #39F145 to Text/Accent to the layer on this real
screen. Showing the screen depends on whether Mondai frames can be public (`../GAPS.md` item 15).

Note 1 (on the traced label): Every accent label now uses this one green. Moving to it changed 551 layers, and
six went back because pathway progress is a different job.

Note 2 (on the primary text): Text/Display is the brightest text colour, but the agents mostly skipped it for
names and titles because the name reads like a type size.

Caption 1: A known screen rebuilt by fresh agents using only the library. Every colour they placed was on a
published role.

Body (text column): Some of the decisions I turned into simple rules so they don't rely on someone's eye. For
example, an icon sits one step darker than the text beside it.

After that I removed the raw values from the pickers and renamed three roles after what they paint, and no layer
changed colour. A leaner public palette like Radix or Material 3 would have recoloured the screens.

Gold was never in the system and only spread because it was written down. The product is dark only, with one
mode.

Sources: colour usage audit of the library and MVP screens with its 11 rulings, Oct 2026; design decision log,
Aug to Oct 2026; agent usability test, three runs, Oct 2026.

Evidence (repo only, not page copy): N30, N31, N32, N17; DECISION-INVENTORY Foundations 19 Aug, 2 Oct, 21 Oct,
22 Oct; claims K1 to K22 in `colour-claims.md`.

## How the versions differ

- A: three images, chronological, the sheets carry the decisions in captions and the text cell carries the
  pickers, the scope lines and the proof.
- B: one large sheet and the chain small, argument first (match by value ruled out), one long column in the
  order count, rule, arithmetic, pickers, proof, scope.
- C: one image of the agent test with the chain traced on it, proof first and the decisions after, the shortest
  text.

## Checks run on this round

### Humanizer pass

Round 1 copy failed his read on 23 Nov: it used the patterns `docs/VOICE-draft.md` lists as reading AI next to
his writing. The pass was rerun as the skill on every line of A, B and C, with that file as the voice sample.

- Draft: round 1 copy as first published.
- Audit: clipped declaratives in a row (I ruled it out. First I counted. Nothing changed colour.); short kickers
  closing a paragraph; tidy contrasts built for rhythm (never because they share a colour); things doing human
  jobs (the pickers were their own problem); terms used before they are introduced (role, raw value, token,
  Text/Placeholder) for a reader who has never seen the system; reasons split off into separate short sentences
  instead of riding inside the sentence with because, so or meaning; no soft qualifiers anywhere.
- Final: rewritten in his habits from the voice draft: the reason joined into the sentence with because, so,
  since and meaning; a worked example with real numbers (Text/Placeholder, 2 of its 213 layers, the rest times,
  dates and inactive labels); token, role and raw value explained in plain words the first time they appear;
  one soft qualifier where it is true (essentially a named colour); designers and agents named the same way
  throughout; each block ends on its last fact. Facts unchanged from the claim check except the Text/Meta
  example, which is in the K14 source entry.

### no-ai-slop

Run as the skill in detect mode on the final copy of A, B and C. Found: colon reveals (B merge by value, B and C
the icon call, B gold), one dramatic fragment (B, then the colour pickers). All rewritten as plain sentences.

### Claim check

Independent agent (Sonnet) on claims and sources only: `colour-claims.md`. 23 claims, then K24 for the icon
caption. Every PARTLY and NO MATCH fixed in all three versions.

### Not run

- Reader check (`reference/cs2/reader-check/`): it needs a KNOWN file built from his Figma frame text above the
  block, and the design system CS has no frame yet. Runs once his frame exists.
- Layouts: taken from the pool as `reference/cs2/WORKING_LOOP.md` records it (T1I, T2I, T3I); Figma page VC was
  not reopened this round, so the WIP case study layouts were not used.
