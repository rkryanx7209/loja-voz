// ==========================================
// CARRINHO (LocalStorage)
// ==========================================

// Lê o carrinho do LocalStorage
export function getCarrinho() {
  return JSON.parse(localStorage.getItem('geekzone_carrinho') || '[]');
}

// Salva o carrinho no LocalStorage
export function setCarrinho(carrinho) {
  localStorage.setItem('geekzone_carrinho', JSON.stringify(carrinho));
  window.dispatchEvent(new Event('storage'));
}

// Adiciona um produto ao carrinho
export function adicionarAoCarrinho(produto) {
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === produto.id);

  if (item) {
    item.qtd++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,   // ✅ CORRIGIDO (era "emoji")
      qtd: 1,
    });
  }

  setCarrinho(carrinho);
  return carrinho;
}

// Remove um produto do carrinho
export function removerDoCarrinho(id) {
  const carrinho = getCarrinho().filter(i => i.id !== id);
  setCarrinho(carrinho);
  return carrinho;
}

// Atualiza a quantidade
export function atualizarQtd(id, qtd) {
  const carrinho = getCarrinho();
  const item = carrinho.find(i => i.id === id);

  if (item) {
    if (qtd <= 0) {
      return removerDoCarrinho(id);
    }
    item.qtd = qtd;
  }

  setCarrinho(carrinho);
  return carrinho;
}

// Limpa o carrinho
export function limparCarrinho() {
  setCarrinho([]);
  return [];
}

// Total de itens no carrinho
export function totalItens() {
  return getCarrinho().reduce((s, i) => s + i.qtd, 0);
}

// Valor total do carrinho
export function totalValor() {
  return getCarrinho().reduce((s, i) => s + i.preco * i.qtd, 0);
}

// ==========================================
// HELPERS
// ==========================================
export const R = v => 'R$ ' + v.toFixed(2).replace('.', ',');