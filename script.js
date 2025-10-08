document.addEventListener("DOMContentLoaded", () => {
  // Configurações de Dados

  const baseWhatsappURL =
    "https://api.whatsapp.com/send?phone=+5589981319258&text=";

  // Elementos DOM
  // const previewImg = document.getElementById("soap-preview"); // Comentado
  const btnMount = document.getElementById("btn-mount");
  const resultPanel = document.getElementById("result-panel");
  const basePriceSpan = document.getElementById("base-price");
  const extrasPriceSpan = document.getElementById("extras-price");
  const unitaryPriceSpan = document.getElementById("unitary-price");
  const finalPriceSpan = document.getElementById("final-price");
  const totalQtySpan = document.getElementById("total-qty");
  const whatsappLink = document.getElementById("whatsapp-link");
  const quantityInput = document.getElementById("quantity");

  const colorOptions = document.querySelectorAll("#color-options .option");
  const shapeOptions = document.querySelectorAll("#shape-options button");
  const essenceOptions = document.querySelectorAll("#essence-options button");
  const propertyOptions = document.querySelectorAll("#property-options button");
  const decorOptions = document.querySelectorAll("#decor-options button");
  const spongeOptions = document.querySelectorAll("#sponge-options button");
  const foamOptions = document.querySelectorAll("#foam-options button");

  const productCards = document.querySelectorAll(".product-card");
  const comboButtons = document.querySelectorAll(".whatsapp-btn-combo");
  const especialButtons = document.querySelectorAll(".whatsapp-btn-especial");

  // Estado Atual (Preços baseados nas Linhas: 60g=R$8, 100g=R$12, 125g=R$16)
  let current = {
    color: "branco",
    shape: "redondo",
    weight: "60g",
    basePrice: 8.0,
    essence: "lavanda",
    property: "nenhum",
    decor: "none",
    decorExtra: 0,
    sponge: "sem",
    spongeExtra: 0,
    foam: "normal",
    quantity: 1, // Inicializado em 1, conforme input HTML
  };

  // Mapeamento de Imagens e Estilos (Comentado/Removido - Deixado aqui para referência se precisar reativar)
  /*
  const soapImages = {
    // ... URLs de Imagem
  };

  const colorStyles = {
    // ... Estilos de Cor
  };

  const borderRadiusStyles = {
    // ... Estilos de Borda
  };
  */

  // ================= UTILITY FUNCTIONS =================

  function setActive(list, selected, callback) {
    list.forEach((el) => el.classList.remove("active"));
    selected.classList.add("active");
    if (callback) callback(selected);
    // Limpar o painel de resultado ao mudar uma opção
    resultPanel.classList.add("hidden");
    // previewImg.classList.add("hidden"); // Comentado
    // previewImg.classList.remove("animate"); // Comentado
  }

  function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  }

  function formatOptionName(str) {
    if (!str) return "Não Informado";
    return str.charAt(0).toUpperCase() + str.slice(1).replace("-", " ");
  }

  // ================= MAIN FUNCTIONALITY =================

  function calculatePrice() {
    // Calcula o preço unitário
    let unitaryExtras = current.decorExtra + current.spongeExtra;
    let unitaryPrice = current.basePrice + unitaryExtras;

    // Calcula o preço total
    let finalPrice = unitaryPrice * current.quantity;

    // Atualiza o painel
    basePriceSpan.textContent = formatPrice(current.basePrice);
    extrasPriceSpan.textContent = formatPrice(unitaryExtras);
    unitaryPriceSpan.textContent = formatPrice(unitaryPrice);
    finalPriceSpan.textContent = formatPrice(finalPrice);
    totalQtySpan.textContent = current.quantity;

    return { finalPrice, unitaryPrice };
  }

  function generateWhatsappLink(finalPrice) {
    const message = encodeURIComponent(
      `Olá, vim do catálogo e gostaria de realizar um pedido de Sabonete Personalizado!
      
*Configuração:*
- *Quantidade:* ${current.quantity} unidade(s)
- *Cor:* ${formatOptionName(current.color)}
- *Formato/Peso:* ${formatOptionName(current.shape)} (${current.weight})
- *Essência:* ${formatOptionName(current.essence)}
- *Propriedades:* ${formatOptionName(current.property)}
- *Decoração Interna:* ${formatOptionName(current.decor)}${
        current.decorExtra > 0 ? " (Acréscimo R$2,00)" : ""
      }
- *Bucha Vegetal:* ${formatOptionName(current.sponge)}${
        current.spongeExtra > 0 ? " (Acréscimo R$1,00)" : ""
      }
- *Espuma:* ${formatOptionName(current.foam)}

*Valor Unitário:* ${formatPrice(finalPrice / current.quantity)}
*Valor Total:* ${formatPrice(finalPrice)}`
    );

    return `${baseWhatsappURL}${message}`;
  }

  function updateOrderPanel() {
    // O código de preview da imagem foi removido.
    /*
    const soapKey = `${current.color}_${current.shape}`;
    const imageUrl = soapImages[soapKey];

    if (imageUrl) {
        previewImg.src = imageUrl;
        previewImg.style.border = `8px solid ${colorStyles[current.color]}`;
        previewImg.style.borderRadius = borderRadiusStyles[current.shape] || "12px";
        previewImg.style.opacity = current.foam === "menos" ? 0.8 : current.foam === "mais" ? 1 : 0.9;
        previewImg.style.boxShadow =
            current.decor === "none" ? "0 4px 12px rgba(0,0,0,.3)" : "0 0 25px rgba(0,0,0,0.4)";
        previewImg.classList.remove("hidden");
        previewImg.classList.add("animate");
        setTimeout(() => previewImg.classList.remove("animate"), 1000);
    } else {
        previewImg.classList.add("hidden");
    }
    */

    // 1. Calcula Preço e Atualiza Painel
    const { finalPrice } = calculatePrice();

    // 2. Gera Link do WhatsApp
    whatsappLink.href = generateWhatsappLink(finalPrice);
    resultPanel.classList.remove("hidden");
  }

  // ================= EVENT LISTENERS (PERSONALIZE) =================

  // Botão Montar Sabonete
  btnMount.addEventListener("click", updateOrderPanel);

  quantityInput.addEventListener("input", (e) => {
    let qty = parseInt(e.target.value, 10);

    if (isNaN(qty) || qty < 0) {
      qty = 0;
    }

    current.quantity = qty;

    // Força o valor do input a ser o número inteiro validado (útil para mobile e limpar campo)
    e.target.value = current.quantity;

    // Recalcula e atualiza se o painel estiver visível (já montado)
    if (!resultPanel.classList.contains("hidden")) {
      const { finalPrice } = calculatePrice();
      whatsappLink.href = generateWhatsappLink(finalPrice);
    }
  });

  // Cor
  colorOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      setActive(colorOptions, opt, (selected) => {
        current.color = selected.dataset.color;
      });
    });
  });

  // Formato (Define Peso e Preço Base)
  shapeOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(shapeOptions, btn, (selected) => {
        current.shape = selected.dataset.shape;
        current.weight = selected.dataset.weight;
        current.basePrice = parseFloat(selected.dataset.price);
      });
    });
  });

  // Essência / Propriedades / Espuma (simplesmente salva o estado)
  [...essenceOptions, ...propertyOptions, ...foamOptions].forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(
        btn.parentElement.querySelectorAll("button"),
        btn,
        (selected) => {
          const type = selected.parentElement.id.replace("-options", ""); // essence, property, foam
          // Trata o nome do dataset ('essence' para 'essences' etc.)
          current[type] = selected.dataset[type.slice(0, -1) || type];
        }
      );
    });
  });

  // Decoração (Define Acréscimo)
  decorOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(decorOptions, btn, (selected) => {
        current.decor = selected.dataset.decor;
        current.decorExtra = selected.dataset.extra
          ? parseFloat(selected.dataset.extra)
          : 0;
      });
    });
  });

  // Bucha Vegetal (Define Acréscimo)
  spongeOptions.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActive(spongeOptions, btn, (selected) => {
        current.sponge = selected.dataset.sponge;
        current.spongeExtra = selected.dataset.extra
          ? parseFloat(selected.dataset.extra)
          : 0;
      });
    });
  });

  // ================= EVENT LISTENERS (LINHAS EXPANSÍVEIS) =================

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

  // ================= EVENT LISTENERS (COMBOS / ESPECIAIS) =================

  // Combos (com preço definido)
  comboButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      const message = encodeURIComponent(
        `Olá, vim do catálogo e gostaria de fazer um pedido de *${name}*!

*Valor Total:* ${formatPrice(price)}`
      );

      btn.href = `${baseWhatsappURL}${message}`;
      window.open(btn.href, "_blank");
    });
  });

  // Especiais (Preço sob consulta)
  especialButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const name = btn.dataset.name;

      const message = encodeURIComponent(
        `Olá, vim do catálogo e gostaria de pedir um orçamento para *${name}*!
Aguardando as opções de personalização para fecharmos o pedido.`
      );

      btn.href = `${baseWhatsappURL}${message}`;
      window.open(btn.href, "_blank");
    });
  });

  // ================= SCROLL & ANIMATION =================

  const fadeItems = document.querySelectorAll(".fade-in");
  function showOnScroll() {
    fadeItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) el.classList.add("show");
    });
  }
  window.addEventListener("scroll", showOnScroll);
  showOnScroll();

  // Scroll suave com offset para o header fixo
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calcula a posição do elemento subtraindo a altura do cabeçalho fixo
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ================= INICIALIZAÇÃO =================

  // Define o estado inicial ativo para todos os grupos de botões.
  setActive(colorOptions, colorOptions[0]);
  setActive(shapeOptions, shapeOptions[0]);
  setActive(essenceOptions, essenceOptions[0]);
  setActive(propertyOptions, propertyOptions[0]);
  setActive(decorOptions, decorOptions[0]);
  setActive(spongeOptions, spongeOptions[0]);
  setActive(foamOptions, foamOptions[0]);
});
