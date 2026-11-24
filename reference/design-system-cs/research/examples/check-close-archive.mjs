// G3: every pick is archived whole: text plus screens that reach the page bottom.
import fs from 'node:fs';
const arch=process.env.CLOSE_ARCHIVE||'/tmp/claude-0/-home-user-portfolio/3b311862-618b-56d0-831d-1209570fbd5c/scratchpad/archive';
const ex=fs.readFileSync(new URL('./CLOSE-EXAMPLES.md',import.meta.url),'utf8');
const urls=[...ex.matchAll(/^\| \d+ \| \[[^\]]+\]\((https?:[^)]+)\)/gm)].map(m=>m[1]);const errs=[];
const metas=fs.readdirSync(arch).filter(d=>fs.existsSync(`${arch}/${d}/meta.json`)).map(d=>JSON.parse(fs.readFileSync(`${arch}/${d}/meta.json`,'utf8')));
for(const u of urls){const m=metas.find(x=>x.url===u);if(!m){errs.push('not archived '+u);continue;}
 if(m.status!==200)errs.push(m.id+' status '+m.status);
 if(m.lastScrollY+1000<m.height-5)errs.push(m.id+' screens stop short');
 const shots=fs.readdirSync(`${arch}/${m.id}`).filter(f=>f.startsWith('screen-'));if(shots.length!==m.screens||shots.some(f=>fs.statSync(`${arch}/${m.id}/${f}`).size<5000))errs.push(m.id+' screen files');
 if(fs.readFileSync(`${arch}/${m.id}/page.txt`,'utf8').split(/\s+/).length<400)errs.push(m.id+' text short');}
if(errs.length){console.log('FAIL '+errs.join('; '));process.exit(1);}console.log('CLOSE-ARCHIVE-PASS');
