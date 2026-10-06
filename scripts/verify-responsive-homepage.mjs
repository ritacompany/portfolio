import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const playwrightCli = "/Users/chadwickfenner/.codex/skills/playwright/scripts/playwright_cli.sh";
const mode = process.argv[2];
let server;
let siteUrl;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function sourceFiles() {
  const [html, css, js, spec, next, workflow, audit, textInventory, fullAudit] = await Promise.all([
    readFile(path.join(root, "site", "index.html"), "utf8"),
    readFile(path.join(root, "site", "styles.css"), "utf8"),
    readFile(path.join(root, "site", "homepage.js"), "utf8"),
    readFile(path.join(root, "docs", "HOMEPAGE_RESPONSIVE_SPEC.md"), "utf8"),
    readFile(path.join(root, "NEXT.md"), "utf8"),
    readFile(path.join(root, "docs", "FRONTEND_WORKFLOW.md"), "utf8"),
    readFile(path.join(root, "docs", "FIGMA_IMPLEMENTATION_AUDIT.md"), "utf8"),
    readFile(path.join(root, "docs", "FIGMA_TEXT_STYLE_INVENTORY.md"), "utf8"),
    readFile(path.join(root, "docs", "FULL_STYLE_AUDIT_2026-09-19.md"), "utf8")
  ]);
  return { html, css, js, spec, next, workflow, audit, textInventory, fullAudit };
}

function runCli(args, timeout = 90000) {
  return new Promise((resolve, reject) => {
    const child = spawn(playwrightCli, args, {
      cwd: root,
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let output = "";
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      reject(new Error(`Playwright timed out: ${args.join(" ")}`));
    }, timeout);

    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(output);
      else reject(new Error(`Playwright exited ${code}: ${output.slice(-3000)}`));
    });
  });
}

async function ensureServer() {
  if (siteUrl) return siteUrl;
  const contentTypes = {
    ".css": "text/css",
    ".html": "text/html",
    ".js": "text/javascript",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".ttf": "font/ttf",
    ".woff2": "font/woff2"
  };
  server = createServer(async (request, response) => {
    try {
      const requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const relativePath = requestPath === "/" ? "site/index.html" : requestPath.replace(/^\//, "");
      const filePath = path.resolve(root, relativePath);
      if (!filePath.startsWith(`${root}${path.sep}`)) throw new Error("invalid path");
      const body = await readFile(filePath);
      response.writeHead(200, { "content-type": contentTypes[path.extname(filePath)] || "application/octet-stream" });
      response.end(body);
    } catch {
      response.writeHead(404);
      response.end("Not found");
    }
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  siteUrl = `http://127.0.0.1:${address.port}/site/index.html`;
  return siteUrl;
}

async function withBrowser(checkCode, browser = "chrome") {
  await ensureServer();
  const session = `responsive-${mode}-${browser}-${process.pid}`;
  try {
    await runCli([`-s=${session}`, "open", siteUrl, "--browser", browser]);
    return await runCli([`-s=${session}`, "run-code", `async (page) => {${checkCode}}`]);
  } finally {
    await runCli([`-s=${session}`, "close"], 30000).catch(() => {});
  }
}

const browserPrelude = `
const fail = (message) => { throw new Error(message); };
const check = (condition, message) => { if (!condition) fail(message); };
const ready = async () => {
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts.ready);
};
const resize = async (width, height) => {
  await page.setViewportSize({ width, height });
  await page.reload();
  await ready();
  await page.evaluate(() => scrollTo(0, 0));
};
`;

async function verifyStructure() {
  const { html, css, js } = await sourceFiles();
  assert(html.includes('href="styles.css?v='), "canonical stylesheet is not active");
  assert(html.includes('src="homepage.js?v='), "canonical script is not active");
  assert(!html.includes("homepage-wide-study.css"), "wide study stylesheet remains canonical");
  for (const marker of [
    'id="home"',
    'aria-label="Selected work"',
    'id="mondai-index"',
    'id="about"',
    'id="contact"',
    'class="menu-trigger"',
    'id="mobile-menu"'
  ]) assert(html.includes(marker), `missing canonical marker: ${marker}`);
  assert((html.match(/<main\b/g) || []).length === 1, "homepage must have one main landmark");
  assert((html.match(/<link rel="stylesheet"/g) || []).length === 1, "homepage must load one stylesheet");
  assert(css.includes("@media (max-width: 1159px)"), "compact boundary missing");
  assert(css.includes("@media (max-width: 679px)"), "mobile boundary missing");
  assert(js.includes("function openMenu()"), "menu behavior missing");
  assert(js.includes("setPageInert(true)"), "background inert behavior missing");
  console.log("G1 OK canonical responsive structure");
}

async function verifyWide() {
  const code = `${browserPrelude}
for (const [width, height] of [[1440, 900], [1920, 1000], [2048, 1000]]) {
  await resize(width, height);
  const values = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    return {
      canvas: rect('.wide-homepage'),
      hero: rect('.wide-hero'),
      card: rect('.wide-project-mondai .wide-card-link'),
      image: rect('.wide-project-mondai .wide-project-image'),
      heroSize: parseFloat(getComputedStyle(document.querySelector('.wide-hero h1')).fontSize),
      mondaiSize: parseFloat(getComputedStyle(document.querySelector('.wide-mondai-title')).fontSize),
      quoteSize: parseFloat(getComputedStyle(document.querySelector('.wide-quote')).fontSize),
      navVisible: getComputedStyle(document.querySelector('.wide-navigation')).display !== 'none'
    };
  });
  const expectedCanvas = Math.min(width, 1920);
  check(Math.abs(values.canvas.width - expectedCanvas) < 1, width + ': canvas width');
  check(Math.abs(values.canvas.left - Math.max(0, (width - 1920) / 2)) < 1, width + ': centered canvas');
  check(Math.abs(values.hero.height - height) < 1, width + ': visible hero height');
  check(values.navVisible, width + ': desktop navigation hidden');
  check(Math.abs(values.quoteSize - 64) < 0.5, width + ': quote size changed');
  if (width === 1440) {
    check(Math.abs(values.card.width - 1124) < 1, '1440: card width regression');
    check(Math.abs(values.image.height - 464) < 1, '1440: media height regression');
    check(Math.abs(values.heroSize - 302) < 0.5, '1440: hero display size regression');
    check(Math.abs(values.mondaiSize - 212) < 0.5, '1440: Mondai size regression');
  }
  if (width >= 1920) {
    check(Math.abs(values.heroSize - 402.6667) < 0.7, width + ': hero ceiling regression');
  }
}
return 'wide baseline verified';`;
  await withBrowser(code);
  console.log("G2 OK wide baseline");
}

async function verifySweep() {
  const code = `${browserPrelude}
const errors = [];
page.on('console', (message) => {
  if (message.type() === 'error') errors.push(message.text());
});
page.on('pageerror', (error) => errors.push(error.message));
const widths = [320, 360, 390, 430, 640, 679, 680, 834, 1024, 1159, 1160, 1199, 1440, 1920, 2048];
for (const width of widths) {
  await resize(width, width < 680 ? 844 : 900);
  const result = await page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
    };
    const textSelectors = 'p, h3, .wide-project-title, .wide-label-text, .wide-project-view, .wide-case-number, .wide-case-title, .wide-overview-label';
    const outOfBounds = [...document.querySelectorAll(textSelectors)]
      .filter(visible)
      .filter((element) => {
        if (element.matches('.wide-quote-last')) return false;
        const rect = element.getBoundingClientRect();
        const visualRight = rect.left + Math.max(rect.width, element.scrollWidth);
        return rect.left < -1 || visualRight > innerWidth + 1;
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return (element.className || element.tagName) + '[' + rect.left.toFixed(1) + ',' + rect.right.toFixed(1) + ';' + element.clientWidth + '/' + element.scrollWidth + ']';
      });
    const imageRatios = [...document.querySelectorAll('.wide-project-image')].map((image) => {
      const rect = image.getBoundingClientRect();
      return rect.width / rect.height;
    });
    const sectionTops = [...document.querySelectorAll('main > section, main > footer')].map((section) => section.getBoundingClientRect().top + scrollY);
    return {
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
      outOfBounds,
      imageRatios,
      imagesLoaded: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
      ordered: sectionTops.every((top, index) => index === 0 || top >= sectionTops[index - 1])
    };
  });
  check(result.overflow <= 1, width + ': horizontal overflow ' + result.overflow);
  check(result.outOfBounds.length === 0, width + ': clipped supporting text ' + result.outOfBounds.join(','));
  check(result.imagesLoaded, width + ': image failed to load');
  check(result.ordered, width + ': section order overlaps');
  const expectedRatio = width < 680 ? 4 / 3 : width < 1160 ? 16 / 9 : 281 / 116;
  result.imageRatios.forEach((ratio) => check(Math.abs(ratio - expectedRatio) < 0.02, width + ': distorted media'));
}
check(errors.length === 0, 'browser errors: ' + errors.join(' | '));
return 'responsive sweep verified';`;
  await withBrowser(code);
  console.log("G3 OK responsive sweep");
}

async function verifySections() {
  const code = `${browserPrelude}
for (const [width, height] of [[320, 844], [430, 932], [768, 1024], [1024, 768], [1440, 900], [2048, 1000]]) {
  await resize(width, height);
  const result = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    const pageRect = rect('.wide-homepage');
    const cards = [...document.querySelectorAll('.wide-card-link')].map((card) => card.getBoundingClientRect());
    const rows = [...document.querySelectorAll('.wide-case-list a')].map((row) => row.getBoundingClientRect());
    const overview = [...document.querySelectorAll('.wide-overview-row')].map((row) => row.getBoundingClientRect());
    const portrait = rect('.wide-portrait');
    const footer = rect('.wide-footer-contact');
    return { pageRect, cards, rows, overview, portrait, footer };
  });
  result.cards.forEach((card) => {
    check(card.left >= result.pageRect.left - 1, width + ': card exits canvas');
    check(card.right <= result.pageRect.right + 1, width + ': card exits canvas');
  });
  result.rows.forEach((row) => check(row.height >= 44, width + ': case row target too short'));
  result.overview.forEach((row) => check(row.height > 0, width + ': overview row collapsed'));
  check(Math.abs(result.portrait.width / result.portrait.height - 258 / 344) < 0.02, width + ': portrait ratio changed');
  check(result.footer.height >= 300, width + ': footer contact field collapsed');
}
return 'section geometry verified';`;
  await withBrowser(code);
  console.log("G4 OK section geometry");
}

async function verifySticky() {
  const code = `${browserPrelude}
await resize(1440, 900);
const before = await page.evaluate(() => ({
  logoTop: document.querySelector('.wide-logo').getBoundingClientRect().top,
  navTop: document.querySelector('.wide-navigation').getBoundingClientRect().top,
  copyTop: document.querySelector('.wide-hero-copy').getBoundingClientRect().top
}));
await page.evaluate(() => scrollTo(0, 600));
await page.waitForTimeout(50);
const after = await page.evaluate(() => ({
  logoTop: document.querySelector('.wide-logo').getBoundingClientRect().top,
  navTop: document.querySelector('.wide-navigation').getBoundingClientRect().top,
  copyTop: document.querySelector('.wide-hero-copy').getBoundingClientRect().top
}));
check(Math.abs(before.logoTop - 32) < 1, 'desktop logo top inset changed');
check(Math.abs(after.logoTop - before.logoTop) < 1, 'desktop logo did not remain sticky');
check(Math.abs(after.navTop - before.navTop) < 1, 'desktop navigation did not remain sticky');
check(after.copyTop < before.copyTop - 500, 'hero copy incorrectly became sticky');
return 'sticky header verified';`;
  for (const browser of ["chrome", "firefox", "webkit"]) await withBrowser(code, browser);
  console.log("G1 OK sticky header");
}

async function verifyHeroTransition() {
  const code = `${browserPrelude}
for (const width of [1160, 1440, 1920]) {
  await resize(width, 900);
  const gap = await page.evaluate(() => {
    const hero = document.querySelector('.wide-hero').getBoundingClientRect();
    const work = document.querySelector('.wide-work').getBoundingClientRect();
    return work.top - hero.bottom;
  });
  check(Math.abs(gap - 518) < 1, width + ': desktop hero-to-work gap is ' + gap);
}
for (const width of [680, 768, 1024, 1159]) {
  await resize(width, 900);
  const result = await page.evaluate(() => {
    const pageRect = document.querySelector('.wide-homepage').getBoundingClientRect();
    const titleRect = document.querySelector('.wide-hero h1').getBoundingClientRect();
    return { pageLeft: pageRect.left, titleLeft: titleRect.left };
  });
  const expected = result.pageLeft - width * 0.03263889;
  check(Math.abs(result.titleLeft - expected) < 1, width + ': CHADWICK edge bleed changed');
}
return 'hero transition verified';`;
  await withBrowser(code);
  console.log("G2 OK hero transition");
}

async function verifyTabletHero() {
  const code = `${browserPrelude}
for (const [width, height] of [[680, 900], [768, 1024], [844, 390], [1024, 768], [1159, 900]]) {
  await resize(width, height);
  const before = await page.evaluate(() => ({
    logoTop: document.querySelector('.wide-logo').getBoundingClientRect().top,
    bioTop: document.querySelector('.wide-bio').getBoundingClientRect().top,
    relocationTop: document.querySelector('.wide-relocation').getBoundingClientRect().top
  }));
  check(Math.abs(before.bioTop - before.logoTop) < 1, width + ': biography is not aligned to the header');
  check(Math.abs(before.relocationTop - before.logoTop) < 1, width + ': relocation note is not aligned to the header');
  await page.evaluate(() => scrollTo(0, 300));
  await page.waitForTimeout(30);
  const after = await page.evaluate(() => ({
    logoTop: document.querySelector('.wide-logo').getBoundingClientRect().top,
    bioTop: document.querySelector('.wide-bio').getBoundingClientRect().top
  }));
  check(Math.abs(after.logoTop - before.logoTop) < 1, width + ': compact logo did not remain sticky');
  check(after.bioTop < before.bioTop - 250, width + ': compact biography did not scroll with hero');
}
return 'tablet hero verified';`;
  await withBrowser(code);
  console.log("G3 OK tablet hero");
}

async function verifyQuote() {
  const code = `${browserPrelude}
const renderedLines = () => page.evaluate(() => {
  const root = document.querySelector('.wide-quote');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const words = [];
  let node;
  while ((node = walker.nextNode())) {
    const value = node.nodeValue;
    for (const match of value.matchAll(/\\S+/g)) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      const rect = range.getBoundingClientRect();
      if (rect.width > 0) words.push({ word: match[0], top: Math.round(rect.top * 2) / 2 });
    }
  }
  const lines = [];
  for (const item of words) {
    let line = lines.find((candidate) => Math.abs(candidate.top - item.top) <= 1);
    if (!line) {
      line = { top: item.top, words: [] };
      lines.push(line);
    }
    line.words.push(item.word);
  }
  const bolt = root.querySelector('img').getBoundingClientRect();
  const boltMidpoint = bolt.top + bolt.height / 2;
  const boltLine = lines.find((line, index) => {
    const nextTop = lines[index + 1]?.top ?? Infinity;
    return boltMidpoint >= line.top && boltMidpoint < nextTop;
  });
  if (boltLine) boltLine.words.push('[bolt]');
  lines.sort((a, b) => a.top - b.top);
  return lines;
});
for (const [width, height] of [[320, 844], [390, 844], [430, 932], [679, 900], [680, 900], [768, 1024], [1024, 768], [1159, 900], [1160, 900], [1440, 900], [1920, 1080]]) {
  await resize(width, height);
  const lines = await renderedLines();
  check(lines.length >= 2, width + ': quote collapsed unexpectedly');
  check(lines.every((line) => line.words.length >= 2), width + ': one-word quote line ' + JSON.stringify(lines));
  const deltas = lines.slice(1).map((line, index) => line.top - lines[index].top);
  check(Math.max(...deltas) - Math.min(...deltas) <= 2, width + ': inconsistent quote rhythm ' + deltas.join(','));
}
return 'quote flow verified';`;
  await withBrowser(code);
  console.log("G4 OK quote flow");
}

async function verifyMondaiHeader() {
  const code = `${browserPrelude}
for (const width of [320, 360, 390, 430, 679]) {
  await resize(width, 900);
  const result = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    return {
      title: rect('.wide-mondai-title'),
      label: rect('.wide-mondai-label'),
      description: rect('.wide-mondai-description')
    };
  });
  check(result.label.left >= result.title.right - 1, width + ': collection label does not remain beside Mondai');
  check(result.label.top < result.title.bottom && result.label.bottom > result.title.top, width + ': collection label left the title row');
  check(result.description.top >= Math.max(result.title.bottom, result.label.bottom) + 20, width + ': Mondai description is not below the title row');
}
return 'Mondai header verified';`;
  await withBrowser(code);
  console.log("G5 OK Mondai header");
}

async function verifyCardHover() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1024, 1159, 1200, 1440, 1920]) {
  await resize(width, 900);
  const card = page.locator('.wide-project-mondai .wide-card-link');
  await card.hover();
  const decoration = await page.evaluate(() => getComputedStyle(document.querySelector('.wide-project-mondai .wide-project-title')).textDecorationLine);
  check(decoration === 'none', width + ': project title gained an underline');
}
return 'card hover verified';`;
  await withBrowser(code);
  console.log("G6 OK card hover");
}

async function verifyMenu() {
  const code = `${browserPrelude}
await resize(430, 932);
const trigger = page.locator('.menu-trigger');
await trigger.click();
check(await page.locator('#mobile-menu').isVisible(), 'menu did not open');
check(await trigger.getAttribute('aria-expanded') === 'true', 'expanded state missing');
check(await page.evaluate(() => document.body.classList.contains('menu-open')), 'scroll lock missing');
check(await page.evaluate(() => document.activeElement === document.querySelector('.menu-close')), 'close control did not receive focus');
check(await page.evaluate(() => [...document.querySelectorAll('main > section, main > footer')].every((element) => element.inert)), 'page did not become inert');
await page.locator('#mobile-menu a').last().focus();
await page.keyboard.press('Tab');
check(await page.evaluate(() => document.activeElement === document.querySelector('.menu-close')), 'forward focus trap failed');
await page.keyboard.press('Escape');
check(await page.locator('#mobile-menu').isHidden(), 'Escape did not close menu');
check(await trigger.getAttribute('aria-expanded') === 'false', 'collapsed state missing');
check(await page.evaluate(() => document.activeElement === document.querySelector('.menu-trigger')), 'focus did not return to trigger');
await trigger.click();
await page.getByRole('link', { name: 'ABOUT', exact: true }).click();
check(await page.locator('#mobile-menu').isHidden(), 'menu link did not dismiss overlay');
check((await page.evaluate(() => location.hash)) === '#about', 'menu link did not navigate');
return 'menu verified';`;
  await withBrowser(code);
  console.log("G5 OK menu behavior");
}

async function verifyInteraction() {
  const code = `${browserPrelude}
for (const [width, height] of [[430, 932], [768, 1024], [1440, 900]]) {
  await resize(width, height);
  const targets = await page.evaluate(() => [...document.querySelectorAll('a, button')]
    .filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && !element.closest('[hidden]');
    })
    .map((element) => {
      const rect = element.getBoundingClientRect();
      return { label: element.getAttribute('aria-label') || element.textContent.trim(), width: rect.width, height: rect.height };
    }));
  targets.forEach((target) => {
    check(target.width >= 44, width + ': narrow target ' + target.label);
    check(target.height >= 44, width + ': short target ' + target.label);
  });
  const first = width < 1160 ? page.getByRole('button', { name: 'Open menu' }) : page.getByRole('link', { name: 'HOME', exact: true });
  await first.focus();
  const outline = await first.evaluate((element) => getComputedStyle(element).outlineStyle);
  check(outline !== 'none', width + ': visible focus missing');
  await page.reload();
  await ready();
  await page.keyboard.press('Tab');
  check(await page.evaluate(() => document.activeElement.classList.contains('skip-link')), width + ': skip link is not first');
  await page.keyboard.press('Tab');
  check(await first.evaluate((element) => document.activeElement === element), width + ': primary control is not second');
}
await resize(1440, 900);
const home = page.getByRole('link', { name: 'HOME', exact: true });
const defaultColor = await home.evaluate((element) => getComputedStyle(element).color);
await home.hover();
const hoverColor = await home.evaluate((element) => getComputedStyle(element).color);
await page.mouse.down();
const activeColor = await home.evaluate((element) => getComputedStyle(element).color);
await page.mouse.up();
check(defaultColor !== hoverColor, 'desktop hover state missing');
check(hoverColor !== activeColor, 'desktop pressed state missing');
return 'interaction access verified';`;
  await withBrowser(code);
  console.log("G6 OK interaction access");
}

async function verifyResilience() {
  const code = `${browserPrelude}
