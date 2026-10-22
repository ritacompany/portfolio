# LLM self-verification and self-correction without external feedback: what the evidence says

Current as of October 2026. Items marked (not re-fetched) are cited from the paper's known abstract but were not re-checked in this pass. Treat their numbers as unverified.

## 1. Core negative results: Huang 2023, Kamoi 2024, Kambhampati group, Tyen 2023

### Takeaway
When a model critiques its own reasoning or plans with no outside signal ("intrinsic" self-correction), accuracy stays flat or drops. The bottleneck is *finding* the error, not fixing it. Gains reported in earlier papers mostly came from oracle labels, external verifiers, weak initial prompts, or plain resampling.

### Cited Findings
- **Huang et al. (ICLR 2024, arXiv Oct 2023), "LLMs Cannot Self-Correct Reasoning Yet."** Intrinsic self-correction, prompted to "review your answer," lowers accuracy. GPT-3.5: GSM8K 75.9 → 75.1 → 74.7 (rounds 1 and 2), CommonSenseQA 75.8 → 38.1 → 41.8, HotpotQA 26.0 → 25.0 → 25.0. GPT-4: GSM8K 95.5 → 91.5 → 89.0, CSQA 82.0 → 79.5 → 80.0, HotpotQA 49.0 → 49.0 → 43.0. [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- Huang et al.: the earlier "gains" relied on oracle labels that tell the model when to stop. With oracle stopping, GPT-3.5 GSM8K goes 75.9 → 84.3 and GPT-4 HotpotQA 49.0 → 59.0. The authors say these numbers only show what an oracle can do. [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- Huang et al.: when the model does change an answer, it more often turns a correct answer wrong than the reverse. The authors' diagnosis: "LLMs cannot properly judge the correctness of their reasoning." [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- Huang et al.: multi-agent debate does no better than self-consistency at the same number of responses. On GSM8K, debate scores 83.2 with 6 responses against 85.3 for self-consistency, and 83.0 with 9 against 88.2. The gain comes from consistency across samples, not from critique. [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- Huang et al.: on CommonGen-Hard, Self-Refine's gain (44.0 → 67.0) came from an underspecified first prompt. With a better first prompt, standard prompting scores 81.8 and self-correction drops it to 75.1. [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- **Kamoi et al. (TACL 2024, vol. 12, pp. 1417 to 1440), critical survey.**
  - No surveyed work shows successful self-correction from prompted LLM feedback, "except for studies in tasks that are exceptionally suited for self-correction."
  - Self-correction does work when reliable external feedback is available, and after large-scale fine-tuning.
  - Many studies used unfair setups: weak first prompts, oracle information or vague research questions.

  [arXiv 2406.01297](https://arxiv.org/abs/2406.01297)
- **Stechly, Valmeekam and Kambhampati, "On the Self-Verification Limitations of LLMs on Reasoning and Planning Tasks" (arXiv Feb 2024, rev. Aug 2024).** GPT-4, 100 instances per domain, accuracy %:
  - Game of 24: 5 with standard prompting, 3 with self-critique (LLM+LLM), 36 with a sound verifier giving binary feedback, 38 with first-error feedback.
  - Graph Coloring: 16 standard, 2 self-critique, 38 sound verifier.
  - Blocksworld: 40 standard, 55 self-critique, 87 with first-error feedback, 83 with all errors.
  - Mystery Blocksworld: 4 standard, 0 self-critique, about 8 with a sound verifier.

  [arXiv 2402.08115](https://arxiv.org/html/2402.08115v2)
- Same paper: plain resampling with a sound verifier recovers most of the benefit. With k=15 samples it scores 28 on Game of 24, 40 on Graph Coloring and 68 on Blocksworld. With k=25 it scores 42, 44 and 72. Self-consistency (majority vote) barely helps (6, 14, 42). [arXiv 2402.08115](https://arxiv.org/html/2402.08115v2)
- Same paper, GPT-4 verifying its own outputs. On Graph Coloring it rejects 95.8% of the correct ones (113/118) and accepts 6.5% of the wrong ones (25/382). On Mystery Blocksworld it rejects 97.1% (100/103) and accepts 0.5% (2/397). On Blocksworld it accepts 18.55% of the wrong ones. The table labels these FNR and FPR; the meanings are inferred from the denominators. [arXiv 2402.08115](https://arxiv.org/html/2402.08115v2)
- **Valmeekam, Marquez and Kambhampati (arXiv Oct 2023), "Can LLMs Really Improve by Self-critiquing Their Own Plans?"** Self-critique "appears to diminish plan generation performance" compared with an external sound verifier (VAL). The LLM verifier gives "a notable number of false positives," and whether the feedback is binary or detailed made little difference. The abstract gives no numbers. [arXiv 2310.08118](https://arxiv.org/abs/2310.08118)
- **Stechly, Marquez and Kambhampati (arXiv Oct 2023), "GPT-4 Doesn't Know It's Wrong."** On graph coloring, GPT-4 is no better at verifying than at solving. What the critique says is "largely irrelevant." The gains come from a correct answer already sitting in the top-k samples, where the external verifier picks it out. [arXiv 2310.12397](https://arxiv.org/abs/2310.12397)
- **Tyen et al. (Findings of ACL 2024), "LLMs cannot find reasoning errors, but can correct them given the error location."** Accuracy at locating the first mistake in a chain-of-thought trace on BIG-Bench Mistake, with direct trace-level prompting: GPT-4 39.8%, GPT-4-Turbo 30.1%, PaLM 2 Unicorn 17.1%, Gemini Pro 16.1%, GPT-3.5-Turbo 10.4%. Step-level prompting lifts GPT-4 to 52.9%. [arXiv 2311.08516](https://arxiv.org/html/2311.08516v3)
- Tyen et al.: given the true error location, backtracking fixes many wrong traces, adding 18 to 44 points across five tasks (+43.9 on tracking shuffled objects). It breaks fewer correct traces, costing 0 to 11 points. A random location helps less and hurts more: Dyck languages +5.2 / −15.9. [arXiv 2311.08516](https://arxiv.org/html/2311.08516v3)
- Tyen et al.: a small fine-tuned classifier (PaLM 2 Otter, trained out-of-domain) beats 3-shot prompting of the larger Unicorn model at finding mistakes on 4 of 5 held-out tasks. On Dyck languages it scores 33.6 against 11.0. The authors say backtracking stays net-positive with a location signal around 60 to 70% accurate, but the exact threshold numbers are only in a figure. [arXiv 2311.08516](https://arxiv.org/html/2311.08516v3)

### Inferences
- For reasoning and planning, self-critique with no outside signal is close to a coin flip on the hardest cases, and it is asymmetric: it falsely rejects correct work and misses wrong work. Where a sound checker exists (tests, solvers, constraint checks, VAL), use it. That is where the measured gains are.
- The detection step is where things fail. Any process that relies on "the model reviews its own plan" needs a separate source of where an error is likely to be.

### Gaps
- Most of the negative results use GPT-3.5/4-era models. Section 6 covers newer 2025 and 2026 evidence, which is mixed.
- I could not extract exact false-positive counts for the Valmeekam 2023 plan-critique paper.

## 2. Self-Refine, Reflexion, CRITIC: external signal or genuine self-critique?

### Takeaway
Most of the gains in these frameworks trace back to an external signal: code execution, environment reward, search results or a weak baseline prompt. CRITIC's own ablation shows that removing the tools removes most of the gain.

### Cited Findings
- **Self-Refine (Madaan et al., arXiv Mar 2023, NeurIPS 2023).** One LLM generates, critiques and refines its own output. It reports "~20% absolute on average" improvement across 7 tasks with GPT-3.5, ChatGPT and GPT-4. [arXiv 2303.17651](https://arxiv.org/abs/2303.17651)
- Huang et al. reran Self-Refine on CommonGen-Hard. Its gain disappears and turns into a loss (81.8 → 75.1) once the first-pass prompt states the requirement explicitly. [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- **Reflexion (Shinn et al., arXiv Mar 2023).** Verbal reflections are stored in episodic memory. It reports 91% pass@1 on HumanEval against 80% for GPT-4. The abstract says the feedback can be "scalar values or free-form language" from "external or internally simulated" sources. [arXiv 2303.11366](https://arxiv.org/abs/2303.11366)
- (not re-fetched) The coding result depends on the model writing unit tests and executing them, so the critique is grounded in interpreter results, not pure introspection. AlfWorld and HotpotQA use environment success signals. [arXiv 2303.11366](https://arxiv.org/abs/2303.11366)
- **CRITIC (Gou et al., ICLR 2024).** Tool-interactive critiquing using search and a code interpreter. ChatGPT with tools compared with "CRITIC w/o Tool":
  - AmbigNQ EM 62.0 vs 55.2
  - TriviaQA EM 75.1 vs 73.5
  - HotpotQA EM 40.3 vs 33.1
  - GSM8K 78.2 vs 77.0

  [arXiv 2305.11738](https://arxiv.org/html/2305.11738v4)
- The CRITIC authors: "exclusive reliance on self-correction without external feedback may yield modest improvements or even deteriorate performance." With text-davinci-003, the no-tool GSM8K variant scored 1.8 points below the program-of-thought baseline. [arXiv 2305.11738](https://arxiv.org/html/2305.11738v4)
- Kamoi et al. classify the reliable-feedback cases (code execution, search, verifiers) as the category where self-correction works. [arXiv 2406.01297](https://arxiv.org/abs/2406.01297)

### Inferences
- When a self-correction paper reports a gain, check for executable tests, retrieval, environment reward, oracle stopping or a weak first prompt. Each of these is an external signal or an unfair baseline, and together they account for most of the published gains.

### Gaps
- I did not verify Self-Refine's per-task breakdown in this pass. Its math (GSM8K) gain is widely reported as near zero, but that is unconfirmed here.

## 3. Chain-of-Verification (CoVe)

### Takeaway
CoVe is the clearest positive case of verification done by the model itself, and it works by separating context. The model answers short verification questions in fresh prompts that cannot see its draft. This roughly doubles list precision and adds about 15 FactScore points on biographies.

### Cited Findings
- **Dhuliawala et al., Findings of ACL 2024 (arXiv Sep 2023).** Four steps: (1) draft, (2) plan verification questions, (3) answer them independently, (4) write the final verified response. [ACL Anthology](https://aclanthology.org/2024.findings-acl.212/); [arXiv 2309.11495](https://arxiv.org/abs/2309.11495)
- Results with Llama 65B:
  - Wikidata list precision: 0.17 few-shot, 0.29 joint, 0.36 two-step, 0.32 factored.
  - Closed-book MultiSpanQA F1: 0.39 baseline, 0.46 joint, 0.48 factored.
  - Biography FactScore: 55.9 few-shot, 60.8 joint, 63.7 factored, 71.4 factor+revise.
  - For comparison from prior work: InstructGPT 41.1, ChatGPT 58.7, PerplexityAI 61.6.

  [ar5iv 2309.11495](https://ar5iv.labs.arxiv.org/html/2309.11495)
- Mechanism: only about 17% of the entities in the baseline lists were correct. When the same model was asked about each entity in a separate short verification question, it answered about 70% correctly. Short, targeted questions are easier than long-form generation. [ar5iv 2309.11495](https://ar5iv.labs.arxiv.org/html/2309.11495)
- Why factored beats joint: in the joint variant, questions and answers sit in the same context as the draft, so the model "can repeat" its own hallucinations. Factored answers exclude the draft, which prevents copying. [ar5iv 2309.11495](https://ar5iv.labs.arxiv.org/html/2309.11495)

### Inferences
- The gain comes from two things. Checking is broken into small questions that are easier than writing the whole answer, and the checker is kept from seeing the author's text. Both carry over to plan review: split the plan into checkable claims and answer each one without showing the plan's reasoning.

### Gaps
- CoVe is tested on factual recall, not on multi-step plans or reasoning. I found no direct replication of CoVe-style factoring on planning tasks.

## 4. Self-consistency, the generation-verification gap and when verifying is easier than generating (2024 to 2026)

### Takeaway
Self-improvement only works where the model is better at checking than at producing, a margin researchers call the generation-verification gap. That gap grows with pretraining compute. On hard combinatorial tasks the gap is about zero or negative for prompted self-verification. Sampling plus majority vote is a strong, cheap baseline that critique loops often fail to beat.

### Cited Findings
- **Song et al., "Mind the Gap" (ICLR 2025, arXiv Dec 2024).** Self-improvement (self-verify, filter, distill) is "largely governed" by the generation-verification gap, and a variant of the gap "scales monotonically with the model pre-training flops." [arXiv 2412.02674](https://arxiv.org/abs/2412.02674)
- Huang et al.: self-consistency with 9 samples scores 88.2 on GSM8K, against 76.7 for a single answer and 83.0 for debate at the same compute. [arXiv 2310.01798](https://arxiv.org/html/2310.01798v2)
- Stechly et al.: on combinatorial tasks, self-consistency barely helps (Game of 24: 5 → 6). Sampling 25 times with a sound verifier reaches 42. So sampling helps only when something reliable picks the winner. [arXiv 2402.08115](https://arxiv.org/html/2402.08115v2)
- Stechly et al. (graph coloring): GPT-4 is "no better" at verifying than at solving, which means a zero gap on that task. [arXiv 2310.12397](https://arxiv.org/abs/2310.12397)
- (not re-fetched) Self-consistency (Wang et al., ICLR 2023) samples diverse reasoning paths and takes the majority answer. It improved GSM8K by +17.9 points over chain-of-thought on PaLM 540B. [arXiv 2203.11171](https://arxiv.org/abs/2203.11171)
- (not re-fetched) Brown et al. 2024, "Large Language Monkeys": with repeated sampling, the chance that at least one sample is correct keeps rising. Without an automatic verifier, majority vote and reward models fail to pick the correct sample once the sample count gets large. [arXiv 2407.21787](https://arxiv.org/abs/2407.21787)

### Inferences
- Verifying is easier than generating when the check breaks into small, local questions (CoVe), when a formal or executable checker exists, or when the verifier is trained for the job (Tyen's classifier). It is not easier when the check needs the same global search the generation needed, as with NP-hard constraint satisfaction and planning in prompted mode.

### Gaps
- I did not fetch Song et al.'s per-task results, such as which tasks show a near-zero gap. Their full paper should be read before claiming specific task boundaries.

## 5. Self-preference and self-enhancement bias in LLM judges

### Takeaway
LLM judges recognize their own text and favor it. The more strongly a model recognizes itself, the more strongly it prefers itself. This undercuts using the same model to grade its own plan.

### Cited Findings
- **Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena" (NeurIPS 2023 D&B).**
  - Self-enhancement: GPT-4 raised its own win rate by about 10% and Claude-v1 by about 25%. The authors caution that they "cannot determine whether the models exhibit a self-enhancement bias" with that data, and GPT-3.5 does not favor itself.
  - Position consistency when answer order is swapped: GPT-4 65.0% (77.5% with few-shot examples), GPT-3.5 46.2%, Claude-v1 23.8%.
  - Verbosity attack failure rate: Claude-v1 and GPT-3.5 91.3%, GPT-4 8.7%.
  - GPT-4 agreed with humans 85% of the time on non-tie votes, against 81% human-human agreement.

  [arXiv 2306.05685](https://arxiv.org/html/2306.05685v4)
- **Panickssery, Bowman and Feng, "LLM Evaluators Recognize and Favor Their Own Generations" (arXiv Apr 2024; the arXiv page does not confirm a venue).**
  - Without fine-tuning, GPT-4 tells its own text apart from that of two other LLMs and humans with 73.5% accuracy. GPT-4's self-preference score is 0.705 on XSUM and 0.912 on CNN/DailyMail.
  - After fine-tuning on 500 examples, GPT-3.5 and Llama 2 recognize their own text with over 90% accuracy.
  - Self-recognition and self-preference are linearly correlated, and controlled experiments support a causal link. Example-level Kendall's τ goes from 0.41 to 0.74 after fine-tuning.

  [arXiv 2404.13076](https://arxiv.org/html/2404.13076)

### Inferences
- A same-model judge has two problems. It shares the author's blind spots, and it is biased toward the author's style. A different model family, or a judge that cannot see the author's phrasing, reduces both problems.

### Gaps
- No numbers in the sources above on whether self-preference applies to plans or structured documents, as opposed to summaries and chat answers.

## 6. Does a fresh context, with no access to the author's reasoning, improve error detection?

### Takeaway
Yes, with conditions. The strongest controlled evidence (CoVe factored vs joint, Self-Correction Bench) shows that hiding the draft or reframing who wrote it raises detection. Newer 2026 preprints confirm that a second review in the same session hurts. A fresh session beats plain same-session review only weakly and not significantly. A different model family helps most.

### Cited Findings
- CoVe: factored verification, which never sees the draft, beats joint verification, which sees it, on every task. On biographies FactScore is 63.7 vs 60.8, and on MultiSpanQA F1 is 0.48 vs 0.46. The reason given is that the joint variant repeats its own hallucinations. [ar5iv 2309.11495](https://ar5iv.labs.arxiv.org/html/2309.11495)
- **Tsui, "Self-Correction Bench" (arXiv Jul 2025; v3 lists acceptance to COLM 2026).** The same error is presented either as the user's or as the model's own. Across 14 open non-reasoning models, the "Self-Correction Blind Spot" is 64.5%: models fix the error when it is attributed to the user and miss it when it is their own. Appending "Wait" cuts the blind spot by 89.3%. Fine-tuning on 5,306 error-correction traces cuts it by 76.0%. [arXiv 2507.02778](https://arxiv.org/abs/2507.02778)
- **Song (single author), "Cross-Context Review" (arXiv Mar 2026, rev. Oct 2026).** 30 artifacts with 150 injected errors.
  - A fresh-session review (F1 28.6%) beats a repeated same-session review (21.7%, Holm-adjusted p=0.004).
  - It does not significantly beat a single same-session self-review (27.1%, p=0.26) or a context-aware subagent (23.8%, p=0.057).
  - v2 withdrew v1's broader claim, which had rested on a single run.

  [arXiv 2603.12123](https://arxiv.org/abs/2603.12123)
- **Tanveer (single author), "Reviewer Capability Governs Rejection Targeting" (arXiv Sep 2026, 100 olympiad math problems, pilot).**
  - Same-model self-review catches the most errors (recall 0.85) but falsely rejects 35% of correct answers, against 2% for a reviewer from a different model family (p=0.000015).
  - Self-review produces no significant accuracy gain. The cross-family reviewer raises accuracy from 52% to 64% (+12 points, p=0.0005).

  [arXiv 2609.04270](https://arxiv.org/abs/2609.04270)
- A 2026 multi-round study reports that repeated independent fresh-context re-review scores worst (F1 0.263), apparently because later reviewers invent findings once the real errors are found. Source seen only through a search summary; not verified. [arXiv 2603.16244](https://arxiv.org/pdf/2603.16244.pdf)
- Tyen et al.: knowing *where* the error is matters more than critique ability. The same model fixes errors well once it is given their location. [arXiv 2311.08516](https://arxiv.org/html/2311.08516v3)

### Inferences
- Hiding the draft works best when the reviewer answers specific questions rather than "find problems." CoVe's gain comes from factored questions, not from an open-ended fresh read.
- Order of preference, supported by the evidence above:
  1. Sound external checker.
  2. Reviewer from a different model family.
  3. Factored verification questions answered without seeing the draft.
  4. Fresh-session review by the same model.
  5. Same-session self-review.
  6. Repeated self-review, which is worst.
- One fresh pass is useful. More rounds add false findings.

### Gaps
- The 2026 fresh-context studies are single-author preprints with small samples: 30 artifacts and 100 problems. No large peer-reviewed replication was found.
- I found no study that isolates "no access to the author's reasoning chain" from "different session" on planning tasks specifically.
- I did not verify the code-migration self-review figure seen in search results (31.7% of behavior-changing outputs missed, Reddy et al., arXiv 2605.21537), so it is left out of the findings.
