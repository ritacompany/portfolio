// G2: STUDY.md covers the ten EXAMPLES.md links, one section each with every field, public safe.
import fs from 'node:fs';
const s=fs.readFileSync(new URL('./STUDY.md',import.meta.url),'utf8');
const ex=fs.readFileSync(new URL('../EXAMPLES.md',import.meta.url),'utf8');
const links=[...ex.matchAll(/^\| \d+ \| \[[^\]]+\]\((https:[^)]+)\)/gm)].map(m=>m[1]);
const secs=s.split(/\n## \d+\. /).slice(1);const errs=[];
if(secs.length!==10)errs.push('sections '+secs.length);
for(const l of links)if(!s.includes(l))errs.push('missing link '+l);
secs.forEach((x,i)=>{for(const f of['Link','Archive','Shape','Visuals that carry it','Numbers','Take','Skip'])if(!x.includes(`- ${f}:`))errs.push(`section ${i+1} lacks ${f}`);});
if(/[–—]| -- /.test(s))errs.push('dash punctuation');
if(/\w+, \w+(?: \w+)?, and /.test(s))errs.push('possible Oxford comma');
const q=[...s.matchAll(/["“]([^"”]{0,400})["”]/g)].filter(m=>m[1].split(/\s+/).length>12);
if(q.length)errs.push('long quote');
if(!/claude\.ai\/artifact\/\w+/.test(s))errs.push('no archive link');
if(errs.length){console.log('FAIL '+errs.join('; '));process.exit(1);}console.log('STUDY-PASS');