for (const [width, height] of [[1024, 768], [768, 1024], [844, 390], [430, 932], [390, 844]]) {
  await resize(width, height);
  const result = await page.evaluate(() => ({
    overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
    heroHeight: document.querySelector('.wide-hero').getBoundingClientRect().height,
    textClips: [...document.querySelectorAll('p, h3')].filter((element) => {
      const rect = element.getBoundingClientRect();
      const visualRight = rect.left + Math.max(rect.width, element.scrollWidth);
      return rect.left < -1 || visualRight > innerWidth + 1;
    }).length
  }));
  check(result.overflow <= 1, width + 'x' + height + ': overflow');
  check(result.heroHeight >= height || height <= 600, width + 'x' + height + ': hero fails viewport');
  check(result.textClips === 0, width + 'x' + height + ': text clipped');
}
const client = await page.context().newCDPSession(page);
await client.send('Emulation.setDeviceMetricsOverride', { width: 640, height: 450, deviceScaleFactor: 2, mobile: false });
await page.reload();
await ready();
const zoomResult = await page.evaluate(() => ({
  width: innerWidth,
  ratio: devicePixelRatio,
  overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth
}));
check(zoomResult.width === 640 && zoomResult.ratio === 2, '200 percent browser emulation did not apply');
check(zoomResult.overflow <= 1, '200 percent browser emulation overflow');
await client.send('Emulation.clearDeviceMetricsOverride');
await resize(390, 844);
await page.emulateMedia({ forcedColors: 'active', reducedMotion: 'reduce' });
const trigger = page.locator('.menu-trigger');
await trigger.focus();
check(await trigger.evaluate((element) => getComputedStyle(element).outlineStyle) !== 'none', 'forced colors focus indicator missing');
await page.evaluate(() => {
  const style = document.createElement('style');
  style.id = 'text-spacing-test';
  style.textContent = '* { line-height: 1.5 !important; letter-spacing: 0.12em !important; word-spacing: 0.16em !important; } p { margin-block-end: 2em !important; }';
  document.head.append(style);
});
const spacingOverflow = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth);
check(spacingOverflow <= 1, 'text spacing override caused overflow');
await page.evaluate(() => document.querySelector('#text-spacing-test').remove());
await page.emulateMedia({ forcedColors: 'none', reducedMotion: 'no-preference' });
await page.route('**/*.woff2', (route) => route.abort());
await page.reload();
const fallbackOverflow = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth);
check(fallbackOverflow <= 1, 'web font failure caused overflow');
await page.unroute('**/*.woff2');
return 'resilience verified';`;
  await withBrowser(code);
  console.log("G7 OK zoom and orientation");
}

async function verifyBrowsers() {
  const code = `${browserPrelude}
await resize(390, 844);
check(await page.title() === 'Chadwick Fenner, Product Designer', 'wrong document loaded');
check(await page.locator('.wide-hero').isVisible(), 'hero missing');
check(await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) <= innerWidth + 1), 'browser overflow');
return 'browser smoke verified';`;
  const outcomes = [];
  for (const browser of ["chrome", "firefox", "webkit"]) {
    try {
      await withBrowser(code, browser);
      outcomes.push(`${browser}:verified`);
    } catch (error) {
      const message = String(error);
      if (/executable.*missing|not installed|install-browser/i.test(message)) {
        outcomes.push(`${browser}:unavailable`);
      } else {
        throw error;
      }
    }
  }
  assert(outcomes.includes("chrome:verified"), "Chrome smoke pass is required");
  console.log(`G9 OK browser smoke (${outcomes.join(", ")})`);
}

async function verifyRecords() {
  const { spec, next } = await sourceFiles();
  assert(spec.includes("Status: verified responsive implementation"), "responsive status not verified");
  assert(spec.includes("1160 pixels"), "compact boundary not recorded");
  assert(spec.includes("680 pixels"), "mobile boundary not recorded");
  assert(spec.includes("Verification evidence, 16 Sep 2026"), "verification evidence not recorded");
  assert(!next.includes("Start one end-to-end implementation task"), "NEXT still points to completed responsive task");
  console.log("G10 OK project records");
}

async function verifyCorrections() {
  await verifyStructure();
  await verifySticky();
  await verifyHeroTransition();
  await verifyTabletHero();
  await verifyQuote();
  await verifyMondaiHeader();
  await verifyCardHover();
  await verifyWide();
  await verifySweep();
  await verifySections();
  await verifyMenu();
  await verifyInteraction();
  await verifyResilience();
  await verifyBrowsers();
  console.log("G7 OK correction regression suite");
}

async function captureCorrections() {
  const code = `${browserPrelude}
const viewports = [
  ['320x844', 320, 844],
  ['430x932', 430, 932],
  ['679x900', 679, 900],
  ['680x900', 680, 900],
  ['768x1024', 768, 1024],
  ['1024x768', 1024, 768],
  ['1159x900', 1159, 900],
  ['1160x900', 1160, 900],
  ['1440x900', 1440, 900],
  ['1920x1080', 1920, 1080]
];
for (const [name, width, height] of viewports) {
  await resize(width, height);
  await page.screenshot({ path: 'output/playwright/corrections/homepage-' + name + '.png', fullPage: true, scale: 'css' });
}
await resize(1440, 900);
await page.evaluate(() => scrollTo(0, 760));
await page.waitForTimeout(50);
await page.screenshot({ path: 'output/playwright/corrections/sticky-desktop-1440.png', fullPage: false, scale: 'css' });
return 'correction screenshots captured';`;
  await withBrowser(code);
  console.log("Correction screenshots captured");
}

async function captureScreenshots() {
  const code = `${browserPrelude}
const viewports = [
  ['320x844', 320, 844],
  ['360x800', 360, 800],
  ['390x844', 390, 844],
  ['430x932', 430, 932],
  ['679x900', 679, 900],
  ['680x900', 680, 900],
  ['681x900', 681, 900],
  ['768x1024', 768, 1024],
  ['834x1112', 834, 1112],
  ['844x390', 844, 390],
  ['1024x768', 1024, 768],
  ['1159x900', 1159, 900],
  ['1160x900', 1160, 900],
  ['1161x900', 1161, 900],
  ['1440x900', 1440, 900],
  ['1920x1080', 1920, 1080],
  ['2048x1080', 2048, 1080]
];
for (const [name, width, height] of viewports) {
  await resize(width, height);
  await page.screenshot({ path: 'output/playwright/final/homepage-' + name + '.png', fullPage: true, scale: 'css' });
}
await resize(430, 932);
await page.locator('.menu-trigger').click();
await page.screenshot({ path: 'output/playwright/final/menu-430x932.png', fullPage: false, scale: 'css' });
return 'screenshots captured';`;
  await withBrowser(code);
  console.log("Responsive screenshots captured");
}

async function verifyMasterVc() {
  const code = `${browserPrelude}
await resize(1440, 900);
const value = await page.evaluate(() => {
  const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
  const absolute = (selector) => {
    const box = rect(selector);
    return { top: box.top + scrollY, left: box.left, right: box.right, width: box.width, height: box.height };
  };
  const hero = absolute('.wide-hero');
  const work = absolute('.wide-work');
  const about = absolute('.wide-about');
  const opening = absolute('.wide-about-opening');
  const mondaiCard = absolute('.wide-project-mondai .wide-project-image');
  const havenCard = absolute('.wide-project-haven .wide-project-image');
  const superpowers = absolute('.wide-superpowers-heading-frame');
  const mondai = absolute('.wide-mondai');
  const powers = absolute('.wide-power-list');
  const overview = absolute('.wide-overview');
  const footer = absolute('.wide-footer');
  return {
    hero, work, about, opening, mondaiCard, havenCard, superpowers, mondai, powers, overview, footer,
    canvas: absolute('.wide-homepage'),
    heroSize: parseFloat(getComputedStyle(document.querySelector('.wide-hero h1')).fontSize),
    quoteSize: parseFloat(getComputedStyle(document.querySelector('.wide-quote')).fontSize),
    superSize: parseFloat(getComputedStyle(document.querySelector('.wide-superpowers-heading-frame h2')).fontSize),
    mondaiSize: parseFloat(getComputedStyle(document.querySelector('.wide-mondai-title')).fontSize),
    order: [...document.querySelectorAll('.wide-superpowers > *')].map((node) => node.className)
  };
});
const near = (actual, expected, tolerance, label) => check(Math.abs(actual - expected) <= tolerance, label + ': ' + actual);
near(value.canvas.width, 1440, 1, 'canvas width');
near(value.canvas.height, 7270, 3, 'canvas height');
near(value.hero.height, 800, 1, 'hero height');
near(value.work.top - value.hero.top - value.hero.height, 169, 1, 'hero to work gap');
near(value.work.height, 864, 1, 'work height');
near(value.mondaiCard.width, 895, 2, 'Mondai card width');
near(value.mondaiCard.height, 590, 1, 'Mondai card height');
near(value.havenCard.width, 426, 2, 'Haven card width');
near(value.havenCard.height, 426, 2, 'Haven card height');
near(value.about.top - value.work.top - value.work.height, 11, 1, 'work to About gap');
near(value.opening.height, 683, 1, 'About opening height');
near(value.superpowers.height, 245, 1, 'Superpowers heading frame');
near(value.mondai.height, 882, 2, 'Mondai section height');
near(value.powers.height, 809, 1, 'superpower statements height');
near(value.overview.height, 1100, 2, 'overview height');
near(value.footer.height, 1041, 1, 'footer height');
near(value.heroSize, 302, 1, 'CHADWICK size');
near(value.quoteSize, 64, 1, 'quote size');
near(value.superSize, 248, 1, 'Superpowers size');
near(value.mondaiSize, 212, 1, 'Mondai size');
check(value.order[0].includes('wide-superpowers-heading-frame'), 'Superpowers heading order');
check(value.order[1].includes('wide-mondai'), 'Mondai order');
check(value.order[2].includes('wide-power-list'), 'statement order');
check(value.order[3].includes('wide-overview'), 'overview order');
return 'VC Master geometry verified';`;
  await withBrowser(code);
  console.log("G1 OK VC Master geometry");
}

async function verifyAssetsVc() {
  const { html } = await sourceFiles();
  assert(html.includes('assets/mondai-card-vc.png'), "Mondai VC export is not referenced");
  assert(html.includes('assets/haven-card-vc.png'), "Haven VC export is not referenced");
  const code = `${browserPrelude}
await resize(1440, 900);
const images = await page.evaluate(() => [...document.querySelectorAll('.wide-project-image')].map((image) => {
  const box = image.getBoundingClientRect();
  return { src: image.getAttribute('src'), naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, width: box.width, height: box.height };
}));
check(images.length === 2, 'wrong number of project images');
  check(images[0].naturalWidth === 895 && images[0].naturalHeight === 590, 'Mondai export dimensions');
  check(images[1].naturalWidth === 426 && images[1].naturalHeight === 426, 'Haven export dimensions');
  check(Math.abs(images[0].width - 895) <= 2 && Math.abs(images[0].height - 590) <= 2, 'Mondai rendered dimensions');
check(Math.abs(images[1].width - 426) <= 2 && Math.abs(images[1].height - 426) <= 2, 'Haven rendered dimensions');
return 'updated card assets verified';`;
  await withBrowser(code);
  console.log("G1 OK current work assets");
}

async function verifyWorkMaster() {
  const code = `${browserPrelude}
