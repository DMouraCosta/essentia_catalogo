🌿 Essentia | Catálogo de Sabonetes Artesanais Naturais
Um catálogo online moderno e responsivo para a marca de sabonetes artesanais Essentia, que apresenta as linhas de produtos, combos, opções de presentes especiais e um poderoso configurador para criar sabonetes personalizados com orçamento instantâneo.

🌟 Funcionalidades Principais
Design Responsivo: O catálogo se adapta perfeitamente a dispositivos móveis e desktops.

Navegação Rápida: Menu fixo com links de âncora para todas as seções (Apresentação, Linhas, Combos, Especiais, Personalize, Lembrancinhas).

Catálogo Interativo: Cards de produtos na seção "Linhas" são expansíveis para mostrar detalhes de fragrâncias e propriedades.

Configurador de Sabonete Personalizado:

Permite selecionar Cor, Formato/Peso, Essência, Propriedades (Ingredientes Extra), Decoração Interna, Bucha Vegetal e Nível de Espuma.

Orçamento Automático: Calcula o preço base, acréscimos e o valor total com base na quantidade e opções selecionadas (R$ 8,00 base para 60g, com acréscimos de R2,00paraDecora 
c
\c
​
  
a
~
 oeR1,00 para Bucha).

Pedido via WhatsApp: Gera um link pronto com a mensagem detalhada do pedido e o valor total.

Pedidos Simplificados: Botões de Pedir por WhatsApp em Combos e Especiais que geram mensagens pré-formatadas para orçamentos e pedidos diretos.

Animação: Efeitos fade-in suaves ao rolar a página para uma experiência visual agradável.

Aviso Importante: Seção destacada para prazos de encomendas de lembrancinhas (mínimo 3 dias de antecedência) e regras de pagamento (adiantamento de 50% do valor total).

🛠️ Tecnologias Utilizadas
O projeto foi refatorado focando em modularidade e manutenção, utilizando tecnologias web básicas:

HTML5 (index.html): Estrutura semântica do catálogo.

CSS3 (Arquivos em /styles): Estilização completa, modularizada por componentes e layout, unificada por @import.

JavaScript (ES Modules) (Arquivos em /src): Responsável pela interatividade e lógica. Separado em módulos para gerenciar o estado do configurador (PersonalizeConfigurator.js), eventos de catálogo/pedidos e utilitários.

📁 Estrutura do Projeto (Refatorada)
/
├── index.html                  // Estrutura principal
├── styles/                     // Estilos CSS modularizados
│   ├── main.css                // Arquivo principal (usa @import)
│   ├── base/                   // Estilos de tags e reset
│   ├── components/             // Estilos de elementos específicos (cards, botões)
│   ├── layout/                 // Estilos de estrutura (header, footer, grid)
│   └── utilities/              // Classes utilitárias (animações)
├── src/                        // Código JavaScript modularizado (ES Modules)
│   ├── main.js                 // Ponto de entrada e inicialização de todas as funções
│   ├── constants.js            // Constantes globais (URLs, mapeamentos)
│   ├── utils/
│   │   ├── utils.js            // Funções utilitárias (formatação de preço, scroll)
│   │   └── domHelpers.js       // Funções de manipulação e ativação de elementos DOM
│   ├── components/
│   │   ├── ProductCatalog.js   // Lógica de expansão dos cards de linhas
│   │   ├── OrderCombos.js      // Lógica de pedidos de combos e especiais (WhatsApp)
│   │   └── PersonalizeConfigurator.js // Lógica principal do configurador de sabonetes
└── images/                     // Pasta não fornecida, mas referenciada no código (neces
