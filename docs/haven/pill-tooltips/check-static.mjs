// Static checks for the Haven pill tooltips. Run from the repo root: node docs/haven/pill-tooltips/check-static.mjs <check>
// Checks: sources, wiring, tokens, copy. Prints "<check> passed" only when every assertion holds.
import { readFileSync } from 'node:fs';

const read = (p) => readFileSync(p, 'utf8');
const which = process.argv[2];
const fail = (msg) => { console.error(`${which} FAILED: ${msg}`); process.exit(1); };

if (which === 'sources') {
  const html = read('site/haven/index.html');
  const pills = [...html.matchAll(/class="pill(?: [^"]*)?">([^<]+)</g)].map((m) => m[1].trim());
  if (pills.length !== 14) fail(`expected 14 pills, found ${pills.length}`);
  const counts = {
    'interview insight': (html.match(/class="card__body"/g) || []).length,
    'testing insight': (html.match(/class="tcard__body"/g) || []).length,
    'confidante role': (html.match(/class="role__text"/g) || []).length
  };
  for (const label of pills) {
    const m = label.toLowerCase().match(/^(interview insight|testing insight|confidante role) (\d+)$/);
    if (!m) fail(`unrecognised pill "${label}"`);
    if (+m[2] < 1 || +m[2] > counts[m[1]]) fail(`"${label}" has no card on the page`);
  }
  console.log(`sources passed (${pills.length} pills, cards ${JSON.stringify(counts)})`);
} else if (which === 'wiring') {
  const html = read('site/haven/index.html');
  if (!html.includes('<link rel="stylesheet" href="pill-tips.css">')) fail('pill-tips.css not linked');
  if (!html.includes('<script src="pill-tips.js"></script>')) fail('pill-tips.js not loaded');
  const js = read('site/haven/pill-tips.js');
  if (/addEventListener\('click'/.test(js)) fail('a click listener exists');
  if (!/pointerType !== 'mouse'/.test(js)) fail('hover is not limited to a mouse pointer');
  if (!/:focus-visible/.test(js)) fail('focus is not limited to keyboard focus');
  if (!/'Escape'/.test(js)) fail('no Escape handler');
  if (!/role', 'tooltip'/.test(js) || !/aria-describedby/.test(js)) fail('tooltip roles missing');
  console.log('wiring passed');
} else if (which === 'tokens') {
  const css = read('site/haven/pill-tips.css'), js = read('site/haven/pill-tips.js'), tokens = read('site/css/tokens.css');
  for (const [f, t] of [['pill-tips.css', css], ['pill-tips.js', js]]) if (/#[0-9a-fA-F]{3,8}\b/.test(t)) fail(`hex in ${f}`);
  const used = new Set([...css.matchAll(/var\((--tooltip-[a-z-]+)/g), ...js.matchAll(/'(--tooltip-[a-z-]+)'/g)].map((m) => m[1]));
  for (const name of used) if (!tokens.includes(`${name}:`)) fail(`${name} not defined in tokens.css`);
  if (used.size < 10) fail(`only ${used.size} tooltip tokens used`);
  console.log(`tokens passed (${used.size} tooltip tokens)`);
} else if (which === 'copy') {
  const files = ['site/haven/pill-tips.css', 'site/haven/pill-tips.js', 'site/dev/pill-tooltips/index.html', 'docs/haven/pill-tooltips/GATES.md', 'fixes/2026-11-11-tooltip-options-not-tooltips.md'];
  for (const f of files) {
    const lines = read(f).split('\n');
    lines.forEach((l, i) => {
      if (/[—–]/.test(l)) fail(`dash in ${f}:${i + 1}`);
      if (/(^|[\s>])--(\s|$)/.test(l)) fail(`double hyphen in ${f}:${i + 1}`);
    });
  }
  console.log('copy passed');
} else {
  fail('unknown check');
}
