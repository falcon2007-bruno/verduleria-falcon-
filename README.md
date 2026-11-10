# 🥬 Verdulería FALCON

Tienda online de una verdulería: catálogo de frutas, verduras y hojas verdes con carrito de compras, favoritos, filtros, búsqueda y formulario de compra. Proyecto final hecho con HTML, CSS, Bootstrap 5 (diseño simple en blanco y gris) y JavaScript (ES Modules).

## Rubro
Verdulería / alimentos frescos.

## Funcionalidades
- Catálogo organizado en apartados (Verduras, Frutas, Hojas verdes) con 12 productos con **categoría**, **imagen**, descripción y **stock** (el carrito no deja superar el stock).
- **Filtro por categorías** (Verduras, Frutas, Hojas verdes) y buscador con **debounce** (300 ms).
- Mensaje de **"sin resultados"** cuando la búsqueda no coincide.
- **Favoritos** persistentes en `localStorage` y vista de solo favoritos.
- **Carrito** con sumar, restar, eliminar, **Vaciar carrito** y **Finalizar compra**.
- **Formulario de compra** (nombre, email, teléfono, dirección) con validación en JS y error por campo; al confirmar se vacía el carrito.
- **Formulario de contacto** con `preventDefault`, validación en JS y mensaje de éxito.
- **Modo oscuro/claro** con botón; la preferencia se recuerda.
- **Spinner** de carga simulado.
- `try/catch` en todas las lecturas y escrituras de `localStorage` (si un dato está dañado, la página sigue funcionando).

## Estructura
```
verduleria-falcon/
├── index.html
├── README.md
├── css/estilos.css
├── img/               (fotos: tomate.png, papa.jpg, ...)
└── js/
    ├── main.js        punto de entrada y eventos
    ├── datos.js       productos y categorías
    ├── carrito.js     lógica del carrito
    ├── favoritos.js   favoritos
    ├── productos.js   filtros y debounce
    ├── tema.js        modo oscuro/claro
    ├── storage.js     localStorage con try/catch
    ├── validaciones.js
    └── ui.js          manipulación del DOM
```

## Cómo ejecutarlo
Como usa `type="module"`, **no funciona abriendo el archivo con doble clic** (`file://`). Hay que servirlo:

- **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server*.
- **Python:** `python -m http.server 8000` y abrir http://localhost:8000
- **Node:** `npx serve`

## Formulario de contacto
En `js/main.js` está la constante `FORMSPREE_URL`. Si querés envío real, creá un formulario en formspree.io y pegá tu endpoint. Vacía, el formulario valida y simula el envío.
