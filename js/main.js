// main.js - Punto de entrada: conecta módulos y eventos
import { productos } from "./datos.js";
import * as Carrito from "./carrito.js";
import * as Favs from "./favoritos.js";
import { cargarTema, alternarTema } from "./tema.js";
import { filtrarProductos, debounce } from "./productos.js";
import { validarCompra, validarContacto } from "./validaciones.js";
import * as UI from "./ui.js";

// Configuración opcional: pegá acá tu endpoint real de Formspree (ej: "https://formspree.io/f/xxxxxxx").
// Si queda vacío, el formulario valida y simula el envío sin hacer ninguna petición.
const FORMSPREE_URL = "";

// ----- Selectores -----
const $ = sel => document.querySelector(sel);
const el = {
    cards: $("#contenedor-cards"), filtros: $("#filtros"), buscador: $("#buscador"),
    spinner: $("#spinner"), sinResultados: $("#sin-resultados"),
    carrito: $("#contenedor-carrito"),
    contadores: { contador: $("#span-contador"), total: $("#span-total"), favs: $("#span-favs") },
    btnFavs: $("#btn-favoritos"), btnTema: $("#btn-tema"),
    btnVaciar: $("#btn-vaciar"), btnFinalizar: $("#btn-finalizar"),
    formCompra: $("#form-compra"), compraTotal: $("#compra-total"),
    formContacto: $("#form-contacto"), contactoExito: $("#contacto-exito")
};

// ----- Estado de filtros -----
const estado = { categoria: "Todos", texto: "", soloFavoritos: false };

// ----- Renderizado -----
function renderCatalogo() {
    const lista = filtrarProductos(productos, estado, Favs.esFavorito);
    UI.renderizarCatalogo(el.cards, lista, Favs.esFavorito);
    UI.mostrarSinResultados(el.sinResultados, lista.length === 0);
}

function renderCarrito() {
    const { cantidad, precio } = Carrito.totales(productos);
    UI.renderizarCarrito(el.carrito, Carrito.detalle(productos));
    UI.actualizarContadores(el.contadores, cantidad, precio, Favs.cantidadFavoritos());
    el.btnVaciar.disabled = cantidad === 0;
    el.btnFinalizar.disabled = cantidad === 0;
}

// ----- Catálogo: filtros, búsqueda (debounce) y favoritos -----
el.filtros.addEventListener("click", e => {
    const btn = e.target.closest(".btn-categoria");
    if (!btn) return;
    estado.categoria = btn.dataset.categoria;
    UI.renderizarFiltros(el.filtros, estado.categoria);
    renderCatalogo();
});

el.buscador.addEventListener("input", debounce(e => {
    estado.texto = e.target.value;
    renderCatalogo();
}, 300));

el.btnFavs.addEventListener("click", () => {
    estado.soloFavoritos = !estado.soloFavoritos;
    el.btnFavs.classList.toggle("active", estado.soloFavoritos);
    el.btnFavs.setAttribute("aria-pressed", estado.soloFavoritos);
    renderCatalogo();
});

el.cards.addEventListener("click", e => {
    const fav = e.target.closest(".btn-fav");
    if (fav) {
        Favs.alternarFavorito(parseInt(fav.dataset.favId));
        renderCatalogo();
        renderCarrito();
        return;
    }
    const btn = e.target.closest(".btn-agregar");
    if (btn) {
        if (Carrito.agregar(parseInt(btn.dataset.id))) {
            renderCarrito();
            UI.mostrarToast("Producto agregado al carrito");
        } else {
            UI.mostrarToast("Alcanzaste el stock disponible de este producto", "warning");
        }
    }
});

// ----- Carrito -----
el.carrito.addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = parseInt(btn.dataset.id);
    if (btn.classList.contains("btn-sumar") && !Carrito.cambiarCantidad(id, 1)) {
        UI.mostrarToast("Alcanzaste el stock disponible de este producto", "warning");
    }
    if (btn.classList.contains("btn-restar")) Carrito.cambiarCantidad(id, -1);
    if (btn.classList.contains("btn-eliminar")) Carrito.eliminar(id);
    renderCarrito();
});

el.btnVaciar.addEventListener("click", () => {
    Carrito.vaciar();
    renderCarrito();
    UI.mostrarToast("Carrito vaciado", "secondary");
});

// ----- Finalizar compra: abre el formulario -----
const modalCarrito = () => bootstrap.Modal.getOrCreateInstance($("#modalCarrito"));
const modalCompra = () => bootstrap.Modal.getOrCreateInstance($("#modalCompra"));

el.btnFinalizar.addEventListener("click", () => {
    el.compraTotal.textContent = el.contadores.total.textContent;
    UI.limpiarFormulario(el.formCompra);
    modalCarrito().hide();
    modalCompra().show();
});

el.formCompra.addEventListener("submit", e => {
    e.preventDefault();
    const errores = validarCompra(UI.leerFormulario(el.formCompra));
    UI.mostrarErrores(el.formCompra, errores);
    if (Object.keys(errores).length > 0) return;

    Carrito.vaciar();           // al confirmar, se vacía el carrito
    renderCarrito();
    modalCompra().hide();
    UI.limpiarFormulario(el.formCompra);
    UI.mostrarToast("¡Compra confirmada! Gracias por elegirnos 🥬");
});

// ----- Formulario de contacto -----
el.formContacto.addEventListener("submit", async e => {
    e.preventDefault();
    el.contactoExito.classList.add("d-none");

    const datos = UI.leerFormulario(el.formContacto);
    const errores = validarContacto(datos);
    UI.mostrarErrores(el.formContacto, errores);
    if (Object.keys(errores).length > 0) return;

    try {
        if (FORMSPREE_URL) {
            const resp = await fetch(FORMSPREE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body: JSON.stringify(datos)
            });
            if (!resp.ok) throw new Error("Respuesta no válida del servidor");
        }
        el.contactoExito.textContent = `¡Gracias, ${datos.nombre.trim()}! Recibimos tu mensaje y te respondemos pronto.`;
        el.contactoExito.classList.remove("d-none");
        UI.limpiarFormulario(el.formContacto);
    } catch (error) {
        console.warn("Error al enviar el contacto:", error);
        UI.mostrarToast("No pudimos enviar el mensaje. Probá de nuevo más tarde.", "danger");
    }
});

// Al tipear en un campo se limpia su error
[el.formCompra, el.formContacto].forEach(form => {
    form.addEventListener("input", e => {
        e.target.classList.remove("is-invalid");
    });
});

// ----- Tema -----
el.btnTema.addEventListener("click", () => {
    UI.actualizarBotonTema(el.btnTema, alternarTema());
});

// ----- Inicio -----
function iniciar() {
    UI.actualizarBotonTema(el.btnTema, cargarTema());
    Favs.cargarFavoritos();
    Carrito.cargarCarrito(productos);
    UI.renderizarFiltros(el.filtros, estado.categoria);
    renderCarrito();

    // Spinner de carga simulado
    UI.mostrarSpinner(el.spinner, true);
    setTimeout(() => {
        UI.mostrarSpinner(el.spinner, false);
        renderCatalogo();
    }, 900);
}

iniciar();
