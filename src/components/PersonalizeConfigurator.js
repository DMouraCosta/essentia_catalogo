// src/components/PersonalizeConfigurator.js

import { BASE_WHATSAPP_URL, OPTION_CONTAINER_MAP } from "../constants.js";
import { formatPrice, formatOptionName } from "../utils/utils.js";
import { setActive } from "../utils/domHelpers.js";

/**
 * Estado que armazena as configurações atuais do sabonete personalizado.
 */
let currentConfig = {
  color: "branco",
  shape: "redondo",
  weight: "60g",
  basePrice: 8.0, // Preço base inicial (Redondo 60g)
  essence: "lavanda",
  property: "nenhum",
  decor: "none",
  decorExtra: 0,
  sponge: "sem",
  spongeExtra: 0,
  foam: "normal",
  quantity: 1,
};

// Elementos DOM do Painel de Resultado
const dom = {
  btnMount: document.getElementById("btn-mount"),
  resultPanel: document.getElementById("result-panel"),
  basePriceSpan: document.getElementById("base-price"),
  extrasPriceSpan: document.getElementById("extras-price"),
  unitaryPriceSpan: document.getElementById("unitary-price"),
  finalPriceSpan: document.getElementById("final-price"),
  totalQtySpan: document.getElementById("total-qty"),
  whatsappLink: document.getElementById("whatsapp-link"),
  quantityInput: document.getElementById("quantity"),
};

// Elementos DOM de Opções
const optionElements = {
  colorOptions: document.querySelectorAll("#color-options .option"),
  shapeOptions: document.querySelectorAll("#shape-options button"),
  essenceOptions: document.querySelectorAll("#essence-options button"),
  propertyOptions: document.querySelectorAll("#property-options button"),
  decorOptions: document.querySelectorAll("#decor-options button"),
  spongeOptions: document.querySelectorAll("#sponge-options button"),
  foamOptions: document.querySelectorAll("#foam-options button"),
};

/**
 * Calcula o preço unitário e total com base na configuração atual.
 * @returns {{finalPrice: number, unitaryPrice: number}}
 */
function calculatePrice() {
  // Calcula o preço unitário
  const unitaryExtras = currentConfig.decorExtra + currentConfig.spongeExtra;
  const unitaryPrice = currentConfig.basePrice + unitaryExtras;

  // Calcula o preço total
  const finalPrice = unitaryPrice * currentConfig.quantity;

  // Atualiza o painel
  dom.basePriceSpan.textContent = formatPrice(currentConfig.basePrice);
  dom.extrasPriceSpan.textContent = formatPrice(unitaryExtras);
  dom.unitaryPriceSpan.textContent = formatPrice(unitaryPrice);
  dom.finalPriceSpan.textContent = formatPrice(finalPrice);
  dom.totalQtySpan.textContent = currentConfig.quantity;

  return { finalPrice, unitaryPrice };
}

/**
 * Gera o link e a mensagem do WhatsApp com a configuração e preço finais.
 * @param {number} finalPrice - O preço total da encomenda.
 * @returns {string} O link completo do WhatsApp.
 */
function generateWhatsappLink(finalPrice) {
  const unitaryPrice = finalPrice / currentConfig.quantity;
  const message = encodeURIComponent(
    `Olá, vim do catálogo e gostaria de realizar um pedido de Sabonete Personalizado!
      
*Configuração:*
- *Quantidade:* ${currentConfig.quantity} unidade(s)
- *Cor:* ${formatOptionName(currentConfig.color)}
- *Formato/Peso:* ${formatOptionName(currentConfig.shape)} (${
      currentConfig.weight
    })
- *Essência:* ${formatOptionName(currentConfig.essence)}
- *Propriedades:* ${formatOptionName(currentConfig.property)}
- *Decoração Interna:* ${formatOptionName(currentConfig.decor)}${
      currentConfig.decorExtra > 0 ? " (Acréscimo R$2,00)" : ""
    }
- *Bucha Vegetal:* ${formatOptionName(currentConfig.sponge)}${
      currentConfig.spongeExtra > 0 ? " (Acréscimo R$1,00)" : ""
    }
- *Espuma:* ${formatOptionName(currentConfig.foam)}

*Valor Unitário:* ${formatPrice(unitaryPrice)}
*Valor Total:* ${formatPrice(finalPrice)}`
  );

  return `${BASE_WHATSAPP_URL}${message}`;
}

