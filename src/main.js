// src/main.js

import { setupProductCardExpansion } from "./components/ProductCatalog.js";
import { setupOrderButtons } from "./components/OrderCombos.js";
import { setupPersonalizeConfigurator } from "./components/PersonalizeConfigurator.js";
import { setupScrollAnimation, smoothScrollTo } from "./utils/utils.js";

/**
 * Inicializa todas as funcionalidades da página.
 */
function initApp() {
  // 1. Configura a funcionalidade do Catálogo (cards expansíveis)
  setupProductCardExpansion();

  // 2. Configura a funcionalidade dos Combos/Especiais
  setupOrderButtons();

  // 3. Configura o Configurador de Sabonete Personalizado
  setupPersonalizeConfigurator();

  // 4. Configura as animações de scroll
  setupScrollAnimation();

  // 5. Configura o scroll suave para a navegação (com ajuste de header)
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      smoothScrollTo(targetId);
    });
  });
}

// Inicia a aplicação após o DOM estar totalmente carregado
document.addEventListener("DOMContentLoaded", initApp);
