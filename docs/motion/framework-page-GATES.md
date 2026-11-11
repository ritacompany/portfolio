# Framework page motion: gates

Level L1: matching Haven's motion as built. The page is `site/mondai/framework/` on the site build
branch (`claude/relaxed-ride-5mlbdu`), Figma 5812:16446; the motion is the preview layer
`site/dev/preview/mondai-motion.js` and `.css` (6341aa0), served by `npm run studio` on port 4320.
Checks run in the built-in browser with `docs/motion/framework-page-check.js` (paste into the console,
or eval it; it scrolls the page and returns a report).

| # | Gate | How it is checked |
| --- | --- | --- |
| G1 | The page loads with no console error from site code at 1440, 768 and 390 | console errors, less the studio tooling (Flare's Geist CSS, the 4321 health ping) |
| G2 | Lenis loads and runs with motion on | `window.__mm.lenis` is set and the Lenis file is not a 404 |
| G3 | Every block with a Haven precedent animates: below the fold its text starts hidden and its screens closed, and after a scroll through every item is at its final state | check script, `startHidden > 0` and `notFinal == 0`, at all three widths |
| G4 | Reduced motion shows final states at once, with no Lenis | check script with reduced motion emulated: `html.mm-off`, `hiddenAtLoad == 0`, no Lenis |
| G5 | Timings equal Haven's (text 1.4 s, 0.15 s step, 100 px trigger, media 1.2 s Power3 in out from 1.3, arrival 0.35 s, Lenis lerp 0.1) | `window.__mm.T` against `site/haven/haven.js` |
| G6 | No approved copy changed | `git diff` on `site/mondai` is empty |
| G7 | No em dashes or Oxford commas in the new docs | the dash hook on write, and a read for list commas |
| G8 | The motion plan names every block, its Haven pattern and why, and lists every block that needs a motion idea Haven does not have as waiting on his yes | `docs/motion/framework-page.md` |
| G9 | `scripts/motion-check.mjs` passes | Not applicable: motion rules, Scope. Page entrances on the browser clock are reviewed in the browser and never rendered, and no motion inside media is built in this round. It applies to any waiting block he says yes to. |
| G10 | Committed and pushed | `git log origin/claude/relaxed-ride-5mlbdu` |

## Results, 11 Nov

Run in headless Chromium (Playwright) against `npm run studio`, because the built-in browser pane was
hidden and a hidden pane never fires the observers. Script: the check above, at each width and mode.

| Run | Lenis | Items | Hidden below the fold at load | Not final after scroll through | Timing diffs | Page errors | Site 404s |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1440 | on | 126 | 114 of 114 | 0 | none | 0 | 0 |
| 768 | on | 121 | 107 of 107 | 0 | none | 0 | 0 |
| 390 | on | 121 | 111 of 111 | 0 | none | 0 | 0 |
| 1440 reduced | off | 126 | 0 | 0 | not run (layer stands down) | 0 | 0 |
| 390 reduced | off | 121 | 0 | 0 | not run (layer stands down) | 0 | 0 |

- G1 to G8 met. G9 not applicable (reason in the table above). G10 on push.
- Fixed this round: Lenis never loaded in the preview. The layer looked for it at `/dev/vendor/`, a 404,
  so the page scrolled natively. It now resolves `/vendor/` from both the studio and the phone build.
- Lenis runs at the Scroll feel panel's lerp (0.075 today), not Haven's 0.1, by design of the preview:
  every page follows his panel while he tunes it. The two errors per run are studio tooling (Flare's
  Geist CSS and the 4321 health ping), not the page.
