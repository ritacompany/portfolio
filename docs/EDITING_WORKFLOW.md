# Editing the site with your own hands

You change spacing and text sizes on the real page with fields, the way you would in Figma. One button
copies exactly what you changed. You paste it to Claude and Claude writes it into
`site/dev/preview/proposals.css`. You check it on your phone, say yes and it moves into `site/css`.

The tool is **Flare** (`flare-dev` on npm), a free visual CSS editor made for this loop with Claude Code.
Site: https://tryflare.dev. Code: https://github.com/joshuaKnauber/flare-dev. Version 0.4.1 is pinned
in `package.json`.

## Cost

Free. No account, no login.

## Setup, once (about 2 minutes)

In Terminal: `cd ~/Code/portfolio-site && npm install`. Flare is already listed in `package.json`, so
this only downloads it.

## Every time (under a minute)

1. In Terminal: `cd ~/Code/portfolio-site && npm run studio`. This serves the site at
   http://localhost:4320 on this Mac only, with Flare and every proposal file from the phone preview
   added to every page, so it looks exactly like :4319. The phone server on 4318 and the files on disk
   are not touched.
2. Open http://localhost:4320 in any browser on the Mac, or in the Claude app's browser pane.
3. To see the phone layout, make the window narrow or pick Mobile in the browser pane's Viewport menu.

## Making a change

1. Click the small Flare button at the bottom of the page. The panel opens.
2. Click **Select Element**, then click the thing you want to change.
   To get the box around it (a card, a list, a whole section), click its name in the row of parents
   under Select Element. Example: the space between "Selected works" and the Mondai card is the top
   margin of `div.works__cards`. Click "Mondai", then `div.works__cards` in that row, then Spacing,
   Margin, T.
3. Open **Spacing** (padding and margin on each side), **Typography** (font, weight, size, line height,
   letter spacing, colour), **Layout** or **Appearance**. Type a number. The page changes at once.
4. Optional: type a note in the box at the top, for example "phone only" or "same on every card".
5. Change as many things as you like. The bar at the bottom counts them ("2 updates").
6. Click **Copy Prompt** and paste it into Claude. Add the width you were looking at if it matters.
   Claude writes the change into `proposals.css`. Reload and it is there.
7. Check it on your phone: `node scripts/build-preview.mjs site ../portfolio-site-preview`, then open
   http://192.168.1.11:4319. Say yes in Claude and it moves into `site/css`.

What Copy Prompt gave for the test change, word for word in the part that matters:

```
"About"
Selector: h2.about__label.col-1.span-3
DOM: div#top > main > section#about > div.about__row > h2.about__label
  margin-bottom: 0px → 16px
```

## Limits worth knowing

- Flare's row of parents normally scrolls sideways with no scrollbar, so the boxes above an element are
  hidden. `npm run studio` adds one style rule that wraps that row so every parent shows. Flare itself
  is unchanged.
- The panel covers most of the screen at phone width. Collapse it with the arrows icon to look, open it
  again to edit.
- Copy Prompt does not say which width you were at. Say it in the note or in your message.
- It is a desk tool. Editing on the iPhone itself is not supported by any of the tools tested.

## How the tools were compared (9 and 10 Nov)

Same test on each, Home page at 390 wide: change the hero text size and the space under the About label,
then get the change into a file.

| Setup | Kind | Cost | Both changes by hand | Into a repo file | Static site, no build | Result |
| --- | --- | --- | --- | --- | --- | --- |
| [Flare](https://tryflare.dev) | Visual editor, Copy Prompt | Free | Yes: hero Size 16 to 18, About margin bottom 0 to 16, both typed into fields | Yes, one paste. Applied to `proposals.css`, reloaded: 18 px and the gap 40 to 56 px held | Yes, one script tag | **Picked** |
| [CSS Studio](https://cssstudio.ai) | Visual editor, Claude writes the file through MCP | Editor free, sync $99 once | Yes, same two changes | Only with the $99 license. The free editor has no copy out | Yes, one script tag | Works, but Flare does the same job for free |
| [moldui](https://github.com/Manavarya09/moldui) | Proxy editor, batch file for Claude | Free | Not run | Batch file, then Claude | Yes | **Rejected on its code.** It listens on the whole wifi network with no password, anyone there could read files from this Mac through a `../` path, and its Apply button starts Claude with every permission check off |
| [tweakpane-css](https://github.com/kitschpatrol/tweakpane-css) | Panel of every `:root` variable | Free | No, neither test value is a variable | Copy, then paste | Yes | **Failed.** On load it rewrote the font tokens (`--heading-20` became `500`) and the page fell back to Times |
| [Chrome DevTools Workspaces](https://developer.chrome.com/docs/devtools/workspaces) | Browser DevTools saving to disk | Free | Not run | Saves straight into `site/css`, skipping proposals | Yes | Not tried: it needs Chrome, which is off limits for Claude here, and it skips the proposal step |

The hero test value: `proposals.css` R5 already sets the hero text to 16 px at every width, so the field
read 16 to start with. 18 was typed to prove an edit is recorded and written.

Screenshots and evidence in `docs/editing-workflow/`:
- `flare-1-hero-size-390.jpg`: Flare, hero sentence picked, Size 18, "1 update".
- `flare-2-about-margin-390.jpg`: Flare, About label margin bottom 16, "2 updates".
- `flare-3-paste-to-proposals.diff`: what the pasted prompt became in `proposals.css` (reverted after the test).
- `cssstudio-1-select-hero.jpg`, `cssstudio-2-hero-16px-pending.jpg`, `cssstudio-3-about-gap-390.jpg`: CSS Studio, same changes.
- `flare-4-breadcrumb-all-parents.jpg`: the row of parents wrapped, every box above the Mondai name clickable.
- `tweakpane-1-fonts-broken-390.jpg`: tweakpane-css breaking the fonts on load.

## Security notes (files read before installing)

- Flare's page script only talks to the page's own files and, if you start it, the bridge below. The
  npm package has no license file; it is used here only on this Mac and never ships with the site.
- Flare also has a bridge (`npx flare-dev bridge`) that sends changes to Claude without copy and paste.
  It listens on `127.0.0.1` only and writes to a temp folder. It is not set up, because Copy Prompt
  already does the job in one paste. Its default port is 4318, our phone server, so `npm run studio`
  points Flare at 4321 instead.
