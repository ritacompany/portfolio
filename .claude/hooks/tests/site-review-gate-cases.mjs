// Cases for site-review-gate.mjs. Each builds a transcript, pipes a tool call to the hook and checks
// allow (exit 0) or block (exit 2). Prints SITE_GATE_OK n/n only when every case behaves.
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const hook = resolve(new URL('..', import.meta.url).pathname, 'site-review-gate.mjs');
const root = resolve(new URL('../../..', import.meta.url).pathname);
const dir = mkdtempSync(join(tmpdir(), 'site-gate-'));
const user = (text) => ({ type: 'user', message: { role: 'user', content: text } });
const card = (q, a) => ({ type: 'user', message: { role: 'user', content: [{ type: 'tool_result', tool_use_id: 'x', content: `Your questions have been answered: "${q}"="${a}". You can now continue.` }] } });
const edit = (file_path) => ({ tool_name: 'Edit', tool_input: { file_path, old_string: 'a', new_string: 'b' } });
const bash = (command) => ({ tool_name: 'Bash', tool_input: { command } });

const cases = [
  ['his process message is not approval', [user('Okay, but we need to build some kind of process into place at each of these steps')], edit('site/css/home.css'), 2],
  ['plain yes approves', [user('yes, go ahead')], edit('site/css/home.css'), 0],
  ['approval two messages back still holds', [user('yep build it'), user('also the footer is nice'), user('cool')], edit('site/index.html'), 0],
  ['stop after a yes blocks', [user('yes'), user('wait, hold on, the hero is wrong')], edit('site/index.html'), 2],
  ['old yes four messages back has expired', [user('yes'), user('a'), user('b'), user('c')], edit('site/index.html'), 2],
  ['motion lab stays open for proposals', [user('what do you think')], edit('site/motion-lab/hover.html'), 0],
  ['dev pages stay open for proposals', [user('what do you think')], edit('site/dev/buttons/index.html'), 0],
  ['docs stay open', [user('what do you think')], edit('docs/SITE_BUILD_PLAN.md'), 0],
  ['framework generator is gated', [user('what do you think')], edit('scripts/framework-page/build.py'), 2],
  ['shell write to the site is blocked', [user('hmm')], bash("sed -i 's/a/b/' site/css/tokens.css"), 2],
  ['running the generator is blocked', [user('hmm')], bash('python3 scripts/framework-page/build.py site/mondai/framework/index.html scripts/framework-page/spec.json scripts/framework-page/page.tpl'), 2],
  ['shell read of the site is open', [user('hmm')], bash('cat site/css/tokens.css && grep -n hover site/css/components.css'), 0],
  ['writing docs while mentioning site/ is open', [user('hmm')], bash("sed 's#a#copies site/ into#' x > scripts/build-preview.mjs && python3 - <<'X'\nopen('docs/SITE_BUILD_PLAN.md','w').write('everything in site/ except dev')\nX"), 0],
  ['redirect into the site is blocked', [user('hmm')], bash('echo x > ' + 'site/css/home.css'), 2],
  ['cp into the site is blocked', [user('hmm')], bash('cp /tmp/a.css ' + 'site/css/home.css'), 2],
  ['python writing a site file is blocked', [user('hmm')], bash(`python3 -c "open('${'site'}/css/home.css','w').write('x')"`), 2],
  ['redirect into motion lab is open', [user('hmm')], bash('echo x > site/motion-lab/a.html'), 0],
  ['tagged card answered Yes approves', [user('ok'), card('[site change] Build the card hover on Home as shown?', 'Yes, build it')], edit('site/css/home.css'), 0],
  ['untagged card does not approve', [user('ok'), card('Should I set up the review loop?', 'Yes, loop plus block (Recommended)')], edit('site/css/home.css'), 2],
  ['tagged card answered No blocks', [user('ok'), card('[site change] Build the card hover?', 'Not yet')], edit('site/css/home.css'), 2],
];

// Motion goes clip first (26 Nov). A fixture project: one motion piece with no passing log, one with.
const fx = (log) => {
  const r = mkdtempSync(join(tmpdir(), 'site-gate-motion-'));
  mkdirSync(join(r, 'docs/motion/fade'), { recursive: true });
  mkdirSync(join(r, 'site/css'), { recursive: true });
  writeFileSync(join(r, 'docs/motion/fade/style_guide.md'), '# Fade\nCode: site/css/fade.css only.\n');
  if (log) writeFileSync(join(r, 'docs/motion/fade/review_log.md'), log);
  return r;
};
const noLog = fx(null);
const openP0 = fx('## Round 1\nFresh eyes: saw a pop.\n- P0: 0.30 s pop\n');
const passing = fx('## Round 1\nFresh eyes: clean.\n- P2: 0.40 s fine\n');
const write = (file_path, content) => ({ tool_name: 'Write', tool_input: { file_path, content } });
const motionCases = [
  ['yes does not lift a motion file with no review log', [user('yes, go ahead')], edit('site/css/fade.css'), 2, noLog],
  ['yes does not lift a motion file whose last round has an open P0', [user('yes')], edit('site/css/fade.css'), 2, openP0],
  ['a motion file with a passing log and a yes is allowed', [user('yes')], edit('site/css/fade.css'), 0, passing],
  ['a passing log alone is not approval', [user('what do you think')], edit('site/css/fade.css'), 2, passing],
  ['adding keyframes to an unnamed site file is blocked after a yes', [user('yes')], { tool_name: 'Edit', tool_input: { file_path: 'site/css/home.css', old_string: 'a', new_string: '@keyframes x { to { opacity: 0 } }' } }, 2, noLog],
  ['adding a view transition in a new file is blocked after a yes', [user('yes')], write('site/css/new.css', '@view-transition { navigation: auto; }'), 2, noLog],
  ['a plain site edit after a yes is still allowed', [user('yes')], edit('site/css/home.css'), 0, noLog],
  ['shell write to a motion file is blocked after a yes', [user('yes')], bash("sed -i 's/200ms/250ms/' site/css/fade.css"), 2, noLog],
  ['motion lab stays open for the clip', [user('hmm')], write('site/motion-lab/fade.html', '@keyframes x {}'), 0, noLog],
];
for (const c of motionCases) cases.push(c);

let ok = 0;
cases.forEach(([name, transcript, call, want, cwd], i) => {
  const t = join(dir, `t${i}.jsonl`);
  writeFileSync(t, transcript.map((e) => JSON.stringify(e)).join('\n') + '\n');
  const r = spawnSync(process.execPath, [hook], { input: JSON.stringify({ ...call, transcript_path: t, cwd: cwd || root }), encoding: 'utf8' });
  const pass = r.status === want;
  if (pass) ok++; else console.log(`FAIL ${name}: exit ${r.status}, want ${want} ${r.stderr.trim().slice(0, 120)}`);
});
if (ok === cases.length) console.log(`SITE_GATE_OK ${ok}/${cases.length}`); else { console.log(`${ok}/${cases.length}`); process.exit(1); }
