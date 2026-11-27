# Design system CS: first draft

Draft 1, 7 Nov 2026. Working copy, not approved. Claim ids in brackets point to `CLAIMS.md`;
they come out before anything ships. Image notes in italics say what goes there and where it lives.

---

# Mondai design system

## Built for anyone who is not me

*Image: the settled Mentor home screen beside an agent's rebuild of it from the library alone, each
mistake marked. Both live in Mondai, `design-system-ai/evidence/agent-test/` (reference-M4.1.png,
build-run1.png).*

I started the Mondai design system in September 2024 from a button, a palette, four brand images and
two typefaces. Two years later it had a real library, and still only I could use it well. Designers
were not using it correctly. Agents drawing screens passed the checks written for them with buttons
the system never had. [C1] [C2] [C7] [C23]

So the work became making the system readable to someone who is not me. Agents gave me a way to
measure that: they cannot ask, so every rule the system does not state shows up as a mistake you can
count. [C17]

*Number cards, each with its starting point under it:*

- **105 of 106** components carry a usage description. From 4 of 94 on 1 Oct. [C5] [C14]
- **425 of 431** variables have a code name an agent or a developer can read. From 0 of 235. [C5] [C14]
- **0** known system faults in the handed off screens of the last two sprints. From 596 on Journey
  Advisement, about 6 a screen. [C24]
- **31 mistakes** a build, on average, when three agents rebuilt one screen from the library. This
  is the before number; the after run is next. [C17]

## The rules lived in my head

The goal was a library anyone could build a Mondai screen from. The complication was that it only
answered what. It had the parts. It never said how a part was sized, when to use one part over another
or which value a gap should take. So the question became: can a system carry its own rules well enough
that someone who has never talked to me builds a screen I do not have to fix? [C23]

The answer on 1 Oct was no, and it was countable. [C5] [C6]

*Three count tiles:*

- **90 of 94** components had no description.
- **0 of 235** variables had a code name.
- **1,272 gaps and 1,315 paddings** were typed by hand instead of pointing at a token. [C5]

Buttons showed the same thing at a glance: 236 buttons on the product screens in 33 different widths,
47 of them set to hug their label. [C6]

People hit it first. In July 2025 designers were not using the system correctly. That October I was
cleaning screens with images where the system had icons and frames with no auto layout. In March 2026
I gave an AI the whole system as a document to write screen prompts from, and its output still needed
a designer to check it. [C2] [C3] [C4]

That is the problem in one line. A system whose rules live in its author can only be used well by its
author. Everyone else guesses.

## Every value gets one job and a name that says it

The foundations were where guessing started, so they went first.

**Grid.** One 12 column grid on the core frame, with page margins that land on column edges. The
grid values in use before that had come out of AI sessions, not from me. They were deleted from the
repo along with the decision, so no session could pick them up again. It touched every desktop
layout. [C8]

**Spacing between areas.** 32, 40 or 48: the smallest step at or above the biggest gap inside either
area, and 48 wherever an edge is bare content rather than a card. I capped it at 48 after seeing the
eight screens that sat at 64 laid out again at 48. It took three revisions between 25 and 27 Sep. [C9]

**Spacing roles.** About 800 links on the product screens pointed at the raw spacing scale, because the
role ladder had no step for the values they needed. Of three options, I picked filling the gaps in the
ladder. A script then moved 669 raw links onto roles and left 122 for me to decide one by one; 30 are
still raw. [C10]

**States.** Input fields got one outline ladder and no filled state. The filled state had been
covering for value text that looked like placeholder text. Now the outline shows the state and the
text colour shows whether anything has been typed. Interaction states became tokens named for the
job: control, hover, focus. [C11]

## A component says what; a rule says when

A library tells you what exists. Usage rules tell you how and when. People and agents both need the
second half, and neither can ask me.

The hardest rule was when something becomes a component. An agent's redesign once marked 41 element
types as new components, and I had to walk it back. My earlier test was repetition: new behaviour on
three or more screens. Repetition tells you something is common. It does not tell you it behaves. A
list row people click needs hover, pressed and focus everywhere it appears. A static pattern on twenty
screens needs none of that. So the rule became: anything a person acts on gets states and lives on a
component, chosen by its job. Repetition alone never makes one. [C12]

