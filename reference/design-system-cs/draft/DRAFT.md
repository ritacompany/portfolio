# Design system CS: first draft

Draft 1, 7 Nov 2026. Working copy, not approved. Claim ids in brackets point to `CLAIMS.md`;
they come out before anything ships. Image notes in italics say what goes there and where it lives.

---

# Mondai design system

## Built for anyone who is not me

*Image: the settled Mentor home screen beside an agent's rebuild of it from the library alone, each
mistake marked. Both live in Mondai, `design-system-ai/evidence/agent-test/` (reference-M4.1.png,
build-run1.png).*

For two years the Mondai design system worked well for one person: me. I started from a button,
a palette, four brand images and two typefaces, and I could build anything from it, because every
rule that mattered was in my head. Designers drifted off it. When agents started drawing screens they drifted too, and passed every check while they did it. [C1] [C2] [C7]

So I started treating the system as a product with readers who are not me. I counted what they got
wrong, traced each miss back to the system and fixed the system. Screens did not get faster. The time
spent fixing them is what shrank. [C21]

*Number cards, each with its starting point under it:*

- **105 of 106** components carry a usage description. From 4 of 94 on 1 Oct. [C5] [C14]
- **425 of 431** variables have a code name an agent or a developer can read. From 0 of 235. [C5] [C14]
- **A fifth.** Fixing and handoff took about a fifth of the time spent drawing screens on Mentor
  events. On Journey Advisement it took longer than the drawing. [C21]
- **31 mistakes** a build, on average, when three agents rebuilt one screen from the library. This
  is the before number; the after run is next. [C17]

## The rules lived in my head

The goal was simple: anyone on the team could build a Mondai screen from the library and I would not
have to redraw it. The complication was that the library only answered what. It had the parts. It
never said how a part was sized, when to use one part over another or which value a gap should take.
So the question became: can a system carry its own rules well enough that someone who has never
talked to me builds a screen I do not have to fix?

The answer on 1 Oct was no, and it was countable. [C5] [C6]

*Three count tiles:*

- **90 of 94** components had no description.
- **0 of 235** variables had a code name.
- **1,272 gaps and 1,315 paddings** were typed by hand instead of pointing at a token. [C5]

Buttons showed the same thing at a glance: 236 buttons on the product screens in 33 different widths,
47 of them set to hug their label. [C6]

People hit it first. In July 2025 designers were not using the system correctly, so I ran a workshop on
components, variables and auto layout. By October I was still cleaning their screens: images where
the system had icons, frames with no auto layout. In March 2026 I gave an AI the whole system as a document to write screen prompts from, and it still needed a designer's eye on everything it made. [C2]
[C3] [C4]

That is the problem in one line. A system whose rules live in its author can only be used well by its
author. Everyone else guesses, and every guess lands in my review.

## Every value gets one job and a name that says it

The foundations were where guessing started, so they went first.

**Grid.** One 12 column grid on the core frame, with page margins that land on column edges. The
grid values in use before that had come out of AI sessions, not from me. They were deleted from the
repo along with the decision, so no session could pick them up again. The cost was every desktop
layout. [C8]

**Spacing between areas.** I set it at 32, 40 or 48: the smallest step at or above the biggest gap inside either area, after looking
at the eight screens that sat at 64 laid out again at 48. That took three revisions in two days. [C9]

**Spacing roles.** 800 links on the product screens pointed at
the raw spacing scale, because the role ladder had no step for the values they needed. The obvious
fix was to move the screens onto the ladder. I filled the gaps in the ladder instead, so 677 of those
links got a role with nothing on screen moving. The price is a longer ladder to keep honest, and 122
links that still point at raw values until each one is decided. [C10]

**States.** Input fields got one outline ladder and no filled state. The filled state had been
covering for value text that looked like placeholder text, Now the outline shows the state and the text colour shows whether anything has been typed. Interaction states became tokens named for the job: control, hover, focus. [C11]

## A component says what; a rule says when

A library tells you what exists. Usage rules tell you how and when. Both are read by people and by
agents, so I wrote them for a reader who cannot ask me.

The hardest rule was when something becomes a component.
An agent's redesign once marked 41 element types as new components, and I had to walk it back. The
usual test is repetition: build it three times, make it a component. Repetition tells you something
is common. It does not tell you it behaves. A list row people click needs hover, pressed and focus
everywhere it appears. A static pattern on twenty screens needs none of that. So the rule became:
anything a person acts on gets states and lives on a component, chosen by its job. Repetition alone
never makes one. [C12]

Buttons got the same treatment. Fill is the default, and a button outside a container is one or two
grid columns wide. Screens built through the Figma plugin hugged by default, 80 of 145 buttons on one
page, and hug where fill belongs breaks the layout the moment the screen resizes. [C13]

Then the library had to say all of this where its readers look. All but one component now carries a description of its job, and every variable has a code name, so the rule reaches the agent through the
same file the designer opens. [C14]

*Image: one component page, its usage note beside its variant grid.*

## A check that cannot fail is not a check

Since September agents have done most of the building in Figma. I set the rules, the checks and the vetoes, and I review what
comes out. That only scales if the checks tell the truth. [C22]

On 20 Sep they did not. An agent's screens passed the spacing, type, colour and radius checks written
for them, and the buttons were shapes the system had never had. The check only tested that every value sat on one of the system's scales. Wrong shapes made of right values passed. I caught it by eye; the checks never would have. [C7]

The day before, I had tried scale the cheap way: thirteen agents at once, one per library page. Three
pages came back clean, one half built and nine with nothing, and the run burned through a five hour usage window in 75 minutes. [C18]

The rule since then: a check counts only after it catches mistakes I plant. The label check caught 5
of 6 and was fixed until it caught all 6. The grid audit caught 27 of 33. The scorer for the agent
test caught 8 of 8 before any of its numbers were used. [C15] [C16]

Then I tested the system itself. Three fresh agents, each given the library and a picture of one settled screen to rebuild, with no skills and no repo files. They made 24, 30 and 40 mistakes. They also got a
lot right: all 53 texts, and every colour they placed bound to a published role. The misses traced to the system,
not to the agents. The brightest text role is called Display, which reads as a size. The button that
looks small is not the one named Small. Text boxes are trimmed, so the gaps an agent reads are not
the gaps it sees. The date tile has no state for the one the screen needed. [C17]

*Image: the three runs by mistake type.*

The time numbers say where the work went. Each sprint took between 4 and 10 days of real work to
handoff. On the first three, screens came out at about 10 to 12 a day. What moved was the fixing. On
Journey Advisement, fixing and handoff took longer than drawing the screens. On Mentor events it took
about a fifth as long. [C19] [C20] [C21]

## Still imperfect, dated so it can be checked

Last updated 7 Nov 2026.

- **The after run is not done.** The 31 mistakes is a baseline. Until the same three runs go again on
  the fixed library, I can say what I changed, not what it bought.
- **The defects the agents found are not all fixed.** The text role names come first. 137 variables
  still carry a retired or deprecated name, and one component has no description yet. [C14]
- **The time comparison is two sprints.** The rules were changing under Journey Advisement while it
  was built, and some Mentor events chats were only partly read, so those hours are a floor. The
  number says fixing got shorter. It does not say by how much the system alone made it shorter. [C21]
- **Days per sprint did not fall in a straight line.** They track the size of the sprint. [C19] [C20]
- **I have not measured people.** Whether developers and other designers build from the library more
  than before is the measure I want next, and I do not have it yet.
