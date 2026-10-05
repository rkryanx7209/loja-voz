// ==========================================
// 🎤 CONTROLE POR VOZ — GEEKZONE
// ==========================================
const robo = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
robo.lang = 'pt-BR';
robo.continuous = false;
robo.interimResults = false;
robo.maxAlternatives = 1;

// ==========================================
// FUNÇÃO: ABRIR MODAL E OUVIR
// ==========================================
function ouvir() {
  const modal = document.getElementById('vozModal');
  if (modal) modal.classList.remove('hidden');

  const resposta = document.getElementById('vozResposta');
  if (resposta) resposta.innerHTML = '🎤 Ouvindo...';

  try {
    robo.start();
  } catch (e) {
    robo.stop();
    setTimeout(() => robo.start(), 200);
  }
}

// ==========================================
// FUNÇÃO: FECHAR MODAL
// ==========================================
function fecharVoz() {
  const modal = document.getElementById('vozModal');
  if (modal) modal.classList.add('hidden');
  robo.stop();
}

// ==========================================
// QUANDO RECEBE O RESULTADO
// ==========================================
robo.onresult = function(evento) {
  const fala = evento.results[0][0].transcript.toLowerCase().trim();
  const tela = document.getElementById('vozResposta');
  const busca = document.getElementById('busca');

  // ======================================
  // ☀️ TEMA CLARO
  // ======================================
  if (fala.includes('claro') || fala.includes('luz') || fala.includes('branco') || fala.includes('dia')) {
    document.body.classList.add('claro');
    if (tela) tela.innerHTML = '☀️ Tema claro ativado.';
    setTimeout(fecharVoz, 1200);
  }

  // ======================================
  // 🌙 TEMA ESCURO
  // ======================================
  else if (fala.includes('escuro') || fala.includes('preto') || fala.includes('noite')) {
    document.body.classList.remove('claro');
    if (tela) tela.innerHTML = '🌙 Tema escuro ativado.';
    setTimeout(fecharVoz, 1200);
  }

  // ======================================
  // 🎁 DESCONTO
  // ======================================
  else if (fala.includes('desconto') || fala.includes('cupom')) {
    localStorage.setItem('geekzone_cupom', 'VOZ10');
    if (tela) tela.innerHTML = '🎁 Desconto de 10% aplicado!';
    setTimeout(fecharVoz, 1500);
  }

  // ======================================
  // 🚚 FRETE
  // ======================================
  else if (fala.includes('frete') || fala.includes('entrega')) {
    if (tela) tela.innerHTML = '🚚 Frete grátis acima de R$ 200!';
    setTimeout(fecharVoz, 1500);
  }

  // ======================================
  // 🛒 CARRINHO
  // ======================================
  else if (fala.includes('carrinho') || fala.includes('compras')) {
    if (tela) tela.innerHTML = '🛒 Abrindo carrinho...';
    setTimeout(() => {
      window.location.href = 'carrinho.html';
    }, 800);
  }

  // ======================================
  // 📞 CONTATO
  // ======================================
  else if (fala.includes('contato') || fala.includes('falar com')) {
    if (tela) tela.innerHTML = '📞 Abrindo contato...';
    setTimeout(() => {
      window.location.href = 'contato.html';
    }, 800);
  }

  // ======================================
  // 💳 CHECKOUT
  // ======================================
  else if (fala.includes('checkout') || fala.includes('finalizar') || fala.includes('pagar')) {
    if (tela) tela.innerHTML = '💳 Abrindo checkout...';
    setTimeout(() => {
      window.location.href = 'checkout.html';
    }, 800);
  }

  // ======================================
  // 🏠 INÍCIO / TOPO
  // ======================================
  else if (fala.includes('início') || fala.includes('inicio') || fala.includes('topo')) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tela) tela.innerHTML = '🏠 Voltando ao topo.';
    setTimeout(fecharVoz, 1000);
  }

  // ======================================
  // 💻 CATEGORIA: INFORMÁTICA
  // ======================================
  else if (fala.includes('informática') || fala.includes('informatica') || fala.includes('computador')) {
    document.querySelector('.filtro-btn[data-cat="informatica"]')?.click();
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
    if (tela) tela.innerHTML = '💻 Mostrando Informática.';
    setTimeout(fecharVoz, 1200);
  }

  // ======================================
  // 🎁 CATEGORIA: COLECIONÁVEIS
  // ======================================
  else if (fala.includes('colecionáveis') || fala.includes('colecionaveis') || fala.includes('coleção')) {
    document.querySelector('.filtro-btn[data-cat="colecionaveis"]')?.click();
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
    if (tela) tela.innerHTML = '🎁 Mostrando Colecionáveis.';
    setTimeout(fecharVoz, 1200);
  }

  // ======================================
  // 🎮 CATEGORIA: GAMES
  // ======================================
  else if (fala.includes('games') || fala.includes('jogos') || fala.includes('game')) {
    document.querySelector('.filtro-btn[data-cat="games"]')?.click();
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
    if (tela) tela.innerHTML = '🎮 Mostrando Games.';
    setTimeout(fecharVoz, 1200);
  }

  // ======================================
  // 🎧 CATEGORIA: ACESSÓRIOS
  // ======================================
  else if (fala.includes('acessórios') || fala.includes('acessorios') || fala.includes('acessorio')) {
    document.querySelector('.filtro-btn[data-cat="acessorios"]')?.click();
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
    if (tela) tela.innerHTML = '🎧 Mostrando Acessórios.';
    setTimeout(fecharVoz, 1200);
  }

  // ======================================
  // 🎯 TODOS OS PRODUTOS
  // ======================================
  else if (fala.includes('produto') || fala.includes('todos') || fala.includes('catálogo') || fala.includes('catalogo')) {
    document.querySelector('.filtro-btn[data-cat="todos"]')?.click();
    if (busca) {
      busca.value = '';
      busca.dispatchEvent(new Event('input'));
    }
    document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(fecharVoz, 1200);
    if (tela) tela.innerHTML = '🎮 Mostrando todos os produtos.';
  }

  // ======================================
  // 🔍 BUSCA POR NOME DE PRODUTO
  // ======================================
  else {
    // Lista de palavras-chave dos produtos
    const palavrasChave = [
      { termo: 'teclado', busca: 'teclado' },
      { termo: 'mouse', busca: 'mouse' },
      { termo: 'headset', busca: 'headset' },
      { termo: 'monitor', busca: 'monitor' },
      { termo: 'webcam', busca: 'webcam' },
      { termo: 'câmera', busca: 'webcam' },
      { termo: 'funko', busca: 'funko' },
      { termo: 'action figure', busca: 'action' },
      { termo: 'boneco', busca: 'action' },
      { termo: 'lego', busca: 'lego' },
      { termo: 'homem de ferro', busca: 'iron' },
      { termo: 'iron man', busca: 'iron' },
      { termo: 'batman', busca: 'batman' },
      { termo: 'goku', busca: 'goku' },
      { termo: 'naruto', busca: 'naruto' },
      { termo: 'controle', busca: 'controle' },
      { termo: 'xbox', busca: 'xbox' },
      { termo: 'playstation', busca: 'dualsense' },
      { termo: 'ps5', busca: 'dualsense' },
      { termo: 'nintendo', busca: 'nintendo' },
      { termo: 'switch', busca: 'nintendo' },
      { termo: 'console', busca: 'console' },
      { termo: 'retro', busca: 'retro' },
      { termo: 'mousepad', busca: 'mousepad' },
      { termo: 'suporte', busca: 'suporte' },
      { termo: 'hub', busca: 'hub' },
      { termo: 'usb', busca: 'usb' },
      { termo: 'cadeira', busca: 'cadeira' },
      { termo: 'gamer', busca: 'gamer' },
      { termo: 'rgb', busca: 'rgb' },
    ];

    // Encontra o primeiro termo que bate
    const match = palavrasChave.find(p => fala.includes(p.termo));

    if (match) {
      // Tem correspondência específica
      if (busca) {
        busca.value = match.busca;
        busca.dispatchEvent(new Event('input'));
      }
      document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
      if (tela) tela.innerHTML = `🔍 Buscando: "${match.busca}"`;
      setTimeout(fecharVoz, 1200);
    } else {
      // Não tem correspondência → busca pelo texto bruto
      if (busca) {
        busca.value = fala;
        busca.dispatchEvent(new Event('input'));
      }
      document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' });
      if (tela) tela.innerHTML = `🔍 Buscando: "${fala}"`;
      setTimeout(fecharVoz, 1200);
    }
  }
};

// ==========================================
// QUANDO COMEÇA
// ==========================================
robo.onstart = function() {
  console.log('🎤 Microfone ligado');
};

// ==========================================
// QUANDO TERMINA
// ==========================================
robo.onend = function() {
  console.log('🔇 Microfone desligado');
};

// ==========================================
// ERROS
// ==========================================
robo.onerror = function(evento) {
  const tela = document.getElementById('vozResposta');
  if (!tela) return;

  if (evento.error === 'no-speech') {
    tela.innerHTML = '😢 Nenhuma fala detectada';
  } else if (evento.error === 'not-allowed') {
    tela.innerHTML = '🚫 Permissão negada';
  } else {
    tela.innerHTML = '❌ Erro: ' + evento.error;
  }
};

// ==========================================
// GARANTE QUE AS FUNÇÕES SÃO GLOBAIS
// ==========================================
window.ouvir = ouvir;
window.fecharVoz = fecharVoz;