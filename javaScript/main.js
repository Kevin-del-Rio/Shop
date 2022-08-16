let stockProductos = [
    // { id: 1, categoria:"Deporte", nombre: "Pelota", img: "../img/catalogo/pelota.png", precio: 900, cantidad: 1 },
    { id: 2, categoria: "Utiles", nombre: "Lapiceras", img: "../img/catalogo/lapiceras.png", precio: 100, cantidad: 1 },
    { id: 3, categoria: "Bazar", nombre: "Tazas", img: "../img/catalogo/tazas.png", precio: 142, cantidad: 1 },
    { id: 4, categoria: "Utiles", nombre: "Marcadores", img: "../img/catalogo/marcadores.png", precio: 150, cantidad: 1 },
    { id: 5, categoria: "Accesorio", nombre: "Gorros", img: "../img/catalogo/gorro.png", precio: 150, cantidad: 1 },
    { id: 6, categoria: "Accesorio", nombre: "Lentes", img: "../img/catalogo/lentes.png", precio: 150, cantidad: 1 },
    { id: 7, categoria: "Vestimenta", nombre: "Remeras", img: "../img/catalogo/remera.png", precio: 550, cantidad: 1 },
    { id: 8, categoria: "Bazar", nombre: "Tazas", img: "../img/catalogo/tazas.png", precio: 200, cantidad: 1 },
    { id: 9, categoria: "Utiles", nombre: "Marcadores", img: "../img/catalogo/marcadores.png", precio: 130, cantidad: 1 },
    { id: 10, categoria: "Accesorio", nombre: "Gorros", img: "../img/catalogo/gorro.png", precio: 200, cantidad: 1 },
    { id: 11, categoria: "Accesorio", nombre: "Lentes", img: "../img/catalogo/lentes.png", precio: 125, cantidad: 1 },
    { id: 12, categoria: "Vestimenta", nombre: "Remeras", img: "../img/catalogo/remera.png", precio: 1500, cantidad: 1 },
]
const contenedorProductos = document.getElementById('producto')
const carritoCenter = document.querySelector(".carrito__center")
const carritoDOM = document.querySelector(".carrito")
const botonVaciar = document.getElementById('vaciar-carrito')
const overlay = document.querySelector(".carrito__overlay")
const precioTotal = document.getElementById('precioTotal')
const cantidad = document.getElementById('cantidad')
const contadorCarrito = document.getElementById('cart-total')
const checkboxMenor = document.getElementById('menor')
const checkboxMayor = document.getElementById('mayor')
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
mostrasProductos(stockProductos)
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
    sleep(800)
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
			<span class="remove__item" onclick="eliminarDelCarrito(${producto.id})"data-id=${producto.id}>
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
// Filtrado Por Categoria
let category = "";
function categoryValue() {
    category = document.getElementById("category").value
    const productosCat = stockProductos.filter((producto) => producto.categoria === category);


    if (productosCat.length > 0) {
        // if(checkboxMayor == true){
        //     console.log("treu")
        //     productosCat.sort(function (a, b) {
        //         if (a.precio < b.precio) {
        //             return 1;
        //         }
        //         if (a.precio > b.precio) {
        //             return -1;
        //         }
        //         return 0;
        //     });
        // }else if(checkboxMenor == true) {
        //     productosCat.sort(function (a, b) {
        //         if (a.precio > b.precio) {
        //             return 1;
        //         }
        //         if (a.precio < b.precio) {
        //             return -1;
        //         }
        //         return 0;
        //     });
        // }

        mostrasProductos(productosCat)
    } else if (category === "Todos") {
        mostrasProductos(stockProductos)
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'No hay productos',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
        document.getElementById("category").value = "Todos"

    }



}

// Mostrar Productos
function mostrasProductos(productosCat) {
    document.getElementById("producto").innerHTML = "";
    productosCat.forEach((prod) => {
        const idButton = `add-cart${prod.id}`
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = ` 
        <div class="card-img">
            <div class="max">
                <img src="${prod.img}"alt="imagen producto">
            </div>
        </div>
        <div class="card-info">
        <p class="text-title">${prod.nombre}</p>
        <p class="text-body">Product description and details</p>
        </div>
        <div class="card-footer">
        <span class="text-title">$${prod.precio}</span>
        <div class="card-button"id="agregar${prod.id}">
        <svg class="svg-icon" viewBox="0 0 20 20">
            <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
            <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
            <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
        </svg>
        </div>
    </div>`

        contenedorProductos.appendChild(div)
        const boton = document.getElementById(`agregar${prod.id}`)
        boton.addEventListener('click', () => {
            agregarAlCarrito(prod.id)
        })
    })
}
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

// ----------------------------------------------------------------------------------------------------
function menor() {
    checkboxMayor.checked = false
    stockProductos.sort(function (a, b) {
        if (a.precio > b.precio) {
            return 1;
        }
        if (a.precio < b.precio) {
            return -1;
        }
        return 0;
    });
    console.log(stockProductos)
    mostrasProductos(stockProductos)
}
function mayor() {
    checkboxMenor.checked = false
    stockProductos.sort(function (a, b) {
        if (a.precio < b.precio) {
            return 1;
        }
        if (a.precio > b.precio) {
            return -1;
        }
        return 0;
    });
    console.log(stockProductos)
    mostrasProductos(stockProductos)
}



// ----------------------------------
