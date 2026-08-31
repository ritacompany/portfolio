# CS2 master doc: the Mondai framework case study

Everything needed to build Case Study 2 is in this one file. Hand this to the build agent along with the Mondai design PDFs (Design System, Current Designs P1 to P5) for the screens. Nothing else is required. If a mechanic detail is ever unclear, it is spelled out in the Framework Reference at the bottom.

CS2 is the framework case study: the Growth Journey, the weekly scheduling model, and the product AI strategy.

---

## Voice rules (enforce on every line)

- No em dashes, no en dashes, no "--". Rewrite the sentence.
- No Oxford commas.
- Lead with the point. Explain like you would to a friend. Cut UX jargon.
- No vanity metrics. Results precise and matched to the problem.
- Behavioral principles go in captions or asides, never "we used loss aversion" in the body.

## Scope firewall (do not cross)

- CS2 (this) owns: the Growth Journey, the scheduling mechanics, the product AI strategy, the hi-fi walkthrough, event KPIs.
- CS1 owns: the operation (pipeline, scoring model, team, ceremonies). Do not develop these here.
- CS3 owns: the design system.

## Fact-marking rules

- The framework mechanics and the founder exchange below are documented. Safe to assert.
- Event KPIs (attendance, signups, completion) are an OPEN ASK to Michael and do not exist yet. Never invent numbers, quotes, or test results. If a beat needs evidence that is not here, flag the gap.

---

## The thesis (one paragraph)

Mondai's founder wanted the product to hold users accountable with structure. Chadwick argued that rigid structure would recreate the exact traditional-education pressure this audience is trying to escape, and would add stress to a tool built to reduce it. The resolution was a weekly framework that provides real structure while behaving like a guide instead of a gatekeeper. The whole system hangs off one decision: the user declares a weekly capacity, and everything else (a locked Target date, a moving Pace date, silent rollover, five start-of-week states) is derived from that one input so a person with a structurally inconsistent life is never set up to fail. CS2 is the story of designing that framework, the calls that kept it a guide and not a task manager, and the AI strategy layered on top.

---

## The build, section by section

### 1. Open on the reframe, not the product

Do not open with "Mondai is a career platform." Open on the tension. The founder's instinct was structure and accountability. The line the whole piece hangs on: structure that guides versus structure that gatekeeps. State the one problem once. This audience, emerging technologists from underrepresented backgrounds, has spent a lifetime being processed by gatekeepers and rigid institutions. A career tool that reads as one more of those fails on trust before it fails on function. That is the stake. Define by negation: not a task manager, not a calendar, not a curriculum. A guide.

### 2. Origin: the founder tension, resolved into the framework

This is the narrative engine. Two real conflicting views resolved into the core mechanic.

- Calendar integration was the founder's original idea, and he wanted a structured, accountable approach.
- Chadwick's counter: there is too much variance in how this audience schedules their lives for a rigid model to work, rigid structure emulates the traditional education the product is an alternative to, and it stresses a tool meant to reduce stress. His competitive scan of learning apps (CareerFoundry among them) showed the durable ones provide structure while letting users work at their own pace.
- Resolution: a goal-based, capacity-driven weekly framework that structures without gatekeeping. The founder came around and explicitly handed over the agency to build it that way.

The verbatim exchange to draw from (real, use the reasoning, the profane mission line is out):

Chadwick to the founder, arguing the call:
> I'm struggling to figure out where I have agency to implement this in the way I believe it will be the most effective and instead often finding myself designing around it and getting stuck over and over because of it... if we implement calendar integration in a way that is overly structured it feels like we are emulating the structured nature of traditional education... I think there is too much variance in how people schedule their lives for the approach to work for everyone... A lot of the competitive analysis I have done so far has supported this. I've been looking at a lot of "learning" apps... even the ones that are more structured have been designed in a way that allows for the user to work at their own pace... careerfoundry... did a great job of providing the structure while also allowing for flexibility. I think a goal based approach would be a really effective way to allow for users to work at their own pace, or choose a more structured path. It would give us a lot more freedom to implement AI into scheduling user's individual journeys

