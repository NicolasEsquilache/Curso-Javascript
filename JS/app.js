
let subtotal = 0;
let precioFinal = 0;



class ItemFactura {
    marca;
    modelo;
    ancho;
    alto;
    rodado;
    precio;
    cantidad;
    imagen;
    alternativo;

    constructor(marca, modelo, ancho, alto, rodado, precio, cantidad, imagen, alternativo) {
        this.marca = marca;
        this.modelo = modelo;
        this.ancho = ancho;
        this.alto = alto;
        this.rodado = rodado;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.alternativo = alternativo;
    }
}

let carrito = [];

function start() {
    document.addEventListener('DOMContentLoaded', traerCarrito);
    mostrarCatalogo();
}


function traerCarrito() {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito();
}

function mostrarCatalogo() {
    let seccionProductos = document.getElementById('grilla');
    seccionProductos.innerHTML = '';
    catalogo.forEach((item) => {
        tarjeta(item, seccionProductos);
    });
}

function tarjeta(producto, seccion) {
    let { marca, modelo, ancho, alto, rodado, precio, imagen, alternativo } = producto;
    //console.log(producto);
    let card = document.createElement('div');
    card.classList.add('tarjeta');

    let figure = document.createElement('figure');
    figure.classList.add('producto');
    figure.innerHTML = `<div><img src="./img/${imagen}" alt="${alternativo}"></div>
                        <div class="info-producto">
                            <figcaption><p>${marca}, ${modelo}, ${ancho}, ${alto}, R${rodado}</p></figcaption>
                            <p>$ ${precio.toLocaleString()}</p>
                            <button id="agregar-${modelo}${rodado}">+ Agregar al carrito</button>
                        </div>`;
    card.appendChild(figure);
    seccion.appendChild(card);
    const botonAgregar = document.getElementById(`agregar-${modelo}${rodado}`);
    botonAgregar.onclick = () => { agregarCarrito(producto) };
}

function agregarCarrito(eleccion) {
    //console.log(eleccion);
    let indice = carrito.findIndex((el) => el.modelo === eleccion.modelo && el.rodado === eleccion.rodado);
    Toastify({
        text: "Producto agregado exitosamente",        
        duration: 2500,
        close: true,
        stopOnFocus: false,
        gravity: 'bottom',
        style: {
            background: "linear-gradient(to right, #00AA00, #005500)",
          },
        }).showToast();
    //console.log(indice);
    if (indice !== -1) {
        carrito[indice].cantidad++;
    } else {
        let nuevoItem = new ItemFactura(eleccion.marca, eleccion.modelo, eleccion.ancho, eleccion.alto, eleccion.rodado, +eleccion.precio, 1, eleccion.imagen, eleccion.alternativo);
        console.log(nuevoItem);
        carrito.push(nuevoItem);
    }
    carritoAlStorage();
    mostrarCarrito();
}

function carritoAlStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function mostrarCarrito() {
    let tabla = document.getElementById('tablaBody');
    tabla.innerHTML = '';
    carrito.forEach((producto) => {
        filaTabla(producto, tabla);

    })

    const filaTotal = document.createElement('tr');
    filaTotal.classList.add('itemTicket', 'filaTotal');

    let thTotal = document.createElement('th');
    thTotal.colSpan = 2;
    thTotal.classList.add('totalTexto');
    thTotal.textContent = 'Total:';
    filaTotal.appendChild(thTotal);

    let tdTotal = document.createElement('td');
    tdTotal.classList.add('precioColumna')
    tdTotal.innerHTML = `$ ${(carrito.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0)).toLocaleString()}`;
    filaTotal.appendChild(tdTotal);

    tabla.appendChild(filaTotal);

    let botonLimpiar = document.createElement('button');
    botonLimpiar.className = 'borrarCarrito';
    botonLimpiar.innerText = 'Borrar';
    tabla.appendChild(botonLimpiar);
    botonLimpiar.addEventListener('click', () => { 
        if(carrito.length!==0)
        {
        Swal.fire({
            title: 'Está seguro de eliminar todos los productos?',
            icon: 'warning' ,
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            confirmButtonColor:'#FF0000',
            denyButtonText: `Cancelar`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Carrito eliminado!', '', 'success')
              limpiarCarrito()
            } 
          })
        }
     })
}

function filaTabla(producto, tabla) {
    const fila = document.createElement('tr');
    fila.classList.add('itemTicket');

    let dato = document.createElement('td');
    dato.innerHTML = `<div class="itemEnTabla"><img class="imgCarrito" src="./img/${producto.imagen}" alt="${producto.alternativo}"><p class="nombreEnTabla">${producto.modelo}</p>
    <p class="nombreEnTabla">R ${producto.rodado}</p></div>`;
    fila.appendChild(dato);

    dato = document.createElement('td');
    dato.classList.add('tdCantidad')
    dato.innerHTML = `    <div class="celdaCantidad">
                            <button id="restar-${producto.modelo}${producto.rodado}">-</button>
                            <p class="cantidadTicket">${producto.cantidad}</p>
                            <button id="sumar-${producto.modelo}${producto.rodado}">+</button>
                        </div>`
    fila.appendChild(dato);

    dato = document.createElement('td');
    dato.classList.add('precioColumna');
    dato.innerHTML = `$ ${(producto.precio * producto.cantidad).toLocaleString()}`;
    fila.appendChild(dato);

    tabla.appendChild(fila);
    const botonResta = document.getElementById(`restar-${producto.modelo}${producto.rodado}`);
    botonResta.addEventListener('click', () => { decrementarProducto(producto) });
    const botonSuma = document.getElementById(`sumar-${producto.modelo}${producto.rodado}`);
    botonSuma.addEventListener('click', () => { agregarCarrito(producto) });

}

function limpiarCarrito() {
    carrito.splice(0, carrito.length);
    carrito = [];
    carritoAlStorage()
    mostrarCarrito()
}
function decrementarProducto(eleccion) {
    let indice = carrito.findIndex((el) => el.modelo === eleccion.modelo && el.rodado === eleccion.rodado);
    if (carrito[indice].cantidad == 1) {
        carrito.splice([indice], 1);
    } else {
        carrito[indice].cantidad--;
    }
    Toastify({
        text: "Producto eliminado exitosamente",        
        duration: 2500,
        close: true,
        stopOnFocus: false,
        gravity: 'bottom',
        style: {
            background: "linear-gradient(to right, #AA0000, #550000)",
          },
        }).showToast();
    carritoAlStorage();
    mostrarCarrito();
}

const newsletter=document.getElementById('btnRegistro');

newsletter.addEventListener('click', async () => {
    const { value: email } = await Swal.fire({
        title: 'Ingrese su correo',
        input: 'email',
        inputPlaceholder: 'usuario@ejemplo.com'
      })
      
      if (email) {
        Swal.fire({
            icon: 'success',
            title: 'Felicitaciones!',
            text: 'Usted ahora recibirá nuestras mejores ofertas a su correo electrónico.',
          })
      }
});


start()