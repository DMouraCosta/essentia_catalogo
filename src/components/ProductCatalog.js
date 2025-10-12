// src/components/ProductCatalog.js

/**
 * Controla a funcionalidade de expansão/colapso dos cards de Linhas de Sabonetes.
 */
export function setupProductCardExpansion() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Fecha os outros cards
      productCards.forEach((otherCard) => {
        if (otherCard !== card) {
          otherCard.classList.remove("expanded");
        }
      });
      // Alterna o estado do card clicado
      card.classList.toggle("expanded");
    });
  });
}
