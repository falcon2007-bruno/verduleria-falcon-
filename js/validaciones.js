// validaciones.js - Validación de formularios (devuelve { campo: "mensaje" })
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const REGEX_NOMBRE = /^[\p{L}\s'.-]+$/u;

export function validarCompra({ nombre, email, telefono, direccion }) {
    const errores = {};
    if (nombre.trim().length < 3) errores.nombre = "Ingresá tu nombre completo (mínimo 3 caracteres).";
    else if (!REGEX_NOMBRE.test(nombre.trim())) errores.nombre = "El nombre solo puede tener letras.";

    if (!email.trim()) errores.email = "El email es obligatorio.";
    else if (!REGEX_EMAIL.test(email.trim())) errores.email = "Ingresá un email válido (ej: nombre@correo.com).";

    const digitos = telefono.replace(/[\s+()-]/g, "");
    if (!telefono.trim()) errores.telefono = "El teléfono es obligatorio.";
    else if (!/^\d{8,15}$/.test(digitos)) errores.telefono = "Ingresá entre 8 y 15 números.";

    if (direccion.trim().length < 5) errores.direccion = "Ingresá una dirección válida (mínimo 5 caracteres).";
    return errores;
}

export function validarContacto({ nombre, email, mensaje }) {
    const errores = {};
    if (nombre.trim().length < 3) errores.nombre = "Ingresá tu nombre (mínimo 3 caracteres).";
    if (!email.trim()) errores.email = "El email es obligatorio.";
    else if (!REGEX_EMAIL.test(email.trim())) errores.email = "Ingresá un email válido.";
    if (mensaje.trim().length < 10) errores.mensaje = "El mensaje debe tener al menos 10 caracteres.";
    return errores;
}
