# Skills and MCP setup

Written 4 Nov 2026. A proposal: nothing has been turned off, moved or deleted. Each change waits for Chadwick's yes.

## The one page explainer

Think of skills as recipe cards. Claude does not read every card at the start of a session. It reads the title and the one line on the back of every card, so it knows which card to pull when a task needs it. That one line is the cost. Every card you keep switched on costs its line in every single session, even sessions that never use it.

There are three places a card can live. The only difference between them is **where it shows up**.

| Where it lives | Shows up in | Think of it as | How to switch it off |
|---|---|---|---|
| **Personal**: `~/.claude/skills` | Every project on this Mac | Your backpack. It goes everywhere you go | Delete or move the folder |
| **Project**: `<repo>/.claude/skills` | Only that one repo | A drawer in that one desk. It stays with the repo | Delete or move the folder |
| **Account or plugin**: skills you uploaded to claude.ai, and bundles like figma or design | Every session in the Claude app, every project | A subscription box. It arrives everywhere | A toggle in claude.ai or the app. The skill is kept, just not loaded |

MCP servers (connections to Figma, Notion and so on) follow the same idea with different words:

| MCP word | Means | Stored in |
|---|---|---|
| User | Every project | `~/.claude.json` |
| Project | One repo, shared through git | `.mcp.json` in the repo |
| Local | One repo, just you | `~/.claude.json`, under that repo's path |
| Connector | Every session, set up in claude.ai | Your claude.ai account |

MCP tools are cheaper than skills per item. Claude Code lists each tool's name and loads the full details only when it searches for that tool. But a connection with 70 tools still adds 70 names to every session.

**Why the warning keeps coming:** the skill list gets a fixed allowance, 1% of the session's memory. When the cards outgrow it, Claude Code drops the one line descriptions of the cards you use least. A card with no description cannot be matched to a task, so it never triggers. Past the allowance, more cards make Claude worse at picking the right one, not better.

**The safe way to keep "might need it later" skills:** switch them off rather than delete them. Account skills keep their files in claude.ai when toggled off. Personal and project skills can sit in a folder Claude does not read. The list of what is off and what it is for lives in this file (below), so nothing is forgotten.

## What is installed now

Measured in this session (1M context window):

| Item | Context cost |
|---|---|
| Skill list | 9,922 tokens, which is the full 1% allowance. It is full |
| MCP tool names | 32,101 tokens |
| MCP server instructions | 4,254 tokens |

| Place | Count | Notes |
|---|---|---|
| Account skills (claude.ai, shown as `anthropic-skills:`) | 161 on: 142 yours, 19 Anthropic's | Yours alone carry 33,485 characters of description, about 8,400 tokens. Together they overflow the allowance, so many descriptions are already being dropped |
| Personal (`~/.claude/skills`) | 17 | fix-the-process, framer, framer-code-components, motion-studio, poster-style-transfer, recall, systematic-debugging, transcripts, unlazy, ux-flow-designer, watch, plus the 6 GSAP skills installed today |
| Portfolio project | 6 | about-page, code-motion, fix-the-process, humanizer, no-ai-slop, unlazy |
| Mondai project | 12 | its own set, not reviewed here |
| Claude Code plugins | 2 on, 3 off | On: figma, claude-md-management. Off: remember, pm-product-discovery, pm-execution |
| Claude app plugins | 5 | figma (16 skills), design (7 skills and 9 connections, 6 never signed in), pdf-viewer, cowork-plugin-management, ai-firstify |
| MCP, user scope | 1 | figma-mondai, signed in as the Mondai work account (Rita Dev, View seat) |
| Connectors | several | Figma on your own account, Notion (about 70 tools, the largest), artifacts and the app's own tools |

**Duplicates found:** unlazy has 4 copies (personal, portfolio, Mondai, account). fix-the-process 2 (personal, portfolio). humanizer and no-ai-slop 2 each (portfolio, account). systematic-debugging 2 (personal, account). gsap-scrolltrigger 2 (the old account one, now the official one). remember 2 (account skill, plus the plugin that is off). grill-me and grilling do the same job. The Figma server is declared four times (figma-mondai, the Figma connector, the figma plugin in Claude Code and the figma and design plugins in the app); only the two signed in to different accounts do anything different.

## Recommendation

**1. Turn off 100 of your 142 account skills in claude.ai, keep them listed below.** This is the biggest win. It frees the allowance so the skills you keep actually trigger. Nothing is lost: claude.ai keeps each one and a toggle brings it back.

**2. Move figma-mondai out of every session and into the Mondai repo only.** It is the work account, CS2 must never use it (HANDOFF, 3 Nov) and it is user scope today, so it loads in the portfolio too. Re-add it as local scope for `~/Code/Mondai`. The portfolio keeps the Figma connector on your own account.

**3. One home per skill.** Each duplicate keeps one copy, chosen by where it is used:

| Skill | Keep | Remove |
|---|---|---|
| unlazy | personal | portfolio, Mondai and account copies |
| fix-the-process | personal | portfolio copy |
| humanizer, no-ai-slop | portfolio copies, if you only use them for portfolio writing; otherwise account | the other |
| systematic-debugging | personal | account copy |
| gsap-scrolltrigger | official personal copy | old account copy (it teaches deprecated patterns) |
| grill-me and grilling | grilling | grill-me |

