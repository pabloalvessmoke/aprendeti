/**
 * AprendeTI — script.js
 * Página inicial: carrega aulas do JSON, gera cards, pesquisa e filtros
 */

const CONTEUDOS_URL = 'data/conteudos.json';

let todasAulas = [];
let categoriaAtiva = 'Todas';
let termoBusca = '';

/* -----------------------------------------------
   Carrega o JSON e inicializa a página
   ----------------------------------------------- */
async function init() {
  try {
    const resp = await fetch(CONTEUDOS_URL);
    if (!resp.ok) throw new Error('Falha ao carregar conteúdos');
    todasAulas = await resp.json();
    construirFiltros();
    renderizarCards();
  } catch (err) {
    document.getElementById('cards-grid').innerHTML =
      `<div class="no-results">
         <h3>Erro ao carregar aulas</h3>
         <p>${err.message}</p>
       </div>`;
  }
}

/* -----------------------------------------------
   Constrói os botões de categoria dinamicamente
   ----------------------------------------------- */
function construirFiltros() {
  const categorias = ['Todas', ...new Set(todasAulas.map(a => a.categoria))];
  const filterBar = document.getElementById('filter-bar');
  filterBar.innerHTML = '';

  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (cat === 'Todas' ? ' active' : '');
    btn.textContent = cat;
    btn.setAttribute('data-categoria', cat);
    btn.addEventListener('click', () => selecionarCategoria(cat));
    filterBar.appendChild(btn);
  });
}

/* -----------------------------------------------
   Seleciona uma categoria ativa
   ----------------------------------------------- */
function selecionarCategoria(categoria) {
  categoriaAtiva = categoria;
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.categoria === categoria);
  });
  renderizarCards();
}

/* -----------------------------------------------
   Filtra e renderiza os cards
   ----------------------------------------------- */
function renderizarCards() {
  const termo = termoBusca.toLowerCase().trim();

  const filtradas = todasAulas.filter(aula => {
    const matchCategoria =
      categoriaAtiva === 'Todas' || aula.categoria === categoriaAtiva;

    const matchBusca =
      !termo ||
      aula.titulo.toLowerCase().includes(termo) ||
      aula.categoria.toLowerCase().includes(termo) ||
      aula.descricao.toLowerCase().includes(termo) ||
      (aula.palavrasChave || []).some(p => p.toLowerCase().includes(termo));

    return matchCategoria && matchBusca;
  });

  const grid = document.getElementById('cards-grid');
  const counter = document.getElementById('result-count');

  counter.innerHTML = `Exibindo <span>${filtradas.length}</span> aula${filtradas.length !== 1 ? 's' : ''}`;

  if (filtradas.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>Nenhuma aula encontrada</h3>
        <p>Tente outros termos de busca ou remova os filtros.</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtradas.map(aula => criarCardHTML(aula)).join('');
}

/* -----------------------------------------------
   Gera o HTML de um card
   ----------------------------------------------- */
function criarCardHTML(aula) {
  return `
    <div class="card" onclick="window.location.href='aula.html?id=${aula.id}'">
      <span class="card-category">${escHtml(aula.categoria)}</span>
      <h2 class="card-title">${escHtml(aula.titulo)}</h2>
      <p class="card-desc">${escHtml(aula.descricao)}</p>
      <a class="card-link" href="aula.html?id=${aula.id}" onclick="event.stopPropagation()">
        Acessar aula
      </a>
    </div>`;
}

/* -----------------------------------------------
   Escape HTML simples para evitar XSS
   ----------------------------------------------- */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* -----------------------------------------------
   Listeners
   ----------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const campoBusca = document.getElementById('campo-busca');

  campoBusca.addEventListener('input', e => {
    termoBusca = e.target.value;
    renderizarCards();
  });

  // Limpar busca com Escape
  campoBusca.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      campoBusca.value = '';
      termoBusca = '';
      renderizarCards();
    }
  });

  init();
});
