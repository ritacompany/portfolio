# How product designers use Claude Code skills (2025 to Oct 2026)

Scope note: the evidence base is almost entirely practitioner write-ups, vendor or pack-author posts, marketplace install counters and one Reddit thread. **I found no survey that measures designers' skill counts, skill sources or triggering habits.** Every number below is labelled HARD (a counter or a survey) or ANECDOTE (one person's account).

## 1. What designers report about their skill setups (counts, named skills, public setups)

### Takeaway
No designer I found posts a full inventory with a count. The personal setups that do get described are small: one to three self-built skills or commands, plus one or two installed ones. The big numbers in this space belong to packs being sold or given away (42, 63, 86 skills), not to setups people say they actually run.

### Cited Findings
- ANECDOTE. Clinton Halpin, a designer on an AI Design team (16 Jan 2026), describes 3 items. Two he built himself: `/prototype-loop` and a `/setup` skill. One is installed: `/ralph-loop`, from Anthropic's claude-code repo. He also uses a notification hook. Source: [Clinton Halpin](https://clintonhalpin.com/blog/using-claude-code-for-product-design/)
- ANECDOTE. Isaac Sanchez, a freelance design engineer, describes one unnamed skill he built for blog drafting into the Framer CMS. He links two installed skills: shadcn's skill and an SQL queries skill. He gives no total. His method is to do the work with Claude first, then have Claude write the skill from what worked. Source: [uxisaac.com](https://www.uxisaac.com/blog/claude-code-skills-ux-design-workflow)
- ANECDOTE. MC Dean (9 Mar 2026) published a free "Designer Skills Collection" of 63 skills and 27 commands in 8 plugins. She tells readers to "browse and install whichever plugins you want" through `/plugin`. The post reports no usage data. Source: [MC Dean Substack](https://marieclairedean.substack.com/p/i-built-63-design-skills-for-claude)
- ANECDOTE (promotional). Tridip Thrizu, a product designer (Mar 2026), sells Solo Design Studio for $99. It contains 42 skills, 6 agents and 14 knowledge notes. He tells buyers to start with one skill, `/audit-ux`. The time savings he claims (15 to 20 hours a week) are self-reported by the seller. Source: [solodesign.cc](https://solodesign.cc/blog/claude-code-for-designers/)
- HARD (repo count, inconsistent). RefoundAI's "Lenny Skills" is a PM-oriented pack drawn from Lenny's Podcast and Newsletter. Different pages list it at 76 or 86 skills. It is curated by Refound AI, not by Lenny. Source: [GitHub lenny-skills](https://github.com/refoundai/lenny-skills); [Sid Bharath](https://sidbharath.com/blog/building-lenny-skills-database/)
- ANECDOTE. A French UX designer (uxbrady) describes a seven-skill set that runs from discovery to handoff. It includes flows and wireframes from a PRD and a microcopy audit. Source: [uxbrady Medium](https://uxbrady.medium.com/claude-skills-pour-les-ux-designers-18672f4a9599)
- ANECDOTE. Lenny's Newsletter covers Claude Skills through Claire Vo and personal productivity through Hilary Gridley. Gridley favours simplicity and letting the AI learn preferences over upfront configuration. Neither post is a designer skill inventory. Source: [Lenny's: Claude Skills explained](https://www.lennysnewsletter.com/p/claude-skills-explained); [Lenny's: Claude Code life OS](https://www.lennysnewsletter.com/p/how-to-turn-claude-code-into-your)
- ANECDOTE. Meaghan Choi, design lead on Claude Code, appeared on Behind the Craft (21 Sep 2025) and on Dive Club. The summaries cover CLAUDE.md files and shortcuts, not named skills. Source: [Behind the Craft](https://creatoreconomy.so/p/full-tutorial-from-design-to-code-with-claude-code-meaghan-choi)
- ANECDOTE. Felix Lee's ADPList guide for designers (Feb 2026) uses MCP (Figma), GitHub and Vercel, with plain-English prompts. It mentions no skills at all. That suggests many designer onboarding guides skip skills entirely. Source: [ADPList Substack](https://adplist.substack.com/p/claude-code-guide-for-designers)

### Inferences
- Where an individual designer describes what they run, the number is in single digits and mostly self-built. The large numbers (42, 63, 86) are pack sizes offered by their authors. They are not evidence that any one designer runs that many.
- The "build a skill from your own session" pattern recurs across sources (Sanchez, and Figma's own guidance below). That points toward personal, process-shaped skills as the practitioner norm.

### Gaps
- No public designer setup with a full skill list and count turned up on X, YouTube or Reddit within my search budget. No r/UXDesign threads surfaced.
- Download or star counts for MC Dean's collection and Solo Design Studio were not found.

## 2. Small curated set vs large community packs

### Takeaway
Install counters show the big community design skills are installed in very large numbers. But the counters are not designer-specific and cannot tell a curated install from a full pack install. The advice from guide writers and Reddit leans clearly toward curating a few skills that don't overlap. Several sources warn that the popular design skills conflict when stacked.

### Cited Findings
- HARD (skills.sh install counter, snapshot 15 Sep 2026, as reported by Critique):

  - `frontend-design` (Anthropic): 887.9K
  - `vercel-react-best-practices`: 714.3K
  - `web-design-guidelines`: 635.2K
  - `design-taste-frontend` (taste-skill): 480.0K
  - `ui-ux-pro-max`: 357.4K
  - `redesign-existing-projects` (taste-skill): 350.3K
  - `vercel-composition-patterns`: 337.0K
  - `impeccable`: 277.2K
  - `find-skills`: 3.4M

  Source: [Critique](https://www.critique.sh/blog/best-ui-skills-for-ai-agents)
- HARD (conflicting snapshots). Skillselion lists `frontend-design` at 862k installs (Oct 2026). Composio reported over 277,000 earlier. An Obsidian note from about 7 months ago listed 155K. The impeccable figures conflict too: one skills.sh snapshot shows 323.2K, Paul Bakaus claimed 160,000 installs and 40,000+ stars at launch, and Critique shows 277.2K in Sep 2026. Source: [Skillselion](https://skillselion.com/best/skills-for-frontend-design); [Composio](https://composio.dev/content/top-design-skills); [Obsidian note](https://publish.obsidian.md/petermilovcik/1+Notes/Skills.sh+-+The+Open+Agent+Skills+Ecosystem)
- HARD (stars). One listing shows taste-skill at about 94k GitHub stars. Source: [skillsllm](https://skillsllm.com/skill/taste-skill)
- CAVEAT. Skills that ship inside a pack inflate the counts, because installing the pack counts every skill in it. Source: [search summary of skills.sh coverage; see Critique and Skillselion above]
- ANECDOTE (guide). Critique advises picking "one direction skill, one implementation/performance skill, and one audit," with polish last. It warns that frontend-design, design-taste-frontend, ui-ux-pro-max and impeccable will "fight each other" when they all run together. Source: [Critique](https://www.critique.sh/blog/best-ui-skills-for-ai-agents)
- ANECDOTE (guide). Hashin Panakkaparambil (1 Oct 2026) recommends installing only what each task needs, for example just `review-animations` from Emil Kowalski's collection. He warns that overlapping skills produce contradictory rules. He notes taste-skill v2 excludes dense dashboards and product UI, which makes impeccable the better fit for product work. Source: [hashp Substack](https://hashp.substack.com/p/claude-code-design-skills-a-guided)
- ANECDOTE (Reddit, r/ClaudeAI, about Mar 2026, "Can Claude Code have 'too many' skills?", 22 comments). Representative comments:
  - "Don't download a bunch of random crap skills"
  - dozens are fine "only if they're well differentiated"
  - "Skills should be scars, not a junk drawer"
  - one commenter uses only skills they built themselves

  Source: [Reddit snapshot](https://reddit.sentinel-team.org/posts/1uhzgtm/snapshots/2026-07-03T03%3A00%3A16.73148Z)
- ANECDOTE (vendor guidance). Figma recommends adapting its Community skills as starting points. For team conventions it says to build your own skill, keep it in a shared repo with versioning and a changelog, keep each skill to one workflow, and not build skills for one-off tasks. Source: [Figma resource library](https://www.figma.com/resource-library/how-to-create-a-skill-in-claude-code/)
- ANECDOTE (supply chain). Impeccable's listing says a licensed rebrand of its playbooks now out-installs the original. One taste-skill mirror offers a curl-to-bash installer. Source: [Skillselion impeccable](https://skillselion.com/skills/pbakaus/impeccable); [search summary of claudemarketplaces / skills listings]

### Inferences
- The install counters measure CLI installs across all users, mostly engineers. They cannot be read as "designers install big packs."
- The consistent warning that design skills conflict when stacked is the strongest practical argument for a small curated set. It appears in pack-neutral guides and in Reddit alike.

### Gaps
- No data splits installs by user role, or by single skill vs whole pack.
- No survey of how many skills designers keep installed.

## 3. Slash command vs automatic triggering, and complaints

### Takeaway
Designer-facing material is split. Tutorials explain automatic triggering from the description. In the workflows designers actually describe, the skills are invoked by name or slash command (`/setup`, `/audit-ux`, `/impeccable craft`, `/discover`). Complaints about skills not firing are well documented, but the documentation is general, not designer-specific.

### Cited Findings
- ANECDOTE. Named and slash invocation in designer sources:
  - Halpin types `/setup` and `/prototype-loop`. Source: [Clinton Halpin](https://clintonhalpin.com/blog/using-claude-code-for-product-design/)
  - Thrizu tells buyers to run `/audit-ux` on a URL. Source: [solodesign.cc](https://solodesign.cc/blog/claude-code-for-designers/)
  - Dean chains skills through `/discover`, `/strategize` and `/handoff`. Source: [MC Dean](https://marieclairedean.substack.com/p/i-built-63-design-skills-for-claude)
  - Panakkaparambil invokes `/design-taste-frontend`, `/review-animations` and `/impeccable craft`. Source: [hashp](https://hashp.substack.com/p/claude-code-design-skills-a-guided)
- ANECDOTE. Impeccable ships a command vocabulary that is explicitly user-invoked: bolder, quieter, distill, harden. Source: [search summary citing impeccable listings](https://skillselion.com/skills/pbakaus/impeccable)
- ANECDOTE (tutorial framing). Some designer guides say skills "load automatically" and you just describe the problem, with slash commands reserved for multi-skill workflows. Source: [Samer Tallauze Medium](https://medium.com/@SamerTallauze/50-claude-code-skills-every-designer-product-manager-should-master-a596d7a69d77) (search snippet only; Medium blocked fetch)
- ANECDOTE (vendor). Figma describes automatic triggering from the description. Its test checklist asks whether the skill fires "at the right moments or needs to be invoked manually." It warns that a description that is empty or too narrow makes triggering unreliable. Source: [Figma](https://www.figma.com/resource-library/how-to-create-a-skill-in-claude-code/)
- HARD-ish (bug report). A GitHub issue reports Claude ignoring skills even when the request clearly matches the description. Source: [claudeissues #20986](https://claudeissues.com/issue/20986-claude-ignores-skill-triggers-even-when-user-request-clearly-matches-skill-descr); see also [Scott Spence: skills don't auto activate](https://scottspence.com/posts/claude-code-skills-dont-auto-activate)
- ANECDOTE (Reddit). Reported triggering problems:
  - "My Claudes routinely seem to forget to read in skills"
  - a "race condition" where the first relevant skill found wins over the best one
  - conflicting org, department and project scoped skills
  - descriptions sharing about a 1% of context budget, capped at 1,536 chars each, then truncated or dropped when there are too many skills (`/doctor` shows how many are affected)

  The 1% figure is a commenter claim I did not verify against official docs. Source: [Reddit snapshot](https://reddit.sentinel-team.org/posts/1uhzgtm/snapshots/2026-07-03T03%3A00%3A16.73148Z)
- ANECDOTE (guide). The usual cause of non-triggering is a description written like documentation rather than as matching rules. Guides advise "pushy" descriptions because Claude tends to undertrigger. Near-identical descriptions (a landing-page skill vs a web-page skill) cause the wrong one to fire. Enterprise-level skills shadow personal ones with the same name. Source: [localskills](https://localskills.sh/blog/claude-skills-not-triggering); [Sherlock](https://sherlock.xyz/post/how-to-write-skills-for-claude-code-and-cowork); [web-developpeur](https://www.web-developpeur.com/en/blog/skills-claude-code-patterns-officiels)
- ANECDOTE. One guide warns that a tutorial's nickname for a skill does not prove the intended instructions loaded. It says to check which file actually resolved. Source: [hashp](https://hashp.substack.com/p/claude-code-design-skills-a-guided)

### Inferences
- In practice, designers who describe real use lean on explicit invocation. That fits the unreliability reports: when auto-triggering is flaky, people call skills by name.
- Unexpected firing (a skill triggering when not wanted) is reported mainly as the wrong skill winning among overlapping ones, not as random firing on unrelated tasks.

### Gaps
- No designer-specific complaint thread about unwanted triggering was found.
- No data on what share of invocations are manual vs automatic.

## 4. Surveys, newsletters, talks

### Takeaway
There is no survey on designers' use of Claude Code skills. The only survey numbers in reach are general: AI use among designers, or Claude Code use among developers.

### Cited Findings
- HARD (secondhand only). Figma's 2026 State of the Designer reportedly found 72% of designers use generative AI. A separate survey reportedly found 59% of designers built their own app or tool with AI in the past six months. Both figures come from a Korean blog, not the primary report. Source: [braindetox](https://braindetox.kr/en/posts/claude_designer_ai_build_2026.html)
- HARD (developers, not designers). A JetBrains survey of more than 10,000 developers (Jan 2026) found 18% use Claude Code at work (24% in US and Canada). A competing claim that 71% of agent users treat Claude Code as their primary tool names no survey and should not be used. Source: [claudify](https://claudify.tech/blog/state-of-claude-code-2026)
- Newsletters and talks with relevant but non-quantitative content:
  - Lenny's Newsletter posts (Claire Vo on skills, Hilary Gridley) Source: [Lenny's](https://www.lennysnewsletter.com/p/claude-skills-explained)
  - Behind the Craft and Dive Club episodes with Meaghan Choi Source: [Behind the Craft](https://creatoreconomy.so/p/full-tutorial-from-design-to-code-with-claude-code-meaghan-choi)
  - Sorted Pixels podcast, Tommaso Nervegna (Feb 2026), no transcript content retrievable Source: [Nervegna](https://nervegna.substack.com/p/claude-code-for-designers-a-practical-ed2)
  - a paid "Claude Code Skills for Product Designers Masterclass" (May 2026) Source: [createwith](https://createwith.com/event/ho-chi-minh-city-claude-code-skills-for-product-designers-masterclass-may-2026)
  - a Maven course "Claude Code for Designers" Source: [Maven](https://maven.com/xinran/claudecodefordesigners)

### Inferences
- The designer skill discourse in 2026 is being shaped by pack authors and course sellers. Their incentive is to present larger collections, so their counts describe supply, not practice.

### Gaps
- I could not locate the primary Figma State of the Designer 2026 report to verify its figures or check for skill-specific questions.
- No Figma Config 2026 talk on skills surfaced.
- UX Collective and Medium pieces were partly blocked (HTTP 403), so their content is from search snippets only.
- No YouTube walkthrough with a counted designer setup was reviewed.
