# Codex efficiency audit

Audit date: 19 September 2026, America/Chicago

## Verdict

Yes, there were real efficiency problems. The unfinished responsive portfolio work does not, by itself, explain the rate at which the weekly allowance disappeared.

The dominant problem was an excessive number of model and tool cycles inside a very large context. A second, independently measurable problem was automatic approval review. Visual QA then kept refilling the context with large screenshot payloads. GPT-5.6 Sol at high reasoning amplified all three problems, but it was not the sole cause.

The task can remain unfinished. The work does not need to be abandoned or reduced in quality. The execution pattern and effective permissions need to change before it continues.

## What the first audit got wrong

The first audit found the dominant task and its large context, but it stopped short of diagnosing why the task produced so much traffic. It also reported 217 user messages and 849 tool calls in the task. That parser incorrectly attached automatic reviewer transcript messages and two reviewer tool calls to the parent task.

The corrected counts are:

- 13 genuine user messages in the main task.
- 15 automatically injected context messages.
- 924 main model responses.
- 847 main tool calls containing 977 individual tool operations.
- 176 separate automatic approval reviews tied to the same task.

This correction makes the issue more serious, not less. The main agent produced about 71 model responses for each genuine user message, before counting the separate reviewer agent.

## Measured impact

The prior weekly window contains 155,639,084 locally recorded model tokens across all Codex work.

- Main responsive task: 133,912,135 tokens, 86.0% of recorded weekly traffic.
- Automatic reviews tied to that task: 15,104,270 tokens, 9.7% of recorded weekly traffic.
- Main task plus its reviews: 149,016,405 tokens, 95.7% of recorded weekly traffic.

These are model traffic figures from local session logs. OpenAI does not publish the Plus allowance as a direct token formula, so they are not an exact reconstruction of allowance units. The account meter is the separate evidence that the five hour and weekly limits reached 100% during the same activity.

The rate meter shows two especially costly runs:

- On 17 September, the five hour meter rose from 8% to 100% in about 48 minutes while the weekly meter rose from 64% to 78%.
- On 18 September, the five hour meter rose from 2% to 100% in about 88 minutes while the weekly meter rose from 80% to 95%.

## Root cause 1: too many agent cycles inside a huge context

Verified facts:

- 924 main model responses came from 13 genuine user messages.
- 847 main tool calls expanded to 977 individual tool operations.
- One turn generated 114 model responses and 111 tool calls, using 20,161,378 tokens.
- Three other turns generated 100 to 111 model responses each.
- The median model response carried 140,108 input tokens.
- 718 of 924 responses carried more than 100,000 input tokens.
- 172 responses carried more than 200,000 input tokens.
- The maximum was 244,381 input tokens against the task's 258,400 token context window.

Inference:

The task was not merely long. Codex repeatedly reasoned after nearly every shell command, patch, screenshot and browser operation while retaining a very large history. That multiplication is the main source of avoidable cost. A complex visual implementation can justify many checks, but it does not justify four separate turns with roughly 100 model responses each.

There is no evidence of a literal infinite retry loop. Exact repeated tool inputs accounted for 8.0% of calls, mostly terminal polling and repeated verification. The larger problem was a long sequence of distinct but overly granular operations.

## Root cause 2: automatic approval review added a second model loop

Verified facts:

- The effective task settings were `approval_policy = "on-request"` and `approvals_reviewer = "auto_review"`.
- The local config file said `approval_policy = "never"`, so the desktop task's effective permission mode did not match the file.
- The task triggered 176 reviewer model calls.
- Every one of the 176 reviews returned `allow`.
- 162 were classified low risk, 13 medium risk and one had no recorded risk label.
- The reviewer used 15,104,270 tokens.
- Median reviewer input was 61,332 tokens, the 90th percentile was 177,222 and the maximum was 244,180.
- 63 reviews covered the responsive verification script.
- 77 covered browser or loopback operations.
- Together, browser and responsive checks caused 140 of the 176 reviews.

Inference:

The same local verification workflow was being judged by another model again and again. The reviewer saw a growing compact transcript plus each requested action, so later approvals were themselves expensive. All 176 were allowed, which shows that this review volume did not provide a corresponding stream of blocked unsafe actions.

Official OpenAI documentation says auto review runs when an action crosses the sandbox boundary, including blocked network access, escalated shell calls and some app tools. It also recommends narrow command rules when mundane actions generate too much review volume.

## Root cause 3: visual QA repeatedly injected large image payloads

Verified facts:

- The task made 64 `view_image` calls.
- Tool results contained 263 image data URLs.
- Tool output stored in the session totaled 58,546,944 bytes.
- 64 individual tool results exceeded 100 KB.
- 25 individual tool results exceeded 1 MB.
- Several calls loaded 5 to 12 screenshots at once.

Inference:

Visual inspection was necessary for this task, but loading many full page screenshots into repeated model cycles was not efficient. The image results helped drive the context back toward its limit after compaction. Tool output bytes are not equivalent to model tokens, so the logs cannot assign an exact allowance percentage to the images.

## Compaction worked, but too late to keep the task cheap

