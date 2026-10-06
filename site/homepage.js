const chicagoClock = document.querySelector("#chicago-time");
const mondaiTrigger = document.querySelector("[data-mondai-open]");
const mondaiPanel = document.querySelector("#mondai-panel");
const mondaiClose = document.querySelector("[data-mondai-close]");
const mondaiLinks = [...mondaiPanel.querySelectorAll("a")];

const visibleClock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZoneName: "short"
});

// "4:16pm CDT": built from parts so the zone follows daylight time and no browser spacing leaks in
function chicagoLabel(date) {
  const part = Object.fromEntries(visibleClock.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${part.hour}:${part.minute}${part.dayPeriod.toLowerCase()} ${part.timeZoneName}`;
}

const accessibleClock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  weekday: "long",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

function updateChicagoClock() {
  const now = new Date();
  chicagoClock.textContent = chicagoLabel(now);
  chicagoClock.dateTime = now.toISOString();
  chicagoClock.setAttribute("aria-label", `Local time in Chicago: ${accessibleClock.format(now)}`);
}

function openMondaiPanel() {
  mondaiPanel.hidden = false;
  document.body.classList.add("mondai-open");
  mondaiClose.focus();
}

function closeMondaiPanel({ restoreFocus = true } = {}) {
  mondaiPanel.hidden = true;
  document.body.classList.remove("mondai-open");
  if (restoreFocus) mondaiTrigger.focus();
}

updateChicagoClock();
window.setInterval(updateChicagoClock, 1000);

mondaiTrigger.addEventListener("click", openMondaiPanel);
mondaiClose.addEventListener("click", () => closeMondaiPanel());

mondaiPanel.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeMondaiPanel();
    return;
  }

  if (event.key !== "Tab") return;
  const focusable = [mondaiClose, ...mondaiLinks];
  const first = focusable[0];
  const last = focusable.at(-1);

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
