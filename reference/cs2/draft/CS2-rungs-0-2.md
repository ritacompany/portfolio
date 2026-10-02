# CS2 draft: rungs 0, 1 and 2

Revision 5, 2026-08-28.

---

## Repairs in this revision

### Repair 6: "Getting into tech used to have a shape"

**Was doing:** setting up that the situation has changed, so the reader understands why a product like
this needs to exist.

**Problem, his:** "technically i dont know if this is true lol." Correct. It is an unsourced historical
claim about hiring, and neither of us can stand behind it.

**Kept by:** dropping the claim about the past entirely and stating only the present condition, which is
defensible: there is no defined path. The setup survives without asserting anything about what used to
happen.

**Lost:** the contrast between then and now, which gave the opening a little momentum. Worth losing.
Momentum built on a claim we cannot defend is a liability in a piece a hiring manager reads.

### Repair 7: "So you guess at the order"

**Was doing:** naming what the user is actually up against.

**Problem, his:** it puts too much weight on order being the central problem, which is an assumption. We
have not established that, and it may turn out not to be true.

**Kept by:** describing the situation instead of diagnosing it. What is true and checkable is that
nothing tells the user what to do first, and nothing tells them whether what they did counted. Both are
observations about the environment rather than claims about the user's psychology, and both set up pace
and target later without pre-committing to a diagnosis.

**Lost:** nothing.

### Repair 8: "That is the product. Everything below is what it took to keep that promise"

**Was doing:** marking the transition from setup into the body.

**Problem, his:** "feels very transparent and generic like youre telling the reader that was me giving u
an idea what the product is now im going to tell u how it works." Correct, and it is a named AI pattern:
signposting, announcing what you are about to do instead of doing it.

**Kept by:** nothing, because the job did not need doing. The next section is the transition.

**Lost:** nothing.

### Repair 9: the mentor origin story

**Was doing:** establishing why he is the one who solved this.

**Problem, his:** "this is already context from the WIP leadership/operational case study. that is very
odd to pull?" Correct. It belongs to CS1, and he has policed this boundary in the other direction before,
cutting the scheduling discussion out of CS1 because it belonged here.

**Kept by:** not needing it. Under the hub and spokes structure he settled on in C105, the Mondai
overview page carries what the product is, his role and the team. CS2 opens on the state of the product
rather than on him, and his role is already established before the reader arrives.

**Lost:** nothing, given the hub page exists. If it does not exist by the time CS2 ships, this needs
revisiting.

### Repair 10: "when the product moved from mobile to web"

**Was doing:** explaining why the structural gap became urgent when it did.

**Problem, his:** "is it odd for us to not show the mobile screens? do we need to? im not fully against
it but it wasnt an original intention." Naming the platform move creates a visual debt. A reader told
the product moved off mobile expects to see mobile, and the mobile work is not what this case study is
about.

**Kept by:** attributing the urgency to the build getting serious and to questions arriving that no
screen could answer. That is true, it does not depend on the platform move, and it creates no
expectation of screens we do not intend to show.

**Lost:** the specific date-stamp of when things changed. Recoverable later if he wants it, and it costs
nothing to leave out.

---

## The draft

### Opening [spends nothing]

There is no defined path into tech.

You are expected to show up already looking like someone who belongs in the role, with work behind you
that proves it. Nothing tells you what to do first, or whether the month you just spent brought you any
closer.

---

### The promise [spends nothing]

Mondai works out what someone should be doing and hands it over a piece at a time, sized to how much
time they have.

---

### The route [spends: Growth Journey, Pathway]

Before that works, the thing being aimed at has to stop being vague and become a route.

A Growth Journey is an ordered path from where someone is now to being hireable in a specific role. It
is cut into five Pathways, and a user moves through one at a time: Discovery, Cognition, Branding,
Networking, Opportunity.

