import { capitalizeWords } from "./stringUtils";
import { validarTelefonoEspanol } from "./validarUtils";
import { v4 as uuidv4 } from "uuid";

export const validateAndPrepareContact = ({
  name,
  phone,
  id = null,
  contacts,
}) => {
  if (!name || !name.trim()) {
    return { error: "El nombre es obligatorio." };
  }

  const formattedName = capitalizeWords(name.trim());

  if (!phone || !phone.trim()) {
    return { error: "El teléfono es obligatorio." };
  }

  const phoneValid = validarTelefonoEspanol(phone.trim());
  if (!phoneValid) {
    return {
      error:
        "El teléfono debe ser numérico y comenzar con 6, 7, 8 o 9 y tener 9 dígitos.",
    };
  }

  const foundPhone = contacts.find(
    (contact) => contact.phone === phoneValid && contact.id !== id
  );

  // Caso 1: Teléfono existe con el mismo nombre
  if (foundPhone && formattedName === foundPhone.name) {
    return {
      error: `El teléfono ${phoneValid} ya está registrado bajo el contacto ${foundPhone.name}.`,
    };
  }

  // Caso 2: Teléfono existe con un nombre diferente
  if (foundPhone && formattedName !== foundPhone.name) {
    return {
      conflict: true, // Nuevo indicador de conflicto
      contact: {
        id: foundPhone.id,
        name: formattedName,
        phone: phoneValid,
        favorite: foundPhone.favorite || false, // Mantener favoritos si existen
      },
    };
  }

  // Caso 3: Todo válido, crear nuevo contacto
  return {
    contact: {
      id: id || uuidv4(),
      name: formattedName,
      phone: phoneValid,
      favorite: false,
    },
  };
};
