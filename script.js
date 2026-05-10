/* =============================================
  script.js — Portfólio de Rodolfo Batista de Morais

  Responsabilidades:
  1. Leitura do parâmetro ?lang= na URL
  2. Troca de idioma (PT / EN) ao clicar no botão
  3. Menu mobile (hambúrguer)
=============================================== */


/* =============================================
  1. Sistema de idiomas
=============================================== */

/**
 * Retorna o idioma inicial com base em:
 * 1. Parâmetro ?lang= na URL (prioridade máxima)
 * 2. Idioma salvo no localStorage (visita anterior)
 * 3. Padrão: 'pt'
 */
function getInitialLang() {
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');

  if (urlLang === 'pt' || urlLang === 'en') {
    return urlLang;
  }

  const saved = localStorage.getItem('lang');
  if (saved === 'pt' || saved === 'en') {
    return saved;
  }

  return 'pt';
}

/**
 * Aplica o idioma escolhido a todos os elementos que têm
 * os atributos data-pt e data-en.
 */
function applyLang(lang) {
  // Atualiza todo elemento com data-pt / data-en
  document.querySelectorAll('[data-pt]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  // Atualiza o atributo lang do <html> (boa prática de acessibilidade)
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

  // Destaca o botão ativo (PT | EN)
  document.getElementById('langPT').classList.toggle('active', lang === 'pt');
  document.getElementById('langEN').classList.toggle('active', lang === 'en');

  // Persiste a escolha
  localStorage.setItem('lang', lang);

  // Atualiza a URL sem recarregar a página
  const url = new URL(window.location.href);
  url.searchParams.set('lang', lang);
  window.history.replaceState(null, '', url.toString());
}

// Expõe o idioma atual como variável de módulo
let currentLang = getInitialLang();

// Aplica ao carregar
applyLang(currentLang);

// Alterna ao clicar no botão PT | EN
document.getElementById('langToggle').addEventListener('click', () => {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  applyLang(currentLang);
});


/* =============================================
  2. Menu mobile (hambúrguer)
=============================================== */
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen.toString());
  menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
});

// Fecha o menu ao clicar em qualquer link dentro dele
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
