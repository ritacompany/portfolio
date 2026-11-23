// Proposal: the markup Haven would carry (copied from Home's index.html), added at runtime for the preview.
import { createDialog } from "/js/dialog.js";
const nav = document.querySelector(".site-nav .navbar");
nav.insertAdjacentHTML("beforeend", '<button class="navbar__menu" type="button" aria-label="Menu" aria-controls="site-menu" aria-expanded="false" data-dialog-open="site-menu"><img src="/assets/ui/menu.svg" alt="" width="18" height="12"></button>');
document.body.insertAdjacentHTML("beforeend", '<div class="menu" id="site-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden><div class="menu__bar"><a class="navbar__logo" href="/" aria-label="Chadwick Fenner, home"><img src="/assets/ui/logo.svg" alt=""></a><button class="navbar__menu menu__close" type="button" aria-label="Close menu" data-dialog-close><img src="/assets/ui/close.svg" alt="" width="14" height="14"></button></div><nav class="menu__body" aria-label="Main"><ul class="menu__links"><li><a class="link-footer link-footer-lg" href="/#about">About</a></li><li><a class="link-footer link-footer-lg" href="/#work">Works</a></li></ul><div class="menu__contact"><p class="footer__label">Contact</p><a class="footer__email" href="mailto:hello@chadwickfenner.com">hello@chadwickfenner.com</a></div></nav></div>');
const menu = document.getElementById("site-menu");
const dialog = createDialog(menu);
menu.querySelectorAll(".menu__links a").forEach((a) => a.addEventListener("click", () => dialog.close({ restoreFocus: false })));
window.__menu = dialog;
