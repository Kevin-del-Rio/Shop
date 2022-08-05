let stockProductos = [
    { id: 1, nombre: "Pelota", img: "../img/catalogo/pelota.png", precio: 900, cantidad: 1 },
    { id: 2, nombre: "Lapiceras", img: "../img/catalogo/lapiceras.png", precio: 100, cantidad: 1 },
    { id: 3, nombre: "Tazas", img: "../img/catalogo/tazas.png", precio: 200, cantidad: 1 },
    { id: 4, nombre: "Marcadores", img: "../img/catalogo/marcadores.png", precio: 150, cantidad: 1 },
    { id: 5, nombre: "Gorros", img: "../img/catalogo/gorro.png", precio: 150, cantidad: 1 },
    { id: 6, nombre: "Lentes", img: "../img/catalogo/lentes.png", precio: 150, cantidad: 1 },
    { id: 7, nombre: "Remeras", img: "../img/catalogo/remera.png", precio: 150, cantidad: 1 },
    { id: 8, nombre: "Tazas", img: "../img/catalogo/tazas.png", precio: 200, cantidad: 1 },
    { id: 9, nombre: "Marcadores", img: "../img/catalogo/marcadores.png", precio: 150, cantidad: 1 },
    { id: 10, nombre: "Gorros", img: "../img/catalogo/gorro.png", precio: 150, cantidad: 1 },
    { id: 11, nombre: "Lentes", img: "../img/catalogo/lentes.png", precio: 150, cantidad: 1 },
    { id: 12, nombre: "Remeras", img: "../img/catalogo/remera.png", precio: 150, cantidad: 1 },
]
const contenedorProductos = document.getElementById('producto')
const carritoCenter = document.querySelector(".carrito__center")
const carritoDOM = document.querySelector(".carrito")
const botonVaciar = document.getElementById('vaciar-carrito')
const overlay = document.querySelector(".carrito__overlay")

const precioTotal = document.getElementById('precioTotal')
const cantidad = document.getElementById('cantidad')
const contadorCarrito = document.getElementById('cart-total')


let carrito = []

//GET STORAGE
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//VACIAR CARRITO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    localStorage.setItem('carrito', JSON.stringify(carrito))
    sleep(800)
    closeCarrito()
})
//INYECTAR EL HTML
stockProductos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML =
        ` 
    <div class="card-img">
        <div class="max">
            <img src="${producto.img}"alt="imagen producto">
        </div>
    </div>
    <div class="card-info">
      <p class="text-title">${producto.nombre}</p>
      <p class="text-body">Product description and details</p>
    </div>
    <div class="card-footer">
    <span class="text-title">$${producto.precio}</span>
    <div class="card-button"id="agregar${producto.id}">
      <svg class="svg-icon" viewBox="0 0 20 20">
        <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
        <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
        <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
      </svg>
    </div>
  </div>`
    //    `<div class="image__container">
    //         <img class="max" src="${producto.img}"alt="imagen producto">
    //     </div>
    //     <div class="producto__footer">
    //         <h1>${producto.nombre}</h1>
    //         <div class="rating">
    //             <span class="bx bxs-star"></span>
    //             <span class="bx bxs-star"></span>
    //             <span class="bx bxs-star"></span>
    //             <span class="bx bxs-star"></span>
    //             <span class="bx bx-star"></span>
    //         </div>
    //         <div class="price">$${producto.precio}</div>
    //     </div>
    //     <div class="bottom">
    //         <div class="btn__group">
    //             <a href="#" class="btn" id="agregar${producto.id}">Añadir carrito</a>
    //             <a href="#" class="btn view">Vista</a>
    //         </div>
    //     </div>`
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })
})
//ARGEGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId)
    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === prodId) {
                prod.cantidad++
                console.log(prod)
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)

    }
    actualizarCarrito()
}
//ELIMINAR ELEMENTO DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()

}
//ACTUALIZAR CARRITO
const actualizarCarrito = () => {
    carritoCenter.innerHTML = ""
    carrito.forEach((producto) => {
        const div = document.createElement("div")
        div.classList.add("carrito__item")

        div.innerHTML = `
		<img src=${producto.img} alt=${producto.nombre}>
		<div>
			<h3>${producto.nombre}</h3>
			<p class="price">$${producto.precio}</p>
		</div>
		<div>
			<span class="increase" onclick="sumarCantidad(${producto.id})" data-id=${producto.id}>
				<i class="bx bxs-up-arrow"></i>
			</span>
			<p class="item__cantidad" <span id ="cantidad">${producto.cantidad}</span></p>
			<span class="decrease"onclick="restarCantidad(${producto.id})" data-id=${producto.id}>
				<i class="bx bxs-down-arrow"></i>
			</span>
		</div>
		<div>
			<span class="remove__item"  onclick="eliminarDelCarrito(${producto.id})"data-id=${producto.id}>
				<i class="bx bx-trash"></i>
			</span>
		</div>
		`
        carritoCenter.appendChild(div)
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerText = carrito.length
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}
// ABRIMOS CARRITO
function openCarrito() {
    carritoDOM.classList.add("show")
    overlay.classList.add("show")
    console.log(carrito)
    actualizarCarrito()
}
// CARRAMOS CARRITO
function closeCarrito() {
    actualizarCarrito()
    overlay.classList.remove("show")
    carritoDOM.classList.remove("show")

}
// DENTRO DEL CARRITO SUMAMOS PRODUCTOS
function sumarCantidad(prod) {
    const item = carrito.find((p) => p.id === prod)
    item.cantidad++
    actualizarCarrito()
}
// DENTRO DEL CARRITO RESTAMOS PRODUCTOS
function restarCantidad(prod) {
    const item = carrito.find((p) => p.id === prod)
    item.cantidad !== 1 ? item.cantidad-- : eliminarDelCarrito(prod)
    actualizarCarrito()
}


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}