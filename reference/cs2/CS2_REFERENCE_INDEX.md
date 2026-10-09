# CS2 reference index

Built 2026-10-06 from a full read of every craft source listed in `CS2_PROCESS.md`. One line per tactic,
section or finding. Read this before each section, pick what fits, then open those entries in full.
`check-reference-index.py` in this folder fails if any source entry or heading is missing from here.

Format: id · name: what it does. Fits when, or fails when.

---

## 1. Case study tactics bank

Source: `docs/about-source/case_study_tactics.html` (built 22 Sep, 49 tactics, 40 sources). Built for this
exact problem: make a reader believe a design decision was sound. Evidence labels in the source: research,
secondhand, survey, contested, craft lore. Almost none of the research was run on portfolio readers; the
bank says so per entry. The bank is for protocol pass 3. Anti tactics are for passes 2 and 5.

### Argument
- cs-t01 · The deep issue: state the decision as goal, complication, question, under 75 words, before the answer. Fails if the question has one sane answer.
- cs-t02 · State the warrant: give the reason the evidence supports the decision, the sentence a non designer could not write. Spend only on inferences an outsider would get wrong.
- cs-t03 · Qualify the scope, keep the commitment: narrow where a claim holds without hedging the commitment. Fails as blanket softening.
- cs-t04 · Grade the decision on the day it was made: argue from what was known then. Fails as an excuse when the outcome is known and bad.
- cs-t05 · Name the standard of review: tell the reader which bar the decision should clear (reasonable for this team, not ideal). Fails if the bar is lowered until nothing fails it.
- cs-t06 · Answer first: the first screen says what was decided and why it was hard. Fails when the answer is a deliverable, not a decision.
- cs-t07 · Greever's third question: audit each decision for what it solves, how it affects the user and why it beats the alternative. A checklist behind the page, never headings.

### Evidence
- cs-t08 · Cite the record: every factual sentence points at an artifact on the page. Cite what a sceptic would question, not everything.
- cs-t09 · Date and author on every artifact: one caption line turns a picture into a record. Careful here: dates interact with the timeline rule in `CS2_PROCESS.md`.
- cs-t10 · Only evidence that tells the options apart: cut artifacts that would look the same whichever way the decision went.
- cs-t11 · Precision with its derivation: a real count plus where it came from. Invented or trivial precision loses expert readers.
- cs-t12 · Before and after asserts a cause: use the pair only when the change caused the difference.
- cs-t13 · Concrete wording is not proof: a correction. Concreteness aids clarity and checking, not belief.

### Sequencing
- cs-t14 · Clues before the reveal: put the inputs on the page before the decision so the reader half derives it. Fails if a decisive input appears after.
- cs-t15 · Order by cause, not by deliverable: what broke, what was tried, why it failed, what replaced it. Every step needs a because.
- cs-t16 · Put the decision in the stress position: end sentences on the decision, not on process.
- cs-t17 · The nut graf: after an opening scene, say why this, why now and what it proves. Fails as a table of contents.
- cs-t18 · Chekhov's rifle: every constraint named must pay off in a later decision. Include one that never resolved.

### Tension
- cs-t19 · The howcatchem: state the outcome early and make the derivation the story. Needs real obstacles.
- cs-t20 · Complication, then resolution by your own hand: outline each decision in two three word lines; find whose verb made the resolution true. Outline tool, not copy.
- cs-t21 · Name what it cost: what the choice gave up, falling on the product or users, never on his dedication.
- cs-t22 · The call you lost: one decision that went against him and what he did next. Told as a trade, never a grievance.
- cs-t23 · Scene at the hardest moment: a real scene where the evidence is strongest, never where it is thinnest.

### Honesty
- cs-t24 · Refute the rejected option: show the road not taken and say why it lost. Mentioning it without the reason does harm.
- cs-t25 · Steal the thunder: state damaging facts the reader will certainly find (no metrics, unpaid team) first, in his frame.
- cs-t26 · Inoculate against the interview question: raise the strongest objection and answer it. Never a straw man.
- cs-t27 · Put the agent in the sentence: "I" for his decisions, others named for theirs. Fails as a credit grab.
- cs-t28 · The limitations paragraph: one specific paragraph near the end on what the work cannot show.
- cs-t29 · The wrong turn and the signal you missed: what he would do differently and what signal existed at the time. No recovery clause.

