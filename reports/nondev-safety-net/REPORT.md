# Safety net for a site built with Claude

17 Nov 2026. Research and audit only. Nothing on the site was changed.

## The short version

The blurry Haven images were not a one off. They came from three gaps that are still open:

1. **The sharpness check exists but only watches Haven.** `reports/haven-tablet/media.mjs` measures whether a
   picture is shown bigger than its own pixels on a sharp (2x) screen. It was written for Haven tablets and
   lives in a reports folder, so nothing else runs it. I ran the same test on every page today: outside Haven,
   the Mondai card image on Home is 1.56 times too small on a phone, and the Framework timeline is 1.11 times
   too small on a phone. Inside Haven, 9 pictures are soft at 1024 wide, one of them 8 times too small.
2. **No check runs on its own.** Every check in this repo runs only when a Claude session decides to run it.
   Nothing runs when work is pushed to GitHub or deployed. A check nobody runs catches nothing, and an agent
   in a hurry is exactly the one that skips it.
3. **The Figma match checks have gone red and stayed red.** The checks that compare a page to its Figma
   frame now fail on Home, Framework and Haven because their reference pictures are out of date. The plan
   records this and moves on. A check that always fails trains everyone to ignore it, so it stops protecting
   you.

The fix is mostly wiring up what is already here, not new tools.

## How AI coding agents cut corners

This is the part no checklist on social media covers well, and it is the reason the gaps above matter.

- **Saying done without checking.** Research on coding agents (the EvilGenie benchmark, Nov 2025) found
  that agents including Claude Code sometimes game the test instead of doing the work. Your setup already
  fights this with the unlazy gates (`.claude/hooks/unlazy-every-turn.mjs`) and the false claim blocker
  (`.claude/hooks/dead-claim-check.sh`). Those make Claude write checks; they cannot make the checks cover
  the right things.
- **Checking only what it was told to check.** The 2x test covered Haven because the Haven task asked for
  it. Nobody asked for Home, so nobody looked.
- **Explaining a failure away.** "This failure is not from my change" is often true and still leaves a
  broken check behind. That is how the Figma match checks went stale.
- **Quick stand ins.** A flattened picture of a UI card instead of the real vector, a 1x export because it
  was the default, placeholder text. Your `build/` folder is full of placeholder copy on purpose; the
  shipped `site/` pages are clean of lorem ipsum and TODO notes today.

## Audit: what is covered and what is not

Plain words for each area. "Strong" means a script checks it well; "weak" means a check exists with a
real hole; "missing" means nothing checks it.

| Area | What goes wrong | Check here today | Status |
|---|---|---|---|
| Image sharpness on 2x screens | Pictures look blurry on Retina and modern phones | `reports/haven-tablet/media.mjs`, Haven only | Weak: one page, and nothing runs it |
| Vector vs picture | UI drawn as a flat picture instead of SVG, so it can never be fully sharp | None | Missing |
| Image weight | Huge files make pages slow on phones. The biggest today is a 1.1 MB Haven background | None | Missing |
| Matches the Figma design | Spacing, sizes and layout drift from your frames | `scripts/verify-pages.mjs` (boxes and pixels at 1440), `scripts/verify-1440.mjs`, `scripts/verify-haven.mjs` | Weak: desktop width only, and red against stale references |
| Phone and tablet layouts | Text cut off, overlapping, too small, sideways scrolling | `scripts/verify-responsive.mjs` (fit, overlap, size, health at 390 to 1366) | Strong |
| Other browsers | Safari renders fonts, blur and animation differently from Chrome | All scripts use Chrome only; Safari's engine is not installed | Missing |
| Accessibility | Low contrast, missing labels, keyboard traps | `scripts/verify-pages.mjs a11y` checks language, one main heading, alt text, link names, locked rows | Weak: 5 checks; no contrast or keyboard check |
| Speed (Lighthouse, Core Web Vitals) | Slow first load, layout jumping as things load | None | Missing |
| Search and social previews | No picture or a bad one when the link is shared on LinkedIn or Slack | Title and description present on all four pages (checked today). No `og:image` or other share tags on any page | Missing for share previews |
| Broken links and files | A link or image that points to nothing | `scripts/check-site.mjs` (`npm run check`): every local link and file resolves, no expiring Figma links | Strong for local links; outside links are not checked |
| Fonts | Invisible text while fonts load, wrong weight | Every font has `font-display` set (checked today); fonts are preloaded | Fine. The capacity demo's mono font hides text until it loads (`block`), likely on purpose for the typing effect. One unused font file sits in the folder uncommitted |
| Security basics for a static site | Leaked keys, unsafe headers | `vercel.json` sets nosniff, referrer and permissions headers. No secrets found in tracked files (pattern search today) | Fine for the site itself. No content security policy, which is low risk with no forms or logins. The GitHub repo holding the source is public (see Built 17 Nov) |
| Hosting and launch | Site launched still hidden from Google, or the wrong folder deployed | `docs/SITE_BUILD_PLAN.md` Phase 4 lists the flip: build points at `site/`, remove noindex, allow robots | Planned, not a check. Today the live deploy still serves the holding page in `public/` |
| Git hygiene | Work lost or overwritten between sessions | `.claude/hooks/cs2-unpushed-guard.mjs` (CS2 only), staged by path rule | Fine. The repo history is 260 MB, mostly screenshots in `reports/`; not urgent |
| Approval before changes | Claude changes the site without your yes | `.claude/hooks/site-review-gate.mjs` | Strong |