Buttons got the same treatment. Fill is the default, and a button outside a container is one or two
grid columns wide. Screens built through the Figma plugin hugged by default, 80 of 145 buttons on one
handoff frame, and hug where fill belongs breaks the layout the moment the screen resizes. [C13]

Then the library had to say all of this where its readers look. All but one component now carries a
description of its job, and all but six variables have a code name. [C14]

*Image: one component page, its usage note beside its variant grid.*

## A check that cannot fail is not a check

Since September agents have done most of the building in Figma, from rules I write and reviews I run.
That only scales if the checks tell the truth. [C22]

On 20 Sep they did not. An agent's screens passed the spacing, type, colour and radius checks written
for them, and the buttons were shapes the system had never had. The check only tested that every
value sat on one of the system's scales. Wrong shapes made of right values passed. I caught it by
eye. [C7]

The day before, thirteen agents had gone at the library at once, one per page. Three pages came back
clean, one half built and nine with nothing, and the run burned through a five hour usage window in 75
minutes. More agents was not the fix. [C18]

So checks now prove themselves on mistakes planted on purpose. The label check caught 5 of 6 and was
fixed until it caught all 6. The scorer for the agent test caught 8 of 8 before any of its numbers
were used. [C15] [C16]

Then I tested the system itself. Three fresh agents, each given the library and a picture of one
settled screen to rebuild, with no skills and no repo files. They made 24, 30 and 40 mistakes. They
also got a lot right: all 53 texts, and every colour they placed bound to a published role. The
mistakes that repeated across all three runs trace to the system. The brightest text role is called
Display, which reads as a size. The button that looks small is not the one named Small. Text boxes are
trimmed, so the gaps an agent reads are not the gaps it sees. No run found the date tile state the
screen needed. [C17]

*Image: the three runs by mistake type.*

The sprint records show where it paid off. [C19] [C20] [C24]

*Table: days and screens CONFIRMED, screens a day is arithmetic on them:*

| Sprint [C19] [C20] [C24] | Days of work to handoff | Screens at handoff | Screens a day | Known faults handed off |
| --- | --- | --- | --- | --- |
| Peer Connect | 5 | 39 | 7.8 | not measured |
| Journey Advisement, mentor side | 10 | 99 | 9.9 | 596 |
| Journey Advisement, mentee side | 6, five of them shared | 72 | 12.0 | 97 |
| Mentor events | 6 | 69 | 11.5 | 0 of the agents' own |
| Studio | 4 | 42 | 10.5 | 0 |

Screens did not get faster: about 8 to 12 a day throughout. What changed is what reached handoff. Since
Mentor events, a change in Figma is not finished until the check comes back clean, so the faults stop
before they reach a developer. Studio, the newest sprint, took 4 days against Peer Connect's 5. [C20]
[C24]

## Still imperfect, dated so it can be checked

Last updated 7 Nov 2026.

- **The after run is not done.** The 31 mistakes is a baseline. Until the same three runs go again on
  the fixed library, I can say what I changed, not what it bought. [C17]
- **The defects the agents found are not all fixed.** 137 variables still carry a retired or
  deprecated name, and one component has no description yet. [C14]
- **One check still fails its own test.** The grid audit caught 27 of 33 planted mistakes. It misses a
  step one size too wide, an area that should fill and rows nested deep. [C15]
- **The zero is a gate, not a habit.** Faults stop at handoff because the check has to pass. Agents
  still make them along the way. [C24]
- **My reviews did not shrink.** Studio's last review round was its largest, and on Mentor events about
  half my comments repeated an ask I had made before. [C25]
- **The library's own components are not wired yet.** Only 6.7% of the gaps and 1.9% of the paddings
  inside them are bound to spacing tokens (19 Oct). [C26]
- **I have not measured people.** Whether designers and developers build from the library more than
  before has no number yet.
