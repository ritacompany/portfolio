// One dialog behavior for every overlay on the site: the about panel (H14) and the compact
// menu. Focus moves into the dialog, Tab stays inside, Escape and any [data-dialog-close]
// close it, and focus returns to whatever opened it. Merged from the September menu
// (site/main.js) and the H14 about panel prototype.
//
// Markup:
//   <a href="#about" data-dialog-open="about-panel">About</a>
//   <aside id="about-panel" role="dialog" aria-modal="true" aria-labelledby="..." hidden> ...
//     <button data-dialog-close>Close</button>
//   </aside>
// The open state is the [data-open] attribute on the dialog; CSS animates from it.

const FOCUSABLE = "a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex='-1'])";

export function createDialog(dialog, { hash, onOpen, onClose } = {}) {
  const openers = document.querySelectorAll(`[data-dialog-open="${dialog.id}"]`);
  let returnTo = null;

  const isOpen = () => dialog.hasAttribute("data-open");
  const items = () => [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);

  function open(from) {
    if (isOpen()) return;
    returnTo = from || document.activeElement;
    dialog.hidden = false;
    requestAnimationFrame(() => dialog.setAttribute("data-open", ""));
    document.body.classList.add("is-locked");
    openers.forEach((o) => o.setAttribute("aria-expanded", "true"));
    (dialog.querySelector("[data-dialog-close]") || items()[0] || dialog).focus({ preventScroll: true });
    if (hash && location.hash !== `#${hash}`) history.replaceState(null, "", `#${hash}`);
    onOpen?.();
  }

  function close({ restoreFocus = true } = {}) {
    if (!isOpen()) return;
    dialog.removeAttribute("data-open");
    document.body.classList.remove("is-locked");
    openers.forEach((o) => o.setAttribute("aria-expanded", "false"));
    if (hash && location.hash === `#${hash}`) history.replaceState(null, "", location.pathname + location.search);
    // Hide after the close transition so it leaves the tab order and the accessibility tree.
    const done = () => { if (!isOpen()) dialog.hidden = true; };
    dialog.addEventListener("transitionend", done, { once: true });
    setTimeout(done, 600);
    if (restoreFocus && returnTo && document.contains(returnTo)) returnTo.focus({ preventScroll: true });
    onClose?.();
  }

  openers.forEach((o) => o.addEventListener("click", (e) => { e.preventDefault(); open(o); }));
  dialog.querySelectorAll("[data-dialog-close]").forEach((c) => c.addEventListener("click", () => close()));
  document.querySelectorAll(`[data-dialog-scrim="${dialog.id}"]`).forEach((s) => s.addEventListener("click", () => close()));

  document.addEventListener("keydown", (e) => {
    if (!isOpen()) return;
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key !== "Tab") return;
    const list = items();
    if (!list.length) return;
    const first = list[0], last = list[list.length - 1];
    if (e.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  });

  if (hash && location.hash === `#${hash}`) open(openers[0]);
  return { open, close, isOpen };
}
