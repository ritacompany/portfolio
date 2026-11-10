// R14, preview only: on a phone the card's Learn more moves next to its text, bottom right, and the text
// stacks on the left. When he says yes, the same markup change goes into site/index.html.
(() => {
  // Haven's card has no Learn more in Figma; it gets the same one as Mondai so both cards behave alike.
  const run = () => document.querySelectorAll(".work-card").forEach((card) => {
    const head = card.querySelector(".work-card__head"), media = card.querySelector(".work-card__media");
    let btn = media && media.querySelector(".button-sm");
    if (!btn) { const src = document.querySelector(".work-card__media .button-sm"); if (!src || !media) return; btn = src.cloneNode(true); btn.removeAttribute("data-figma-node"); media.append(btn); }
    if (!head) return;
    const learn = btn.cloneNode(true); learn.classList.add("work-card__learn"); learn.removeAttribute("data-overlay");
    head.append(learn);
  });
  document.readyState === "loading" ? addEventListener("DOMContentLoaded", run) : run();
})();
