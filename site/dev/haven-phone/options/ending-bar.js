// Proposal markup: each side link keeps its long name for 768 and up and gains a short one for the phone.
const short = { ".ending-bar__prev span": "Mondai design system CS", ".ending-bar__next span": "Mondai framework CS" };
for (const [sel, text] of Object.entries(short)) {
  const s = document.querySelector(sel); if (!s) continue;
  s.innerHTML = '<span class="eb-long">' + s.textContent + '</span><span class="eb-short">' + text + "</span>";
}
