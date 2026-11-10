// storage.js - Acceso seguro a localStorage (try/catch al leer y guardar)

export function leerStorage(clave, valorPorDefecto) {
    try {
        const crudo = localStorage.getItem(clave);
        if (crudo === null) return valorPorDefecto;
        return JSON.parse(crudo);
    } catch (error) {
        // Dato dañado o storage bloqueado: seguimos con el valor por defecto
        console.warn(`No se pudo leer "${clave}". Se usa el valor por defecto.`, error);
        try { localStorage.removeItem(clave); } catch (_) { /* nada */ }
        return valorPorDefecto;
    }
}

export function guardarStorage(clave, valor) {
    try {
        localStorage.setItem(clave, JSON.stringify(valor));
        return true;
    } catch (error) {
        console.warn(`No se pudo guardar "${clave}".`, error);
        return false;
    }
}
