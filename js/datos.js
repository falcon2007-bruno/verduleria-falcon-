// datos.js - Catálogo de productos (categoría, imagen, descripción y stock)
export const productos = [
    { id: 1,  nombre: "Tomate perita",   precio: 1200, categoria: "Verduras",     imagen: "tomate.png",    stock: 12, descripcion: "Ideal para salsas y ensaladas · Firme y maduro · Precio por kg" },
    { id: 2,  nombre: "Papa blanca",     precio: 800,  categoria: "Verduras",     imagen: "papa.jpg",      stock: 20, descripcion: "Perfecta para puré, horno o fritas · Selección de primera · Precio por kg" },
    { id: 3,  nombre: "Cebolla",         precio: 950,  categoria: "Verduras",     imagen: "cebolla.jpg",   stock: 15, descripcion: "Cebolla común de guarda · Sabor intenso · Precio por kg" },
    { id: 4,  nombre: "Zanahoria",       precio: 1100, categoria: "Verduras",     imagen: "zanahoria.webp", stock: 10, descripcion: "Dulce y crocante · Ideal para guisos y ensaladas · Precio por kg" },
    { id: 5,  nombre: "Banana",          precio: 1500, categoria: "Frutas",       imagen: "banana.jpg",    stock: 8,  descripcion: "Banana de Ecuador · Punto justo de maduración · Precio por kg" },
    { id: 6,  nombre: "Manzana roja",    precio: 1800, categoria: "Frutas",       imagen: "manzana.webp",   stock: 9,  descripcion: "Crocante y jugosa · Variedad Red Delicious · Precio por kg" },
    { id: 7,  nombre: "Naranja de jugo", precio: 1300, categoria: "Frutas",       imagen: "naranja.jpg",   stock: 14, descripcion: "Muy jugosa · Ideal para exprimir · Precio por kg" },
    { id: 8,  nombre: "Frutilla",        precio: 3200, categoria: "Frutas",       imagen: "frutilla.jpg",  stock: 5,  descripcion: "Frutillas frescas de temporada · Bandeja de 500 g" },
    { id: 9,  nombre: "Lechuga criolla", precio: 900,  categoria: "Hojas verdes", imagen: "lechuga.jpg",   stock: 10, descripcion: "Hojas tiernas y frescas · Ideal para ensaladas · Precio por unidad" },
    { id: 10, nombre: "Espinaca",        precio: 1000, categoria: "Hojas verdes", imagen: "espinaca.jpg",  stock: 7,  descripcion: "Atado de espinaca fresca · Para tartas y salteados" },
    { id: 11, nombre: "Acelga",          precio: 850,  categoria: "Hojas verdes", imagen: "acelga.jpg",    stock: 6,  descripcion: "Atado de acelga · Hojas grandes y verdes · Ideal para tartas" },
    { id: 12, nombre: "Rúcula",          precio: 1050, categoria: "Hojas verdes", imagen: "rucula.jpg",    stock: 4,  descripcion: "Atado de rúcula fresca · Sabor suave y picante" }
];

export const categorias = ["Todos", "Verduras", "Frutas", "Hojas verdes"];
