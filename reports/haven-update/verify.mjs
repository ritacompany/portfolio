import {createServer} from 'node:http';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const root=process.cwd();
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE || path.join(process.env.HOME,'.npm/_npx/31e32ef8478fbf80/node_modules/playwright-core/index.mjs')));
const mime={'.html':'text/html','.css':'text/css','.js':'text/javascript','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'};
const server=createServer(async(req,res)=>{try{let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p.endsWith('/'))p+='index.html';let f=path.resolve(root,'.'+p);if(!f.startsWith(root+path.sep))throw 0;res.setHeader('Content-Type',mime[path.extname(f)]||'application/octet-stream');res.end(await readFile(f));}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const out=path.join(root,'output/haven-current');await mkdir(out,{recursive:true});
const results=[];
try{
for(const width of [1440,1280,1160,1159,1024,900,768,767,680,679,390,320,1920]){
const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
await page.goto(`http://127.0.0.1:${server.address().port}/site/haven/`,{waitUntil:'networkidle'});await page.evaluate(async()=>{await document.fonts.ready;for(const i of document.images)i.loading='eager';await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});
const info=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,images:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),sections:[...document.querySelectorAll('main>section,.after-bridge>section')].map(s=>({class:s.className,y:s.getBoundingClientRect().top+scrollY,h:s.offsetHeight})),nav:getComputedStyle(document.querySelector('.site-nav')).backgroundColor,overflow:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+2||r.left< -2)&&getComputedStyle(e).position!=='absolute'&&!e.closest('.stage-wrap')&&!e.closest('.footer-content')&&!e.closest('.flow')&&!e.closest('.quiz__stage');}).map(e=>e.className).slice(0,20)}));

if(true){await page.screenshot({path:path.join(out,`page-${width}.png`),fullPage:true});if([1440,767,390].includes(width))for(const section of ['hero','data','profile','ending','case-footer'])await page.locator('.'+section).screenshot({path:path.join(out,section+'-'+width+'.png')});}
const cards=page.locator('.end-card');await cards.nth(2).focus();await page.keyboard.press('ArrowRight');const keyboard=await cards.nth(3).getAttribute('aria-expanded');await page.keyboard.press('Escape');
results.push({width,...info,errors,keyboard});console.log(JSON.stringify({width,scroll:info.scroll,images:info.images,errors,keyboard,overflow:info.overflow}));await page.close();
}
await writeFile(path.join(out,'geometry.json'),JSON.stringify(results,null,2));
if(results.some(r=>r.scroll>r.width||r.errors.length||r.images.length||r.keyboard!=='true'))process.exitCode=1;else console.log('HAVEN_BROWSER_GEOMETRY_PASS');
}finally{await browser.close();server.close();}
