# Portfólio — Rodolfo Batista de Morais

Site estático de currículo e portfólio hospedado no GitHub Pages.

## Estrutura

```
/
├── index.html   → estrutura e conteúdo (PT + EN juntos via data-pt / data-en)
├── style.css    → todos os estilos, organizado por seção
├── script.js    → troca de idioma e menu mobile
└── README.md    → este arquivo
```

## Como hospedar no GitHub Pages

1. Crie um repositório no GitHub (pode ser público ou privado com Pages habilitado).
2. Faça o push desses três arquivos na branch `main`.
3. Vá em **Settings → Pages** e configure a source como `main / root`.
4. Configure o domínio customizado em **Settings → Pages → Custom domain**:
   `rodolfobatistademorais.com.br`
5. No painel do seu registrador de domínio, aponte o DNS para o GitHub Pages:
   - Tipo A: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Tipo CNAME: `www` → `<seu-usuario>.github.io`

## Sistema de idiomas

O site tem PT e EN no mesmo arquivo HTML. Cada elemento traduzível usa dois atributos:

```html
<p data-pt="Texto em português" data-en="Text in English">
  Texto em português
</p>
```

O `script.js` lê o atributo certo e substitui o `textContent`.

### Links por idioma

- Versão portuguesa: `https://rodolfobatistademorais.com.br/?lang=pt`
- Versão inglesa:    `https://rodolfobatistademorais.com.br/?lang=en`
- Sem parâmetro → abre em PT por padrão

### Adicionar uma nova string traduzível

Basta adicionar `data-pt="..."` e `data-en="..."` no elemento. O script cuida do resto automaticamente.

## Como adicionar projetos

No `index.html`, dentro da seção `#projetos`, há um template de card comentado. Basta copiar, descomentar e preencher:

```html
<article class="project-card">
  <div class="project-card__header">
    <h3 class="project-card__title">Nome do Projeto</h3>
    ...
  </div>
  <p class="project-card__desc"
    data-pt="Descrição em PT."
    data-en="Description in EN.">
    Descrição em PT.
  </p>
  <div class="project-card__tags">
    <span class="tag">Python</span>
  </div>
</article>
```

Quando tiver projetos, remova o parágrafo com a classe `placeholder-text`.

## Personalização rápida

A maioria das mudanças visuais está nas variáveis CSS no topo do `style.css`:

```css
:root {
  --color-accent:       #2a6dd9;   /* cor principal (links, avatar, marcadores) */
  --color-accent-light: #e8f0fd;   /* fundo claro do acento */
  --color-text:         #1a1a1a;   /* texto principal */
  --color-text-muted:   #6b7280;   /* texto secundário */
  --color-border:       #e5e7eb;   /* bordas */
  --color-bg:           #ffffff;   /* fundo das seções pares */
  --color-bg-alt:       #f8f9fb;   /* fundo das seções alternadas */
}
```