The founder, granting the agency (strong social proof, the founder thanking Chadwick for the push):
> I had it in my head for some reason that you were wanting to implement calendar integration in a certain way... My hope in messaging you is that you'd give me permission to express freedom more with how to implement calendar integration in a user-centric way. Needless to say I feel empowered now haha. Thank you, thank you, thank you.

### 3. The framework, named and shown as a system

The systems-thinking proof. Name the parts, walk the dependency chain so each decision forces the next, reasoning interwoven not bolted on.

The single input: capacity, declared in hours per week at onboarding, is the only scheduling input. It drives Target, Pace, weekly selection, rollover, recalibration, reset. Declared not observed, because observed capacity has a two-to-three week cold start with no real plan to serve. Anti-bias framing on the capacity screen (manual hour entry, honest copy, no pre-filled buckets) because of planning fallacy. Button-triggered "Preview journey," not live keystroke updates, because numbers moving on every digit felt like a slot machine.

The dependency chain, in order:
1. Capacity is the only input, so
2. Target locks. A committed date, moves only through deliberate Recalibration. If it slid every bad week it would become a meaningless rolling estimate. A locked target makes drift visible, which drives get-back-on-pace behavior. (Loss aversion, caption.)
3. Pace moves. Weekly, never per item. Per-item updates scatter the signal, weekly concentrates it into one moment. "Pace" not "Projected" because Pace reads as something the user owns and moves.
4. Rollover is silent absorption. Unfinished items carry automatically, no modal, no math, no user action. A decision moment on Sunday when the user is already behind reads as the system charging admission to continue. Copy: "the week already has them," never "make up lost time."
5. Five Start of Week states, each a distinct signal, firing on Sunday (the week runs Sunday to Saturday, never say Monday). This is a state machine, diagram it: Clean, Catching Up, Rollover (magenta, not an error), Recalibration (capacity mismatch, offers to right-size), Reset (21+ days absent, re-bundles from today, "you disappeared and we are not mad"). Collapsing any two loses a signal the user needs. Presence versus absence is the tiebreaker between Recalibration and Reset.
6. Pace movement ("Pace -4d to -2d this week") is the one shared element across all states and the thing that makes Catching Up read differently from Clean. (Goal gradient and progress principle, caption.)

Land the point: move one piece and the others break, and you can prove it. Stronger than any single screen.

### 4. The kills (rejected concepts)

High leverage, this is what makes the framework read as earned. One line each on why it died.
- The rollover decision modal, with a math equation ("4 carried + 3 new = 7 items") and "Take on all" versus "Use Flex Point" buttons. Killed for turning the hardest moment into a tollbooth.
- Flex points, a spendable currency (3 per pathway) shown at rollover. Killed for reading as task-manager mechanics, not guide mechanics. The term should never appear in a live surface.
- Live keystroke capacity updates. Killed for feeling like a slot machine.
- "In Progress" as a status. Rejected for "Active," because the system knows the item is available to work on, not that the user is working on it.

### 5. Product AI (a CS2 subject)

The AI inside Mondai, shown as an ecosystem not one screen.
- Two AI surfaces that never share a container. Contextual AI (gold, scoped to one action item, preset chips, a tag-selector input not a chat box, no history) versus Rita, the conversational AI (green, journey-level, persistent, small floating window, full text and history). The moment a user sees a text field the model flips to "I am talking to someone," so contextual AI is content-adjustment knobs, kept visually distinct to protect that model.
- Disclose-once, demonstrate-always. Onboarding explains the AI honestly, then product surfaces attribute recommendations to the reasoning ("Based on your interest in UX design and your graphic design background") not to "AI-generated." AI labels reduce trust, but concealing AI is wrong and, for this audience (a JFF 2025 finding that most surveyed Black women believe AI is used to surveil them), a trust breaker if discovered.
- Human override. The AI recommends, the user can always override. For this audience that is the trust position of the whole product, not a flourish.

### 6. Process AI (a thread, woven through sections 2, 3 and 7)

Do not box this off. Weave it in where it changed the work, but here is the content so it is written not improvised.

Framing guardrail: frame the win as foundation quality, not cost or speed. AI let Chadwick resolve questions before build instead of discovering them mid-build, so more of the foundation was decided up front, which is part of why the system holds together. Better-informed decisions made earlier, not fewer decisions. Never let it read as "a tool did my job."