**What stays global:** the 19 Anthropic account skills (documents, browser, computer use, skill creator), the GSAP skills, motion-studio, recall, fix-the-process, unlazy, systematic-debugging, transcripts, watch, the figma plugin and about 40 of your own account skills: writing and critique, case-study, impeccable, frontend-design, heuristic-evaluation, motion-design, animation-principles, motion-system, micro-interaction-spec, scrollytelling, information-architecture, user-flow-diagram, ux-writing, visual-hierarchy, typography-scale, interfaces-that-feel, brainstorming, grilling, blindspot-audit, resource-sourcing, skill-shortlist, humanizer and no-ai-slop.

**What goes project only:** framer and framer-code-components move into the repo of the Framer site they serve (none here uses Framer). ux-flow-designer moves to Mondai if that is where it is used. figma-mondai goes to Mondai as above.

**What to archive:** poster-style-transfer moves to `~/.claude/skills-archive/`, a folder Claude does not read. Everything in the table below is switched off in claude.ai.

### Saved for later (switch off in claude.ai, turn back on when needed)

| Group | Skills | Turn on when |
|---|---|---|
| Motion libraries not in use | animejs, barba-js, locomotive-scroll, lottie-animations, rive-interactive, spline-interactive, threejs-webgl, react-three-fiber, react-spring-physics, remotion-best-practices, scroll-reveal-libraries, animated-component-libraries, lightweight-3d-effects, motion-framer, gsap-scrolltrigger (old copy, retire) | A project picks that library |
| Engineering stacks | vercel-composition-patterns, vercel-react-best-practices, vercel-react-native-skills, vercel-react-view-transitions, agent-browser, image-to-code, imagegen-frontend-mobile, imagegen-frontend-web | You build in React, Next or React Native |
| Visual style packs | industrial-brutalist-ui, minimalist-ui, stitch-design-taste, design-taste-frontend-v1, high-end-visual-design, sleek-design-mobile-apps, modern-web-design, top-design, brandkit, illustration-style | You want a set style as a starting point |
| Design ops and planning | a-b-test-design, accessibility-test-plan, click-test-plan, design-sprint-plan, design-system-adoption, design-system-governance, design-review-process, design-impact-reporting, design-negotiation, stakeholder-alignment, team-workflow, version-control-strategy, metrics-definition, north-star-vision, opportunity-framework, prototype-strategy, research-repository, test-scenario, documentation-template, presentation-deck, business-design, service-blueprint, experience-map, affinity-diagram, content-strategy | Running a team process or writing a plan of that kind |
| Design detail specs | component-spec, design-token, design-token-audit, color-system, spacing-system, layout-grid, readable-measure, dark-mode-design, responsive-design, navigation-patterns, search-ux, loading-states, error-handling-ux, onboarding-design, state-machine, wireframe-spec, design-qa-checklist, design-debt-audit, design-principles, data-visualization, aesthetic-usability | Speccing a component or system (CS3 is the likely trigger) |
| Utility and one offs | caveman, cavecrew, caveman-commit, caveman-compress, caveman-review, obsidian-vault, read-aloud, scaffold-exercises, teach, ubiquitous-language, ledger, handoff, handoff-spec, writing-skills, write-a-skill, skill-inspector, full-output-enforcement, evaluation-rubrics, edit-article, grill-me, remember | The specific job comes up |

Also worth a look: the design plugin's 6 connections that were never signed in (Asana, Atlassian, Intercom, Linear, Notion, Slack) can go if you do not use them. Notion is the largest connector; switch it off in sessions that do not touch Notion.

### Skills that cannot work as set up today

Checked 4 Nov 2026 by reading every skill for what it needs outside itself, then checking whether that thing is on this Mac or connected.

| Skill | Where it lives | Needs | Status | Proposal |
|---|---|---|---|---|
| sleek-design-mobile-apps | account | A Sleek API key | No key set. Cannot work | Switch off |
| agent-browser | account | The agent-browser program | Not installed. Cannot work, and the built-in browser does the same job | Switch off |
| morning | account (Anthropic) | Calendar, email and chat connectors | None connected. Cannot work | Switch off |
| google-workspace | account (Anthropic) | Google Drive, Docs or Sheets connectors | None connected. Cannot work | Switch off |
| framer, framer-code-components | personal | A one time Framer setup and a Framer site | Setup never run, no Framer site in any repo | Move to `~/.claude/skills-archive/` |
| watch | personal | yt-dlp and ffmpeg, plus an OpenAI key for videos with no captions | yt-dlp and ffmpeg are installed, no key set. Works on captioned videos only | Keep |

Everything else that mentions Figma, Notion or Slack mentions it as advice or an optional extra, and works without it. obsidian-vault works: the vault is at `~/Documents/Obsidian Vault`.

### Tools for later

- `/doctor` in a terminal session shows the skill list's cost and its biggest contributors. `/skill-doctor` finds skills you never use.
- A setting called `skillOverrides` in a repo's `.claude/settings.json` can switch a personal skill off in that one repo, or list it by name only. It does not work on plugin or account skills.

## Installed today

The official GSAP skills from GreenSock (github.com/greensock/gsap-skills, MIT), personal scope, so they work in every repo the motion studio goes into: gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-plugins, gsap-utils, gsap-performance. gsap-react and gsap-frameworks skipped. Copied by hand from commit aed9cfd because the `npx skills add` installer was blocked; each folder has a `SOURCE.txt` saying how to update it. Confirmed loading in a live session. No site's GSAP version was changed.

Sources: [Claude Code skills docs](https://code.claude.com/docs/en/skills), [Claude Code MCP docs](https://code.claude.com/docs/en/mcp), [GSAP skills README](https://github.com/greensock/gsap-skills), [feature request on per project skill toggles](https://github.com/anthropics/claude-code/issues/37463), [SkillScope](https://github.com/arsyadal/SkillScope).