Verified facts:

- Automatic history compaction ran 10 times.
- Each compaction triggered between 217,987 and 244,381 input tokens.
- No explicit `model_auto_compact_token_limit` is configured, so the model default was used.

Inference:

There was no compaction failure. The default threshold allowed hundreds of expensive responses at six figure context sizes before each reset. Large screenshot batches and long verification sequences then rebuilt the context.

## Cost multipliers that were not the primary defect

### Sol at high reasoning

The global default is GPT-5.6 Sol with high reasoning. It handled nearly all main task traffic. This made every unnecessary cycle more expensive. A smaller model would have reduced the damage, but changing models without fixing the cycle count, approval churn and image handling would leave the underlying problem intact.

### Plugins and skills

The broad plugin and skill catalogs add recurring context, but the evidence does not support treating them as the main cause. Their effect is smaller than the measured 176 reviewer calls, 924 main responses and 58.5 MB of stored tool output.

### Project instructions

The repository instruction files are not unusually large and they prevent factual and design drift. Removing them would trade reliability for a comparatively small saving.

## Corrections, in priority order

### 1. Stop automatic review from judging routine local QA

Use `approvals_reviewer = "user"` for ordinary portfolio work, then add one narrow allow rule for the trusted local verification entry point. Do not use Full Access as the shortcut.

The rule should cover only the repository verifier, after its contents are reviewed:

```python
prefix_rule(
    pattern = ["node", "scripts/verify-responsive-homepage.mjs"],
    decision = "allow",
    justification = "Run the reviewed local portfolio visual verifier.",
)
```

Because the script would run outside the sandbox, changes to that script must be reviewed before the rule is trusted again. The stronger implementation is to make that one verifier start the local server, run the viewport suite and exit, instead of approving individual resize and screenshot commands.

### 2. Put a hard ceiling on context growth

Add:

```toml
model_auto_compact_token_limit = 120000
model_auto_compact_token_limit_scope = "total"
tool_output_token_limit = 12000
```

The 120,000 threshold is a conservative starting point, not an OpenAI default. It is chosen because this task's median response was already 140,108 input tokens. The official configuration reference confirms that both the compaction threshold and per tool output budget are supported.

### 3. Change the visual QA protocol

- Run DOM, geometry and regression assertions before asking the model to inspect images.
- Capture a full viewport matrix once per accepted change batch, not after each small edit.
- Inspect no more than three representative screenshots in the first visual pass: mobile, tablet and desktop.
- Expand to the full matrix only when the targeted pass finds a breakpoint specific defect.
- Avoid passing 5 to 12 full page images in one tool result. Use targeted crops or one locally generated contact sheet.
- Batch related CSS edits, then verify the batch once.

### 4. Reduce model cost after fixing the workflow

Use GPT-5.6 Terra at medium reasoning as the default for implementation and regression work. Use Sol at high reasoning for bounded design judgment, difficult debugging or final adversarial review. The model change is a multiplier reduction, not the root fix.

Recommended defaults:

```toml
model = "gpt-5.6-terra"
model_reasoning_effort = "medium"
model_verbosity = "low"
```

### 5. Continue the unfinished objective without carrying the damaged execution pattern

Do not discard the responsive work. Record the current implementation state, unresolved defects and next verification step in the repository, then continue the same objective in a fresh Codex task after the permission and context changes are active. A fresh task alone is not enough. Without the preceding fixes it can repeat the same failure.

## Current allowance snapshot

At the end of this correction audit:

- Five hour window: 36% used, 64% remaining. Reset: 19 September 2026 at 9:29 PM CDT.
- Weekly window: 13% used, 87% remaining. Reset: 26 September 2026 at 4:07 PM CDT.

The earlier audit ended at 3% weekly usage. This deeper audit therefore used another 10 percentage points while running on Sol at high reasoning. That does not prove every similar audit costs 10 points, but it confirms that the current default remains expensive.

## What is verified and what remains uncertain

Verified:

- Model response counts, tool call counts, context sizes, compaction events, reviewer calls, reviewer outcomes, effective task settings, output byte sizes and account meter snapshots.

Inferred from those measurements:

- The relative causal importance of granular agent cycles, screenshot loading and late compaction.
- The expected savings from the proposed threshold and QA protocol.

Not established:

- OpenAI's exact Plus allowance conversion formula.
- The exact number of allowance units attributable to images rather than surrounding text context.
- Which desktop preference or managed layer overrode the local `approval_policy = "never"` setting. The effective task settings and guardian logs prove that the override occurred, but the logs do not identify the UI action that selected it.

## Official OpenAI sources

- [Auto review](https://learn.chatgpt.com/docs/sandboxing/auto-review)
- [Codex configuration reference](https://learn.chatgpt.com/docs/config-file/config-reference)
- [Codex sample configuration](https://learn.chatgpt.com/docs/config-file/config-sample)
- [Command rules](https://learn.chatgpt.com/docs/agent-configuration/rules)
- [Codex pricing and usage limits](https://learn.chatgpt.com/docs/pricing)

No Codex settings or permission rules were changed during this audit.
