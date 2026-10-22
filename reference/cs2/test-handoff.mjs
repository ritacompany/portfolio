// Proves the cross account handoff holds: the usage hook, the handoff check, the return packet check,
// that BROWSER_MODE.md states every copy rule check-copy.mjs enforces, that nothing existing broke, and
// that a new session on either account is pointed at the handoff.
// Usage: node test-handoff.mjs [usage|handoff|packet|drift|regress|wiring]   (no argument runs all)
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkHandoff } from './check-handoff.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(here, '../..');
const hook = path.join(root, '.claude/hooks/usage-checkpoint.mjs');
const only = process.argv[2];
let allOk = true;
const suite = (name, fn) => {
  if (only && only !== name) return;
  const results = fn();
  let ok = results.length > 0;
  for (const [label, pass, detail] of results) { ok &&= pass; console.log(`${pass ? 'ok  ' : 'FAIL'} ${name}: ${label}${pass || !detail ? '' : `\n     ${detail}`}`); }
  allOk &&= ok;
  if (ok) console.log(`HANDOFF_TEST_${name.toUpperCase()}_PASS`);
};

const sh = (cwd, cmd, ...a) => spawnSync(cmd, a, { cwd, encoding: 'utf8' });
const GOOD_HANDOFF = fs.readFileSync(path.join(here, 'HANDOFF.md'), 'utf8');

