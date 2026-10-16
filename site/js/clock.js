// Live Chicago time for the footer. Carried over from the September homepage
// (codex/homepage-responsive site/homepage.js), which prints the zone as CDT or CST.
// Markup: <time data-chicago-clock>10:24pm CST</time>

const visible = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZoneName: "short"
});

const spoken = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

// "4:16pm CDT", built from parts so no browser spacing leaks in.
function label(date) {
  const part = Object.fromEntries(visible.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${part.hour}:${part.minute}${part.dayPeriod.toLowerCase()} ${part.timeZoneName}`;
}

export function startClock(root = document) {
  const clocks = root.querySelectorAll("[data-chicago-clock]");
  if (!clocks.length) return;
  const tick = () => {
    const now = new Date();
    clocks.forEach((el) => {
      el.textContent = label(now);
      el.dateTime = now.toISOString();
      el.setAttribute("aria-label", `Local time in Chicago: ${spoken.format(now)}`);
    });
  };
  tick();
  setInterval(tick, 1000);
}
