let repeat = 's';
let op1 = 1;
let n1;
let n2;
let resultado = 0;


alert('Bienvenid@ al ...');
do {
    op1 = parseInt(prompt('Seleccione entre las siguientes opciones:\n1 sumar\n2 restar\n3 multiplicar\n4 dividir'));

    n1 = parseFloat(prompt('Ingrese el primer numero'));
    n2 = parseFloat(prompt('Ingrese el segundo numero'));


    function sumar(num1,num2) {
        return num1+num2;
    }
    function restar(num1,num2) {
        return num1-num2;
    }
    function dividir(num1,num2) {
        return num1*num2;
    }
    function multiplicar(num1,num2) {
        return num1/num2;
    }


    switch (op1) {
        case 1:
            resultado = sumar(n1,n2);
            operacion= 'SUMA';
            break;
        case 2:
            resultado = restar(n1,n2);
            operacion= 'RESTA';
            break;
        case 3:
            resultado = dividir(n1,n2);
            operacion= 'MULTIPLICACION';
            break;
        case 4:
            resultado = multiplicar(n1,n2);
            operacion= 'DIVISION';
            break;
        default:

    }

    console.log(`El resultado de la ${operacion} entre ${n1} y ${n2} es: ${resultado}`);
    repeat = prompt('Quiere volver a realizar otra simulación? s/n');
    //repeat = repeat.toUpperCase();
} while (repeat == 's');
alert('Gracias');