/**
 * AprendeTI — aula.js
 * Página de aula: lê o ID da URL, carrega o JSON e renderiza o conteúdo
 */

const CONTEUDOS_URL = 'data/conteudos.json';

/* -----------------------------------------------
   Parseia o conteúdo em texto rico (Markdown-like simples)
   ----------------------------------------------- */
function parseConteudo(texto) {
  // Divide o texto em blocos por linha dupla (\n\n)
  const blocos = texto.split(/\n\n+/);
  let html = '';

  blocos.forEach(bloco => {
    const trimmed = bloco.trim();

    if (!trimmed) return;

    // Bloco de código: começa com ```
    if (trimmed.startsWith('```')) {
      const codigo = trimmed.replace(/^```[a-z]*\n?/, '').replace(/```$/, '').trim();
      html += `<pre><code>${escHtml(codigo)}</code></pre>`;
      return;
    }

    // Processamento linha por linha dentro do bloco
    const linhas = trimmed.split('\n');
    const listaItems = [];
    let textoBloco = '';

    linhas.forEach(linha => {
      // Título com **Texto:** no início da linha
      if (/^\*\*[^*]+\*\*/.test(linha) && linha.endsWith('**')) {
        const tit = linha.replace(/\*\*/g, '');
        textoBloco += `<h2>${escHtml(tit)}</h2>`;
        return;
      }

      // Item de lista: - texto ou ✅ texto
      if (/^[-✅•]\s/.test(linha)) {
        listaItems.push(linha.replace(/^[-✅•]\s/, '').trim());
        return;
      }

      // Linha normal: processa bold inline **texto**
      textoBloco += `<p>${parseBold(linha)}</p>`;
    });

    if (listaItems.length) {
      html += '<ul>' + listaItems.map(i => `<li>${parseBold(i)}</li>`).join('') + '</ul>';
    }
    html += textoBloco;
  });

  return html;
}

/* Processa negrito **texto** e código inline `código` */
function parseBold(str) {
  return escHtml(str)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

/* Escape HTML */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* -----------------------------------------------
   Obtém o ID da URL (?id=N)
   ----------------------------------------------- */
function getIdDaURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10);
}

/* -----------------------------------------------
   Renderiza a aula na página
   ----------------------------------------------- */
function renderizarAula(aula, todas) {
  // Atualiza o <title> e meta description
  document.title = `${aula.titulo} — AprendeTI`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', aula.descricao);

  // Breadcrumb
  document.getElementById('aula-categoria-badge').textContent = aula.categoria;
  document.getElementById('aula-breadcrumb-categoria').textContent = aula.categoria;

  // Título e descrição
  document.getElementById('aula-titulo').textContent = aula.titulo;
  document.getElementById('aula-desc').textContent = aula.descricao;

  // Palavras-chave
  const kwBar = document.getElementById('keywords-bar');
  if (aula.palavrasChave && aula.palavrasChave.length) {
    kwBar.innerHTML = aula.palavrasChave
      .map(k => `<span class="keyword-tag">${escHtml(k)}</span>`)
      .join('');
  }

  // Conteúdo principal
  document.getElementById('aula-conteudo').innerHTML = parseConteudo(aula.conteudo);

  // Navegação anterior/próxima
  const idx = todas.findIndex(a => a.id === aula.id);
  const anterior = todas[idx - 1] || null;
  const proximo  = todas[idx + 1] || null;

  const navEl = document.getElementById('lesson-nav');
  let navHtml = '';

  if (anterior) {
    navHtml += `<a class="lesson-nav-btn secondary" href="aula.html?id=${anterior.id}">
      ← Anterior: ${escHtml(anterior.titulo)}
    </a>`;
  }

  if (proximo) {
    navHtml += `<a class="lesson-nav-btn primary" href="aula.html?id=${proximo.id}">
      Próxima: ${escHtml(proximo.titulo)} →
    </a>`;
  }

  navEl.innerHTML = navHtml;
}

/* -----------------------------------------------
   Init
   ----------------------------------------------- */
async function init() {
  const id = getIdDaURL();

  if (!id || isNaN(id)) {
    document.getElementById('aula-conteudo').innerHTML =
      `<div class="error-state">
         <h2>Aula não encontrada</h2>
         <p>O ID informado não é válido.</p>
         <a class="lesson-nav-btn primary" href="index.html" style="display:inline-flex;margin-top:16px">
           ← Voltar ao início
         </a>
       </div>`;
    return;
  }

  try {
    const resp = await fetch(CONTEUDOS_URL);
    if (!resp.ok) throw new Error('Falha ao carregar conteúdos');
    const todas = await resp.json();
    const aula = todas.find(a => a.id === id);

    if (!aula) {
      throw new Error(`Aula com ID ${id} não encontrada.`);
    }

    renderizarAula(aula, todas);
  } catch (err) {
    document.getElementById('aula-conteudo').innerHTML =
      `<div class="error-state">
         <h2>Erro</h2>
         <p>${err.message}</p>
         <a class="lesson-nav-btn primary" href="index.html" style="display:inline-flex;margin-top:16px">
           ← Voltar ao início
         </a>
       </div>`;
  }
}

document.addEventListener('DOMContentLoaded', init);