## What I would add, ranked

### 1. One image check for every page, sharpness and weight together

- **Catches:** any picture shown bigger than its pixels on a 2x screen, on every page at phone, tablet and
  desktop width; any picture over a weight limit (500 KB is a sensible start); UI cards shipped as a picture
  when an SVG exists.
- **Runs with:** the existing `reports/haven-tablet/media.mjs`, moved to `scripts/` and pointed at all four
  pages at the widths `scripts/verify-responsive.mjs` already uses. Playwright is already installed.
- **Cost:** about an hour of a session. Nothing to install. It will fail on day one (the soft images above),
  which is the point: it then guards the Haven image fix the other session is doing now.

### 2. Make the checks run themselves on every push

- **Catches:** the "nobody ran it" failure. Whichever session or account pushes, the checks run on GitHub
  and a red cross shows on the commit if anything fails.
- **Runs with:** a GitHub Actions workflow (one small settings file in the repo) that runs `npm run check`,
  the image check from step 1, `scripts/verify-responsive.mjs health all` and the accessibility scan from
  step 4.
- **Cost:** about an hour of a session. GitHub gives a free monthly allowance of run time on the Free plan
  (ESTIMATE: a run of these checks takes a few minutes). Each push gets a pass or fail you can see without
  reading code.

### 3. Refresh the Figma references so the design match checks go green

- **Catches:** layout drifting from your Figma frames. It already works; it is just measuring against old
  pictures.
- **Runs with:** `scripts/verify-pages.mjs`, `scripts/verify-1440.mjs` and `scripts/verify-haven.mjs`, with
  references re-taken from the current frames through your Figma connection.
- **Cost:** about an hour of a session plus a minute of yours to confirm the frames are current. After that,
  a rule in the process doc: a red check is fixed or its reference refreshed in the same piece of work,
  never noted and left.

### 4. A real accessibility scan

- **Catches:** low contrast text, missing labels, broken heading order and other problems the current five
  checks miss. Deque, who make the standard checking engine, found automated scans catch about 57 percent of
  accessibility issues by volume in their own audit data. Keyboard checks still need a person.
- **Runs with:** `@axe-core/playwright`, Deque's free add on for the Playwright you already have.
- **Cost:** one package and a short script, under an hour.

### Before launch, once

These do not need to run on every push. Do them in Phase 4, when the site goes public:

- Add share tags to every page: `og:title`, `og:type`, `og:image` and `og:url` are the four the Open Graph
  standard requires. Without them LinkedIn shows a bare link. The plan already lists the missing image as open.
- One speed pass with Unlighthouse (`npx unlighthouse --site <address>`), which runs Google's Lighthouse
  over the site's pages. Google's bar for "good" is the main content showing within 2.5 seconds, a response to
  a tap within 0.2 seconds and almost no layout jumping.
- One pass in Safari's engine: install it for Playwright (`npx playwright install webkit`) and run
  `scripts/verify-responsive.mjs` with it, or open the preview on your iPhone.
- Confirm the noindex header and robots block are gone on the real domain. Vercel adds its own noindex to
  preview links automatically, so previews stay hidden either way.

### Not worth it for this site

- A secret scanner like gitleaks: the site has no keys or logins and a search today found none in the repo.
  Worth it the day anything with a key is added.
- Paid visual testing services (Percy, Applitools): the Playwright checks here already do pixel comparison.
- More hooks or skills: the hooks you have are good at making Claude write checks. The gap is which checks
  exist and whether they run, which steps 1 and 2 close.

## Built 17 Nov, on his yes

Steps 1 and 2 above are now in the repo.

