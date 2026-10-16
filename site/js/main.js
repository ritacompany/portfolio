// Entry point for every page. Each feature starts only if its markup is on the page.
import { startClock } from "./clock.js";
import { createDialog } from "./dialog.js";
import { startMotion } from "./motion.js";

startMotion();
startClock();

const about = document.getElementById("about-panel");
if (about) createDialog(about, { hash: "about" });

const menu = document.getElementById("site-menu");
if (menu) createDialog(menu);
