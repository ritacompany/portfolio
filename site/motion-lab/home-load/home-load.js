// Home load, preview only (his ask, 10 Nov; reference sethlukin.com). Moves into site/js on his yes.
// Spec: docs/motion/home-load/style_guide.md and state_list.md. Pairs with home-load.css.
//   Hold       about a second of black with only the nav, as the reference opens.
//   Small text the lede, the location and (phones) Contact fade in together.
//   Name       CHDWCK in two beats: CHD rises into place (ease in), then WCK (ease out), each fading from 0.
//   Panel      sliders for the values he may tune, saved in this browser only, and Replay.
// Acts on the hero only, once per load. Home motion (home-motion.js) owns everything below the hero and
// never animates these elements, so the two do not meet.
(() => {
  const home = document.querySelector(".home");
  const hero = home && home.querySelector(".hero");
  if (!hero) return;
  const root = document.documentElement;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const done = () => { root.classList.add("hl-done"); root.classList.remove("hl-run"); };
  if (reduced || !Element.prototype.animate) return done();

  // The reference's values (Framer appear config on sethlukin.com). Times in ms from navigation start.
  const DEFAULTS = {
    hold: 1000,    // black hold before the small text (reference 1.0 s)
    nameAfter: 200, // CHD starts this long after the small text (reference 1.2 s)
    wordGap: 400,  // WCK starts this long after CHD (reference 1.6 s)
    dur: 400,      // every beat (reference 0.4 s)
    rise: 0.83,    // of the word's height (reference 150 px on 180 px letters)
  };
  const KEY = "hl-values";
  let V = { ...DEFAULTS };
  try { V = { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) || "{}") }; } catch {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(V)); } catch {} };

  const EASE_TEXT = "cubic-bezier(0.44, 0, 0.56, 1)";
  const EASE_FIRST = "cubic-bezier(0.5, 0, 0.88, 0.77)";
  const EASE_SECOND = "cubic-bezier(0, 0.72, 0.56, 1)";

  const small = [".hero__lede", ".hero__where", ".hero__contact"].map((s) => hero.querySelector(s)).filter(Boolean);
  const img = hero.querySelector(".hero__wordmark");
  const vertical = hero.querySelector(".hero__vertical");
  const name = hero.querySelector(".hero__name");
  root.classList.add("hl-run");

  // ---- The wordmark as two halves. The image is one path; its first four outlines are C, H and D (both
  //      of D's), the last three W, C and K. Drawn as an SVG over the image only while the load plays.
  const NS = "http://www.w3.org/2000/svg";
  let mark = null, halves = [];
  const buildMark = async () => {
    if (!img || mark) return;
    try {
      const text = await (await fetch(img.currentSrc || img.src)).text();
      const d = text.match(/ d="([^"]+)"/)[1];
      const fill = (text.match(/fill="(#[0-9A-Fa-f]{3,8})"/) || [, "#F2F1F8"])[1];
      const vb = (text.match(/viewBox="([^"]+)"/) || [, "0 0 1440 290"])[1];
      const parts = d.split(/(?=M)/).filter((s) => s.trim());
      if (parts.length !== 7) return;
      mark = document.createElementNS(NS, "svg");
      mark.setAttribute("viewBox", vb);
      mark.setAttribute("aria-hidden", "true");
      mark.classList.add("hl-mark");
      halves = [parts.slice(0, 4), parts.slice(4)].map((p) => {
        const g = document.createElementNS(NS, "g"), path = document.createElementNS(NS, "path");
        path.setAttribute("d", p.join("")); path.setAttribute("fill", fill);
        g.append(path); mark.append(g); return g;
      });
    } catch { mark = null; }
  };
  const placeMark = () => {
    if (!mark || !img) return;
    if (getComputedStyle(name).position === "static") name.style.position = "relative";
    Object.assign(mark.style, { left: img.offsetLeft + "px", top: img.offsetTop + "px", width: img.offsetWidth + "px", height: img.offsetHeight + "px" });
    if (!mark.isConnected) img.after(mark);
  };

  let anims = [];
  const stop = () => { anims.forEach((a) => a.cancel()); anims = []; };
  const finish = () => {
    stop();
    if (mark) mark.remove();
    if (name) name.style.position = "";
    done();
  };

  const play = (fromNow) => {
    stop();
    root.classList.remove("hl-done"); root.classList.add("hl-run");
    const now = performance.now();
    const t1 = Math.max(fromNow ? now + V.hold : V.hold, now + 60);
    const t2 = t1 + V.nameAfter, t3 = t2 + V.wordGap;
    const at = (t) => Math.max(0, t - now);
    const opt = (t, easing) => ({ duration: V.dur, delay: at(t), easing, fill: "both" });
    const fade = [{ opacity: 0 }, { opacity: 1 }];
    small.forEach((el) => anims.push(el.animate(fade, opt(t1, EASE_TEXT))));

    const wide = img && img.offsetWidth > 0;
    if (wide && mark) {
      placeMark();
      const h = parseFloat(mark.getAttribute("viewBox").split(/\s+/)[3]) || 290;
      halves.forEach((g, i) => anims.push(g.animate(
        [{ opacity: 0, transform: `translateY(${V.rise * h}px)` }, { opacity: 1, transform: "translateY(0)" }],
        opt(i ? t3 : t2, i ? EASE_SECOND : EASE_FIRST))));
    } else if (wide) {
      // No halves (the SVG could not be read): the whole wordmark rises as one, on CHD's beat.
      anims.push(img.animate([{ opacity: 0, transform: `translateY(${V.rise * 100}%)` }, { opacity: 1, transform: "none" }], opt(t2, EASE_SECOND)));
    } else if (vertical) {
      // Phones: the name runs down the left edge, turned a quarter, so rising up the screen is along its
      // own x. Distance is 0.83 of the letters' cap height (about 0.7 of the font size).
      const letters = [...vertical.children];
      [letters.slice(0, 3), letters.slice(3)].forEach((group, i) => group.forEach((s) => anims.push(s.animate(
        [{ opacity: 0, transform: `translateX(${(V.rise * 0.7).toFixed(3)}em)` }, { opacity: 1, transform: "none" }],
        opt(i ? t3 : t2, i ? EASE_SECOND : EASE_FIRST)))));
    }
    const last = anims[anims.length - 1];
    if (last) last.finished.then(finish).catch(() => {}); else finish();
  };

  // Start once the fonts and the wordmark are ready, never before the reference's times.
  const ready = Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    img && img.decode ? img.decode().catch(() => {}) : Promise.resolve(),
    buildMark(),
  ]);
  // A page opened part way down (a link to #work, a reload mid page) skips the load.
  if (scrollY > hero.offsetHeight * 0.5) finish();
  else ready.then(() => play(false));
  addEventListener("resize", () => { if (mark && mark.isConnected) placeMark(); });

  // ---- Panel.
  const SLIDERS = [
    ["hold", "Black hold before the text", 0, 2500, 50, "ms"],
    ["nameAfter", "CHD starts after the text by", 0, 1000, 25, "ms"],
    ["wordGap", "WCK starts after CHD by", 0, 1200, 25, "ms"],
    ["dur", "Each beat lasts", 150, 1600, 25, "ms"],
    ["rise", "Name rises from", 0, 1.5, 0.01, "of its height"],
  ];
  const panel = document.createElement("div");
  panel.className = "hl-panel";
  panel.setAttribute("data-closed", "");
  panel.innerHTML = `<div class="hl-panel__top"><span>Home load</span><button type="button" data-replay>Replay</button><button type="button" data-t>Open</button></div>` +
    SLIDERS.map(([k, label, min, max, step]) =>
      `<label><span>${label}<b data-v="${k}"></b></span><input type="range" data-k="${k}" min="${min}" max="${max}" step="${step}"></label>`).join("") +
    `<div class="hl-panel__row"><button type="button" data-copy>Copy values</button><button type="button" data-reset>Reset</button></div>`;
  const show = () => SLIDERS.forEach(([k, , , , , unit]) => {
    panel.querySelector(`[data-k="${k}"]`).value = V[k];
    panel.querySelector(`[data-v="${k}"]`).textContent = ` ${V[k]} ${unit}`;
  });
  panel.addEventListener("input", (e) => { const k = e.target.dataset.k; if (!k) return; V[k] = parseFloat(e.target.value); save(); show(); });
  panel.querySelector("[data-t]").addEventListener("click", (e) => {
    const closed = panel.toggleAttribute("data-closed"); e.target.textContent = closed ? "Open" : "Close";
  });
  panel.querySelector("[data-replay]").addEventListener("click", async () => {
    const lenis = window.__hm && window.__hm.lenis;
    lenis ? lenis.scrollTo(0, { immediate: true }) : scrollTo(0, 0);
    await buildMark();
    play(true);
  });
  panel.querySelector("[data-copy]").addEventListener("click", (e) => {
    const text = SLIDERS.map(([k, label, , , , unit]) => `${label}: ${V[k]} ${unit}`).join("\n");
    (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(
      () => { e.target.textContent = "Copied"; setTimeout(() => (e.target.textContent = "Copy values"), 1200); },
      () => prompt("Copy these values", text));
  });
  panel.querySelector("[data-reset]").addEventListener("click", () => { V = { ...DEFAULTS }; save(); show(); });
  show();
  document.body.append(panel);

  window.__hl = { V, DEFAULTS, play, get anims() { return anims; } };
})();
