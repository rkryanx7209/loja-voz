// Importa produtos e helpers
import { PRODUTOS } from './produtos.js';
import { adicionarAoCarrinho, totalItens, R } from './dados.js';

// ==========================================
// ESTADO
// ==========================================
let categoriaAtual = 'todos';
let buscaAtual = '';

// ==========================================
// ELEMENTOS
// ==========================================
const grid = document.getElementById('gridProdutos');
const buscaInput = document.getElementById('busca');
const cartCount = document.getElementById('cartCount');
const emptyMsg = document.getElementById('emptyMsg');
const toast = document.getElementById('toast');

// ==========================================
// RENDERIZA OS PRODUTOS
// ==========================================
function renderizar() {
  let produtos = PRODUTOS;

  // Filtro por categoria
  if (categoriaAtual !== 'todos') {
    produtos = produtos.filter(p => p.categoria === categoriaAtual);
  }

  // Filtro por busca
  if (buscaAtual) {
    produtos = produtos.filter(p =>
      p.nome.toLowerCase().includes(buscaAtual.toLowerCase()) ||
      p.descricao.toLowerCase().includes(buscaAtual.toLowerCase())
    );
  }

  // Nenhum produto encontrado
  if (produtos.length === 0) {
    grid.innerHTML = '';
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');

  // Renderiza os cards
  grid.innerHTML = produtos.map(p => `
    <article class="card-produto" data-id="${p.id}">
      <div class="img-wrapper">
        <img 
          src="${p.imagem}" 
          alt="${p.nome}" 
          loading="lazy"
          onerror="this.onerror=null; this.src='https://placehold.co/600x600/1a1a2e/a855f7?text=${encodeURIComponent(p.nome)}'"
        >
      </div>
      <span class="categoria">${p.categoria}</span>
      <h3>${p.nome}</h3>
      <div class="preco">
        ${R(p.preco)}
        ${p.precoAntigo ? `<span class="preco-antigo">${R(p.precoAntigo)}</span>` : ''}
      </div>
      <button class="btn btn-add" data-add="${p.id}">
        🛒 Adicionar
      </button>
    </article>
  `).join('');
}

// ==========================================
// CONTADOR DO CARRINHO
// ==========================================
function atualizarContador() {
  cartCount.textContent = totalItens();
}

// ==========================================
// TOAST DE FEEDBACK
// ==========================================
let toastTimer = null;

function mostrarToast(mensagem) {
  if (!toast) return;
  toast.textContent = mensagem;
  toast.classList.add('ativo');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('ativo'), 2000);
}

// ==========================================
// FILTROS DE CATEGORIA
// ==========================================
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    categoriaAtual = btn.dataset.cat;
    renderizar();
  });
});

// ==========================================
// BUSCA
// ==========================================
buscaInput.addEventListener('input', (e) => {
  buscaAtual = e.target.value.trim();
  renderizar();
});

// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-add]');
  if (!btn) return;

  const id = +btn.dataset.add;
  const produto = PRODUTOS.find(p => p.id === id);

  if (produto) {
    adicionarAoCarrinho(produto);
    atualizarContador();
    mostrarToast(`✅ ${produto.nome} adicionado!`);

    // Feedback visual no botão
    btn.textContent = '✅ Adicionado!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    setTimeout(() => {
      btn.textContent = '🛒 Adicionar';
      btn.style.background = '';
    }, 1000);
  }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================
renderizar();
atualizarContador();