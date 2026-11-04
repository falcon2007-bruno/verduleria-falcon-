// app.js - Lógica general de la aplicación

// Inicializamos el carrito leyendo de localStorage o creando un array vacío
let carrito = JSON.parse(localStorage.getItem("carrito_falcon")) || [];

// Selectores del DOM
const contenedorCards = document.querySelector("#contenedor-cards");
const contenedorCarrito = document.querySelector("#contenedor-carrito");
const spanTotal = document.querySelector("#span-total");
const spanContador = document.querySelector("#span-contador");

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    renderizarCatalogo();
    actualizarCarritoUI();
});

// Renderizar catálogo usando .map() y Template Strings
function renderizarCatalogo() {
    if (!contenedorCards) return;

    contenedorCards.innerHTML = productosVerduleria.map(prod => `
        <div class="col-md-3 mb-4">
            <div class="card h-100 bg-dark text-white border-secondary p-3 text-center shadow-sm">
                <div class="display-4 my-2">${prod.emoji}</div>
                <h5 class="card-title fs-6 fw-bold">${prod.nombre}</h5>
                <p class="card-text text-light fw-semibold">$${prod.precio.toLocaleString('es-AR')}</p>
                <button class="btn btn-primary w-100 mt-auto btn-agregar" data-id="${prod.id}">
                    Agregar al carrito
                </button>
            </div>
        </div>
    `).join("");
}

// Delegación de eventos en el catálogo (Un solo listener con e.target.closest)
contenedorCards.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-agregar");
    if (btn) {
        const id = parseInt(btn.dataset.id);
        agregarAlCarrito(id);
    }
});

// Agregar producto o incrementar cantidad si ya existe
function agregarAlCarrito(id) {
    const prod = productosVerduleria.find(p => p.id === id);
    const itemEnCarrito = carrito.find(p => p.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...prod, cantidad: 1 });
    }
    sincronizar();
}

// Modificar cantidades (+ o -)
function cambiarCantidad(id, cambio) {
    const item = carrito.find(p => p.id === id);
    if (item) {
        item.cantidad += cambio;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(p => p.id !== id);
        }
    }
    sincronizar();
}

// Eliminar producto completo del carrito
function eliminarItem(id) {
    carrito = carrito.filter(p => p.id !== id);
    sincronizar();
}

// Delegación de eventos dentro del carrito
contenedorCarrito.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    
    const id = parseInt(btn.dataset.id);
    if (btn.classList.contains("btn-sumar")) cambiarCantidad(id, 1);
    if (btn.classList.contains("btn-restar")) cambiarCantidad(id, -1);
    if (btn.classList.contains("btn-eliminar")) eliminarItem(id);
});

// Persistencia en LocalStorage y actualización de interfaz
function sincronizar() {
    localStorage.setItem("carrito_falcon", JSON.stringify(carrito));
    actualizarCarritoUI();
}

// Actualizar la interfaz del carrito y contadores
function actualizarCarritoUI() {
    const totalCount = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    const totalPrice = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

    spanContador.textContent = totalCount;
    spanTotal.textContent = `$${totalPrice.toLocaleString('es-AR')}`;

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = `<p class="text-center text-muted">El carrito está vacío.</p>`;
        return;
    }

    contenedorCarrito.innerHTML = carrito.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom border-secondary">
            <div>
                <span class="fs-5 me-2">${item.emoji}</span>
                <strong>${item.nombre}</strong>
                <div class="text-muted small">$${item.precio.toLocaleString('es-AR')} c/u</div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="btn btn-sm btn-outline-light btn-restar" data-id="${item.id}">-</button>
                <span class="fw-bold">${item.cantidad}</span>
                <button class="btn btn-sm btn-outline-light btn-sumar" data-id="${item.id}">+</button>
                <button class="btn btn-sm btn-danger ms-2 btn-eliminar" data-id="${item.id}">🗑</button>
            </div>
        </div>
    `).join("");
}
