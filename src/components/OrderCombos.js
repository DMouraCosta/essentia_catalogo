// src/components/OrderCombos.js

import { BASE_WHATSAPP_URL } from "../constants.js";
import { formatPrice } from "../utils/utils.js";

/**
 * Configura os event listeners para os botões de Combo (com preço definido).
 */
function setupComboOrders() {
  const comboButtons = document.querySelectorAll(".whatsapp-btn-combo");

  comboButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      const message = encodeURIComponent(
        `Olá, vim do catálogo e gostaria de fazer um pedido de *${name}*!

*Valor Total:* ${formatPrice(price)}`
      );

      btn.href = `${BASE_WHATSAPP_URL}${message}`;
      window.open(btn.href, "_blank");
    });
  });
}

/**
 * Configura os event listeners para os botões de Especiais/Lembrancinhas
 * (pedidos de orçamento).
 */
function setupSpecialOrders() {
  const especialButtons = document.querySelectorAll(".whatsapp-btn-especial");

  especialButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = btn.dataset.name;

      const message = encodeURIComponent(
        `Olá, vim do catálogo e gostaria de pedir um orçamento para *${name}*!
Aguardando as opções de personalização para fecharmos o pedido.`
      );

      btn.href = `${BASE_WHATSAPP_URL}${message}`;
      window.open(btn.href, "_blank");
    });
  });
}

/**
 * Inicializa a funcionalidade de pedido de Combos e Especiais.
 */
export function setupOrderButtons() {
  setupComboOrders();
  setupSpecialOrders();
}
