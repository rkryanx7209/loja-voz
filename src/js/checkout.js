import { getCarrinho, limparCarrinho, totalValor, R } from './dados.js';

const form = document.getElementById('formCheckout');
const itensResumo = document.getElementById('itensResumo');
const totalFinal = document.getElementById('totalFinal');
const modalSucesso = document.getElementById('modalSucesso');
const nomeCliente = document.getElementById('nomeCliente');

// Renderiza o resumo
function renderizarResumo() {
  const carrinho = getCarrinho();

  if (carrinho.length === 0) {
    window.location.href = 'carrinho.html';
    return;
  }

  itensResumo.innerHTML = carrinho.map(item => `
    <div class="item-resumo">
      <span>${item.qtd}× ${item.nome}</span>
      <span>${R(item.preco * item.qtd)}</span>
    </div>
  `).join('');

  totalFinal.textContent = R(totalValor());
}

// Finalizar pedido
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const carrinho = getCarrinho();

  if (carrinho.length === 0) return;

  // Simula o processamento
  setTimeout(() => {
    // Mostra o modal de sucesso
    nomeCliente.textContent = nome;
    modalSucesso.classList.remove('hidden');

    // Limpa o carrinho
    limparCarrinho();
  }, 800);
});

renderizarResumo();