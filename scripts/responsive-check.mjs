#!/usr/bin/env node
/**
 * Responsive homepage verification harness.
 *
 * Subcommands:
 *   sweep     continuous width sweep plus device viewports, layout defect scan
 *   regress   compare canonical page geometry with the accepted wide study
 *   a11y      keyboard order, focus visibility, reduced target and zoom checks
 *   menu      full-screen menu semantics, focus management and scroll lock
 *   zoom      200 percent browser zoom equivalent widths
 *   sticky    sticky header actually tracks page scroll
 *   visual    full-page pixel diff against the accepted study
 *   measure   characters per line for every named text block
 *   capture   write screenshots for visual review
 *
 * Each subcommand prints one decisive success token and exits non-zero on
 * failure so it can be used as an unlazy CHECK oracle.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { execSync } from "node:child_process";

import { serveDirectory } from "./lib/serve.mjs";
import {
  COLLECT_DEFECTS,
  COLLECT_GEOMETRY,
  DEVICE_VIEWPORTS,
  FREEZE_CLOCK,
  INTENTIONAL_OVERFLOW,
  REGRESSION_PROBES,
  SWEEP_WIDTHS
} from "./lib/probe.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const SITE = join(ROOT, "site");

function loadPlaywright() {
  const require = createRequire(import.meta.url);
  try {
    return require("playwright");
  } catch {
    const globalRoot = execSync("npm root -g", { encoding: "utf8" }).trim();
    return createRequire(join(globalRoot, "noop.js"))("playwright");
  }
}

const { chromium } = loadPlaywright();

const args = process.argv.slice(2);
const command = args[0] || "sweep";
const flag = (name, fallback = null) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};
const has = (name) => args.includes(`--${name}`);

const PAGE = flag("page", "index.html");
const OUT_DIR = resolve(flag("out", join(ROOT, ".unlazy", "homepage-responsive", "captures")));

async function withBrowser(run) {
  const server = await serveDirectory(SITE);
  const browser = await chromium.launch();
  try {
    return await run({ browser, origin: server.origin });
  } finally {
    await browser.close();
    await server.close();
  }
}

async function openPage(browser, origin, { width, height, deviceScaleFactor = 1, page = PAGE }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor,
    reducedMotion: "reduce"
  });
  await context.addInitScript(FREEZE_CLOCK);
  const tab = await context.newPage();
  const consoleErrors = [];
  tab.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  tab.on("pageerror", (error) => consoleErrors.push(String(error && error.message)));
  await tab.goto(`${origin}/${page}`, { waitUntil: "load" });
  await tab.evaluate(() => document.fonts.ready);
  await tab.waitForTimeout(60);
  return { context, tab, consoleErrors };
}

function report(label, failures, total) {
  if (failures.length) {
    console.log(`\n${label} FAIL ${failures.length} defect group(s)`);
    for (const line of failures) console.log(`  ${line}`);
    process.exitCode = 1;
    return false;
  }
  console.log(`${label} OK ${total}`);
  return true;
}

/* ------------------------------------------------------------------ sweep */

async function runSweep() {
  const viewports = [
    ...SWEEP_WIDTHS.map((width) => ({ name: `w${width}`, width, height: 900 })),
    ...DEVICE_VIEWPORTS
  ];
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const viewport of viewports) {
      const { context, tab, consoleErrors } = await openPage(browser, origin, viewport);
      const defects = await tab.evaluate(
        ([source, allow]) => new Function(`return (${source})`)()(allow),
        [COLLECT_DEFECTS, INTENTIONAL_OVERFLOW]
      );
      for (const defect of defects) {
        failures.push(`${viewport.name} (${viewport.width}x${viewport.height}) ${defect.kind} ${defect.selector} :: ${defect.detail}`);
      }
      for (const error of consoleErrors) {
        failures.push(`${viewport.name} console-error :: ${error}`);
      }
      await context.close();
    }
  });
  return report("SWEEP", failures, `${viewports.length} viewports clean`);
}

/* --------------------------------------------------------------- regress */

