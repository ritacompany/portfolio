# Style lab: the whole homepage

A sandbox for trying whole page styles on his homepage: full page motion, scroll behaviour, section
transitions, spacing rhythm and accents, borrowed from reference sites. His copy, fonts, sizes and
colours never change. It is separate from `site/` (what ships) and from `playground/` (hero and Selected
works effects, owned by another session). Nothing here changes either.

The design source is his **Hero master** frame: Figma file Desktop 1 MVP (`5RO0m4bYYrTvbiaOgaU3tI`),
page CS, section Hero, frame `6109:21820`, 1440 wide. Desktop only, so it sits on the coded homepage from
14 Nov (branch `claude/relaxed-ride-5mlbdu`), which supplies tablet and his phone frames.

## Run it

```bash
npm install
npm run dev
```

Opens on http://127.0.0.1:5190. Add `?lab` for the style switcher, or `?style=<id>` to open one style.
Styles switch live, no reload.

To scroll it away from this machine, `node scripts/hosted.mjs <out dir>` builds one hosted page (JS and
CSS inlined, images and fonts beside it) for a claude.ai Artifact. It opens on `stuck-invert` with the
switcher showing; `#<style id>` or `#base` on its link picks another. Published 16 Nov:
https://claude.ai/artifact/CdH1zt7Zep3V7tv1cnDrW8 (private to his account).
No `?style` is the Figma base: his Hero master as drawn, with only the 14 Nov states.

## How a style works

Each style is a folder in `src/lab/styles/<id>/` and one line in `src/lab/registry.ts`.

- `index.ts` exports a `LabStyle` (`src/lab/types.ts`): an id, a name, the one line a person would
  remember, the reference it came from, its CSS and a `setup` function.
- `style.css` is injected inside `@layer lab` only while the style is live, so it needs no scoping, beats
  the site CSS and loses to any Tailwind utility. Accents use his tokens, `var(--neutral-200)` and so on.
- `setup(kit)` runs once after mount. The kit has the page root, `gsap`, `ScrollTrigger` and
  `smoothScroll()` (Lenis, wired to ScrollTrigger and anchor links). Sections are
  `[data-section="hero|works|about|footer"]`. It never runs under reduced motion, so a style may hide
  things before revealing them.

What a style may touch: motion, scroll, transitions between sections, spacing rhythm, accents. What it
may not: copy, font, size, weight, tracking, line height, case, colour of any text. Two checks hold it:
`scripts/lint-styles.mjs` rejects colour literals and type declarations in style files, and
`check.mjs typelock` compares every character's computed type and colour against the base page.

`stuck-invert` and `stuck-behind` come from the Elvina Prasad style on Refero
(`5df2af07-6ce2-4805-bf45-6ee595e623e0`): the hero's CHDWCK holds still on screen through the bottom of
Selected works while the work scrolls past. `stuck-invert` floats it above with a difference blend, so the
title and card art flip colour inside its letters; `stuck-behind` leaves it under the work with no blend.
Desktop and tablet only; the phone's vertical CHDWCK is left alone.

`soft-landing` is a proof style that exercises every knob so the checks have something real to hold. It
is not from a reference.

## What the Hero master changed below the works

In `src/styles/about-footer-master.css` (the hero and works changes are in `hero-master.css`, as in the
playground): About's story body 659 wide and its row 517 tall, the role body 660 wide, the footer's
CHDWCK band redrawn (Figma's export is `public/assets/ui/chdwck-master.svg`), Back to top and the
portraits 1 px lower, and the Contact button label in Medium.

Two places where the code keeps the 14 Nov copy instead of Figma's, on purpose:

- About body: Figma's text layer holds an older draft ("I have have an eye", "I love my cats ,
  unexpected things, drag"). The coded copy stays. The check compares About's label column in pixels and
  every About box against the frame's metadata instead.
- Footer list: Figma lists Testimonials and hides Contact. Testimonials has no section yet, so the coded
  list (About, Selected works, Contact) stays, and the check masks that list.

## Checks

```bash
npm run build && node scripts/check.mjs figma
```

Also `overflow`, `typelock`, `switch`, `behavior`, `reduced`, `layers`, and `node scripts/lint-styles.mjs`.
Gates are in `GATES.md`.
