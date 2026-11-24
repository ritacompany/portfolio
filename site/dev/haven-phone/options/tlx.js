// Proposal markup for the phone MVP timeline: the desktop chart's columns, dots, launch circles and two bars.
const n = Array.from({ length: 12 }, (_, i) => i);
const html = '<div class="tlx__grid"></div>'
  + '<div class="tlx__axis">' + n.map((i) => "<span>" + String(i + 1).padStart(2, "0") + "</span>").join("") + "</div>"
  + '<div class="tlx__dots">' + n.map(() => "<i></i>").join("") + "</div>"
  + '<div class="tlx__launches"><p class="tlx__launch tlx__launch--id">Identity launch</p><p class="tlx__launch tlx__launch--co">Community launch</p></div>'
  + '<div class="tlx__rows"><div class="tlx__bar tlx__bar--id">Identity</div><div class="tlx__bar tlx__bar--co">Community</div></div>';
document.querySelector(".mvp__timeline").insertAdjacentHTML("beforeend", '<div class="tlx" aria-hidden="true">' + html + "</div>");
