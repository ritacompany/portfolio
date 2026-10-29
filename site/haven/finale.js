const root = document.querySelector(".ending");
const wrap = document.getElementById('wrap');
const track = document.getElementById('track');
const cards = [...track.querySelectorAll('.end-card')];
const narrow = matchMedia('(max-width: 1159px)');
const phone = matchMedia('(max-width: 679px)');
let active = null, openTimer, closeTimer;

// Desktop scales the 1440 row to the screen; tablets keep it at full size; phones size an open card to 80% of the width.
function scale() { return phone.matches ? (innerWidth * 0.8) / 386 : narrow.matches ? 1 : Math.min(1, innerWidth / 1440); }
function fit() { root.style.setProperty('--s', scale()); setActive(active, true); }

// On desktop, slide the row just enough to keep an edge card on screen with a 40px margin.
function shiftFor(i) {
  if (i === null || narrow.matches) return 0;
  const s = scale(), stageLeft = (innerWidth - 1497 * s) / 2;
  const x0 = -stageLeft / s + 40, x1 = (innerWidth - stageLeft) / s - 40;
  const left = -58.5 + i * 307, right = left + 386;
  return left < x0 ? x0 - left : right > x1 ? x1 - right : 0;
}

function setActive(i, quiet) {
  clearTimeout(openTimer); clearTimeout(closeTimer);
  active = i;
  track.style.setProperty('--shift', shiftFor(i) + 'px');
  track.classList.toggle('has-active', i !== null);
  cards.forEach((c, j) => {
    c.classList.toggle('is-active', j === i); c.setAttribute('aria-expanded', String(j === i));
    c.classList.toggle('is-left', i !== null && j < i);
    c.classList.toggle('is-right', i !== null && j > i);
  });
  // On phones, bring the open card to the middle of the row.
  if (narrow.matches && i !== null && !quiet) {
    const edge = parseFloat(getComputedStyle(wrap).getPropertyValue('--edge')) || 16;
    const s = scale(), center = edge + (-58.5 + i * 307 + 193) * s;
    wrap.scrollTo({ left: center - wrap.clientWidth / 2, behavior: 'smooth' });
  }
}

cards.forEach((card, i) => {
  const bg = card.querySelector('.end-bg');
  card.addEventListener('click', () => setActive(active === i ? null : i));
  bg.addEventListener('pointerenter', e => {
    if (e.pointerType !== 'mouse') return;
    clearTimeout(closeTimer); clearTimeout(openTimer);
    setActive(i, true);
  });

  card.addEventListener('focus', () => { if (card.matches(':focus-visible')) setActive(i); });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(active === i ? null : i); }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      cards[(i + (e.key === 'ArrowRight' ? 1 : cards.length - 1)) % cards.length].focus();
    }
    if (e.key === 'Escape') { setActive(null); card.blur(); }
  });
});

wrap.addEventListener('pointerleave', e => {
  if (e.pointerType !== 'mouse') return;
  clearTimeout(openTimer);
  setActive(null);
});
track.addEventListener('focusout', e => { if (!track.contains(e.relatedTarget)) setActive(null); });
// A tap outside the row on a phone closes the open card.
document.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' && !wrap.contains(e.target)) setActive(null); });

fit();
addEventListener('resize', fit);
narrow.addEventListener('change', fit);
phone.addEventListener('change', fit);
