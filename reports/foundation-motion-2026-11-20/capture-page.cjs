const { chromium } = require('playwright');
const out = process.argv[2];
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    for (const rm of [false, true]) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm ? 'reduce' : 'no-preference' });
      const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && errs.push(m.text()));
      await p.goto('http://localhost:4318/mondai/framework/', { waitUntil: 'networkidle' });
      const sel = '[data-figma-node="5812:16512"]';
      const top = await p.evaluate(s => document.querySelector(s).getBoundingClientRect().top + scrollY, sel);
      // walk down slowly, 30 px steps, until the layer appears
      let start = null; let y = top - h - 50;
      await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(400);
      for (let i = 0; i < 120 && !start; i++) {
        await p.mouse.wheel(0, 30); await p.waitForTimeout(50);
        start = await p.evaluate(s => { const l = document.querySelector('.mm-fd'); if (!l) return null; const r = document.querySelector(s).getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), vh: innerHeight }; }, sel);
        if (rm) break;
      }
      if (!rm && start) {
        await p.evaluate(() => document.getAnimations().forEach(a => a.pause()));
        for (const t of [0, 300, 700, 1200]) {
          await p.evaluate(t => { const as = document.querySelector('.mm-fd') ? [...document.querySelector('.mm-fd').children].flatMap(c => c.getAnimations()) : []; const d0 = Math.min(...as.map(a => a.effect.getTiming().delay)); as.forEach(a => a.currentTime = d0 + t); }, t);
          const r = await p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, sel);
          await p.screenshot({ path: `${out}/${w}-${t}.png`, clip: r });
        }
        // last frame of the layer against the image itself
        await p.evaluate(() => document.getAnimations().forEach(a => a.currentTime = 5000));
        const r = await p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, sel);
        await p.screenshot({ path: `${out}/${w}-layer-end.png`, clip: r });
        await p.evaluate(() => document.getAnimations().forEach(a => a.play()));
        await p.waitForTimeout(200);
        await p.waitForFunction(() => !document.querySelector('.mm-fd'), null, { timeout: 5000 });
        await p.screenshot({ path: `${out}/${w}-image.png`, clip: r });
      }
      const state = await p.evaluate(s => { const i = document.querySelector(s); return { done: i.dataset.mmDone || null, clip: getComputedStyle(i).clipPath, layer: !!document.querySelector('.mm-fd') }; }, sel);
      if (rm) { const r = await p.evaluate(s => { const e = document.querySelector(s); e.scrollIntoView({block:'center'}); const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, sel); await p.waitForTimeout(100); await p.screenshot({ path: `${out}/${w}-reduced.png`, clip: r }); }
      console.log(w, rm ? 'reduced' : 'motion', 'start', JSON.stringify(start), 'after', JSON.stringify(state), 'errors', errs.length, errs[0] || '');
      await ctx.close();
    }
  }
  await b.close();
})();
