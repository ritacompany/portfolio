// Small live pieces shared by the built pages (Phase 2). Haven runs its own copy of the clock in haven.js.
//   Clock      the footer time reads Chicago time and shows seconds and ticks every second.
//   Start of week dots (Framework)   follow the carousel; a click scrolls to that template.

(function clock() {
  const el = document.querySelector("footer.footer time:not(#chicago-time)");
  if (!el) return;
  const fmt = new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", hour: "numeric", minute: "2-digit", second: "2-digit", timeZoneName: "short" });
  const tick = () => {
    const parts = fmt.formatToParts(new Date()), g = (k) => (parts.find((x) => x.type === k) || {}).value || "";
    el.textContent = `${g("hour")}:${g("minute")}:${g("second")}${g("dayPeriod").toLowerCase()} ${g("timeZoneName")}`;
    el.dateTime = new Date().toISOString();
  };
  // Tick on each second boundary, so the seconds count up in step with the real clock.
  const next = () => { tick(); setTimeout(next, 1000 - (Date.now() % 1000) + 20); };
  next();
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });
})();

(function weekDots() {
  const track = document.querySelector(".week"), dots = [...document.querySelectorAll(".week-dot")];
  if (!track || !dots.length) return;
  const slides = [...track.querySelectorAll(".week__slide")];
  const current = () => {
    const x = track.scrollLeft; let best = 0, d = Infinity;
    slides.forEach((s, i) => { const dd = Math.abs(s.offsetLeft - slides[0].offsetLeft - x); if (dd < d) { d = dd; best = i; } });
    return best;
  };
  const paint = () => { const c = current(); dots.forEach((b, i) => (i === c ? b.setAttribute("aria-current", "true") : b.removeAttribute("aria-current"))); };
  let raf = 0;
  track.addEventListener("scroll", () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint); }, { passive: true });
  const smooth = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
  dots.forEach((b, i) => b.addEventListener("click", () => track.scrollTo({ left: slides[i].offsetLeft - slides[0].offsetLeft, behavior: smooth })));
  paint();
})();
