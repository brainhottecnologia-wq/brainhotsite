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

(function () {
  var screen = document.getElementById('intro-screen');
  document.body.classList.add('intro-on');

  var texts = ['Sua empresa', 'Seu sonho', 'Nossa responsabilidade.'];
  var ids   = ['ip-1', 'ip-2', 'ip-3'];

  // Quebra cada frase em spans por caractere
  // espaço vira   para preservar largura
  texts.forEach(function(text, pi) {
    var el = document.getElementById(ids[pi]);
    text.split('').forEach(function(ch) {
      var span = document.createElement('span');
      span.className = 'intro-char';
      if (ch === ' ') { span.style.width = '.3em'; span.style.display = 'inline-block'; } else { span.textContent = ch; }
      el.appendChild(span);
    });
  });

  // Dispara cada char em sequência global (frase após frase)
  var charDelay = 38;   // ms entre letras
  var phraseGap = 220;  // ms extra de pausa entre frases
  var cursor    = 200;  // delay inicial
  var lastEnd   = 0;

  ids.forEach(function(id, pi) {
    var chars = document.getElementById(id).querySelectorAll('.intro-char');
    // ip-3 (Nossa responsabilidade.) recebe classe grad para gradiente
    if (pi === 2) {
      chars.forEach(function(ch) { ch.classList.add('grad'); });
    }
    chars.forEach(function(ch, ci) {
      setTimeout(function() { ch.classList.add('on'); }, cursor + ci * charDelay);
    });
    cursor += chars.length * charDelay + phraseGap;
    lastEnd = cursor;
  });

  // Mostrar logo + nome da marca depois das frases
  setTimeout(function() {
    document.getElementById('intro-brand').classList.add('on');
  }, lastEnd + 100);

  // Pausa e dissolve
  setTimeout(function() {
    screen.classList.add('done');
    setTimeout(function() {
      screen.style.display = 'none';
      document.body.classList.remove('intro-on');
    }, 700);
  }, lastEnd + 1100);
})();

function showEventosPage() {
  document.getElementById('page-eventos').style.display = 'block';
  document.body.style.overflow = 'hidden';
  window.__eventosOpen = true;
  runEvIntro();
}
function runEvIntro() {
  var screen = document.getElementById('ev-intro');
  if (!screen) return;
  screen.style.display = 'flex';
  screen.classList.remove('done');

  var texts = ['Sua casa de festas', 'organizada de verdade.'];
  var ids   = ['ev-p1', 'ev-p2'];

  // Limpar spans anteriores (caso reabra)
  ids.forEach(function(id) {
    document.getElementById(id).innerHTML = '';
  });
  document.getElementById('ev-brand').classList.remove('on');

  texts.forEach(function(text, pi) {
    var el = document.getElementById(ids[pi]);
    text.split('').forEach(function(ch) {
      var span = document.createElement('span');
      span.className = 'ev-char';
      if (ch === ' ') { span.style.width = '.3em'; span.style.display = 'inline-block'; }
      else { span.textContent = ch; }
      el.appendChild(span);
    });
  });

  var charDelay = 38, phraseGap = 220, cursor = 200, lastEnd = 0;
  ids.forEach(function(id, pi) {
    var chars = document.getElementById(id).querySelectorAll('.ev-char');
    if (pi === 1) { chars.forEach(function(ch) { ch.classList.add('grad'); }); }
    chars.forEach(function(ch, ci) {
      setTimeout(function() { ch.classList.add('on'); }, cursor + ci * charDelay);
    });
    cursor += chars.length * charDelay + phraseGap;
    lastEnd = cursor;
  });

  setTimeout(function() {
    document.getElementById('ev-brand').classList.add('on');
  }, lastEnd + 100);

  setTimeout(function() {
    screen.classList.add('done');
    setTimeout(function() { screen.style.display = 'none'; }, 700);
  }, lastEnd + 1100);
}
function hideEventosPage() {
  document.getElementById('page-eventos').style.display = 'none';
  document.body.style.overflow = '';
  window.__eventosOpen = false;
}
// Interceptar cliques em links para gerenciador-eventos.html
document.addEventListener('click', function(e) {
  var a = e.target.closest('a');
  if (a && a.getAttribute('href') === 'gerenciador-eventos.html') {
    e.preventDefault();
    showEventosPage();
  }
  // Botao voltar dentro da pagina de eventos
  if (a && window.__eventosOpen && (a.getAttribute('href') === 'index.html' || a.classList.contains('back-link'))) {
    e.preventDefault();
    hideEventosPage();
  }
});
// Fechar com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && window.__eventosOpen) hideEventosPage();
});

