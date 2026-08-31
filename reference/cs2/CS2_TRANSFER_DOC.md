# CS2 build: transfer doc for Claude Code

Purpose: everything a fresh Claude Code session needs to build Case Study 2 with full context and full skill access. Read this first, then the source files listed below, then confirm the open decisions before drafting.

---

## Who you are working with

Chadwick, Design Lead at Mondai. Senior product designer building a portfolio of case studies.

Hard voice rules, no exceptions:
- Never use em dashes, en dashes, or any substitute for them (no "--"). Rewrite the sentence instead.
- Never use Oxford commas.
- Casual and direct. Lead with the answer. Concise unless depth is earned.
- Never people-please and never manufacture criticism. They are the same failure: picking a stance before knowing what is true. Change a position only when new evidence or reasoning arrives, never because he pushed. Agreement is a complete answer, and praise needs the same evidence as criticism. Raise a limitation only when it changes what he should do. Never end on a downside by default. Your job is his best outcome, not his comfort and not a performance of independence.
- Default to deciding. Give a recommendation, the reasoning and what would change it. Options with no recommendation are homework, not a deliverable. Ask him only when the answer depends on his taste, his risk appetite, his money, his relationships or facts about his life. Never ask him to arbitrate where neither party has the deciding information. Close with one question or none, never a compound one.
- Sharp specific feedback, never generic observation.

---

## What Mondai is (product context)

Mondai is an AI-powered career navigation platform for emerging technologists from underrepresented backgrounds. Desktop and web first at 1920px, 1280px minimum. No mobile at MVP.

Core framework: Growth Journey > Pathway > Focus Areas > Action Items. Five sequential MVP pathways in order: Discovery, Cognition, Branding, Networking, Opportunity.

Terminology that must be correct:
- Mondai is the product. Rita is the in-product AI guide, not the product name. "Rita ABC" is legacy, do not use it for the product.
- Two primary views, never conflate them: Action Hub (the daily weekly task surface) and the Growth Journey page (the macro journey view). Note: internal shorthand sometimes calls these "Action Items" and "My Path."
- Action item is the unit of work. Never "task," never "bundle."
- "Pace" not "Projected." "Active" not "In Progress."

---

## What CS2 is, and the firewall

There are three case studies. Keep them separate or they cannibalize each other.

- CS2 (this one) owns: the Growth Journey, the weekly scheduling mechanics, the product's AI strategy, the hi-fi walkthrough, event KPIs. This is the framework case study.
- CS1 owns: the operation. The systems, the design-to-dev pipeline, the scoring/prioritization model, the team, the ceremonies. Leadership and process.
- CS3 owns: the design system itself.

Overlap to handle carefully: the founder disagreement over calendar integration (structure versus freedom) appears in CS1's evidence as a "calls he argued" beat, but the resolution of that argument into the weekly framework is CS2's origin story. CS2 gets the framework resolution. CS1 gets the leadership dynamic. Do not develop the scoring model here, that is CS1.

---

## The single most important idea for CS2

The reframe is the spine: structure that guides versus structure that gatekeeps. The founder wanted structure and accountability. Chadwick argued rigid structure would recreate the traditional education this audience is trying to escape, and would add stress to a tool meant to reduce it. Resolution was a framework that provides structure while staying a guide. That tension, with two real conflicting perspectives resolved into the core mechanic, is the narrative engine. Lead with it.

---

## The framework CS2 has to explain (from the product knowledge archive)

Capacity is the single scheduling input. One declared number (hours per week) drives everything: Target date, Pace date, weekly item selection, rollover, recalibration, reset. Present this as the model.

The dependency chain (this is the systems-thinking proof, walk it):
- Capacity is the only input, so
- Target locks (moves only through deliberate Recalibration), so
- Pace moves (weekly, never per item) and visible drift is the motivational signal, so
- Rollover must be silent absorption (no decision modal, no math, no gatekeeping), so
- The five Start of Week states each need a distinct signal (Clean, Catching Up, Rollover, Recalibration, Reset).

