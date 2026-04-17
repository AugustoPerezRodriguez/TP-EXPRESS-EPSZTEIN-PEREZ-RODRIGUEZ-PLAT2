const PI = 3.14;

function restar(x,y){
    return x-y;
}

function sumar(x, y) {

  // No seas vago, acá hay que hacer el cuerpo de la función!!!
    return x+y;
}


const multiplicar = (a, b) => { 

  // No seas vago, acá hay que hacer el cuerpo de la función!!! 
    return a*b;
};

const dividir =(a,b) => {
        return a / b;

}

const numerosTexto = ["dos", "cuatro", "ocho", "diez"];

// Exporto todo lo que yo quiero exponer del módulo hacia el exterior.

export { PI, sumar, restar, multiplicar, dividir, numerosTexto };