async function runRegress() {
  const widths = [1440, 1512, 1600, 1728, 1920, 2048];
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const width of widths) {
      const canonicalProbes = REGRESSION_PROBES.map((p) => ({ name: p.name, selector: p.canonical }));
      const studyProbes = REGRESSION_PROBES.map((p) => ({ name: p.name, selector: p.study }));

      const collect = async (pageName, probes) => {
        const { context, tab } = await openPage(browser, origin, {
          width, height: 900, page: pageName
        });
        const data = await tab.evaluate(
          ([source, list]) => new Function(`return (${source})`)()(list),
          [COLLECT_GEOMETRY, probes]
        );
        await context.close();
        return data;
      };

      const mine = await collect(PAGE, canonicalProbes);
      const theirs = await collect("homepage-wide-study.html", studyProbes);

      for (const probe of REGRESSION_PROBES) {
        const a = mine[probe.name];
        const b = theirs[probe.name];
        if (!b) {
          failures.push(`${width} ${probe.name} missing in study (${probe.study})`);
          continue;
        }
        if (!a) {
          failures.push(`${width} ${probe.name} missing in canonical (${probe.canonical})`);
          continue;
        }
        for (const key of ["x", "y", "width", "height"]) {
          if (Math.abs(a[key] - b[key]) > 0.6) {
            failures.push(
              `${width} ${probe.name}.${key} canonical ${a[key]} vs study ${b[key]}`
            );
          }
        }
        if (a.fontSize !== b.fontSize) {
          failures.push(`${width} ${probe.name}.fontSize canonical ${a.fontSize} vs study ${b.fontSize}`);
        }
      }
    }
  });
  return report("REGRESS", failures, `${widths.length} widths match the accepted study`);
}

/* ------------------------------------------------------------------ a11y */

async function runA11y() {
  const viewports = [
    { name: "mobile", width: 390, height: 844 },
    { name: "tablet", width: 768, height: 1024 },
    { name: "desktop", width: 1440, height: 900 }
  ];
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const viewport of viewports) {
      const { context, tab } = await openPage(browser, origin, viewport);

      const domOrder = await tab.evaluate(() =>
        Array.from(document.querySelectorAll("a[href], button"))
          .filter((el) => {
            const style = getComputedStyle(el);
            if (style.display === "none" || style.visibility === "hidden") return false;
            if (el.closest("[hidden]")) return false;
            return el.getBoundingClientRect().width > 0;
          })
          .map((el) => el.dataset.probe || el.id || el.textContent.trim().slice(0, 24))
      );

      const tabOrder = [];
      await tab.evaluate(() => document.body.focus());
      for (let i = 0; i < domOrder.length + 2; i += 1) {
        await tab.keyboard.press("Tab");
        const current = await tab.evaluate(() => {
          const el = document.activeElement;
          if (!el || el === document.body) return null;
          if (!el.matches("a[href], button")) return null;
          const style = getComputedStyle(el);
          const outline = parseFloat(style.outlineWidth) || 0;
          const hasRing = outline > 0 && style.outlineStyle !== "none";
          return {
            label: el.dataset.probe || el.id || el.textContent.trim().slice(0, 24),
            focusRing: hasRing || style.boxShadow !== "none"
          };
        });
        if (!current) continue;
        if (tabOrder.some((item) => item.label === current.label)) continue;
        tabOrder.push(current);
      }

      const seen = tabOrder.map((item) => item.label);
      if (seen.join("|") !== domOrder.join("|")) {
        failures.push(`${viewport.name} tab order ${seen.join(" > ")} does not match DOM ${domOrder.join(" > ")}`);
      }
      for (const item of tabOrder) {
        if (!item.focusRing) failures.push(`${viewport.name} no visible focus ring on ${item.label}`);
      }

      await context.close();
    }
  });
  return report("A11Y", failures, `${viewports.length} viewports keyboard clean`);
}

/* ------------------------------------------------------------------ menu */

