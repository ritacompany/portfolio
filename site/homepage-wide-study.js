const chicagoClock = document.querySelector("#chicago-time");

const visibleClock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "2-digit",
  hour12: true
});

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
  const visible = visibleClock.format(now).replace(" ", "").toLowerCase();
  chicagoClock.textContent = visible;
  chicagoClock.dateTime = now.toISOString();
  chicagoClock.setAttribute("aria-label", `Local time in Chicago: ${accessibleClock.format(now)}`);
}

updateChicagoClock();
window.setInterval(updateChicagoClock, 1000);
