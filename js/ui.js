// ui.js - Todo lo que toca el DOM
import { categorias } from "./datos.js";

const formatear = n => `$${n.toLocaleString("es-AR")}`;

export function renderizarFiltros(contenedor, activa) {
    contenedor.innerHTML = categorias.map(cat => `
        <button type="button" class="pastilla btn-categoria ${cat === activa ? "activa" : ""}"
                data-categoria="${cat}">${cat}</button>
    `).join("");
}

function tarjeta(p, esFavorito) {
    return `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
            <article class="producto">
                <div class="producto-media">
                    <span class="etiqueta-cat">${p.categoria}</span>
                    <button class="btn-fav" data-fav-id="${p.id}" type="button"
                            aria-label="Marcar ${p.nombre} como favorito">${esFavorito(p.id) ? "♥" : "♡"}</button>
                    <img src="img/${p.imagen}" alt="${p.nombre}" loading="lazy">
                </div>
                <div class="producto-cuerpo">
                    <h3>${p.nombre}</h3>
                    <p class="desc">${p.descripcion}</p>
                    <div class="d-flex justify-content-between align-items-end mt-auto mb-3">
                        <span class="precio">${formatear(p.precio)}</span>
                        <span class="stock">Stock: ${p.stock}</span>
                    </div>
                    <button class="btn btn-main w-100 btn-agregar" data-id="${p.id}" type="button">Agregar al carrito</button>
                </div>
            </article>
        </div>`;
}

// Apartados por categoría: Verduras, Frutas y Hojas verdes (solo los que tienen productos)
export function renderizarCatalogo(contenedor, lista, esFavorito) {
    contenedor.innerHTML = categorias.filter(c => c !== "Todos").map(cat => {
        const delApartado = lista.filter(p => p.categoria === cat);
        if (delApartado.length === 0) return "";
        const id = cat.toLowerCase().replace(/\s+/g, "-");
        return `
            <div class="col-12 apartado" id="apartado-${id}">
                <h3 class="apartado-titulo">${cat} <span class="apartado-cant">${delApartado.length}</span></h3>
            </div>
            ${delApartado.map(p => tarjeta(p, esFavorito)).join("")}`;
    }).join("");
}

export function renderizarCarrito(contenedor, detalle) {
    if (detalle.length === 0) {
        contenedor.innerHTML = `<p class="text-center text-secondary mb-0">El carrito está vacío.</p>`;
        return;
    }
    contenedor.innerHTML = detalle.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
            <div class="d-flex align-items-center gap-2">
                <img class="mini" src="img/${item.imagen}" alt="">
                <div>
                    <strong>${item.nombre}</strong>
                    <div class="text-secondary small">${formatear(item.precio)} c/u</div>
                </div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-suave btn-restar" data-id="${item.id}" type="button">-</button>
                <span class="fw-bold">${item.cantidad}</span>
                <button class="btn btn-sm btn-suave btn-sumar" data-id="${item.id}" type="button">+</button>
                <button class="btn btn-sm btn-main ms-2 btn-eliminar" data-id="${item.id}" type="button" aria-label="Eliminar">Quitar</button>
            </div>
        </div>
    `).join("");
}

export function actualizarContadores({ contador, total, favs }, cantidad, precio, cantFavs) {
    contador.textContent = cantidad;
    total.textContent = formatear(precio);
    favs.textContent = cantFavs;
}

export function mostrarSpinner(spinner, visible) { spinner.classList.toggle("d-none", !visible); }
export function mostrarSinResultados(elemento, visible) { elemento.classList.toggle("d-none", !visible); }

export function actualizarBotonTema(boton, tema) {
    boton.textContent = tema === "dark" ? "Modo claro" : "Modo oscuro";
}

export function mostrarToast(mensaje, tipo = "dark") {
    const zona = document.querySelector("#toast-zona");
    const aviso = document.createElement("div");
    aviso.className = `alert alert-${tipo} shadow mb-2 py-2`;
    aviso.textContent = mensaje;
    zona.appendChild(aviso);
    setTimeout(() => aviso.remove(), 2800);
}

// ----- Formularios -----
export function leerFormulario(form) { return Object.fromEntries(new FormData(form).entries()); }

export function mostrarErrores(form, errores) {
    form.querySelectorAll("[name]").forEach(campo => {
        const msg = errores[campo.name];
        campo.classList.toggle("is-invalid", Boolean(msg));
        const caja = form.querySelector(`[data-error-for="${campo.name}"]`);
        if (caja) caja.textContent = msg || "";
    });
}

export function limpiarFormulario(form) { form.reset(); mostrarErrores(form, {}); }