async function runMenu() {
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    const { context, tab } = await openPage(browser, origin, { width: 390, height: 844 });

    const toggle = tab.locator(".menu-toggle");
    if (!(await toggle.isVisible())) {
      failures.push("menu toggle is not visible at 390 pixels");
      await context.close();
      return;
    }

    if ((await toggle.getAttribute("aria-expanded")) !== "false") {
      failures.push("closed toggle does not report aria-expanded=false");
    }

    await toggle.click();
    await tab.waitForTimeout(60);

    const openState = await tab.evaluate(() => {
      const menu = document.querySelector("#site-menu");
      const toggleEl = document.querySelector(".menu-toggle");
      return {
        hidden: menu.hasAttribute("hidden"),
        expanded: toggleEl.getAttribute("aria-expanded"),
        bodyLocked: getComputedStyle(document.body).overflow,
        focusInside: menu.contains(document.activeElement),
        links: menu.querySelectorAll("a[href]").length
      };
    });
    if (openState.hidden) failures.push("menu stays hidden after the toggle is pressed");
    if (openState.expanded !== "true") failures.push("open toggle does not report aria-expanded=true");
    if (openState.bodyLocked !== "hidden") failures.push(`page scroll is not locked while open (overflow ${openState.bodyLocked})`);
    if (!openState.focusInside) failures.push("focus does not move into the open menu");
    if (openState.links < 3) failures.push(`open menu exposes ${openState.links} links, expected at least 3`);

    // Focus stays trapped across a full cycle.
    const cycle = [];
    for (let i = 0; i < openState.links + 4; i += 1) {
      await tab.keyboard.press("Tab");
      cycle.push(await tab.evaluate(() =>
        document.querySelector("#site-menu").contains(document.activeElement)
      ));
    }
    if (cycle.some((inside) => inside === false)) {
      failures.push("focus escapes the open menu while tabbing forward");
    }
    await tab.keyboard.press("Shift+Tab");
    const backInside = await tab.evaluate(() =>
      document.querySelector("#site-menu").contains(document.activeElement)
    );
    if (!backInside) failures.push("focus escapes the open menu while tabbing backward");

    await tab.keyboard.press("Escape");
    await tab.waitForTimeout(60);
    const closedState = await tab.evaluate(() => {
      const menu = document.querySelector("#site-menu");
      const toggleEl = document.querySelector(".menu-toggle");
      return {
        hidden: menu.hasAttribute("hidden"),
        expanded: toggleEl.getAttribute("aria-expanded"),
        bodyLocked: getComputedStyle(document.body).overflow,
        focusOnToggle: document.activeElement === toggleEl
      };
    });
    if (!closedState.hidden) failures.push("Escape does not close the menu");
    if (closedState.expanded !== "false") failures.push("closed toggle does not reset aria-expanded");
    if (closedState.bodyLocked === "hidden") failures.push("page scroll stays locked after the menu closes");
    if (!closedState.focusOnToggle) failures.push("focus does not return to the toggle after closing");

    // Selecting a menu link closes the menu.
    await toggle.click();
    await tab.waitForTimeout(60);
    await tab.locator("#site-menu a[href]").first().click();
    await tab.waitForTimeout(80);
    const afterLink = await tab.evaluate(() =>
      document.querySelector("#site-menu").hasAttribute("hidden")
    );
    if (!afterLink) failures.push("choosing a menu link leaves the menu open");

    await context.close();

    // The toggle must not appear once the desktop navigation fits.
    const wide = await openPage(browser, origin, { width: 1440, height: 900 });
    const wideState = await wide.tab.evaluate(() => {
      const toggleEl = document.querySelector(".menu-toggle");
      const nav = document.querySelector(".site-navigation");
      return {
        toggleShown: toggleEl ? getComputedStyle(toggleEl).display !== "none" : false,
        navShown: nav ? getComputedStyle(nav).display !== "none" : false
      };
    });
    if (wideState.toggleShown) failures.push("menu toggle is still shown at 1440 pixels");
    if (!wideState.navShown) failures.push("desktop navigation is hidden at 1440 pixels");
    await wide.context.close();
  });
  return report("MENU", failures, "open, trap, Escape, link dismiss and desktop swap verified");
}

/* ------------------------------------------------------------------ zoom */

async function runZoom() {
  // 200 percent browser zoom halves the CSS pixel width of the layout
  // viewport. These pairs are the layout equivalent of zooming each device.
  const cases = [
    { name: "1280-at-200", width: 640, height: 360 },
    { name: "1440-at-200", width: 720, height: 400 },
    { name: "1024-at-200", width: 512, height: 384 },
    { name: "390-at-200", width: 195, height: 422 }
  ];
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const viewport of cases) {
      // 195 is below the supported floor: clamp to the 320 support target.
      const width = Math.max(viewport.width, 320);
      const { context, tab, consoleErrors } = await openPage(browser, origin, {
        width, height: viewport.height, deviceScaleFactor: 2
      });
      const defects = await tab.evaluate(
        ([source, allow]) => new Function(`return (${source})`)()(allow),
        [COLLECT_DEFECTS, INTENTIONAL_OVERFLOW]
      );
      for (const defect of defects) {
        failures.push(`${viewport.name} (${width}px) ${defect.kind} ${defect.selector} :: ${defect.detail}`);
      }
      for (const error of consoleErrors) failures.push(`${viewport.name} console-error :: ${error}`);
      await context.close();
    }
  });
  return report("ZOOM", failures, `${cases.length} zoom equivalents clean`);
}

