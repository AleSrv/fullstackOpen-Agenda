//src\utils\validarUtils.js

export function validarTelefonoEspanol(telefono) {
    // Elimina espacios o caracteres no deseados
    const telefonoLimpio = telefono.replace(/\s+/g, "");
  
    // Expresión regular para validar el formato
    const regexTelefonoEspanol = /^(6|7|8|9)\d{8}$/;
  
    return regexTelefonoEspanol.test(telefonoLimpio);
  }
  