The sharpest insight: the wireframe used to be where he did his thinking, now it is where he commits. Divergence moved upstream. He used to sketch every idea immediately because drawing was the only way to see and compare it, now he explores and compares options first, so by the time something is a wireframe it has been pressure-tested against alternatives. The artifact went from thinking tool to commitment tool. Say the guardrail out loud: this widened the option space, it did not just converge faster.

Keep the boundary visible: "I do not use AI to decide what good looks like, only to apply what was already decided." "Still needs a designer's eye."

Anchor to one real moment (Chadwick to confirm which): the Growth Journey exploration, the expired-task logic flow built step by step with Claude, encoding the design system into a PDF to inform the model, or Figma Make building a screen from a Claude-written prompt. Concrete, never abstract.

### 7. The hi-fi walkthrough

Show the framework working on real screens from the design PDFs. Map to the beats: onboarding capacity screen, the first-time payoff moment (the journey assembling, five pathways drawing in, journey target as the hero number, a reward not a tutorial), the Action Hub week view (list and schedule), a Start of Week state (Rollover is the most instructive), an Action Item detail page, the Growth Journey macro view. Note: Target versus Pace is deliberately not taught in onboarding, it is introduced on the first real Sunday when Pace has actually diverged.

### 8. Impact and close

- If event KPIs arrive from Michael, they are the proof-of-impact close. OPEN ASK, do not invent.
- If not, close on a recorded demo of the working weekly flow. The 2026 portfolio tips say a recorded demo beats a static mockup ending anyway, so this is not a downgrade.
- Either way restate the differentiation: no product on the market is a reference class for this, the framework is novel, every mechanic is load-bearing. That is the senior signal.

---

## Research findings (condensed)

No public case study is a domain match, and that is the differentiation argument, not a gap. Structural template to build on: Simon Pan's Uber case study (simonpan.com/work/uber), whose spine is loss-framed hook, context, research, the reframe, the named framework, body as reversals, shown failed iterations, impact. One-dimension exemplars: Sebastien Gabriel (reasoning threaded through every decision), Gloria Lo (a named model reads as senior judgment), Tom Petty (define by negation), Jacob Dilley (decision chain where each choice forces the next), Irrational Labs and Duolingo teardowns (make a behavioral principle felt, not listed).

Portfolio-tips alignment: one clear problem, lead with why, show rejected concepts, show AI in the ecosystem, show human override and ethics, end on a recorded demo not a static mockup, remove jargon, no vanity metrics.

---

## Skills to load (Claude Code), by phase

Structure and narrative first: case-study, writing-plans, writing-shape, writing-beats, design-rationale, then humanizer and edit-article for the final voice pass.
Framework diagrams: state-machine (the five states), user-flow-diagram, journey-map or experience-map.
Visuals, only once the narrative is locked: web-artifacts-builder, high-end-visual-design, design-taste-frontend-v1, top-design, then scrollytelling, scroll-reveal-libraries, gsap-scrolltrigger, then the polish set (layout-grid, typography-scale, spacing-system, visual-hierarchy, color-system), and motion-design if the demo is animated.
Optional: figma-use and figma-generate-design (only if pushing screens to or from Figma), accessibility-review (final gate).
Do not front-load the visual skills.

---

## Open items to confirm with Chadwick

1. Event KPIs: do they exist. If not, the demo carries the close.
2. Is there a recorded prototype of the weekly flow to close on. If not, building one is the last real task.
3. Which process-AI anchor moment carries section 6.
4. Build format assumed as scrollytelling HTML consistent with CS1.
5. The Recalibration threshold is directional (roughly three weeks below half capacity), not locked. Say "roughly" or omit.

---
---

# Framework Reference (the full substance)

Deep detail for any mechanic. Everything below is documented product truth.

## Terminology

Mondai is the product, an AI career navigation platform for emerging technologists from underrepresented backgrounds. Desktop and web first at 1920px, 1280px minimum, no mobile at MVP. Rita is the in-product AI guide, not the product name ("Rita ABC" is legacy). Aisha is the persona used in copy examples. Pathway is one of the five sequential MVP pathways. Action item is the unit of work, never "task," never "bundle."

