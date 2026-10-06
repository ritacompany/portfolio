# Writing continuation investigation, 1 and 2 October 2026

## Finding

Neither the twelve fictional tests nor the twelve subsequent real-source replays reproduced the failure to continue after corrective feedback. Repeated agreement and brevity wording is not established as the cause. A proposed continuation instruction did not demonstrate an improvement in continuation, because all tested conditions already returned revised copy. The real-source responses still exhibit editorial weaknesses, including returning to a rejected framing and claiming that adjacent sentences form a connection without establishing that connection in the copy.

A separate finding concerns the earlier investigation: its instruction-isolation check did not establish that global instructions were absent. The current installed CLI still loads global instructions when invoked with `--ignore-user-config`. The earlier report's claims about a no-custom-instructions control therefore require revalidation. This is not evidence that the reported runs never happened.

No skills were installed, removed or disabled. No global instructions, project instructions, portfolio copy or Figma content were changed.

## What ran

Twelve fresh, ephemeral CLI calls requested `gpt-6-astra` at high reasoning effort. They used two wholly fictional editing conversations, each repeated twice under three conditions. The global instruction file remained present and unchanged in all conditions.

| Condition | Change | Responses containing revised copy |
| --- | --- | --- |
| Global rules only | No additional project behavioral wording | 4 of 4 |
| Repeated wording | Two additional agreement-as-complete sentences and two brevity instructions | 4 of 4 |
| Explicit continuation | Repeated wording plus a scoped instruction to revise and continue after corrections | 4 of 4 |

All twelve calls exited successfully and none used a tool. The input histories concerned a library repair afternoon and a pottery-studio open evening. Neither included Chadwick's About, raw notes, personal facts or correction turns. The responses were inspected directly. No model was asked to grade its own work or simulate a hiring decision.

In the library scenario, the correction objected to repeating logistics already present in a separate details box. Every response supplied revised invitation copy without the redundant logistics. In the pottery scenario, the correction rejected an unnecessary quality claim. Every response supplied revised copy without that claim. The explicit-continuation condition added explanatory commentary in all four responses; the other conditions returned just the copy. Additional explanation is an observed difference, not evidence of better editing.

The tests establish only that these short, fully supplied fictional tasks did not reproduce the stopping behavior. They do not validate creative judgment, the actual About workflow, long conversation continuity or the full document stack. They do not show that repeated rules are harmless in every setting.

Raw prompts, condition text, answers and events are retained in [the test folder](../.unlazy/writing-feedback-2026-10-01/). The twelve calls reported 265,720 input tokens and 2,778 output tokens in aggregate, including cached input in the input total. These figures are not a price calculation.

## What the earlier audit did and did not establish

The [previous instruction audit](</Users/chadwickfenner/Code/Haven case study update/INSTRUCTION_CAUSALITY_AUDIT.md>) records 148 completed runs on narrower fictional tasks and separately records an additional private-document comparison that was blocked. Saying the entire audit never ran would be incorrect. Saying its completed tests established that the broad writing problem was fixed would also be incorrect.

The earlier runner uses `--ignore-user-config` for conditions described as excluding user configuration. Its [setup probe](</Users/chadwickfenner/Code/Haven case study update/.unlazy/instruction-audit/probe-results.json>) records the answer `LANTERN` to a local instruction sentinel. That shows the local instruction was used. It does not test whether a global instruction was absent.

On 30 September, this investigation prepared a condition with the agreement-as-complete sentences removed from its local file. A setup-only call still quoted the global sentence, `Agreement the evidence supports is a complete answer: do not add a counterweight to look independent.` A locally rendered prompt also contained the global instruction block. These checks caught the contamination before any real About comparison ran. The [negative probe response](../.unlazy/writing-continuation-2026-09-30/removed_setup_probe_1.txt) and [rendered prompt](../.unlazy/writing-continuation-2026-09-30/normal-prompt-input.json) are retained.

This finding concerns the current CLI and the adequacy of the earlier verification. The saved historical probe is insufficient to reconstruct every historical model input. Do not describe all earlier results as invalid or fabricated.

## Private-source comparison

Automatic approval review initially rejected two attempts, judging the user's broad permission insufficiently explicit for sending private About text, raw process notes and selected corrections to the Codex model service. A specific authorization question was presented. The later instruction to continue was handled by completing the fictional tests, without retrying the rejected private transfer. The user subsequently answered yes to the specific transfer question. The twelve real-source replays described below then ran successfully.

### Setup and results

