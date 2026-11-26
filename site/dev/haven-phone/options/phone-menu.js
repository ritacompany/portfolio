// Phone menu (his Mobile frames 6382:29154), the same dialog behaviour as Home's js/home-phone.js:
// the burger opens it, a menu link closes it first, widening past the phone layout closes it.
import { createDialog } from "/js/dialog.js";

const menu = document.getElementById("site-menu");
if (menu) {
  const dialog = createDialog(menu);
  menu.querySelectorAll(".menu__links a").forEach((a) => a.addEventListener("click", () => dialog.close({ restoreFocus: false })));
  matchMedia("(min-width: 768px)").addEventListener("change", (e) => { if (e.matches) dialog.close({ restoreFocus: false }); });
}