suite('usage', () => {
  const out = [];
  // A throwaway repo with a pushed HANDOFF.md, so the stop hook has real git state to read.
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cs2usage-'));
  const repo = path.join(tmp, 'repo'), remote = path.join(tmp, 'remote.git');
  sh(tmp, 'git', 'init', '-q', '--bare', remote);
  sh(tmp, 'git', 'init', '-q', '-b', 'main', repo);
  for (const [k, v] of [['user.email', 't@t'], ['user.name', 't'], ['commit.gpgsign', 'false']]) sh(repo, 'git', 'config', k, v);
  fs.mkdirSync(path.join(repo, 'reference/cs2/copy'), { recursive: true });
  fs.writeFileSync(path.join(repo, 'reference/cs2/HANDOFF.md'), GOOD_HANDOFF);
  fs.writeFileSync(path.join(repo, 'reference/cs2/copy/section-1.md'), 'Section: 1\n');
  fs.writeFileSync(path.join(repo, '.gitignore'), '.claude/state/\n');
  sh(repo, 'git', 'add', '-A'); sh(repo, 'git', 'commit', '-qm', 'init');
  sh(repo, 'git', 'remote', 'add', 'origin', remote); sh(repo, 'git', 'push', '-qu', 'origin', 'main');

  const state = path.join(repo, '.claude/state');
  const setUsage = (five, week, agoMin = 1) => { fs.mkdirSync(state, { recursive: true }); fs.writeFileSync(path.join(state, 'usage.json'), JSON.stringify({ five_hour: five, seven_day: week, five_hour_resets_at: 'w1', at: new Date(Date.now() - agoMin * 60000).toISOString() })); };
  const reset = () => fs.rmSync(state, { recursive: true, force: true });
  const call = (mode, payload = {}, ...extra) => spawnSync('node', [hook, mode, ...extra], { input: JSON.stringify(payload), encoding: 'utf8', env: { ...process.env, CLAUDE_PROJECT_DIR: repo } });
  const prompt = () => call('prompt').stdout.trim();
  const stop = (p = {}) => call('stop', p).stdout.trim();
  const touch = (f, minutesAfterHandoff) => {
    const h = fs.statSync(path.join(repo, 'reference/cs2/HANDOFF.md')).mtimeMs;
    const t = new Date(h + minutesAfterHandoff * 60000);
    fs.utimesSync(path.join(repo, f), t, t);
  };

  reset(); setUsage(50, 30);
  out.push(['silent under 75%', prompt() === '']);
  reset(); setUsage(76, 30);
  const first = prompt(), second = prompt();
  out.push(['checkpoint at 75%', first.startsWith('USAGE CHECKPOINT') && first.includes('HANDOFF.md') && first.includes('git push'), first]);
  out.push(['short reminder after the first checkpoint in a window', second.startsWith('Usage') && !second.includes('USAGE CHECKPOINT'), second]);
  reset(); setUsage(10, 91);
  out.push(['checkpoint at 90% of the week', prompt().startsWith('USAGE CHECKPOINT')]);
  reset(); setUsage(92, 30);
  const stopText = prompt();
  out.push(['stop at 90%', stopText.startsWith('USAGE NEARLY OUT') && stopText.includes('BROWSER_MODE.md'), stopText]);
  reset(); setUsage(10, 96);
  out.push(['stop at 95% of the week', prompt().startsWith('USAGE NEARLY OUT')]);
  reset();
  const noNums = [prompt(), prompt(), prompt(), prompt(), prompt(), prompt()];
  out.push(['no numbers: asks for the usage tool on prompt 1 and 6 only', noNums[0].includes('get_usage') && noNums.slice(1, 5).every(x => x === '') && noNums[5].includes('get_usage'), JSON.stringify(noNums.map(x => x.slice(0, 20)))]);
  reset(); setUsage(70, 30, 30);
  const staleNums = [prompt(), prompt(), prompt()];
  out.push(['stale numbers at 70%: asks every second prompt', staleNums[0].includes('get_usage') && staleNums[1] === '' && staleNums[2].includes('get_usage'), JSON.stringify(staleNums.map(x => x.slice(0, 20)))]);
  reset();
  const rec = call('record', {}, '80', '40').stdout.trim();
  out.push(['record mode saves the tool numbers', rec === 'USAGE_RECORDED checkpoint' && prompt().startsWith('USAGE CHECKPOINT'), rec]);
  out.push(['record mode refuses no number', call('record').status === 2]);

  reset(); setUsage(50, 30);
  out.push(['stop: clean and pushed, allowed', stop() === '']);
  fs.writeFileSync(path.join(repo, 'reference/cs2/copy/section-1.md'), 'Section: 1\n\n## Block 1\n'); touch('reference/cs2/copy/section-1.md', 5);
  out.push(['stop: low usage, copy 5 minutes newer than the handoff, allowed', stop() === '']);
  touch('reference/cs2/copy/section-1.md', 60);
  const cool = stop();
  out.push(['stop: low usage, copy an hour newer than the handoff, blocked', cool.includes('"decision":"block"') && cool.includes('45 minutes'), cool]);
  out.push(['stop: never blocks twice in a row', stop({ stop_hook_active: true }) === '']);
  reset(); setUsage(80, 30); touch('reference/cs2/copy/section-1.md', 1);
  const hot = stop();
  out.push(['stop: high usage, any CS2 change newer than the handoff, blocked', hot.includes('"decision":"block"') && hot.includes('usage is high'), hot]);
  fs.appendFileSync(path.join(repo, 'reference/cs2/HANDOFF.md'), '\n'); touch('reference/cs2/copy/section-1.md', -1);
  sh(repo, 'git', 'add', '-A'); sh(repo, 'git', 'commit', '-qm', 'checkpoint');
  out.push(['stop: high usage, handoff committed but not pushed, blocked', stop().includes('"decision":"block"')]);
  sh(repo, 'git', 'push', '-q');
  out.push(['stop: high usage, handoff pushed, allowed', stop() === '']);
  fs.rmSync(tmp, { recursive: true, force: true });
  return out;
});

