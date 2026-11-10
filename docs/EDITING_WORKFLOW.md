# Editing the site with your own hands

You change spacing and text on the real page with fields and sliders. Claude writes the change into
`site/dev/preview/proposals.css`. You check it on your phone, say yes and it moves into `site/css`.

The tool is **CSS Studio** by Motion Division, the team behind the Motion animation library.
Site: https://cssstudio.ai. Docs: https://cssstudio.ai/learn. Version 1.2.0 is pinned in `package.json`.

## Cost

- The editor is free. You can click any element and change it, but the change stays in the browser.
- Getting changes into the code costs **$99 once** (lifetime updates, refund within 14 days). There is no
  trial. This is the "Sync with agent" part. Buy it at https://cssstudio.ai/pricing.

## Setup, once (about 5 minutes)

1. Buy the license, then make a CSS Studio account with the same email.
2. In Terminal: `cd ~/Code/portfolio-site && npm install`. CSS Studio is already listed in
   `package.json`, so this only downloads it.
3. Start Claude Code in `~/Code/portfolio-site`. Claude asks once whether to allow the project MCP
   server `css-studio` from `.mcp.json`. Say yes.

## Every time (about 1 minute to start)

1. In Terminal: `cd ~/Code/portfolio-site && npm run studio`. This serves the site at
   http://localhost:4320 on this Mac only, with CSS Studio and your proposals added to every page. The
   phone server on 4318 and the files on disk are not touched.
2. In Claude Code, type: `/studio write my edits into site/dev/preview/proposals.css, never site/css`.
   Claude starts listening for your edits.
3. Open http://localhost:4320 in Chrome or Safari on the Mac. The first time, click **Log in** in the bar
   at the bottom and sign in.
4. To see the phone layout, click the phone icon on the right toolbar and pick the 390 by 844 preset.

## Making a change

1. Click the arrow in the bottom bar, then click the thing you want to change.
2. A panel opens. **Design** has size, padding, margin, gap, font size, weight, line height and colour.
   **Variables** has every token, including the proposal values such as `--rv-about-gap`.
3. Type a number or drag the value. The page changes at once.
4. Text: double click any text on the page and type.
5. Click **Send** (the arrow button). Claude writes the change into `proposals.css` and the panel shows
   what it did. Undo in the panel reverts the page and the file.
6. Look at it on your phone: `node scripts/build-preview.mjs site ../portfolio-site-preview`, then open
   http://192.168.1.11:4319. Say yes in Claude and the change moves into `site/css`.

## Example: the test change used to pick this tool

- Hero text at 16 px: click the hero sentence, Design, Text, Size, type 16.
- More space under the About label: click "About", Design, Margin, expand the four sides, Bottom, type 16.
  Or open Variables and change `--rv-about-gap`.

## What it does not do

- It does not work from the phone. The link to Claude only runs on this Mac (`127.0.0.1`), so editing
  happens at the desk and the phone is for checking.
- Without the license the Send button only offers **Log in**. Nothing reaches the files.

## How the tools were compared (10 Nov)

| Setup | Kind | Free | Both test changes by hand | Into a repo file | Static site, no build | Result |
| --- | --- | --- | --- | --- | --- | --- |
| [CSS Studio](https://cssstudio.ai) | Visual editor, Claude writes the file through MCP | Editor yes, sync $99 | Yes: hero 20 to 16 px and About label margin 0 to 16 px, both by typing into a field | Yes, with the license (vendor documented; not run here because it needs the purchase) | Yes, one script tag | **Picked** |
| [moldui](https://github.com/Manavarya09/moldui) | Proxy editor, Save writes a batch file for Claude | Yes (MIT) | Not run | Batch file in `.moldui/`, then Claude applies it | Yes, says it supports static HTML | **Rejected before running.** Its proxy and socket listen on the whole wifi network with no password. Anyone on the network could read files from this Mac through a `../` path, and its Apply button starts Claude with every permission check turned off |
| [tweakpane-css](https://github.com/kitschpatrol/tweakpane-css) | Panel of every `:root` variable, Copy CSS | Yes (MIT) | No: only variables show, and neither test value was a variable | Copy, then paste to Claude | Yes, one script tag | **Failed.** On load it rewrote the font tokens (`--heading-20` became `500`) and the whole page fell back to Times |

Screenshots in `docs/editing-workflow/`:
- `cssstudio-1-select-hero.jpg`: the hero sentence picked, Design panel open.
- `cssstudio-2-hero-16px-pending.jpg`: Size set to 16, the edit waiting to be sent.
- `cssstudio-3-about-gap-390.jpg`: at 390 wide, About label bottom margin 16, gap to the text 24 to 40 px.
- `tweakpane-1-fonts-broken-390.jpg`: tweakpane-css on load, page fonts broken.

Also looked at and left out: Chrome DevTools Workspaces (free, saves style edits straight into
`site/css`, which skips the proposal step, and needs Chrome) and Onlook (built for React, Next.js and
Tailwind projects).

## Security notes (files read before installing)

- `npx cssstudio install` was **not** run. It calls `add-mcp`, which adds CSS Studio to every coding
  tool it finds on the Mac. Instead `.mcp.json` names only this project and runs the pinned local copy
  (`npx --no-install cssstudio`).
- The CSS Studio server listens on `127.0.0.1:9877` only and keeps a small folder at `~/.cssstudio`.
  The page script talks to `api.motion.dev` only to log in.
- `.claude/skills/studio/SKILL.md` is CSS Studio's own instructions for Claude, copied from the
  package unchanged.
