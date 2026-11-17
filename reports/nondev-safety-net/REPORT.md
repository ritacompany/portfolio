# Safety net for building with Claude when you are not a developer

17 Nov 2026, rewritten the same day around what he asked for: the collected list of what a non developer
misses when building with Claude Code, the resources that cover each blind spot, an audit of his whole
setup against it and a standing process so shortcuts get caught without him knowing where to look.
Nothing on the site was changed by this report.

## The short version

**What is already strong.** His setup is ahead of almost everything shared online on the hardest blind
spot, Claude saying "done" without proof. The unlazy gates, the turn check, the rule without a check
blocker, the setup guard and the site approval gate each do automatically what most "vibe coding"
checklists only tell you to remember. Packages are clean (no known security issues today) and all work is
backed up on GitHub.

**The four gaps that matter, in his words:**

1. **Anyone can read the portfolio repo and the harness repo.** Both are public on GitHub. Every draft, the
   CS1 evidence with colleagues' words, his dictation file and his whole Claude setup are open to anyone.
   The Mondai repo is private.
2. **Nobody checks Claude's work but Claude.** The session that builds something is the same one that says
   it is fine. Nothing has a second, fresh agent review a change before it goes to the live branch.
3. **Work is scattered across branches, with no undo plan for the live site.** 26 of 39 branches on GitHub
   hold work that never reached main, there are 14 working copies on the Mac and this one is 31 changes
   behind main. The live site is built from main, so finished work can sit and never ship, or two sessions
   can undo each other. Nothing written says how to put the previous version back if a launch goes wrong.
4. **Claude can read his private keys.** No settings stop Claude reading folders like his SSH keys.

The site checks (pictures, links, layout) were built earlier today and now run on every push. They are one
section near the end.

## The collection: blind spots and what covers them

What people building with AI agents most often miss, gathered from official docs, security research and
the Claude Code community. Each line names the resource, what it catches and where it comes from.

### Claude saying it is done when it is not

| Resource | What it catches | Source |
|---|---|---|
| Give Claude a check it can run (tests, a screenshot next to the design) | Claims with no proof behind them | Anthropic's Claude Code best practices |
| unlazy (installed) | Ends a turn that claims done while its written checks are unmet | His own setup |
| superpowers, verification before completion | The same idea as unlazy, as a community skill | obra/superpowers on GitHub |
| A second agent review with `/code-review` | Bugs and shortcuts the building session cannot see in its own work | Bundled with Claude Code |
| Research on agents gaming tests | Why this matters: agents including Claude Code were seen cheating on tests instead of doing the work | EvilGenie paper, Nov 2025 |

### Losing work or not being able to undo

| Resource | What it catches | Source |
|---|---|---|
| Commit and push often; Claude's rewind is not a backup | Rewind covers Claude's own edits within a session; a file changed only by a command is not covered | Claude Code checkpointing docs |
| Vercel Instant Rollback | A broken launch; puts the previous live version back (free plan: one step back only) | Vercel docs |
| One live branch, short lived work branches | Finished work stranded on a branch, or sessions overwriting each other | Common git practice |

### Secrets and privacy

| Resource | What it catches | Source |
|---|---|---|
| Repo visibility check | Private drafts and notes published by accident | GitHub settings |
| GitHub push protection | A password or key pushed by mistake is stopped before it lands; on by default for your pushes to public repos | GitHub docs |
| gitleaks | The same check on your own Mac before a commit | gitleaks on GitHub |
| Trail of Bits Claude Code config | Settings that stop Claude reading key folders (~/.ssh, ~/.aws), plus a sandbox so commands cannot get around them | trailofbits/claude-code-config |

### Packages and supply chain

| Resource | What it catches | Source |
|---|---|---|
| Check every new package before it is installed | AI models invent package names (5 percent of suggestions for commercial models, 22 percent for open ones in one large study) and attackers register those names | USENIX Security 2025 package hallucination study |
| `npm audit` | Known security holes in installed packages | npm |
| Dependabot alerts | The same, on GitHub, automatically | GitHub docs |
| Pin exact versions | A package changing under you | Common practice; his `flare-dev` is pinned |

### Security review of the code itself

| Resource | What it catches | Source |
|---|---|---|
| `/security-review` and the Claude security review GitHub Action | Unsafe code in a change; matters once there are forms, logins or a database | anthropics/claude-code-security-review |
| Vibe coding security checklists | Keys in the browser, open databases, permission checks only in the interface | Many 2026 guides; useful the day the site has a backend, not before |

### Cost and usage

| Resource | What it catches | Source |
|---|---|---|
| ccusage | How much each day and session used, from Claude Code's own logs | ryoppippi/ccusage |
| Usage status line and guard (installed) | Running out of weekly usage mid task | His own setup |

### Finding more of this

| Resource | What it is | Source |
|---|---|---|
| awesome-claude-code | The main community list of Claude Code skills, tools and plugins; not run by Anthropic | hesreallyhim/awesome-claude-code |
| Claude plugin directory | Searchable from inside Claude; includes Deque's accessibility plugin and web audit plugins | Anthropic directory |

