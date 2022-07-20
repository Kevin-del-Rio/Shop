// clase producto
class Producto {
    constructor(idP, nombreP, precioP, stockP) {
        this.id = idP;
        this.nombre = nombreP;
        this.precio = precioP;
        this.stock = stockP;
    }
}
// productos
let producto1 = new Producto(1, "pelotas", 250, 150);
let producto2 = new Producto(2, "lapiceras", 100, 120);
let producto3 = new Producto(3, "tazas", 70, 170);
let producto4 = new Producto(4, "marcadores", 150, 230);

// agrego productos a la tienda
const tienda = [producto1, producto2, producto3, producto4];

// agrego productos a la tienda por prompt
function agregarProducto() {
    let id = parseInt(prompt(" Ingrese id: "));
    let nombre = prompt("Nombre del producto: ");
    let precio = parseInt(prompt("Precio del producto:"));
    let stock = parseInt(prompt(" Ingrese stock: "));

    let nuevoProducto = new Producto(id, nombre, precio, stock);

    tienda.push(nuevoProducto);
}
// funcion para ver todos los productos
function verProductos() {
    let inventario = "";

    tienda.forEach((producto) => {
        inventario += "-    " + producto.nombre.toUpperCase() + "    Precio Unitario:    $" + producto.precio + "    Stock:    " + producto.stock + "\n";
    });
    alert(inventario);
}
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
// menu con opciones
function operacion() {
    let opcion =  parseInt(prompt("Ingrese su operacion :\n1)   Agregar un producto\n2)   Ver producto\n3)   Eliminar producto\n0)   Salir"));
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
// invocacion del menu
operacion();