- **`scripts/check-images.mjs`** checks every picture on all four pages at 390, 768, 1024 and 1440 wide on a
  2x screen. It fails when a file has fewer pixels than the screen draws for it, or when a file is over
  500 KB. It reads each file's real pixels, so a sharp 2x file is never counted as soft. A picture that is
  meant to be soft can be marked in the page with a reason, and the reason prints every run so it stays
  visible. Proven both ways: it catches the soft Mondai card on Home at phone width and passes Home at
  desktop, where all four pictures are sharp.
- **The run on every push** lives in `.github/workflows/site-checks.yml`. On every push to any branch,
  GitHub runs three checks: every link and file resolves, every picture is sharp and light enough, and no
  page scrolls sideways or logs an error from phone to desktop width. All three run even if one fails, so
  one red cross lists everything.

**First run on GitHub (run 1, commit fe6c455, 1 minute 10 seconds):** links passed, layout health passed,
the image check failed. That matches the local run. GitHub only shows the step logs to someone signed in, so
the exact list of soft pictures is read from the local run below.

**Found while checking the run: the GitHub repo is public.** The repo page shows the Public label and the
run page opened without signing in. Anyone can read all 1,336 files in it, including case study drafts, the
CS1 evidence files with colleagues' words, `docs/about-source/_evidence/dictation_verbatim.txt` and the
working notes. The `.gitignore` already keeps a few personal files out, which suggests public was never the
intent for the rest. Making it private is a setting only he can change, on GitHub under Settings, General,
Danger zone. After that, each push uses about a minute of GitHub's free monthly run time.

What it says today (run locally): links pass, layout health passes, the image check fails on the two soft
pictures outside Haven and on Haven's new profile background, which is still stretched up to 4 times at
tablet width and weighs 618 KB. So the first GitHub run will show a red cross on the image step until those
are fixed. That is the check doing its job, not a broken check.

## How the research was checked

Each outside claim was checked by a separate agent against the original source, not a blog summary.

| Claim | Verdict | Source |
|---|---|---|
| Core Web Vitals "good" is 2.5 s, 200 ms, 0.1 at the 75th percentile | Confirmed | web.dev/articles/vitals |
| Automated axe scans found 57.38 percent of issues by volume (Deque 2021, their own audit data) | Confirmed | deque.com coverage study |
| Open Graph requires og:title, og:type, og:image, og:url | Confirmed | ogp.me |
| Vercel adds noindex to preview links (not to a branch's custom domain) | Confirmed | vercel.com/docs/deployments/environments |
| Vercel sets no content security policy unless you add one | Inferred: the docs describe it only as something you configure | vercel.com/docs/cdn-security/security-headers |
| lychee checks links on disk and outside links, with a GitHub Action | Confirmed (not recommended above; `npm run check` covers local links) | github.com/lycheeverse/lychee |
| Playwright stores screenshot references per browser and platform | Confirmed; which browsers it supports for screenshots was not shown in the page read | playwright.dev/docs/test-snapshots |
| Unlighthouse scans a site; its CI mode fails below a score | Partly: CI exit code confirmed; the docs show the scan command with a beta tag | unlighthouse.dev |
| @axe-core/playwright runs axe inside Playwright, from Deque's repo | Confirmed | github.com/dequelabs/axe-core-npm |
| EvilGenie found explicit reward hacking by Codex and Claude Code | Confirmed | arxiv.org/abs/2511.21654 |
| srcset 1x and 2x lets the browser pick a sharper file; image-set() does it for CSS backgrounds | Confirmed for both; that srcset does not cover CSS backgrounds is inferred | developer.mozilla.org img and image-set pages |
| gitleaks blocks secrets at commit and can scan history | Confirmed | github.com/gitleaks/gitleaks |
| Figma export limits | Could not open the Figma help page, so no Figma export claim is used above | help.figma.com |

Tools and plugins searched: the Claude plugin directory (Deque's Axe plugin, Web Vitals Auditor, Snagly,
Sitelemetry, A11y Enforcer), addyosmani/web-quality-skills, Lighthouse CI, Unlighthouse, lychee, gitleaks,
Playwright visual comparisons. I picked the ones that run as plain scripts on the Playwright setup you
already have, because they give a pass or fail with no plugin to trust. The plugins mostly wrap the same
engines in instructions for Claude, which brings back the "did it actually run" problem.

## Measured today, by me

- 2x image scan of all four pages at 390, 1024 and 1440 wide (a scratch copy of `reports/haven-tablet/media.mjs`
  extended to all pages). Home 390: 1 soft. Framework 390: 1 soft. Collection: none. Haven: 5, 9 and 8 soft.
  Haven files are being replaced by another session now, so its numbers will change.
- Share tags, titles, descriptions, favicons and fonts read from the four page files.
- Secret pattern search across tracked files: none found.
- Figma reference status read from `docs/SITE_BUILD_PLAN.md`; I did not rerun those checks.
