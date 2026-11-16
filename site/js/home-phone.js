// Home on a phone (Figma, Portfolio Design, VC, Mobile frames 4929:12379).
//   Menu      the burger opens the full screen menu (4928:11959) through the shared dialog behavior;
//             a menu link closes it first, so the jump to its section lands with the page unlocked.
//   Bar       the header scrolls away with the hero, then drops back in as a fixed bar with the logo
//             once the hero has left (tracker H8). CSS only shows it under 768.
import { createDialog } from "./dialog.js";

const menu = document.getElementById("site-menu");
if (menu) {
  const dialog = createDialog(menu);
  menu.querySelectorAll(".menu__links a").forEach((a) => a.addEventListener("click", () => dialog.close({ restoreFocus: false })));
  // The menu only exists under 768; widening the window closes it.
  matchMedia("(min-width: 768px)").addEventListener("change", (e) => { if (e.matches) dialog.close({ restoreFocus: false }); });
}

const header = document.querySelector(".page-header");
const hero = document.querySelector(".hero");
if (header && hero && "IntersectionObserver" in window) {
  // The bar is 50 tall; it drops in once the hero's last 50 px are under it.
  new IntersectionObserver(([entry]) => {
    header.classList.toggle("is-past-hero", !entry.isIntersecting && entry.boundingClientRect.top < 0);
  }, { rootMargin: "-50px 0px 0px 0px" }).observe(hero);
}
