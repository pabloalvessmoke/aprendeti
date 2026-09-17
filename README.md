# AprendeTI

**Projeto de Atividade Extensionista — UNINTER**

Site educacional para ensinar conceitos básicos de tecnologia para iniciantes, promovendo inclusão digital.

## 🌐 Acesse o site

➡️ [https://pabloalvessmoke.github.io/aprendeti](https://pabloalvessmoke.github.io/aprendeti)

## 📚 Sobre o projeto

O **AprendeTI** é um site estático desenvolvido com HTML, CSS e JavaScript puro (sem frameworks e sem backend), criado como parte de uma Atividade Extensionista da **UNINTER**. O objetivo é ensinar tecnologia de forma simples e acessível para pessoas que estão começando do zero.

### Categorias de conteúdo

| Categoria           | Nº de Aulas |
|---------------------|-------------|
| Informática Básica  | 3           |
| Internet            | 2           |
| HTML                | 2           |
| CSS                 | 2           |
| JavaScript          | 2           |
| Front-end           | 2           |
| Back-end            | 2           |
| Banco de Dados      | 2           |
| SQL                 | 2           |
| Segurança Digital   | 2           |
| **Total**           | **21**      |

## 🗂️ Estrutura do projeto

```
aprendeti/
├── index.html          # Página inicial com cards e busca
├── aula.html           # Página de exibição de cada aula
├── css/
│   └── style.css       # Todos os estilos do site
├── js/
│   ├── script.js       # Lógica da página inicial
│   └── aula.js         # Lógica da página de aula
├── data/
│   └── conteudos.json  # Todas as aulas (ID, título, conteúdo...)
└── img/
    └── logo.svg        # Logo do site
```

## 🚀 Como executar localmente

Por usar `fetch()` para carregar o JSON, é necessário um servidor local (não funciona diretamente com `file://`). Use qualquer uma dessas opções:

**VS Code — Live Server:**
Instale a extensão **Live Server** e clique em "Go Live".

**Python:**
```bash
python -m http.server 8080
```
Acesse: `http://localhost:8080`

**Node.js:**
```bash
npx serve .
```

## 🌍 Publicação no GitHub Pages

1. Vá em **Settings** → **Pages** no repositório.
2. Em **Source**, selecione a branch `main` e pasta `/ (root)`.
3. Clique em **Save**.
4. Aguarde alguns minutos e acesse o link gerado.

## 🛠️ Tecnologias utilizadas

- **HTML5** — Estrutura semântica
- **CSS3** — Estilização com Flexbox e Grid
- **JavaScript (ES6+)** — Interatividade e `fetch API`
- **Google Fonts** — Fonte Poppins
- **JSON** — Armazenamento das aulas

## 📝 Funcionalidades

- ✅ Carregamento dinâmico das aulas via `fetch()`
- ✅ Pesquisa por título, categoria e palavras-chave
- ✅ Filtro por categoria
- ✅ Navegação entre aulas (anterior/próxima)
- ✅ Layout responsivo (mobile, tablet, desktop)
- ✅ URL amigável com parâmetro `?id=`
- ✅ 21 aulas com 300-500 palavras cada

---

*Desenvolvido com ❤️ para promover a inclusão digital.*
