const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [1280, 800], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    await p.goto('http://localhost:4318/mondai/framework/', { waitUntil: 'networkidle' });
    const sel = '[data-figma-node="5812:16512"]';
    const top = await p.evaluate(s => document.querySelector(s).getBoundingClientRect().top + scrollY, s = sel);
    await p.evaluate(y => { window.__mm.lenis && window.__mm.lenis.scrollTo(y, { immediate: true }); scrollTo(0, y); }, top - h * 0.3);
    await p.waitForSelector('.mm-fd', { state: 'attached' }); await p.evaluate(() => { window.__mm.lenis && window.__mm.lenis.stop(); document.getAnimations().forEach(a => { a.pause(); a.currentTime = 9000; }); });
    const r = await p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }, sel);
    await p.screenshot({ path: `${process.argv[2]}/al-${w}-layer.png`, clip: r });
    await p.evaluate(s => { document.querySelector('.mm-fd').style.visibility = 'hidden'; document.querySelector(s).style.clipPath = 'none'; }, sel);
    await p.screenshot({ path: `${process.argv[2]}/al-${w}-img.png`, clip: r });
    await p.close();
  }
  await b.close();
})();