Behavioral grounding, to be shown as decisions not citations: loss aversion (locked Target so drift is visible), goal gradient and progress principle (visible closing distance), peak-end (the closing moment block), Zeigarnik (why past-time dims silently instead of saying "missed"), planning fallacy (manual capacity entry, anti-bias framing). Rule: never write "we used loss aversion." Write the decision, put the principle in a caption.

Product AI (a CS2 subject, part of what he designed): two AI surfaces that never share a container. Contextual AI (gold, scoped to an action item, no text input, content-adjustment knobs) versus Rita, the conversational AI (green, journey-level, persistent). Plus AI-generated weekly content, AI sequencing the journey, and disclose-once demonstrate-always transparency grounded in the JFF trust finding for this audience.

Real kills to show (rejected-concepts beat, high leverage): the rollover decision modal with the "4 carried + 3 new = 7" math and "Take on all / Use Flex Point" buttons, flex points as spendable currency, live keystroke capacity updates that felt like a slot machine. Each with one line on why it died.

---

## Research findings (from CS2_framework_case_study_research.md, in the project)

No public case study is a domain match. That is the differentiation argument, not a gap. The framework being unfamiliar is why it lands.

Structural template to build on: Simon Pan's Uber case study (simonpan.com/work/uber). Spine: loss-framed hook, context, challenge/role, research, the reframe, the named framework, body structured as reversals, shown failed iterations, impact.

One-dimension exemplars:
- Sebastien Gabriel (Chrome): reasoning threaded through every decision, not bolted on at the end.
- Gloria Lo (Rokt): a named decision model reads as senior judgment.
- Tom Petty: define by negation ("knowing what it wasn't"). Maps to guide-not-gatekeeper, curriculum-not-guide.
- Jacob Dilley: decision-chain where each choice forces the next. Maps to the dependency chain above.
- Irrational Labs and Duolingo teardowns: how to make a behavioral principle felt, not listed.

---

## The two AI threads (do not blur them)

CS2 has two different "AI" stories and a reader must never be unsure which one a sentence means.

1. Product AI: the AI inside Mondai (Rita, contextual AI, AI-generated content, AI sequencing). A design subject the case study covers.
2. Process AI: how Chadwick worked (research, comparing options, vibe coding with Claude, Figma Make, feeding the design system in as a PDF). A thread woven through the narrative at the steps where it changed the work.

Process-AI framing guardrail (he has bought into this): frame the research win as foundation quality, not cost or speed. AI let him resolve questions before build instead of discovering them mid-build, so more of the foundation was decided up front, which is part of why the system holds together. That is better-informed decisions made earlier, not fewer decisions. Never let it read as "a tool did my job." Keep his boundary visible: "I don't use AI to decide what good looks like, only to apply what was already decided," and "still needs a designer's eye."

His own sharpest process insight, use it: the wireframe used to be where he did his thinking, now it is where he commits. Divergence moved upstream. He used to sketch every idea immediately because drawing was the only way to see and compare it. Now he explores and compares options before committing a frame, so by the time something is a wireframe it has been pressure-tested against alternatives. The artifact went from thinking tool to commitment tool. Guardrail: this only impresses if it widened the option space (diverge wider and earlier), not if it just converged faster. Anchor the beat to one real example (growth journey exploration, expired-task logic, or a Figma Make pass), never leave it abstract.

---

## Recommended CS2 spine (starting point, not locked)

1. Open on the reframe, not the product. Structure that guides versus gatekeeps. One problem, stated once.
2. The founder tension as the narrative engine, resolved into the framework.
3. The framework, named and shown as a system: capacity as the single input, then the dependency chain. Reasoning interwoven.
4. A rejected-concepts section (the real kills above).
5. Psychology in captions, decisions in the body.
6. The AI angle: product AI in the ecosystem (two surfaces, why separate, what feeds them), the human-override and disclose-once ethics, ending on a recorded demo of the working framework, not a static mockup.
7. Cut jargon, cut vanity metrics. Explain like you would to a friend. Results precise and matched to the problem.

