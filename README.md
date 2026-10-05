# 🎮 GEEKZONE — Loja Geek com Assistente de Voz

Loja virtual completa de produtos geek (informática, colecionáveis, games e acessórios) com **carrinho**, **checkout** e **assistente de voz** para acessibilidade.

🔗 **Site em produção:** [loja-voz.vercel.app](https://loja-voz.vercel.app)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🎯 Sobre o Projeto

A **GEEKZONE** é uma loja virtual completa desenvolvida com **HTML, CSS e JavaScript puro**. O grande diferencial é o **assistente de voz** que ajuda pessoas com dificuldades visuais ou motoras a navegar pela loja e preencher o pagamento.

### ✨ O que a loja tem

- 🛍️ **18 produtos** com imagens reais (Unsplash)
- 🎤 **Busca por voz** — fale "mouse", "funko", "nintendo"
- 🎨 **Tema claro/escuro** por voz — fale "claro" ou "escuro"
- 🛒 **Carrinho completo** com LocalStorage
- 💳 **Checkout com pagamento** (Pix, Cartão, Boleto)
- 🤖 **Assistente de pagamento** — guia o usuário passo a passo por voz
- 🔊 **Text-to-Speech** — o sistema fala em voz alta
- 📂 **Filtros por categoria** com comando de voz

---

## 🎤 Comandos de Voz

### 🎨 Temas
| Fale | Resultado |
|------|-----------|
| "claro" / "luz" / "branco" | ☀️ Tema claro |
| "escuro" / "preto" / "noite" | 🌙 Tema escuro |

### 🛍️ Ações
| Fale | Resultado |
|------|-----------|
| "carrinho" | 🛒 Abre o carrinho |
| "pagamento" / "pagar" | 💳 Abre o checkout |
| "desconto" / "cupom" | 🎁 Cupom de 10% |
| "frete" | 🚚 Info do frete grátis |

### 📂 Categorias
| Fale | Resultado |
|------|-----------|
| "informática" | 💻 Filtra informática |
| "colecionáveis" | 🎁 Filtra colecionáveis |
| "games" / "jogos" | 🎮 Filtra games |
| "acessórios" | 🎧 Filtra acessórios |
| "produtos" | 🎯 Mostra todos |

### 🔍 Produtos
| Fale | Resultado |
|------|-----------|
| "mouse" / "teclado" / "monitor" | 🔍 Busca o produto |
| "funko" / "nintendo" / "xbox" | 🔍 Busca o produto |
| "cadeira" / "mousepad" / "hub" | 🔍 Busca o produto |

---

## 🤖 Assistente de Pagamento

O assistente guia o usuário **passo a passo** para preencher o formulário:

1. **Nome** — "Qual é o seu nome completo?"
2. **E-mail** — "Qual é o seu e-mail?"
3. **Telefone** — "Qual é o seu telefone?"
4. **Endereço** — "Qual é o seu endereço?"
5. **Cidade** — "Qual é a sua cidade e estado?"
6. **Pagamento** — "Como você quer pagar?"

**Recursos de acessibilidade:**
- 🔊 O sistema **fala em voz alta** cada pergunta
- 👁️ **Transcrição visual** em tempo real
- 💚 **Feedback visual** nos campos preenchidos
- 🐢 Velocidade lenta da fala (para idosos)
- 🔁 Repete se não entender

---

## 🚀 Tecnologias

| Categoria | Tecnologia |
|-----------|------------|
| **Front-end** | HTML5, CSS3, JavaScript (ES Modules) |
| **Voz** | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| **Armazenamento** | LocalStorage |
| **Imagens** | Unsplash API |
| **Deploy** | Vercel |
| **Versionamento** | Git + GitHub |

---

## 📁 Estrutura do Projeto

```
loja-voz/
│
├── index.html              ← Loja virtual
├── carrinho.html           ← Carrinho de compras
├── checkout.html           ← Finalizar pedido
├── contato.html            ← Página de contato
├── README.md
│
└── src/
    ├── css/
    │   ├── global.css      ← Estilos compartilhados
    │   ├── index.css       ← Estilos da loja
    │   ├── carrinho.css    ← Estilos do carrinho
    │   ├── checkout.css    ← Estilos do checkout
    │   ├── contato.css     ← Estilos do contato
    │   ├── voz.css         ← Estilos do modal de voz
    │   └── assistente.css  ← Estilos do assistente
    │
    └── js/
        ├── produtos.js     ← Catálogo de 18 produtos
        ├── dados.js        ← Carrinho + LocalStorage
        ├── index.js        ← Lógica da loja
        ├── carrinho.js     ← Lógica do carrinho
        ├── checkout.js     ← Lógica do checkout
        ├── voz.js          ← Comandos de voz
        ├── assistente.js   ← Assistente de pagamento
        └── contato.js      ← Lógica do contato
```

---

## 🎬 Fluxo do Usuário

```
1. Usuário entra em index.html
   ↓
2. Navega pelos produtos OU usa voz "informática"
   ↓
3. Adiciona produtos ao carrinho
   ↓
4. Clica no 🛒 ou fala "carrinho"
   ↓
5. Revisa os itens no carrinho
   ↓
6. Clica em "Finalizar Compra"
   ↓
7. Chega no checkout
   ↓
8. Clica no 🤖 (assistente de voz) OU preenche manualmente
   ↓
9. Assistente guia passo a passo
   ↓
10. Escolhe forma de pagamento
    ↓
11. Finaliza pedido 🎉
```

---

## 🎨 Design

- **Fonte:** Inter (sans-serif)
- **Cores:**
  - 🟣 Roxo: `#a855f7`
  - 💗 Rosa: `#ec4899`
  - 💚 Verde: `#10b981`
  - 🎨 Ciano: `#06b6d4`
- **Tema:** Dark mode padrão + tema claro por voz
- **Ícone:** 🎮

---

## 🧪 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/rkryanx7209/loja-voz.git
   cd loja-voz
   ```

2. **Abra com Live Server:**
   - Instale a extensão **Live Server** no VS Code
   - Clique com botão direito no `index.html`
   - Escolha **Open with Live Server**

3. **Acesse:**
   ```
   http://127.0.0.1:5501/index.html
   ```

---

## 🎁 Recursos de Acessibilidade

| Recurso | Descrição |
|---------|-----------|
| 🎤 **Busca por voz** | Encontre produtos falando |
| 🔊 **Text-to-Speech** | Sistema fala em voz alta |
| 👁️ **Transcrição visual** | Texto aparece na tela enquanto fala |
| 💚 **Feedback visual** | Campos piscam ao serem preenchidos |
| 🐢 **Velocidade lenta** | Fala devagar para idosos |
| 🤖 **Assistente guiado** | Passo a passo no pagamento |
| 🌙 **Tema customizável** | Claro/escuro por voz |
| 📱 **Responsivo** | Funciona em celular, tablet e PC |

---

## 🚀 Deploy

| Serviço | Link |
|---------|------|
| **GitHub** | [github.com/rkryanx7209/loja-voz](https://github.com/rkryanx7209/loja-voz) |
| **Vercel** | [loja-voz.vercel.app](https://loja-voz.vercel.app) |

O deploy é **automático** — sempre que há um push para a `main`, o Vercel rebuilda o site.

---

## 📝 Licença

Este é um projeto **educacional** desenvolvido para a disciplina de **Programação Front-End** do curso **Técnico em Desenvolvimento de Sistemas** — SESI Pindamonhangaba.

---

## 👥 Autores

- **Ryan** — Desenvolvimento completo

---

## 🎯 Conclusão

A **GEEKZONE** demonstra:

- ✅ Loja virtual completa e funcional
- ✅ Acessibilidade real com comandos de voz
- ✅ Assistente de pagamento para idosos
- ✅ Design moderno e responsivo
- ✅ Código limpo e organizado

> 💡 *"Tecnologia é para todos — inclusive para quem tem dificuldade com telas."*

---

🎮 **Bom shopping!**
