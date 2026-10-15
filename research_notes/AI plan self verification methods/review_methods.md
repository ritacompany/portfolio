# Structured methods for checking a plan's logic before acting (LLM agents and human decision making)

Scope: separate reviewers, multi-agent debate, generator/verifier splits, pre-mortems, assumption checks and other structured analytic techniques, red teaming, and checklist versus open critique. Focus: what makes each one work for checking a plan, not for checking a factual answer. Current to October 2026.

## 1. Multi-agent debate: does a second agent help, and under what conditions?

### Takeaway
Plain same-model debate mostly gives you a majority vote with extra steps. At equal compute it usually ties or loses to self-consistency, and peer pressure can push correct agents into wrong answers. A second agent helps when it brings something the first one lacks: a different starting answer (diverse initialization or a different model), calibrated confidence, a protocol built to resist conformity, or above all an external ground-truth signal.

### Cited Findings
- Original claim (Du et al. 2023, ICML 2024): several instances each answer, read the others' answers, critique them and revise over several rounds. Reported gains on reasoning and factuality, using the same prompts for every task. [arXiv 2305.14325](https://arxiv.org/abs/2305.14325v1); [PMLR](https://proceedings.mlr.press/v235/du24e.html)
- Liang et al. 2023 (EMNLP 2024) name "Degeneration-of-Thought": once a model is confident in its answer, self-reflection cannot produce new ideas even when that answer is wrong. Their fix is a "tit for tat" debate with a judge. GPT-3.5 with MAD beat GPT-4 on Common MT. The authors warn that the judge may be unfair when the agents are different LLMs. [arXiv 2305.19118](https://arxiv.org/pdf/2305.19118)
- Huang et al. 2023 (ICLR 2024) reran Du's debate on the full GSM8K set (gpt-3.5, 3 agents, 2 rounds). Given the same number of responses, debate "significantly underperforms" self-consistency with majority voting. Their reading: debate's gain comes from consistency across samples, not from self-correction. [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- Smit et al., "Should we be going MAD?" (ICML 2024): MAD systems "do not reliably outperform" self-consistency and multi-path ensembling. They are very sensitive to hyperparameters. Tuning "agreement intensity" took Multi-Persona from worst to best on MedQA. They also cost more API calls. [PMLR](https://proceedings.mlr.press/v235/smit24a.html); [arXiv](https://arxiv.org/html/2311.17371v3)
- Zhang et al. 2025, "Stop Overvaluing Multi-Agent Debate" (5 MAD methods, 9 benchmarks, 4 models): MAD "often fail[s] to outperform" CoT and self-consistency even with much more compute. The authors recommend model heterogeneity as the universal fix. [arXiv 2502.08788](https://arxiv.org/abs/2502.08788)
- Choi, Zhu and Li, "Debate or Vote" (NeurIPS 2025, 7 benchmarks): majority voting accounts for most of the gain credited to MAD. They model debate as a martingale, meaning debate alone does not raise expected correctness. Interventions that bias belief updates toward correction do help. [arXiv 2508.17536](https://arxiv.org/html/2508.17536v2)
- Wynn, Satija and Hadfield 2025: accuracy can fall over debate rounds even when stronger models outnumber weaker ones. Agents switch from right to wrong under peer reasoning, "favoring agreement over challenging flawed reasoning." [arXiv 2509.05396](https://arxiv.org/abs/2509.05396v2)
- Zhu et al. 2026, "Demystifying MAD": two things vanilla debate lacks are diverse initial viewpoints and explicit, calibrated confidence. A diversity-aware start plus confidence signalling beats vanilla MAD and majority vote across six QA benchmarks. [arXiv 2601.19921](https://arxiv.org/html/2601.19921v1)
- Debate reduces diversity across sessions compared with voting, even when agents come from different model families (creative generation). [arXiv 2609.00683](https://arxiv.org/pdf/2609.00683)
- Kamoi et al. survey (TACL 2024): no prior work shows successful self-correction from prompted-LLM feedback except on tasks unusually well suited to it. Self-correction works when reliable external feedback exists, or after large-scale fine-tuning. Many positive results come from unfair evaluation designs. [ACL Anthology](https://aclanthology.org/2024.tacl-1.78); [arXiv 2406.01297](https://arxiv.org/abs/2406.01297v3)

### Inferences
- Ranked conditions under which a second agent adds value, strongest first:
  1. It has access to ground truth or a sound checker (tests, validator, constraint solver, source documents).
  2. It has different information or context, for example it is blind to the author's reasoning or holds the source material.
  3. It is a different model, which reduces correlated errors.
  4. It has a different role or instructions.
  5. A second copy of the same model is the weakest option.
  The evidence for 1 is strong, for 3 it is moderate and mixed, and for 4 alone it is weak.
- Plans have no majority answer to vote on, so the one mechanism that makes debate work on QA (voting) mostly does not carry over. That makes debate weaker for plan checking than the QA literature suggests.
- Conformity is the main failure mode. A reviewer who sees the author's reasoning and confidence is likely to anchor on it. Reviewers should judge independently before any exchange.

### Gaps
- Almost all MAD evidence comes from QA and math with known answers. I found no controlled study of debate for checking open-ended plans.
- Effect sizes for heterogeneity (2502.08788, 2608.03648) were only visible in abstracts.

## 2. Generator/verifier splits in LLM planning (LLM-Modulo) and what a "sound critic" means

### Takeaway
In LLM-Modulo the LLM proposes plans and external critics decide whether they are correct. A critic is "sound" when it has correctness guarantees, as the VAL plan validator does. LLMs cannot be sound critics. At most they can act as "soft" critics for style and preferences. LLMs judging their own plans mostly accept bad plans (false positives), and self-critique loops lower performance. Loops built on a sound verifier improve steadily with more rounds.

### Cited Findings
- LLM-Modulo (Kambhampati et al., ICML 2024 position paper): the LLM generates candidate plans and also translates them into formats critics can read. A bank of critics evaluates each plan, and a meta controller back-prompts the LLM with the critiques. Humans take part once per domain (building the model) and once per problem (refining the spec), not inside the loop. [arXiv 2402.01817](https://arxiv.org/html/2402.01817v3)
- Hard critics check correctness: causal, timeline and resource constraints, and unit tests, with VAL used for PDDL. The framework is only as sound as its hard critics, and a plan is valid only when every hard critic approves. Soft critics, which can be LLMs, judge style, explicability and preferences. [arXiv 2402.01817](https://arxiv.org/html/2402.01817v3)
- Back-prompting with VAL raised Blocksworld to 82% within 15 rounds and Logistics to 70%. Obfuscated Mystery BW reached only about 10%. GPT-4 alone produced executable, goal-reaching plans about 12% of the time. On travel planning, LLM-Modulo reached about 6x the baselines (best baseline 0.7% on GPT-3.5) within 10 cycles. [arXiv 2402.01817](https://arxiv.org/html/2402.01817v3)
- Valmeekam et al. 2023: GPT-4 checking its own Blocksworld plans was right on 61 of 100. It accepted 38 of the 45 plans that were actually invalid, which is mostly false positives. Self-critique lowered plan generation performance compared with an external sound verifier. [arXiv 2310.08118](https://arxiv.org/pdf/2310.08118)
- Stechly et al. 2024 (Game of 24, graph coloring, Blocksworld): self-critique loops did worse than single-prompt baselines. A sound verifier improved results steadily with more back-prompts, while LLM self-verification collapsed. The authors' minimum bar is that a verifier should at least keep correct answers correct. [arXiv 2402.08115](https://arxiv.org/pdf/2402.08115)
- Kambhampati: LLMs hallucinate both false positives and false negatives when verifying. Earlier positive self-critique results were often on tacit-knowledge tasks such as essay editing, where no verifier exists to check whether the critique helped. [arXiv 2403.04121](https://arxiv.org/pdf/2403.04121)
- Gundawar et al. 2024 (same group) tested LLM-Modulo empirically on four scheduling domains (TravelPlanner, Natural Plan) and report significant gains. This is the authors' own evaluation, not independent replication. [arXiv 2411.14484](https://arxiv.org/html/2411.14484v1)
- SIEVE (ICML 2026): naive self-checks did not raise GSM8K accuracy for any small model tested. Even a strong external LLM verifier falsely accepted up to 89.5% of one model's wrong answers. [ICML 2026](https://icml.cc/virtual/2026/77914)

### Inferences
- "Sound" means that when the critic says "valid", the plan really is valid. Precision on acceptance is what matters, because a false pass is the dangerous error.
- For plans written in natural language (product, writing or design plans) no VAL exists. The practical move is to turn as much of the plan as possible into checkable constraints (stated requirements, dependencies, resources, source traceability) and run those deterministically. The rest gets labelled "soft critic, unverified", not "passed".
- An LLM reviewer's "looks good" carries little weight. Its specific objections tied to named constraints carry more.

### Gaps
- No independent replication of LLM-Modulo outside the ASU group was found.
- I found no work defining soundness for open-ended human plans.

## 3. Pre-mortem and prospective hindsight

### Takeaway
A pre-mortem asks people to assume the plan has already failed and explain why. It reliably lowers overconfidence and produces more failure reasons than a standard critique. The well-known "30%" figure comes from a 1989 study about explaining events, not about plans, and the experimental evidence on pre-mortems themselves is small and comes mostly from Klein's own group.

### Cited Findings
- Klein 2007 (HBR 85(9), pp. 18 to 19): unlike a critique that asks what might go wrong, the pre-mortem assumes "the patient has died" and asks what did go wrong. [Wikipedia summary](https://en.wikipedia.org/wiki/Pre-mortem); [PHF summary PDF](https://archive.phf.org/resourcestools/Documents/Pre_Mortem_Analysis.pdf)
- Mitchell, Russo and Pennington 1989, "Back to the future: Temporal perspective in the explanation of events," J. Behavioral Decision Making 2(1), pp. 25 to 38. People who imagined an outcome had already happened produced more explanations for it than people who treated it as uncertain. Klein's article turned this into "prospective hindsight increases the ability to correctly identify reasons for future outcomes by 30%". The original data were not checked. [Citation record](https://colab.ws/articles/10.1002%2Fbdm.3960020103); [secondary](https://en.wikipedia.org/wiki/Pre-mortem)
- Veinott, Klein and Wiggins 2010 (ISCRAM): 178 participants evaluated an H1N1 response plan under standard critique, pros/cons, cons-only and pre-mortem conditions. The pre-mortem lowered confidence in the plan more than the other conditions, reportedly about 25 points more than baseline. That figure comes from a secondary summary and was not verified. [ScienceBlog summary](https://scienceblog.com/?p=594778); [Core.ac.uk record](https://core.ac.uk/works/49608374)
- Follow-up lab work: pre-mortems lower overconfidence and produce more reasons a plan might fail. One 2021 study found the pre-mortem increases attribution bias (blaming external factors). [SJDM 2021 poster](https://dlab.sauder.ubc.ca/sjdm/presentations/2021-Poster-Gandhi-Linnea-debiasing-premortem-selfserving~.pdf); [SJDM 2020 poster](https://dlab.sauder.ubc.ca/sjdm/presentations/2020-Poster-Elizabeth-premortem-confidence-brainstorming.pdf)
- Limit: assuming failure can produce threats that are not real. [Wikipedia](https://en.wikipedia.org/wiki/Pre-mortem)

### Inferences
- What the pre-mortem does is change the frame from "could this fail?" to "explain the failure". It surfaces more failure paths and breaks the plan author's confidence. Both matter for LLMs, because LLM self-review fails mostly through false acceptance (Section 2) and because of Degeneration-of-Thought (Section 1).
- The evidence is about generating more reasons and lowering confidence, not about better plans or outcomes. A pre-mortem is a way to generate candidate failures, not a verifier, so its output still needs triage.

### Gaps
- No LLM-specific controlled study of pre-mortem prompting was found.
- The 1989 paper and the 2010 ISCRAM paper were not read in full, and the 30% and 25-point figures are unverified.

## 4. Assumption mapping and structured analytic techniques (CIA Tradecraft Primer)

### Takeaway
The 2009 CIA Tradecraft Primer packages Key Assumptions Check, ACH, Devil's Advocacy, Team A/Team B, Red Team Analysis and "What If?" analysis. It claims they work but cites no evidence. Controlled experiments on ACH find little or no general benefit and show that analysts skip steps. Devil's advocacy has the best lab evidence among the dialectical methods.

### Cited Findings
- The Primer (April 2009) lists Key Assumptions Check and ACH among its diagnostic techniques, Devil's Advocacy (p.17), Team A/Team B (p.19), High-Impact/Low-Probability and "What If?" as contrarian techniques, and Red Team Analysis (p.31) among imaginative techniques. [CIA PDF](https://www.cia.gov/resources/csi/static/955180a45afe3f5013772c313b16face/Tradecraft-Primer-apr09.pdf)
- The Primer says ACH "has proved to be a highly effective technique when there is a large amount of data", with no evidence cited (noted in JDM 2018). [JDM 13(6) 2018](https://dlab.sauder.ubc.ca/sjdm/journal/18/18803/jdm18803.html)
- Dhami et al. 2019: 50 intelligence analysts were randomly assigned to ACH or no technique on a task with probabilistic ground truth. ACH-trained analysts did not follow all the steps, and the evidence of benefit was mixed. [Applied Cognitive Psychology PDF](https://mdx-repository.prod-uk.cayuse.com/download/68a5c6461fa622c2ea8d16f5f32e28fc06861520af1a4341f7740e8173d2cc48/229327/Dhami_et_al-2019-Applied_Cognitive_Psychology.pdf); [Strathprints](https://strathprints.strath.ac.uk/69049/)
- Karvetski and Mandel 2020 (N=227): ACH gave no advantage over a no-technique control on coherence. [JDM 15(6) 2020](https://dlab.sauder.ubc.ca/sjdm/journal/20/200430/jdm200430.html)
- 2024 (N=161): putting hypotheses in rows and evidence in columns lowered confirmation bias. The standard ACH layout (hypotheses in columns) did not. [Cognitive Research 2024](https://cognitiveresearchjournal.springeropen.com/counter/pdf/10.1186/s41235-024-00560-y.pdf)
- Devil's advocacy versus dialectical inquiry: Valacich and Schwenk 1995 found devil's-advocacy groups generated more alternatives and chose better recommendations than dialectical-inquiry or expert-based groups. [RePEc](https://ideas.repec.org/a/eee/jobhdp/v63y1995i2p158-173.html) Schwenk 1984 found a devil's advocate reduced anchoring on an "expert report". [RePEc](https://ideas.repec.org/a/inm/ormnsc/v30y1984i3p263-272.html) Schwenk's 1989 meta-analysis exists, but its effect sizes were not retrieved. [RePEc](https://ideas.repec.org/a/bla/stratm/v10y1989i3p303-306.html) A review of 52 studies: experiments favour devil's advocacy, field studies support dialectical inquiry. [Fjermestad, NOW](https://nowpublishers.com/article/Details/ISY-013)

### Inferences
- Use a Key Assumptions Check that lists each assumption the plan relies on and asks whether it is supported by evidence, and what happens if it is wrong. It fits plans better than ACH, which is built to choose between competing explanations of evidence.
- People skipping steps (Dhami 2019) matches the LLM problem of agents skipping review steps. Enforcing a technique's structure, through forced outputs per step, may matter more than which technique is chosen.
- Layout effects (2024) suggest that the format of an assumption table changes how well it debiases.

### Gaps
- No controlled evidence specific to Key Assumptions Check was found. I could not extract the Primer's own text on KAC steps (PDF did not parse).
- Team A/Team B: only its listing in the Primer was found, with no effectiveness evidence.

## 5. Red teaming plans; steelman then attack

### Takeaway
Red teaming of plans in military and government doctrine has moved from formal adversary teams toward a "red team mindset" for any decision maker, with the aim of catching bias and groupthink before judgments set. Rigorous evidence is thin. The closest lab evidence is the devil's advocacy literature in Section 4.

### Cited Findings
- UK MoD Red Teaming Handbook, 3rd ed. (June 2021): centres on a red-team mindset that individuals or teams can apply, rather than standing up formal red teams. Part 1 is for anyone making decisions and Part 2 is for setting up a formal capability. It says organisations are prone to biases that skew decisions and that red teaming catches them before faulty judgments are "cemented". [gov.uk PDF](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1027158/20210625-Red_Teaming_Handbook.pdf); [gov.uk guide](https://www.gov.uk/government/publications/a-guide-to-red-teaming)
- Zenko's Red Team (CFR) describes red teams as modern devil's advocates who challenge assumptions. This is secondary. [CFR](https://www.cfr.org/articles/red-team-how-succeed-thinking-enemy)
- US Army red teaming material includes sections on groupthink and red teaming during planning. [FAS](https://irp.fas.org/doddir/army/critthink.pdf)

### Inferences
- "Steelman then attack" deals with the conformity failure in Section 1 and the fake-threat failure of pre-mortems in Section 3. Forcing the reviewer to first restate the plan's strongest version shows whether it understood the plan, so attacks aimed at a misread version can be thrown out.

### Gaps
- No empirical study of steelman-then-attack, for humans or LLMs, was found. This is practitioner advice, not tested method.

## 6. Fixed checklists or rubrics versus open-ended critique for LLM judges

### Takeaway
Breaking a judgment into pre-written yes/no items reliably improves agreement between judges and lowers variance. Agreement with humans improves modestly and inconsistently. Errors on individual items add up, and a checklist only catches failures it was written to catch.

### Cited Findings
- TICK (Cook et al. 2024): LLM-generated yes/no checklists per instruction raised exact agreement between the LLM judge and humans from 46.4% to 52.2% compared with direct scoring. Using the checklist to self-refine (STICK) gave +7.8 points absolute on LiveBench reasoning, and Best-of-N selection gave +6.3 on WildBench. Human annotators agreed with each other more when given the checklists. [arXiv 2410.03608](https://arxiv.org/html/2410.03608v1)
- CheckEval (EMNLP 2025): turning criteria into Boolean questions raised average agreement across evaluator models by 0.45 and reduced score variance, while correlation with humans was only "competitive". [arXiv 2403.18771](https://arxiv.org/html/2403.18771v2)
- RocketEval (ICLR 2025): checklist grading with a 2B model reached 0.965 correlation with human preferences, comparable to GPT-4o, at more than 50x lower cost. The item reweighting depends on human labels. [arXiv 2503.05142](https://export.arxiv.org/pdf/2503.05142)
- REFLECT (2026): fine-grained judging beats holistic judging, and rubrics improved detection accuracy at the outcome level for all models tested. [arXiv 2605.19196](https://arxiv.org/pdf/2605.19196)
- RubricEval (2026): errors in individual rubric judgments carry through to the aggregate score. [arXiv 2603.25133](https://arxiv.org/pdf/2603.25133) RUVERBench (2026): how reliably judges verify rubrics on agentic outputs is still underexplored. [arXiv 2606.29920](https://arxiv.org/pdf/2606.29920)
- Essay scoring: holistic and analytic scoring behave differently, and analytic traits showed stable negative bias. [arXiv 2604.00259](https://arxiv.org/html/2604.00259v1)

### Inferences
- For plan checking, a fixed checklist turns a vague "is this plan good?" into concrete pass/fail questions. That pushes an LLM critic as far as it can go toward the "hard critic" end of Section 2. It makes the checker more consistent, not more correct, so each item should be something that can be checked against evidence (a file, a source, a constraint).
- Pair a checklist (for known failure modes, consistent) with one open-ended adversarial pass such as a pre-mortem or red team (for unknown failure modes). The checklist misses what it did not anticipate, and the open critique has high variance.

### Gaps
- All of these checklist studies evaluate outputs (responses or essays), not plans before execution. No study of checklists for checking plans was found.

## Cross-method summary (inference from the above)

| Method | Mechanism | Evidence strength | Main failure mode | Makes it work for plans |
|---|---|---|---|---|
| Same-model debate | Peer critique, then revision | Weak; ties or loses to voting | Conformity, martingale drift, cost | Not recommended alone |
| Heterogeneous or blind reviewer | Uncorrelated errors, independent first pass | Moderate, mixed | Judge bias, still no ground truth | Different model or context; independent verdict before seeing the author's reasoning |
| Generator plus sound verifier | External check with guarantees | Strong in formal domains | Only as good as the verifier; LLM-as-verifier gives false positives | Turn plan parts into checkable constraints |
| Pre-mortem | Assumed failure, explain why | Moderate (small, same group) | Invented threats; attribution bias | Use to generate candidate failures, then triage |
| Key Assumptions Check / ACH | List and test load-bearing assumptions | Weak to null for ACH; KAC untested | Step skipping; format effects | Enforce per-step outputs |
| Devil's advocacy / red team | Assigned dissent | Moderate lab evidence for DA | Strawmanning; dissent treated as ritual | Steelman first, then attack |
| Fixed yes/no checklist | Decomposed binary judgments | Moderate for consistency | Blind to failures not on the list; item errors add up | Items tied to verifiable evidence |
