# 🌿 Essentia | Catálogo de Sabonetes Artesanais Naturais

Um catálogo online moderno e responsivo para a marca de sabonetes artesanais **Essentia**, que apresenta suas linhas de produtos, combos, opções de presentes especiais e um configurador avançado para criação de sabonetes personalizados com orçamento instantâneo.

---

## ✨ 1. Propósito e Funcionalidades Principais

O objetivo deste projeto é proporcionar uma experiência imersiva, visualmente agradável e intuitiva para os clientes da **Essentia**, permitindo explorar os produtos e personalizar sabonetes de forma interativa, com envio direto do pedido via WhatsApp.

### 🌸 Funcionalidades

* **Design Responsivo:** Interface totalmente adaptável a dispositivos móveis, tablets e desktops.
* **Navegação Rápida:** Menu fixo com links âncora para todas as seções — *Apresentação, Linhas, Combos, Especiais, Personalize* e *Lembrancinhas*.
* **Catálogo Interativo:**

  * Cards expansíveis na seção **Linhas**, revelando detalhes sobre fragrâncias e propriedades.
  * Efeitos *hover* e transições suaves com *fade-in* ao rolar a página.
* **Configurador de Sabonete Personalizado:**

  * Seletor interativo para **Cor, Formato/Peso, Essência, Propriedades, Decoração Interna, Bucha Vegetal e Nível de Espuma**.
  * **Orçamento Automático:** cálculo instantâneo com base nas opções escolhidas e quantidade.

    * Base: **R$ 8,00** (60g)
    * Acréscimos: **R$ 2,00** (decoração interna) e **R$ 1,00** (bucha vegetal).
* **Pedidos via WhatsApp:**

  * Geração de link automático com mensagem detalhada do pedido, incluindo personalizações e valor total.
  * Botões de *“Pedir pelo WhatsApp”* também disponíveis em *Combos* e *Especiais*.
* **Avisos Importantes:**

  * Informações sobre prazos de encomenda (mínimo 3 dias) e política de pagamento (adiantamento de 50%).

---

## 🧠 2. Tecnologias Utilizadas

O projeto foi desenvolvido com foco em modularidade e manutenção, utilizando apenas tecnologias web nativas (sem frameworks externos).

| Tecnologia                  | Descrição                                                                   |
| :-------------------------- | :-------------------------------------------------------------------------- |
| **HTML5**                   | Estrutura semântica da página e seções.                                     |
| **CSS3 (Modularizado)**     | Estilização organizada por componentes, layout e utilitários via `@import`. |
| **JavaScript (ES Modules)** | Interatividade e lógica separadas em módulos especializados.                |
| **Font Awesome**            | Ícones utilizados em botões e elementos visuais.                            |
| **Google Fonts**            | Tipografia “Poppins”, moderna e legível.                                    |

---

## 📁 3. Estrutura do Projeto (Refatorada)

```
/
├── index.html                  # Estrutura principal do catálogo
├── styles/                     # Estilos CSS modularizados
│   ├── main.css                # Arquivo principal (usa @import)
│   ├── base/                   # Reset e estilos globais
│   ├── components/             # Estilos de componentes (cards, botões, modais)
│   ├── layout/                 # Estruturas (header, footer, grid)
│   └── utilities/              # Classes utilitárias (animações, espaçamentos)
├── src/                        # Código JavaScript modularizado (ES Modules)
│   ├── main.js                 # Ponto de entrada da aplicação
│   ├── constants.js            # Constantes globais (URLs, textos, mapeamentos)
│   ├── utils/
│   │   ├── utils.js            # Funções genéricas (formatação, cálculo, rolagem)
│   │   └── domHelpers.js       # Manipulação de elementos e eventos do DOM
│   ├── components/
│   │   ├── ProductCatalog.js   # Lógica de expansão dos cards das linhas
│   │   ├── OrderCombos.js      # Lógica de pedidos e orçamentos via WhatsApp
│   │   └── PersonalizeConfigurator.js # Lógica principal do configurador
└── images/                     # Imagens da marca e produtos
```

---

## ⚙️ 4. Execução e Ambiente de Desenvolvimento

Este projeto é *client-side only* e não necessita de instalação de dependências.

### 🧩 Passos para execução

1. **Baixe ou clone o repositório:**

   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   ```
2. **Abra o arquivo `index.html`** diretamente no navegador.

💡 *Sugestão:* use uma extensão como **Live Server** (VS Code) para garantir o carregamento correto de imagens e evitar problemas de cache local.

---

## 📱 5. Configuração de Contato via WhatsApp

O número de WhatsApp e as mensagens automáticas estão definidos no módulo `OrderCombos.js` e/ou `PersonalizeConfigurator.js`.

Exemplo de configuração:

```javascript
// constants.js
export const WHATSAPP_NUMBER = "5589999999999"; // Número no formato internacional
```

**Formato recomendado:** `Código do país + DDD + número`
Exemplo: `5589988227748`

---

## 💡 6. Personalização

* **Logo e Identidade Visual:** Substitua os arquivos na pasta `/images` conforme a marca.
* **Favicon:**

  ```html
  <link rel="icon" type="image/png" href="images/logo.png">
  ```
* **Cores e fontes:** Centralizadas no arquivo `styles/base/_variables.css` (caso exista).

---

## 💾 7. Persistência e Estado

O configurador e as seleções de produtos mantêm seu estado durante a navegação, com persistência leve em memória e manipulação direta do DOM.
A lógica é modular, permitindo futura integração com APIs ou banco de dados.

---

## 🚀 8. Melhorias Futuras

* Implementar salvamento de preferências do cliente no *Local Storage*.
* Adicionar visualização em tempo real do sabonete configurado (preview).
* Criar painel administrativo para gestão de produtos e preços.
* Otimizar SEO e integração com redes sociais (Open Graph + WhatsApp meta tags).

---

## 📄 9. Licença

Projeto desenvolvido por **Dailson Costa** — uso livre e personalizável, desde que mantidos os créditos originais.
🌼 *Feito com amor e fragrância artesanal.*
