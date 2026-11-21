// Framework page motion check (gates G2 to G5 in framework-page-GATES.md). Paste into the console on
// /mondai/framework/ served by `npm run studio`, right after load and before scrolling, or eval it.
// It scrolls the page top to bottom in steps, waits for the entrances to finish and returns a report.
(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const mm = window.__mm;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = () => [...document.querySelectorAll(".framework .fw-sec > *, .framework .week__slide > .t, .framework .week__slide img, .ending-bar")]
    .filter((e) => !e.classList.contains("week") && !e.classList.contains("week-nav"))
    .filter((e) => e.getClientRects().length > 0) // items not laid out at this width never show
    // The laptop and the Rollover panel move with the scroll instead of an entrance (his audit, 11 Nov)
    .filter((e) => !["5812:16973", "5812:20311", "5812:20314", "5812:20315", "5812:20316"].includes(e.dataset.figmaNode));
  const isHidden = (e) => { const s = getComputedStyle(e); return s.visibility === "hidden" || +s.opacity < 0.99 || (s.clipPath && s.clipPath !== "none"); };
  const below = items().filter((e) => e.getBoundingClientRect().top > innerHeight + 50);
  const startHidden = below.filter(isHidden).length;
  const hiddenAtLoad = items().filter(isHidden).length;
  // The page grows as lazy screens load, so keep going until the bottom stops moving
  const bottom = () => document.documentElement.scrollHeight - innerHeight;
  for (let y = 0; y <= bottom() + innerHeight; y += Math.round(innerHeight * 0.6)) {
    const to = Math.min(y, bottom());
    if (mm && mm.lenis) { mm.lenis.resize(); mm.lenis.scrollTo(to, { immediate: true }); } else scrollTo(0, to);
    await wait(260);
  }
  await wait(2600);
  const notFinal = items().filter(isHidden).map((e) => (e.closest("section") || {}).ariaLabel + ": " + (e.dataset.figmaNode || e.className));
  const H_ = { textDur: 1.4, stagger: 0.15, trigger: 100, maskDur: 1.2, from: 1.3, arrival: 0.35 };
  const timing = mm ? Object.keys(H_).filter((k) => mm.T[k] !== H_[k]).map((k) => `${k} ${mm.T[k]} vs Haven ${H_[k]}`) : ["no __mm"];
  return {
    width: innerWidth, reduced, mmOff: document.documentElement.classList.contains("mm-off"),
    lenis: !!(mm && mm.lenis), lenisLerp: mm && mm.lenis ? mm.lenis.options.lerp : null,
    items: items().length, belowFold: below.length, startHidden, hiddenAtLoad, notFinal, timingDiffs: timing,
  };
})();