suite('handoff', () => {
  const swap = (a, b) => GOOD_HANDOFF.replace(a, b);
  const fails = (label, text, want) => { const p = checkHandoff(text); return [label, p.some(x => x.includes(want)), p.join('; ') || 'passed']; };
  const real = spawnSync('node', [path.join(here, 'check-handoff.mjs')], { encoding: 'utf8' });
  return [
    ['the real HANDOFF.md passes', real.status === 0 && real.stdout.includes('HANDOFF_PASS'), real.stdout],
    fails('a missing heading is refused', swap('## Next action', '## Next'), 'Next action'),
    fails('an empty heading is refused', swap(/## Decided in chat, not yet in files\n\nNone\./, '## Decided in chat, not yet in files\n'), 'is empty'),
    fails('a loop step outside 1 to 8 is refused', swap(/^Loop step: \d+$/m, 'Loop step: 9'), 'Loop step'),
    fails('a section outside 1 to 10 is refused', swap(/^Section: \d+$/m, 'Section: 0'), 'Section'),
    fails('By must be Claude Code or browser', swap(/^By: .*$/m, 'By: me'), 'By'),
    fails('a quotation of 8 words is refused', GOOD_HANDOFF + '\nHe said "we never had a plan that told anyone what came next".\n', 'quotation'),
    ['a quotation of 3 words is fine', checkHandoff(GOOD_HANDOFF + '\nThe "Read first" list.\n').length === 0],
    fails('a dash is refused', GOOD_HANDOFF + '\nOne thing — another.\n', 'dash'),
  ];
});

suite('packet', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cs2pkt-'));
  const handoff = GOOD_HANDOFF.replace(/^By: .*$/m, 'By: browser').replace(/^Section: \d+$/m, 'Section: 4').replace(/^Loop step: \d+$/m, 'Loop step: 5');
  const copy = 'Section: 4\n\n## Block 1\n\nEyebrow: Checking in\n\nHeadline: Each week the plan compares what got done with what it expected.\n\nThe check never judges. It moves the date.\n';
  const msg = 'Section: 4\n\n## Block 1\n- Claim: the plan checks reality against the estimate.\n- What the reader has to see: the date moving.\n- Moves: cs-t01\n- Images: 1\n- Image 1: the pace screen he picks | Supports: the date moves\n';
  const draft = 'Status: talking\n\n# CS2 section 4: Pace\n\nNotes.\n';
  const pkt = files => `CS2 RETURN PACKET\nSection: 4\nLoop step reached: 5\n\n${files.map(([p, b]) => `=== FILE ${p} ===\n${b}=== END FILE ===\n`).join('\n')}`;
  const base = [['reference/cs2/draft/CS2-section-4.md', draft], ['reference/cs2/copy/section-4.md', copy], ['reference/cs2/message/section-4.md', msg], ['reference/cs2/HANDOFF.md', handoff]];
  const run = (label, files, want, raw) => {
    const f = path.join(tmp, `${label.replace(/\W+/g, '-')}.md`);
    fs.writeFileSync(f, raw ?? pkt(files));
    const r = spawnSync('node', [path.join(here, 'check-packet.mjs'), f], { encoding: 'utf8' });
    const pass = want === 'PASS' ? r.status === 0 && r.stdout.includes('PACKET_PASS') : r.status === 1 && r.stdout.includes('PACKET_FAIL') && r.stdout.includes(want);
    return [label, pass, r.stdout.trim().split('\n').slice(0, 4).join(' | ')];
  };
  const swap = (i, body) => base.map((x, j) => j === i ? [x[0], body] : x);
  const out = [
    run('a clean packet passes', base, 'PASS'),
    run('a dash in copy is refused', swap(1, copy.replace('never judges.', 'never judges — ever.')), 'dash'),
    run('a product term before its section is refused', swap(1, copy.replace('It moves the date.', 'It handles rollover.')), 'rollover'),
    run('a colleague name is refused', swap(1, copy.replace('The check', 'Michael said the check')), 'Michael'),
    run('a body over 70 words is refused', swap(1, copy.replace('It moves the date.', 'word '.repeat(70))), '70'),
    run('a message plan with the wrong block count is refused', swap(2, msg + '\n## Block 2\n- Claim: x.\n- What the reader has to see: x.\n- Moves: cs-t01\n- Images: 0\n'), 'copy blocks'),
    run('a move not in the index is refused', swap(2, msg.replace('cs-t01', 'cs-t999')), 'cs-t999'),
    run('a slot plan is refused', [...base, ['reference/cs2/layout/section-4.md', 'x\n']], 'may only send'),
    run('a review verdict is refused', [...base, ['reference/cs2/review/section-4.json', '{}\n']], 'may only send'),
    run('APPROVALS.md is refused', [...base, ['reference/cs2/APPROVALS.md', '- Section 4 block 1: route figure\n']], 'may only send'),
    run('another section\'s copy is refused', [...base, ['reference/cs2/copy/section-3.md', copy.replace('Section: 4', 'Section: 3')]], 'may only send'),
    run('a packet without the handoff is refused', base.slice(0, 3), 'HANDOFF.md missing'),
    run('a handoff not marked By: browser is refused', swap(3, GOOD_HANDOFF), 'By: browser'),
    run('a long quotation in the draft is refused', swap(0, draft + '\nFrom the export: "nothing told a person what to do next and nothing joined the pieces up at all".\n'), 'quotation'),
    run('a draft without a Status line is refused', swap(0, '# Notes\n'), 'Status'),
    run('an unclosed file is refused', null, 'closed', pkt(base).replace(/=== END FILE ===\n$/, '')),
    run('a packet without its header is refused', null, 'CS2 RETURN PACKET', pkt(base).replace('CS2 RETURN PACKET\n', '')),
  ];
  fs.rmSync(tmp, { recursive: true, force: true });
  return out;
});

// Reads the rules out of check-copy.mjs itself, so a rule added there and not to the brief fails here.
export function missingFromBrief(src, brief) {
  const missing = [];
  const names = (src.match(/const NAMES = \[([^\]]*)\]/) || [])[1] || '';
  for (const [, n] of names.matchAll(/'([^']+)'/g)) if (!brief.includes(n)) missing.push(`name ${n}`);
  const terms = (src.match(/const TERMS = \[([\s\S]*?)\];/) || [])[1] || '';
  const termList = [...terms.matchAll(/\['([^']+)',\s*(\d+)\]/g)];
  if (!termList.length) missing.push('could not read TERMS from check-copy.mjs');
  for (const [, t, s] of termList) if (!brief.includes(`\`${t}\` from section ${s}`)) missing.push(`term ${t} from section ${s}`);
  const vocab = [...src.matchAll(/AI vocabulary: ([\w-]+)/g)].map(m => m[1]);
  if (!vocab.length) missing.push('could not read AI vocabulary from check-copy.mjs');
  for (const v of vocab) if (!brief.toLowerCase().includes(v.toLowerCase())) missing.push(`AI vocabulary ${v}`);
  for (const [re, label] of [[/max 70/, '70 words'], [/over 3 words/, 'three words'], [/over 2 sentences/, 'two sentences'], [/Oxford comma/, 'Oxford commas'], [/quotation marks/, 'quotation marks'], [/two by two/, 'two by two'], [/summary closer/, 'summary closer'], [/moralizing closer/, 'moralizing closer'], [/negative parallelism/, 'negative parallelism'], [/Eyebrow:/, 'Eyebrow:'], [/Headline:/, 'Headline:']])
    if (re.test(src) && !brief.includes(label)) missing.push(label);
  return missing;
}

suite('drift', () => {
  const src = fs.readFileSync(path.join(here, 'check-copy.mjs'), 'utf8');
  const brief = fs.readFileSync(path.join(here, 'BROWSER_MODE.md'), 'utf8');
  const now = missingFromBrief(src, brief);
  const addedTerm = missingFromBrief(src.replace("['handoff', 8],", "['handoff', 8], ['milestone', 4],"), brief);
  const addedName = missingFromBrief(src.replace("'Betsy', 'Michael'", "'Betsy', 'Michael', 'Priya'"), brief);
  const addedWord = missingFromBrief(src.replace("'AI vocabulary: tapestry']", "'AI vocabulary: tapestry'], [/\\bsynergy\\b/i, 'AI vocabulary: synergy']"), brief);
  return [
    ['BROWSER_MODE.md states every rule check-copy.mjs enforces', now.length === 0, now.join(', ')],
    ['control: a term added to the script and not the brief is caught', addedTerm.includes('term milestone from section 4'), addedTerm.join(', ')],
    ['control: a name added to the script and not the brief is caught', addedName.includes('name Priya'), addedName.join(', ')],
    ['control: an AI word added to the script and not the brief is caught', addedWord.includes('AI vocabulary synergy'), addedWord.join(', ')],
  ];
});

suite('regress', () => {
  const out = [];
  for (const [t, token] of [['test-check-copy.mjs', 'copy check discrimination passed'], ['test-copy-guard.mjs', 'copy guard discrimination passed'], ['test-figma-gate.mjs', 'figma gate discrimination passed'], ['test-figma-copy-match.mjs', 'figma copy match discrimination passed']]) {
    const r = spawnSync('node', [path.join(here, t)], { encoding: 'utf8' });
    out.push([`${t} still passes`, r.status === 0 && r.stdout.includes(token), r.stdout.trim().split('\n').filter(l => l.startsWith('FAIL')).join(' | ')]);
  }
  for (const f of ['.claude/hooks/usage-checkpoint.mjs', '.claude/hooks/usage-statusline.mjs', 'reference/cs2/check-handoff.mjs', 'reference/cs2/check-packet.mjs'])
    out.push([`${f} parses`, spawnSync('node', ['--check', path.join(root, f)]).status === 0]);
  const settings = JSON.parse(fs.readFileSync(path.join(root, '.claude/settings.json'), 'utf8'));
  const commands = s => JSON.stringify(s).match(/"command":"(?:[^"\\]|\\.)*"/g) || [];
  const before = spawnSync('git', ['show', 'main:.claude/settings.json'], { cwd: root, encoding: 'utf8' });
  const lost = before.status === 0 ? commands(JSON.parse(before.stdout)).filter(c => !commands(settings).includes(c)) : ['could not read main:.claude/settings.json'];
  out.push(['every hook registered on main is still registered', lost.length === 0, lost.join(', ')]);
  const all = commands(settings).join('\n');
  out.push(['status line, prompt and stop hooks are registered', /usage-statusline\.mjs/.test(JSON.stringify(settings.statusLine)) && all.includes('usage-checkpoint.mjs\\" prompt') && JSON.stringify(settings.hooks.Stop || '').includes('usage-checkpoint.mjs\\" stop')]);
  const ignored = spawnSync('git', ['check-ignore', '-q', '.claude/state/usage.json'], { cwd: root });
  out.push(['.claude/state is untracked', ignored.status === 0]);
  return out;
});

