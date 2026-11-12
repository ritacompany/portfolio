// Insight tooltips on the Haven pills, WAI-ARIA tooltip pattern: hover after a delay or keyboard focus
// opens one, pointer leave, blur or Escape closes it, and the pointer can move onto it to keep reading.
// No click and no touch: touch screens have no hover, and every insight is already on the page.
// The text is read from the page's own cards, so a pill can never drift from the insight it cites.
(function () {
  var SOURCES = {
    'interview insight': '.cards-research .card__body',
    'testing insight': '.cards-testing .tcard__body',
    'confidante role': '.roles .role__text'
  };
  var root = getComputedStyle(document.documentElement);
  var ms = function (name) { return parseFloat(root.getPropertyValue(name)) || 0; };
  var px = function (name) { return parseFloat(root.getPropertyValue(name)) || 0; };
  var OPEN_DELAY = ms('--tooltip-open-delay'), CLOSE_DELAY = ms('--tooltip-close-delay');

  var layer = document.createElement('div');
  layer.className = 'pill-tips';
  var open = null, openTimer = 0, closeTimer = 0, raf = 0, n = 0;

  function place(pill, tip) {
    var edge = px('--tooltip-edge'), gap = px('--tooltip-gap') + px('--tooltip-arrow') / 2;
    var vw = document.documentElement.clientWidth;
    var r = pill.getBoundingClientRect();
    var w = tip.offsetWidth, h = tip.offsetHeight;
    var side = r.top - gap - h < edge ? 'bottom' : 'top';
    var left = Math.max(edge, Math.min(r.left, vw - edge - w));
    tip.dataset.side = side;
    tip.style.left = left + 'px';
    tip.style.top = (side === 'top' ? r.top - gap - h : r.bottom + gap) + 'px';
    tip.style.setProperty('--ax', Math.max(14, Math.min(r.left + r.width / 2 - left, w - 14)) + 'px');
    return r;
  }
  function follow() {
    if (!open) return;
    var r = place(open.pill, open.tip);
    if (r.bottom < 0 || r.top > window.innerHeight) return close();
    raf = requestAnimationFrame(follow);
  }
  function show(pill, tip) {
    clearTimeout(closeTimer);
    if (open && open.tip === tip) return;
    close();
    open = { pill: pill, tip: tip };
    place(pill, tip);
    tip.dataset.open = '';
    pill.dataset.tipOpen = '';
    raf = requestAnimationFrame(follow);
  }
  function close() {
    if (!open) return;
    cancelAnimationFrame(raf);
    delete open.tip.dataset.open;
    delete open.pill.dataset.tipOpen;
    open = null;
  }
  function closeSoon(tip) {
    clearTimeout(openTimer);
    clearTimeout(closeTimer);
    closeTimer = setTimeout(function () {
      if (open && open.tip === tip && document.activeElement !== open.pill) close();
    }, CLOSE_DELAY);
  }

  document.querySelectorAll('.pill').forEach(function (pill) {
    var m = pill.textContent.trim().toLowerCase().match(/^(interview insight|testing insight|confidante role) (\d+)$/);
    if (!m) return;
    var src = document.querySelectorAll(SOURCES[m[1]])[+m[2] - 1];
    if (!src) return;
    var tip = document.createElement('div');
    tip.className = 'pill-tip';
    tip.id = 'pill-tip-' + (n++);
    tip.setAttribute('role', 'tooltip');
    tip.textContent = src.textContent.trim();
    layer.appendChild(tip);
    pill.tabIndex = 0;
    pill.setAttribute('aria-describedby', tip.id);

    pill.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
      openTimer = setTimeout(function () { show(pill, tip); }, open ? 0 : OPEN_DELAY);
    });
    pill.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') closeSoon(tip); });
    tip.addEventListener('pointerenter', function () { clearTimeout(closeTimer); });
    tip.addEventListener('pointerleave', function () { closeSoon(tip); });
    pill.addEventListener('focus', function () { if (pill.matches(':focus-visible')) show(pill, tip); });
    pill.addEventListener('blur', function () { if (!pill.matches(':hover') && !tip.matches(':hover')) close(); });
  });

  if (!n) return;
  document.body.appendChild(layer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
