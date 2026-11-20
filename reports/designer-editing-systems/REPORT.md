# Hands-on design control while building in code with an agent

**Summary.** Adopt two things that already exist: tweakpane-css for live value sliders (free, one script tag, reads our `:root` variables, works on the phone) and CSS Studio for desktop layout and element edits that its agent writes straight into the source files (one-time license). Add the Annotate plugin only if pointing at elements and leaving notes for Claude is still slow after that.

Researched 9 Nov 2026. Most product details come from vendor pages and directory listings. Anything marked UNVERIFIED was not confirmed on a primary source or tested on our site.

---

## What we need, in one line

Chadwick changes a value or a layout on the running page with his own hands, sees it on his phone and Claude turns the result into a proposal in `site/dev/preview/proposals.css`. Plain static HTML and CSS, no React, no build.

That rules out anything that needs React or a bundler, or that edits inside its own hosted sandbox. It also means a tool that only loads on `localhost` will not reach the phone, because the phone opens the site by its wifi address, not `localhost`.

## The candidates

Grouped by the job they do. "Static site fit" means our setup exactly: plain HTML and CSS served locally, no build.

### A. Live tweak panels (change values with sliders)

**1. tweakpane-css** (kitschpatrol, MIT)
- What it does: reads every CSS variable on `:root` and turns it into a live control. Changes apply at once and persist in local storage. A Reset button restores the file's values. A "Copy CSS" button copies the changed set as CSS. ([npm](https://npmjs.com/package/tweakpane-css), [repo listing](https://awesome.ecosyste.ms/projects/github.com%2Fkitschpatrol%2Ftweakpane-css))
- How a designer uses it: open the page, drag sliders, press Copy CSS, paste into Claude.
- Static site fit: yes. It loads from a script tag or CDN, no build. ([npm](https://npmjs.com/package/tweakpane-css))
- Cost: free. Maintenance: one script tag; an `exclude` option hides variables we do not want exposed. The author says it may not generalize past his own use. ([npm](https://npmjs.com/package/tweakpane-css))
- Gap: only covers variables already on `:root`. Anything hard coded has to become a variable first.

**2. Tweakpane itself** (the library under candidate 1)
- What it does: a small control panel library with sliders, colors and folders, ES modules from v4. ([npm](https://www.npmjs.com/package/tweakpane))
- Use it when we want hand-picked controls (one folder per section, named properly) instead of every `:root` variable. A change handler sets `style.setProperty('--name', value)`. (UNVERIFIED code pattern, general knowledge.)
- Static site fit: yes. Cost: free.

**3. tuning-panel skill** (petekp)
- What it does: a Claude Code skill that builds a debug-only tuning panel for whatever values you are iterating on and exports only the changed values in a format meant to paste back to the agent. Uses Tweakpane or dat.GUI for vanilla JS, Leva for React. ([skills.sh](https://skills.sh/petekp/claude-skills/tuning-panel), [repo](https://github.com/petekp/claude-code-setup))
- Static site fit: yes, through its vanilla JS reference.
- Cost: free. It is the recipe for the panel the main session is building now; worth reading for its "export only what changed" pattern even if we do not install it.

**4. open-design "tweaks" template** (nexu-io)
- What it does: wraps an HTML page in a side panel of accent color, type scale, density, light and dark and motion controls bound to CSS variables. Choices persist in local storage; it does not write back to the file. ([tessl registry](https://tessl.io/registry/skills/github/nexu-io/open-design/tweaks))
- Static site fit: yes, vanilla JS. Useful as a reference for which controls a designer actually reaches for.

**5. slideVars**
- What it does: reads CSS custom properties and builds a live panel automatically. Watch out: a default passed in JS overwrites the CSS value on load. ([WeAreDevelopers](https://www.wearedevelopers.com/en/magazine/733/tweak-css-properties-live-with-slidevars-733))
- Static site fit: yes. Cost: free. Loses to tweakpane-css because it has no Copy CSS export documented.

### B. Visual editors that write back to the code

**6. CSS Studio** (Motion Division, the team behind Motion)
- What it does: a design panel on your local site. Edit copy inline, adjust styles with sliders, generate variants, test responsive sizes. Each edit streams to your coding agent with the selector, the URL and before and after values, and the agent writes it into the source file, one write per logical change. Undo reverts both the page and the file. ([site](https://cssstudio.ai/), [AI editing](https://cssstudio.ai/learn/ai-editing), [Show HN](https://news.ycombinator.com/item?id=47702196))
- How a designer uses it: run `npx cssstudio install` to set up its MCP server and skill, restart Claude Code, type `/studio`, then edit on the page. ([learn](https://cssstudio.ai/learn))
- Static site fit: yes on desktop. Plain HTML and CSS are listed as supported and there is a script tag option for projects with no bundler. That script only runs on `localhost`, so it will not load on the phone over wifi. ([learn](https://cssstudio.ai/learn))
- Cost: one-time license with updates included. Reported as $99 Personal by one directory and $79 to $349 by another (UNVERIFIED, check before buying). ([EveryDev](https://www.everydev.ai/tools/css-studio), [AlternativeTo](https://alternativeto.net/software/css-studio/about)). The editor itself is free to try; edits are only saved to files once an agent is connected. ([AI editing](https://cssstudio.ai/learn/ai-editing))
- Maintenance: a dev-only script tag plus an MCP entry. Closed source.

**7. Chrome DevTools Workspaces**
- What it does: connect the project folder to DevTools and edits to CSS, HTML and JS files in the Sources panel save to disk. DOM changes made in the Elements panel do not. Since Chrome 135 a local server can advertise its folder through `com.chrome.devtools.json` so DevTools connects automatically on localhost. ([Chrome docs](https://developer.chrome.com/docs/devtools/workspaces), [Automatic Workspace Folders](https://goo.gle/devtools-automatic-workspace-folders))
- Static site fit: yes. Cost: free, already installed. Gap: it is a developer tool, not a designer panel, and Claude is not told what changed unless we ask it to read the diff.

**8. Onlook** (YC W25, Apache 2.0)
- What it does: a Figma-like canvas over a running React app that maps elements to source and writes edits back. Has a Claude Code workflow page. Sources disagree on whether edits land on disk or inside its sandbox. ([Claude Code workflow](https://www.onlook.com/workflows/claude-code), [docs](https://docs.onlook.com/))
- Static site fit: no. It is built for React and Next.js. Listed so it is not chased again.

**9. Builder.io Fusion**
- What it does: connect a GitHub repo and edit components visually with Figma-style controls; changes become pull requests. Free tier with 60 agent credits a month; paid tiers exist. ([intro](https://www.builder.io/blog/introducing-fusion), [docs](https://www.builder.io/c/docs/key-concepts-fusion), [Claude Code for designers](https://www.builder.io/blog/claude-code-for-designers))
- Static site fit: weak. It is component and framework oriented and works through the repo, not our preview layer. Too heavy for one person's static site.

**10. VisBug** (Google Chrome Labs, open source)
- What it does: point, click, move, resize and restyle anything on any page, plus spacing and alignment inspection. Free browser extension, around 200k users, last updated Nov 2024. ([repo](https://github.com/GoogleChromeLabs/ProjectVisBug), [Chrome Web Store](https://chromewebstore.google.com/detail/VisBug/cdockenadnadldjbbgcallicgledbeoc))
- Static site fit: yes, works on any page. Gap: nothing is saved or sent anywhere; it is a sketch on top of the page.

### C. Point at an element and tell the agent

**11. Annotate plugin** (Angelo Dini, Anthropic plugin directory)
- What it does: draw and leave notes on a live localhost page, then send it all into the Claude Code session; progress is shown back on the page. Local only, no cloud. (Source: the in-app plugin directory listing found through SearchPlugins. No public page found, so UNVERIFIED beyond that listing.)
- Static site fit: likely, since it targets any localhost page. Cost: free listing.

**12. Design Steward plugin** (Matthew Cohen, Anthropic plugin directory)
- What it does: mark up a live page with notes, drawings and preview edits, turn them into issues with acceptance criteria, make the changes with a resumable log and verify each fix at chosen screen sizes. (Source: in-app plugin directory listing. No public page found, UNVERIFIED.)
- Fit: closest to a whole loop out of the box, but it brings its own process and doc-sync steps on top of the ones this repo already has.

**13. Agentation** (Benji Taylor, about 5.4k stars)
- What it does: click an element, add a note, get structured output with selectors and positions; an MCP server lets the agent read and resolve notes directly. Free for internal use. ([repo](https://github.com/benjitaylor/agentation), [site](https://www.agentation.com/))
- Static site fit: no. It requires React 18. ([repo](https://github.com/benjitaylor/agentation))

**14. React Grab** (Aiden Bai, MIT)
- What it does: hover an element, press Cmd C, get its file, component and HTML to paste into Claude Code; also has an MCP tool. ([docs](https://www.mintlify.com/aidenybai/react-grab))
- Static site fit: no, React only.

**15. Stagewise** (YC S25)
- What it does: an injected toolbar; Cmd I selects elements and sends their HTML, computed styles and selector path to a frontend agent. Free tier reportedly capped at 10 prompts a day (UNVERIFIED, from a competitor page). ([docs](https://docs.stagewise.io/reference/dom-context-selector), [quickstart](https://docs.stagewise.io/getting-started/quickstart))
- Static site fit: possible through its proxy, but it pushes its own agent rather than Claude Code.

**16. draw2agent**
- What it does: an MCP server that proxies your local dev page, lets you draw on it and hands the agent a screenshot, DOM data and your marks. 3 stars, very young. ([repo](https://github.com/zero-abd/draw2agent))

**17. Vercel toolbar comments**
- What it does: comments on preview deployments, on by default; also works on production and localhost. No agent handoff found. ([docs](https://vercel.com/docs/vercel-toolbar), [comments](https://vercel.com/docs/comments/how-comments-work))
- Fit: our site already deploys to Vercel, so this is the one that works from the phone today, but comments go to people, not to Claude.

### D. Whole-loop products and skills

**18. Claude Design** (Anthropic, research preview since 17 Apr 2026)
- What it does: a Tweaks panel of sliders and color pickers Claude generates per project, plus an Edit mode property inspector. Reviewers call it limited: no free moving of elements. ([Builder.io review](https://www.builder.io/blog/claude-design), [Fast Company on the June update](https://www.fastcompany.com/91561193/anthropics-updated-claude-design-gives-vibe-coders-more-control))
- Fit: works on its own canvas, not our repo. The Tweaks idea is the same one candidates 1 to 4 bring to our own page.

**19. Impeccable "live" mode** (pbakaus, installed here as `anthropic-skills:impeccable`)
- What it does: pick an element in the browser, steer it in plain words, get variants swapped into the running page and accept one back to source. Beta. ([release notes](https://newreleases.io/project/github/pbakaus/impeccable/release/skill-v3.5.0), [DeepWiki](https://deepwiki.com/pbakaus/impeccable/5-live-mode))
- Fit: our installed copy is only the SKILL.md; the `live.mjs` script and `reference/live.md` it calls are not present, so live mode will not run from what is installed. It would need the full upstream install.

### Designer writeups

- Builder.io's guide keeps a live preview open and asks Claude for small visual fixes in plain words. ([Claude Code for designers](https://www.builder.io/blog/claude-code-for-designers))
- One designer found colour and text changes through Claude slower than in Figma and went back to Figma for visual work. That is the exact pain a slider panel removes. ([Design Bootcamp](https://medium.com/design-bootcamp/my-experience-with-claude-code-terminal-and-figma-so-far-4cc9ca5e39a7))
- A personal site generated a live token preview page with a drift check between documented and rendered values. ([mattorb](https://mattorb-com.pages.dev/leveraging-design-md-and-ai-design-skills/))

---

## Recommendation

**Two layers, both adopted rather than built.**

1. **Values: tweakpane-css, on the preview pages only.** It is the only candidate that does what the main session's slider panel does, reads our existing `:root` tokens with no setup per control, exports the changed values as CSS and loads from any host, which means it works on the phone over wifi. Loop: drag on the phone, press Copy CSS, paste into Claude, Claude writes the block into `proposals.css` for approval.
2. **Layout and element edits: CSS Studio, on the desktop.** It is the only candidate that edits a plain HTML and CSS page by hand and has Claude Code write the change into the file through MCP, with undo on both sides. Its localhost-only script means this layer is a desk tool, not a phone tool.

**First step:** add the tweakpane-css script tag to the dev preview pages only (next to `proposals.css` in `site/dev/preview/`), and point Claude at its Copy CSS output as the input format for `proposals.css`. Compare it with the panel the main session is building: if the custom panel only exposes `:root` variables, tweakpane-css replaces it; if it exposes hand-picked, named controls, keep it and build it on Tweakpane (candidate 2) so the export works the same way.

**Second step, after a week of step one:** try CSS Studio's free editor on the desktop preview. Buy the license only if writing changes back to the file saves real time over Copy CSS.

**What it replaces in the current loop:** the trip to Figma for spacing, type and color values (layer 1), the trip to Figma for moving and resizing things (layer 2) and describing a change to Claude in words when a slider or a drag would say it exactly.

**What would change the pick:** if most of the changes Chadwick wants are layout rather than values, start with CSS Studio. If CSS Studio's script can be allowed on the wifi address, it covers both layers and tweakpane-css drops out. If pointing and commenting turns out to be the slow part, add the Annotate plugin (candidate 11) after reading its files.

**Before installing anything that runs code** (CSS Studio's MCP, either plugin), read its executable files first; community tools have carried prompt injection this year.

---

Searched: in-app plugin and skill catalogs, installed skills (impeccable, design-token), skills.sh, tessl, npm, GitHub, Product Hunt, Hacker News, vendor docs, Chrome docs and designer blogs. Not reached: the npm page for tweakpane-css returned 403 to a direct fetch (details taken from its search snippet and repo listing) and no public page exists for the two directory plugins.
