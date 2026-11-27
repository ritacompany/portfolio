const { chromium } = require('playwright'); const fs=require('fs');
const A=process.env.ARCHIVE_DIR||'archive';
const pages=[
['01-wise','https://nessgrixti.com/portfolio/wise-multi-brand/'],
['02-jpmc','https://jashamichele.com/case-studies/mds-modernizing-design-system/'],
['03-indigo','https://6epixels.com/case-study/design-system'],
['04-cassi','https://fplevi.github.io/newfolio/work/design-system.html'],
['05-musterhall','https://ericknolasco.com/work/musterhall-design-system/'],
['06-diorama','https://tympanus.net/codrops/2026/11/01/design-systems-agents/'],
['07-wellsky','https://www.larserickson.design/case-studies/a-design-system-for-developers-and-ai'],
['08-anorbank','https://veroduplex.art/projects/design-system'],
['09-mcp','https://medium.com/@vera.marshalova/optimising-the-design-system-with-the-mcp-server-096d0f7b027e'],
['10-enterprise','https://medium.com/design-bootcamp/building-scaling-a-global-enterprise-design-system-a-case-study-c90f3505dd1b'],
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
  fs.writeFileSync(`${dir}/page.txt`,`${u}\nCaptured 2026-11-24, status ${r.status()}\n\n`+text);
  let i=0,last=-1;
  for(let y=0;y<H;y+=900){await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(450);
   await clean();const sy=await p.evaluate(()=>window.scrollY); if(sy===last)break; last=sy;
   await p.screenshot({path:`${dir}/screen-${String(++i).padStart(2,'0')}.jpg`,type:'jpeg',quality:62});}
  fs.writeFileSync(`${dir}/meta.json`,JSON.stringify({id,url:u,status:r.status(),height:H,screens:i,lastScrollY:last,words:text.split(/\s+/).length}));
  console.log(id,r.status(),'h',H,'screens',i,'words',text.split(/\s+/).length);
 }catch(e){console.log(id,'ERR',e.message.split('\n')[0]);}
 await ctx.close();}
await b.close();})();
