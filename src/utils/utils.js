// src/utils/utils.js

/**
 * Formata um número como string de preço em BRL (Real Brasileiro).
 * @param {number} price - O preço a ser formatado.
 * @returns {string} O preço formatado (Ex: R$ 12,50).
 */
export function formatPrice(price) {
  return `R$ ${price.toFixed(2).replace(".", ",")}`;
}

/**
 * Formata um nome de opção para exibição na mensagem do WhatsApp.
 * Trata casos especiais como "none" e "sem".
 * @param {string} str - O valor da opção.
 * @returns {string} O nome formatado.
 */
export function formatOptionName(str) {
  if (!str) return "Não Informado";
  // Trata "none" e "sem" como "Nenhum/Sem" de forma mais clara
  if (str.toLowerCase() === "none" || str.toLowerCase() === "sem")
    return "Nenhum/Sem";
  // Capitaliza a primeira letra e substitui hífens por espaços
  return str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");
}

/**
 * Realiza um scroll suave para um elemento alvo, ajustando para o header fixo.
 * @param {string} targetId - O ID do elemento alvo (ex: '#linhas').
 */
export function smoothScrollTo(targetId) {
  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    // Calcula a altura do cabeçalho fixo
    const headerHeight = document.querySelector("header").offsetHeight;
    // Calcula a posição de destino ajustada
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

/**
 * Aplica um efeito "fade-in" em elementos conforme o scroll.
 * Adiciona a classe 'show' quando o elemento entra na área visível.
 */
export function setupScrollAnimation() {
  const fadeItems = document.querySelectorAll(".fade-in");

  function showOnScroll() {
    fadeItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // O item aparece quando seu topo estiver a menos de 100px do fundo da janela
      if (rect.top < window.innerHeight - 100) el.classList.add("show");
    });
  }

  window.addEventListener("scroll", showOnScroll);
  // Executa uma vez na inicialização
  showOnScroll();
}
