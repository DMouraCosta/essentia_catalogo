// src/utils/domHelpers.js

/**
 * Define o estado ativo de um elemento em um grupo e executa um callback.
 * Remove a classe 'active' de todos os elementos na lista e adiciona ao selecionado.
 * Também esconde o painel de resultados do configurador ao mudar uma opção.
 * @param {NodeListOf<Element>} list - A lista de elementos do grupo.
 * @param {Element} selected - O elemento que foi clicado.
 * @param {function(Element): void} callback - A função a ser executada com o elemento selecionado.
 */
export function setActive(list, selected, callback) {
  list.forEach((el) => el.classList.remove("active"));
  selected.classList.add("active");
  if (callback) callback(selected);

  // Lógica específica: limpar/esconder o painel de resultado do configurador
  const resultPanel = document.getElementById("result-panel");
  if (resultPanel) {
    resultPanel.classList.add("hidden");
  }
}