suite('wiring', () => {
  const read = f => fs.readFileSync(path.join(root, f), 'utf8');
  const proc = read('reference/cs2/CS2_PROCESS.md');
  return [
    ['CS2_PROCESS.md sends a new session to HANDOFF.md first', /HANDOFF\.md/.test(proc.split('## The idea')[0])],
    ['CS2_PROCESS.md has the switching accounts section', /## Switching accounts/.test(proc) && /BROWSER_MODE\.md/.test(proc) && /check-packet\.mjs/.test(proc)],
    ['CLAUDE.md points to the handoff', /reference\/cs2\/HANDOFF\.md/.test(read('CLAUDE.md'))],
    ['CLAUDE.md sends Claude in the browser to BROWSER_MODE.md before anything else', /claude\.ai[\s\S]{0,400}BROWSER_MODE\.md/.test(read('CLAUDE.md').split('## Whose portfolio')[0])],
    ['the browser brief asks him for no setup: no Project, pasted instructions, uploads or syncing', !/\b(Project instructions|[Uu]pload by hand|sync the GitHub|make a claude\.ai Project)\b/.test(read('reference/cs2/BROWSER_MODE.md'))],
    ['AGENTS.md points to the handoff and the browser brief', /HANDOFF\.md/.test(read('AGENTS.md')) && /BROWSER_MODE\.md/.test(read('AGENTS.md'))],
  ];
});

if (!allOk) { console.log('HANDOFF_TEST_FAIL'); process.exit(1); }
