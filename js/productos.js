// productos.js - Filtros y debounce

export function quitarTildes(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function filtrarProductos(productos, { categoria, texto, soloFavoritos }, esFavorito) {
    const busqueda = quitarTildes(texto.trim());
    return productos.filter(p =>
        (categoria === "Todos" || p.categoria === categoria) &&
        quitarTildes(p.nombre).includes(busqueda) &&
        (!soloFavoritos || esFavorito(p.id))
    );
}

// Debounce: espera a que el usuario deje de escribir antes de ejecutar
export function debounce(fn, espera = 300) {
    let temporizador;
    return (...args) => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => fn(...args), espera);
    };
}
