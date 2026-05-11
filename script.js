/* =============================================
  script.js — Portfólio de Rodolfo Batista de Morais

  Responsabilidades:
  1. Geração única do menu de navegação (evita duplicação HTML)
  2. Sistema de idiomas PT / EN (tradução segura sem destruir HTML interno)
  3. Destaque do link ativo na navegação (IntersectionObserver)
  4. Menu mobile (hambúrguer)
  5. Animações de entrada por scroll (IntersectionObserver)
  6. Ano dinâmico no footer
=============================================== */


/* =============================================
  1. Definição dos links de navegação
  Fonte única — gerada para desktop e mobile via JS
=============================================== */
const NAV_LINKS = [
  { href: '#sobre',       pt: 'Sobre',       en: 'About'      },
  { href: '#experiencia', pt: 'Experiência',  en: 'Experience' },
  { href: '#formacao',    pt: 'Formação',     en: 'Education'  },
  { href: '#habilidades', pt: 'Habilidades',  en: 'Skills'     },
  { href: '#projetos',    pt: 'Projetos',     en: 'Projects'   },
  { href: '#contato',     pt: 'Contato',      en: 'Contact'    },
];

function buildNav() {
  const desktopNav = document.getElementById('desktopNav');
  const mobileNav  = document.getElementById('mobileNav');

  NAV_LINKS.forEach(({ href, pt, en }) => {
    const makeLink = () => {
      const a = document.createElement('a');
      a.href = href;
      a.dataset.pt = pt;
      a.dataset.en = en;
      a.textContent = pt; // idioma inicial definido depois
      return a;
    };

    desktopNav.appendChild(makeLink());
    mobileNav.appendChild(makeLink());
  });
}

buildNav();


/* =============================================
  2. Sistema de idiomas
=============================================== */

function getInitialLang() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang === 'pt' || urlLang === 'en') return urlLang;

  const saved = localStorage.getItem('lang');
  if (saved === 'pt' || saved === 'en') return saved;

  return 'pt';
}

/**
 * Traduz todos os elementos com data-pt / data-en.
 * Usa textContent apenas em elementos SEM filhos HTML,
 * evitando destruir links ou outras tags internas.
 */
function applyLang(lang) {
  document.querySelectorAll('[data-pt]').forEach(el => {
    // Só atualiza o texto se o elemento não tiver filhos (texto puro)
    if (el.children.length === 0) {
      el.textContent = el.dataset[lang];
    }
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  document.getElementById('langPT').classList.toggle('active', lang === 'pt');
  document.getElementById('langEN').classList.toggle('active', lang === 'en');

  localStorage.setItem('lang', lang);

  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState(null, '', url.toString());
}

let currentLang = getInitialLang();
applyLang(currentLang);

document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  applyLang(currentLang);
});


/* =============================================
  3. Link ativo na navegação (scroll spy)
=============================================== */
const sections = document.querySelectorAll('main section[id]');
const navLinks  = document.querySelectorAll('#desktopNav a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const id = entry.target.id;
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isActive);
    });
  });
}, {
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0,
});

sections.forEach(section => sectionObserver.observe(section));


/* =============================================
  4. Menu mobile
=============================================== */
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen.toString());
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

// Fecha ao clicar em qualquer link
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menu');
  });
});


/* =============================================
  5. Animações de entrada por scroll
=============================================== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target); // anima só uma vez
    }
  });
}, {
  threshold: 0.1,
});

document.querySelectorAll('.reveal-section').forEach(el => {
  revealObserver.observe(el);
});


/* =============================================
  6. Ano dinâmico no footer
=============================================== */
const footerCopy = document.getElementById('footerCopy');
if (footerCopy) {
  const year = new Date().getFullYear();
  footerCopy.dataset.pt = `© ${year} Rodolfo Batista de Morais`;
  footerCopy.dataset.en = `© ${year} Rodolfo Batista de Morais`;
  footerCopy.textContent = `© ${year} Rodolfo Batista de Morais`;
}
