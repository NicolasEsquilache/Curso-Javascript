// VARIABLES
let start;
let subtotal = 0;
let precioFinal = 0;
let eleccion = 0;


// Constructor de cada item de la factura
class ItemFactura {
    marca;
    modelo;
    ancho;
    alto;
    rodado;
    precio;

    constructor(marca, modelo, ancho, alto, rodado, precio, cantidad, subtotal) {
        this.marca = marca;
        this.modelo = modelo;
        this.ancho = ancho;
        this.alto = alto;
        this.rodado = rodado;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
    }
}




const catalogoString = catalogo.map((producto, index) => `
${index + 1} - ${producto.marca} - ${producto.modelo} - ${producto.ancho}/${producto.alto}/${producto.rodado}:  $${producto.precio}.`);

let carrito = [];

function compra() {
    eleccion = parseInt(prompt('Elija una cubierta de la lista:\n' + catalogoString.join('')));
    //alert(eleccion);
    while (eleccion <= 0 || eleccion > catalogo.length) {
        eleccion = parseInt(prompt('La cubierta elegida no forma parte de la lista. Seleccione un producto de la lista:\n' + catalogoString.join('')));
    } //Validacion del valor ingresado, debe encontrarse entre 0 y la cantidad de productos a la venta

    cantidad = parseInt(prompt('Introduzca la cantidad de unidades que desea'));
    while (cantidad < 0) {
        cantidad = parseInt(prompt('La cantidad no es válida. Introduzca la cantidad que desea:'));
    } // Validacion del valor ingresado, tiene que ser un número positivo

    subtotal = catalogo[eleccion - 1].precio * cantidad; // Calculo del subtotal
    const nuevoItem = new ItemFactura(catalogo[eleccion - 1].marca, catalogo[eleccion - 1].modelo, catalogo[eleccion - 1].ancho, catalogo[eleccion - 1].alto, catalogo[eleccion - 1].rodado, catalogo[eleccion - 1].precio, cantidad, subtotal); // Uso el constructor para crear un item de factura
    carrito.push(nuevoItem); // Agrego el item a mi lista de items
    precioFinal = precioFinal + subtotal; //Sumo el subtotal al precio final

    let seguir = prompt('Producto agregado al carrito. ¿Desea seguir comprando? Ingrese si o no.'); // Doy opcion de seguir comprando
    validacion(seguir);
}




function validacion(respuesta) {
    while (respuesta.toLowerCase() !== 'si' && respuesta.toLowerCase() !== 'no') {
        respuesta = prompt('El valor ingresado no corresponde con una respuesta válida. Desea iniciar? si/no');
    }

    if (respuesta.toLowerCase() == 'si') {
        compra();
    }
    else {
        console.log(carrito);
       const stringItemFactura = carrito.map((item, index) => (index + 1) + ' - Producto: ' + item.marca + ' | /Precio: $' + item.precio + ' | Cantidad: ' + item.cantidad + ' | Subtotal: $' + item.subtotal); // Convierto arrayItems en un string para mostrar en el ticket
       return alert('TICKET DE COMPRA\n\n' + stringItemFactura.join('\n\n') + '\n\n' + 'Total a pagar = $' + precioFinal + '.');
    }
}

start = prompt('Bienvenido al buscador de la gomería, desea iniciar una compra? si/no:');
validacion(start);