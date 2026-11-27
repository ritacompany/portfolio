// G1 and G2: the second close set's pick list and study are complete, exclusive of every earlier set and public safe.
import fs from 'node:fs';import { execSync } from 'node:child_process';
const rd=p=>fs.readFileSync(new URL(p,import.meta.url),'utf8');
const ex=rd('./CLOSE-2-EXAMPLES.md'),st=rd('./CLOSE-2-STUDY.md');const errs=[];
const picks=[...ex.matchAll(/^\| (\d+) \| \[[^\]]+\]\((https?:[^)]+)\) \|(.*)\|\s*$/gm)].map(m=>({n:m[1],url:m[2],row:m[3]}));
if(picks.length<1||picks.length>10)errs.push('pick count '+picks.length);
for(const p of picks){const cells=p.row.split('|').map(c=>c.trim());if(cells.length<8||cells.some(c=>!c))errs.push('row '+p.n+' has an empty cell');
 for(const ax of['AI','Proof','Team','Stage','Structure'])if(!new RegExp(`### ${p.n}\\.[\\s\\S]*?- ${ax}: (strong|partial|weak)\\b`).test(ex))errs.push(`pick ${p.n} lacks ${ax} score`);
 if(!new RegExp(`### ${p.n}\\.[\\s\\S]*?- Seniority shown at:`).test(ex))errs.push(`pick ${p.n} lacks seniority location`);}
const norm=u=>u.replace(/^https?:\/\/(www\.)?/,'').replace(/[?#].*$/,'').replace(/\/$/,'').toLowerCase();
const prior=[rd('../EXAMPLES.md'),rd('../../REFERENCE-BOARD.md'),rd('./CLOSE-EXAMPLES.md'),fs.readFileSync(new URL('../../../../reports/Design system portfolio case studies.md',import.meta.url),'utf8')];
try{prior.push(execSync('git show origin/claude/design-system-cs-visual:reference/design-system-cs/research/examples/VISUAL-EXAMPLES.md',{encoding:'utf8'}));}catch{errs.push('visual set not readable');}
const seen=new Set(prior.flatMap(t=>[...t.matchAll(/https?:\/\/[^\s)>"]+/g)].map(m=>norm(m[0]))));
for(const p of picks)if(seen.has(norm(p.url)))errs.push('repeats an earlier set: '+p.url);
const secs=st.split(/\n## \d+\. /).slice(1);if(secs.length!==picks.length)errs.push('study sections '+secs.length);
for(const p of picks)if(!st.includes(p.url))errs.push('study missing '+p.url);
secs.forEach((x,i)=>{for(const f of['Link','Archive','Shape','AI readiness','What was got wrong','Limits','Visuals that explain the mechanism','Borrow, section 1','Borrow, section 2','Borrow, section 3','Borrow, section 4','Borrow, section 5','Borrow, section 6'])if(!x.includes(`- ${f}:`))errs.push(`study ${i+1} lacks ${f}`);});
if(!/\n## Against Marques on structure\b/.test(st))errs.push('no structure comparison section');
if(!/\n## Voice\b/.test(st))errs.push('no voice note');
if(!/claude\.ai\/artifact\/\w+/.test(st))errs.push('no archive link');
if(!/\n## How the checks ran\b/.test(ex))errs.push('no checks section');
for(const [n,t] of[['examples',ex],['study',st]]){if(/[–—]| -- /.test(t))errs.push(n+' dash punctuation');
 if(/\b\w+, \w+(?: \w+)?, and \w/.test(t))errs.push(n+' possible Oxford comma');
 if([...t.matchAll(/["“]([^"”]{0,400})["”]/g)].some(m=>m[1].split(/\s+/).length>12))errs.push(n+' long quote');}
if(errs.length){console.log('FAIL '+errs.join('; '));process.exit(1);}console.log('CLOSE2-PASS');
