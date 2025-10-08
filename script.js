document.addEventListener("DOMContentLoaded", () => {
  // Configurações de Dados
  // !! IMPORTANTE: Substitua SEU_NUMERO_AQUI pelo seu número de telefone (ex: 5511987654321)
  const baseWhatsappURL =
    "https://api.whatsapp.com/send?phone=+5589988227748&text=";

  // Acréscimos fixos (mantidos)
  const extraPriceDecor = 2.0;
  const extraPriceSponge = 1.0;

  // Elementos DOM
  const previewImg = document.getElementById("soap-preview");
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

  // Estado Atual (Initial State - Ajustado para novos preços)
  let current = {
    color: "branco",
    shape: "redondo",
    weight: "60g",
    basePrice: 8.0, // Novo preço base
    essence: "lavanda",
    property: "nenhum",
    decor: "none",
    decorExtra: 0,
    sponge: "sem",
    spongeExtra: 0,
    foam: "normal",
    quantity: 1, // Novo campo de quantidade
  };

  // Imagens (mantidas, mas formatadas de forma mais compacta)
  const soapImages = {
    branco_redondo:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    branco_quadrado:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    branco_oval:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    branco_flor:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    branco_massageador:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    azul_redondo:
      "https://images.pexels.com/photos/7796393/pexels-photo-7796393.jpeg?auto=compress&cs=tinysrgb&w=600",
    azul_quadrado:
      "https://images.pexels.com/photos/7796393/pexels-photo-7796393.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    azul_oval:
      "https://images.pexels.com/photos/7796393/pexels-photo-7796393.jpeg?auto=compress&cs=tinysrgb&w=600",
    azul_flor:
      "https://images.pexels.com/photos/7796393/pexels-photo-7796393.jpeg?auto=compress&cs=tinysrgb&w=600",
    azul_massageador:
      "https://images.pexels.com/photos/7796393/pexels-photo-7796393.jpeg?auto=compress&cs=tinysrgb&w=600",
    vermelho_redondo:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    vermelho_quadrado:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    vermelho_oval:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    vermelho_flor:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    vermelho_massageador:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    amarelo_redondo:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    amarelo_quadrado:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    amarelo_oval:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    amarelo_flor:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    amarelo_massageador:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    rosa_redondo:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    rosa_quadrado:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    rosa_oval:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    rosa_flor:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    rosa_massageador:
      "https://images.pexels.com/photos/7796389/pexels-photo-7796389.jpeg?auto=compress&cs=tinysrgb&w=600",
    verde_redondo:
      "https://images.pexels.com/photos/7796403/pexels-photo-7796403.jpeg?auto=compress&cs=tinysrgb&w=600",
    verde_quadrado:
      "https://images.pexels.com/photos/7796403/pexels-photo-7796403.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    verde_oval:
      "https://images.pexels.com/photos/7796403/pexels-photo-7796403.jpeg?auto=compress&cs=tinysrgb&w=600",
    verde_flor:
      "https://images.pexels.com/photos/7796403/pexels-photo-7796403.jpeg?auto=compress&cs=tinysrgb&w=600",
    verde_massageador:
      "https://images.pexels.com/photos/7796403/pexels-photo-7796403.jpeg?auto=compress&cs=tinysrgb&w=600",
    laranja_redondo:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    laranja_quadrado:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    laranja_oval:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    laranja_flor:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    laranja_massageador:
      "https://images.pexels.com/photos/7796382/pexels-photo-7796382.jpeg?auto=compress&cs=tinysrgb&w=600",
    marmorizado_redondo:
      "https://images.pexels.com/photos/7796405/pexels-photo-7796405.jpeg?auto=compress&cs=tinysrgb&w=600",
    marmorizado_quadrado:
      "https://images.pexels.com/photos/7796405/pexels-photo-7796405.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    marmorizado_oval:
      "https://images.pexels.com/photos/7796405/pexels-photo-7796405.jpeg?auto=compress&cs=tinysrgb&w=600",
    marmorizado_flor:
      "https://images.pexels.com/photos/7796405/pexels-photo-7796405.jpeg?auto=compress&cs=tinysrgb&w=600",
    marmorizado_massageador:
      "https://images.pexels.com/photos/7796405/pexels-photo-7796405.jpeg?auto=compress&cs=tinysrgb&w=600",
  };

  const colorStyles = {
    branco: "#ccc",
    azul: "#2196f3",
    vermelho: "#f44336",
    amarelo: "#fbc02d",
    rosa: "#e91e63",
    verde: "#8bc34a",
    laranja: "#ff9800",
    marmorizado: "#9e9e9e",
  };

  const borderRadiusStyles = {
    redondo: "50%",
    quadrado: "12px",
    oval: "50% / 35%",
    flor: "30% 70% 50% 50%",
    massageador: "20px 50% 20px 50%",
  };

  // ================= UTILITY FUNCTIONS =================

  function setActive(list, selected, callback) {
    list.forEach((el) => el.classList.remove("active"));
    selected.classList.add("active");
    if (callback) callback(selected);
    // Limpar o painel de resultado e preview ao mudar uma opção
    resultPanel.classList.add("hidden");
    previewImg.classList.add("hidden");
    previewImg.classList.remove("animate");
  }

  function formatPrice(price) {
    return `R$ ${price.toFixed(2).replace(".", ",")}`;
  }

  // Capitaliza a primeira letra e substitui hífens
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

  function updatePreviewAndOrder() {
    const soapKey = `${current.color}_${current.shape}`;
    const imageUrl = soapImages[soapKey];

    if (!imageUrl) {
      alert(
        "Combinação de Cor e Formato inválida para pré-visualização. Por favor, selecione outra."
      );
      return;
    }

    // 1. Atualiza a Pré-visualização da Imagem e Estilo
    previewImg.src = imageUrl;
    previewImg.style.border = `8px solid ${colorStyles[current.color]}`;
    previewImg.style.borderRadius = borderRadiusStyles[current.shape] || "12px";

    // Ajusta opacidade/sombra para simular espuma/decoração
    previewImg.style.opacity =
      current.foam === "menos" ? 0.8 : current.foam === "mais" ? 1 : 0.9;
    previewImg.style.boxShadow =
      current.decor === "none"
        ? "0 4px 12px rgba(0,0,0,.3)"
        : "0 0 25px rgba(0,0,0,0.4)";

    previewImg.classList.remove("hidden");
    previewImg.classList.add("animate");
    setTimeout(() => previewImg.classList.remove("animate"), 1000);

    // 2. Calcula Preço e Atualiza Painel
    const { finalPrice } = calculatePrice();

    // 3. Gera Link do WhatsApp
    whatsappLink.href = generateWhatsappLink(finalPrice);
    resultPanel.classList.remove("hidden");
  }

  // ================= EVENT LISTENERS (PERSONALIZE) =================

  // Botão Montar Sabonete
  btnMount.addEventListener("click", updatePreviewAndOrder);

  // Quantidade
  quantityInput.addEventListener("input", (e) => {
    const qty = parseInt(e.target.value, 10);
    current.quantity = qty > 0 ? qty : 1;
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
          current[type] = selected.dataset[type.slice(0, -1) || type]; // 'essence', 'property', 'foam'
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
        // Usa o scrollIntoView com uma pequena correção para o header fixo
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