await resize(1440, 900);
const value = await page.evaluate(() => {
  const absolute = (selector) => {
    const box = document.querySelector(selector).getBoundingClientRect();
    return { top: box.top + scrollY, left: box.left, right: box.right, bottom: box.bottom + scrollY, width: box.width, height: box.height };
  };
  const title = document.querySelector('.wide-project-mondai .wide-project-title');
  const label = document.querySelector('.wide-project-label');
  const description = document.querySelector('.wide-project-mondai .wide-project-description');
  const havenDescription = document.querySelector('.wide-project-haven .wide-project-description');
  return {
    work: absolute('.wide-work'),
    grid: absolute('.wide-work-grid'),
    mondaiCard: absolute('.wide-project-mondai'),
    mondaiLink: absolute('.wide-project-mondai .wide-card-link'),
    mondaiImage: absolute('.wide-project-mondai .wide-project-image'),
    mondaiMetaFrame: absolute('.wide-project-mondai .wide-project-meta-frame'),
    mondaiMeta: absolute('.wide-project-mondai .wide-project-meta'),
    havenCard: absolute('.wide-project-haven'),
    havenLink: absolute('.wide-project-haven .wide-card-link'),
    havenImage: absolute('.wide-project-haven .wide-project-image'),
    havenMetaFrame: absolute('.wide-project-haven .wide-project-meta-frame'),
    havenMeta: absolute('.wide-project-haven .wide-project-meta'),
    titleSize: parseFloat(getComputedStyle(title).fontSize),
    labelSize: parseFloat(getComputedStyle(label).fontSize),
    labelColor: getComputedStyle(label).color,
    labelFamily: getComputedStyle(label).fontFamily,
    descriptionSize: parseFloat(getComputedStyle(description).fontSize),
    descriptionWeight: getComputedStyle(description).fontWeight,
    descriptionWidth: description.getBoundingClientRect().width,
    havenDescriptionWidth: havenDescription.getBoundingClientRect().width,
    descriptionColor: getComputedStyle(description).color,
    borderBottom: parseFloat(getComputedStyle(document.querySelector('.wide-work')).borderBottomWidth)
  };
});
const near = (actual, expected, tolerance, label) => check(Math.abs(actual - expected) <= tolerance, label + ': ' + actual);
near(value.work.top, 969, 1, 'work top');
near(value.work.height, 864, 1, 'work height');
near(value.grid.left, 40, 1, 'grid left');
near(value.grid.width, 1360, 1, 'grid width');
near(value.grid.height, 644, 1, 'grid height');
near(value.mondaiCard.width, 895, 1, 'Mondai width');
near(value.havenCard.width, 426, 1, 'Haven width');
near(value.havenCard.left - value.mondaiCard.right, 39, 1, 'card gap');
near(value.mondaiImage.height, 590, 1, 'Mondai media height');
near(value.havenImage.height, 426, 1, 'Haven media height');
near(value.mondaiMetaFrame.top - value.mondaiImage.bottom, 24, 1, 'Mondai metadata frame gap');
near(value.havenMetaFrame.top - value.havenImage.bottom, 24, 1, 'Haven metadata frame gap');
near(value.mondaiMetaFrame.height, 30, 1, 'Mondai metadata frame height');
near(value.havenMetaFrame.height, 30, 1, 'Haven metadata frame height');
near(value.havenLink.bottom, value.mondaiLink.bottom, 1, 'bottom alignment');
near(value.havenLink.top - value.mondaiLink.top, 164, 1, 'Haven vertical offset');
near(value.titleSize, 24, 0.1, 'Mondai Heading/24 size');
near(value.labelSize, 12, 0.1, 'collection label size');
near(value.descriptionSize, 14, 0.1, 'Mondai description size');
near(value.descriptionWidth, 332.098, 1, 'Mondai description measure');
near(value.havenDescriptionWidth, 333.594, 2, 'Haven available description measure');
check(value.labelColor === 'rgb(232, 231, 238)', 'collection label is not Neutral 100');
check(value.descriptionColor === 'rgb(222, 222, 229)', 'description is not Neutral 200');
check(value.labelFamily.includes('Space Mono'), 'collection label is not Metadata/12');
check(value.descriptionWeight === '500', 'description is not Satoshi Medium');
check(value.borderBottom === 0, 'obsolete work bottom border remains');
return 'current work geometry verified';`;
  await withBrowser(code);
  console.log("G2 OK current work geometry");
}

async function verifyWorkResponsive() {
  const code = `${browserPrelude}
const errors = [];
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', (error) => errors.push(error.message));
for (const width of [320, 360, 390, 430, 679, 680, 768, 834, 1024, 1159, 1160, 1199, 1200, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const box = (selector) => document.querySelector(selector).getBoundingClientRect();
    const mondaiCard = box('.wide-project-mondai');
    const havenCard = box('.wide-project-haven');
    const mondaiLink = box('.wide-project-mondai .wide-card-link');
    const havenLink = box('.wide-project-haven .wide-card-link');
    const mondaiImage = box('.wide-project-mondai .wide-project-image');
    const havenImage = box('.wide-project-haven .wide-project-image');
    const supporting = [...document.querySelectorAll('.wide-work .wide-project-title, .wide-work .wide-project-label, .wide-work .wide-project-description')].map((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, text: element.textContent.trim() };
    });
    const metadata = [...document.querySelectorAll('.wide-project-meta')].map((meta) => {
      const lead = meta.firstElementChild.getBoundingClientRect();
      const description = meta.querySelector('.wide-project-description');
      const support = description.getBoundingClientRect();
      const style = getComputedStyle(meta);
      return {
        meta: meta.getBoundingClientRect(),
        lead,
        support,
        direction: style.flexDirection,
        align: style.alignItems,
        textAlign: getComputedStyle(description).textAlign
      };
    });
    return {
      mondaiCard, havenCard, mondaiLink, havenLink, mondaiImage, havenImage, supporting, metadata,
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
      loaded: [...document.querySelectorAll('.wide-work img')].every((image) => image.complete && image.naturalWidth > 0)
    };
  });
  check(value.overflow <= 1, width + ': document overflow');
  check(value.loaded, width + ': work image did not load');
  check(Math.abs(value.mondaiImage.width / value.mondaiImage.height - 895 / 590) <= 0.01, width + ': Mondai media ratio ' + value.mondaiImage.width + '/' + value.mondaiImage.height);
  check(Math.abs(value.havenImage.width / value.havenImage.height - 1) <= 0.01, width + ': Haven media ratio ' + value.havenImage.width + '/' + value.havenImage.height);
  value.supporting.forEach((item) => {
    check(item.left >= -1 && item.right <= width + 1, width + ': clipped work copy ' + item.text);
    check(item.scrollWidth <= item.clientWidth + 1, width + ': overflowing work copy ' + item.clientWidth + '/' + item.scrollWidth + ' ' + item.text);
  });
  value.metadata.forEach((item, index) => {
    if (width < 1200) {
      check(item.direction === 'column', width + ': card ' + index + ' metadata did not stack');
      check(item.align === 'flex-start', width + ': card ' + index + ' metadata is centered');
      check(item.textAlign === 'left', width + ': card ' + index + ' support is not left aligned');
      check(Math.abs(item.lead.left - item.meta.left) <= 1, width + ': card ' + index + ' lead group moved off the left edge');
      check(Math.abs(item.support.left - item.meta.left) <= 1, width + ': card ' + index + ' support moved off the left edge');
      check(item.support.top >= item.lead.bottom + 13, width + ': card ' + index + ' stacked gap is too small');
    } else {
      check(item.direction === 'row', width + ': card ' + index + ' metadata stacked too early');
      check(item.support.left >= item.lead.right + 23, width + ': card ' + index + ' metadata groups are closer than 24 pixels');
    }
  });
  if (width < 680) {
    check(value.havenCard.top >= value.mondaiCard.bottom + 60, width + ': mobile cards did not stack');
  } else {
    check(value.mondaiCard.width > value.havenCard.width, width + ': asymmetry was lost');
    check(Math.abs(value.mondaiCard.width / value.havenCard.width - 895 / 426) <= 0.03, width + ': card ratio drift');
    check(Math.abs(value.mondaiLink.bottom - value.havenLink.bottom) <= 2, width + ': card bottoms do not align');
  }
}
check(errors.length === 0, 'browser errors: ' + errors.join(' | '));
return 'responsive work layout verified';`;
  await withBrowser(code);
  console.log("G3 OK responsive work layout");
}

async function captureWorkScreenshots() {
  const code = `${browserPrelude}
for (const [name, width, height] of [
  ['320', 320, 844],
  ['679', 679, 900],
  ['680', 680, 900],
  ['1199', 1199, 900],
  ['1200', 1200, 900],
  ['1440', 1440, 900]
]) {
  await resize(width, height);
  await page.locator('.wide-work').screenshot({ path: 'output/playwright/work-metadata/work-' + name + '.png' });
}
return 'work screenshots captured';`;
  await withBrowser(code);
  console.log("Work screenshots captured");
}

async function verifyWorkRecords() {
  const { spec, next } = await sourceFiles();
  assert(spec.includes("895 by 590"), "updated Mondai geometry is not recorded");
  assert(spec.includes("426 pixel square"), "updated Haven geometry is not recorded");
  assert(spec.includes("3623:6385"), "updated Figma work node is not recorded");
  assert(spec.includes("Metadata/12"), "work metadata token is not recorded");
  assert(spec.includes("1200 pixels"), "synchronized metadata breakpoint is not recorded");
  assert(next.includes("updated responsive work section"), "NEXT does not identify the updated work review");
  console.log("G7 OK work records");
}

async function verifyFooterFidelity() {
  const code = `${browserPrelude}
await resize(1440, 900);
const value = await page.evaluate(() => {
  const footer = document.querySelector('.wide-footer').getBoundingClientRect();
  const relative = (selector) => {
    const box = document.querySelector(selector).getBoundingClientRect();
    return { top: box.top - footer.top, right: box.right - footer.left, bottom: box.bottom - footer.top, left: box.left - footer.left, width: box.width, height: box.height };
  };
  const style = (selector) => getComputedStyle(document.querySelector(selector));
  const spacing = (selector) => [...document.querySelectorAll(selector + ' > span')].map((span) => parseFloat(getComputedStyle(span).letterSpacing));
  return {
    footer: { width: footer.width, height: footer.height },
    equalizer: relative('.wide-footer-equalizer'),
    tall: relative('.wide-bars-tall'),
    short: relative('.wide-bars-short'),
    pitch: relative('.wide-footer-pitch'),
    pitchText: relative('.wide-footer-pitch p'),
    pitchSize: parseFloat(style('.wide-footer-pitch p').fontSize),
    pitchWeight: style('.wide-footer-pitch p').fontWeight,
    pitchLeading: parseFloat(style('.wide-footer-pitch p').lineHeight),
    pitchTracking: parseFloat(style('.wide-footer-pitch p').letterSpacing),
    pitchGap: parseFloat(style('.wide-footer-pitch').rowGap),
    lockup: relative('.wide-footer-lockup'),
    lets: relative('.wide-footer-lets'),
    plug: relative('.wide-footer-plug'),
    connect: relative('.wide-footer-connect'),
    wordSize: parseFloat(style('.wide-footer-word').fontSize),
    wordTracking: parseFloat(style('.wide-footer-word').letterSpacing),
    lockupGap: parseFloat(style('.wide-footer-lockup').columnGap),
    letsSpacing: spacing('.wide-footer-lets'),
    connectSpacing: spacing('.wide-footer-connect'),
    meta: relative('.wide-footer-meta'),
    metaSize: parseFloat(style('.wide-footer-meta').fontSize),
    metaFamily: style('.wide-footer-meta').fontFamily,
    locationGap: parseFloat(style('.wide-location').rowGap),
    contactGap: parseFloat(style('.wide-contact-links').rowGap)
  };
});
const near = (actual, expected, tolerance, label) => check(Math.abs(actual - expected) <= tolerance, label + ': ' + actual);
near(value.footer.width, 1440, 1, 'footer width');
near(value.footer.height, 1041, 1, 'footer height');
near(value.equalizer.top, 22.5, 1, 'equalizer top');
near(value.tall.height, 134, 1, 'equalizer tall row');
near(value.short.height, 63, 1, 'equalizer short row');
near(value.short.top - value.tall.bottom, 17, 1, 'equalizer row gap');
near(value.pitch.top, 322.5, 1, 'pitch top');
near(value.pitch.right, 1389, 1, 'pitch right');
near(value.pitch.width, 672, 1, 'pitch width');
near(value.pitchText.width, 543, 1, 'pitch text width');
near(value.pitchSize, 24, 0.1, 'pitch text size');
near(value.pitchLeading, 31.68, 0.2, 'pitch line height');
near(value.pitchTracking, 0.048, 0.02, 'pitch tracking');
near(value.pitchGap, 56, 0.5, 'pitch gap');
check(value.pitchWeight === '500', 'pitch text weight');
near(value.lockup.top, 626.5, 1, 'lockup top');
near(value.lockup.left, -26, 1, 'lockup left crop');
near(value.lockup.right, 1474, 1, 'lockup right crop');
near(value.lockup.width, 1500, 1, 'lockup width');
near(value.lockup.height, 264, 1, 'lockup height');
near(value.lets.width, 353, 1, 'LETS frame width');
near(value.plug.width, 188, 1, 'plug width');
near(value.plug.height, 264, 1, 'plug height');
near(value.connect.width, 863, 1, 'CONNECT frame width');
near(value.wordSize, 171.468, 0.2, 'lockup type size');
near(value.wordTracking, -9.4307, 0.05, 'lockup base tracking');
near(value.lockupGap, 48, 0.5, 'lockup item gap');
[-0.32, 0.16, -0.48, -0.64, -9.4307].forEach((expected, index) => near(value.letsSpacing[index], expected, 0.05, 'LETS tracking ' + index));
[0.16, -0.8, -1.44, -1.28, -0.16, 0.16, -9.4307].forEach((expected, index) => near(value.connectSpacing[index], expected, 0.05, 'CONNECT tracking ' + index));
near(value.meta.left, 34, 1, 'metadata left');
near(value.meta.right, 1406, 1, 'metadata right');
near(value.footer.height - value.meta.bottom, 47.5, 1, 'metadata bottom');
near(value.metaSize, 14, 0.1, 'metadata size');
near(value.locationGap, 12, 0.1, 'location row gap');
near(value.contactGap, 12, 0.1, 'contact row gap');
check(value.metaFamily.includes('Space Mono'), 'metadata family');
return 'footer fidelity verified';`;
  await withBrowser(code);
  console.log("G1 OK footer fidelity");
}

async function verifyFooterResponsive() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1159, 1160, 1200, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const footer = document.querySelector('.wide-footer').getBoundingClientRect();
    const lockup = document.querySelector('.wide-footer-lockup').getBoundingClientRect();
    const meta = document.querySelector('.wide-footer-meta').getBoundingClientRect();
    const location = document.querySelector('.wide-location').getBoundingClientRect();
    const contacts = document.querySelector('.wide-contact-links').getBoundingClientRect();
    const pitch = document.querySelector('.wide-footer-pitch').getBoundingClientRect();
    const button = document.querySelector('.wide-footer-pitch a').getBoundingClientRect();
    const style = (selector) => getComputedStyle(document.querySelector(selector));
    return {
      footer, lockup, meta, location, contacts, pitch, button,
      fontSize: parseFloat(style('.wide-footer-word').fontSize),
      plugWidth: document.querySelector('.wide-footer-plug').getBoundingClientRect().width,
      gap: parseFloat(style('.wide-footer-lockup').columnGap),
      locationGap: parseFloat(style('.wide-location').rowGap),
      contactGap: parseFloat(style('.wide-contact-links').rowGap),
      metaSize: parseFloat(style('.wide-footer-meta').fontSize),
      pitchSize: parseFloat(style('.wide-footer-pitch p').fontSize),
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth
    };
  });
  const canvas = Math.min(width, 1920);
  const scale = canvas / 1440;
  check(value.overflow <= 1, width + ': document overflow');
  check(Math.abs(value.fontSize - 171.468 * scale) <= 0.7, width + ': lockup type scale');
  check(Math.abs(value.plugWidth - 188 * scale) <= 1, width + ': plug scale');
  check(Math.abs(value.gap - 48 * scale) <= 1, width + ': lockup gap scale');
  check(Math.abs(value.locationGap - 12) <= 0.1 && Math.abs(value.contactGap - 12) <= 0.1, width + ': metadata rhythm');
  check(Math.abs(value.metaSize - 14) <= 0.1, width + ': metadata size changed');
  check(Math.abs(value.pitchSize - 24) <= 0.1, width + ': pitch size changed');
  check(value.lockup.top >= value.footer.top && value.lockup.bottom < value.meta.top - 20, width + ': lockup collides vertically');
  check(value.pitch.top >= value.footer.top && value.button.bottom < value.lockup.top - 20, width + ': footer pitch collides with lockup');
  check(value.location.right <= value.contacts.left - 8, width + ': footer metadata columns overlap');
  check(value.meta.bottom <= value.footer.bottom + 1, width + ': footer metadata escaped');
}
return 'responsive footer verified';`;
  await withBrowser(code);
  console.log("G2 OK responsive footer");
}

