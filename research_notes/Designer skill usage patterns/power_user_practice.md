# How power users manage installed Claude Code skills (2025 to Oct 2026)

Source quality key used below: MEASURED (a test with stated trials), PRIMARY (GitHub issue, official docs, author's own post), OPINION (practitioner judgment), SECONDHAND (relayed, original not found).

## 1. How many skills do power users keep installed?

### Takeaway
No survey or representative count exists. The only hard counts come from GitHub bug reports filed by heavy users, and they range from about 30 to 290 skills. Those reporters are self-selected because they hit the listing budget, so they show the high end, not the typical user. Published "what I actually use" posts land on 8 to 10.

### Cited Findings
- PRIMARY: Reporter of #81081 had 36 project skills (about 17.7k chars of description) plus about 30 personal skills; 27 of the 36 arrived name-only. Commenters reported 50 personal skills (about 183 discoverable including plugins, 16 of 50 dropped), 77 listed skills (7 dropped), and one user growing from 189 to 290 SKILL.md files, with 135 of 249 user skills dropped at one point and only 28 keeping text at 253 skills. That user had usage records for only 44 of 255 skills. [Issue #81081](https://github.com/anthropics/claude-code/issues/81081)
- PRIMARY: #68135 warning showed "81 descriptions dropped" with the listing at 3.2% of context against a 1% budget; a commenter had about 50 project skills and saw silent truncation start between 22,924 and 23,400 cumulative description characters. [Issue #68135](https://github.com/anthropics/claude-code/issues/68135)
- PRIMARY: #89123 (Aug 2026) quotes a warning that 1,274 additional skills were not included in the model-visible list. Unclear whether that is the reporter's own setup. [Issue #89123](https://github.com/anthropics/claude-code/issues/89123)
- PRIMARY: #57515 reports 19 skills from a single plugin losing their descriptions with no warning. [Issue #57515](https://github.com/anthropics/claude-code/issues/57515)
- OPINION: "The Claude Community Built 1,600 Skills. These 8 Are the Only Ones I Actually Use" [Medium, dkspeaks](https://dkspeaks.medium.com/the-claude-community-built-1-600-skills-these-8-are-the-only-ones-i-actually-use-5d96acfe9e3d); "The 10 Claude Code Skills I Actually Use at Work" [welcomedeveloper.com](https://www.welcomedeveloper.com/posts/the-10-claude-code-skills/)
- OPINION/anecdote: A Substack author installed all 47 skills from a viral list, tested each against vanilla output, and found 40 made output worse (relayed by search summary; not opened directly). [responseawareness.substack.com](https://responseawareness.substack.com/p/scaling-claude-code-skills-without-6a6)
- Ecosystem size, third party: SkillsMP reportedly indexed 2,167,429 SKILL.md files as of 9 Jul 2026; bundles like alirezarezvani/claude-skills ship 380+ skills in one install. [fast.io directory](https://fast.io/resources/awesome-claude-skills-directory-2026/); [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)

### Inferences
- Large counts mostly come from bulk bundles and plugins, not hand-curated skills. The #81081 user with 255 skills had usage history on 44, which suggests most installed skills are never invoked.
- The "8 to 10 I actually use" posts and the 44-of-255 figure point the same way: actively used sets are small even when installed sets are large.

### Gaps
- No survey, no shared dotfiles census, no Reddit counts found (search did not index r/ClaudeAI or r/ClaudeCode threads). Do not quote a "typical" number.

## 2. What practitioners report about having many skills installed

### Takeaway
Two distinct failures get reported. First, under-triggering: Claude ignores skills that match, even with few installed. Second, budget overflow: past a certain total description length, Claude Code drops descriptions (least-used first), so those skills become nearly invisible to auto-routing. Wrong-skill selection is reported much less often than non-selection.

### Cited Findings
- PRIMARY: Multiple issues report Claude ignoring skills whose description matches the request: #20986 ("address coderabbit's comments" matched a skill exactly, Claude did the work by hand), #19308 (Skill tool skipped despite "BLOCKING REQUIREMENT" wording), #15136, #12679, #9716. [#20986 mirror](https://claudeissues.com/issue/20986-claude-ignores-skill-triggers-even-when-user-request-clearly-matches-skill-descr); [#19308 mirror](https://claudeissues.com/issue/19308-critical-claude-systematically-ignores-skill-tool-despite-explicit-blocking-requ); [#12679 mirror](https://claudeissues.com/issue/12679-skills-dont-automatically-start). Mirrors, not github.com pages, so status not confirmed.
- PRIMARY: Scott Spence (Nov 2025, updated Sep 2026): his `research` skill "was ignored every time" even with matching trigger words; a gentle reminder hook was acknowledged then ignored. He quotes the showcase repo: "Claude Code skills just sit there. You have to remember to use them." [scottspence.com](https://scottspence.com/posts/claude-code-skills-dont-auto-activate)
- PRIMARY: Context cost when the listing overflows: the #68135 warning says opting into a larger budget "would cost ~6k tokens for skills every session and uses rate limits faster." [Issue #68135](https://github.com/anthropics/claude-code/issues/68135)
- PRIMARY: Per-skill cost is small (Simon Willison, 16 Oct 2025: "each skill only takes up a few dozen extra tokens"), but it adds up. tokc measured 29 skills at about 2,787 tokens of per-session overhead. [Simon Willison](https://simonwillison.net/2025/Oct/16/claude-skills/); [tokc on PyPI](https://pypi.org/project/tokc/)
- PRIMARY: Feedback loop: descriptions drop from the least-invoked skills, so a skill that rarely fires loses its description and fires even less. Stated in docs ("starting with the skills you invoke least") and confirmed by maintainer bcherny as intended behavior. [Claude Code docs](https://code.claude.com/docs/en/skills); [Issue #81081](https://github.com/anthropics/claude-code/issues/81081)
- PRIMARY: Silence is the main complaint: #64606 says there was no warning, log or status indicator when descriptions were removed, which caused real routing mistakes. bcherny agreed the silence is fair criticism and left #81081 open. [Issue #64606](https://github.com/anthropics/claude-code/issues/64606); [Issue #81081](https://github.com/anthropics/claude-code/issues/81081)
- PRIMARY: Duplicate plugin copies (marketplaces/ and cache/) can double-count and trigger drop warnings. [Issue #59423](https://github.com/anthropics/claude-code/issues/59423)
- MEASURED (Spence, Feb 2026): when Claude activated a skill it never picked the wrong one; the problem was whether it activated at all. [scottspence.com](https://scottspence.com/posts/measuring-claude-code-skill-activation-with-sandboxed-evals)
- MEASURED, very small (StationX): a vague description fired on the wrong near-miss request 2 of 9 times; a specific one 0 of 9. [StationX](https://app.stationx.net/articles/claude-code-skills)
- OPINION: Users respond by forcing skills manually: explicit `Skill(name)` in prompts (Spence), CLAUDE.md lines like "Use /pr-review before every PR" (mcp.directory), or always-loaded AGENTS.md for must-apply gotchas because it "is always loaded and therefore much more reliable" (HN user sinuhe69). [Spence](https://scottspence.com/posts/claude-code-skills-dont-auto-activate); [mcp.directory](https://mcp.directory/blog/why-your-claude-skill-isnt-activating-2026-fixes); [HN](https://news.ycombinator.com/item?id=49598293)

### Inferences
- Under-triggering happens at any count (Spence saw it with one skill). Budget overflow is the count-dependent failure. Many installed skills make under-triggering worse for the least-used ones through the drop order.
- The practical threshold in the reports is total description characters, not skill count. One measurement put silent truncation near 23k characters on that user's setup.

### Gaps
- No controlled study of activation rate versus number of installed skills. Spence tested with 4 skills.

## 3. Measured studies on skill activation reliability

### Takeaway
One well-documented series (Scott Spence) and one unverifiable secondhand study. Baseline auto-activation is roughly a coin flip in Spence's tests; a forced-evaluation hook took it to 100% on Sonnet 4.5 for easy prompts and 75% on harder ones, and that hook later stopped being obeyed.

### Cited Findings
- MEASURED (Spence, early hook tests, Nov 2025): a single generic hook over 20 sessions activated the skill 4/10 global and 5/10 project-level. [scottspence.com](https://scottspence.com/posts/claude-code-skills-dont-auto-activate)
- MEASURED (Spence, 200+ tests on Haiku 4.5): best two hook approaches reached about 84% and 80%, versus about 50% for a simple hook. [scottspence.com](https://scottspence.com/posts/how-to-make-claude-code-skills-activate-reliably)
- MEASURED (Spence, 8 Feb 2026): `claude -p` in fresh Daytona sandboxes, Sonnet 4.5, 4 Svelte skills, 22 prompts, 2 runs, about 250 invocations, $5.59 total. Activation: baseline 55% / 50%; simple hook 59% / 50%; forced-eval 100% / 100%; LLM-eval 100% / 100%; type-prompt 55% / 41%. On 24 harder prompts (5 should trigger nothing): forced-eval 75% accuracy with 5/5 true negatives and 0 false positives; LLM-eval 67% with 1/5 true negatives and 4 false positives. [scottspence.com](https://scottspence.com/posts/measuring-claude-code-skill-activation-with-sandboxed-evals)
- PRIMARY, not measured (Spence, 22 Mar 2026): the forced-eval UserPromptSubmit hook he relied on for months began to be ignored; Claude "ploughs straight past it." Fix was a "Step 0" rule in a 19-line global CLAUDE.md; "noticeably more reliable," with occasional skips. [scottspence.com](https://scottspence.com/posts/how-to-make-claude-code-follow-hook-instructions)
- SECONDHAND: a 650-trial factorial study attributed to Ivan Seleznov (3 skills, 3 description variants, 4 environments, 18 queries, 3 reps) reportedly found a directive "ALWAYS invoke this skill when..." description hit 100% in bare conditions, while a typical passive description fell to 37% once hooks were added. Original not found. [mcp.directory](https://mcp.directory/blog/why-your-claude-skill-isnt-activating-2026-fixes); [HackerNoon](https://hackernoon.com/lite/navigating-claude-code-skills-that-actually-fire)
- PRIMARY: diet103's claude-code-infrastructure-showcase (about 6 months of iteration) uses a UserPromptSubmit hook plus `skill-rules.json` (keywords, intent patterns, file paths, content patterns; enforcement block/suggest/warn) to push activation. [README](https://cdn.jsdelivr.net/gh/diet103/claude-code-infrastructure-showcase@main/README.md)
- PRIMARY: Jesse Vincent's Superpowers ships a `using-superpowers` meta-skill that requires checking for and invoking a matching skill before any response; mirrors describe it as "not negotiable." A Socket audit flagged it low-severity for compelling invocation of other skills. [skills.sh mirror](https://www.skills.sh/jord5s/superpowers/using-superpowers); [Socket audit](https://www.skills.sh/mvanhorn/superpowers/using-superpowers/security/socket)
- PRIMARY: Anthropic now offers measurement: `claude plugin eval` with a `tool_used: Skill` grader, and skill-creator generating should-trigger and should-not-trigger prompts. [Claude Code docs](https://code.claude.com/docs/en/skills)
- Vendor claim, treat as marketing: claudefa.st advertises "100% skill loading" from its activation hook. [claudefa.st](https://claudefa.st/blog/tools/hooks/skill-activation-hook)

### Inferences
- Results depend on model and harness version and drift over time (Spence's hook worked, then didn't). Any activation number needs a date and model attached.
- Forcing evaluation can raise false positives depending on design (LLM-eval 4 false positives).

### Gaps
- No independent replication of Spence; Seleznov study unverified; no test across large skill counts.

## 4. Common recommended practices

### Takeaway
Consensus: keep the set small and curated, write short directive descriptions with the trigger first, set manual-only skills to `disable-model-invocation`, use hooks or CLAUDE.md for rules that must always hold, and prune periodically using usage data. Project versus global scope is documented but rarely argued.

### Cited Findings
- PRIMARY (docs): `disable-model-invocation: true` removes the description from context and makes the skill manual-only; recommended for side-effecting workflows like `/deploy`. `skillOverrides` supports "on", "name-only", "user-invocable-only", "off" (not for plugin skills; those go through `/plugin`). [Claude Code docs](https://code.claude.com/docs/en/skills)
- PRIMARY (docs): put the key use case first; combined description and when_to_use capped at 1,536 chars (`skillListingMaxDescChars`); listing budget 1% of context (`skillListingBudgetFraction`, or `SLASH_COMMAND_TOOL_CHAR_BUDGET`). `/doctor` estimates listing cost; `/skill-doctor` shows per-skill cost and invocation history, and "skills that are listed but never invoked are candidates to turn off." [Claude Code docs](https://code.claude.com/docs/en/skills)
- PRIMARY (docs): for a rule that must hold every time, "move the rule into a hook"; after compaction only the start of an invoked skill is kept, so put key instructions at the top. [Claude Code docs](https://code.claude.com/docs/en/skills)
- PRIMARY (docs): scopes are enterprise, personal (`~/.claude/skills`, all projects), project (`.claude/skills`, committed), nested subdir, plugin (namespaced). Personal beats project on name conflict. [Claude Code docs](https://code.claude.com/docs/en/skills)
- OPINION/SECONDHAND (HN "Ask HN: How do you manage skills files?", ~Sep 2026): fallinditch relays that Boris Cherny recommends deleting skills and hooks every so often and watching how the model does without them ("read somewhere," unconfirmed); synergy20 calls that "slow and very subjective"; tstrimple has Claude Code audit the whole setup after every major model or harness release and says his CLAUDE.md has been shrinking. [HN](https://news.ycombinator.com/item?id=49598293)
- OPINION: Anthropic guidance, as summarized by a third party, calls for somewhat "pushy" descriptions because Claude tends to undertrigger, but advises explaining reasoning over all-caps ALWAYS/NEVER. This sits in tension with the secondhand 650-trial result. [wmedia.es](https://wmedia.es/en/tips/claude-code-create-skills-anthropic-rules)
- OPINION: Spence keeps global CLAUDE.md short (19 lines) and moves the rest into on-demand skills. [scottspence.com](https://scottspence.com/posts/how-to-make-claude-code-follow-hook-instructions)
- OPINION: Avoid overlapping descriptions and duplicate names across personal skills and plugins; test with near-miss prompts. [horadecodar.com.br](https://horadecodar.com.br/conflito-entre-skills/)

### Inferences
- The tooling Anthropic added in 2026 (`/skill-doctor`, usage-ranked drops, `skillOverrides`, plugin eval) formalizes prune-by-usage as the expected practice.

### Gaps
- No source compares project-scoped versus global setups on reliability.

## 5. GitHub issues on anthropics/claude-code

### Takeaway
A dense cluster from mid 2026 on budget truncation, plus earlier issues on non-triggering. Anthropic's position (bcherny) is that drops are intended, documented behavior; the open complaint is that they happen silently.

### Cited Findings
- [#81081](https://github.com/anthropics/claude-code/issues/81081): silent truncation of most descriptions; opened 25 Jul 2026; open; labeled reproduced; maintainer reply 16 Aug 2026.
- [#68135](https://github.com/anthropics/claude-code/issues/68135): 81 descriptions dropped; opened 13 Jun 2026; closed completed 19 Aug 2026.
- [#89123](https://github.com/anthropics/claude-code/issues/89123): request for relevance-based (top-K, embedding or tags) skill loading; opened 24 Aug 2026; no maintainer response; marked stale 3 Oct 2026.
- [#64606](https://github.com/anthropics/claude-code/issues/64606): budget silently truncates routing info, causing routing failures.
- [#57515](https://github.com/anthropics/claude-code/issues/57515), [#56710](https://github.com/anthropics/claude-code/issues/56710), [#56966](https://github.com/anthropics/claude-code/issues/56966), [#60560](https://github.com/anthropics/claude-code/issues/60560), [#59423](https://github.com/anthropics/claude-code/issues/59423): related truncation and duplicate-copy reports; several closed, some as not planned (per search summary).
- Non-triggering: #9716, #12679 (opened 29 Nov 2025, closed early Dec), #15136, #19308, #20986 (opened 26 Jan 2026, closed 30 Jan) via [claudeissues.com mirrors](https://claudeissues.com/issue/20986-claude-ignores-skill-triggers-even-when-user-request-clearly-matches-skill-descr).
- Slash invocation regressions: #32865 (skills invoked by slash command not loading), #38413 (Skill tool cannot invoke custom commands). [#32865 mirror](https://claudeissues.com/issue/32865-bug-claude-code-no-longer-load-skills-invoked-by-slash-commands); [#38413 mirror](https://claudeissues.com/issue/38413-skill-tool-cannot-invoke-custom-slash-commands-from-claude-commands-or-claude-sk)

### Inferences
- Budget mechanics changed across versions (older posts cite 250-char descriptions and 4k-token or 8k-char budgets); current docs say 1,536 chars and 1% of context. Cite numbers with a version or date.

### Gaps
- Exact current status of the mirrored non-triggering issues not confirmed on github.com. No X/Twitter or Reddit sources surfaced through search.
