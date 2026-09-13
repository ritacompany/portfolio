/* Chicago clock and the compact full-screen menu. No motion. */

(() => {
  "use strict";

  /* ------------------------------------------------------------- clock */

  const clock = document.querySelector("#chicago-time");

  if (clock) {
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

    const updateClock = () => {
      const now = new Date();
      clock.textContent = visibleClock.format(now).replace(" ", "").toLowerCase();
      clock.dateTime = now.toISOString();
      clock.setAttribute("aria-label", `Local time in Chicago: ${accessibleClock.format(now)}`);
    };

    updateClock();
    window.setInterval(updateClock, 1000);
  }

  /* -------------------------------------------------------------- menu */

  const menu = document.querySelector("#site-menu");
  const toggle = document.querySelector(".menu-toggle");
  const closeButton = document.querySelector(".menu-close");

  if (!menu || !toggle) return;

  const FOCUSABLE = "a[href], button:not([disabled])";
  let lastFocused = null;
  let scrollLock = 0;

  const focusables = () =>
    Array.from(menu.querySelectorAll(FOCUSABLE)).filter((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== "none" && style.visibility !== "hidden";
    });

  const isOpen = () => !menu.hasAttribute("hidden");

  function openMenu() {
    if (isOpen()) return;
    lastFocused = document.activeElement;
    scrollLock = window.scrollY;
    menu.removeAttribute("hidden");
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
    document.body.style.top = `-${scrollLock}px`;
    const first = focusables()[0];
    if (first) first.focus();
  }

  function closeMenu({ restoreFocus = true } = {}) {
    if (!isOpen()) return;
    menu.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
    document.body.style.top = "";
    window.scrollTo(0, scrollLock);
    if (restoreFocus && lastFocused && document.contains(lastFocused)) {
      lastFocused.focus();
    }
  }

  toggle.addEventListener("click", () => {
    if (isOpen()) closeMenu();
    else openMenu();
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => closeMenu());
  }

  // Choosing a destination dismisses the menu, then lets the anchor resolve
  // against the restored scroll position.
  for (const link of menu.querySelectorAll("a[href]")) {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      closeMenu({ restoreFocus: false });
      if (href && href.startsWith("#")) {
        const target = document.querySelector(href);
        if (target) {
          event.preventDefault();
          target.scrollIntoView();
        }
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (!isOpen()) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && (active === first || !menu.contains(active))) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (active === last || !menu.contains(active))) {
      event.preventDefault();
      first.focus();
    }
  });

  // If the viewport grows back to the desktop navigation, drop the overlay so
  // the page can never be left with a hidden trigger and a locked body.
  const desktopNavigation = window.matchMedia("(min-width: 1120px)");
  const syncToViewport = (event) => {
    if (event.matches) closeMenu({ restoreFocus: false });
  };
  if (typeof desktopNavigation.addEventListener === "function") {
    desktopNavigation.addEventListener("change", syncToViewport);
  } else if (typeof desktopNavigation.addListener === "function") {
    desktopNavigation.addListener(syncToViewport);
  }
})();
