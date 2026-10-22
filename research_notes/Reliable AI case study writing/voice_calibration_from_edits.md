# Calibrating an LLM to one writer's standard from his own edits, corrections and approved examples

Evidence labels used below: DIRECT means the source tests the exact question. INDIRECT means the source tests a neighbouring question (different task, simulated user, short texts) and the link to case study writing is an inference. Source format is "claim (Source link)" because this repo blocks em dashes.

## 1. Learning from user edits (PRELUDE / CIPHER, PROSE, rule extraction from diffs)

### Takeaway
Inferring short written preferences from edit history beats both no learning and raw "show the model past edits" prompting, and costs far fewer tokens. But the learned rules capture only part of the preference, drift toward generic phrasing and leave a large gap to a perfectly stated preference. The best reported result comes from combining learned rules with the writer's own examples, not choosing one.

### Cited Findings
- PRELUDE setup: agent drafts, user edits, the agent infers a natural language description of the user's latent preference from the edit and puts it in future prompts. No fine-tuning. Descriptions are interpretable and the user can edit them. CIPHER retrieves preferences inferred from the k closest past contexts and aggregates them (Gao et al. 2024, [arXiv 2404.15269](https://arxiv.org/abs/2404.15269)). DIRECT for method, INDIRECT for this use case: user is a GPT-4 simulator with a fixed preference per document source, tasks are summarization and email.
- Summarization, 200 rounds, cumulative edit distance: no learning 48,269; best ICL-with-past-edits 38,560; best CIPHER 32,974 (about 31% below no learning); oracle (true preference handed over) 6,573 ([full paper, Table 2](https://arxiv.org/html/2404.15269v3)).
- Email writing: no learning 31,103; ICL-with-past-edits 30,949 to 32,405 (no better than nothing); best CIPHER 8,391 (about 73% below no learning); oracle 1,851 ([full paper](https://arxiv.org/html/2404.15269v3)).
- Preference classification accuracy (did the learned description match the true one): CIPHER 0.36 to 0.57 versus chance of 0.20 to 0.25; chain of thought over past edits 0.23 to 0.30 ([full paper](https://arxiv.org/html/2404.15269v3)).
- Cost: ICL and CoT over past edits cost 4 to 8 times more tokens than CIPHER; CIPHER costs about 1.5 to 2 times a no-learning baseline ([full paper](https://arxiv.org/html/2404.15269v3)).
- Small human evaluation (7 evaluators, 15 pairs each): CIPHER output preferred over ICL-edit 73.3% of the time but only 23.7% against the oracle. Human edit distance 211 for CIPHER versus 98 for oracle; zero-edit outputs 60% versus 76.7% ([full paper](https://arxiv.org/html/2404.15269v3)).
- Named failure modes: the agent captures only some aspects of a preference, often misses "brief" or "short sentences", struggles with subtle traits (parallel structure, second person, immersion); aggregating retrieved preferences makes descriptions more general; retrieval of the right past context is only about 25 to 27% accurate on email ([full paper](https://arxiv.org/html/2404.15269v3)).
- PROSE (Apple, ICML 2025) diagnoses the same problem: existing methods produce "generic preference descriptions". Fix is iterative refinement of the inferred preference plus verification of each inferred rule against multiple writing samples from the same user. Reports 33% better generation quality than CIPHER ([Aroca-Ouellette et al. 2025](https://arxiv.org/abs/2505.23815); [Apple ML research page](https://machinelearning.apple.com/research/predicting-preferences)).
- PROSE details: 5 user demonstrations per user, 4 LLMs, 5 seeds. Iterative refinement alone worth about 14.8%; verification against multiple samples gives a small 1.5 to 1.7% gain and mainly prunes over-specific or irrelevant rules ([PROSE HTML](https://arxiv.org/html/2505.23815v1)).
- Examples versus learned rules head to head inside PROSE: plain ICL (showing the user's samples) beats PROSE on average. ICL wins on structural preferences, PROSE wins on nuanced tone. PROSE plus ICL beats ICL alone by about 8.9% and CIPHER by about 51% with GPT-4o (abstract says "up to 9%" and 47%). Human study (16 participants): PROSE plus ICL won 69.4% against ICL and 91.8% against CIPHER ([PROSE HTML](https://arxiv.org/html/2505.23815v1)).
- PROSE uses about one tenth the prompt tokens of ICL at inference, and benefits more from stronger base models than the baselines ([PROSE HTML](https://arxiv.org/html/2505.23815v1)).
- Learned preference quality metrics correlate only weakly with generation quality on PRELUDE ([PROSE HTML](https://arxiv.org/html/2505.23815v1)). A rule that reads right is not proof the drafts will land.

### Inferences
- For this portfolio: the earlier draft versus edited draft pairs are exactly the PRELUDE signal. The research says to distil each diff into a short rule, check every rule against several of his other edits before keeping it (the PROSE verification step), and still put his approved passages in the prompt. Rules alone and examples alone are each beaten by both together.
- The oracle gap is the most important number for the "rules versus examples" question. A precisely stated true preference cut edit distance 5 to 7 times further than anything learned from edits. That argues the missing piece is his own statement of what a case study should be, written by him, used alongside the edit-derived rules. INDIRECT: the oracle here is a one-line preference for a simulated user, not a real person's standard.
- Raw "here are past edits, learn from them" prompting (ICL-edit) was no better than nothing on email. Dumping the diff history into context is not the method; distilling it is.

### Gaps
- No study found uses a real single writer's edit history over long-form persuasive or narrative text. Both PRELUDE and PROSE use simulated users and short summaries and emails.
- No reported numbers on how many edit pairs are needed before learned rules stabilise for a real person.

## 2. Few-shot exemplars versus written style guides versus both

### Takeaway
For voice, examples clearly beat instructions or zero-shot prompting, and a continuation format (model continues the writer's own opening) is strongest. For judgment and nuanced tone, learned or written descriptions add something examples do not. No source found runs a clean head to head of a human-written style guide against exemplars for one person.

### Cited Findings
- 400+ real authors, 40,000+ generations per model: few-shot beats zero-shot on all metrics, but LLMs still struggle with informal, implicit personal style; authors call personal style "difficult to specify through prompts" ([Wang et al., EMNLP Findings 2025, arXiv 2509.14543](https://arxiv.org/abs/2509.14543v1)).
- Same paper: imitation strong on formal text (authorship verification over 95% on news and Enron email at 5-shot) and weak on blogs (about 17 to 21%). Going from 2 to 10 examples adds very little ([search summary of the paper](https://arxiv.org/html/2509.14543v1); figures from a secondary review, [The Moonlight](https://www.themoonlight.io/en/review/catch-me-if-you-can-not-yet-llms-still-struggle-to-imitate-the-implicit-writing-styles-of-everyday-authors); verify before citing).
- Jemama and Kumar 2025: prompting strategy mattered more than model size. Zero-shot under 7% style-match accuracy; one-shot and few-shot much higher; text completion from a human-written opening reached 99.9% or above for 4 of 5 models ([arXiv 2509.24930](https://arxiv.org/abs/2509.24930v1)). Exact figures come via a secondary summary ([The Moonlight review](https://www.themoonlight.io/en/review/how-well-do-llms-imitate-human-writing-style)); verify in the PDF.
- Even near-perfect imitations stay more predictable than human writing (perplexity about 16 versus 29.5) ([same secondary summary](https://www.themoonlight.io/en/review/how-well-do-llms-imitate-human-writing-style)).
- LaMP and LongLaMP: retrieving a user's own past documents into the prompt improves personalized generation over non-personalized baselines; LongLaMP reports 5.7% to 128% gains across metrics on long-form email, review and topic writing ([LaMP](https://arxiv.org/abs/2304.11406v4); [LongLaMP](https://arxiv.org/abs/2407.11016v3)). INDIRECT: metrics are ROUGE against the user's real text, not judgment quality.
- PROSE result again: examples win on structure, learned descriptions win on nuanced tone, combined beats both ([PROSE HTML](https://arxiv.org/html/2505.23815v1)).
- Anthropic's prompting guide: examples are "one of the most reliable ways to steer" tone and structure; recommends 3 to 5 examples that are relevant, diverse enough that the model doesn't copy unintended patterns, and wrapped in example tags. It also says explaining why a rule exists works better than a bare "NEVER" because the model generalises from the reason ([Claude prompting best practices](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)). Same guide: prompt style leaks into output style, so match the prompt's own writing to the target.

### Inferences
- Voice transfers through his approved text, not through adjectives about his voice. Judgment (what belongs in a case study, what to cut) is where a written statement helps, which matches PROSE's tone versus structure split.
- The continuation result suggests a practical move: start drafts from his own opening sentence or approved paragraph rather than from a blank brief.
- Rules that carry their reason (for example why no colleague is quoted) should generalise better than bare prohibitions, per Anthropic guidance. That is vendor guidance, not a measured study.

### Gaps
- No controlled study found of a human-authored style guide versus exemplars for one writer.
- No study on long-form case study or portfolio writing.

## 3. Calibrating an LLM judge to one person's accept/reject calls

### Takeaway
It works, with binary pass/fail plus his written critique on each judgment, a few iterations and tens to a hundred labelled examples. Reported agreement ranges from about 48% to over 90% depending on task and effort. Criteria drift means his standard cannot be fully written down before he has graded real drafts.

### Cited Findings
- EvalGen: assertions chosen to match one user's thumbs-up or thumbs-down grades on 16 graded outputs per pipeline. Alignment 48.3% on a medical pipeline, 66.5% on a product pipeline (versus 54.4% for SPADE baseline) ([Shankar et al. 2024, full paper](https://arxiv.org/html/2404.12272v1)).
- EvalGen user study (n=9 practitioners): participants graded 5 to 10 outputs; self-rated "assertions aligned with my grades" on a 1 to 7 scale spread from 1 to 6 ([full paper](https://arxiv.org/html/2404.12272v1)).
- Criteria drift: users need criteria to grade outputs, but grading outputs helps them define criteria. Participants added criteria after seeing new kinds of bad output and reinterpreted old ones. Authors state it is impossible to completely determine criteria before human judging of outputs ([arXiv 2404.12272](https://arxiv.org/abs/2404.12272); [full paper](https://arxiv.org/html/2404.12272v1)).
- Critique shadowing (Hamel Husain): one principal domain expert, binary pass/fail, detailed written critique per item; the critiques go into the judge prompt as few-shot examples. Start with about 30 examples and add until no new failure modes appear; about 100 labelled examples per failure mode to validate, fewer than 60 gives wide confidence intervals. Honeycomb case reached over 90% judge-expert agreement in three iterations. Warns raw agreement misleads on imbalanced data; report true positive and true negative rates separately. Avoid 1 to 5 scales ([Husain, "Creating an LLM-as-a-Judge That Drives Business Results"](https://hamel.dev/blog/posts/llm-judge/)). Practitioner write-up, not peer reviewed.
- Persona-based judging of individual preferences shows low, inconsistent agreement with ground truth; adding verbal uncertainty lifts agreement above 80% on high-certainty binary items ([Dong et al., "Can LLM be a Personalized Judge?", EMNLP Findings 2024](https://arxiv.org/abs/2406.11657v1)). INDIRECT: personas, not one real person's labels.
- PersonaJudge: judges given evaluator-specific demonstrations and that evaluator's own reasoning traces gained up to 9.9 points over a zero-shot judge, across 32 annotators and 4,200 judgments; a judge matching averaged ratings can still miss individual differences ([SIGDIAL 2026](https://aclanthology.org/2026.sigdial-1.59.pdf)). Details from search summary only; not fully read.

### Inferences
- His written corrections are already critique-shadowing data. Each one paired with the draft it rejected is a labelled fail with a critique.
- Expect the first judge to agree with him well under 90%. Plan on him grading a batch, the judge being revised, and repeating. The criteria drift finding says his written statement of the standard will change after he grades drafts, which is a reason to write it after a grading round, not before.

### Gaps
- No source reports judge agreement for long-form creative or portfolio writing graded by its author.

## 4. AI-written abstract rules versus the person's own words or examples

### Takeaway
No direct comparison found. Indirect evidence points one way: AI-inferred rules come out generic and weakly predict output quality, while the person's own text and a precisely stated true preference perform best.

### Cited Findings
- Inferred preference descriptions trend generic, which PROSE was built to fix ([PROSE](https://arxiv.org/abs/2505.23815)).
- Aggregating several inferred preferences makes descriptions more general; inferred rules miss short sentences and subtle traits ([PRELUDE full paper](https://arxiv.org/html/2404.15269v3)).
- True preference (oracle) beat every learned description by a wide margin: edit distance 6,573 versus 32,974 on summaries, 1,851 versus 8,391 on email ([PRELUDE full paper](https://arxiv.org/html/2404.15269v3)). INDIRECT: the oracle is a known ground truth for a simulated user, which stands in for the person stating his own standard.
- Inferred rule quality correlates weakly with generation quality ([PROSE HTML](https://arxiv.org/html/2505.23815v1)).
- Training on LLM-inferred personas generalises to user-written personas ([arXiv 2501.11549](https://arxiv.org/html/2501.11549v2)). INDIRECT and fine-tuning based; noted only because it is the nearest LLM-written versus user-written comparison found.
- GhostWriter has an LLM summarise a user's style and lets the user edit that summary directly, framing user editing as the control point ([arXiv 2402.08855](https://arxiv.org/pdf/2402.08855)). Design study, no head to head numbers.

### Inferences
- An AI drafting more abstract rules from his corrections is the weakest option on this evidence. Rules extracted from his diffs are useful only when verified against several of his edits and when he can read and correct them. His own statement, in his words, is the closest thing to the oracle condition.

### Gaps
- No study compares a model-written style guide with a guide written by the target writer.

## 5. Known failure modes

### Takeaway
Three show up repeatedly: pull toward a generic model voice that survives even human post-editing, rules that over-generalise or get dropped as their number grows, and learned rules that miss brevity and subtle traits.

### Cited Findings
- Post-editing study (n=81, pre-registered): editing LLM drafts moved text toward participants' own style, but the result stayed closer to LLM style than to their unassisted writing, and was less diverse. Participants perceived the edited text as their own voice even though measures still detected LLM traits. Typical edits were removing LLM-isms such as "delve", adding contractions and adjusting punctuation ([arXiv 2604.24444](https://arxiv.org/abs/2604.24444)).
- Imitations stay detectable: few-shot outputs still largely flagged by GPTZero ([Wang et al. 2025](https://arxiv.org/abs/2509.14543v1), via search summary) and lower perplexity than human text ([Jemama and Kumar 2025](https://arxiv.org/abs/2509.24930v1), via secondary summary).
- Homogenisation: co-writing with instruction-tuned models reduces diversity across authors; LLM editing moves essays in the same direction regardless of model ([CHI writing analysis, arXiv 2609.23090](https://arxiv.org/pdf/2609.23090) citing Padmakumar and He; [arXiv 2603.18161](https://arxiv.org/pdf/2603.18161)). Some of this evidence is preprints or press summaries.
- Instruction load: on IFScale the best frontier models reached 68% adherence at 500 simultaneous instructions; degradation is threshold, linear or exponential by model, with a bias toward earlier instructions ([Jaroslawicz et al., NeurIPS 2025, arXiv 2507.11538](https://arxiv.org/abs/2507.11538)). A later third-party re-run reports much better results on newer models ([Arize](https://arize.com/?p=28407)); treat as unverified. INDIRECT: keyword inclusion, not style rules.
- Over-generalised rules and missed brevity in edit-learned preferences ([PRELUDE full paper](https://arxiv.org/html/2404.15269v3)).
- Examples get copied too literally unless they are varied ([Claude prompting guide](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices)).

### Inferences
- A growing rule list is itself a risk: adherence drops with count and earlier rules get favoured. Prune, merge and attach reasons rather than append.
- Because writers feel edited AI text is theirs when it measurably is not, his own read is not enough as a final check on voice; a judge calibrated to his rejections plus a comparison against his unassisted text gives a second signal.

### Gaps
- No source found on rule conflicts specifically (two style rules that contradict); only instruction-count degradation.
- No practitioner write-up from a professional writer with measured results was found in this pass.
