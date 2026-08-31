# CS2 build pack: the framework case study

This is the master content document for Case Study 2. It carries the actual substance organized as the case study, not instructions to go find it. An agent should be able to build the full case study from this file plus the design PDFs, with the product knowledge archive available as the deep-reference backstop.

Pair this with:
- MONDAI_PRODUCT_KNOWLEDGE_ARCHIVE.md (deep reference for any mechanic detail)
- CS2_framework_case_study_research.md (the structural exemplars and why)
- portfolio tips.docx (the tips this is built against)
- Mondai Design System PDF and Current Designs P1 to P5 PDFs (the screens)

Do NOT use 02EVIDENCE.md or the CS1 verbatim doc as the substance for CS2. Those are CS1 (the operation). Mine them only for the founder-dialogue origin moment.

---

## Fact-marking rules (do not skip)

CS1 was disciplined about not inventing evidence. CS2 holds the same line.
- CONFIRMED: everything about the framework mechanics below is documented in the product knowledge archive. Safe to assert.
- OPEN ASK: event KPIs (attendance, signups, completion) are not documented and are an open ask to Michael. Do not invent numbers. If they never arrive, the recorded demo carries the ending.
- Never fabricate a user quote, a metric, or a test result. If a beat needs evidence that does not exist yet, flag it as a gap, do not paper over it.

---

## The case study in one paragraph (the thesis)

Mondai's founder wanted the product to hold users accountable with structure. Chadwick argued that rigid structure would recreate the exact traditional-education pressure this audience is trying to escape, and would add stress to a tool meant to reduce it. The resolution was a weekly framework that provides real structure while behaving like a guide instead of a gatekeeper. The whole system hangs off one decision: the user declares a weekly capacity, and everything else (a locked Target date, a moving Pace date, silent rollover, five start-of-week states) is derived from that single input so that a person with a structurally inconsistent life is never set up to fail. CS2 is the story of designing that framework, the calls that made it a guide and not a task manager, and the AI strategy layered on top.

---

## Voice rules (enforce on every line)

- No em dashes, no en dashes, no "--". Rewrite instead.
- No Oxford commas.
- Lead with the point. Explain like you would to a friend. Cut UX jargon.
- No vanity metrics. Results precise and matched to the problem.
- Psychology principles go in captions or asides, never as "we used loss aversion" in the body.

---

## Section-by-section build

### Section 1. Open on the reframe, not the product

Do not open with "Mondai is a career platform." Open on the tension.

Content: the founder's instinct was structure and accountability. The reframe is the line the whole piece hangs on: **structure that guides versus structure that gatekeeps**. State the one problem once. This audience (emerging technologists from underrepresented backgrounds) has spent a lifetime being processed by gatekeepers and rigid institutions. A career tool that reads as one more of those fails on trust before it fails on function. That is the stake. Everything after is how the framework threads structure without becoming a gatekeeper.

Define by negation here (Tom Petty move): not a task manager, not a calendar, not a curriculum. A guide.

### Section 2. Origin: the founder tension, resolved into the framework

This is the narrative engine. Two real conflicting perspectives, resolved into the core mechanic.

Content (CONFIRMED, from the founder dialogue and the archive):
- Calendar integration was the founder's original idea, and the founder wanted a structured, accountable approach.
- Chadwick's counter: there is too much variance in how this audience schedules their lives for a rigid model to work. Rigid structure emulates the traditional education the product is trying to give an alternative to, and stresses a tool meant to reduce stress. His competitive scan of learning apps (including CareerFoundry) showed the durable ones provide structure while letting users work at their own pace.
- Resolution: a goal-based, capacity-driven weekly framework that provides structure while staying a guide. The founder came around and explicitly handed over the design agency to build it that way.
- The founder disagreement being resolved into the mechanic is stronger than any solo insight. Use it as the spine, not a footnote.

Note for the builder: the verbatim founder exchange lives in the CS1 evidence doc. The profane mission line ("give that type of shit a good ol' fuck you") is real but stays out. Use the reasoning, not the phrase.

### Section 3. The framework, named and shown as a system

This is the systems-thinking proof. Name the parts. Walk the dependency chain so each decision forces the next (Jacob Dilley move). Reasoning interwoven, not bolted on (Sebastien Gabriel move).