/* ---------------------------------------------------------------- sticky */

async function runSticky() {
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const width of [390, 768, 1440, 1920]) {
      const { context, tab } = await openPage(browser, origin, { width, height: 800 });
      const before = await tab.evaluate(() =>
        document.querySelector(".site-header").getBoundingClientRect().top
      );
      await tab.evaluate(() => window.scrollTo(0, 2400));
      await tab.waitForTimeout(80);
      const after = await tab.evaluate(() =>
        document.querySelector(".site-header").getBoundingClientRect().top
      );
      if (Math.abs(after - before) > 2) {
        failures.push(`${width} header top moved from ${before.toFixed(1)} to ${after.toFixed(1)} after scrolling`);
      }
      await context.close();
    }
  });
  return report("STICKY", failures, "header holds position at 390, 768, 1440 and 1920");
}

/* --------------------------------------------------------------- capture */

async function runCapture() {
  const widths = flag("widths")
    ? flag("widths").split(",").map((value) => Number(value.trim()))
    : [320, 390, 430, 600, 768, 834, 1024, 1194, 1199, 1200, 1440, 1728, 1920, 2048];
  mkdirSync(OUT_DIR, { recursive: true });
  const written = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const width of widths) {
      const { context, tab } = await openPage(browser, origin, { width, height: 900 });
      const file = join(OUT_DIR, `page-${width}.png`);
      await tab.screenshot({ path: file, fullPage: true });
      written.push(file);
      await context.close();
    }
    if (has("menu-open")) {
      const { context, tab } = await openPage(browser, origin, { width: 390, height: 844 });
      await tab.locator(".menu-toggle").click();
      await tab.waitForTimeout(120);
      const file = join(OUT_DIR, "menu-open-390.png");
      await tab.screenshot({ path: file });
      written.push(file);
      await context.close();
    }
  });
  console.log(`CAPTURE OK ${written.length} files in ${OUT_DIR}`);
  writeFileSync(join(OUT_DIR, "index.json"), JSON.stringify(written, null, 2));
  return true;
}

/* ---------------------------------------------------------------- visual */

/**
 * Full-page pixel comparison against the accepted study. The only difference
 * allowed is the navigation band, where a genuinely sticky header is promoted
 * to its own compositing layer and its glyphs lose subpixel antialiasing.
 */
