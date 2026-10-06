# Why working with the assistant has required so much supervision

Research date: 2 October 2026, America/Chicago.

## Conclusion

The complaint extends beyond editorial quality. The observed failure is maintaining and executing the user's actual objective across corrections. In this conversation, the assistant sometimes understood a correction well enough to explain it but did not carry that understanding into the next useful action. During the investigation it repeated the same pattern: it narrowed a broad diagnostic request to instruction tests, completed those tests and treated that narrower result as sufficient.

External evidence makes this a credible product and model reliability concern. OpenAI documents early stopping in Astra. Multiple public reports describe closely matching supervision costs. Research distinguishes performance on fully specified tasks from reliable collaboration across turns. None establishes a single root cause for this account or a universally effective fix.

Recommendation: stop accumulating permanent instructions in response to these failures. For the next editorial attempt, use a clean task with GPT-5.6 Sol at High as a bounded comparison against Astra, with the same permitted source and substantive requirements. This is a candidate workaround, not a demonstrated superior writing model. A different model is more informative than switching only the Codex/Work interface, since those products share core capabilities. Do not move all work, remove skills or change global settings on the strength of this research.

## What was researched

The investigation combined current official product documentation, firsthand reports in OpenAI's public Codex issue tracker, primary research papers and the local record of this chat. Public searches did not include the portfolio copy or raw personal notes. No issue was submitted and no product setting was changed. The OpenAI Docs skill provided the official product baseline; the user's broader research request also called for examining firsthand reports and research outside those documentation domains.

Evidence categories below are deliberately separate. An issue report is evidence that someone reported a matching experience, not a confirmed engineering diagnosis. Research on older models and simulated tasks establishes a relevant failure class, not Astra's measured performance on portfolio writing.

## Findings

### 1. Astra's tendency to stop early is documented by OpenAI

