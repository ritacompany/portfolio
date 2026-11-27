const { chromium } = require('playwright'); const fs=require('fs');
const A=process.env.ARCHIVE_DIR||'archive';
const pages=[
['c1-marques','https://nayaramarques.com/design-system'],
['c2-onori','https://www.sanity.io/engineering/design-system-evals'],
['c3-sanderson','https://chsanderson.com/portfolio/design-system-redux-with-agentic-development'],
['c4-selvaraj','https://www.designsystemscollective.com/i-gave-my-agent-claude-md-and-design-md-it-ignored-my-entire-component-library-c6d7e9be34d4'],
['c5-ambitious','https://ambitiousdesigner.substack.com/p/design-system-for-ai-agents'],
['c6-horner','https://medium.com/design-bootcamp/how-to-make-your-design-system-agent-ready-ea4cfc062270'],
].filter(p=>process.argv.length<3||process.argv.slice(2).includes(p[0]));
const UA='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36';
(async()=>{const b=await chromium.launch();
for(const [id,u] of pages){const dir=`${A}/${id}`;fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});
 const ctx=await b.newContext({viewport:{width:1440,height:1000},userAgent:UA});const p=await ctx.newPage();
 try{const clean=()=>p.evaluate(()=>{document.querySelectorAll('[role=dialog],[aria-modal=true]').forEach(e=>e.style.setProperty('display','none','important'));for(const e of document.querySelectorAll('body *')){const c=getComputedStyle(e);if(c.position==='fixed'&&e.offsetWidth>=innerWidth*0.9&&e.offsetHeight>=innerHeight*0.9)e.style.setProperty('display','none','important');}document.documentElement.style.overflow='auto';document.body.style.overflow='auto';});const r=await p.goto(u,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForTimeout(4000);
  // lazy load pass
  let H=await p.evaluate(()=>document.documentElement.scrollHeight);
  for(let y=0;y<H;y+=700){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(250);H=await p.evaluate(()=>document.documentElement.scrollHeight);}
  await p.evaluate(()=>window.scrollTo(0,0));await p.waitForTimeout(1500);
  H=await p.evaluate(()=>document.documentElement.scrollHeight);
  const text=await p.evaluate(()=>document.body.innerText);
  fs.writeFileSync(`${dir}/page.txt`,`${u}\nCaptured 2026-11-24 (close set), status ${r.status()}\n\n`+text);
  let i=0,last=-1;
  for(let y=0;y<H;y+=900){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(450);
   await clean();const sy=await p.evaluate(()=>window.scrollY); if(sy===last)break; last=sy;
   await p.screenshot({path:`${dir}/screen-${String(++i).padStart(2,'0')}.jpg`,type:'jpeg',quality:62});}
  fs.writeFileSync(`${dir}/meta.json`,JSON.stringify({id,url:u,status:r.status(),height:H,screens:i,lastScrollY:last,words:text.split(/\s+/).length}));
  console.log(id,r.status(),'h',H,'screens',i,'words',text.split(/\s+/).length);
 }catch(e){console.log(id,'ERR',e.message.split('\n')[0]);}
 await ctx.close();}
await b.close();})();
