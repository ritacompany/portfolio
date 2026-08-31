const content = {
  evidence: [
    { name: 'A. Evidence split', use: 'Best for one strong statistic, rate or diagram.' },
    { name: 'B. Interlocking field', use: 'Best when a visual can overlap oversized display type.' },
    { name: 'C. Data bands', use: 'Best for a sequence of related findings or a wide process graphic.' },
  ],
  logic: [
    { name: 'A. Decision rail', use: 'Best for a sequence of criteria, questions or principles.' },
    { name: 'B. Framed choice', use: 'Best for one high-stakes decision with supporting rationale.' },
    { name: 'C. Comparative spread', use: 'Best for comparing directions, tradeoffs or phases.' },
  ],
};

document.querySelectorAll('.variant-button').forEach((button) => {
  button.addEventListener('click', () => {
    const sectionName = button.dataset.target;
    const variant = Number(button.dataset.variant);
    const section = document.querySelector(`[data-section="${sectionName}"]`);
    const frame = section.querySelector('.layout-frame');
    section.querySelectorAll('.variant-button').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    frame.classList.remove('variant-1', 'variant-2');
    if (variant > 0) frame.classList.add(`variant-${variant}`);
    section.querySelector('.variant-name').textContent = content[sectionName][variant].name;
    section.querySelector('.variant-use').textContent = content[sectionName][variant].use;
  });
});

const gridToggle = document.querySelector('.grid-toggle');
gridToggle.addEventListener('click', () => {
  const on = document.body.classList.toggle('grid-on');
  gridToggle.setAttribute('aria-pressed', String(on));
  gridToggle.textContent = on ? 'Hide 12-column grid' : 'Show 12-column grid';
});
