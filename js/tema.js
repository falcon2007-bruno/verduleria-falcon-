// tema.js - Modo oscuro / claro con preferencia guardada
import { leerStorage, guardarStorage } from "./storage.js";

const CLAVE = "tema_falcon";

export function cargarTema() {
    const guardado = leerStorage(CLAVE, "light");
    const tema = guardado === "dark" ? "dark" : "light";
    aplicarTema(tema);
    return tema;
}

export function aplicarTema(tema) {
    document.documentElement.setAttribute("data-bs-theme", tema);
}

export function alternarTema() {
    const actual = document.documentElement.getAttribute("data-bs-theme");
    const nuevo = actual === "dark" ? "light" : "dark";
    aplicarTema(nuevo);
    guardarStorage(CLAVE, nuevo);
    return nuevo;
}
