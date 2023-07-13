class Producto {
    marca;
    modelo;
    ancho;
    alto;
    rodado;
    precio;
    imagen;
    alternativo;


    constructor(marca, modelo, ancho, alto, rodado, precio,imagen,alternativo) {
        this.marca = marca;
        this.modelo = modelo;
        this.ancho = ancho;
        this.alto = alto;
        this.rodado = rodado;
        this.precio = precio;
        this.imagen = imagen;
        this.alternativo = alternativo;
    }
}

// PRODUCTOS
const catalogo = [
    new Producto('Pirelli', 'P7', 205, 55, 16, 63000,'P7.png','Imagen de la cubierta'),
    new Producto('Pirelli', 'P7', 195, 55, 15, 42000,'P7.png','Imagen de la cubierta'),
    new Producto('Goodyear', 'Assurance', 195, 55, 14, 31000,'P1.png','Imagen de la cubierta'),
    new Producto('Michelin', 'Primacy', 205, 55, 16, 82000,'Primacy.png','Imagen de la cubierta'),
    new Producto('Michelin', 'Primacy', 195, 55, 15, 59000,'Primacy.png','Imagen de la cubierta'),
    new Producto('Pirelli', 'P1', 195, 55, 15, 36000,'P1.png','Imagen de la cubierta'),
    new Producto('Goodyear', 'Assurance', 205, 55, 16, 97000,'Assurance.png','Imagen de la cubierta'),
    new Producto('Michelin', 'Primacy', 225, 35, 18, 115000,'Primacy.png','Imagen de la cubierta'),
    new Producto('Pirelli', 'P1', 205, 55, 16, 42000,'P1.png','Imagen de la cubierta'),
    new Producto('Goodyear', 'Assurance', 225, 35, 18, 94000,'P1.png','Imagen de la cubierta'),
    new Producto('Pirelli', 'P1', 185, 65, 14, 31000,'P1.png','Imagen de la cubierta'),
    new Producto('Pirelli', 'P7', 225, 35, 18, 89000,'P7.png','Imagen de la cubierta')
];