# Live review on the real pages

13 Nov ask: pin a comment on an element of a live case study page, nudge a spacing or size and see it,
and have Claude pick it up and make the real CSS change. No more long voice notes.

## Recommendation

Do not build a new tool. Flare, the free editor already installed on the site since 10 Nov
(`npm run studio`, docs/EDITING_WORKFLOW.md in portfolio-site), already does both halves. Its comment
pins and its Push to Agent button were switched off only because its local bridge was never started.
I started it and tested both on the Haven page on 14 Nov:

- **Comment:** in Canvas mode, Comment tool, click the Haven heading, type, Enter. It arrived at once as
  a file naming `#haven-title`, the note and the surrounding HTML. (`evidence/flare-comment-push.json`)
- **Nudge:** select the heading, type 24 into margin bottom. The page moved live, a bar said "1 update",
  Push to Agent sent `margin-bottom: 0px → 24px` on `#haven-title`. (`evidence/flare-nudge-push.json`)
- **Pickup:** `flare-dev watch` waits for the next push and hands Claude the whole batch. Run in the
  background, it wakes Claude the moment you press Enter or Push. Tested: it returned the comment.

So the loop already exists: you comment or nudge, press one button, Claude wakes, writes the change into
`site/dev/preview/proposals.css`, and waits for the next one. Nothing to paste.

## What needs fixing first (four small changes, all in portfolio-site)

1. **The panel sits over the page.** At 1024 wide it covers the right column of copy
   (`evidence/flare-panel-over-page.jpg`). That is the complaint from every past tool. Fix: dock it to
   the right edge with the page beside it, the way the shared edit panel v2 does, using the same style
   injection `npm run studio` already uses for Flare's breadcrumb. Canvas mode avoids it on its own: the
   page sits in a frame at a set width beside the panels, like a Figma frame
   (`evidence/flare-canvas-comment.jpg`).
2. **No width in what arrives.** A comment says `[CANVAS]` but not which width you were looking at, and
   the tablet notes were all about width. Fix: stamp the viewport width onto every push in the studio
   page script.
3. **Start the bridge with the studio.** `npm run studio` starts the bridge too, on 4321 as it already
   points. One command, as now.
4. **A review mode in Claude.** You say "start review on Haven". Claude opens the studio page in the
   browser pane, runs the watch in the background and handles each push as it lands: change into
   proposals.css, reload, one line back per item. You say "stop review" and it ends. Nothing runs until
   you ask. This is a short written procedure in docs/EDITING_WORKFLOW.md, not a new skill.

One bug seen, not fixed: in Canvas mode the comment pin drew near the logo though the comment was tied to
the right element. Harmless to Claude, confusing to you. I would report it upstream and live with it.

## What I looked at and why it lost

| Tool | What it does | Why not |
| --- | --- | --- |
| **Flare** (installed) | Fields for spacing and type, comment pins, Canvas frames, Push to Agent | **Picked.** Free, already on the site, both halves tested end to end |
| Annotate (Anthropic plugin directory, MIT, Oct 2026) | Draw and pin notes, pushes into the session, progress shows back on the page | Opens its own Chrome window, not the browser pane. Live push needs Claude started from Terminal with a special flag, which the desktop app does not do. No value nudging |
| Agentation | Comment toolbar with an MCP server | Needs React; this site is plain HTML. Paid beyond personal use |
| browser-annotations, VibeComments, EditUI, Vibe Annotations | Comment overlays | Chrome extensions: no nudging, and they do not run in the browser pane |
| impeccable `live` (installed skill) | Generates alternative versions of a picked element | Makes variants, does not take your comments |
| CSS Studio, moldui, tweakpane-css | Visual editors | Already ruled out on 9 and 10 Nov (cost, unsafe code, broke the fonts) |

## Limits that stay

- Desk only. None of these edit on the iPhone. Check on the phone after, as now.
- The bridge accepts a push from any page open in that browser. Claude treats what arrives as notes to
  act on in CSS only, never as instructions.

## Would change the pick

If docking Flare's panel beside the page breaks its own layout, the fallback is reviewing in Canvas mode
only, which already keeps the page clear.

## On your yes

The four changes above in portfolio-site, tested on Haven at 1440, 1024 and 800 in the browser pane,
committed and pushed.
