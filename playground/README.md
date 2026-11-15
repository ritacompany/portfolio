# Playground: hero and Selected works

A sandbox for trying effects and animations on the homepage's first two sections. It is separate from
`site/`, which stays plain HTML and is what ships. Nothing here changes the live site.

The starting point is the coded homepage from 14 Nov (branch `claude/relaxed-ride-5mlbdu`, his phone
frames and the 13 Nov card call included), rebuilt as React components. It matches that page pixel for
pixel from 320 to 1920 wide (`GATES.md`, G2).

## Run it

```bash
npm install
```

```bash
npm run dev
```

Opens on http://127.0.0.1:5180. Add `?lab` to the address for the experiment switcher.

## Where things are

| Path | What |
|---|---|
| `src/components/site/` | Header, Hero, SelectedWorks, WorkCard, MobileMenu: the 14 Nov sections |
| `src/styles/legacy/` | The site CSS, copied from `site/css` on that branch, drawn in its own layer |
| `src/experiments/` | One folder per idea; register it in `index.ts`, open it with `?x=<id>` |
| `src/components/ui/` | shadcn and 21st.dev components land here |
| `src/index.css` | Layer order, his Figma colors as Tailwind colors, the shadcn theme mapped to his neutrals |

## Adding 21st.dev or shadcn components

- Paste: copy the component code from 21st.dev into `src/components/ui/`. It imports `@/lib/utils` and
  `@/components/ui/...`, which resolve here. Install whatever packages it lists with `npm install`.
- CLI: `npm run ui:add -- button` for shadcn, or `npm run ui:add -- "https://21st.dev/r/<author>/<name>"`.
  21st.dev's registry now asks for an account, so the paste route is the reliable one.

Tailwind utilities always win over the site CSS, so `className="..."` restyles any part in place. Also
installed: `motion` (Framer Motion), `gsap`, `lenis`, `lucide-react`.

## Two changes from the site CSS

- `.grid`, `.col-N` and `.span-N` are `.layout-grid`, `.layout-col-N` and `.layout-span-N`, because
  Tailwind's own `.grid` and `.col-N` utilities would override them.
- The phone background selector drops a child combinator, since React mounts the page inside `#root`.

## Checks

```bash
npm run build && node scripts/check.mjs parity
```

Also `overflow`, `behavior` and `layers`. `parity` compares against `site/` at commit cbb837f, pulled
with git into a temp folder.
