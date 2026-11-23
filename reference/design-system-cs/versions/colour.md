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

Headline: Green labels across the screens came in five different greens, and the card outlines came in four
greys, with nothing saying which one was right.

Side text: Before choosing anything I counted. Every colour in the library (3,555 paints) and about 40,000 on
the MVP screens, grouped by the job it does instead of by its value. Each job then got one token, set at the
colour the screens already used most for it.

Image 1 (684x677, top left): His sheet 01, accent text greens (Mondai
`process/token-picker/colour-by-job/sheets/01-accent-text-greens.png`), the five greens side by side with where
each one appears.

Caption 1: Five greens doing one job. I compared elements by what they do, never because they share a colour or
an outline, and ruled one green for accent text, Green/400, the most used of the five. 551
layers moved to it. 6 went back, because pathway progress is a different job.

Image 2 (684x677, top right): His sheet 09, icon greys (Mondai
`process/token-picker/colour-by-job/sheets/09-icon-greys.png`), icons beside the text they sit next to.

Caption 2: Icons came in seven greys, and some sat as bright as the text beside them. Now an icon beside text
sits one step darker than its text. That turns a judgement by eye into arithmetic anyone can check, including an
agent.

Image 3 (684x677, bottom left): The labelled chain, to make: a raw value (#39F145) to its role (Text/Accent) to
a label on a real MVP screen, captioned with what it replaced. No paragraph explains it.

Caption 3: Raw value, role, then the layer on a real screen.

Body (bottom right cell): The pickers were their own problem. Raw values were 65% to 78% of every colour picker,
so designers and agents mostly saw colours with no job attached, and I found it confusing myself. I took the raw
values out so everyone picks roles, and renamed three roles for what they paint. Text/Placeholder became
Text/Meta, since 2 of its 213 layers were placeholders. Nothing changed colour. A leaner public palette, such as
Radix or Material 3, would have recoloured the screens.

Gold is not in the system. It never had a value or a variable, and it spread only because it had been written down and
repeated. The product is dark only, one mode, so nothing waits on a light theme.

Later, fresh agents rebuilt a known screen from the library alone. Every colour they placed sat on a published
role. They mostly skipped Text/Display, the brightest text, for names and titles, because the name reads as a size.

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

Headline: Cards, fields and buttons all had outlines in a handful of greys, and the shared values hid which of
them were doing the same job.

Image 1 (1090x749, large): His sheet 03, card outlines (Mondai
`process/token-picker/colour-by-job/sheets/03-card-outlines.png`), the four greys with where each one appears.

Caption 1: Card outlines came in four greys. I gave cards the grey the navigation already uses and raised areas
inside a card a slightly lighter grey. States keep their own: a finished item is darker on purpose.

Image 2 (449x359, small): The labelled chain, to make: a raw value (#39F145) to its role (Text/Accent) to a
label on a real MVP screen. Label only, no paragraph.

Caption 2: Raw value, role, layer.

Body (text column): The quick fix was to merge every colour that shares a value into one token. I ruled it out. A button and a
field both have an outline and still do different jobs, so every element was compared by what it does and how
it is used.

First I counted. I grouped the library's 3,555 paints and about 40,000 on the MVP screens by job and gave each
job one token, at the colour the screens already used most for it. Then 11 sheets, one kind of element each, ruled
one at a time. Accent text went to one green across 551 layers; 6 went back because pathway progress is not
accent text.

I wrote one call as arithmetic so nobody has to judge it by feel. An icon beside text is one step darker than
the text. An agent can check that as easily as I can.

Body 2 (second text block, 24,773 width 920, in the open area beside the small image): Then I turned to the colour pickers. Raw values were 65% to 78% of every colour picker, and I found the system confusing to use myself. I took them out, so people and agents pick roles only, and renamed three roles for what they paint, with no layer changing colour. Moving to a leaner public palette, such as Radix or Material 3, would have recoloured the screens.

Fresh agents later rebuilt a known screen from the library alone. Every colour on the layers they made sat on a
published role. They mostly skipped Text/Display, the brightest text, for names and titles, because the name reads
as a size.

Gold is not part of the system. It never had a value or a variable, and it spread because it was written down and
repeated. The product is dark only, one mode, so no work waits on a light theme.

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

Headline: Anyone picking a colour, a designer or an agent, saw mostly raw values with no job attached and had to
guess which green meant what.

Side text: Raw values were 65% to 78% of every colour picker, and I found it confusing myself. So I started where
the colours were used: the library's 3,555 paints and about 40,000 on the MVP screens, grouped by the job each
one does. Every job got one token, at the colour the screens already used most for it. Then I ruled 11 sheets by
purpose, never by shared value. A button and a field both have outlines and still differ in what they do.

Image 1 (1156x749): The known screen the agents rebuilt (Mondai
`design-system-ai/evidence/agent-test/reference-M4.1.png`) beside one agent's rebuild (`build-run1.png`), with
one accent label traced as the labelled chain: raw value #39F145 to Text/Accent to the layer on this real
screen. Showing the screen depends on whether Mondai frames can be public (`../GAPS.md` item 15).

Note 1 (on the traced label): One green for every accent label. 551 layers moved to it; 6 went back, because
pathway progress is a different job.

Note 2 (on the primary text): Text/Display is the brightest text. The agents mostly skipped it for names and
titles, because the name reads as a size.

Caption 1: A known screen, rebuilt by fresh agents from the library alone. Every colour they placed sat on a
published role.

Body (text column): An icon beside text is one step darker than its text, so that call works like arithmetic. An
agent can check it as easily as a person.

Then I took the raw values out of the pickers and renamed three roles for what they paint. No layer changed
colour. A leaner public palette, such as Radix or Material 3, would have recoloured the screens.

Gold is not in the system; it spread only because it was written down. The product is dark only, one mode.

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

Run as the skill on the final page copy of A, B and C (headline, side text, captions, notes, body, sources).

- Draft: the first full text of each version, written from the record.
- Audit, what still read as AI or overstated: staccato closers (what failed was a name, the weak spot was a
  name) repeated the line before them; a rule of three in the gold line; B and C said some calls when only one
  was given; B opened its count with a fragment chain; C used passive voice for his picker decision; A said icons
  had no rule and each was a fresh guess, which the record does not say; A's side text added a reason (the fix
  moved as little as possible) the record does not give; the first A headline said no colour could be trusted,
  an overclaim. Facts not in the source: the four found by the claim check (K2, K5, K15, K17, K21) and the
  undone pressed rule (K9, K10).
- Final: closers cut, gold line to two items, one call stated as one, the count rewritten as I sentences, C made
  active, the icon caption rewritten to the seven greys on sheet 09, the added reason and the overclaim cut, every
  claim check fix applied. No em or en dashes, no hyphen pairs, no Oxford commas (checked by `check-colour.mjs`).

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
