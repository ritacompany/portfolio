# Review previews

How Chadwick reviews a built page, from 20 Nov on (his words: "make sure this is saved, that we do something
like this from now on, this is way more efficient").

- A published artifact holds the real page, not screenshots, inside a viewer with one button per breakpoint:
  390 phone, 768 tablet, 1440 desktop. No other widths. Tablet runs 768 to 1159 and desktop from 1160, so
  768 is the tightest tablet case.
- He scrolls the whole page at each width in one place and gives notes for all of it at once.
- Build it with `node scripts/review-preview/build.mjs <page dir> <out dir> "<Name>"` (for example
  `mondai/framework`), then publish `<out dir>/index.html` with the Artifact tool, `root` set to the out dir
  and `files` from `<out dir>/files.json`. Put the out dir in the session scratchpad, never in the repo.
- Republish to the same artifact after each change he should see, so the link he has stays current.
- Links inside the preview go nowhere; it is for looking at one page.