## Audit of his whole setup

"Covered" means something runs on its own; "partly" means a habit or a doc with a hole; "missing" means
nothing covers it.

| Blind spot | What is in place | Status |
|---|---|---|
| Claude claims done without proof | unlazy gates (`.claude/hooks/unlazy-every-turn.mjs` and the global stop hook), false claim blocker (`.claude/hooks/dead-claim-check.sh`) | Covered |
| Rules that nothing enforces | Global rule without a check blocker; fix-the-process skill | Covered |
| Claude changing his instructions or settings unasked | Global setup guard | Covered |
| Claude changing the live site unasked | `.claude/hooks/site-review-gate.mjs` | Covered |
| Copy rules (dashes, commas, footer, nothing unasked) | Global turn check; `.claude/hooks/copy-check.sh` | Covered |
| Evidence quotes edited | `.claude/hooks/archive-guard.sh` | Covered |
| A second pair of eyes on a change | Independent claim checks for research only; nothing for code or site changes | Missing |
| Site quality (links, pictures, layout) | GitHub runs `scripts/check-site.mjs`, `scripts/check-images.mjs` and `scripts/verify-responsive.mjs` on every push | Covered since today |
| Matches the Figma design | `scripts/verify-pages.mjs`, `scripts/verify-1440.mjs`, `scripts/verify-haven.mjs` | Partly: they fail against old Figma references and are not in the push run |
| Backups | Every branch is pushed to GitHub; `output/` goes to iCloud | Covered |
| Branch sprawl | No routine; 26 unmerged branches, 14 working copies | Missing |
| Live site deploy | `vercel.json` builds `public/`, the holding page, until launch; launch steps in `docs/SITE_SETUP.md` | Partly: no rollback steps written |
| Repo visibility | Portfolio and harness repos are public | Missing |
| Secrets in the repo | None found in a pattern search; the site uses no keys | Covered for now |
| Claude reading private folders | No deny rules, no sandbox | Missing |
| Packages | Two dev packages, `flare-dev` pinned, `npm audit` clean | Covered |
| Harness updating itself | The harness pulls itself at session start and reinstalls; it is his own repo, but a change lands without him seeing it | Partly: fine while only he can push to it, which the monthly sweep checks |
| Session history | Sessions started in Claude Desktop are kept past the 30 day cleanup by default | Covered |
| Usage and cost | Status line and usage guard | Covered |
| Accessibility, speed, share previews | Five basic accessibility checks; no speed or share tag check | Partly, see the site section |

## The standing process

This is what catches shortcuts without him knowing where to look. Four layers, from automatic to a short
monthly sweep.

**Every turn, automatic.** The hooks already in place: unlazy, the turn check, the setup guard, the rule
without a check blocker, the site gate. Nothing to add.

**Every push, automatic.** GitHub runs the site checks and shows a green tick or red cross on the commit.
A red cross means a session fixes it or says plainly why it is red. A red result is never left as "known".

**Before anything merges into main.** A fresh agent runs `/code-review` on the branch, and the GitHub site
checks are green. The session that built the change never reviews itself.

**Once a month, a 15 minute sweep.** He says "run the safety sweep" and a session does this, then reports
one line per item:

1. Repo visibility: portfolio and harness still private.
2. Branches: list every branch not in main, then merge or delete with his yes.
3. Working copies: remove the ones whose branch is merged.
4. `npm audit`: still clean, and any new package checked against the registry before it stays.
5. The harness: what changed in his setup this month, and that only his account pushed it.
6. This audit table: anything that moved from covered to partly.

## What to add, ranked

### 1. Make the portfolio and harness repos private

- **Catches:** drafts, colleagues' words, his dictation and his whole setup being readable by anyone.
- **Runs with:** GitHub, Settings, General, Danger zone, Change visibility. Only he can do this.
- **Cost:** two minutes. The site checks then use about a minute of GitHub's free monthly run time per push.
  Check the live site still deploys afterwards.

### 2. A second agent reviews before main

- **Catches:** the shortcuts the building session cannot see, which is how the blurry Haven pictures shipped.
- **Runs with:** `/code-review`, bundled with Claude Code, run by a fresh session on the branch.
- **Cost:** one command per finished piece of work and some usage. Written into the merge step above.

### 3. Branch sweep and an undo plan for the live site

- **Catches:** finished work stranded off main, sessions overwriting each other and a bad launch with no way
  back.
- **Runs with:** git and Vercel Instant Rollback. The rollback steps go into `docs/SITE_SETUP.md` next to the
  launch steps.
- **Cost:** one session to sort the 26 branches with his yes on each group, then the monthly sweep.

### 4. Wall off private folders

- **Catches:** Claude reading his SSH or cloud keys, by mistake or because a web page told it to.
- **Runs with:** the deny rules from the Trail of Bits Claude Code config, copied into his global settings.
- **Cost:** ten minutes. His setup guard protects those settings, so it needs his ask in that session. Their
  sandbox is worth a look later; it can block things he relies on, so it is not part of this step.

### Not worth adding now

