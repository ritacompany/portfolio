// Small live pieces shared by the built pages (Phase 2). Haven runs its own copy of the clock in haven.js.
//   Clock      the footer time reads Chicago time and shows seconds and ticks every second.

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