## Growth Journey hierarchy

Growth Journey > Pathway > Focus Areas > Action Items. Five sequential pathways in order: Discovery, Cognition, Branding, Networking, Opportunity. One active at a time. Sequential because each assumes the prior: Discovery (awareness) before Cognition (skill building) before Branding (portfolio) before Networking before Opportunity (applications). Focus Areas are conceptual only, passive tags on action items and passive chips on the Pathway page, no dedicated screen. Making them navigable would add a fourth layer, turn "the guide gives me my next thing" into "I choose from a catalog," and break AI scheduling by pathway progression.

## Weekly scheduling model

Single input: user-declared weekly capacity in hours, at onboarding. Drives everything. Declared not observed (observed has a cold start). Anti-bias framing and manual entry because of planning fallacy. Button-triggered preview, not live keystroke updates.

Target date: system-generated at onboarding, locked, moves only through deliberate Recalibration. Locked so it stays a meaningful commitment, and so drift is visible (loss aversion). Pace (also "Projected" in legacy docs, use "Pace"): updates once per week at the start of a new week, never per item. Journey Target and Journey Pace at the macro level, Pathway Target and Pathway Pace at the pathway level, same vocabulary at two zoom levels for teachability.

Weekly container runs Sunday to Saturday, all week-boundary moments fire on Sunday, never reference Monday. Cognitive load is sized per action item, not per week, and dynamic weekly bundling keeps the week within declared capacity while absorbing rollover.

Rollover: automatic silent absorption, no modal, no math, no user action. The system carries the weight of what to bring forward. Flex points (originally 3 per pathway, a spendable currency shown at rollover with math visible) were removed for reading as task-manager mechanics, the term should not appear in any live surface.

Five Start of Week states, fire on Sunday:
- Clean: on track or ahead, no rollover.
- Catching Up: clean close last week, still behind pace, positive movement this week. Resolves to Clean when on track, falls to Rollover if they slip.
- Rollover: items carried, magenta accent (not orange, not an error), headline neutral, Pace tile carries the truth.
- Recalibration: after roughly 3 consecutive weeks finishing below about half declared capacity. Signals capacity mismatch, offers to right-size, Accept and Keep equal weight. Threshold is directional, pending product and AI confirmation.
- Reset: after 21+ days of zero activity, signals absence, re-bundles from today, progress intact, auto-applies, CTA "Start from today."
Pace movement ("Pace -4d to -2d this week") is the one shared element across all states. Get Ahead is the positive sibling of Rollover, for finishing early and pulling work forward.

## Action Hub (the weekly task surface, one of two primary views)

