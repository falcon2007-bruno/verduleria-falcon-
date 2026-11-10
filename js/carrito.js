// carrito.js - Estado y lógica del carrito
import { leerStorage, guardarStorage } from "./storage.js";
import { productos as catalogo } from "./datos.js";

const stockDe = id => catalogo.find(p => p.id === id)?.stock ?? 0;

const CLAVE = "carrito_falcon";
let items = []; // [{ id, cantidad }]

export function cargarCarrito(productos) {
    const crudo = leerStorage(CLAVE, []);
    // Validamos el contenido: si está dañado, se descarta lo inválido
    items = Array.isArray(crudo)
        ? crudo
            .filter(i => i && Number.isInteger(i.id) && Number.isInteger(i.cantidad) && i.cantidad > 0
                         && productos.some(p => p.id === i.id))
            .map(i => ({ id: i.id, cantidad: Math.min(i.cantidad, stockDe(i.id)) }))
        : [];
    guardar();
}

function guardar() { return guardarStorage(CLAVE, items); }

// Devuelve false si ya se alcanzó el stock disponible
export function agregar(id) {
    const item = items.find(i => i.id === id);
    if (item && item.cantidad >= stockDe(id)) return false;
    if (item) item.cantidad++;
    else items.push({ id, cantidad: 1 });
    guardar();
    return true;
}

export function cambiarCantidad(id, cambio) {
    const item = items.find(i => i.id === id);
    if (!item) return false;
    if (cambio > 0 && item.cantidad >= stockDe(id)) return false;
    item.cantidad += cambio;
    if (item.cantidad <= 0) items = items.filter(i => i.id !== id);
    guardar();
    return true;
}

export function eliminar(id) {
    items = items.filter(i => i.id !== id);
    guardar();
}

export function vaciar() {
    items = [];
    guardar();
}

// Devuelve los items con los datos completos del producto
export function detalle(productos) {
    return items
        .map(i => ({ ...productos.find(p => p.id === i.id), cantidad: i.cantidad }))
        .filter(i => i.nombre);
}

export function totales(productos) {
    const det = detalle(productos);
    return {
        cantidad: det.reduce((acc, i) => acc + i.cantidad, 0),
        precio: det.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
    };
}
