// Importa helpers
import { getCarrinho, removerDoCarrinho, atualizarQtd, totalValor, limparCarrinho, R } from './dados.js';

// ==========================================
// ELEMENTOS
// ==========================================
const lista = document.getElementById('listaCarrinho');
const subtotalEl = document.getElementById('subtotal');
const freteEl = document.getElementById('frete');
const totalEl = document.getElementById('total');
const carrinhoVazio = document.getElementById('carrinhoVazio');
const carrinhoLayout = document.getElementById('carrinhoLayout');
const btnCheckout = document.getElementById('btnCheckout');
const btnLimpar = document.getElementById('btnLimpar');

// ==========================================
// RENDERIZA
// ==========================================
function renderizar() {
  const carrinho = getCarrinho();

  // Carrinho vazio
  if (carrinho.length === 0) {
    carrinhoLayout.classList.add('hidden');
    carrinhoVazio.classList.remove('hidden');
    return;
  }

  carrinhoLayout.classList.remove('hidden');
  carrinhoVazio.classList.add('hidden');

  // Renderiza cada item
  lista.innerHTML = carrinho.map(item => `
    <div class="item-carrinho" data-id="${item.id}">
      <div class="img-produto">
        <img 
          src="${item.imagem || 'https://placehold.co/200x200/1a1a2e/a855f7?text=Produto'}" 
          alt="${item.nome}"
          onerror="this.onerror=null; this.src='https://placehold.co/200x200/1a1a2e/a855f7?text=Produto'"
        >
      </div>

      <div class="info">
        <h4>${item.nome}</h4>
        <span class="preco-unit">${R(item.preco)} cada</span>
        <span class="preco-total">${R(item.preco * item.qtd)}</span>
      </div>

      <div class="controles">
        <button class="qty-btn" data-acao="sub" data-id="${item.id}">−</button>
        <span class="qty">${item.qtd}</span>
        <button class="qty-btn" data-acao="add" data-id="${item.id}">+</button>
        <button class="btn-remover" data-acao="remover" data-id="${item.id}" title="Remover">🗑️</button>
      </div>
    </div>
  `).join('');

  atualizarResumo();
}

// ==========================================
// ATUALIZA O RESUMO
// ==========================================
function atualizarResumo() {
  const subtotal = totalValor();
  const frete = subtotal >= 200 ? 0 : 19.90;
  const total = subtotal + frete;

  subtotalEl.textContent = R(subtotal);
  freteEl.textContent = frete === 0 ? 'Grátis 🎉' : R(frete);
  totalEl.textContent = R(total);
}

// ==========================================
// AÇÕES DOS ITENS
// ==========================================
lista.addEventListener('click', e => {
  const btn = e.target.closest('[data-acao]');
  if (!btn) return;

  const acao = btn.dataset.acao;
  const id = +btn.dataset.id;
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === id);

  if (!item) return;

  if (acao === 'sub') {
    atualizarQtd(id, item.qtd - 1);
  } else if (acao === 'add') {
    atualizarQtd(id, item.qtd + 1);
  } else if (acao === 'remover') {
    removerDoCarrinho(id);
  }

  renderizar();
});

// ==========================================
// BOTÃO FINALIZAR
// ==========================================
btnCheckout?.addEventListener('click', (e) => {
  if (getCarrinho().length === 0) {
    e.preventDefault();
    alert('Seu carrinho está vazio!');
  }
});

// ==========================================
// BOTÃO LIMPAR CARRINHO
// ==========================================
btnLimpar?.addEventListener('click', () => {
  if (confirm('Tem certeza que quer limpar o carrinho?')) {
    limparCarrinho();
    renderizar();
  }
});

// ==========================================
// INICIALIZA
// ==========================================
renderizar();