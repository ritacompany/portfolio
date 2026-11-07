// Quiz feedback and checklist memory for the going live lessons.
// Quiz: each .q holds buttons; data-right="1" marks the correct one. Feedback shows at once.
// Checklist: .steps checkboxes remember their state in this browser only.
document.querySelectorAll('.q').forEach(function (q) {
  var why = q.querySelector('.why');
  q.querySelectorAll('button').forEach(function (b) {
    b.addEventListener('click', function () {
      q.querySelectorAll('button').forEach(function (o) {
        o.setAttribute('aria-pressed', 'false');
        o.classList.remove('right', 'wrong');
      });
      var ok = b.dataset.right === '1';
      b.setAttribute('aria-pressed', 'true');
      b.classList.add(ok ? 'right' : 'wrong');
      why.hidden = false;
      why.className = 'why ' + (ok ? 'right' : 'wrong');
      why.textContent = (ok ? 'Right. ' : 'Not quite. ') + (ok ? q.dataset.right : q.dataset.wrong);
    });
  });
});

document.querySelectorAll('.steps input[type="checkbox"]').forEach(function (box) {
  var key = 'going-live:' + box.id;
  try { box.checked = localStorage.getItem(key) === '1'; } catch (e) {}
  box.addEventListener('change', function () {
    try { localStorage.setItem(key, box.checked ? '1' : '0'); } catch (e) {}
  });
});