OpenAI's current model guide says Astra may stop where a user expects reasonable assumptions and persistence. Its September 11 guidance also says Astra can return after an initial implementation while work remains, and can interpret boundaries more conservatively than earlier models. This supports early stopping as a plausible model contribution. It does not establish that Chadwick's instructions caused these failures. [Model behavior guidance](https://developers.openai.com/api/docs/guides/latest-model?model=gpt-6-astra), [September 11 guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra).

The local record already contains explicit requests to produce results and continue. Therefore repeating that advice as though the user had never given it would not address the evidence.

### 2. Other users report the same broader supervision problem

In issue 42937, opened September 5, the reporter describes both GPT-5.6 Sol and Astra correctly restating goals but failing to reach complete delivery. They report scope substitution and acknowledgments that do not reliably change subsequent actions. The report explicitly distinguishes coding-agent completion failures from related reasoning problems in ordinary ChatGPT. It is a firsthand account, not a controlled product comparison. [Issue 42937](https://github.com/openai/codex/issues/42937).

Issue 43329, opened September 7, describes Astra High narrating work, stopping prematurely and reporting partial work as complete. The reporter observed similar behavior through three Codex clients. This is a close behavioral match, but does not prove a server-side cause. The author's load and routing hypotheses remain unverified. [Issue 43329](https://github.com/openai/codex/issues/43329).

Issue 43485, also opened September 7, distinguishes competent execution from poor problem discovery. Its author reports Astra staying within a misleading framing while GPT-5.6 Sol used new evidence to revise it. The comparison was not isolated: Sol could inspect diagnostic artifacts Astra had produced. It supports testing this distinction, not declaring Sol generally superior. [Issue 43485](https://github.com/openai/codex/issues/43485).

The fetched issue pages were open. No verified resolution or applicable fix was established from the pages inspected. A model-behavior label is not confirmation of the reporter's explanation.

### 3. Better reasoning on a task does not guarantee better collaboration

Laban and colleagues found that tested models made early assumptions and became overly dependent on earlier answers in simulated multi-turn tasks. Their study reported a substantial reliability gap between receiving all requirements together and receiving them through conversation. It predates Astra and uses constrained simulations, so its numerical results cannot be applied to this chat. It nevertheless supplies a relevant explanation to test: an assistant may keep developing its own interpretation after the user has corrected it. [LLMs Get Lost in Multi-Turn Conversation](https://arxiv.org/html/2505.06120v1).

A July 2026 preprint explicitly tests revealed requirements, revisions and task switches. It finds that strong single-turn results do not reliably transfer to evolving intent. Its controls distinguish changed intent from merely adding turns, and its GPT-5.1 reasoning comparison does not show a general recovery from extra reasoning. Astra was not tested. This supports treating goal tracking as a separate capability, not treating High as a guarantee. [LLMs Get Lost in Evolving User Intent](https://arxiv.org/html/2607.20734v1).

A February 2026 preprint argues that some failures arise from interpretation mismatches rather than missing memory alone. It tests an intermediary that reconstructs user intent before execution. This is a proposed research approach tested on other models, not a reason to install another agent or tell Chadwick to formalize every conversational correction. [Intent Mismatch Causes LLMs to Get Lost in Multi-Turn Conversation](https://arxiv.org/html/2602.07338v1).

Applied to this chat, the plausible interpretation is that the assistant repeatedly completed the task it had inferred rather than the task the user was still pursuing. That interpretation fits both the editorial failures and the overly narrow investigation. It is a behavioral diagnosis, not access to the model's internal cause.

### 4. Self-review can preserve a mistaken premise

A 2024 critical survey finds that self-correction results depend strongly on task and feedback source. It warns about evaluations that overstate success and finds more dependable results where reliable external feedback is available. It does not establish that present-day models cannot self-correct or that an editorial pass is useless. [TACL self-correction survey](https://aclanthology.org/2024.tacl-1.78/).

There is direct local evidence of an evaluation problem. The earlier About review required each version to express familiarity, a departure and a cost. That was the assistant's proposed framing. Its checks then rewarded drafts for satisfying that framing rather than establishing whether the addition belonged in the About. A style pass could preserve factual claims while leaving that larger editorial mistake intact. See the [original gates](/Users/chadwickfenner/Code/portfolio/.unlazy/2026-09-27-about-options/GATES.md) and [review](/Users/chadwickfenner/Code/portfolio/.unlazy/2026-09-27-about-options/review.md).

The practical distinction is between improving wording and reconsidering what the writing should say. The former cannot substitute for the latter.

### 5. Compaction is a candidate contributor, not a complete explanation

A September 4 issue reports stopping after automatic compaction with an experimental context-management feature enabled on GPT-5.6 Sol. Another September report concerns delegated task instructions losing precedence. Those specific configurations and workflows differ from this conversation. [Issue 42693](https://github.com/openai/codex/issues/42693), [Issue 42131](https://github.com/openai/codex/issues/42131).

Read-only inspection of the local chat record found:

- Earlier work is recorded as GPT-5.6 Terra Medium. Later rejected drafts and stopping replies are recorded as GPT-6 Astra High. This is not evidence of an undisclosed model downgrade.
- At line 111 of the September 27 rollout segment, the assistant acknowledged that it had made ordinary UX practice the subject of all three versions. It recommended examining the progression, then ended without doing that work.
- The first recorded compaction in that segment is at line 133, after that reply. Compaction therefore cannot explain the initial editorial misframing or that earlier stopping reply by itself.
- The replies at lines 167 and 198 acknowledge corrections and end without a replacement revision. These occur after that compaction, but sequence alone does not prove causation.
- The inspected user config specifies Astra High. It contains no explicit `context_management` setting; that does not establish the effective value of every app-managed feature.

The relevant [rollout segment](/Users/chadwickfenner/.codex/sessions/2026/09/27/rollout-2026-09-27T13-09-27-01a0d1ad-071d-7581-b9b6-4144b629f8ca_01a0e40e-c28c-7a82-ba94-e7927d4c8328.jsonl:111) is private diagnostic evidence, not material to publish wholesale.

### 6. Codex versus ChatGPT is not simply a stronger-versus-weaker model choice

OpenAI positions Chat for conversation, exploration and short drafts, Work for completed research and deliverables, and Codex for software development. It also explicitly permits staying in Codex for non-coding work and describes Work as offering the same core capabilities. Using Codex for an About section was not an invalid use. Those descriptions establish intended workflows, not comparative writing quality. [Quickstart](https://learn.chatgpt.com/docs/quickstart), [Work overview](https://learn.chatgpt.com/docs/get-started-with-work).

The current model documentation exposes model and reasoning controls in both Work and Codex. Switching views while retaining the same model is not a clean test of model capability. No source inspected establishes that moving this task to ordinary ChatGPT would reliably eliminate these failures. [Models](https://learn.chatgpt.com/docs/models).

### 7. Skill catalogue size is not the established cause

Official documentation describes selecting relevant skills and loading their instructions as needed. Installed skill bodies are not all automatically inserted into every task. Selection can be explicit or automatic. This investigation found no basis for removing the catalogue or treating its size as the diagnosis. [Skill loading](https://learn.chatgpt.com/docs/build-skills).

An actual loaded instruction can still affect behavior, but attributing a failure to it requires evidence. That is different from blaming installed skills in general.

## What the internal tests establish

The previous twelve fictional tests and twelve real-source replays all returned revised copy. They did not reproduce the stopping behavior. The real-source replays still showed weak editorial connections and returns to rejected framing. Global instructions remained present in all conditions. The experiment did not compare models, reproduce the whole desktop context or demonstrate a cure. [Test report](/Users/chadwickfenner/Code/portfolio/docs/WRITING_CONTINUATION_TEST_2026-10-01.md).

Combining a selected conversation into a fully supplied prompt removes part of the interaction burden under investigation. Successful continuation under that setup cannot rule out a real multi-turn reliability problem.

## Practical decision

The strongest supported conclusion is a collaboration reliability failure with plausible model and conversation-state contributions, plus a directly observed mistake in the assistant's evaluation method. It is not established as a skill problem, a low-effort setting or a single compaction bug. It does not imply that all model capabilities have deteriorated.

My next-run recommendation is a clean GPT-5.6 Sol High task for the editorial work, with the same source restrictions and no additional behavioral rules. The point is to stop investing in the exact interaction that has repeatedly failed and obtain a comparison relevant to the observed behavior. The Sol recommendation is provisional: one close report favors it for reframing, another reports reliability problems in both models. There is no evidence here that a permanent downgrade or product migration is warranted.

A useful comparison must include a correction after an initial proposal, then examine whether the next result incorporates that correction while still serving the original objective. If Sol repeats the same failure, reject the workaround rather than adding more reminders or interpreting fluent explanations as recovery. A clean task is not permission to import old assistant drafts as facts or ignore the current Figma source.

No new chat or global rule has been created. Any source-only transfer should be assembled by the assistant from permitted material, with stale snapshots identified, rather than requiring Chadwick to reconstruct two months of context.

## Private support summary, prepared but not submitted

The observed issue is premature completion after corrective feedback during an authorized editorial task. The assistant can acknowledge why a proposal fails yet stop without continuing the requested revision. It also narrows a broad diagnostic request to an easier internal comparison, requiring repeated user intervention to restore scope. Later affected turns are logged as GPT-6 Astra High. At least one stopping reply precedes the first recorded compaction in its rollout segment. Fresh single-response replays did not reproduce stopping, so the original interaction history may be material. Relevant public reports include issues 42937, 43329 and 43485. Requested investigation: preservation of active objectives and application of user corrections, separately from single-turn answer quality. There is no verified claim here of hidden routing, service throttling or a specific compaction defect.