/**
 * Atualiza o painel de pedido (cálculo de preço e link do WhatsApp).
 */
function updateOrderPanel() {
  // 1. Calcula Preço e Atualiza Painel
  const { finalPrice } = calculatePrice();

  // 2. Gera Link do WhatsApp
  dom.whatsappLink.href = generateWhatsappLink(finalPrice);
  dom.resultPanel.classList.remove("hidden");
}

/**
 * Configura os event listeners para as opções do configurador.
 */
function setupOptionListeners() {
  // Botão Montar Sabonete
  dom.btnMount.addEventListener("click", updateOrderPanel);

  // Input de Quantidade
  dom.quantityInput.addEventListener("input", (e) => {
    let qty = parseInt(e.target.value, 10);

    if (isNaN(qty) || qty < 1) {
      qty = 0; // Garante que a quantidade mínima seja 1
    }

    currentConfig.quantity = qty;
    // Força o valor do input a ser o número inteiro validado
    e.target.value = currentConfig.quantity;

    // Recalcula e atualiza se o painel estiver visível
    if (!dom.resultPanel.classList.contains("hidden")) {
      const { finalPrice } = calculatePrice();
      dom.whatsappLink.href = generateWhatsappLink(finalPrice);
    }
  });

  // Cor
  optionElements.colorOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      setActive(optionElements.colorOptions, opt, (selected) => {
        currentConfig.color = selected.dataset.color;
      });
    });
  });

  // Formato (Define Peso e Preço Base)
  optionElements.shapeOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(optionElements.shapeOptions, btn, (selected) => {
        currentConfig.shape = selected.dataset.shape;
        currentConfig.weight = selected.dataset.weight;
        currentConfig.basePrice = parseFloat(selected.dataset.price);
      });
    });
  });

  // Essência / Propriedades / Espuma (simplesmente salva o estado)
  [
    ...optionElements.essenceOptions,
    ...optionElements.propertyOptions,
    ...optionElements.foamOptions,
  ].forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(
        btn.parentElement.querySelectorAll("button"), // Passa o grupo correto (parent.querySelectorAll)
        btn,
        (selected) => {
          const parentId = selected.parentElement.id;
          const type = OPTION_CONTAINER_MAP[parentId]; // Mapeamento de 'id' para 'currentConfig.key'

          if (type) {
            // O nome do data attribute (ex: data-essence) é o mesmo do tipo
            currentConfig[type] = selected.dataset[type];
          }
        }
      );
    });
  });

  // Decoração (Define Acréscimo)
  optionElements.decorOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(optionElements.decorOptions, btn, (selected) => {
        currentConfig.decor = selected.dataset.decor;
        currentConfig.decorExtra = selected.dataset.extra
          ? parseFloat(selected.dataset.extra)
          : 0;
      });
    });
  });

  // Bucha Vegetal (Define Acréscimo)
  optionElements.spongeOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(optionElements.spongeOptions, btn, (selected) => {
        currentConfig.sponge = selected.dataset.sponge;
        currentConfig.spongeExtra = selected.dataset.extra
          ? parseFloat(selected.dataset.extra)
          : 0;
      });
    });
  });
}

/**
 * Inicializa o estado 'active' para todas as opções, garantindo que o currentConfig
 * reflita o estado inicial do DOM e que a UI esteja sincronizada.
 */
function initializeActiveState() {
  // Inicializa o estado ativo de cada grupo (o primeiro item)
  setActive(optionElements.colorOptions, optionElements.colorOptions[0]);
  setActive(optionElements.shapeOptions, optionElements.shapeOptions[0]);
  setActive(optionElements.essenceOptions, optionElements.essenceOptions[0]);
  setActive(optionElements.propertyOptions, optionElements.propertyOptions[0]);
  setActive(optionElements.decorOptions, optionElements.decorOptions[0]);
  setActive(optionElements.spongeOptions, optionElements.spongeOptions[0]);
  setActive(optionElements.foamOptions, optionElements.foamOptions[0]);

  // Garante que o input de quantidade comece com o valor correto
  dom.quantityInput.value = currentConfig.quantity;
}

/**
 * Inicializa o Configurator de Sabonetes Personalizados.
 */
export function setupPersonalizeConfigurator() {
  initializeActiveState();
  setupOptionListeners();
}