async function verifyMondaiFidelity() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1159, 1160, 1200, 1440, 1920]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    const style = (selector, pseudo) => getComputedStyle(document.querySelector(selector), pseudo);
    const title = rect('.wide-mondai-title');
    const label = rect('.wide-mondai-label');
    const description = rect('.wide-mondai-description');
    const details = rect('.wide-mondai-details');
    const brackets = [...document.querySelectorAll('.wide-mondai-label > img')].map((image) => image.getBoundingClientRect());
    return {
      title, label, description, details, brackets,
      labelSize: parseFloat(style('.wide-mondai-label').fontSize),
      labelFamily: style('.wide-mondai-label').fontFamily,
      labelLeading: parseFloat(style('.wide-mondai-label').lineHeight),
      titleSize: parseFloat(style('.wide-mondai-title').fontSize),
      titleTracking: parseFloat(style('.wide-mondai-title').letterSpacing),
      mTracking: parseFloat(style('.wide-track-m').letterSpacing),
      aTracking: parseFloat(style('.wide-track-a').letterSpacing),
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth
    };
  });
  check(Math.abs(value.labelSize - 12) <= 0.1, width + ': collection label size');
  check(value.labelFamily.includes('Space Mono'), width + ': collection label family');
  check(Math.abs(value.labelLeading - 13.44) <= 0.2, width + ': collection label leading');
  value.brackets.forEach((box) => {
    check(Math.abs(box.width - 6.464) <= 0.2, width + ': bracket width');
    check(Math.abs(box.height - 29.216) <= 0.2, width + ': bracket height');
  });
  check(Math.abs(value.titleTracking / value.titleSize + 0.055) <= 0.001, width + ': Mondai base tracking');
  check(Math.abs(value.mTracking / value.titleSize + 0.07) <= 0.001, width + ': Mondai M tracking');
  check(Math.abs(value.aTracking / value.titleSize + 0.08) <= 0.001, width + ': Mondai a tracking');
  if (width < 680) {
    check(Math.abs(value.label.left - value.title.right - 12) <= 1, width + ': mobile title-to-label gap');
    check(value.description.top >= Math.max(value.title.bottom, value.label.bottom) + 31, width + ': mobile description gap');
    check(value.title.left >= -1 && value.label.right <= width + 1, width + ': mobile title row is clipped');
    check(value.description.left >= -1 && value.description.right <= width + 1, width + ': mobile description is clipped at ' + value.description.left + '/' + value.description.right);
    check(value.overflow <= 1, width + ': mobile header causes document overflow');
  } else {
    check(Math.abs(value.details.left - value.title.right - 24) <= 1, width + ': title-to-details gap');
    check(Math.abs(value.label.left - value.details.left) <= 1, width + ': label alignment');
    check(Math.abs(value.description.left - value.details.left) <= 1, width + ': description alignment');
  }
}
return 'Mondai fidelity verified';`;
  await withBrowser(code);
  console.log("G3 OK Mondai fidelity");
}

async function verifyDisplayFidelity() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1159, 1160, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const style = (selector) => getComputedStyle(document.querySelector(selector));
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    const ratios = (selector) => {
      const root = document.querySelector(selector);
      const size = parseFloat(getComputedStyle(root).fontSize);
      return [...root.children].map((span) => parseFloat(getComputedStyle(span).letterSpacing) / size);
    };
    const page = rect('.wide-homepage');
    const superTitle = rect('.wide-superpowers-heading-frame h2');
    return {
      pageLeft: page.left,
      superLeft: superTitle.left,
      hero: ratios('.wide-hero h1'),
      super: ratios('.wide-superpowers-heading-frame h2'),
      mondai: ratios('.wide-mondai-title'),
      lets: ratios('.wide-footer-lets'),
      connect: ratios('.wide-footer-connect'),
      footerBase: parseFloat(style('.wide-footer-word').letterSpacing) / parseFloat(style('.wide-footer-word').fontSize)
    };
  });
  const nearRatios = (actual, expected, label) => expected.forEach((item, index) => check(Math.abs(actual[index] - item) <= 0.001, width + ': ' + label + ' ' + index));
  nearRatios(value.hero, [-0.07, -0.05, -0.07, -0.05, -0.08, -0.07, -0.055], 'CHADWICK');
  nearRatios(value.super, [-0.06, -0.09, -0.03, -0.055, -0.05, -0.03, -0.04, -0.055, -0.02, -0.055], 'Superpowers');
  nearRatios(value.mondai, [-0.07, -0.055, -0.08, -0.055], 'Mondai');
  nearRatios(value.lets, [-0.001866, 0.000933, -0.002799, -0.003732, -0.055], 'LETS');
  nearRatios(value.connect, [0.000933, -0.004665, -0.008398, -0.007465, -0.000933, 0.000933, -0.055], 'CONNECT');
  check(Math.abs(value.footerBase + 0.055) <= 0.001, width + ': footer base tracking');
  const canvas = Math.min(width, 1920);
  check(Math.abs(value.superLeft - (value.pageLeft - canvas * 0.02777778)) <= 1, width + ': Superpowers left crop');
}
return 'display fidelity verified';`;
  await withBrowser(code);
  console.log("G4 OK display fidelity");
}

async function verifyMobileMargins() {
  const code = `${browserPrelude}
for (const width of [320, 360, 390, 430, 679]) {
  await resize(width, 844);
  const value = await page.evaluate(() => {
    const left = (selector) => document.querySelector(selector).getBoundingClientRect().left;
    return {
      header: left('.wide-sticky-header'),
      hero: left('.wide-hero-copy'),
      work: left('.wide-project-mondai .wide-project-image'),
      quote: left('.wide-quote-block'),
      intro: left('.wide-about-intro'),
      portrait: left('.wide-portrait-row'),
      power: left('.wide-power-row'),
      overview: left('.wide-overview'),
      footer: left('.wide-footer-meta'),
      mondaiPadding: parseFloat(getComputedStyle(document.querySelector('.wide-mondai')).paddingLeft),
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth
    };
  });
  const expected = Math.min(12, Math.max(8, width * 0.027907));
  for (const [name, actual] of Object.entries(value)) {
    if (name === 'overflow') continue;
    check(Math.abs(actual - expected) <= 1, width + ': ' + name + ' margin ' + actual + '/' + expected);
  }
  check(value.overflow <= 1, width + ': mobile overflow');
}
return 'mobile margins verified';`;
  await withBrowser(code);
  console.log("G5 OK mobile margins");
}

async function verifyFidelityRegression() {
  await verifyMasterVc();
  await verifySticky();
  await verifyFooterFidelity();
  await verifyFooterResponsive();
  await verifyMondaiFidelity();
  await verifyDisplayFidelity();
  await verifyMobileMargins();
  await verifyInteractionVc();
  await verifyBrowsersVc();
  console.log("G6 OK fidelity regression suite");
}

async function captureFidelityScreenshots() {
  const code = `${browserPrelude}
for (const [name, width, height] of [
  ['320', 320, 844],
  ['390', 390, 844],
  ['679', 679, 900],
  ['680', 680, 900],
  ['768', 768, 1024],
  ['1159', 1159, 900],
  ['1160', 1160, 900],
  ['1440', 1440, 900],
  ['1920', 1920, 1080]
]) {
  await resize(width, height);
  await page.locator('.wide-footer').screenshot({ path: 'output/playwright/fidelity/footer-' + name + '.png' });
  await page.locator('.wide-mondai-header').screenshot({ path: 'output/playwright/fidelity/mondai-' + name + '.png' });
  await page.locator('.wide-superpowers-heading-frame').screenshot({ path: 'output/playwright/fidelity/superpowers-' + name + '.png' });
}
for (const [name, width, height] of [['320', 320, 844], ['390', 390, 844], ['768', 768, 1024], ['1440', 1440, 900]]) {
  await resize(width, height);
  await page.locator('.wide-hero').screenshot({ path: 'output/playwright/fidelity/hero-' + name + '.png' });
  await page.locator('.wide-work').screenshot({ path: 'output/playwright/fidelity/work-' + name + '.png' });
}
return 'fidelity screenshots captured';`;
  await withBrowser(code);
  console.log("Fidelity screenshots captured");
}

async function verifyFidelityRecords() {
  const { spec, next } = await sourceFiles();
  assert(spec.includes("Figma fidelity repair"), "fidelity repair is not recorded");
  assert(spec.includes("24 pixel title-to-details gap"), "Mondai header rule is not recorded");
  assert(spec.includes("50 percent"), "mobile margin reduction is not recorded");
  assert(next.includes("fidelity-repaired homepage"), "NEXT does not identify the current review");
  console.log("G8 OK fidelity records");
}

async function verifyWorkCounterparts() {
  const code = `${browserPrelude}
for (const width of [680, 768, 834, 1024, 1159, 1200, 1440, 1920, 2048]) {
  await resize(width, 900);
  const value = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    return {
      mondaiImage: rect('.wide-project-mondai .wide-project-image'),
      havenImage: rect('.wide-project-haven .wide-project-image'),
      mondaiMeta: rect('.wide-project-mondai .wide-project-meta-frame'),
      havenMeta: rect('.wide-project-haven .wide-project-meta-frame')
    };
  });
  check(Math.abs(value.mondaiImage.bottom - value.havenImage.bottom) <= 0.01, width + ': media bottoms differ by ' + Math.abs(value.mondaiImage.bottom - value.havenImage.bottom));
  check(Math.abs(value.mondaiMeta.top - value.mondaiImage.bottom - (width < 680 ? 18 : 24)) <= 1, width + ': Mondai media gap');
  check(Math.abs(value.havenMeta.top - value.havenImage.bottom - (width < 680 ? 18 : 24)) <= 1, width + ': Haven media gap');
  await page.hover('.wide-project-mondai .wide-card-link');
  const decoration = await page.evaluate(() => getComputedStyle(document.querySelector('.wide-project-mondai .wide-project-title')).textDecorationLine);
  check(decoration === 'none', width + ': project title gains an underline');
}
return 'work counterparts verified';`;
  await withBrowser(code);
  console.log("G1 OK work counterparts");
}

async function verifyWorkMetadataAlignment() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1024, 1159, 1200, 1440, 1920]) {
  await resize(width, 900);
  const value = await page.evaluate(() => [...document.querySelectorAll('.wide-project-meta')].map((meta) => {
    const title = meta.querySelector('.wide-project-title').getBoundingClientRect();
    const support = meta.querySelector('.wide-project-description').getBoundingClientRect();
    const frame = meta.parentElement.getBoundingClientRect();
    const style = getComputedStyle(meta);
    return { title, support, frame, direction: style.flexDirection, align: style.alignItems, supportAlign: getComputedStyle(meta.querySelector('.wide-project-description')).textAlign };
  }));
  value.forEach((item, index) => {
    if (width >= 1200) {
      check(Math.abs(item.title.top - item.support.top) <= 1, width + ': card ' + index + ' title/support tops differ');
      check(item.direction === 'row', width + ': card ' + index + ' desktop metadata is not a row');
    } else {
      check(item.direction === 'column', width + ': card ' + index + ' metadata did not stack');
      check(item.align === 'flex-start' && item.supportAlign === 'left', width + ': card ' + index + ' stacked metadata is not left aligned');
      check(Math.abs(item.title.left - item.frame.left) <= 1 && Math.abs(item.support.left - item.frame.left) <= 1, width + ': card ' + index + ' stack moved from image edge');
    }
  });
}
return 'work metadata alignment verified';`;
  await withBrowser(code);
  console.log("G2 OK work metadata alignment");
}

async function verifyFooterLockupFidelity() {
  const code = `${browserPrelude}
const expectedTracking = {
  lets: [-0.001866, 0.000933, -0.002799, -0.003732, -0.055],
  connect: [0.000933, -0.004665, -0.008398, -0.007465, -0.000933, 0.000933, -0.055]
};
for (const width of [320, 390, 679, 680, 768, 1159, 1160, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    const ratios = (selector) => {
      const root = document.querySelector(selector);
      const size = parseFloat(getComputedStyle(root).fontSize);
      return [...root.children].map((span) => parseFloat(getComputedStyle(span).letterSpacing) / size);
    };
    return {
      page: rect('.wide-homepage'), lockup: rect('.wide-footer-lockup'), lets: rect('.wide-footer-lets'),
      plug: rect('.wide-footer-plug'), connect: rect('.wide-footer-connect'),
      gap: parseFloat(getComputedStyle(document.querySelector('.wide-footer-lockup')).columnGap),
      letsTracking: ratios('.wide-footer-lets'), connectTracking: ratios('.wide-footer-connect')
    };
  });
  const canvas = Math.min(width, 1920);
  const scale = canvas / 1440;
  check(Math.abs(value.lets.width - 421 * scale) <= 1, width + ': LETS width');
  check(Math.abs(value.plug.width - 188 * scale) <= 1, width + ': plug width');
  check(Math.abs(value.connect.width - 863 * scale) <= 1, width + ': CONNECT width');
  check(Math.abs(value.gap - 48 * scale) <= 1, width + ': lockup gap');
  check(value.lets.left < value.page.left && value.connect.right > value.page.right, width + ': intended edge crop was lost');
  expectedTracking.lets.forEach((expected, index) => check(Math.abs(value.letsTracking[index] - expected) <= 0.001, width + ': LETS tracking ' + index));
  expectedTracking.connect.forEach((expected, index) => check(Math.abs(value.connectTracking[index] - expected) <= 0.001, width + ': CONNECT tracking ' + index));
}
return 'footer lockup fidelity verified';`;
  await withBrowser(code);
  console.log("G3 OK footer lockup fidelity");
}

async function verifyFooterCopyRhythm() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1159, 1160, 1200, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const pitch = getComputedStyle(document.querySelector('.wide-footer-pitch p'));
    const location = document.querySelector('.wide-location');
    const contacts = document.querySelector('.wide-contact-links');
    const contactRows = [...contacts.children].map((row) => row.getBoundingClientRect());
    return {
      pitchSize: parseFloat(pitch.fontSize), locationGap: parseFloat(getComputedStyle(location).rowGap),
      contactGap: parseFloat(getComputedStyle(contacts).rowGap), contactRows,
      contacts: contacts.getBoundingClientRect(), location: location.getBoundingClientRect()
    };
  });
  const expectedPitch = Math.min(24, Math.max(16, width * 0.01666667));
  check(Math.abs(value.pitchSize - expectedPitch) <= 0.2, width + ': relocation copy size');
  check(Math.abs(value.locationGap - 12) <= 0.1 && Math.abs(value.contactGap - 12) <= 0.1, width + ': footer row gap');
  check(value.contactRows.every((row) => row.height <= 14), width + ': contact row has extra height ' + value.contactRows.map((row) => row.height).join('/'));
  check(Math.abs(value.contactRows[1].top - value.contactRows[0].bottom - 12) <= 0.5, width + ': contact visual gap');
}
return 'footer copy rhythm verified';`;
  await withBrowser(code);
  console.log("G4 OK footer copy rhythm");
}

async function verifyProportionalDisplay() {
  const code = `${browserPrelude}
const samples = [];
for (const width of [320, 390, 679, 680, 768, 1159, 1160, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  samples.push(await page.evaluate(() => {
    const visualWidth = (selector) => {
      const children = [...document.querySelector(selector).children];
      const boxes = children.map((child) => child.getBoundingClientRect());
      return Math.max(...boxes.map((box) => box.right)) - Math.min(...boxes.map((box) => box.left));
    };
    const size = (selector) => parseFloat(getComputedStyle(document.querySelector(selector)).fontSize);
    return {
      canvas: document.querySelector('.wide-homepage').getBoundingClientRect().width,
      heroSize: size('.wide-hero h1'), superSize: size('.wide-superpowers-heading-frame h2'),
      mondaiSize: size('.wide-mondai-title'),
      heroWidth: visualWidth('.wide-hero h1'), superWidth: visualWidth('.wide-superpowers-heading-frame h2'),
      mondaiWidth: visualWidth('.wide-mondai-title')
    };
  }));
}
const expected = { heroSize: 302 / 1440, superSize: 248 / 1440, mondaiSize: 212 / 1440 };
samples.forEach((sample, index) => {
  Object.entries(expected).forEach(([name, ratio]) => check(Math.abs(sample[name] / sample.canvas - ratio) <= 0.001, index + ': ' + name + ' ratio'));
});
for (const name of ['heroWidth', 'superWidth', 'mondaiWidth']) {
  const baseline = samples.find((sample) => Math.abs(sample.canvas - 1440) <= 1)[name] / 1440;
  samples.forEach((sample, index) => check(Math.abs(sample[name] / sample.canvas - baseline) <= 0.006, index + ': ' + name + ' visual ratio'));
}
return 'proportional display verified';`;
  await withBrowser(code);
  console.log("G5 OK proportional display");
}

