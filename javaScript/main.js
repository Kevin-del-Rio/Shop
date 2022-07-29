const carrito = JSON.parse(localStorage.getItem("carrito")) ?? [];
// const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
document.getElementById("cart-total").innerHTML = `${carrito.length}`;

// clase producto
class Producto {
    constructor(idP, nombreP, precioP, imgP) {
        this.id = idP;
        this.nombre = nombreP;
        this.precio = precioP;
        this.img = imgP;
    }
}


// ----------------------------------
// productos
let producto1 = new Producto(1, "pelotas", 250, "../img/catalogo/pelota.png");
let producto2 = new Producto(2, "lapiceras", 100, "../img/catalogo/lapiceras.png");
let producto3 = new Producto(3, "tazas", 70, "../img/catalogo/tazas.png");
let producto4 = new Producto(4, "marcadores", 150, "../img/catalogo/marcadores.png");
// ----------------------------------
// agrego productos a la tienda
const tienda = [producto1, producto2, producto3, producto4];
// ----------------------------------
// validar numero
function validarNumber(n) {
    while (n == null || /\D/.test(n) || n == "") {
        n = parseInt(prompt("Entre un número VÁLIDO: "));
    };
    return n;
}
// ----------------------------------
//validar texto
function validarTexto(t) {
    let num = /[0-9]+/;
    while (num.test(t) || t == "") {
        t = prompt("Ingrese un nombre VÁLIDO: ");
    }
    return t;
}
// ----------------------------------
// agrego productos a la tienda por prompt
function agregarProducto() {
    let id = parseInt(prompt("Ingrese id: "));
    id = validarNumber(id);

    let nombre = prompt("Nombre del producto: ");
    nombre = validarTexto(nombre);

    let precio = parseInt(prompt("Precio del producto:"));
    precio = validarNumber(precio);

    let img = parseInt(prompt(" Ingrese una imagen: "));


    let nuevoProducto = new Producto(id, nombre, precio, img);

    tienda.push(nuevoProducto);
}
// ----------------------------------
// funcion para ver todos los productos
function verProductos() {
    let inventario = "";

    tienda.forEach((producto) => {
        inventario += "-    " + producto.nombre.toUpperCase() + "    Precio Unitario:    $" + producto.precio + "    Imagen:    " + producto.img + "\n";
    });
    alert(inventario);
}
// ----------------------------------
// funcion para eliminar productos
function borrarProducto() {
    let inventario = "";
    tienda.forEach((producto) => {
        inventario += "-  " + producto.id + "    " + producto.nombre.toUpperCase() + "\n";
    });
    let idc = parseInt(prompt("Elije el ID a elimirar :\n" + inventario));

    const productoAEliminar = tienda.findIndex(prod => prod.id === idc);
    tienda.splice(productoAEliminar, 1);
}
// ----------------------------------
// menu con opciones
function operacion() {
    let opcion = parseInt(prompt("Ingrese su operacion :\n1)   Agregar un producto\n2)   Ver producto\n3)   Eliminar producto\n0)   Salir"));
    while (opcion !== 0) {
        switch (opcion) {
            case 1:
                agregarProducto();
                break;
            case 2:
                verProductos();
                break;
            case 3:
                borrarProducto();
                break;
        }
        opcion = parseInt(prompt("Ingrese su operacion :\n1)   Agregar un producto\n2)   Ver producto\n3)   Eliminar producto\n0)   Salir"));
    }
}
// -----------------------------
// muestra en el html todos los productos
tienda.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    document.getElementById("producto").innerHTML += `<div class="producto">
    <div class="image__container">
        <img class="max" src="${producto.img}"
            alt="imagen producto">
    </div>
    <div class="producto__footer">
        <h1>${producto.nombre}</h1>
        <div class="rating">
            <span class="bx bxs-star"></span>
            <span class="bx bxs-star"></span>
            <span class="bx bxs-star"></span>
            <span class="bx bxs-star"></span>
            <span class="bx bx-star"></span>
        </div>
        <div class="price">$${producto.precio}</div>
    </div>
    <div class="bottom">
        <div class="btn__group">
            <a href="#" class="btn" id="${idButton}">Añadir carrito</a>
            <a href="./vistaProducto.html" class="btn view">Vista</a>
        </div>
    </div>
</div>`
})
// ----------------------------------
// le agregamos a cada boton agregar al carriton su correspondiente id
tienda.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    document.getElementById(idButton).addEventListener('click', () => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        // const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
        document.getElementById("cart-total").innerHTML = `${carrito.length} `;
    })
});
// ----------------------------------
// invocacion del menu
// operacion();









