// Framework CS between 1200 and 1440: the page keeps its 1440 composition, scaled to the window.
// CSS reads --fw-scale only in that range (framework.css); outside it the value is unused.
const root = document.documentElement;
const fit = () => root.style.setProperty("--fw-scale", Math.min(1, root.clientWidth / 1440).toFixed(4));
fit();
addEventListener("resize", fit, { passive: true });