> **Visual A1, still.** One horizontal line. Five marks. Current position marked. Nothing else. Base
> state of the figure that gets built up across the piece.

---

### What existed [spends nothing new]

Nothing in the product did that yet. What existed were concepts. An onboarding quiz. An intent to use
someone's calendar. Career screens. Real thinking, and none of it yet said what a person was supposed to
be doing between opening the app and getting a job.

That gap stopped being tolerable once the build got serious. Questions started arriving that no screen
could answer. What does someone see first. What happens next. What does finishing something mean. The
answers were not in any screen. They were in a layer underneath that did not exist yet.

> **Visual A2, still.** The same five-mark line, now nested: Growth Journey contains Pathways, Pathways
> contain Action Items. Focus Areas greyed, with a note that they tag rather than nest.

---

## Audit of this revision

Humanizer pass run. No em or en dashes. No signposting. No rule of three. No negative parallelisms. No
aphorisms. No invented figures. No closing punchlines: the previous version's "I built that layer, and it
became the work" is gone, and the section now ends on the plain statement of what was missing. His action
moves to the opening of the next rung, where it belongs as a beginning rather than a flourish.

No unsourced factual claims remain. The only assertion about the world is that there is no defined path
into tech, which is his own framing and is the product's premise.

Word count: 210 for four sections. On this rate the full ten rungs land near 700 words, well inside a
three minute read, leaving room for the visuals to do more of the work.

### Repair 11: "sized to the hours they actually have"

**Was doing:** stating that the amount handed over is fitted to the person rather than fixed.

**Problem, his:** it reads as though calendar integration is how the product works by default. It is not.
Capacity is a weekly figure every user sets, and calendar integration is optional on top of that. Nobody
has to connect a calendar to use Mondai.

**Kept by:** "sized to how much time they have". The fitting survives, and the phrasing no longer points
at a schedule. Optionality is a rung 6 concern and spending it here would break the ladder.

**Lost:** the word "actually", which was carrying a small amount of rhetorical weight. Fine.

### Repair 12: "at that point"

**Was doing:** anchoring the state of the product in time.

**Problem, his:** "that point? what point?" Correct, and I caused it. Cutting the mobile to web sentence
in the previous revision removed the only temporal anchor, and the phrase was left pointing at nothing.

**Kept by:** anchoring logically instead of temporally. "Nothing in the product did that yet" ties the
state of the product to the promise stated one section earlier, which is a firmer anchor than a date and
costs no additional setup.

**Lost:** nothing.

---

## Decision needed: the mobile to web transition

Chadwick is weighing whether to explain this in interviews or handle it quickly in the piece. The
tradeoffs, honestly.

**Putting it in CS2:**
- Gives the structural work a cause, so it does not read as self-initiated
- Shows there was substantial prior work on the product, which is more evidence of range
- Pre-empts an interviewer asking why this needed doing when it did

Against:
- Creates a visual debt. A reader told the product moved off mobile expects to see mobile screens
- Adds a concept the ladder does not need, in a piece running near 700 words
- Invites a question about why the platform changed, which is a business decision rather than his design
  reasoning, and answering it costs more words

**Recommendation: neither of his two options.** Put it on the Mondai overview page as one line of project
history, not in CS2 and not held back for interviews only.

Reasoning: it is project context, not design reasoning. The hub and spokes structure he settled on in
C105 exists precisely so shared project context lives once on the overview page and each case study does
not repeat it. That page already carries what the product is, his role and the team. Platform history
belongs in exactly the same place.

This gets all three benefits. The cause is established before the reader reaches CS2, no visual debt is
created inside CS2, and he still has it available in an interview with as much or as little detail as the
question warrants.

**Cost of the recommendation:** it depends on the overview page existing. Same dependency as repair 9.
If the hub page slips, both decisions need revisiting together.

## Open

The hub page dependency, now carrying two decisions. Otherwise ready for rung 3, the week and Action
Items.
