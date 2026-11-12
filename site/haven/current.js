import './finale.js';
const section = document.getElementById('chat-rotate');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (section && !reduced) {
  const start = async () => {
    try {
      const { mountChatPhone } = await import('./chat-rotate.js');
      const instance = await mountChatPhone(section);
      section.classList.add('has-chat');
      instance.remeasure();
      window.__chat = instance;
    } catch (error) {
      section.classList.remove('has-chat');
      section.querySelector('canvas')?.remove();
      section.dataset.fallback = 'still';
    }
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      observer.disconnect(); start();
    }, {rootMargin:'1200px'});
    observer.observe(section);
  } else start();
}