Two views: List (default, stack of action item cards) and Schedule (calendar view of the same week against the user's real calendar, only when calendar sync is active, otherwise the tab is hidden or disabled). Three entities in schedule view, colored by interaction affordance: Action Item (green, reschedulable within the week), Mondai event (magenta, RSVP but not moveable), external calendar event (source color, read-only). One card popover with three variants (active, completed, Mondai event), an action surface not a detail viewer. Reschedule is within-week only, triggered from the popover, offers open time-block pills ("SELECT A NEW TIME") not arbitrary time entry, so conflicts are impossible by design. Past scheduled time silently dims (no strikethrough, no "missed" language), the reschedule affordance lifts, the card body stays active. Sequence gating: only the Active item can be completed, status is "Active" not "In Progress." Undo is a permanent "Mark as not complete" on the completed state, not a toast. Right rail holds pathway header, pathway metrics, the Growth Journey progress viz, and the Rita Events section. Hero: week label (IBM Plex Mono), greeting ("Welcome back, Aisha," Heebo Bold 56px), an all-caps green weekly headline (max 45 characters, task-derived, no corporate language), and an AI-generated contextual paragraph.

## Growth Journey page (macro view, the other primary view)

Three jobs: understand the hierarchy, show personalization, navigate to a pathway. Content: full journey arc with all 5 pathways and status, Journey Target and Journey Pace, a lightweight "built around you" section, hierarchy communication. Journey Pace is passive here at MVP, excluded from onboarding so it does not compete with pathway-level teaching. Pathway page defaults to the active pathway, shows action items including locked future ones, pathway metrics, Focus Area chips as passive "what you'll focus on," and a filter by Focus Area.

## Action Item detail page

Where the work happens, read-only for MVP. Built from 10 typographic content registers the AI populates (orienting prose, sequenced rows, unsequenced rows, pause statement, aside, voice block, parallel grid, side-by-side, link cards, signal badge), register-based not component-based so the AI composes freely. Two-level hierarchy, generous whitespace so each subsection feels like a room, scroll anchors the active subsection near 25% (scroll-margin-top: 25vh). Closing moment block driven by peak-end psychology, three AI-selected variants (single takeaway, real talk, commitment cue). Right rail scroll-spy, sticky Mark Complete CTA that only surfaces on the Active item.

## Onboarding

Post-quiz: career selection, pre-growth-journey home, CTA, calendar sync, capacity, first-time moment, Action Hub week 1. The first-time moment is the payoff (the journey assembling, five pathways drawing in, journey target as the hero number), framed as a reward not a tutorial. Target versus Pace is deferred to the first real Sunday when Pace has diverged. One tooltip only (the AI-scheduled-times coachmark). Capacity screen shows journey-level metrics only, button-triggered preview, CTA "Save and continue." Capacity's canonical home is Account settings under "Pace and capacity," with two extra entry points, the Growth Journey page and the Sunday flow.

## Calendar integration

Single control model, sync and connection are one concept. Canonical home Account settings > Calendar sync, with disconnected, connected and broken (external revoke) states. Contextual entry on the Action Hub is connect-only (disconnect lives in settings, different mental mode). Read-only, one-way, Mondai never writes to the user's calendar.

## AI: two surfaces

Contextual AI (gold, scoped to an action item, preset chips primary, a scoped tag-selector input not a chat box, no history, single transformation). Conversational AI, Rita (green, journey-level, persistent, compact FAB opening a small floating window, text input and history). MVP focus is the Contextual AI, Rita is designed in from the start but may not ship at MVP, with a "Continue in chat" bridge carrying context. Disclose-once demonstrate-always for transparency.

## Audience and voice

Emerging technologists from underrepresented backgrounds, skews Gen Z and mobile-heavy, real experience with hiring-algorithm bias and institutional dismissal. Asset-based framing never deficit (Trabian Shorters, Tara Yosso's Community Cultural Wealth). Headlines aspirational and neutral, situational truth in the subhead and metric strip never the headline. Rollover headline stays "Here's where you're sitting," not "Two things followed you here." Vocabulary: never "bundle," "Active" not "In Progress," "RSVP'd" not "Going," "Mark as not complete," "Pace" not "Projected." Heebo has no italic, use weight color or scale for emphasis.

## Personalization, competitive, psychology

Every action item carries a brief personalization tag ("Because you're targeting product management roles") and an expandable "Why this?" Mondai is unique on the market, never framed as "an alternative to a learning app," though CareerFoundry (structured, fixed pacing, a counter-example), Duolingo (visible drift), Notion and Todoist (unstructured), BetterUp (coach relationship) and LinkedIn Learning (contextual personalization) are pattern references. Curriculum authors to a fixed standard, a guide adapts to the user's reality, and the distinction is why the product exists. Psychology backing the mechanics: Cognitive Load Theory, Self-Determination Theory, Loss Aversion, Fogg Behavior Model, Goal Gradient Effect, Progress Principle, Peak-End, Zeigarnik, Planning Fallacy.

## Cross-system dependencies (change one, check the other)

Capacity is the single input. Target locked, Pace moves. Rollover is silent absorption. The five states each own a distinct signal. Focus Areas are passive. Calendar sync gates schedule view. Contextual AI has no text input. Journey Pace is passive at MVP. The weekly headline is AI-generated from tasks. Reschedule is within-week only.

## Legacy artifacts to avoid

"Rita ABC" and "Rita" as the product name. The 2024 six-feature framing and the 2024 four-stage journey. Flex points. The rollover decision modal with math and "Take on all / Use Flex Point." "Projected" and "Estimated Completion." "In Progress." The original scheduling model that assumed consistent completion.