async function verifyMondaiResponsiveHeaderOwnerReview() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 767, 768, 1024, 1159, 1160, 1440, 1920]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    return { title: rect('.wide-mondai-title'), label: rect('.wide-mondai-label'), description: rect('.wide-mondai-description'), details: rect('.wide-mondai-details') };
  });
  check(value.label.top >= value.title.top - 1 && value.label.top <= value.title.top + 1, width + ': marker top is not aligned to title');
  if (width < 768) {
    check(Math.abs(value.label.left - value.title.right - 24) <= 1, width + ': marker gap');
    check(value.description.top >= Math.max(value.title.bottom, value.label.bottom) + 31, width + ': description did not move below title');
    check(Math.abs(value.description.left - value.title.left) <= 1, width + ': lower description is not title aligned');
  } else {
    check(Math.abs(value.details.left - value.title.right - 24) <= 1, width + ': right-side clearance');
    check(Math.abs(value.description.left - value.details.left) <= 1, width + ': right-side description alignment');
    check(value.description.top >= value.label.bottom + 23.5, width + ': label-to-description rhythm ' + (value.description.top - value.label.bottom));
    if (width < 1160) check(value.description.bottom <= value.title.bottom + 0.5, width + ': tablet description extends below Mondai by ' + (value.description.bottom - value.title.bottom));
  }
  check(value.label.right <= width + 1 && value.description.right <= width + 1, width + ': header clips');
}
return 'Mondai responsive header verified';`;
  await withBrowser(code);
  console.log("G6 OK Mondai responsive header");
}

async function verifyOwnerReviewRegression() {
  await verifyWorkCounterparts();
  await verifyWorkMetadataAlignment();
  await verifyCurrentFooter();
  await verifyFigmaStyleFidelity();
  await verifyProportionalDisplay();
  await verifyMondaiResponsiveHeaderOwnerReview();
  await verifySticky();
  await verifySweepVc();
  await verifyInteractionVc();
  await verifyBrowsersVc();
  await verifyAssetDelivery();
  console.log("G7 OK owner review regression");
}

async function captureOwnerReviewScreenshots() {
  const code = `${browserPrelude}
for (const [name, width, height] of [
  ['320', 320, 844], ['390', 390, 844], ['679', 679, 900], ['680', 680, 900],
  ['767', 767, 1024], ['768', 768, 1024], ['1050', 1050, 900], ['1159', 1159, 900], ['1160', 1160, 900], ['1199', 1199, 900],
  ['1200', 1200, 900], ['1440', 1440, 900], ['1920', 1920, 1080]
]) {
  await resize(width, height);
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator('.wide-hero').screenshot({ path: 'output/playwright/owner-review/hero-' + name + '.png' });
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator('.wide-work').screenshot({ path: 'output/playwright/owner-review/work-' + name + '.png' });
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator('.wide-about-opening').screenshot({ path: 'output/playwright/owner-review/about-' + name + '.png' });
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator('.wide-mondai-header').screenshot({ path: 'output/playwright/owner-review/mondai-' + name + '.png' });
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator('.wide-superpowers-heading-frame').screenshot({ path: 'output/playwright/owner-review/superpowers-' + name + '.png' });
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator('.wide-footer').screenshot({ path: 'output/playwright/owner-review/footer-' + name + '.png' });
}
return 'owner review screenshots captured';`;
  await withBrowser(code);
  console.log("Owner review screenshots captured");
}

async function verifyOwnerReviewRecords() {
  const { spec, next } = await sourceFiles();
  assert(spec.includes("Owner review counterpart rules"), "owner review rules are not recorded");
  assert(spec.includes("media bottoms"), "work media alignment is not recorded");
  assert(spec.includes("constant proportion"), "display scaling rule is not recorded");
  assert(next.includes("owner-reviewed responsive homepage"), "NEXT does not identify the current review");
  console.log("G9 OK owner review records");
}

async function verifyWorkRegression() {
  await verifyMasterVc();
  await verifySticky();
  await verifyWorkResponsive();
  await verifyInteractionVc();
  await verifyBrowsersVc();
  console.log("G6 OK work regression suite");
}

async function verifySweepVc() {
  const code = `${browserPrelude}
const errors = [];
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
page.on('pageerror', (error) => errors.push(error.message));
for (const width of [320, 360, 390, 430, 679, 680, 768, 834, 1024, 1159, 1160, 1199, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const result = await page.evaluate(() => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return style.display !== 'none' && style.visibility !== 'hidden' && box.width > 0 && box.height > 0;
    };
    const support = [...document.querySelectorAll('p, h3, .wide-project-title, .wide-project-label, .wide-mondai-label, .wide-case-number, .wide-case-title, .wide-overview-label')]
      .filter(visible)
      .filter((element) => {
        const box = element.getBoundingClientRect();
        return box.left < -1 || box.right > innerWidth + 1;
      })
      .map((element) => element.className || element.tagName);
    const sectionTops = [...document.querySelectorAll('main > section, main > footer')].map((element) => element.getBoundingClientRect().top + scrollY);
    const media = [...document.querySelectorAll('.wide-project-image')].map((element) => {
      const box = element.getBoundingClientRect();
      return { width: box.width, height: box.height, loaded: element.complete && element.naturalWidth > 0 };
    });
    return {
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
      support,
      media,
      ordered: sectionTops.every((top, index) => index === 0 || top >= sectionTops[index - 1]),
      footerBelowAbout: document.querySelector('.wide-footer').getBoundingClientRect().top + scrollY >= document.querySelector('.wide-about').getBoundingClientRect().bottom + scrollY - 1
    };
  });
  check(result.overflow <= 1, width + ': horizontal overflow ' + result.overflow);
  check(result.support.length === 0, width + ': supporting text outside viewport ' + result.support.join(','));
  check(result.ordered && result.footerBelowAbout, width + ': section order');
  result.media.forEach((item) => check(item.loaded && item.width > 0 && item.height > 0, width + ': project media'));
}
check(errors.length === 0, 'browser errors: ' + errors.join(' | '));
return 'responsive sweep verified';`;
  await withBrowser(code);
  console.log("G3 OK responsive sweep");
}

async function verifyInteractionVc() {
  const code = `${browserPrelude}
for (const width of [768, 1440]) {
  await resize(width, 900);
  const before = await page.evaluate(() => ({
    logo: document.querySelector('.wide-logo').getBoundingClientRect().top,
    nav: document.querySelector('.wide-navigation').getBoundingClientRect().top,
    bio: document.querySelector('.wide-bio').getBoundingClientRect().top
  }));
  await page.evaluate(() => scrollTo(0, 500));
  await page.waitForTimeout(30);
  const after = await page.evaluate(() => ({
    logo: document.querySelector('.wide-logo').getBoundingClientRect().top,
    nav: document.querySelector('.wide-navigation').getBoundingClientRect().top,
    bio: document.querySelector('.wide-bio').getBoundingClientRect().top
  }));
  check(Math.abs(after.logo - before.logo) <= 1, width + ': logo is not sticky');
  if (width >= 1160) check(Math.abs(after.nav - before.nav) <= 1, width + ': desktop navigation is not sticky');
  check(after.bio < before.bio - 450, width + ': hero copy became sticky');
}
await resize(430, 932);
const trigger = page.locator('.menu-trigger');
await trigger.click();
check(await page.locator('#mobile-menu').isVisible(), 'menu did not open');
check(await trigger.getAttribute('aria-expanded') === 'true', 'menu expanded state');
check(await page.evaluate(() => document.activeElement === document.querySelector('.menu-close')), 'menu focus entry');
check(await page.evaluate(() => [...document.querySelectorAll('main > section, main > footer')].every((element) => element.inert)), 'background inert state');
await page.locator('#mobile-menu a').last().focus();
await page.keyboard.press('Tab');
check(await page.evaluate(() => document.activeElement === document.querySelector('.menu-close')), 'menu focus trap');
await page.keyboard.press('Escape');
check(await page.locator('#mobile-menu').isHidden(), 'Escape dismissal');
check(await page.evaluate(() => document.activeElement === document.querySelector('.menu-trigger')), 'focus restoration');
await page.keyboard.press('Tab');
await page.reload();
await ready();
await page.keyboard.press('Tab');
check(await page.evaluate(() => document.activeElement.classList.contains('skip-link')), 'skip link order');
return 'navigation and interaction verified';`;
  await withBrowser(code);
  console.log("G4 OK navigation and interaction");
}

async function verifyFooterVc() {
  const code = `${browserPrelude}
for (const [width, height] of [[390, 844], [768, 1024], [1440, 900]]) {
  await resize(width, height);
  const value = await page.evaluate(() => {
    const box = (selector) => document.querySelector(selector).getBoundingClientRect();
    const footer = box('.wide-footer');
    const bars = box('.wide-footer-equalizer');
    const pitch = box('.wide-footer-pitch');
    const button = box('.wide-footer-pitch a');
    const lockup = box('.wide-footer-lockup');
    const meta = box('.wide-footer-meta');
    return {
      footer, bars, pitch, button, lockup, meta,
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
      text: document.querySelector('.wide-footer-pitch p').textContent,
      clock: document.querySelector('#chicago-time').textContent
    };
  });
  check(value.overflow <= 1, width + ': footer overflow');
  check(value.bars.top >= value.footer.top && value.bars.bottom < value.pitch.top, width + ': equalizer hierarchy');
  check(value.pitch.bottom <= value.lockup.top + 2, width + ': pitch overlaps lockup');
  check(value.lockup.bottom <= value.meta.top + 2, width + ': lockup overlaps metadata');
  check(value.button.width >= 44 && value.button.height >= 44, width + ': contact target');
  check(value.text.includes('Chicago, IL') && value.text.includes('NYC'), width + ': relocation copy');
  check(value.clock.endsWith('CST'), width + ': Chicago clock label');
  if (width === 1440) check(Math.abs(value.footer.height - 1041) <= 1, 'desktop footer height');
}
return 'responsive footer verified';`;
  await withBrowser(code);
  console.log("G5 OK responsive footer");
}

async function verifyBrowsersVc() {
  const code = `${browserPrelude}
for (const [width, height] of [[390, 844], [1440, 900]]) {
  await resize(width, height);
  check(await page.title() === 'Chadwick Fenner, Product Designer', width + ': wrong page');
  check(await page.locator('.wide-hero').isVisible(), width + ': hero missing');
  check(await page.locator('.wide-footer').isVisible(), width + ': footer missing');
  check(await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) <= innerWidth + 1), width + ': overflow');
}
return 'browser smoke verified';`;
  for (const browser of ["chrome", "firefox", "webkit"]) await withBrowser(code, browser);
  console.log("G6 OK browser smoke");
}

async function verifyRecordsVc() {
  const { spec, next } = await sourceFiles();
  const decisions = await readFile(path.join(root, "docs", "DECISIONS.md"), "utf8");
  assert(spec.includes("3461:7711"), "current Master node missing from spec");
  assert(spec.includes("asymmetric"), "asymmetric work composition missing from spec");
  assert(spec.includes("equalizer"), "new footer missing from spec");
  assert(decisions.includes("3461:7711"), "current Master node missing from decisions");
  assert(next.includes("updated VC Master"), "NEXT does not identify the review target");
  console.log("G8 OK project records");
}

async function verifyDisplayType() {
  const code = `${browserPrelude}
await resize(1440, 900);
const values = await page.evaluate(() => {
  const value = (node) => {
    const spacing = getComputedStyle(node).letterSpacing;
    return spacing === 'normal' ? 0 : parseFloat(spacing);
  };
  const spacing = (selector) => value(document.querySelector(selector));
  return {
    hero: ['.wide-track-07', '.wide-track-05', '.wide-track-08'].map(spacing),
    superpowers: ['.wide-super-s', '.wide-super-u', '.wide-super-p', '.wide-super-r', '.wide-super-ow', '.wide-super-r2'].map(spacing),
    mondai: ['.wide-track-m', '.wide-track-a'].map(spacing),
    footerLets: [...document.querySelectorAll('.wide-footer-lets span')].map(value),
    footerConnect: [...document.querySelectorAll('.wide-footer-connect span')].map(value)
  };
});
const near = (actual, expected, label) => check(Math.abs(actual - expected) <= 0.08, label + ': ' + actual);
[[-21.14, values.hero[0]], [-15.1, values.hero[1]], [-24.16, values.hero[2]]].forEach(([expected, actual], index) => near(actual, expected, 'hero tracking ' + index));
[[-14.88, values.superpowers[0]], [-22.32, values.superpowers[1]], [-7.44, values.superpowers[2]], [-12.4, values.superpowers[3]], [-9.92, values.superpowers[4]], [-4.96, values.superpowers[5]]].forEach(([expected, actual], index) => near(actual, expected, 'Superpowers tracking ' + index));
[[-14.84, values.mondai[0]], [-16.96, values.mondai[1]]].forEach(([expected, actual], index) => near(actual, expected, 'Mondai tracking ' + index));
[[-0.32, 0.16, -0.48, -0.64, 0], [0.16, -0.8, -1.44, -1.28, -0.16, 0.16, 0]].forEach((expectedSet, groupIndex) => {
  const actualSet = groupIndex === 0 ? values.footerLets : values.footerConnect;
  expectedSet.forEach((expected, index) => near(actualSet[index], expected, 'footer tracking ' + groupIndex + ':' + index));
});
return 'art-directed display tracking verified';`;
  await withBrowser(code);
  console.log("G1 OK art-directed display tracking");
}

async function verifyTypeScale() {
  const code = `${browserPrelude}
const renderedLines = () => page.evaluate(() => {
  const root = document.querySelector('.wide-quote');
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const words = [];
  let node;
  while ((node = walker.nextNode())) {
    for (const match of node.nodeValue.matchAll(/\\S+/g)) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      const box = range.getBoundingClientRect();
      if (box.width > 0) words.push({ word: match[0], top: Math.round(box.top * 2) / 2 });
    }
  }
  const lines = [];
  for (const word of words) {
    let line = lines.find((candidate) => Math.abs(candidate.top - word.top) <= 1);
    if (!line) {
      line = { top: word.top, words: [] };
      lines.push(line);
    }
    line.words.push(word.word);
  }
  return lines.sort((a, b) => a.top - b.top);
});
for (const width of [320, 360, 390, 430, 679, 680, 768, 834, 1024, 1159, 1160, 1440, 1920]) {
  await resize(width, width < 680 ? 844 : 900);
  const metrics = await page.evaluate(() => {
    const quote = getComputedStyle(document.querySelector('.wide-quote'));
    const superpowers = getComputedStyle(document.querySelector('.wide-superpowers-heading-frame h2'));
    return {
      size: parseFloat(quote.fontSize),
      leading: parseFloat(quote.lineHeight),
      tracking: parseFloat(quote.letterSpacing),
      superSize: parseFloat(superpowers.fontSize)
    };
  });
  const expected = width < 680 ? 32 : width < 1160 ? 40 : 64;
  check(Math.abs(metrics.size - expected) <= 0.2, width + ': quote tier ' + metrics.size);
  check(Math.abs(metrics.leading / metrics.size - 1.09) <= 0.015, width + ': quote leading');
  check(Math.abs(metrics.tracking / metrics.size + 0.04) <= 0.002, width + ': quote tracking');
  check(metrics.size < metrics.superSize, width + ': quote competes with Superpowers');
  const lines = await renderedLines();
  check(lines.length >= 2, width + ': quote line count');
  check(lines.every((line) => line.words.length >= 2), width + ': one-word quote line ' + JSON.stringify(lines));
  const deltas = lines.slice(1).map((line, index) => line.top - lines[index].top);
  if (deltas.length > 1) check(Math.max(...deltas) - Math.min(...deltas) <= 2, width + ': inconsistent quote rhythm ' + deltas.join(','));
}
return 'responsive type scale verified';`;
  await withBrowser(code);
  console.log("G2 OK responsive type scale");
}

async function verifyMondaiType() {
  const code = `${browserPrelude}
