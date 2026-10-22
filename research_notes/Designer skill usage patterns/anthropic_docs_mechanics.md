# Anthropic Agent Skills: loading, invocation and budget mechanics (official docs, as fetched 10 Oct 2026)

Sources fetched directly: code.claude.com/docs/en/skills, code.claude.com/docs/en/settings-reference, code.claude.com/docs/en/env-vars, code.claude.com/docs/en/plugins/overview, code.claude.com/docs/en/plugins/measure, platform.claude.com agent-skills overview, best-practices and enterprise pages, platform.claude.com skills-guide (API), anthropic.com engineering blog (16 Oct 2025), github.com/anthropics/skills README, support.claude.com "Using skills in Claude". Quotes are as returned by the fetch tool; settings and env-var quotes were pulled from the raw .md pages and are exact.

## 1. How are skills discovered and loaded? (progressive disclosure)

### Takeaway
Yes. Every surface preloads each skill's name and description at session start and loads the SKILL.md body only when the skill is invoked; bundled files load only when read. Anthropic puts the metadata cost at about 100 tokens per skill and the body at under 5k tokens.

### Cited Findings
- "In a regular session, skill descriptions are loaded into context so Claude knows what's available, but full skill content only loads when invoked." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- "Unlike CLAUDE.md content, a skill's body loads only when it's used, so long reference material costs almost nothing until you need it." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Level 1 metadata: "Claude loads this metadata at startup and includes it in the system prompt. The `description` is what Claude matches your request against when determining whether to trigger the Skill, so it must say both what the Skill does and when to use it. This lightweight approach means you can install many Skills without context penalty: until a Skill is triggered, only its name and description occupy context." Source: [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- Token table: Level 1 Metadata "Always (at startup)", "~100 tokens per Skill"; Level 2 Instructions "When Skill is triggered", "Under 5k tokens"; Level 3+ Resources "As needed", "None until accessed". Source: [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- "At startup, the agent pre-loads the name and description of every installed skill into its system prompt." Bundled files are ones Claude "can choose to navigate and discover only as needed"; "the amount of context that can be bundled into a skill is effectively unbounded." Source: [Engineering blog, Equipping agents for the real world with Agent Skills, 16 Oct 2025](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
- "At startup, only the metadata (name and description) from all Skills is pre-loaded. Claude reads SKILL.md only when the Skill becomes relevant, and reads additional files only as needed." Source: [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- Once loaded, the body persists: "the rendered `SKILL.md` content enters the conversation as a single message and stays there across later turns... Claude Code does not re-read the skill file on later turns." Source: [Claude Code skills, Skill content lifecycle](https://code.claude.com/docs/en/skills)
- Re-invoking identical content adds "a short note that the skill is already loaded rather than a second copy." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Compaction: "Claude Code re-attaches the most recent invocation of each skill after the summary, keeping the first 5,000 tokens of each. Re-attached skills share a combined budget of 25,000 tokens... older skills can be dropped entirely after compaction if you have invoked many in one session." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Body length: "Keep `SKILL.md` under 500 lines"; "Once a skill loads, its content stays in context across turns, so every line is a recurring token cost." Source: [Claude Code skills](https://code.claude.com/docs/en/skills); [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- Nested project skills: "Skills in a `.claude/skills/` directory below where you started don't load at startup. They load the first time Claude reads or edits a file in that subdirectory." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Precedence: "Enterprise over personal, and personal over project." A skill beats a same-named file in `.claude/commands/`. Plugin skills are namespaced `/plugin-name:skill-name`. Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Claude Code watches skill directories and picks up added, edited or removed skills "within the current session, without a restart." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)

### Inferences
- INFERRED: the "~100 tokens per Skill" figure is a rough average. Claude Code's own per-entry cap of 1,536 characters works out to roughly 350 to 400 tokens at most, so a long description costs several times the headline figure.
- INFERRED: since bodies stick around until compaction, invoking many skills in one session stacks up their bodies, not just their descriptions.

### Gaps
- No doc gives the exact system-prompt format of the listing in Claude Code. The overview example shows `name - description` for the API VM.

## 2. How does invocation work: automatic versus slash command?

### Takeaway
By default a skill can be invoked both ways: Claude invokes it on its own when the request matches the description (through the Skill tool in Claude Code), or the user types `/skill-name`. On claude.ai, use is automatic and the user steers it by naming the skill in the prompt.

### Cited Findings
- "By default, both you and Claude can invoke any skill. You can type `/skill-name` to invoke it directly, and Claude can load it automatically when relevant to your conversation." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- "Claude uses skills when relevant, or you can invoke one directly with `/skill-name`." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- "When you request something that matches a Skill's description, Claude reads SKILL.md from the filesystem using bash. Only then does this content enter the context window." Source: [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- "Both work the same way: once a Skill is available in your environment, Claude uses it automatically when relevant to your request." Source: [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
- Skill tool permissions: "Disable all skills by denying the Skill tool"; rules `Skill(name)` for an exact match, `Skill(name *)` for a prefix match. "A few built-in commands are also available through the Skill tool, including `/init` and `/security-review`." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Stacking: "Claude Code expands the first skill plus up to five more stacked after it." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Malformed YAML: "Claude Code loads the skill body with empty metadata, so `/skill-name` still works but Claude can't match against your `description`." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- claude.ai: "Claude determines when each skill is needed based on your request"; it suggests explicit prompts such as "Use my brand guidelines skill to create a presentation." Slash invocation (`/`) is described only for the Microsoft 365 add-ins. Source: [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- anthropics/skills README: "you can use the skill by just mentioning it", for example "Use the PDF skill to extract the form fields..." Source: [anthropics/skills](https://github.com/anthropics/skills)

### Inferences
- INFERRED: automatic invocation is a model judgement made against the listed description text, not a keyword match by the harness. The docs say "matches" but describe no deterministic matcher. The `paths` field is the only documented deterministic gate.

### Gaps
- No doc publishes trigger-accuracy figures or explains how Claude ranks two equally matching descriptions.

## 3. Frontmatter controls

### Takeaway
Claude Code has a much larger frontmatter set than the cross-platform spec, which requires only `name` and `description`. The invocation controls are `disable-model-invocation` (manual only; the description is also removed from context), `user-invocable: false` (Claude only) and `paths` (auto-load only for matching files). `allowed-tools` pre-approves tools for one turn; it does not restrict tools.

### Cited Findings
- Invocation table: default, you yes / Claude yes / "Description always in context, full skill loads when invoked"; `disable-model-invocation: true`, you yes / Claude "Not on its own" / "Description not in context, full skill loads when invoked"; `user-invocable: false`, you no / Claude yes / "Description always in context". Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `disable-model-invocation`: "Set to `true` to prevent Claude from automatically loading this skill. Use for workflows you want to trigger manually with `/name`. Also prevents the skill from being preloaded into subagents and from running when a scheduled task fires with the skill as its prompt. Default: `false`." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `user-invocable`: "Set to `false` when only Claude should invoke the skill: Claude Code hides it from the `/` menu and doesn't run it when you type `/name`. Use for background knowledge users shouldn't invoke directly. Default: `true`." Note: "With `user-invocable: false`, you can't invoke the skill, but Claude still can. To keep Claude from invoking it through the Skill tool, set `disable-model-invocation: true`." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `allowed-tools`: "Tools Claude can use without asking permission during the turn that invokes this skill. The grant clears when you send your next message." Also: "It does not restrict which tools are available: every tool remains callable." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `disallowed-tools`: "Tools removed from Claude's available pool while this skill is active." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `description`: "Claude uses this to decide when to apply the skill. If omitted, uses the first non-empty line of the markdown content. Put the key use case first: the combined `description` and `when_to_use` text is truncated at 1,536 characters in the skill listing." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `when_to_use`: "Additional context for when Claude should invoke the skill, such as trigger phrases or example requests. Appended to `description` in the skill listing and counts toward the 1,536-character cap." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `paths`: "Glob patterns that limit when this skill is activated... Claude loads the skill automatically only when working with files matching the patterns." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Other fields: `name` ("Command name shown in the `/` menu. Defaults to the directory name"), `argument-hint`, `arguments`, `model` (applies for the rest of the turn), `effort`, `context: fork` (runs in a forked subagent), `agent` (subagent type with fork; "If omitted, uses `general-purpose`"), `background`, `hooks` (stay registered "for the rest of the session"), `shell`, `metadata`, `license`, `compatibility`. "Claude Code ignores a field it doesn't recognize without reporting an error." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Cross-platform spec limits: `name` "Maximum 64 characters", lowercase letters, numbers and hyphens, no XML tags, cannot contain "anthropic" or "claude"; `description` "Must be non-empty", "Maximum 1024 characters", no XML tags. Source: [Agent Skills overview](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview); [API skills guide](https://platform.claude.com/docs/en/build-with-claude/skills-guide)
- Settings-level override without editing SKILL.md, `skillOverrides`: `"on"` (name and description listed), `"name-only"` (name only), `"user-invocable-only"` (hidden from Claude, still in `/` menu), `"off"` (hidden everywhere). "Plugin skills are not affected by `skillOverrides`. Manage those through `/plugin` instead." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `disableBundledSkills`: "Turn off the skills and workflows included with Claude Code." Source: [Settings reference](https://code.claude.com/docs/en/settings-reference)

### Inferences
- INFERRED: `disable-model-invocation: true` is the only frontmatter switch that removes a skill's always-on cost entirely while keeping it runnable by slash command. `user-invocable: false` keeps the cost.
- CONFLICT: Claude Code truncates `description` plus `when_to_use` at 1,536 characters, while the platform spec caps `description` alone at 1,024. Each limit applies to its own surface; a description written to the 1,024 spec passes both.

### Gaps
- Whether claude.ai honors `disable-model-invocation`, `user-invocable` or `allowed-tools` is not documented on the help center page fetched.

## 4. Documented budget for skill descriptions in context

### Takeaway
Yes, in Claude Code. The skill listing is capped at 1% of the context window (`skillListingBudgetFraction`, default 0.01). The fallback is 8,000 characters, overridable with `SLASH_COMMAND_TOOL_CHAR_BUDGET`. Each entry is capped at 1,536 characters (`skillListingMaxDescChars`). On overflow, every skill name stays listed but descriptions are dropped, starting with the least-invoked skills. The API caps a request at 20 skills. No count limit is documented for claude.ai.

### Cited Findings
- "The listing always contains every skill name, but if you have many skills, Claude Code drops some descriptions to fit the listing's character budget, which removes the keywords Claude needs to match your request. The budget scales at 1% of the model's context window. When the listing overflows, Claude Code drops descriptions starting with the skills you invoke least, so the skills you use most keep their full text." Source: [Claude Code skills, Skill descriptions are cut short](https://code.claude.com/docs/en/skills)
- `skillListingBudgetFraction`: "When the listing is over the cap, Claude Code keeps every skill's name but drops the descriptions of the least-used skills, so Claude can still invoke those skills but is less likely to choose one on its own." "Type: number, a fraction greater than `0` and at most `1`"; "Default: `0.01`, which reserves 1% of the context window." Source: [Settings reference](https://code.claude.com/docs/en/settings-reference)
- `skillListingMaxDescChars`: "This key caps how many characters of that text Claude Code shows per skill; longer text is cut at the cap." "Default: `1536`." "Lower it to fit more skills under `skillListingBudgetFraction`." Source: [Settings reference](https://code.claude.com/docs/en/settings-reference)
- `SLASH_COMMAND_TOOL_CHAR_BUDGET`: "Override the character budget for skill metadata shown to the Skill tool. The budget scales dynamically at 1% of the context window, with a fallback of 8,000 characters. Legacy name kept for backwards compatibility." Source: [Environment variables](https://code.claude.com/docs/en/env-vars)
- Diagnostics: "Run `/doctor` for an estimate of the listing's context cost and its biggest contributors... When the listing exceeds its budget, Claude Code also writes a warning to the debug log, visible with" the debug CLI flag. "The Skills row in `/context` reports the size of the listing after the budget is applied... Before v2.1.196, the row counted the full text of every description." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Remedies listed: raise `skillListingBudgetFraction` (for example `0.02`) or set the env var; set low-priority skills to `"name-only"` in `skillOverrides`; trim `description` and `when_to_use` and "put the key use case first." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- `/skill-doctor`: "Every skill in the skill listing adds to your context on every turn, whether or not Claude ever uses it. Run `/skill-doctor` to see what each of your skills costs and how often it gets used." It "flags skills in the listing that have never been invoked." Requires v2.1.252 or later. Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- API: "You can include up to 20 Skills for each request." "Total upload size must be under 30 MB (uncompressed)." Source: [API skills guide](https://platform.claude.com/docs/en/build-with-claude/skills-guide)
- claude.ai: the help article "states no limit on how many skills you can have" (paraphrase of fetch result). Source: [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)

### Inferences
- INFERRED (arithmetic, not documented): on a 200k-token window, 1% is about 2,000 tokens, or roughly 8,000 characters. That fits only about five entries at the full 1,536-character cap, or about 40 at 200 characters. On a 1M-token window, 1% is about 10,000 tokens. The 8,000-character fallback matches the 200k case.
- INFERRED: a skill whose description is dropped can still be run by slash command or by name, but auto-triggering falls off sharply. The settings doc says "less likely to choose one on its own." Because the least-invoked skills lose descriptions first, a rarely used skill tends to stay rarely used.

### Gaps
- The docs do not say whether "least invoked" is counted per session, per project or across all history.
- No public figure for claude.ai's listing budget or its truncation behavior.

## 5. Many skills installed: mis-triggering, overlap, description writing, recommended number

### Takeaway
Anthropic warns that every listed skill competes for attention. Too many active skills lowers recall, and broad descriptions "steal" triggers from neighbors. Its advice: write specific third-person what-plus-when descriptions, run trigger and coexistence evals, consolidate overlapping skills only when evals confirm, bundle by role, and stop adding skills when recall degrades. It gives no recommended count, apart from the API's hard cap of 20 per request and the line that Claude may choose "from potentially 100+ available Skills."

### Cited Findings
- "Recall limits: As a general guideline, limit the number of Skills loaded simultaneously to maintain reliable recall accuracy. Each Skill's metadata (name and description) competes for attention in the system prompt. With too many Skills active, Claude may fail to select the right Skill or miss relevant ones entirely. Use your evaluation suite to measure recall accuracy as you add Skills, and stop adding when performance degrades." Source: [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)
- "If a role requires more Skills than a single request supports, consider consolidating narrow Skills into broader ones or routing requests to different Skill sets based on task type." Source: [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)
- "Skills can degrade agent performance if they trigger incorrectly, conflict with other Skills, or provide poor instructions." Coexistence example failure: "New Skill's description is too broad, stealing triggers from existing Skills." Triggering example failure: "Skill triggers on every spreadsheet mention, even when the user just wants to discuss data." Source: [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)
- Evals: 3 to 5 (source writes it with a range dash) "representative queries per Skill, covering cases where the Skill should trigger, should not trigger, and ambiguous edge cases"; test across Haiku, Sonnet and Opus. Remedy for "Coexistence conflicts: Consolidate overlapping Skills or narrow descriptions." Source: [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)
- "Start specific, consolidate later... Merge narrow Skills into a broader one only when the consolidated Skill's evaluations confirm equivalent performance." "Role-based bundles... Each role-based bundle should contain only the Skills relevant to that role's daily workflows." Source: [Skills for enterprise](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/enterprise)
- "The description is critical for skill selection: Claude uses it to choose the right Skill from potentially 100+ available Skills." Source: [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- "Always write in third person. The description is injected into the system prompt, and inconsistent point-of-view can cause discovery problems." Good: "Processes Excel files and generates reports." Avoid "Helps with documents", "Processes data", "Does stuff with files." Source: [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- Naming: gerund form recommended (`processing-pdfs`); avoid "Vague names: `helper`, `utils`, `tools`", "Overly generic: `documents`, `data`, `files`", "Inconsistent patterns within your skill collection." Source: [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- "The 'name' and 'description' in your Skill's metadata are particularly critical. Claude uses these when determining whether to trigger the Skill." Evaluation-first: "Create evaluations BEFORE writing extensive documentation"; checklist item "At least three evaluations created." Source: [Best practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
- Claude Code troubleshooting. Not triggering: "Check the description includes keywords users would naturally say", "Verify the skill appears in `What skills are available?`". Triggering too often: "Make the description more specific" and "Add `disable-model-invocation: true` if you only want manual invocation." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Claude stops following a skill: rules that must always hold go in a hook, since "Claude Code runs a hook every time its event occurs... whether or not Claude is following the skill." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- skill-creator plugin "Description tuning: generates should-trigger and should-not-trigger prompts, measures the hit rate, and proposes description edits when the skill activates on the wrong requests." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- claude.ai: "Create separate skills for different purposes rather than a single skill that's meant to do everything." Source: [Using skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
- Blog: "Pay special attention to the name and description of your skill"; "We recommend installing skills only from trusted sources." Source: [Engineering blog](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

### Inferences
- INFERRED: two failure modes are documented separately and stack. (a) Attention dilution: many listed descriptions lower selection recall (enterprise page). (b) Hard truncation: past 1% of context, Claude Code deletes descriptions outright (skills page). A large library hits (b) mechanically and also suffers (a).
- TENSION: the claude.ai guidance ("separate skills for different purposes") and the enterprise advice ("start specific, consolidate later") push toward more, narrower skills, while recall limits and the listing budget push toward fewer. Anthropic resolves this only by "measure with evals."

### Gaps
- No official recommended number of skills for Claude Code or claude.ai. "100+" is a framing for description quality, not a recommendation.
- No published data on how far recall falls as skill count rises.

## 6. Plugins and marketplaces bundling many skills

### Takeaway
An enabled plugin puts the name and description of every model-invocable skill, agent and command into context on every turn of every session, used or not. Anthropic surfaces this as a "Context cost" figure (highlighted at 2,000 tokens or more) and tells authors to shorten descriptions or split large plugins. Plugin skills are exempt from `skillOverrides`; you manage them by enabling or disabling the whole plugin.

### Cited Findings
- "An enabled plugin is part of every session, not only the sessions where you use it... for each skill, agent, and command that Claude can invoke on its own, the name and description are in Claude's context on every turn so that Claude knows it exists. Those tokens count toward your usage and leave less room in the context window even in sessions where nothing from the plugin runs. The full text of a skill or agent loads only when it's used." Source: [Plugins overview](https://code.claude.com/docs/en/plugins/overview)
- "Use a plugin when you want several skills, subagents, hooks, or MCP servers packaged as one unit." Source: [Plugins overview](https://code.claude.com/docs/en/plugins/overview)
- Before install: "Plugins in Anthropic's official marketplace show a Context cost estimate there." The details pane shows "an `Every turn:` line and a `When invoked:` line. When the always-on figure is 2,000 tokens or more, the `Every turn:` line appears highlighted." "A plugin in your own marketplace has no Context cost section." Source: [Measure plugin cost](https://code.claude.com/docs/en/plugins/measure)
- `claude plugin details <name>` reports "Always-on" tokens ("the number every user carries, and the one to reduce") and per-component on-invoke cost. Example plugin with 3 skills and 1 agent: "Always-on: ~146 tok"; hooks are "harness-only, no model context cost." Source: [Measure plugin cost](https://code.claude.com/docs/en/plugins/measure)
- "Lower the always-on figure: Shorten skill and agent descriptions. Split a large plugin so users install only the components they need." Caveat: "a shorter one can stop the skill triggering. After you trim descriptions, check triggering with a `tool_used: Skill` grader." Source: [Measure plugin cost](https://code.claude.com/docs/en/plugins/measure)
- Unused detection: a plugin moves under "Not used recently" "once it has gone unused for at least 14 days and 10 sessions"; `/doctor` "recommends disabling the ones that were not used"; `/skill-doctor` flags never-invoked skills "including skills from plugins." Source: [Measure plugin cost](https://code.claude.com/docs/en/plugins/measure)
- "Plugin skills are not affected by `skillOverrides`. Manage those through `/plugin` instead." Source: [Claude Code skills](https://code.claude.com/docs/en/skills)
- Install scopes: user, project (committed `.claude/settings.json`) and local. "A cloud session, including one in the browser at claude.ai/code, doesn't load the plugins in your local settings." Source: [Plugins overview](https://code.claude.com/docs/en/plugins/overview)
- anthropics/skills installs as a marketplace: `/plugin marketplace add anthropics/skills`, then `document-skills` or `example-skills` from `anthropic-agent-skills`. Disclaimer: "These skills are provided for demonstration and educational purposes only." Source: [anthropics/skills](https://github.com/anthropics/skills)
- Fleet telemetry: `claude_code.skill_activated` event, plus the Enterprise Analytics API `GET /v1/organizations/analytics/plugins` for per-plugin install and invocation counts. Source: [Measure plugin cost](https://code.claude.com/docs/en/plugins/measure)

### Inferences
- INFERRED: installing a broad multi-skill plugin is all-or-nothing for context cost, because you cannot collapse individual plugin skills to name-only. That makes many-skill plugins the main way a skill library outgrows the 1% listing budget.
- INFERRED: synced claude.ai skills appear in Claude Code under the reserved `anthropic-skills:` namespace and are listed under "claude.ai sync" in `/context`, so they count toward the same listing.

### Gaps
- CONFLICT on sharing: the platform overview says claude.ai custom skills are "individual to each user... cannot be centrally managed by admins," while the help center says "Owners of Team and Enterprise organizations can provision skills for all users," and the enterprise page describes org-level skill scanning. The overview page appears out of date on this point.
- The docs do not say whether plugin skills count toward the same 1% listing budget as personal and project skills, though plugins overview implies they share the per-turn listing (INFERRED).
