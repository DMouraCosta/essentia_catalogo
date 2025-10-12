// src/constants.js

/**
 * URL base do WhatsApp para comunicação com o Essentia.
 * O número de telefone está embutido no link.
 */
export const BASE_WHATSAPP_URL =
  "https://api.whatsapp.com/send?phone=+5589981319258&text=";

/**
 * Mapeamento de IDs de contêineres de opções e seus tipos
 * para simplificar a lógica de eventos no configurador.
 */
export const OPTION_CONTAINER_MAP = {
  "essence-options": "essence",
  "property-options": "property",
  "foam-options": "foam",
};

// ...outras constantes se necessário...
