import path from 'node:path';
import {pathToFileURL} from 'node:url';
const {chromium}=await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE || path.join(process.env.HOME,'.npm/_npx/31e32ef8478fbf80/node_modules/playwright-core/index.mjs')));
const preview=process.env.HAVEN_URL || 'http://127.0.0.1:8184/haven/';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({channel:'chrome',headless:true,args:['--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[];
async function open(width=1440,opts={}){const p=await browser.newPage({viewport:{width,height:900},...opts});await p.goto(preview,{waitUntil:'networkidle'});await p.evaluate(async()=>{await document.fonts.ready;document.querySelectorAll('img').forEach(i=>i.loading='eager');await Promise.all([...document.images].map(i=>i.decode().catch(()=>{})));});return p;}
async function settle(p){await p.waitForTimeout(120);}
try{
for(const width of [1440,1024,768,390]){
const page=await open(width);const errors=[];page.on('pageerror',e=>errors.push(e.message));
assert.equal(await page.evaluate(()=>!!window.__haven.lenis),true,'One smooth scroll controller exists');
await page.evaluate(()=>{window.__haven.lenis.destroy();document.querySelector('#chat-rotate').scrollIntoView()});
await page.waitForFunction(()=>!!window.__chat);
const samples=[];
for(const offset of [0,450,900,1000]){await page.evaluate(offset=>{const section=document.querySelector('#chat-rotate');scrollTo(0,+section.dataset.meet+offset);window.__chat.draw()},offset);await settle(page);samples.push(await page.evaluate(()=>{const s=document.querySelector('#chat-rotate'),r=document.querySelector('.cr-phone canvas').getBoundingClientRect(),p=document.querySelector('.cr-para').getBoundingClientRect();return {center:r.top+r.height/2,para:p.top,hold:+s.dataset.hold,turn:+s.dataset.turn,nav:document.querySelector('.site-nav').getBoundingClientRect().top}}));if(offset===450)await page.screenshot({path:`output/haven-current/hold-${width}.png`});}
assert(samples.every(s=>s.turn===1));assert(Math.abs(samples[0].center-samples[1].center)<1);assert(Math.abs(samples[0].para-samples[1].para)<1);assert(Math.abs(samples[2].hold-900)<1);assert(Math.abs(samples[2].center-samples[3].center-100)<1);assert(samples.every(s=>s.nav===0));
const cards=page.locator('.end-card');await cards.nth(0).focus();assert.equal(await cards.nth(0).getAttribute('aria-expanded'),'true');await page.keyboard.press('ArrowRight');assert.equal(await cards.nth(1).getAttribute('aria-expanded'),'true');await page.keyboard.press('Escape');assert.equal(await page.locator('.end-card.is-active').count(),0);
if(width===1440){await page.locator('.end-card').nth(4).locator('.end-bg').hover();await page.waitForTimeout(700);assert.equal(await cards.nth(4).getAttribute('aria-expanded'),'true');const b=await cards.nth(4).locator('.end-bg').boundingBox();assert(b.x>=0&&b.x+b.width<=1441);await page.screenshot({path:'output/haven-current/finale-hover-1440.png'});}
assert.deepEqual(errors,[]);results.push({width,chat:samples,keyboard:true,errors});await page.close();
}
const touch=await open(390,{hasTouch:true,isMobile:true,reducedMotion:'reduce'});const c=touch.locator('.end-card').nth(2);await c.locator('.end-bg').tap();assert.equal(await c.getAttribute('aria-expanded'),'true');await touch.screenshot({path:'output/haven-current/finale-touch-390.png'});await touch.locator('.ending__title').tap();assert.equal(await c.getAttribute('aria-expanded'),'false');assert.equal(await touch.locator('.cr-phone canvas').count(),0);assert.equal(await touch.evaluate(()=>window.__haven.lenis),null);results.push({touch:true,reducedMotion:true});await touch.close();
const nojs=await open(390,{javaScriptEnabled:false});assert(await nojs.locator('#haven-title').isVisible());assert(await nojs.locator('.cr-still').isVisible());assert(await nojs.locator('.end-card').nth(0).locator('img').isVisible());results.push({noJavaScript:true});await nojs.close();
const fallback=await browser.newPage({viewport:{width:390,height:900}});await fallback.route('**/chat-rotate.js',r=>r.fulfill({contentType:'text/javascript',body:'throw new Error("controlled graphics module failure")'}));await fallback.goto(preview);await fallback.locator('#chat-rotate').scrollIntoViewIfNeeded();await fallback.waitForFunction(()=>document.querySelector('#chat-rotate').dataset.fallback==='still');assert(await fallback.locator('.cr-still').isVisible());results.push({graphicsFallback:true});await fallback.close();
await writeFile('output/haven-current/interactions.json',JSON.stringify(results,null,2));console.log('HAVEN_INTERACTIONS_PASS',JSON.stringify(results));
}finally{await browser.close();}
