//src\utils\validarUtils.js

function removeNonNumeric(input) {
  return input.replace(/\D/g, ""); // \D busca todo lo que no es un número y lo reemplaza con ''
}

export function validarTelefonoEspanol(telefono) {
  // Elimina espacios o caracteres no deseados
  const telefonoLimpio = removeNonNumeric(telefono);

  // Expresión regular para validar el formato
  const regexTelefonoEspanol = /^(6|7|8|9)\d{8}$/;
  if (regexTelefonoEspanol.test(telefonoLimpio)) {
    return telefonoLimpio;
  } else {
    return false;
  }
}