for (const width of [320, 360, 390, 430, 679, 680, 768, 1024, 1159, 1160, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const label = document.querySelector('.wide-mondai-label');
    const labelText = label.querySelector('span');
    const labelBox = label.getBoundingClientRect();
    const textBox = labelText.getBoundingClientRect();
    const rows = [...document.querySelectorAll('.wide-case-list a')].map((row) => {
      const number = row.querySelector('.wide-case-number');
      const title = row.querySelector('.wide-case-title');
      const arrow = row.querySelector('.wide-case-arrow');
      const titleBox = title.getBoundingClientRect();
      return {
        numberSize: parseFloat(getComputedStyle(number).fontSize),
        titleSize: parseFloat(getComputedStyle(title).fontSize),
        whiteSpace: getComputedStyle(title).whiteSpace,
        titleRight: titleBox.right,
        rowRight: row.getBoundingClientRect().right,
        arrowWidth: arrow.getBoundingClientRect().width
      };
    });
    return {
      labelCenterDelta: Math.abs((labelBox.left + labelBox.width / 2) - (textBox.left + textBox.width / 2)),
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
      rows
    };
  });
  const expectedType = width < 680 ? 24 : width < 1160 ? 32 : 40;
  const expectedArrow = width < 680 ? 20 : width < 1160 ? 22 : 25;
  check(value.labelCenterDelta <= 1, width + ': collection label optical center ' + value.labelCenterDelta);
  check(value.overflow <= 1, width + ': Mondai overflow');
  value.rows.forEach((row, index) => {
    check(Math.abs(row.numberSize - expectedType) <= 0.2, width + ': number tier ' + index);
    check(Math.abs(row.titleSize - expectedType) <= 0.2, width + ': title tier ' + index);
    check(row.whiteSpace === 'nowrap', width + ': title wraps ' + index);
    check(row.titleRight <= row.rowRight + 1, width + ': title exits row ' + index);
    check(Math.abs(row.arrowWidth - expectedArrow) <= 0.2, width + ': arrow tier ' + index);
  });
}
return 'Mondai typography verified';`;
  await withBrowser(code);
  console.log("G3 OK Mondai typography");
}

async function verifyFooterType() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1024, 1159, 1160, 1440, 1920]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const box = (selector) => document.querySelector(selector).getBoundingClientRect();
    const lockup = box('.wide-footer-lockup');
    const pitch = box('.wide-footer-pitch');
    const meta = box('.wide-footer-meta');
    const lets = box('.wide-footer-lets');
    const connect = box('.wide-footer-connect');
    return {
      lockup, pitch, meta, lets, connect,
      size: parseFloat(getComputedStyle(document.querySelector('.wide-footer-word')).fontSize),
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth
    };
  });
  check(value.overflow <= 1, width + ': footer document overflow');
  check(value.pitch.bottom <= value.lockup.top + 2, width + ': pitch overlaps lockup');
  check(value.lockup.bottom <= value.meta.top + 2, width + ': lockup overlaps metadata');
  check(value.lockup.left < 0, width + ': intended leading clip missing');
  check(value.connect.right > width, width + ': intended CONNECT clip missing');
  check(value.lets.width > 0 && value.connect.width > 0, width + ': footer words collapsed');
  if (width === 1440) {
    check(Math.abs(value.size - 171.468) <= 0.2, 'desktop footer size');
    check(Math.abs(value.lockup.left + 26) <= 1, 'desktop footer leading edge');
    check(Math.abs(value.lockup.height - 264) <= 1, 'desktop footer lockup height');
  }
}
return 'footer typography verified';`;
  await withBrowser(code);
  console.log("G5 OK footer typography");
}

async function verifyTypographyRegression() {
  await verifySweepVc();
  await verifyInteractionVc();
  await verifyBrowsersVc();
  console.log("G6 OK typography regression suite");
}

async function verifyTypeRecords() {
  const { spec } = await sourceFiles();
  assert(spec.includes("64 / 40 / 32"), "statement type tiers are not recorded");
  assert(spec.includes("40 / 32 / 24"), "case-row type tiers are not recorded");
  assert(spec.includes("art-directed display words"), "display tracking exception is not recorded");
  console.log("G8 OK type system records");
}

async function captureTypography() {
  const code = `${browserPrelude}
const viewports = [
  ['320x844', 320, 844],
  ['390x844', 390, 844],
  ['679x900', 679, 900],
  ['680x900', 680, 900],
  ['768x1024', 768, 1024],
  ['1024x768', 1024, 768],
  ['1159x900', 1159, 900],
  ['1160x900', 1160, 900],
  ['1440x900', 1440, 900],
  ['1920x1080', 1920, 1080]
];
for (const [name, width, height] of viewports) {
  await resize(width, height);
  await page.screenshot({ path: 'output/playwright/typography/homepage-' + name + '.png', fullPage: true, scale: 'css' });
}
return 'typography screenshots captured';`;
  await withBrowser(code);
  console.log("Typography screenshots captured");
}

async function verifyAssetDelivery() {
  const code = `${browserPrelude}
const responses = [];
const failures = [];
page.on('response', async (response) => {
  if (response.url().includes('127.0.0.1')) {
    const headers = await response.allHeaders();
    responses.push({ url: response.url(), status: response.status(), type: headers['content-type'] || '' });
  }
});
page.on('requestfailed', (request) => failures.push(request.url() + ': ' + request.failure()?.errorText));
await resize(1440, 900);
await page.waitForLoadState('networkidle');
await page.waitForTimeout(50);
const result = await page.evaluate(async () => {
  await document.fonts.ready;
  const stylesheet = [...document.styleSheets].find((sheet) => sheet.href?.includes('/site/styles.css'));
  return {
    stylesheetRules: stylesheet ? stylesheet.cssRules.length : 0,
    homepageBackground: getComputedStyle(document.querySelector('.wide-homepage')).backgroundColor,
    bodyFont: getComputedStyle(document.body).fontFamily,
    skipTransform: getComputedStyle(document.querySelector('.skip-link')).transform,
    satoshiLoaded: document.fonts.check('14px Satoshi'),
    monoLoaded: document.fonts.check('14px "Space Mono"'),
    imagesLoaded: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
    resources: performance.getEntriesByType('resource').map((entry) => entry.name)
  };
});
check(failures.length === 0, 'failed requests: ' + failures.join(' | '));
check(responses.length > 0 && responses.every((item) => item.status >= 200 && item.status < 400), 'bad responses: ' + JSON.stringify(responses.filter((item) => item.status >= 400)));
const cssResponse = responses.find((item) => item.url.includes('/site/styles.css'));
check(cssResponse && cssResponse.type.startsWith('text/css'), 'stylesheet did not return as CSS');
check(responses.some((item) => item.url.includes('/site/homepage.js') && item.type.includes('javascript')), 'homepage script did not return as JavaScript');
check(result.stylesheetRules > 100, 'production stylesheet is linked but not applied');
check(result.homepageBackground === 'rgb(4, 4, 5)', 'homepage production background is not applied');
check(result.bodyFont.includes('Satoshi'), 'production font family is not applied');
check(result.skipTransform !== 'none', 'skip link production positioning is not applied');
check(result.satoshiLoaded && result.monoLoaded, 'required fonts did not load');
check(result.imagesLoaded, 'one or more images did not load');
return 'asset delivery verified';`;
  await withBrowser(code);
  console.log("G8 OK asset delivery");
}

async function verifyFigmaTextInventory() {
  const { textInventory } = await sourceFiles();
  const expectedIds = [
    "3664:5191", "3664:5197", "3664:5199", "3664:5201", "3664:5202", "3664:5204",
    "3614:21173", "3614:21175", "3614:21177", "3614:21178", "3614:21180",
    "3652:4339", "3671:5299", "3652:4344", "3652:4360", "3652:4361",
    "3461:27898", "3632:4177", "3461:27905", "3461:27911", "3461:27912", "3461:27917",
    "3461:27918", "3461:27923", "3461:27924", "3461:27987", "3461:27988", "3461:27990",
    "3500:6966", "3461:27999", "3654:4409", "3654:4410", "3654:4411", "3461:28010",
    "3461:28011", "3461:28014", "3461:28015", "3664:5149", "3664:5154", "3664:5160",
    "3664:5161", "3664:5165", "3664:5168"
  ];
  assert(textInventory.includes("The Master contains 43 text nodes"), "inventory count is missing");
  for (const id of expectedIds) assert(textInventory.includes(`\`${id}\``), `inventory is missing ${id}`);
  for (const field of ["Figma style", "font", "size", "weight", "line height", "tracking", "fill"]) {
    assert(textInventory.includes(field), `inventory field is missing: ${field}`);
  }
  assert(textInventory.includes("Both are now attached to `Heading/24`"), "work-title repair is not recorded");
  console.log("G12 OK Figma text inventory");
}

async function verifyFigmaTokenContract() {
  const { css, audit, textInventory } = await sourceFiles();
  const colorTokens = [
    ["Neutral/050", "VariableID:2712:14314", "--portfolio-neutral-050"],
    ["Neutral/100", "VariableID:2712:14315", "--portfolio-neutral-100"],
    ["Neutral/200", "VariableID:2712:14316", "--portfolio-neutral-200"],
    ["Neutral/400", "VariableID:2712:14318", "--portfolio-neutral-400"],
    ["Neutral/500", "VariableID:2712:14319", "--portfolio-neutral-500"],
    ["Neutral/600", "VariableID:2712:14320", "--portfolio-neutral-600"],
    ["Neutral/675", "VariableID:3335:720", "--portfolio-neutral-675"],
    ["Neutral/800", "VariableID:2712:14322", "--portfolio-neutral-800"],
    ["Neutral/900", "VariableID:2712:14323", "--portfolio-neutral-900"]
  ];
  for (const [name, id, token] of colorTokens) {
    assert(audit.includes(name) && audit.includes(id), `audit is missing ${name}`);
    assert(css.includes(token), `CSS is missing ${token}`);
  }
  for (const style of ["Label/14", "Link/14", "Metadata/Mono/12", "Metadata/Mono/14", "Body/16", "Heading/20", "Heading/24", "Heading/40", "Heading/64"]) {
    assert(audit.includes(style), `audit is missing ${style}`);
  }
  assert(css.includes("--text-heading-20-size") && css.includes("--text-heading-24-size"), "heading tokens are missing");
  assert(audit.includes("3664:5053") && audit.includes("3461:7711"), "audit source nodes are missing");
  assert(textInventory.includes("3652:4339") && textInventory.includes("3652:4360"), "work title nodes are missing");
  console.log("G9 OK Figma token contract");
}

