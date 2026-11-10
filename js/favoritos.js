// favoritos.js - Favoritos persistentes
import { leerStorage, guardarStorage } from "./storage.js";

const CLAVE = "favoritos_falcon";
let favs = new Set();

export function cargarFavoritos() {
    const crudo = leerStorage(CLAVE, []);
    favs = new Set(Array.isArray(crudo) ? crudo.filter(Number.isInteger) : []);
}

export function esFavorito(id) { return favs.has(id); }

export function alternarFavorito(id) {
    if (favs.has(id)) favs.delete(id);
    else favs.add(id);
    guardarStorage(CLAVE, [...favs]);
}

export function cantidadFavoritos() { return favs.size; }
