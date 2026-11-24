// G1: the private archive's source folder holds every page: text plus screens that reach the bottom.
import fs from 'node:fs';
const site=process.env.ARCHIVE_SITE||'/tmp/claude-0/-home-user-portfolio/8af8e05c-7114-58f8-af7c-937ee5af71ce/scratchpad/site';
const arch=site.replace(/site$/,'archive');
const data=JSON.parse(fs.readFileSync(site+'/data.json','utf8'));const errs=[];
if(data.length!==10)errs.push('entries '+data.length);
for(const d of data){
  const m=JSON.parse(fs.readFileSync(`${arch}/${d.id}/meta.json`,'utf8'));
  const covered=m.lastScrollY+1000>=m.height-5;
  if(!covered)errs.push(d.id+' screens stop short of the page bottom');
  if(d.screens.length!==m.screens||!d.screens.every(s=>fs.statSync(site+'/'+s).size>5000))errs.push(d.id+' screen files');
  const t=fs.readFileSync(`${site}/text/${d.id}.txt`,'utf8');if(t.split(/\s+/).length<400)errs.push(d.id+' text short');
  if(m.status!==200)errs.push(d.id+' status '+m.status);
}
const ex=fs.readFileSync(new URL('../EXAMPLES.md',import.meta.url),'utf8');
const links=[...ex.matchAll(/^\| \d+ \| \[[^\]]+\]\((https:[^)]+)\)/gm)].map(m=>m[1]);
for(const l of links)if(!data.some(d=>d.url===l))errs.push('EXAMPLES link not archived: '+l);
if(errs.length){console.log('FAIL '+errs.join('; '));process.exit(1);}console.log('ARCHIVE-PASS');