async function verifyTokenUsage() {
  const { css, html, audit, textInventory } = await sourceFiles();
  const rootStart = css.indexOf(":root {");
  const rootEnd = css.indexOf("\n}", rootStart);
  assert(rootStart >= 0 && rootEnd > rootStart, "token root is missing");
  const outsideRoot = css.slice(0, rootStart) + css.slice(rootEnd + 2);
  assert(!/#[0-9a-fA-F]{3,8}\b/.test(outsideRoot), "raw production color exists outside the token declarations");
  for (const marker of [
    "font-size: var(--text-link-14-size)",
    "font-size: var(--text-label-14-size)",
    "font-size: var(--text-metadata-12-size)",
    "font-size: var(--text-metadata-14-size)",
    "font-size: var(--text-body-16-size)",
    "font-size: var(--text-heading-20-size)",
    "font-size: var(--text-heading-24-size)",
    "font-size: var(--text-heading-40-size)"
  ]) assert(css.includes(marker), `shared text token is unused: ${marker}`);
  const titleBlock = css.match(/\.wide-project-title \{([\s\S]*?)\n\}/)?.[1] || "";
  const havenBlock = css.match(/\.wide-project-haven \.wide-project-title \{([\s\S]*?)\n\}/)?.[1] || "";
  assert(titleBlock.includes("var(--text-heading-24-size)") && titleBlock.includes("font-weight: 500"), "work titles do not use Heading/24");
  assert(!havenBlock.includes("font-size") && !havenBlock.includes("font-weight"), "Haven overrides the shared work-title style");
  assert(!css.includes("27.018px") && !css.includes("font-size: 28px;\n  font-weight: 700"), "detached work-title sizing remains");
  assert(html.includes('assets/footer-lets.svg') && html.includes('assets/footer-connect.svg'), "footer display vectors are not active");
  assert(html.includes('data-figma-node="3671:5299"') && html.includes("case study<br>collection"), "current work marker is not active");
  assert(audit.includes("only remaining fully detached text node") && textInventory.includes("intentional detached display"), "detached exceptions are not documented");
  console.log("G10 OK token usage");
}

async function verifyWorkflowContract() {
  const { workflow, audit } = await sourceFiles();
  for (const phrase of [
    "variable definitions",
    "text-style and color-style assignments",
    "reusable text node with no assigned Figma text style",
    "exact review URL",
    "Confirm in the browser that the stylesheet is applied",
    "computed colors and shared text styles"
  ]) assert(workflow.includes(phrase), `workflow contract is missing: ${phrase}`);
  assert(audit.includes("Process correction") && audit.includes("27 pixel Mondai title"), "implementation audit does not record the process correction");
  console.log("G11 OK workflow contract");
}

async function verifyCurrentFooter() {
  const code = `${browserPrelude}
for (const width of [320, 390, 679, 680, 768, 1050, 1159, 1160, 1440]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const footer = document.querySelector('.wide-footer').getBoundingClientRect();
    const relative = (selector) => {
      const box = document.querySelector(selector).getBoundingClientRect();
      return { top: box.top - footer.top, left: box.left - footer.left, right: box.right - footer.left, bottom: box.bottom - footer.top, width: box.width, height: box.height };
    };
    const style = (selector) => getComputedStyle(document.querySelector(selector));
    return {
      footer: { width: footer.width, height: footer.height }, equalizer: relative('.wide-footer-equalizer'),
      tall: relative('.wide-bars-tall'), short: relative('.wide-bars-short'), pitch: relative('.wide-footer-pitch'),
      pitchText: relative('.wide-footer-pitch p'), lockup: relative('.wide-footer-lockup'), lets: relative('.wide-footer-lets'),
      plug: relative('.wide-footer-plug'), connect: relative('.wide-footer-connect'), meta: relative('.wide-footer-meta'),
      location: relative('.wide-location'), contacts: relative('.wide-contact-links'),
      pitchSize: parseFloat(style('.wide-footer-pitch p').fontSize), metaSize: parseFloat(style('.wide-footer-meta').fontSize),
      locationGap: parseFloat(style('.wide-location').rowGap), contactGap: parseFloat(style('.wide-contact-links').rowGap),
      muted: style('.wide-footer-pitch p').color, emphasis: style('.wide-footer-pitch strong').color,
      copy: document.querySelector('.wide-footer-pitch p').textContent.replace(/\\s+/g, ' ').trim(),
      overflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth
    };
  });
  check(value.overflow <= 1, width + ': footer causes document overflow');
  check(value.pitch.bottom <= value.lockup.top + 1, width + ': footer copy overlaps the lockup at ' + value.pitch.bottom + '/' + value.lockup.top);
  check(value.lockup.bottom <= value.meta.top - 20, width + ': footer lockup overlaps metadata');
  check(Math.abs(value.lets.width / value.lets.height - 381.183 / 122.583) <= 0.01, width + ': LETS vector ratio');
  check(Math.abs(value.connect.width / value.connect.height - 728 / 178.746) <= 0.01, width + ': CONNECT vector ratio');
  check(Math.abs(value.metaSize - 14) <= 0.1, width + ': Metadata/14 changed');
  check(Math.abs(value.locationGap - 12) <= 0.1 && Math.abs(value.contactGap - 12) <= 0.1, width + ': metadata row rhythm');
  check(value.copy === 'I’m currently living in Chicago, but *looking for opportunities in NYC.*', width + ': footer copy drift: ' + JSON.stringify(value.copy));
  check(Math.abs(value.pitchSize - 20) <= 0.1, width + ': Heading/20 changed');
  if (width === 1440) {
    const near = (actual, expected, tolerance, label) => check(Math.abs(actual - expected) <= tolerance, label + ': ' + actual);
    near(value.footer.height, 806, 1, 'footer height');
    near(value.equalizer.top, 25, 1, 'equalizer top');
    near(value.tall.height, 134, 1, 'equalizer tall row');
    near(value.short.top - value.tall.bottom, 17, 1, 'equalizer gap');
    near(value.short.height, 63, 1, 'equalizer short row');
    near(value.pitch.left, 40, 1, 'pitch left');
    near(value.pitch.top, 306, 1, 'pitch top');
    near(value.pitchText.width, 477, 1, 'pitch width');
    near(value.pitchSize, 20, 0.1, 'Heading/20 size');
    near(value.lockup.top, 431, 1, 'lockup top');
    near(value.lockup.left, 40, 1, 'lockup left');
    near(value.lockup.right, 1400, 1, 'lockup right');
    near(value.lockup.height, 230.988, 1, 'lockup height');
    near(value.lets.width, 381.183, 1, 'LETS width');
    near(value.lets.height, 122.583, 1, 'LETS height');
    near(value.plug.width, 164.491, 1, 'plug width');
    near(value.plug.height, 230.988, 1, 'plug height');
    near(value.connect.width, 728, 1, 'CONNECT width');
    near(value.connect.height, 178.746, 1, 'CONNECT height');
    near(value.meta.left, 40, 1, 'metadata left');
    near(value.meta.right, 1400, 1, 'metadata right');
    near(value.footer.height - value.meta.bottom, 24, 1, 'metadata bottom');
    check(value.muted === 'rgb(174, 174, 180)' && value.emphasis === 'rgb(242, 241, 248)', 'footer color variables drifted');
  }
}
return 'current footer verified';`;
  await withBrowser(code);
  console.log("G12 OK current footer");
}

async function verifyFigmaStyleFidelity() {
  const code = `${browserPrelude}
const near = (actual, expected, tolerance, label) => check(Math.abs(actual - expected) <= tolerance, label + ': ' + actual);
const textStyle = (item, expected, label) => {
  near(item.size, expected.size, 0.1, label + ' size');
  near(item.leading, expected.leading, 0.2, label + ' leading');
  near(item.tracking, expected.tracking, 0.03, label + ' tracking');
  check(item.weight === expected.weight, label + ' weight: ' + item.weight);
  check(item.family.includes(expected.family), label + ' family: ' + item.family);
};
for (const width of [320, 390, 768, 1050, 1160, 1440]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const readNode = (node) => {
      const style = getComputedStyle(node);
      return {
        family: style.fontFamily, size: parseFloat(style.fontSize), weight: style.fontWeight,
        leading: parseFloat(style.lineHeight), tracking: parseFloat(style.letterSpacing), color: style.color
      };
    };
    const read = (selector) => readNode(document.querySelector(selector));
    return {
      bio: read('.wide-bio'), muted: read('.wide-bio .wide-muted'), relocation: read('.wide-relocation'),
      workMondai: read('.wide-project-mondai .wide-project-title'), workHaven: read('.wide-project-haven .wide-project-title'),
      workLabel: read('.wide-project-label'), workSupport: read('.wide-project-description'), quote: read('.wide-quote'),
      intro: read('.wide-about-intro'), mondaiSupport: read('.wide-mondai-description'), caseTitle: read('.wide-case-title'),
      powers: [...document.querySelectorAll('.wide-power-row p')].map((node) => readNode(node)), overviewLabel: read('.wide-overview-main .wide-overview-label'),
      roleLabel: read('.wide-role-row .wide-overview-label'), overviewCopy: read('.wide-overview-copy'),
      footerPitch: read('.wide-footer-pitch p'), footerMeta: read('.wide-footer-meta')
    };
  });
  const prefix = width + ' ';
  textStyle(value.bio, { family:'Satoshi', size:14, weight:'500', leading:19.6, tracking:0.28 }, prefix + 'Label/14 bio');
  textStyle(value.workMondai, { family:'Satoshi', size:24, weight:'500', leading:31.68, tracking:0.048 }, prefix + 'Heading/24 Mondai');
  textStyle(value.workHaven, { family:'Satoshi', size:24, weight:'500', leading:31.68, tracking:0.048 }, prefix + 'Heading/24 Haven');
  textStyle(value.workLabel, { family:'Space Mono', size:12, weight:'400', leading:13.44, tracking:0.12 }, prefix + 'Metadata/Mono/12');
  textStyle(value.workSupport, { family:'Satoshi', size:14, weight:'500', leading:19.6, tracking:0.28 }, prefix + 'Label/14 work');
  const quoteSize = width < 680 ? 32 : width < 1160 ? 40 : 64;
  textStyle(value.quote, { family:'Satoshi', size:quoteSize, weight:'500', leading:quoteSize * 1.09, tracking:quoteSize * -0.04 }, prefix + 'Heading/64 tier');
  const heading24Size = width < 680 ? 18 : 24;
  textStyle(value.intro, { family:'Satoshi', size:heading24Size, weight:'500', leading:heading24Size * 1.32, tracking:heading24Size * 0.002 }, prefix + 'Heading/24 intro tier');
  const bodySize = width >= 768 && width < 1160 ? 14 : 16;
  const bodyLeading = width >= 768 && width < 1160 ? bodySize * 1.32 : bodySize * 1.4;
  const bodyTracking = bodySize * 0.01;
  textStyle(value.mondaiSupport, { family:'Satoshi', size:bodySize, weight:'500', leading:bodyLeading, tracking:bodyTracking }, prefix + 'Body/16 tier');
  const caseSize = width < 680 ? 24 : width < 1160 ? 32 : 40;
  textStyle(value.caseTitle, { family:'Satoshi', size:caseSize, weight:'500', leading:caseSize * 1.1, tracking:caseSize * -0.02 }, prefix + 'Heading/40 case tier');
  const powerSize = width < 680 ? 28 : width < 1160 ? 34 : 40;
  for (const [index, power] of value.powers.entries()) textStyle(power, { family:'Satoshi', size:powerSize, weight:'500', leading:powerSize * 1.1, tracking:powerSize * -0.02 }, prefix + 'Heading/40 power ' + index + ' tier');
  textStyle(value.overviewCopy, { family:'Satoshi', size:heading24Size, weight:'500', leading:heading24Size * 1.32, tracking:heading24Size * 0.002 }, prefix + 'Heading/24 overview tier');
  textStyle(value.footerPitch, { family:'Satoshi', size:20, weight:'500', leading:26.4, tracking:0.4 }, prefix + 'Heading/20 footer');
  textStyle(value.footerMeta, { family:'Space Mono', size:14, weight:'400', leading:19.6, tracking:0.14 }, prefix + 'Metadata/Mono/14 footer');
  check(value.bio.color === 'rgb(242, 241, 248)' && value.muted.color === 'rgb(174, 174, 180)', prefix + 'bio colors');
  check(value.relocation.color === 'rgb(174, 174, 180)', prefix + 'relocation color');
  check(value.workMondai.color === 'rgb(242, 241, 248)' && value.workHaven.color === 'rgb(232, 231, 238)', prefix + 'work-title colors');
  check(value.workLabel.color === 'rgb(232, 231, 238)' && value.workSupport.color === 'rgb(222, 222, 229)', prefix + 'work colors');
  check(value.quote.color === 'rgb(242, 241, 248)' && value.intro.color === 'rgb(174, 174, 180)', prefix + 'About opening colors');
  check(value.mondaiSupport.color === 'rgb(201, 201, 212)', prefix + 'Body/16 color');
  check(value.caseTitle.color === 'rgb(232, 231, 238)', prefix + 'case color');
  check(value.powers.map((power) => power.color).join('|') === 'rgb(242, 241, 248)|rgb(174, 174, 180)|rgb(123, 123, 134)', prefix + 'superpower colors');
  check(value.overviewLabel.color === 'rgb(232, 231, 238)' && value.roleLabel.color === 'rgb(242, 241, 248)', prefix + 'overview colors');
}
return 'Figma style fidelity verified';`;
  await withBrowser(code);
  console.log("G14 OK Figma style fidelity");
}

async function verifyWorkTitleStyle() {
  const { css } = await sourceFiles();
  assert(!css.includes("27.018px"), "detached Mondai size remains in CSS");
  const code = `${browserPrelude}
for (const width of [320, 390, 768, 1050, 1160, 1440]) {
  await resize(width, width < 680 ? 844 : 900);
  const values = await page.evaluate(() => [...document.querySelectorAll('.wide-project-title')].map((node) => {
    const style = getComputedStyle(node);
    return {
      size: parseFloat(style.fontSize), weight: style.fontWeight, leading: parseFloat(style.lineHeight),
      tracking: parseFloat(style.letterSpacing), family: style.fontFamily, color: style.color
    };
  }));
  check(values.length === 2, width + ': expected two work titles');
  for (const [index, item] of values.entries()) {
    check(Math.abs(item.size - 24) <= 0.1, width + ': title ' + index + ' size ' + item.size);
    check(item.weight === '500', width + ': title ' + index + ' weight ' + item.weight);
    check(Math.abs(item.leading - 31.68) <= 0.2, width + ': title ' + index + ' leading ' + item.leading);
    check(Math.abs(item.tracking - 0.048) <= 0.03, width + ': title ' + index + ' tracking ' + item.tracking);
    check(item.family.includes('Satoshi'), width + ': title ' + index + ' family ' + item.family);
  }
  check(values[0].color === 'rgb(242, 241, 248)', width + ': Mondai title color');
  check(values[1].color === 'rgb(232, 231, 238)', width + ': Haven title color');
}
return 'work title style verified';`;
  await withBrowser(code);
  console.log("G13 OK work title style");
}

async function verifyCurrentWorkFigmaContract() {
  const { html, css } = await sourceFiles();
  assert(html.includes('width="895" height="590"') && html.includes('width="426" height="426"'), "current Figma export dimensions are not declared");
  assert(html.includes('data-figma-node="3671:5299"') && html.includes("case study<br>collection"), "current collection marker is missing");
  assert(css.includes("aspect-ratio: 895 / 590") && css.includes("aspect-ratio: 1"), "current media ratios are not encoded");
  const code = `${browserPrelude}
await resize(1440, 900);
const value = await page.evaluate(() => {
  const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
  const read = (selector) => {
    const node = document.querySelector(selector);
    const style = getComputedStyle(node);
    return { text: node.innerText.trim().replace(/\\s+/g, ' '), size: parseFloat(style.fontSize), weight: style.fontWeight, leading: parseFloat(style.lineHeight), tracking: parseFloat(style.letterSpacing), family: style.fontFamily, color: style.color };
  };
  const images = [...document.querySelectorAll('.wide-project-image')].map((image) => ({ naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, box: image.getBoundingClientRect() }));
  return { images, mondai: read('.wide-project-mondai .wide-project-title'), haven: read('.wide-project-haven .wide-project-title'), marker: read('.wide-project-label'), support: read('.wide-project-description'), leftBracket: rect('.wide-project-label img:first-child'), rightBracket: rect('.wide-project-label img:last-child') };
});
check(value.images[0].naturalWidth === 895 && value.images[0].naturalHeight === 590, 'Mondai export is not 895 by 590');
check(value.images[1].naturalWidth === 426 && value.images[1].naturalHeight === 426, 'Haven export is not 426 square');
check(Math.abs(value.images[0].box.width - 895) <= 1 && Math.abs(value.images[0].box.height - 590) <= 1, 'Mondai reference render drifted');
check(Math.abs(value.images[1].box.width - 426) <= 1 && Math.abs(value.images[1].box.height - 426) <= 1, 'Haven reference render drifted');
for (const title of [value.mondai, value.haven]) {
  check(title.family.includes('Satoshi') && title.size === 24 && title.weight === '500', 'Heading/24 work title drifted');
  check(Math.abs(title.leading - 31.68) <= 0.2 && Math.abs(title.tracking - 0.048) <= 0.03, 'Heading/24 metrics drifted');
}
check(value.mondai.color === 'rgb(242, 241, 248)' && value.haven.color === 'rgb(232, 231, 238)', 'work title color variables drifted');
check(value.marker.text === 'case study collection', 'collection marker copy drifted');
check(value.marker.family.includes('Space Mono') && value.marker.size === 12 && value.marker.weight === '400', 'Metadata/Mono/12 marker drifted');
check(value.marker.color === 'rgb(232, 231, 238)', 'collection marker is not Neutral/100');
check(value.support.family.includes('Satoshi') && value.support.size === 14 && value.support.weight === '500' && value.support.color === 'rgb(222, 222, 229)', 'Label/14 support drifted');
for (const bracket of [value.leftBracket, value.rightBracket]) check(Math.abs(bracket.width - 5) <= 0.1 && Math.abs(bracket.height - 24) <= 0.1, 'collection bracket geometry drifted');
return 'current work Figma contract verified';`;
  await withBrowser(code);
  console.log("G16 OK current work Figma contract");
}

async function verifyResponsiveWorkMediaSystem() {
  const { css } = await sourceFiles();
  assert(css.includes("grid-template-rows: subgrid"), "shared work-card row alignment is not implemented with subgrid");
  const code = `${browserPrelude}
for (const width of [680, 768, 1050, 1199, 1200, 1440, 1920, 2048]) {
  await resize(width, 900);
  const value = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    const grid = rect('.wide-work-grid');
    const mondai = rect('.wide-project-mondai .wide-project-image');
    const haven = rect('.wide-project-haven .wide-project-image');
    const mondaiMeta = rect('.wide-project-mondai .wide-project-meta-frame');
    const havenMeta = rect('.wide-project-haven .wide-project-meta-frame');
    return { grid, mondai, haven, mondaiMeta, havenMeta, display: getComputedStyle(document.querySelector('.wide-work-grid')).display };
  });
  check(value.display === 'grid', width + ': split work layout is not a grid');
  check(Math.abs(value.mondai.width / value.mondai.height - 895 / 590) <= 0.002, width + ': Mondai ratio drifted');
  check(Math.abs(value.haven.width / value.haven.height - 1) <= 0.002, width + ': Haven is not square');
  check(Math.abs(value.mondai.width / value.haven.width - 895 / 426) <= 0.003, width + ': asymmetric column ratio drifted');
  check(Math.abs(value.mondai.bottom - value.haven.bottom) <= 0.05, width + ': media bottoms differ');
  check(Math.abs(value.mondaiMeta.top - value.mondai.bottom - 24) <= 0.1, width + ': Mondai metadata gap drifted');
  check(Math.abs(value.havenMeta.top - value.haven.bottom - 24) <= 0.1, width + ': Haven metadata gap drifted');
  check(Math.abs(value.mondaiMeta.top - value.havenMeta.top) <= 0.05, width + ': metadata baselines differ');
  check(value.grid.left >= -0.5 && value.grid.right <= width + 0.5, width + ': work grid overflows viewport');
}
for (const width of [320, 390]) {
  await resize(width, 844);
  const value = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    return { grid: getComputedStyle(document.querySelector('.wide-work-grid')).display, mondai: rect('.wide-project-mondai .wide-project-image'), haven: rect('.wide-project-haven .wide-project-image'), mondaiCard: rect('.wide-project-mondai'), havenCard: rect('.wide-project-haven') };
  });
  check(value.grid === 'flex', width + ': mobile work layout did not stack');
  check(Math.abs(value.mondai.width / value.mondai.height - 895 / 590) <= 0.002, width + ': mobile Mondai ratio drifted');
  check(Math.abs(value.haven.width / value.haven.height - 1) <= 0.002, width + ': mobile Haven is not square');
  check(value.havenCard.top >= value.mondaiCard.bottom + 71, width + ': mobile card gap drifted');
}
return 'responsive work media system verified';`;
  await withBrowser(code);
  console.log("G17 OK responsive work media system");
}

async function verifyWorkFontResolution() {
  const { css } = await sourceFiles();
  for (const contract of [
    ['satoshi-regular.woff2', 'font-weight: 400'],
    ['satoshi-medium.woff2', 'font-weight: 500'],
    ['satoshi-bold.woff2', 'font-weight: 700'],
    ['space-mono-regular.ttf', 'font-weight: 400']
  ]) assert(css.includes(contract[0]) && css.includes(contract[1]), `font-face contract is missing ${contract[0]}`);
  const code = `${browserPrelude}
await resize(1440, 900);
const value = await page.evaluate(() => {
  const faces = [...document.fonts].map((face) => ({ family: face.family.replace(/[\"']/g, ''), weight: face.weight, style: face.style, status: face.status }));
  const style = (selector) => { const value = getComputedStyle(document.querySelector(selector)); return { family: value.fontFamily, weight: value.fontWeight }; };
  const resources = performance.getEntriesByType('resource').map((entry) => entry.name);
  return { faces, title: style('.wide-project-title'), marker: style('.wide-project-label'), support: style('.wide-project-description'), resources };
});
const loaded = (family, weight) => value.faces.some((face) => face.family === family && face.weight === weight && face.status === 'loaded');
check(loaded('Satoshi', '500'), 'Satoshi Medium face did not load');
check(loaded('Space Mono', '400'), 'Space Mono Regular face did not load');
check(value.title.family.includes('Satoshi') && value.title.weight === '500', 'work title did not resolve to Satoshi Medium');
check(value.support.family.includes('Satoshi') && value.support.weight === '500', 'support did not resolve to Satoshi Medium');
check(value.marker.family.includes('Space Mono') && value.marker.weight === '400', 'marker did not resolve to Space Mono Regular');
check(value.resources.some((url) => url.includes('satoshi-medium.woff2')), 'Satoshi Medium resource was not requested');
check(value.resources.some((url) => url.includes('space-mono-regular.ttf')), 'Space Mono resource was not requested');
return 'work font resolution verified';`;
  await withBrowser(code);
  console.log("G18 OK work font resolution");
}

async function verifyDesignAuditMode() {
  const { html, css, js } = await sourceFiles();
  assert(html.includes('data-color-hex="#F2F1F8"') && html.includes('data-color-hex="#E8E7EE"') && html.includes('data-color-hex="#DEDEE5"'), "audit hexadecimal mappings are incomplete");
  assert(css.includes(".design-audit-panel") && js.includes('params.get("design-audit")'), "design audit mode is not wired");
  const url = await ensureServer();
  const code = `${browserPrelude}
await resize(1440, 900);
const before = await page.evaluate(() => { const box = document.querySelector('.wide-project-mondai .wide-project-image').getBoundingClientRect(); return { width: box.width, height: box.height, panel: document.querySelector('.design-audit-panel') }; });
check(before.panel === null, 'audit panel leaked into production mode');
await page.goto(${JSON.stringify(url + "?design-audit=1")});
await ready();
const initial = await page.evaluate(() => { const box = document.querySelector('.wide-project-mondai .wide-project-image').getBoundingClientRect(); const panel = document.querySelector('.design-audit-panel'); return { width: box.width, height: box.height, display: getComputedStyle(panel).display, text: panel.textContent }; });
check(Math.abs(initial.width - before.width) <= 0.01 && Math.abs(initial.height - before.height) <= 0.01, 'audit mode changed production geometry');
check(initial.display === 'block', 'audit panel is not visible in audit mode');
await page.locator('.wide-project-mondai .wide-project-image').hover();
const media = await page.locator('.design-audit-panel').textContent();
check(media.includes('Mondai media') && media.includes('895:590'), 'audit panel does not report media evidence');
await page.locator('.wide-project-haven .wide-project-title').hover();
const haven = await page.locator('.design-audit-panel').textContent();
check(haven.includes('Haven title') && haven.includes('Heading/24') && haven.includes('Satoshi Medium'), 'audit panel does not report the named font style');
check(haven.includes('Neutral/100') && haven.includes('#E8E7EE'), 'audit panel does not report the hexadecimal color token');
check(haven.includes('Fallback stack') && haven.includes('Font loaded: yes'), 'audit panel does not distinguish the loaded face from the fallback stack');
return 'design audit mode verified';`;
  await withBrowser(code);
  console.log("G19 OK design audit mode");
}

async function verifyFooterAlignmentSystem() {
  const code = `${browserPrelude}
for (const width of [320, 390, 680, 768, 1050, 1160, 1200, 1440, 1920, 2048]) {
  await resize(width, width < 680 ? 844 : 900);
  const value = await page.evaluate(() => {
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    const rects = (selector) => [...document.querySelectorAll(selector)].map((node) => node.getBoundingClientRect());
    const footer = rect('.wide-footer');
    const pitch = rect('.wide-footer-pitch');
    const lets = rect('.wide-footer-lets');
    const meta = rect('.wide-footer-meta');
    const location = rects('.wide-location > *');
    const contact = rects('.wide-contact-links .figma-text');
    const contactRows = rects('.wide-contact-links > *');
    const icons = rects('.wide-contact-links img');
    return { footer, pitch, lets, meta, location, contact, contactRows, icons, scrollWidth: document.documentElement.scrollWidth };
  });
  const near = (actual, expected, tolerance, label) => check(Math.abs(actual - expected) <= tolerance, width + ': ' + label + ' ' + actual);
  near(value.pitch.left, value.lets.left, 0.5, 'pitch and LETS left alignment');
  near(value.pitch.left, value.meta.left, 0.5, 'pitch and metadata left alignment');
  const locationGap = value.location[1].top - value.location[0].bottom;
  const contactGap = value.contact[1].top - value.contact[0].bottom;
  near(locationGap, 12, 0.75, 'location visual text gap');
  near(contactGap, locationGap, 0.75, 'contact visual text gap');
  for (const icon of value.icons) near(icon.height, 13, 0.1, 'contact icon height');
  for (const row of value.contactRows) check(row.height < 14.5, width + ': icon enlarged contact row to ' + row.height);
  check(value.scrollWidth <= width, width + ': footer causes horizontal overflow');
  check(value.meta.left >= value.footer.left - 0.5 && value.meta.right <= value.footer.right + 0.5, width + ': footer metadata leaves footer bounds');
  if (width === 1440) near(value.pitch.left, 40, 0.5, 'Figma footer inset');
}
return 'footer alignment system verified';`;
  await withBrowser(code);
  console.log("G21 OK footer alignment system");
}

async function verifyFullStyleAudit() {
  const { css, html, fullAudit } = await sourceFiles();
  for (const section of ["## Exact matches", "## Corrected drift", "## Intentional responsive differences", "## Remaining differences"]) {
    assert(fullAudit.includes(section), `full audit is missing ${section}`);
  }
  for (const evidence of ["100%, source and computed style verified", "Neutral/550", "fallback stack", "temporary Figma holding frame"]) {
    assert(fullAudit.includes(evidence), `full audit is missing evidence: ${evidence}`);
  }
  assert(css.includes("--portfolio-neutral-550: #7b7b86"), "Neutral/550 implementation token is missing");
  assert(html.includes('src="assets/superpower-orb.svg"'), "Superpowers circle asset is missing");
  const code = `${browserPrelude}
await page.evaluate(async () => {
  await Promise.all([
    document.fonts.load('400 16px Satoshi', 'Audit'), document.fonts.load('500 16px Satoshi', 'Audit'),
    document.fonts.load('700 16px Satoshi', 'Audit'), document.fonts.load('400 16px "Space Mono"', 'Audit')
  ]);
});
for (const width of [320, 768, 1440]) {
  await resize(width, width === 320 ? 844 : 900);
  const value = await page.evaluate(() => {
    const style = (selector) => {
      const result = getComputedStyle(document.querySelector(selector));
      return { family: result.fontFamily, size: parseFloat(result.fontSize), weight: result.fontWeight, leading: parseFloat(result.lineHeight), tracking: parseFloat(result.letterSpacing), color: result.color, borderTop: result.borderTopWidth, borderBottom: result.borderBottomWidth };
    };
    const rect = (selector) => document.querySelector(selector).getBoundingClientRect();
    return {
      workTitle: style('.wide-project-title'), marker: style('.wide-project-label'), support: style('.wide-project-description'),
      quote: style('.wide-quote'), intro: style('.wide-about-intro'), body: style('.wide-mondai-description'), caseTitle: style('.wide-case-title'),
      powers: [...document.querySelectorAll('.wide-power-row p')].map((node) => { const result = getComputedStyle(node); return { family: result.fontFamily, weight: result.fontWeight, color: result.color }; }),
      overview: style('.wide-overview-main'), role: style('.wide-role-row'), footerPitch: style('.wide-footer-pitch p'), footerMeta: style('.wide-footer-meta'),
      orb: rect('.wide-power-orb'),
      fontChecks: {
        satoshi400: document.fonts.check('400 16px "Satoshi"'), satoshi500: document.fonts.check('500 16px "Satoshi"'),
        satoshi700: document.fonts.check('700 16px "Satoshi"'), spaceMono400: document.fonts.check('400 16px "Space Mono"')
      },
      resources: performance.getEntriesByType('resource').map((entry) => entry.name)
    };
  });
  check(value.workTitle.family.includes('Satoshi') && value.workTitle.weight === '500' && value.workTitle.size === 24, width + ': work title contract');
  check(value.marker.family.includes('Space Mono') && value.marker.weight === '400' && value.marker.size === 12, width + ': marker contract');
  check(value.support.family.includes('Satoshi') && value.support.weight === '500' && value.support.size === 14, width + ': support contract');
  check(value.footerPitch.size === 20 && value.footerPitch.weight === '500', width + ': footer Heading/20 contract');
  check(value.footerMeta.size === 14 && value.footerMeta.weight === '400' && value.footerMeta.family.includes('Space Mono'), width + ': footer metadata contract');
  check(value.powers.map((power) => power.color).join('|') === 'rgb(242, 241, 248)|rgb(174, 174, 180)|rgb(123, 123, 134)', width + ': Superpowers color contract');
  check(value.overview.borderTop === '1px' && value.overview.borderBottom === '0px', width + ': Overview rule contract');
  check(value.role.borderTop === '1px' && value.role.borderBottom === '0px', width + ': Current role rule contract');
  if (width === 1440) check(Math.abs(value.orb.width - 222) <= 0.1 && Math.abs(value.orb.height - 222) <= 0.1, 'Superpowers circle geometry');
  check(Object.values(value.fontChecks).every(Boolean), width + ': one or more local font faces failed document.fonts.check');
  for (const file of ['satoshi-medium.woff2', 'satoshi-bold.woff2', 'space-mono-regular.ttf']) check(value.resources.some((url) => url.includes(file)), width + ': active font resource was not loaded ' + file);
}
return 'full style audit verified';`;
  await withBrowser(code);
  console.log("G22 OK full style audit report");
}

async function captureFullFidelityAudit() {
  const code = `${browserPrelude}
for (const [name, width, height] of [
  ['320', 320, 844], ['390', 390, 844], ['680', 680, 900], ['768', 768, 1024], ['1050', 1050, 900],
  ['1160', 1160, 900], ['1200', 1200, 900], ['1440', 1440, 900], ['1920', 1920, 1080], ['2048', 2048, 1080]
]) {
  await resize(width, height);
  await page.screenshot({ path: 'output/playwright/full-style-audit/homepage-' + name + '.png', fullPage: true, scale: 'css' });
  const footerLocator = page.locator('.wide-footer');
  await footerLocator.scrollIntoViewIfNeeded();
  const footer = await footerLocator.boundingBox();
  await page.screenshot({ path: 'output/playwright/full-style-audit/footer-' + name + '.png', clip: { x: 0, y: footer.y, width, height: footer.height }, scale: 'css' });
  const powersLocator = page.locator('.wide-power-list');
  await powersLocator.scrollIntoViewIfNeeded();
  const powers = await powersLocator.boundingBox();
  await page.screenshot({ path: 'output/playwright/full-style-audit/superpowers-' + name + '.png', clip: { x: 0, y: powers.y, width, height: powers.height }, scale: 'css' });
}
return 'full fidelity audit captures complete';`;
  await withBrowser(code);
  console.log("G23 OK full fidelity audit captures");
}

async function captureResponsiveWorkAudit() {
  const code = `${browserPrelude}
for (const [name, width, height] of [
  ['320', 320, 844], ['390', 390, 844], ['680', 680, 900], ['768', 768, 1024], ['1050', 1050, 900],
  ['1200', 1200, 900], ['1440', 1440, 900], ['1920', 1920, 1080], ['2048', 2048, 1080]
]) {
  await resize(width, height);
  await page.evaluate(() => document.activeElement?.blur());
  await page.locator('.wide-work').screenshot({ path: 'output/playwright/work-responsive/work-' + name + '.png' });
}
return 'responsive work audit captures complete';`;
  await withBrowser(code);
  console.log("G20 OK responsive work audit captures");
}

async function captureFigmaAudit() {
  const code = `${browserPrelude}
for (const [name, width, height] of [
  ['320', 320, 844], ['390', 390, 844], ['768', 768, 1024],
  ['1050', 1050, 900], ['1160', 1160, 900], ['1440', 1440, 900]
]) {
  await resize(width, height);
  await page.screenshot({ path: 'output/playwright/figma-audit/homepage-' + name + '.png', fullPage: true, scale: 'css' });
  await page.evaluate(() => { document.querySelector('.wide-sticky-header').style.visibility = 'hidden'; });
  for (const [section, selector] of [
    ['work', '.wide-work'], ['about', '.wide-about-opening'], ['mondai', '.wide-mondai-header'], ['footer', '.wide-footer']
  ]) await page.locator(selector).screenshot({ path: 'output/playwright/figma-audit/' + section + '-' + name + '.png' });
}
return 'Figma audit screenshots captured';`;
  await withBrowser(code);
  console.log("G15 OK Figma audit captures");
}

const verifiers = {
  "asset-delivery": verifyAssetDelivery,
  "figma-text-inventory": verifyFigmaTextInventory,
  "figma-token-contract": verifyFigmaTokenContract,
  "token-usage": verifyTokenUsage,
  "workflow-contract": verifyWorkflowContract,
  "current-footer": verifyCurrentFooter,
  "work-title-style": verifyWorkTitleStyle,
  "figma-style-fidelity": verifyFigmaStyleFidelity,
  "capture-figma-audit": captureFigmaAudit,
  "work-figma-contract": verifyCurrentWorkFigmaContract,
  "work-media-system": verifyResponsiveWorkMediaSystem,
  "work-font-resolution": verifyWorkFontResolution,
  "design-audit-mode": verifyDesignAuditMode,
  "capture-responsive-work": captureResponsiveWorkAudit,
  "footer-alignment-system": verifyFooterAlignmentSystem,
  "full-style-audit": verifyFullStyleAudit,
  "capture-full-fidelity": captureFullFidelityAudit,
  structure: verifyStructure,
  wide: verifyWide,
  sweep: verifySweepVc,
  sections: verifySections,
  menu: verifyMenu,
  interaction: verifyInteractionVc,
  resilience: verifyResilience,
  browsers: verifyBrowsersVc,
  records: verifyRecordsVc,
  "display-type": verifyDisplayType,
  "type-scale": verifyTypeScale,
  "mondai-type": verifyMondaiType,
  "footer-type": verifyFooterType,
  "typography-regression": verifyTypographyRegression,
  "type-records": verifyTypeRecords,
  master: verifyMasterVc,
  assets: verifyAssetsVc,
  "work-assets": verifyAssetsVc,
  "work-master": verifyWorkMaster,
  "work-responsive": verifyWorkResponsive,
  "work-regression": verifyWorkRegression,
  "capture-work": captureWorkScreenshots,
  "work-records": verifyWorkRecords,
  "footer-fidelity": verifyFooterFidelity,
  "footer-responsive": verifyFooterResponsive,
  "mondai-fidelity": verifyMondaiFidelity,
  "display-fidelity": verifyDisplayFidelity,
  "mobile-margins": verifyMobileMargins,
  "fidelity-regression": verifyFidelityRegression,
  "capture-fidelity": captureFidelityScreenshots,
  "fidelity-records": verifyFidelityRecords,
  "work-counterparts": verifyWorkCounterparts,
  "work-metadata-alignment": verifyWorkMetadataAlignment,
  "footer-lockup-fidelity": verifyFooterLockupFidelity,
  "footer-copy-rhythm": verifyFooterCopyRhythm,
  "proportional-display": verifyProportionalDisplay,
  "mondai-responsive-header": verifyMondaiResponsiveHeaderOwnerReview,
  "owner-review-regression": verifyOwnerReviewRegression,
  "capture-owner-review": captureOwnerReviewScreenshots,
  "owner-review-records": verifyOwnerReviewRecords,
  footer: verifyFooterVc,
  sticky: verifySticky,
  "hero-transition": verifyHeroTransition,
  "tablet-hero": verifyTabletHero,
  quote: verifyQuote,
  "mondai-header": verifyMondaiHeader,
  "card-hover": verifyCardHover,
  corrections: verifyCorrections,
  capture: captureScreenshots,
  "capture-corrections": captureCorrections,
  "capture-typography": captureTypography
};

assert(verifiers[mode], `Unknown verification mode: ${mode || "missing"}`);
try {
  await verifiers[mode]();
} finally {
  if (server) await new Promise((resolve) => server.close(resolve));
}
