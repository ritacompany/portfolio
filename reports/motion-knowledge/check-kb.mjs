// Pass/fail on the motion knowledge itself: does it support live motion and carry the scroll patterns?
// Usage: node reports/motion-knowledge/check-kb.mjs <rules.md> <skill.md> [patterns.md]
import fs from 'fs';
const [rulesP, skillP, patP] = process.argv.slice(2);
const read = (p) => (p && fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '');
const rules = read(rulesP), skill = read(skillP), pat = read(patP);
const fails = [];
if (/stay as built|reviewed in the browser, not rewritten/i.test(rules)) fails.push('rules exempt live page motion');
if (!/^## Live/m.test(rules)) fails.push('rules have no Live section');
if (!/Live:.*built in browser/i.test(rules.replace(/\n\s*/g, ' '))) fails.push('review loop has no live capture');
const desc = (skill.match(/^description:(.*)$/m) || [, ''])[1];
for (const w of ['scroll', 'stagger', 'sticky']) if (!desc.toLowerCase().includes(w)) fails.push(`skill trigger lacks "${w}"`);
for (const p of ['Fade up', 'Parallax', 'Sticky', 'Horizontal', 'Scale in', 'Text reveal', 'Stagger', 'Progress bar'])
  if (!new RegExp(`^\\| ${p} \\|`, 'm').test(pat)) fails.push(`patterns lack ${p}`);
for (const l of ["Fitts", "Hick", "Miller", "Doherty", "Postel", "Jakob", "Frequency of use"]) if (!pat.includes(l)) fails.push(`patterns lack ${l}`);
if (fails.length) { console.log('FAIL\n' + fails.map((f) => '  ' + f).join('\n')); process.exit(1); }
console.log('KB_PASS');