- **The security review action, Dependabot and gitleaks.** The site has no forms, logins, database or keys,
  and only two dev packages. Revisit the day any of those arrive.
- **superpowers or another "verify before done" skill.** unlazy already does this and more.
- **ccusage.** His status line and usage guard already cover usage.

## Site checks: pictures, links and layout

This was the first version of this report and is now one area of it.

**What happened.** The Haven page shipped small flattened pictures of his Figma UI that blur on sharp (2x)
screens. A sharpness check existed, but only for Haven, and nothing ran it on its own.

**Built today, on his yes:**

- `scripts/check-images.mjs` checks every picture on all four pages at 390, 768, 1024 and 1440 wide on a 2x
  screen. It fails when a file has fewer pixels than the screen draws, or is over 500 KB. Proven both ways:
  it catches the soft Mondai card on Home at phone width and passes Home at desktop width.
- `.github/workflows/site-checks.yml` runs the link check, the picture check and the layout health check on
  every push to any branch. The first run on GitHub passed links and layout and failed pictures, as expected.

**What the picture check finds today:** Home's Mondai card is 1.56 times too small on a phone, the Framework
timeline 1.11 times, and Haven's new profile background up to 4 times at tablet width and 618 KB.

**Still open for the site:**

- Figma match checks are red against old references; refresh them so they mean something again.
- Accessibility covers five basics; add Deque's free `@axe-core/playwright` for contrast and labels.
- Before launch, once: share tags (`og:title`, `og:type`, `og:image`, `og:url`), one Unlighthouse speed pass and
  one pass in Safari's engine.

## How the research was checked

Each outside claim was checked by a separate agent against the original source. Where a verdict was partly,
the wording above was corrected to match the source.

| Claim | Verdict | Source |
|---|---|---|
| EvilGenie found explicit reward hacking by Codex and Claude Code | Confirmed | arxiv.org/abs/2511.21654 |
| Claude Code best practices: give Claude a check to run | Confirmed | code.claude.com/docs/en/best-practices |
| superpowers skill forbids done claims without fresh evidence | Confirmed | github.com/obra/superpowers |
| `/code-review` reviews the current changes for bugs | Partly: it is a skill bundled with Claude Code rather than a core command | code.claude.com/docs/en/commands |
| Rewind does not cover files changed only by commands | Partly: commands that change a file Claude already edited are covered | code.claude.com/docs/en/checkpointing |
| Session history deleted after 30 days by default | Partly: sessions started in Claude Desktop are kept past it, so it was dropped as a gap | code.claude.com/docs/en/settings-reference |
| Vercel Hobby can roll back only one deployment | Confirmed | vercel.com/docs/instant-rollback |
| Vercel's live deploy follows main | Confirmed (main first, then master, then the default branch) | vercel.com/docs/git |
| Push protection on by default for your pushes to public repos | Confirmed; "free" is not the docs' word | docs.github.com about push protection |
| Dependabot alerts work on public and private repos with no paid add on | Partly: listed for all plans, not called free | docs.github.com security features |
| Security review action and `/security-review`; not hardened against prompt injection | Confirmed | github.com/anthropics/claude-code-security-review |
| Package hallucination: 16 models, 576,000 samples, 205,474 invented names, 5.2 and 21.7 percent | Confirmed from the abstract | arxiv.org/abs/2406.10279 |
| Trail of Bits config denies key folders; without the sandbox commands get around it | Confirmed | github.com/trailofbits/claude-code-config |
| awesome-claude-code is a curated community list | Confirmed | github.com/hesreallyhim/awesome-claude-code |
| ccusage reports usage and cost from local logs | Confirmed | github.com/ryoppippi/ccusage |
| gitleaks blocks secrets at commit and can scan history | Confirmed | github.com/gitleaks/gitleaks |
| Core Web Vitals "good" is 2.5 s, 200 ms, 0.1 | Confirmed | web.dev/articles/vitals |
| Automated axe scans found 57.38 percent of issues by volume (Deque's own data) | Confirmed | deque.com coverage study |
| Open Graph requires og:title, og:type, og:image, og:url | Confirmed | ogp.me |
| @axe-core/playwright runs axe inside Playwright, from Deque's repo | Confirmed | github.com/dequelabs/axe-core-npm |
| Unlighthouse scans a site; its CI mode fails below a score | Partly: the scan command is shown with a beta tag | unlighthouse.dev |

The "vibe coding" security checklists and the cases they cite come from vendor blogs and were not claim
checked; they are named only as a type of resource, with no figures taken from them.

## Measured on his setup today

- Repo visibility: `github.com/ritacompany/portfolio` and `Claude-Harness` open without signing in; `mondai`
  does not.
- Branches: 39 on GitHub, 26 not merged into main; 14 working copies; this branch 15 ahead and 31 behind main.
- Global settings: no deny rules and no sandbox.
- `npm audit`: 0 known issues. `flare-dev` pinned to 0.4.1.
- Harness: pulls itself from his own repo at session start, at most hourly.
- Picture scan of all four pages, links and layout health, run locally and on GitHub.
