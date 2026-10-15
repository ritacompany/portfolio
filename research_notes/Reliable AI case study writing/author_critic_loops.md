# Author/critic, self-refine and reviewer-agent loops for rule-bound long-form writing

Scope note: most hard numbers in this literature come from reasoning, QA, code or short constrained generation. Findings on those tasks are marked INDIRECT. Findings on prose or writing are marked PROSE.

## 1. What do Self-Refine, Reflexion, CRITIC, Constitutional AI style critique, multi-agent debate and LLM-as-judge loops show? Effect sizes.

### Takeaway
Critique loops help reliably only when the feedback carries information the author did not have: a tool result, a test, a fact lookup, a checklist item checked in isolation or a stronger or different model. Same-model "look at your draft and improve it" loops give real but modest gains on fluency and style and can make correctness worse. Multi-agent debate does not beat cheaper sampling once compute is matched.

### Cited Findings
- Self-Refine (one model as generator, critic and refiner, no training) improved task performance by about 20% absolute on average across 7 tasks with GPT-3.5, ChatGPT and GPT-4, judged by humans and automatic metrics. Tasks range from dialogue response to math. Mixed PROSE and INDIRECT. [Madaan et al. 2023, Self-Refine](https://arxiv.org/abs/2303.17651)
- Self-feedback helps on some tasks and hurts on others. Across GPT-4, GPT-3.5, Gemini, LLaMA2, Mixtral and DeepSeek on translation, constrained text generation and math, self-refine improved fluency and understandability but amplified self-bias (the model favoring its own output). Larger models and accurate external feedback reduced the bias and produced real gains. PROSE adjacent (translation and constrained generation). [Xu et al. 2024, Pride and Prejudice: LLM Amplifies Self-Bias in Self-Refinement](https://arxiv.org/abs/2402.11436)
- Intrinsic self-correction (no external feedback) fails and performance "even degrades after self-correction." INDIRECT (reasoning). [Huang et al. 2023/ICLR 2024, LLMs Cannot Self-Correct Reasoning Yet](https://arxiv.org/abs/2310.01798)
- A TACL survey found no prior work showing successful self-correction from prompted-LLM feedback except on tasks unusually suited to it. Self-correction works when reliable external feedback is available or after large-scale fine-tuning. Also flags that many positive studies used unfair setups (for example oracle stop signals). [Kamoi et al. 2024, When Can LLMs Actually Correct Their Own Mistakes?](https://arxiv.org/abs/2406.01297)
- CRITIC: the model verifies parts of its output with external tools (search, code interpreter, toxicity API) then revises. Improves free-form QA, math program synthesis and toxicity reduction; authors conclude external feedback is of "crucial importance." INDIRECT for prose, but the toxicity task is a text attribute check. [Gou et al. 2023, CRITIC](https://arxiv.org/abs/2305.11738)
- Reflexion reaches 91% pass@1 on HumanEval vs 80% for GPT-4 baseline, but the reflection signal comes from executing unit tests, i.e. external ground truth. INDIRECT (code). [Shinn et al. 2023, Reflexion](https://arxiv.org/abs/2303.11366)
- Chain-of-Verification on long-form biographies (Llama 65B): FactScore 55.9 baseline, 60.8 when verification questions are answered in the same context as the draft (joint), 63.7 when each is answered in a separate prompt without the draft (factored), 71.4 with factored plus an explicit cross-check revise step. The paper attributes the joint variant's weakness to the verifier conditioning on the draft and repeating its errors. PROSE (long-form factual). [Dhuliawala et al. 2023, Chain-of-Verification](https://arxiv.org/html/2309.11495)
- DeCRIM (Decompose the instruction into a constraint list, Critic decides which constraints fail, Refine only those): GPT-4 fails at least one constraint on over 21% of real multi-constraint user instructions. DeCRIM raised Mistral by 7.3% on RealInstruct and 8.0% on IFEval with weak feedback; with strong feedback, open models beat GPT-4 on both. PROSE adjacent (real user writing requests with constraints). [Ferraz et al. 2024, DeCRIM](https://arxiv.org/abs/2410.06458)
- Checklist-based critique (TICK/STICK): LLM writes instruction-specific YES/NO checklist, then judges against it. Exact agreement with human preferences rose from 46.4% to 52.2% vs direct scoring; self-refinement with checklists gave +7.8% absolute on LiveBench reasoning; Best-of-N selection with checklists +6.3% on WildBench; human inter-annotator agreement rose 0.194 to 0.256 when humans were given the checklists. Mixed. [Cook et al. 2024, TICK](https://arxiv.org/abs/2410.03608)
- Multi-agent debate on GSM8K: 83.2% vs self-consistency 82.5% at 3 responses, but at matched response counts debate trails (83.2 vs 85.3 at 6; 83.0 vs 88.2 at 9). Gains come from consistency across samples, not correction. INDIRECT. [Huang et al. 2023](https://arxiv.org/pdf/2310.01798) via [summary](https://liner.com/review/large-language-models-cannot-selfcorrect-reasoning-yet)
- Debate protocols do not reliably beat self-consistency or ensembling; they are hyperparameter sensitive. INDIRECT. [Smit et al. ICML 2024, Should we be going MAD?](https://proceedings.mlr.press/v235/smit24a.html)
- Five debate methods across nine benchmarks and four models generally failed to beat Chain-of-Thought, with the gap wider vs compute-matched self-consistency; mixing different models (heterogeneity) consistently improved debate. INDIRECT. [Zhang et al. 2025, Stop Overvaluing Multi-Agent Debate](https://arxiv.org/html/2502.08788v3)
- Constitutional AI uses a model critiquing and revising its own responses against written principles, but as a training-data generator for fine-tuning and RL, not as a runtime loop; its success is evidence for the "large-scale fine-tuning" route Kamoi et al. describe, not for prompted runtime critique. [Bai et al. 2022, Constitutional AI](https://arxiv.org/abs/2212.08073)
- Expert writers agree on a seven-category taxonomy of undesirable LLM prose traits (for example cliches, unnecessary exposition). GPT-4o, Claude 3.5 Sonnet and Llama 3.1 70B showed no clear quality advantage over each other. Automatic LLM editing moved text toward human writing but experts still preferred expert edits. PROSE. [Chakrabarty, Laban and Wu, CHI 2025, Can AI writing be salvaged?](https://arxiv.org/abs/2409.14509)

### Inferences
- The consistent variable across positive results is new information entering the loop: tests (Reflexion), tools (CRITIC), draft-blind verification (CoVe factored), an explicit per-constraint list (DeCRIM, TICK). Plain "review and improve" is the weakest variant.
- For the designer's case, a critic that receives the rule list as a numbered checklist and the draft, and returns per-rule pass/fail with the offending sentence, is the closest analogue to DeCRIM/TICK and is the best-supported model-judgment design. Expected gains in the published work are single-digit to low double-digit percentage points, not a jump from ~70% to 95%.
- Self-Refine's ~20% average is the most optimistic number and comes from short tasks with GPT-4-era models judged partly on preference; it should not be read as a rule-compliance effect size.

### Gaps
- No study found that measures author/critic loops on long-form, multi-section personal or portfolio prose against a large written style guide. Effect sizes for that exact setting are unknown.
- No per-task breakdown for Self-Refine was retrieved (abstract only); the constrained-generation subtask numbers were not verified here.

## 2. Does a same-model critic catch the author's errors, or share blind spots? What helps?

### Takeaway
Same-model critics show measurable self-preference and the self-preference grows with the model's ability to recognize its own text. Fresh context (critic does not see the author's reasoning or, for fact checks, the draft itself), a different or stronger model, binary per-rule checklists and tool-grounded checks each reduce the shared-blind-spot problem. Heterogeneous models help debate too.

### Cited Findings
- LLM evaluators score their own outputs higher than others' when humans rate them equal. GPT-4 and Llama 2 recognize their own outputs at non-trivial accuracy, and self-recognition strength correlates linearly with self-preference bias; controlled experiments support causality. [Panickssery et al. 2024, LLM Evaluators Recognize and Favor Their Own Generations](https://arxiv.org/abs/2404.13076)
- Self-bias appears across all six models, all languages and tasks tested and is amplified by iterative self-refine; mitigated by larger models and accurate external feedback. [Xu et al. 2024](https://arxiv.org/abs/2402.11436)
- GPT-4 as judge reaches over 80% agreement with human preferences, roughly human-human level, but the study documents position bias, verbosity bias and self-enhancement bias. [Zheng et al. 2023, Judging LLM-as-a-Judge with MT-Bench](https://arxiv.org/abs/2306.05685)
- Across 13 judges, only the largest reach reasonable human alignment and still fall well short of inter-human agreement; scores can be off by up to 5 points; judges trend lenient and are sensitive to prompt length and complexity; high percent agreement can hide large score differences. INDIRECT (QA grading). [Thakur et al. 2024, Judging the Judges](https://arxiv.org/abs/2406.12624)
- Fresh-context verification beats in-context verification: CoVe factored (verifier does not see the draft) 63.7 vs joint 60.8 FactScore; the joint verifier repeats the draft's hallucinations. PROSE. [Dhuliawala et al. 2023](https://arxiv.org/html/2309.11495)
- Anthropic: guardrails run as a separate model instance screening output "tends to perform better than having the same LLM call handle both guardrails and the core response." [Anthropic, Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- Model heterogeneity consistently improved multi-agent debate frameworks. INDIRECT. [Zhang et al. 2025](https://arxiv.org/html/2502.08788v3)
- Checklist prompts (instruction-specific YES/NO questions) raise LLM-human agreement 46.4% to 52.2%. [Cook et al. 2024](https://arxiv.org/abs/2410.03608)
- Practitioner guidance: use binary pass/fail per criterion, not 1 to 5 scales; validate the judge against expert labels and report true positive and true negative rates separately because a judge that always passes scores 95% agreement when 5% of cases fail; a production judge reached over 90% expert agreement within three prompt iterations on a balanced set. [Husain, Using LLM-as-a-Judge](https://hamel.dev/blog/posts/llm-judge/)
- Judges tend toward leniency. [Thakur et al. 2024](https://arxiv.org/abs/2406.12624)

### Inferences
- A same-model critic in the same session is the worst case: it shares the author's context, sees the author's justifications and recognizes its own style. A critic in a fresh context with only the rules and the draft removes the first two problems; a different model family removes some of the third.
- Leniency plus rare violations means a critic can look reliable while missing most violations. The designer should measure the critic's catch rate on drafts with known, planted violations, not overall agreement.
- Style and voice rules are where self-preference matters most, because the critic's own taste is the author's taste. Fact and rule rules (no names, no quotes, evidence tags) are more checkable and less exposed.

### Gaps
- No direct head-to-head found of same-model vs cross-model critic on rule compliance in long-form prose. Claude-specific self-preference numbers were not found.

## 3. Instruction following under many simultaneous constraints

### Takeaway
Compliance falls steadily as constraints accumulate. Frontier models reliably hold about three constraints at once on FollowBench, drop to about 62% hard satisfaction at five, and the best models reach only 68% at 500 simultaneous simple instructions. Earlier instructions are followed better than later ones, and multi-turn sessions lose about 39% of performance through unreliability. Decomposing rules into a list and verifying each one separately is the best-supported fix.

### Cited Findings
- FollowBench hard satisfaction rate (all constraints met) for GPT-4-Preview-1106 by number of constraints: 84.7% (1), 75.6% (2), 70.8% (3), 73.9% (4), 61.9% (5). GPT-3.5-Turbo: 80.3, 68.0, 68.6, 61.1, 53.2. Consistent satisfaction level about 3.3 constraints for GPT-4; authors conclude top models are "limited to following instructions with about three constraints." PROSE adjacent (content, situation, style, format, example constraints). [Jiang et al. 2023, FollowBench](https://arxiv.org/html/2310.20410)
- IFScale: 500 keyword-inclusion instructions inside a business report writing task, 20 models from seven providers; best frontier models reach 68% accuracy at 500 instructions; three distinct degradation patterns tied to model size and reasoning ability; bias toward earlier instructions (primacy). PROSE (report writing). [Jaroslawicz et al. 2025, How Many Instructions Can LLMs Follow at Once?](https://arxiv.org/abs/2507.11538)
- RealInstruct: GPT-4 misses at least one constraint on over 21% of real multi-constraint user requests. [Ferraz et al. 2024](https://arxiv.org/abs/2410.06458)
- ComplexBench: 4 constraint types, 19 dimensions, 4 composition types; finds "significant deficiencies" in handling composed constraints; its evaluator augments LLM judges with rules for each constraint and combines scores along the composition structure. [Wen et al. 2024, ComplexBench](https://arxiv.org/abs/2407.03978)
- IFEval restricts itself to "verifiable instructions" (for example word counts, keyword mentions) so compliance can be checked by program rather than model judgment; 25 instruction types, about 500 prompts. [Zhou et al. 2023, IFEval](https://arxiv.org/abs/2311.07911)
- Information in the middle of long contexts is used less reliably than at the beginning or end (U-shaped performance). INDIRECT (retrieval QA). [Liu et al. 2023, Lost in the Middle](https://arxiv.org/abs/2307.03172)
- Across 200,000+ simulated conversations and six generation tasks, every top model performed on average 39% worse multi-turn than single-turn; capability dropped slightly but unreliability rose sharply; models commit early to assumptions and "do not recover." [Laban et al. 2025, LLMs Get Lost in Multi-Turn Conversation](https://arxiv.org/abs/2505.06120)
- Decompose then per-constraint critique (DeCRIM) adds 7.3 to 8.0 points for an open model; checklist self-refinement adds 7.8 points. [Ferraz et al. 2024](https://arxiv.org/abs/2410.06458); [Cook et al. 2024](https://arxiv.org/abs/2410.03608)

### Inferences
- The designer's rule set (evidence tags, no quotes, no colleague names, term order, voice pass, plus process steps) is well beyond the ~3 constraint reliable range. Skipped steps and violated written rules are the expected baseline behavior, not a sign of bad prompting.
- Primacy and lost-in-the-middle together suggest rules buried mid-document in long rule files will be followed least. Long sessions add the multi-turn unreliability penalty on top.
- Putting all rules in the author prompt and hoping is the configuration the benchmarks measure at roughly 60 to 75% full compliance. Reaching 90%+ requires moving checking out of the author's single pass: per-rule verification by a fresh critic, and code for anything code can check.

### Gaps
- No benchmark measures compliance with process rules (do step A before step B, run a voice pass) as opposed to output constraints. Ordering rules such as "introduce product terms in a set order" have no direct benchmark found.

## 4. Deterministic checks versus model judgment for rule enforcement

### Takeaway
Wherever a rule can be expressed as a pattern or lookup, a script is the more reliable enforcer: benchmarks themselves switch to programmatic verification for exactly this reason, and every positive self-correction result depends on an external, accurate signal. Model judges are lenient, biased and need calibration, so they should be reserved for rules that resist code.

### Cited Findings
- IFEval was built around programmatically verifiable instructions to avoid the bias and cost of model or human grading. [Zhou et al. 2023](https://arxiv.org/abs/2311.07911)
- ComplexBench augments LLM evaluators with rules because LLM judgment alone was insufficient for verifying constraint satisfaction. [Wen et al. 2024](https://arxiv.org/abs/2407.03978)
- Self-correction succeeds with reliable external feedback and is unproven with prompted-LLM feedback alone. [Kamoi et al. 2024](https://arxiv.org/abs/2406.01297)
- Reflexion and CRITIC gains come from executed tests and tool calls. INDIRECT. [Shinn et al. 2023](https://arxiv.org/abs/2303.11366); [Gou et al. 2023](https://arxiv.org/abs/2305.11738)
- "Accurate" external feedback is what reduced self-bias in self-refine. [Xu et al. 2024](https://arxiv.org/abs/2402.11436)
- Practitioner guidance: catch what you can with code assertions first; write a test for each fixed error; build specialized LLM judges only for what remains, validated against expert labels. [Husain, Using LLM-as-a-Judge](https://hamel.dev/blog/posts/llm-judge/)
- Anthropic: agents should gain "ground truth" from the environment at each step; coding suits agents because solutions are verifiable through automated tests. [Anthropic, Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- LLM judges are lenient and can be off by up to 5 points while showing high percent agreement. [Thakur et al. 2024](https://arxiv.org/abs/2406.12624)

### Inferences
- Rules in the designer's set split cleanly. Code-checkable: quotation marks or quote patterns; a denylist of colleague names; em dash and double hyphen; Oxford comma pattern; presence of an evidence tag (CONFIRMED, ESTIMATE, etc.) on every numeric claim; first-occurrence order of a fixed list of product terms. Partly checkable with a script plus lookup: every claim has a reference path that exists in `reference/`. Model judgment only: whether the claim actually matches the evidence, voice, writing for a stranger.
- A deterministic linter run as a gate (hook or required step) gives near-100% compliance on the rules it covers, because it does not depend on the model remembering to run it. That converts a large share of the rule list out of the probabilistic regime entirely.
- Precision matters: regex for names or quotes can false-positive (for example product nouns that are also names). A false-positive-tolerant check that flags for human review is safer than one that silently blocks.

### Gaps
- No published reliability numbers found comparing regex/linter enforcement to LLM-judge enforcement on the same prose rules. The near-100% claim for deterministic checks is an inference from their nature, not a measured result.

## 5. Practical guidance from Anthropic, OpenAI and practitioners on evaluator-optimizer patterns

### Takeaway
Vendors recommend evaluator-optimizer loops only when evaluation criteria are clear and feedback demonstrably improves output, recommend separate instances for checking, and lean on ground-truth signals and tests. Practitioners add: binary per-criterion judges, code assertions first, and measuring the judge itself.

### Cited Findings
- Evaluator-optimizer "is particularly effective when we have clear evaluation criteria," and fits when human-articulated feedback demonstrably improves output and an LLM can give similar feedback. Examples given: literary translation, multi-round search. [Anthropic, Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- Same post: separate screening instance beats one call doing both; parallel voting with several different prompts reviewing the same artifact, with tunable thresholds to trade false positives against false negatives; agents risk "compounding errors"; human review remains crucial even with automated tests. [Anthropic, Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents)
- Binary pass/fail with written critiques; separate TPR and TNR; 30 to 50 examples per label; about 100 examples per failure mode for validation; re-validate after model changes. [Husain, Using LLM-as-a-Judge](https://hamel.dev/blog/posts/llm-judge/)
- Self-correction study design pitfalls (oracle stopping, weak baselines) inflate reported gains; evaluate against a fair baseline. [Kamoi et al. 2024](https://arxiv.org/abs/2406.01297); [Zhang et al. 2025](https://arxiv.org/html/2502.08788v3)

### Inferences
- A defensible architecture for 90%+ on the checkable rules: (1) author drafts with a short, prioritized rule set rather than the full file; (2) deterministic linter runs automatically and blocks on hard rules; (3) a fresh-context critic, ideally a different model or at least a new session with no author reasoning, gets the numbered rule list and the draft and returns per-rule PASS/FAIL with the offending text; (4) author revises only the flagged items (DeCRIM pattern); (5) human reviews judgment rules. Loop cap of 1 to 2 rounds, since gains concentrate in the first pass and self-bias grows with iteration.
- For evidence tracing specifically, the CoVe factored pattern applies: for each claim, a separate check that looks up the reference file without seeing the draft's framing, then a cross-check.
- Expect model-judged rules (voice, "write for a stranger") to stay well below 90% even with this setup, and keep the human as the final gate there.

### Gaps
- No OpenAI cookbook page on evaluator-optimizer for writing was retrieved in this pass; OpenAI guidance is not represented here.
- No source quantifies how much a fresh-context critic improves over an in-session critic on prose rule compliance; the CoVe factored result (about +3 FactScore over joint, +11 with revise) is the closest proxy.
