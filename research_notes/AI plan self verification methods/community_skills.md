# Community and published skills, plugins and workflows for plan review by AI coding agents

Current as of 14 Oct 2026. Star counts are as shown on the page at fetch time.

## Claude Code native: plan mode, subagent reviewers, official plugins

### Takeaway
Anthropic's own guidance separates planning from execution (plan mode) and recommends a separate, fresh-context reviewer so "the agent doing the work isn't the one grading it". The official guidance aims that reviewer at the diff measured against the plan; there is no built-in plan critic.

### Cited Findings
- Plan mode: Claude reads files and proposes a plan but makes no edits until approved. `Shift+Tab` or `--permission-mode plan`; `Ctrl+G` opens the plan in your editor for direct edits. Recommended workflow is Explore, Plan, Implement, Commit. Docs say skip planning "if you could describe the diff in one sentence"; [Claude Code best practices](https://code.claude.com/docs/en/best-practices)
- Four escalating ways to gate a stop: in one prompt; a `/goal` condition re-checked by a separate evaluator after every turn; a Stop hook that runs a deterministic check; or "a verification subagent ... [that] has a fresh model try to refute the result, so the agent doing the work isn't the one grading it"; [best practices](https://code.claude.com/docs/en/best-practices)
- "Add an adversarial review step": a reviewer subagent "sees only the diff and the criteria you give it, not the reasoning that produced the change". Example prompt checks the diff against PLAN.md for missing requirements, untested edge cases and out-of-scope changes; [best practices](https://code.claude.com/docs/en/best-practices)
- Official caveat: a reviewer told to find gaps "will usually report some, even when the work is sound". Chasing every finding causes over-engineering, so the reviewer should flag only gaps affecting correctness or stated requirements; [best practices](https://code.claude.com/docs/en/best-practices)
- Writer/Reviewer pattern across two sessions: "A fresh context improves code review since Claude won't be biased toward code it just wrote"; [best practices](https://code.claude.com/docs/en/best-practices)
- Interview-first: have Claude interview you with `AskUserQuestion` until the spec is complete, write SPEC.md, then start a fresh session to execute; [best practices](https://code.claude.com/docs/en/best-practices)
- Official plugins in anthropics/claude-code: `feature-dev` (7-phase flow with `code-explorer`, `code-architect`, `code-reviewer` agents); `code-review` (5 parallel Sonnet agents with confidence scoring to filter false positives); `pr-review-toolkit` (comment, test, silent-failure, type-design, code reviewers); `ralph-wiggum` (Stop-hook loop until done). None is a dedicated plan critic; [anthropics/claude-code plugins](https://github.com/anthropics/claude-code/tree/main/plugins)

### Inferences
- Official Anthropic guidance points review at outputs (diffs, test results) more than at plans. A plan is reviewed by a human via `Ctrl+G` or by the interview step. Plan-level critique is mostly a community layer.
- The "reviewer will always find something" caveat matters for any plan-audit design. A reviewer needs a severity bar or it drives scope creep.

### Gaps
- No Anthropic doc found that ships a plan-specific critic subagent or measures plan-review effectiveness.

## obra/superpowers (Jesse Vincent)

### Takeaway
The most adopted structured workflow. It forces brainstorm, design doc, written plan, then per-task fresh subagents with review gates. Its plan quality control is mostly front-loaded through user questioning and very granular plans, with review happening after each executed task.

### Cited Findings
- About 299.2k stars and 26.7k forks. Listed on the official Claude plugin marketplace (`superpowers@claude-plugins-official`) and the official Codex marketplace; install paths for Cursor, Gemini CLI, Copilot CLI and others; [obra/superpowers](https://github.com/obra/superpowers)
- `brainstorming`: asks questions to draw out what you want and why, plays back its understanding for correction, writes a design doc presented in chunks; [obra/superpowers](https://github.com/obra/superpowers)
- `writing-plans`: after design approval, splits work into 2 to 5 minute tasks with exact file paths, complete code and verification steps; [obra/superpowers](https://github.com/obra/superpowers)
- `subagent-driven-development`: fresh subagent per task with "two-stage review (spec compliance, then code quality)". `requesting-code-review` reviews against the plan between tasks and critical issues block progress; [obra/superpowers](https://github.com/obra/superpowers)
- First released Oct 2025, the same period Anthropic launched plugins. A secondary source notes the speed and quality claims come mostly from the builders, not independent studies; [Kunal Ganglani](https://www.kunalganglani.com/blog/superpowers-agentic-skills-framework.md)

### Inferences
- Spec-compliance review checks execution against the plan. It does not check whether the plan's logic is right. A wrong plan passes spec compliance.

### Gaps
- Could not fetch Jesse Vincent's own blog posts (fsck.com) describing the review mechanism in his words.

## Matt Pocock: grill-me / grilling

### Takeaway
An interrogation skill. The agent questions the user about the plan one decision at a time until every branch is resolved. It audits the plan by surfacing unresolved decisions, not by an independent critic.

### Cited Findings
- mattpocock/skills has about 291k stars. `grill-me` (user-invoked) "interviews you about a plan or design until every branch is resolved"; `grill-with-docs` also updates GLOSSARY.md and ADRs inline; `grilling` is the model-invoked primitive reused by `grill-me`, `triage`, `wayfinder` and `improve-codebase-architecture`; [mattpocock/skills](https://github.com/mattpocock/skills)
- Mechanism of `grilling`: one question at a time, each with a recommended answer; look up facts in the environment instead of asking; do not act until the user confirms; [skills.sh listing](https://skills.sh/mattpocock/skills/grilling)
- Same repo has `code-review` that checks a diff against repo standards and the originating spec using parallel sub-agents, and `to-tickets` that breaks a plan into tickets with blocking edges; [mattpocock/skills](https://github.com/mattpocock/skills)

### Inferences
- Grilling catches missing decisions and ambiguous scope well because a human answers each branch. It relies on the human to spot logic errors; the model only enumerates the questions.

### Gaps
- No measurement found of what grilling catches.

## Cross-model second opinion (Codex, GPT reviewing Claude)

### Takeaway
The fastest-growing pattern is having a different model family critique the plan or diff. The only tool found that reviews the plan itself automatically is a community hook on `ExitPlanMode`. OpenAI's official plugin reviews diffs, not plans.

### Cited Findings
- openai/codex-plugin-cc: about 34.2k stars, under the `openai` GitHub org. Commands: `/codex:review` (read-only review of uncommitted changes or branch diff), `/codex:adversarial-review` (steerable, challenges "the chosen implementation and design"), `/codex:rescue` (delegate to Codex subagent). Optional review gate uses a Stop hook that blocks Claude from stopping if Codex finds issues. Targets code changes, not plan documents; [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)
- cathrynlavery/codex-skill: a `PostToolUse` hook matched on `ExitPlanMode` reads the plan and sends it to `codex exec --sandbox read-only` before you approve. Checks risks, missing steps, better alternatives, unaddressed edge cases. Fails open (skips silently if Codex errors). README offers no evidence beyond "two AIs checking each other's work catches more edge cases"; [codex-skill README](https://cdn.jsdelivr.net/gh/cathrynlavery/codex-skill@main/README.md)
- codex-plan-reviewer skill: Codex critiques a markdown plan, Claude evaluates each point, applies valid ones, escalates disagreements to the user, resubmits until Codex approves or a loop cap hits. Each round runs in a subagent; [skills.sh codex-plan-reviewer](https://skills.sh/mkdir700/myskills/codex-plan-reviewer)
- codex-in-claude (PyPI, alpha, 0.4 to 0.14): consult (read-only second opinion), review (structured findings on git changes), delegate (works in a temp worktree and returns a diff); [PyPI codex-in-claude](https://pypi.org/project/codex-in-claude/0.14.0/)
- Duck Critic: producer-critic loop; the main agent owns the plan and sends checkpoints to a read-only critic from a different model family; [claudeskills.info duck-critic](https://claudeskills.info/skills/aktsmm/agent-skills/duck-critic/)
- oh-my-claudecode `review`: hands a plan to a Critic agent that returns APPROVED, REVISE or REJECT; a reviewer-only variant keeps author and reviewer in separate contexts; [skills.cat oh-my-claudecode review](https://skills.cat/skills/yeachan-heo/oh-my-claudecode/review)

### Inferences
- Plan-stage cross-model review exists only as community hooks and skills with no adoption numbers close to superpowers or the OpenAI plugin.

### Gaps
- No star counts found for codex-skill, codex-plan-reviewer, Duck Critic or oh-my-claudecode in the fetched sources.

## Council and multi-model review tools

### Takeaway
"Council" tools fan the same artifact out to several model families, anonymize and cross-review, then let a chair decide. These are niche npm or GitHub projects.

### Cited Findings
- Amicus (npm `amicus`, v4.9.2): independent reviews from each model, anonymized peer cross-review, a non-Claude chair verdict, tiered accept or deny. Findings are structured as claim, severity (blocker, major, minor, nit), location, rationale. Trigger "council review this" or `/amicus:council`. Rationale: any single model "has consistent blind spots"; [glama.ai Amicus](https://glama.ai/mcp/servers/BourbonDog/amicus); [npm](https://socket.dev/npm/package/amicus)
- Crucible (chaseai-yt): Claude and Codex plan-review loop; on a CRM build, 55 Codex findings over 5 rounds converged 26, 15, 12, 2, 0; author reports one unbuildable access-path design and about six wrong data models caught. Claude arbitrates and logs reasons for rejecting weak critiques; [chaseai-yt/crucible](https://github.com/chaseai-yt/crucible)

### Inferences
- Convergence to zero findings is a stopping signal, not proof of correctness; it may only mean the reviewer ran out of things it notices.

### Gaps
- No adoption figures for Crucible or Amicus found.

## Anthropic engineering: evaluator-optimizer and grader guidance

### Takeaway
Anthropic frames generation and evaluation as distinct calls and pushes graders toward deterministic checks first, isolated LLM judges second, humans for calibration.

### Cited Findings
- Evaluator-optimizer: "one LLM call generates a response while another provides evaluation and feedback in a loop". Fits when there are clear evaluation criteria and when human feedback demonstrably improves output and the LLM can give that kind of feedback; [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- Same post: a separate guardrail instance screening while another handles the core response "tends to perform better" than one call doing both; [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- Evals post: "deterministic graders where possible, LLM graders where necessary"; grade each dimension with its own isolated LLM judge; give judges an "Unknown" out to cut hallucinated verdicts; calibrate LLM judges against human experts; grade what the agent produced, not the path; [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- The evals post does not explicitly state that the grader must be separate from the generator; that principle is stated directly in Claude Code best practices ("the agent doing the work isn't the one grading it"); [evals post](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents); [best practices](https://code.claude.com/docs/en/best-practices)

### Inferences
- Applied to plans: a plan audit works best when it has explicit per-dimension criteria and one judge per dimension, with an allowed "can't tell" outcome.

### Gaps
- None material.

## Evidence on what actually catches logic errors

### Takeaway
Research says same-model self-correction without external feedback does not improve reasoning and can degrade it. Practitioner reports favour cross-model review, especially at the architecture and plan level. No controlled study of plan-level review was found.

### Cited Findings
- Huang et al., ICLR 2024: LLMs "struggle to self-correct their responses without external feedback, and at times, their performance might even degrade". Earlier positive results often relied on oracle labels. External feedback (code execution, tools) is what makes revision work; [arXiv 2310.01798](https://arxiv.org/pdf/2310.01798)
- Simon Willison, 5 Jul 2026: Claude Fable's pre-release review flagged 5 release blockers in sqlite-utils, including `delete_where()` never committing (data loss). GPT-5.5 in Codex then found two more issues. He now routinely has one vendor's model review the other's work and says it "really does work"; [simonwillison.net](https://simonwillison.net/2026/Jul/5/sqlite-utils-fable/)
- Zack Proser has Codex review every Claude diff with an adversarial brief; argument is that a same-model reviewer "shares those exact blind spots"; [zackproser.com](https://zackproser.com/blog/codex-reviews-claudes-diffs)
- Four-LLM adversarial review post reports catching an IDOR flaw (task lookup not scoped to session); [Level Up Coding](https://levelup.gitconnected.com/why-we-forced-4-different-llms-to-grill-each-other-and-what-we-found-ae6e4b2603a2)
- Reddit commenter (anecdotal): cross-model review "is strongest on architecture decisions, weaker on line-level bugs"; [Reddit snapshot](https://reddit.sentinel-team.org/posts/1sflw5k/snapshots/2026-04-09T16%3A41%3A00.47446Z)

### Inferences
- The strongest supported mechanisms are: (1) an external check that returns pass or fail; (2) a separate reviewer with fresh context; (3) a different model family. Asking the same agent in the same context to "double-check its plan" is the weakest option and the research argues against it.
- For plans with no executable check, the human-answered interview (grilling, brainstorming) is the main way to catch errors in premises, since no model reviewer has the facts only the user holds.

### Gaps
- All plan-level effectiveness evidence is self-reported by tool authors or practitioners. No controlled comparison of plan review methods was found.
- Willison's post was read only through search excerpts, not fetched in full.