### Compression
- cs-t30 · Cut between decisions, never inside one: keep the inside of each decision, cut the transit. One line keeps scale honest.
- cs-t31 · Scene for minutes, summary for months: whatever gets a scene reads as the point. The scene must contain a decision.
- cs-t32 · Cut for the emotion: keep the one moment of real uncertainty, stated flatly.
- cs-t33 · One instance, flagged as typical: tell one decision fully and say it stands for many. Must be typical, not best.
- cs-t34 · Fewer, stronger: a middling extra decision lowers the average of the rest.

### Reader
- cs-t35 · Two readers, two budgets: a skim path for the recruiter and a read path for the manager, each complete.
- cs-t36 · Headings that argue: headings state decisions, not phases. Clever headings break the skim.
- cs-t37 · The six second number is folklore: design for scanning because readers scan, not because of a number.
- cs-t38 · The curse of knowledge: internal names feel self explanatory and are not. Gloss the terms the argument depends on. Directly relevant to Growth Journey, Pathway, Action Item and the rest.
- cs-t39 · Announce the count: "three decisions shaped this" lets the reader budget attention. Must match the page.

### Anti tactics, read against a finished draft
- cs-t40 · The inevitable decision: narrating the outcome as obvious erases the judgment. Put the uncertainty back.
- cs-t41 · The seductive artifact: interesting but irrelevant visuals (sticky note walls) reduce what readers retain.
- cs-t42 · The truthiness screenshot: a polished screen beside a claim it does not support. Put each image beside the claim it proves.
- cs-t43 · The humblebrag: braiding constraint and achievement into one sentence. State each flat, separately.
- cs-t44 · Metric theatre: real numbers dressed as outcomes. Denominators always.
- cs-t45 · Erudite vernacular: needless complex words lower the reader's estimate of the writer.
- cs-t46 · The textbook process diagram: a generic method diagram is wallpaper. Show the real sequence, detours included.
- cs-t47 · The villain stakeholder: casting a colleague as the obstacle. State their constraint as legitimately as his. Relevant wherever Michael appears.
- cs-t48 · The rationale recital: every claim evenly justified. Choose the two moments that matter and quiet the rest.
- cs-t49 · The frankenbite: compressing separate moments into one scene misstates the sequence. Relevant to the March and May rollover history.

---

## 2. Writing protocol

Source: `docs/about-source/CASE-STUDY-WRITING-PROTOCOL.md`. When to make which move, in what order.

- wp-0 · The premise: a case study is an argument, not a record. The reader is deciding whether to trust him with a decision.
- wp-1 · Settle the frame before drafting: who reads and what they decide, the contestable argument, the one repeatable thing, what was at stake. Written at the top of the working file.
- wp-2 · Gather before you draft: artifacts, the three to five decisions (not phases), each with stake, alternative, reason and cost, one thing he got wrong, the binding constraints. No invented metrics.
- wp-3 · Order of work: frame, ordered decision list, evidence per decision, then sentences.
- wp-4 · The passes: argument, evidence (adjectives replaced by objects), tactics (about one deliberate move per section), rhythm (measured sentence lengths), the boring test.
- wp-5 · Failure modes by name: process recital, rationale recital, metric theatre, the invisible designer.
- wp-6 · Audience mechanics: survive a skim, two complete lengths, never explain what the reader can see.
- wp-7 · Voice rules: no dashes, no Oxford commas, sentence case.
- wp-8 · How to work with him: answer first, real options, never agree reflexively, his example is not his subject, show a small piece early.
- wp-9 · Before handing back: say which passes ran and what could not be verified.

Note: the protocol's "settle the frame first" and CS2's "sections first, story last" are compatible if the
frame answers are held as working answers and revised when the sections land.

---

## 3. Reader effect tactics bank

Source: `docs/about-source/tactics_bank.html` and `READER-EFFECT-TACTICS.md`. Built for the About page:
make a stranger interested in a person. The case study bank says where a tactic appears in both, its
justification differs. Mostly useful for voice and pacing in CS2. Recognition tactics rarely apply.

