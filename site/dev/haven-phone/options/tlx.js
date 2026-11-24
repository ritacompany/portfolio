// Proposal markup for the phone MVP timeline, round 2. The variant comes from the script's own URL (?v=1, 2, 3).
// Every word is already on the page: the phase names, the 01 to 12 columns, the two launches.
const v = new URL(import.meta.url).searchParams.get("v") || "1";
const axis = '<div class="tlx__axis">' + Array.from({ length: 12 }, (_, i) => "<span>" + String(i + 1).padStart(2, "0") + "</span>").join("") + "</div>";
const rows = '<div class="tlx__rows"><div class="tlx__bar tlx__bar--id">Identity</div><div class="tlx__bar tlx__bar--co">Community</div></div>';
const idLabel = '<p class="tlx__label tlx__label--id"><b>Identity launch</b>where this case study ends</p>';
const coLabel = '<p class="tlx__label tlx__label--co"><b>Community launch</b></p>';
const lines = '<span class="tlx__line tlx__line--id"></span><span class="tlx__line tlx__line--co"></span>';
let html;
if (v === "1") html = '<div class="tlx__chart"><div class="tlx__flags">' + idLabel + coLabel + "</div>" + axis + rows + lines + "</div>";
else if (v === "2") html = '<div class="tlx__chart">' + axis + rows + lines + '<div class="tlx__under">' + idLabel.replace("<b>Identity launch</b>", "<b>Identity launch,</b> ") + coLabel + "</div></div>";
else html = '<div class="tlx__chart">' + axis + rows + lines + '<i class="tlx__dot tlx__dot--id"></i><i class="tlx__dot tlx__dot--co"></i></div><div class="tlx__list"><p class="tlx__label"><i></i><span><b>Identity launch</b>where this case study ends</span></p><p class="tlx__label"><i></i><span><b>Community launch</b></span></p></div>';
document.querySelector(".mvp__timeline").insertAdjacentHTML("beforeend", '<div class="tlx tlx--' + v + '" aria-hidden="true">' + html + "</div>");