The single input (CONFIRMED):
- Capacity, declared in hours per week at onboarding, is the only scheduling input. It drives Target, Pace, weekly item selection, rollover, recalibration, reset.
- Why declared not observed: observed capacity has a two-to-three week cold start where the product cannot serve a real plan. Declared gives a real plan on day one, revised later.
- Why anti-bias framing on the capacity screen: planning fallacy. Users overestimate capacity, so the screen uses manual hour entry and honest framing, not pre-filled buckets. Button-triggered "Preview journey," not live keystroke updates, because numbers moving on every digit felt like a slot machine.

The dependency chain (CONFIRMED, walk it in this order):
1. Capacity is the only input, so
2. **Target locks.** A committed date the user orients to. Moves only through deliberate Recalibration. Why: if the system slid the target every bad week, the target loses meaning and becomes a rolling estimate. Loss aversion works for the product here: a locked target makes drift visible, which drives the get-back-on-pace behavior. A rolling target hides the slip. (Loss aversion goes in a caption.)
3. **Pace moves.** Updates once per week at the new week, never per completed item. Why weekly: per-item updates scatter the signal, weekly concentrates it into one moment the user can attend to. Pace ties to capacity because capacity is a velocity input and pace is the velocity output. "Pace" not "Projected" because Pace reads as something the user owns and moves.
4. **Rollover is silent absorption.** Items that did not get done carry into the new week automatically. No decision modal, no math, no user action. Why: a decision moment at the worst possible time (Sunday, already behind) reads as the system charging admission to keep going. The moment the framework most needed to feel like a guide was the moment the old design read most like a gatekeeper. The system carries the cognitive weight of what to bring forward. Copy pattern: "the week already has them," never "make up lost time."
5. **Five Start of Week states, each a distinct signal.** They fire on Sunday (the week runs Sunday to Saturday, never reference Monday). This is literally a state machine, diagram it.
   - Clean: on track or ahead, no rollover.
   - Catching Up: clean close last week, still behind pace, positive movement. Resolves to Clean when back on track, falls to Rollover if they slip.
   - Rollover: items carried. Magenta accent (not orange, rollover is not an error). Headline stays neutral, the Pace tile carries the truth.
   - Recalibration: after roughly three consecutive weeks below about half declared capacity. Signals capacity mismatch, not absence. Offers to right-size the plan, Accept and Keep are equal weight. (Threshold is directional, an open product/AI question, say so if you cite it.)
   - Reset: after 21+ days of zero activity. Signals absence, not mismatch. Re-bundles from today, progress intact, auto-applies. CTA "Start from today." The "you disappeared and we are not mad" state.
   - Why five and not fewer: collapsing Recalibration into Rollover loses the "plan is miscalibrated" signal, collapsing Reset into Recalibration loses the "you vanished and it is fine" signal. Presence versus absence is the tiebreaker.
6. Pace movement is the one shared element across all states ("Pace -4d to -2d this week"). It is what makes Catching Up read differently from Clean and what makes Rollover show whether things are getting worse or holding. Goal gradient and progress principle in a caption.

The point to land: this is a system where moving one piece breaks the others, and you can prove it. That is a stronger flex than any single screen.

### Section 4. The kills (rejected concepts)

High leverage. This is the rejected-concepts beat the portfolio tips call for (AI tip 08), and it is what makes the framework read as earned rather than lucky. Each kill with one line on why it died.

CONFIRMED kills:
- **The rollover decision modal.** Earlier design had a Sunday modal with a math equation ("4 carried + 3 new = 7 items") and two buttons, "Take on all" versus "Use Flex Point." Killed because it turned the hardest moment into a tollbooth. Silent absorption replaced it.
- **Flex points.** A spendable currency (3 per pathway) shown at rollover with the math visible. Killed for reading as task-manager mechanics, not guide mechanics. The term should not appear in any live surface.
- **Live keystroke capacity updates.** Numbers updating on every digit typed. Killed for feeling like a slot machine instead of a plan. Replaced by a button-triggered preview.
- **"In Progress" as a status.** Rejected for "Active," because the system knows an item is the one available to work on, not that the user is actively working on it. Small, but it shows the standard.

### Section 5. Product AI (a CS2 subject)

This is the AI that lives inside Mondai. Show it as an ecosystem, not one screen (AI tip 12).

