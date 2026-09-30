// Playwright gates for the journey map prototype. Run: node build.mjs && node check.mjs (needs playwright with chromium; set PLAYWRIGHT_MODULE to a path to use a global install).
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import path from 'path';
import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const F = f => path.join(here, f);
import fs from 'fs';
const html=fs.readFileSync(F('journey-section.html'),'utf8'); const lenisJs=fs.readFileSync(F('vendor/lenis.min.js'),'utf8'); const gsapJs=fs.readFileSync(F('vendor/gsap.min.js'),'utf8');
const doc='<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head><body>'+html+'</body></html>';
fs.mkdirSync(F('shots'),{recursive:true});
const b=await chromium.launch(); const R={}; const ok=(g,c,m)=>(R[g]=R[g]||[]).push((c?'ok ':'FAIL ')+m);
ok('G0',!/[\u2014\u2013]|--/.test(html.replace(/base64,[A-Za-z0-9+\/=]+/g,'').replace(/--[a-z0-9-]+/g,'')),'no em dash, en dash or double hyphen in file (outside base64 and CSS variables)');
ok('G0',!/clip-path|MaskReveal|\.panel|scaleContainer/.test(html.replace(/base64,[A-Za-z0-9+/=]+/g,'')),'no container mask or panel reveal left in the code');
for (const cfg of [{w:1280,frame:true,rate:.85},{w:1280,frame:false,rate:1},{w:390,frame:false,rate:1}]) {
  const tag=`w${cfg.w}${cfg.frame?' in iframe':''}`;
  const p=await b.newPage({viewport:{width:cfg.w,height:800}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.route('**/lenis.min.js',r=>r.fulfill({status:200,contentType:'application/javascript',body:lenisJs}));
  await p.route('**/gsap.min.js',r=>r.fulfill({status:200,contentType:'application/javascript',body:gsapJs}));
  await p.route('https://host.test/page',r=>r.fulfill({status:200,contentType:'text/html',body:doc}));
  if(cfg.frame){await p.setContent('<!doctype html><body style="margin:0"><iframe id="f" src="https://host.test/page" style="width:100%;height:800px;border:0"></iframe></body>');}
  else await p.goto('https://host.test/page');
  await p.waitForTimeout(1500);
  const f=cfg.frame?p.frames().find(x=>x.url().includes('host.test')):p.mainFrame();
  ok('G1',await f.evaluate(()=>!!window.Lenis&&document.getElementById('scroller').classList.contains('lenis')),`${tag} Lenis smooth scroll active`);
  await f.evaluate(r=>window.__j.setRate(r),cfg.rate);
  const u=Math.min(1,(cfg.w-32)/1440);
  const go=async y=>{await f.evaluate(y=>{window.__j.scroller.scrollTop=y;},y);};
  const st=()=>f.evaluate(()=>{const j=window.__j;const op=s=>+getComputedStyle(document.querySelector(s)).opacity;const tf=s=>getComputedStyle(document.querySelector(s)).transform;
    const cs=getComputedStyle(j.by.select), lb=getComputedStyle(j.by.select.querySelector('span'));
    const m=getComputedStyle(j.stage).transform.match(/matrix\(([^,]+),/);
    return {eyebrow:op('.eyebrow'),headline:op('.headline'),pills:op('.pills'),h2:op('.title h2'),para:op('.body p'),map:op('#map'),
      tfs:[tf('.eyebrow'),tf('.headline'),tf('.body p')],lines:document.querySelectorAll('.ln').length,scale:m?+m[1]:NaN,order:j.order(),bg:cs.backgroundColor,lw:lb.fontWeight,lc:lb.color,
      sw:j.scroller.scrollWidth,cw:j.scroller.clientWidth,h:j.scroller.clientHeight,
      introTop:document.querySelector('.eyebrow').getBoundingClientRect().top+j.scroller.scrollTop,rowTop:document.querySelector('.title h2').getBoundingClientRect().top+j.scroller.scrollTop,
      mapTop:j.map.getBoundingClientRect().top+j.scroller.scrollTop,mapH:j.map.getBoundingClientRect().height,
      nums:[...document.querySelectorAll('.slotnum')].map(n=>n.textContent).join(' '),numColor:getComputedStyle(document.querySelector('.slotnum')).color,numSize:getComputedStyle(document.querySelector('.slotnum')).fontSize,
      shapes:[...document.querySelectorAll('.step')].map(e=>getComputedStyle(e).borderRadius)};});
  let s=await st();
  ok('G2',s.eyebrow<.01&&s.headline<.01&&s.pills<.01&&s.h2<.01&&s.para<.01&&s.map<.01,`${tag} all blocks invisible before arrival`);
  ok('G3',s.lines===0&&s.tfs.every(t=>t==='none'),`${tag} no line split, no transform on text`);
  ok('G4',Math.abs(s.scale-u)<.005,`${tag} map at final size from the start scale=${s.scale.toFixed(3)} u=${u.toFixed(3)} (no shrink)`);
  ok('G5',s.sw<=s.cw,`${tag} no sideways scroll ${s.sw}<=${s.cw}`);
  {const c=await f.evaluate(()=>{const m=window.__j.map.getBoundingClientRect(),st=window.__j.stage.getBoundingClientRect();return {off:Math.abs((m.left+m.width/2)-(st.left+st.width/2)),inside:st.left>=m.left-1&&st.right<=m.right+1};});ok('G5',c.off<1.5&&c.inside,`${tag} map centred in its box (offset ${c.off.toFixed(1)}px, inside=${c.inside})`);}
  ok('G6',s.nums==='1 2 3 4 5'&&s.numColor==='rgb(242, 241, 248)'&&s.numSize==='16px',`${tag} slot numbers "${s.nums}" ${s.numColor} ${s.numSize}`);
  ok('G6',s.shapes.every(r=>r==='50%'),`${tag} steps are circles`);
  ok('G7',s.order==='quiz,review,select,intro,schedule',`${tag} start order per Figma ${s.order}`);
  // intro block: not yet when top is 60px inside, yes when 140px inside
  await go(s.introTop-s.h+60*u); await p.waitForTimeout(400); let a=await st();
  ok('G8',a.eyebrow<.01,`${tag} intro still hidden at 60px inside op=${a.eyebrow}`);
  await go(s.introTop-s.h+140*u); await p.waitForTimeout(350); let m=await st();
  ok('G8',m.eyebrow>m.headline&&m.headline>m.pills&&m.eyebrow>.05&&m.eyebrow<.95,`${tag} intro fading in order eyebrow ${m.eyebrow.toFixed(2)} > headline ${m.headline.toFixed(2)} > pills ${m.pills.toFixed(2)}`);
  ok('G3',m.lines===0&&m.tfs.every(t=>t==='none'),`${tag} fade only: no split, no movement mid-fade`);
  await p.waitForTimeout(1100); let d=await st();
  ok('G8',d.eyebrow>.99&&d.headline>.99&&d.pills>.99,`${tag} intro fully in after ~1.2s`);
  // row block: text and map fade together, flow does not start until map is halfway up
  await go(s.mapTop-s.h*.95); await p.waitForTimeout(1400); let r1=await st();
  ok('G9',r1.h2>.99&&r1.para>.99&&r1.map>.99,`${tag} row block in (h2 ${r1.h2} p ${r1.para} map ${r1.map})`);
  ok('G10',r1.order==='quiz,review,select,intro,schedule',`${tag} flow waits while map top at 95% of screen order=${r1.order}`);
  await go(s.mapTop-s.h*.75); const t0=Date.now(); let st0=null,end=null;
  while(Date.now()-t0<7000){const o=await f.evaluate(()=>({t:window.__j.flow[0].currentTime,ps:window.__j.flow[0].playState}));if(st0==null&&o.t>0)st0=Date.now()-t0;if(o.ps==='finished'){end=Date.now()-t0;break;}await p.waitForTimeout(20);}
  ok('G10',st0!=null&&st0<800,`${tag} flow starts ${st0}ms after map top passes 80%`);
  const want=1700/cfg.rate; ok('G10',end!=null&&Math.abs((end-st0)-want)<250,`${tag} flow runs ${end-st0}ms (target ${Math.round(want)})`);
  {await go(0);await p.waitForTimeout(900);await go(s.mapTop-s.h*.75);const tL=1376/cfg.rate+450;await p.waitForTimeout(tL-150);const pre=(await st()).bg;await p.waitForTimeout(150+65);const midc=(await st()).bg;await p.waitForTimeout(400);const post=(await st()).bg;
   const g=c=>+c.match(/\d+/g)[1];ok('G11',pre==='rgb(4, 4, 5)'&&g(midc)>4&&g(midc)<183&&post==='rgb(120, 183, 101)',`${tag} fill crossfades on landing: before ${pre} mid ${midc} after ${post}`);}
  let e=await st();
  ok('G11',e.order==='quiz,review,intro,schedule,select',`${tag} end order ${e.order}`);
  ok('G11',e.bg==='rgb(120, 183, 101)'&&e.lw==='900'&&e.lc==='rgb(4, 4, 5)',`${tag} select landed green, Black label bg=${e.bg} weight=${e.lw} color=${e.lc}`);
  if(cfg.w===1280&&!cfg.frame){await p.screenshot({path:F('shots/end.png')});await go(s.mapTop-s.h*.75);}
  // mid flow: outline while moving
  await go(0); await p.waitForTimeout(900); let z=await st();
  ok('G12',z.eyebrow<.01&&z.map<.01&&z.order==='quiz,review,select,intro,schedule'&&z.bg!=='rgb(120, 183, 101)',`${tag} reset after scrolling to top`);
  await go(s.mapTop-s.h*.75); await p.waitForTimeout(450/1+600); let mid=await st();
  ok('G13',mid.bg==='rgb(4, 4, 5)'&&mid.lw==='900',`${tag} select still outline while moving, label Black throughout bg=${mid.bg} weight=${mid.lw} order=${mid.order}`);
  if(cfg.w===1280&&!cfg.frame){await p.screenshot({path:F('shots/mid.png')});}
  await p.waitForTimeout(want+400); let again=await st();
  ok('G13',again.order==='quiz,review,intro,schedule,select'&&again.bg==='rgb(120, 183, 101)',`${tag} replays on return order=${again.order}`);
  if(cfg.w===1280&&!cfg.frame){await go(s.introTop-s.h*.5);await p.waitForTimeout(1500);await p.screenshot({path:F('shots/intro.png')});}
  if(cfg.w===390){await p.screenshot({path:F('shots/390.png'),fullPage:false});}
  ok('G14',errs.length===0,`${tag} no script errors ${errs.join(' | ')}`);
  await p.close();
}
await b.close();
let fails=0; for(const g of Object.keys(R).sort((a,b)=>+a.slice(1)-+b.slice(1))){for(const l of R[g]){console.log(g,l);if(l.startsWith('FAIL'))fails++;}}
console.log(fails?`FAILS: ${fails}`:'ALL PASS');