async function runVisual() {
  const widths = [1440, 1920];
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const width of widths) {
      const shoot = async (pageName, navSelector) => {
        const { context, tab } = await openPage(browser, origin, {
          width, height: 900, page: pageName
        });
        const buffer = await tab.screenshot({ fullPage: true });
        const height = await tab.evaluate(() => document.documentElement.scrollHeight);
        // The allowed band is the navigation's own box, measured on the page,
        // rather than a hand-picked rectangle.
        const nav = await tab.evaluate((selector) => {
          const el = document.querySelector(selector);
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return { minX: r.left, maxX: r.right, minY: r.top, maxY: r.bottom };
        }, navSelector);
        await context.close();
        return { data: `data:image/png;base64,${buffer.toString("base64")}`, height, nav };
      };
      const mine = await shoot(PAGE, ".site-navigation");
      const theirs = await shoot("homepage-wide-study.html", ".wide-navigation");

      if (!mine.nav || !theirs.nav) {
        failures.push(`${width} could not measure the navigation box on both pages`);
        continue;
      }
      const ALLOWED = {
        minX: Math.min(mine.nav.minX, theirs.nav.minX) - 2,
        maxX: Math.max(mine.nav.maxX, theirs.nav.maxX) + 2,
        minY: Math.min(mine.nav.minY, theirs.nav.minY) - 2,
        maxY: Math.max(mine.nav.maxY, theirs.nav.maxY) + 2
      };

      if (mine.height !== theirs.height) {
        failures.push(`${width} page height ${mine.height} vs study ${theirs.height}`);
      }

      const context = await browser.newContext();
      const tab = await context.newPage();
      const result = await tab.evaluate(async ([a, b]) => {
        const load = (src) => new Promise((ok, no) => {
          const image = new Image();
          image.onload = () => ok(image);
          image.onerror = no;
          image.src = src;
        });
        const [ia, ib] = await Promise.all([load(a), load(b)]);
        const W = Math.min(ia.width, ib.width);
        const H = Math.min(ia.height, ib.height);
        const pixels = (image) => {
          const canvas = document.createElement("canvas");
          canvas.width = W;
          canvas.height = H;
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          ctx.drawImage(image, 0, 0);
          return ctx.getImageData(0, 0, W, H).data;
        };
        const pa = pixels(ia);
        const pb = pixels(ib);
        const outside = [];
        let total = 0;
        for (let y = 0; y < H; y += 1) {
          for (let x = 0; x < W; x += 1) {
            const i = (y * W + x) * 4;
            if (Math.abs(pa[i] - pb[i]) > 8 ||
                Math.abs(pa[i + 1] - pb[i + 1]) > 8 ||
                Math.abs(pa[i + 2] - pb[i + 2]) > 8) {
              total += 1;
              outside.push({ x, y });
            }
          }
        }
        return { W, H, total, outside: outside.slice(0, 20000) };
      }, [mine.data, theirs.data]);
      await context.close();

      const stray = result.outside.filter((point) =>
        point.x < ALLOWED.minX || point.x > ALLOWED.maxX ||
        point.y < ALLOWED.minY || point.y > ALLOWED.maxY);
      if (stray.length) {
        const sample = stray.slice(0, 5).map((p) => `(${p.x},${p.y})`).join(" ");
        failures.push(
          `${width} ${stray.length} differing pixels outside the navigation band, first ${sample}`
        );
      }
    }
  });
  return report("VISUAL", failures, `${widths.length} widths differ only in the navigation band`);
}

/* --------------------------------------------------------------- measure */

/** Characters per line for every block the specification names. */
async function runMeasure() {
  const MIN = 22;
  const MAX = 72;
  const targets = [
    [".hero-bio", "biography"],
    ["#mondai-card .project-description", "card description"],
    [".mondai-description", "Mondai description"],
    [".about-intro", "intro"],
    [".power-row:nth-child(1) p", "superpower statement"],
    [".overview-main .overview-copy p", "Overview copy"],
    [".role-row .overview-copy", "Current role copy"]
  ];
  const widths = [320, 390, 480, 600, 768, 900, 1024, 1120, 1200, 1440, 1920];
  const failures = [];
  await withBrowser(async ({ browser, origin }) => {
    for (const width of widths) {
      const { context, tab } = await openPage(browser, origin, { width, height: 900 });
      const rows = await tab.evaluate((list) => list.map(([selector, label]) => {
        const el = document.querySelector(selector);
        if (!el) return { label, missing: true };
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = [...range.getClientRects()].filter((r) => r.height > 1 && r.width > 1);
        const tops = [...new Set(rects.map((r) => Math.round(r.top)))];
        const lines = Math.max(1, tops.length);
        const text = el.textContent.replace(/\s+/g, " ").trim();
        return { label, perLine: Math.round(text.length / lines), lines };
      }), targets);
      for (const row of rows) {
        if (row.missing) {
          failures.push(`${width} ${row.label} not found`);
          continue;
        }
        if (row.perLine < MIN || row.perLine > MAX) {
          failures.push(
            `${width} ${row.label} measures ${row.perLine} characters per line over ${row.lines} line(s), outside ${MIN} to ${MAX}`
          );
        }
      }
      await context.close();
    }
  });
  return report("MEASURE", failures, `${widths.length} widths keep every block between ${MIN} and ${MAX} characters per line`);
}

/* ------------------------------------------------------------------ main */

const commands = {
  sweep: runSweep,
  regress: runRegress,
  a11y: runA11y,
  menu: runMenu,
  zoom: runZoom,
  sticky: runSticky,
  visual: runVisual,
  measure: runMeasure,
  capture: runCapture
};

const run = commands[command];
if (!run) {
  console.error(`unknown command "${command}". Use one of: ${Object.keys(commands).join(", ")}`);
  process.exit(2);
}

run().catch((error) => {
  console.error(`${command.toUpperCase()} ERROR ${error && error.stack ? error.stack : error}`);
  process.exit(1);
});