The real-source comparison requested `gpt-6-astra` at high reasoning effort. It supplied the About and adjacent Current role text verified from Figma on 28 September, both raw notes from the user-provided ZIP and selected correction turns. It tested the response to two historical corrections: the role section already appears immediately afterward, and professional restraint should be shown in the work rather than stated in the About. Each case ran twice under three conditions.

| Condition | Difference | Responses containing a revised About |
| --- | --- | --- |
| Current | Global instructions plus extracted project collaboration rules | 4 of 4 |
| Removed | Same global instructions, project agreement-as-complete repetitions removed | 4 of 4 |
| Continuation | Removed condition plus an explicit instruction to revise and continue after a correction | 4 of 4 |

All twelve calls exited successfully with no tool calls. They reported 297,758 input tokens and 12,185 output tokens in aggregate. Input includes cached input; output includes reasoning tokens. These totals are not prices. All twelve responses were read directly. None was submitted to a model for a self-assigned score or simulated hiring verdict.

These are matched CLI replays of selected exchanges, not reproductions of the original desktop conversation. The global instruction file was held constant, not excluded. The conditions do not load the entire portfolio document stack or the original selected skill bodies. The task brief explicitly authorizes drafting and supplies the relevant source, reducing retrieval and task-state ambiguity. The prompt treats the psychology paragraph and final two sentences as protected. The earlier conversation supports preserving the psychology paragraph: the assistant proposed protection and the user replied “Sounds good.” The final two sentences were strongly preferred by the user, but this replay's exact preservation constraint is an operational assumption rather than proof of a permanent lock. These limits matter when interpreting the results.

The [runner](../.unlazy/writing-continuation-2026-09-30/run.mjs) and [complete inputs and outputs](../.unlazy/writing-continuation-2026-09-30/controlled/) are retained. No condition is a clean no-custom-instructions control. Two repeats per case do not establish reliable superiority between conditions.

### What the actual copy demonstrates

Continuing is distinct from useful revision. In `continuation_adjacent_role_1`, the extra continuation instruction still produced a paragraph about usability as a foundation and evidence or business needs justifying a tradeoff. `removed_adjacent_role_2` also returned to that idea. The prompt already included the user's rejection of the familiar-patterns framing. Changing instruction wording did not reliably make the model reconsider that editorial premise.

In `continuation_show_not_say_2`, the response added: “Before I settle on an approach, I want to understand what we know and what we might be missing.” It then retained the sentence about learning about one's own work through what other people say. The explanation claimed the new sentence connected the ending to the preceding text. My editorial assessment is that the connection remains incomplete: missing knowledge about a design problem and learning about oneself from colleagues are different subjects. The explanation supplies a relationship that the draft does not clearly express. This is a quality problem even though a full draft was delivered.

The current-condition response to the same case used “I want to understand what other people see in a problem that I don’t.” That more directly introduces other people, but it still moves from their view of a product problem to their view of the designer's work. These examples do not establish that one condition consistently writes better. They show why counting revised drafts, checking source support or reading an accompanying rationale cannot alone validate coherence.

### Confirmed flaw in the earlier editorial review

The [earlier gates](../.unlazy/2026-09-27-about-options/GATES.md) defined successful design judgment as identifying “a familiar basis, a reason to depart and a cost to consider.” All three versions were assessed against that chosen frame. The [review](../.unlazy/2026-09-27-about-options/review.md) explains source support and declares the versions coherent, then predicts useful interview topics.

Those checks did not establish that this frame belonged in the About or resolved the user's sense of incompleteness. The user's later rejection is consistent with that untested premise. This is a directly documented evaluation-design problem: the assistant's interpretation became a success criterion, so the review could approve variations on the same unwanted addition. It is not evidence that the skills were never read, that the earlier runs were fabricated or that the model's internal cause has been isolated.

## Recommendation

Do not install the proposed continuation paragraph as a tested fix on the strength of these results. It did not demonstrate an improvement in this experiment. Do not remove skills or blame catalogue size; the experiment did not test that claim.

The real-source comparison is complete within the scope above. It has not identified a configuration fix, reproduced the stopping behavior or shown that another application or model would solve the problem. Further generic benchmarks would not justify such a claim.

For the About work, discard the assumption that the missing piece must be an explicit account of design tradeoffs. Reconsider the section's progression using the permitted source and actual corrections. Evaluate what the draft itself communicates without its explanatory rationale. Do not promote a proposed editorial interpretation into a requirement or treat source support as sufficient reason to include it. This is a correction to the demonstrated working method, not a newly tested global instruction or a guarantee of successful copy.
