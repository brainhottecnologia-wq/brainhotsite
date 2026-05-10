// Smooth scroll with nav offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const hash = this.getAttribute('href');
    if (!hash || hash === '#') return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    const offset = 60;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});
// Fechar menu com tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Abrir menu de navegação');
    document.body.style.overflow = '';
    hamburger.focus();
  }
});
document.querySelectorAll('.mob-link, .mob-cta').forEach(el => {
  el.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Timeline scroll animation
const tlItems = document.querySelectorAll('.tl-item');
const tlProgress = document.getElementById('timelineProgress');
const tlWrap = document.getElementById('timelineWrap');

const tlObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('tl-visible'), 100);
    }
  });
}, { threshold: 0.3 });
tlItems.forEach(el => tlObserver.observe(el));

// Progress line fill on scroll
function updateTimelineProgress() {
  if (!tlWrap) return;
  const rect = tlWrap.getBoundingClientRect();
  const wh = window.innerHeight;
  const start = rect.top;
  const end = rect.bottom - wh * 0.3;
  const total = end - start;
  const scrolled = Math.max(0, Math.min(total, wh * 0.5 - start));
  const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));
  if (tlProgress) tlProgress.style.height = pct + '%';
}
window.addEventListener('scroll', updateTimelineProgress, { passive: true });
updateTimelineProgress();

