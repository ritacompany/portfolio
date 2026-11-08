# Satoshi in Figma: why Claude can't edit it, and the routes that work

Researched 8 Nov 2026 in a cloud session. Read this before trying to edit Satoshi text in the Figma
file from any Claude session, cloud or local.

## The answer

No Claude connection to Figma can load Satoshi on the current plan. That holds whether Claude runs
in the cloud or in Claude Code on Chadwick's Mac. Figma's write tool (`use_figma`) runs on Figma's
servers, which only use Figma's built in fonts plus fonts uploaded to an Organization or Enterprise
plan. Satoshi installed on the Mac is invisible to it. Giving Claude the font file does not help:
the Plugin API has no way to install a font from a file.

The website is unaffected. `site/` already self hosts Satoshi 400, 500 and 700 from
`site/assets/fonts/` (see `docs/SITE_SETUP.md`). The block is only about editing text layers inside
the Figma file.

## Evidence

| What | Result |
|---|---|
| `figma.listAvailableFontsAsync()` through `use_figma` | No Satoshi in the list. An earlier session got an error from `loadFontAsync` for Satoshi |
| Figma `whoami` | One plan: "ritadev's team", tier `pro`, role `admin` |
| Figma MCP FAQ | "The MCP server can use fonts uploaded to your Figma account." and "Fonts that are only installed on your computer aren't available." |
| Figma write to canvas docs | "Fonts must be uploaded to your Figma account." |
| Figma staff, forum thread on loadFontAsync | "Server-side tools like Figma MCP server can only access fonts that are uploaded to Figma's servers." Called "a current limitation rather than a bug" |
| Shared fonts | Organization and Enterprise plans only, per Figma help and forum. Not available on Pro |
| Figma desktop MCP server (runs in the desktop app) | Read only. It cannot write to the canvas, so running Claude Code locally does not help |
| Remote Control from the cloud session | No folders shared, so the cloud session could not reach the Mac anyway |
| Load test on a scratch text node | Not run. The read only check and the docs already settle it, and the file was left untouched |

Sources: help.figma.com article 39252411778583 (MCP server FAQs),
developers.figma.com/docs/figma-mcp-server/write-to-canvas,
forum.figma.com thread 52313 (mcp loadfontasync fails for locally installed fonts),
help.figma.com article 360039956774 (upload fonts to an organization).

## Routes that work, best first

1. **Generative plugin in Chadwick's Figma account.** Claude writes a plugin with the Figma MCP
   tool `create_generative_plugin`, then puts each batch of edits into it with
   `update_generative_plugin`. The plugin runs inside Chadwick's own Figma, which sees Satoshi
   through the local font helper. His only step per batch: open the link Claude gives him and click
   Run. No pasting. Status: researched, not built. It needs his yes to create the plugin in
   "ritadev's team". The ready made copy for Transported Framework CS is already in
   `scripts/figma/paste-framework-cs.js` and can be wrapped into the plugin as is.
2. **Scripter (works today).** Paste `scripts/figma/paste-framework-cs.js` into the Scripter plugin
   in his own Figma tab and run it. Same font access as route 1, but manual pasting.
3. **Organization plan plus Satoshi uploaded as a shared font.** The only route where Claude edits
   Satoshi text with zero clicks from him. Costs a plan upgrade, and the Fontshare licence
   (ITF Free Font License) has not been checked for uploading the files to Figma. Not recommended.

## Ruled out

- Sending the font to Claude or committing it to GitHub for Figma's sake. The Figma runtime cannot
  load a font from a file.
- A DM Sans copy of the Figma file. DM Sans sets at different widths, so line breaks and section
  heights would match neither the real file nor the site.
- Outlining text with the font file. It would look right but stop being editable text.
