// Proposal: on a phone the quiz phone rises into place as the reader scrolls. It starts 45 percent of its
// height lower (cut by the stage) while the stage enters, and lands when the stage top is a fifth of the way
// down the screen. Eased, follows the scroll both ways. Off under reduced motion and from 768 up.
const stage = document.getElementById("quiz-stage");
const phone = stage && stage.querySelector(".quiz__phone");
const narrow = matchMedia("(max-width: 767px)"), still = matchMedia("(prefers-reduced-motion: reduce)");
if (stage && phone) {
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const tick = () => {
    if (!narrow.matches || still.matches) { stage.style.removeProperty("--rise"); return; }
    const r = stage.getBoundingClientRect(), vh = innerHeight;
    const t = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.65)));
    stage.style.setProperty("--rise", ((1 - ease(t)) * phone.offsetHeight * 0.45).toFixed(1) + "px");
  };
  addEventListener("scroll", tick, { passive: true });
  addEventListener("resize", tick);
  tick();
}