CONFIRMED:
- **Two AI surfaces that never share a container.** Contextual AI (gold identity, scoped to a single action item, preset action chips, a tag-selector input rather than a chat box, no history, single transformation). Rita, the conversational AI (green identity, journey-level, persistent, a small floating window, full text and history). Why separate: the moment a user sees a text field the mental model flips to "I am talking to someone." Contextual AI is content-adjustment knobs, not a conversation. Keeping them visually and spatially distinct is what protects that model.
- **Disclose-once, demonstrate-always.** Onboarding explains the AI honestly. On product surfaces, recommendations are attributed to the reasoning ("Based on your interest in UX design and your graphic design background"), not to "AI-generated." Why: research shows AI labels reduce trust, but concealing AI is wrong and, for this audience specifically (a JFF 2025 finding that most surveyed Black women believe AI is used to surveil them), a real trust breaker if discovered. This resolves the tension.
- **Human override / ethics** (AI tip 13): the AI recommends, the user can always override. This is not a flourish for this audience, it is the trust position of the whole product.
- AI also generates the weekly contextual content and sequences the journey by pathway progression.

### Section 6. Process AI (a thread, documented here so it is written not improvised)

Weave this through Sections 2, 3, and 7 at the moments it changed the work. Do not quarantine it in a box. But here is the actual content so it is banked.

Framing (enforce the guardrail): frame the research and exploration win as **foundation quality, not cost or speed**. AI let Chadwick resolve questions before build instead of discovering them mid-build, so more of the framework's foundation was decided up front, which is part of why the system holds together. Better-informed decisions made earlier, not fewer decisions. Never let it read as "a tool did my job."

The sharpest process insight (use it, anchor it to a real moment):
- The wireframe used to be where he did his thinking. Now it is where he commits. Divergence moved upstream. He used to sketch every idea immediately because drawing was the only way to see and compare it. Now he explores and compares options first, so by the time something becomes a wireframe it has been pressure-tested against its alternatives. The artifact went from thinking tool to commitment tool.
- Guardrail to state out loud: this widened the option space (diverge wider and earlier), it did not just converge faster. Comparing options and killing the weak ones is the proof.

The boundary that makes it impressive (keep visible): "I do not use AI to decide what good looks like, only to apply what was already decided." "Still needs a designer's eye."

Real anchors Chadwick can point to (confirm which one carries the beat): the Growth Journey exploration, the expired-task logic flow built step by step with Claude, encoding the whole design system into a PDF to inform the model, Figma Make generating a screen from a Claude-written prompt. Pick one concrete instance, do not leave it abstract.

### Section 7. The hi-fi walkthrough

Show the framework working on real screens. Source screens from the Current Designs PDFs (P1 to P5) and the Design System PDF. Map the walkthrough to the framework beats above: onboarding capacity screen, the first-time payoff moment, the Action Hub week view (list and schedule), a Start of Week state (Rollover is the most instructive), an Action Item detail page, the Growth Journey macro view.

Onboarding note (CONFIRMED): the payoff of onboarding is the first-time moment (the journey assembling, five pathways drawing in with the journey target as the hero number), framed as a reward not a tutorial. Target versus Pace is deliberately NOT taught in onboarding, it is introduced on the first real Sunday when Pace has actually diverged and the teaching coincides with real moving numbers.

### Section 8. Impact and close

CONFIRMED framing options:
- If event KPIs arrive from Michael (attendance, signups, completion), they are the proof-of-impact close. OPEN ASK, do not invent.
- If they do not, close on a recorded demo of the working weekly flow. The 2026 portfolio tips say a recorded demo beats a static mockup ending anyway (slide 4), so this is not a downgrade. Building that demo is the single highest-leverage remaining task.
- Either way, restate the differentiation: no product on the market is a reference class for this, the framework is novel, and every mechanic is load-bearing on every other one. That is the senior signal.

---

## Visual asset inventory (fill in when building)

Map each design PDF page to the section it serves. To be completed against the actual PDFs:
- Design System PDF: tokens, type (Heebo, IBM Plex Mono), color (pathway accents, the green/gold/magenta AI and entity identities).
- Current Designs P1 to P5: onboarding, Action Hub list, Action Hub schedule, Start of Week states, Action Item detail, Growth Journey page. Identify the exact pages before writing the walkthrough.

---

## Confirmed vs open, at a glance

CONFIRMED and buildable now: the reframe, the origin tension, the full framework and dependency chain, the five states, the kills, the two AI surfaces, disclose-once, the process-AI thread, the walkthrough structure.

OPEN, resolve with Chadwick:
1. Event KPIs (do they exist, from Michael). If not, demo carries the close.
2. Is there a recorded prototype of the weekly flow to close on. If not, build one.
3. Which process-AI anchor moment carries Section 6.
4. Build format confirmed as scrollytelling HTML consistent with CS1 (assumed).
5. The Recalibration threshold is directional, not locked. Say "roughly three weeks" or omit the number.
