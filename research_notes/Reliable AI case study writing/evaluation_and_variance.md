# Measuring whether an LLM writing process reliably meets a quality bar

Scope: rubric design, binary versus scored criteria, LLM-as-judge reliability, run to run variance, sample sizes for a pass rate claim, error analysis loops and Anthropic's guidance. Applied context: a Claude-based case study drafting process where "pass" means Chadwick accepts the draft with only small edits.

Note on computed numbers: the sample size tables below were computed in this session from the standard Wilson score formula (NIST) and the exact binomial (Clopper-Pearson) method. They are arithmetic, not quoted from a paper. Formula source is cited; the calculation is reproducible.

## Binary pass/fail checklists versus Likert scores

### Takeaway
Both practitioner guidance and the best controlled evidence favour decomposed binary checks over holistic Likert scores. Binary items give more consistent labels across human and LLM graders, map directly to a pass rate and let you use classification metrics (TPR, TNR, kappa) to validate a judge. Likert scores drift to the middle and need larger samples to detect change.

### Cited Findings
- Hamel Husain and Shreya Shankar recommend binary evaluations because they "force clearer thinking and more consistent labeling." Their stated problems with Likert: the gap between adjacent points (3 vs 4) is subjective, larger samples are needed to detect differences and annotators drift toward middle values. To track gradual progress they recommend several specific binary checks (for example counting how many expected facts are present) rather than a scale. ([Hamel Husain, LLM Evals FAQ](https://hamel.dev/blog/posts/evals-faq/))
- CheckEval (Lee et al., EMNLP 2025) decomposes each evaluation criterion into sub-aspects and a checklist of binary yes/no questions. Across 12 evaluator models it raised average inter-evaluator agreement by 0.45 versus Likert-style protocols, reduced score variance and improved average correlation with human judgments by 0.10. The authors attribute Likert inconsistency to "subjective evaluation criteria combined with Likert scale scoring." ([CheckEval, arXiv 2403.18771](https://arxiv.org/html/2403.18771v2); [ACL Anthology](https://preview.aclanthology.org/setup/2025.emnlp-main.796))
- Eugene Yan has LLM evaluators return binary outputs "where possible," which he reports improves performance and allows precision/recall or Cohen's kappa; he reserves Spearman/Kendall correlation for Likert outputs. ([Eugene Yan, Evaluating the Effectiveness of LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/))
- Anthropic's agent eval guidance: write "clear, structured rubrics to grade each dimension," and test each task by asking whether two domain experts would reach the same pass/fail verdict. Vague rubrics produce inconsistent judgments. ([Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents))
- Anthropic's platform docs still show Likert (1 to 5 tone), binary and ordinal LLM-graded examples, and advise defining scale endpoints explicitly. So Anthropic does not forbid scales; its stronger guidance is specificity and measurability. ([Anthropic docs, Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md))
- Expert human graders on a checklist of 14 binary creative writing tests (TTCW) reached only moderate per-test agreement (average Fleiss kappa 0.41, range 0.27 to 0.66) but strong agreement on the aggregate count of tests passed (Pearson 0.69). ([Chakrabarty et al., Art or Artifice, arXiv 2309.14556](https://arxiv.org/html/2309.14556v2))

### Inferences
- For Chadwick, the top-level outcome ("accepted with only small edits") is itself binary, which is good. But it is a holistic judgment, so it should be backed by a short checklist of specific binary criteria derived from his own failure notes (for example: every claim traces to reference; no em dashes; no Oxford commas; no quotes of colleagues in CS2; reader with no Mondai context can follow it). The checklist explains why a draft failed; the top-level verdict is the metric.
- "Small edits" needs an operational definition to stay binary, for example "no paragraph rewritten, no structural change, edits under N minutes" or "no sentence-level rewrite of a claim." Otherwise the line will drift (see criteria drift below).
- TTCW shows that even expert humans disagree on individual binary items for writing quality; aggregates are more stable than items. Expect per-item noise and judge the process on the aggregate pass rate.

### Gaps
- No study found that directly compares binary versus Likert for a single human judging long-form portfolio or case study prose. Evidence is from summarisation, QA and creative writing benchmarks.

## Run to run variance, sample sizes, pass@k versus pass^k and confidence intervals

### Takeaway
LLM outputs vary between runs even at temperature 0, so one or two good drafts say almost nothing. A 2/2 result is consistent with a true pass rate as low as about 34% (Wilson 95%). To claim "at least 90%" with 95% confidence you need roughly 25 to 30 consecutive accepted drafts with zero failures, about 42 to 46 runs if one fails and about 58 to 61 if two fail. Reliability for a user who will run the process repeatedly is better described by pass^k than pass@k.

### Cited Findings
- Atil et al. ran 5 models on 8 tasks, 10 runs each, at temperature 0, top-p 1 and fixed seed. They found "accuracy variations up to 15% across naturally occurring runs," identical raw output strings across 10 runs were "typically fairly low" (0% in several conditions, including GPT-4o few-shot on some tasks) and "none of the LLMs consistently delivers repeatable accuracy across all tasks, much less identical output strings." Longer outputs correlated with lower stability. The paper's figures are internally inconsistent in places (one example cites a 72-point gap). ([Atil et al., Non-Determinism of "Deterministic" LLM Settings, arXiv 2408.04667](https://arxiv.org/html/2408.04667v5))
- Other work reaches the same conclusion: temperature 0 does not guarantee determinism in ChatGPT code generation ([Ouyang et al., arXiv 2308.02828](https://arxiv.org/html/2308.02828v2)), and evaluations should account for non-determinism rather than reporting a single greedy run ([Song et al., The Good, The Bad, and The Greedy, arXiv 2407.10457](https://arxiv.org/pdf/2407.10457)).
- tau-bench (Yao et al., 2024) introduced pass^k to measure "the reliability of agent behavior over multiple trials." gpt-4o succeeded on under 50% of tasks and its pass^8 in the retail domain was under 25%. ([tau-bench, arXiv 2406.12045](https://arxiv.org/abs/2406.12045))
- Anthropic defines pass@k as the chance of at least one success in k attempts and pass^k as the chance that all k trials succeed. With a 75% per-trial rate, pass^3 is 0.75^3 ≈ 42%. As k grows, pass@k approaches 100% while pass^k approaches 0%. Use pass^k when consistency matters, which "especially matters for customer-facing agents." Anthropic recommends multiple trials per task because outputs vary, and notes per-task success can differ widely (90% on one task, 50% on another). It does not specify a trial count. ([Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents))
- Wilson score interval formula and recommendation: the symmetric normal (Wald) interval is unreliable when failures or n are small; the Wilson interval "performs well across virtually all combinations of n and p" (citing Agresti and Coull); the exact binomial method is the conservative alternative. ([NIST/SEMATECH e-Handbook, 7.2.4.1](https://www.itl.nist.gov/div898/handbook/prc/section2/prc241.htm))

### Computed numbers (from the NIST Wilson formula and the exact binomial; computed in this session)

Lower bound on the true pass rate when every run passes:

| Runs, all accepted | Wilson 95% one-sided LB | Wilson 95% two-sided LB | Exact (Clopper-Pearson) 95% one-sided LB |
|---|---|---|---|
| 2 | 0.43 | 0.34 | 0.22 |
| 5 | 0.65 | 0.57 | 0.55 |
| 10 | 0.79 | 0.72 | 0.74 |
| 20 | 0.88 | 0.84 | 0.86 |
| 30 | 0.92 | 0.89 | 0.90 |
| 50 | 0.95 | 0.93 | 0.94 |

Minimum runs needed for the 95% lower bound to clear 0.90, by number of failures observed:

| Failures | Wilson one-sided | Wilson two-sided | Exact one-sided |
|---|---|---|---|
| 0 | 25 | 35 | 29 |
| 1 | 42 | 53 | 46 |
| 2 | 58 | 69 | 61 |
| 3 | 72 | 84 | 76 |
| 5 | 100 | 113 | 103 |

- The zero-failure exact result matches the "rule of three": with n trials and no failures, the 95% upper bound on the failure rate is about 3/n, so n = 30 bounds failures at about 10%.
- Two-sided Wilson 95% intervals for common observed results: 9/10 gives [0.60, 0.98]; 18/20 gives [0.70, 0.97]; 19/20 gives [0.76, 0.99]; 27/30 gives [0.74, 0.97]; 45/50 gives [0.79, 0.96]; 90/100 gives [0.83, 0.95]. An observed 90% never proves a 90% floor; it proves something lower.
- Probability of seeing 2/2 passes if the true rate were only 50% is 25%; if 70%, 49%. Probability of 10/10 if the true rate were 80% is about 11%.
- pass^k at a true per-run rate of 0.9: pass^2 = 0.81, pass^3 = 0.73, pass^5 = 0.59, pass^10 = 0.35. So "90% per draft" still means roughly two in three chances of at least one rejected draft across five sections.
- Power check (Wilson one-sided, claim LB above 0.9): if the true rate is 0.97, a 30-run test clears the bar only about 40% of the time, 50 runs about 56%, 100 runs about 92%. If the true rate is 0.99, 50 runs clear it about 91% of the time. A process that is truly "about 92%" will almost never be provable as "at least 90%" with small n.

### Inferences
- "90% confidence" and "90% pass rate" are different statements and must not be blurred. The honest claim shape is: "Across N independent drafts, X were accepted; the 95% lower bound on the acceptance rate is L." For Chadwick's volume (a few case studies, perhaps 10 to 20 sections), a statistically defended "at least 90%" is not reachable from real drafts alone. Options: (a) state the observed record with its interval, for example "19 of 20 accepted, 95% interval 76% to 99%"; (b) generate repeated drafts of the same sections to raise n (but these runs share inputs so they measure run to run variance on those sections, not generalisation to new sections); (c) lower the confidence level and say so (for example 80% confidence).
- Runs need to be independent: fresh sessions, the same frozen process version and a spread of section types. Twenty retries of one easy section overstate reliability for hard sections; Anthropic's 90%-vs-50% per-task spread suggests reporting per section type.
- Every change to the process resets the count for a strict claim, because the measured thing changed. Keep a fixed test set so before and after can be compared on the same inputs.

### Gaps
- I found no published run to run variance numbers specifically for Claude models on long-form writing at default temperature. The non-determinism studies use accuracy on classification and QA tasks; long-form writing variance is likely larger (Atil et al. found longer outputs less stable) but that is inference.
- tau-bench exact pass^1 and pass^8 values beyond the abstract's "<50%" and "<25%" were not retrieved.

## Error analysis loops: open coding, failure taxonomies, iterating against a fixed test set

### Takeaway
The established practice is to read outputs before writing criteria: free-text notes on each failure (open coding), cluster them into a failure taxonomy with counts (axial coding), fix the top category, rerun on a fixed set and repeat until new outputs stop revealing new failure types. Criteria will change as you read; that is expected and is the reason criteria come after observation.

### Cited Findings
- Open coding: a domain expert writes free-text notes on traces; annotate at least 30 yourself before asking an AI for suggestions. Axial coding: group notes into a failure taxonomy and count failures per category, described as "the most important step." Repeat until "theoretical saturation," when new traces stop revealing new failure modes. Do not write a rubric first. ([Hamel Husain, LLM Evals FAQ](https://hamel.dev/blog/posts/evals-faq/))
- Volume guidance from the same FAQ: minimum viable is about 30 minutes reviewing 20 to 50 outputs after any significant change; a working pool is roughly 100 diverse traces ("review at least 100 traces"); the authors report spending "60-80% of our development time on error analysis and evaluation." ([Hamel Husain, LLM Evals FAQ](https://hamel.dev/blog/posts/evals-faq/))
- A single domain expert as "benevolent dictator" of quality is recommended for small teams; "If you feel like you need five subject matter experts to judge a single interaction, it's a sign your product scope might be too broad." ([Hamel Husain, LLM Evals FAQ](https://hamel.dev/blog/posts/evals-faq/))
- Shankar et al. name "criteria drift": users need criteria to grade outputs, but grading outputs is how they discover their criteria. Some criteria could not be defined before seeing outputs, which challenges any approach that assumes evaluation can be specified independently of observing model output. ([Shankar et al., Who Validates the Validators?, arXiv 2404.12272](https://arxiv.org/pdf/2404.12272))
- Anthropic: "20-50 simple tasks drawn from real failures is a great start"; start from manual checks you already run and from reported failures; "You won't know if your graders are working well unless you read the transcripts"; failures "should seem fair." Capability evals that reach high pass rates can graduate into regression suites. Grading bugs can hide good performance: Opus 4.5 scored 42% on CORE-Bench until rigid grading and ambiguous specs were fixed, then 95%. ([Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents))
- Anthropic docs: success criteria should be specific, measurable, achievable and relevant; most uses need several criteria at once; evals should mirror the real task distribution including edge cases and ambiguous cases "where even humans would find it hard to reach an assessment consensus"; "More questions with slightly lower signal automated grading is better than fewer questions with high-quality human hand-graded evals." ([Anthropic docs, Define success criteria and build evaluations](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md))

### Inferences
- Applied loop for the case study process: (1) freeze the process version; (2) run it on a fixed set of section briefs that spans the hard cases (sections with thin evidence, sections that tempt borrowing Mondai framing, sections needing numbers); (3) Chadwick marks each draft accept / reject and writes one line on why; (4) cluster the "why" lines into a taxonomy with counts; (5) change the process to target the largest category; (6) rerun the same set and compare counts. The taxonomy becomes the binary checklist in the first section.
- Chadwick is the benevolent dictator by definition; inter-rater agreement is not the issue. His own consistency over time is (criteria drift), so the definition of "small edits" should be written down and revised explicitly when it moves.

### Gaps
- No published error analysis case study for personal or portfolio writing pipelines was found; the practice literature is from product teams.

## LLM-as-judge agreement with humans on writing quality; position and verbosity bias; mitigation

### Takeaway
Strong LLM judges match crowd or general human preferences at roughly human-human levels on chat tasks, but agreement drops on expert-level writing judgment, sometimes to near zero. Judges show position, length and self-preference biases. An LLM judge can be used to pre-screen checklist items, only after it is validated against the expert's own labels with TPR and TNR, and it should not be the source of the headline acceptance rate.

### Cited Findings
- MT-Bench: GPT-4 pairwise agreement with humans was 85% excluding ties versus 81% human-human; with ties 66% versus 63%. Single-answer grading reached 85%. ([Zheng et al., Judging LLM-as-a-Judge, arXiv 2306.05685](https://arxiv.org/html/2306.05685v4))
- Position bias (consistency when answer order is swapped): GPT-4 65.0% consistent (30% biased to first), GPT-3.5 46.2%, Claude-v1 23.8% (75% biased to first). Few-shot prompting raised GPT-4 to 77.5% and Claude-v1 to 63.7%. Swapping positions and only counting consistent wins is the standard mitigation. ([Zheng et al., arXiv 2306.05685](https://arxiv.org/html/2306.05685v4))
- Verbosity bias ("repetitive list" attack): failure rate 91.3% for Claude-v1 and GPT-3.5, 8.7% for GPT-4. Self-enhancement: GPT-4 favoured itself by about 10 points, Claude-v1 by about 25, though the authors call their data too limited to confirm. Reference-guided grading cut math judging failures from 70% to 15%. ([Zheng et al., arXiv 2306.05685](https://arxiv.org/html/2306.05685v4))
- Expert creative writing: in TTCW, three LLMs (including GPT-4 and Claude) used as assessors showed correlations with expert judgments "close to zero"; "none of the LLMs positively correlate with the expert assessments." ([Chakrabarty et al., arXiv 2309.14556](https://arxiv.org/html/2309.14556v2))
- LitBench (EACL 2026): the best off-the-shelf judge, Claude 3.7 Sonnet, reached 73% agreement with human pairwise story preferences; trained reward models reached 78%. (Secondary summary via search; primary not opened.) ([LitBench summary, Emergent Mind](https://www.emergentmind.com/topics/litbench))
- JUDGE-BENCH (20 NLP datasets, 11 LLMs, ACL 2025): substantial variance across models and datasets; reliability depends on the property evaluated, the expertise of the human judges and whether text is human or model written; LLMs "should be carefully validated against human judgments before being used as evaluators." ([Bavaresco et al., ACL 2025](https://aclanthology.org/2025.acl-short.20))
- Eugene Yan's review: G-Eval averaged Spearman 0.514 with humans; one summarisation study found human-human correlation 0.8 to 0.9 versus LLM-human 0.3 to 0.6; LLM evaluators correlated better with non-expert than expert annotators; raw agreement overstates alignment (80% raw agreement corresponded to kappa 0.62), so report kappa; GPT-3.5 caught over 95% of consistent summaries but only 30% to 60% of inconsistent ones. Pairwise beats direct scoring for subjective criteria; direct scoring suits objective criteria. ([Eugene Yan, LLM-Evaluators](https://eugeneyan.com/writing/llm-evaluators/))
- Validation protocol: label 100 to 200 examples per failure mode, at least 50 pass and 50 fail when debugging a judge; split about 10 to 20% train (few-shot), 40 to 45% dev, 40 to 45% held-out test; report TPR and TNR separately; one judge per failure type rather than one overall quality judge. ([Hamel Husain, LLM Evals FAQ](https://hamel.dev/blog/posts/evals-faq/))
- Anthropic: calibrate model graders against human experts; give the judge an "Unknown" escape hatch; grade each dimension with an isolated judge; use deterministic code checks where possible, LLM graders where needed and humans sparingly. Docs: use a different model to grade than the one that generated the output. ([Anthropic, Demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents); [Anthropic docs](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md))

### Inferences
- For Chadwick's process: mechanical rules (em dashes, Oxford commas, colleague names, unmarked numbers) should be code checks, not LLM judgments. Evidence tracing ("does this claim appear in reference/") is an LLM-judge candidate with a reference, which is where judges perform best. "Would Chadwick accept this" is an expert taste judgment, where the evidence says LLM judges are weakest; it should stay with him.
- A Claude judge grading Claude drafts risks self-preference. Use isolated per-criterion binary judges, a different model where practical and validate each against his own accept/reject labels before trusting it.
- With only tens of labelled drafts, a judge's TPR/TNR estimates will themselves have wide intervals (same Wilson arithmetic applies), so judge validation is also small-n.

### Gaps
- Exact Claude-family agreement numbers with expert editors on nonfiction or portfolio prose were not found. LitBench figure is from a secondary summary.

## Anthropic's guidance on defining success criteria and building evals

### Takeaway
Anthropic's guidance is to define specific, measurable, achievable, relevant success criteria before iterating, build task-specific evals that mirror real inputs including edge cases, prefer automated grading and volume, run multiple trials because outputs are non-deterministic, choose pass@k or pass^k by whether consistency matters and calibrate LLM graders against human experts by reading transcripts.

### Cited Findings
- Success criteria must be specific ("Instead of 'good performance,' specify 'accurate sentiment classification'"), measurable (quantitative metrics or well-defined qualitative scales, for example "Less than 0.1% of outputs out of 10,000 trials flagged for toxicity"), achievable (grounded in benchmarks, prior experiments or expert knowledge) and relevant. Most use cases need multidimensional criteria (example: F1 at least 0.85, under 0.5% toxic outputs, 95% of responses under 200ms). ([Anthropic docs](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md))
- Eval principles: task-specific with edge cases; automate where possible; prioritise volume over hand-graded quality. ([Anthropic docs](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests.md))
- Agent eval post: multiple trials per task; pass@k versus pass^k definitions; 20 to 50 tasks from real failures to start; isolated per-dimension judges; reference solution per task that passes all graders; balanced sets where a behavior should and should not occur; grade outcomes not exact paths; read transcripts. ([Anthropic, Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents))

### Inferences
- A measurable definition fitting Anthropic's template: "On a fixed set of N section briefs covering all case study section types, at least 90% of drafts produced by process version V are accepted by Chadwick with edits limited to [defined threshold], and 100% pass the mechanical checklist." Report the observed rate with its Wilson 95% interval, and pass^k per case study (all sections accepted) separately.
- Proposed test plan that does not overclaim: Phase 1, error analysis on 20 to 30 drafts to build the failure taxonomy and checklist (no reliability claim yet). Phase 2, freeze the process and run at least 30 fresh, independent drafts across section types; zero rejections supports "at least 90% with about 95% confidence" (exact one-sided), one rejection needs about 46 runs. Phase 3, any process change reruns the fixed set as a regression check and resets the strict claim. Until Phase 2 completes, the honest statement is the observed count plus interval, not "90%."

### Gaps
- The Anthropic docs page was read only to roughly 100k of 137k characters; its later sections on human grading and detailed LLM-grading tips (reason before scoring, detailed rubrics) were not captured verbatim here.