### Recognition
- re-t01 · Name the unnamed feeling: give language to a common experience nobody named.
- re-t02 · The specificity paradox: the narrower the detail, the wider the recognition.
- re-t03 · The competence adjacent admission: an internal state about competence, never a reliability flaw.
- re-t03b · The false consensus trap (anti): confessing a common bad habit lands flat.
- re-t03c · The false uniqueness trap (anti): stating a good trait plainly gives the reader nothing.
- re-t03d · Trust their read, not yours: the line cut for being too revealing is often the one that works.
- re-t04 · The private ritual: a real unspoken procedure.
- re-t05 · The thing you assumed was just you: state it flat, no hedge.

### Surprise
- re-t06 · Rule of three, broken: two set a pattern, the third breaks it, and must be true.
- re-t07 · Misdirection, the turn: clause one sets a direction, clause two reveals another. Twice a page at most.
- re-t08 · Bathos: build altitude, drop to the mundane.
- re-t09 · Literalise the figurative: take a dead metaphor literally.
- re-t10 · Interrupt your own sentence: an aside in another register.
- re-t11 · Register clash: technical term beside a casual one. The term must be exact.
- re-t12 · Metanoia: correct yourself in line; the correction must be sharper.
- re-t45 · Serious content, casual delivery: weighty fact, flat tone.

### Trust
- re-t13 · Pratfall effect: competence first, then a small flaw.
- re-t14 · The costly admission: say what works against your interest, no recovery clause.
- re-t15 · Preempt the objection: name the doubt as it forms. Overlaps cs-t26.
- re-t16 · Refuse a claim you could make: decline to state what you are entitled to.
- re-t46 · Be useful, not impressive: give the reader something usable, once.

### Memory
- re-t17 · Isolation effect: one deliberate anomaly is remembered.
- re-t18 · Zeigarnik effect: a real unresolved thread keeps working after the page.
- re-t19 · Peak end rule: engineer one peak and the last line. The endings report says the evidence is narrower than the lore.
- re-t20 · The portable phrase: a two or three word coinage people repeat. Never a tagline.

### Form
- re-t21 · Break the container: a format that carries voice before a word is read.
- re-t22 · Reward the second look: something present but not surfaced. Never hide load bearing content.
- re-t23 · The overheard register: write as if the reader is not the audience.
- re-t24 · Say the quiet part about the format: one line acknowledging the genre. Once.

### Structure
- re-t30 · Scene, not summary: drop the reader into a moment. Case study version is cs-t31.
- re-t31 · The deliberate snapshot: choose, do not cover.
- re-t32 · Constraint as form: a visible rule on the writing itself.
- re-t33 · The wrong document type: write it as a different genre he actually thinks in.
- re-t34 · Two lengths, both live: short and long versions on one page. Case study version is cs-t35.

### Voice
- re-t35 · Let someone else make the claim: a colleague quote with an observation only they would make.
- re-t36 · The self interview: ask yourself the reader's awkward question.

### Evidence
- re-t37 · Show the artifact, skip the adjective: the reader reaches the adjective alone.
- re-t38 · The oddly precise number: precise reads as counted. Must be real. See cs-t11.
- re-t39 · Name the actual thing: proper nouns over categories.

### Pacing
- re-t40 · The one line paragraph: cheapest emphasis. Not repeated.
- re-t41 · Vary sentence length hard: uniform length reads as generated. Not on a schedule.

### Medium
- re-t42 · It is a website, not a page: use what the web can do when the behaviour means something.

### Curiosity
- re-t43 · The unexplained reference: a small gap the reader wants closed. Never withhold what they need.
- re-t44 · Omit the expected thing: absence is loud when the convention is strong.

---

## 4. Research reports

Sources: `reports/` with raw notes in `research_notes/`. Written for Haven. The findings below transfer to
CS2; the Haven specific recommendations do not.

### How case studies end (30 studio case studies, 12 individual portfolios)
- rp-end-1 · Strong endings are one short resolving beat (about 20 to 45 words of prose), then a named next step.
- rp-end-2 · Type only climbs at the end when the ending is numeric. Narrative endings stay at section scale.
- rp-end-3 · No studio sets more than about 30 words at display size.
- rp-end-4 · Concept work ends on real status, one specific observation and the next step, under 200 words. "What I would do differently" lists read as apology.
- rp-end-5 · 81 percent of viewing time is in the first three screenfuls (NN/g, 120 people). The ending serves the already interested reader.
- rp-end-6 · Avoid summary conclusions; do not explain what the story means (Orlean). Endings: twist, quote or return to the beginning (Pitts).
- rp-end-7 · Nothing static may look clickable; one next case study card is the only interactive element in the ending zone.

