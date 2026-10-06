export function validarNombre(nombre: string) {
  return nombre.trim() !== '';
}

export function validarCorreo(correo: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim());
}

export function validarEdad(edad: string) {
  const numero = Number(edad);

  return Number.isInteger(numero) && numero >= 18 && numero <= 120;
}

export function validarEntrada(entrada: string) {
  return entrada.trim() !== '';
}