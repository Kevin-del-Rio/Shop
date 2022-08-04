let stockProductos = [
    {id: 1, nombre: "Pelota", img: "../img/catalogo/pelota.png",precio: 900, cantidad: 1},
    {id: 2, nombre: "Lapiceras", img: "../img/catalogo/lapiceras.png", precio: 100, cantidad: 1},
    {id: 3, nombre: "Tazas", img: "../img/catalogo/tazas.png", precio: 200, cantidad: 1},
    {id: 4, nombre: "Marcadores", img: "../img/catalogo/marcadores.png", precio: 150, cantidad: 1},
    {id: 5, nombre: "Gorros", img: "../img/catalogo/gorro.jpg", precio: 150, cantidad: 1},
    {id: 6, nombre: "Lentes", img: "../img/catalogo/lentes.png", precio: 150, cantidad: 1},
    {id: 7, nombre: "Remeras",img: "../img/catalogo/remera.jpg", precio: 150, cantidad: 1},
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
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//VACIAR CARRITO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
    closeCarrito()
})

//INYECTAR EL HTML
stockProductos.forEach((producto) => {
    const idButton = `add-cart${producto.id}`
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = 
   `<div class="image__container">
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
            <a href="#" class="btn" id="agregar${producto.id}">Añadir carrito</a>
            <a href="#" class="btn view">Vista</a>
        </div>
    </div>`
    contenedorProductos.appendChild(div)  
    const boton = document.getElementById(`agregar${producto.id}`)  

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)    
    })
})

//ARGEGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
    const existe = carrito.some(prod => prod.id === prodId) 

    if (existe){
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
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
function openCarrito() {
    carritoDOM.classList.add("show")
    overlay.classList.add("show")
    console.log(carrito)
    actualizarCarrito()
}
function closeCarrito() {
    carritoDOM.classList.remove("show")
    overlay.classList.remove("show") 
}



function sumarCantidad(prod){   
    const item = carrito.find((p) => p.id === prod)     
    item.cantidad ++
    console.log(item, prod)
    actualizarCarrito()
}
function restarCantidad(prod){   
    const item = carrito.find((p) => p.id === prod) 
    if(item.cantidad === 1){
        eliminarDelCarrito(prod)
    }else{
        item.cantidad --
    }    
    console.log(item)
    actualizarCarrito()
}