### Case study results without metrics
- rp-met-1 · The accepted substitute for launch data is a visible trail from evidence to decision.
- rp-met-2 · Honest qualitative evidence beats fabricated quantitative. Round, baseline free percentages trigger distrust.
- rp-met-3 · Small samples report counts ("x of 6"), never percentages.
- rp-met-4 · Behavioural counts only from recordings or notes, never memory.
- rp-met-5 · Unlaunched work frames outcomes as hypotheses with a status column, guardrails and a "chose not to measure" list (HEART, Lean UX).
- rp-met-6 · Process narration ("I ran 5 tests") is not evidence; the consequence of the study is.

### What gets designers interviewed
- rp-int-1 · Reviewers scan 10 to 30 seconds, then spend 2 to 3 minutes on one or two case studies if earned (practitioner accounts, not a study).
- rp-int-2 · What converts is visible judgment he owns: a constraint, the decision it forced, evidence that proved his own idea wrong and honest uncertainty.
- rp-int-3 · Red flags: final screens with no path to them, unclear ownership, generic phrasing, checklist section titles, the textbook linear story.
- rp-int-4 · Zero visible friction reads as over edited (Backes).
- rp-int-5 · The opening line and first screen matter more than the ending; surface the strongest decision near the top.
- rp-int-6 · Headings that state findings, and each feature given its reason at the point of the feature.

### Expanding card gallery components
- rp-gal-1 · Interaction research for the Haven ending row. Relevant to CS2 only for layout: hover hidden text is invisible to touch and many keyboard users, so load bearing text is never hover gated.

### Near term goal focus evidence (written for CS2, cited by section 2)
- rp-near-1 · A distant goal alone did no better than no goal; near goals added to it raised progress and self-efficacy (Bandura and Schunk 1981, Latham and Seijts 1999).
- rp-near-2 · At scale, weekly subgoals raised volunteering about 7 to 8 percent over 12 weeks (Rai et al. 2022, 9,108 people).
- rp-near-3 · Frequent, visible progress monitoring is the active ingredient (Harkin et al. 2016, 138 studies).
- rp-near-4 · Pace tracks rate against an expected rate, not position alone (Carver and Scheier 1990).
- rp-near-5 · Make behind recoverable and task focused; broken streaks cut engagement unless repair exists. Analogies, untested in a learning product.
- rp-near-6 · Do not cite Ariely and Wertenbroch 2002 or construal level theory; both are contested.
- rp-near-7 · Single design choices have modest effects at scale (Kizilcec et al. 2020).

### Visual storytelling per beat (written for CS2, drives loop step 5)
- rp-vis-1 · Walls of text come from picking the layout first. Every newsroom and paper studied goes reader's point, then form, then layout.
- rp-vis-2 · Text only is a real form when a sentence says it as well (Reuters). Choose it on purpose, not by default.
- rp-vis-3 · Qualitative beats take diagram catalogues (Lengler and Eppler, Evergreen qualitative chooser, Bach data comics), not chart choosers.
- rp-vis-4 · The still test: readers rarely hover or click (NYT), and animation has not beaten good static diagrams. The figure alone carries the claim.
- rp-vis-5 · Change one thing between neighbouring figures; parallel parts get the same internal pattern (Hullman et al. 2013).
- rp-vis-6 · Body text at 5 or 6 of 12 columns, never wider than 7 (measure arithmetic, an inference, not a published rule).
- rp-vis-7 · Strong design posts give each claim one isolating figure: Linear, Figma UI3, Stripe, Duolingo, Basecamp hill charts.

---

## 5. Repo rules

Source: `.claude/case-study-rules.md`. Every claim traces to `reference/`. Mark assertions CONFIRMED,
ESTIMATE, ASSUMED, INVENTED or PARAPHRASE. CS1 owns the operation, CS2 the framework, CS3 the design
system. No vanity metrics. Behavioural principles go in captions or asides, never "we used loss aversion"
in the body.
