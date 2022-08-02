const carritoDOM = document.querySelector(".carrito")
const overlay = document.querySelector(".carrito__overlay")

const carrito = JSON.parse(localStorage.getItem("carrito")) ;
const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
document.getElementById("cart-total").innerHTML = `${carrito.length}`;


// productos
const productos = [
    {
        id: 1,
        nombre: "Pelota",
        img: "../img/catalogo/pelota.png",
        precio: 900
    },
    {
        id: 2,
        nombre: "Lapiceras",
        img: "../img/catalogo/lapiceras.png",
        precio: 100
    },
    {
        id: 3,
        nombre: "Tazas",
        img: "../img/catalogo/tazas.png",
        precio: 200
    },
    {
        id: 4,
        nombre: "Marcadores",
        img: "../img/catalogo/marcadores.png",
        precio: 150
    },
    {
        id: 5,
        nombre: "Gorros",
        img: "../img/catalogo/gorro.jpg",
        precio: 150
    },
    {
        id: 6,
        nombre: "Lentes",
        img: "../img/catalogo/lentes.png",
        precio: 150
    },
    {
        id: 7,
        nombre: "Remeras",
        img: "../img/catalogo/remera.jpg",
        precio: 150
    },
];
// ----------------------------------
// muestra en el html todos los productos
productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    document.getElementById("producto").innerHTML +=
    `<div class="producto">
        <div class="image__container">
            <img class="max" src="${producto.img}"alt="imagen producto">
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
productos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    document.getElementById(idButton).addEventListener('click', () => {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        const total = carrito.reduce((acumulador, producto) => acumulador + producto.price, 0);
        document.getElementById("cart-total").innerHTML = `${carrito.length} `;
        
        
        carrito.forEach((producto) => {
            document.getElementById("carrito-center").innerHTML +=

           `<div class="carrito__item">
                <img src=${producto.img} alt=${producto.nombre}>
                <div>
                    <h3>${producto.nombre}</h3>
                    <p class="price">$${producto.precio}</p>
                </div>
                <div>
                    <span class="increase" data-id=${idButton}>
                        <i class="bx bxs-up-arrow"></i>
                    </span>
                    <p class="item__cantidad">1</p>
                    <span class="decrease" data-id=${idButton}>
                        <i class="bx bxs-down-arrow"></i>
                    </span>
                </div>
                <div>
                    <span class="remove__item" data-id=${idButton}>
                        <i class="bx bx-trash"></i>
                    </span>
                </div>
            </div>`
        })  
             
    })
});
// ----------------------------------
function openCarrito() {
    carritoDOM.classList.add("show")
    overlay.classList.add("show")


    carrito  = localStorage.getItem(key);    
        carrito.forEach((producto) => {
            document.getElementById("carrito-center").innerHTML +=

           `<div class="carrito__item">
                <img src=${producto.img} alt=${producto.nombre}>
                <div>
                    <h3>${producto.nombre}</h3>
                    <p class="price">$${producto.precio}</p>
                </div>
                <div>
                    <span class="increase" data-id=${idButton}>
                        <i class="bx bxs-up-arrow"></i>
                    </span>
                    <p class="item__cantidad">1</p>
                    <span class="decrease" data-id=${idButton}>
                        <i class="bx bxs-down-arrow"></i>
                    </span>
                </div>
                <div>
                    <span class="remove__item" data-id=${idButton}>
                        <i class="bx bx-trash"></i>
                    </span>
                </div>
            </div>`
        }) 
}
function closeCarrito() {
    carritoDOM.classList.remove("show")
    overlay.classList.remove("show")
 
}

function removerId(id){
    carrito = carrito.filter(item => item.id !== id);
		this.setItemValues(carrito)
		Storage.saveCart(carrito)
		let button = this.singleButton(id);
		if(button){
			button.disabled = false;
			button.innerText = "Añadir carrito"
		}
}








