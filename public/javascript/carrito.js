window.onload = function () {
  function actualizarTotalCarrito() {
    let subtotales = document.querySelectorAll(".carrito-subtotal");
    let cantidadEntradas = document.querySelectorAll(".input-cantidad");

    let valorTotal = 0;
    for (i = 0; i < subtotales.length; i++) {
      let valor = parseFloat(subtotales[i].innerText);
      let cantidad = parseFloat(cantidadEntradas[i].value);
      cantidad < 0
        ? (cantidadEntradas[i].value = 0)
        : isNaN(cantidad)
        ? (cantidad = 0)
        : (valorTotal += valor * cantidad);
    }
    let carritoTotal = document.getElementById("valorTotal");
    carritoTotal.innerText = `Total: $${valorTotal}`;
  }

  let carritoDiv = document.getElementById("carrito");

  let compras = JSON.parse(localStorage.getItem("carrito"));
  if (compras != null) {
    for (let compra of compras) {
      let htmlCarrito = `
            <article class="carrito-item rounded row align-items-center mb-2 shadow bg-white">
        <div class="col-12 col-sm-7 col-lg-6 p-2">
            <!-- Imagen -->
            <img src="${compra.imagen}" alt="evento" class="container p-0 rounded">
        </div>
        <div class="col-12 col-sm-5 col-lg-6 p-2 text-center">
            <!-- Titulo y tipo de entrada -->
            <div class="row p-2">
                <h4>${compra.nombre}</h4></div>`;

      for (const entrada of compra.entradas) {
        htmlCarrito += `
                <p class="text-center m-0"> ${entrada.sector} </p>
            <div class="row p-2 justify-content-center">    <!-- Botones + - cantidad entradas -->
                <button type="button" class="col-1 btn btn-light boton-restar" id="${entrada.id}" >-</button>
                <input type="number" class="col-2 text-center input-cantidad" value="${entrada.cantidad}" class="text-center" id="l${entrada.id}" >
                <button type="button" class="col-1 btn btn-light boton-agregar" id="${entrada.id}" >+</button>
            </div>  <!-- FIN Botones + - cantidad entradas -->
            <div class="row p-2 justify-content-end">
                <!-- Subtotal -->
                <p class="text-center" style="font-size: 0.75rem">
                    Precio unitario: $<span class="carrito-subtotal">${entrada.precio}</span>
                </p>
            </div>
        `;
      }
      carritoDiv.innerHTML += htmlCarrito + "</article>";
    }
    actualizarTotalCarrito();
  }
  else {
    document.querySelector('article form').innerHTML = ""
    carritoDiv.innerHTML = `<h3 class='text-center mt-2 pt-2'>Aún no tienes entradas en tu carrito</h3>`
  }

  let botonesRestar = document.querySelectorAll(".boton-restar");
  let inputsCantidad = document.querySelectorAll(".input-cantidad");
  let botonesAgregar = document.querySelectorAll(".boton-agregar");
  for (const botonRestar of botonesRestar) {
    botonRestar.addEventListener("click", function () {
      for (i = 0; i < compras.length; i++) {
        let entradas = compras[i]["entradas"];
        for (const entrada of entradas) {
          if (entrada.id == this.id) {
            --entrada.cantidad;
            entrada.cantidad < 0 ? (entrada.cantidad = 0) : "";
            localStorage.setItem("carrito", JSON.stringify(compras));
            carritoDiv.innerHTML = "";
            window.onload();
          }
        }
      }
    });
  }

  for (const botosAgregar of botonesAgregar) {
    botosAgregar.addEventListener("click", function () {
      for (i = 0; i < compras.length; i++) {
        let entradas = compras[i]["entradas"];
        for (const entrada of entradas) {
          if (entrada.id == this.id) {
            ++entrada.cantidad;
            localStorage.setItem("carrito", JSON.stringify(compras));
            carritoDiv.innerHTML = "";
            window.onload();
          }
        }
      }
    });
  }

  for (const inputCantidad of inputsCantidad) {
    inputCantidad.addEventListener("input", function (e) {
      actualizarTotalCarrito();
    });
  }
};
