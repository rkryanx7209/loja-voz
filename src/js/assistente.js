// ==========================================
// 🤖 ASSISTENTE DE PAGAMENTO POR VOZ
// ==========================================
// Funciona SOMENTE na página checkout.html
// Guia o usuário passo a passo, preenchendo o formulário
// E mostra a fala em tempo real

// Verifica se está na página certa
const paginaAtual = window.location.pathname.split('/').pop();

if (paginaAtual !== 'checkout.html') {
  console.log('ℹ️ Assistente só funciona na página de checkout.');
} else {

  // ==========================================
  // CRIA O ROBÔ
  // ==========================================
  const roboPagamento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  roboPagamento.lang = 'pt-BR';
  roboPagamento.continuous = false;
  roboPagamento.interimResults = true;   // ✅ ATIVADO — mostra em tempo real
  roboPagamento.maxAlternatives = 1;

  // ==========================================
  // ESTADO DO ASSISTENTE
  // ==========================================
  let passoAtual = 0;

  // Lista de passos
  const passos = [
    {
      campo: 'nome',
      pergunta: 'Qual é o seu nome completo?',
      fala: 'Vamos começar. Qual é o seu nome completo?',
      dica: 'Diga seu nome completo',
    },
    {
      campo: 'email',
      pergunta: 'Qual é o seu e-mail?',
      fala: 'Agora, qual é o seu e-mail?',
      dica: 'Diga seu e-mail',
    },
    {
      campo: 'telefone',
      pergunta: 'Qual é o seu telefone?',
      fala: 'Qual é o seu telefone com DDD?',
      dica: 'Diga seu telefone',
    },
    {
      campo: 'endereco',
      pergunta: 'Qual é o seu endereço?',
      fala: 'Qual é o seu endereço completo? Rua, número e complemento.',
      dica: 'Diga seu endereço',
    },
    {
      campo: 'cidade',
      pergunta: 'Qual é a sua cidade e estado?',
      fala: 'Qual é a sua cidade e estado?',
      dica: 'Diga sua cidade e estado',
    },
    {
      campo: 'pagamento',
      pergunta: 'Como você quer pagar?',
      fala: 'Por último, como você quer pagar? Diga Pix, cartão ou boleto.',
      dica: 'Diga Pix, cartão ou boleto',
    },
  ];

  // ==========================================
  // 🔊 FALAR (Text-to-Speech)
  // ==========================================
  function falar(texto) {
    if ('speechSynthesis' in window) {
      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'pt-BR';
      fala.rate = 0.9;
      fala.pitch = 1;
      fala.volume = 1;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(fala);
    }
  }

  // ==========================================
  // 🎤 ABRIR ASSISTENTE
  // ==========================================
  function abrirAssistentePagamento() {
    passoAtual = 1;

    const modal = document.getElementById('vozModal');
    if (modal) modal.classList.remove('hidden');

    atualizarTela();
    falar(passos[0].fala);

    setTimeout(() => iniciarEscuta(), 1800);
  }

  // ==========================================
  // 🎤 FECHAR ASSISTENTE
  // ==========================================
  function fecharAssistentePagamento() {
    const modal = document.getElementById('vozModal');
    if (modal) modal.classList.add('hidden');
    roboPagamento.stop();
    window.speechSynthesis.cancel();
    passoAtual = 0;
  }

  // ==========================================
  // 🎨 ATUALIZAR TELA DO MODAL
  // ==========================================
  function atualizarTela() {
    const tela = document.getElementById('vozResposta');
    const titulo = document.getElementById('vozTitulo');
    const sub = document.getElementById('vozSubtitulo');

    if (passoAtual > 0 && passoAtual <= passos.length) {
      const p = passos[passoAtual - 1];
      if (titulo) titulo.textContent = `Passo ${passoAtual} de ${passos.length}`;
      if (sub) sub.textContent = p.dica;
      if (tela) {
        tela.innerHTML = `
          <div class="transcricao-passo">
            <div class="transcricao-icon">🤖</div>
            <div class="transcricao-pergunta">${p.pergunta}</div>
            <div class="transcricao-ouvindo">
              <span class="mic-pulse">🎤</span> Ouvindo...
            </div>
            <div class="transcricao-fala" id="transcricaoFala"></div>
          </div>
        `;
      }
    }
  }

  // ==========================================
  // 🎤 INICIAR ESCUTA
  // ==========================================
  function iniciarEscuta() {
    try {
      roboPagamento.start();
    } catch (e) {
      roboPagamento.stop();
      setTimeout(() => roboPagamento.start(), 200);
    }
  }

  // ==========================================
  // ✅ SALVAR RESPOSTA E AVANÇAR
  // ==========================================
  function salvarResposta(texto) {
    const p = passos[passoAtual - 1];
    const campo = document.getElementById(p.campo);

    if (p.campo === 'pagamento') {
      tratarPagamento(texto);
      return;
    }

    if (campo) {
      let valor = texto;
      if (p.campo === 'telefone') valor = texto.replace(/[^\d]/g, '');
      if (p.campo === 'email') valor = texto.replace(/\s/g, '');
      campo.value = valor;

      // Efeito visual no campo preenchido
      campo.classList.add('campo-preenchido');
      setTimeout(() => campo.classList.remove('campo-preenchido'), 1500);
    }

    // Avança
    passoAtual++;

    if (passoAtual > passos.length) {
      finalizar();
    } else {
      atualizarTela();
      setTimeout(() => {
        falar(passos[passoAtual - 1].fala);
        setTimeout(iniciarEscuta, 1200);
      }, 700);
    }
  }

  // ==========================================
  // 💳 TRATAR PAGAMENTO
  // ==========================================
  function tratarPagamento(texto) {
    const tela = document.getElementById('vozResposta');

    if (texto.includes('pix')) {
      document.getElementById('pagPix').checked = true;
      if (tela) tela.innerHTML = '💠 <b>Pix selecionado!</b><br>Obrigado!';
      falar('Pix selecionado. Tudo pronto!');
      setTimeout(finalizar, 2000);
      return;
    }

    if (texto.includes('cartão') || texto.includes('cartao') || texto.includes('crédito') || texto.includes('credito') || texto.includes('débito') || texto.includes('debito')) {
      document.getElementById('pagCartao').checked = true;
      if (tela) tela.innerHTML = '💳 <b>Cartão selecionado!</b><br>Obrigado!';
      falar('Cartão selecionado. Tudo pronto!');
      setTimeout(finalizar, 2000);
      return;
    }

    if (texto.includes('boleto')) {
      document.getElementById('pagBoleto').checked = true;
      if (tela) tela.innerHTML = '📄 <b>Boleto selecionado!</b><br>Obrigado!';
      falar('Boleto selecionado. Tudo pronto!');
      setTimeout(finalizar, 2000);
      return;
    }

    // Não entendeu
    if (tela) tela.innerHTML = '❓ Não entendi. Diga <b>Pix</b>, <b>Cartão</b> ou <b>Boleto</b>.';
    falar('Não entendi. Diga Pix, cartão ou boleto.');
    setTimeout(iniciarEscuta, 2200);
  }

  // ==========================================
  // 🎉 FINALIZAR
  // ==========================================
  function finalizar() {
    const tela = document.getElementById('vozResposta');

    if (tela) {
      tela.innerHTML = `
        <div style="text-align:center;">
          <div style="font-size:3rem;margin-bottom:12px;">🎉</div>
          <strong>Tudo preenchido!</strong>
          <p style="margin-top:12px;color:#9ca3af;font-size:0.95rem;">
            Revise os dados e clique em<br>
            <b style="color:#10b981;">✅ Finalizar Pedido</b>
          </p>
        </div>
      `;
    }

    falar('Tudo preenchido. Revise os dados e clique em finalizar pedido. Obrigado!');
    setTimeout(fecharAssistentePagamento, 5000);
  }

  // ==========================================
  // 🎯 QUANDO RECEBE RESULTADO (TEMPO REAL)
  // ==========================================
  roboPagamento.onresult = function(evento) {
    const resultado = evento.results[evento.results.length - 1];
    const texto = resultado[0].transcript;
    const textoLower = texto.toLowerCase().trim();

    // 🔥 MOSTRA A FALA EM TEMPO REAL
    const falaEl = document.getElementById('transcricaoFala');
    if (falaEl) {
      falaEl.textContent = `"${texto}"`;
      falaEl.classList.add('ativo');
    }

    console.log('🤖 Ouvindo:', texto);

    // Se for resultado FINAL → salva
    if (resultado.isFinal) {
      if (falaEl) {
        falaEl.textContent = `✅ "${texto}"`;
        falaEl.classList.add('final');
      }

      if (passoAtual > 0 && passoAtual <= passos.length) {
        setTimeout(() => salvarResposta(textoLower), 300);
      }
    }
  };

  // ==========================================
  // 🎯 EVENTOS
  // ==========================================
  roboPagamento.onstart = function() {
    console.log('🤖 Assistente: microfone ligado');
    const falaEl = document.getElementById('transcricaoFala');
    if (falaEl) falaEl.textContent = '';
  };

  roboPagamento.onend = function() {
    console.log('🤖 Assistente: microfone desligado');
  };

  roboPagamento.onerror = function(evento) {
    const tela = document.getElementById('vozResposta');
    console.error('🤖 Assistente erro:', evento.error);

    if (evento.error === 'no-speech') {
      if (tela) tela.innerHTML = `
        <div style="text-align:center;">
          <div style="font-size:2rem;margin-bottom:12px;">😢</div>
          <strong>Não ouvi nada.</strong>
          <p style="margin-top:8px;color:#9ca3af;">Tente de novo...</p>
        </div>
      `;
      falar('Não ouvi nada. Tente de novo.');
      setTimeout(() => {
        atualizarTela();
        setTimeout(iniciarEscuta, 1500);
      }, 2000);
    } else if (evento.error === 'not-allowed') {
      if (tela) tela.innerHTML = '🚫 Permissão de microfone negada.';
      falar('Preciso da permissão do microfone.');
    } else {
      if (tela) tela.innerHTML = '❌ Erro: ' + evento.error;
    }
  };

  // ==========================================
  // 🌐 EXPOR GLOBAL
  // ==========================================
  window.abrirAssistentePagamento = abrirAssistentePagamento;
  window.fecharAssistentePagamento = fecharAssistentePagamento;
  window.falar = falar;
}