Portfolio-tips alignment (portfolio tips.docx in the project): one clear problem (tip 03/04), lead with why (tip 10), show rejected concepts (AI tip 08), show AI in the ecosystem (AI tip 12), show human override and ethics (AI tip 13), end on a recorded demo not a static mockup (2026 tip), remove jargon (tip 09), no vanity metrics (tip 06).

---

## Source files to load (bring these into the workspace)

Most important first:
1. MONDAI_PRODUCT_KNOWLEDGE_ARCHIVE.md — the core CS2 source, every framework decision with its reasoning.
2. CS2_framework_case_study_research.md — the research brief (in the Mondai project).
3. portfolio tips.docx — the portfolio-tips source (in the project).
4. Mondai Design System Updated PDF and Current Designs P1 through P5 PDFs — the visual source material for screens and the hi-fi walkthrough (in the project).
5. 02EVIDENCE.md and CS1PRIMARYEVIDENCEVERBATIM.md — mostly CS1, but hold the founder-dialogue origin material and the firewall. Mine for the founder tension, ignore the CS1-owned beats.

Bring if they exist locally (referenced but not in this session):
- 04-WHATS-BROKEN-AND-MISSING.md — Chadwick's own rewritten passages, the best-voiced starting material for several beats.
- Any recorded prototype of the weekly flow (candidate closing demo).
- The CS1 build file (cs1-v5.html or successor) for format and visual-system consistency across the case-study set.

---

## Open decisions to confirm with Chadwick before drafting

1. Scope. CS2 covers Growth Journey, scheduling mechanics, AI strategy, hi-fi walkthrough, and event KPIs. That is a lot. Recommended read: framework is the spine, product AI is act two within the same piece, event KPIs are the proof-of-impact close if numbers exist. Confirm.
2. Metrics. Event attendance, signups, and completion are an open ask to Michael per the archive. If they do not exist, the recorded demo carries the ending.
3. Closing demo. Is there a recorded prototype of the weekly flow good enough to close on? If not, building one is the single highest-leverage task.
4. Build format. Assumed a self-contained scrollytelling HTML case study consistent with CS1. Confirm before choosing the visual skills.

---

## Skills to load in Claude Code, by phase

Structure and narrative (draft the case study):
- case-study (core)
- writing-plans, writing-shape, writing-beats (narrative construction)
- design-rationale (turn decisions into defensible narrative, this is his whole strength)
- humanizer and edit-article (final voice pass: kill jargon, kill AI-tells, enforce his voice rules)

Framework visualization (the diagrams that carry a systems case study):
- state-machine (the five Start of Week states, literally a state machine)
- user-flow-diagram (weekly flow, onboarding sequence)
- journey-map or experience-map (the Growth Journey macro view)
- figma-generate-diagram (only if diagramming inside Figma)

Building the case study page (visual craft, load when you reach visuals):
- web-artifacts-builder (the build)
- high-end-visual-design, design-taste-frontend-v1, top-design (craft bar)
- scrollytelling, scroll-reveal-libraries, gsap-scrolltrigger (the scrolling format and the animated closing demo)
- layout-grid, typography-scale, spacing-system, visual-hierarchy, color-system (polish)
- motion-design or motion-framer (if the closing demo is animated)

Optional, direction-dependent:
- figma-use and figma-generate-design (if pushing screens to or from Figma)
- accessibility-review (final gate, and on-brand given Mondai's accessibility ethos)
- dataviz (only if event KPIs get a chart, lighter for CS2)

Guidance: do not front-load every skill. Load the structure set first, draft, then load the visual set when the narrative is locked. Over-loading skills early just adds noise before there is anything to style.
