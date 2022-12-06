
let boton = document.getElementById("carrito");

boton.addEventListener("click", function(){

    let nombreP = document.getElementById("pp");
    let n = nombreP.value;
    let precioP = document.getElementById("pp");
    let p = nombreP.value;

    // objeto con el producto nuevo
    let productoNuevo={nombre:n,precio:p}
    // declaro variable productos donde guardo un json
    let productos = JSON.parse(localStorage.getItem("carrito"))
    // meto con un push el producto nuevo en el array de productos del carrito
    productos.push(productoNuevo)
    // le paso el array de productos y lo convierte en srtring
    localStorage.setItem("carrtio",JSON.stringify(productos))


    

})
